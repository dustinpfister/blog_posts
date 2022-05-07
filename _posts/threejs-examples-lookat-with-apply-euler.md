---
title: Object3d lookAt and Vector3 apply Euler methods threejs example
date: 2022-05-06 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 984
updated: 2022-05-07 11:16:46
version: 1.2
---

For todays post on a [threejs example](/2021/02/19/threejs-examples/) I wanted to make a quick project that has to do with how the [lookAt method of the object3d class](/2021/05/13/threejs-object3d-lookat/) is not always a kind of golden hammer kind of solution when it comes to setting the orientation of an object, or in this case a group of objects. For the most part that method works well, and is very easy to use, I just call the method off of the object that is based off of object3d, typically a camera, but it can be any other object3d based object, and pass the position that I want the object to look at.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/jLvd_e_uBLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
