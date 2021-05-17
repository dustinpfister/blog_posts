---
title: A Three js example making waves for the first time
date: 2018-11-14 16:45:00
tags: [js,three.js]
layout: post
categories: three.js
id: 331
updated: 2021-05-17 16:02:21
version: 1.22
---

So I wanted to start making some posts on [three.js examples](/2021/02/19/threejs-examples/), rather that the usual posts on just simple examples of certain basic things here and there, and one of the first ideas that came to mind was to make a waves example. In this post I will be writing about a helper method that I made that can be used to create an instance of buffered geometry that is a set of points that move in a wave like pattern.

So this threejs example might be a good starting point when it comes to figuring out how to go about creating a custom geometry with a little javaScript code, and also how to work with the Buffer Geometry constructor. In this example I am just creating the points of a geometry though, so I will be using the THREE.Points constructor and the points material rather than the usual mesh constructor.

<!-- more -->

## 1 - This is a three.js example

This is a post on a three.js example where I made some waves. In this example I am just using the Points material, as in this example I only have points set out for the buffered geometry that I am using. As such it would be a good idea to get up to speed with the [Points material](/2018/05/12/threejs-points-material/), and buffered geometry if you have not done so before hand. This is also a more advanced post on three.js, if you are new to three.js you might want to look at my [getting started post on three.js](/2018/04/04/threejs-getting-started/) first.

### 1.1 - version numbers matter

When working out this example for the first time I was using revision 98 of three.js, and the last time I can around to do some editing on this post I have found that this example still works okay on revision 127. Threejs is a library that is a very fast moving target when it comes to development, it seems like to new revision is coming out every few months. If the code here breaks the first thing that you should check is the version number, because this was working for me when it comes to the version of threejs that I was using at the time.

### 1.2 - Might want to read up more on buffer geometry in general

In this post I am using the Buffer Geometry constructor to create a collection of points that will be moving up and down in a wave like pattern. I have a [post in which I have gone over the buffer geometry constructor](/2021/04/22/threejs-buffer-geometry/) in general, but as of this writing it might be a good idea to look that the [how to update things](https://threejs.org/docs/#manual/en/introduction/How-to-update-things) section of the three.js website, as well as the [official docs on buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry).

## 2 - The wave Example

The wave example I made involves a helper method that can be used to create, or update geometry, buffered geometry, or just about anything by making the helper a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function). This method accepts another method as one of the arguments that is passed the x,y,and z values for each point that will compose the vertices of the wave. I then use this method in conjunction with others to help make an update the geometry of the wave.

### 2.1 - The waveGrid helper

Here is the wave grid helper method that accepts a method that I can use to define what to do for each point in the grid of points. I use this to create an instance of buffer geometry and again later to update it in a loop.

```js
    // Wave grid helper
    var waveGrid = function (opt) {
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
        var points = [],
        radPer,
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
```

### 2.2 -Make Points helper

Here I have a method that makes use of my waveGrid method to go about making the initial state of the buffered geometry that I will then be updating later on with the update points method that I will be getting to soon. The basic idea here is that I am just creating the initial size and state of the geometry, which will end up being a fixed static thing in terms of the count of points. The update method later on just needs to be used to update this position of these points it does not need to add or delete them, which can not really be done with a geometry because it is buffer geometry after all. A buffer is often a fixed thing once it is created in other words.

```js
    // make a points mesh
    var makePoints = function () {
        var geometry = new THREE.BufferGeometry();
        var points = [],
        opt = {};
        opt.forPoint = function (x, y, z, i) {
            points.push(x, y, z);
        };
        waveGrid(opt);
        var vertices = new Float32Array(points);
        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        return new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .125,
                color: new THREE.Color(0.0, 0.25, 0.25)
            }));
    };
```

### 2.3 - Update Points

I again use my waveGrid method to update points by just using the for point option of the wave grid method. I just need to set the desired values for x, y, and z for all points in the geometry. When calling this method I will want to pass a percent value as a second argument after passing the instance of points as the first method. More on this later when I use it in the main update loop of this example when it comes to how to go about getting that percent value.

```js
    // update points
    var updatePoints = function (points, per) {
        var position = points.geometry.getAttribute('position');
        // update points
        waveGrid({
            waveOffset: per,
            xStep: 0.125,
            zStep: 0.125,
            forPoint: function (x, y, z, i) {
                position.array[i] = x - 2;
                position.array[i + 1] = y - 2;
                position.array[i + 2] = z - 2;
            }
        });
        position.needsUpdate = true;
    }
```

### 2.4 - Get it going

So now it is time to get this all working with the usual scene, camera, renderer, and animation loop function that I often do in examples like this. After setting up the renderer and scene object I just use my makePoints helper to make the instance of a Points mesh that makes use of my geometry, and the Points material. I then set up a camera, and then I have some values for my main app loop function that will be using request animation frame.

```js
    // RENDER
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // SCENE
    var scene = new THREE.Scene();
    var fogColor = new THREE.Color(1.0, 0.25, 0.0);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.3);
 
    // POINTS
    var points = makePoints();
    scene.add(points);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, .001, 1000);
 
    // position of points an camera
    points.position.set(0, 2.5, 0);
    camera.position.set(2.5, 2.5, 2.5);
 
    // LOOP
    var frame = 0,
    maxFrame = 300,
    lt = new Date(),
    fps = 30,
    loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
 
        requestAnimationFrame(loop);
 
        if (secs > 1 / fps) {
            updatePoints(points, per * 8 % 1);
            var d = 0.5 + 2.5 * (1 - bias);
            camera.position.set(d, 2.5, d);
            camera.lookAt(-10, -10, -10);
            camera.rotation.z = Math.PI * 2 * per;
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
 
    loop();
```

## 3 - Conclusion

This example proved to be a nice little example on something that was kind of fun to work out. It has been done before many times, but when it comes to making some kind of real project that is some kind of animation doing something to this effect might prove to be part of the process.

So far all of my real examples are often just making crude yet effective low poly models consisting of just grouping together a bunch of box geometries in mesh objects together. So it is nice to work out something where I am coming up with my own custom little thing with geometry and then using that.