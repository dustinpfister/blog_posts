---
title: Clamping a vector in threejs
date: 2021-06-16 12:45:00
tags: [three.js]
layout: post
categories: three.js
id: 890
updated: 2023-03-08 08:59:50
version: 1.35
---

When it comes to setting boundaries for Vectors in a [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) project there is often clamping the values or wrapping the values. That is that there is a situation in which there is a min value, a max value, and having a way to make sure that a value is always inside this range. However there is the idea of having it so that a number out of range is clamped to a value that is closest to what is in range, and then there is the idea of warping the value back around from the opposite side of the range. In todays post I will be focusing on what there is to work with in the [Vector3 class](https://threejs.org/docs/#api/en/math/Vector3) prototype when it comes to clamping values. However I think that I should also have at least a few examples that have to do with wrapping vector3 objects as well.

When it comes to clamping Vectors there is the idea of having two Vectors that will be min and max Vectors, this results in some kind of box like area in which a vector can be clamped into. There is another general idea when it comes to clamping vectors that has to do more so with setting a limit in terms of the Euclidean length which will result in a sphere like area in which values can be clamped to. I suppose that there are all kinds of other ideas that come to mind when it comes to more complex examples of this sort of thing, but those are the two general basic ideas for starters. When it comes to these two general ideas there is the [Vector3.clamp](https://threejs.org/docs/index.html#api/en/math/Vector3.clamp), and [Vector3.clampLength](https://threejs.org/docs/index.html#api/en/math/Vector3.clampLength) methods in the Vector three class to work with.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/-5vH7bGHHvU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Vector3 clamping What to know before hand

This is a post on using the Vector3 clamp methods to clamp a vector between a min and max range. And when doing so for this post at least I am sticking mainly with where there is to work with in the Vector3 prototype alone rather than looking into additional examples of this sort of thing. So then I trust that you have [covered the very basics when it comes to getting up and running with threejs](/2018/04/04/threejs-getting-started/) in general, and have not got to the point where you are just learning more about working with the Vector3 class.

### Look into the Vector3 class in general

In this post I am just going over a few methods in the [Vector 3 class](/2018/04/15/threejs-vector3/) that has to do with creating and working with one or more Vectors in threejs when it comes to setting bounds for them. However there is a great deal more to learn about the class and Vectors in general.

### Source code is up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repo on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-clamp).

### Version numbers matter with threejs

When I wrote this post I was using threejs r127 when it comes to testing out source code examples. I have got into the habit of making sure that I always mentioning the version of threejs that I am using when it comes to write a post on the subject. The main reason why is because threejs is still a very fast moving project in terms of development and code breaking changes are happening all the time with it as a result.

## 1 - Basic example of the THREE.Vector3 clamp method.

So in this example I am using the Vector3 clamp method to just make it so that any value that I set for the [position](/2022/04/04/threejs-object3d-position/) of a [mesh object](/2018/05/04/threejs-mesh/) that ends up getting clamped within a min and max Vector range. So the way this works is I just call the Vector3.clamp method and pass the vector that I want to clamp as the first argument followed by two additional arguments that are the min and max ranges for the Vector if the form of additional Vector3 instances.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(5, 5));
 
    // creating a mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    mesh.position.set(0, 0, -5);
    mesh.position.clamp(
        new THREE.Vector3(-2, 0, -2),
        new THREE.Vector3(2, 0, 2));
 
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

## 2 - Clamping Vectors by length rather than a box area with Vector3.clampLength

There is clamping vectors into a box like area with the clamp method, but another option is the clamp length method that is more of a sphere like area. This method is somewhat similar to the clamp method only in place of Vector3 instances for setting the min and max values for the range, there is just setting the min and max values with a length values in the from of just javaScript numbers. Another way of thinking about this is an inner and outer radius in terms of two spheres that are both centered over the same origin.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(5, 5));
 
    // creating a mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    mesh.position.set(0, 5, -5);
    mesh.position.clampLength(0.5, 1);
    console.log(mesh.position);
 
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

The subject of clamping a vector by length goes hand in hand with many other related topics such as what a length of a vector is, and also what a normalized vector with a length of 1 is. Getting into this subject might be a little off topic, but the basic idea is that a length of 1 is a radius of 1 from the origin. So by clamping the length of a vector from 0.5 to 1 will make it so that the distance from the origin to the vector will always be between those values.

## 3 - A wrap method

