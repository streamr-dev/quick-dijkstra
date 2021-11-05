function QuickDijkstraWasm() {}
QuickDijkstraWasm.addon = null;	
QuickDijkstraWasm.wasmReady = false;

var INF = 0x3f3f3f3f;

var getLongestShortestPath = function(calculator, pathHops, pathHopsIndex)
	{
	var max = 0;
	var maxI = -1;
	var maxJ = -1;

	for (var i=0; i < pathHops.length; i++)
		{
		for (var j = 0; j < pathHops[i].length; j++)
			{
			if (pathHops[i][j] < Infinity && pathHops[i][j] > max)
				{
				max = pathHops[i][j];
				maxI = i + pathHopsIndex;
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
	if (!QuickDijkstraWasm.addon)
		{
		// webpack	
		if (typeof require !== "undefined" && typeof require.ensure === "function")
			{
			require.ensure(['./dijkstraengine.js'], function (require) 
				{ 
				QuickDijkstraWasm.addon = require('./dijkstraengine.js').Module;	
				doCalculateShortestPaths(QuickDijkstraWasm.addon, links, callback); 	
				});
			}	

		// nodejs
		else if (typeof module !== 'undefined')
			{
			QuickDijkstraWasm.addon = eval("require")('./dijkstraengine.js');
			doCalculateShortestPaths(QuickDijkstraWasm.addon, links, callback);
			}

		// script tag	
		else
			{
			QuickDijkstraWasm.addon = window.Module;	
			doCalculateShortestPaths(QuickDijkstraWasm.addon, links, callback);
			}	
		}
	else
		{
		doCalculateShortestPaths(QuickDijkstraWasm.addon, links, callback);	
		}
	};

/** 
 * Calculates the shortest paths from node i in a integer-weighted graph.
 * 
 * @function calculateShortestPathsFromNode
 * @memberOf QuickDijkstra#
 * @param {Array.<Array.<number>>} links weighted links in the network as integers in format [[from, to, weight],..]
 * @param number nodeId the interger id of the node to calculate shortest paths from 
 */

QuickDijkstraWasm.calculateShortestPathsFromNode = function(links, nodeId, callback)
	{
	if (!QuickDijkstraWasm.addon)
		{
		// webpack	
		if (typeof require !== "undefined" && typeof require.ensure === "function")
			{
			require.ensure(['./dijkstraengine.js'], function (require) 
				{ 
				QuickDijkstraWasm.addon = require('./dijkstraengine.js').Module;	
				doCalculateShortestPathsFromNode(QuickDijkstraWasm.addon, links, nodeId, callback); 	
				});
			}	

		// nodejs
		else if (typeof module !== 'undefined')
			{
			QuickDijkstraWasm.addon = eval("require")('./dijkstraengine.js');
			doCalculateShortestPathsFromNode(QuickDijkstraWasm.addon, links, nodeId, callback);
			}

		// script tag	
		else
			{
			QuickDijkstraWasm.addon = window.Module;	
			doCalculateShortestPathsFromNode(QuickDijkstraWasm.addon, links, nodeId, callback);
			}	
		}
	else
		{
		doCalculateShortestPathsFromNode(QuickDijkstraWasm.addon, links, nodeId, callback);
		}
	};

var runWasmCalculation = function(addon, links, callback)
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
			let dist = calculator.getDistance(i, j);
			
			if (dist >= INF)
				dist = Infinity;

			temp.push(dist);


			let hops = calculator.getPathHops(i, j);

			if (hops >= INF)
				hops = Infinity;

			hopsTemp.push(hops);
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
	ret.longestShortestPath = getLongestShortestPath(calculator, pathHops, 0);

	calculator.delete();
	callback(ret); 	
	};


var runWasmCalculationFromNode = function(addon, links, nodeId, callback)
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

	calculator.computeDistancesFromNode(nodeId);
	//console.log("compute called");
	var ret = new Object();

	let arr = new Array();
	let pathHops = new Array();

	let i = nodeId;
	
	var temp = new Array();
	var hopsTemp = new Array();
	
	for (let j=0; j< numNodes; j++)
		{
		//console.log("numNodes: "+numNodes);
		//console.log("QuickDijkstra::calculateShortestPaths() calling getDistance i: "+i+" j: "+j);
		//console.log(calculator.getDistance(i, j));
		let dist = calculator.getDistance(i, j);
			
		if (dist >= INF)
			dist = Infinity;

		temp.push(dist);


		let hops = calculator.getPathHops(i, j);

		if (hops >= INF)
			hops = Infinity;

		hopsTemp.push(hops);
		}

	arr.push(temp);
	pathHops.push(hopsTemp);
		

	let maximumDistance = calculator.getMaximumDistance();
	let averageDistance = calculator.getAverageDistance();
	let maximumPathHops = calculator.getMaximumPathHops();

	ret.distances = arr;
	ret.pathHops = pathHops;
	ret.maximumDistance = maximumDistance;
	ret.averageDistance = averageDistance;
	ret.maximumPathHops = maximumPathHops;
	ret.longestShortestPath = getLongestShortestPath(calculator, pathHops, nodeId);

	calculator.delete();
	callback(ret); 	
	};

var doCalculateShortestPaths = function(addon, links, callback)
	{	
	if (!QuickDijkstraWasm.wasmReady)
		{
		addon.addOnPostRun(() => 
			{
			QuickDijkstraWasm.wasmReady = true;	
			runWasmCalculation(addon, links, callback);
			});
		}
	else
		{
		runWasmCalculation(addon, links, callback);	
		}
	};

var doCalculateShortestPathsFromNode = function(addon, links, nodeId, callback)
	{	
	if (!QuickDijkstraWasm.wasmReady)
		{
		addon.addOnPostRun(() => 
			{
			QuickDijkstraWasm.wasmReady = true;	
			runWasmCalculationFromNode(addon, links, nodeId, callback);
			});
		}
	else
		{
		runWasmCalculationFromNode(addon, links, nodeId, callback);	
		}
	};

if (typeof module !== 'undefined')
	{
	module.exports = QuickDijkstraWasm;
	}	