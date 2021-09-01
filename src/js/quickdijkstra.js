function QuickDijkstra() {}

var INF = 0x3f3f3f3f;

var getLongestShortestPath = function(calculator, pathHops)
	{
	var max = 0;
	var maxI = -1;
	var maxJ = -1;

	for (var i=0; i<pathHops.length; i++)
		{
		for (var j=0; j < pathHops[i].length; j++)
			{
			if (pathHops[i][j] < Infinity && pathHops[i][j] > max)
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

QuickDijkstra.calculateShortestPaths = function(links)
	{
	//console.log("QuickDijkstra::calculateShortestPaths");
	var addon = require('bindings')('addon');

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

	var calculator = new addon.QuickDijkstra();

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

	calculator.destroy();

	// returns
	//	{
	//	distances;
	//	pathHops;
	//	maximumDistance;
	//	maximumPathHops;
	//	}

	ret.distances = arr;
	ret.pathHops = pathHops;
	ret.maximumDistance = maximumDistance;
	ret.averageDistance = averageDistance;
	ret.maximumPathHops = maximumPathHops;
	ret.longestShortestPath = getLongestShortestPath(calculator, pathHops);

	return ret;
	};

module.exports = QuickDijkstra;
