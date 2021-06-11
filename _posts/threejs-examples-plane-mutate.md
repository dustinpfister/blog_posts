---
title: Mutating a point in a plane with threejs
date: 2021-06-11 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 887
updated: 2021-06-11 14:21:18
version: 1.14
---

There is still a great deal more to learn when it comes to [buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) class in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), not just with the class itself, but playing around with the various attributes when it comes to learning how to go about making custom geometry. So in this post I will be going over the current state of a [threejs example](/2021/02/19/threejs-examples/) where I am just mutating the position attribute of a plane geometry as a way to start to learn how to mess around with the values of a simple starting geometry in threejs. I do not aim to do anything to advanced here because I have found that there is a lot to be aware of when it comes to just moving a single point in a geometry, as it is often not just a mater of changing the position of a single vertex and one might assume. In some cases I have to move a few points actually, and also I have found that I run into problems with lighting that will require adjusting values in the normal attribute also.

<!-- more -->

## 1 - Mutating the positions of a plane geometry and what to know first

This is post that has to do with changing the values of the position attribute in a plane geometry in the javaScript library know as threejs. So then this is a somewhat advanced post that has to do with a subject that one might get around to after logging a fair about of time learning the basics of the library first. What I mean by that is after progressing far beyond a simple hello world style rotating cube type example there is the question of what comes to mind when it comes to getting into advanced topics with threejs. There are many a few things that come to mind, but one of them is how to go about making custom geometry constructors. What I am working out here might not really be that, however it might be a first step in that direction that involves just playing around with the values of a geometry created with one of the built in geometry constructors such as the plane geometry constrictor.

### 1.1 - Read up more on the THREE.PlaneGeometry constructor in general

In this post I am just playing around with the position attribute of a geometry created with the [THREE.PlaneGeometry constructor which might be worth checking out](/2019/06/05/threejs-plane/) in general. The plane geometry constructor is a good starting place to learn how to do all kinds of things with a geometry as it is a fairly basic, simple kind of geometry of course. However there is still a lot to be aware of when it comes to things like the group array, and material index values whe using an array of materials for example.

## 2 - The plane mutation example as it currently stands

So then here is the source code of my plane geometry mutation threejs example as it currently stands. The idea that I had in mind here is to just work out a module, or even just a single method that I can use to just adjust the y position of a given vertex in the plane geometry. So then I have this adjust plane point helper method and in the body of the function I am getting a reference to the position property of a geometry that I pass to it as the first argument. This function then adjusts the y value of a given vertex index to a given y value, and then sets the needs update boolean of the position attribute. That alone will of course change the position of a given vertex, however there is more to it than just that. If I use a material like the normal material or any material that will respond to light things will not look just right, and the main reason why that would be is because I just changed position values and did not change anything when it comes to the normal attribute values.


As of this writing I am just changing the direction of the corresponding normal value, but just to a value that is pointing in a single fixed direction. The next step that I might want to get to with this example when and if I get to it would be to take a better look at what is going on with the normal values, and see about working out a way to adjust those to the way that they should be also for the given state if a position attribute array.


```js
var adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    var position = geo.getAttribute('position');
    var normal = geo.getAttribute('normal');
    var i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    position.needsUpdate = true;
    // ADJUSTING NORMAL
    var v = new THREE.Vector3(1, 1, 1).normalize();
    normal.array[i] = v.x;
    normal.array[i + 1] = v.y;
    normal.array[i + 2] = v.z;
    normal.needsUpdate = true;
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
    maxFrame: 90,
    per: 0,
    bias: 0
};
 
var update = function (secs, per, bias, state) {
 
    adjustPlanePoint(geo, 4, 0 + 0.75 * bias);
 
};
 
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

So then this example is working okay at least those far when it comes to a simple plane geometry mutation type example, however there is a bit more work to do on this one when and if I can get around to it. I am in a good place thus far when it comes to adjusting the position values at least, however I will want to see if I can work out something when it comes to setting the normal values also. 

There is also the question of the uv attribute also, which I may or may not want to adjust also when it comes to this sort of thing. That attribute has to do with offsets when it comes to using a texture, and when it comes to that the default values that are created with the plane geometry constructor might still work okay for the direction I want to go with this.

## 3 - Conclusion

I will have to come back to this example sooner or later when it comes to working on getting a better grasp on the various things to be aware of when mutating the position attribute of a buffer geometry class. A plane geometry created with the built in THREE.PlaneGeometry constructor just strokes me as a good starting point when it comes to starting to learn the basics of this sort of thing. It would be nice if I could just move a single point and be done with it, however the process is not always just that simple it would seem. In some cases I will not just want to just change the position of a vertex, but the position of a few vertices, and also there is updating the values of the normals also so that light will look the way that it should with the new position values.

