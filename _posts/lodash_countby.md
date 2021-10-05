---
title: The lodash _.countBy method
date: 2018-06-04 14:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 201
updated: 2021-10-05 10:05:50
version: 1.11
---

Every now and then I like to play around with one of the methods in [lodash](https://lodash.com/) such as the [\_.countBy](https://lodash.com/docs/4.17.10#countBy) collection method that I will be writing about in this post. The lodash countby method can be used to create an object where each key is the result that is return by a method that is called for each element in a collection. Each value is the count for that key value that is returned when calling the method used with count by for each collection element.

In other words the \_.countBy method returns a new object with keys, and values generated from a given method with a source collection object. The return value of the method given to the count by method can be any string value that will work well as a key name for an object property, and there will be a count for each key.

I do this just because lodash is still very popular, and it makes sense to play around with it now and then, and maybe compare what there is to work with to what is available in plain old core javaScript by itself. 

When I do so sometimes it looks like native methods are just being wrapped by lodash, other times a lodash method does seem to bring something new to the table. In other cases there is no native javaScript counterpart, so then it is just a question if the method is something that I will ever use in a project, and how much time it saves me from writing my own solution. I am not sure if the lodash count by method is one such method that I would find myself using often, or at all, but this is the lodash method for today so lets look at a few examples.

<!-- more -->

## 1 - Basic count by Examples and what to know

In this section I will be starting out with just a few basic examples of the lodash count by method. I will be trying to keep the examples in this section fairly simple, but this is still not a getting started type post with lodash or javaScript in general. So I assume that you have at least some background with javaScript, and how to work with code examples in a client side javaScript or nodejs environment.

### 1.1 - Giving a function as the second argument

For a basic demo of \_.countBy I just made an array of objects, and used countBy to make an object of true, and false properties that is a count of how many objects meet the condition that I defined in the method that I gave it, along with the array of objects.

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

So it seems that this can be a useful method to be aware of to quickly find out a count of how many elements in an array meet a given set of conditions, and how many do not. I am not aware of anything in corejs that does this, so thins may be one of the methods in lodash to which there is not a direct native equivalent.

### 1.2 - The property shorthand

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

## 2 - Some use case examples

### 2.1 - Word counts

```js
let words = 'chew foo man foo chew foo foo'.split(' ');
let obj = _.countBy(words, (word) => {
        return word;
    });
console.log(obj);
//{ chew: 2, foo: 4, man: 1 }
```

### 2.2 - game score delta

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

## 3 - 

### 3.1 - 

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