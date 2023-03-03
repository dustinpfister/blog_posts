---
title: A Breath Module threejs project example
date: 2023-03-03 08:45:00
tags: [three.js]
layout: post
categories: three.js
id: 1030
updated: 2023-03-03 10:25:56
version: 1.5
---

I made a javaScript module that can be used as a core tool in the process of making a number of video projects that can be used as tools for controlled breathing exercises. The core idea of these kinds of videos is to have a number of objects update in such a way that they are in sycn with a rate at which people watching the video breath. So there is a lot of little details that come up when making a javaScript module to update things such as how many breaths per minute, how many minutes, and also other details about each breath cycle. Details for each breath cycle are things like what is the ratio of time for each opening reset, breath in, high rest, and breath out part. There are also a lot of things that come to mind when it comes to having an expression for the alpha values that will be used to position objects along curves, and also update just about everything else.

<!-- more -->

## The breath module example and what to know first

This is a blog post on a javaScript IIFE form module, and several demos of the module, that work on top of threejs in a front end javaScript environment. It should go without saying but I have to say it in each of these posts, this is not a post for people that are new to threejs let alone javaScript in general. I assume that you have at least a fair amount of experience with the skills that are required before hand to get something of values from reading this. Still in any case I do use these opening sections to wrote about a few things that you might want to read up more on regardless of experience.

### IIFE and JSM

As of this writing I still follow and old [IIFE pattern](/2020/02/04/js-iife/) for making javaScript modules which is in line with the use of three.min.js over that of three.module.js. However at some point in the not to distance future I will have to start wiring new modules and updating old ones in the JSM format.

### Source code is up on Github

I have the current sould code for this module and the demos up on my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-breath-module) on Github. This is also where I place the source code examples that show up in all my [other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first wrote this blog post and made the first version of this module I was using [r146 of threejs and thus follow that style rules I set for that revision](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r146/README.md). I am also at the time of this writing at least sticking to my tired yet true IIFE pattern for javaScript modules. The plan with new posts and editing older posts is to stick with this well into this coming year, but still the days with this kind of style are very much coming to an end. The three.min.js files that I have been using are very much on the chopping block it would seem, so at some point I am going to need to start including JSM versions of my module for people that want to use bleeding edge revisions of threejs.

In any case always be mindful of what revision of threejs that you are using when trying to get code examples such as the ones I am writing about here to work on your end. Code breaking changes are made to threejs all the time so it often is best to stick with the revisions that I am using with these examples. Also I have found that it is a good idea to be aware of what kind of GPU you are using on your system and what the support is for OpenGL and therefor WebGl features. I like working on Raspberry PI OS and thus also have to deal with the limitations of the VideoCore VI GPU of the Raspberry PI 4. In [r150 of the library](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r150/README.md) the WebGLRenderer has totally crashed and burned which cased me to start plaing future [code style rules with r149](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r149/README.md). Simply put in general version numbers very much matter with this stuff, and not just with threejs alone.


## 1 - The First version of the breath module, and some demos

There is then covering the state of the breath module itself, and then also getting into a few demos as a way to test drive what I have thus far. With that said there are two general public methods of interest one of which is used to create an instance of THREE.Group, with a whole bunch of useful data attached to the user data object of this group which is very much there for these kinds of projects. The other public method if interest is used to update the state of these values.

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

## Conclusion

So far so good with this project, and I am sure that i will be making at least a few video projects using this module. In time I am sure I will have a better idea of what needs to change with respect to future revisions of this module. Thus far I am thing that much of that might have to do with removing features rather than adding them actually. The general idea that i have now is that the core of the module itself should just be used to create and update alpha values that I then use to update everything else with the children of the group, but also objects the exist outside of the group as well. I still think that the create method should return an object3d class based object though, so I am thinking that I might want to have some kind of plugin system with maybe a very basic built in functionality that can be replaced by way of one or more options plugins.


