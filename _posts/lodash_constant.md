---
title: lodash constant and functions that return values
date: 2020-10-01 13:04:00
tags: [lodash]
layout: post
categories: lodash
id: 713
updated: 2020-10-01 13:17:12
version: 1.2
---

The [lodash constant](https://lodash.com/docs/4.17.15#constant) method is a method that will create a function that will return a given static constant value each time it is called. on the surface this might seem pointless, but there are some situations in which I might actually want a method like this. Say for example I have a function that expects a function as one of its arguments, I can not just pass a static value to it, so instead I would need to pass a function that will return that static value.

There are a number of built in methods that will return a static value each time it is called to begin with in lodash, but the lodash constant method is the built in way to create my one such methods. It is also true that it is not so hard to just do the same things without the use of lodash, so I will be looking at some plain old vanilla javaScirpt alternatives to using the lodash constant method also here.

<!-- more -->

## 1 - lodash constant basic example

So the basic idea here is that I call the lodash constant method and a new function will be returned, when doing so I pass the lodash constant method a static value that I want the resulting function to return each time it is called. So I can call the lodash constant method and pass a true boolean value to it as the first argument. The result that is returned by the lodash constant method is then a new function that will return true each time it is called.

```
let returnTrue = _.constant(true);
console.log( returnTrue() ); // true
```