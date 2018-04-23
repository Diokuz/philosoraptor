const { createElement } = require('react')
const { renderToString } = require('react-dom/server')
const App = require('./app')

console.log(
  'renderToString(App)',
  renderToString(createElement(App, {}))
)
