---
title: The Context Bridge class in electronjs
date: 2022-02-21 12:28:00
tags: [electronjs]
layout: post
categories: electronjs
id: 962
updated: 2022-02-21 12:31:43
version: 1.0
---

The context bridge class in electron.js is what I need to use in late versions of electron.js to create a shared API with my client side javaScript code in such a way that I only expose what is needed in the front end. There are alternatives to this such as disabling context isolation and enabling node integration when creating a browser window, but still there are good reasons why this is the default.

<!-- more -->
