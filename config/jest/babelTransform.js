'use strict';

import babelJest from 'babel-jest'
import jsxRuntime from 'react/jsx-runtime'
import babelPreset from 'babel-preset-react-app'

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    jsxRuntime;
    return true;
  } catch (e) {
    return false;
  }
})();

const createTransformer = babelJest.createTransformer({
  presets: [
    [
      babelPreset,
      {
        runtime: hasJsxRuntime ? 'automatic' : 'classic',
      },
    ],
  ],
  babelrc: false,
  configFile: false,
});

export default createTransformer