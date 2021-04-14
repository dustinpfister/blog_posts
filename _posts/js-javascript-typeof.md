---
title: javaScript typeof operator
date: 2019-02-15 12:08:00
tags: [js]
layout: post
categories: js
id: 383
updated: 2021-04-14 08:38:51
version: 1.24
---

The [javaScript typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator will return a string that is the type of the operand that is given to it from the right of the typeof keyword when used in an expression. It is the first go to operator then to go about preforming type checking of values in javaScript.

However when it comes to data type checking in javaScript there are also some additional things to look out for when it comes to really knowing what one is dealing with when it comes to values. For example when it comes to objects the typeof operator will always return object, but will not give insight into the type of object. So the typeof operator is not a replacement for other keywords such as the instance of operator that will help to know what kind of object a value is when it is in fact an object.

The typeof operator might not always give the desired results in many cases. Maybe the most note worthy issue to be aware of is that it will return the value 'object' when used with a null value. This is actually the value that it should return, but some developers might considered this a bit confusion, and in any case it is something that one has to adjust for no matter what anyway.

<!-- more -->

## 1 - javaScript typeof lowdown

The typeof operator has right to left [associativity](/2019/02/02/js-operator-precedence/) so to use it I just need to type the typeof operator followed by what it is that I want to find the type of. the result of the expression of the typeof operator with the value I want the type of to the right of typeof will then evaluate to a string, and the string more often then not will be the type of the value. For the most part the typeof operator is fairly straight forward to use but it has a few quirks, so lets get into it by starting off with a basic example of javaScript typeof.

```js
let ty = typeof 42;
console.log(ty); // 'number'
```

Here the javaScript typeof operator works as expected, I give it a number and it returns the string 'number'. So far the type of operator works the way it should without issue. However there are certain values like NaN that stands for Not a Number yet its type if number. Things also get a little weird when I pass it the null value for example so lets continue looking at some more examples here.

## 2 - no need to call typeof as it is an operator and not a function

In some examples I see new javaScript developers placing parentheses around what it is that they want to find the type of. This is not necessary as the typeof operator is an operator and not a function. However in some cases you might still want to use parentheses as a way to group an expression as you might get undesired results.

```js
let str = typeof 6 + '7';
console.log(str); // 'number7'
 
let n = typeof (6 + '7');
console.log(n); // 'string'
```

So if you do need to group then use parentheses otherwise they are not needed.


## 3 - The deal with javaScript typeof and null

So there is something strange with the typeof operator and the value of null. When the value of null is what is used with the typeof operator the result is object.

```js
console.log( typeof null ); // 'object'
```

From  what I have [gathered so far with the typeof null equals object](https://stackoverflow.com/questions/18808226/why-is-typeof-null-object) deal in javaScript it it would seem that this is a mistake that dates all the way to the beginning of javaScript. However maybe object is an appropriate value to return considering that the value is often used as a placeholder for what should be an object. There is some talk as to the subject of if it will be fixed or not but so far it seems like that is not happening. Also it would not be a good idea to change it at this point as that would result in a whole world of code breaking, so it would seem that this is just once little thing that javaScript developers just need to adjust for when using typeof.

## 4 - Instanceof for finding out what an object is an instance of

In most cases the typeof operator works just fine if I want to find out if something is a number, or an object. However if I want to find out what kind of object I am dealing with then in most cases typeof does not help much unless it is a function. The instanceof operator accepts two operands one to the left that is what should be an object, and the other is a constructor function. If the variable or value that is being evaluated is an instance of the constructor then the expression will evaluate to true, else false.

```js
let d = new Date();

let Foo = function(){};
let f = new Foo();

console.log(typeof d); // object
console.log(typeof f); // object
 
console.log(d instanceof Date); // true
console.log(f instanceof Foo); // true
console.log(f instanceof Date); // false
```

## 5 - Constructor name

When dealing with an object another way to get the actual constructor name of the object rather than just always getting object is to look at the constructor property. All objects should have a constructor object that will contain the constructor function that was used to create the object. For example if it is a Date object then the constructor should be the Date constructor. There is then a name property of this object that is then the name of that constructor function that was used.

```js
let d = new Date();
console.log(d.constructor.name); // Date
```

## 6 - Conclusion

So it would seem that the javaScript typeof operator can be used as a way to find out the type of something in javaScript, but it might not aways work as expected. In addition when it comes to objects it is vague and can even return a value of object for null, so it still needs to be used with other operators to find out more in these situations.

JavaScript might be a typeless language however that just means that a variable can be any type at any given moment, it does not meed that javaScript does not have types. There are a number of data types to be aware of, also the javaScript of today is not the javaScript of yesterday as new specs  of javaScript keep coming out additional types are being added. One note worthy example of this might be the Big integer data type that has been introduced in recent years.


