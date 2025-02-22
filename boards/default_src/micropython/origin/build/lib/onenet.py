import ujson as json
from umqtt import MQTTClient,str_len

def get_data_dict(d):
    result = {"datastreams":[]}
    for x in d:
        result["datastreams"].append({"id":x,"datapoints":[{"value":d[x]}]})
    return result

def pubData(value, state):    
    value = get_data_dict(value)
    jdata = json.dumps(value)
    jlen = str_len(jdata)
    bdata = bytearray(jlen+3)
    bdata[0] = 1                #publish data in type of json
    bdata[1] = int(jlen / 256)  # data lenght
    bdata[2] = jlen % 256       # data lenght
    bdata[3:jlen+4] = jdata.encode('ascii') # json data
    if state:
        print(value)
        #print(bdata)
    return bdata

def init_MQTT_client(sid, address, cid, api, topic, callback):
    client = MQTT_Client(sid, address, 6002, cid, api)
    client.set_callback(callback)
    client.connect()
    client.subscribe(bytes(topic, 'utf-8'))
    return client

#inherit
class MQTT_Client(MQTTClient):
    def publish(self, msg, is_print=False, topic='$dp', retain=False, qos=0):
        super().publish('$dp',pubData(msg, is_print))
