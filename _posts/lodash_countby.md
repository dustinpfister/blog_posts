---
title: The lodash _.countBy method
date: 2018-06-04 14:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 201
updated: 2021-10-05 12:13:43
version: 1.34
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

Now for a quick example of using the lodash count by method to create a score delta value. This will not be a full working game example mind you, just a little code that has to do with adding up what a score should be for an array of dead enemy units. So with that said say I have an object that defines stats for all the unit types in a game. When it comes to having an object pool of enemy units each of those objects should have a type property that can be used to reference this units object. So then the count by lodash method could be used as a way to get a count for each of the units in a dead unit collection, and then it would just be a matter of multiplying a points worth value for each count to add up a delta to add to the score value.

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

In this example I am using the [array for each method](/2019/02/16/js-javascript-foreach/) to loop over a source array, and use each element in the source to create and step keys for a count object. This of course will only work for arrays in general though, and I also am writing the expression that will create the key in the for each method also. So if I want to create a little javaScript that will be a true count by method I will want to do a little bit more than just this.

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

In this example I am making a count by method that will work with arrays and objects in general by making use of the [object keys](/2018/12/15/js-object-keys/) static method. This Object keys method will create and return an array of public key names for the object that I give it. I can then loop over the array of key names to have a key name as well as a value for each element in the object collection, as this should work fine for both arrays and objects in general. That is that in the event that I pass an array to the object keys method that will give me an array of numbered keys while other objects will given me whatever the key names are.

So then when looping over the array of pubic key names for a source object, I can call a given function and pass the value, key, and the object itself. The return value of the call of this given function can then be used as a key name for a count object created in the body of the count by method. So then I can use the returned key name to test if the value for the count object is undefined. In the event that the key is undefined I can create the key and set the value to 1, else step what it is that should be a number by one.

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

## 4 - The key by and group by lodash methods

On top of the count by lodash method there is also a [key by](/2018/10/24/lodash_keyby/) and [group by](/2018/08/02/lodash_groupby/) methods in lodash also. In this section the source code examples will be about these other lodash methods, and as such what they share in common with the lodash count by method. Also of course the examples should also show how the key by and group by methods differ from the count by method.

### 4.1 - lodash key by

The key by method works more or less the same way as the count by method in the sense that the return value of the function given to the method will be the key value for the new object that is returned. However this time it is not abut racking up a count but just assigning a single value to a key in the object. When dealing with a collection of object like the one covered in the basic section of the post this might not result in a desired result.

```js
let arr = [
    { username: 'john', score: 37},
    { username: 'jake', score: 67},
    { username: 'bill', score: 20}
];

let func = (rec) => {
    return rec.score >= 65 ? 'pass' : 'fail';
};

let keyed = _.keyBy(arr, func);
console.log(keyed);
/*
{ fail: { username: 'bill', score: 20 },
  pass: { username: 'jake', score: 67 } }
*/
```

The lodash keyby method might work okay when it comes to recreating what the public keys are for an object, but it is not a good choice for getting a count of something, or creating groups. However there is a method in lodash that might prove to be a more versatile choice from count by called the lodash group by method.

### 4.2 - lodash group by method

The lodash count by method will create an return a new object where head key is a return value of a given function, and the value will be a primitive that is the count of times that key value has happened. However if I want to have an array of values for which that has happened rather than a count there is the group by method.

```js
let _ = require('lodash');
 
let arr = [
    { username: 'john', score: 37},
    { username: 'jake', score: 67},
    { username: 'bill', score: 20}
];
 
let func = (rec) => {
    return rec.score >= 65 ? 'pass' : 'fail';
};
 
let keyed = _.groupBy(arr, func);
console.log(keyed);
/*
{ fail: [{ username: 'john', score: 37},{ username: 'bill', score: 20 }],
  pass: [{ username: 'jake', score: 67 }] }
*/
```

### 4.3 - Key by, group by and count by

So now for a quick recap of all the choices when it comes to key by, group by, and count by.

```js
let arr = [
    { username: 'john', score: 37},
    { username: 'jake', score: 67},
    { username: 'bill', score: 20}
];
 
let func = (rec) => {
    return rec.score >= 65 ? 'pass' : 'fail';
};
 
console.log( _.keyBy(arr, func) );
console.log( _.groupBy(arr, func) );
console.log( _.countBy(arr, func) );
```

So then there is what is in common where each of the methods create an new object with keys that are return values of a given function. The difference between them has to do with what the values for these keys should be. The key by method will just simply do that, and the value will be whatever the last value was when going over the collection. The group by object will do the same only it will create arrays of values for these key values of the object, and the count by method will give a number primitive for each key.

## 5 - Conclusion

This \_.countBy method might come in handy for some situations in which I quickly want to make an object that has keys, and values that are the result of some kind of condition. This makes \_.countBy one of the methods in lodash to be aware of to make quick work of any kind of situation where it would come in handy.