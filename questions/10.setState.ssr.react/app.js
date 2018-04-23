const { Component, createElement } = require('react')
const Child = require('./child')

module.exports = class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      foo: 'bar'
    }
  }

  render () {
    return createElement(
      Child,
      {
        callback: () => this.setState({ foo: 'baz' })
      },
      this.state.foo
    )
  }
}
