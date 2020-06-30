---
title: The lodash _.countBy method
date: 2018-06-04 14:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 201
updated: 2020-06-30 18:34:52
version: 1.7
---

Every now and then I like to play around with one of the methods in [lodash](https://lodash.com/) such as the [\_.countBy](https://lodash.com/docs/4.17.10#countBy) collection method that I will be writing about in this post. The lodash countby method can be used to create an object where each key is the result that is return by a metjod that is called for each element in a collection, and each value is the count for that value that is returned. I do this just because lodash is still very popular, and it makes sense to play around with it now and then, and maybe compare what there is to work with to what is available in plain old core javaScript by itself. 

When I do so sometimes it looks like native methods are just being wrapped by lodash, other times a lodash method does seem to bring something new to the table. In other cases there is no native javaScript counterpart, so then it is just a question if the method is something that I will ever use in a project, and how much time it saves me from writing my own solution. I am not sure if the lodash count by method is one such method that I would find myself using often, or at all, but this is the lodash method for today so lets look at a few examples.

<!-- more -->

The \_.countBy method returns a new object with keys, and values generated from a given method.

## 1 - Basic count by Example

For a basic demo of \_.countBy I just made an array of objects, and used countBy to make an object of true, and false properties that is a count of how many objects meet the condition that I defined in the method that I gave it, along with the array of objects.

```js
var arr = [
    {
        username: 'john',
        score: 37
    }, {
        username: 'jake',
        score: 50
 
    }, {
        username: 'bill',
        score: 20
    }
];
 
var obj = _.countBy(arr, function (rec) {
 
        return rec.score >= 50;
 
    });
 
console.log(obj.false); // 2
console.log(obj.true); // 1
```

So it seems that this can be a useful method to be aware of to quickly find out a count of how many elements in an array meet a given set of conditions, and how many do not. I am not aware of anything in corejs that does this, so thins may be one of the methods in lodash to which there is not a direct native equivalent.

## 2 - Quickly get a count of word length for each word in an array

The '\_.property' iteratee shorthand can be used to get an object of keys where each key is a word length, and each value is how many times a word of that length appears in the collection.

```js
console.log(_.countBy(['foo', 'man', 'chew','happy','bar'], 'length'));
 // {3: 3, 4: 1, 5: 1}
```

The following will give the same result
```js
console.log(_.countBy(['foo', 'man', 'chew','happy','bar'], function(str){
    return str.length;
}));
 // {3: 3, 4: 1, 5: 1}
```

## 3 - Conclusion

This \_.countBy method might come in handy for some situations in which I quickly want to make an object that has keys, and values that are the result of some kind of condition. This makes \_.countBy one of the methods in lodash to be aware of to make quick work of any kind of situation where it would come in handy.