---
title: The lodash is array like method, and array like objects in general
date: 2020-08-01 16:56:00
tags: [lodash]
layout: post
categories: lodash
id: 690
updated: 2020-08-01 17:02:26
version: 1.0
---

In javaScript it is possible to have objects that look a lot like arrays, but they are not arrays. That is an object with numbers rather than named key names, and a length property that is the highest index value of this set of number key names. Such objects are often regarded as array like objects, and although they are not arrays, than can often still be treated as array when it comes to just getting around the few subtle issues that might creep up with them.

So With all of that said in this post on lodash I will be going over the lodash \_.isarray like method than can be used as one way to know if you are working with an array, or at least an array like object. I will also be going over how to go about finding out if you are dealing with one of these kinds of object when it comes to just working with native javaScript by itself.

<!-- more -->
