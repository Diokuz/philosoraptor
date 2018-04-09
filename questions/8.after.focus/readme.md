The problem: I have two `onFocus` handlers on same input element. Looks like second handler executes after microtasks, added in first onFocus handler. Is that true?

```html
<input type='text'>
```

```js
const input = document.querySelector('input')

function firstHandler() {
  console.log('first')
  Promise.resolve().then(() => console.log('first microtask'))
}

function secondHandler() {
  console.log('second')
  Promise.resolve().then(() => console.log('second microtask'))
}

input.addEventListener('focus', firstHandler)
input.addEventListener('focus', secondHandler)
```

What the order of console.logs?

## Answer

Chrome:
```
first
first microtask
second
second microtask
```

Looks like each focus handler has its own event-loop tick. Thats true for `Chrome` and *not true* for `Firefox`:

```
first
second
first microtask
second microtask
```
