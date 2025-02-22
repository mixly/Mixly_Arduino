"""
Radio-ESP-NOW

Micropython library for the Radio-ESP-NOW 
=======================================================
@dahanzimin From the Mixly Team 
"""
try:
    from esp import espnow
    version = 0
except:
    import espnow
    version = 1
from ubinascii import hexlify, unhexlify
import network

class ESPNow(espnow.ESPNow):
    def __init__(self, channel=1, txpower=20):
        super().__init__()
        self.active(True)
        self._channel = channel
        self._txpower = txpower
        self._on_handle = {}
        self._nic = network.WLAN(network.STA_IF) #if version else network.WLAN(network.AP_IF)
        self._nic.active(True)
        self._nic.config(channel=self._channel, txpower=self._txpower)

    def encrypt(self, peer, pmk, add_peer=True):
        super().set_pmk((pmk + "0" *16)[:16].encode())
        if add_peer:
            super().add_peer(unhexlify(peer), encrypt=True)
        else:
            super().del_peer(unhexlify(peer))

    def send(self, peer='ffffffffffff', msg=''):
        '''Send data after error reporting and effective processing'''
        try:
            _peer = unhexlify(peer)
            return super().send(_peer, str(msg))
        except OSError as err:
            if len(err.args) < 2:
                raise err
            if err.args[1] == 'ESP_ERR_ESPNOW_NOT_INIT':
                raise OSError("Radio(ESPNOW) is not activated, unable to transmit data")
            elif err.args[1] == 'ESP_ERR_ESPNOW_IF':
                self._nic.active(True)
            elif err.args[1] == 'ESP_ERR_ESPNOW_NOT_FOUND':
                super().add_peer(_peer, channel=self._channel)
                return super().send(_peer, str(msg))
            elif err.args[1] == 'ESP_ERR_ESPNOW_NO_MEM':
                raise OSError("internal ESP-NOW buffers are full")
            elif err.args[1] == 'ESP_ERR_ESPNOW_ARG':
                raise OSError("invalid argument")
            else:
                raise err

    def recv(self):
        '''Receive data'''
        if self.any():
            host, msg = super().recv()
            return hexlify(host).decode(),msg.decode()
        else :
            return None,None

    def set_channel(self, channel=None, txpower=None):
        self._channel = self._channel if channel is None else channel
        self._nic.config(channel=self._channel, txpower=self._txpower if txpower is None else txpower)

    def _cb_handle0(self, event_code, data):
        '''Callback processing conversion'''
        if self._on_handle:
            if isinstance(self._on_handle, list):
                for func in self._on_handle:
                    cmd = func.__name__.rfind('__')
                    if cmd != -1:
                        cmd=func.__name__[cmd+2:]
                        if cmd == str(data[1].decode()):
                            func(hexlify(data[0]).decode(), data[1].decode())
                    else:
                        func(hexlify(data[0]).decode(), data[1].decode())
            elif isinstance(self._on_handle, dict):
                mac = hexlify(data[0]).decode()
                decoded_msg = str(data[1].decode())
                if '__all__' in self._on_handle:
                    self._on_handle['__all__'](mac, decoded_msg)
                if decoded_msg in self._on_handle:
                    self._on_handle[decoded_msg](mac, decoded_msg)
            else:
                self._on_handle(hexlify(data[0]).decode(), data[1].decode())

    def _cb_handle1(self, ee):
        '''Callback processing conversion'''
        host, msg = super().recv() 
        if self._on_handle:
            if isinstance(self._on_handle, list):
                for func in self._on_handle:
                    cmd = func.__name__.rfind('__')
                    if cmd != -1:
                        cmd=func.__name__[cmd+2:]
                        if cmd == str(msg.decode()):
                            func(hexlify(host).decode(), msg.decode())
                    else:
                        func(hexlify(host).decode(), msg.decode())
            elif isinstance(self._on_handle, dict):
                mac = hexlify(host).decode()
                decoded_msg = str(msg.decode())
                if '__all__' in self._on_handle:
                    self._on_handle['__all__'](mac, decoded_msg)
                if decoded_msg in self._on_handle:
                    self._on_handle[decoded_msg](mac, decoded_msg)
            else:
                self._on_handle(hexlify(host).decode(), msg.decode())

    def recv_cb(self, *args):
        '''Receive callback'''
        if isinstance(args[0], str):
            self._on_handle[args[0]] = args[1]
        else:
            self._on_handle = args[0]
        if args[0]:
            if version == 0:
                self.irq(self._cb_handle0)
            else:
                self.irq(self._cb_handle1)

    def info(self):
        '''Get the paired Mac and rssi'''
        _info=[]
        for i in self.peers_table:
            _info.append((hexlify(i).decode(), self.peers_table[i][0]))
        return _info

    @property
    def mac(self):
        '''Get mac address'''
        return hexlify(self._nic.config('mac')).decode()

    @property
    def channel(self):
        '''Get channel address'''
        return self._nic.config('channel')
