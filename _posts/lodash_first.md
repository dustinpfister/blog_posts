---
title: loash first method and related topics
date: 2019-06-18 16:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 481
updated: 2019-06-21 09:13:59
version: 1.2
---

The lodash first method is just a simple convenience method for getting the first element of an array. So then this is one of those methods in lodash that make me question the worth of lodash a little. The reason being that it is not such a big deal to gust simply get the first element of an array with javaScript by itself. Well anyway I thought I would write a short post on lodash first and some related topics, but it goes without say that this is not something that should end up eating up a great deal of my attention.

<!-- more -->

## 1 - lodash first example

So the lodash first method is an array method that can be used to just simple get the first element of an array at index zero. Just pass the array as the first argument when calling lodash first and the first element is returned.

```js
let arr = ['foo','bar', 'baz'];
 
// so yep it gets the first element of an array
console.log(_.first(arr) ); // 'foo'
 
// but do does this
console.log( arr[0] ); // 'foo'
```

However doing so is not so hard to understand when it comes to plain old javaScript itself, just get the zero index element by using the bracket syntax right? The only thing I can thing of that comes to mind in defense of this is that it does make it a little more clean when it comes to new javaScript developers, but using the word first. Aside from that, the lodash first method is not a method in lodash that helps support a string case to continue using it on top of native javaScript by itself.