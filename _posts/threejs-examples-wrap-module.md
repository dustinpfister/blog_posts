---
title: threejs wrap module example for wrapping rather than clamping values
date: 2022-09-09 09:21:00
tags: [three.js]
layout: post
categories: three.js
id: 1004
updated: 2022-09-09 15:44:35
version: 1.13
---

The [vector3 class](/2018/04/15/threejs-vector3/) in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) has a [clamp method](/2021/06/16/threejs-vector3-clamp/) that will clamp a vector3 instance to a given min and max vector range that forms a box area of sorts. On top of this clamp method there is also a clamp length method that will do the same as the clamp method only with respect to the vectors unit length so it will clamp the vector to a sphere like area. In addition to that of the clamp methods in the vector3 class there is also a clamp method in the Math Utils object as well, but I am not seeing any wrap methods in the Vector3 class.

There are two general ways of going about treating boundaries one of which is to clamp them so that it is just not possible to continue out of a desired bounds, the other way though is to wrap them so that the value wraps around to an opposite side. I have [wrote a post on the wrapping of the Vector3 class recently](/2022/09/02/threejs-vector3-wrap/), but I thought that I should continue with this and make a more refined wrap module as a [threejs example project](/2021/02/19/threejs-examples/) which is what this post is about.

There are a lot of features that come to mind when it comes to wrapping values in threejs beyond just having a simple wrap value method that works well. There is having a method that will wrap a Vector to a box like area, but I would also like to have a method that is the wrap equivalent of that clamp length method as well. There are a whole lot of other classes beyond that of the vector3 class so I would like to have wrap methods that also work well with the [Euler class](/2021/04/28/threejs-euler/) that is the go to class for angles rather than vectors. Also there are many projects in which this wrap method, or similar methods for wrapping would be useful such as with my [object grid wrap project](/2022/05/20/threejs-examples-object-grid-wrap/).

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/7SMoZTwDAPY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Wrapping values in threejs and what to be aware of first

This is a post in which I am writing about a module that has to do with wrapping number values as well as the values of various classes in the javaScript library known as threejs. In core javascript there is the modulo operator, but this operator will not work as expected in all cases which gives rise for a interest in other additional methods of doing so such as [mathematical or euclidean modulo](https://en.wikipedia.org/wiki/Modulo_operation#Variants_of_the_definition). having the right modulo method is one thing about this wrapping of values in javaScript, but there is also a lot that one should know about threejs in general as well before hand. Simply put this is not a [getting started with javaScript](/2018/11/27/js-getting-started/) type post, and with that also any additional javaScript libraries written in javaScript such as therejs. I will not be getting into detail about every little feature that you should know before hand then, but I do use this first section to being up a few things at least.

### The deal with modulo in javaScript

The [modulo operator in core javaScript](/2017/09/02/js-whats-wrong-with-modulo/) will work fine in most cases except for some cases in which it will not. The deal is that the built in javaScript modulo operator is not really broken it is just that there is more than one kind of modulo operator when it comes to how negative number should be handled. This is what in some cases a special kind of modulo operator must be used that works differently compared to that of the built in operator in javaScript. There are a lot of libraries that will have this kind of method built in and threejs is once such library.

### The math utils object in threejs

Speaking of the modulo operator and alternative ways of doing so, the [math utils object is where one will find the  euclidean modulo method](/2022/04/11/threejs-math-utils/) that works great with negative numbers. This will work fine but it is still a method that will take just two arguments as it works like that of an operator that will also only work with two values. So then one will still need to adjust for this some how if that is what is to be used to wrap. In this module I worked out yet another way to wrap values but the expression used to do so is similar to that of many of these modulo methods I am seeing on the open web.

### Source is up on Github

The source code that I am writing about here can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-wrap-module). This is where I also park the source code for my [many other posts on threejs](/categories/three-js/) project examples, as well as the various features of threejs alone.

### Version numbers matter

When I first wrote this post I was using r140 of threejs.

## 1 - The first version of threejs-wrap.js \( r0 \), and some demos of the features thus far

In this section I will be going over the state of the source code of the first version of this threejs wrap module, and of course I need to have at least a few demos of it as well. The module follows the  usual IIFE pattern for making a javaScript module that I can then use elsewhere with mu various front end javaScript. The public API is a plain old javaScript object with a bunch of public methods attached to it that will do things like wrap number values as well as various classes such as a Vector3 class.

The first and foremost method in the module that I am making public is the wrap method which is more of less the same compared to a method that I worked out in my blog post on this subject. In that post the focus was more about figuring out how to go about making a simple warp value method that will work well in all cases including negative numbers. In this post I am just going with one method that I worked out that seems to function well that was based off of a [wrap method I found in a popular javaScript game framework called Phaser](/2018/07/22/phaser-math-wrap-and-clamp/). So then for this module I am focusing more on what I can do with a wrap method when applying this to the use of the threejs library.

