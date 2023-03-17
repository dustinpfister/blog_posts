---
title: SVG tools module threejs example
date: 2023-03-17 08:18:00
tags: [three.js]
layout: post
categories: three.js
id: 1032
updated: 2023-03-17 08:52:30
version: 1.0
---

I made a [threejs project example a while back that had to do with using svg as a way to define curves](/2022/09/23/threejs-examples-svg-movement/) in 3d space, however it would seem that I jumped the gun and did not just simply make a standard set of tools that builds on top of threejs and the SVGLoader. So with that said this week one thing I worked on was a new threejs project example that is just that a standard set of tools to use when working with SVG files. There is just dirrectly working with the SVG loader and threejs itself of course, but there are a lot of little things that come up as well as things that need to happen with many other threejs fetures that I would say valadates a need for an addtional abstraction of some things if I want to keep my main javascript code clean and also not repeat code from one project to the next.

<!-- more -->

## The SVG tools module, and what to know first

There is a whole lot that one should be aware of before hand with this as this is a [threejs project example](/2021/02/19/threejs-examples) post, and not a getting started type post on threejs. So I assume that you know at least a thing or two about the basics of getting started with a threejs project, and also have at least some background with client side web devlopemen in general. if not sorry getting into all of that is outside the scope of this post. I will however as always write about a few things in this opening section and link to other resources as needed.

### Read up more on the SVG loader in general

The source code examples that I am writing about in this post do not just run on top of threejs, but also the SVG loader as well. The SVG loader is not baked into the core of the threejs librray itself but must be added along with the librray. This SVG loader can be found in the examples folder of the threejs reposatory and as such it is important to make sure that you are using the state of the SVG loader that coresponds to the revision number of threejs that you are using.

### There is also knowing how to create SVG files to begin with

A long time ago I [started a post on the subject of making SVG files](/2019/02/11/js-javascript-svg/). However I would say that the best resource with this on line would be to just start studying the [Modzilla Docs on SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). When it comes to the Modilla docs I would say that a key element of interset, after [the SVG element iself](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) of course, would be the [path element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path). The path element can be used to define just about any kind of 2d path using plain old point to point lines as well as some options when it comes to bezier curves with both one and two control points. 

### Source code is also up on Github

The source code examples that I am writing about in this post can also be found up on my [test threejs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-svg-tools) on Github. This is where you might find revisions of the modules that are a little more up to date as often I might do a little work on a project like this, but maybe not get around to editing the post just yet. Also this is where I park the source code examples for my [many other posts on threejs](categories/three-js/) projects, as well as various features of the librray istelf.

### Version Numbers matter

When I first wrote this post I was using r146 of the threejs and thus I am following the r146 style rules that I set for myself. Also at this time I think that I should start making it clear in these sections that I am using the old IIFE pattern for modules over that of JSM for now.