---
title: The lodash _.concat method
date: 2018-08-02 18:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 244
updated: 2018-08-02 18:14:25
version: 1.0
---

In this [lodash](https://lodash.com/) post I will be writing about [\_.concat](https://lodash.com/docs/4.17.10#concat), and of course the corresponding vanilla js method Array.concat. For the most part this looks like one of those methods in lodash where there is not much point to it as the Array.concat method has been around for a long time. Still it is there just for the hell of it, and looking into the lodash source code, it looks like the lodash devs are not just directly referencing the native method, as is the case with some of these methods.

<!-- more -->

Although this is a lodash post on \_.concat, this is also a kind of post of concatenating arrays in general. Also although there might not be much of a point using \_.concat by itself in light of the vanilla js Array.concat, diving deep into the source code \_.concat uses some internal methods that are shared with related methods like \_.flattenDeep.

1 - what to know

This is a post on the lodash method \_.concat that can be used to combine, or concatenate two or more arrays into one array. There is also the Array.concat method in javaScript itself that works the same way. I assume that you have some basic working knowledge of javaScript in general, and how to get started with using lodash in a project.