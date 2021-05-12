---
title: Get an Object by name not id in three.js
date: 2021-05-12 11:44:00
tags: [three.js]
layout: post
categories: three.js
id: 865
updated: 2021-05-12 12:12:10
version: 1.7
---

When it comes to getting a reference to a mesh object in three.js things are not the same as what I have become accustomed to when it comes to working with the Document Object Model. When it comes to html elements there is setting an id to an element, and then having the option to get a reference to that element by id later in a body of javaScript code. When it comes to the Object3d class in three.js there is an id property of each object3d instance, however I have found that this is something that I should not mess around with when it comes to setting my own id strings for mesh objects, groups, cameras and anything based off of object3d. There is another property of Object3d that I can set to what I want, and that is the name property of the Object3d class. There is then the get object by name method of the object3d class that I can then use as a way to get an object in three.js that has a set name for it.

<!-- more -->

## 1 - Object3d name property, and learning the basics first

This is a post on the name property of the object3d class in three.js that is an empty string by default, but can be used to set a unique value that will act as a way to get a reference to the object at a later point in a body of javaScript code. This is an advanced post on three.js where I am just writing about one little property and some corresponding prototype method in the object3d class. I will not be getting into detail about the object3d class and everything that it is based off of in this post. It should also go without saying that I will not be getting into the basics of creating a three.js project in general also, and assume that you have at least some background working with this javaScript library.

### - 1.1 Version Numbers are a big deal with three.js

When I wrote this post I was using three.js revision r127 of three.js which was a late version of three.js at the time that I first wrote this post in May of 2021. In the future code breaking changes might be made that will case these code examples to no longer work, and such changes might happen sooner rather than later as three.js is a project that is moving fairly fast when it comes to development.

## 2 - Basic get by name example

So then I should start off with a basic getting started type example with the name property and the get by name method of the object3d class.

```js
// creating a group
var group = new THREE.Group();
group.name = 'boxGroup';
// adding two boxes to the group with names
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, 0);
box.name = 'box1';
group.add(box);
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(-2, 0, 0);
box.name = 'box2';
group.add(box);

// box helper
group.add(new THREE.BoxHelper(group));
group.position.set(0, 0, 0);

// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
scene.add(group);

// GETTING BOX1 BY THE NAME
var box = group.getObjectByName('box1');
box.rotation.set(Math.PI / 180 * 45, 0, 0);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Using get by name for a group of mesh objects

Now that I have the basic idea of what the name property is used for it is time t move into making a more complex example where I am using the name property and the get by name property to get at specific objects and change there properties to desired values.

```js
// creating a group
var createBoxGroup = function(count){
    var group = new THREE.Group();
    group.name = 'boxGroup';
    var i = 0,
    box,
    len = count;
    while(i < len){
        box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        box.name = 'box_' + i;
        group.add(box);
        i += 1;
    }
    return group;
};
// set group of box objects into a circular position
var toCircleGroup = function(boxGroup, radianAdjust){
    // RADIAN ADJUST SET TO MATH.PI * 0.5 BY DEFAULT
    radianAdjust = radianAdjust === undefined ? Math.PI * 0.5 : radianAdjust;
    var len = boxGroup.children.length;
    boxGroup.children.forEach(function(box, i){
        var radian = Math.PI * 2 / len * i + radianAdjust,
        x = Math.cos(radian) * 2,
        z = Math.sin(radian) * 2;
        box.position.set(x, 0, z);
    });
    return boxGroup;
};
 
// SETTING SCALE OF BOX GROUP AND GETTING BOX OBJECTS BY NAME
// WHEN DOING SO
var createObject1 = function(){
    var group = createBoxGroup(4);
    toCircleGroup(group);
    // set cube zero to a bigger scale than the others
    // this should be the front
    var box = group.getObjectByName('box_0');
    box.scale.set(3, 3, 4);
    // side box objects
    var box = group.getObjectByName('box_1');
    box.scale.set(8, 1, 1);
    var box = group.getObjectByName('box_3');
    box.scale.set(8, 1, 1);
    // rear box object
    var box = group.getObjectByName('box_2');
    box.scale.set(1, 1, 12);
    return group
};
 
// create a group
var group = createObject1();
// box helper
group.add(new THREE.BoxHelper(group));
// scene
var scene = new THREE.Scene();
// grid helper
scene.add(new THREE.GridHelper(5, 5));
// add group
scene.add(group);
// dir mesh
var dir = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25), 
    new THREE.MeshBasicMaterial());
scene.add(dir);
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// loop
var lt = new Date(),
frame = 0,
maxFrame = 600,
r = 0,
x, 
z,
fps = 30;
var loop = function(){
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        r = Math.PI  * 2 * per;
        x = Math.cos(r) * 5;
        z = Math.sin(r) * 5;
        dir.position.set(x, 5 * Math.sin(Math.PI * 4 * per), z);
        group.lookAt(dir.position);
        renderer.render(scene, camera);
        lt = now;
        frame += fps * secs;
        frame %= maxFrame;
    }
};
loop();
```

## 4 - Conclusion

The name property is one of the many basic things about three.js that I should get into the habit of using, but just never really took the time to look into. It is true that I will not be using every little feature of every little class when it comes to using three.js to make an actual project. However I think that the name property is just one of these little aspects of three.js that I should be using often when making my crude yet effective modules that are just groups of mesh objects.

There are a number of other basic features of the three.js object3d class that a javaScript developer should be aware of when using three.js such as the user data object, the look at method, and the rotation and position properties. Mush of what has to do with working with three.js seems to center around the object3d class so looking into additional resources to learn more about the class is advised.
