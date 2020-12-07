/* jslint node */
const packageJson = require('./package.json');

const version = `${packageJson.version}.${packageJson.bundleVersion}`;
const { dnnModuleName } = packageJson;
const isDnn = () => process.argv.includes('--dnn');
module.exports = {
  chainWebpack(config) {
    config.output.filename(`js/[name].${version}.js`).chunkFilename(`js/[name].${version}.js`);
  },
  css: {
    extract: {
      filename: `css/[name].${version}.css`,
      chunkFilename: `css/[name].${version}.css`,
    },
  },
  publicPath: (
    isDnn()
      ? `DesktopModules/BuserNetModules/${dnnModuleName}/dist/`
      : ''
  ),
};
