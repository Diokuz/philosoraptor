## Question

What `console.error` uses to write: stdout or stderr?

## Answer

`stderr`

```
# stdout
console.log
console.info
process.stdout.write
```

```
# stderr
console.warn
console.error
throw new Error('Error')
^
```

Also, by default both – stdout and stderr – are written to the terminal. You could change it, for example:

```
node ./1.js >stdout 2>stderr
```

Very usefull for debugging subprocesses, whose logs are suppressed by the parent process.
