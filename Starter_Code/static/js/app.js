//Read in json file
 d3.json("data/samples.json").then((samples) => {
    console.log(samples);
}); 
//Bar chart and Bubble Chart data  
function buildplot(sampleid) {d3.json("data/samples.json").then((belly) => {
    var samples = belly.samples;
    // console.log(samples);

    var filtereddata = samples.filter(sampleobject => sampleobject.id == sampleid)
    // console.log(filtereddata);

    var otuids = filtereddata[0].otu_ids;
    var labels = filtereddata[0].otu_labels;
    var samplevalues = filtereddata[0].sample_values;

    // console.log(otuids);
//Demographic information
    var meta = belly.metadata;
    // console.log(meta);

    var filteredmeta = meta.filter(metaobject => metaobject.id == sampleid)
    filteredmeta = filteredmeta[0];
    console.log("data", filteredmeta);

    var cell = d3.select(".panel-body");
    cell.html("");
    cell.append("p");
    var dinfo= ("");
    
    
    Object.entries(filteredmeta).forEach(function([key, value]) {
    // cell.text(value);
        dinfo = dinfo + `${key}: ${value}<br>`;   
    });
    cell.html(dinfo);

//Build the bar chart 
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
Plotly.newPlot("bar", data1, layout1);

//Build the bubble chart 
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
Plotly.newPlot("bubble", data2, layout2);

var data3 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: filteredmeta.wfreq,
      title: { text: "Belly Button Washing Frequency: Scrubs Per Week" },
      type: "indicator",
      mode: "gauge+number+hand",
      delta: { reference: 5 },
      gauge: {
        axis: { range: [null, 10] },
        steps: [
          { range: [0, 1], color: "lightgray" },
          { range: [1, 2], color: "gray" },
          { range: [2, 3], color: "lightgreen" },
          { range: [3, 4], color: "green" },
          { range: [4, 5], color: "darkgreen" },
          { range: [5, 6], color: "lightred" },
          { range: [6, 7], color: "red" },
          { range: [7, 8], color: "darkred" },
          { range: [8, 9], color: "darkblue" }
        ]
        }
      }
    
  ];
  
  var layout3 = { type:'line', width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data3, layout3);

});  
}  
//Build function that allows for dynamic updating on selected test subject
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
