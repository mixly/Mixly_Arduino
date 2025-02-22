import aip

import os


f = open("audio.mp3", 'wb')
client = aip.AipSpeech("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
f.write(client.synthesis("步行导航开始，直行后前方50米右转", options={}))
os.startfile("audio.mp3")
