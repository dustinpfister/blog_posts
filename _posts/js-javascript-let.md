---
title: Javascript let keyword for declaring block scoped variables
date: 2019-02-09 08:34:00
tags: [js]
layout: post
categories: js
id: 374
updated: 2019-02-09 08:41:04
version: 1.0
---

When it comes to writing modern javaScript code the let keyword is available for declaring block, rather than function level variables scoped variables. When it comes to a node.js environment where I have control over the version of node.js is used, and can use a modern version that supports let there are not any concerns when it comes to the question of code breaking on older platforms. That issue is of greater concern when it comes to front end development where there is less control over the environment in which the javaScript code runs when thinking about older browsers. Still as time goes by this will become less of an issue, and block level scope for me is a welcome addition to javaScript, so in this post I will be writing about some concerns when it comes to the use of let in a javaScript project.

<!-- more -->

