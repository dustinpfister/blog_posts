---
title: A Three js example of a basic clock
date: 2019-12-16 14:10:00
tags: [three.js]
layout: post
categories: three.js
id: 581
updated: 2022-12-06 12:10:43
version: 1.32
---

[Threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) is certainly an example of fun and exciting javaScript. Sure there might prove to be many examples of practical application of threejs to write about as well, however I often see it more as something to play with when it comes to making simple animations, games, and toy like projects. 

I often find myself making clocks because they are a quick yet fun thing to make with javaScript and canvas elements. However there is a great deal of room for creativity when it comes to this kind of project as well if I do take a moment to pour some serious time into one of them. However for the sake of this post at least I think I will be starting out with just a basic example of a clock using threejs. With that said this post will be on a [threejs example](/2021/02/19/threejs-examples/) that is a javaScript powered basic clock which should prove to be a simple fun little project.

This is an example type post in which I am making a threejs project where things are updated by way of the local client system time. This is then not to be confused with the [THREE.Clock](/2021/05/28/threejs-clock) constructor which is a class that can be used to keep track of time that has elapsed from a starting point. This Clock class often comes into play when making a main animation loop, which is something that is kind of a whole other subject apart from this.

<!-- more -->

## This is a threejs example

This is a post on a three.js example of a basic analog clock using threejs and a little additional javaScript code on top of the use of this library. This is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/), [canvas](/2017/05/17/canvas-getting-started/), or [javaScript in general](/2018/11/27/js-getting-started/) so I assume that you have at least some background with these topics. I will however be going over at least a few basic points when it comes to things that you should know, or refresh on a little before getting into reading the rest of this post.

## Source code is also up on Github

The source code that I am writing about here [can also be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-clock-basic). This is also where I park the source code for my [many other posts on threejs as well](/categories/three-js/).

### version numbers matter

When I first wrote this post I was using three.js version r111. The last time I came around to test out that this example is still working, and do a little editing, I was using r146 of threejs. Between those two version numbers there have been a lot major changes, however none of them seem to have effected anything with this basic clock example at least.

## 1 - The clock.js module

Whenever I make a clock using javaScript I work out a basic module that has to do with creating an object that contains properties that are used to render the current view of the clock. This module can be just a collection of methods, and that is often how I make them.

### 1.1 - The cerate face points method

I started out making the clock.js file of this threejs example by just having an object literal. this module will just be a bunch of public methods so this kind of module design will work okay. I then created a method that I can use to create an array of 3d points that will be the points at which I will place a bunch of cubes that will at as marks for each hour there is in a day.

```js
var clock = {};
 
clock.createFacePoints = function (cx, cy, cz, radius) {
    cx = cx || 0;
    cy = cy || 0;
    cz = cz || 0;
    radius = radius || 10;
    var faceMarks = [],
    marks = 12,
    i = 0,
    x,
    y,
    z;
    while (i < marks) {
        rad = Math.PI * 2 / marks * i;
        x = Math.cos(rad) * radius + cx;
        y = Math.sin(rad) * radius + cy;
        z = cz;
        faceMarks.push([x, y, z]);
        i += 1;
    }
    return faceMarks;
};
```

### 1.2 - Create hand points
 
I also have a method like that of my create face points method, only this one can be used to create and update the points for each cube that will be a hand of sorts on the surface of the clock.

```js
// create hand points array using given clockObj, origin, and radius
clock.createHandPoints = function (clockObj, cx, cy, cz, radius) {
    cx = cx || 0;
    cy = cy || 0;
    cz = cz || 0;
    radius = radius || 10;
    return 'sec,min,hour'.split(',').map(function (tUnit, i) {
        var per = clockObj[tUnit + 'Per'] || 0,
        rad = Math.PI * 2 * per * -1 + Math.PI / 2,
        x = Math.cos(rad) * (radius - (i * 2 + 2)) + cx,
        y = Math.sin(rad) * (radius - (i * 2 + 2)) + cy,
        z = cz;
        return [x,y,z];
    });
};
```

### 1.3 - The get clock object method

Each clock.js file that I make for this kind of project has a method that can be used to create a clock object of sorts. This object has all kinds of properties that can then be passed to my other clock module methods.

```js
// get a clock object for the give date
clock.get = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = c.now.getTime();
    c.secPer = c.now.getMilliseconds() / 1000;
    c.minPer = c.now.getSeconds() / 60;
    c.hourPer = c.now.getMinutes() / 60;
    var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0, 0);
    c.dayPer = (c.now - dayStart) / 86400000;
    return c;
};
```

## 2 - The main.js file

So now that I have my clock.js module I can now work out some methods that make used of threejs to create groups of cubes for a face of a clock as well has hands on the clock. In this section then I will be writing about the rest of the javaScript code for this example that I have in one traditional main.js javaScript file. Here I have methods that create and update mesh objects, and have all the usual suspects when  it comes to a scene object, camera, and so forth.

### 2.1 - Create the face cubes

Here I have a method the creates and returns a THREEJS Group of cubes one for each hour of the day. I am using the clock create face points method to get the points of interest.

```js
// create a THREE.Group of face marks for each hour
var createFaceCubes = function (material) {
    var group = new THREE.Group();
    clock.createFacePoints(0, 0, 0, 10).map(function (facePoints) {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        cube.position.set(facePoints[0], facePoints[1], facePoints[2]);
        cube.lookAt(0, 0, 0);
        group.add(cube);
        return cube;
    });
    return group;
};
```

### 2.2 - Create the hand cubes

I also have a methods the creates cubes for each hand of the clock. This method works a little differently as it returns an api of sorts. The group that is added to the scene is one of the properties of the api, and there there is also an update method of the api. The update method accepts a clock object created with my clock modules get method, and that is then what is used to update the children of the group of cubes that represent the hands of the clock.

```js
// create hand cubes
createHandCubes = function (material) {
    var group = new THREE.Group();
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material))
    var update = function (clockObj) {
        clockObj = clockObj || clock.get();
        clock.createHandPoints(clockObj, 0, 0, 0, 10).forEach(function (point, i) {
            var cube = group.children[i];
            cube.position.set(point[0], point[1], point[2]);
        });
    };
    update();
    return {
        group: group,
        update: update
    }
};
```

### 2.3 - The rest of the threejs example

I then have the rest of the code of this threejs example that contains the usual suspects from any other three.js project example. Here I create the scene, camera, and renderer just as with any other three.js example. However here I am of course using the create hand cubes method to create the mesh objects that will serve as the hands of the clock, and of course I am updating the values of those method objects in a main animation loop in which I am passing the current system time as a time to use to the the values of them.

```js
// the demo
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
var materials = [
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    }),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })];
 
// position and rotate camera
camera.position.set(11, 11, 11);
camera.lookAt(0, 0, 0);
renderer.setSize(320, 240);
 
// create and add face cubes
scene.add(createFaceCubes(materials[0]));
 
// create hands
var hands = createHandCubes(materials[1]);
scene.add(hands.group);
 
// loop
var loop = function () {
    hands.update(clock.get(new Date()));
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

## Conclusion

This basic clock example was a good start at least when it comes to making this kind of project with three.js, but I think that there is still a great deal more work to do even when it comes to making a simple clock example such as this. Still I think there the basic idea of what I hand in mind is there, I like to have a simple module that i can use to create and update some values that I can then use to set or change the position of some mesh objects.

