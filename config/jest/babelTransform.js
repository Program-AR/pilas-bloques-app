'use strict';

/* ECM module needed
import babelJest from 'babel-jest'
import jsxRuntime from 'react/jsx-runtime'
import babelPreset from 'babel-preset-react-app'
*/

const babelJest = require('babel-jest')

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    //jsxRuntime; // ECM module needed
    require.resolve('react/jsx-runtime')
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = babelJest.createTransformer({
  presets: [
    [
      //babelPreset, // ECM module needed
      require.resolve('babel-preset-react-app'),
      {
        runtime: hasJsxRuntime ? 'automatic' : 'classic',
      },
    ],
  ],
  babelrc: false,
  configFile: false,
});

// export default createTransformer // ECM needed
