/*const { injectBabelPlugin } = require('react-app-rewired');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function override(config, env) {
    if(env === "production"){
        // config.output.publicPath = '/react-app-github/';
        config.module.rules[2].oneOf.splice(0,1,{
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            use: [{
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  name: '../images/[name].[hash:8].[ext]',
                  publicPath: '/react-app-github/'
                  // outputPath: 'images/',
                  // publicPath : '/images'
                }
            }]
        });
        // config.module.rules[2].oneOf.push({
        //         test: /\.css$/,
        //         use: [{
        //             loader: MiniCssExtractPlugin.loader,
        //             options: { publicPath: '../../' }
        //         },{
        //             loader: require.resolve('css-loader')
        //         }]
        //     });
    }
    config.module.rules[2].oneOf.forEach(element => {
        console.log(element); 
    });
    // console.log(config.module.rules[2].oneOf[3].use);
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);

    return config;
};
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require("path");

const rewiredMap = () => config => {
  if(config.mode === 'production'){
    console.log(require.resolve('url-loader'));
    config.module.rules[2].oneOf.splice(0,1,{
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      use: [{
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'images/[name].[hash:8].[ext]'
          }
      }]
    });
  }
  config.resolve.extensions.push('.less');
  return config;
};

module.exports = override(
  rewiredMap(),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addWebpackAlias({
    ["aliasimgurl"]: path.resolve(__dirname, "src/assets/images")
  }),
);