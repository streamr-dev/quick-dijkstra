#include <napi.h>
#include "quickdijkstra.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return QuickDijkstra::Init(env, exports);
}

NODE_API_MODULE(addon, InitAll)
