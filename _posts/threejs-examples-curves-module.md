---
title: Curves Module threejs project example
date: 2022-11-18 07:48:00
tags: [three.js]
layout: post
categories: three.js
id: 1014
updated: 2022-11-18 13:00:42
version: 1.14
---

The [THREE.Curve base class can be used as a way to create custom curve constructor functions, but one might need to even bother with that as there are a number of great built in curve constructor functions as well. In any case Curve objects, regardless if they are custom , or built in, are a great way to go about defining paths in 3d space. I am sure that they may also be useful for many other things in threejs such as creating the position attributes of geometry, but for now I am mainly focused on using curves to define paths that can be used to define the movement of objects over time.

In any case I will want to make a [threejs project example](/2021/02/19/threejs-examples/) that is a javaScript module that contains tools to help me do various typical things that I want to do with curves in threejs. This module will have a number of tools that will help me to create Cuves, as well as arrays of vector3 objects using curves. I also have a number of methods that I can use to create what are often called alpha values as well using curves, as well as a number of other methods that can be used to debug what is going on with these sort of things. So in this post I will be writing about the source code of my current standing curves module as well as a number of demos that make us of this module.

<!-- more -->

## The curves module threejs example and what to know first

Before you read the rest of this post it would be a good idea to know a thing or two about what you should know about before hand. There is a whole lot of ground to cover with that, and I will not be getting into every little detail about the Curve class, as well as various other threejs features, and things that have to do with client side javaScript in general as well. However I do like to make it so that this opening section outlines at least a few things that you might want to read up more on before reading the rest of this content.

### Check out the THREE.Curve base class, as well as THREE.QuadraticBezierCurve3

I have wrote a blog post on the [base curve class](/2022/06/17/threejs-curve/), as well as the [Quadratic Bezier Curve class](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) that builds on top of that. There is also of course the official threejs docs on [Curves](https://threejs.org/docs/index.html#api/en/extras/core/Curve), [Bezier Curves](https://threejs.org/docs/index.html#api/en/extras/curves/QuadraticBezierCurve3) and also [Curve Paths](https://threejs.org/docs/index.html#api/en/extras/core/CurvePath) but I find that the docs do not always do the best job outlined every little detail starting with hello world style copy and paste examples.

In any case it would be a good idea to work out at least one if not a lot of little demos involving the use of curves as there is a lot to be aware of when it comes to suing them. There is the [get point method](https://threejs.org/docs/index.html#api/en/extras/core/Curve.getPoint) that is a very useful method for example as it will return a vector3 object at any given point along the curve by passing a given alpha value as the first argument.

### Check out the Vector3 class, Object3d, and the position property of Object3d

There are a lot of ways that curves can be used in a threejs project, however maybe one of the first and foremost use case examples would be to use it as a way to get points at which to move an object such as a mesh object or camera. As I said the get point method of the curve class can be used to return an instance of the Vector3 class along a given curve. There are a number of things that could be done with this, one of which would be to use it as a way to set the position of an object3d based object. So then there is calling the copy method off of the position property of an obejct3d based object such as a mesh object and passing this returned vector3 object to do just that.

In this post I assume that you are beyond the basics of using the vector3 class and know at least a thing or two about object3d and how it applys to any kind of object that would be added to a main scene object. If not you might want to read my main [blog post on the Vector3 class](/2018/04/15/threejs-vector3/), and maybe also my main post on the [Object3d class](/2018/04/23/threejs-object3d/) as well. I also have a post in which I [mainly focus on just the position property of the object3d class](/2022/04/04/threejs-object3d-position/) as well.

### The Source code examples here are on Github

I also have the source code examples that I am write about here [up on Github as well](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-create-path-tool).

### Version Numbers matter

When I first wrote this post I was using r146 of threejs.


## 1 - The curves module R0, and demos

There is going over the source code of the curve module itself, and then there is going over the source code of at least a few demos of the module as well. In this section I will be doing just that with the very first version of the curve module, and if I do end up using this often I am sure there will be addition revisions. In any case in this revision of the module the focus was to just have some basic tools for quickly creating curve objects using the threejs built in THREE.QuadraticBezierCurve3 class which is a great way to create curves using a start point, end point, and a single controls point all of which are instances of the Vector3 class. There are methods of the curve module that will return a curve, curve path, and also arrays of Vecotr3 objects that I can then quickly use with other projects that I have outside of this one.

On top of just some methods that will create and return curves and arrays of vector3 objects i also started a method that I can use to create and return an alpha function based on curve data. This is another major use case of curves that came to mind for me beyond just that of defining paths in s3 space. What I mean by an alpha function is something like the THREE.MathUtils.smoothstep function, and if you are not in the know with that, simply put a function that can be used to return a value between 0 and 1. You see there is not just defining a path in space, but also defining the spacing between points along a curve as well if that makes any sense and that is one use case for one of these alpha functions.

I am sure that there will be nay more method and features that I will want to ad to this kind of module actually, but much of that is what I will want to leave for future revisions.

### The source code of curves.js R0

Here then is the source code for R0 of my curves tools that I have worked out thus far. At the very top of the module I have thus far just two private helper functions. One of these is a for path data helper function that I use for two methods that create and return a collection by a given array of arrays of data for arguments to be passed to the THREE.QuadraticBezierCurve3 function. By collection I mean one of two things, an array of Vector3 objects, or a curve path. The other helper function will create and return a curve that will be used for one of my functions that will return an alpha function.

I then have a number of methods that will return a something that is based off the the base curve class such as a Quadratic Bezier Curve, or a curve path. There is the QBC3 method that is just an abstraction for the Quadratic Bezer Curve class. Then I have another method that is a little more than just that that I find useful by defining the control points as deltas from a point in the middle of the curve. I then also have another number of methods that are like these methods buy will return an array of vector3 objects rather than a curve.

I then also have some methods that are a starting point for this idea of using curves to create alpha values, and then a number of methods that help me to debug things by getting a visual idea of what is going on using points and lines.

```js
// curve.js - r0 - from threejs-examples-curves-module
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    // for path data helper used by QBCurvePath and QBV3Array
    const forPathData = (data, collection, forCurve) => {
        collection = collection || new THREE.CurvePath();
        forCurve = forCurve || function(a, curve, curvePath, data){
            curvePath.add(curve);
        };
        data.forEach( ( a ) => {
            const curve = api.QBDelta.apply(null, a.slice(0, a.length - 1));
            forCurve(a, curve, collection, data);
        });
        return collection;
    };
    const createAlphaCurve = (grc_points) => {
        let i = 0, len = grc_points.length;
        const data = [];
        while(i < len - 1){
            const s = grc_points[i];
            const e = grc_points[i + 1];
            data.push([ 0, s[0], 0,   0, e[0], 0,   0, s[1], 0 ]);
            i += 1;
        }
        return curveMod.QBCurvePath(data);
    };
    //-------- ----------
    // RETURN CURVE
    //-------- ----------
    // just a short hand for THREE.QuadraticBezierCurve3
    api.QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
        let vs = x1;
        let ve = y1;
        let vc = z1;
        if(arguments.length === 9){
            vs = new THREE.Vector3(x1, y1, z1);
            ve = new THREE.Vector3(x2, y2, z2);
            vc = new THREE.Vector3(x3, y3, z3);
        }
        return new THREE.QuadraticBezierCurve3( vs, vc, ve );
    };
    // QBDelta helper using QBC3
    // this works by giving deltas from the point that is half way between
    // the two start and end points rather than a direct control point for x3, y3, and x3
    api.QBDelta = function(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        const vs = new THREE.Vector3(x1, y1, z1);
        const ve = new THREE.Vector3(x2, y2, z2);
        // deltas
        const vDelta = new THREE.Vector3(x3, y3, z3);
        const vc = vs.clone().lerp(ve, 0.5).add(vDelta);
        const curve = api.QBC3(vs, ve, vc);
        return curve;
    };
    // return a path curve by just calling the for path data helper with default options
    api.QBCurvePath = function(data){
        return forPathData(data);
    };
    //-------- ----------
    // RETURN V3ARRAY
    //-------- ----------
    // QBV3Array
    api.QBV3Array = function(data) {
        const v3Array = [];
        forPathData(data, v3Array, function(a, curve, v3Array){
            v3Array.push( curve.getPoints( a[9]) );
        });
        return v3Array.flat();
    };
    // Glavin Points are random points used for camera pos
    api.GlavinPoints2 = (count, origin, VULR, A1, A2 ) => {
        count = count === undefined ? 50 : count;
        origin = origin === undefined ? new THREE.Vector3() : origin;
        VULR = VULR === undefined ? new THREE.Vector2(0, 1) : VULR; // Max and min unit vector length
        A1 = A1 === undefined ? new THREE.Vector2(0, 360) : A1;
        A2 = A2 === undefined ? new THREE.Vector2(-90, 90) : A2;
        const v3Array = [];
        let i  = 0;
        while(i < count){
            // random euler
            const e = new THREE.Euler();
            e.x = Math.PI / 180 * ( A1.x + ( A1.y - A1.x ) * THREE.MathUtils.seededRandom() );
            e.y = Math.PI / 180 * ( A2.x + ( A2.y - A2.x ) * THREE.MathUtils.seededRandom() );
            // random unit length
            const ul = VULR.x + ( VULR.y - VULR.x ) * THREE.MathUtils.seededRandom();
            // v3 is a random dir and unit length from origin
            const v = origin.clone().add( new THREE.Vector3( 0, 0, 1).applyEuler(e).multiplyScalar(ul) )
            v3Array.push(v);
            i += 1;
        }
        return v3Array;
    };
    //-------- ----------
    // ALPHA FUNCTION
    //-------- ----------
    api.createAlphaFunciton1 = ( grc_points, clamp ) => {
        clamp = clamp === undefined ? true : clamp;
        const curve = createAlphaCurve(grc_points);
        return function(givenAlpha){
            let a = curve.getPoint(givenAlpha).y;
            if(clamp){
                a = THREE.MathUtils.clamp(a, 0, 1);
            }
            return a;
        };
    };
    api.createAlphaFunciton2 = ( grc_points, clamp ) => {
        clamp = clamp === undefined ? true : clamp;
        // use each path by itself
        const cp = createAlphaCurve(grc_points);
        return function(alpha){
            alpha = alpha === 1 ? 0.9999999999 : alpha;
            const cLen = cp.curves.length;
            const curveIndex = Math.floor( cLen * alpha);
            const cc = cp.curves[ curveIndex];
            const a_cc = alpha %  ( 1 / cLen ) * ( cLen );
            const v3 = cc.getPoint( a_cc );
            let a = v3.y;
            if(clamp){
                a = THREE.MathUtils.clamp(a, 0, 0.9999999999);
            }
            return a;
        };
    };
    //-------- ----------
    // DEBUG HELPERS
    //-------- ----------
    // debug lines
    api.debugLines = ( arrays ) => {
        const line_debug = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(arrays.flat()),
            new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3})
        );
        return line_debug;
    };
    // debug points
    api.debugPoints = ( arrays ) => {
        const points_debug = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(arrays.flat()),
            new THREE.PointsMaterial({ size: 0.25, color: new THREE.Color(0, 1, 0)})
        );
        return points_debug;
    };
    // debug points for a curve
    api.debugPointsCurve = ( curve, opt ) => {
        opt = opt || {};
        opt.count = opt.count === undefined ? 100 : opt.count;
        opt.getAlpha = opt.getAlpha || function(alpha){ return alpha; };
        opt.size = opt.size === undefined ? 0.2 : opt.size;
        opt.color = opt.color === undefined ? new THREE.Color(0,1,1) : opt.color;
        const v3Array = [];
        let i = 0;
        while(i < opt.count){
            v3Array.push( curve.getPoint( opt.getAlpha(i / opt.count ) ) );
            i += 1;
        }
        const points_debug = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(v3Array),
            new THREE.PointsMaterial({ size: opt.size, color: opt.color})
        );
        return points_debug;
    };
    // debug and alpha function
    api.debugAlphaFunction = (alphaFunc, opt) => {
        opt = opt || {};
        opt.count = opt.count === undefined ? 200 : opt.count;
        opt.sx = opt.sx === undefined ? -5 : opt.sx;
        opt.sz = opt.sz === undefined ? 5 : opt.sz;
        opt.w = opt.w === undefined ? 10 : opt.w;
        opt.h = opt.h === undefined ? -10 : opt.h;
        opt.size = opt.size === undefined ? 0.2 : opt.size;
        opt.color = opt.color === undefined ? new THREE.Color(0,1,1) : opt.color;
        const v3Array = [];
        let i = 0;
        while(i < opt.count){
            const a1 = i / opt.count;
            const x = opt.sx + a1 * opt.w;
            const z = opt.sz + alphaFunc(a1) * opt.h;
            v3Array.push( new THREE.Vector3( x, 0 , z) );
            i += 1;
        }
        const points = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints( v3Array ),
            new THREE.PointsMaterial({ size: opt.size, color: opt.color})
        );
        return points;
    };
}(this['curveMod'] = {} ));
```

### 1.1 - Create and return an array of Vector3 objects

Often what it is that I will want is not a Curve, but an array of vector3 objects of points along a curve. So I have a method that will take an object that contains an array of arrays of data and split out an array of vector3 objects. Also I have a method backed into the module thus far that is something that I made while working on my fink series of beta world videos. That is that I have an array of points that follow a curve, and then all of a sudden the path becomes just a bunch of random points moving around all over the place. This kind of motion can often prove to be a little useful in some projects in which I want that kind of camera movement.

<iframe class="youtube_video" src="https://www.youtube.com/embed/67j1q73byqc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
//-------- ----------
// CAMERA PATHS
//-------- ----------
const v3Arrays_meshpos = [ 
    curveMod.QBV3Array([
        [5, 0, 5, -5, 0, -5,    5,0,-5,      100]
    ]),
    curveMod.GlavinPoints2(
        100, // number of points
        new THREE.Vector3(-5, 0, -5), // origin
        new THREE.Vector2(0, 1),      // unit vector length range
        new THREE.Vector2(0, 360),    // a1
        new THREE.Vector2(-90, 90)    // a2
    ),
];
//-------- ----------
// LINES AND POINTS
//-------- ----------
scene.add(curveMod.debugLines(v3Arrays_meshpos) )
scene.add(curveMod.debugPoints(v3Arrays_meshpos) )
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     const a1 = frame / frameMax;
     const arrayLen = v3Arrays_meshpos.length;
     const arrayIndex = Math.floor( arrayLen * a1);
     const a2 = a1 - (1 / arrayLen * arrayIndex);
     const a3 = a2 / (1 / arrayLen);
     const v3Array = v3Arrays_meshpos[ arrayIndex ];
     mesh.position.copy( v3Array[ Math.floor( v3Array.length * a3 ) ] );
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

### 1.2 - The Curve path module

I also have another method that is just like that of the one that will return an array of vector3 objects but will return a curve path. I can then use whatever alpha value I want when it comes to getting a point along that curve which is great. For this example thought I am not going to be doing anything fancy with that, and will save that for an additional example in this post.

So then here I am using QB Curve Path method and passing an array of arrays just like that of what I pass when using the method that will return an array of points. One major difference thus is that I do not pass the number of points that I want as I am getting a curve that can be used to get any number of points that I want depending on how I use the curve. I am then just computing some simple, basic alpha values that I often use in various video projects to get the alpha value that I use with the get point method.

The end result here is then a mesh object moving forward and then backward along the curve over the span of the animation here. The reason why though is because of the alpha value that I am giving the results in this kind of behavior. I will be getting more into this in additional demos of the module here, but for now there is just thinking in terms of what other kinds of expressions and methods there are to create these alpha values for the get point method.



```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
//-------- ----------
// CURVE PATH
//-------- ----------
const cp_meshpos = curveMod.QBCurvePath([
   [5, 0, 5, -5, 0, -5,    5,0,-5]
]);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     const a1 = frame / frameMax;
     const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
     mesh.position.copy(cp_meshpos.getPoint(a2));
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

### 1.3 - The get alpha fucntions

I then wanted to create, bake in, and explore with this idea of having a get alpha value function using curves. With that said I made a lot of great progress testing out this idea that will then be further refined in future revisions of the module. I am thinking that I might want to make a another threejs project where the main focus is with alpha functions, but in any case I am sure that this will ether be something that I will want to bake into this module, or at least this curve module will be a foundation for such a module for sure.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
// ---------- ----------
// CURVE ALPHA
// ---------- ----------
const grc_points = [
    [0.00, 0],[1.00, 0.25], [0.50, -0.2], [0]
];
const curveAlpha = curveMod.createAlphaFunciton2( grc_points, false );
//-------- ----------
// CURVE PATH
//-------- ----------
const cp_meshpos = curveMod.QBCurvePath([
   [5, 1, 5, -5, 1, -5,    5,0,-5]
]);
// ---------- ----------
// DEBUG POINTS
// ---------- ----------
const pointsA = curveMod.debugAlphaFunction(curveAlpha, { count: 400, color: new THREE.Color(1, 1, 1) });
scene.add(pointsA);
const pointsM = curveMod.debugPointsCurve(cp_meshpos, { getAlpha: curveAlpha, color: new THREE.Color(0, 1, 0) });
scene.add(pointsM);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh2);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 180;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     const a1 = frame / frameMax;
     const a2 = curveAlpha(a1);
     if(a2 < 0 || a2 > 1){
        console.log( 'out!' )
     }
     // useing mesh to to show point along get alpha
     mesh2.position.x = -5 + 10 * a1;
     mesh2.position.z = 5 - 10 * a2;
     // using mesh1 to show how that can apply to the point
     // spacing along another curve
     mesh1.position.copy( cp_meshpos.getPoint(a2) );
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion

I am off to a good start with this curve module, but there is still a lot or more work ahead for me on this one. I will like to refine the get alpha functions for sure, but there are also things that I have not even started with in R0 of this module. The main thing that comes to mind with this would be using curves to create position attributes of custom buffer geometry objects.


