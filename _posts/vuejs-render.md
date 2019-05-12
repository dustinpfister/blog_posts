---
title: vue render method for client side rendering
date: 2019-05-12 16:40:00
tags: [vuejs]
layout: post
categories: vuejs
id: 442
updated: 2019-05-12 16:45:09
version: 1.0
---

So for the most part vue templates work find for most projects, but it is not always the best solution when it comes to taking full advantage of javaScript to render DOM elements. If a template will not cut it than an alternative would be a vue render method. When working out a render method a createElement method can be used to create virtual dom elements that can then be used to render a view rather that of a static template.

<!-- more -->
