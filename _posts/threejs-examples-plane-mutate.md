---
title: Mutating a point in a plane with threejs
date: 2021-06-11 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 887
updated: 2021-06-11 13:48:16
version: 1.6
---

There is still a great deal more to learn when it comes to [buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) class in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), not just with the class itself, but playing around with the various attributes when it comes to learning how to go about making custom geometry. So in this post I will be going over the current state of a threejs example where I am just mutating the position attribute of a plane geometry as a way to start to learn how to mess around with the values of a simple starting geometry in threejs. I do not aim to do anything to advanced here because I have found that there is a lot to be aware of when it comes to just moving a single point in a geometry, as it is often not just a mater of changing the position of a single vertex and one might assume. In some cases I have to move a few points actually, and also I have found that I run into problems with lighting that will require adjusting values in the normal attribute also.

<!-- more -->


## 2 - The plane mutation example as it currently stands

So then here is the source code of my plane geometry mutation threejs example as it currently stands. The idea that I had in mind here is to just work out a module, or even just a single method that I can use to just adjust the y position of a given vertex in the plane geometry.

```js
var adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    var position = geo.getAttribute('position');
    var normal = geo.getAttribute('normal');
    var i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    // ADJUSTING NORMAL
    var v = new THREE.Vector3(1, 1, 1).normalize();
    normal.array[i] = v.x;
    normal.array[i + 1] = v.y;
    normal.array[i + 2] = v.z;
};
 
var scene = new THREE.Scene();
 
var geo = new THREE.PlaneGeometry(1, 1, 2, 2);
geo.rotateX(Math.PI * 1.5);
 
// using the adjust plane point method
adjustPlanePoint(geo, 0, 0.5);
 
var plane = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
            color: 'red',
            emissive: 'gray',
            side: THREE.DoubleSide
        }));
scene.add(plane);
 
var light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(3, 1, 0);
//scene.add(light);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
camera.add(light);
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0
};
 
var update = function (secs, per, bias, state) {};
 
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
 
    update(secs, state.per, state.bias, state);
 
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
```

## 3 - Conclusion

I will have to come back to this example sooner or later when it comes to working on getting a better grasp on the various things to be aware of when mutating the position attribute of a buffer geometry class. A plane geometry created with the built in THREE.PlaneGeometry constructor just strokes me as a good starting point when it comes to starting to learn the basics of this sort of thing. It would be nice if I could just move a single point and be done with it, however the process is not always just that simple it would seem. In some cases I will not just want to just change the position of a vertex, but the position of a few vertices, and also there is updating the values of the normals also so that light will look the way that it should with the new position values.

