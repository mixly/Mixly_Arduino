"""
Bluetooth-HID

Micropython  library for the Bluetooth-HID(Compliant with equipment)
=======================================================
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
_IRQ_GATTS_WRITE        = const(3)
_IRQ_MTU_EXCHANGED      = const(21)
_IRQ_CONNECTION_UPDATE  = const(27)
_IRQ_GET_SECRET         = const(29)
_IRQ_SET_SECRET         = const(30)
_IRQ_PASSKEY_ACTION     = const(31)
_PASSKEY_ACTION_INPUT   = const(2)
_PASSKEY_ACTION_DISP    = const(3)
_PASSKEY_ACTION_NUMCMP  = const(4)

#HID 鼠标、键盘、手柄设备报告描述符
_HID_INPUT_REPORT   = const(b'\x05\x01\t\x02\xa1\x01\x85\x01\t\x01\xa1\x00\x05\t\x19\x01)\x03\x15\x00%\x01\x95\x03u\x01\x81\x02\x95\x01u\x05\x81\x03\x05\x01\t0\t1\t8\x15\x81%\x7fu\x08\x95\x03\x81\x06\xc0\xc0\x05\x01\t\x06\xa1\x01\x85\x02u\x01\x95\x08\x05\x07\x19\xe0)\xe7\x15\x00%\x01\x81\x02\x95\x01u\x08\x81\x01\x95\x05u\x01\x05\x08\x19\x01)\x05\x91\x02\x95\x01u\x03\x91\x01\x95\x06u\x08\x15\x00%e\x05\x07\x19\x00)e\x81\x00\xc0\x05\x01\t\x04\xa1\x01\x85\x03\xa1\x00\t0\t1\x15\x81%\x7fu\x08\x95\x02\x81\x02\x05\t)\x08\x19\x01\x95\x08u\x01%\x01\x15\x00\x81\x02\xc0\xc0')
_KEYCODE            = const(b'\x00\x00\x00\x00\x00\x00\x00\x00*+(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00)\x00\x00\x00\x00,\x9e\xb4\xa0\xa1\xa2\xa44\xa6\xa7\xa5\xae6-78\'\x1e\x1f !"#$%&\xb33\xb6.\xb7\xb8\x9f\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d/10\xa3\xad5\x04\x05\x06\x07\x08\t\n\x0b\x0c\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\xaf\xb1\xb0\xb5L')

_DIS = (UUID(0x180A), ( (UUID(0x2A24), FLAG_READ),
                        (UUID(0x2A25), FLAG_READ),
                        (UUID(0x2A26), FLAG_READ),
                        (UUID(0x2A27), FLAG_READ),
                        (UUID(0x2A28), FLAG_READ),
                        (UUID(0x2A29), FLAG_READ),
                        (UUID(0x2A50), FLAG_READ), ), )

_BAS = (UUID(0x180F), ( (UUID(0x2A19), FLAG_READ | FLAG_NOTIFY, ((UUID(0x2902), 0x03), (UUID(0x2904), 0x01),)), ), )

_HIDS = (UUID(0x1812), ((UUID(0x2A4A), FLAG_READ),
                        (UUID(0x2A4B), FLAG_READ),
                        (UUID(0x2A4C), FLAG_READ | FLAG_WRITE | FLAG_WRITE_NO_RESPONSE),
                        (UUID(0x2A4D), FLAG_READ | FLAG_NOTIFY, ((UUID(0x2902), 0x03), (UUID(0x2908), 0x03),)),   #鼠标
                        (UUID(0x2A4D), FLAG_READ | FLAG_NOTIFY, ((UUID(0x2902), 0x03), (UUID(0x2908), 0x03),)),   #键盘发送
                        (UUID(0x2A4D), FLAG_READ | FLAG_WRITE,  ((UUID(0x2902), 0x03), (UUID(0x2908), 0x03),)),   #键盘状态
                        (UUID(0x2A4D), FLAG_READ | FLAG_NOTIFY, ((UUID(0x2902), 0x03), (UUID(0x2908), 0x03),)),   #游戏手柄
                        (UUID(0x2A4E), FLAG_READ | FLAG_WRITE | FLAG_WRITE_NO_RESPONSE), ), )

class HID:
    def __init__(self, name=None, passkey=1234, battery_level=100):
        if (name is '') or (name is None):
            name = "Mixgo_" + self.mac[-6:].upper()
            print("HID Name:", name)

        self._ble = bluetooth.BLE()
        self._ble.active(True)
        self._ble.irq(self._irq)
        self._ble.config(gap_name=name)
        self._ble.config(mtu=23)
        self.device_state = False
        self.conn_handle = None
        self.passkey = passkey
        self.battery_level = battery_level
        self.report = b'\x00'
        try:
            import ble_hid_key
            self.keys = ble_hid_key.keys
        except:
            self.keys = {} 

        handles = self._ble.gatts_register_services((_DIS, _BAS, _HIDS))
        self._service_characteristics(handles)
        self._payload = advertising_payload(name=name, services=[UUID(0x1812)], appearance=const(960))
        self.advertise()

    def _irq(self, event, data):
        # Interrupt request callback function
        if event == _IRQ_CENTRAL_CONNECT:
            self.conn_handle, _, _ = data
            print("HID connected:", self.conn_handle)
            self.device_state = True
        elif event == _IRQ_CENTRAL_DISCONNECT:
            self.conn_handle = None
            conn_handle, addr_type, addr = data
            print("HID disconnected:", conn_handle)
            self.advertise()
            self.device_state = False
        elif event == _IRQ_MTU_EXCHANGED:
            conn_handle, mtu = data
            self._ble.config(mtu=mtu)
            print("MTU exchanged:", mtu)
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
                print("Prompting for passkey")
                self._ble.gap_passkey(conn_handle, action, None)
            else:
                print("Unknown action")
        elif event == _IRQ_GATTS_WRITE:
            conn_handle, attr_handle = data
            self.report = self._ble.gatts_read(attr_handle)
        elif event == _IRQ_SET_SECRET:
            sec_type, key, value = data
            key = sec_type, bytes(key)
            value = bytes(value) if value else None
            #print("Set secret: ", key, value)
            if value is None:
                if key in self.keys:
                    del self.keys[key]
                    self._key_secrets(self.keys)
                    return True
                else:
                    return False
            else:
                self.keys[key] = value
                self._key_secrets(self.keys)
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
        # else:
        #     print("Unhandled IRQ event: ", event, data)

    def _key_secrets(self, keys={}):
        """Save pairing key"""
        with open("ble_hid_key.py", "w+") as s_f:
            s_f.write("keys=" + str(keys) + "\n")

    def _service_characteristics(self, handles):
        """Write BAS&service characteristics."""
        (h_mod, h_ser, h_fwr, h_hwr, h_swr, h_man, h_pnp) = handles[0]
        (self.h_bat, h_ccc, h_bfmt) = handles[1]  
        (h_info, h_hid, _, self.m_rep, _, h_d1, self.k_rep, _, h_d2, _, _, h_d3, self.j_rep, _, h_d4, h_proto) = handles[2] 
        # Write DIS characteristics.
        self._ble.gatts_write(h_mod, b'1')
        self._ble.gatts_write(h_ser, b'1')
        self._ble.gatts_write(h_fwr, b'1')
        self._ble.gatts_write(h_hwr, b'1')
        self._ble.gatts_write(h_swr, b'1')
        self._ble.gatts_write(h_man, b'Homebrew')
        self._ble.gatts_write(h_pnp, b'\x01a\xfe\x01\x00#\x01')
        # Write BAS characteristics.
        self._ble.gatts_write(self.h_bat, struct.pack("<B", self.battery_level))
        self._ble.gatts_write(h_bfmt, b'\x04\x00\xad\x27\x01\x00\x00')
        self._ble.gatts_write(h_ccc, b'\x00\x00')
        # Write service characteristics
        self._ble.gatts_write(h_info, b"\x01\x01\x00\x02")
        self._ble.gatts_write(h_hid, _HID_INPUT_REPORT)
        self._ble.gatts_write(h_d1, b'\x01\x01')
        self._ble.gatts_write(h_d2, b'\x02\x01')
        self._ble.gatts_write(h_d3, b'\x02\x02')
        self._ble.gatts_write(h_d4, b'\x03\x01')
        self._ble.gatts_write(h_proto, b"\x01")

    def is_connected(self):
        '''蓝牙是否连接成功'''
        return self.device_state

    def advertise(self, interval_us=100000):
        '''蓝牙广播'''
        print("Starting advertising")
        self._ble.gap_advertise(interval_us, adv_data=self._payload)

    def battery_notify(self, level):
        '''电池电量%'''
        if self.is_connected():
            self.battery_level = max(min(level, 100), 0)
            self._ble.gatts_notify(self.conn_handle, self.h_bat, struct.pack("<B", self.battery_level))

    def keyboard_state(self):
        '''获取键盘 指示灯状态'''
        return int.from_bytes(self.report, 'big')

    def keyboard_notify(self, special=0, general=0,  release=True):
        '''键盘 特殊按键 + 常规组合按键*6'''
        if self.is_connected():
            _keys = bytearray(6)
            if type(general) in (tuple, list):
                for i in range(len(general)):
                    if i > 5: break
                    _keys[i] = general[i]
            else:
                _keys[0] = general
            self._ble.gatts_notify(self.conn_handle, self.k_rep, bytes([special & 0xFF, 0]) + _keys)
            if release:
                time.sleep_ms(10)
                self._ble.gatts_notify(self.conn_handle, self.k_rep, b'\x00\x00\x00\x00\x00\x00\x00\x00')

    def keyboard_str(self, string, delay=0):
        '''键盘发送ASCLL码'''
        for char in str(string):
            char = max(min(ord(char), 127), 0)
            self.keyboard_notify( 0x02 if _KEYCODE[char] >> 7 else 0x00, _KEYCODE[char] & 0x7F)
            time.sleep_ms(20 + delay)

    def mouse_notify(self, keys=0, move=(0, 0), wheel=0, release=True):
        '''鼠标 按键*3 + 位移 + 滚轮'''
        if self.is_connected():
            self._ble.gatts_notify(self.conn_handle, self.m_rep, bytes([keys & 0x0F, move[0] & 0xFF, move[1] & 0xFF, wheel & 0xFF]))
            if release:
                time.sleep_ms(10)
                self._ble.gatts_notify(self.conn_handle, self.m_rep, b'\x00\x00\x00\x00')

    def Joystick_notify(self, keys=0, axes=(0, 0), release=False):
        '''手柄 按键*8 + 摇杆'''
        if self.is_connected():
            self._ble.gatts_notify(self.conn_handle, self.j_rep, bytes([axes[0] & 0xFF, axes[1] & 0xFF, keys & 0xFF]))
            if release:
                time.sleep_ms(10)
                self._ble.gatts_notify(self.conn_handle, self.j_rep, b'\x00\x00\x00')
    @property
    def mac(self):
        '''Get mac address'''
        return hexlify(self._ble.config('mac')[1]).decode()
