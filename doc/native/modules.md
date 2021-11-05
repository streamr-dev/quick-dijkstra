[quick-dijkstra](README.md) / Exports

# quick-dijkstra

## Table of contents

### Type aliases

- [GraphLink](modules.md#graphlink)
- [QuickDijkstraResult](modules.md#quickdijkstraresult)

### Functions

- [calculateShortestPaths](modules.md#calculateshortestpaths)
- [calculateShortestPathsFromNode](modules.md#calculateshortestpathsfromnode)

## Type aliases

### GraphLink

Ƭ **GraphLink**: [nodeId1: number, nodeId2: number, weight: number]

3-tuple of integers that represents an undirected, weighted link in the graph.
 The format of the 3-tuple is [nodeId1, nodeId2, weight]. The nodeIds in the graph
 need to be sequential integers [0, 1, 2, ..., N] as the nodeIds are used directly
 as array indices in the C++ algorithms

Defined in: [quickdijkstra.d.ts:9](https://github.com/streamr-dev/quick-dijkstra/blob/d49efcf/src/js/quickdijkstra.d.ts#L9)

___

### QuickDijkstraResult

Ƭ **QuickDijkstraResult**: { `averageDistance`: *number* ; `distances`: *number*[][] ; `longestShortestPath`: *number*[] ; `maximumDistance`: *number* ; `maximumPathHops`: *number* ; `pathHops`: *number*[][]  }

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`averageDistance` | *number* | Average distance between a pair of nodes on the fastest paths in the graph   |
`distances` | *number*[][] | The distance matrix from each node to every other node in the graph on the fastest paths. For example, distances[3][7] is the distance from node 3 to node 7 on the fastest path in the graph. As the graphs are treated as undirected, the condition distances[x][y] === distances[y][x] always holds.   |
`longestShortestPath` | *number*[] | The longest (measured in number of hops) of the fastest paths in the graph   |
`maximumDistance` | *number* | Maximum distance between a pair of nodes on the fastest paths in the graph   |
`maximumPathHops` | *number* | Maximum number of hops between a pair of nodes on the fastest paths in the graph   |
`pathHops` | *number*[][] | The matrix containing the number of hops from each node to every other node in the graph on the fastest paths. For example, pathHops[3][7] is the number of hops from node 3 to node 7 on the fastest path in the graph. As the graphs are treated as undirected, the condition pathHops[x][y] === pathHops[y][x] always holds.   |

Defined in: [quickdijkstra.d.ts:11](https://github.com/streamr-dev/quick-dijkstra/blob/d49efcf/src/js/quickdijkstra.d.ts#L11)

## Functions

### calculateShortestPaths

▸ **calculateShortestPaths**(`links`: [*GraphLink*](modules.md#graphlink)[]): [*QuickDijkstraResult*](modules.md#quickdijkstraresult)

Calculates all the shortest paths in a integer-weighted graph.
Takes as its argument an array of GraphLink

#### Parameters:

Name | Type |
------ | ------ |
`links` | [*GraphLink*](modules.md#graphlink)[] |

**Returns:** [*QuickDijkstraResult*](modules.md#quickdijkstraresult)

Defined in: [quickdijkstra.d.ts:42](https://github.com/streamr-dev/quick-dijkstra/blob/d49efcf/src/js/quickdijkstra.d.ts#L42)

___

### calculateShortestPathsFromNode

▸ **calculateShortestPathsFromNode**(`links`: [*GraphLink*](modules.md#graphlink)[], `nodeId`: *number*): [*QuickDijkstraResult*](modules.md#quickdijkstraresult)

Calculates the shortest paths from node i in a integer-weighted graph.
Takes as its argument an array of GraphLink

#### Parameters:

Name | Type |
------ | ------ |
`links` | [*GraphLink*](modules.md#graphlink)[] |
`nodeId` | *number* |

**Returns:** [*QuickDijkstraResult*](modules.md#quickdijkstraresult)

Defined in: [quickdijkstra.d.ts:47](https://github.com/streamr-dev/quick-dijkstra/blob/d49efcf/src/js/quickdijkstra.d.ts#L47)
