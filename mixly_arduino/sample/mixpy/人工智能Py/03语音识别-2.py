import audio

import aip


audio.audio_record("d:\\1.wav",3)
f = open("d:\\1.wav", 'rb')
client = aip.AipSpeech("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
print(client.asr(f.read(), options={})["result"][0])
