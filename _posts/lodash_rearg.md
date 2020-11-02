---
title: The lodash _.rearg method and rearranging function arguments
date: 2020-11-02 14:55:00
tags: [lodash]
layout: post
categories: lodash
id: 734
updated: 2020-11-02 15:34:03
version: 1.7
---

I have got into the habit of starting each month with one new [lodash](https://lodash.com/) post while the library is still on my radar. I can not say that I find myself actually using lodash that much and more, when I do it is often just one or two methods that I bother with in the framework.

Todays lodash post is on the [\_.rearg method](https://lodash.com/docs/4.17.15#rearg) that can be used to create a new function with a function only rearranging the arguments for the function. I can not say that this is the most compelling function in lodash to support a case to install the full library these days. This kind of situation does not happen often for me, and it is really not that hard to create my own abstraction for this with just plain old vanilla javaScript itself when  I need to do something like this in a project. So with that said this post will not just be on the lodash \_.rearg method but also some vanilla javaScript alternatives that do more or less the same thing.

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

## 2 - Math.atan2 use case example of lodash \_.rearg

So you might be scratching your head thinking to yourself why would I ever need to use a function like this when it comes to doing something real? Well one method that comes to mind is the Math.atan2 method. This method is something that I do find myself using fro time to time when it comes to working out some logic for a game project of one kind or another. One funny thing about the method is that it accepts the y value as the first argument rather than x. I have to admit that bothers be a little because I am of the mind set that the x value is what should come first when it comes to anything that has to do with points in a 2d grid. So in this case the lodash rearg method can be sued to quickly create a new atan2 method that is just a wrapper for the native method, but with the arguments in the oder that I think they should be.

```js
let atan2 = _.rearg(Math.atan2, [1, 0]);
 
let x = 45,
y = 20;
 
console.log( Math.atan2(y, x) ); // 0.41822432957922906
console.log( atan2(x,y) );  // 0.41822432957922906
```

So maybe there are a few instances here in there when I am in a situation in which I would want to change the order of arguments of a function. However is it really all that hrd to just create an abstraction like this without lodash? Of course not. With that said I think I will spend the rest of the post writing about a few quick examples of doing this sort of thing without the need of lodash.

## 3 - Vjs example of a atan2 wrapper of Math.atan2 without lodash

So yeah why not just have a function that will call the function and return the result, with the arguments rearrange the way that I want it?

```js
let atan2 = (x, y) => {
    return Math.atan2(y, x);
}
 
let x = 45,
y = 20;
 
console.log(Math.atan2(y, x)); // 0.41822432957922906
console.log(atan2(x, y)); // 0.41822432957922906

```

Is that really such a big deal? Also I think that I can say that it makes things a little more readable also on top of that. Take a moment to compare this vanilla javaScript example to the lodash one. Which would you say is easier to follow? I mean if you are someone who is not on top of what all these little lodash functions do, and you come across this function that takes a function as an argument along with an array of numbers, you would have to take a moment to look into reading a post like this to know what the method does. However if you come across a vanilla javaScript example that does the same thing, more often then not, you would be able to just read the code, know what it does, and move on with your life.