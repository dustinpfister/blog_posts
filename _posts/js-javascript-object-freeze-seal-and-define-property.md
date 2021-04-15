---
title: The javaScript Object freeze method as well as seal and define property
date: 2020-05-08 18:13:00
tags: [js]
layout: post
categories: js
id: 656
updated: 2021-04-15 13:32:44
version: 1.9
---

In the Core [javaScript Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) there is the [object freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) static method that can be used to freeze an object. Once an object is frozen none of the properties of the object can be changed. In addition to the Object freeze method there is also [the seal static method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) that is also of interest that is a little different from object freeze. The seal method does not freeze an object, however it does make it so no additional properties can be added to the object once it is sealed. 

There is set another static method that is relevant to this topic and that is the [define property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) static method of the the main javaScript Object. These three static methods allow for the creation of objects that have a strict set of conditions regarding the properties of an object when it comes to what can be added, changed, or show up in loops. So lets look at some examples mainly of the Object freeze method, but also some additional topics that might be related to this sort of thing.

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

So the object freeze method can be used to freeze the state of an object, but you still might want to deep freeze the object if it has nested properties. However if you really need to use the object freeze method then maybe you should really take a deeper look at what is going on in your code. One line of reasoning is that yes there is the const keyword, and there are also these additional object methods that can be used in conjunction with the const keyword. However still you can declare an object with just plain old var also, and as long as you treat it as a constant in your code then the same result is accomplished.

I can not say that I use object freeze that often, if fact so far I am not using it all all for that matter. I like to just try to treat certain objects as source objects, and deep clone new objects from those source objects. That way I do not need to bother with this method.

