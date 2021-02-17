import beautify from "json-beautify";
import fs from "fs";
import parse from "csv-parse/lib/sync.js";

var cityLabels =
	{
	"Amsterdam": "ams",
	"Bangalore": "blr",
	"Copenhagen": "cph",
	"Capetown": "cpt",
	"Hamburg": "ham",
	"Helsinki": "hel",
	"St.Petersburg": "len",
	"London": "lon",
	"Moscow": "mow",
	"New-York": "nyc",
	"Paris": "par",
	"San-Francisco": "sfo",
	"Shanghai": "sha",
	"Stockholm": "sto",
	"Sydney": "syd",
	"Warsaw": "waw"
	};


export function TopologyConverter()
{
var self = this;

/*

Coverts json objects from this format:

{
"default-stream-id::0": 
	{
		"Moscow-32276": ["Copenhagen-31823", "Copenhagen-32124", "London-30733", "Moscow-31546"], 
		"Hamburg-31207": ["Amsterdam-30423", "Hamburg-31304", "St.Petersburg-31965", "Sydney-30781"],
	...
	}	
}	

to this format:

{
"nodes": 
	{
	"0": { "label": "cpt0", "city": "cpt", "index": 0 },
    "1": { "label": "ham1", "city": "ham", "index": 1 },	
	...	
	},
"links": 
	[
    [ "0", "3"],
    [ "0", "128"],
	...
	]
}
*/

self.getSimulatorNodeLabels = function(indexes, simulatorNodes)
	{
	var ret = new Array();

	for (var i=0; i<indexes.length; i++)
		{
		ret.push(simulatorNodes[indexes[i]].label);	
		}

	return ret;		
	}

self.trackerToSimulator = function(original)
	{
	//console.log("Original data: ");	
	//console.log(beautify(original, null, 2, 100));

	var tempNodes = {};
	var nodes = {};

	var originalLinks = original[Object.keys(original)[0]];
	var finalLinks = [];

	let j = 0;
	for (let i in originalLinks)
		{
		var cityName = null;
		var arr	= i.split("-");
		
		if (arr.length > 3)
			cityName = arr[0]+"-"+arr[1]+"-"+arr[2];
		else
			cityName = arr[0];

		let city = 	cityName; //cityLabels[cityName];	
		
		tempNodes[i] = {label: (city+j), city: city, index: j};
		nodes[j+""] = {label: (city+j), city: city, index: j};
		
		j++; 	
		}
	
	//console.log("tempNodes: ");	
	//console.log(beautify(tempNodes, null, 2, 100));	


	for (let i in originalLinks)
		{
		var links = originalLinks[i];

		for (var k=0; k<links.length; k++)
			{
			//console.log("link to: "+links[k]);	
			finalLinks.push( [(tempNodes[i].index+""), tempNodes[links[k]].index+""]); 	
			}
		}	

	return { nodes: nodes, links: finalLinks };	
	};

self.simulatorToGdf = function(graph) 
	{
	let nodes = graph.nodes;
	let links = graph.links;	

	var result = "nodedef>name VARCHAR,label VARCHAR\n";
    
	for (let i in nodes) 
		{
        result += `${nodes[i].index},${nodes[i].label}\n`;
        }
    
    result += "edgedef>node1 VARCHAR,node2 VARCHAR\n";
    
	for (let i in links) 
		{
        result += `${links[i][0]},${links[i][1]}\n`;        
		}
		    
    return result;
    };	

self.insertUnitDelaysToTopology = function(topology)
	{
	let links = topology.links;
	
	for (let i = 0; i < links.length; i++)
		{
		links[i].push(1);	
		}

	return topology;
	};

self.loadDelayMatrixFromCsv = function(fileName)
	{
	const csv = fs.readFileSync(fileName);	
	
	const records = parse(csv, {
		columns: true,
		skip_empty_lines: true
	  });

	var ret = {};

	for (var i=0; i<records.length; i++)  
	  	{
		let record = records[i];
		
		let cityName = record[""];
		
		ret[cityName] = record;
		delete record[""];

		for (var j in record)
			{
			if ( Math.round(parseFloat(record[j])) == 0)
				record[j] = Math.round(0.2 * 1000 /2);
			else
				record[j] = Math.round(parseFloat(record[j]) * 1000 /2);	
		
				//Coerce sub-millisecond delays to be 0.1ms!!!!!!!!!!
			//if (record[j] < 1000)
			//	record[j] = 250;
			}
		}
	console.log(beautify(ret));
	return ret;
	}
}



/*
let rawdata = fs.readFileSync("2ktopology.json");
let original = JSON.parse(rawdata);

var converter = new TopologyConverter();
var result = converter.trackerToSimulator(original);

console.log(beautify(result, null, 2, 100));
*/