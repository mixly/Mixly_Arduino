try:
    import os
except ImportError:
    import uos as os

def listdir(directory):
    result = set()

    def _listdir(dir_or_file):
        try:
            # if its a directory, then it should provide some children.
            children = os.listdir(dir_or_file)
        except OSError:
            # probably a file. run stat() to confirm.
            os.stat(dir_or_file)
            result.add(dir_or_file) 
        else:
            # probably a directory, add to result if empty.
            if children:
                # queue the children to be dealt with in next iteration.
                for child in children:
                    # create the full path.
                    if dir_or_file == '/':
                        next = dir_or_file + child
                    else:
                        next = dir_or_file + '/' + child
                    
                    _listdir(next)
            else:
                result.add(dir_or_file)

    _listdir(directory)
    return sorted(result)

print(listdir('{{&path}}'))