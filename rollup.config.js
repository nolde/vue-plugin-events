import path from 'path'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import license from 'rollup-plugin-license'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

// //////////////////////////////////////////

function replacer () {
  return replace({
    delimiters: ['__', '__'],
    values: {
      VERSION: pkg.version
    }
  })
}

function licenser () {
  return license({
    banner: {
      file: path.join(__dirname, 'LICENSE')
    }
  })
}

export default [
  // browser-friendly UMD build
  {
    input: pkg.main,
    output: {
      file: pkg.browser,
      name: 'VuePluginEvents',
      format: 'umd',
      exports: 'named'
    },
    plugins: [
      replacer(),
      resolve(), // so Rollup can find commonjs modules
      commonjs(), // so Rollup can convert commonjs to ES modules
      buble(),
      licenser()
    ]
  },
  // bundlers ES module build
  {
    input: pkg.main,
    external: Object.keys(pkg.dependencies),
    output: [{
      file: pkg.module,
      format: 'es',
      exports: 'named'
    }],
    plugins: [
      replacer(),
      licenser()
    ]
  }
]

