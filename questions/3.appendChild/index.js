'use strict'

// What if I save dom-element to variable, remove it in devtools and then do appendChild(var)?

// What if I do it again?

$0.addEventListener('click', () => console.log(1))
var x = $0
// backspace
document.body.appendChild(x)
document.getElementsByTagName('div')[0].appendChild(x)

// Looks like `x` will be removed from body before inserting it to div. So, no multiple copies of elements.

// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild

// Looks like w3c agree with chrome
// https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-184E7107
// > If the newChild is already in the tree, it is first removed.

// And the awesome thing is that all event handlers are still there
