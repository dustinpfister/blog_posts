---
title: js array copy methods both new and old
date: 2020-09-03 12:42:00
tags: [js]
layout: post
categories: js
id: 700
updated: 2020-09-03 12:49:40
version: 1.0
---

So now and then a javaScript developer might find themselves in a situation in which they will want to copy and array. If you are new to javaScript you might have just simply assigned an array from one variable to another variable and assumed that that would do the tick, as that is the case with numbers and strings after all. However that will of course not work with arrays, and objects in general actually in javaScript because just simply assigning an object to another variable will just create a new reference to the same array or object.

So to copy an array one of several tricks for doing so will need to be used to do so that will result in a while new array being created that will contain the same values. However talking about values, if the values themselves are nested objects then they do might needed to be coped also if a full copy of the state of the array is desired. So in this post I will be taking a look at a few ways to copy an array in javaScript with both old and new ways of doing so when it comes to what there is to work with in late javaScript specs.

<!-- more -->
