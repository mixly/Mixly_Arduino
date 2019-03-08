# Copyright (c) 2015-2019 Volodymyr Shymanskyy. See the file LICENSE for copying permission.

_VERSION = "0.2.0"

import struct
import time
import os

try:
    import machine
    gettime = lambda: time.ticks_ms()
except ImportError:
    const = lambda x: x
    gettime = lambda: int(time.time() * 1000)

def dummy(*args):
    pass 

MSG_RSP = const(0)
MSG_LOGIN = const(2)
MSG_PING  = const(6)

MSG_TWEET = const(12)
MSG_EMAIL = const(13)
MSG_NOTIFY = const(14)
MSG_BRIDGE = const(15)
MSG_HW_SYNC = const(16)
MSG_INTERNAL = const(17)
MSG_PROPERTY = const(19)
MSG_HW = const(20)
MSG_HW_LOGIN = const(29)
MSG_EVENT_LOG = const(64)

MSG_REDIRECT  = const(41)  # TODO: not implemented
MSG_DBG_PRINT  = const(55) # TODO: not implemented

STA_SUCCESS = const(200)
STA_INVALID_TOKEN = const(9)

DISCONNECTED = const(0)
CONNECTING = const(1)
CONNECTED = const(2)

print("""
    ___  __          __
   / _ )/ /_ _____  / /__
  / _  / / // / _ \\/  '_/
 /____/_/\\_, /_//_/_/\\_\\
        /___/ for Python v""" + _VERSION + " (" + os.uname()[0] + ")\n")

