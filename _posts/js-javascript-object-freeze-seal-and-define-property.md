---
title: The javaScript Object freeze method as well as seal and define property
date: 2020-05-08 18:13:00
tags: [js]
layout: post
categories: js
id: 656
updated: 2020-05-08 18:47:10
version: 1.6
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

When freezing an object only the top level properties will be frozen, any property of the object that is a nested object can still be mutated. So if that is a problem then you will want to do a deep freeze which would be looping over all the nested objects of an object and freezing them also.

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

There is then the define property method of the object class. This method can be used to set a writable flag for a property when defining it. So then this method is yet another tool in the toolbox when it comes to defining the nature of an object.

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

In addition to setting the writable flag of an object it can also be use to change if the object can show up in loops and other methods meant to be used to explore if an object has properties.

## 5 - Conclusion

So the object freeze method can be used to freeze the state of an object, but you still might want to deep freeze the object if it has nested properties. However if you really need to use the object freeze method then maybe you should really take a deeper look at what is going on in your code. One line of reasoning is that yes there is the const keyword, and there are also these additional object methods that can be used in conjunction with the const keyword. However still you can declare an object with just plain old var also, and as long as you treat it as a constant in your code then the same result is accomplished yes?