const webpackConfig = require('./webpack.config.js');

const getComponents = () => [
  'src/Button/Button.jsx',
  'src/Checkbox/Checkbox.jsx',
  'src/ComboSelect/ComboSelect.jsx',
  'src/Dialog/Dialog.jsx',
  'src/DropDownMenu/DropDownMenu.jsx',
];

module.exports = {
  serverHost: 'kupov-pulscen.son4.railsc.ru',
  serverPort: 8080,
  defaultExample: true,
  webpackConfig: webpackConfig,
  components: getComponents
};
