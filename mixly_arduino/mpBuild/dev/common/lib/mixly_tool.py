import hashlib
import os

def sha1_file(f):
    if f not in set(os.listdir(".")):
        return 'None:::sha1_file_end'
    else:
        sha = hashlib.sha1()
        with open(f, encoding='utf-8') as fd:
            file_buffer = fd.read(128).encode("utf-8")
            while len(file_buffer) > 0:
                sha.update(file_buffer)
                file_buffer = fd.read(128).encode("utf-8")
            h = sha.digest()
            return ''.join(['%.2x' % i for i in h]) + ":::sha1_file_end"

def reload(mod):
    import sys
    mod_name = mod.__name__
    try:
        del sys.modules[mod_name]
        __import__(mod_name)
    except:
        pass