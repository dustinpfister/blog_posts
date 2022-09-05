---
title: Wrapping a vector3 instance in threejs
date: 2022-09-02 07:09:00
tags: [three.js]
layout: post
categories: three.js
id: 1003
updated: 2022-09-05 12:30:31
version: 1.11
---

Often I might be in a situation with a [threejs project](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) in which I would like to apply some kind of rules for [Vector3 class instances](/2018/04/15/threejs-vector3/) that have to do with boundaries or limitations in terms of the possible range of values. In the past I have wrote one [blog post on the clamp method of the Vector3 class](/2021/06/16/threejs-vector3-clamp/), and that is one way to go about applying limitations. That is that when a vector goes out of a set range it will be clamped to a value that is within the range, and do so in a box kind of area as it is used by passing two vector3 class instances that define the lowermost and uppermost corners of the box. In that post I also wrote about the clamp length method that works by giving number values that define a min and max vector unit length. This is yet another option that works well, but then both work by clamping values rather than wrapping values. That is that some times when a Vector3 instance goes out of range I might not want to clamp it, but wrap it around to an opposite side of an area.

I covered the idea of wrapping rather than clamping in my older blog post on the clamp method, but I am thinking that this is a topic that does also deserve a content piece of its own as well. So today I will be writing about a few quick source code examples that have ti do with wrapping Vector3 class instances rather than clamping them.

<!-- more -->

## Wrapping Vector3 class instances in threejs, and what to know first

There are a few things that you might want to read about first with threejs as well as core javaScript in general. When it comes to threejs there is of course the [very basics of getting started with the library](/2018/04/04/threejs-getting-started/), as well as specifics about the Vector3 class in general. When it comes to core javaScript there is a lot to wrote about when it comes to the built in modulo operator and what not to use in in many situations as well. I am not going to want to get into all of it in detail here in this post as I have done so in older posts on the subjects I am referring to. In this section I will just be briefly write about a few things to be aware of, and link to other content as needed.

### The deal with javaScript modulo

A long time ago I wrote a [blog post on the built in modulo operator](/2017/09/02/js-whats-wrong-with-modulo/) in core javaScript and what it wrong with it. In truth there is not really anything wrong with the operator actually it is just that it works a little differently from what many developers might be used to when it comes to dealing with negative numbers. So then there is knowing how to go about adding what is often called mathematical modulo, or euclidean modulo to a JavaScript environment. There are many quick copy and past methods when it comes to vanilla javaScript, however if threejs is there to work with there is all ready a [euclidean modulo method in the math utils object](https://threejs.org/docs/index.html#api/en/math/MathUtils.euclideanModulo) as well that can be used.

### The Math utils object in threejs

In these examples on wrapping a vector in threejs I am making use of a method in the math utils object in threejs that is a kind of modulo operation that differs from what is baked into javaScript itself. There are a number of other methods to be aware of in the math utils object also, so it would be a good idea to [look into the math utils object more](/2022/04/11/threejs-math-utils/) if you have not done so before hand. Many of the methods are ushual suspect type methods that I would use, but there is also a few methods that I would like to see there but they are missing, one of which would be a wrap method at least as of r140 backward. Thats okay though as maybe many of the methods should actaully be part of some other librray actaully that can be used with threejs or any javaScript projet for that matter.

### Making a custom cut utility libaray with a wrap method

When I was working on a whole bunch of vanilla [javaScript projects I started a general utilties library](/2021/08/06/js-javascript-example-utils/) that just contains a collection of methods that I find myself copying nad pasting from one project to another. One of the methods in the librray is a wrap method, along with a clamp method as well. 

### Wrap methods in other librraies

In the Math object of the [Game Framework called phaser there is a wrap method](/2018/07/22/phaser-math-wrap-and-clamp/), and I have found that method works okay with a few exceptions with certain sets of argumnets. In any cases there is looking inot the source code of various projects that have librraies like this to see how they are prefroming a certin kind of task such as this.

### Source code is on Github

The source code examples that I am writing about here can also be found in my [test threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-wrap) repo.

## Version numbers matter

I was using r140 of threejs when I first wrote this post.

## 1 - The deal with modulo and wrapping values

First off here is a quick example that helps to show what the deal is with the built in javaScript modulo operator compared to using the euclidean modulo method in the math utils object. I have two sets of mesh objects that I would like to wrap, and I am trying to do so by just using modulo alone. When I use the core javaScript modulo operator the end result is that I get the outcome that I want, but only with positive numbers, negative numbers result in the object going out of the desired range. When I use the euclidean modulo method I do get a desired outcome where the mesh object loops back around within the desired range.

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

However even though things are working the way that I want them to with the euclidean modulo method it is still working in a way that is relative to zero forward rather than in a way that can work with a range that might go into negative numbers. Still the general idea of wrapping is there, from here forward I just need to find ways to adjust the range.

## 2 - A Wrap Axis method 

The process of making a wrap method from the ground up might prove to be a little involved, at least when it comes to making one from the ground up without looking into what is out there on the open Internet at least. In any case there is taking an approach in which I am figuring out that I need to do on a axis by axis bases which just seems like the thing to do. Wjat is good about this is that once I figure out something that works well for one axis, then it is generally just a mater of applying the same logic to all other axis values, at least that would seem to be the case with this anyway with respect to the way that I want to do it.

### 2.1 - Using the distance to method along with euclidean modulo

The code that I worked out for this solution involves making two instances of the Vector2 class and then calling the distance to method of each to get an idea of what the max distance from 0 is as well as the current distance is. Once I have these two values I can use them with the euclidean modulo method to get how mush I need to add to the min vector or subtract from the max vector for the current axis.

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

### 2.2 - Wrap Axis method bassed off the Math.Wrap method from Phaser

I have wrote a blog post or two on the game framework called phaser in the past and I remeber that the math object of the [framework has a wrap method](https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js). This method does seem to work the way that I would want it to, but with a few exceptions one of which has to do with NaN values when given the value 0 for the min or max values of the range that i would like to wrap to. This can be fixed fairly wasily though of course by just adding some code that will return 0 for such a case of cource. While I am at it there is also making use of the Math.min and Math.max methods to I do not have to wory so much about the oder of the arguments when calling the method.

The end result is a warp method that I like better that the more complex solution involving the distance to method, that still seems to give the same end results for the [domain that I given the function](/2021/07/27/js-function-domain/) thus far.

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
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //
    var wrap = function (value, a, b){
        // get min and max this way
        var max = Math.max(a, b);
        var min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        var range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    var wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
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

## 3 - A Wrap vector3 class instance method

Now that I have a method that seems to work okay for one axis all I need to do to make a wrap method for Vector3 is to just call the method for each axis. What is great about this is that in order to make solutions that will also work for the Vector2 class the only major change is to just call the wrap axis for x and y only when making the wrap vector method. Also if I put more time into researching other solutions for this, and fine a better way of wrapping an axis, I can just recreate the wrap axis method, and leave everything else as is.

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
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //
    var wrap = function (value, a, b){
        // get min and max this way
        var max = Math.max(a, b);
        var min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        var range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    var wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
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