```js
/* threejs-wrap.js - r0 - A THREEJS Wrap Module
 *     for the post: https://dustinpfister.github.io/2022/09/09/threejs-examples-wrap-module/
 */
const wrapMod = (function () {
    // public API
    const api = {};
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //
    const wrap = api.wrap = function (value, a, b){
        // get min and max this way
        let max = Math.max(a, b);
        let min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        let range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    const wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
    };
    // Wrap a vector method of public api
    api.wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(-1, -1, -1);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        Object.keys(vec).forEach(function(axis){
            wrapAxis(vec, vecMin, vecMax, axis);
        });
        return vec;
    };
    // wrap a vector by unit length
    api.wrapVectorLength = function (vec, minLength, maxLength) {
        minLength = minLength === undefined ? 0 : minLength;
        maxLength = maxLength === undefined ? 0 : maxLength;
        let len = wrap(vec.length(), minLength, maxLength);
        vec.normalize().multiplyScalar(len);
        return vec;
    };
    // wrap a Euler
    // Wrap a vector method of public api
    const PI2 = Math.PI * 2;
    api.wrapEuler = function (eu, euMin, euMax) {
        euMin = euMin || new THREE.Euler(0, 0, 0);
        euMax = euMax || new THREE.Euler(PI2, PI2, PI2);
        eu.x = wrap(eu.x, euMin.x, euMax.x);
        eu.y = wrap(eu.y, euMin.y, euMax.y);
        eu.z = wrap(eu.z, euMin.z, euMax.z);
        return eu;
    };
    // return api
    return api;
}());
```

On top of the wrap method that will work well when I just want to wrap a number primitive there are also wrap vector, wrap vector length, and wrap Euler methods. I have a lot of ideas for additional methods that I might want to add on top of this, but many of these ideas should be added in any and all future revisions of the module if it comes to that. For now I think that these methods alone are what I want to have at the ready.


### 1.1 - Wrap Method demo

The first public method that I might want to test out is the plain wrap number method. I am sure that there will end up being all kinds of little cases here and there where I will want to use a wrap method for some number value somewhere. Now just with threejs features, but also when working out some more additional code of my own of course. So then in this demo I am just using the wrap method of the module to wrap the x value of the position of a mesh object that I am updating over time.

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
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    var x =0,
    unitsPerSec = 2,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            x += unitsPerSec * secs;
            // USING THRE wrapMod.wrap METHOD WITH A VALUE
            x = wrapMod.wrap(x, -4.5, 4.5);
            mesh1.position.x = x;
            
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());
```

### 1.2 - Wrap Euler method demo

So is I just want to have a wrap method the one that I am using in this module seems to work well. However chances are that I am going to want to also have a number of methods that I can use to wrap not just a number but a class instance in threejs such as a Euler class instance. By default I will just want for it to make sure that the values for each axis stay in the range of zero to PI times 2, however I will of course also want it to work well with ranges that might include negative numbers. 

In this demo I have a mesh that uses the cone geometry and I am rotating the mesh over time. When doing so I am using my wrap Euler method to keep the rotation of the mesh wrapped to a given range for the y axis.

Also while working on this example I wanted to make a get alpha method that will work like the wrap method but give me an alpha value in the range of 0 to 1 that I can then use to set things like opacity. The helper method that I worked out for this seems to work well thus far for this kind of task and as such I might include it in future revisions of this module.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // make a cone with the geometry adjusted so that it points to x+ by default
    const makeCone = (len, radius) => {
        len = len === undefined ? 3 : len;
        radius = radius === undefined ? 0.5 : radius;
        const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(radius, len, 20, 20),
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.5
            }));
        mesh.geometry.rotateX( Math.PI * 0.5 );
        mesh.geometry.rotateY( Math.PI * 0.5 );
        return mesh;
    };
    const getAlpha = (value, vMin, vMax) => {
        const range = Math.abs(vMax - vMin);
        // is min >= 0 ?
        if(vMin >= 0){
            //return wrapMod.wrap(value, vMin, vMax) / range;
        }
        // vMax is also less than 0
        if(vMax < 0){
            //return ( wrapMod.wrap( value, vMin, vMax ) + Math.abs( vMin ) ) / range;
        }
        // vMax is 0 or higher ( also looks like I might have a one liner here )
        return Math.abs( vMin - wrapMod.wrap(value, vMin, vMax) ) / range;
    };
    //-------- ----------
    // TESTING OUT getAlpha HELPER ( seems to work okay for these and demo )
    //-------- ----------
    console.log( getAlpha( 6, 0, 10 ) );       // 0.6
    console.log( getAlpha( -14, -20, -10 ) );  // 0.6
    console.log( getAlpha( 2, -10, 10 ) );     // 0.6
    console.log( getAlpha( -1.4, -5, 1 ) );    // 0.6
    console.log( getAlpha( 2, -1, 5) ); // 0.5
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = makeCone(7, 2);
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    let pi2 = Math.PI * 2,
    eMin = new THREE.Euler(0, pi2 * 0.5 * -1, 0),
    eMax = new THREE.Euler(pi2, pi2 * 0.25, pi2),
    degPerSec = 20,
    fps = 20,
    lt = new Date();
    const loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // updating and wraping the Euler in as mesh rotation property
            mesh1.rotation.y += Math.PI / 180 * degPerSec * secs;
            wrapMod.wrapEuler(mesh1.rotation, eMin, eMax);
            mesh1.material.opacity = 1 - Math.abs( 0.5 - getAlpha(mesh1.rotation.y, eMin.y, eMax.y) ) / 0.5;
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());
```

