---
title: Create Path tool threejs example
date: 2022-10-28 07:27:00
tags: [three.js]
layout: post
categories: three.js
id: 1011
updated: 2022-10-28 07:55:26
version: 1.4
---

Lately I have been taking another look into [curves in threejs](https://threejs.org/docs/#api/en/extras/core/Curve) by making a few quick demos of the [Quadratic Bezier curve3 constructor](https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve3) which is one of several options to create a curve apart from creating a custom curve. There are a number of uses for creating curves, but for the most part my interest in them is to explore what my options are for coming up with a javaScript project that helpers me define the movement of object3d based objects, mainly mesh objects and cameras.


<!-- more -->

## The create path tool threejs example and what to know first

This is a post on a threejs example of a tool that can be used to create paths. There is a lot to be aware of before getting into making this kind of project that I will not be getting into detail in this post. However I will take a moment to write about a few key things that are closely related to this example, and like to other posts in which I do get into detail.

### Check out the base curve class

The [base curve class](/2022/06/17/threejs-curve/) is what I would want to use when it comes to creating my own custom curve object instances to use with threejs features such as the Tube geometry constrictor, or create arrays of vector3 objects to create a collection of points. The curve class can also be used to get a single Vector3 object that is along a curve by making use of a get point prototype method of the curve class. There are a lot of key details to be aware of which it comes to the base curve class then and how it can prove to be useful.

### The Quadratic Bezier curve3 constructor is a great choice when it comes to just using a built in class and moving on

Although the base curve class is what I will want to use when it comes to making my own custom curves in space there are a number of built in options that also will work well for most common tasks. The main task that I want to do with this curve creation tool will be resolve just fine with the [THREE.QuadraticBezierCurve3 class](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) that works by giving a start, control and end option in space by way of Vector3 objects.

### Source code is up on github

This threejs example started as one of my [r140 demos in my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r140/proto-curve-paths-tool).

### version numbers matter

When I first started this post I was using r140 of threejs.

## The first prototype of the tool thus far \(r0\).


```js
```

## Conclusion

Event with what I have together thus far I am ready have the core idea of what I want working, but now the question is do I put more time into this in order to add the additional features that I want. It would be nice to have some kind of tool in which I can adjust things my just clicking and dragging mesh objects as a way to change the start point, end point, and control point. However I have found that I can also just manually define these when working out the  source code for a video project also, and doing so is not all that time consuming thus far.

I have found that if I use a tool often enough I will get around to making improvements to it now and then, otherwise it will just be yet another one of my unfinished projects that is just the core idea up and running and that is it.