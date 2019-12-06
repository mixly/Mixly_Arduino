import turtle

tina= turtle.Turtle()
tina.pensize(5)
tina.pencolor("#ff0000")
tina.fillcolor("#ffff00")
tina.begin_fill()
for i in range(0, 5, 1):
    tina.forward(100)
    tina.right(144)
tina.end_fill()
tina.hideturtle()
