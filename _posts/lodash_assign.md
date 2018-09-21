---
title: The \_.assign Object method in lodash, and alternatives
date: 2018-09-21 19:51:00
tags: [js,lodash]
layout: post
categories: lodash
id: 285
updated: 2018-09-21 19:51:46
version: 1.0
---

Looking over my content so far I am surprised that I have not yet wrote a post on \_.assign in lodash, as well as the native alternative Object.assign. The \_.assign method is one of many ways to go about combining a bunch of objects into a single object. The process of doing so is a little involved because there is a lot to know about objects and what happens when there are combined together in javaScript. For example objects are copied by reference rather than value, which can result in unexpected behavior if you are new to javaScript and are not aware of that nature. There is also the question of the prototype, and how that should be handled as well. So in todays post I will be covering some use case scenarios of \_.assign, and alternatives such as \_.merge, and the native Object.assign method.

<!-- more -->
