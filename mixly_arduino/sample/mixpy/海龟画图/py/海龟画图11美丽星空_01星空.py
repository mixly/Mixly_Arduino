import turtle

import random


def moveto(x, y):
    tina.penup()
    tina.goto(x,y)
    tina.pendown()
    tina.setheading(0)


def drawhouse(x, y, layer):
    moveto(x, y)
    tina.pencolor("#000000")
    tina.fillcolor("#000000")
    tina.begin_fill()
    tina.forward(80)
    tina.left(90)
    tina.forward((20 * layer))
    tina.left(30)
    tina.forward(80)
    tina.left(120)
    tina.forward(80)
    tina.left(30)
    tina.forward((20 * layer))
    tina.left(90)
    tina.forward(80)
    tina.end_fill()
    for i in range(0, layer, 1):
        for j in range(0, 4, 1):
            drawwindow((x + 5) + j * 20, (y + 5) + i * 20)


def drawstar(len):
    tina.pencolor("#ffff00")
    tina.fillcolor("#ffff00")
    tina.begin_fill()
    for i in range(0, 5, 1):
        tina.forward(len)
        tina.right(144)
    tina.end_fill()


def drawwindow(x, y):
    moveto(x, y)
    tina.pencolor("#ffffff")
    tina.fillcolor("#ffffff")
    tina.begin_fill()
    for i in range(0, 4, 1):
        tina.forward(10)
        tina.left(90)
    tina.end_fill()



tina= turtle.Turtle()
turtle.bgcolor("#001020")
tina.pencolor("#ffff00")
tina.fillcolor("#ffff00")
moveto(-200, 200)
tina.begin_fill()
tina.setheading(-135)
tina.circle (60,180)
tina.setheading(175)
tina.circle ((-95),80)
tina.end_fill()
for i in range(0, 6, 1):
    x = random.randint(-100, 300)
    y = random.randint(100, 280)
    moveto(x, y)
    drawstar(random.randint(10, 20))
drawhouse(0, -250, 10)
drawhouse(150, -250, 5)
tina.hideturtle()
