try:
    import os
except ImportError:
    import uos as os

os.rename('{{&oldPath}}', '{{&newPath}}')