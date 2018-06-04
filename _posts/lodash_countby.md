---
title: The lodash _.countBy method
date: 2018-06-04 14:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 201
updated: 2018-06-04 14:41:03
version: 1.1
---

Evey now and then I like to play around with one of the methods in [lodash](https://lodash.com/) such as the [\_.countBy](https://lodash.com/docs/4.17.10#countBy) collection method that I will be writing about in this post. I do this just because lodash is still very popular, and it makes sense to play around with it now and then, and maybe compare where is there with what there is to work with in core javaScript itself.

<!-- more -->


## Basic count by Example

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