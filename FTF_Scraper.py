import urllib.request

def extract(url):
	website = urllib.request.urlopen(url)
	list_data = website.read().decode('utf-8').split("\n")
	return list_data

def make_report(lst):
	return_lst = []
	for elem in lst:
		return_lst.append(elem.split("\t"))
	print(return_lst)


def main():
	data = extract("http://www.cbioportal.org/webservice.do?cmd=getClinicalData&case_set_id=ov_tcga_all")
	make_report(data)

main()