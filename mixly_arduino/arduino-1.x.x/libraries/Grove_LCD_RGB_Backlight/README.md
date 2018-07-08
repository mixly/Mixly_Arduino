Grove - LCD RGB Backlight
---------------------------------------------------------

[![Grove - LCD RGB Backlight](http://www.seeedstudio.com/depot/images/product/LCD%20RGB.jpg)](http://www.seeedstudio.com/depot/grove-lcd-rgb-backlight-p-1643.html?cPath=34_36)



<br>
Done with tedious mono color backlight? This Grove enables you to set the color to whatever you like via the simple and concise Grove interface. It takes I2C as communication method with your microcontroller. So number of pins required for data exchange and backlight control shrinks from ~10 to 2, relieving IOs for other challenging tasks. Besides, Grove - LCD RGB Backlight supports user-defined characters. Want to get a love heart or some other foreign characters? Just take advantage of this feature and design it!



<br>
## Usage:

This is an Arudino Library. It include a .h file, a .cpp file and some examples. Through these examples, you can quickly master the use of Grove - LCD RGB Backlight.

The folowing we will introduce some function which is used very normal. 


### Initialization
At the very beginning of we use this lcd, we should had it initialized. You can use this function :

    lcd.begin(16, 2);

It means that this lcd has 16 lines and 2 rows.


<br>
### Change Color of Backlight
One of Grove - LCD RGB Backlight's most important feature is: you can change the color backlight, and it's a very simple thing, just use the folowing function:

    void setRGB(int r, int g, int b);


<br>
### Clear Display

You can clear the display by this function:

    void clear();

<br>
### Turn on and turn of display

    void noDisplay();			// turn off display
    void display();				// turn on display

<br>
### Blink

    void noBlink();
    void blink();

<br>
### Cursor

    void noCursor();
    void cursor();


<br>
For more information, please refer to [wiki page](http://www.seeedstudio.com/wiki/Grove_-_LCD_RGB_Backlight).

    
----

This software is written by loovee([luweicong@seeedstudio.com](luweicong@seeedstudio.com "luweicong@seeedstudio.com")) for seeed studio<br>
and is licensed under [The MIT License](http://opensource.org/licenses/mit-license.php). Check License.txt for more information.<br>

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed Studio is an open hardware facilitation company based in Shenzhen, China. <br>
Benefiting from local manufacture power and convenient global logistic system, <br>
we integrate resources to serve new era of innovation. Seeed also works with <br>
global distributors and partners to push open hardware movement.<br>



[![Analytics](https://ga-beacon.appspot.com/UA-46589105-3/Grove_LCD_RGB_Backlight)](https://github.com/igrigorik/ga-beacon)



