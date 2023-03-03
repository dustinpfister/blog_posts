---
title: A Breath Module threejs project example
date: 2023-03-03 08:45:00
tags: [three.js]
layout: post
categories: three.js
id: 1030
updated: 2023-03-03 09:47:19
version: 1.1
---

I made a javaScript module that can be used as a core tool in the process of making a number of video projects that can be used as tools for controlled breathing exercises. The core idea of these kinds of videos is to have a number of objects update in such a way that they are in sycn with a rate at which people watching the video breath. So there is a lot of little details that come up when making a javaScript module to update things such as how many breaths per minute, how many minutes, and also other details about each breath cycle. Details for each breath cycle are things like what is the ratio of time for each opening reset, breath in, high rest, and breath out part. There are also a lot of things that come to mind when it comes to having an expression for the alpha values that will be used to position objects along curves, and also update just about everything else.

<!-- more -->

## The breath module example and what to know first

This is a blog post on a javaScript IIFE form module, and several demos of the module, that work on top of threejs in a front end javaScript environment. It should go without saying but I have to say it in each of these posts, this is not a post for people that are new to threejs let alone javaScript in general. I assume that you have at least a fair amount of experience with the skills that are required before hand to get something of values from reading this. Still in any case I do use these opening sections to wrote about a few things that you might want to read up more on regardless of experience.

### IIFE and JSM

As of this writing I still follow and old [IIFE pattern](/2020/02/04/js-iife/) for making javaScript modules which is in line with the use of three.min.js over that of three.module.js. However at some point in the not to distance future I will have to start wiring new modules and updating old ones in the JSM format.

### Source code is up on Github

I have the current sould code for this module and the demos up on my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-breath-module) on Github. This is also where I place the source code examples that show up in all my [other blog posts on threejs](/categories/) as well.

### Version Numbers matter

When I first wrote this blog post and made the first version of this module I was using [r146 of threejs and thus follow that style rules I set for that revision](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r146/README.md). I am also at the time of this writing at least sticking to my tired yet true IIFE pattern for javaScript modules. The plan with new posts and editing older posts is to stick with this well into this coming year, but still the days with this kind of style are very much coming to an end. The three.min.js files that I have been using are very much on the chopping block it would seem, so at some point I am going to need to start including JSM versions of my module for people that want to use bleeding edge revisions of threejs.

In any case always be mindful of what revision of threejs that you are using when trying to get code examples such as the ones I am writing about here to work on your end. Code breaking changes are made to threejs all the time so it often is best to stick with the revisions that I am using with these examples. Also I have found that it is a good idea to be aware of what kind of GPU you are using on your system and what the support is for OpenGL and therefor WebGl features. I like working on Raspberry PI OS and thus also have to deal with the limitations of the VideoCore VI GPU of the Raspberry PI 4. In [r150 of the library](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r150/README.md) the WebGLRenderer has totally crashed and burned which cased me to start plaing future [code style rules with r149](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r149/README.md). Simply put in general version numbers very much matter with this stuff, and not just with threejs alone.


## 1 - The First version of the breath module, and some demos

### 1.a - Breath.js R0

