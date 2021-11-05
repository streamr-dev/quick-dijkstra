"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickDijkstraWasm = __importStar(require("@streamr/quick-dijkstra-wasm"));
QuickDijkstraWasm.calculateShortestPaths([[0, 1, 20], [1, 2, 10], [2, 0, 5]], (result) => {
    console.log(JSON.stringify(result));
    QuickDijkstraWasm.calculateShortestPathsFromNode([[0, 1, 20], [1, 2, 10], [2, 0, 5]], 1, (result2) => {
        console.log(JSON.stringify(result2));
    });
});
//# sourceMappingURL=example.js.map