import urllib.request

def connect(url):
	website = urllib.request.urlopen(url)
	input = website.read().split()
	print(input)

connect("http://www.cbioportal.org/webservice.do?cmd=getClinicalData&case_set_id=ov_tcga_all")