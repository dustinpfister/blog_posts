---
title: Inverting the normals of a sphere threejs example
date: 2022-05-31 14:05:00
tags: [three.js]
layout: post
categories: three.js
id: 990
updated: 2022-05-31 15:15:15
version: 1.4
---

As of late I have been editing some of my older threejs content and have got around to my post on [cube textures](/2018/04/22/threejs-cube-texture/) which in turn put me in the direction of exploring this topic and related topics. The process of just adding a cube texture to a scene is one thing, but the process of creating textures to use with a cube texture is a whole other matter. Thus far I have not found a sound way to go about creating these kinds of textures from a resource image because doing so is a little involved and I have a lot of pots boiling. There are a lot of issues that come up when trying to make one, for one thing I need to start with a texture that is seamless in all directions and on top of that I need to have a way to mutate the state of the texture so that It does not look like I am in inside a cube. While I look into the subject of aiming these kinds of textures though the thought occurred that there should be more than one way to go about doing this sort of thing, such as having a sphere and inverting the normals, then making a texture to use with the inner surface of this sphere. This is then a post on a [threejs example](/2021/02/19/threejs-examples/) in which I am doing this as an alternative way of making a kind of cube texture.

<!-- more -->
