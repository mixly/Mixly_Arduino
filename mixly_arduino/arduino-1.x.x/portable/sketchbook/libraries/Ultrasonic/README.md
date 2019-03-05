[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)

Ultrasonic
===========

_Minimalist library for ultrasound module to Arduino_

### Compatible with **HC-SR04**, **Ping)))** and **Seeed SEN136B5B** (_from Seeed Studio_)

Work with **ultrasonic modules** is fairly simple, but can be even more practical if you abstract the control of some features. This library aims to resource efficiency and to simplify access to data.

Where necessary use the ultrasonic module **HC-SR04** (one of the most common on the market), **Ping)))** and/or **Seeed SEN136B5B** (_from Seeed Studio_), there are hundreds of libraries that purport to provide the most diverse roles for the user, however, the vast majority of the time, we just need to find out the distance and is that's what does this library.

This library is minimalist, reduces code execution, validation and unnecessary use of global variables, prioritizing smaller data types.

Wiring:
---------------
It is very easy to connect an ultrasound module to the Arduino. For example, if you are using **HC-SR04**, connect the **trigger** and **echo** pin module on pin **12** and **13** of the Arduino, respectively. As in the picture:
![HC-SR04 with Arduino](extras/HC-SR04-with-Arduino.jpg?raw=true "HC-SR04 with Arduino")

If you are using a module with three pins (like  **Ping)))** or **Seeed SEN136B5B**), you can conect the **sig** pin module on pin **13** of the Arduino.

> You can use the [Fritzing](http://fritzing.org/home/)(_.fzz_) files inside [extras](https://github.com/ErickSimoes/Ultrasonic/tree/master/extras) to draw your prototypes.

How to use:
---------------
The idea is to provide a simpler environment possible. To do this, simply follow the steps:

1. **Installing**

    First you need to import the library so that the IDE recognizes it. The simplest way is importing through the IDE itself:
    - Click in ```Sketch > Include Library > Manage Libraries...```;
    - In the search field type: ```ultrasonic```;
    - In the list, look for ```Ultrasonic by Erick Simões```;
    - Click on ```Install```.

    > Alternatively, you can download the library [here](https://github.com/ErickSimoes/Ultrasonic/archive/master.zip) and import the ```.zip``` file into the IDE (see how to import a library [here](https://www.arduino.cc/en/Guide/Libraries#toc4)).
2. **Importing on code**

    To import the library to your code, just write at the beginning of the code ```#include <Ultrasonic.h>``` or, in the Arduino IDE, click in ```Sketch > Include Library > Ultrasonic``` (_will have the same result_).
3. **Starting** (the most exciting part)

    Now is simply create a variable of type Ultrasonic passing as parameters two values representing, respectively, the Trig (emitter) and Echo (receiver) pins. Like this:
    ```c++
    Ultrasonic ultrasonic(12, 13);
    ```
    If you are using a module with three pins (like  **Ping)))** or **Seeed SEN136B5B**), pass as a parameter only the signal pin. Like this:
    ```c++
    Ultrasonic ultrasonic(13);
    ```
4. **Discovering the distance**

    Having initialized a variable, you can run hers from the method that returns the distance read by module Ultrasonic: ```read()```:
    ```c++
    ultrasonic.read()
    ```
5. **Only this?**

    Yes. That's it. By default, the value returned from the function  ```read()``` is the distance in centimeters.

6. **Seriously?**

    You can still do a little more determining the unit of measurement that will be returned (centimeters (CM) or inches (INC)).
    ```c++
    ultrasonic.read()    // distance in CM
    ultrasonic.read(CM)  // distance in CM
    ultrasonic.read(INC) // distance in INC
    ```
    You can also use more than one ultrasound module:
    ```c++
    ultrasonic ultrasound1(12, 13);
    ultrasonic ultrasound2(10, 11);
    ultrasonic ultrasound3(5);
    ```

7. **Timeouts**

    If there is no object in range, the library will lock-up as it waits for the return pulse.
    You can change how long to wait by setting a timeout (in microseconds) in the constructor:
    ```c++
    Ultrasonic ultrasonic(12, 13, 40000UL);
    ```
    Or during runtime:
    ```c++
    ultrasonic.setTimeout(40000UL);
    ```
    Using a 40ms timeout should give you a maximum range of approximately 6.8m. You may need to adjust this parameter.

#### See the examples [here](https://github.com/ErickSimoes/Ultrasonic/tree/master/examples).

License
----
Ultrasonic by [Erick Simões](http://ericksimoes.com.br/ "Erick Simões") is licensed under a MIT License.
Based on the work of Carl John Nobile available [here](http://wiki.tetrasys-design.net/HCSR04Ultrasonic).
Feel free to contact the author on Twitter: [@AloErickSimoes](https://twitter.com/AloErickSimoes)

See [LICENSE](https://github.com/ErickSimoes/Ultrasonic/blob/master/LICENSE) for details.
