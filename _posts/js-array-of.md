---
title: JS Array of method for creating an array from arguments
date: 2020-06-10 13:34:00
tags: [js]
layout: post
categories: js
id: 665
updated: 2020-06-11 10:55:32
version: 1.1
---

So in late specs of javaScript there is a native [Array.of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) static method that can be used to create an array of elements from arguments that are passed when calling the array of method. 

It would seem that this method was introduced as a way to provide something that is messing when using the Array constructor directly. That is calling the main Array constructor method with the new keyword as a way to create a new instance of an array rather than using the bracket syntax. When doing so there is just one argument that is passed to the Array constructor if any that is used to set the starting length of the Array, not the value of the first element. This can cause some confusion with new developers that are and familiar with this. So the Array of method is now that are yet another way to create a new array by passing some arguments for the starting element values for the array.

I can not say that I use the Array of method often, as I prefer to use some of the older tired yet true ways of doing the same thing that is just a little more involved. But never the less this post will be on the JS array of meto9d and other ways of creating a new array with a set number of starting values.

<!-- more -->
