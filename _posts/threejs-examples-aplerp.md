---
title: An advanced Lerping module threejs example
date: 2022-07-29 08:37:00
tags: [three.js]
layout: post
categories: three.js
id: 998
updated: 2022-07-29 09:41:19
version: 1.13
---

A while back I wrote a [blog post on the lerp method](/2022/05/17/threejs-vector3-lerp/) of the [Vector3 class](https://threejs.org/docs/#api/en/math/Vector3.lerp) in the javaScript library known as [threejs](https://en.wikipedia.org/wiki/Three.js). The lerp method can be used to move a vector from one state to another given state in the form of another instance of the vector3, and an alpha value as a number between 0 and 1. This method alone works well, when it comes to simple linear lerping. In other words moving a vector from one point to another in the from of a kind of straight line between the two points of interest. Also when doing the typical index over length value as a way to create an alpha value the rate at which the point moves does so in a fixed, single delta value. These limitations then give rise in an interest to find, or develop some kind of advanced lerping module that builds on top of the vector3 method.

<!-- more -->

## The advantage lerp javaScript module and what to know before reading more

This is one of my many [threejs project example blog posts](/2021/02/19/threejs-examples/) in which I am writing about some kind of full blown project built on top of threejs. This is then not in any way a kind of blog post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) and javaScript in general so I will not be getting into basic features of the library or javaScript in general here. However I often use these opening sections to write about a few things that you might want to read up more on before counting to read the rest of the content.

### The source code is on Github also

The source code that I am writing about here can also be found in [my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-aplerp). This is project that I might continue working on for a while so the state of the code here might be a little out of date compared to what I have there between edits of this content that might prove to be few and far between.

### Version numbers matter

When I first started this post I was using r140 of threejs

## 1 - The first version of my apLerp javaScript module that runs on top of threejs

This might prove to be the kind of project where I will end up making at least a few revisions, but not mater what there is always the starting point. So then in this section I will be outlining what I have thus far in the first version \( r0 \) of my advance lerp module. There is going over the state of the module itself, but also taking a look at a number of demos of the module also just for the sake of testing out that the module works okay and that I am getting the kinds of results that I would like to have when using it in some kind of actual project. I have some planes when it comes to the use of this module as a foundation for many additional projects so I would like to try my best to get this fairly solid right away.

### 1.1 - The ap lerp module

The advanced lerp module returns three public methods as of r0, one of which is the lerp method that works in a similar way to that of the vector3 lerp method but with additional options that can be passed. Another method can be used to create and return an array of vector3 class instances that are between two vectors, which also makes use of the same internal lerp helper function. A final third public method can be used to quickly create a group of mesh objects that use the sphere geometry and normal material as a way to get a sense of what is going on when using the ap lerp method when making a few demos of it.

When it come to using the lerp method or the get points between method I will want to choose a built in get alha method, or write my own. For r0 of this project there are just two built in lerp methods, 'simp', and 'pow1' the default of which is pow1. The simp built in as the same suggest is just a simple regular lerp which defeats the purpose of using this whole thing kind of, but I figure I will still want to have that as a built in option. Speaking of get alpha methods as the name suggest this is the method that will be used to generate the alpha method that will then in turn be used for the vector3 lerp method. So at the core of this is still th built in threejs lerp method, and all of this additional code is just a kind of framework for creating alpha values for the use of that method.

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

Now that I have my module in a state that is looking good at least I will want to make at least one, if not a few demos of the module just for the sake of making sure that it is working okay. For this first basic demo of the advanced lerp module I am creating a basic scene as always and then testing out the lerp method of the module by just calling it with some vectors and options and just longing the results to the console. When using the simp and pow one method that vectors that are being returned look good, so but I will want to test out the other methods as well here.

So then I am using the create sphere group method that also makes use of the other public method to create a collection of sphere geometries. I use this method to create two groups, one for each built in get alpha method and add them to my scene object. The result is then what I would expect a line of mesh objects where each mesh is an equal distance apart with the simp built in get alpha, and then that not being the case with my pow1 built in method.

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

I would like to make another demo for r0 of the advanced lerp module where I am creating a collection of groups all using the pow1 built in method. For each group I am then tweaking the parameters that I can give to the pow1 method and for this example I will be tweaking the e parameter rather than the base for each group.

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

This is another demo in which I am creating a prototype of a get alpha method based off of an expression for creating a parabola. Thus far the get alpha method seems to work okay, but at this time I do not think I will be making this a built in option for any future revisions of this module. Thats okay though as that is the general idea that I have here, tired yet true get aloha methods will be built in, any any experimental get alpha methods will just be demos like this, or get pulled into some kind of optional pliug in.

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

The to try out at least one more additional get alpha method, this time I am thinking about making a method that makes use of the Math.sin method in core javaScript. Thus far I am kind of happy how this one is working out and will likely make this one of the built in get alphas in future revisions, maybe even making this the default one actually.

One of the main things about this is that I want to move objects in a way in which they start out slow, then move faster, and then slow down again as they get to the other point. When I use this sin get alpha method with the proper parameters I can get that kind of effect which is cool.

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

## Conclusion

The core idea that I had in mind with this project all ready seems to be working well, I might want to make at least an r1 of it though before I start to use this as a groundwork for additional modules though. When it comes to additional modules built on top of this though I have no shortage of ideas for it, that should go without saying. I am thinking about at lest two projects that have to do with the creation and movement of cameras, and at least one that has to do with mesh objects, but getting into all of that will be a mater of additional future blog posts.