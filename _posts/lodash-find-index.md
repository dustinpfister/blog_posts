---
title: The lodash findIndex array method and vanilla javaScript alternatives
date: 2018-02-09 18:23:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 149
updated: 2021-12-20 10:37:33
version: 1.14
---

The [\_.findIndex](https://lodash.com/docs/4.17.5#findIndex) array method in [lodash](https://lodash.com/) can be used to find the first index of an element in an Array that meets a specific condition. In modern browsers there is now [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) that works in very much the same manor as \_.findIndex. So that would make the lodash find index method yet another one of those lodash methods that you might only bother with for the sake of backward compatibility with older browsers, or just for the sake of consistency if you are using lodash in a project. Yet again maybe not, it seems that the lodash alternatives often do have a little more going on with them, in addition there are additional helper methods that can be used with \_.findIndex that come in handy. So maybe I should not be to quick to judge a lodash method such as the lodash find index method,  as many of these methods are not just referencing native methods, [although some of them are](/2019/11/01/lodash_wrapper_methods/).

In this post then I will be going over a few quick examples of the lodash find index method, and then get into some additional examples that have to do with using native javaScript for getting one or more index values in an array that meet a given condition.

<!-- more -->

## 1 - Basic examples of the lodash find Index, and other useful lodash methods

So even when it comes to older browsers such as MSIE9, [Array.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) works fine when dealing with an array of primitives. However it falls short when it comes to working with an array of objects, or any kind of situation in which I need to define some custom logic for what it is that I am looking for in an array that might be something other than that of a static pattern or value of some kind. There is still working just with native javaScript, just using a pollyfill when needed to make sure that a native method that should be there is indeed there. However in this section I will not be getting into vanilla javaScript solutions for this sort of thing just yet, but rather what there is to work with in lodash, if lodash is there to work with in a project.

In this section, and in this post in general I am focusing on finding an index value, rather than getting a reference to an object. With that said there are a lot of other methods in lodash that might also prove to be useful when it comes to other related tasks to that of getting an index value. For example there is also the [plain lodash find method](/2017/09/14/lodash-find/) that will work just like find index only it will return a value rather than a index value.

### 1.1 - lodash find index and a array of strings

First off say I have an array of user names and I just want to find the index of the first instance of a name from right to left. One way to go about doing that would be to use the lodash find index method by passing the array of names as the first argument, followed by a function that will be used to find out if this is the index that I want or not.

```js
// get index by name
const getIndexByName = (users, name) => {
    return _.findIndex(users, (el) => {
        return el === name;
    });
};
// demo
let users = ['John', 'Jerry', 'Bill'];
console.log( getIndexByName(users, 'Bill') ); // 2
console.log( getIndexByName(users, 'Mark') ); // -1
```

### 1.2 - Basic lodash find index method example

A typical use case scenario of  the \_.findIndex method might involve an arrays of Objects. Say I have a users array, and each object in this users array has a name and points value. Say I would like to just find the index of the object in this array where the name property matches a given fixed static value. The lodash find index method can be used for this sort of thing by calling the find index method and passing the users array as the first argument. After that I can just pass an object that contains a name prop key with the given value that I want in this case a static value for the name that I want. The returned value is then the index value of the object in the array that mates the given query.

```js
// get index by name
const getIndexByName = (users, name) => {
    return _.findIndex(users, {name: name});
};
// demo
let users = [
    { name: 'John', points: 1200},
    { name: 'Jerry', points: 300}, 
    { name: 'Bill', points: 935}
];
// find bill using the _.matches shorthand
console.log( getIndexByName(users, 'Bill') ); // 2
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