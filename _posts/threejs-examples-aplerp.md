---
title: An advanced Lerping module threejs example
date: 2022-07-29 08:37:00
tags: [three.js]
layout: post
categories: three.js
id: 998
updated: 2022-07-29 09:01:57
version: 1.3
---

A while back I wrote a [blog post on the lerp method](/2022/05/17/threejs-vector3-lerp/) of the [Vector3 class](https://threejs.org/docs/#api/en/math/Vector3.lerp) in the javaScript library known as [threejs](https://en.wikipedia.org/wiki/Three.js). The lerp method can be used to move a vector from one state to another given state in the form of another instance of the vector3, and an alpha value as a number between 0 and 1. This method alone works well, when it comes to simple linear lerping. In other words moving a vector from one point to another in the from of a kind of straight line between the two points of interest. Also when doing the typical index over length value as a way to create an alpha value the rate at which the point moves does so in a fixed, single delta value. These limitations then give rise in an interest to find, or develop some kind of advanced lerping module that builds on top of the vector3 method.

<!-- more -->


## 1 - The first version of my apLerp javaScript module that runs on top of threejs

This might prove to be the kind of project where I will end up making at least a few revisions, but not mater what there is always the starting point. So then in this section I will be outlining what I have thus far in the first version \( r0 \) of my advance lerp module. There is going over the state of the module itself, but also taking a look at a number of demos of the module also just for the sake of testing out that the module works okay and that I am getting the kinds of results that I would like to have when using it in some kind of actual project. I have some planes when it comes to the use of this module as a foundation for many additional projects so I would like to try my best to get this fairly solid right away.

### 1.1 - The ap lerp module

```js
// apLerp module -r0 prototype
var apLerp = (function () {
    // built in get alpha methods
    var GET_ALPHA_METHODS = {
        // simple, regular lerp
        simp: function(state){
            return state.p;
        },
        // pow1 lerp ( default for r0 )
        pow1 : function(state, param){
            var base = param.base === undefined ? 2.0 : param.base;
            var e = param.e === undefined ? 16 : param.e;
            var invert = param.invert === undefined ? false : param.invert;
            var m = Math.pow(base, e * state.p) / Math.pow(base, e);
            return invert ? 1 - m : m;
        }
    };
    // built in ap lerp method used by apLerp.lerp and apLerp.getPointsBetween
    var apLerp = function(opt){
        opt = opt || {};
        opt.v1 = opt.v1 || new THREE.Vector3();
        opt.v2 = opt.v2 || new THREE.Vector3();
        opt.alpha = opt.alpha === undefined ? 0 : opt.alpha;
        opt.getAlpha = opt.getAlpha || GET_ALPHA_METHODS.pow1;
        if(typeof opt.getAlpha === 'string'){
            opt.getAlpha = GET_ALPHA_METHODS[opt.getAlpha];
        }
        var a = opt.getAlpha({
            p: opt.alpha,
            gaParam: opt.gaParam || {}	
        }, opt.gaParam || {});
        // lerp from v1 to v2 using alpha from get alpha method and return the Vector3
        return opt.v1.clone().lerp(opt.v2, a);
    };
 
    // public api
    var api = {};
    // Public lerp method that 
    api.lerp = function(v1, v2, alpha, opt){
        opt = opt || {};
        alpha = alpha === undefined ? 0 : alpha;
        // clamp alpha
        alpha = alpha < 0 ? 0 : alpha;
        alpha = alpha > 1 ? 1 : alpha;
        return apLerp({
            v1: v1 || opt.v1 || new THREE.Vector3,
            v2: v2 || opt.v2 || new THREE.Vector3,
            alpha: alpha,
            getAlpha: opt.getAlpha,
            gaParam: opt.gaParam
        })
    };
 
    // Get points in the from of an array of Vector3
    // instances between the two that are given. The include bool can be used to
    // also include clones of v1 and v2 and the start and end.
    api.getPointsBetween = function(opt){
        // pase options
        opt = opt || {};
        opt.count = opt.count === undefined ? 1 : opt.count;
        opt.include = opt.include === undefined ? false : opt.include;
        var points = [];
        var i = 1;
        while(i <= opt.count){
            // call apLerp using i / ( opt.count + 1 ) for alpha
            points.push( apLerp({
                v1: opt.v1, v2: opt.v2,
                alpha: i / ( opt.count + 1 ),
                getAlpha: opt.getAlpha,
                gaParam: opt.gaParam
            }) );
            i += 1;
        }
        if(opt.include){
           points.unshift(opt.v1.clone());
           points.push(opt.v2.clone());
        }
        return points;
    };
 
    // make a sphere group
    api.createSpheresGroup = function(opt){
        var points = api.getPointsBetween(opt);
        var group = new THREE.Group();
        points.forEach(function(v){
            var mesh = new THREE.Mesh( new THREE.SphereGeometry(0.1, 30, 30), new THREE.MeshNormalMaterial() );
            mesh.position.copy(v);
            group.add(mesh);
        });
        return group;
    };
 
    // return public api
    return api;
}
    ());
```

### 1.2 - Basic demo of the core features of apLerp

```js
// demo of r0 of aplerp.js for threejs-examples-aplerp
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // TESTING OUT apLerp.lerp
    //******** **********
    var v1 = new THREE.Vector3(1, 1, 1),
    v2 = new THREE.Vector3(2, 1, 1),
    alpha = 0.5;
    // testing 'simp' get alpha method 
    var opt = { getAlpha: 'simp'};
    console.log( apLerp.lerp(v1, v2, alpha, opt) ); // {x: 1.5, y: 1, z: 1}
    // testing out pow2 get alpha method
    var opt = { 
        getAlpha: 'pow1',
        gaParam: {base: 1.25, e: 14}
    };
    console.log( apLerp.lerp(v1, v2, alpha, opt) ); // {x: 1.2097152, y: 1, z: 1}
    //******** **********
    // POINTS 1 EXAMPLE USING SIMP GET ALPHA METHOD
    //******** **********
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var group1 = apLerp.createSpheresGroup({
        v1: v1,
        v2: v2,
        count: 40,
        include: true,
        getAlpha: 'simp'
    });
    scene.add(group1);
    //******** **********
    // POINTS 2 EXAMPLE USING POW1 GET ALPHA METHOD
    //******** **********
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var group2 = apLerp.createSpheresGroup({
        v1: v1,
        v2: v2,
        count: 40,
        include: true,
        getAlpha: 'pow1',
        gaParam: {
            base: 6,
            e: 3
        }
    });
    group2.position.z = 1;
    scene.add(group2);
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
```

### 1.2 - More on the pow built in get alpha method

```js
// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a few groups with the pow1 built in
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // USING POW1 GET ALPHA METHOD
    //******** **********
    var i = 0, len = 25;
    while(i < len){
        var per = i / len;
        var v1 = new THREE.Vector3(-5, 0, 0);
        var v2 = new THREE.Vector3(5, 0, 0);
        var group = apLerp.createSpheresGroup({
            v1: v1,
            v2: v2,
            count: 60 - Math.floor(50 * per),
            include: true,
            getAlpha: 'pow1',
            gaParam: {
                base: 10,
                e: 1.75 + 8 * per
            }
        });
        group.position.z = -5 + 10 * per;
        scene.add(group);
        i += 1;
    }
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
```

### 1.3 - A parabola get alpha method prototype

```js
// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a custom getAlpha method based on an expression
// for a parabola
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // PARABOLA
    //******** **********
    var parabola = function(x, h, k){
        return Math.pow(x - h, 2) + k;
    };
    var parabolaGetAlpha = function(state, param){
        var h = 0.5, k = 0;
        var x = state.p;
        var y = parabola(x, h, k);
        var s = x <= 0.5 ? 1 : -1;
        var b = parabola(1, h, k);
        var a = state.p + (y / b) * s;
        return a;
    };
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var group = apLerp.createSpheresGroup({
            v1: v1,
            v2: v2,
            count: 80,
            include: true,
            getAlpha: parabolaGetAlpha,
            gaParam: {
            }
        });
    scene.add(group);
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
```

### 1.4 - Making a get alpha method with Math.sin

```js
// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a custom getAlpha method based on Math.sin
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // MATH.SIN
    //******** **********
    var sinGetAlpha = function(state, param){
        param.piM = param.piM === undefined ? 2 : param.piM;
        param.bMulti = param.bMulti=== undefined ? 0.1 : param.bMulti;
        param.aOffset = param.aOffset=== undefined ? 0.5 : param.aOffset;
        var r = Math.PI * param.piM * state.p;
        var b = Math.sin( r );
        var a = state.p + b * param.bMulti;
        // apply aOffset
        a += param.aOffset;
        a %= 1;
        // clamp
        a = a < 0 ? 0 : a;
        a = a > 1 ? 1 : a;
        return a;
    };
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var i = 0, len = 20;
    while(i < len){
        var per = i / len;
        var group = apLerp.createSpheresGroup({
                v1: v1,
                v2: v2,
                count: 40,
                include: true,
                getAlpha: sinGetAlpha,
                gaParam: {
                    piM: 2,
                    bMulti: 0.4 - 0.399 * per,
                    aOffset: 0.0
                }
            });
        group.position.z = -5 + 10 * per;
        scene.add(group);
        i += 1;
    }
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
```