---
title: Cubic Bezier Curves in threejs
date: 2023-02-10 09:37:00
tags: [three.js]
layout: post
categories: three.js
id: 1027
updated: 2023-02-10 11:08:56
version: 1.1
---

I would like to expand more on the use of curves in threejs and maybe part of doing that will involve taking another look at what there is to work with when it comes to built in options with curves. I have all [ready wrote a blog post on the THREE.QuadraticBezierCurve3 class](/2022/10/21/threejs-curve-quadratic-bezier-curve3) so for this post I will be writing about a few quick examples using the [THREE.CubicBezierCurve3](https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve3) class. Both of these options are built on top of [the base Curve class](https://threejs.org/docs/#api/en/extras/core/Curve) of course, so in any case there are Curve class prototype methods that are very useful such as the get point method. However one thing that is nice about this Cubic Bezier Curve Class is that it will allow for two control points rather than just one. This might be one of the major reasons why I see a lot of developers choosing the Cubic option over Quadratic as this will allow for a greater degree of flexibility when creating curves for a project.

<!-- more -->

## The Cubic Bezier Curve class in threejs and what to know before continuing

In this blog post I am writing about one of the built in options for creating an object that extends the base curve class of threejs. There is a whole lot of other ground to cover when it comes to things like the other options for built in curves, cretaing custom curves, features of the base curve class and so forth. Of course there is also a whole lot to be aware of when it comes to threejs in general as well as all the various other skills that are required on top of that when it comes to javaScript and client side web devlopement in general. I assume that you have at least a little expernce with these subjects, I have a whole lot of other [getting started type posts with threejs](/2018/04/04/threejs-getting-started/) and [javaScript](/2018/11/27/js-getting-started/) and do not which to pad this post with content that should be parked in such a post. Still I do lik to always have an opening section at the top here where I write about a few things that you might want to also read up on that are closley related to the over all content of this post on Cubic Bezier Curves in threejs.

### Check out the base Curve class in detail if you have not done so.

The [base curve class](/2022/06/17/threejs-curve/) is packed with a bunch of useful methods and features that one should be aware of before getting into what the built in options are that extend the class. There are methods like that get points method that will return an array of Vector3 objects. There is also an option for just getting a single point along the line of a curve as well.

### Source code is also up on Github

### Version Numbers matter

When I first wrote this blog post I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r146), and there are a lot of good reasons why I was still using that revision of threejs over later verions that out at the time of this writing. There are a lot of code breaking changes that have happend and will continue to happen moving forward. If you are uisng a bleading edge revision of threejs and also need to use JSM over plain old javaScript tags I can tell you now that these code exampels will break. It will not take much to fix that mind you but at the time of this writing I have not yet started updating my content to JSM code style syntax. Although I [do have plans to do so for r150+](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r150) at this time.

## 1 - Basic examples of the THREE.CubicBezierCurve3 class

To kick things off as always I will be startng out this post with a few real quick hello world type examples before getting into subjects that might prove to be a little more advanced. These examples are not just for pelple that are new to threejs mind you, I have years of experce at thius point and often I do still like to be able to quickly grab at a simple, clean starting point with things.

## Conclusion

So it looks like over all this Cubic Bezier Curve class is a great built in option for quickly making curve objects in threejs for the sake of defning a path by which objects will follow. However there are a whole lot of other [use case examples for curves such as using them as a tool in the process of creating custom geometry](/2022/12/16/threejs-curve-geometry-from).