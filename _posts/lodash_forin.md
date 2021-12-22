---
title: The lodash forIn method
date: 2018-09-30 14:40:00
tags: [js,lodash]
layout: post
categories: lodash
id: 43
updated: 2021-12-22 09:33:35
version: 1.28
---

The [\_.forIn](https://lodash.com/docs/4.17.4#forIn) method in [lodash](https://lodash.com/) is a helpful tool, for looping over both own, and inherited properties in an Object in a javaScript environment. There are a number of other ways to go about looping over the various properties of objects though with both lodash, as well as with just plain old javaScript by itself though. In lodash there is the [lodash for each collection method](/2017/11/20/lodash_foreach/) that will loop over all of the own properties of an object collection in general, and in native javaScript there is the [array for each method](/2019/02/16/js-javascript-foreach/) that will loop over all the numbered, public own properties of an array. There is also not a native for in loop in javaScript itself also as well that can be used in modern javaScript specs. So then with that said, in this post I will be covering a basic use case example of \_.forIn, and how it compares to other lodash, and vanilla js methods of looping over object properties in javaScript.

<!-- more -->

## 1 - Lodash for in method, and what to know before hand

This is a post on the \_.forIn method in lodash, and other related topics. The \_.forIn method can be used to loop over both the own properties of an object as well as anything that may be in the prototype chain. Also in these lodash posts of mine I also look into plain old vanilla js alternatives to lodash methods as well, and blend them together into one post. In order to gain something of value from this post I assume that you have at least some background with javaScript in general. However in this section I will be starting out with what there is to work with using lodash as at least one if not more libraries to use in a project.

### 1.1 - Basic example of \_.forIn

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

## 2 - Vanilla js alternatives to \_.forin

In this section I will be exploring ways to go about looping over both own and inherited properties of objects just using vanilla js by its3elf without using lodash, or any kind of user space library of framework. When it comes to this there is of source the built in for in loop of native javaScript, as well as many other ways of creating loops such as while loops, do while loop, and for loops. Other than that there are ways to make an array of key names and then use that to loop over all own and inherited properties in an object by making use of a method like that of the Object.keys method.

### 2.1 - Starting out with just a simple for in loop example

Just a [plain old for in loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) seems to work just fine to loop over own properties of an object as well as what is in the prototype object as well. There is the fact that a for in loop is a kind of loop rather than a function that will take a function as an argument, but this is a problem that is very easily solved by just making my own kind of function that is like the lodash for in loop.

```js
// Simple Constructor and Prototype
let A = function () {
    this.b = 42
};
A.prototype.c = 7;
// using the for in loop
let a = new A();
for (let prop in a) {
  console.log(prop + ' : ' +a[prop]);
}
```

### 2.2 - Using Object.keys, Array concat, and Array for each

Another way would be to create an array of key names, and loop over that array of key names by one means of doing so or another. Using [Object.keys](/2018/12/15/js-object-keys/) will give me all the enumerable properties of an object, but not it's prototype, unless I give the prototype object itself to the object keys method. So I could use Object.keys twice, and then use an array method like [array concat](/2020/07/13/js-array-concat/) to create a single array of keys that way. Then it is just a matter of looping over these key names and then use the keys to get references to the values inside the body of the loop.

```js
// Simple Constructor and Prototype
let A = function () {this.b = 42;};
A.prototype.c = 7;
// Object.keys, array concat, and array foreach
let a = new A(),
keys = Object.keys(a).concat(Object.keys(a.constructor.prototype)),
str = '';
keys.forEach(function (key) {
    str += key + ':' +a[key] + ';';
});
console.log(str);
// b:42;c:7;

```

## 3 - Conclusion

So \_.forIn is useful for just quickly looping over both the own properties, as well as inherited properties of an Object. The only types of properties that it will not loop over are non enumerable properties. However that can be done in vanilla js with the help of [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames). I would get into that in detail as well but that is a matter for another post. If you enjoyed this post you might want to also check out mu posts on [\_.forOwn](/2017/09/24/lodash_forown/) which is just like \_.forIn only it loops of the own properties of an object. There are also a whole lot of other methods in lodash that have to do with looping over the contents of a collection in one form or another though each of which are worth looking into at least once. So if you are looking for more to read up on with lodash there is checking out my [main post on lodash](/2019/02/15/lodash/), or reading one of my [many other posts on various lodash methods](/categories/lodash/), and other relevant topics.