/* Arduino library for digital weight scale of hx711
 *
 * hardware design: syyyd
 * available at http://syyyd.taobao.com
 *
 * library design: Weihong Guan (@aguegu)
 * http://aguegu.net
 *
 * library host on
 * https://github.com/aguegu/Arduino
 *
 *  Created on: Oct 31, 2012
 */

#ifndef HX711_H_
#define HX711_H_

#include "Arduino.h"

class Hx711
{
private:
	int DOUT;
	int SCK;

	float scale;
	long offset;
public:
	Hx711(int IO_DOUT,int IO_SCK);
	void setScale(float IO_scale);
	void setOffset(long IO_offset);

	long getValue();
	long getAverageValue(char IO_times);
	float getWeight(char IO_times);
};

#endif /* HX711_H_ */
