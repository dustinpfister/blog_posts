---
title: lodash has method
date: 2019-05-15 14:04:00
tags: [lodash]
layout: post
categories: lodash
id: 448
updated: 2020-06-21 11:02:18
version: 1.5
---

This will be a quick post on the [lodash has](https://lodash.com/docs/4.17.11#has) method, a simple object method that can be used to check if an object has a certain path in it or not. That is you pass a string that contains property names separated with dots to a certain value that is in the object or it is not. In the event that it is there then the lodash has returns true otherwise it will return false.

This is one of many methods in lodash that accept a string form of a object path to a value. Another such method of note in lodash would be the [\_.get](/2018/09/24/lodash_get/), and [\_.set](/2018/12/04/lodash_set/) methods. This is not one of the most compelling methods in lodash, in fact when it comes down to it there are only really a handful that I find myself still  using in projects.

<!-- more -->

## 1 - lodash has in a nut shell

So the lodash has method can be used by just passing an object followed by a string that represents the path of a property of an object. In the event that the property is there it will return true, else it will not.

```js
let obj = {
    foo: {
        bar: {
            x: 40,
            y: 2
        }
    },
    dust: {
        in: {
            the: {
                wind: 'that is all we are'
            }
        }
    }
};
 
console.log( _.has(obj, 'dust.in.the.wind') ); // true
console.log( _.has(obj, 'dust.in.x') ); // false
console.log( _.has(obj, 'foo.bar.x') ); // true
```

So this object method can be used as a way to feature test if a path exist in an object and if not can be used with another method like the lodash set method to set the path. If you are more interested in what lodash has to offer in general you might want to check out my main post on [lodash](/2019/02/15/lodash/).