---
title: lodash object methods and beyond
date: 2019-02-13 13:08:00
tags: [lodash]
layout: post
categories: lodash
id: 379
updated: 2019-02-13 13:32:48
version: 1.2
---

[Lodash Object methods](https://lodash.com/docs/4.17.11#assign) start with [assign](/2018/09/21/lodash_assign/), and end with valuesIn but that is of course only the lodash methods that work with just about any object in javaScript. There are also the lodash array methods, and in JavaScript an [array is just a certain kind of object](/2017/05/12/js-arrays-are-objects/). There are also collection methods that designed to work with plain old objects by themselves, array like objects, and objects that are javaScipt arrays. In this post I hope to give a general overview of lodash object methods, and also of objects in general in javaScript.

<!-- more -->

## 1 - lodash object methods

In lodash there are a number of methods that are considered object methods. These kinds of methods are intended to be used with just about any kind of object in javaScript, not just a certain kind of object that was created with a specific constructor function likes Arrays. There are a few methods that bring about functionality that still as of this writing is not part of core javaScript at all, however many others are now part of the javaScript spec. So lets take a look at some lodash object methods and maybe in the process learn a thing or two about objects in general with javaScript as well.