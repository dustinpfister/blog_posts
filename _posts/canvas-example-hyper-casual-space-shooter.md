---
title: Hyper Casual Space Shooter canvas example
date: 2020-12-11 17:06:00
tags: [canvas]
categories: canvas
layout: post
id: 760
updated: 2021-01-07 16:32:01
version: 1.17
---

I have made a few [canvas examples](/2020/03/23/canvas-example/) so far, but I think it is time to try something new. I started one other canvas example thus far that I have called a kind of [hyper casual](https://en.wikipedia.org/wiki/Hyper-casual_game) type game called [to the black](/2020/09/19/canvas-example-hyper-casual-to-the-black/). The idea that I had in mind for that example was very basic, I just wanted a ship that goes forward threw space at a given rate, and I have an estimate as to how long it would take for the ship to reach Max Safe integer. It was a fun, simple little project that I was able to put together in a sort time frame.

With this canvas example I want to continue with making a collection of games where I just have a very basic general idea as the whole of the example, or as a starting point for something I might put a fair amount of time into. In other words set the bar very low in terms of complexity and therefore have an idea for a game in which I can end up having a working proof of concept in a short time frame. Once I have the basic idea working from that point forward it is just a question of what I need to add in order to make the game more fun.

So then for this next hyper casual canvas example I had an idea to just make a simple, basic game in which I just fly around space and destroy blocks, thats it. So of course I was able to get that up and working in a flash, and now I just need to think in terms of what I want to add moving forward from here. Unlike the to the black example, with this one I put over a month worth of time into, and as such there is much more going on. Still the basic idea was done right away, at this point I am just continuing to pile more features on top of it. I have a half way decent example together now as of v0.25.0 of the example, I might put a little more time into it, but I think I am getting to the point where there really is only so much more to do. The core of the idea is there along with a great deal more, and now I might start some additional examples based off of this.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script src="/js/canvas-examples/hyper-casual-space-shooter/0.25.0/pkg.js"></script>

## If you just want to play the game

If you just want to play the game it might still not be such a good idea to spend a great deal of time playing this. I might still continue working on it, and at this time I might end up adding game state breaking changes. For the most part this should not be a problem, because the game can be finished fairly quickly anyway. Just keep in might that if you do play the game, do not get to attached to your save state at this time.

### How to play

When it comes to just playing the game the general idea is to move out from the main base area and just go out and blast blocks with the current ship weapon. When doing so money is made each time a block is destroyed, the money can then be used to upgrade the ship back at the base area. As you move farther from the base area block values will go up, this includes values like money, but also values like armor.

### Controls

If you are on a desktop client the keyboard can be used to preform a number of actions.

* w - speed up
* s - slow down
* a - change heading
* d - change heading

* v - debug display on/off
* b - auto fire on/off
* l - fire

* 1,2,3 - change weapon (when at base)

The mouse can also be used to click buttons when at base mouse, and it can also be used to move the ship and control speed. To control the speed of the ship click the speed bar on the left of the canvas, to change heading click in the circle in the lower right. This is also the way that one would have to do everything on a mobile device that does not have a keyboard.

<!-- EDIT 0.25.0 Bookmark -->

## This example and many others are in my canvas-example github repo

The version number in the [github repo](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-hyper-casual-space-shooter) might be higher than what I have deployed here. I will get around to editing this posy now and then, but for the latest on what is going on with this, and all the other canvas examples that will be the latest that is going on with this.

When it comes to going over the source code below I do not care to get into much detail just yet. Because I aim to keep working on this at least a little while longer so I do not want to have to wring about everything all over again when I come around to edit this post later. So for now I am going to keep things very general when it comes to writing about the code.


## 1 - The utility library

First off as with any of my other canvas example I start off with a main.js file and a utility library. This utility library is packed with methods that are often reused across other canvas examples. However I always make a new utility library for each example. The reason why is because I do not want to have this part of the canvas example packed with code that I am not actually going to use in the project. In addition although many of these might be usual suspects such as a distance formula, some of theme might be closely related to the nature of the example.

```js
```

## 2 - The Pool.js module for creating and updating Object pools

I have made another canvas example a while back in which I made a module that is an object pool type project. After many years of experience writing javaScript code for various projects such as this I have come to find that I like to have fixed object pools to work with when it comes to display objects, rather than to have a system in which these kinds of objects a created and purged as needed. This object pool module is only slightly modified from what I was working with in the object pool canvas example. I of course made some revisions to the source code to make it more appropriate for this specific project.

```js
```

## 3 - The main game.js module

I then have a main game module that will be used to create, and update the main game state object for the canvas example. This module then contains a large list of constants for certain rules when it comes to the mechanics of the game, as well as a wide range of helper methods used to create objects pools for blocks and shots.

```js
```

## 4 - The draw.js module as this is a canvas example

So this is a canvas example after all, and just like every other canvas example I often end up with a draw module. This us where I park all my methods and code that has to do with drawing a view for a game state object to a canvas element.

```js
```

## 5 - The main.js file

For this canvas example I have a utility module, an Object pool module, a game module, and a draw module. There just needs to be a little more javaScript code that will make use of all of this. In many projects what is written here might often turn into a full blown state machine. However for this hyper casual style game I wanted to keep things simple, and to the point. 

So for this canvas example in the main.js file I just create the canvas element, and the main state object that also included the main game object. Beyond that I just have a simple app loop, and attach some event handlers for keyboard and pointer support.

```js
```

## 6 - Conclusion

I was able to get the basic idea of what I wanted together with this fairly quickly. However now the question is how much more do I need to add to this in order to make a project that people are actually going to want to play? I have a lot of this drafted out in my todo list for this one as of this writing, and I think at least some of it might prove to be interesting.

I think that maybe an important part of the process is to not just think of a canvas example as just another project that I need to get over with so I can move on to the next thing. I am guilty of this kind of problem with many of my examples thus far, I work on something until I get the basic idea up and running, and then I stop working on it so I can move on to something else.

I have a few canvas examples where I have tried to put more time and effort into the example in an effort to break a cycle of sorts, but no matter how much time I put into an example I still always feel as though that example is lacking something. 

This is why I have started this hyper casual series of canvas examples. I have some other examples where I have broke the cycle of not going beyond the basic core idea, only to end up stopping eventually anyway. Ending with a project that is just starting to feel like a game, but not just there yet. So maybe if I start with a very basic idea for a game, try to limit the number of features, and focus on what really truly matters, I can break this cycle once and for all.
