/**
 * Enable ES6 and React compilation through Babel.
 */
module.exports = () => ({
  test: /\.(js|jsx)$/,
  exclude: /web\/packages|node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        // parse ES6
        "@babel/preset-env",
        // parse React JSX
        "@babel/preset-react"
      ],
      plugins: [
        // enable async import() required for webpack dynamic loading
        "@babel/plugin-syntax-dynamic-import"
      ]
    }
  }
})
