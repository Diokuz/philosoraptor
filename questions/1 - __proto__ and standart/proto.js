'use strict'

/*
 * For long time __proto__ was undocumented non-standart `illegal` property
 * What for now?
 */

const a = {}
const b = {}

b.__proto__ = a

console.log('b.__proto__ === a', b.__proto__ === a) // true, node 8.3.0 and Chrome 64

// MDN says that it is non-standart
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
// But! It is an es2015 standart for Object.prototype.__proto__
// https://www.ecma-international.org/ecma-262/6.0/#sec-additional-properties-of-the-object.prototype-object
// So, `__proto__` property is standart for any object with Object.prototype in its prototype chain

let c
(function q() {
  c = arguments
})()

console.log('c instanceof Object', c instanceof Object) // false
console.log('c.__proto__', c.__proto__) // {}
console.log('c.__proto__ === Object', c.__proto__ === Object) // false

// So! Looks like exotic objects have no Object.prototype in prototype chain, as expected
// But it has __proto__, which is non-standart even now
// Lets try to extend it, or change

let d
(function () {
  d = arguments
})()

d.__proto__.mymethod = () => (console.log(3), 4)
d.__proto__.myprop = 1

console.log('d.myprop', d.myprop) // 3
console.log('d.mymethod(2)', d.mymethod(2)) // 4

d.__proto__ = { foo: 'bar' }

console.log('d.__proto__', d.__proto__) // { foo: 'bar' }

// Lets rewrite it for all arguments!

let e
(function () {
  e = arguments
})(1)

const nextProto = {
  len: function() {
    return this.length
  }
};

// e.constructor.prototype = nextProto;
// in strict mode there is an error:
// TypeError: Cannot assign to read only property 'prototype' of function 'function Object() { [native code] }'

console.log('e.constructor.prototype === nextProto', e.constructor.prototype === nextProto) // false
;(function () {
  console.log('arguments.len()', arguments.len())
  // TypeError: arguments.len is not a function
})(2, 3)

// So, __proto__ is standart now for all objects with Object.prototype in chain
// And it works like GetPrototypeOf SetPrototypeOf

// And you cant set __proto__ for other objects (in strict mode)
// But you can extend it
