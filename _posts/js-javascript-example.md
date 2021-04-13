---
title: javaScript examples
date: 2021-04-02 11:17:00
tags: [js]
layout: post
categories: js
id: 837
updated: 2021-04-13 13:59:59
version: 1.39
---

Some may say that a good way to learn javaScript, or any programing language is to study the language itself, as well as various libraries that are written in the language. However maybe the best way to go about learning javaScript would be to just start making some fun, or useful [javaScript examples](https://www.tutorialrepublic.com/javascript-examples.php) that you can start to actually play with, or use to help solve some kind of problem.

In this post I will be briefly writing about and linking to each of my javaScript example posts where I am just writing about a little code that constitutes some kind of simple javaScript project. Many of these javaScript examples are modules that will just provide one little feature of a game, or some kind of reusable function that could be part of an over all larger framework.

<!-- more -->


### 1.1 - [Attack wave control system](/2021/03/31/js-javascript-example-attack-wave-control-system)

First off I have an attack wave control system that I might use in one or more canvas games, when it comes to my collection of canvas examples, and any other similar future project that revolves around the canvas element or some kind of game framework. The goal with this javaScript example was not to make a full, complete game, but is was to create a way to control the flow of waves of enemies units coming into a game world area. 

There are many games that follow a kind of system where a period of time goes by, and a wave of enemies enters a game world area that must be completely destroyed. Many of them are a little fun, and addictive, so having a system like this worked out is a good first step for making a few games that make use of this.

### 1.2 - [A Draw points canvas method](/2021/04/01/js-javascript-example-draw-points/)

This is a javaScript example where I worked out a system for drawing a collection of points rather than just one point to a canvas element. When it comes to drawing a single point to a canvas there is often just using the canvas arc method to do so, or doing something that involves drawing a box, and then lines from each corner. However there is also having a collection of points, and how to go about drawing a line with this collection of points. Having a simple system where it is just a single array of points is easy enough, but things get at least a little more involved when it is a situation in which I want to draw a few lines, where some of them will be closed off into shapes, and others will be just lines.

### 1.3 - [An exp point system](/2020/04/27/js-javascript-example-exp-system/)

This is my first attempt at making a module, reusable experience point system that I can take with me from one project to the next. I have used this system in a few of my canvas examples, but I am not happy with it. Still I would say that I have managed to get a few things solid with this system to say the least. I think that a good experience point system should provide at least two pure functions that will both return a kind of standard level object. One pure function where the experience points are know, but the level is not, and another that will work where the level is known, but the experience point values are not known.

### 1.4 - [Fizz buzz](/2020/06/26/js-javascript-example-fizzbuzz)

Often I need to make the same thing over an over again at least a few times before I even begin to get a clear idea as to how it is that I want to design a system. When I first start working out a prototype for an idea on something I often get a basic work proof of that idea, but often there is a great deal wrong with it. So I then make a new system where I end up making the whole thing all over again, but now a slightly better system that does not have all the problems of the first prototype. This process then often repeats at least a few times until I get something that is fairly solid, or at least good enough. This fixxbuzz javaScript example is then an exercise of this sort of thing on a micro scale with a very simple idea, rather than a complex module, or full feature application of some kind.

### 1.5 - [Grid Game Unit Movement](/2020/08/11/js-javascript-example-grid-game-unit-movement/)

In this example I have a grid and I am working out some basic logic when it comes to moving those units around in the grid. There is a bit to it actually when it comes to making a system for this sort of thing from the ground up. However what is also great about it is that it is not so hard to get something working, and once I have a basic system for the kinds of games that I have in mind I can use it to not just make one game but a few taking this system with me to each new project. However as of this writing this one is still a work in progress that I have not put as much time into as I would have liked to. I do have a lot of other things going on that get in the way of me working much of this stuff out.

### 1.6 - [A log once method](/2021/03/29/js-javascript-example-log-once/)

One thing that I would like to have as part of a basic utility library that I take with me from one project to another is a log once, or call once type method. When first starting out with the basic of debugging there is using the console.log method to log things out to the javaScriot console as they happen. I do not think that this is such a bad way to go about debugging, and I still find myself doing it, however there are some things to gain from starting to use my own system for logging things that are going on.

### 1.7 - [Simple map system for selecting a level in a game](/2021/04/06/js-javascript-example-map-system-simple/)

In this example I am working out a simple map system that will set some options for a main game state create method. In other words this is a simple system for having a collection of display objects in a canvas where each display object is for a level in a game, when the player clicks on one of these display objects they then progress to another state of the application that will be used to set additional settings, or progress directly to the game state. The display object in the map contains properties that will be passed to the game create method that will set up the state of the game object.

### 1.8 - [A basic multiplication table example](/2020/02/10/js-javascript-example-multiplication-table)

This was my first post on this collection of javaScript examples, and as such I wanted to start out with something very basic. SO working out a javaScript example that is just a simple multiplication table sure doe stink me as one of those simple hello world type projects that help out for people that are very new to javaScript. However even when it comes to this kind of example there is still a lot to cover, even with something like this. There is not just making a multiplication table and moving on, there is making a function that will create a state object of a multiplication table, and then making at least one if not more renderer's that will render the state of this multiplication table.

### 1.9 - [An Orb Module example about ratios](/2021/04/09/js-javascript-example-orb-module/)

This is a module where I am working out some basic core logic for something that I might use in a future game.

### 1.10 - [A percent module experiment](/2020/11/25/js-javascript-example-percent-module/)

So there is having a simple expression like 3 \/ 4 that will result in a value between 0 and 1 that will be \0.25. In other words there is having a numerator and denominator value and getting a fraction between the two. However if a numerator value starts at 0 and approaches the denominator value as a fixed static rate, then the change happens along a straight line when graphed.

### 1.11 - [Player unit grid](/2021/04/08/js-javascript-example-player-unit-grid/)

This is a javaScript example where I was experimenting with a simple grid in the center of a canvas that a player can built player units for a game This is one of sever javaScript examples where I am working out some basic logic in an independent project that I might in turn add to a game that I am making.

### 1.12 - [Ratio module](/2021/04/13/js-javascript-example-ratio-module)

This is a module that I made as a foundation for my orb module, which in turn might sever to be another modules that I will be using in at least one if not more canvas games. As the name suggests it has to do with ratios, and there is a gerat deal that comes up when working with them. For example say I have a set of numbers like 5,20,0,15 and I want a function that will return 1,4,0,3 when I pass the previous set of numbers to it.

### 1.13 - [Rotate and fire example](/2021/04/05/js-javascript-example/)

This is an example where I worked out some basic logic for a turret defense game when it comes to how the turrets will behave when it comes to rotation and fire control. For example I could make it so that when a player clicks an area of a canvas a turret is just set to an angle that points to that location and then it fires a shot for every click of the canvas. However another way to program this kind of game is to have a rotation rate, as well as a fire rate, and for the turret to only fire once it gets within a certain angular range of the target location that was clicked.

### 1.14 - [Skill Point System](/2020/08/26/js-javascript-example-skill-point-system/)

This is a skill point system that I put together to make use of in some canvas examples that might call for such a system. The general idea here is that in a game where there is an experience point system on each level some skill points will be given to the player. These skill points can then be invested into upgrades that have various effects on a main game state object.

### 1.15 - [Sort planets](/2020/08/31/js-javascript-example-sort-planets/)

A simple sort of planets objects example that I might use if a future game if I ever get around to it. The idea of this example is that I just wanted to make a simple fun little example that makes use of the array sort method to which I wrote a quick blog post on. I wanted to go at least one step beyond just having a simple copy and paste hello world style example of array sort, and with that goal in mind I guess this example is more or less just that. I am not sure if I will every get around to expanding on this by making a real game based off of it, but in any case I all ready have an interesting starting point for something here to say the least.

### 1.16 - [Tax brackets](/2020/02/27/js-javascript-example-tax-brackets/)

A tax brackets example that helps me to get a general idea of how a progressive tax system works when it comes to things like income tax. I would not use this as a way to do ones own taxes of course, but it is a module that I might use in one form or another in some kind of game where I might want a module such as this.

### 1.17 - [Test Module](/2021/04/12/js-javascript-example-test-module/)

This is a test module that can be used to run a collection of tests on a method to make sure that the results that the method returns are expected results.

### 1.18 - [Trade Sim](/2021/04/07/js-javascript-example-trade-sim/)

This is a simple trade simulator module that I might use as a starting point for a more advanced version that could be used in a game. The general idea here is that the player has a way to buy items as a certain rate, and then sell them at another rate later on. Depending if the rate goes up or down they will stand to gain or lose money. I have come across this kind of feature in games here and there in the past and I think it is a nice feature to have in certain types of games, so I made a simple starting point for this kind of feature.

### 1.19 - [Zig Zag Arc](/2020/08/10/js-javascript-example-zig-zag-arc/)

Another basic example that makes use of some methods I work out in my percent module example.

## 2 - Conclusion

That is it for now when it comes to this collection of javaScript examples, as I come up with more I will be sure to come around to expand this list and link back to if from the newer posts. If you want to check out additional posts like this, but with other collections of examples I have a similar post where I am just going over [canvas examples](/2020/03/23/canvas-example/) rather than just things that might just have to do with a little javaScript code and that is it.

