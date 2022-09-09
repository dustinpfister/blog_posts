---
title: threejs wrap module example for wrapping rather than clamping values
date: 2022-09-09 09:21:00
tags: [three.js]
layout: post
categories: three.js
id: 1004
updated: 2022-09-09 10:15:38
version: 1.3
---

The [vector3 class](/2018/04/15/threejs-vector3/) in threejs has a [clamp method](/2021/06/16/threejs-vector3-clamp/) that will clamp a vector3 instance to a given min and max vector range that forms a box area of sorts. On top of this clamp method there is also a clamp length method that will do the same as the clamp method only with respect to the vectors unit length so it will clamp the vector to a sphere like area. In addition to that of the clamp methods in the vector3 class there is also a clamp method in the Math Utils object as well, but I am not seeing any wrap methods in the Vector3 class.

There are two general ways of going about treating boundaries one of which is to clamp them so that it is just not possible to continue out of a desired bounds, the other way though is to wrap them so that the value wraps around to an opposite side. I have [wrote a post on the wrapping of the Vector3 class recently](/2022/09/02/threejs-vector3-wrap/), but I thought that I should continue with this and make a more refined wrap module as a [threejs example project](/2021/02/19/threejs-examples/) which is what this post is about.

There are a lot of features that come to mind when it comes to wrapping values in threejs beyond just having a simple wrap value method that works well. There is having a method that will wrap a Vector to a box like area, but I would also like to have a method that is the wrap equivalent of that clamp length method as well. There are a whole lot of other classes beyond that of the vector3 class so I would like to have wrap methods that also work well with the [Euler class](/2021/04/28/threejs-euler/) that is the go to class for angles rather than vectors. Also there are many projects in which this wrap method, or similar methods for wrapping would be useful such as with my [object grid wrap project](/2022/05/20/threejs-examples-object-grid-wrap/).


<!-- more -->


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

On top of the wrap method that will work well whe I just want to wrap a number primative there are also wrap vector, wrap vector length, and wrap euler methods. I have a liot of ideas for addtional methods that I might want to add on top of this, but many of these ideas should be added in any and all futuire revisions of the module if it comes to that. For now I think that these methods alone are what I want to have at the ready.

### 1.1 - Wrap Method demo

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

### 1.2 - Wrap Vector method demo

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

### 1.3 - Wrap Vector Length demo

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

## Conclusion


