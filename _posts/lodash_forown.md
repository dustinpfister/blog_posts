---
title: The lodash _.forown method
date: 2017-09-24 10:37:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 43
updated: 2017-10-02 09:50:56
version: 1.4
---

Looping over all keys in an object is something that comes up a whole lot when working on a javScript project. Sometimes it would be nice to have a method that will only loop over key value pares that are actually part of the object rather than it's prototype. For this there is the [\_.forOwn](https://lodash.com/docs/4.17.4#forOwn) method in [lodash](https://lodash.com/) that makes this very easy.

<!-- more -->

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

## Using a for in loop

So _.forOwn is one of those methods in lodash where I am scratching my head wondering why I should bother with lodash, because doing things like this are not that difficult in vanilla js.

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

So the nature of a for in loop is that it will loop over all properties of an object, not just the ones

## Conclusion

Be sure to check out my other [posts on lodash](/categories/lodash/)