//webpack.js.org -> Douumentation -> entry
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Could be one of "prod", "test", or "undefined"(development).
// Heroku sets to "prod" automatically.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Remember - the heroku env variables are going
// to be set via the heroku command line interface later
// so we dont need a prod file.
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' })    
}

module.exports = (env) => {
    isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules:[{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/ 
            }, {
                test: /\.s?css$/, // The ? is responsible for allowing optional css files
                use: CSSExtract.extract({
                    use: [
                        {
                            loader:'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.Stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.Stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_DATABASE_URL': JSON.Stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_PROJECT_ID': JSON.Stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.Stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.Stringify(process.env.FIREBASE_API_KEY)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};