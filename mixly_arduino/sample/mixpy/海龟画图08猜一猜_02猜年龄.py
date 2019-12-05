import turtle

age = 25
tina= turtle.Turtle()
tina.pencolor("#ff0000")
tina.hideturtle()
tina.penup()
tina.goto(-100,100)
tina.pendown()
y = 100
while True:
    guess = turtle.numinput("猜一猜","猜一猜我几岁？",0,minval = 0,maxval = 100)
    if guess == age:
        tina.write("你真棒，猜对了!",False,align="left",font=("黑体",20,"normal"))
        break
    elif guess > age:
        tina.write("我比你想的要小哦！",False,align="left",font=("黑体",10,"normal"))
    else:
        tina.write("我比你想的要大哦",False,align="left",font=("黑体",10,"normal"))
    tina.penup()
    y = y - 20
    tina.goto(-100,y)
    tina.pendown()
tina.hideturtle()
