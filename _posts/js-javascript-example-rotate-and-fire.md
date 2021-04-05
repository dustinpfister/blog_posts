---
title: Rotate and Fire javaScript example
date: 2021-04-05 16:13:00
tags: [js]
layout: post
categories: js
id: 838
updated: 2021-04-05 16:23:58
version: 1.4
---

Lately I have been giving my turret defense canvas example a much needed overhaul as I do not like the state that I have it in. I added a whole bunch of code that brings things to the example that start to make it look like an actual game to some extent for once. However there is much more work to do when it comes to making a quality game that people might actually want to play. For today though I wanted to work out a simple javaScript example where I am just focusing one one little aspect of the game, and that is just having the turret move and fire.

<!-- more -->

## 1 - utils library for this javaScript example

For this javaScript example I put together a simple general utility library that will contain all kinds of methods that will be used for this javaScript example.


## 2 - The state module

I put together a quick state module that will create and return, as well as update the main state object of this javaScript example. In a real projects I might have a lot of files that will make up the state including a state machine, a game module, along with many plug ins for this modules. However this is a simple little javaScript example where I just have a single file for this sort of thing.

## 3 - The draw module

For this javaScript example I am making use of a canvas element to provide a crude yet effective view of the situation.

## 4 - The main.js javaScript file

I am not going to want to have a main.js file in which I can make use of all the above javaScript code and add a main app loop, along with some event handers.