---
title: lodash object methods and beyond
date: 2019-02-13 13:08:00
tags: [lodash]
layout: post
categories: lodash
id: 379
updated: 2019-02-13 15:27:06
version: 1.4
---

[Lodash Object methods](https://lodash.com/docs/4.17.11#assign) start with [assign](/2018/09/21/lodash_assign/), and end with valuesIn but that is of course only the lodash methods that work with just about any object in javaScript. There are also the lodash array methods, and in JavaScript an [array is just a certain kind of object](/2017/05/12/js-arrays-are-objects/). There are also collection methods that designed to work with plain old objects by themselves, array like objects, and objects that are javaScipt arrays. In this post I hope to give a general overview of lodash object methods, and also of objects in general in javaScript.

<!-- more -->

## 1 - lodash object methods

In lodash there are a number of methods that are considered object methods. These kinds of methods are intended to be used with just about any kind of object in javaScript, not just a certain kind of object that was created with a specific constructor function likes Arrays. There are a few methods that bring about functionality that still as of this writing is not part of core javaScript at all, however many others are now part of the javaScript spec. 

### 1.2 - lodash array object methods

In lodash there are a number of methods that are intended to be used with arrays. Arrays are a kind of object in javaScript but they are a special kind of object that is formated in a way in which each key is a numbered index, and there is a length property that reflects the number of elements in the array. In addition Arrays are created using the Array constructor or array literal syntax and as such they inherit a bunch of prototype methods, some of which a similar if not identical to many lodash array methods.

### 1.1 - lodash collection object methods

In lodash there are a number of methods that are considered collection methods. These methods will work with javaScript objects that are created with the Array constructor. However they will also work just fine with objects that are not created with the array constructor as well, even if they are not array like. Collection methods can be though of as lodash object methods as well, but they are intended to be used with objects that have a collection like nature.