```js
// breath.js - r0 - from threejs-examples-breath-module
(function(api){
    const BREATH_KEYS = 'restLow,breathIn,restHigh,breathOut'.split(',');
    //-------- ----------
    // DEFAULTS
    //-------- ----------
    const DEFAULT_BREATH_PARTS = {restLow: 1, breathIn: 5, restHigh: 1, breathOut: 5};
    const DEFAULT_CURVE_UPDATE = (curve, alpha, v_c1, v_c2, v_start, v_end, gud, group) => {
        const e1 = new THREE.Euler();
        e1.z = Math.PI / 180 * 90 * alpha;
        v_c1.copy( v_start.clone().lerp(v_end, 0.25).applyEuler(e1).multiplyScalar(1 + 0.5 * alpha) );
    };
    const DEFAULT_MESH_UPDATE = (mesh, curve, alpha, index, count, group) => {
        const a_meshpos = (index + 1) / count;
        mesh.position.copy( curve.getPoint(a_meshpos * alpha) );
    };
    const DEFAULT_HOOKS = {
        restLow : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, 0);
        },
        restHigh : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, 1);
        },
        breathIn : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, Math.sin(Math.PI * 0.5 * a_breathPart));
        },
        breathOut : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, 1 - Math.sin(Math.PI * 0.5 * a_breathPart));
        }
    };
    //-------- ----------
    // HELPERS
    //-------- ----------
    // update curve control points and mesh object values
    const updateGroup = (group, alpha) => {
        const gud = group.userData;
        let index_curve = 0;
        while(index_curve < gud.curveCount){
            const curve = gud.curvePath.curves[index_curve];
            const v_start = curve.v0, v_c1 = curve.v1, v_c2 = curve.v2, v_end = curve.v3;
            gud.curveUpdate(curve, alpha, v_c1, v_c2, v_start, v_end, gud, group);
            let index_mesh = 0;
            while(index_mesh < gud.meshPerCurve){
                const name = getMeshName(gud, index_curve, index_mesh);
                const mesh = group.getObjectByName(name);
                gud.meshUpdate(mesh, curve, alpha, index_mesh, gud.meshPerCurve, group, group.userData);
                index_mesh += 1;
            }
            index_curve += 1;
        };
    };
    // get a mesh object name to be used when creating and getting mesh objects in breath group
    const getMeshName = (gud, index_curve, index_mesh) => {
        return 'breath_id' + gud.id + '_curve' + index_curve + '_mesh' + index_mesh;
    };
    // get the sum of a breath parts object
    const getBreathPartsSum = (breathParts) => {
        return Object.keys( breathParts ).reduce( ( acc, key ) => { return acc + breathParts[key]; }, 0);
    };
    // get the alpha value targets for each breath part
    const getBreathAlphaTargets = (breathParts) => {
        return BREATH_KEYS.reduce((acc, key, i, arr) => {
            let a = breathParts[ key ];
            if(i > 0){
                a += acc[i - 1]
            }
            acc.push( a );
            return acc;
        }, []).map((n)=>{
            return n / getBreathPartsSum(breathParts);
        });
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // main update method
    api.update = (group, a_fullvid) => {
        const gud = group.userData;
        gud.a_fullvid = a_fullvid;
        const sec = gud.totalBreathSecs * gud.a_fullvid;
        const a1 = (sec % 60 / 60) * gud.breathsPerMinute % 1;
        let ki = 0;
        while(ki < BREATH_KEYS.length){
            if(a1 < gud.breathAlphaTargts[ki]){
                gud.a_base = ki > 0 ? gud.breathAlphaTargts[ki - 1] : 0;
                gud.a_breathPart = (a1 - gud.a_base) / (gud.breathAlphaTargts[ki] - gud.a_base);
                gud.currentBreathKey = BREATH_KEYS[ki];
                const hook = gud.hooks[ gud.currentBreathKey ] || DEFAULT_HOOKS[ gud.currentBreathKey ];
                hook(updateGroup, group, gud.a_breathPart, gud.a_fullvid, group.userData);
                break;
            }
            ki += 1;;
        }
    };
    // main create method
    api.create = (opt) => {
        opt = opt || {};
        const group = new THREE.Group();
        const gud = group.userData;
        gud.radiusMin = opt.radiusMin === undefined ? 0.50 : opt.radiusMin;
        gud.radiusMax = opt.radiusMax === undefined ? 2.80 : opt.radiusMax;
        gud.curveCount = opt.curveCount === undefined ? 10 : opt.curveCount;
        gud.meshPerCurve = opt.meshPerCurve === undefined ? 10 : opt.meshPerCurve;
        gud.geometry = opt.geometry || new THREE.SphereGeometry(0.1, 20, 20);
        gud.material = opt.material || new THREE.MeshPhongMaterial();
        gud.curveUpdate = opt.curveUpdate || DEFAULT_CURVE_UPDATE;
        gud.meshUpdate = opt.meshUpdate || DEFAULT_MESH_UPDATE;
        gud.totalBreathSecs = opt.totalBreathSecs === undefined ? 300 : opt.totalBreathSecs;
        gud.breathsPerMinute = opt.breathsPerMinute === undefined ? 5 : opt.breathsPerMinute;
        gud.breathParts = opt.breathParts || DEFAULT_BREATH_PARTS;
        gud.breathAlphaTargts = getBreathAlphaTargets(gud.breathParts);
        gud.curvePath = new THREE.CurvePath();
        gud.hooks = opt.hooks || {};
        gud.id = opt.id || '1';
        // set in api.update
        gud.currentBreathKey = '';
        gud.a_fullvid = 0;
        gud.a_base = 0;
        gud.a_breathPart = 0;
        let index_curve = 0;
        while(index_curve < gud.curveCount){
            const a_curve_index = index_curve / gud.curveCount;
            // add current curve
            const e = new THREE.Euler();
            e.z = Math.PI * 2 * a_curve_index;
            const v_start = new THREE.Vector3(1, 0, 0);
            const v_end = new THREE.Vector3(1, 0, 0);
            v_start.applyEuler(e).multiplyScalar(gud.radiusMin);
            v_end.applyEuler(e).multiplyScalar(gud.radiusMax);
            const v_c1 = v_start.clone().lerp(v_end, 0.25);
            const v_c2 = v_start.clone().lerp(v_end, 0.75);
            const curve = new THREE.CubicBezierCurve3(v_start.clone(), v_c1, v_c2, v_end);
            gud.curvePath.add(curve);
            // add mesh objects for each curve
            let index_mesh = 0;
            while(index_mesh < gud.meshPerCurve){
                const mesh = new THREE.Mesh(gud.geometry, gud.material.clone());
                mesh.material.transparent = true;
                mesh.name = getMeshName(gud, index_curve, index_mesh);
                group.add(mesh);
                index_mesh += 1;
            }
            index_curve += 1;
        };
        api.update(group, 0);
        return group;
    };
}(this['BreathMod'] = {} ));
```

