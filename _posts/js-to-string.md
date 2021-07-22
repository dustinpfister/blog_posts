---
title: The js to string method in objects, and setting what the string value should be for an object
date: 2020-07-14 14:59:00
tags: [js]
layout: post
categories: js
id: 682
updated: 2021-07-22 15:15:34
version: 1.17
---

In javaScript there is a standard way for creating a method for an object that will return what the string value for an object should be. This standard way of defining what a string primitive is for an object is the [to string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method. In addition to the to string method there is also the [value of method](/2020/03/06/js-value-of/) that is a way to set what the number primitive value for an object should be. The toString method will be used in a javaScript expression where an object value needs to be converted to a string when using the object with a string value and the addition operator for example. As you would guess the value of method is more or less the same thing, but the primitive value returned by that function should be a number values rather than that of a string.

So then the toString method along with the value of methods of an object are standard way to define logic that will create a string or number primitive value of an object. In addition to this there are also constructor functions, and other static methods that will create an object from a primitive value. It is then worth it to write at least a little about this topic, so lets get to it here.

<!-- more -->

## 1 - A basic to string method example

A to string method can be added to any object as an actual property of the object itself, also know as an own property of an object, or by way of the prototype chain. When using something like the main Sting method to convert an object to a string, the to string method will be used to create a primitive string value of the object. In the event that that there is no to string method as an own property than the proto type object for the class of the object will be used, if there is no to string method there then any and all base classes will be looked at all the way down to the Object class.

### 1.1 - As own property example of to string

So say I have an object that contains properties for an x, and y axis values. In other words it is a simple point object that contains the contains of a single point in a grid. If I pass this Object to the main Sting function it will convert the object to a string, but because I did not define a toString method for it as an own property, and I created the object with the plain old object literal syntax, the string value is created with the default to string method of the main object prototype. The main to string method in the object prototype will not give the results that I would prefer, as I would like to have a string representation of that point when I do something like passing the object to the main String method.

So to solve this, I just need to have a toString method for the point object. In this to String method I just make sure that the value that is returned is a string, and that the string is formated the way that I would want it to be in that kind of situation.

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

### 1.2 - prototype objects of built in classes like Date

Many of the built in classes have there own to string methods that will change from one class to another depending on the nature of the class. For example the to string method of the Date class will give me a string representation of the date object as one might expect.

```js
var d = new Date(1983, 3, 6, 10, 5);
console.log(d.toString());
// Wed Apr 06 1983 10:05:00 GMT-0400 (Eastern Daylight Time)
```

### 1.3 - The prototype object of a new class

When making a new class I will often want to add a toString method to the prototype object to define what the string value should be for the object. This way the to string method of any and all instances of the class will be what is used to create a string value for the class instance, assuming that an own property has not been added to the instance that would override the to string method defined here.

```js
var Foo = function (a, b) {
    this.a = a;
    this.b = b;
    this.c = this.a + this.b;
};
 
Foo.prototype.toString = function () {
    return this.a + ' + ' + this.b + ' = ' + this.c;
};
 
var a = new Foo(1, 1);
console.log( a + '' ); // '1 + 1 = 2'
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

There is the main to string method of the base javaScript Object class, but just about every built in class has its own to string method to create a string value for the kind of object that the class creates. In the built in array class in javaScript there is a [array to string method](/2021/07/22/js-array-to-string/) for that one that will wok okay for simple arrays of primitives, but might fall short when it comes to nested objects.