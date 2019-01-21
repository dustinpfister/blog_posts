---
title: JavaScript alert and other options for logging
date: 2019-01-07 18:59:00
tags: [js]
layout: post
categories: js
id: 357
updated: 2019-01-21 12:36:52
version: 1.7
---

When starting with javaScript alert is something that often comes up in many examples found on the Internet as a way to log something. It works okay for that when it comes to thous kinds of simple projects where a developer is just starting to learn javaScript for the first time, but there are other options for logging as well with client side javaScript such as console.log, which also works just find in a node.js environment. In this post I will be giving a quick overview of the [window.alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) method in client side javaScript as well as a few other alternatives for logging things to know it they are working as expected or not

<!-- more -->

## 1 - javaScript alert for logging

In many basic javaScript examples that aim to help people that are new to javaScript get started the window.alert method is often used as a way to log the result of something. A Simple example of this might look something like this.

```js
<html>
    <head>
        <title>javascript alert</title>
    </head>
    <body>
        <script>
 
// alert can be used as a way to log
// something to make sure it is working
// as exspected
var n = 40 + 2;
alert(n >= 40); // true
 
        </script>
    </body>
</html>
```

The alert method is a property of the window object so there is no real difference between window.alert, this.alert, and just plain alert by itself. So that is just about it when it comes to using alert, just pass in what you want to log and it should alert out to you. However with some javaScript examples it can get annoying to have a whole much of alerts happen one after another so lets looks as some quick alternatives to alert.

## 1.1 - javaScript alert and production code

So when working out something and using alert as a way to confirm that things are working as expected is one thing. However when making an actual professional project it is not great to have alerts popping up in the face of people visiting the project. So although alert might be used as a way to log things, it might not be the best option for doing so. There are