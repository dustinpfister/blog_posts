---
title: A waves example using javaScript and threejs
date: 2018-11-14 16:45:00
tags: [three.js]
layout: post
categories: three.js
id: 331
updated: 2022-12-13 13:18:27
version: 1.28
---

So I wanted to start making some posts on [threejs examples](/2021/02/19/threejs-examples/), rather that the usual posts on certain basic things here and there with just the core of what threejs alone is. One of the first ideas that came to mind was to make a waves example where I create an update a buffer geometry based on something like Math.cos. 

In this post I will be writing about a module that makes use of a helper method that I made that can be used to create, or update an instance of [buffered geometry](/2021/04/22/threejs-buffer-geometry/) that is a set of points that move in a wave like pattern. This buffer geometry instance can then be used with an instance of the THREE.Points constructor rather than the usual THREE.Mesh constructor, and when doing so it is just the position attribute of the buffer geometry instance that I need to worry about. At least that is what the plan was for the first version of this example, as I now have plans to create a revised revision of this module that will also work with mesh objects.

So this threejs example might be a good starting point when it comes to figuring out how to go about creating a custom geometry with a little javaScript code, and also how to work with the Buffer Geometry constructor. There is a whole lot to cover when it comes to this sort of thing, but I would say that the first step is to know how to create and update the position attribute of a buffer geometry and this will be the main focus of this example here.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/7vrx8646Y7s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The waves threejs example and what to know before you begin

This is a post on a threejs example where I made some waves in the form of a basic custom geometry. This is a more advanced post on threejs, if you are new to threejs you might want to look at my [getting started post on three.js](/2018/04/04/threejs-getting-started/) first. I will not get into the basics here of course, but I do like to write about at least a few things to maybe read more about in this first section.

### Check out Points and the Points material

When it comes to the first revision of the wave module I am just using the Points material, as in this example I only have points set out for the buffered geometry that I am using. As such it would be a good idea to get up to speed with the [Points material](/2018/05/12/threejs-points-material/), and buffered geometry if you have not done so before hand. 

### Might want to read up more on buffer geometry in general

In this post I am using the Buffer Geometry constructor to create a collection of points that will be moving up and down in a wave like pattern. I have a [post in which I have gone over the buffer geometry constructor](/2021/04/22/threejs-buffer-geometry/) in general, but as of this writing it might be a good idea to look that the [how to update things](https://threejs.org/docs/#manual/en/introduction/How-to-update-things) section of the threejs website. There is also looking at the [official docs on buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) on top of that.

### Source code is also up on Github

The source code examples that I write about here can also be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-waves).

### Version numbers matter

When working out this example for the first time I was using revision 98 of threejs, and the last time I can around to do some editing on this post I have updated all the examples to work well with r146. Threejs is a library that is a very fast moving target when it comes to development, it seems like to new revision is coming out every few months. If the code here breaks the first thing that you should check is the version number, because this was working for me when it comes to the version of threejs that I was using at the time.

## 1 - The wave Example

The wave example I made involves a helper method that can be used to create, or update geometry, buffered geometry, or just about anything by making the helper a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function). This method accepts another method as one of the arguments that is passed the x,y,and z values for each point that will compose the vertices of the wave. I then use this method in conjunction with others to help make an update the geometry of the wave.

Here is the wave grid helper method that accepts a method that I can use to define what to do for each point in the grid of points. I use this to create an instance of buffer geometry and again later to update it in a loop.

Here I have a method that makes use of my waveGrid method to go about making the initial state of the buffered geometry that I will then be updating later on with the update points method that I will be getting to soon. The basic idea here is that I am just creating the initial size and state of the geometry, which will end up being a fixed static thing in terms of the count of points. The update method later on just needs to be used to update this position of these points it does not need to add or delete them, which can not really be done with a geometry because it is buffer geometry after all. A buffer is often a fixed thing once it is created in other words.

I again use my waveGrid method to update points by just using the for point option of the wave grid method. I just need to set the desired values for x, y, and z for all points in the geometry. When calling this method I will want to pass a percent value as a second argument after passing the instance of points as the first method. More on this later when I use it in the main update loop of this example when it comes to how to go about getting that percent value.

```js
```


### 1.1 - Get it going with a basic demo of the module

So now it is time to get this all working with the usual scene, camera, renderer, and animation loop function that I often do in examples like this. After setting up the renderer and scene object I just use my makePoints helper to make the instance of a Points mesh that makes use of my geometry, and the Points material. I then set up a camera, and then I have some values for my main app loop function that will be using request animation frame.

```js
```

The result of this up and running is then a bunch of dots in the canvas moving up and down in a wave like pattern, I am also doing a number of other things in this example that have to do with many other note worthy features of three.js. For example I wanted to do something that involves moving the camera around by making use of the position and rotation properties as well as the look at method of the camera all of which are methods and properties of the base class known as Object3d.

## Conclusion

This example proved to be a nice little example on something that was kind of fun to work out. It has been done before many times, but when it comes to making some kind of real project that is some kind of animation doing something to this effect might prove to be part of the process.

So far all of my real examples are often just making crude yet effective low poly models consisting of just grouping together a bunch of box geometries in mesh objects together. So it is nice to work out something where I am coming up with my own custom little thing with geometry and then using that.

