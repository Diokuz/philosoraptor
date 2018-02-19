'use strict'

// Can I access super anywhere except constructor?
//// Yes, in object literals methods

// If yes, where it will point?
//// to __proto__

// MDS says that it is possible
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super

// Lets try for classes

class Animal {
  jump() {
    console.log('jump!', this.aaa) // 111
  }
}

class Dog extends Animal {
  constructor() {
    super()
    // const x = super // SyntaxError: 'super' keyword unexpected here
    console.log('super.jump()', super.jump()) // jump!
  }
  bark() {
    // console.log('super', super) // SyntaxError: 'super' keyword unexpected here
    // console.log('super.jump', super.jump)
    // console.log('super.jump()', super.jump())
  }
  aaa = 111
}

const d = new Dog()

// But wats about object literals?
// https://dmitripavlutin.com/why-object-literals-in-javascript-are-cool/
// You can use it like that:

let a = {
  foo: function() {
    console.log('foo!', this.bbb) // 222
  }
}

let b = {
  __proto__: a,
  foo() {
    // pass
  },
  bar() {
    super.foo() // 222 // `super` is actually `a`
  },
  bbb: 222
}

b.bar() // foo!

// Source https://dmitripavlutin.com/why-object-literals-in-javascript-are-cool/
