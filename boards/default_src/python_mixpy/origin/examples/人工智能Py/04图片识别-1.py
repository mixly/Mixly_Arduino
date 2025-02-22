import FileDialog

import aip


f = open(FileDialog.getOneFile(), 'rb')
client = aip.AipImageClassify("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
print(client.advancedGeneral(f.read(), options={})["result"][0]["keyword"])
