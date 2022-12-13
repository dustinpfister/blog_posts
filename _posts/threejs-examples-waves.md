---
title: A waves example using javaScript and threejs
date: 2018-11-14 16:45:00
tags: [three.js]
layout: post
categories: three.js
id: 331
updated: 2022-12-13 13:28:14
version: 1.29
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

## 1 - The wave module example and demo \( r0 \)

In this section I will be writing about the first revision of this threejs project example, as well as a single demo of it in action.

### The Wave module

The wave module example I made involves a helper method that can be used to create, or update geometry, buffered geometry, or just about anything by making the helper a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function). This method accepts another method as one of the arguments that is passed the x,y,and z values for each point that will compose the vertices of the wave. I then use this method in conjunction with others to help make an update the geometry of the wave. The wave grid helper method that accepts a method that can then be used to define what to do for each point in the grid of points. I use this to create an instance of buffer geometry and again later to update it in a loop.

I have a method that makes use of my waveGrid helper method to go about making the initial state of the buffered geometry that I will then be updating later on with the update method that I will be getting to soon. The basic idea here is that I am just creating the initial size and state of the geometry, which will end up being a fixed static thing in terms of the count of points. The update method later on just needs to be used to update this position of these points it does not need to add or delete them, which can not really be done with a geometry because it is buffer geometry after all. A buffer is often a fixed thing once it is created in other words.

I again use my waveGrid method to update points by just using the for point option of the wave grid method. I just need to set the desired values for x, y, and z for all points in the geometry. When calling this method I will want to pass a percent value as a second argument after passing the instance of points as the first method. More on this later when I use it in the main update loop of this example when it comes to how to go about getting that percent value.

```js
// waves - r0 - from threejs-examples-waves
(function (api) {
    // Wave grid helper
    const waveGrid = function (opt) {
        opt = opt || {};
        opt.width = opt.width || 30;
        opt.depth = opt.depth || 30;
        opt.height = opt.height || 2;
        opt.forPoint = opt.forPoint || function () {};
        opt.context = opt.context || opt;
        opt.xStep = opt.xStep || 0.075;
        opt.yStep = opt.yStep || 0.1;
        opt.zStep = opt.zStep || 0.075;
        opt.waveOffset = opt.waveOffset === undefined ? 0 : opt.waveOffset;
        const points = [];
        let radPer,
        x = 0,
        i = 0,
        y,
        z;
        // points
        while (x < opt.width) {
            z = 0;
            while (z < opt.depth) {
                // radian percent
                radPer = (z / opt.depth + (1 / opt.width * x) + opt.waveOffset) % 1;
                // y value of point
                y = Math.cos(Math.PI * 4 * radPer) * opt.height;
                // call forPoint
                opt.forPoint.call(opt.context, x * opt.xStep, y * opt.yStep, z * opt.zStep, i);
                // step z, and point index
                z += 1;
                i += 3;
            }
            x += 1;
        };
    };
    // make a points mesh
    api.create = function (opt) {
        opt = opt || {};
        const geometry = new THREE.BufferGeometry();
        const points = [];
        opt.forPoint = function (x, y, z, i) {
            points.push(x, y, z);
        };
        waveGrid(opt);
        const vertices = new Float32Array(points);
        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        return new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .125,
                color: new THREE.Color(0.0, 0.25, 0.25)
            }));
    };
    // update points
    api.update = function (points, per, opt) {
        opt = opt || {};
        const position = points.geometry.getAttribute('position');
        opt.waveOffset = per;
        opt.forPoint = function (x, y, z, i) {
            position.array[i] = x - 0;
            position.array[i + 1] = y;
            position.array[i + 2] = z - 0;
        };
        // update points
        waveGrid(opt);
        position.needsUpdate = true;
    };
}( this['waveMod'] = {} ));
```


### 1.1 - Get it going with a basic demo of the module

So now it is time to get this all working with the usual scene, camera, renderer, and animation loop function that I often do in examples like this. After setting up the renderer and scene object I just use my makePoints helper to make the instance of a Points mesh that makes use of my geometry, and the Points material. I then set up a camera, and then I have some values for my main app loop function that will be using request animation frame.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.001, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// POINTS
//-------- ----------
const w = 30, h = 30;
const tw = 4, th = 4;
const opt_waves = {
   width: w,
   depth: h,
   xStep: tw / w,
   zStep: th / h
};
const points = waveMod.create(opt_waves);
points.position.set(tw / 2 * -1, 0, th / 2 * -1);
scene.add(points);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // calling update method
        waveMod.update(points, per * 8 % 1, opt_waves);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

The result of this up and running is then a bunch of dots in the canvas moving up and down in a wave like pattern, I am also doing a number of other things in this example that have to do with many other note worthy features of three.js. For example I wanted to do something that involves moving the camera around by making use of the position and rotation properties as well as the look at method of the camera all of which are methods and properties of the base class known as Object3d.

## Conclusion

This example proved to be a nice little example on something that was kind of fun to work out. It has been done before many times, but when it comes to making some kind of real project that is some kind of animation doing something to this effect might prove to be part of the process.

So far all of my real examples are often just making crude yet effective low poly models consisting of just grouping together a bunch of box geometries in mesh objects together. So it is nice to work out something where I am coming up with my own custom little thing with geometry and then using that.

