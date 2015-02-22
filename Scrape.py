import urllib.request
import json
import pymongo

def extract(url):
	website = urllib.request.urlopen(url)
	list_data = website.read().decode('utf-8').split("\n")
	return list_data

def json_report(lst):
	start = 0;
	if lst[0][0][0] == '#':
		start += 1
	formatted_list = []
	keys = lst[start].lower().split("\t")
	id_index = None
	for report in lst[(start+1):-1]:
		if report == '' or report[0] != '#':
			report_list = report.split("\t")
			report_dic = {}
			for i, value in enumerate(report_list):
				report_dic[keys[i]] = value
			formatted_list.append(report_dic)
	return json.dumps(formatted_list, sort_keys=True)
	# print(json.dumps(formatted_list, sort_keys=True, indent=4, separators=(',', ': '))) ; use to pretty print
	# print(formatted_list) ; use this to print normally

def json_return(url):
	data = extract(url)
	json_data = json_report(data)
	return json_data