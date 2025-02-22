import turtle

tina= turtle.Turtle()
mygender = "女"
guess = turtle.textinput("猜一猜","猜一猜我是男生还是女生？")
tina.pencolor("#ff0000")
tina.hideturtle()
if mygender == guess:
    tina.write("你真棒，猜对了!",False,align="left",font=("黑体",20,"normal"))
else:
    tina.write("很遗憾，猜错了!",False,align="left",font=("黑体",20,"normal"))
