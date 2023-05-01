---
title: Idle Game Electionjs project example 
date: 2023-04-28 08:19:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1037
updated: 2023-05-01 15:48:09
version: 1.2
---

When it comes to my collection of electronjs examples thus far I do not have an example that is some kind of game project, so I have started one project that is a kind of [Idle Game](https://en.wikipedia.org/wiki/Incremental_game). The game prototype idea is called MrSun, and the general idea is to have a single object that is a sun, and a bunch of objects around the sun that are land sections. Each land section is then composed of a grid of slots, each of which can contain a block that will generate the main game currently which in this case is mana.

The sun can then be moved into other locations in the area between all the land section objects. When doing so the distance from the sun to each land section object will change which will result in temperature changes for each land section. The changes in temperature will then effect the rate at which mana for each block in a given land section is. That is that I have a base mana amount, and a temperature mana amount that together compose the total mana delta amount for each block in each slot in each land section.

I have made a whole lot of game prototypes in the past when it comes to my collection of html canvas examples, but this time around with my electionjs examples I would like to focus more so on quality rather than quantity. For this game prototype I have stayed in my lane for the good part of a month, and on top of that I have plans to continue working on this project in a stand alone repository as well. So then this will not just be yet another prototype but a game that I will keep working on, and playing myself, for a little while every day.

What I have in mind here then is not just another idle game, but a game that also pulls in elements of strategy, simulation, and sandbox type games. The core features of an idle game are there is the prototype all ready, and as I keep working on this as a stand alone project I will be seeking to further refine the features in place as well as take additional steps with various other ideas that I think will add more value to this project.

<!-- more -->

## The MrSun Idle Game Prototype and what to know first

In this post I am writing about a electionjs project example that is my first electionjs game project that is an example of an idle game project. I really went off the deep end with this one when it comes to the client system which is composed of many modules of my own design. I did not write all of them from the ground up though, many are based on source code exmaples that I have started for many other projects, others are hacked over threejs source code files. I have also borrowed code from a few other projects as well and it would look like I will need to relpease any final product based on this under the MIT Liceses becuase of it.

### The full up to date source code for the prootype can be found on Github

The best way to get things up and running with the prototype that I am writing about in this post might be to [clone down my elecitonjs examples repo](https://github.com/dustinpfister/examples-electronjs) and then do an npm install for the [electronjs-example-mrsun project](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun) in the for post folder. This will install the version of elecitonjs I was using and as of this writing that is the only npm package that is being used for this one.

## 1 - Electionjs Files

As with just about any electionjs project there are two general things to write about, electionjs code and the client system code. In this section I amm going to be writing about what it is that I have in place when it comes to the typical electionjs files such as the main.js and preload.js files. On top of those two files I also have one addtional nodejs script that I should write about also while I am at it.

### 1.1 - The main.js file

There is not much to write about when it comes to the main.js file with this one actualy. For this project I really went off the deep end when it comes to the client side code, but not so much when it comes to the front end code. So I just have a create main window helper functon, a custom menu, and then a few events here.


### 1.2 - The preload.js file

While working on this project I ran into a problem that had to do with a race condition when saving a game state file to the file system. If a save was in progress and I quit or reloaded the game before the save was finished I would loose my save state. There might eb a number of ways to go about adressing this problem but the way that I solved it was by just making use of an additonal nodejs file and using the fork method of the nodejs child process module to lanunch a save as a whole other detached process on the client system. This way the detached process will continue even if the main game porcess was killed, or the game was reloaded.

### 1.3 - The save file script savefile.js

As I have covered in the section on the preload.js file for this game prototype.


