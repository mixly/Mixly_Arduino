"""
Bluetooth-HID-Mouse

Micropython  library for the Bluetooth-HID-Mouse
=======================================================
#https://github.com/Heerkog/MicroPythonBLEHID

@dahanzimin From the Mixly Team 
"""
import bluetooth
import struct, time
from micropython import const
from ubinascii import hexlify
from ble_advertising import advertising_payload
from bluetooth import UUID, FLAG_READ, FLAG_WRITE ,FLAG_NOTIFY, FLAG_WRITE_NO_RESPONSE

_IRQ_CENTRAL_CONNECT    = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_MTU_EXCHANGED      = const(21)
_IRQ_CONNECTION_UPDATE  = const(27)
_IRQ_GET_SECRET         = const(29)
_IRQ_SET_SECRET         = const(30)
_IRQ_PASSKEY_ACTION     = const(31)
_PASSKEY_ACTION_INPUT   = const(2)
_PASSKEY_ACTION_DISP    = const(3)
_PASSKEY_ACTION_NUMCMP  = const(4)

_HID_INPUT_REPORT = const(b'\x05\x01\t\x02\xa1\x01\x85\x01\t\x01\xa1\x00\x05\t\x19\x01)\x03\x15\x00%\x01\x95\x03u\x01\x81\x02\x95\x01u\x05\x81\x03\x05\x01\t0\t1\t8\x15\x81%\x7fu\x08\x95\x03\x81\x06\xc0\xc0')

_DIS = (UUID(0x180A), ( (UUID(0x2A24), FLAG_READ),
                        (UUID(0x2A25), FLAG_READ),
                        (UUID(0x2A26), FLAG_READ),
                        (UUID(0x2A27), FLAG_READ),
                        (UUID(0x2A28), FLAG_READ),
                        (UUID(0x2A29), FLAG_READ),
                        (UUID(0x2A50), FLAG_READ), ), )

_BAS = (UUID(0x180F), ( (UUID(0x2A19), FLAG_READ | FLAG_NOTIFY, (
                        (UUID(0x2902), 0x01 | 0x02),
                        (UUID(0x2904), 0x01),)), ), )

_HIDS = (UUID(0x1812), ((UUID(0x2A4A), FLAG_READ),
                        (UUID(0x2A4B), FLAG_READ),
                        (UUID(0x2A4C), FLAG_READ | FLAG_WRITE | FLAG_WRITE_NO_RESPONSE),
                        (UUID(0x2A4D), FLAG_READ | FLAG_NOTIFY, (
                        (UUID(0x2902), 0x01 | 0x02),
                        (UUID(0x2908), 0x01 | 0x02), )),
                        (UUID(0x2A4E), FLAG_READ | FLAG_WRITE | FLAG_WRITE_NO_RESPONSE), ), )

