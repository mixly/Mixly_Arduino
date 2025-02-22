import turtle

def Fibonacci(n):
    if n <= 2:
        fib = 1
    else:
        fib = Fibonacci(n - 1) + Fibonacci(n - 2)
    return fib



tina= turtle.Turtle()
for i in range(1, 14, 1):
    m = Fibonacci(i)
    tina.circle (m,90)
tina.hideturtle()
