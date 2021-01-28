#ifndef QUICK_DIJKSTRA_H
#define QUICK_DIJKSTRA_H

#include <napi.h>

#include "dijkstraengine.h"

using namespace std;

#define INF 0x3f3f3f3f 

// iPair ==> Integer Pair 
typedef pair<int, int> iPair; 


class QuickDijkstra: public Napi::ObjectWrap<QuickDijkstra>
{
public:
	static Napi::Object Init(Napi::Env env, Napi::Object exports);

	QuickDijkstra(const Napi::CallbackInfo& info);

private:

	DijkstraEngine engine;

  	static Napi::FunctionReference constructor;

  	Napi::Value init(const Napi::CallbackInfo& info);  
  	Napi::Value addEdge(const Napi::CallbackInfo& info);
	Napi::Value compute(const Napi::CallbackInfo& info);  
	Napi::Value getDistance(const Napi::CallbackInfo& info);
	Napi::Value getParent(const Napi::CallbackInfo& info);
	Napi::Value getPathHops(const Napi::CallbackInfo& info);
	Napi::Value getMaximumDistance(const Napi::CallbackInfo& info);
	Napi::Value getAverageDistance(const Napi::CallbackInfo& info);
	Napi::Value getMaximumPathHops(const Napi::CallbackInfo& info);
	Napi::Value destroy(const Napi::CallbackInfo& info);
};

#endif