class Mouse:
    def __init__(self, name=None, passkey=1234, battery_level=100):
        if (name is '') or (name is None):
            name = "Mixgo_" + self.mac[-6:].upper()
            print("Mouse name:", name)

        self._ble = bluetooth.BLE()
        self._ble.active(True)
        self._ble.irq(self._irq)
        self._ble.config(gap_name=name)
        self._ble.config(mtu=23)
        self.device_state = False
        self.conn_handle = None
        self.passkey = passkey
        self.battery_level = battery_level
        try:
            import ble_hid_key
            self.keys = ble_hid_key.keys
        except:
            self.keys = {} 

        handles = self._ble.gatts_register_services((_DIS, _BAS, _HIDS))
        self._service_characteristics(handles)
        self._payload = advertising_payload(name=name, services=[UUID(0x1812)], appearance=const(962))
        self.advertise()

    def _irq(self, event, data):
        # Interrupt request callback function
        if event == _IRQ_CENTRAL_CONNECT:
            self.conn_handle, _, _ = data
            print("Mouse connected: ", self.conn_handle)
            self.device_state = True
        elif event == _IRQ_CENTRAL_DISCONNECT:
            self.conn_handle = None
            conn_handle, addr_type, addr = data
            print("Mouse disconnected: ", conn_handle)
            self.advertise()
            self.device_state = False
        elif event == _IRQ_MTU_EXCHANGED:
            conn_handle, mtu = data
            self._ble.config(mtu=mtu)
            print("MTU exchanged: ", mtu)
        elif event == _IRQ_CONNECTION_UPDATE:
            self.conn_handle, _, _, _, _ = data
            print("Connection update")
        elif event == _IRQ_PASSKEY_ACTION:
            conn_handle, action, passkey = data
            print("Passkey action", conn_handle, action, passkey)
            if action == _PASSKEY_ACTION_NUMCMP:
                self._ble.gap_passkey(conn_handle, action, False)
            elif action == _PASSKEY_ACTION_DISP:
                print("Displaying passkey")
                self._ble.gap_passkey(conn_handle, action, self.passkey)
            elif action == _PASSKEY_ACTION_INPUT:
                print(" Prompting for passkey")
                self._ble.gap_passkey(conn_handle, action, None)
            else:
                print("unknown action")
        elif event == _IRQ_SET_SECRET:
            sec_type, key, value = data
            key = sec_type, bytes(key)
            value = bytes(value) if value else None
            #print("Set secret: ", key, value)
            if value is None:
                if key in self.keys:
                    del self.keys[key]
                    self.key_secrets(self.keys)
                    return True
                else:
                    return False
            else:
                self.keys[key] = value
                self.key_secrets(self.keys)
            return True
        elif event == _IRQ_GET_SECRET:
            sec_type, index, key = data
            #print("Get secret: ", sec_type, index, bytes(key) if key else None)
            if key is None:
                i = 0
                for (t, _key), value in self.keys.items():
                    if t == sec_type:
                        if i == index:
                            return value
                        i += 1
                return None
            else:
                key = sec_type, bytes(key)
                return self.keys.get(key, None)
        #else:
            #print("Unhandled IRQ event: ", event, data)

    def key_secrets(self, keys={}):
        with open("ble_hid_key.py", "w+") as s_f:
            s_f.write("keys=" + str(keys) + "\n")

    def _service_characteristics(self, handles):
        (h_mod, h_ser, h_fwr, h_hwr, h_swr, h_man, h_pnp) = handles[0]
        (self.h_bat, h_ccc, h_bfmt,) = handles[1] 
        (h_info, h_hid, h_ctrl, self.h_rep, _, h_d1, h_proto) = handles[2]  

        # Write DIS characteristics.
        self._ble.gatts_write(h_mod, b'1')
        self._ble.gatts_write(h_ser, b'1')
        self._ble.gatts_write(h_fwr, b'1')
        self._ble.gatts_write(h_hwr, b'1')
        self._ble.gatts_write(h_swr, b'1')
        self._ble.gatts_write(h_man, b'Homebrew')
        self._ble.gatts_write(h_pnp, struct.pack("<BHHH", 0x01, 0xFE61, 0x01, 0x0123))
        # Write BAS characteristics.
        self._ble.gatts_write(self.h_bat, struct.pack("<B", self.battery_level))
        self._ble.gatts_write(h_bfmt, b'\x04\x00\xad\x27\x01\x00\x00')
        self._ble.gatts_write(h_ccc, b'\x00\x00')
        # Write service characteristics
        self._ble.gatts_write(h_info, b"\x01\x01\x00\x02")
        self._ble.gatts_write(h_hid, _HID_INPUT_REPORT)
        self._ble.gatts_write(self.h_rep, b'\x00\x00\x00\x00')
        self._ble.gatts_write(h_d1, b'\x01\x01')
        self._ble.gatts_write(h_proto, b"\x01")

    def is_connected(self):
        return self.device_state

    def advertise(self, interval_us=100000):
        print("Starting advertising")
        self._ble.gap_advertise(interval_us, adv_data=self._payload)

    def notify_hid(self, keys=0, move=(0, 0), wheel=0, release=True):
        if self.is_connected():
            # Pack the mouse state as described by the input report
            self._ble.gatts_notify(self.conn_handle, self.h_rep, bytes([keys & 0x0F, move[0] & 0xFF, move[1] & 0xFF, wheel & 0xFF]))
            if release:
                time.sleep_ms(10)
                self._ble.gatts_notify(self.conn_handle, self.h_rep, b'\x00\x00\x00\x00')

    def notify_battery(self, level):
        if self.is_connected():
            self.battery_level = max(min(level, 100), 0)
            # Notifies the client by writing to the battery level handle.
            self._ble.gatts_notify(self.conn_handle, self.h_bat, struct.pack("<B", self.battery_level))

    @property 
    def mac(self):
        '''Get mac address'''
        return hexlify(self._ble.config('mac')[1]).decode()
