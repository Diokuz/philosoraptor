## Question

What if we "mutate" hashmap in ocaml with the same value – will it create new hashmap or not?

(JavaScript) say we have an object:

```js
let a = {
    prop: 'initial_value',
}
```

In JavaScript we can change it in two different ways: with mutation and without it.

```js
let b = a
b.prop = 'changed_value'
// b === a

// or

let b = {
    ...a,
    prop: 'changed_value',
}
// b !== a
```

Immutability is good when the value was actually changed, but what if it wasn't changed?

In JS we can still do it in both ways.

```js
let b = a
b.prop = 'initial_value'
// b === a

// or

let b = {
    ...a,
    prop: 'initial_value',
}
// b !== a
```

What Ocaml think about both ways in situation, when `prop` wasn't actually changed?

## Answer


