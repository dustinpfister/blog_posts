---
title: Variable scope in javaScript
date: 2019-01-29 18:58:00
tags: [js]
layout: post
categories: js
id: 367
updated: 2019-02-09 11:48:05
version: 1.2
---

The [variable scope of a variable in javaScipt](https://developer.mozilla.org/en-US/docs/Glossary/Scope) is the area in code where the variable is defined. If a variable is inside the scope of a section of code it is of use there, else it can not be accessed. Traditionally javaScipt had function level scope only with the var keyword, but these days there is block level scope as well via let and const. In this post I will be going over some of the ins and outs with javaScript variable scope both with the way it was, and the way it is now.
<!-- more -->

## 1 - javaScript scope with var

The var keyword is what was traditionally the only keyword that was available for declaring a variable in javaScipt. When using the var keyword to declare variables what will result is function level variable scope. When this means is that once a variable is declared it will be available everywhere within the code given that the code is at the same function scope level. In this section I will be covering this in greater detail with some examples to help clarify this.