---
title: Example of the _.findIndex array method in lodash
date: 2018-02-09 18:23:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 149
updated: 2021-12-20 09:05:45
version: 1.6
---

The [\_.findIndex](https://lodash.com/docs/4.17.5#findIndex) array method in [lodash](https://lodash.com/) can be used to find the first index of an element in an Array that meets a specific condition. In modern browsers there is now [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) that works in very much the same manor as \_.findIndex. So that would make the lodash find index method yet another one of those lodash methods that you might only bother with for the sake of backward compatibility with older browsers, or just for the sake of consistency if you are using lodash in a project. Yet again maybe not, it seems that the lodash alternatives often do have a little more going on with them, in addition there are additional helper methods that can be used with \_.findIndex that come in handy. So maybe I should not be to quick to judge as many of these methods are not just referencing native methods, [although some of them are](/2019/11/01/lodash_wrapper_methods/).

<!-- more -->

## 1 - Basic example of \_.findIndex

So even when it comes to older browsers such as MSIE9, [Array.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) works fine when dealing with an array of primitives. However if falls short when it comes to working with an array of objects. There is the native findIndex array prototype method but that will not work in any version of Microsoft Internet explorer so if you are still a little word about browsers that are not evergreen there is a need for a pollyfil or the lodash \.findIndex method.

As such typical use case scenarios of \_.findIndex involve arrays of Objects.

```js
var users = [
    { name: 'John', points: 1200},
    { name: 'Jerry', points: 300}, 
    { name: 'bill', points: 935}
 
];
 
// find bill using the _.matches shorthand
console.log(_.findIndex(users, {name: 'bill'})); // 2
```

## 2 - Vanilla javaScript alternatives to the lodash find index method

There are a number of prototype methods in various built in classes as well as javaScipt language features that can also be used to quickly find one or more index values in a collection of one sort or another. With that said in this section I will be going over some plain vanilla javaScript examples that involve getting index values with javaScript itself rather than using lodash.

### 2.1 - \_.findIndex vs Array.indexOf

The Array.indexOf method in vanilla js is very well supported, but only works with arrays of primitives. Never the less when dealing with simple arrays, it is pretty safe to just use that method to get the index, as a solution with _.findIndex will be overly complex by comparison.

```js
// an array, and what to look for
let arr = ['foo', 'man', 'chew'];
// Array.indexOf
console.log( arr.indexOf('man')) ; // 1
```

### 2.2 - \_.findIndex vs Array.findIndex

In modern browsers there is the Array.findIndex method that works in a very similar fashion of \_.findIndex. This is an array prototype method so if the browser or version of nodejs that you are using supports it then one can just call the method off of an instance of an array, and pass a function that defines the logic to use to know if an index has been found or not.

```js
let objs = [
    { n: 12 },
    { n: 42 }, 
    { n: 7 }
];
// Array.findIndex works given the proper method
let i = objs.findIndex(function(el){
    return el.n === 42;
});
console.log( i ); // 1
```

This works fine, and in addition the methods that you give to \_.findIndex should also work with Array.findIndex, including lodash baked in methods that can be used with methods like \_.find, and \_.findIndex. However if you happen to be using lodash, you can just use the original method where a \_.matches shorthand is baked into the method itself. That is it is what is used when you give \_.findIndex and Object rather than a Function. This results in a slightly more concise solution, and also backward compatibility at least as far as IE 10, and even farther depending on the version of lodash you are using. So that being said, maybe this is not another one of those methods in lodash that are no longer needed after all.

## 3 -Conclusion

Not everything can, or should be in core javaScript itself. It's nice that we now have a lot of methods like \_.findIndex in the core of javaScript itself now, but there is still the question of older browsers, and also if you do take the time to dive deep into lodash, you might come to find that many of the methods do add a certain something more, or work in a slightly different way.

Happy Coding