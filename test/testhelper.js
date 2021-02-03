var fs = null;

if (typeof module !== 'undefined')
	fs = require('fs');

function TestHelper() {}

TestHelper.convertTopology = function(rawData)  {
	let topology = JSON.parse(rawData);
	let result = [];
	for (let i = 0; i < topology.links.length; i++) {
		result.push([parseInt(topology.links[i][0]), parseInt(topology.links[i][1]), topology.links[i][2]]);
	}
	return result;
}

TestHelper.loadTopology = function(fileName)  {
	let rawdata = fs.readFileSync(fileName);
	
	return TestHelper.convertTopology(rawdata);
	/*
	let topology = JSON.parse(rawdata);
	
	let result = [];
	for (let i = 0; i < topology.links.length; i++) {
		result.push([parseInt(topology.links[i][0]), parseInt(topology.links[i][1]), topology.links[i][2]]);
	}
	return result;
	*/
}

TestHelper.areResultsEqual = function(result1, result2) {

	if (result1.maximumDistance !== result2.maximumDistance)
		return false;

	if (result1.maximumPathHops !== result2.maximumPathHops)
		return false;
	
	for (var i = 0; i < result1.longestShortestPath.length; i++)
		{	
		if (result1.longestShortestPath[i] !== result2.longestShortestPath[i])
			return false;
		}
	return true;
}

if (typeof module !== 'undefined')
	module.exports = TestHelper;