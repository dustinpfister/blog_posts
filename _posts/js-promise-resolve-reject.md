---
title: Promise resolve and reject methods for just creating a resolve or rejected promise
date: 2019-09-18 11:49:00
tags: [js]
layout: post
categories: js
id: 536
updated: 2019-09-18 11:54:36
version: 1.0
---

When working with promises in javaScript there will come a time now and then where I just want to return a resolve promise without having to bother with the promise constructor to do so. Well luckily even with native javaScript promises there is the Promise.resolve, and Promise.reject methods that can do just that. These methods will come in handy often when creating a long chain of promises and then method calls where I just want to return a resolve or rejected promise inside the body of a method that I am using with the then promise prototype method. It is basically a more appropriate alternative to using the promise constructor to just call resolve inside the body of a function that is given to the promise constructor, which will also work but why bother when you have Promise.resolve.

<!-- more -->

