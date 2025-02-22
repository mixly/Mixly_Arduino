import aip


client = aip.AipNlp("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
result = client.ecnet("促进创客教育与本地新形产业的整合，促进当地经济的发展。", options={})
content = result["text"]
item = result["item"]
wrong = item["vec_fragment"][0]["ori_frag"]
right = item["vec_fragment"][0]["correct_frag"]
print(content.replace(wrong,"{}【{}】".format(wrong, right)))
