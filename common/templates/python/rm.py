try:
    import os
except ImportError:
    import uos as os
os.remove('{{&path}}')