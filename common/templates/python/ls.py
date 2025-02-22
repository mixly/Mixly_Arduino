try:
    import os
except ImportError:
    import uos as os

def check_path(path):
    try:
        stat = os.stat(path)
        # The first element of stat contains the file type and permission information
        # The mode index of the tuple returned by os.stat() is 0
        mode = stat[0]
        # To determine whether it is a directory, check the directory bit in stat mode
        if mode & 0o170000 == 0o040000:
            if len(os.listdir(path)):
                return 'dir'
            else:
                return 'empty dir'
        # To determine whether it is a file, check the file position in stat mode
        elif mode & 0o170000 == 0o100000:
            return 'file'
        else:
            return 'special file'
    except OSError:
        return 'none'

def listdir(directory):
    output = []
    if directory == '/':
        dirs = sorted([directory + f for f in os.listdir(directory)])
    else:
        dirs = sorted([directory + '/' + f for f in os.listdir(directory)])

    for dir in dirs:
        info = check_path(dir)
        if info == 'none':
            continue
        output.append([dir, info])
    return output

print(listdir('{{&path}}'))