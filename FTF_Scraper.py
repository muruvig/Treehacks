import urllib.request
import json

def extract(url):
	website = urllib.request.urlopen(url)
	list_data = website.read().decode('utf-8').split("\n")
	return list_data

def make_report(lst):
	formatted_list = []
	keys = lst[0].split("\t")
	print(keys)
	for elem in lst[1:]:
		report_list = elem.split("\t")
		report_dic = {}
		for i, value in enumerate(report_list):
			report_dic[keys[i]] = value
		formatted_list.append(report_dic)
	print(formatted_list)


def main():
	data = extract("http://www.cbioportal.org/webservice.do?cmd=getClinicalData&case_set_id=ov_tcga_all")
	make_report(data)

main()