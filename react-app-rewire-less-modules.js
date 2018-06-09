const { getLoader, loaderNameMatches } = require('react-app-rewired');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const lessExtension = /\.less$/;
const lessModuleExtension = /\.module.less$/;

function createRewireLess(lessLoaderOptions = {}) {
  return (config, env) => {
    // Exclude all less files (including module files) from file-loader
    const fileLoader = getLoader(config.module.rules, (rule) => {
      return loaderNameMatches(rule, 'file-loader') && rule.exclude;
    });
    fileLoader.exclude.push(lessExtension);

    const createRule = (rule, cssRules) => {
      if (env === 'production') {
        return {
          ...rule,
          loader: [...cssRules.loader, { loader: 'less-loader', options: lessLoaderOptions }],
        };
      } else {
        return {
          ...rule,
          use: [...cssRules.use, { loader: 'less-loader', options: lessLoaderOptions }],
        };
      }
    };

    const lessRules = createRule(
      {
        test: lessExtension,
        exclude: lessModuleExtension,
      },
      // Get a copy of the CSS loader
      getLoader(config.module.rules, rule => String(rule.test) === String(cssRegex) &&
        String(rule.exclude) === String(cssModuleRegex))
    );

    const lessModuleRules = createRule(
      { test: lessModuleExtension },
      // Get a copy of the CSS module loader
      getLoader(config.module.rules, rule => String(rule.test) === String(cssRegex) &&
        (!rule.exclude || String(rule.exclude) !== String(cssModuleRegex)))
    );

    const oneOfRule = config.module.rules.find(rule => rule.oneOf !== undefined);
    if (oneOfRule) {
      oneOfRule.oneOf.unshift(lessRules);
      oneOfRule.oneOf.unshift(lessModuleRules);
    } else {
      // Fallback to previous behaviour of adding to the end of the rules list.
      config.module.rules.push(lessRules);
      config.module.rules.push(lessModuleRules);
    }

    return config;
  };
}

const rewireLess = createRewireLess();

rewireLess.withLoaderOptions = createRewireLess;

module.exports = rewireLess;
