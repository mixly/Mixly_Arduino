import FileDialog

import aip


f = open(FileDialog.getOneFile(), 'rb')
f2 = open(FileDialog.getOneFile(), 'rb')
client = aip.AipOcr("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
client2 = aip.AipImageClassify("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
print(client.licensePlate(f.read(), options={})["words_result"]["number"])
print(client2.carDetect(f2.read(), options={}))
