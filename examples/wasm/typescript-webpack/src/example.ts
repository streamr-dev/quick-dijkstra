import * as QuickDijkstraWasm from "@streamr/quick-dijkstra-wasm";
import { ExplorerConverter } from "./explorerconverter";


let xmlhttp = new XMLHttpRequest();
let url = "explorerlinks.json";

xmlhttp.onreadystatechange = function() 
	{
	if (this.readyState == 4 && this.status == 200) 
		{
		let original = JSON.parse(this.responseText);

		// Convert the topology from the format output by the Streamr tracker
		// to the format expected by quick-dijkstra-wasm
		
		let integerLinks = ExplorerConverter.convertLinksToIntegers(original);	
		
		QuickDijkstraWasm.calculateShortestPaths( integerLinks, (result) => 
			{
			console.log(JSON.stringify(result));	
			});	
    	}
	};

xmlhttp.open("GET", url, true);
xmlhttp.send();
