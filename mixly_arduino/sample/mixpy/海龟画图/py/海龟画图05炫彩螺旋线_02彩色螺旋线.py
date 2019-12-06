import turtle

tina= turtle.Turtle()
tina.pensize(5)
colorlist = ['red','blue','green','yellow']
for i in range(0, 50, 1):
    tina.pencolor(colorlist[i % 4])
    tina.forward((4 * i))
    tina.right(91)
tina.hideturtle()
