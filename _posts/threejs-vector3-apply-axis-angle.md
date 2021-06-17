---
title: Vector3 apply axis method
date: 2021-06-17 14:35:00
tags: [three.js]
layout: post
categories: three.js
id: 891
updated: 2021-06-17 15:00:44
version: 1.12
---

this week I have been taking a deeper look into what there is to work with when it comes to the [Vector3 class](/2018/04/15/threejs-vector3/) in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), and today I thought I would work out a few demos with the [apply to axis angle method](https://threejs.org/docs/#api/en/math/Vector3.applyAxisAngle). This is a prototype method of the Vector3 class, which will mutate the value of the Vector in place, and as the name suggests is has to do with rotating the vector along an axis that is defines with another vector, and the second argument is then angle to apply with this given direction.

The thing to keep in mind here is that this is a Vector3 prototype method, so it has to do with changing the value of a vector, and not the state of a Euler class instance. Vectors can be used to represent direction, and there is some over lap between Vectors and Euler angles, bit it is still a good idea to be aware of what the limitations are here. There will be situations now and then where I will want to do something like what the apply to axis method does, but by mutating the state of a Euler class instance.

<!-- more -->

## 1 - The Vector3 class Apply to axis method and what to knwo first

This is a post on a prototype method of the Vector3 class in the javaScript library called threejs. So then I am writing about something that is very specific when it comes to client side web programing, and also requires at least a little background with javaScript and the basics of working with the three.js library in a project. If you feel that the content here might be a little to advanced for now there is taking a step back and starting out with a getting started type post on the subject of threejs. If you have some experience with threejs but still feel stuck with this there are maybe a few more things you should read up on more before looking at these examples, I will take a moment to go over these things here in this section.

## 2 - Basic example of the Vector3.applyAxisAngle method

So like many of my posts on threejs I like to start off with a basic example of the method just for the sake of gaining the basic idea of what this method can be used for.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(6, 6));
 
    // mesh
    var mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 30, 30),
            new THREE.MeshNormalMaterial());
 
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(1, 0, 1);
    //mesh.lookAt(0, 3, 0);
    scene.add(mesh);
 
    var v = new THREE.Vector3(0, 1, 0);
    mesh.position.applyAxisAngle(v, Math.PI / 180 * 180);
 
    console.log(mesh.position.clone().round()); // {x: -1, y: 0, z: -1}
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Animation loop example of apply to axis

So now that I have the basic example out of the way I think I should make at least one more demo of this methods that will involve an animation loop method, and an update method.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(6, 6));
 
    // mesh
    var mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 30, 30),
            new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(1, 0, 1);
    scene.add(mesh);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // LOOP
    var degree = 0,
    v = new THREE.Vector3(0, 1, 0),
    lt = new Date(),
    fps = 30;
    // update method
    var update = function (secs) {
        v.x += 0.25 * secs;
        v.x %= 1;
        degree = 45 * secs;
        mesh.position.applyAxisAngle(v, Math.PI / 180 * degree);
        mesh.lookAt(0, 0, 0);
    };
    // loop method
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 4 - Conclusion

I am not sure if I will be using this method that often in future projects, not because I do not thing that it brings something of value, but because there are just many other ways to get a similar effect, and some of them apply to aspects of an object other than the position property. Often I might want to change the orientation of an object in a way in which it is rotating on an axis, and to do that typically I will want to do something like this but with one of the angles of a Euler class instance. Also even if I want to do something like this with a Vector3 class instance I might still want to do so with another method that might prove to be a little more robust, with additional options.

Still taking a moment to look into the various methods to work with in the Vector3 class ins worth while, I am sure that I might not use all of them all the time, but there are many basic ones that will come in handy once in a while.
