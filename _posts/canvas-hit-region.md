---
title: Hit region and html 5 canvas
date: 2019-12-01 14:20:00
tags: [js, canvas]
layout: post
categories: canvas
id: 573
updated: 2019-12-01 14:28:13
version: 1.0
---

There is the possibly of a new [hit region](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility) api in canvas that can be used as a way to define additional interactivity for objects that are drawn in a canvas. As of this writing there is very poor browser support for this, in fact it does not seem to work at all in any browser that I use at least.

Still I though that I should write a post on this subject, and also on hit detection in general in canvas projects. So this post will not be on the hit region api that much, but it will be on bounding box collision detection in a vanilla javaScript canvas project. A subject that will come up often in many such projects.

<!-- more -->

