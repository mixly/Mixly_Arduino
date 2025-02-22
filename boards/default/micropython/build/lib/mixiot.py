import time
import usocket as socket
import ustruct as struct
from machine import unique_id
from ubinascii import hexlify
from matcher import MQTTMatcher

ADDITIONAL_TOPIC = 'b640a0ce465fa2a4150c36b305c1c11b'
WILL_TOPIC = '9d634e1a156dc0c1611eb4c3cff57276'

def wlan_connect(ssid='MYSSID', password='MYPASS', timeout=10):
    import network
    wlan = network.WLAN(network.STA_IF)
    if not wlan.active() or not wlan.isconnected():
        wlan.active(True)
        print('connecting to:', ssid, end ="")
        try:
            wlan.connect(ssid, password)
        except:
            pass
        _num = 0
        while not wlan.isconnected():
            _num += 1
            time.sleep(1)
            print('.',end ="")
            if _num > timeout:
                wlan.active(False)
                print('')
                raise RuntimeError("WiFi connection timeout, Please check only 2.4G supported name and password") 
    print('\nnetwork config:', wlan.ifconfig())
    return wlan

def ntp(url='mixio.mixly.cn'):
    import urequests
    try:
        results=eval(urequests.get('http://{}/time.php'.format(url)).text)
    except Exception as e:
        raise RuntimeError("API request failed or WiFi is not connected",e) 
    return results
    
def init_MQTT_client(address, username, password,MQTT_USR_PRJ):
    client = MQTTClient(hexlify(unique_id()), address, 1883, username, password)
    client.set_last_will(topic=MQTT_USR_PRJ+WILL_TOPIC, msg=client.client_id, qos=2)
    if client.connect()==0:
        client.publish(MQTT_USR_PRJ+ADDITIONAL_TOPIC, client.client_id, qos=0)
    time.sleep_ms(200)
    return client

# Add by Mixly Team
def str_len(object):
    if isinstance(object, str):
        return len(object.encode('utf-8'))
    else:
        return len(object)
#####################################################    

class MQTTException(Exception):
    pass

