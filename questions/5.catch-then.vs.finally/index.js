'use strict'

// Q: What the difference between promise.catch().then(finalHandler) and promise.finally(finalHandler) ?
//// A: finally never gets the result, but pass it to next promise

const finalHandler = (arg) => console.log('finalHandler argument: ', arg)
const log = (arg) => console.log('log: ', arg)
const pass = (arg) => arg
const noop = () => {}

Promise.resolve(1).then(noop).catch(noop).then(finalHandler) // finalHandler argument:  undefined
Promise.resolve(1).then(pass).catch(noop).then(finalHandler) // finalHandler argument:  1
Promise.reject(1).then(pass).catch(pass).then(finalHandler) // finalHandler argument:  1

Promise.resolve(1).then(noop).catch(noop).finally(finalHandler) // finalHandler argument:  undefined
Promise.resolve(1).then(pass).catch(noop).finally(finalHandler) // finalHandler argument:  undefined
Promise.resolve(1).then(pass).finally(finalHandler) // finalHandler argument:  undefined
Promise.resolve(1).finally(finalHandler) // finalHandler argument:  undefined
Promise.reject(1).finally(finalHandler) // finalHandler argument:  undefined

// Looks like finally never gets arguments, as specified in https://github.com/tc39/proposal-promise-finally
// > A finally callback will not receive any argument

// Also, finally will pass the result to the next step:

Promise.resolve(1).finally(finalHandler).then(log)
// finalHandler argument:  undefined
// log:  1

Promise.reject(1).finally(finalHandler).catch(log)
// finalHandler argument:  undefined
// log:  1

// Also
Promise.reject(1).finally(() => {
  throw new Error('error message')
}).catch(log)
// log:  Error: error message

// ! Note:
// stage-4 Promise.prototype.finally is not implemented in node 9.6 and IE/Edge :(
