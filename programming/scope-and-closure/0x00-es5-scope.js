/*
 var declaration:
    - hoisting
    - variable declared using var is added as a non-configurable property of the global object.
*/
console.log(x); // undefined (note: not ReferenceError)
var x = 1;
console.log(x); // 1


var a = 1;
console.log(window.a === a);
