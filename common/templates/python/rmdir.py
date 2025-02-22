try:
    import os
except ImportError:
    import uos as os
def rmdir(directory):
    os.chdir(directory)
    for f in os.listdir():
        try:
            os.remove(f)
        except OSError:
            pass
    for f in os.listdir():
        rmdir(f)
    os.chdir('..')
    os.rmdir(directory)
rmdir('{{&path}}')