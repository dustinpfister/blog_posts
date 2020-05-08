---
title: The javaScript Object freeze method as well as seal and define property
date: 2020-05-08 18:13:00
tags: [js]
layout: post
categories: js
id: 656
updated: 2020-05-08 18:38:46
version: 1.3
---

In the Core javaScript Object class there is the freeze Object static method that can be used to freeze an object at which point none of the value of the object can be changed. There is however also the seal static method that is also of interest that is a little different. The seal method does not freeze and object, however it does make it so no additional properties can be added to the object. There is set another static method that is relevant to this topic and that is the define property static method of the Object class. These three static methods allow for the creation of objects that have a strict set of conditions regarding the properties of an object.

<!-- more -->

## 1 - JavaScript objects and the const keyword

So the const keyword is used to define constant variable in javaScript. The constant values are indeed just that when it comes to primitive values, but if it is an object it just means that it can not be set to anything other than that object. The properties of an object that are defined with const can still be mutated.

```js
const n = 42;
try {
    n = 40;
} catch (e) {
    console.log(e.message);
}
console.log(n); // 42
 
const obj = {
    n: 42
};
obj.n = 40;
console.log(obj.n);
```

## 2 - The object freeze static method

The object freeze static method can be used to freeze an object all together. Once an object is frozen the values can not be changed, no new properties can be added or removed, and all other properties of the object can also not be changed.

```js
const obj = {
    n: 42
};
 
Object.freeze(obj);
obj.n = 40;
console.log(obj.n); // 42
```

When freezing an object only the top level properties will be frozen, any property of the object that is a nested object can still be mutated.

## 3 - The object seal method

The object seal static method is similar to object freeze in the sense that a sealed object can not have any additional properties added, but any properties that existed before hand can still be changed.

```js
const obj = {
    n: 42
};
 
Object.seal(obj);
obj.n = 40;
console.log(obj.n); // 40
obj.a = 7;
console.log(obj.a); // undefined
```

## 4 - The object define property method

There is then the define property method of the object class. This method can be used to set a writable flag for a property when defining it.

```js
const obj = {};
 
Object.defineProperty(obj, 'n', {
    value: 42,
    writable: false
});
 
obj.n = 40;
obj.a = 7;
 
console.log(obj.n); // 42
console.log(obj.a);
```