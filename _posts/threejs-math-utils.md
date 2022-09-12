---
title: The Math Utils in threejs
date: 2022-04-11 14:18:00
tags: [three.js]
layout: post
categories: three.js
id: 977
updated: 2022-09-12 10:38:55
version: 1.25
---

Baked into threejs there are a number of [Math utilities](https://threejs.org/docs/#api/en/math/MathUtils) that can be used to help with various tasks such as clamping values for one example. Other things that can be done with the various methods include things such as converting a degree value to a radian value, or getting pseudo random values by way of the seeded random method. 

However there is not just thinking in terms of what there is to work with, but also what is missing when it comes to a collection of methods such as this. With that said I think I should also write about one or more additional things that are not in this math utils object, but should maybe be there. Even though there are some usual suspect type methods to work with here I can not say that this is a replacement for some kind of additional utility library outside of threejs. As I still find myself writing my own code for various things in order to fill in the gap sort of speak.

Speaking of filling in the gap when it comes to making my own module for the kinds of methods in the math utils object, sense I am always working on top of threejs I can just simply wrap many of the methods in the Math utils object. For one example of what I mean by this when it comes to the subject of wrapping a value, maybe I need to still need to make my own own method for that, but when it comes to having a clamp method I can have that just call the clamp method in the Math Utils object.

<!-- more -->

## The math utils method and what to know first

This is a post on some of the features of the Math utils object in the javaScript library known as threejs. I am assuming that you have all ready got up to speed with the basics when it comes to [getting started with threejs](/2018/04/04/threejs-getting-started/). I am also assuming that you have at least some background when it comes to client side web programming to begin with as well. I will not be getting into detail about many basic things that you should know at this point. However I do often use this first section of a post to outline at least a few things that you might want to also read up more on before getting to the rest of this.

### There is a Clamp methid but no Wrap method in Math utils

Many libraries will have a clamp method that will clamp a value to the range of a given max and min value, and threejs is no exception with this as there is very much a clamp method in the math utils object. However there is not just clamping values but also wrapping values as well. That is that on top of having a method that will clamp a value between a min and max value in that it will just not let the value go lower or higher there would also be a wrap method that will wrap a value that goes beyond max back to the min value and vice versa. it would seem that there is no wrap method in the math utils object, thus I have to get this method by using or making something outside of the library. There is however an Euclidean Modulo method that is kind of similar to what I would expect, it is just that I also would like to have something that works a little differently when it comes to negative numbers.

I have wrote a [blog post on this subject of wrapping Vectors and primatives](/2022/09/02/threejs-vector3-wrap/) in which I was able to find a decent wrap method, and I also made [one of my threejs project examples that is a wrap module](/2022/09/09/threejs-examples-wrap-module/) in which I am building on top of this kind of thing. Also with some of these examples I am using a wrap method that I came up with when working on those source code examples.


### Source code example in this post are on Github

The source code examples that I am writing about in this post [are up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-math-utils). This is also where I am parking the source code examples for all y other various posts on threejs.


### Version Numbers matter

When I first wrote this post I was using r135, and the last time I came around to do some editing of this post I made sure all the examples where still working okay with r140. Always check what version you are using when reproducing things on you end, as code breaking changes are made to threejs often.

## 1 - Basic example of threejs math utilities using degree to radian method when setting the position of a mesh

Maybe one of the methods that I find myself using the most often would be the degree to radians conversion method that there is to work with in this Object. Although it is not so hard to just do this with a simple expression because it is a such a common task of course there is a method for this in the Math utils method. 

The use of radians comes up a whole lot and not just with javaScript related features but with various core javaScript features as well such as the Math cos and sin methods. With that said that is what I am using the methods for in this example actually by converting a given degree value to a radian value and then using that to get the desired x and y values that will be use to set the position of a mesh object.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // adding a mesh object
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT
    var radian = THREE.MathUtils.degToRad(20);
    var x = Math.cos(radian) * 5,
    z = Math.sin(radian) * 5;
    mesh.position.set(x, 0, z);
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 2 - The clamp and rand float methods

One thing that seems to come up a lot with threejs, and many javaScript projects in general actually is the subject of [clamping and wrapping values](/2018/07/22/phaser-math-wrap-and-clamp/). With that said here in threejs there is a clamp method that will clamp a given value to a given range that is all given by way of function arguments. On top of that there is also the subject of [random numbers in javaScript](/2020/04/21/js-math-random/) also, and with that said there is also a number of methods in this math utils object that have to dow with that also. So in this example I am also using the rand float method of the math utils to get random numbers in a range, and then using the clamp method to make sure that when using these values to set the position of mesh objects they say in a given area.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // USING THE RANDFLOAT and CLAMP METHODs
    var i = 0,
    len = 30;
    while(i < len){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        scene.add(mesh);
        var x = THREE.MathUtils.randFloat(-7, 7);
        x = THREE.MathUtils.clamp(x, -4.5, 4.5);
        var z = THREE.MathUtils.randFloat(-100, 100);
        z = THREE.MathUtils.clamp(z, -4.5, 4.5);
        mesh.position.set(x, 0, z)
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 3 - Euclidean Modulo

As I have mentioned in the clamp example there is not just clamping, but also wrapping number values. In this example I am again doing more or less the same thing as in the clamp example, but now I am using the Euclidean Modulo method to wrap numbers rather than clamping them. 

A long time ago I wrote a post on the subject of [what is wrong with the modulo operator](/2017/09/02/js-whats-wrong-with-modulo/) in core javaScript syntax. The main thing about modulo in javaScript is that it is not that there is something wrong with the modulo operator, it is just that it goes by a process that is a little difference from hat some might have grown accustom to in other programming languages. So then there is becoming aware of what Euclidean Modulo is compared to what is used in javaScript and how this is what most might expect modulo to work with negative numbers.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // USING THE RANDFLOAT and euclideanModulo METHODs
    var i = 0,
    len = 30;
    while(i < len){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        scene.add(mesh);
        var x = THREE.MathUtils.randFloat(-7, 7);
        x = -4.5 + THREE.MathUtils.euclideanModulo(x, 9);
        var z = THREE.MathUtils.randFloat(-100, 100);
        z = -4.5 + THREE.MathUtils.euclideanModulo(z, 9);
        mesh.position.set(x, 0, z)
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 4 - The seeded random method

There is using the plain old Math random method and also many other methods that are based off of it. However all of these options are not deterministic in nature, that is that when called they will not give the same numbers each time. In other words some times I might want to have some kind of solution where I have random numbers in a range, but each time I reload the page I get the same set of random numbers. So then they are not really random, but predictable, yet they look kind of random if that makes any sense.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // USING THE SEEDED RANDOM
    var i = 0,
    len = 5;
    while(i < len){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        scene.add(mesh);
        var x = -5 + THREE.MathUtils.seededRandom() * 10;
        var z = -5 + THREE.MathUtils.seededRandom() * 10;
        mesh.position.set(x, 0, z);
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 5 - The smoothstep function

The smooth step function will return a value between 0 and 1 that is a percent kind of value based on a video value to evaluate as the first argument compared to min and max values given as additional arguments. However the value returned will be smoothed or slowed down depending on how close the value is to the min or max value. A good way to go about getting an idea of how this method works might involve having a group of objects that all move by a fixed pixels per second value, then have another group that moves by a variable pixels per second value.

In this example I then have a helper function that will create a group of mesh objects with differing max pixels per second values in the user data objects of each mesh. I then have a simple update method that will move a group of mesh objects by the max value on each frame tick, and another update method that uses the Vector3.distanceTo method and MathUtils.smoothstep to get a variable pixels per second rate. 

When this example is up and running group2 will just move at the fixed rate that is the max pixels per second value for the mesh object, while group1 will slow down and speed up based on distance and smooth stepping.


```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight();
    dl.position.set(1, 2.5, 5);
    scene.add(dl);
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
    // UPDATE A GROUP USING THREE.mathUtils.smoothstep
    const updateGroupSmooth = (group, secs) => {
        group.children.forEach( (mesh) => {
            const mud = mesh.userData;
            // variable pixles per second using THREE.MathUtils.smoothstep and Vector3.distanceTo
            const d = mesh.position.distanceTo( new THREE.Vector3(0, 0, mesh.position.z) );
            const pps = THREE.MathUtils.smoothstep(d, -2.5, 2.5) * mud.maxPPS;
            // stepping posiiton
            mesh.position.x -= pps * secs;
            // wrap
            mesh.position.x = wrap(mesh.position.x, -5, 5);
        });
    };
    // simple update group with fixed pixles per second for sake of something to compare to
    const updateGroup = (group, secs) => {
        group.children.forEach( (mesh) => {
            const mud = mesh.userData;
            // stepping posiiton
            mesh.position.x -= mud.maxPPS * secs;
            // wrap
            mesh.position.x = wrap(mesh.position.x, -5, 5);
        });
    };
    // create a group
    const createGroup = (size, color) => {
        size = size === undefined ? 1 : size;
        color = color || new THREE.Color(1, 1, 1);
        let i = 0;
        const len = 5, group = new THREE.Group();
        while(i < len){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(size, size, size),
                new THREE.MeshPhongMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.5
                }));
            mesh.userData.maxPPS = 1.25 + 1.5 * (i / len);
            const x = 5;
            const z = -4 + 10 * (i / len);
            mesh.position.set(x, 0, z);
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const group1 = createGroup( 1, new THREE.Color(0,1,0) );
    scene.add(group1);
    const group2 = createGroup( 0.75 );
    scene.add(group2);
    //-------- ----------
    // LOOP
    //-------- ----------
    let frame = 0,
    maxFrame = 90,
    fps = 30,
    lt = new Date();
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroupSmooth(group1, secs);
            updateGroup(group2, secs);
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

The math utils object is then a whole bunch of useful methods that I find myself using often, however it does not have everything that I might expect to have in such a collection of methods. Although I guess I should not expect everything to be there actually because there is still what there is to work with in the core javaScript math object also of course. Speaking of the math object in core javaScript that is of course something that you show know a thing or two about at this time when it comes to using methods like Math.cos, and [Math.atan2](/2019/03/19/js-math-atan2/) for example. There is no need to add any of these such methods of course to the math utils object of threejs when it comes to all of these such methods as they are there to work with when it comes to native javaScript alone.

Also some of the things that come to mind are methods that I can not say that I use all that often such as an [nth root method](/2020/03/11/js-nth-root/) for example. That is an example of the kind of method that should not be in threejs because it is for the most part unneeded bulk. On the rare occasion that I do need an nth root method for whatever reason that is something that I can add by way of another library, or even a single stand alone method.
