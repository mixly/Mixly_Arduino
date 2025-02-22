try:
    import os
except ImportError:
    import uos as os

try:
    os.stat('{{&path}}')
except OSError:
    f = open('{{&path}}', 'w')
    f.close()