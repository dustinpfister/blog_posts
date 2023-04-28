---
title: Idle Game Electionjs project example 
date: 2023-04-28 08:19:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1037
updated: 2023-04-28 08:53:15
version: 1.1
---

When it comes to my collection of electronjs examples thus far I do not have an example that is some kind of game project, so I have started one project that is a kind of [Idle Game](https://en.wikipedia.org/wiki/Incremental_game). The game prototype idea is called MrSun, and the general idea is to have a single object that is a sun, and a bunch of objects around the sun that are land sections. Each land section is then composed of a grid of slots, each of which can contain a block that will generate the main game currently which in this case is mana.

The sun can then be moved into other locations in the area between all the land section objects. When doing so the distance from the sun to each land section object will change which will result in temperature changes for each land section. The changes in temperature will then effect the rate at which mana for each block in a given land section is. That is that I have a base mana amount, and a temperature mana amount that together compose the total mana delta amount for each block in each slot in each land section.

I have made a whole lot of game prototypes in the past when it comes to my collection of html canvas examples, but this time around with my electionjs examples I would like to focus more so on quality rather than quantity. For this game prototype I have stayed in my lane for the good part of a month, and on top of that I have plans to continue working on this project in a stand alone repository as well. So then this will not just be yet another prototype but a game that I will keep working on, and playing myself, for a little while every day.

What I have in mind here then is not just another idle game, but a game that also pulls in elements of strategy, simulation, and sandbox type games. The core features of an idle game are there is the prototype all ready, and as I keep working on this as a stand alone project I will be seeking to further refine the features in place as well as take additional steps with various other ideas that I think will add more value to this project.

<!-- more -->

## The MrSun Idle Game Prototype and what to know first
