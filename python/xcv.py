import os


import cv2


print(cv2)


import time, threading

def loop():
    print ('thread %s is running...' % threading.current_thread().name)



print(os.name)
print( os.uname())
print( os.environ.get('PATH') )
print( os.path.abspath('.') )

os.rmdir('zx')








with open("package.json","r") as f:
    print(123)
    print(f.read())


