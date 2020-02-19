## Question

```js
await foo().bar()
```

Which promise will be awaited?

If `foo()`, what if it returns not a promise?

## Answer

In any case, it awaits `bar()` resolve value.

It is logical enought, because _await_ just waits for promise to resolve. We need to calculate that promise by making all instructions needed from the right side of the expression. So

1. await (expression)
2. calculate expression
3. await it :)

If you need to await foo:

```js
await (await foo()).bar()
```

At the same time, if foo() is sync, it would be impossible to start bar() in a sync way in one line with foo(), if await would be applied to foo() instead of bar().
