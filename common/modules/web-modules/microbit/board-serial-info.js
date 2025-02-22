(() => {

/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
class BoardSerialInfo {

    constructor(id, familyId, hic) { 
        this.id = id;
        this.familyId = familyId;
        this.hic = hic;
    }

    static parse(device, log) {
        const serial = device.serialNumber;
        if (!serial) {
            throw new Error("Could not detected ID from connected board.");
        }
        if (serial.length !== 48) {
            log(`USB serial number unexpected length: ${serial.length}`);
        }
        const id = serial.substring(0, 4);
        const familyId = serial.substring(4, 8);
        const hic = serial.slice(-8);
        return new BoardSerialInfo(BoardId.parse(id), familyId, hic);
    }

    eq(other) {
        return (
            other.id === this.id &&
            other.familyId === this.familyId &&
            other.hic === this.hic
        );
    }
}

window.BoardSerialInfo = BoardSerialInfo;

})();