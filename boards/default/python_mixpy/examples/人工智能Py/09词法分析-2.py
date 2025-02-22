import aip


client = aip.AipNlp("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
word= {"r":"代词", "v":"动词", "nr":"名词"}
s = ""
for i in client.lexer("我爱米思齐", options={})["items"]:
    s = s + i["item"]
    s = s + "【"
    s = s + word[i["pos"]]
    s = s + "】"
print(s)
