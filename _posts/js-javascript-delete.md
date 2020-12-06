---
title: javaScript delete operator
date: 2019-02-20 02:20:00
tags: [js]
layout: post
categories: js
id: 387
updated: 2020-12-06 13:13:35
version: 1.16
---

The [JavaScript delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) operator might not come up that often in code examples, but once in a while it might be needed as a way to remove object properties. The reason why I say that it does not come up often is because all of the time thus far setting the value of an object property to something like null or undefined is good enough. In addition I often just keep reusing the same resources in many of my projects so there is not really a need to delete an object property to begin with.

In this post I will be checking out the delete operator, and some related topics that seem to center around the use of it when it comes to managing object properties in javaScript.

<!-- more -->

## 1 - javaScript delete

The delete operator as you might expect is there to help delete things, but not just anything, only object properties. To use it just place the operator before the object property as it has [right to left associativity](/2019/02/02/js-operator-precedence/).

```js
let obj = {
    x: 5,
    y: 7,
    t: 1
};
console.log(obj.t); // 1
delete obj.t
console.log(obj.t); // undefined
```

Here I have a basic example of an object that has three properties, and I want to delete one of them. The delete operator can be used to do so, and when it is used and works successfully at deleting the property, it does not just set the property value to undefined it gets rid of it completely.

## 2 - Delete and set undefined

As I mentioned in the last section the delete operator can get rid of a property completely from an object. This differs from just setting an object key value to undefined. In that case the value of the property is undefined, but the key is still very much there and will show up in for in loops or when using an Object static method like Object.keys.

```js
var obj = {
    x: 15,
    y: 27
};
obj.y = undefined;
console.log(Object.keys(obj).length); // 2
delete obj.y;
console.log(Object.keys(obj).length); // 1
```

So then the delete operator serves a purpose because it can potentially be used as a way to free up a little memory in some cases.

## 3 - Can not delete variables

The delete operator expects an object property to the right of it when used in an expression. It can not be used to delete variables, unless it is a property of an object, and that property can be deleted.

```js
// can not delete variables (in nodejs)
var n = 42;
delete n;
console.log(n); // 42
 
// but can delete a property
this.n = 42;
console.log(this.n); // 42
delete this.n;
console.log(this.n); // undefined
```

However it is possible to delete global variables in client side javaScript the reason why is because they are really properties of the window object.

## 4 - The return value of the delete operator.

The delete operator returns a value of course, and that value is a true or false boolean value. In the event that the property can not be deleted for whatever the reason then the value will be false, otherwise true will be returned if all is well.

```js
var obj = {
    foo: 'bar'
};
 
Object.defineProperty(obj, 'bar', {
    value: 'foobar',
    enumerable: true,
    configurable: false,
    writable: false
});
 
console.log(delete obj.foo); // true
console.log(delete obj.bar); // false
 
console.log(obj); // { bar: 'foobar' }
```

Here I am using the Object.defineProperty method to set a property of an object so that it can not be deleted. When The configurable property of the options object that I give to Object.defineProperty is set to false, then the property can not be deleted.

## 5 - The delete operator mangles an existing object. 

Some times I might want to create a new independent object from an existing object, and that new object will have just some properties from the older object. There is a lot to be said about that when it comes to cloning objects, in lodash there are methods like [\_.pick](/2018/07/11/lodash_pick/), and \_.omit that can be used to make quick work with this. However when dealing with just plain vanilla js the process might be just a little involved.

```js
var obj = {
    x: 15,
    y: 27,
    time: 300,
    lastCall: 30
};
 
// clone the object somehow
var objCopy = JSON.parse(JSON.stringify(obj));
delete objCopy.time;
delete objCopy.lastCall;
 
objCopy.x = 0;
objCopy.y += 3;
 
console.log(objCopy.x, objCopy.y); // 0 30
console.log(obj.x, obj.y); // 15 27
```

In this example I am using the JSON trick to clone an object, maybe not the best way to go about doing it but one way or another the object will need to be cloned. Once I have a cloned object I can then delete properties and change the values of the properties that remain and not effect the original object from which the new object was cloned.

## 6 - Indexed Objects, Sparse Arrays, and the delete operator

The delete operator will actually delete an object property which is very different from setting it to a value such as undefined. When reading object properties that are empty the resulting value us undefined, however this is actually a little misleading, the true value is not even that, it is empty, it is not even there are all. That is because an object property can be defined, but with a value that is undefined. I know that might should a little confusing, and yes it is, but maybe there is something that can be done to help with that confusion.

In this section I will be going over some Objects that are indexed objects. These objects should help to give you a better understanding over what the difference is between having elements of an object that are undefined, and elements that are truly empty.

### 6.1 - Object with undefined keys, and an empty object

Mayb the best way to understand the difference between empty and defiled but undefined is to take into account the following example involving two objects.

```js
// an object with three indexed keys each set to undefined
// with a private length property of 3
let obj = {
    0: 'undefined',
    1: 'undefined',
    2: 'undefined',
    length: 3
};
Object.defineProperty(obj, 'length', {
    enumerable: false,
    value: 3
});
// an empty object
// with a private length property of 3
let obj2 = {};
Object.defineProperty(obj2, 'length', {
    enumerable: false,
    value: 3
});
 
// so then they both have the same 'length'
console.log(obj.length); // 3
console.log(obj2.length); // 3
 
// but the public key count is different
console.log(Object.keys(obj).length); // 3
console.log(Object.keys(obj2).length); // 0
 
// delete can make obj truly empty
delete obj[0];
delete obj[1];
delete obj[2];
console.log(Object.keys(obj).length); // 0
console.log(Object.keys(obj2).length); // 0
```

### 6.2 - Delete and an Sparse indexed object

In this example I am working with an object with indexed keys, but the index values are sparse. This example should help to show what the difference is between setting elements to an undefined value, and actually removing them with the delete operator.

If I just set keys that are all ready set to a value as something like undefined that will not effect the count of public key values. The key is still there it just holds a value that is undefined, however if I use the delete key it will actually remove the key completely. In addition if I set a key value that has not been defined yet that will increase the number of public keys, but if I call delete on a key that is all ready empty to begin with that will have no effect.

```js
let obj = {
    0: 5,
    1: 7,
    2: 1,
    40: 3,
    41: 7,
    42: 12
};
 
console.log(Object.keys(obj).length); // 6 public (enumerable) keys
 
// setting elements to undefined or null will not
// effect the number of public keys
obj[0] = undefined;
obj[1] = null;
console.log(Object.keys(obj).length); // 6 public (enumerable) keys
 
// setting an empty key to undefined will count as a public key
obj[3] = undefined;
console.log(Object.keys(obj).length); // 7 public (enumerable) keys
 
// The delete operator will actually delete a key
delete obj[0];
delete obj[1];
delete obj[2];
delete obj[3];
delete obj[4];
delete obj[5];
console.log(Object.keys(obj).length); // 3 public (enumerable) keys
```


## 7 - Conclusion

Hopefully you learned a thing or two about the delete operator in javaScript today. It can come in handy in some situations but is not always the best tool for the job. For the most part when I am working on projects I can not say that I use the delete operator often, but it is nice to know that it is there in the event that I do need it for some reason.