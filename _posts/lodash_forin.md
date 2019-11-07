---
title: The lodash _.forIn method
date: 2018-09-30 14:40:00
tags: [js,lodash]
layout: post
categories: lodash
id: 43
updated: 2019-11-07 13:01:40
version: 1.17
---

The [\_.forIn](https://lodash.com/docs/4.17.4#forIn) method in [lodash](https://lodash.com/) is a helpful tool, for looping over both own, and inherited properties in an Object in a javaScript environment. In this post I will be covering a basic use case example of \_.forIn, and how it compares to other lodash, and vanilla js methods of looping over object properties in javaScript.

<!-- more -->

## 1 - what to know before hand

This is a post on the \_.forIn method in lodash, and other related topics. The _.forIn method can be used to loop over both the own properties of an object as well as anything that may be in the prototype chain. Also in these lodash posts of mine I also look into plain old vanilla js alternatives to lodash methods as well, and blend them together into one post. In order to gain something of value from this post I assume that you have at least some background with javaScript in general.

## 2 - Basic example of \_.forIn

The \_.forIn lodash method will loop over all own, and inherited properties of an object. In other words the key value pairs that are specific to the object, as well as anything that is part of the objects prototype. Other options for loping over the contents of an object might just loop over what is an actual Constructor object instance property, rather than any additional properties that might be present in the prototype of the Constructor.

```js
// Simple Constructor and Prototype
let A = function () {
    this.b = 42
};
A.prototype.c = 7;
 
// _.forIn will loop over the Own
// properties as well as the prototype
_.forIn(new A(), function (d) {
    console.log(d); // 42 7
});
 
// Other options such as _.forOwn
// and _.forEach will just loop
// over Own properties
_.forOwn(new A(), function (d) {
    console.log(d); // 42
});
_.forEach(new A(), function (d) {
    console.log(d); // 42
});
```

## 3 - Vanilla js alternatives to \_.forin

In this section I will be exploring ways to go about looping over both own and inherited properties just using vanilla js. When it comes to this I was not able to come up with many solutions aside from a for in loop. Other than that there are ways to make an array of key names and then use that to loop over all own and inherited properties in an object.

### 3.1 - A for in loop

Just a plain old for in loop seems to work just fine to loop over own properties of an object as well as what is in the prototype object as well.

```js
let a = new A();
 
for (let prop in a) {
  console.log(prop + ' : ' +a[prop]);
}
```

### 3.2 - Creating an array of key names with Object.keys

Another way would be to create an array of key names, and loop over that with Array.forEach, while loop ect. Using Object.keys will give me all the enumerable properties of an object, but not it's prototype, unless I give the prototype object itself. So I could use Object.keys twice, and build an array of keys that way.

```js
let keys = Object.keys(a).concat(Object.keys(a.constructor.prototype));
 
keys.forEach(function (key) {
    var val = a[key];
    console.log(key + ' : ' + val);
});
```

## 4 - Conclusion

So \_.forIn is useful for just quickly looping over both the own properties, as well as inherited properties of an Object. The only types of properties that it will not loop over are non enumerable properties. However that can be done in vanilla js with the help of [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames). I would get into that in detail as well but that is a matter for another post. If you enjoyed this post you might want to also check out mu posts on [\_.forOwn](/2017/09/24/lodash_forown/) which is just like \_.forIn only it loops of the own properties of an object. There is also my post on [\_.forEach](/2017/11/20/lodash_foreach/) a collection method that is another way of looping over key value pairs with lodash.