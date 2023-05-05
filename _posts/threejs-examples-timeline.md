---
title: Timeline module threejs example
date: 2023-05-05 13:25:00
tags: [three.js]
layout: post
categories: three.js
id: 1038
updated: 2023-05-05 13:44:27
version: 1.2
---

For this weeks post I worked out another [threejs example](/2021/02/19/threejs-examples/), this time it is a module that helps me break down a project into a kind of timeline. This kind of project might be used in conjunction with, or maybe even as a replacement for a simular module that I use all the time in my video projects called [sequnce hooks](/2022/05/12/threejs-examples-sequence-hooks/). Both of these projects are ways of breaking up a video into many parts in which differing logic will be used to update the over all scene of a threejs project. WIth sequence hooks I was thinking in terms of having an array of, well sequence objects that will be fired one after another. With this timeline project I am thinking more in terms of having a collection of objects that will only fire when a main alpha value that is the over all progress of the video is between a start and end value of a single object in a collection. So then this timeline project will allow for gaps between event objects.

There are a lot of other little details that I would like to work out with this kind of project rather than just making a replacment for sequnce hooks. For one thing I would like to define a kind of start and end time that will be used as a way to define not the start and end time of an over all video, but rather the start and end time between a colleciton of events that are between these start and end times. The actual final time of the video can then be any abount of time actually becuase all of these time stamps are just used to figure out what the alpha values should be for all of these timeline events.

<!-- more -->


## The Timeline module and what to know first

This is a post in which I am writing about a javaScript mpodule that I might use in one or more future video projects if I refine it a bit more. This is not in any way a post on getting started with threejs or any addtional skills that are needed before hand with things like javaScript in general for example. I have all ready wrote getting started type posts on threejs, and javaScript a long time ago. I have also wrote posts on many threejs various threejs features alone. This is just one of my many threejs example posts where the goal is to make some kind of final project. This can be some kind of full applaction, however often it is a module that I would use in an over all applaction such is the case here.

### Source code is also up on Github

The soucre code that I am writing about in this post can also be found in my [test threejs reposatory up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-timeline). This is also where I park the source code examples for my many [other posts on threejs as well](/categories/three-js/).