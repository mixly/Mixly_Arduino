"""
Seniverse Weather API

MicroPython library for Seniverse Weather API
=======================================================

#Preliminary composition       	20220420
#https://www.seniverse.com/api

dahanzimin From the Mixly Team
"""

import json
import urequests

_weather_now="http://api.seniverse.com/v3/weather/now.json?"			#天气实况 
_weather_daily="http://api.seniverse.com/v3/weather/daily.json?" 		#逐日天气预报
_weather_hourly="http://api.seniverse.com/v3/weather/hourly.json?"		#逐时天气预报
_weather_alarm="http://api.seniverse.com/v3/weather/alarm.json?"		#气象灾害预警
_life_suggestion="http://api.seniverse.com/v3/life/suggestion.json?"	#生活指数
_air_now="http://api.seniverse.com/v3/air/now.json?"					#空气质量实况	
_air_daily="http://api.seniverse.com/v3/air/daily.json?"				#逐日空气质量预报
_air_hourly="http://api.seniverse.com/v3/air/hourly.json?"				#逐时空气质量预报
_tide_daily="http://api.seniverse.com/v3/tide/daily.json?"				#逐时潮汐预报
_geo_sun="http://api.seniverse.com/v3/geo/sun.json?"					#日出日落
_geo_moon="http://api.seniverse.com/v3/geo/moon.json?"					#月出月落和月相
_location_search="http://api.seniverse.com/v3/location/search.json?"	#城市搜索

#数据请求
class API_BASE:
	_results = None
	def _urequests_api(self, url):
		try:
			results=json.loads(urequests.post(url).text)
		except Exception as e:
			raise RuntimeError("API request failed or WiFi is not connected",e)
			
		if "status" in results.keys():
			raise ValueError(results["status"])
		if "results" in results.keys():
			return results["results"]

#天气实况		https://docs.seniverse.com/api/weather/now.html
class Weather_now(API_BASE):
	def request(self, key, location):
		url = "{}key={}&location={}".format(_weather_now, key, location)
		self._results = self._urequests_api(url)[0]['now']

	def analysis(self, key=None):
		if key is None:
			return self._results
		else:
			return self._results[key]

Weather_now = Weather_now()

#逐日天气预报		https://docs.seniverse.com/api/weather/daily.html
class Weather_daily(API_BASE):
	def request(self, key, location, days=1):
		url = "{}key={}&location={}&days={}".format(_weather_daily, key, location, days)
		self._results  = self._urequests_api(url)[0]['daily']

	def analysis(self, days=1, key=None):
		if key is None:
			return self._results[days]
		else:
			return self._results[days][key]

Weather_daily = Weather_daily()

#逐时天气预报		https://docs.seniverse.com/api/weather/hourly.html
class Weather_hourly(API_BASE):
	def request(self, key, location, hours=1):
		url = "{}key={}&location={}&hours={}".format(_weather_hourly, key, location, hours)
		self._results  = self._urequests_api(url)[0]['hourly']

	def analysis(self, hours=1, key=None):
		if key is None:
			return self._results[hours]
		else:
			return self._results[hours][key]

#Weather_hourly = Weather_hourly() #暂不开启

#空气质量实况		https://docs.seniverse.com/api/air/now.html
class Air_now(API_BASE):
	def request(self, key, location):
		url = "{}key={}&location={}&scope=city".format(_air_now, key, location)
		self._results = self._urequests_api(url)[0]['air']['city']

	def analysis(self,  key=None):
		if key is None:
			return self._results
		else:
			return self._results[key]
 
Air_now = Air_now()

#逐日空气质量预报	https://docs.seniverse.com/api/air/daily5d.html
class Air_daily(API_BASE):
	def request(self, key, location, days=1):
		url = "{}key={}&location={}&days={}".format(_air_daily, key, location, days)
		self._results = self._urequests_api(url)[0]['daily']

	def analysis(self, days=1, key=None):
		if key is None:
			return self._results[days]
		else:
			return self._results[days][key]

Air_daily= Air_daily()

#逐时空气质量预报	https://docs.seniverse.com/api/air/hourly5d.html
class Air_hourly(API_BASE):
	def request(self, key, location, hours=1):
		url = "{}key={}&location={}&hours={}&days=1".format(_air_hourly, key, location, hours)
		self._results = self._urequests_api(url)[0]['hourly']

	def analysis(self, hours=1, key=None):
		if key is None:
			return self._results[hours]
		else:
			return self._results[hours][key]

#Air_hourly = Air_hourly()	#暂不开启

#气象灾害预警		https://docs.seniverse.com/api/weather/alarm.html
class Weather_alarm(API_BASE):
	def request(self, key, location):
		url = "{}key={}&location={}".format(_weather_alarm, key, location)
		results = self._urequests_api(url)[0]['alarms']
		self._results = results[0] if results else {}

	def analysis(self, key=None):
		if key is None:
			return self._results
		if key in self._results.keys():
			return self._results[key]

Weather_alarm = Weather_alarm()

#生活指数		https://docs.seniverse.com/api/life/suggestion.html
class Life_suggestion(API_BASE):
	def request(self, key, location):
		url = "{}key={}&location={}".format(_life_suggestion, key, location)
		self._results = self._urequests_api(url)[0]['suggestion']

	def analysis(self,  key=None, brief=False):
		if key is None:
			return self._results
		else:
			return self._results[key]['brief'] if brief else self._results[key]['details']
 
Life_suggestion = Life_suggestion()

#24时潮汐预报		https://docs.seniverse.com/api/ocean/tide.html
class Tide_daily(API_BASE):
	def request(self, key, location):
		url = "{}key={}&location={}&days=1".format(_tide_daily, key, location)
		self._results = self._urequests_api(url)[0]['ports'][0]['data'][0]

	def analysis(self,  key=None):
		if key is None:
			return self._results
		else:
			key = key.split(',')
			if len(key) == 1:
				return self._results[key[0]]
			if len(key) == 2:
				return self._results['range'][int(key[0])][key[1]]

Tide_daily = Tide_daily()

#日出日落			https://docs.seniverse.com/api/geo/sun.html
class Geo_sun(API_BASE):
	def request(self, key, location, days=1):
		url = "{}key={}&location={}&days={}".format(_geo_sun, key, location, days)
		self._results = self._urequests_api(url)[0]['sun']

	def analysis(self, days=1, key=None):
		if key is None:
			return self._results[days]
		else:
			return self._results[days][key]

Geo_sun = Geo_sun()

#月出月落和月相 	https://docs.seniverse.com/api/geo/moon.html
class Geo_moon(API_BASE):
	def request(self, key, location, days=1):
		url = "{}key={}&location={}&days={}".format(_geo_moon, key, location, days)
		self._results = self._urequests_api(url)[0]['moon']

	def analysis(self, days=1, key=None):
		if key is None:
			return self._results[days]
		else:
			return self._results[days][key]

Geo_moon = Geo_moon()

#城市搜索			https://docs.seniverse.com/api/fct/search.html
class Location_search(API_BASE):
	def request(self, key, location):
		url = "{}key={}&q={}&limit=50".format(_location_search, key, location)
		results = self._urequests_api(url)
		self._results = results[0] if results else {}

	def analysis(self, key=None):
		if key is None:
			return self._results
		else:
			if key in self._results.keys():
				return self._results[key]

Location_search = Location_search()
	