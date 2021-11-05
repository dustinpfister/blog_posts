---
title: Webworker in client side javaScript
date: 2021-11-05 07:53:00
tags: [js]
layout: post
categories: js
id: 936
updated: 2021-11-05 08:48:39
version: 1.2
---

When it comes to [client side javaScript a WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) can be used to start a whole other Event loop in which to run some javaScript. In other words a web worker can be used to run background tasks that will not end up delaying the main execution thread of a page that is often used for rendering. So then a web worker can be used to take some work that would otherwise bog down the main thread of a page into its own independent thread, which will then free up the main thread allowing for smoother performance for what is begin done in the main thread. So then when it comes to using web workers the ideal situation might be to just use the main thread for DOM manipulation, canvas element drawing context calls and the like, and update the main model of a project by way of web workers.

<!-- more -->
