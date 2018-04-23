## Question

What if we call `setState` in child's constructor during server-side rendering? Will it affect the output?

Say we have components:

```js
class App extends Component {
  state = {
    foo: 'bar'
  }

  render () {
    <Child callback={() => this.setState({ foo: 'baz' })} />
  }
}

class Child extends Component {
  constructor () {
    this.props.callback()
  }

  render () {
    return 'child content'
  }
}
```

What output will be for `ReactDOMServer.renderToString(<App />)`?

## Answer

The output will be:

```
bar
```

That means, child cannot change parent output on server.

Why?
It works [like that](https://github.com/facebook/react/blob/999b656ed1c94b00fcfd043f54e18ade7553dee0/packages/react-dom/src/server/ReactPartialRenderer.js#L584) (pseudo code which partially reflects basic ReactDOM algo):

```js
function renderToString (el) {
  let child = el

  while (child) {
    processChild(child)
  }

  function processChild(element) {
    child = inst.render() // <- rendering current element and THEN starting works with child, no rerenders
  }
}
```
So, there is no way to change the result of _parent render_ in _child render_, since the second is called after the first one.

The only thing you can do is to change component's own state with [getDerivedStateFromProps](https://github.com/facebook/react/blob/999b656ed1c94b00fcfd043f54e18ade7553dee0/packages/react-dom/src/server/ReactPartialRenderer.js#L448) before it's render. But at that moment the parent is completely rendered and nothing can be changed.
