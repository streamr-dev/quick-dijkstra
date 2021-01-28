var jsgraphs = require('js-graph-algorithms');


function JsGraphDijkstra() {}

JsGraphDijkstra.calculateShortestPaths = function(links) 
	{
	var numNodes = 0;
	var biggestNodeId = 0;
	
	for (let i = 0; i < links.length; i++)
		{
		if (links[i][0] > biggestNodeId)
			biggestNodeId = links[i][0];

		if (links[i][1] > biggestNodeId)
			biggestNodeId = links[i][1];		
		}

	numNodes = biggestNodeId + 1;

	var g = new jsgraphs.WeightedDiGraph(numNodes);
	
	for (let i = 0; i < links.length; i++)
		{
		g.addEdge(new jsgraphs.Edge(links[i][0], links[i][1], links[i][2]));
		g.addEdge(new jsgraphs.Edge(links[i][1], links[i][0], links[i][2]));	
		}
	
		/*
	var dijkstra = new jsgraphs.Dijkstra(g, 0);
	
	
	for(var v = 1; v < g.V; ++v){
		if(dijkstra.hasPathTo(v)){
			var path = dijkstra.pathTo(v);
			console.log('=====path from 0 to ' + v + ' start==========');
			for(var i = 0; i < path.length; ++i) {
				var e = path[i];
				console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
			}
			console.log('=====path from 0 to ' + v + ' end==========');
			console.log('=====distance: '  + dijkstra.distanceTo(v) + '=========');
		}
	}
	*/
	
	var ret = new Object();

	let arr = new Array();
	let pathHops = new Array();

	let maximumDistance = 0;
	let maximumPathHops = 0;
	let sum = 0;
	let count = 0;
	let longestShortestPath = null;

	for (let i = 0; i < numNodes; i++)
		{
		var dijkstra = new jsgraphs.Dijkstra(g, i);	
		var temp = new Array();
		var hopsTemp = new Array();
		for (let j=0; j< numNodes; j++)
			{
			//console.log("numNodes: "+numNodes);
			//console.log("QuickDijkstra::calculateShortestPaths() calling getDistance i: "+i+" j: "+j);
			//if (!dijkstra.hasPathTo(j))
			//	continue;

			let distance = dijkstra.distanceTo(j);
			temp.push(distance);
			sum += distance;	
			count++;
			let path = dijkstra.pathTo(j);
			let pathLength = path.length;
			hopsTemp.push(pathLength);

			if (distance > maximumDistance)
				{
				maximumDistance = distance;	
				
				}

			if (pathLength > maximumPathHops)
				{
				maximumPathHops = pathLength;	
				longestShortestPath = path;
				}
			}
		arr.push(temp);
		pathHops.push(hopsTemp);
		}

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
	ret.averageDistance = sum / count; 
	ret.maximumPathHops = maximumPathHops;

	let longestRet = [];
	
	for (let i = 0; i < longestShortestPath.length; i ++)
		{
		longestRet.push(longestShortestPath[i].from());	
		}

	longestRet.push(longestShortestPath[longestShortestPath.length-1].to());

	ret.longestShortestPath = longestRet;

	return ret;
	}

module.exports = JsGraphDijkstra;