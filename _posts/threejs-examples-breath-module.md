---
title: A Breath Module threejs project example
date: 2023-03-03 08:45:00
tags: [three.js]
layout: post
categories: three.js
id: 1030
updated: 2023-04-11 10:00:52
version: 1.12
---

I made a javaScript module that can be used as a core tool in the process of making a number of video projects that are controlled breathing exercises. The core idea of these kinds of videos is to have a number of objects update in such a way that they are in sycn with a rate at which people watching the video breath. The goal of watching these kinds of videos is that they might help to change what is often called [Heart Rate Variability](https://en.wikipedia.org/wiki/Heart_rate_variability) in a way that will help reduce blood pressure, anxiety, and depression. A good example of the kind of videos that I would like to make using this can be [found on the youtube channel mind drip](https://www.youtube.com/watch?v=_o-ERqoTAhA). This channel also has a [nice video that explains what HRV is about](https://www.youtube.com/watch?v=zUyuUoU7lAQ) for people that are new to what this.

So there is a lot of little details that come up when making a javaScript module to update things such as how many breaths per minute, how many minutes, and also other details about each breath cycle. Details for each breath cycle are things like what is the ratio of time for each opening reset, breath in, high rest, and breath out part. There are also a lot of things that come to mind when it comes to having an expression for the alpha values that will be used to position objects along curves, and also update just about everything else.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/wyAkD9c64SU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The breath module example and what to know first

This is a blog post on a javaScript IIFE form module [threejs project example](/2021/02/19/threejs-examples/), and several demos of the module, that work on top of threejs in a front end javaScript environment. It should go without saying but I have to say it in each of these posts, this is not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/) let alone javaScript in general. I assume that you have at least a fair amount of experience with the skills that are required before hand to get something of values from reading this. Still in any case I do use these opening sections to wrote about a few things that you might want to read up more on regardless of experience.

### Study More on HRV Breathing

In this blog post I am for the most part just writing about a javaScript module, and additional things that come up when making demos that work on top of this module. If you want to learn more about HRV there this is a video that I watched that really helped me to get started with this kind of exercise.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/q06YIWCR2Js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### IIFE and JSM

As of this writing I still follow and old [IIFE pattern](/2020/02/04/js-iife/) for making javaScript modules which is in line with the use of three.min.js over that of three.module.js. However at some point in the not to distance future I will have to start wiring new modules and updating old ones in the JSM format.

### Source code is up on Github

I have the current sould code for this module and the demos up on my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-breath-module) on Github. This is also where I place the source code examples that show up in all my [other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first wrote this blog post and made the first version of this module I was using [r146 of threejs and thus follow that style rules I set for that revision](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r146/README.md). I am also at the time of this writing at least sticking to my tired yet true IIFE pattern for javaScript modules. The plan with new posts and editing older posts is to stick with this well into this coming year, but still the days with this kind of style are very much coming to an end. The three.min.js files that I have been using are very much on the chopping block it would seem, so at some point I am going to need to start including JSM versions of my module for people that want to use bleeding edge revisions of threejs.

In any case always be mindful of what revision of threejs that you are using when trying to get code examples such as the ones I am writing about here to work on your end. Code breaking changes are made to threejs all the time so it often is best to stick with the revisions that I am using with these examples. Also I have found that it is a good idea to be aware of what kind of GPU you are using on your system and what the support is for OpenGL and therefor WebGl features. I like working on Raspberry PI OS and thus also have to deal with the limitations of the VideoCore VI GPU of the Raspberry PI 4. In [r150 of the library](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r150/README.md) the WebGLRenderer has totally crashed and burned which cased me to start plaing future [code style rules with r149](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r149/README.md). Simply put in general version numbers very much matter with this stuff, and not just with threejs alone.


## 1 - The First version of the breath module, and some demos

There is then covering the state of the breath module itself, and then also getting into a few demos as a way to test drive what I have thus far. With that said there are two general public methods of interest one of which is used to create an [instance of THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/), with a whole bunch of useful data attached to the [user data object](/2021/02/16/threejs-userdata/) of this group which is very much there for these kinds of projects. The other public method if interest is used to update the state of these values.

This far the module seems to work okay with what I have in mid thus far, and as of now the current panes for future revisions have to do with reducing complexity actually rather than adding features.

### 1.a - Breath.js R0

The current state of the source code of the module is broken down into three general parts thus far. One part is for defaults and constant values for versions things over the body of the source code. ANother part has to do with private helper functions that are used as tools for the final part which is the pubic API of the module.

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

### 1.1 - Using the default options

I will want to start out with a demo of the module that is a kind of hello world type getting started type demo. Nothing fancy just creating an instance of the group that is returned when calling the breath modules create public method. Also with that said I can make sure that i get an expected result when calling the create method with no options at all that will of course result in a breath module with everything set to the hard coded default settings for thing.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(5, 2, 1)
scene.add(dl);
//-------- ----------
// BREATH GROUP - creating with default settings
//-------- ----------
const group = BreathMod.create();
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0, 8);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 30 * 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a_breathPart = a1;
    const a_breath = Math.sin(Math.PI * 0.5 * a_breathPart);
    BreathMod.update(group, a_breath);
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

