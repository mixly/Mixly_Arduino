import turtle

tina= turtle.Turtle()
tina.pencolor("#ff0000")
tina.fillcolor("#ffff00")
n = int(turtle.numinput("输入","请输入尖角个数（奇数或4的倍数）：",20,minval = 0,maxval = 100))
while n % 4 == 2:
    tina.clear()
    tina.write("无法一笔画出" + str(n) + "角星",False,align="left",font=("Arial",16,"normal"))
    n = int(turtle.numinput("输入","请输入尖角个数：",20,minval = 0,maxval = 100))
tina.clear()
if n % 4 == 0:
    angle = 180 - 360 / n
else:
    angle = 180 - 180 / n
tina.begin_fill()
for i in range(0, n, 1):
    tina.forward(200)
    tina.right(angle)
tina.end_fill()
tina.hideturtle()
