---
title: The lodash findIndex array method and vanilla javaScript alternatives
date: 2018-02-09 18:23:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 149
updated: 2021-12-20 14:55:24
version: 1.33
---

The [\_.findIndex](https://lodash.com/docs/4.17.5#findIndex) array method in [lodash](https://lodash.com/) can be used to find the first index of an element in an Array that meets a specific condition. In modern browsers there is now [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) that works in very much the same manor as \_.findIndex. So that would make the lodash find index method yet another one of those lodash methods that you might only bother with for the sake of backward compatibility with older browsers, or just for the sake of consistency if you are using lodash in a project. Yet again maybe not, it seems that the lodash alternatives often do have a little more going on with them, in addition there are additional helper methods that can be used with \_.findIndex that come in handy. So maybe I should not be to quick to judge a lodash method such as the lodash find index method,  as many of these methods are not just referencing native methods, [although some of them are](/2019/11/01/lodash_wrapper_methods/).

In this post then I will be going over a few quick examples of the lodash find index method, and then get into some additional examples that have to do with using native javaScript for getting one or more index values in an array that meet a given condition.

<!-- more -->

## 1 - Basic examples of the lodash find Index, and other useful lodash methods

So even when it comes to older browsers such as MSIE9, [Array.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) works fine when dealing with an array of primitives. However it falls short when it comes to working with an array of objects, or any kind of situation in which I need to define some custom logic for what it is that I am looking for in an array that might be something other than that of a static pattern or value of some kind. There is still working just with native javaScript, just using a pollyfill when needed to make sure that a native method that should be there is indeed there. However in this section I will not be getting into vanilla javaScript solutions for this sort of thing just yet, but rather what there is to work with in lodash, if lodash is there to work with in a project.

In this section, and in this post in general I am focusing on finding an index value, rather than getting a reference to an object. With that said there are a lot of other methods in lodash that might also prove to be useful when it comes to other related tasks to that of getting an index value. For example there is also the [plain lodash find method](/2017/09/14/lodash-find/) that will work just like find index only it will return a value rather than a index value. In some cases I might in fact want an index value rather than an object reference, but I might want more than one index value that meets a given condition, for this there are methods like [lodash reduce](/2018/07/25/lodash_reduce/) and [lodash filter](/2018/05/18/lodash_filter/) combined with other such methods to just name a few options.

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

### 1.3 - Getting by points range example of lodash find index

So then there is getting an index value by way of a fixed status string value, however often I might want to get an index of an element that meets some other kind of condition. In a previous example I was getting an index of an object in a users array by name, bot there where also points values in these objects. So say now I want another method that will given be the first index of an object in an array that meets a given point value range.

```js
// get index by points range
const getIndexByPointsRange = (users, pointsMin, pointsMax) => {
    return _.findIndex(users, (obj) => {
        return obj.points >= pointsMin && obj.points <= pointsMax;
    });
};
// demo
let users = [
    { name: 'Jerry', points: 300},
    { name: 'John', points: 1200},
    { name: 'Bill', points: 935}
];
console.log( getIndexByPointsRange(users, 900, 1000) );      // 2
console.log( getIndexByPointsRange(users, 900, Infinity) );  // 1
console.log( getIndexByPointsRange(users, 2000, Infinity) ); // -1
```

### 1.4 - Chaining, sorting, and reversing

So then there is getting a single index value in an array from left to right that meets a given condition. There is just one problem with this though and that is the idea that the first element index in an array that meets a given condition might not always be the best element of the collection. I might get one index value from left to right, but if I where to selected from right to left I might get a whole other collection. With that said there is then the idea of creating a new sorted array from a source array, and then fid the first element in this sorted array. That element can then in turn be used to find the index value in the original unsorted source array.

In this example I am making use of the [lodash chain](/2018/11/11/lodash_chain/) method to create a sorted array of object from the user source array bu chaining the [lodash sort by](/2018/07/06/lodash_sortby) method with the [lodash reverse](/2018/10/17/lodash_reverse/) method. I am then passing this sorted array to the get index by points range method which will given be a result based on a soured array, but now the problem is that this index value will not be the index value of the same element in the source array. So then there is using the index value relative to the sorted array to get the element and then use the fine index method once again, but this time with the source array passing the object form the sorted array to get the final index value that I want.

```js
// get index by name
const getIndexByName = (users, name) => {
    return _.findIndex(users, (el) => {
        return el === name;
    });
};
// get index by points range
const getIndexByPointsRange = (users, pointsMin, pointsMax) => {
    return _.findIndex(users, (obj) => {
        return obj.points >= pointsMin && obj.points <= pointsMax;
    });
};
// demo
let users = [
    { name: 'Jerry', points: 300},
    { name: 'John', points: 550},
    { name: 'Mark', points: 35},
    { name: 'Bill', points: 935}
];
// if I just get by point range it will just get the first element
// but maybe not the best of the array is not sorted first.
console.log( getIndexByPointsRange(users, 500, 1000) ); // 1
// So then there is creating a new sorted array with lodash chain, sort by, and reverse
let sortedUsers = _.chain(users).sortBy((obj)=>{ return obj.points}).reverse().value();
// If I use the getIndexByPoints method now with the sorted array I get an index
// that is a higher value, but the index value is relative to the new sorted array rather than
// the original source array users
let si = getIndexByPointsRange(sortedUsers, 500, 1000);
console.log(si) // 0
// But I can use the find index method again with the sorted object to get that index
console.log( _.findIndex(users, sortedUsers[si]) ); // 3
```

Although this seems to work it does stroke me as a little more complex than it needs to be. However it is still one way to address a problem when it comes to just using the find index method by itself. This is still an example that involves getting a single index value from an array, but it is just a way of doing something more than just getting the first element in the array that meets the given condition. Other solutions might involve not getting a single index value, but an array of index values, and sorting that array of index values by some kind of condition.

### 1.5 - lodash chain, reduce, sort by, reverse, map, and getting a sorted array of index values

So in some cases I might not want just a single index value, but an array of index values, and I might want this array of index values to be sorted. There are a number of options that come to mind with this one, but once again I would want to use the chain method combined with a few lodash methods, once again with such methods as sort by and reverse, but now also the [reduce method](/2018/07/25/lodash_reduce/) on top of this. The reduce method is often used to create a primitive value from a collection, but it can also be used to create a reduced array, like that of a filter method which would be another option. Another not worthy method that I am using in this example that I am using in this example is a the [lodash map method](/2018/02/02/lodash_map) that I am using to create the final array of index values that is sorted.

```js
const _ = require('lodash');

// get index by points range
const getIndexValuesByPoints = (users, pointsMin, pointsMax) => {
    return _.chain(users)
    .reduce((acc, obj, index) => {
        if(obj.points >= pointsMin && obj.points <= pointsMax){
            acc.push({index: index, points: obj.points});
        }
        return acc;
    }, [])
    .sortBy((obj)=>{
        return obj.points
    })
    .reverse()
    .map((obj)=>{
        return obj.index;
    })
    .value();
};
// demo
let users = [
    { name: 'Jerry', points: 300},
    { name: 'John', points: 550},
    { name: 'Mark', points: 35},
    { name: 'Bill', points: 935}
];
console.log( getIndexValuesByPoints(users, 500, 1000) ); // [ 3, 1 ]
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

Not everything should be in core javaScript by itself from the ground up as doing so can often prove to be very time consuming. It's nice that we now have a lot of methods like \_.findIndex in the core of javaScript itself now, but there is still the question of older browsers, and also if you do take the time to dive deep into lodash, you might come to find that many of the methods do add a certain something more, or work in a slightly different way.

If you enjoyed reading this post you might want to check out my [main post on lodash](/2019/02/15/lodash/), or one of my [many other posts on lodash](/categories/lodash/). Although there are a lot of nice things to say about using lodash, there is also the other side of the coin when it comes to this utility library. With that said there is also reading up more on just using vanilla javaScript by itself. When it comes to this I have wrote a number of posts on various [array prototype methods](/2018/12/10/js-array/) of course, including the [array find method](/2021/07/19/js-array-find), and even the [array find index method](/2021/07/21/js-array-find-index/) over the years.

There is also a whole lot to write about when it comes to getting index values in general when it comes to objects in general, as well as with [strings in javaScript](/2019/01/25/js-javascript-string/) when it comes to primitive values. With strings sooner or later one will want to lean at [least a little about regular expressions](/2019/03/20/js-regex/) at some point. Also there is using string prototype [methods like replace](/2019/04/08/js-string-replace/), and [match](/2019/04/06/js-string-match/) as a way to go about getting index values in strings. Also with the regular expression class there is an [exec method](/2020/07/08/js-regex-exec/) of that class that proves to be useful when it comes to getting more than one index value in a string.