### 1.2 - Custom options for curve and mesh updates

So it looks like this are working just fine with the default settings so now it is time to have a demo with some custom options for update the group of mesh objects.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(5, 2, 1)
scene.add(dl);
//-------- ----------
// BREATH GROUP
//-------- ----------
const group = BreathMod.create({
    curveCount: 20,
    meshPerCurve: 16,
    radiusMin: 0.5, radiusMax: 8,
    breathsPerMinute: 5,
    breathParts: {restLow: 1, breathIn: 4, restHigh: 1, breathOut: 4},
    curveUpdate: (curve, alpha, v_c1, v_c2, v_start, v_end, gud, group) => {
        const e1 = new THREE.Euler();
        e1.z = Math.PI / 180 * 60 * alpha;
        const e2 = new THREE.Euler();
        e2.z = Math.PI / 180 * -60 * alpha;
        v_c1.copy( v_start.clone().lerp(v_end, 0.25).applyEuler(e1) );
        v_c2.copy( v_start.clone().lerp(v_end, 0.75).applyEuler(e2) );
    },
    meshUpdate: (mesh, curve, alpha, index, count, group) => {
        // position
        const a_meshpos = (index + 1) / count;
        mesh.position.copy( curve.getPoint(a_meshpos * alpha) );
        // opacity
        const a_meshopacity = (1 - a_meshpos) * 0.50 + 0.50 * alpha;
        mesh.material.opacity = a_meshopacity;
        // scale
        const s = 0.25 + 2.25 * a_meshpos * Math.sin(Math.PI * 0.5 * alpha);
        mesh.scale.set( s, s, s );
    },
    material: new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.1
    })
});
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0, 8);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 30 * 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a_breathPart = a1;
    const a_breath = Math.sin(Math.PI * 0.5 * a_breathPart);
    BreathMod.update(group, a_breath);
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

### 1.3 - The hooks option

I also have a hooks feature that is a way to define custom logic for each part of a breath cycle.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(5, 2, 1)
scene.add(dl);
//-------- ----------
// GEOMETRIES / MATERIALS
//-------- ----------
const geometry_center = new THREE.SphereGeometry(1.0, 20, 20);
const geometry_orbs = new THREE.SphereGeometry(0.1, 16, 16);
const material_center = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.1
});
const material_orbs = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.1
});
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(geometry_center, material_center);
scene.add(mesh1);
//-------- ----------
// BREATH GROUP
//-------- ----------
const group = BreathMod.create({
    geometry: geometry_orbs,
    material: material_orbs,
    breathsPerMinute: 1,
    breathParts: {restLow: 1, breathIn: 3, restHigh: 1, breathOut: 3},
    curveCount: 16,
    meshPerCurve: 6,
    radiusMin: 1.1, radiusMax: 2.9,
    breathsPerMinute: 5,
    breathParts: {restLow: 1, breathIn: 4, restHigh: 1, breathOut: 4},
    curveUpdate: (curve, alpha, v_c1, v_c2, v_start, v_end, gud, group) => {
        v_c1.copy( v_start.clone().lerp(v_end, 0.25) );
        v_c2.copy( v_start.clone().lerp(v_end, 0.75) );
    },
    meshUpdate: (mesh, curve, alpha, index, count, group, gud) => {
        const a_meshpos = (index + 1) / count;
        mesh.position.copy( curve.getPoint(a_meshpos * alpha) );
        mesh.material.color = new THREE.Color(1,1,1);
        const a1 = gud.a_breathPart;
        if(gud.currentBreathKey === 'restLow'){
            mesh.material.color = new THREE.Color(0,1,1);
        }
        if(gud.currentBreathKey === 'restHigh'){
            mesh.material.color = new THREE.Color(1,0,0);
        }
        if(gud.currentBreathKey === 'breathIn'){
            mesh.material.color = new THREE.Color(a1, 1 - a1, 1 - a1);
        }
        if(gud.currentBreathKey === 'breathOut'){
            mesh.material.color = new THREE.Color(1 - a1, a1, a1);
        }
    },
    hooks : {
        restLow : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, 0.05 * a_breathPart);
            group.rotation.y = Math.PI * 2 * a_breathPart;
        },
        restHigh : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, 1 - 0.05 * a_breathPart);
            group.rotation.y = Math.PI * 2 * a_breathPart * -1;
        },
        breathIn : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, 0.05 + 0.95 * Math.sin(Math.PI * 0.5 * a_breathPart) );
            group.rotation.y = 0;
        },
        breathOut : (updateGroup, group, a_breathPart, a_fullvid, gud) => {
            updateGroup(group, 0.95 - 0.95 * Math.sin(Math.PI * 0.5 * a_breathPart) );
            group.rotation.y = 0;
        }
    }
});
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0, 8);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 30 * 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a_breathPart = a1;
    const a_breath = Math.sin(Math.PI * 0.5 * a_breathPart);
    BreathMod.update(group, a_breath);
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

