## while 循环

<img src="{default}/images/control/while.png" alt="while" style="zoom:67%;" />

```arduino
while (true) {
}
```

### 描述

> while循环会无限的循环，直到括号内的判断语句变为假。 必须要有能改变判断语句的东西，要不然while循环将永远不会结束。你可以使用一个传感器的值，或者一个变量来控制什么时候停止该循环。

### 参数

- 满足条件：为真或为假的一个条件。

### 范例

当温度高于30度时，亮灯，否则灭灯。

<img src="{default}/images/control/while-example.png" alt="while示例" style="zoom:67%;" />

```arduino
void setup(){
  pinMode(13, OUTPUT);
}

void loop(){
  while (analogRead(A0)*0.488 > 30) {
    digitalWrite(13, HIGH);
  }
  digitalWrite(13, LOW);
}
```

