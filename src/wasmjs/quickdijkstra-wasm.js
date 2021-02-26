function QuickDijkstraWasm() {}

var getLongestShortestPath = function(calculator, pathHops)
	{
	var max = 0;
	var maxI = -1;
	var maxJ = -1;

	for (var i=0; i<pathHops.length; i++)
		{
		for (var j=0; j<pathHops[i].length; j++)
			{
			if (pathHops[i][j]>max)
				{
				max = pathHops[i][j];
				maxI = i;
				maxJ = j;
				}
			}
		}

	var ret = new Array();
	var pointer = maxJ;


	while (pointer != -1)
		{
		ret.unshift(pointer);
		pointer = calculator.getParent(maxI, pointer);
		}

	return ret;
	}

/**
* Calculates shortest paths in a network
*
* @function calculateShortestPaths
* @memberOf QuickDijkstra#
* @param {Array.<Array.<number>>} links weighted links in the network as integers in format [[from, to, weight],..]
*/

QuickDijkstraWasm.calculateShortestPaths = function(links, callback)
	{
	var addon = null;	
	
	// webpack	
	if (typeof require !== "undefined" && typeof require.ensure === "function")
		{
		require.ensure(['./dijkstraengine.js'], function (require) 
			{ 
			addon = require('./dijkstraengine.js').Module;	
			doCalculateShortestPaths(addon, links, callback); 	
			});
		}	

	// nodejs
	else if (typeof module !== 'undefined')
		{
		addon = eval("require")('./dijkstraengine.js');
		doCalculateShortestPaths(addon, links, callback);
		}

	// script tag	
	else
		{
		addon = window.Module;	
		doCalculateShortestPaths(addon, links, callback);
		}	
	};

var doCalculateShortestPaths = function(addon, links, callback)
	{	
	addon.addOnPostRun(() => 
		{
		var numNodes = 0;
		var biggestNodeId = 0;
	
		for (let i=0; i < links.length; i++)
			{
			if (links[i][0] > biggestNodeId)
				biggestNodeId = links[i][0];

			if (links[i][1] > biggestNodeId)
				biggestNodeId = links[i][1];		
			}

		numNodes = biggestNodeId + 1;

		var calculator = new addon.DijkstraEngine();

		calculator.init(numNodes);

		for (let i = 0; i < links.length; i++)
			{
			if(	links[i][0]== links[i][1])
		 		{
				console.log("non-allowed self-loop: "+links[i][0]+ " "+ links[i][1]+" "+ links[i][2]);
		 		process.exit(1);
				}
			calculator.addEdge(links[i][0], links[i][1], links[i][2]);
			}

		calculator.compute();
		//console.log("compute called");
		var ret = new Object();

		let arr = new Array();
		let pathHops = new Array();

		for (let i = 0; i < numNodes; i++)
			{
			var temp = new Array();
			var hopsTemp = new Array();
			for (let j=0; j< numNodes; j++)
				{
				//console.log("numNodes: "+numNodes);
				//console.log("QuickDijkstra::calculateShortestPaths() calling getDistance i: "+i+" j: "+j);
				//console.log(calculator.getDistance(i, j));
				temp.push(calculator.getDistance(i, j));
				hopsTemp.push(calculator.getPathHops(i, j));
				}
			arr.push(temp);
			pathHops.push(hopsTemp);
			}

		let maximumDistance = calculator.getMaximumDistance();
		let averageDistance = calculator.getAverageDistance();
		let maximumPathHops = calculator.getMaximumPathHops();

		ret.distances = arr;
		ret.pathHops = pathHops;
		ret.maximumDistance = maximumDistance;
		ret.averageDistance = averageDistance;
		ret.maximumPathHops = maximumPathHops;
		ret.longestShortestPath = getLongestShortestPath(calculator, pathHops);

		calculator.delete();
		callback(ret); 
		});
	};

if (typeof module !== 'undefined')
	{
	module.exports = QuickDijkstraWasm;
	}	