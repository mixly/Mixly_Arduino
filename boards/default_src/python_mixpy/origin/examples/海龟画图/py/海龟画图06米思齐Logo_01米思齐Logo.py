import turtle

tina= turtle.Turtle()
tina.pencolor("#339999")
tina.fillcolor("#339999")
tina.begin_fill()
for i in range(0, 4, 1):
    tina.forward(180)
    tina.circle ((-20),90)
tina.end_fill()
tina.penup()
tina.goto(0,-160)
tina.pendown()
tina.pencolor("#ffffff")
tina.write("m",False,align="left",font=("Ravie",120,"bold"))
tina.fillcolor("#ffffff")
tina.penup()
tina.goto(20,-140)
tina.pendown()
tina.begin_fill()
tina.right(120)
for i in range(0, 10, 1):
    tina.forward(2)
    tina.left(5)
for i in range(0, 5, 1):
    tina.forward(2)
    tina.left(10)
for i in range(0, 10, 1):
    tina.forward(10)
    tina.left(2)
for i in range(0, 10, 1):
    tina.forward(2)
    tina.left(4)
for i in range(0, 10, 1):
    tina.forward(4)
    tina.left(5)
tina.left(100)
tina.forward(5)
tina.left(60)
for i in range(0, 5, 1):
    tina.forward(2)
    tina.right(10)
for i in range(0, 5, 1):
    tina.forward(10)
    tina.right(5)
for i in range(0, 5, 1):
    tina.forward(12)
    tina.right(2)
for i in range(0, 5, 1):
    tina.forward(4)
    tina.right(15)
tina.left(90)
tina.forward(5)
tina.end_fill()
tina.hideturtle()