### 1.3 - Wrap Vector method demo

Most of the time I will like to wrap a vector to a box like area that I can define by using two additional instances of Vector3 that are use to set the min and max values for vectors. In other words a wrap style method of the vector3 clamp method which I am demoing in this example here.


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
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    var dir = new THREE.Euler(0, 0, 1),
    unitsPerSec = 2,
    vecMin = new THREE.Vector3(-4.5,-4.5,-4.5),
    vecMax = new THREE.Vector3(4.5,4.5,4.5),
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // update dir
            dir.x += Math.PI / 180 * 5 * secs;
            dir.y += Math.PI / 180 * 45 * secs;
            wrapMod.wrapEuler(dir);
            // figure delta
            let delta = new THREE.Vector3(0, 0, 1);
            delta = delta.applyEuler(dir).normalize().multiplyScalar(unitsPerSec * secs);
            // USING wrapMod main method to wrap mesh1.position
            mesh1.position.add(delta);
            wrapMod.wrapVector(mesh1.position, vecMin, vecMax);
            mesh1.lookAt(0, 0, 0);
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());
```

### 1.4 - Wrap Vector Length demo

The subject of vector unit length is a major part of that the vector3 class is all about. A Vector is after all a state of direction and magnitude, or length if you prefer. So then any Vector can have a certain direction and the length can be adjusted while not doing anything with the direction which will result in a Vector moving directly outward, or in the direction of the origin. In the vector3 class there is a clamp length method that can be used to clamp the length of the vector, and for this module I made a wrap vector length method that does the same thing only by wrapping rather than clamping.

So then with the wrap vector length method when the length of the vector reaches the max value the vector length will wrap back around to the beginning rather than just stopping at the end.


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
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    var dir = new THREE.Euler(0, 0, 1),
    unitsPerSec = 4,
    vecMin = new THREE.Vector3(-4.5,-4.5,-4.5),
    vecMax = new THREE.Vector3(4.5,4.5,4.5),
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // update dir
            dir.y += Math.PI / 180 * 40 * secs;
            wrapMod.wrapEuler(dir);
            // figure delta
            let delta = new THREE.Vector3(0, 0, 1);
            delta = delta.applyEuler(dir).normalize().multiplyScalar(unitsPerSec * secs);
            // USING wrapMod main method to wrap mesh1.position
            mesh1.position.add(delta);
            wrapMod.wrapVectorLength(mesh1.position, 2.5, 4.5);
            mesh1.lookAt(0, 0, 0);
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());
```

### 1.5 - Art example for the video

As of late I have got into the habit of making at least one if not more art examples that will be the demo that I will be using in the video that I make for a post. Often I will make a whole other project outside of what I write about in the post for this sort of thing but from now on I think I should make it another demo and write about it in the blog post.

