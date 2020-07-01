---
title: Object keys in javaScript and getting arrays of key names
date: 2018-12-15 11:31:00
tags: [js]
layout: post
categories: js
id: 349
updated: 2020-07-01 07:42:51
version: 1.20
---

In javaScript Object keys in javaScript are the property names of an object that correspond with a value that can be a primitive, or another nested object of one kind or another such as a function or Date object. There are a few things to know about object keys in javaScript, such as how to get an array of public key names from a given object, how to create and get hidden key names, and also the work with inherited keys also when it comes to the nature of the prototype property of objects. 
In this post I will be writing about the basics of javaScript object keys, and also maybe some of the not so basic things to know about with object keys in general when working on a project. This includes the [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method as well as other [object prototype methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) like [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) that I will be getting to when it comes to getting both public and hidden key names of an object.

<!-- more -->

## 1 - What to know about Object keys in javaScript

In javaScript there are plain old Objects that can be created with the Object literal syntax, and then there are many other Objects that inherit from the plain old Object class such as Arrays, Functions, Dates, and so forth. These Objects contain property names, or keys, that corresponds with values that can be Numbers, Strings, other primitives, or additional nested Objects of one type or another. 

### 1.1 - Enumerable, and non-Enumerable Object key names

Object keys can be enumerable meaning that it is possible for the key name to be easily acquired into an array of key names. However it is also possible for them to be non-enumerable as well, when this is the case it is still possible to to include them in an array of key names it just means that a method like Object.getOwnPropertyNames needs to be used to do so. It is also possible to set this value for an object key as well, more on that later.

### 1.2 - inherited Object keys, and Object Own keys

javaScript supports prototype based inheritance, a subject I will not be getting into detail with here. However for the sake of the content of this post I will quickly mention that some keys of any given Object in javaScript are inherited from a prototype object chain and thus are not part of what is often referred to as an Objects own properties. When an Array of key names is produced in javaScript typically these keys are not needed or desired in such an array, so it is a non issue, but it is still something to be aware of when it comes to Object keys in javaScript.

## 2 - Object.keys method

The Object.keys method can be used to get the objects enumerable own key names. In other words key names that will show up with methods like Object.keys or a for in loop. To use the method I just call the Object.keys static method and pass the object that I want an array of key names for.

```js
var obj = {
    x: 0,
    y: 35,
    attack: 12,
    hp : {
      current: 47,
      max: 50
    }
};
 
var keys = Object.keys(obj);
 
console.log(keys); // ["x", "y", "attack", "hp"]
```

## 3 - Using a for in loop

A for loop can also be used to get the objects own key names also. This is a more tired yet true way of getting the key names of an object in javaScript. The Object keys method was introduced in ecma 5 sec javaScript, so an alternative method such as this might only need to be used if for some reason you need to support a real old platform.

```js
var keys = [],
k;
 
for(k in obj){
 
    keys.push(k);
 
}
```

## 4 - Using Object.getOwnPropertyNames to get non enumerable own property object keys as well

In some situations I might have some properties in an Object own properties that are not enumerable. In a way these kinds of properties are still enumerable, it just means that it can not be done with a for in loop or Object.keys. The Object.getOwnProperyNames method can still be used to include these kinds of object keys.

```js
var point = {
    x: 15,
    y: 25
};
 
Object.defineProperty(point, 'color', {
    value: '#ff0000',
    writable: false,
    enumerable: false
});
 
console.log(Object.keys(point)); // ["x","y"]
console.log(Object.getOwnPropertyNames(point)); // ["x", "y", "color"]
```

## 5 - Conclusion

So that is it for my post on Object keys in javaScript. There are keys that are enumerable so a list of key names can be easily obtained by using Object.keys or a for loop, and then Object.getOwnPropertyNames to get all Object own property names.
