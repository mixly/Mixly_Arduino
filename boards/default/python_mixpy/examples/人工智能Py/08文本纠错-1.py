import aip


client = aip.AipNlp("Enter Your APP_ID", "Enter Your API_KEY", "Enter Your SECRET_KEY")
print(client.ecnet("促进创客教育与本地新形产业的整合，促进当地经济的发展。", options={}))
