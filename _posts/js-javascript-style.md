---
title: Javascript style api for changing CSS values.
date: 2019-02-12 11:23:00
tags: [js]
layout: post
categories: js
id: 377
updated: 2019-02-12 16:27:35
version: 1.3
---

The [JavaScript style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) api is one way to go about changing css value with javaScript. This is not to be confused with javaScript coding style, which is of course a whole other subject. There are other ways of changing css values with javaScript such as changing the className property value of one or more elements with respect to a collection of hard coded css classes to work with. The style api is not the best choice for doing anything that might involve complex animations, or a great deal of rapid fast change for that there are canvas elements and svg to work with. There are many tools to a web developer and the style api is not always the best tool for the job, but it is there, and in some cases the use of it may be called for, so lets take a look at the style api in javaScript today.

<!-- more -->

## 1 - JavaScript style overview

The style api is an property of an html element reference that serves as a way to intact with the inline css style of that element via JavaScript rather than the html style attribute of the element. This differs from any additional style rules that may apply to the element via class names, ids and other selectors in the css of a project.

In case you did not know inline style supersedes all other style rules that may be in effect via css that is defined via a style element or an external css file. So in some cases where it is call for the style api can be used to overwrite anything that may be in effect via that.
