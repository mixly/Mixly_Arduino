import turtle

tina= turtle.Turtle()
r = turtle.numinput("输入半径","请输入大树的半径",100,minval = 0,maxval = 100)
gap = turtle.numinput("输入间隔","请输入年轮之间的间隔",10,minval = 0,maxval = 100)
age = 0
tina.pensize(5)
tina.pencolor("#663300")
tina.fillcolor("#666600")
tina.begin_fill()
while r > 0:
    tina.circle (r,360)
    age = age + 1
    r = r - gap
    tina.penup()
    tina.setheading(90)
    tina.forward(gap)
    tina.setheading(0)
    tina.pendown()
tina.end_fill()
tina.penup()
tina.goto(-20,-50)
tina.pendown()
tina.write("大树" + str(age) + "岁了！",False,align="left",font=("Arial",30,"normal"))
tina.hideturtle()
