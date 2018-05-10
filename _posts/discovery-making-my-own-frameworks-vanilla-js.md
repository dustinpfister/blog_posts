---
title: Making my own line of javaScript frameworks.
date: 2017-09-13 15:11:00
tags: [js]
layout: post
categories: discovery
id: 35
updated: 2017-09-30 18:46:07
version: 1.3
---

In the spirit of vanilla js, I have been working on my own collection of frameworks. Don't get me wrong I sure do understand the other mindset on this, I have a series of posts on node.js that mainly have to do with npm packages that help to save time. Still sometimes if I want a job done right, I need to just do it myself.

<!-- more -->

## Name of the line of projects

All of the projects filenames begin with 'mf_', which at first meant Micro Framework, but now because some of the projects may become not so micro in size I am thinking My Framework is a better name. So I call it the "My Framework line of projects"

### Toolkits

### [mf_shell](https://github.com/dustinpfister/mf_shell)

This project contains just some usual suspects when it comes to working with things that have to do with geometry, and working within a client side environment. Basically any code that repeats across frameworks a lot ends up getting dumped here by default, as such it is a common dependency of many other frameworks. No clear identity with it so far, but I like the name, so chances are it will always be something.

## Canvas, and display

So far I just have one canvas project so this will be a short list

### [mf_canvas](https://github.com/dustinpfister/mf_canvas)

This is a project that involves the use of a single canvas element to help with rendering. Nothing fancy, just the basic deal to help get the job done.

### [mf_vp](https://github.com/dustinpfister/mf_vp)

A very basic view port manager. Supper basic, so basic it is a wonder why I even have it broken down like this. Well I ended up going down a rabbit hole of sorts on this one when it comes to making something like this that is not so basic called mf_vp_zoom.

### [mf_vp_zoom](https://github.com/dustinpfister/mf_vp_zoom)

A far more advanced view port manager that allows for zooming.

## Units

This is a big part of most games, as such there might end up being a lot of these if I keep up with this.

### [mf_shots](https://github.com/dustinpfister/mf_shots)

My First atteped at making a general units framework, it is a dead project.

### [mf_units](https://github.com/dustinpfister/mf_units)

A second attempt that got somewhere, but as of this writing it is to general.

### [mf_swunits](https://github.com/dustinpfister/mf_swunits)

Space War units. This is a units framework that is useful for any kind of space warfare game (asteroids like game play) and it is used in my game Red Space

## Resource Management

the following are projects that have to do with the management of system resources. That is they help reduce the amount of work that the computer has to do per frame tick, or something to that effect.

### [mf_sections](https://github.com/dustinpfister/mf_sections)

This is a useful little project for breaking a large area down into smaller sections, then load only current sections that lay inside a current view port value. Very helpful when I have a project that involves a very large map with lots of stuff in it.

## Games

So yes the main reason why I am doing all of this is that I have my own vanilla js tools to help with game development.

### [mf_rscore](https://github.com/dustinpfister/mf_rscore)

This is the core logic of "Red Space" I submitted [this v 0.4.16](https://github.com/dustinpfister/mf_rscore/tree/0.4.16) of it to [js13kgames.com](http://js13kgames.com/entries/red-space)

play via rawgit:

[v0.0.41](https://rawgit.com/dustinpfister/mf_rscore/0.0.41/index.html)
[v0.1.13](https://rawgit.com/dustinpfister/mf_rscore/0.1.13/index.html)
[v0.2.16](https://rawgit.com/dustinpfister/mf_rscore/0.2.16/index.html)
[v0.3.9](https://rawgit.com/dustinpfister/mf_rscore/0.3.9/index.html)
[v0.4.16 (js13k 2017)](https://rawgit.com/dustinpfister/mf_rscore/0.4.16/index.html)

## To the future

This has turned out to be a good idea so far. I think a major problem I have been facing is not finding a great way to become more abstract in my process of making projects. There is always just doing more research on whats out there, but the experience of making my own stuff really does help me to become a better programmer.

Be sure to check out my many other [posts on discovery](/categories/discovery/).