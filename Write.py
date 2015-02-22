from Scrape import *
from pymongo import *


url_list = ["http://www.cbioportal.org/webservice.do?cmd=getClinicalData&case_set_id=ov_tcga_all", "http://www.cbioportal.org/webservice.do?cmd=getMutationData&genetic_profile_id=ov_tcga_mutations+ucec_tcga_mutations&gene_list=BRCA1"]

def connect():
	client = MongoClient()
	db = client.treehacks
	return db

def write(database, urls=url_list):
	for url in urls:
		collection = database.patientData
		json_data = json_return(url)
		for elem in json.loads(json_data):
			collection.update({'case_id':elem['case_id']}, {'$set': elem}, upsert = True)

def main(urls=url_list):
	db = connect()
	write(db)

main()