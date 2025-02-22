## SCoop Task

<img src="{default}/images/control/scoop-task.png" alt="SCoop Task" style="zoom:67%;" />

```arduino
#include "SCoop.h"

defineTask(scoopTask1)
void scoopTask1::setup(){
}
void scoopTask1::loop(){
}

void setup(){
  mySCoop.start();
}

void loop(){
  yield();
  sleep(1000);
}
```

### 描述

> SCoop模块用于执行多线程任务，最多支持8个任务。

### 范例

利用SCoop，控制13号引脚LED灯以2秒的频率闪烁，同时控制12号引脚的LED灯以200毫秒的频率闪烁。

<img src="{default}/images/control/scoop-task-example.png" alt="SCoop Task示例" style="zoom:67%;" />

```arduino
#include "SCoop.h"

defineTask(scoopTask1)
void scoopTask1::setup(){
  pinMode(13, OUTPUT);
}
void scoopTask1::loop(){
  digitalWrite(13, HIGH);
  sleep(1000);
  digitalWrite(13, LOW);
  sleep(1000);
}

defineTask(scoopTask2)
void scoopTask2::setup(){
  pinMode(12, OUTPUT);
}
void scoopTask2::loop(){
  digitalWrite(12, HIGH);
  sleep(100);
  digitalWrite(12, LOW);
  sleep(100);
}

void setup(){
  pinMode(13, OUTPUT);
  mySCoop.start();
  pinMode(12, OUTPUT);
}

void loop(){
  yield();
}
```