class MQTTClient:
    def __init__(self, client_id, server, port=0, username=None, password=None, keepalive=60, ssl=False, ssl_params={}):
        if port == 0:
            port = 8883 if ssl else 1883
        self.client_id = client_id
        self.sock = None
        self.addr = socket.getaddrinfo(server, port)[0][-1]
        self.ssl = ssl
        self.ssl_params = ssl_params
        self.pid = 0
        self._on_message = None
        self.username = username
        self.password = password
        self.keepalive = keepalive
        self.lw_topic = None
        self.lw_msg = None
        self.lw_qos = 0
        self.lw_retain = False
        self._on_message_filtered = MQTTMatcher()
        self._star_time = time.ticks_ms()

    def _send_str(self, s):
        self.sock.write(struct.pack("!H", str_len(s)))
        self.sock.write(s)

    def _recv_len(self):
        n = 0
        sh = 0
        while 1:
            b = self.sock.read(1)[0]
            n |= (b & 0x7f) << sh
            if not b & 0x80:
                return n
            sh += 7

    def set_callback(self, mqtt_topic, callback_method, MQTT_USR_PRJ):
        """Registers a callback_method for a specific MQTT topic"""
        if mqtt_topic is None or callback_method is None:
            raise ValueError("MQTT topic and callback method must both be defined.")
        self._on_message_filtered[MQTT_USR_PRJ+mqtt_topic] = callback_method

    def remove_callback(self, mqtt_topic):
        """Removes a registered callback method"""
        if mqtt_topic is None:
            raise ValueError("MQTT Topic must be defined.")
        try:
            del self._on_message_filtered[mqtt_topic]
        except KeyError:
            raise KeyError(
                "MQTT topic callback not added with add_topic_callback."
            ) from None    

    @property
    def on_message(self):
        """Called when a new message has been received on a subscribed topic"""
        return self._on_message

    @on_message.setter
    def on_message(self, method):
        self._on_message = method

    def _handle_on_message(self, client, topic, message):
        matched = False
        if topic is not None:
            for callback in self._on_message_filtered.iter_match(topic):
                callback(client, topic.split("/")[-1], message)  # on_msg with callback
                matched = True

        if not matched and self.on_message:  # regular on_message
            self.on_message(client, topic.split("/")[-1], message)

    def set_last_will(self, topic, msg, retain=False, qos=0):
        assert 0 <= qos <= 2
        assert topic
        self.lw_topic = topic
        self.lw_msg = msg
        self.lw_qos = qos
        self.lw_retain = retain
    
    def connect(self, clean_session=True):
        self.sock = socket.socket()
        self.sock.connect(self.addr)
        print(self.addr)
        if self.ssl:
            import ussl
            self.sock = ussl.wrap_socket(self.sock, **self.ssl_params)
        msg_header=bytearray([0x10])
        msg = bytearray(b"\x04MQTT\x04\x02\0\0")
        msg_length = 12 + str_len(self.client_id)
        msg[6] = clean_session << 1
        
        if self.username is not None:
            msg_length += 2 + str_len(self.username) + 2 + str_len(self.password)
            msg[6] |= 0xC0
        if self.keepalive:
            assert self.keepalive < 65536
            msg[7] |= self.keepalive >> 8
            msg[8] |= self.keepalive & 0x00FF
        if self.lw_topic:
            msg_length += 2 + str_len(self.lw_topic) + 2 + str_len(self.lw_msg)
            msg[6] |= 0x4 | (self.lw_qos & 0x1) << 3 | (self.lw_qos & 0x2) << 3
            msg[6] |= self.lw_retain << 5
            
        if msg_length > 0x7F:
            while msg_length>0:
                encoded_byte = msg_length % 0x80
                msg_length = msg_length // 0x80
                if msg_length > 0:
                    encoded_byte |= 0x80
                msg_header.append(encoded_byte)         
            msg_header.append(0x00)
        else:
            msg_header.append(msg_length)
            msg_header.append(0x00)

        self.sock.write(msg_header) 
        self.sock.write(msg)
        #print(hexlify(msg_header, ":"), hexlify(msg, ":"))
        self._send_str(self.client_id)
        if self.lw_topic:
            self._send_str(self.lw_topic)
            self._send_str(self.lw_msg)
        if self.username is not None:
            self._send_str(self.username)
            self._send_str(self.password)
        resp = self.sock.read(4)
        assert resp[0] == 0x20 and resp[1] == 0x02
        if resp[3] != 0:
            if resp[3] == 1:
                raise MQTTException("Unsupported Protocol")
            elif resp[3] == 2:
                raise MQTTException("Illegal ClientID")
            elif resp[3] == 3:
                raise MQTTException("Server Unavailable")
            elif resp[3] == 4:
                raise MQTTException("Invalid username and password format")
            elif resp[3] == 5:
                raise MQTTException("Unauthorized")
            else:
                raise MQTTException(resp[3])
        return resp[2] & 1


    def disconnect(self,MQTT_USR_PRJ):
        #MQTT_USR_PRJ = "{}/{}/".format(self.username,self.project)
        self.publish(MQTT_USR_PRJ+WILL_TOPIC, self.client_id, qos=1)
        self.sock.write(b"\xe0\0")
        self.sock.close()

    def ping(self):
        self.sock.write(b"\xc0\0")
    
    def pingSync(self):
        self.ping()
        for i in range(0,10):
            msg = self.check_msg()
            if msg == "PINGRESP":
                return True
            time.sleep_ms(100)
        return False
        
    def publish(self, topic, msg, retain=False, qos=0):
        # msg = pubData(msg)
        if "+" in topic or "#" in topic:
            raise MQTTException("Publish topic can not contain wildcards.")
        # check msg/qos kwargs
        if msg is None:
            raise MQTTException("Message can not be None.")
        if isinstance(msg, (int, float)):
            msg = str(msg).encode("ascii")
        elif isinstance(msg, str):
            msg = str(msg).encode("utf-8")
        elif isinstance(msg, bytes):
            pass
        else:
            raise MQTTException("Invalid message data type.")
        pkt = bytearray(b"\x30\0\0\0")
        pkt[0] |= qos << 1 | retain
        sz = 2 + str_len(topic) + str_len(msg)
        if qos > 0:
            sz += 2
        assert sz < 2097152
        i = 1
        while sz > 0x7f:
            pkt[i] = (sz & 0x7f) | 0x80
            sz >>= 7
            i += 1
        pkt[i] = sz
        #print(hex(str_len(pkt)), hexlify(pkt, ":"))
        self.sock.settimeout(0.05)
        #self.sock.setblocking(True)
        self.sock.write(pkt, i + 1)
        self._send_str(topic)
        if qos > 0:
            self.pid += 1
            pid = self.pid
            struct.pack_into("!H", pkt, 0, pid)
            self.sock.write(pkt, 2)
        self.sock.write(msg)
        if qos == 1:
            while 1:
                op = self.wait_msg()
                if op == 0x40:
                    sz = self.sock.read(1)
                    assert sz == b"\x02"
                    rcv_pid = self.sock.read(2)
                    rcv_pid = rcv_pid[0] << 8 | rcv_pid[1]
                    if pid == rcv_pid:
                        return
        elif qos == 2:
            assert 0

    def subscribe(self, topic, qos=0):
        #assert self.cb is not None, "Subscribe callback is not set"
        pkt = bytearray(b"\x82\0\0\0")
        self.pid += 1
        if isinstance(topic, str):
            topic=topic.encode()
        struct.pack_into("!BH", pkt, 1, 2 + 2 + str_len(topic) + 1, self.pid)
        #print(hex(str_len(pkt)), hexlify(pkt, ":"))
        self.sock.write(pkt)
        self._send_str(topic)
        self.sock.write(qos.to_bytes(1, "little"))
        while 1:
            op = self.wait_msg()
            if op == 0x90:
                resp = self.sock.read(4)
                #print(resp)
                assert resp[1] == pkt[2] and resp[2] == pkt[3]
                if resp[3] == 0x80:
                    raise MQTTException(resp[3])
                return

    # Wait for a single incoming MQTT message and process it.
    def wait_msg(self):
        res = self.sock.read(1)
        time.sleep_ms(50)
        self.sock.settimeout(0.05)
        #self.sock.setblocking(True)
        if res is None:
            return None
        if res == b"":
            raise OSError(-1)
        if res == b"\xd0":    # PINGRESP
            sz = self.sock.read(1)[0]
            assert sz == 0
            return "PINGRESP"
        op = res[0]
        if op & 0xf0 != 0x30:
            return op
        sz = self._recv_len()
        topic_len = self.sock.read(2)
        topic_len = (topic_len[0] << 8) | topic_len[1]
        topic = self.sock.read(topic_len)
        sz -= topic_len + 2
        if op & 6:
            pid = self.sock.read(2)
            pid = pid[0] << 8 | pid[1]
            sz -= 2
        msg = self.sock.read(sz)
        self._handle_on_message(self, str(topic, "utf-8"), str(msg, "utf-8"))
        if op & 6 == 2:
            pkt = bytearray(b"\x40\x02\0\0")
            struct.pack_into("!H", pkt, 2, pid)
            self.sock.write(pkt)
        elif op & 6 == 4:
            assert 0

    # Checks whether a pending message from server is available.
    def check_msg(self):
        self.sock.settimeout(0.05)
        if time.ticks_diff(time.ticks_ms(), self._star_time) >60000:
            self._star_time = time.ticks_ms()
            self.ping()
        return self.wait_msg()