## 2 - Reduction of Complexity, but added better hooks and alphas in R1

After using this module for a few video projects thus far I have found that I should remove the groups of objects that are updated using curves. It is not that I do not like what I worked out with that, it is just that I think that the main focus of this module should just be to update alpha values over time that are then used to update something else outside of this module that will change up from one project to the next. So for R1 of breath.js everything that has to do with this curve group that was in R0 has been removed, as that is something that I think should be a whole other project outside of this breath module.

### 2.a - The breath.js module \( R1 \)

Here is then R1 of the breath module now.

```js
// breath.js - r1 - from threejs-examples-breath-module
(function(api){
    const BREATH_KEYS = 'restLow,breathIn,restHigh,breathOut'.split(',');
    const BREATH_DISP_NAMES = 'rest low, breath in, rest high, breath out'.split(',');
    //-------- ----------
    // DEFAULTS
    //-------- ----------
    const DEFAULT_BREATH_PARTS = {restLow: 1, breathIn: 5, restHigh: 1, breathOut: 5};
    const DEFAULT_HOOKS = {
        restLow : (group, a_breathPart, a_fullvid, gud) => {},
        restHigh : (group, a_breathPart, a_fullvid, gud) => {},
        breathIn : (group, a_breathPart, a_fullvid, gud) => {},
        breathOut : (group, a_breathPart, a_fullvid, gud) => {}
    };
    //-------- ----------
    // HELPERS
    //-------- ----------
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
    // get a breath parts string for display
    const getBreathPartsString = (group) => {
        const gud = group.userData;
        return Object.keys(gud.breathParts).reduce( (acc, key, i) => {
            const n = gud.breathParts[key];
            const a = n / gud.breathPartsSum;
            const s = gud.secsPerBreathCycle * a;
            acc += s.toFixed(2) + 's ' + BREATH_DISP_NAMES[i] + (i === 3 ? '' : ', ');
            return acc;
        }, '');
    };
    const secsToTimeStr = (totalSecs) => {
        const minutes = Math.floor( totalSecs / 60 );
        const secs = Math.floor(totalSecs % 60);
        return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0')
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // main update method
    api.update = (group, a_fullvid) => {
        const gud = group.userData;
        gud.a_fullvid = a_fullvid;
        gud.sec = gud.totalBreathSecs * gud.a_fullvid;
        gud.timeString = secsToTimeStr(gud.sec);
        gud.a_breath = (gud.sec % 60 / 60) * gud.breathsPerMinute % 1;
        gud.rest = true;
        gud.breath = false;
        gud.low = false;
        let ki = 0;
        while(ki < BREATH_KEYS.length){
            if(gud.a_breath < gud.breathAlphaTargts[ki]){
                gud.a_base = ki > 0 ? gud.breathAlphaTargts[ki - 1] : 0;
                gud.a_breathPart = (gud.a_breath - gud.a_base) / (gud.breathAlphaTargts[ki] - gud.a_base);
                gud.currentBreathKey = BREATH_KEYS[ki]
                if( gud.currentBreathKey === 'restLow'){
                    gud.a_breath_state = 0;
                    gud.low = true;
                }
                if( gud.currentBreathKey === 'restHigh'){
                    gud.a_breath_state = 1;
                    gud.low = false;
                }
                if( gud.currentBreathKey === 'breathIn'){
                    gud.a_breath_state = Math.sin(Math.PI * 0.5 * gud.a_breathPart);
                    gud.rest = false;
                    gud.breath = true;
                    gud.low = true;
                }
                if( gud.currentBreathKey === 'breathOut'){
                    gud.a_breath_state = 1 - Math.sin(Math.PI * 0.5 * gud.a_breathPart);
                    gud.rest = false;
                    gud.breath = true;
                    gud.low = false;
                }
                // call before hook
                gud.before(group, gud.a_breath, gud.a_breath_state, gud.a_fullvid, gud.a_breathPart, gud.currentBreathKey, gud);
                // call the current breath hook
                const hook = gud.hooks[ gud.currentBreathKey ];
                hook(group, gud.a_breathPart, gud.a_fullvid, gud);
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
        gud.totalBreathSecs = opt.totalBreathSecs === undefined ? 300 : opt.totalBreathSecs;
        gud.breathsPerMinute = opt.breathsPerMinute === undefined ? 5 : opt.breathsPerMinute;
        gud.breathParts = opt.breathParts || DEFAULT_BREATH_PARTS;
        gud.breathAlphaTargts = getBreathAlphaTargets(gud.breathParts);
        gud.before = opt.before || function(){};
        gud.hooks = Object.assign({}, DEFAULT_HOOKS , opt.hooks );
        gud.id = opt.id || '1';
        gud.sec = 0;
        // set in api.update
        gud.currentBreathKey = '';
        gud.a_fullvid = 0;
        gud.a_base = 0;
        gud.a_breathPart = 0;  // alpha value of the current breath part
        gud.a_breath = 0;
        gud.a_breath_state = 0;
        // booleans that can be used in hooks
        gud.rest = false;
        gud.breath = false;
        gud.low = false;
        // display values
        gud.breathPartsSum = getBreathPartsSum(gud.breathParts);
        gud.secsPerBreathCycle = 60 / gud.breathsPerMinute;
        gud.breathPartsString = getBreathPartsString(group);
        gud.totalTimeString = secsToTimeStr(gud.totalBreathSecs);
        gud.timeString = secsToTimeStr(gud.sec);
        // update and return
        api.update(group, 0);
        return group;
    };
}(this['BreathMod'] = {} ));
```

