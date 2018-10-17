---
title: Reversing an Array in javaScript with lodash _.reverse, and alternatives
date: 2018-10-17 12:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 306
updated: 2018-10-17 12:42:00
version: 1.1
---

For todays [lodash](https://lodash.com/) post I have come around to taking a moment to write a quick post about \_.reverse. Lodash is a great project, but many of the methods are pretty much just reverences to native methods, and \_.reverse is an example of one of these. Also the native array method on which \_.reverse is based has excellent backward compatibility, as the method will work on browsers as old as IE 5.5. So then \_.reverse is not one of those lodash methods that help support a case that lodash acts as a safety net of sorts when it comes to the question of supporting older browsers. Never the less in this post I will be writing about \_.reverse and the native Array.reverse methods as a means to reverse the order of an array in javaScript, and also cover some related topics as well.

<!-- more -->

## 1 - What to know

This is a post on the \_.reverse method in lodash that can be used to reverse the order of an array in javaScript, as well as other related topics. This is not a getting started post with lodash, or javaScript in general, and I assume that you have at least some background with these topics.
