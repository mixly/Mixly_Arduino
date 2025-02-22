### 更新日志

#### 3.0 rc0 2024-08-25

- 修复 Arduino UNO和NANO的软件中断均无效，程序下载后测试无中断响应. [\#I8CLTQ](https://gitee.com/mixly2/mixly2.0_src/issues/I8CLTQ)
- 修复 Arduino UNO中调用红外发射功能，管脚号不正确. [\#I8EBUM](https://gitee.com/mixly2/mixly2.0_src/issues/I8EBUM)
- 修复 Python Robot中，超霸大师RFID错误. [\#I8JIUB](https://gitee.com/mixly2/mixly2.0_src/issues/I8JIUB)
- 修复 Python中的算法库有加载问题. [\#I8L6Z9](https://gitee.com/mixly2/mixly2.0_src/issues/I8L6Z9)
- 修复 Arduino ESP32C3中SD和SPIFFS说明相反. [\#I8MCAJ](https://gitee.com/mixly2/mixly2.0_src/issues/I8MCAJ)
- 修复 英文语言下Control-Delay模块时间单位缩写混沌. [\#I8MSB3](https://gitee.com/mixly2/mixly2.0_src/issues/I8MSB3)
- 修复 Arduino板卡下TFT屏-ST7796构建时出错. [\#I8QWPK](https://gitee.com/mixly2/mixly2.0_src/issues/I8QWPK)
- 修复 Arduino板卡下TFT屏中的显示文本有Bug. [\#I8ZQ24](https://gitee.com/mixly2/mixly2.0_src/issues/I8ZQ24)
- 修复 Python3程序运行错误，无错误提示. [\#IACRJ7](https://gitee.com/mixly2/mixly2.0_src/issues/IACRJ7)
- 更新 Arduino ESP32S3添加原理图. [\#I7X9LD](https://gitee.com/mixly2/mixly2.0_src/issues/I7X9LD)
- 更新 修改Arduino板卡中 `Serial.available() > 0` 为 `Serial.available()`. [\#I8BSZX](https://gitee.com/mixly2/mixly2.0_src/issues/I8BSZX)
- 更新 Arduino ESP32板卡中添加擦除flash功能. [\#IAE7AY](https://gitee.com/mixly2/mixly2.0_src/issues/IAE7AY)
- 更新 Electron更新到 `v31.2.1`，Blockly更新到 `v11.1.1`，Ace更新到 `v1.36.0`.
- 更新 Arduino和XPython板卡添加板卡文件管理功能.
- 重构 串口监视器和绘图器.
- 重构 使用ES6模块化重构所有默认板卡，扩展板卡构建时可通过 `npm install [板卡名]` 来安装默认板卡，以使用已有图形化模块.
  - `@mixly/arduino`：[**v1.6.0**](https://www.npmjs.com/package/@mixly/arduino)
  - `@mixly/arduino-avr`: [**v1.6.0**](https://www.npmjs.com/package/@mixly/arduino-avr)
  - `@mixly/arduino-esp8266`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/arduino-esp8266)
  - `@mixly/arduino-esp32`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/arduino-esp32)
  - `@mixly/micropython`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/micropython)
  - `@mixly/micropython-esp32`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/micropython-esp32)
  - `@mixly/micropython-esp32c2`: [**v1.4.0**](https://www.npmjs.com/package/@mixly/micropython-esp32c2)
  - `@mixly/micropython-esp32c3`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/micropython-esp32c3)
  - `@mixly/micropython-esp32s2`: [**v1.5.0**](https://www.npmjs.com/package/@mixly/micropython-esp32s2)
  - `@mixly/micropython-esp32s3`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/micropython-esp32s3)
  - `@mixly/micropython-robot`: [**v1.2.0**](https://www.npmjs.com/package/@mixly/micropython-robot)
  - `@mixly/micropython-k210-mixgoai`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/micropython-k210-mixgoai)
  - `@mixly/micropython-nrf51822-microbit`: [**v1.3.0**](https://www.npmjs.com/package/@mixly/micropython-nrf51822-microbit)
  - `@mixly/micropython-nrf51822-mithoncc`: [**v1.2.0**](https://www.npmjs.com/package/@mixly/micropython-nrf51822-mithoncc)
  - `@mixly/python`: [**v1.1.0**](https://www.npmjs.com/package/@mixly/python)
  - `@mixly/python-mixpy`: [**v1.2.0**](https://www.npmjs.com/package/@mixly/python-mixpy)
  - `@mixly/python-skulpt`: [**v1.2.0**](https://www.npmjs.com/package/@mixly/python-skulpt)
  - `@mixly/python-skulpt-car`: [**v1.1.0**](https://www.npmjs.com/package/@mixly/python-skulpt-car)
  - `@mixly/python-skulpt-mixtoy`: [**v1.1.0**](https://www.npmjs.com/package/@mixly/python-skulpt-mixtoy)
- 重构 使用第三板卡和第三方库模板重构云端板卡和云端库 (部分)，持续进行中...
  - `QDPK210 AIstart`：[**mixly-board-micropython-k210-aistart**](https://gitee.com/mixly2-package/mixly-board-micropython-k210-aistart)
  - `Teaile AIBIT`：[**mixly-board-micropython-k210-aibit**](https://gitee.com/mixly2-package/mixly-board-micropython-k210-aibit)
  - `Teaile ESP32`：[**mixly-board-micropython-esp32-acbit**](https://gitee.com/mixly2-package/mixly-board-micropython-esp32-acbit)
  - `TCTM KZB01`：[**mixly-board-micropython-esp32-tctm**](https://gitee.com/mixly2-package/mixly-board-micropython-esp32-tctm)
  - `Arduino UNO R4`：[**mixly-board-arduino-unor4**](https://gitee.com/mixly2-package/mixly-board-arduino-unor4)
  - `Arduino RP2040`：[**mixly-board-arduino-rp2040**](https://gitee.com/mixly2-package/mixly-board-arduino-rp2040)
  - `Nulllab LGT328P`：[**mixly-board-nulllab-avr**](https://gitee.com/mixly2-package/mixly-board-nulllab-avr)
  - `Arduino STM32`：[**mixly-board-arduino-stm32**](https://gitee.com/mixly2-package/mixly-board-arduino-stm32)
  - `Bemfa`：[**mixly-lib-bemfa**](https://gitee.com/mixly2-package/mixly-lib-bemfa)
  - `YFRobot`：[**mixly-lib-yfrobot**](https://gitee.com/mixly2-package/mixly-lib-yfrobot)
  - `FileSystem`：[**mixly-lib-arduino-fs**](https://gitee.com/mixly2-package/mixly-lib-arduino-fs)
  - `BlockBuildTool`：[**mixly-lib-block-build-tool**](https://gitee.com/mixly2-package/mixly-lib-block-build-tool)
- 开发 一些新的扩展板卡正在开发中...
  - `Arduino CH55X`：[**mixly-board-arduino-ch55x**](https://gitee.com/mixly2-package/mixly-board-arduino-ch55x)
  - `C STC`：[**mixly-board-c-stcxx**](https://gitee.com/mixly2-package/mixly-board-c-stcxx)
  - `Lua xt804`：[**mixly-board-lua-xt804**](https://gitee.com/mixly2-package/mixly-board-lua-xt804)
  - `Web Python3`：[**mixly-board-web-python3**](https://gitee.com/mixly2-package/mixly-board-web-python3)

#### 2.0 rc4 2023-08-06

- 修复 Arduino ESP32C3 板载 WS2812 RGB灯编译出错. [\#I5P20N](https://gitee.com/mixly2/mixly2.0_src/issues/I5P20N)
- 修复 win7 32位 gcc版本不匹配. [#I5QOQO](https://gitee.com/mixly2/mixly2.0-win32-ia32/issues/I5QOQO)
- 修复 mac 下使用 Python ESP32-C3 初始化固件或上传时报错. [\#I5V5S3](https://gitee.com/mixly2/mixly2.0_src/issues/I5V5S3)
- 修复 Arduino AVR 板卡下 RGB 输入框和取色器 R、B 颜色反了. [\#I63AJJ](https://gitee.com/mixly2/mixly2.0_src/issues/I63AJJ)
- 修复 Arduino ESP32 板卡下当变量类型设置为布尔时上传错误. [\#I672R5](https://gitee.com/mixly2/mixly2.0_src/issues/I672R5)
- 修复 Arduino ESP32 硬件定时器导致系统不断重启. [\#I6B5WZ](https://gitee.com/mixly2/mixly2.0_src/issues/I6B5WZ)
- 修复 python3 语音技术运行报错. [\#I6B7AH](https://gitee.com/mixly2/mixly2.0-win32-x64/issues/I6B7AH)
- 修复 Arduino ESP32C3 下 串口图形块bug. [\#I6HUWN](https://gitee.com/mixly2/mixly2.0_src/issues/I6HUWN)
- 修复 代码区编辑代码后存本地，再打开后不会显示之前已编辑的代码. [\#I6JIM0](https://gitee.com/mixly2/mixly2.0_src/issues/I6JIM0)
- 修复 mac 下一键更新安装，Arduino编译提示 "bad CPU type in executable". [\#I6MNUY](https://gitee.com/mixly2/mixly2.0_src/issues/I6MNUY)
- 修复 mac Mixly2.0文本内容复制粘贴不了. [\#I6Z21S](https://gitee.com/mixly2/mixly2.0_src/issues/I6Z21S)
- 修复 windows Arduino ESP8266代码区无代码，无法编译. [\#I710YW](https://gitee.com/mixly2/mixly2.0_src/issues/I710YW)
- 更新 Arduino ESP32C3 GPIO添加11引脚. [\#I6X4L6](https://gitee.com/mixly2/mixly2.0_src/issues/I6X4L6)
- 更新 Blockly  ( version: 10.0.2 )
  - `Blockly.Blocks.xxx.HUE` → `Blockly.Msg['xxx_HUE']`
  - `Blockly.xxx` → `Blockly.Msg['xxx']`
  - `Blockly.Mutator` → `Blockly.icons.MutatorIcon`
  - `generator.xxx` → `generator.forBlock['xxx']`

- 更新 XPython板卡和Arduino板卡
- 更新 板卡管理工具和库管理工具
- 更新 xpython板卡烧录所用python工具
- 更新 `导出PNG` 选项移动到 Blockly 工作区右键菜单
- 添加 右键菜单选项项 `添加注释`在 Blockly 工作区
- 添加 墨水屏模块在 Arduino 板卡. [\#I670FM](https://gitee.com/mixly2/mixly2.0_src/issues/I670FM)
- 添加 用户配置项
  - 上传结束后自动打开串口. [\#I605PY](https://gitee.com/mixly2/mixly2.0_src/issues/I605PY)
  - 主题调整为 "跟随系统"、"深色"、"浅色". [\#I692QN](https://gitee.com/mixly2/mixly2.0_src/issues/I692QN)
- 添加 消息栏在板卡页面
- 添加 配置项说明在配置板卡栏
- 添加 `此视图只读` 提示在状态栏和右侧代码预览区 ( `Enter`、`Del`、`Backspace` 触发 )
- 添加 新功能在Blockly
  - 工作区高亮
  - 工作区网格
  - 工作区缩略图 ( `实验性` )
  - 工作区多重选择 ( `实验性` - `Shift` + `鼠标左键` 触发 )
  - 渲染器切换

#### 2.0 rc3 2022-08-10

- 修复自代码区切换至模块区颜色选择模块尺寸改变
- 修复串口操作导致窗口崩溃
- 修复Blockly解析xml字符串报错
- 修复Arduino下创建函数块右键生成函数块乱码
- 修复双击文件打开程序不显示
- 更新板卡管理工具和库管理工具
- 更新Electron  ( version: 19.0.6 )
- 更新Ace、Ampy、Layui、fontello、skulpt、amWiki、fpJS
- 更新XPython板卡和Arduino板卡
- 更新Mixly板卡页面布局
- 更新配置Arduino板卡操作
- 串口输出框、代码框添加右键菜单
- 添加反馈、wiki、例程和图文转换按钮
- 添加Blockly工具箱查找和工作区查找
- 添加书包
- 添加Blockly.FieldGridDropdown、Blockly.FieldBitmap和Blockly.FieldSlider

#### 2.0 rc2 2022-03-19

- 修复ESP32数码管问题
- 修复在图像化模块的注释打开时弹层位置不在窗口中央的问题
- 修复导入本地第三方库错误
- 尝试修复有时使用Blockly.Xml.textToDom函数报错
- 尝试修复串口长时间使用时页面崩溃问题
- 更新板卡micropython_esp32_handbit
- 更新板卡circuitpython_esp32s2_mixgocar
- 更新板卡micropython_k210_mixgoai
- 更新板卡micropython_esp32_mixgo
- 更新板卡micropython_nrf51822_microbit
- 更新板卡micropython_nrf51822_mithoncc
- 更新esptool ( version: 3.2 )
- 更新Ampy
- 更新electron ( version: 17.1.2 )
- 添加板卡micropython_esp32_mixgope
- 添加板卡micropython_esp32c3_mixgocar
- 添加板卡micropython_esp32c3_mixgocc
- 添加python_skulpt_mixtoy
- 添加【其他固件】按钮在xPython页面
- 添加AI Thinker ESP32-CAM在Arduino ESP32
- 添加过渡动画在板卡index切换时
- 添加程序执行时间显示在python板卡状态栏
- 调整头部工具栏
- 调整各弹层在dark下的颜色
- 自动获取category标签的id属性，不需要在code.js中手动添加
- 移除Arduino STM32板卡，改为用户手动导入
- 移除Arduino ESP32C3板卡不能使用的blynk，板载资源与蓝牙块

#### 2.0 rc1 2021-11-07

- 修复导入云端库时的一些问题
- 修复库管理器对本地一些库无法进行管理的问题
- 修复Arduino类板卡软串口错误
- 修复python页面下生成代码存在很多空行的问题
- 修复Arduino类板卡编译时中文输出为乱码的问题
- 更新Arduino ESP32c3页面的串口配置和管脚定义
- 更新CircuitPython MixGoCE与MixGoCar的固件
- 更新MicroPython MixGoAI
- 增加通用旋转编码器图形化模块
- 增加ESP系列红外解码图形化模块
- 增加新板卡mPython
- 增加 "until" 及更新 "while" 图形化模块在xPython页面下
- 增加OTA图形化模块在Arduino ESP页面下
- 增加360°舵机和HCSR04超声波控制图形化模块在CricuitPython MixGoCE页面下
- 增加折叠块在MixGoCE&MixGoCar页面下
- 移除Arduino ESP页面下WIFI_AP&STA图形化模块 (变为云端导入)

#### 2.0 rc0 2021-09-30

- 修复导入第三方库后切换语言一些第三方库语言没有改变
- 修复CircuitPython MixGoCE界面下上传程序后状态栏不自动切换到串口输出
- 注释串口读取时对连续两个数据时间间隔需大于50ms的限制
- 更新CircuitPython MixGoCE与MixGoCar的固件
- Arduino下增加对于mixio的支持
- 添加Arduino ESP8266管脚映射图形化模块
- 更新Arduino和Python第三方库url
- 取消导入库和板卡时的编辑url按钮
- 板卡页面头部工具栏添加按钮点击效果
- 同步弹出打开、保存文件窗口改为异步弹出
- Arduino类板卡页面支持云端导入Arduino库文件和管理本地Arduino库文件
- Python类板卡页面支持云端导入py文件和管理本地py文件

#### 2.0 Beta14 2021-09-14

- 修复软件主题设为dark时从主页面到板卡页面会有短暂闪屏
- 修复Arduino类板卡下blynk分类下一些模块无法生成代码
- 修复Arduino ESP8266板卡下红外通信模块生成代码编译报错
- 修复Arduino ESP32板卡下使用ESP32 CAM相关模块编译报错
- 修复设置语言后刷新页面会变成默认语言的问题
- 修复Arduino类板卡下编译上传时报错信息会显示两次
- 修复串口工具读取数据时会剔除空行的问题
- 更新CircuitPython MixGoCE与MixGoCar的固件和相关图形化模块
- 更新electron版本到13.3.0
- 更新blockly版本到6.20210701.0
- 更换主页面背景图片
- 板卡页面更改语言后支持动态更新页面
- 板卡页面导入和删除第三方库后支持动态更新左侧工具箱
- 主页面导入和删除板卡后支持动态更新页面
- 完善软件对多国语言的支持
- Arduino类板卡编译和上传时支持同时编译所打开MIX、INO所在目录下的[*.h, *.hpp, *.c, *.cpp]文件

#### 2.0 Beta13 2021-08-26

- 修复Arduino AVR板卡下Blynk连接状态函数无法生成代码的问题
- 修复MicroPython MixGo AI板卡在串口工具打开时复位按钮无法使用的问题
- 修复microPython和CircuitPython下数学分类下某些模块生成代码上传报错的问题
- 修复打开和保存文件时默认路径有时不为sample文件夹的问题
- 修复py下if-else & try-except使用ctrl+z后报错的问题
- 修复初始化固件或上传程序后有时遮罩无法关闭的问题
- 修复串口读取数据时无法解码中文编码字符串的问题
- 调整板卡配置文件
- CircuitPython MixGo CE板卡下添加Mixly Key、获取cpu温度、NTP时间和SD卡操作图形化模块
- 更新CircuitPython MixGo CE板卡固件
- 更新状态栏，支持在状态栏中显示串口号
- 更新板卡页面头部工具栏
- Arduino板卡下支持导出和导入已编译的bin、hex文件

#### 2.0 Beta12 2021-08-14

- 修复Arduino页面下函数声明模块无法被禁用的问题
- 修复侧边代码框和代码编辑框字体大小不同步的问题
- 修复MixGo AI下有时程序卡住时无法再上传的的问题
- 修复串口接收数据为中文时有乱码问题
- 修复主页面下显示多行板卡时有时某几行板卡无法显示的问题
- 修复Microbit下舵机和蜂鸣器无法使用的问题
- 更新Mixgo CE 和 MixGo Car图形化模块及其固件
- 更新例程
- 支持双击文件在Mixly中打开(需要先关联MIX文件到Mixly)
- 串口监视器添加DTR和RTS设置

#### 2.0 Beta11 2021-08-06

- 修复Arduino ESP8266和ESP32板卡页面blynk模块编译报错问题
- 修复MixGoAI板卡使用kflash工具烧录时的报错问题
- 修复Arduino ESP8266和ESP32界面下使用本地导入库后无第三方模块的问题
- 修复主页面下显示的板卡在高分辨率屏幕上排列会出错的问题
- 修复串口在读取数据时如果没有换行符数据不会显示的问题
- Arduino ESP32S2板卡页面增加USB串口程序块
- Arduino ESP32S2和ESP32C3板卡页面添加GPIO图
- 更新Sample下例程版本为Mixly2.0
- 更新MixGo CE和MixGo Car下图形化模块和所用固件
- 添加py模块pgzero
- Arduino STM32支持使用Mixly烧录固件

#### 2021-08-01

- 修复保存文件后不显示保存路径的问题
- 修复当软件路径中含有空格时编译、烧录和上传操作会出错的问题
- 尝试修复导入Mxixly1.x所用第三方库有些分类无法显示的问题
- 更新MixGo CE和MixGo Car下图形化模块和所用固件

#### 2021-07-30

- 同步Mixly1.x下Arduino类图形化模块
- 添加新板卡Arduino ESP32S2和ESP32C3

#### 2021-07-29

- 添加主进程调试工具electron-dev-console
- 添加新板卡Arduino MixGo CE

#### 2021-07-28

- 修复Mac和Linux下通过VID、PID无法筛选串口的问题
- 修复Linux下通过盘符号获取路径出错的问题

#### 2021-07-27

- 修复在打开两个及以上窗口时启动速度变慢的问题
- 串口工具支持拖拽改变尺寸
- 添加本地快捷键
  | Mixly2.0客户端界面操作 | 快捷键 |
  | :--------------------: | :----: |
  |       打开新页面       | Ctrl+N |

#### 2021-07-26

- 更新云端板卡TCTM KZB01
- 更新本地快捷键
  | Mixly2.0客户端界面操作 |    快捷键    |
  | :--------------------: | :----------: |
  |        缩小页面        | Ctrl+Shift+- |

#### 2021-07-25

- 修复K210板卡使用ampy上传有时会失败的问题
- Mac系统下使用which python3命令获取已安装python3的路径
- 支持使用ampy递归上传文件

#### 2021-07-24

- 添加新板卡MixGo AI
- 更新云端板卡TCTM KZB01
- 添加本地快捷键
  | Mixly2.0客户端界面操作 | 快捷键 |
  | :--------------------: | :----: |
  |      打开更新日志      | Ctrl+H |

#### 2021-07-22

- 添加新板卡MixGo Car

#### 2021-07-21

- 修复Arduino界面下LCD1602编译出错问题
- 修复Arduino界面OLED分类下模块下拉图片链接出错的问题
- 修复Arduino界面下模块SDA、SCL等管脚无法使用默认配置的问题

#### 2021-07-20

- 修复导入第三方库后在开发者模式下无法查看已导入第三方库js文件的问题

#### 2021-07-17

- 修复本地导入板卡和第三方库按钮不可用问题

#### 2021-07-16

- 修复Microbit和Mithon页面下【保存HEX】按钮文字不显示的问题
- 修复Win下ESP32板卡编译失败的问题
- 支持同时对多个同类型板卡进行固件烧录或程序上传操作

#### 2021-07-14

- 修复Arduino页面下缩小窗口时编译按钮不折叠的问题
- 串口绘图支持绘制多条折线
- 添加本地快捷键
  | Mixly2.0客户端界面操作 |    快捷键    |
  | :--------------------: | :----------: |
  |        还原页面        |    Ctrl+0    |
  |        放大页面        | Ctrl+Shift+= |
  |        缩小页面        |    Ctrl+-    |

#### 2021-07-10

- 添加云端板卡MicroPython_esp32_TCTM_KZB01

#### 2021-07-09

- 添加测试板卡MicroPython_K210_MaixDock

#### 2021-07-07

- 支持用户自定义arduinoCli和Python3的路径，当在默认路径下未检测到对应软件时，会使用自定义路径

#### 2021-07-05

- 添加K210固件烧录工具kflash

#### 2021-07-04

- 添加本地快捷键
  | Mixly2.0客户端界面操作 |    快捷键    |
  | :--------------------: | :----------: |
  |  打开或关闭开发者工具  | Ctrl+Shift+I |
  |        重载页面        |    Ctrl+R    |
  |       最小化窗口       |    Ctrl+M    |
  |        关闭窗口        |    Ctrl+W    |
- 修复在打开两个及以上窗口时会出现短暂白屏问题

#### 2021-07-01

- Mixly 网页端MixGo板卡使用WebSerial上传
- Mixly 网页端MixGo和MixGoCE板卡固件烧录采用WebSerial ESPTool
- 尝试修复MixGoCE上传结束后的灰屏问题

#### 2021-06-19

- 修复microbit界面TCS34725颜色传感器模块读取RGB数据出错的问题
- 配置文件支持添加多个盘符
- 状态栏支持通过快捷键设置字体大小、发送Ctrl+C和Ctrl+D、清空状态栏
  | 状态栏操作 |     快捷键     |
  | :--------: | :------------: |
  |  增大字体  | Ctrl-=\|Ctrl-+ |
  |  减小字体  | Ctrl+-\|Ctrl-  |
  | 发送Ctrl+C |  Ctrl+Shift+C  |
  | 发送Ctrl+D |  Ctrl+Shift+D  |
  | 清空状态栏 |     Ctrl+E     |

#### 2021-05-29

- 修复侧边代码框向左拖动时宽度无限制的问题
- 修复打开文件或在文本转图形时图形化模块无法居中的问题
- 修复打开文件后左侧分类树无法自动复位的问题
- 修复主题设为dark时进入板卡页面后主题依然为light的问题

#### 2021-05-13

- 修复打开mix文件显示“无效的xml”的问题
- 修复保存png文件后无法打开的问题
- 修复串口输出介于[-1,1]的数字会读取出错的问题
- 修复有多个串口时无法正常切换串口的问题
- 修复板卡页面主题设为dark后左侧分类树字体颜色为黑的问题
- 更新MixGo CE页面图形块及固件

#### 2021-05-09

- 修复主页面在改变窗口尺寸或屏幕分辨率后板卡会堆叠在一起的问题
- 修复板卡页面鼠标滚轮缩放速率过大的问题
- 使用node https替换request模块

#### 2021-04-19

- 修复Arduino界面终止编译/上传后状态栏仍会继续显示部分编译/上传信息
- 修复点击“打开”按钮时未选择文件则会清除当前文件路径的问题
- 修复打开文件显示invalid xml file!时会清除工作区和代码区程序的问题
- 修复打开文件后退出板卡页面再次进入会丢失文件路径的问题
- 修复从板卡页面退出轮播索引会自动设为0的问题

#### 2021-04-18

- 修复打开文件显示invalid xml file!时仍会显示文件路径的问题
- 修复打开文件显示invalid xml file!时代码区仍会显示部分代码的问题
- 修复状态栏和工作区在主题为dark时无效果的问题
- 修复代码区代码在退出页面后再次进入无法恢复的问题
- 修复设置语言后重启软件会变回默认语言的问题
- 修复Arduino界面板卡切换后工作区图形化模块管脚不会同步的问题
- 使用Arduino-CLI替换Arduino IDE，加快编译和上传速度，目前已添加AVR板卡
- MixGoCE 外接元件/传感器、物联网分类下模块添加文本转图形

#### 2021-04-16

- 修复重复打开相同文件时不会读取文件数据的问题
- 修复python界面input模块输入中文时输出乱码的问题
- 修复python和micropython界面在包含类与对象相关模块时会出错的问题
- 更新“保存”、“另存为”、“新建”、“打开”操作
- 更新串口可视化
- 串口和头部工具栏支持用户使用config.json来配置
- 缓存文件支持不同界面数据分开储存

#### 2021-04-12

- 更新“保存”、“另存为”按钮
- 修复MixGo按RST后无法上传的问题
- 串口加上关闭/打开按钮

#### 2021-04-08

- 修复板卡选择下拉框展开时展开框不居中的问题
- 修复释放头部工具栏中某个按钮后此按钮依旧为按下状态的问题
- 调整串口、状态框、编译、烧录、上传等相关函数

#### 2021-04-02

- 串口选择下拉框支持显示多行
- 修复非MixGOCE、microbit、mithon板卡的串口切换错误问题
- 初始化固件、上传支持记住上一次选择的串口或盘符号
- 板卡切换按钮设置为一直显示

#### 2021-03-21

- RGB灯带的逻辑修改为官网逻辑
- python编辑器自动缩进为4个空格
- 修复缩小窗口时文字重叠问题
- 去掉了初始化超声波图形模块
- 更新串口工具
- 修复串口短时间获取大量数据时卡死问题
- 支持在软件内动态添加板卡，支持直接在软件内删除板卡
- 暂时只添加了Arduino AVR板卡
- 添加MixGo板卡
- 添加导入库、管理库、切换板卡按钮，暂时不支持导入库、管理库、切换板卡操作
- 添加Shift+Ctrl+C和Shift+Ctrl+V操作
- MixGo上传采用python-shell调用ampy工具
- MixGo和MixGoCE烧录固件采用python-shell调用esptool工具