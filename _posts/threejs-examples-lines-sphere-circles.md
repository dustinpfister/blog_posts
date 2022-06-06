---
title: Sphere circles Lines threejs example
date: 2022-06-03 16:16:00
tags: [three.js]
layout: post
categories: three.js
id: 991
updated: 2022-06-06 12:36:28
version: 1.12
---

When it comes to making lines in threejs I wanted to make a [threejs example](/2021/02/19/threejs-examples/) in which I have a collection of lines that form a sphere like shape. So the general idea is to make a javaScript module that has a create method that will return a group of lines, where each line is one circle that forms something that will look like a sphere. I can then also add a method that can be used to update the state of this group of lines with a new set of options as a way to make various kinds of animations.

<!-- more -->

## Sphere Circle Lines threejs example and what to know first

This is a post on some javaScript code built on top of the library known as threejs that has to do with making a collection of lines that look like a sphere. This is one of my many threejs project examples that I have made thus far that is for developers that have a fair amount of experience with javaScript and threejs and are now looking into ideas for projects. This is then not a post for people that are still fairly new with threejs, and as such I will not be getting into basic things that you should know about at this point. However in this section I will be going over a few things you might want to read up more on that are related to what I am doing here.

### Read up more on the THREE.Line constructor

In this example I am creating an instance of THREE.Group and adding a bunch of Lines as children for this group. The [THREE.Line object](/2018/04/19/threejs-line/) is one of several alternative options to the usual [THREE.Mesh object](/2018/05/04/threejs-mesh/) when it comes to adding objects to a scene that contain some kind of content.

### Check out Buffer geometry and Vector3 classes

In this example I am creating an array of [Vector3 class](/2018/04/15/threejs-vector3/) instances and then passing this array to the set from points method of the [buffer geometry class](/2021/04/22/threejs-buffer-geometry/) as a way to create a geometry. I am then passing the resulting geometry along with a line material as arguments of the three line constructor. So then there is taking a moment tot read up more on the buffer geometry class as well as the Vetor3 class if yo have not done so before hand. There are a lot of useful methods in the buffer geometry class such as this set from points method, and the Vector3 class also has a lot of great stuff to work with when it comes to playing around with vectors.

### The source code is also on Github

The source code examples that I am writing about in this post can also be found in [my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lines-sphere-circles).

### Version Numbers matter

I was using r135 when I first wrote this post.


## 1 - Getting the general idea working first

When I started a new prototype folder in which to just get the basic idea of what I wanted working I had everything in just one javaScript file which is often the case when first starting out with one of these ideas. In this single javaScript file I create my usual scene object, camera, renderer and so forth, but the main thing of interest are the methods that I made to create an array or points, and a group of lines where each line if a collection of these points.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES
//******** **********
// just create one circle for a set of circles that form a sphere like shape
// createSphereCirclePoints(maxRadius, circleCount, circleIndex, pointsPerCircle)
var createSphereCirclePoints = function(maxRadius, circleCount, circleIndex, pointsPerCircle){
    var points = [];
    var sPer = circleIndex / circleCount;
    var radius = Math.sin( Math.PI * 1.0 * sPer ) * maxRadius;
    var y = Math.cos( Math.PI * 1.0 * sPer ) * maxRadius;
    var i = 0;
    // buch points for the current circle
    while(i < pointsPerCircle){
        // might want to subtract 1 or 0 for this cPer expression
        var cPer =  i / ( pointsPerCircle - 1 );
        var radian = Math.PI * 2 * cPer;
        var v = new THREE.Vector3();
        v.x = Math.cos(radian) * radius;
        v.y = y;
        v.z = Math.sin(radian) * radius;
        points.push( v.clone().normalize().multiplyScalar(maxRadius) );
        i += 1;
    }
    return points;
};
// create sphere Lines helper
var createSphereLines = function(maxRadius, circleCount, pointsPerCircle, randomDelta, colors){
    colors = colors || [0xff0000,0x00ff00,0x0000ff]
    var lines = new THREE.Group();
    var i = 1;
    while(i < circleCount + 1){
        var p = createSphereCirclePoints(maxRadius, circleCount + 1, i, pointsPerCircle, randomDelta);
        var geometry = new THREE.BufferGeometry().setFromPoints( p);
        var line = scene.userData.line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: colors[i % colors.length],
                linewidth: 4
            })
        );
        lines.add(line);
        i += 1;
    };
    return lines;
};
var g = createSphereLines(5, 20, 50, 1.0, [0x00ffff, 0x008800, 0x008888, 0x00ff00]);
scene.add(g);
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## Conclusion

I was able to get the general idea of what i wanted up and running, but there is maybe a bit more to think about when it comes to the idea of working on this more, or maybe starting some other kind of project that has to do with lines. I was thinking that this project was a nice start with it comes to making something interesting just using the THREE.Line constructor in threejs, but maybe it is called for to make another project based on this example but in a more general kind of way. That is to make a project where the goal is to make a javaScript module that I can use to create a group of lines, but not just lines that form a circle.