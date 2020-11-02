---
title: The lodash _.rearg method and rearranging function arguments
date: 2020-11-02 14:55:00
tags: [lodash]
layout: post
categories: lodash
id: 734
updated: 2020-11-02 15:10:01
version: 1.3
---

I have got into the habit of starting each month with one new [lodash](https://lodash.com/) post while the library is still on my radar. I can not say that I find myself actually using lodash that much and more, when I do it is often just one or two methods that I bother with in the framework.

Todays lodash post is on the [\_.rearg method](https://lodash.com/docs/4.17.15#rearg) that can be used to create a new function with a function only rearranging the arguments for the function. I can not say that this is the most compelling function in lodash to support a case to install the full libray these days. This kind of situation does not happen often for me, and it is really not that hard to create my own abstraction for this with just plain old vanilla javaScript itself when  I need to do something like this in a project. So with that said this post will not just be on the lodash \_.rearg method but also some vanilla javaScript alternatives that do more or less the same thing.

<!-- more -->

## 1 - basic lodash \_.rearg example

So the basic idea of this method is that I take a function that has a few arguments, and then I pass that function as the first argument to the lodash \_.rearg method. After that the second argument that is passed is an array of index values for the arguments that can eb used to change the order of the arguments for a resulting function that will be returned.

So in other words if i have a function called func that takes three arguments, and I pass that as the first argument, and the array [0,1,2] the resulting function that is returned will call the function func in the same order, I can then change the index values of the array to change the order in which they are called.

```js
let func = (a, b, c) => {
    return [a, b, c];
};
 
let re = _.rearg(func, [2, 0, 1]);
 
console.log(re(1, 2, 3));
```