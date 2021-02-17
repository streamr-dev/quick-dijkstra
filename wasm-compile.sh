pwd=$(pwd)

cd wasmdist && rm * && cd ..
cp ${pwd}/src/wasmjs/quickdijkstra-wasm.js ${pwd}/wasmdist
cp ${pwd}/src/wasmjs/quickdijkstra-wasm.d.ts ${pwd}/wasmdist
cp ${pwd}/src/wasmjs/wasm_package.json ${pwd}/wasmdist && mv ${pwd}/wasmdist/wasm_package.json ${pwd}/wasmdist/package.json
emcc --bind -O2 ${pwd}/src/cpp/dijkstraengine.cc -o ${pwd}/wasmdist/dijkstraengine.js  \
-s WASM=1 -s NO_EXIT_RUNTIME=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun']" -s ASSERTIONS=1 \
|| exit 1
