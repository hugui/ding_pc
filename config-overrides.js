const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addBabelPlugin
} = require('customize-cra');
const path = require("path");
module.exports = override(
  //按需加载antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addBabelPlugin(["@babel/plugin-proposal-decorators", { "legacy": true }]),
  //别名配置
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "./src"),
  })
);
