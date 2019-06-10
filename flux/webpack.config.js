const packagejson =  require('./package.json')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const postcssPresetEnv = require('postcss-preset-env')
const SriPlugin = require('webpack-subresource-integrity')
const TerserPlugin = require('terser-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'app/js'),
  style: path.join(__dirname, 'app/sass'),
  dist: path.join(__dirname, 'dist')
}

module.exports = (env, argv) => {
  return {

    entry: {
      app: path.join(PATHS.app, 'bootloader.js')
    },

    output: {
      path: PATHS.dist,
      publicPath: (argv.mode === 'production') ? '/' : '/',
      filename: 'js/[name].[hash:8].js',
      crossOriginLoading: 'anonymous'
    },

    devServer: {
      historyApiFallback: true
    },

    devtool: 'cheap-module-source-map',

    node: {
      fs: 'empty'
    },

    module: {
      rules: [
        { test: /\.txt$/, use: { loader: 'raw-loader' } },
        { test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
        { test: /\.css?$/, exclude: /node_modules/, use: { loader: 'css-loader' } },
        { test: /\.(sass|scss)$/, use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: 'postcss-loader', options: { plugins: [ postcssPresetEnv() ] } },
          { loader: "sass-loader" }
        ]},
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader" }
          ]
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: { loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts'
            }
          }
        },
        { test: /\.(png|gif|jpg|jpeg)$/, use: { loader: 'url-loader' } },
        { test: /\.figletrc\.js$/, loader: 'figlet-loader', type: "javascript/auto" }
      ]
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: { output: {comments: false} }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          }
        })
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: 'images', to: 'images' }
      ]),
      new HtmlWebpackPlugin({
        appMountId: 'app',
        favicon: 'images/favicon.ico',
        template: '!!pug-loader!app/index.pug',
        title: "IFC POC",
        injectExtras: {
          head: [
          ]
        }
      }),
      new HtmlWebpackExcludeAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash:8].css",
        chunkFilename: "[id].css"
      }),
      new SriPlugin({
        hashFuncNames: ['sha256', 'sha384'],
        enabled: argv.mode === 'production',
      })
    ],

    externals: [
      require('webpack-require-http'),
      { constants: JSON.stringify(require('./constants.json')) }
    ]
  }

}
