#include "quickdijkstra.h"
#include <set>
#include <queue>

using namespace std;

Napi::FunctionReference QuickDijkstra::constructor;

Napi::Object QuickDijkstra::Init(Napi::Env env, Napi::Object exports) 
	{
  	Napi::HandleScope scope(env);

  	Napi::Function func =
      DefineClass(env,
                  "QuickDijkstra",
                  	{
					InstanceMethod("init", &QuickDijkstra::init),
                  	InstanceMethod("addEdge", &QuickDijkstra::addEdge),
					InstanceMethod("compute", &QuickDijkstra::compute),  
					InstanceMethod("getDistance", &QuickDijkstra::getDistance),
					InstanceMethod("getParent", &QuickDijkstra::getParent),
					InstanceMethod("getPathHops", &QuickDijkstra::getPathHops),
					InstanceMethod("getMaximumDistance", &QuickDijkstra::getMaximumDistance),
					InstanceMethod("getAverageDistance", &QuickDijkstra::getAverageDistance),
					InstanceMethod("getMaximumPathHops", &QuickDijkstra::getMaximumPathHops),
                  	InstanceMethod("destroy", &QuickDijkstra::destroy)
					});

  	constructor = Napi::Persistent(func);
  	constructor.SuppressDestruct();

  	exports.Set("QuickDijkstra", func);
  	return exports;
	}

QuickDijkstra::QuickDijkstra(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<QuickDijkstra>(info) 
	{
  	Napi::Env env = info.Env();
  	Napi::HandleScope scope(env);
	}

Napi::Value QuickDijkstra::init(const Napi::CallbackInfo& info)
	{
	int length = info.Length();

	if (length <= 0 || !info[0].IsNumber())
		{
    	Napi::TypeError::New(info.Env(), "Number expected").ThrowAsJavaScriptException();
  		}

	Napi::Number value = info[0].As<Napi::Number>();
  	int numberOfVertices = value.Uint32Value();

	engine.init(numberOfVertices);

	return Napi::Number::New(info.Env(), 0);
	}

Napi::Value QuickDijkstra::addEdge(const Napi::CallbackInfo& info)
	{
 	int length = info.Length();

	if (length <3 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber())
		{
    	Napi::TypeError::New(info.Env(), "3 numbers expected").ThrowAsJavaScriptException();
  		}

	Napi::Number value0 = info[0].As<Napi::Number>();
 	int source = value0.Uint32Value();

	Napi::Number value1 = info[1].As<Napi::Number>();
  	int target = value1.Uint32Value();

	Napi::Number value2 = info[2].As<Napi::Number>();
  	int distance = value2.Uint32Value();

	engine.addEdge(source, target, distance);

  	return Napi::Number::New(info.Env(), 0);
	}



Napi::Value QuickDijkstra::getDistance(const Napi::CallbackInfo& info)
	{
	int length = info.Length();

	if (length <2 || !info[0].IsNumber() || !info[1].IsNumber() )
		{
    	Napi::TypeError::New(info.Env(), "2 numbers expected").ThrowAsJavaScriptException();
  		}

	Napi::Number value0 = info[0].As<Napi::Number>();
 	int i = value0.Uint32Value();

	Napi::Number value1 = info[1].As<Napi::Number>();
  	int j = value1.Uint32Value();	
	
	int dist = engine.getDistance(i, j);	
	return Napi::Number::New(info.Env(), dist);
	}		

Napi::Value QuickDijkstra::getParent(const Napi::CallbackInfo& info)
	{
	int length = info.Length();

	if (length <2 || !info[0].IsNumber() || !info[1].IsNumber() )
		{
    	Napi::TypeError::New(info.Env(), "2 numbers expected").ThrowAsJavaScriptException();
  		}

	Napi::Number value0 = info[0].As<Napi::Number>();
 	int i = value0.Uint32Value();

	Napi::Number value1 = info[1].As<Napi::Number>();
  	int j = value1.Uint32Value();	

	int parent = engine.getParent(i, j);
	return Napi::Number::New(info.Env(), parent);		
	}	

Napi::Value QuickDijkstra::getPathHops(const Napi::CallbackInfo& info)
	{
	int length = info.Length();

	if (length <2 || !info[0].IsNumber() || !info[1].IsNumber() )
		{
    	Napi::TypeError::New(info.Env(), "2 numbers expected").ThrowAsJavaScriptException();
  		}

	Napi::Number value0 = info[0].As<Napi::Number>();
 	int i = value0.Uint32Value();

	Napi::Number value1 = info[1].As<Napi::Number>();
  	int j = value1.Uint32Value();	

	int hops = engine.getPathHops(i, j);
	return Napi::Number::New(info.Env(), hops);	
	}	

Napi::Value QuickDijkstra::getMaximumDistance(const Napi::CallbackInfo& info)
	{
	int dist = engine.getMaximumDistance();	
	return Napi::Number::New(info.Env(), dist);
	}

Napi::Value QuickDijkstra::getAverageDistance(const Napi::CallbackInfo& info)
	{
	double dist = engine.getAverageDistance();	
	return Napi::Number::New(info.Env(), dist);
	}

Napi::Value QuickDijkstra::getMaximumPathHops(const Napi::CallbackInfo& info)
	{
	int hops = engine.getMaximumPathHops();	
	return Napi::Number::New(info.Env(), hops);
	}
	
Napi::Value QuickDijkstra::compute(const Napi::CallbackInfo& info)
	{
	engine.compute();	
	return Napi::Number::New(info.Env(), 0);
	}

Napi::Value QuickDijkstra::destroy(const Napi::CallbackInfo& info)
	{
  	return Napi::Number::New(info.Env(), 0);
	}