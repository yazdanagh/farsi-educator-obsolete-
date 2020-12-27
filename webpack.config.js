module.exports = {
    entry: './src/js/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    "plugins": [
                    "@babel/plugin-proposal-class-properties"
                    ],
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}
