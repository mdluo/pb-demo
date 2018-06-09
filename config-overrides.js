const { injectBabelPlugin, getLoader, loaderNameMatches, compose } = require('react-app-rewired');
const paths = require('react-app-rewired/scripts/utils/paths');
const rewireLess = require('react-app-rewire-less-modules');
const rewireVendorSplitting = require('react-app-rewire-vendor-splitting');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const cssModuleRegex = /\.module\.css$/;

/* eslint no-param-reassign: [0] */
module.exports = function override(config, env) {
  config = injectBabelPlugin([
    'import', { libraryName: 'antd', style: true, libraryDirectory: 'es' },
  ], config);

  if (env !== 'test') {
    config = injectBabelPlugin([
      'module-resolver', { root: ['./src'] },
    ], config);
  }

  if (env === 'production') {
    config.entry = { main: paths.appIndexJs };

    // Change css module class names in production
    // require react-scripts >= 2.0.0-next.b2fd8db8
    const cssModuleMatcher = (rule) => {
      return String(rule.test) === String(cssModuleRegex);
    };
    const cssModuleRule = getLoader(config.module.rules, cssModuleMatcher);
    const cssLoader = cssModuleRule.loader.find(loader => loaderNameMatches(loader, 'css-loader'));
    cssLoader.options.localIdentName = 'pb-[hash:base64:8]';

    // Include bundle analyzation
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    );
  }

  config = compose(
    rewireLess.withLoaderOptions({
      modifyVars: {
        '@primary-color': '#2f54eb',
        '@icon-url': '"/static/font/iconfont-3.x/iconfont"',
        '@font-size-base': '16px',
        '@font-size-sm': '14px',
        '@font-family': '"Roboto", sans-serif;',
      },
      javascriptEnabled: true,
    }),
    rewireVendorSplitting,
  )(config, env);

  return config;
};
