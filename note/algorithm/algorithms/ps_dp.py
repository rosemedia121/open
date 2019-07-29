import re

p1 = re.compile('^[1-9]$|^20$|^10$')
p2 = re.compile('^2[1-6]$|^1[1-9]$')
p3 = re.compile('^0')
memo = {}

def solution01(num_str):
    if p1.match(num_str):
        return 1
    elif p2.match(num_str):
        return 2
    elif p3.match(num_str):
        return 0
    elif len(num_str) > 2:
        sl = len(num_str)
        global memo
        if(not sl in memo):
            memo[sl]=solution01(num_str[1:]) + solution01(num_str[2:])
        return memo[sl]
    else:
        return 0 

result = solution01('11')
print(f'result : {result}')
print(f'result : {memo}')
