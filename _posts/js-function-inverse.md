---
title: javaScript inverse functions
date: 2021-07-23 11:08:00
tags: [js]
layout: post
categories: js
id: 917
updated: 2021-07-23 11:31:47
version: 1.6
---

I have made an [experience point system](/2020/04/27/js-javascript-example-exp-system/), It works okay, but it lacks some additional features that I would like to add. So as of late I have been making a few new systems, but I have found that I should maybe take a step back and work on some more [basic functions](/2019/12/26/js-function/) before progressing on to making one or more experience point systems. I say that because I think I need to work out some things when it comes to [inverse functions](https://en.wikipedia.org/wiki/Inverse_function) which is a subject that seems to come up when getting into making an experience point system, at least speaking from my experience with making experience point systems thus far, not pun intended. 

Simply put when I am making an experience point system I like to have two methods that give me an unknown value when I have a known value. As you might expect I like to have a method that will return a level number when an experience point number is given, and another function that will give an experience point number when a level number is given. So in other words I want a kind of get level function, and an _inverse_ of this get level function that would be called something like get exp. Some times when trying to make this set of functions I get stuck, and I start to think that I might be wasting time trying to do the impossible because I am trying to create an inverse function, for a function that can not be inverted. 

Some times I might be working with something that is [not monotonic](https://en.wikipedia.org/wiki/Monotonic_function), or even possibility a kind of [one way function](https://en.wikipedia.org/wiki/One-way_function). That is a kind of function where there is more than one possibility for a given set of known arguments, or I have a function where it it is easy to make one function but hard if not possible at all to make the inverse of the easy to make function.

<!-- more -->
