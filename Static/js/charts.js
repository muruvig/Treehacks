//Illumina
queue()
    .defer(d3.json, "/treehacks/patientData")
    .defer(d3.json, "static/medjson/clinical-data.json")
    .await(makeGraphs);

function makeGraphs(error, patientDataJson, medJson) {
    ...
};

//Inside the makeGraphs function, we start by cleaning the projects data. 
//We change the date type from string to datetime objects, and we set all projects date days to 1. 
//All projects from the same month will have the same datetime value.

var treehackspatientData = patientDataJson;

//Crossfilter Instance
var ndx = crossfilter(treehackspatientData);

//23 Data Dimensions
var clincal_stage = ndx.dimension(function(d) { return d["clincal_stage"]; });
var tumor_tissue_site = ndx.dimension(function(d) { return d["tumor_tissue_site"]; });
var icd_o_3_site = ndx.dimension(function(d) { return d["icd_o_3_site"]; });
var icd_o_3_histology = ndx.dimension(function(d) { return d["icd_o_3_histology"]; });
var age  = ndx.dimension(function(d) { return d["age"]; });
var gender  = ndx.dimension(function(d) { return d["gender"]; });
var ethnicity  = ndx.dimension(function(d) { return d["ethnicity"]; });
var os_months  = ndx.dimension(function(d) { return d["os_months"]; });
var tumor_status  = ndx.dimension(function(d) { return d["tumor_status"]; });
var last_contact_days_to  = ndx.dimension(function(d) { return d["last_contact_days_to"]; });
var specimen_second_longest_dimension  = ndx.dimension(function(d) { return d["specimen_second_longest_dimension"]; });
var dfs_status  = ndx.dimension(function(d) { return d["dfs_status"]; });
var days_to_birth  = ndx.dimension(function(d) { return d["days_to_birth"]; });
var primary_site  = ndx.dimension(function(d) { return d["primary_site"]; });
var vital_status  = ndx.dimension(function(d) { return d["vital_status"]; });
var os_status  = ndx.dimension(function(d) { return d["os_status"]; });
var history_neoadjuvant_trtyn  = ndx.dimension(function(d) { return d["history_neoadjuvant_trtyn"]; });
var method_of_sample_procurement  = ndx.dimension(function(d) { return d["method_of_sample_procurement"]; });
var residual_tumor  = ndx.dimension(function(d) { return d["residual_tumor"]; });
var tissue_source_site  = ndx.dimension(function(d) { return d["tissue_source_site"]; });
var initial_pathologic_dx_year  = ndx.dimension(function(d) { return d["initial_pathologic_dx_year"]; });
var days_to_initial_pathologic_diagnosis  = ndx.dimension(function(d) { return d["days_to_initial_pathologic_diagnosis"]; });
var dfs_months  = ndx.dimension(function(d) { return d["dfs_months"]; });


//24 Data Groups
var all = ndx.groupAll();
var numpatientDatabyclinical_stage = clincal_stage.group();
var numpatientDatabytumor_tissue_site = tumor_tissue_site.group(); 
var numpatientDatabyicd_o_3_site = icd_o_3_site.group(); 
var numpatientDatabyicd_o_3_histology = cicd_o_3_histology.group(); 
var numpatientDatabyage = age.group(); 
var numpatientDatabygender = gender.group(); 
var numpatientDatabyethnicity = ethnicity.group(); 
var numpatientDatabyos_months = os_months.group(); 
var numpatientDatabytumor_status = tumor_status.group(); 
var numpatientDatabylast_contact_days_to = last_contact_days_to.group(); 
var numpatientDatabyspecimen_second_longest_dimension = specimen_second_longest_dimension.group(); 
var numpatientDatabydfs_status = dfs_status.group(); 
var numpatientDatabydays_to_birth = days_to_birth.group(); 
var numpatientDatabyprimary_site = primary_site.group(); 
var numpatientDatabyvital_status = vital_status.group(); 
var numpatientDatabyos_status = os_status.group(); 
var numpatientDatabyhistory_neoadjuvant_trtyn = history_neoadjuvant_trtyn.group(); 
var numpatientDatabymethod_of_sample_procurement = method_of_sample_procurement.group(); 
var numpatientDatabyresidual_tumor = residual_tumor.group(); 
var numpatientDatabytissue_source_site = tissue_source_site.group(); 
var numpatientDatabyinitial_pathologic_dx_year = initial_pathologic_dx_year.group(); 
var numpatientDatabydays_to_initial_pathologic_diagnosis = days_to_initial_pathologic_diagnosis.group(); 
var numpatientDatabydfs_months = dfs_months.group();

// Next, we define 3 values: The maximum donation in all states, the date of the first and last posts.
// var max_state = totalDonationsByState.top(1)[0].value;
// var minDate = dateDim.bottom(1)[0]["date_posted"];
// var maxDate = dateDim.top(1)[0]["date_posted"];


//Next, we define 6 dc charts. The first one is a bar chart that will show the number of projects by date. 
//The second and third charts will show the number of projects broken down by the resource type and poverty level of school. 
//The fourth graph will show a US map color-coded by the toal amount of donations for each US state. 
//And the last two are numbers that will show the total number of projects and the total donations in USD.

var timeChart = dc.barChart("#time-chart");
var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
var usChart = dc.geoChoroplethChart("#us-chart");
var numberProjectsND = dc.numberDisplay("#number-projects-nd");
var totalDonationsND = dc.numberDisplay("#total-donations-nd");


//For each chart, we pass the necessary parameters.

numberProjectsND
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(all);

totalDonationsND
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(totalDonations)
    .formatNumber(d3.format(".3s"));

timeChart
    .width(600)
    .height(160)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(dateDim)
    .group(numProjectsByDate)
    .transitionDuration(500)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .elasticY(true)
    .xAxisLabel("Year")
    .yAxis().ticks(4);

resourceTypeChart
    .width(300)
    .height(250)
    .dimension(resourceTypeDim)
    .group(numProjectsByResourceType)
    .xAxis().ticks(4);

povertyLevelChart
    .width(300)
    .height(250)
    .dimension(povertyLevelDim)
    .group(numProjectsByPovertyLevel)
    .xAxis().ticks(4);

usChart.width(1000)
    .height(330)
    .dimension(stateDim)
    .group(totalDonationsByState)
    .colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
    .colorDomain([0, max_state])
    .overlayGeoJson(statesJson["features"], "state", function (d) {
        return d.properties.name;
    })
    .projection(d3.geo.albersUsa()
                .scale(600)
                .translate([340, 150]))
    .title(function (p) {
        return "State: " + p["key"]
                + "\n"
                + "Total Donations: " + Math.round(p["value"]) + " $";
    })

//And finally, we call the renderAll() function for rendering all the charts.

dc.renderAll();

//Within the index.html file, we have to reference all the charts that we defined in the charts.js file. 
//For example, if we want to show the US map chart, we have to add the line below to the index.html file.

<div id="us-chart"></div>