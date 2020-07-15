---
title: the js to string method in objects, and setting what the string value should be for an object
date: 2020-07-14 14:59:00
tags: [js]
layout: post
categories: js
id: 682
updated: 2020-07-15 12:11:04
version: 1.6
---

In javaScript there is a standard way for creating a method for an object that will return the string value for an object. This standard way of defining what a string primitive is for an object is the [to string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method. In addition to the to string method there is also the value of method that is a way to set what the number primitive value for an object should be.

<!-- more -->

## 1 - A basic to string method example

A to string method can be added to any object as an actual property of the object itself, also know as an own property of an object, or by way of the prototype chain. When using something like the main Sting method to convert an object to a string, the to string method will be used to create a primitive string value of the object.

```js
var obj = {
    x: 40,
    y: 5
};
 
console.log( String(obj) );
// [object Object]
 
var pt = {
    x: 40,
    y: 5,
    toString: function () {
        return '(' + this.x + ', ' + this.y + ')';
    }
};
 
console.log( String(pt) );
// (40, 5)
```

## 2 - to string and value of

On top of the to string method there is also the value of method that works the same way as the to string method, but is there to return a number value of the object rather than a string. the two methods can be used with an object to return the right value of an object depending on how the object is used with expressions, and things like the main String and Number functions.

For example say you have an object that contains and exponent, and a base property. The value of method can use the math pow method to return a single number of the base and exponent. In addition the to string method can also use that same method, just return it in a string from of some kind.

```js
var obj = {
    exp: 4,
    base: 2,
    valueOf: function () {
        return Math.pow(this.base, this.exp);
    },
    toString: function () {
        return '*' + this.valueOf() + '*';
    }
};
 
var n = obj + 5,
str = String(obj) + 5;
 
console.log(n, typeof n); // 21 'number'
console.log(str, typeof str); // *16*5 string
```

## 3 - Conclusion

So the to string and to value methods of objects are ways of defining what the primitive values should be for an object, or a class of objects. The toString method returns what should be a string value of an object, and the value of method returns a plain javaScript number value for an object.

There are many situations in which these methods come into play, for example say you are making a module that is used to preform high precision math by way of having objects that contain a string that has over a hundred digits for a number. The to string method can be used to return just that string value, and the value of method can be used to return a number value of that digit string although at a loss of precision.