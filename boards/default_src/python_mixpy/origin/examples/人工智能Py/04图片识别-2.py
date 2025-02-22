import aip

import FileDialog


client = aip.AipImageClassify("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
for i in FileDialog.getManyFiles():
    f = open(i, 'rb')
    print(client.advancedGeneral(f.read(), options={})["result"][0]["keyword"])
