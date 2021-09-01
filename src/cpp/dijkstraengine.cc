#include "dijkstraengine.h"
#include <set>

#ifdef __EMSCRIPTEN__

#include "emscripten/bind.h"
using namespace emscripten;

#endif

bool operator < (const Edge &a, const Edge &b)
	{
    return a.to < b.to;
	}

void DijkstraEngine::init(int numberOfVertices)
	{
	this->v = numberOfVertices;
	for (int i=0; i<numberOfVertices; i++)
		{
		//vector<iPair> temp;
		//adj.push_back(temp);	//copy constructor
		
		set<Edge> temp;
		graph.push_back(temp);

		vector<int> res;
		results.push_back(res);
			
		vector<int> par;
		parentResults.push_back(par);
		}
	}

void DijkstraEngine::addEdge(int u, int v, int wt)
	{
	//printf("DijkstraEngine::addEdge [%d,%d,%d]\n", u, v, wt);	
	//adj[u].push_back(make_pair(v, wt));
	//adj[v].push_back(make_pair(u, wt));
	graph[u].insert({v, wt});		
	graph[v].insert({u, wt});	//make sure that the graph is undirected, does not create parallel edges because we use set<Edge>
	
	//printf("%d\n",graph[u].size());
	}

void DijkstraEngine::printGraph() 
	{
	for (unsigned int i = 0 ; i < graph.size(); i++)	
		{
		for (auto connection: graph[i])
			{	
			printf("[%d,%d,%d]", i, connection.to, connection.length);
			}

		printf("\n");	
		}
	}

void DijkstraEngine::shortestPath(int source) 
	{
	/*	
	printf("Graph size %d\n", graph.size());
	for (auto node : graph)
		{
		printf("%d\n", node.size());	
		}
	printGraph();
	*/
	

    vector<int> min_distance( graph.size(), INF);
    min_distance[ source ] = 0;
	vector<bool> sptSet(graph.size(), false); 

	vector<int> parent(v, -1);

    set< pair<int,int> > active_vertices;
    active_vertices.insert( {0,source} );
    
    while (!active_vertices.empty()) 
		{
        int where = active_vertices.begin()->second;
        sptSet[where] = true;
		active_vertices.erase( active_vertices.begin() );
        for (auto edge : graph[where]) 
			{
            if (!sptSet[edge.to] && (min_distance[edge.to] > min_distance[where] + edge.length)) 
				{
				if (edge.length<1)
					exit(1);
				if (where == edge.to)
					{
					continue;
					printf("ERROR! edges from: %d include\n", where);

					for (auto edg : graph[where]) 
						{
						printf("To: %d Weigth: %d\n", edg.to, edg.length);	
						}	

					exit(1);
					}
				parent[edge.to]= where;
                active_vertices.erase( { min_distance[edge.to], edge.to } );
                min_distance[edge.to] = min_distance[where] + edge.length;
                active_vertices.insert( { min_distance[edge.to], edge.to } );
            	}
			}	
    	}

    for (int i = 0; i < v; ++i)
		{
		results[source].push_back(min_distance[i]);
		parentResults[source].push_back(parent[i]);
		//printf("%d \t\t %d\n", i, dist[i]);
		}
	}

void DijkstraEngine::compute()
	{
	for (int i=0; i < v; i++)
		{
		shortestPath(i);
		}
	//printf("DijkstraEngine::compute() at end");	
	}

int DijkstraEngine::getDistance(int from, int to)
	{
	//printf("DijkstraEngine::getDistance() from: %d to: %d\n", from, to);	
	int temp = results[from][to];
	//printf("DijkstraEngine::getDistance() from: %d to: %d dist: %d\n", from, to, temp);	
	return temp;
	}

int DijkstraEngine::getParent(int src, int vertex)
	{
	return parentResults[src][vertex];
	}

vector<int> DijkstraEngine::getPath(int from, int to)
	{
	vector<int> ret;
	
	if (from == to)
		return ret;
		
	int pointer = to;
	
	while (pointer != -1 && pointer != from)
		{
		ret.push_back(pointer);
		pointer = getParent(from, pointer);
		}
	
	return ret;
	}

int DijkstraEngine::getPathHops(int from, int to)
	{
	//printf("DijkstraEngine::getPathHops() from: %d to: %d\n", from, to);	
	
	int ret = 0;

	if (from == to)
		return ret;
	
	int pointer = to;

	while (pointer != -1 && pointer != from)
		{
		//printf("pointer: %d\n", pointer);	
		ret++;
		pointer = getParent(from, pointer);
		}

	if (pointer == -1)
		return INF;

	return ret;
	}

int DijkstraEngine::getMaximumDistance()
	{
	int max = 0;
			
	for (int i=0; i<v; i++)
		{
		for (int j=0; j<v; j++)
			{
			int val = getDistance(i, j);
				
			if (val < INF && val > max)
				max = val;
			}
		}
	return max;
	}

double DijkstraEngine::getAverageDistance()
	{
	double sum = 0;
	int count = 0;
			
	for (int i=0; i<v; i++)
		{
		for (int j=0; j<v; j++)
			{
			int dist = getDistance(i, j);
			if (dist < INF)
				{
				sum += dist;
				count++;
				}
			}
		}

	return sum/count;
	}

int DijkstraEngine::getMaximumPathHops()
	{
	int max = 0;
		
	for (int i=0; i<v; i++)
		{
		for (int j=0; j<v; j++)
			{
			int val = getPathHops(i, j);
			
			if (val < INF && val > max)
				max = val;
			}
		}
	return max;
	}

void DijkstraEngine::destroy()
	{
	}

#ifdef __EMSCRIPTEN__

EMSCRIPTEN_BINDINGS (c) {
  class_<DijkstraEngine>("DijkstraEngine")
    .constructor<>()
    .function("init", &DijkstraEngine::init)
    .function("addEdge", &DijkstraEngine::addEdge)
	.function("compute", &DijkstraEngine::compute)
	.function("getDistance", &DijkstraEngine::getDistance)
 	.function("getParent", &DijkstraEngine::getParent)
	.function("getPath", &DijkstraEngine::getPath)
	.function("getPathHops", &DijkstraEngine::getPathHops)
	.function("getMaximumDistance", &DijkstraEngine::getMaximumDistance)
	.function("getAverageDistance", &DijkstraEngine::getAverageDistance)
	.function("getMaximumPathHops", &DijkstraEngine::getMaximumPathHops)
	.function("destroy", &DijkstraEngine::destroy);
	
}

#endif