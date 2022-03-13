const path = require('path');
const fs = require('fs');
const prettier = require('prettier');

const aliases = {
  '@': '.',
  '@src': 'src',
  '@router': 'src/router',
  '@views': 'src/views',
  '@layouts': 'src/router/layouts',
  '@components': 'src/components',
  '@assets': 'src/assets',
  '@utils': 'src/utils',
  '@store': 'src/store',
  '@styles': 'src/styles/index.scss',
  '@static': 'static',
  '@common': 'src/common',
  '@config': 'src/config',
  '@services': 'src/services',
  '@model': 'src/model',
  '@checkroom': 'src/appcheckroom',
  '@repositories': 'src/repositories',
  '@api': 'src/api',
  // 客服alias
  '@csSrc': 'src/appengineer',
  '@csUtils': 'src/appengineer/utils',
  '@ajax': 'src/utils/kfAjax.js',
  '@csViews': 'src/appengineer/views',
  '@csComponents': 'src/appengineer/components',
  '@csAssets': 'src/appengineer/assets',
  '@csStyles': 'src/appengineer/styles',
  '@csConfig': 'src/appengineer/config',
  '@csApi': 'src/appengineer/api',
  '@csStore': 'src/appengineer/store',
  '@csStoreIndex': 'src/store/store',
  // 个性化 alias
  '@customization': 'customization',
};
if (process.env.VUE_APP_MODE === 'wx') {
  aliases['@router'] = 'src/router/index.wx.js';
}
console.log(aliases['@router'], '<---------');
module.exports = {
  webpack: {},
  jest: {},
  jsconfig: {},
};

for (const alias in aliases) {
  const aliasTo = aliases[alias];
  module.exports.webpack[alias] = resolveSrc(aliasTo);
  const aliasHasExtension = /\.\w+$/.test(aliasTo);
  module.exports.jest[`^${alias}$`] = aliasHasExtension ? `<rootDir>/${aliasTo}` : `<rootDir>/${aliasTo}/index.js`;
  module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`;
  module.exports.jsconfig[alias + '/*'] = [aliasTo + '/*'];
  module.exports.jsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
        aliasTo + '/index.js',
        aliasTo + '/index.json',
        aliasTo + '/index.vue',
        aliasTo + '/index.scss',
        aliasTo + '/index.css',
      ];
}

const jsconfigTemplate = require('./jsconfig.template') || {};
const jsconfigPath = path.resolve(__dirname, 'jsconfig.json');

fs.writeFile(
  jsconfigPath,
  prettier.format(
    JSON.stringify({
      ...jsconfigTemplate,
      compilerOptions: {
        ...(jsconfigTemplate.compilerOptions || {}),
        paths: module.exports.jsconfig,
      },
    }),
    {
      ...require('./.prettierrc'),
      parser: 'json',
    }
  ),
  error => {
    if (error) {
      console.error('Error while creating jsconfig.json from aliases.config.js.');
      throw error;
    }
  }
);

function resolveSrc(_path) {
  return path.resolve(__dirname, _path);
}
