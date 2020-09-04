const slsw = require('serverless-webpack')
const path = require('path')

module.exports = {
    entry: slsw.lib.entries,
    mode: "development",
    target: "node",
    devtool: "source-map",
    externals: [
        /aws-sdk/
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/
                ],
                include: [
                    path.resolve(__dirname,'src'),
                ]
            }
        ]
    }
}