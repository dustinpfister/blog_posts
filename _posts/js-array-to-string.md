---
title: js array to string and converting an array to a string in general
date: 2021-07-22 10:19:00
tags: [js]
layout: post
categories: js
id: 916
updated: 2021-07-22 10:24:09
version: 1.0
---

I have wrote a post on the subject of the to string method of an object in general before, however in todays post I think I will take a moment to write about this subject when it comes to arrays alone. The to string method of an array will work okay when it comes to an array of primitives, however it will often fall short of expectations when it comes to an array of objects. When it comes to converting a complex array of objects into a string format it is often called for to create a custom helper function, or class prototype method to do so. It is also possible to create a custom to string method for an array, and when making a custom class that makes use of an array it is general a good idea to have a to string method as part of the prototype object.

<!-- more -->

