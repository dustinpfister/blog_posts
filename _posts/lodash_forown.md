---
title: The lodash forown method
date: 2017-09-24 10:37:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 43
updated: 2021-12-30 11:31:28
version: 1.32
---

Looping over all keys in an object is something that comes up a whole lot when working on a javScript project. There are a wide range of ways of doing so with arrays, such as the array for each method, or using a while loop. However there is also all kinds of ways of doing so with objects in general also, not just arrays, but array like objects, and various kinds of objects that are collections in the form of named rather than index keys. So then there are ways of creating an array of key names for objects in general, and then looping over the resulting array as a way to do so with such objects.

Sometimes it would be nice to have a method that will only loop over key value pares that are actually part of the object rather than values that are inherited from the prototype of the objects class. One option to do so is the [\_.forOwn](https://lodash.com/docs/4.17.4#forOwn) method in [lodash](https://lodash.com/) that can be used as a way to loop over all the own properties of an object. There is also of course the [\_.forIn](/2018/09/30/lodash_forin/) method as well that will loop over the own properties of an object as well as what is in the prototype object of the object on top of that.

However doing so is not so hard with plain old javaScript by itself also, so these methods are not the most compelling reasons to bother with lodash. With that being said I will be looking at some vanilla javaScript solutions for looping over the own properties of an object in addition to using lodash to do so.

<!-- more -->

## 1 - Lodash for own basic examples, and what to know first

This is a post on the \_.forOwn method in lodash, and related topics to the use of such a method in the popular utility library. It is not a getting started post on lodash, or javaScript in general for that matter, so if you are still fairly new to javaScript you might want to look into a [getting started with javaScriot type post](/2018/11/27/js-getting-started/) first. I also will not be getting into prototype based inheritance in this post as well, as that is a matter for another post such as my post on [constructor functions](/2019/02/27/js-javascript-constructor/).

In this section I will be starting out with some examples that have to do with using lodash, rather than just using javaScript by itself, that I will be getting to in a later section in this post.

### 1.1 - A Basic example of \_.forOwn

For a basic example of \_.forOwn I put together a quick example that involves a custom made constructor method, and a prototype for that method. The \_.forOwn method will loop over just the own properties of the object, and will not loop over anything in the prototype object of the constructor that was used to create the object. 

```js
let Unit = function (obj) {
    obj = obj || {};
    this.x = obj.x || 0;
    this.y = obj.y || 0;
};
Unit.prototype.size = 64;
// DEMO using lodash for own method
let u = new Unit({ x : 12,y : 5});
_.forOwn(u, function (val, key, obj) {
    console.log(key + ' : '+val);
});
// x: 12
// y: 5
```


### 1.2 - lodash for in

The lodash \_.forIn method on the other hand will loop over both the own properties as well as the inherited properties.

```js
let Unit = function (obj) {
    obj = obj || {};
    this.x = obj.x || 0;
    this.y = obj.y || 0;
};
Unit.prototype.size = 64;
// DEMO using lodash for own method
let u = new Unit({ x : 12,y : 5});
_.forIn(u, function (val, key, obj) {
    console.log(key + ' : '+val);
});
// x: 12
// y: 5
// size: 64
```

So that is the difference between the \_.forOwn, and \_.forIn methods in lodash. If you are just using plain javaScript though no problem there is the for in loop, and the has own property object prototype method that can be used. With that said lets take a look at thise options and another else that might be useful for these kinds of situations in javaScript alone.


## 2 - Vanilla javaScript solutions for getting own properties of an object

There are a whole lot of useful methods in lodash, but there is also a whole lot to work with when it comes to just plain old javaScript by itself. Maybe there is a degree of concern when it comes to not wanted code to break on older platforms, but that is also a concern with using lodash also as later versions of lodash will break also on old enough web browsers anyway.

Sense I got the lodash examples out of the way when it comes to looping over the own properties of an object, in this section I will be going over some examples that have to do with doing the same things with javaScript by itself. There are features like the for in loop, but there are also other useful methods and features to be aware of when it comes to these kinds for tasks also.

### 2.1 - Using a for in loop

So \_.forOwn is one of those methods in lodash where I am scratching my head wondering why I should bother with lodash, because doing things like this is not that difficult in vanilla js. The [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) Object prototype method can be used as a way to find out if the property of an object is the own property of that object rather than an inherited property for example. There is also the native [for in loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) that will loop over all the properties of an object just like that of the lodash for in method, but I can just use this has own property method in the body of the for in loop to check if it is an own property or not.

```js
let Unit = function (obj) {
    obj = obj || {};
    this.x = obj.x || 0;
    this.y = obj.y || 0;
};
Unit.prototype.size = 64;
// DEMO using the for in loop and Object.hasOwnProperty
let u = new Unit({ x : 12,y : 5});
let key, val;
for(key in u){
    // using Object.hasOwnProperty to find if a property is and
    // own property or not
    if(u.hasOwnProperty(key)){
        val = u[key];
        console.log(key + ' : '+val);
    }
}
```

So the for in loop will loop over the own properties of an object as well inherited properties, and the hasOwnProperty method has to be used as a way to filter those out, and just have the own properties of the object. The end result is something that is more or less the same as what happens when using the lodash for own method. However maybe I should over at least a few more examples of this sort of thing in order to explore this at least a little farther as there are additional options that come to mind.

### 2.2 - Using the get Own Property Names static object method
 
Another option would be the [get own property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) method that will return an array of key names that are own properties of an object. This array can then be looped over using a method like the [array for each method](/2019/02/16/js-javascript-foreach/), or another other options for doing so such as a while loop, or one of the many other [array prototype methods](/2018/12/10/js-array/).

```js
let Unit = function (obj) {
    obj = obj || {};
    this.x = obj.x || 0;
    this.y = obj.y || 0;
};
Unit.prototype.size = 64;
// DEMO using Object.getOwnPropertyNames and array.foreach
let u = new Unit({x: 12,y: 5});
Object.getOwnPropertyNames(u).forEach(function (key) {
    let val = u[key];
    console.log(key + ' : ' + val);
});
// x: 12
// y: 5
```

### 2.3 - Creating a method

I went over at least two options that have to do with looping over the own properties of an object with native javaScript features. So then one of these options, as well as any and all other could be used to create a for own method from the ground up.

```js
// making a vanilla js forOwn method
let forOwn = function(obj, func){
    let keys = Object.getOwnPropertyNames(obj);
    keys.forEach(function (key) {
        func.call(obj, obj[key], key, obj);
    });
};
let Unit = function (obj) {
    obj = obj || {};
    this.x = obj.x || 0;
    this.y = obj.y || 0;
};
Unit.prototype.size = 64;
// DEMO using VJS forOwn method
let u = new Unit({x: 12,y: 5});
forOwn(u, function(val, key){  console.log(key + ' : ' + val); })
// x: 12
// y: 5
```

## 3 - Conclusion

One nice thing about the \_.forOwn method is that it may be a bit more concise compared to writing out a for in loop, or one of the many other ways of doing so with native javaScript by itself. That is something of value because I find that making code more concise may help to improve readability, other then that I cant say it is to big of a deal to do this the vanilla js way really. Also there are many reasons why on might be interested in making some kind of custom tailored utility library rather than just using lodash.

If you enjoyed this post be sure to check out my other [posts on lodash](/categories/lodash/), and if you have any questions or concerns feel free to drop a line in the comments.