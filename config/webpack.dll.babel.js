import webpack from 'webpack';
import { resolve } from 'path';
import { getIfUtils } from 'webpack-config-utils';
import pkg from '../package.json';

export default(env) => {
  const { ifProd } = getIfUtils(env);
  return {
    entry: {
      vendor: [
        'jquery',
        'moment',
        'vue',
        'uikit'
      ]
    },
    output: {
      filename: '[name].dll.js',
      path: resolve(pkg.dllPath),
      library: '[name]'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),
      new webpack.DllPlugin({
        name: '[name]',
        path: resolve(pkg.dllPath, '[name].json')
      })
    ]
  };
};
