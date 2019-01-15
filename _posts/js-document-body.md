---
title: document body and some related DOM topics
date: 2019-01-03 21:00:00
tags: [js]
layout: post
categories: js
id: 354
updated: 2019-01-14 20:08:57
version: 1.2
---

The [body element](https://developer.mozilla.org/en-US/docs/Web/API/Document/body) of an html document is where all additional elements will be placed that have to do with the documents layout an structure. In this post I will be covering some topics when it comes to the document.body property that can be used to quickly reference this html element.

<!-- more -->

## 1 - document body example

The document body property of the document object can always be used to quickly gain a reference to the body element. So it can be used as an alernative to something like document.getElementById, or document.getElementsByTagName when it is only just the single body tag of an html document that is of concern.