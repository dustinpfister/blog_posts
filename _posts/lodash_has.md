---
title: lodash has method
date: 2019-05-15 14:04:00
tags: [lodash]
layout: post
categories: lodash
id: 448
updated: 2019-05-15 14:17:17
version: 1.2
---

This will be a quick post on the [lodash has](https://lodash.com/docs/4.17.11#has) method, a simple object method that can be used to check if an object has a certain path to it or not. If you are more interested in what lodash has to offer in general you might want to check out my mian post on [lodash](/2019/02/15/lodash/) in general.

<!-- more -->

## 1 - lodash has in a nut shell

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