---
title: The lodash _.forown method
date: 2017-09-24 10:37:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 43
updated: 2020-01-10 15:09:44
version: 1.12
---

Looping over all keys in an object is something that comes up a whole lot when working on a javScript project. Sometimes it would be nice to have a method that will only loop over key value pares that are actually part of the object rather than it's prototype that is inherited. 

One option to do so is the [\_.forOwn](https://lodash.com/docs/4.17.4#forOwn) method in [lodash](https://lodash.com/) that can be used as a way to loop over all the own properties of an object. There is also of course the [\_.forIn](/2018/09/30/lodash_forin/) method as well that will loop over the own properties of an object as well as what is in the prototype object also.

However doins so is not so hard with plain old javaScript by itself also, so these methods are not the most compelling reasons to bother with lodash. With that being said I will be looking at some vanilla javaScript solutions for looping over the own properties of an object in addition to using lodash to do so.

<!-- more -->

## 1 - What to know

This is a post on the \_.forOwn method in lodash, and related topics in javaScript. It is not a getting started post on lodash, or javaScript in general. I also will not be getting into prototype based inheritance in this post as well, as that is a matter for another post.

## 2 - A Basic example of \_.forOwn

For a basic example of \_.forOwn I put together a quick example that involves a custom made constructor method, and a prototype for that method. The \_.forOwn method will loop over just the own properties of the object, and will not loop over anything in the prototype object. The lodash \_.forIn method on the other hand will loop over both the own properties as well as the inherited properties.

```js
var Unit = function (obj) {
 
    obj = obj || {};
    this.x = obj.x || 0;
    this.y = obj.y || 0;
 
};
 
// size value in the prototype
Unit.prototype.size = 64;
 
// new Unit
var u = new Unit({
        x : 12,
        y : 5
    });
 
// only x and y are displayed in the console (nothing from the prototype)
_.forOwn(u, function (val, key, obj) {
 
    console.log(key + ' : '+val);
 
});
 
// _.forIn on the other and will display everything.
_.forIn(u, function (val, key, obj) {
 
    console.log(key + ' : '+val);
 
});
```

## 3 - Using a for in loop

So \_.forOwn is one of those methods in lodash where I am scratching my head wondering why I should bother with lodash, because doing things like this is not that difficult in vanilla js. The [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) Object prototype method can be used as a way to find out if the property of an object is the own property of that object rather than an inherited property for example.

```js
var key,val;
for(key in u){
 
    // using Object.hasOwnProperty to find if a property is directly on an object
    if(u.hasOwnProperty(key)){
 
        val = u[key];
        console.log(key + ' : '+val);
 
    }
 
}
```

The for in loop will loop over the own properties of an object as well inherited properties, so the hasOwnProperty method has to be used as a way to filter those out, and just have the own properties of the object.

## 4 - Conclusion

One nice things about the \_.forOwn method is that it may be a bit more concise compared to writing out a for in loop. That is something of value because I find that making code more concise may help to improve readability, other then that I cant say it is to big of a deal to do this the vanilla js way. If you enjoyed this post be sure to check out my other [posts on lodash](/categories/lodash/), and if you have any questions or concerns feel free to drop a line in the comments.