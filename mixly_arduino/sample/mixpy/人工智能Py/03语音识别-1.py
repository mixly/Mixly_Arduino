import FileDialog

import aip


f = open(FileDialog.getOneFile(), 'rb')
client = aip.AipSpeech("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
print(client.asr(f.read(), options={})["result"][0])
