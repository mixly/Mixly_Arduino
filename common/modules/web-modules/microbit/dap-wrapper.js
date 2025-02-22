(() => {

/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */

// https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/dap/constants.ts
// https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/cortex/constants.ts

// CRA's build tooling doesn't support const enums so we've converted them to prefixed constants here.
// If we move this to a separate library then we can replace them.
// In the meantime we should prune the list below to what we actually use.

// FICR Registers
const FICR = {
    CODEPAGESIZE: 0x10000000 | 0x10,
    CODESIZE: 0x10000000 | 0x14,
};

const DapCmd = {
    DAP_INFO: 0x00,
    DAP_CONNECT: 0x02,
    DAP_DISCONNECT: 0x03,
    DAP_TRANSFER: 0x05,
    DAP_TRANSFER_BLOCK: 0x06,
    // Many more.
};

const Csw = {
    CSW_SIZE: 0x00000007,
    CSW_SIZE32: 0x00000002,
    CSW_ADDRINC: 0x00000030,
    CSW_SADDRINC: 0x00000010,
    CSW_DBGSTAT: 0x00000040,
    CSW_HPROT: 0x02000000,
    CSW_MSTRDBG: 0x20000000,
    CSW_RESERVED: 0x01000000,
    CSW_VALUE: -1, // see below
    // Many more.
};

Csw.CSW_VALUE = Csw.CSW_RESERVED | Csw.CSW_MSTRDBG | Csw.CSW_HPROT | Csw.CSW_DBGSTAT | Csw.CSW_SADDRINC;

const DapVal = {
    AP_ACC: 1 << 0,
    READ: 1 << 1,
    WRITE: 0 << 1,
    // More.
};

const ApReg = {
    CSW: 0x00,
    TAR: 0x04,
    DRW: 0x0c,
    // More.
};

const CortexSpecialReg = {
    // Debug Exception and Monitor Control Register
    DEMCR: 0xe000edfc,
    // DWTENA in armv6 architecture reference manual
    DEMCR_VC_CORERESET: 1 << 0,

    // CPUID Register
    CPUID: 0xe000ed00,

    // Debug Halting Control and Status Register
    DHCSR: 0xe000edf0,
    S_RESET_ST: 1 << 25,

    NVIC_AIRCR: 0xe000ed0c,
    NVIC_AIRCR_VECTKEY: 0x5fa << 16,
    NVIC_AIRCR_SYSRESETREQ: 1 << 2,

    // Many more.
};

const CoreRegister = {
    SP: 13,
    LR: 14,
    PC: 15,
};

// Returns a representation of an Access Port Register.
// Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/util.ts#L63
const apReg = (r, mode) => {
    const v = r | mode | DapVal.AP_ACC;
    return 4 + ((v & 0x0c) >> 2);
};

// Returns a code representing a request to read/write a certain register.
// Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/util.ts#L92
const regRequest = (regId, isWrite = false) => {
    let request = !isWrite ? 1 << 1 /* READ */ : 0 << 1; /* WRITE */

    if (regId < 4) {
        request |= 0 << 0 /* DP_ACC */;
    } else {
        request |= 1 << 0 /* AP_ACC */;
    }

    request |= (regId & 3) << 2;

    return request;
};

const bufferConcat = (bufs) => {
    let len = 0;
    for (const b of bufs) {
        len += b.length;
    }
    const r = new Uint8Array(len);
    len = 0;
    for (const b of bufs) {
        r.set(b, len);
        len += b.length;
    }
    return r;
};

class DAPWrapper {

    constructor(device, logging) {
        this.device = device;
        this.logging = logging;
        this.initialConnectionComplete = true;
        this.loggedBoardSerialInfo = null;
        this._pageSize = 0;
        this._numPages = 0;
        this.transport = new DAPjs.WebUSB(this.device);
        this.daplink = new DAPjs.DAPLink(this.transport);
        this.cortexM = new DAPjs.CortexM(this.transport);
    }

    log(v) {
        //console.log(v);
    }

    /**
     * The page size. Throws if we've not connected.
     */
    pageSize() {
        if (this._pageSize === undefined) {
            throw new Error("pageSize not defined until connected");
        }
        return this._pageSize;
    }

    /**
     * The number of pages. Throws if we've not connected.
     */
    numPages() {
        if (this._numPages === undefined) {
            throw new Error("numPages not defined until connected");
        }
        return this._numPages;
    }

    boardSerialInfo() {
        return BoardSerialInfo.parse(
            this.device,
            this.logging.log.bind(this.logging)
        );
    }

    async connectAsync() {
        await this.daplink.connect();
        await this.daplink.setSerialBaudrate(115200);
        await this.cortexM.connect();
        this.logging.event({
            type: "WebUSB-info",
            message: "connected",
        });

        const serialInfo = this.boardSerialInfo();
        this.log(`Detected board ID ${serialInfo.id}`);

        if (
            !this.loggedBoardSerialInfo ||
            !this.loggedBoardSerialInfo.eq(this.boardSerialInfo())
        ) {
            this.loggedBoardSerialInfo = this.boardSerialInfo();
            this.logging.event({
                type: "WebUSB-info",
                message: "board-id/" + this.boardSerialInfo().id,
            });
            this.logging.event({
                type: "WebUSB-info",
                message:
                    "board-family-hic/" +
                    this.boardSerialInfo().familyId +
                    this.boardSerialInfo().hic,
            });
        }

        this._pageSize = await this.cortexM.readMem32(FICR.CODEPAGESIZE);
        this._numPages = await this.cortexM.readMem32(FICR.CODESIZE);
    }

    // Drawn from https://github.com/microsoft/pxt-microbit/blob/dec5b8ce72d5c2b4b0b20aafefce7474a6f0c7b2/editor/extension.tsx#L119
    async reconnectAsync() {
        if (this.initialConnectionComplete) {
            await this.disconnectAsync();
            this.transport = new DAPjs.WebUSB(this.device);
            this.daplink = new DAPjs.DAPLink(this.transport);
            this.cortexM = new DAPjs.CortexM(this.transport);
        } else {
            this.initialConnectionComplete = true;
        }

        await this.daplink.connect();
        await this.cortexM.connect();
        this.logging.event({
            type: "WebUSB-info",
            message: "connected",
        });

        const serialInfo = this.boardSerialInfo();
        this.log(`Detected board ID ${serialInfo.id}`);

        if (
            !this.loggedBoardSerialInfo ||
            !this.loggedBoardSerialInfo.eq(this.boardSerialInfo())
        ) {
            this.loggedBoardSerialInfo = this.boardSerialInfo();
            this.logging.event({
                type: "WebUSB-info",
                message: "board-id/" + this.boardSerialInfo().id,
            });
            this.logging.event({
                type: "WebUSB-info",
                message:
                    "board-family-hic/" +
                    this.boardSerialInfo().familyId +
                    this.boardSerialInfo().hic,
            });
        }

        this._pageSize = await this.cortexM.readMem32(FICR.CODEPAGESIZE);
        this._numPages = await this.cortexM.readMem32(FICR.CODESIZE);
    }

    async startSerial(listener) {
        const currentBaud = await this.daplink.getSerialBaudrate();
        if (currentBaud !== 115200) {
            // Changing the baud rate causes a micro:bit reset, so only do it if necessary
            await this.daplink.setSerialBaudrate(115200);
        }
        this.daplink.on(DAPjs.DAPLink.EVENT_SERIAL_DATA, listener);
        await this.daplink.startSerialRead(1);
    }

    stopSerial(listener) {
        this.daplink.stopSerialRead();
        this.daplink.removeListener(DAPjs.DAPLink.EVENT_SERIAL_DATA, listener);
    }

    async disconnectAsync() {
        if (this.device.opened && this.transport.interfaceNumber !== undefined) {
            return this.daplink.disconnect();
        }
    }

    // Send a packet to the micro:bit directly via WebUSB and return the response.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/transport/cmsis_dap.ts#L161
    async send(packet) {
        const array = Uint8Array.from(packet);
        await this.transport.write(array.buffer);

        const response = await this.transport.read();
        return new Uint8Array(response.buffer);
    }

    // Send a command along with relevant data to the micro:bit directly via WebUSB and handle the response.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/transport/cmsis_dap.ts#L74
    async cmdNums(
        op,
        data
    ) {
        data.unshift(op);

        const buf = await this.send(data);

        if (buf[0] !== op) {
            throw new Error(`Bad response for ${op} -> ${buf[0]}`);
        }

        switch (op) {
            case DapCmd.DAP_CONNECT:
            case DapCmd.DAP_INFO:
            case DapCmd.DAP_TRANSFER:
            case DapCmd.DAP_TRANSFER_BLOCK:
                break;
            default:
                if (buf[1] !== 0) {
                    throw new Error(`Bad status for ${op} -> ${buf[1]}`);
                }
        }

        return buf;
    }

    // Read a certain register a specified amount of times.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/dap/dap.ts#L117
    async readRegRepeat(regId, cnt) {
        const request = regRequest(regId);
        const sendargs = [0, cnt];

        for (let i = 0; i < cnt; ++i) {
            sendargs.push(request);
        }

        // Transfer the read requests to the micro:bit and retrieve the data read.
        const buf = await this.cmdNums(DapCmd.DAP_TRANSFER, sendargs);

        if (buf[1] !== cnt) {
            throw new Error("(many) Bad #trans " + buf[1]);
        } else if (buf[2] !== 1) {
            throw new Error("(many) Bad transfer status " + buf[2]);
        }

        return buf.subarray(3, 3 + cnt * 4);
    }

    // Write to a certain register a specified amount of data.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/dap/dap.ts#L138
    async writeRegRepeat(
        regId,
        data
    ) {
        const request = regRequest(regId, true);
        const sendargs = [0, data.length, 0, request];

        data.forEach((d) => {
            // separate d into bytes
            sendargs.push(
                d & 0xff,
                (d >> 8) & 0xff,
                (d >> 16) & 0xff,
                (d >> 24) & 0xff
            );
        });

        // Transfer the write requests to the micro:bit and retrieve the response status.
        const buf = await this.cmdNums(DapCmd.DAP_TRANSFER_BLOCK, sendargs);

        if (buf[3] !== 1) {
            throw new Error("(many-wr) Bad transfer status " + buf[2]);
        }
    }

    // Core functionality reading a block of data from micro:bit RAM at a specified address.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/memory/memory.ts#L181
    async readBlockCore(
        addr,
        words
    ) {
        // Set up CMSIS-DAP to read/write from/to the RAM address addr using the register
        // ApReg.DRW to write to or read from.
        await this.cortexM.writeAP(ApReg.CSW, Csw.CSW_VALUE | Csw.CSW_SIZE32);
        await this.cortexM.writeAP(ApReg.TAR, addr);

        let lastSize = words % 15;
        if (lastSize === 0) {
            lastSize = 15;
        }

        const blocks = [];

        for (let i = 0; i < Math.ceil(words / 15); i++) {
            const b = await this.readRegRepeat(
                apReg(ApReg.DRW, DapVal.READ),
                i === blocks.length - 1 ? lastSize : 15
            );
            blocks.push(b);
        }

        return bufferConcat(blocks).subarray(0, words * 4);
    }

    // Core functionality writing a block of data to micro:bit RAM at a specified address.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/memory/memory.ts#L205
    async writeBlockCore(
        addr,
        words
    ) {
        try {
            // Set up CMSIS-DAP to read/write from/to the RAM address addr using the register ApReg.DRW to write to or read from.
            await this.cortexM.writeAP(ApReg.CSW, Csw.CSW_VALUE | Csw.CSW_SIZE32);
            await this.cortexM.writeAP(ApReg.TAR, addr);

            await this.writeRegRepeat(apReg(ApReg.DRW, DapVal.WRITE), words);
        } catch (e) {
            if (e.dapWait) {
                // Retry after a delay if required.
                this.log(`Transfer wait, write block`);
                await new Promise((resolve) => setTimeout(resolve, 100));
                return await this.writeBlockCore(addr, words);
            } else {
                throw e;
            }
        }
    }

    // Reads a block of data from micro:bit RAM at a specified address.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/memory/memory.ts#L143
    async readBlockAsync(addr, words) {
        const bufs = [];
        const end = addr + words * 4;
        let ptr = addr;

        // Read a single page at a time.
        while (ptr < end) {
            let nextptr = ptr + this.pageSize();
            if (ptr === addr) {
                nextptr &= ~(this.pageSize() - 1);
            }
            const len = Math.min(nextptr - ptr, end - ptr);
            bufs.push(await this.readBlockCore(ptr, len >> 2));
            ptr = nextptr;
        }
        const result = bufferConcat(bufs);
        return result.subarray(0, words * 4);
    }

    // Writes a block of data to micro:bit RAM at a specified address.
    async writeBlockAsync(address, data) {
        let payloadSize = this.transport.packetSize - 8;
        if (data.buffer.byteLength > payloadSize) {
            let start = 0;
            let end = payloadSize;

            // Split write up into smaller writes whose data can each be held in a single packet.
            while (start !== end) {
                let temp = new Uint32Array(data.buffer.slice(start, end));
                await this.writeBlockCore(address + start, temp);

                start = end;
                end = Math.min(data.buffer.byteLength, end + payloadSize);
            }
        } else {
            await this.writeBlockCore(address, data);
        }
    }

    // Execute code at a certain address with specified values in the registers.
    // Waits for execution to halt.
    async executeAsync(address, code, sp, pc, lr, registers) {
        if (registers.length > 12) {
            throw new Error(`Only 12 general purpose registers but got ${registers.length} values`);
        }
        await this.cortexM.halt(true);
        await this.writeBlockAsync(address, code);
        await this.cortexM.writeCoreRegister(CoreRegister.PC, pc);
        await this.cortexM.writeCoreRegister(CoreRegister.LR, lr);
        await this.cortexM.writeCoreRegister(CoreRegister.SP, sp);
        for (var i = 0; i < registers.length; ++i) {
            await this.cortexM.writeCoreRegister(i, registers[i]);
        }
        await this.cortexM.resume(true);
        return this.waitForHalt();
    }

    // Checks whether the micro:bit has halted or timeout has been reached.
    // Recurses otherwise.
    async waitForHaltCore(halted, deadline) {
        if (new Date().getTime() > deadline) {
            throw new Error("timeout");
        }
        if (!halted) {
            const isHalted = await this.cortexM.isHalted();
            // NB this is a Promise so no stack risk.
            return this.waitForHaltCore(isHalted, deadline);
        }
    }

    // Initial function to call to wait for the micro:bit halt.
    async waitForHalt(timeToWait = 10000) {
        const deadline = new Date().getTime() + timeToWait;
        return this.waitForHaltCore(false, deadline);
    }

    // Resets the micro:bit in software by writing to NVIC_AIRCR.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/cortex/cortex.ts#L347
    async softwareReset() {
        await this.cortexM.writeMem32(
            CortexSpecialReg.NVIC_AIRCR,
            CortexSpecialReg.NVIC_AIRCR_VECTKEY |
            CortexSpecialReg.NVIC_AIRCR_SYSRESETREQ
        );

        // wait for the system to come out of reset
        let dhcsr = await this.cortexM.readMem32(CortexSpecialReg.DHCSR);

        while ((dhcsr & CortexSpecialReg.S_RESET_ST) !== 0) {
            dhcsr = await this.cortexM.readMem32(CortexSpecialReg.DHCSR);
        }
    }

    // Reset the micro:bit, possibly halting the core on reset.
    // Drawn from https://github.com/mmoskal/dapjs/blob/a32f11f54e9e76a9c61896ddd425c1cb1a29c143/src/cortex/cortex.ts#L248
    async reset(halt = false) {
        if (halt) {
            await this.cortexM.halt(true);

            // VC_CORERESET causes the core to halt on reset.
            const demcr = await this.cortexM.readMem32(CortexSpecialReg.DEMCR);
            await this.cortexM.writeMem32(
                CortexSpecialReg.DEMCR,
                CortexSpecialReg.DEMCR | CortexSpecialReg.DEMCR_VC_CORERESET
            );

            await this.softwareReset();
            await this.waitForHalt();

            // Unset the VC_CORERESET bit
            await this.cortexM.writeMem32(CortexSpecialReg.DEMCR, demcr);
        } else {
            await this.softwareReset();
        }
    }
}

window.DAPWrapper = DAPWrapper;

})();