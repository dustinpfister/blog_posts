---
title: Example of the _.findIndex array method in lodash
date: 2018-02-09 18:23:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 149
updated: 2018-02-09 20:02:10
version: 1.1
---

The [\_.findIndex](https://lodash.com/docs/4.17.5#findIndex) array method in [lodash](https://lodash.com/) can be used to find the index of an element in an Array. In modern browsers there is now Array.findIndex that works in very much the same manor as \_.findIndex, making this yet another one of those lodash methods that you might only bother with for the sake of backward compatibility with older browsers. Yet again maybe not, it seems that the lodash alternatives often do have a little more going on with them, in addition there are additional helper methods that can be used with \_.findIndex that come in handy.

<!-- more -->

## Basic example of \_.findIndex

So even when it comes to older browsers, Array.indexOf works fine when dealing with an array of primitives. As such typical use case scenarios of \_.findIndex involve arrays of Objects.

```js
var users = [
    { name: 'John', points: 1200},
    { name: 'Jerry', points: 300}, 
    { name: 'bill', points: 935}
 
];
 
// find bill using the _.matches shorthand
console.log(_.findIndex(users, {name: 'bill'})); // 2
```

## \_.findIndex vs Array.indexOf

The Array.indexOf method in vanilla js is very well supported, but only works with arrays of primitives. Never the less when dealing with simple arrays, it is pretty safe to just use that method to get the index, as a solution with _.findIndex will be overly complex by comparison.

```js
// an array, and what to look for
var arr = ['foo', 'man', 'chew'],
what = 'man',
 
// what about index
i = _.findIndex(arr, function (el) {
 
        return el === what;
 
});
 
// yes, _.findIndex can be used to find the index
console.log(i); // 1
 
// but why bother then Array.indexOf is well supported?
console.log( arr.indexOf('man')) ; // 1
```

## \_.findIndex vs Array.findIndex

In modern browsers there is the Array.findIndex method that works in a very similar fashion of \_.findIndex

```js
var objs = [{
        n: 12
    }, {
        n: 42
    }, {
        n: 7
    }
];
 
// Array.findIndex works given the proper method
console.log( objs.findIndex(function(el){
 
    return el.n === 42;
 
}) ); // 1
```

This works fine, and in addition the methods that you give to \_.findIndex should also work with Array.findIndex, including lodash baked in methods that can be used with methods like \_.find, and \_.findIndex. In other words you can do this:

```js
console.log( objs.findIndex( _.matches({n:42}) ) ); // 1
```

However if you happend to be using lodash, you can just use the original method where a \_.matches shorthand is baked into the method itself. That is it is what is used when you give \_.findIndex and Object rather than a Function.

```js
console.log( _.findIndex(objs, {n:42}) ); // 1
```

This results in a slightly more concise solution, and also backward compatibility at least as far as IE 10, and even farther depending on the version of lodash you are using. So that being said, maybe this is not another one of those methods in lodash that are no longer needed after all.

## Conclusion

Not everything can, or should be in core javaScript itself. It's nice that we now have a lot of methods like \_.findIndex in the core of javaScript itself now, but there is still the question of older browsers, and also if you do take the time to dive deep into lodash, you might come to find that many of the methods do add a certain something more, or work in a slightly different way.

Happy Coding