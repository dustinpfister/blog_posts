---
title: Get all windows in electronjs
date: 2022-03-28 13:34:00
tags: [electronjs]
layout: post
categories: electronjs
id: 973
updated: 2022-03-28 13:41:16
version: 1.1
---

There are a number of static methods in the browserWindow class in electronjs, one of which is a method that will create and return a collection of all browser windows currently open. This post will then be a quick example of the use of this static method of the browserWindow class. While I am at it I will of course be touching base on a bunch of additional features in electronjs in general, such as the preload script, and various events for the browser window class. Mainly the close and ready to show events of the Browser window class that I will be using to update a simple message in each browser window when a new window is opened or closed. So if you are still fairly new to electronjs as well this might prove to be a good exercise in order to gain some insight to various features that have to do with a collection of browser windows.

<!-- more -->
