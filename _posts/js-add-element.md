---
title: Add elements with javaScript
date: 2019-02-26 10:34:00
tags: [js]
layout: post
categories: js
id: 391
updated: 2019-02-26 10:53:50
version: 1.3
---

Adding elements in javaScript generally refers to creating and appending html elements to an html document, in core javaScript in general it may refer to creating and appending elements for an Array as well. I have written a [post on innerHTML](/2019/01/13/js-innerhtml/) not to long ago which is one typical way of doing so, however in this post I will be covering the subject in general. There are of course alternatives to innerHTML that involve the use of a collection of methods, such as [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement), and appendChild. Also there is some things to cover when it comes to html node lists as well, and how they are like arrays.

<!-- more -->

## 1 - Add Elements

To add an element in javaScript I first need to gain a reference to a hard coded element in the html to begin with. There are a number of ways to go about doing this such as with document.getElementById which shows up in a lot of javaScript examples, to properties such as document.body. Once I have a reference to an element I can then use a property like innerHTML or a collection of methods to create an add elements.