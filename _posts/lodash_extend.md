---
title: The lodash _.extend method for combining objects, and alternatives
date: 2018-10-01 11:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 294
updated: 2018-10-01 15:08:49
version: 1.4
---

When working with many objects there some times comes a need to combine them all together, when doing so things can get a little confusing. There are what is often referred to as the objects own properties, then there are inherited properties. In addition there is also ways of making hidden properties, and also the nature of copying by reference rather than value with objects in javaScript as well. In this post I will be writing about the [lodash](https://lodash.com/) object method known as [\_.extend](https://lodash.com/docs/4.17.10#extend), and how it compares to other methods in lodash, and javaScript by itself. Hopefully this post will help eliminate some confusion that you might have with combining objects in javaScript, or reinforce what you all ready know, so lets get to it.

<!-- more -->

## 1 - what to know

This is a post on the \_.extend object method in lodash, and other related topics. In order to better understand \_.extend it is a good idea to have a deep understanding of how objects work in javaScript. In this section I will briefly cover some of these topics, but will not be going into them in detail. I also assume that you have at least some background with lodash, and javaScript in general.

### 1.1 - Referencing vs copying of objects

The \_.extend lodash method works by assigning the own properties, and prototype properties of one or more objects to an object. Assigning is another term for referencing, rather than copying, or cloning. So when _.extend is used any change that might occur to nested objects in the objects that are being referenced, will also occur in the object that is extended. If this is a problem there are many other methods in lodash, such as \_.merge that will deep copy the given objects, rather than just simply referencing them. I will cover this is greater detail in a latter section in this post.

### 1.2 - Own vs inherited properties.

When a javaScript developer refers to an objects own properties, they typically refer to the properties of an object that are not inherited from the objects prototype object that contains properties that are shared across multiple instances of a class of object. So therefor an objects own properties are properties that set the object apart from others that are made from the same constructor method, or that share the same prototype object. The \_.extend method combines both the own properties, as well as anything that may be in the protoype object. In some cases this might be desired, however in other cases it is not, and a method like \_.assign would be a better choice.
