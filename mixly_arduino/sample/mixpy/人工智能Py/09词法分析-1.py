import aip


client = aip.AipNlp("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
s = ""
for i in client.lexer("我爱米思齐", options={})["items"]:
    if s != "":
        s = s + "/"
    s = s + i["item"]
print(s)
