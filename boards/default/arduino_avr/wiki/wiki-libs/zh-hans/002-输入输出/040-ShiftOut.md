## ShiftOut

<img src="{default}/images/inout/shiftout.png" alt="image-20220528150921075" style="zoom:67%;" />

```arduino
shiftOut(2, 3, MSBFIRST, 0); // 高位先入
shiftOut(2, 3, LSBFIRST, 0); // 低位先入
```

### 描述

> 将一个数据的一个字节一位一位的移出。从最高有效位（最左边）或最低有效位（最右边）开始。依次向数据脚写入每一位，之后时钟脚被拉高或拉低，指示刚才的数据有效。

### 参数

- 数据管脚：输出每一位数据的引脚(int)
- 时钟管脚：时钟脚，当数据管脚有值时此引脚电平变化(int)
- 顺序：输出位的顺序，最高位优先或最低位优先
- 数值: 要移位输出的数据(byte)