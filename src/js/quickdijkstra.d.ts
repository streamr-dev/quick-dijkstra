declare module 'quick-dijkstra' {
	
	/** 3-tuple of integers that represents an undirected, weighted link in the graph.
	 *  The format of the 3-tuple is [nodeId1, nodeId2, weight]. The nodeIds in the graph 
	 *  need to be sequential integers [0, 1, 2, ..., N] as the nodeIds are used directly
	 *  as array indices in the C++ algorithms  
	 * */

	export type GraphLink = [nodeId1: number, nodeId2: number, weight: number];

	export type QuickDijkstraResult = {
		/** The distance matrix from each node to every other node in the graph on the fastest paths.
		 * For example, distances[3][7] is the distance from node 3 to node 7 on the fastest path in the graph.
		 * As the graphs are treated as undirected, the condition distances[x][y] === distances[y][x] always holds.  
		 */
		distances: Array<Array<number>>;
		
		/** The matrix containing the number of hops from each node to every other node in the graph on the fastest paths.
		 * For example, pathHops[3][7] is the number of hops from node 3 to node 7 on the fastest path in the graph. 
		 * As the graphs are treated as undirected, the condition pathHops[x][y] === pathHops[y][x] always holds. 
		 */
		pathHops: Array<Array<number>>;
	
		/** Maximum distance between a pair of nodes on the fastest paths in the graph */
		maximumDistance: number;

		/** Average distance between a pair of nodes on the fastest paths in the graph */
		averageDistance: number;

		/** Maximum number of hops between a pair of nodes on the fastest paths in the graph */
		maximumPathHops: number;
	
		/** The longest (measured in number of hops) of the fastest paths in the graph */
		longestShortestPath: Array<number>;
	
	};


	/** Calculates all the shortest paths in a integer-weighted graph.  
	 * Takes as its argument an array of GraphLink 
	*/
	export function calculateShortestPaths(links: Array<GraphLink>): QuickDijkstraResult;	
	
	/** Calculates the shortest paths from node i in a integer-weighted graph.  
	 * Takes as its argument an array of GraphLink 
	*/
	export function calculateShortestPathsFromNode(links: Array<GraphLink>, nodeId: number): QuickDijkstraResult;

}