class BlynkProtocol:
    def __init__(self, auth, heartbeat=10, buffin=1024, log=None):
        self.callbacks = {}
        self.heartbeat = heartbeat*1000
        self.buffin = buffin
        self.log = log or dummy
        self.auth = auth
        self.state = DISCONNECTED
        self.connect()

    def ON(blynk, evt):
        class Decorator:
            def __init__(self, func):
                self.func = func
                blynk.callbacks[evt] = func
            def __call__(self):
                return self.func()
        return Decorator

    # These are mainly for backward-compatibility you can use "blynk.ON()" instead
    def VIRTUAL_READ(blynk, pin):
        class Decorator():
            def __init__(self, func):
                self.func = func
                blynk.callbacks["readV"+str(pin)] = func
            def __call__(self):
                return self.func()
        return Decorator

    def VIRTUAL_WRITE(blynk, pin):
        class Decorator():
            def __init__(self, func):
                self.func = func
                blynk.callbacks["V"+str(pin)] = func
            def __call__(self):
                return self.func()
        return Decorator

    def on(self, evt, func):
        self.callbacks[evt] = func

    def emit(self, evt, *a, **kv):
        self.log("Event:", evt, "->", *a)
        if evt in self.callbacks:
            self.callbacks[evt](*a, **kv)

    def virtual_write(self, pin, *val):
        self._send(MSG_HW, 'vw', pin, *val)

    def set_property(self, pin, prop, *val):
        self._send(MSG_PROPERTY, pin, prop, *val)

    def sync_virtual(self, *pins):
        self._send(MSG_HW_SYNC, 'vr', *pins)

    def notify(self, msg):
        self._send(MSG_NOTIFY, msg)

    def tweet(self, msg):
        self._send(MSG_TWEET, msg)

    def log_event(self, event, descr=None):
        if descr==None:
            self._send(MSG_EVENT_LOG, event)
        else:
            self._send(MSG_EVENT_LOG, event, descr)

    def _send(self, cmd, *args, **kwargs):
        if "id" in kwargs:
            id = kwargs.id
        else:
            id = self.msg_id
            self.msg_id += 1
            if self.msg_id > 0xFFFF:
                self.msg_id = 1
                
        if cmd == MSG_RSP:
            data = b''
            dlen = args[0]
        else:
            data = ('\0'.join(map(str, args))).encode('utf8')
            dlen = len(data)
        
        self.log('<', cmd, id, '|', *args)
        msg = struct.pack("!BHH", cmd, id, dlen) + data
        self.lastSend = gettime()
        self._write(msg)

    def connect(self):
        if self.state != DISCONNECTED: return
        self.msg_id = 1
        (self.lastRecv, self.lastSend, self.lastPing) = (gettime(), 0, 0)
        self.bin = b""
        self.state = CONNECTING
        self._send(MSG_HW_LOGIN, self.auth)

    def disconnect(self):
        if self.state == DISCONNECTED: return
        self.state = DISCONNECTED
        self.emit('disconnected')

    def process(self, data=b''):
        if not (self.state == CONNECTING or self.state == CONNECTED): return
        now = gettime()
        if now - self.lastRecv > self.heartbeat+(self.heartbeat//2):
            return self.disconnect()
        if (now - self.lastPing > self.heartbeat//10 and
            (now - self.lastSend > self.heartbeat or
             now - self.lastRecv > self.heartbeat)):
            self._send(MSG_PING)
            self.lastPing = now
        
        if data != None and len(data):
            self.bin += data

        while True:
            if len(self.bin) < 5: return
            
            cmd, i, dlen = struct.unpack("!BHH", self.bin[:5])
            if i == 0: return self.disconnect()
                      
            self.lastRecv = now
            if cmd == MSG_RSP:
                self.bin = self.bin[5:]

                self.log('>', cmd, i, '|', dlen)
                if self.state == CONNECTING and i == 1:
                    if dlen == STA_SUCCESS:
                        self.state = CONNECTED
                        dt = now - self.lastSend
                        self._send(MSG_INTERNAL, 'ver', _VERSION, 'h-beat', self.heartbeat//1000, 'buff-in', self.buffin, 'dev', 'python')
                        try:
                            self.emit('connected', ping=dt)
                        except TypeError:
                            self.emit('connected')
                    else:
                        if dlen == STA_INVALID_TOKEN:
                            print("Invalid auth token")
                        return self.disconnect()
            else:
                if dlen >= self.buffin:
                    print("Cmd too big: ", dlen)
                    return self.disconnect()
            
                if len(self.bin) < 5+dlen: return
                
                data = self.bin[5:5+dlen]
                self.bin = self.bin[5+dlen:]

                args = list(map(lambda x: x.decode('utf8'), data.split(b'\0')))

                self.log('>', cmd, i, '|', ','.join(args))
                if cmd == MSG_PING:
                    self._send(MSG_RSP, STA_SUCCESS, id=i)
                elif cmd == MSG_HW or cmd == MSG_BRIDGE:
                    if args[0] == 'vw':
                        self.emit("V"+args[1], args[2:])
                        self.emit("V*", args[1], args[2:])
                    elif args[0] == 'vr':
                        self.emit("readV"+args[1])
                        self.emit("readV*", args[1])
                elif cmd == MSG_INTERNAL:
                    self.emit("int_"+args[1], args[2:])
                else:
                    print("Unexpected command: ", cmd)
                    return self.disconnect()

import socket

class Blynk(BlynkProtocol):
    def __init__(self, auth, **kwargs):
        self.server = kwargs.pop('server', 'blynk-cloud.com')
        self.port = kwargs.pop('port', 80)
        BlynkProtocol.__init__(self, auth, **kwargs)

    def connect(self):
        try:
            self.conn = socket.socket()
            self.conn.connect(socket.getaddrinfo(self.server, self.port)[0][4])
            try:
                self.conn.settimeout(eval('0.05'))
            except:
                self.conn.settimeout(0)
            BlynkProtocol.connect(self)
        except:
            raise ValueError('Connection with the Blynk server %s:%d failed' % (self.server, self.port))

    def _write(self, data):
        #print('<', data.hex())
        self.conn.send(data)
        # TODO: handle disconnect

    def run(self):
        data = b''
        try:
            data = self.conn.recv(self.buffin)
            #print('>', data.hex())
        except KeyboardInterrupt:
            raise
        except: # TODO: handle disconnect
            pass
        self.process(data)

