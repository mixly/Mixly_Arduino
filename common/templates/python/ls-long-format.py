try:
    import os
except ImportError:
    import uos as os

def listdir(directory):
    try:
        if directory == '/':
            return sorted([directory + f for f in os.listdir(directory)])
        else:
            return sorted([directory + '/' + f for f in os.listdir(directory)])
    except:
        return sorted([f for f in os.listdir()])

r = []
for f in listdir('{{&path}}'):
    try:
        size = os.stat(f)[6]
    except:
        size = os.size(f)
    r.append([f, size])
print(r)