## MsTimer2 定时器

<img src="{default}/images/control/ms-timer2.png" alt="MsTimer2" style="zoom:67%;" />

```arduino
MsTimer2::set(500, msTimer2_func);
```

### 1.1 描述

> 每隔设置的毫秒数执行相应的程序

### 1.2 范例

利用定时器控制13号引脚LED每隔1秒亮灭一次。

<img src="{default}/images/control/ms-timer2-example.png" alt="MsTimer2示例" style="zoom:67%;" />

```arduino
#include <MsTimer2.h>

volatile boolean state;

void msTimer2_func() {
  state = !state;
  digitalWrite(13, state);
}

void setup(){
  state = false;
  pinMode(13, OUTPUT);
  MsTimer2::set(1000, msTimer2_func);
  MsTimer2::start();
}

void loop(){
}
```

<div class="layui-card" style="box-shadow: 1px 1px 4px 1px rgb(0 0 0 / 20%);">
  <div class="layui-card-header icon-attention-circled" style="background: #f0b37e;color:#fff;font-size:16px;">注意</div>
  <div class="layui-card-body" style="background: #ffedcc;">利用定时器可以提高硬件的工作效率。
<br/><br/>
但在一个程序中只能使用一个MsTimer2定时器，如果要实现多个时间的定时，可以配合变量计数来完成。</div>
</div>

## MsTimer2 定时器启动

<img src="{default}/images/control/ms-timer2-start.png" alt="MsTimer2启动" style="zoom:67%;" />

```arduino
MsTimer2::start();
```

### 2.1 描述

> MsTimer2定时器开始计时

## MsTimer2 定时器停止

<img src="{default}/images/control/ms-timer2-stop.png" alt="MsTimer2停止" style="zoom:67%;" />

### 3.1 描述

> MsTimer2定时器停止计时