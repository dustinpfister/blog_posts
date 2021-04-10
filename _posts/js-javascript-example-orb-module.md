---
title: Orb Module javaScript example
date: 2021-04-09 16:27:00
tags: [js]
layout: post
categories: js
id: 842
updated: 2021-04-10 09:23:15
version: 1.2
---

Todays [javaScript example](/2021/04/02/js-javascript-example/) is going to be on a module that I have started a long time ago, but have come around to clean it up a bit because I might want to use it in a game in the near or distance future. The module has to do with and array of point values, and finding a simple ratio of those values, and using the ratio to set one of several kinds of types.

The general idea here is that I have an Orb object that contains an array of four numbers, each number is an integer from zero upwards and represents a count of a certain kind of element. For example the first element in the points array can represent a count of Earth elements, then Wind, Fire, and Water when it comes to that kind of idea with elements in a game. There is then the ratio of these elements that is of interest for example an Orb object with a points value of 14,4,2,2 would have a simple ratio of 7,2,1,1. The ratio could be a kind of recipe, for a special kind of Orb, with special attributes, or it could just be an unknown ratio that does not have any special meaning.

<!-- more -->

