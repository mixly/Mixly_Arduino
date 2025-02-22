"""
Debugnet(HTTP,MQTT)

MicroPython library for network request debugging
=======================================================

#Preliminary composition            20230225

@dahanzimin From the Mixly Team
"""
import time
from umqtt import MQTTClient
from ubinascii import hexlify
from machine import unique_id
from urequests import Response
from usocket import socket,getaddrinfo,SOCK_STREAM
from mixiot import WILL_TOPIC,ADDITIONAL_TOPIC

class socket_d(socket):
    def __init__(self,*args,debug=False,**kw):
        super().__init__(*args,**kw)
        self._debug=debug
        self.client_len=0
        self.server_len=0

    def write(self,*args):
        super().write(*args)
        self.client_len=min(self.client_len+len(args[0]),65535)
        if self._debug:
            print('client:',args[0])
 
    def readline(self,*args):
        buf=super().readline(*args)
        self.server_len=min(self.server_len+len(buf),65535) if buf else self.server_len
        if self._debug:
            print('server:',buf)
        return buf

    def read(self,*args):
        buf=super().read(*args)
        self.server_len=min(self.server_len+len(buf),65535) if buf else self.server_len
        if self._debug:
            print('server:',buf)
        return buf

#HTTP
def request(method, url, data=None, json=None, headers={}, stream=None, parse_headers=True, debug=False):
    redir_cnt = 1
    while True:
        try:
            proto, dummy, host, path = url.split("/", 3)
        except ValueError:
            proto, dummy, host = url.split("/", 2)
            path = ""
        if proto == "http:":
            port = 80
        elif proto == "https:":
            import ussl
            port = 443
        else:
            raise ValueError("Unsupported protocol: " + proto)
        if ":" in host:
            host, port = host.split(":", 1)
            port = int(port)
        ai = getaddrinfo(host, port, 0, SOCK_STREAM)
        ai = ai[0]
        resp_d = None
        if parse_headers is not False:
            resp_d = {}
        s = socket_d(ai[0], ai[1], ai[2], debug=debug)
        try:
            s.connect(ai[-1])
            if proto == "https:":
                s = ussl.wrap_socket(s, server_hostname=host)
            s.write(b"%s /%s HTTP/1.0\r\n" % (method, path))
            if not "Host" in headers:
                s.write(b"Host: %s\r\n" % host)
            for k in headers:
                s.write(k)
                s.write(b": ")
                s.write(headers[k])
                s.write(b"\r\n")
            if json is not None:
                assert data is None
                import ujson
                data = ujson.dumps(json)
                s.write(b"Content-Type: application/json\r\n")
            if data:
                s.write(b"Content-Length: %d\r\n" % len(data))
            s.write(b"Connection: close\r\n\r\n")
            if data:
                s.write(data)
            l = s.readline()
            l = l.split(None, 2)
            status = int(l[1])
            reason = ""
            if len(l) > 2:
                reason = l[2].rstrip()
            while True:
                l = s.readline()
                if not l or l == b"\r\n":
                    break
                if l.startswith(b"Transfer-Encoding:"):
                    if b"chunked" in l:
                        raise ValueError("Unsupported " + l)
                elif l.startswith(b"Location:") and 300 <= status <= 399:
                    if not redir_cnt:
                        raise ValueError("Too many redirects")
                    redir_cnt -= 1
                    url = l[9:].decode().strip()
                    status = 300
                    break
                if parse_headers is False:
                    pass
                elif parse_headers is True:
                    l = l.decode()
                    k, v = l.split(":", 1)
                    resp_d[k] = v.strip()
                else:
                    parse_headers(l, resp_d)
        except OSError:
            s.close()
            raise
        if status != 300:
            break
    resp = Response(s)
    resp.status_code = status
    resp.reason = reason
    resp.client_len=s.client_len
    resp.server_len=s.server_len
    if resp_d is not None:
        resp.headers = resp_d
    return resp

class MQTT_Client(MQTTClient):
    def __init__(self,*args,debug=False,**kw):
        super().__init__(*args,**kw)
        self.sock = socket_d(debug=debug)

    @property
    def client_len(self):           #The length of client data obtained
        _len=self.sock.client_len
        self.sock.client_len=0
        return _len

    @property
    def server_len(self):           #The length of server data obtained
        _len=self.sock.server_len
        self.sock.server_len=0
        return _len

    def time_msg(self,utc=28800):   #Get server time information
        msg=self.wait_msg()
        if isinstance(msg, dict):
            if msg['topic'] =='$SYS/hello':
                val=time.gmtime(int(msg['msg'])//1000-946684800+utc)[0:7]
                return str(val).replace(' ','')[1:-1]

#MQTT
def init_MQTT_client(address, username, password, MQTT_USR_PRJ, debug=False):
    client = MQTT_Client(hexlify(unique_id()), address, 1883, username, password, debug=debug)
    client.set_last_will(topic=MQTT_USR_PRJ+WILL_TOPIC, msg=client.client_id, qos=2)
    if client.connect()==0:
        client.publish(MQTT_USR_PRJ+ADDITIONAL_TOPIC, client.client_id, qos=0)
    time.sleep_ms(200)
    return client
