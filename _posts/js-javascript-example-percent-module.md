---
title: A percent module javaScript example
date: 2020-11-25 11:25:00
tags: [js]
layout: post
categories: js
id: 749
updated: 2020-11-25 11:33:04
version: 1.0
---

I think it might be a good idea to work out some more basic javaScript examples that might lead to useful modules that I might use in an actual project or two. One thing that seems to come up a lot for me when working on projects is dealing with what I would often call a percent value, or a value that can often be expressed as a percent value. That is having a method that will return a number between 0 and 100, or between 0 and 1 which could be multiplied by 100 or any other number for that matter.

There is having a simple percent method that will take two arguments one would be a numerator and another a denominator and the returned result will be a number between 0 and 1. There could also be some additional code that has to do with clamping or wrapping when this go out of range, but a basic example of this kind of method is not to hard. Still just a basic example of this kind of method will just give numbers that will go up in a very linear or straight line kind of way. So there is a wide range of other kinds of methods such as this that could give percent values that follow a curve, or some other kind of pattern.

These kinds of methods come into play when  it comes to writing logic that has to do with animations, but have a wide rang of other uses such as when creating an experience point system for example.

<!-- more -->
