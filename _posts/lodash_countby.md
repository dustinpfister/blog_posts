---
title: The lodash _.countBy method
date: 2018-06-04 14:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 201
updated: 2021-10-05 11:16:30
version: 1.23
---

Every now and then I like to play around with one of the methods in [lodash](https://lodash.com/) such as the [\_.countBy](https://lodash.com/docs/4.17.10#countBy) collection method that I will be writing about in this post. The lodash countby method can be used to create an object where each key is the result that is return by a method that is called for each element in a collection. Each value is the count for that key value that is returned when calling the method used with count by for each collection element.

In other words the \_.countBy method returns a new object with keys, and values generated from a given method with a source collection object. The return value of the method given to the count by method can be any string value that will work well as a key name for an object property, and there will be a count for each key.

I do this just because lodash is still very popular, and it makes sense to play around with it now and then, and maybe compare what there is to work with to what is available in plain old core javaScript by itself. 

When I do so sometimes it looks like native methods are just being wrapped by lodash, other times a lodash method does seem to bring something new to the table. In other cases there is no native javaScript counterpart, so then it is just a question if the method is something that I will ever use in a project, and how much time it saves me from writing my own solution. I am not sure if the lodash count by method is one such method that I would find myself using often, or at all, but this is the lodash method for today so lets look at a few examples.

<!-- more -->

## 1 - Basic count by Examples and what to know

In this section I will be starting out with just a few basic examples of the lodash count by method. I will be trying to keep the examples in this section fairly simple, but this is still not a getting started type post with lodash or [javaScript in general](/2018/11/27/js-getting-started/). So I assume that you have at least some background with javaScript, and how to work with code examples in a client side javaScript or nodejs environment.

### 1.1 - Giving a function as the second argument

For a basic demo of \_.countBy I just made an array of objects, that contain some data for a collection of people. each object has a username and score property that contains a number value between 0 and 100. What I want to do is create an object that contains two keys pass and fail where pass is a count of objects of people who have a score above 65, and fail is the remaining count of objects. So for this I can use the lodash countBy method to make an object of pass, and fail properties that is a count of how many objects meet the condition that I defined in the method that I gave it, along with the array of objects.

```js
let arr = [{
        username: 'john',
        score: 37
    }, {
        username: 'jake',
        score: 67
    }, {
        username: 'bill',
        score: 20
    }
];

let obj = _.countBy(arr, (rec) => {
        return rec.score >= 65 ? 'pass': 'fail';
    });
console.log(obj);
// { fail: 2, pass: 1 }
```

So it seems that this can be a useful method to be aware of to quickly find out a count of how many elements in an array meet a given set of conditions, and how many do not. I am not aware of anything in corejs that does this, so this may be one of the methods in lodash to which there is not a direct native equivalent. However I will be getting into that more in the vanilla javaScript section later in this post.

### 1.2 - The property shorthand

One feature of the count by method is that a [lodash property method](/2018/01/31/lodash_property/) short hand can be used. The property method of lodash is one method in lodash that will return a function that can be passed to a function like that of the lodash count by method.

```js
let words = ['foo', 'man', 'chew', 'happy', 'bar'];
 
console.log( _.countBy(words, (el) => {
        return el.length;
    }) );
 
console.log( _.countBy(words, (el) => {
        return _.property('length')(el);
    }) );
 
console.log( _.countBy(words, _.property('length')) );
 
console.log( _.countBy(words, 'length') );
 
// all of these produce the same result
// { '3': 3, '4': 1, '5': 1 }
```

### 1.3 - The souce code examples in this post are on github

The source code examples in this post can be found in my [test lodash github repository](https://github.com/dustinpfister/test_lodash/tree/master/forpost/lodash_countby).

## 2 - Some use case examples

In this section I will now be going over a few quick use case examples, now that I have the basics of the method out of the way.

### 2.1 - Word counts

If I want to get a count for each and every word in a text source, rather than just over all word count, then the count by method could be used for this.

```js
let words = 'chew foo man foo chew foo foo'.split(' ');
let obj = _.countBy(words, (word) => {
        return word;
    });
console.log(obj);
//{ chew: 2, foo: 4, man: 1 }
```

### 2.2 - game score delta

Now for a quick example of using the lodash count by method to create a score delta value.

```js
let units = {
    slime: {
        worth: 1
    },
    bat: {
        worth: 5
    }
};
 
let deadUnits = [{
        type: 'bat'
    }, {
        type: 'bat'
    }, {
        type: 'slime'
    }
];
 
let typeCounts = _.countBy(deadUnits, (unit) => unit.type);
 
let scoreDelta = Object.keys(typeCounts).reduce((acc, key) => {
        return acc + typeCounts[key] * units[key].worth;
    }, 0);
 
console.log(scoreDelta); // 11
```

## 3 - vanilla javaScript alternatives to count by

There is not direct native counterpart for the lodash count by method unlike many other methods in lodash. However this is something that is still not all that hard to do with just a little native javaSccript. So in this section I will be going over a few source code examples that produce the same end result as the lodash count by method without using lodash.

### 3.1 - Array for each

In this example I am using the [array for each method](/2019/02/16/js-javascript-foreach/) to loop over a source array, and use each element in the source to create and step keys for a count object.

```js
let arr = [{
        username: 'john',
        score: 37
    }, {
        username: 'jake',
        score: 67
    }, {
        username: 'bill',
        score: 20
    }
];
 
// for each
var counts = {};
arr.forEach((el, i, arr) => {
    var key = el.score >= 65 ? 'pass' : 'fail';
    counts[key] = counts[key] === undefined ? 1 : counts[key] += 1;
});
console.log(counts);
```

### 3.2 - A vanilla javaScript count by method using Object.keys

In this example I am making a count by method that will work with arrays and objects in general by making use of the [object keys](/2018/12/15/js-object-keys/) static method.

```js
var countBy = (obj, func) => {
    var counts = {};
    var arr = Object.keys(obj);
    arr.forEach((sourceKey, i, arr) => {
        var el = obj[sourceKey];
        var key = func.call(obj, el, sourceKey, obj);
        counts[key] = counts[key] === undefined ? 1 : counts[key] += 1;
    });
    return counts;
};
 
let arr = [{
        username: 'john',
        score: 37
    }, {
        username: 'jake',
        score: 67
    }, {
        username: 'bill',
        score: 20
    }
];
 
console.log(countBy(arr, function (el) {
        return el.score >= 65 ? 'pass' : 'fail';
    }));
```

## 4 - Conclusion

This \_.countBy method might come in handy for some situations in which I quickly want to make an object that has keys, and values that are the result of some kind of condition. This makes \_.countBy one of the methods in lodash to be aware of to make quick work of any kind of situation where it would come in handy.