---
title: Normalizing Vectors in threejs
date: 2021-06-14 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 888
updated: 2021-06-15 11:51:53
version: 1.27
---

The Vector3 class in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) has many prototype methods one of which is the [Vector3 normalize](https://threejs.org/docs/#api/en/math/Vector3.normalize) method. Calling the normalize method of a Vector3 instance will preserve the direction of the vector, but it will reduce the euclidean distance of the vector to a length of one. A Vector with a [euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) of one is often referred to as a [unit vector](https://en.wikipedia.org/wiki/Unit_vector), and what is nice about this kind of vector is that it can quickly be scaled up by just simply multiplying the values of the normalized vector by a desired magnitude that is any value other than one to result in any vector that is along a given line that is the direction of the vector.

Vectors are often described as being a unit of direction, and magnitude, the direction can be thought of as what the normalized vector is in terms of numbers between 0 and 1 for x, y, and z. This direction can then be raised, or lowered actually towards zero, by a magnitude to get any point in space. So then in this post I think I will be going over some basic examples of the normalize method, and while I am at it also end up writing about a few other topics that are closely related to the normalize method.

<!-- more -->

## 1 - Normalizing Vectors and what to know before hand

This is a post on using the Vector3 normalize method, and other related features in the javaScript library know as threejs. There are a great number of things that you should be aware of before continuing to read this. For one thing this is not any kind of getting started type post on threejs let alone javaScript in general. However in this section I will be going over a few key details that you might want to read up on more in detail in order to gain a better understanding of what the Vector3 normalize method is all about.

### 1.1 - You might want to read up more on Vector3 in general

There is checking out my main post on the [Vector3 class](/2018/04/15/threejs-vector3/) where I am going over the Vector3 class in general. Normalizing a Vector is a major part of becoming proficient with the Vector3 class, but there is a great deal more to it when it comes to the basics of Vector3, as well as other various methods of the class. The think to keep in mind here is that the normalize method will just set the length of a vector to one, but that is it. What if I want to set direction of a Vector by a set of given angles in terms of radians or degrees for example? I will be going over some additional methods other than just the normalize method here, but there is a great deal more to be aware of that can be used with the normalize method, and I will not be getting to all of it here.

### 1.2 - Version Numbers matter

When I first wrote this post I was using r127 of threejs which was a late version of threejs as or min 2021, but even then was not the latest version. I have made a habit of mentioning what version of threejs I am using when writing new threejs posts, and also add a section like this to older posts when I get around to doing a little editing. Maybe this is something that I should do with just about any javaScript library actually, but threejs seems to be moving along real fast compared to other javaScript projects where development is very slow.

## 2 - Basic Vector3 normalize example

In this basic example I am creating an instance of THREE.Vector3 that is not normalized, and then just calling the normalized method of the Vector3 instance to get a normalized vector. The value of the Vector before normalizing it was -20, 0, 0, and the value after normalizing it is -1, 0, 0. So in other words the direction of the Vector is preserved but the length of the vector is reduced to a magnitude of 1. Once the vector is normalized I cal call a method like multiply scalar off of the normalized vector to set any desired magnitude, or distance if you prefer while preserving the direction of the Vector.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));
 
    var dir = new THREE.Vector3(-20, 0, 0);
    // NORMALIZING DIR FROM -20,0,0 to -1,0,0
    dir.normalize();
    console.log(Object.values(dir)); // [-1, 0, 0]
 
    // cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // MULTIPLYING DIR BY 2
    cube.position.copy( dir.multiplyScalar(2) );
    scene.add(cube);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Some more on the concept of vector length

