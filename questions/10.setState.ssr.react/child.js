const { Component } = require('react')

module.exports = class Child extends Component {
  constructor (props) {
    super(props)

    this.props.callback()
  }

  render () {
    return this.props.children
  }
}
