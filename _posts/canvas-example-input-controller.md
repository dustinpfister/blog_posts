---
title: An input controller canvas example
date: 2020-04-17 18:15:00
tags: [canvas]
layout: post
categories: canvas
id: 647
updated: 2020-04-17 18:23:06
version: 1.1
---

Todays [canvas example](/2020/03/23/canvas-example/) post is on something that I started working on that can be though of as an input controller. This input controller helper with abstracting mouse, touch, and keyboard events into a single input state object that I can pull for input state when making a game that will make use of a controller such as this.

The motivation for this is that when making a canvas project I want to make use of input from an array of sources a quick and simple process as I find myself wasting time white the same code over and over again for this part of making a project. 

Most frameworks such as phaser will have an input controller, or input hander of sorts that can be used to quickly get up and running with user input. However when it comes to making a canvas project from the ground up I will need to make my own solution for this sort of thing, along with my own state machine, and so forth.So this post will be on my input controller canvas example that makes use of mouse, touch, and keyboard input.

<!-- more -->
