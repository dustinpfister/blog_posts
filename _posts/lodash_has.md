---
title: lodash has method
date: 2019-05-15 14:04:00
tags: [lodash]
layout: post
categories: lodash
id: 448
updated: 2019-05-15 14:21:14
version: 1.3
---

This will be a quick post on the [lodash has](https://lodash.com/docs/4.17.11#has) method, a simple object method that can be used to check if an object has a certain path to it or not. If you are more interested in what lodash has to offer in general you might want to check out my mian post on [lodash](/2019/02/15/lodash/) in general.

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

So this object method can be used as a way to feature test if a path exist in an object and if not can be used with another method like the [lodash set](/2018/12/04/lodash_set/) method to set the path.