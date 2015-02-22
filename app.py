from flask import Flask
from flask import render_template
from pymongo import *
import json
from bson import json_util
from bson.json_util import dumps


app = Flask(__name__)

MONGODB_HOST = 'MuruPC'
MONGODB_PORT = 27017
DBS_NAME = 'treehacks'
COLLECTION_NAME = 'testData'
FIELDS = {'case_id': True, 'age': True, 'clinical_stage': True, 'days_to_birth': True, 'days_to_death': True, 
'days_to_initial_pathologic_diagnosis': True, 'dfs_status': True, 'ecog_score': True, 'ethnicity': True, 'gender': True, 'history_neoadjuvant_trtyn': True,
'history_other_malignancy': True, 'icd_10': True, 'icd_o_3_histology': True, 'icd_o_3_site': True, 'initial_pathologic_dx_year': True, 'karnofsky_performance_score': True, 'last_contact_days_to': True,
'method_of_sample_procurement': True, 'new_tumor_event_after_initial_treatment': True, 'os_months': True, 'os_status': True, 'performance_status_timing': True, 'pharmaceutical_tx_adjuvant': True,
'primary_site': True, 'prospective_collection': True, 'race': True, 'radiation_treatment_adjuvant': True, 'residual_tumor': True, 'retrospective_collection': True, 'specimen_second_longest_dimension': True, 'tissue_source_site': True,
'treatment_outcome_first_course': True, 'tumor_status': True, 'tumor_tissue_site': True, 'vital_status': True, '_id': False}

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/treehacks/testData")
def testing_data():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    data = collection.find(fields=FIELDS)
    json_projects = []
    for i in data:
        json_projects.append(i)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.disconnect()
    return json_projects

if __name__ == "__main__":
    app.run(debug=True)