---
title: The _.create method in lodash, and native Object.create
date: 2018-09-27 18:41:00
tags: [js,lodash]
layout: post
categories: lodash
id: 290
updated: 2018-09-27 17:53:51
version: 1.2
---

So in javaScript the Object.create method or [\_.create](https://lodash.com/docs/4.17.10#create) in [lodash](https://lodash.com/) might come up now and then in many code examples. This is a method that can be used to create a new object with a given object that will function as the new objects prototype object. If you are still new to javaScript the prototype is something that you should become familial with at some point sooner or later, as it is a major part of javaScript development. In this post I will be giving some use case examples, and hopefully give at least a basic idea of what the create object method is all about.

<!-- more -->

## 1 - What to know about \_.create

This is a post on the lodash method \_.create, and it's native counter part Object.create that work the same way. This makes the \_.create method in lodash one of many methods that make javaScript developers scratch there heads wondering why they are still bothering with lodash. Of course not all methods in lodash are baked into core javaScipt itself, and some that are do sometimes bring a bit more to the table, but \_.create is not one of them. So because I do not feel like writing one post for \_.create, and another for Object.create I will be sort of blending things together here, and just be writing mostly about the nature of the method itself, regardless if it is native or not.