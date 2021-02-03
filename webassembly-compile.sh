emcc --bind -Oz dijkstraengine.cc -o dijkstraengine.js  \
-s WASM=1 -s NO_EXIT_RUNTIME=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun']" -s ASSERTIONS=1 \
|| exit 1
