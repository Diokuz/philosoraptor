## Question

Is it possible to check promise state?

## Answer

This is [not possible](https://stackoverflow.com/questions/30564053/how-can-i-synchronously-determine-a-javascript-promises-state) in browsers in a sync way. But, you could do this...

### Async way

```js
async function check (p) {
	// We dont know status of p here
	const newPromise = Promise.resolve(123)
	// Now, if p is resolved/rejected, it will win in a race:
	const value = await Promise.race(p, newPromise).then(v => v, () => 'rejected')

	if (value === 123) {
		// p _was_ in pending state
	} else if (value === 'rejected') {
		// p _was_ rejected before check was called
	} else {
		// p _was_ in pending state (but could be resolved/rejected now)
	}
}
```

This works only for _past_: you could only say about promise state in the previous tick. But not the current one.

This is what https://www.npmjs.com/package/promise-status-async actually do

### NodeJS way

[require('util').inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

```bash
> util.inspect(new Promise((r, s) => {}))
'Promise {\n  <pending>,\n  domain:\n   Domain {\n     domain: null,\n     _events:\n      [Object: null prototype] {\n        removeListener: [Function: updateExceptionCapture],\n        newListener: [Function: updateExceptionCapture],\n        error: [Function: debugDomainError] },\n     _eventsCount: 3,\n     _maxListeners: undefined,\n     members: [] } }'
```

Look at `pending` – that is a promise state.

## PS

[callbackify](https://nodejs.org/api/util.html#util_util_callbackify_original)! Lol :)
