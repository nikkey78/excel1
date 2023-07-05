const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

console.log('isProd', isProd);
console.log('isDev', isDev);

const filename = ext => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: './index.js',
   output: {
      //   filename: 'bundle.[hash].js',
      filename: filename('.js'),
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },
   resolve: {
      enforceExtension: false,
      alias: {
         '@': path.resolve(__dirname, 'src'),
         '@core': path.resolve(__dirname, 'src/core'),
      },
   },
   devtool: isDev ? 'source-map' : false,
   devServer: {
      port: 3000,
      hot: isDev,
      watchFiles: ['src/**/*.*'],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.html',
      }),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/favicon.ico'),
               to: path.resolve(__dirname, 'dist'),
            },
         ],
      }),
      new MiniCssExtractPlugin({
         //  filename: 'bundle.[hash].css',
         filename: filename('css'),
      }),
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
         },
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
               },
            },
         },
      ],
   },
};
