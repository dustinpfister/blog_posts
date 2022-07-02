---
title: Lerping the points of a geometry from one to another
date: 2022-07-01 15:10:00
tags: [three.js]
layout: post
categories: three.js
id: 994
updated: 2022-07-02 12:13:46
version: 1.4
---

Not to long ago I wrote a blog post on the [lerp method of the Vector3 class](/2022/05/17/threejs-vector3-lerp/) in [threejs](https://threejs.org/docs/index.html#api/en/math/Vector3). This lerp method of the Vector3 class can be used to transition the state of one vector to another by way of giving a point to transition to and an alpha value between 0 and 1 that is the magnitude to move the point. Lately I thought about using this as a way to lerp the points of a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of one geometry back and forth from one geometry to another.

So in other words I am thinking in terms of having two geometries with similar, and ideally identical count of vertcies in the position attribute. On top of having more or less the same count of vertices the order of the vertices is also of importance I have found as if that is not the case this can result in a less than desired outcome.

<!-- more -->

## Lerping two geometries, and what to know first

This is a post on an advanced topic of threejs that has to do with the position attributes of buffer geometry instances, and one way to go about transitioning between the two. 

### There are many other ways to create a kind of animated model

If you feel that this topic might be a little to advance for you now, there is taking a step back and thinking more in terms of creating animations by just moving mesh objects around. This is how I first started out with this sort of thing a long time ago now with my [guy one model](/2021/04/29/threejs-examples-guy-one/) that I made a few years back now at this point.

## Conclusion

That is one way to make some animation of sorts, not the way as there is a whole lot of other things to write about when it comes to covering some ground with animation in threejs. I have done a little reading on animation clips in threejs and thus far have found that may be the best route to go when it comes to really working out a real model of sorts for one or more projects.

