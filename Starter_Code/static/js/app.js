
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

    var meta = belly.metadata;
    console.log(meta);

    var filteredmeta = meta.filter(metaobject => metaobject.id == sampleid)
    console.log(filteredmeta);

    var cell = d3.select("panel-body");
    cell.html("");
    Object.entries(meta).forEach(function([key, value]) {
        var row = cell.append("sample-metadata");
        row.text(value);
    });
    

    var filtereddata = samples.filter(sampleobject => sampleobject.id == sampleid)
    console.log(filtereddata);

    var otuids = filtereddata[0].otu_ids;
    var labels = filtereddata[0].otu_labels;
    var samplevalues = filtereddata[0].sample_values;

    console.log(otuids);


var trace1 = {
    x: samplevalues.slice(0,10),
    y: labels.slice(0,10),
    type: "bar", orientation: "h"
};
 
var data1 = [trace1];

var layout1 = {
    title: "Top 10 OTUs by Individual Chart",
    height: 900,
    width: 900,
    margin: { t: 30, l: 150 },
    showlegend:false,
};
          
Plotly.plot("bar", data1, layout1);

var trace2 = {
    type:"scatter",
    mode:"markers",
    x:otuids,
    y:samplevalues,
    text:labels,
    marker: {
        size: samplevalues,
        color: otuids,
        sizemode: 'area'
    }
};
var data2 = [trace2];

var layout2 = {
    title: "Samples",
    showlegend:false,

};

Plotly.plot("bubble", data2, layout2);

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


;
