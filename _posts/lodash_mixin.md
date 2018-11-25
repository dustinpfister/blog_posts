---
title: The lodash _.mixin method
date: 2018-01-31 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 336
updated: 2018-11-25 18:27:49
version: 1.1
---

The [lodash](https://lodash.com/) [\_.mixin method](https://lodash.com/docs/4.17.4#mixin) can be used to extend lodash, or another object with a source object of methods.

<!-- more -->

## using \_.mixin to extend lodash

One of the features of \_.mixin is that it can be used to extend lodash if just a source object is given.

```js
_.mixin({
 
    foo: function () {
 
        return 'bar';
 
    }
 
});
 
console.log(_.foo() ); // bar
```
