const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js'
    },

    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',// output file lay dia chi cua path 9-forkifile
            template:'./src/index.html'// starting html file
        })
    ],
    module: {
        rules:[
            {
                test: /\.js$/, // test all the js file
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }

        ]
         
    },
};
