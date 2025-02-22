## switch 选择

<img src="{default}/images/control/switch.png" alt="switch" style="zoom:67%;" />

```arduino
switch (NULL) {
}
```

### 描述

> 和if语句相同，switch…case通过设定的在不同条件下执行的代码控制程序的流程。
>
> 特别地，switch语句将变量值和case语句中设定的值进行比较。当一个case语句中的设定值与变量值相同时，这条case语句将被执行。
>
> 关键字break可用于退出switch语句，通常每条case语句都以break结尾。如果没有break语句，switch语句将会一直执行接下来的语句（一直向下）直到遇见一个break，或者直到switch语句结尾。

### 参数

- var: 用于与下面的case中的标签进行比较的变量值
- label: 与变量进行比较的值

### 用法

增加case：如果需要增加条件，可以点开齿轮，然后将左侧的“case”或者“default”模块拖到右侧的“switch”之中。

<img src="{default}/images/control/switch-case.png" alt="switch-case" style="zoom:67%;" />

### 范例

当连接在2号引脚的按键按下时，点亮13号引脚的灯，否则13号引脚的灯灭。

<img src="{default}/images/control/switch-case-example.png" alt="switch-case示例" style="zoom:67%;" />

```arduino
void setup(){
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
}

void loop(){
  switch (digitalRead(2)) {
    case true:
      digitalWrite(13, HIGH);
      break;
    default:
      digitalWrite(13, HIGH);
  }
}
```

<div class="layui-card" style="box-shadow: 1px 1px 4px 1px rgb(0 0 0 / 20%);">
  <div class="layui-card-header icon-attention-circled" style="background: #f0b37e;color:#fff;font-size:16px;">注意</div>
  <div class="layui-card-body" style="background: #ffedcc;">每个switch可以有多个case，但是最多不超过一个default，当不满足任何一个case时，执行default中的程序。</div>
</div>