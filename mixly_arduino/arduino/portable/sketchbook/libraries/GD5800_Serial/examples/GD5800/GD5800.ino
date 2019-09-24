/** GD5800 serial MP3 Player Arduino Library
  Auther:hznupeter
  website:
  GD5800 串口MP3播放模块arduino 库
*/
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <GD5800_Serial.h>

GD5800_Serial mp3(8, 9); //（rx,tx）

void setup() {
  mp3.begin(9600);
  mp3.setVolume(20);//设置音量,0-30
  mp3.setLoopMode(MP3_LOOP_ALL);//设置循环模式
  //MP3_LOOP_ALL      全部循环
  //MP3_LOOP_FOLDER   文件夹内循环
  //MP3_LOOP_ONE      单曲循环
  //MP3_LOOP_RAM      随机播放
  mp3.play();  //播放
  mp3.setEqualizer(MP3_EQ_NORMAL);//设置EQ
  // MP3_EQ_NORMAL
  //MP3_EQ_POP
  // MP3_EQ_ROCK
  // MP3_EQ_JAZZ
  //MP3_EQ_CLASSIC
  //MP3_EQ_BASS
}

//控制函数
//mp3.restart();  //重新播放
//mp3.pause();  //暂停
//mp3.playFileByIndexNumber(20);//选择播放曲目0-65535

//查询函数
// Serial.println(mp3.getStatus());//获取播放状态，返回值 MP3_STATUS_PAUSED, MP3_STATUS_PLAYING and MP3_STATUS_STOPPED
// Serial.println(mp3.getVolume());//获取音量值0-30
// Serial.println(mp3.getEqualizer());//获取当前EQ
// Serial.println(mp3.getLoopMode());//获取播放模式
// Serial.println(mp3.countFiles());//获取 U 盘总文件数
// Serial.println(mp3.currentFileIndexNumber());//查询 U 盘的当前曲目


void loop() {

  if (!digitalRead(2))
  {
    mp3.prev();  //上一曲

  }
  else  if (!digitalRead(3))
  {
  	 mp3.next();  //下一曲
   
  }
  else  if (!digitalRead(4))
  {
    mp3.volumeUp();//音量加

  }
  else  if (!digitalRead(5))
  {
    mp3.volumeDn();//音量减
  }
}
