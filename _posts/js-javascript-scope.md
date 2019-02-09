---
title: Variable scope in javaScript
date: 2019-01-29 18:58:00
tags: [js]
layout: post
categories: js
id: 367
updated: 2019-02-09 11:22:16
version: 1.1
---

The [variable scope of a variable in javaScipt](https://developer.mozilla.org/en-US/docs/Glossary/Scope) is the area in code where the variable is defined. If a variable is inside the scope of a section of code it is of use there, else it can not be accessed. Traditionally javaScipt had function level scope only with the var keyword, but these days there is block level scope as well via let and const. In this post I will be going over some of the ins and outs with javaScript variable scope both with the way it was, and the way it is now.
<!-- more -->

## javaScript scope with var