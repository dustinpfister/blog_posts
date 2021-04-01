---
title: Draw Points javaScript example
date: 2021-04-01 13:45:00
tags: [js]
layout: post
categories: js
id: 836
updated: 2021-04-01 13:54:14
version: 1.2
---

For todays javaScript example I worked out a new draw points method that I might use in one or more canvas examples that I am working on. I have made such a method many times, but I thought I should work out a half way decent method that will work well with certain situations where I want to have a display object that constitutes many lines. 

When I make a basic draw points method such a method will just draw an array of points in the form of a single array of numbers where each set of two numbers is another point to draw to. That is that the first two numbers in the array are a position to use with the ctx.moveTo method, and then each set of numbers from there is another point to draw to from there with the ctx.lineTo method. However there is much more to drawing lines to a canvas than just having an array of points for a line, such as if the line should be closed at the end or not, and if the what is drawn should just be stroked, filled, or stroked and filled. Also I might want to draw something that involves not just one line, but a whole bunch of lines, with all kinds of different settings for each line or shape. So a simple solution might work okay for starters, but sooner or alter I might want to move on to using something a little more advanced.

<!-- more -->
