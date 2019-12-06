import FileDialog

import aip


f = open(FileDialog.getOneFile(), 'rb')
client = aip.AipOcr("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
print(client.licensePlate(f.read(), options={}))
