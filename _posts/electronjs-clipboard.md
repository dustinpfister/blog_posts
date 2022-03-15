---
title: Getting started with the clipboard class in Election.js
date: 2022-03-15 11:34:00
tags: [electronjs]
layout: post
categories: electronjs
id: 968
updated: 2022-03-15 11:53:28
version: 1.3
---

I still want to write at least a few more posts on electronjs, before moving on to focusing on other topics as that just strokes me as the thing to do if I am going to start a new collection of content on something. Anyway when it comes to making an electron application one of many things that comes to mind is how to go about copying something that might be in the clipboard of an operating system into my electronjs application as well as the inversion of doing so. In other ways there must be a way in electron to handle the whole copy and paste thing. With that said there is a clipboard class that can be used as a means to both read and write to the clipboard of the house OS which allows for making use of this common OS feature to transfer some kind of content from one application to another.

<!-- more -->

## The clipboard class and what to know first

This is then a post on a simple hello world example of the clipboard class in electron.js, that also serves as a basic getting started type example of electron js application in general also when it comes to things like a preload file that I am suing to create a public API that is used in the front end javaScript code.

## 1 - The main javaScript file

In the main javaScript file I have some events for what to do when the application first starts, and for this I am create creating the main browser window for this. When doing so I create a custom menu for the application and to do so I require in an object that is exported by another file in the root name space of the application called menu.js. This can also just be done in the main javaScript file, but the menu can often become a little lengthly as I continue to work on and expand an application so sooner or later this is one thing that I do to break down a project into smaller pieces.

```js
```

## 2 - The menu file

In the menu file I am using the clipboard class to read the contents of the clipboard for a paste option in the edit menu.

```js
```

## 3 - preload

Here I ahve the preload file that I am using to define the API to use in the front end code.

```js
```

## 4 - The index html file

Now for the front end code where I am attaching an event hander for the action paste event of the API that I am defining in preload.js

```html
```

## 5 - Conclusion