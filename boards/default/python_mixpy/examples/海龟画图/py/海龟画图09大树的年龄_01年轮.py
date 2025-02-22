import turtle

tina= turtle.Turtle()
r = 100
gap = 10
tina.pensize(5)
tina.pencolor("#663300")
tina.fillcolor("#666600")
tina.begin_fill()
while r > 0:
    tina.circle (r,360)
    r = r - gap
    tina.penup()
    tina.setheading(90)
    tina.forward(gap)
    tina.setheading(0)
    tina.pendown()
tina.end_fill()
tina.hideturtle()
