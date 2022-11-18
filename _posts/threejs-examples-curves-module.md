---
title: Curves Module threejs project example
date: 2022-11-18 07:48:00
tags: [three.js]
layout: post
categories: three.js
id: 1014
updated: 2022-11-18 08:51:58
version: 1.3
---

The [THREE.Curve base class](/2022/06/17/threejs-curve/) can be used as a way to create custom curve constructor functions, but one might need to even bother with that as there are a number of great built in curve constructor functions as well. In any case Curve objects, regardless if they are custom , or built in, are a great way to go about defining paths in 3d space. I am sure that they may also be useful for many other things in threejs such as creating the position attributes of geometry, but for now I am mainly focused on using curves to define paths that can be used to define the movement of objects over time.

In any case I will want to make a [threejs project example](/2021/02/19/threejs-examples/) that is a javaScript module that contains tools to help me do various typical things that I want to do with curves in threejs. This module will have a number of tools that will help me to create Cuves, as well as arrays of vector3 objects using curves. I also have a number of methods that I can use to create what are often called alpha values as well using curves, as well as a number of other methods that can be used to debug what is going on with these sort of things. So in this post I will be writing about the source code of my current standing curves module as well as a number of demos that make us of this module.

<!-- more -->


## 1 - The curves module R0, and demos

There is going over the source code of the curve module itself, and then there is going over the source code of at least a few demos of the module as well. In this section I will be doing just that with the very first version of the curve module, and if I do end up using this often I am sure there will be addition revisions. In any case in this revision of the module the focus was to just have some basic tools for quickly creating curve objects using the threejs built in THREE.QuadraticBezierCurve3 class which is a great way to create curves using a start point, end point, and a single controls point all of which are instances of the Vector3 class. There are methods of the curve module that will return a curve, curve path, and also arrays of Vecotr3 objects that I can then quickly use with other projects that I have outside of this one.

On top of just some methods that will create and return cuves and arrays of vector3 objects i also started a method that I can use to create and return an alpha function based on curve data. This is another major use case of curves that came to mind for me beyond just that of defining paths in s3 space.

### The source code of curves.js R0

```js
// curve.js - r0 - r146 prototype
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
            //v3Array.push( curve.getPoints( a[9]) );
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
    api.createAlphaFunciton1 = ( grc_points ) => {
        const curve = createAlphaCurve(grc_points);
        return function(givenAlpha){
            return curve.getPoint(givenAlpha).y;
        };
    };
    api.createAlphaFunciton2 = ( grc_points ) => {
        // use each path by itself
        const cp = createAlphaCurve(grc_points);
        return function(alpha){
            alpha = alpha === 1 ? 0.99999999 : alpha;
            const cLen = cp.curves.length;
            const curveIndex = Math.floor( cLen * alpha);
            const cc = cp.curves[ curveIndex];
            const a_cc = alpha %  ( 1 / cLen ) * ( cLen );
            const v3 = cc.getPoint( a_cc );
            return v3.y;
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

### 1.1 - 

```js
```

### 1.2 - The

```js
```

### 1.3 - 

```js
```
