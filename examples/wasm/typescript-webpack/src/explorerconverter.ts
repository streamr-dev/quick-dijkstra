import { GraphLink } from "@streamr/quick-dijkstra-wasm";


export class ExplorerConverter
{
static convertLinksToIntegers(data: any): GraphLink[]
	{
	let ret: GraphLink[] = []; 	

	let matrix:  Map<string, number> = new Map<string, number>(); 
	// build a mapping from links with arbitrary node ids to links with integer ids,
	// the integer id is based on the first occurence of the node in the data and
	// convert links to integer format using the mapping created, 
	// ignoring NULL rtts	

	let nodeIds: {[nodeId: string]: number} = {};
	for (let i in data)
		{
		if (!nodeIds.hasOwnProperty(i))
			{
			nodeIds[i] = Object.keys(nodeIds).length;	
			}

		for (let j = 0; j < data[i].length; j++)
			{
			if (!nodeIds.hasOwnProperty(data[i][j]["neighborId"]))
				{
				nodeIds[data[i][j]["neighborId"]] = Object.keys(nodeIds).length;	
				}
			
			// only take into account one non-null measurement per connection
			// interpret connections as two-way 

			if (data[i][j]["rtt"] !== null)
				{
				let a = nodeIds[i];
				let b = nodeIds[data[i][j]["neighborId"]];
				
				if (a < b)
					{
					matrix.set(JSON.stringify([a, b]), Math.round(data[i][j]["rtt"]/2));	
					}
				else
					{
					matrix.set(JSON.stringify([b, a]), Math.round(data[i][j]["rtt"]/2));		
					}
				//ret.push( [ nodeIds[i], nodeIds[data[i][j]["neighborId"]], data[i][j]["rtt"]]);
				}
			}
		}
	for (let [key, value] of  matrix.entries()) 
		{
		let arr = JSON.parse(key);	
		ret.push([arr[0], arr[1], value]);
		}

	return ret;
	}
}

