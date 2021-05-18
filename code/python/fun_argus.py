#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import functools
# def f(x):
#     return x * x
# r =  map( f, [1, 2, 3, 4, 5, 6, 7, 8, 9])
#
#
#
#
# print (list(r))
# print ([x*x for x in range(10)])
#
#
# def build(x, y):
#     return lambda: x * x + y * y
#
# print(build(1,3)())
# #lambda 作为匿名函数的的标识符号;
#
# tt =  range(1, 20)
#
# for val in range(1, 20):
#     print (val)



# def log(func):
#
#     def wrapper(name1,*args,**kwargs):
#         print('call %s():' % func.__name__)
#         print ("我在这里打印的")
#         print(name1)
#         print (args,kwargs)
#         f()
#         return func(name1,*args,**kwargs)
#     def f():
#         print (3)
#     return wrapper
# @log
# def now(name1,*args,**kwargs):
#     print (args,kwargs)
#
# now(1,2,city=1,name=3)


#带参数的装饰器；

def log(text):
    def decorator(fun):
        @functools.wraps(fun)
        def warpper(name,*args,**kwargs):
               if text == "exit1":
                   print (1)
               else:
                    print(name,text)
               return fun(name,*args,**kwargs)
        return warpper
    return decorator
@log("exit")
def now2(name):
    print ("我是第一次打的")
    print (name)

@log("exit1")
def now3(name):
    print ("我是第一次打的")
    print (name)

now2("竹雪")

now3("张")