Some times I might not want to have a vector clamped to a set of vectors that from a box, or using length values, but rather I would like to have things wrap around. Sadly it would seem that there is no wrap method in the Vector3 class, at least not of this writing with r140 of the library anyway. However there are some core tools to start out with in the math utils object such as the [Euclidean Modulo method](https://threejs.org/docs/#api/en/math/MathUtils.euclideanModulo) that will be a good start when it comes to wrapping values. The solution that I would out for this is a little involved, but I managed to make ground with it by just thinking in terms of what i need to do on a axis by axis bases.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // mod method
    var mod = function (a, b) {
        return THREE.MathUtils.euclideanModulo(a, b);
    };
    // wrap and axis
    var wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        var maxD = new THREE.Vector2(vecMin[axis], 0).distanceTo( new THREE.Vector2(vecMax[axis], 0) );
        var d = new THREE.Vector2(vec[axis], 0).distanceTo( new THREE.Vector2(vecMin[axis], 0) );
        if(maxD === 0){
           vec[axis] = 0;
        }else{
            if(vec[axis] >= vecMax[axis]){
                vec[axis] = vecMin[axis] + mod(d, maxD);
            }
            if(vec[axis] < vecMin[axis]){
                vec[axis] = vecMax[axis] - mod(d, maxD);
            }
        }
    };
    // wrap a vector
    var wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(0, 0, 0);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        wrapAxis(vec, vecMin, vecMax, 'x');
        wrapAxis(vec, vecMin, vecMax, 'y');
        wrapAxis(vec, vecMin, vecMax, 'z');
    };
    // create group
    var createGroup = function () {
        var group = new THREE.Group();
        var i = 0,
        len = 50;
        while (i < len) {
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1.0, 1.0, 1.0), 
                new THREE.MeshNormalMaterial({
                    transparent: true,
                    opacity: 0.60
                })
            );
            mesh.position.x = -2 + 4 * Math.random();
            mesh.position.y = -2 + 4 * Math.random();
            mesh.position.z = -2 + 4 * Math.random();
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update a group
    var updateGroup = function (group, secs, bias) {
       group.children.forEach(function(mesh){
            mesh.position.x += (2 - 4 * bias) * secs;
            mesh.position.y += (-2 + 4 * bias ) * secs;
            mesh.position.z += 2 * secs;
            wrapVector(
                mesh.position,
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
        });
    };
    //-------- ----------
    // LOOP
    //-------- ----------
    var group = createGroup();
    scene.add(group);
    var frame = 0,
    maxFrame = 300,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroup(group, secs, bias)
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

## 4 - Animation loop example

To get a real idea as to how the clamp method might come in handy I will want to have some kind of animation loop example. For this first animation loop example I have a whole bunch of mesh objects that start out at the center of a group and then move out my making use of a value that I use with the multiply scalar method. When moving the mesh objects I use the clamp method as a way to make sure that the mesh objects are not moving out of bounds and I am also resetting an alpha value while doing so to create a kind of crude animation loop type thing.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // get a random axis
    var randAxis = function () {
        return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
    };
    // create group
    var createGroup = function () {
        var group = new THREE.Group();
        var i = 0,
        len = 50;
        while (i < len) {
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1.0, 1.0, 1.0), 
                new THREE.MeshNormalMaterial({
                    transparent: true,
                    opacity: 0.50
                })
            );
            var ud = mesh.userData;
            var start_dir = ud.start_dir = new THREE.Vector3();
            ud.alpha = 0;
            ud.dr = 0.05 + 0.95 * Math.random();
            start_dir.x = randAxis();
            start_dir.y = randAxis();
            start_dir.z = randAxis();
            mesh.position.copy(start_dir.normalize().multiplyScalar(2));
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update group
    var update = function (group, delta) {
        group.children.forEach(function (mesh, i) {
            var ud = mesh.userData;
            var start_dir = ud.start_dir;
            var pos = mesh.position;
            ud.alpha += delta * ud.dr;
            pos.copy(start_dir.clone().normalize().multiplyScalar(ud.alpha));
            pos.clamp(
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
            if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
                ud.alpha = 0;
            }
        });
    };
    //-------- ----------
    // LOOP
    //-------- ----------
    var group = createGroup();
    scene.add(group);
    var frame = 0,
    maxFrame = 300,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(group, 0.1);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

## 5 - Animation loop example two making use of clamp, clamp length, and my wrap method

For my next animation loop example I am making use of all of the core ideas that i have covered in this post. This is just a more advanced version of the first animation loop example where I can set a clamp type when creating a group of mesh objects. Inside the update method this clamp type is then used as a way to find out what kind of method should be used to make the mesh objects say in a given area.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(8, 1, 2)
    scene.add(dl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // mod method
    var mod = function (a, b) {
        return THREE.MathUtils.euclideanModulo(a, b);
    };
    // wrap and axis
    var wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        var maxD = new THREE.Vector2(vecMin[axis], 0).distanceTo( new THREE.Vector2(vecMax[axis], 0) );
        var d = new THREE.Vector2(vec[axis], 0).distanceTo( new THREE.Vector2(vecMin[axis], 0) );
        if(maxD === 0){
           vec[axis] = 0;
        }else{
            if(vec[axis] >= vecMax[axis]){
                vec[axis] = vecMin[axis] + mod(d, maxD);
            }
            if(vec[axis] < vecMin[axis]){
                vec[axis] = vecMax[axis] - mod(d, maxD);
            }
        }
    };
    // wrap a vector
    var wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(0, 0, 0);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        wrapAxis(vec, vecMin, vecMax, 'x');
        wrapAxis(vec, vecMin, vecMax, 'y');
        wrapAxis(vec, vecMin, vecMax, 'z');
    };
    // get a random axis
    var randAxis = function () {
        return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
    };
    // create group
    var createGroup = function (clampType, color) {
        clampType = clampType || 'clamp';
        color = color || 0xffffff;
        var group = new THREE.Group();
        var i = 0,
        len = 10;
        while (i < len) {
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1.0, 1.0, 1.0), 
                new THREE.MeshPhongMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.60
                })
            );
            var ud = mesh.userData;
            var start_dir = ud.start_dir = new THREE.Vector3();
            ud.alpha = 0;
            ud.dr = 0.05 + 0.95 * Math.random();
            ud.clampType = clampType;
            start_dir.x = randAxis();
            start_dir.y = randAxis();
            start_dir.z = randAxis();
            mesh.position.copy(start_dir.normalize().multiplyScalar(2));
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update group
    var update = function (group, delta) {
        group.children.forEach(function (mesh, i) {
            var ud = mesh.userData;
            var start_dir = ud.start_dir;
            var pos = mesh.position;
            ud.alpha += delta * ud.dr;
            pos.copy(start_dir.clone().normalize().multiplyScalar(ud.alpha));
            // clamp type
            if(ud.clampType === 'clamp'){
                pos.clamp(
                    new THREE.Vector3(-2, -2, -2),
                    new THREE.Vector3(2, 2, 2));
                if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
                    ud.alpha = 0;
                }
            }
            // if clamp type is length
            if(ud.clampType === 'length'){
                pos.clampLength(0.1, 2);
                mesh.lookAt(group.position);
                if(pos.length() === 2){
                    ud.alpha = 0;
                }
            }
            // if clamp type is wrap
            if(ud.clampType === 'wrap'){
                wrapVector(
                    pos,
                    new THREE.Vector3(-2, -2, -2),
                    new THREE.Vector3(2, 2, 2));
                //ud.alpha = ud.alpha % 2;
            }
        });
    };
    //-------- ----------
    // LOOP
    //-------- ----------
    var group1 = createGroup('clamp', 0xff0000);
    scene.add(group1);
    var group2 = createGroup('length', 0x00ff00);
    scene.add(group2);
    var group3 = createGroup('wrap', 0x00ffff);
    scene.add(group3);
    var frame = 0,
    maxFrame = 300,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(group1, 0.1);
            update(group2, 0.1);
            update(group3, 0.1);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

## Conclusion

So then these clamp methods are helpful for making sure that a given point will never leave a given range, but they are not the best choice for other applications that come to mind. One such other application would have to do with collision detection, where I do not always want to clamp or wrap a point to a rang, but to just simply know if the point is in or out of a given range.

I did not get around to every little detail when it comes to setting boundaries for Vector3 values in general. I think I did more or less cover what there is to work with when it comes to clamping values at least, but I did not get into solutions that have to do with [wrapping values](/2018/07/22/phaser-math-wrap-and-clamp/). When it comes to that it would seem that there is no built in solution for doing so in the Vector3 prototype by itself at least. So it would seem that in order to Wrap values I will need to come up with my own solutions for doing so. 

There is also getting into more advanced solutions when it comes to just clamping values also, as I just covered the two basic ways of doing so here. So hopefully at some point in the future I will get around to expanding this post with additional examples on clamping vector's, and possible also some warping examples to which would be nice.
