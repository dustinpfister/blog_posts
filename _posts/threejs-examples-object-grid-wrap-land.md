---
title: THREEJS Looping land animation using the Object grid wrap module
date: 2022-07-25 08:55:00
tags: [three.js]
layout: post
categories: three.js
id: 996
updated: 2022-07-15 09:25:07
version: 1.3
---

This week I took another look at my [object grid wrap module threejs example](/2022/05/20/threejs-examples-object-grid-wrap/) that I made a while ago, and when doing so I made some revised versions of that source code. While I was at it I thought I would start a [new threejs example project](/2021/02/19/threejs-examples/) that will be another javaScript file in which I am building on top of this object grid wrap module that is a way to create a grid with a collection of mesh objects that looks like some land in terms of terrain at least. 

When it comes to using this object grid wrap module I need to define a collection of source objects to clone for each grid location, so for this threejs example I am just creating a module that in part creates this collection of objects that incude mesh objects with built in [box geometry](/2021/04/26/threejs-box-geometry/) as well as [Extrude geometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) using [shapes](https://threejs.org/docs/#api/en/extras/core/Shape).

<!-- more -->

## The land object grid wrap module and what to know first

This is one of my many threejs example posts in which I am going over some source code for somehting that is the start of an actual project of some kind using threejs rather than just yet another simple demo of a threejs feature of one kind or another. So then this is not at all in any way a post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) or javaScript in general. So I will not be going over various threejs let alone javaScript basics here, however in this section I will be wrtiing about a few things that you might want to read up more on before continung with the rest of this post.

### Check out Shape and Extrude geometry if you have not done so

In this example I am using the threehs Shape constructor to create an instance of a 2d shape with the built in threejs shape class. I can then use one of these shape classes to create an anstance of Extrude geometry that is just a 2d shape with a little depth added to it. For this project example this is what I am using to create mesh objects that will be slopes in the object grid that will resemble land. However this is of course somehting that you might want to read up more on in detail and with that said I wrote a [blog post on this subject of shapes and Extrude geometry in threejs](/2021/06/01/threejs-shape/).

### The source code here is also on Github

The source code that I am writing about here can also be found in my [test threejs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap-land).

### Version Numbers matter

When I wrote this post I was testing out the source code here with r140 of threejs and everything was working okay on my end with that revision of threejs.


