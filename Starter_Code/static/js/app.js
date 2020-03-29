
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}
//Read in json file
d3.json("data/samples.json").then((samples) => {
    console.log(samples);
});   
function buildplot(sampleid) {d3.json("data/samples.json").then((belly) => {
    var samples = belly.samples;
    console.log(samples);

    var filtereddata = samples.filter(sampleobject => sampleobject.id == sampleid)
    console.log(filtereddata);

    var outids = filtereddata[0].otu_ids;
    var labels = filtereddata[0].otu_labels;
    var samplevalues = filtereddata[0].sample_values;



var trace1 = {
    x: samplevalues.slice(0,10),
    y: labels.slice(0,10),
    type: "bar", orientation: "h"
}
          
var data = [trace1];
          
var layout = {
    title: "Top 10 OTUs by Individual Chart",
    height: 900,
    width: 900,
    margin: { t: 30, l: 150 }
}   
Plotly.newPlot("bar", data, layout);
});  
}


function dropdown() {
    var selector = d3.select("#selDataset");
    d3.json("data/samples.json").then((belly) => {
    var samplenames = belly.names;
    
    samplenames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
    });
    var firstSample = samplenames[0];
    buildplot(firstSample);
      });
    }
dropdown();

function optionChanged(sample) {
    buildplot(sample);
}
// })