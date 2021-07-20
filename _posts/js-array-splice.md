---
title: The array splice method for removing an injecting elements in an array
date: 2021-07-20 12:33:00
tags: [js]
layout: post
categories: js
id: 914
updated: 2021-07-20 12:38:35
version: 1.1
---

When it comes to writing about javaScript by itself I have not got around o writing a post on the array splice method yet, which is something that I should have got out of the way a long time ago. The array splice method is often confused with the array slice method, that is some what similar, but they work in very different ways. The array slice method will return a new array from a source array from a given starting and ending index value without mutating the source array from which it is called. The splice method will remove one or more elements from a starting index, and it can also be used to inject elements at that index location while I am at it. Unlike the slice method the splice method will mutate the array in place, but one thing that is similar might be the return value of the splice method as that will be a new array of the elements that are in a given index range.

<!-- more -->
