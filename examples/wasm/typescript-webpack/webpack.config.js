const path = require( 'path' );
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {

    // bundling mode
    mode: 'development',

    // entry files
    entry: './src/example.ts',

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'www' ),
        filename: 'main.js',
    },

    // file resolutions
    resolve: {
		extensions: [ '.ts', '.js' ],
		fallback: { "path": false, "fs": false } 
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
			},
			{
				test: /dijkstraengine\.js$/,
				loader: "exports-loader",
				options: {
					exports: "Module",
				}
			  },
			  {
				test: /dijkstraengine\.wasm$/,
				loader: "file-loader",
				options: {
				  publicPath: "dist/"
				}
			  }
			
        ]
	},
	
	
	plugins: [
        
    ]
};