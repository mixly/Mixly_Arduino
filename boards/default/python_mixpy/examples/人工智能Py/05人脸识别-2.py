import aip

import cam

import FileDialog


client = aip.AipFace("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
cam.photo_capture("d:\\1.jpg","q")
print(client.match(FileDialog.getOneFile(),FileDialog.getOneFile(), options={})["score"])
