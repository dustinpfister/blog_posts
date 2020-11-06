---
title: Mr sun Temp and Fusion plug-ins canvas example
date: 2020-11-04 13:28:00
tags: [canvas]
layout: post
categories: canvas
id: 736
updated: 2020-11-06 16:55:32
version: 1.15
---

I am going to try something new when it comes to todays [canvas example](/2020/03/23/canvas-example/) post, I am not going to just start a whole new example from the ground up. Often I do borrow a little code here and there from other examples, and projects when and where doing so is called for. However today I am going to just copy the whole source code of my Mr sun example at version 0.1.0 and start from there by just adding a few plug-ins to it, and making any changes that are needed to the source in the process if any.

So this way I am not starting over from the beginning, but if I need to I can make some changes that will not effect the other project. I can however add them to it later on if I feel as though such changes should be added.

Anyway this canvas example will then be a continuation of sorts on my Mr Sun game that I think might have some potential if I put a bit more time into it. In the game the player controls the position of a Sun object that effects the other word section objects that are centered around the sun object. In this post I am using the same core source code more or less, but I am adding two plug-ins to it that have to do with setting an updating a temp property for each section. In addition I am also starting another plug-in that has to do with fusion in the game, which I think would be another cool feature.

<!-- more -->

## 1 - What to know before hand

This canvas example is a fork of my starting Mr Sun canvas example. The source code is not to different from that example at least when it comes to the core of the application itself. I have made a few changes here that I might add to the core example at a later point, but for now this post, and example is more about the plug-ins.

I wanted to create at least two plug-ins as a way to test out how the system works thus far, and maybe add some features as needed. This far as of 0.2.0 of this example I have just added a way to set a call priory for plug-ins which is just a way to make sure that a plug-in that depends on smoother plug in is called in the proper order.

## 2 - The sun.js plug-in



```js
```

## 3 - The temp.js plug-in

One of the core reasons of this fork of Mr Sun is to work out the plug-in that will be used to set a temperature value for the sun object itself, as well as all the sections around the sun. The current distance between the Sun object, and a section is of course the core feature of the game that will impact this, as well as many other things in the game. However there is more to it then just working out a single expression and moving on with this, there are a few things that come to mind when it comes to how temperature will be set for the sections actually, and this plug-in alone will probably eat up a fair amount of time to get just right.

```js
```

## 4 - The fusion.js plug-in

Another idea I have for a plug-in was a fusion plug-in that is a way for minerals to be produce in the game. I am thinking that minerals will just be one aspect of what will need to happen in this little game world of mine, and like the temp plug-in, it is another core aspect of the game mechanics that other future plug-ins will depend on. In time I aim to create additional plug-ins that will have to do with geology, the atmosphere, basic life, and civilization all of which have to do with elements, and molecules composed of elements. So in this game it makes sense to have a plug-in that serves as a way to create these resources.

The plug-in design started out with making fusion something that happens in the world sections, rather than the sun. In this game I am not making an effort to make some kind of realistic simulation of course, this is very much just a game, and the goal is to just simply have fun. So this mechanic of having fusion just be something that happens in the world sections does strike me as one way to go about handling this aspect of the game mechanics. However the idea of making fusion something that happens in the sun object would make more sense when it comes to a real world understanding of fusion.

```js
```

## 5 - utils.js

I wanted to add a few methods to the utils.js module for mr sun that I worked out in another canvas example, mainly the utils.logPer method. I have not yet worked out an experience point system that I am truly happy with, but that is not to say that I do not have systems work out for that. There is my post an an experience point system module, and also the canvas example that has to do with creating a logarithmic percentage value from a linear one.

```js
```

## 6 - The game.js module

In this fork of the Mr Sun source code I made just a few basic changes to the main game module. I think that it would be best to only make changes as they are needed rather than spending time adding features that I might not really want or need for this project.

Another method that I ended up working out this time is a simple get section by position helper. This method is used to get a section by way of an x and y position relative to the canvas element. In time I might want to add additional methods such as this, but for now this one alone was truly needed. I added some new states to the state machine in the main.js file that make use of it when it comes to switching to other states that are views for the sun and a single given section object.

```js
```

## 7 - The draw.js module

The draw module is back with some of the usual suspects when it comes to one of my canvas example projects, such as a draw background method. One note worth additional that was added in this fork is sunData draw method in which I am drawing a graph that illustrates the current and future status of the sun.

```js
```

## 8 - main.js

Some additional have been made to the main.js of the Mr Sun source code in this fork also. For the most part it was just the addition of two new state objects for the current state machine, but no radical changes have been made to it beyond that. In future forks of this I thnk I am going to need to do something similar to what I have done with the game module, but for now I am taking a more monolithic approach here, like I did in crosshairs.

```js
```

## 9 - Conclusion

So far I am Liking how this project is going, but there is indeed much more work that needs to be done until I have something that I can call a done deal. I think I will continue working on just this fork alone when it comes to working out additional changes that need to happen with the temp plug-in, and at least one or two additional plug-ins that are closely related to it. The focus here is on a single core plug-in that has to do with temperature, and as I move forward with additional forks.