float speed;
long updown;

float tonelist[]={1046.5,1174.7,1318.5,1396.9,1568,1760,1975.5};

long musiclist[]={1,2,3,1,1,2,3,1,3,4,5,3,4,5,5,6,5,4,3,1,5,6,5,4,3,1,2,5,1,2,5,1};

long highlist[]={0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,-1,0};

long updownlist[]={0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};

float rhythmlist[]={1,1,1,1,1,1,1,1,1,1,2,1,1,2,0.5,0.5,0.5,0.5,1,1,0.5,0.5,0.5,0.5,1,1,1,1,2,1,1,2};

void playmusic() {
  for (int i = 1; i <= 32; i = i + (1)) {
    tone(8,(tonelist[(int)(musiclist[(int)(i - 1)] - 1)] * pow(2, highlist[(int)(i - 1)])) * pow(2, (updownlist[(int)(i - 1)] + updown) / 12.0));
    delay(((1000 * (60 / speed)) * rhythmlist[(int)(i - 1)]));
    noTone(8);
    delay(10);
  }
}

void setup()
{
  speed = 120.0;
  updown = 0;
  pinMode(8, OUTPUT);
  pinMode(2, INPUT);
}

void loop()
{
  if (digitalRead(2)) {
    playmusic();

  }

}