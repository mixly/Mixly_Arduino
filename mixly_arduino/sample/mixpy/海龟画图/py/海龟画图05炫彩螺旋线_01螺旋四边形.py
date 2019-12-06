import turtle

tina= turtle.Turtle()
tina.pensize(5)
for i in range(0, 50, 1):
    tina.forward((4 * i))
    tina.right(90)
tina.hideturtle()
