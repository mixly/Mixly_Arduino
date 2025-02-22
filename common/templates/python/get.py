import sys
import ubinascii
with open('{{&path}}', 'rb') as infile:
    while True:
        result = infile.read(32)
        if result == b'':
            break
        len = sys.stdout.write(ubinascii.hexlify(result))