const path = require('path')
const webpack = require('webpack')
const copyrightBanner = require("fs").readFileSync("./COPYRIGHT", "utf-8")


module.exports = {
    entry: {
        "bundle": ['./src/index']
    },
    output: {
        path: path.join(__dirname, 'release'),
        filename: '[name].js',
        library: ["Histria"],
        libraryTarget: "umd",
        publicPath: ''
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [
        new webpack.BannerPlugin(copyrightBanner, { entryOnly: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    externals: {

    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['ts'],
                include: [path.join(__dirname, 'src')]
            }

        ]
    }
};