### 2.1 - update hooks demo

I thus far have just one demo of R1 of the breath module.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const geo = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh( geo, material);
mesh1.position.z = -4;
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geo, material);
mesh2.position.z = -2;
scene.add(mesh2);
const mesh3 = new THREE.Mesh( geo, material);
mesh3.position.z = 0;
scene.add(mesh3);
const mesh4 = new THREE.Mesh( geo, material);
mesh4.position.z = 2;
scene.add(mesh4);
//-------- ----------
// BREATH GROUP - creating with default settings
//-------- ----------
const BREATH_SECS = 60;
const group = BreathMod.create({
    totalBreathSecs: BREATH_SECS,
    breathsPerMinute: 6,
    breathParts: {restLow: 1, breathIn: 7, restHigh: 1, breathOut: 3},
    before: (group, a_breath, a_state, a_fullvid, a_breath_part, breathPart, gud) => {
        mesh1.position.x = -5 + 10 * a_breath;
        mesh2.position.x = -5 + 10 * a_state;
        mesh3.position.x = -5 + 10 * a_fullvid;
        mesh4.position.x = -5 + 10 * a_breath_part;
        scene.background = new THREE.Color(0,0,0);
        if(gud.breath){
            scene.background = new THREE.Color(0,1,1);
        }
    }
});
scene.add(group);
const gud = group.userData;
console.log(gud.secsPerBreathCycle)
console.log(gud.breathPartsString);
console.log(gud.totalTimeString);
console.log(gud.timeString);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(4, 4, 8);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 30 * BREATH_SECS;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a_breathPart = a1;
    const a_breath = Math.sin(Math.PI * 0.5 * a_breathPart);
    BreathMod.update(group, a_breath);
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

So far so good with this project, and I am sure that I will be making at least a few video projects using this module. In time I am sure I will have a better idea of what needs to change with respect to future revisions of this module. Thus far I am thinking that much of that might have to do with removing features rather than adding them actually. AT least that is what I did with R1 of the example at least as there is much that I think should not be baked into the module itself. The main thing here is to just have a module that will update alpha values that I then in turn used for one or more additional things in an over all scene that will change from one project to the next.

As wih R1 I think that I now have an okay system at least for this work of thing, and now any additional changes will have to do with things that might come up if I use this a great deal more.