For this demo I am show casing for the most part all of the features of the wrap module thus far. I have two groups of mesh objects one of which is being wrapped using the wrap vector method, and the other with the wrap vector length method, I then also have a cone that is making use of the wrap Euler method.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(10, 10, -10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1,10,3);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // make a cone with the geometry adjusted so that it points to x+ by default
    const makeCone = (len, radius, color) => {
        len = len === undefined ? 3 : len;
        radius = radius === undefined ? 0.5 : radius;
        color = color || new THREE.Color(1, 1, 1);
        const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(radius, len, 20, 20),
            new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8
            }));
        mesh.geometry.rotateX( Math.PI * 0.5 );
        mesh.geometry.rotateY( Math.PI * 0.5 );
        return mesh;
    };
    // make a cube
    const makeCube = (size, color) => {
        size = size === undefined ? 1 : size;
        color = color || new THREE.Color(1, 1, 1);
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8
            }));
        return mesh;
    };
    // get an alpha value for a wrap
    const getWrapAlpha = (value, vMin, vMax) => {
        const range = Math.abs(vMax - vMin);
        // looks like I might have a one liner here...
        return Math.abs( vMin - wrapMod.wrap(value, vMin, vMax) ) / range;
    };
    // update a group
    var updateGroup = function (group, secs) {
       var gud = group.userData;
       var bs = gud.boundSize / 2;
       var ms = gud.meshSize / 2;
       var a = bs * -1 + ms;
       var b = bs - ms;
       var vMin = new THREE.Vector3(a, a, a);
       var vMax = new THREE.Vector3(b, b, b);
       group.children.forEach(function(mesh){
            var ud = mesh.userData;
            // update
            mesh.position.x += ud.dir.x * ud.pps * secs;
            mesh.position.y += ud.dir.y * ud.pps * secs;
            mesh.position.z += ud.dir.z * ud.pps * secs;
            // if wrap vector
            if(gud.type === 'wrapVector'){
                wrapMod.wrapVector(
                    mesh.position,
                    vMin,
                    vMax);
            }
            // if wrap vector length type
            if(gud.type === 'wrapVectorLength'){
                wrapMod.wrapVectorLength(
                    mesh.position,
                    a,
                    b);
                mesh.lookAt(group.position);
            }

        });
    };
    // create group
    var createGroup = function (count, spread, ppsMin, ppsMax, meshSize, boundSize, color, getDir) {
        spread = spread === undefined ? 5 : spread;
        count = count === undefined ? 50 : count;
        ppsMin = ppsMin === undefined ? 0.5 : ppsMin;
        ppsMax = ppsMax === undefined ? 2 : ppsMax;
        meshSize = meshSize === undefined ? 1 : meshSize;
        boundSize = boundSize === undefined ? 4 : boundSize;
        color = color || new THREE.Color(1, 1, 1);
        getDir = getDir || function(){
            let v = new THREE.Vector3(1, 0, 0);
            let e = new THREE.Euler(
                0,
                Math.PI * 2 * Math.random(),
                Math.PI * 2 * Math.random());
            return v.applyEuler(e);
        };
        var group = new THREE.Group();
        var gud = group.userData;
        gud.meshSize = meshSize;
        gud.boundSize = boundSize;
        gud.type = 'wrapVector';
        var i = 0;
        while (i < count) {
            var mesh = makeCube(gud.meshSize, color);
            // start position
            mesh.position.x = spread * -1 + spread * 2 * THREE.MathUtils.seededRandom();
            mesh.position.y = spread * -1 + spread * 2 * THREE.MathUtils.seededRandom();
            mesh.position.z = spread * -1 + spread * 2 * THREE.MathUtils.seededRandom();
            // user data values, pps and direction
            var ud = mesh.userData;
            ud.pps = ppsMin + (ppsMax - ppsMin) * THREE.MathUtils.seededRandom();
            ud.dir = getDir(group, mesh, i);
            group.add(mesh);
            i += 1;
        }
        updateGroup(group, 0);
        return group;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    var group1 = createGroup(80, 5, 0.25, 1, 0.75, 5, new THREE.Color(0,1,1));
    group1.userData.type = 'wrapVector';
    group1.position.set(-5,0,-5);
    scene.add(group1);
    var group2 = createGroup(80, 5, 0.25, 1, 0.75, 5, new THREE.Color(0,1,0));
    group2.userData.type = 'wrapVectorLength';
    group2.position.set(5,0,5);
    scene.add(group2);
    const mesh1 = makeCone(7, 2);
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    let pi2 = Math.PI * 2,
    eMin = new THREE.Euler(0, pi2 * 0.5 * -1, 0),
    eMax = new THREE.Euler(pi2, pi2 * 0.25, pi2),
    degPerSec = 45,
    //vecMin = new THREE.Vector3(-4.5,-4.5,-4.5),
    //vecMax = new THREE.Vector3(4.5,4.5,4.5),
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroup(group1, secs);
            updateGroup(group2, secs);
            mesh1.rotation.y += Math.PI / 180 * degPerSec * secs;
            wrapMod.wrapEuler(mesh1.rotation, eMin, eMax);
            mesh1.material.opacity = 1 - Math.abs( 0.5 - getWrapAlpha(mesh1.rotation.y, eMin.y, eMax.y) ) / 0.5;
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());
```

## Conclusion

This is a module that I will likely be using in various projects, and with that I will most likely be adding features to it as needed. There is also looking at some of my older projects and seeing how they might be improved by making this module a dependency of the project or rethinking authoring the source code based on what I have worked out here in this module and the wrap method that I came up with when coding and researching what is out there all ready on the open web. One major project that I seem to sue often is my object grid wrap module that is using a different kind of method for wrapping compared to what I am using here.


