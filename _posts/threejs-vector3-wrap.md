---
title: Wrapping a vector3 instance in threejs
date: 2022-09-02 07:09:00
tags: [three.js]
layout: post
categories: three.js
id: 1003
updated: 2022-09-02 07:49:41
version: 1.3
---

Often I might be in a situation with a [threejs project](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) in which I would like to apply some kind of rules for [Vector3 class instances](/2018/04/15/threejs-vector3/) that have to do with boundaries or limitations in terms of the possible range of values. In the past I have wrote one [blog post on the clamp method of the Vector3 class](/2021/06/16/threejs-vector3-clamp/), and that is one way to go about applying limitations. That is that when a vector goes out of a set range it will be clamped to a value that is within the range, and do so in a box kind of area as it is used by passing two vector3 class instances that define the lowermost and uppermost corners of the box. In that post I also wrote about the clamp length method that works by giving number values that define a min and max vector unit length. This is yet another option that works well, but then both work by clamping values rather than wrapping values. That is that some times when a Vector3 instance goes out of range I might not want to clamp it, but wrap it around to an opposite side of an area.

I covered the idea of wrapping rather than clamping in my older blog post on the clamp method, but I am thinking that this is a topic that does also deserve a content piece of its own as well. So today I will be writing about a few quick source code examples that have ti do with wrapping Vector3 class instances rather than clamping them.

<!-- more -->

## Wrapping Vector3 class instances in threejs, and what to know first

There are a few things that you might want to read about first before hand with threejs as well as core javaScript in general. When it comes to threejs there is of course the very basics of getting started with the library, as well as specifics about the Vector3 class in general. When it comes to core javaScript there is a lot to wrote about when it comes to the built in modulo operator and what not to use in in many situations as well. I am not going to want to get into all of it in detail here in this post as I have done so in older posts on the subjects I am referring to. In this section I will just be briefly write about a few things to be aware of, and link to other content as needed.

### The deal with javaScript modulo

A long time ago I wrote a [blog post on the built in modulo operator](/2017/09/02/js-whats-wrong-with-modulo/) in core javaScript and what it wrong with it. In truth there is not really anything wrong with the operator actually it is just that it works a little differently from what many developers might be used to when it comes to dealing with negative numbers. So then there is knowing how to go about adding what is often called mathematical modulo, or euclidean modulo to a JavaScript environment. There are many quick copy and past methods when it comes to vanilla javaScript, however if threejs is there to work with there is all ready a [euclidean modulo method in the math utils object](https://threejs.org/docs/index.html#api/en/math/MathUtils.euclideanModulo) as well that can be used.

## 1 - The deal with modulo and wrapping values

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh1.position.set(0, 0, -3);
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh2.position.set(0, 0, -2);
    scene.add(mesh2);
    var mesh3 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh3.position.set(0, 0, 2);
    scene.add(mesh3);
    var mesh4 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh4.position.set(0, 0, 3);
    scene.add(mesh4);
    //-------- ----------
    // LOOP
    //-------- ----------
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
            mesh1.position.x -= 5 * secs;
            mesh1.position.x %= 5;
            mesh2.position.x += 5 * secs;
            mesh2.position.x %= 5;
            mesh3.position.x -= 5 * secs;
            mesh3.position.x = THREE.MathUtils.euclideanModulo(mesh3.position.x, 5);
            mesh4.position.x += 5 * secs;
            mesh4.position.x = THREE.MathUtils.euclideanModulo(mesh4.position.x, 5);
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

## 2 - Wrap just one axis

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
    //-------- ----------
    // MESH
    //-------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh1.position.set(0, 0, 0);
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    var vMin = new THREE.Vector3(-2, 0, 0),
    vMax  = new THREE.Vector3(2, 0, 0);
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
            // warp one axis
            mesh1.position.x += (-5 + 10 * bias) * secs
            wrapAxis(mesh1.position, vMin, vMax, 'x');
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

## 4 - A Wrap vector3 class instance method

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

## Conclusion

Wrapping Vectors is something that I do find myself doing over and over again as a way to limit vectors to a given range. I have made a whole lot of projects that do something to this effect one of which I find myself using a whole lot when I make my various little video projects that I call my "object grid wrap module". When it comes to that project I am just using the Euclidean Modulo method to do so by wrapping given values to a range of 0 and 1 and then use those values to set the position of objects in a grid. That kind of system seems to work well also on top of having some kind of function that will wrap a vector directly like I did with my main wrap method example in this post.