So then the normalize method will set the length of any vector to a length of 1, and then from there the length can easily be adjusted to any desired length. Also when it comes to the subject of the length of a vector the Vector3.length method can be used to find out what the current length of any vector is. So then the noramize method combined with a method like multiply scalar can be used to set the length of a vector while the length method can be used as a way to get what that length is.

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    var setPosByDirAndLength = function(obj, dir, len){
        var v = dir.normalize().multiplyScalar(len);
        return obj.position.copy(v);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var cube = createCube();
    scene.add(cube);
    var dir = new THREE.Vector3(-5, 5, -5);
    setPosByDirAndLength(cube, dir, 4);
    console.log( cube.position.length() ); // 4
 
    // CAMERA
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

## 4 - Placing an object on the surface of a sphere example

So then one use case example for all of this would be to work out one or more methods that have to do with positioning an object on the surface of a sphere. That is that I can create a method in which I can pass values that will be used to create any point in space, and then normalized that point to a vector with the same direction but with a length of one. I can then set the length of the normalized vector to the radius of the sphere, plus one half the height of the object that I want on the surface of a sphere. That basic method seems to work pretty well, and it is then just a question of making other methods that serve as an abstraction for that kind of method, such as a method where I can just give a lat and long value in terms of values between 0 and 1 for each argument a a way to position something on to a sphere. This will then also serve as a way to take some kind of system that involves positioning things on a grid and make it so that it can also be used to position the same things on a corresponding sphere surface.

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };
 
    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(cube, x, y, z, alt);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);
 
    var cube = createCube();
    scene.add(cube);
 
    //setOnSphereFromPos(cube, 5, 0, 0, 2);
    setOnSphere(cube, 0.1, 0.3, 2);
 
    cube.lookAt(0, 0, 0);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lat = 0.1,
    long = 0,
    latDir = 1,
    lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
 
        requestAnimationFrame(loop);
 
        if(secs > 1 / fps){
            // call set on sphere for cube
            setOnSphere(cube, lat, long, 2);
 
            lat += 0.25 * secs * latDir;
            if(lat >= 1){
                lat = 1;
                latDir = -1;
                long += 1 / 30;
            }
            if(lat <= 0){
                lat = 0;
                latDir = 1;
                long += 1 / 30;
            }
            long %= 1;
 
            cube.lookAt(0, 0, 0);
 
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
```

This is the sort of thing that I find myself coming back to now and then when it comes to working out new systems for placing objects onto the surface of a sphere. I have a [simple project example that I made a little while back](/2021/05/14/threejs-examples-position-things-to-sphere-surface/) in which I was able to work out a solution for doing this sort of thing but it was very different from this kind of example that I like better.

## 5 - Apply Euler example to change direction

So then there is normalizing a vector to a length of one, and keeping the direction, but what if I want to change the direction while I am at it to. In other words what if I want some kind of helper function that will return a normalized vector, but I can also set the direction of that normalized vector with some angle arguments. In addition I can also set a length as a way to not return a normalized vector but a vector with an interested length, and also adjust what the starting vector is.

One way to make this kind of method would be to make use of the apply Euler method that can be used to change the direction of a vector by way of using some angles to do so. The apply Euler vector3 prototype method accepts radian values, but if I want to use degrees there is a deg to rad convince method in the math utils object. I will then just want a starting vector by which to use the apply Euler method with, and this vector should have a length greater than zero.

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };
 
    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(cube, x, y, z, alt);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);
 
    var cube = createCube();
    scene.add(cube);
 
    //setOnSphereFromPos(cube, 5, 0, 0, 2);
    setOnSphere(cube, 0.1, 0.3, 2);
 
    cube.lookAt(0, 0, 0);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var latPos = 0.1,
    longPos = 0,
    latDir = 1,
    lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
 
        requestAnimationFrame(loop);
 
        if(secs > 1 / fps){
            // call set on sphere for cube
            setOnSphere(cube, latPos, longPos, 2);
 
            latPos += 0.25 * secs * latDir;
            if(latPos >= 1){
                latPos = 1;
                latDir = -1;
                longPos += 1 / 30;
            }
            if(latPos <= 0){
                latPos = 0;
                latDir = 1;
                longPos += 1 / 30;
            }
            longPos %= 1;
 
            cube.lookAt(0, 0, 0);
 
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
```

## 6 - Conclusion

That will be it for now when it comes to the normalize method in the Vector3 class, but I am sure that I will come around to expand on this post at some point in the future when I have more to write about on this subject. There are many other methods in the Vector3 class that can be used with a normalized vector that I might get around to writing about sooner or later, but I need to get to working out some demos, and doing some more research first.

Never the less I think I did an okay job covering the basics of what a normalized vector is, now it is just a question of applying this to make some useful or interesting projects. Or improve some ones that I have made all ready, and I can think of a few that I would like to fix up now that I have a better understanding of this sort of thing.
