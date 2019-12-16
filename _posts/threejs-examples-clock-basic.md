---
title: A Three js example of a basic clock
date: 2019-12-16 14:10:00
tags: [three.js]
layout: post
categories: three.js
id: 581
updated: 2019-12-16 18:16:51
version: 1.10
---

I feel as though I need to work on things that are fun now and then with javaScript at least once in a while, otherwise I will end up hating what I love. With that being said threejs is certainly a fun frameworks, and also I often find myself making clocks because they are a quick yet fun thing to make with javaScript and canvas. So then todays post will be on a threejs example that is a javaScript powered basic clock.

<!-- more -->

## 1 - This is a threejs example

This is a post on a three.js example of a basic analog clock using revision number r111 of threejs. This is not a getting started post on threejs, canvas, or javaScript in general so I assume that you have at least some background with these topics.

## 2 - The clock.js module

Whenever I make a clock using javaScript I work out a basic module that has to do with creating an object that contains properties that are used to render the current view of the clock. This module can be just a collection of methods, and that is often how I make them.

### 2.1 - The cerate face points method

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

### 2.2 - Create hand points
 
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

### 2.3 - The get clock object method

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

## 3 - The main.js file

So now that I have my clock.js module I can not work out some methods that make used of threejs to create groups of cubes for a face of a clock as well has hands on the clock.

### 3.1 - Create the face cubes

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

### 3.2 - Create the hand cubes

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

### 3.3 - The rest of the threejs example

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