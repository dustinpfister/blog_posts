---
title: invoke them all with lodash invokeMap or just plain old javaScript
date: 2020-05-01 15:43:00
tags: [lodash]
layout: post
categories: lodash
id: 654
updated: 2020-05-01 15:47:10
version: 1.0
---

So you have a collection in javaScript, and by collection I mean an array or an object in general that is a collection of key value pairs. You want to invoke a method in the collections prototype, or any method in general for all elements in this collection. Well in lodash there is the invokeMap method that can be used to invoke a method at a certain path for all elements in a collection. However in modern javaScript there are also plenty of tools to grab at to begin with that a javaScript developer should be ware of that can also be used for this kind of task. So lets take an look at some code examples of calling a method for all elements in a collection.

<!-- more -->
