---
title: The javaScript Object freeze method as well as seal and define property
date: 2020-05-08 18:13:00
tags: [js]
layout: post
categories: js
id: 656
updated: 2021-11-18 12:44:11
version: 1.22
---

In the Core [javaScript Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) there is the [object freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) static method that can be used to freeze an object. Once an object is frozen none of the properties of the object can be changed. In addition to the Object freeze method there is also [the seal static method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) that is also of interest that is a little different from object freeze. The seal method does not freeze an object, however it does make it so no additional properties can be added to the object once it is sealed. 

There is set another static method that is relevant to this topic and that is the [define property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) static method of the the main javaScript Object. These three static methods allow for the creation of objects that have a strict set of conditions regarding the properties of an object when it comes to what can be added, changed, or show up in loops. So lets look at some examples mainly of the Object freeze method, but also some additional topics that might be related to this sort of thing.

<!-- more -->

## 1 - The Basics of freezing Objects in javaScript

In this section I will be going over a few quick examples on the subject of freezing objects in javaScript. Although I will be keeping these examples fairly simple I assume that you have at least some experience working with javaScript in one kind of environment or another. If not I have my main [getting started with javaScript](/2018/11/27/js-getting-started/) type post that might project to be a good starting location on this site. I also have additional getting started with javaScriot posts on getting started by way of the [javaScript console](/2019/07/29/js-getting-started-javascript-console/) as well as by way of the [file protocol](/2020/09/21/js-getting-started-file-protocol/). There is also getting started with javaScript outside of the browser by [getting started with nodejs](/2017/04/05/nodejs-helloworld/) which would be worth looking into sooner or later of you are new to javaScript.

### - The source code examples in this post are on github

the source code example on this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-object-freeze-seal-and-define-property/s1-basics) on Github as with all my [other posts on javaScript](/categories/js/). This is where you would want to go when it comes to making a pull request on Github with respect to one of the source code examples in this post. There is also the comments section at the bottom of this page that can eb used as a way to bring something up with the source code of the post in general.

### 1.1 - JavaScript objects and the const keyword

So the const keyword is used to define constant variable in javaScript along with other options such as var and [let](/2019/02/09/js-javascript-let/). The constant values are indeed just that when it comes to primitive values, but if it is an object it just means that it can not be set to anything other than that object. The properties of an object that are defined with const can still be mutated so just using the const keyword alone is not really a good way to seal an object from mutation.

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

### 1.2 - The object freeze static method

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

### 1.3 - The object seal method

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

### 1.4 - The object define property method

There is then the define property method of the main Object global. This method can be used to set a writable flag for a property when defining it. So then this method is yet another tool in the toolbox when it comes to defining the nature of an object, and can also be used to obtain a similar result. The define property is worth looking into more if you have not done so all ready and not just for the sake of making an object property writable or not. It can also be used to make private object properties that will not show up when looping over the public keys by using a for in loop or something like the [Object.keys](/2018/12/15/js-object-keys/) static method.

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

This define property method then might prove to be a better option because I can also use it to set if a property can be writable or not, and also set some additional property for the object properties also while I am at it.

## 2 - Conclusion

So the object freeze method can be used to freeze the state of an object, but you still might want to deep freeze the object if it has nested properties. However if you really need to use the object freeze method then maybe you should really take a deeper look at what is going on in your code. One line of reasoning is that yes there is the const keyword, and there are also these additional object methods that can be used in conjunction with the const keyword. However still you can declare an object with just plain old var also, and as long as you treat it as a constant in your code then the same result is accomplished.

I can not say that I use object freeze that often, if fact so far I am not using it all all for that matter. I like to just try to treat certain objects as source objects, and [deep clone](/2017/11/13/lodash_clonedeep) new objects from those source objects. That way I do not need to bother with this method, yet still get a similar end result when it comes to the reasons why I might consider using a native javaScript feature such as the Object.seal method.

There is a lot more to cover when it comes to working with objects in javaScript such as with the prototype chain, copying by reference compared to copying by value, and various methods like Object.assign. However maybe getting into all of that would be a matter for another post.

