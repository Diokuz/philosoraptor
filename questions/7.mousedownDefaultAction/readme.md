The problem: when you mousedown on focusable element, and try to focus other element by js, it will not work:

https://jsfiddle.net/pdknwse6/11/

```html
<div tabindex='0' id='one'>Click</div>
<input type='text' tabindex='1' id='two'>
```

```js
document.getElementById('one').addEventListener('mousedown', (e) => {
  /* e.preventDefault() */

  // We cant call focus here wothout e.preventDefault()
  // document.getElementById('two').focus()
  Promise.resolve().then(() => {
    // Same here!
    // e.preventDefault()
    document.getElementById('two').focus()
  })
})

const one = document.getElementById('one')
const two = document.getElementById('two')

one.addEventListener('focus', () => console.log('focus one'))
one.addEventListener('blur', () => console.log('blur one'))
two.addEventListener('focus', () => console.log('focus two'))
two.addEventListener('blur', () => console.log('blur two'))
```

The output will be:

```
focus two
blur two
focus one
```

## Q: When browser default handler happens?

Obviously after events queue, and after corresponded microqueue.

## Q: Does it has its own event loop queue? Will it execute right after microqueue, or there could be other eventloop queues (like setTimeout/setImmediate)?

You definitely could not call setTimeout callbacks before that mystery default handler queue.

@todo
