import aip

import FileDialog


client = aip.AipFace("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
print(client.match(FileDialog.getOneFile(),FileDialog.getOneFile(), options={})["score"])
