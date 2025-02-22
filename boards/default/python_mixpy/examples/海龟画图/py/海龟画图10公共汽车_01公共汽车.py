import turtle

def moveandgo(x, y, distance):
    tina.penup()
    tina.goto(x,y)
    tina.pendown()
    tina.setheading(0)
    tina.forward(distance)


def moveandcircle(x, y, radius):
    tina.fillcolor("#ffffff")
    tina.penup()
    tina.goto(x,y)
    tina.pendown()
    tina.begin_fill()
    tina.setheading(90)
    tina.circle (radius,360)
    tina.end_fill()


def moveandrectangle(x, y, width, length):
    tina.penup()
    tina.goto(x,y)
    tina.pendown()
    tina.setheading(0)
    for i in range(0, 4, 1):
        if i % 2 == 0:
            tina.forward(width)
        else:
            tina.forward(length)
        tina.right(90)



tina= turtle.Turtle()
tina.pensize(5)
for i in range(0, 4, 1):
    if i % 2 == 0:
        tina.forward(300)
    else:
        tina.forward(150)
    tina.circle (20,90)
moveandgo(-20, 150, 340)
moveandrectangle(-20, 130, 50, 70)
for i in range(0, 4, 1):
    moveandrectangle(60 + 60 * i, 130, 40, 50)
moveandgo(-20, 20, 340)
moveandgo(-15, 10, 330)
moveandcircle(40, -20, -30)
moveandcircle(200, -20, -30)
tina.hideturtle()
