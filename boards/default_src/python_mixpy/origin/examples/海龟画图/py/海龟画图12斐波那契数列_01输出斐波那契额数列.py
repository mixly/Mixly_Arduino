import turtle

def Fibonacci(n):
    if n <= 2:
        fib = 1
    else:
        fib = Fibonacci(n - 1) + Fibonacci(n - 2)
    return fib



tina= turtle.Turtle()
for i in range(1, 11, 1):
    m = Fibonacci(i)
    if i != 10:
        tina.write(str(m) + "，",False,align="left",font=("Arial",18,"normal"))
    else:
        tina.write(str(m),False,align="left",font=("Arial",18,"normal"))
    tina.penup()
    tina.forward(30)
    tina.pendown()
tina.hideturtle()
