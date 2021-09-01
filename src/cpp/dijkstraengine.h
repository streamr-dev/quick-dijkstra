#ifndef DIJKSTRA_ENGINE_H
#define DIJKSTRA_ENGINE_H

#include <utility>
#include <vector>
#include <set>
#include <functional>
#include <queue>

using namespace std;
#define INF 0x3f3f3f3f

// iPair ==> Integer Pair
typedef pair<int, int> iPair;

struct Edge 
	{ 
	int to; 
	int length; 
	/*
	bool operator < (const Edge &other) const 
		{ 
		return to < other.to; 
		}
	*/	
	};


class DijkstraEngine
{
private:
	int v = 0;
	vector<vector<int> > results;
	vector<vector<int> > parentResults;
	
	vector<vector<iPair> > adj;

	vector< set<Edge> > graph;
	void shortestPath(int src);
	void printGraph();
public:
	
	void init(int numberOfVertices);
	void addEdge(int u, int v, int wt);
	void compute();
	int getDistance(int from, int to);
	int getParent(int src, int vertex);
	vector<int> getPath(int from, int to);
	int getPathHops(int from, int to);
	
	int getMaximumDistance();
	double getAverageDistance();
	int getMaximumPathHops();
	
	void destroy();
};
#endif
