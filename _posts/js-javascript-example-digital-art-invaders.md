---
title: Invaders Digital Art javaScript example
date: 2022-01-17 07:36:00
tags: [js]
layout: post
categories: js
id: 952
updated: 2022-01-17 09:46:24
version: 1.6
---

Continuing with a digital art collection of [javaScript examples](/2021/04/02/js-javascript-example/) I have made yet another quick project following the same general thought process with the others when it comes to sticking with a fairly simple idea, and getting the core of that idea done within the span of just few days. This time I wanted to make a digital art project that involves display objects that repentants fixed structures that spawn at the center of the canvas, and additional display objects that spawn from outside the canvas and move in to where the buildings are to attack and destroy these structures. The structures themselves also fight back, and both kinds of display units fire yet another kind of display object that is a shot object at each other. So then this digital art project is then something that resembles a kind of game, but because it is a digital art project that means I do not have to worry about UI design, save states, menus, and all kinds of additional features that I would need to work out of it where a game. This allows me to focus more so on just game logic, and also how the project looks as this is a digital art project.


<!-- more -->

## 1 - The utilities library

With just about all of these javaScript examples I often have a general utilities library where I park various methods that I will end up using in one or more additional files in an over all project. These are then typical usual suspect type methods that have to do with things like getting the distance between two points, and bounding box collision detection.

## 1 - The improved object pool normalized library

In revision 1 of this example I made an improved object pool library that I will likely use for future projects moving forward as a like it a lot more compared to the library that I based this off of. With my canvas example on object pools I started a library for this kind of thing that I kept copying over to other projects, each time I did so I might not change much of anything to it, other times I made improvements and added features. However with this object pool library I decided to give it a new name to help really set this one apart from the others by calling in pool normalized.

By normalized I mean thinking in terms of having a point in 2d space first and for most rather than a 2d box object with a width and height that is to be place somewhere relative to the upper left corner of the object, which was the nature of the older object pool library.

## 2 - The units module

Yet another major component that I have started with this example and will likely take with me to additional projects is the unit module that I started in this example. I have made a few modules such as this in past projects, but often then end up being coded together with the game module of a project, as such it is something that I found myself writing over and over again with each project. To help put an end to this I made a stand alone units module, complete with a plug in system that will allow for me to septate logic that has to do with specific kinds of units such as units that move, units that just stay in a fixed location, and various other kinds of units such as shots.

### 2.1 - The attackers plug in

### 2.2 - The Buildings plug in

### 2.3 - The shots plug in

## 3 - The game module

## 4 - The draw module

## 5 - The main javaScript file

## 6 - Conclusion

