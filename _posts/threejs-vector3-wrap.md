---
title: Wrapping a vector3 instance in threejs
date: 2022-09-02 07:09:00
tags: [three.js]
layout: post
categories: three.js
id: 1003
updated: 2022-09-02 07:18:02
version: 1.0
---

Often I might be in a situation in which I would like to apply some kind of rules for Vector3 class instances that have to do with boundaries or limitations in terms of the possible range of values. In the past I have wrote one blog post on the clamp method of the Vector3 class, and that is one way to go about applying limitations. That is that when a vector goes out of a set range it will be clamped to a value that is within the range, and do so in a box kind of area as it is used by passing two vector3 class instances that define the lowermost and uppermost corners of the box. In that post I also wrote about the clamp length method that works by giving number values that define a min and max vector unit length. This is yet another option that works well, but then both work by clamping values rather than wrapping values. That is that some times when a Vector3 instance goes out of range I might not want to clamp it, but wrap it around to an opposite side of an area.

I covered the idea of wrapping rather than clamping in my older blog post on the clamp method, but I am thinking that this is a topic that does also deserve a content piece of its own as well. So today I will be writing about a few quick source code examples that have ti do with wrapping Vector3 class instances rather than clamping them.

<!-- more -->
