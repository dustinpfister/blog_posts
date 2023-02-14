---
title: Scene Shake threejs example
date: 2021-05-06 14:11:00
tags: [three.js]
layout: post
categories: three.js
id: 861
updated: 2023-02-14 15:27:22
version: 1.24
---

For another [threejs example](/2021/02/19/threejs-examples/) I made a scene shake module that can be used to shake the whole [scene object](/2018/05/03/threejs-scene/). When I do so that way I just need to pass the scene object to a method that will apply the current state of a shake object to the scene object. One thing I will want to keep in mind with this is that I do not want to add the camera that I am using to render the scene to the scene object, because if I do I can not see the shake as the camera will be relative to the scene. In the event that I do need to add the camera to the scene then the shake object can be applied to some other object in threejs that is based off of the [object3d class](/2018/04/23/threejs-object3d) other that the scene object such as a group, or the camera.

This shake module might then work out okay when it comes to adding some kind of screen shake effect to a threejs project. For the sake of trying to keep things short, simple and too the point, I did not go over board with features for thus module. The core of the idea is that I just need a way to randomly move an object around within a range, or apply some other kind of logic to produce the shake effect. That is it and as long as it does that more of less it is just a matter of things like code style, and fixing the code when breaking changes are made to threejs itself. So maybe this also will work as a good example of how to go about making a javaScript module for a threejs project as well while I am at it.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/IYVYW74BdhE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The shake module threejs example and what to know first

In this post I am writing about a module that works on top of threejs to provide a way to create and update a screen or object shake effect. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or any additional skills that are required in order to extract something of value from reading this. However in this section I will be briefly writing about a few things that you might want to read up more on before reading the rest of the post.

### Read more about Vector3 and Euler class objects

If you are still a little new to threejs it might be a good idea to read more about the [Vector3 class](/2018/04/15/threejs-vector3/) which is great for just about almost all things that have to do with the position of objects in space. Snese this is a project example where I aim to make a kind of screen shake effect the Vector3 class will end up being used a little for this project of course. However there is also the [Euler class](/2021/04/28/threejs-euler) of threejs as well that is like Vector3 but it has more to do with angles rather that position.

### Check out more on the Object3d class

The scene object is just one example of an object that is based on the [object3d class](/2018/04/23/threejs-object3d/) that you might want to read more about if you get the chance. The position property of an object3d based stores a vector3 object which can be used to set the position of the scene object. Also the rotation property of object3d stores a Euler class object and can be used to set the rotation of the object which also comes handy for making a scene shake effect. When setting the position of the scene object there is no parent object of the scene object so the position is relative not to a parent object but something that seems to be often referred to as world space.

### Source code is up on Github

The source code examples that I am writing about here can also be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-scene-shake). This is also a repository where I store the source code examples for my [many other blog posts](/categories/three-js/) on threejs as well.

### Version Numbers matter with three.js

When I made this shake module, and the demos that make use of it, I was using threejs version r127. The last time I came around to do some editing I was using a dev version of r150. With that said this is the first post in which I am working out updated code that is in line with my [r150 code style rules](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r150). 

The demos where working fine on my end last I checked. However in the future it is possible that the code examples here will break on newer versions of threejs as code breaking changes are made all the time to threejs. Always take care to note how old a post is, or any mentions of versions of external assets used when making use of code examples on the open web.

## 1 - Module form of shake module, degree and position lock feature \( r2 \)

So it looks like threejs is going in a direction where old javaScript script tags will no longer me what is used to create threejs projects. So with that said I went ahead and made this post the first post in which I will start updating my threejs examples to a style in which I am using JSM rather that ye old javaScript tags. This makes things a little complex when it comes to things like the quetion if I should still maintain another set of modules in the IIFE module format or not for the sake of people that still want to use plain old javaScript script tags. In any case it looks like sooner or later we are all going to have to start using JSM if we like it or not, so I figure it would be best to start getting up to speed with this now rather than later.

If you still want to use the old script tags there are still the older revisions of this modue that I made for older versions of threejs. I will be keeping all of that up in these posts.

### 1.a - The shake-module.js file \( r2 \)

Here I have the updated module form of the shake module that is in JSM rather that IIFE format. On top of just making a few quick changes to pull that off I also was able to add the positon and degree lock features that I had writen down on the todo list for this project.

```js
/*   shake-module.js - r2 - from threejs-examples-scene-shake
 *       * module form of the shake.js
 *       * degLock, and posLock feature
 */
import * as THREE from 'three';
//-------- ----------
// HELPER FUNCITONS
//-------- ----------
// degree to radian
const deg = function (deg) {
    return Math.PI / 180 * deg;
};
// random pos value for an axis
const rndPos = function (state) {
    const nmin = state.pos * -1,
    nmax = state.pos * 2;
    return nmin + nmax * Math.random();
};
// random pos value for an axis
const rndDeg = function (state) {
    const nmin = deg(state.deg * -1),
    nmax = deg(state.deg * 2);
    return nmin + nmax * Math.random();
};
// just make a roll
const roll = function (shake) {
    shake.euler.x = rndDeg(shake);
    shake.euler.y = rndDeg(shake);
    shake.euler.z = rndDeg(shake);
    shake.vector.x = rndPos(shake);
    shake.vector.y = rndPos(shake);
    shake.vector.z = rndPos(shake);
};
// apply a new shake to object3d
const applyToObject3d = function (shake, obj3d) {
    // save home data
    if (!obj3d.userData.shakeData) {
        obj3d.userData.shakeData = {
            homeVector: new THREE.Vector3().copy(obj3d.position),
            homeEuler: new THREE.Euler().copy(obj3d.rotation)
        };
    }
    // if shake is active
    if (shake.active) {
        // copy shake.euler, and shake.vector to object
        obj3d.rotation.set(
            shake.euler.x * shake.degLock.x,
            shake.euler.y * shake.degLock.y,
            shake.euler.z * shake.degLock.z
        );
        obj3d.position.copy(shake.vector).multiply(shake.posLock);
    } else {
        // else set back to home location
        const sd = obj3d.userData.shakeData;
        obj3d.rotation.copy(sd.homeEuler);
        obj3d.position.copy(sd.homeVector);
    }
};
//-------- ----------
//  PUBLIC API
//-------- ----------
// The Public API
const ShakeMod = {};
// create a shake object
ShakeMod.create = function (opt) {
    opt = opt || {};
    const shake = {
        obj: opt.scene || opt.obj || new THREE.Object3D(), // new obj prop for shake obj
        posRange: opt.posRange || [0, 0.5],
        degRange: opt.degRange || [0, 2.25],
        intensity: opt.intensity || 0,
        pos: 0,
        deg: 0,
        euler: new THREE.Euler(0, 0, 0),
        vector: new THREE.Vector3(0, 0, 0),
        active: opt.active || false,
        degLock: opt.degLock || new THREE.Vector3(1, 1, 1),
        posLock: opt.posLock || new THREE.Vector3(1, 1, 1)
    };
    return shake;
};
// update the given shake object
ShakeMod.update = function(shake){
    // new shake.deg and shake.pos values
    const pMin = shake.posRange[0] * shake.intensity,
    pMax = shake.posRange[1] * shake.intensity;
    shake.pos = pMin + ( pMax - pMin ) * Math.random();
    // new deg value
    const dMin = shake.degRange[0] * shake.intensity,
    dMax = shake.degRange[1] * shake.intensity;
    shake.deg = dMin + ( dMax - dMin ) * Math.random();
    // new roll for euler and vector values
    roll(shake);
    // apply to the shake.obj prop
    applyToObject3d(shake, shake.obj);
};
// export the public methods
export { ShakeMod };

```

### 1.1 - On click, degree and position lock demo \( r2 \)

This is an updated version of the on click demo that I made for R0 of the shake.js module. On top of just working with the module form of the module I am also making use of the new position and degree lock features of the module. Also I was able to work out another way to set the intensity of the shake based on the position of the click event.

```js
// ---------- ----------
// IMPORT THREEJS and ADDONS
// ---------- ----------
// need to start using import in order to use three.module.js over three.min.js
// need to also use import for addons as examples/js is no more
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// IMPORT CUSTOM MODULES
// ---------- ----------
import { ShakeMod } from 'ShakeMod';
//-------- ----------
// SCENE, CAMNERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.querySelector('#demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GRID HELPER AND MESH OBJECT
//-------- ----------
const gridHelper = new THREE.GridHelper(5, 5);
scene.add(gridHelper);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0.5, 0);
scene.add(box);
//-------- ----------
// STATE OBJECT INCLDUING SHAKE OBJECT
//-------- ----------
const canvas = renderer.domElement;
const state = {
    fps: 30,
    lt: new Date(),
    shake: ShakeMod.create({
        scene: scene,
        posRange: [1, 5],
        degRange: [20, 45],
        posLock: new THREE.Vector3(1, 0, 1),
        degLock: new THREE.Vector3(0, 1, 0),
        intensity: 1
    })
};
//-------- ----------
// EVENTS
//-------- ----------
const pointerDown = function () {
    state.shake.active = true;
};
const pointerUp = function () {
    state.shake.active = false;
};
const pointerMove = function (shake, canvas) {
    return function (e) {
        e.preventDefault();
        const canvas = e.target,
        box = canvas.getBoundingClientRect(),
        x = e.clientX - box.left,
        y = e.clientY - box.top,
        v2_canvas_center = new THREE.Vector2(canvas.width / 2, canvas.height / 2),
        v2_pointer_pos = new THREE.Vector2(x, y);
        if(shake.active){
            const d = v2_canvas_center.distanceTo(v2_pointer_pos);
            shake.intensity = d / canvas.width;
            shake.intensity = shake.intensity > 1 ? 1 : shake.intensity;
        }
    };
};
// pointer events
renderer.domElement.addEventListener('pointerdown', pointerDown);
renderer.domElement.addEventListener('pointermove', pointerMove(state.shake, canvas));
renderer.domElement.addEventListener('pointerup', pointerUp);
renderer.domElement.addEventListener('pointerout', pointerUp);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
// fixed camera values should be done in the animation loop or render code section
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    ShakeMod.update(state.shake);
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
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

## 2 - shake.js now has a update method, and range values \( r1 \)

Sense I first wrote this post I have thus far made one revision of this shake.js module. So far I just made a few changes that have to do with making it so that there are just two public methods of interest to work with which are the create and update methods. All the other methods are now internal helper functions rather than additional methods that I must call. On top of this I thought I should also make a demo of the module that is an animation loop example, rather than that of an event driven example as I did for my first version of this shake module example.

### 2.a - The shake.js file \( r1 \)

With this first revision of the shake.js module I wanted to make it so that I now just have two public methods, a create method and an update method. This seems to often be the typical case with many of my modules thus far. That is that I have a create method that I use to create a kind of object then have at least one method that will act on that object such as an update method.

Sense I now just have two public methods in this module there are three general sections of the code. An area with internal helper methods, then a section for both of the public methods that I can use outside of the module in some code that will make use of this module.

```js
/*   shake.js -r1 - form threejs-examples-scene-shake
 *       * just an update public method
 *       * posRange, degRange, and intensity values
 */
(function (api) {
/********* **********
  HELPERS
********** *********/
    // degree to radian
    var deg = function (deg) {
        return Math.PI / 180 * deg;
    };
    // random pos value for an axis
    var rndPos = function (state) {
        var min = state.pos * -1,
        max = state.pos * 2;
        return min + max * Math.random();
    };
    // random pos value for an axis
    var rndDeg = function (state) {
        var min = deg(state.deg * -1),
        max = deg(state.deg * 2);
        return min + max * Math.random();
    };
    // just make a roll
    var roll = function (shake) {
        shake.euler.x = rndDeg(shake);
        shake.euler.y = rndDeg(shake);
        shake.euler.z = rndDeg(shake);
        shake.vector.x = rndPos(shake);
        shake.vector.y = rndPos(shake);
        shake.vector.z = rndPos(shake);
    };
    // apply a new shake to object3d
    var applyToObject3d = function (shake, obj3d) {
        // save home data
        if (!obj3d.userData.shakeData) {
            obj3d.userData.shakeData = {
                homeVector: new THREE.Vector3().copy(obj3d.position),
                homeEuler: new THREE.Euler().copy(obj3d.rotation)
            };
        }
        // if shake is active
        if (shake.active) {
            // copy shake.euler, and shake.vector to object
            obj3d.rotation.copy(shake.euler);
            obj3d.position.copy(shake.vector);
        } else {
            // else set back to home location
            var sd = obj3d.userData.shakeData;
            obj3d.rotation.copy(sd.homeEuler);
            obj3d.position.copy(sd.homeVector);
        }
    };
/********* **********
  CREATE METHOD
********** *********/
    api.create = function (opt) {
        opt = opt || {};
        var shake = {
            obj: opt.scene || opt.obj || new THREE.Object3D(), // new obj prop for shake obj
            posRange: opt.posRange || [0, 0.5],
            degRange: opt.degRange || [0, 2.25],
            intensity: opt.intensity || 0,
            pos: 0,
            deg: 0,
            euler: new THREE.Euler(0, 0, 0),
            vector: new THREE.Vector3(0, 0, 0),
            active: opt.active || false
        };
        return shake;
    };
/********* **********
  UPDATE METHOD
********** *********/
    // update the given shake object
    api.update = function(shake){
        // new shake.deg and shake.pos values
        var pMin = shake.posRange[0] * shake.intensity,
        pMax = shake.posRange[1] * shake.intensity;
        shake.pos = pMin + ( pMax - pMin ) * Math.random();
        // new deg value
        var dMin = shake.degRange[0] * shake.intensity,
        dMax = shake.degRange[1] * shake.intensity;
        shake.deg = dMin + ( dMax - dMin ) * Math.random();
        // new roll for euler and vector values
        roll(shake);
        // apply to the shake.obj prop
        applyToObject3d(shake, shake.obj);
    };
}
    (this['ShakeMod'] = {}));
```
Beyond reducing the number of public methods I also added a few features that I think are needed thus far. When it comes to create options I now do not set fixed starting values for the pos and deg shake object properties, but rather I set to arrays that are range values for the pos and deg values. I then can set a fixed intensity values, but when using this in a project this intensity value is something that I will want to mutate in the code. 

Another major change is the introduction of an obj property that is an object to which the shake object is to be applied to. The idea here then is that when I create the shake object I pass a ref to the object that I would like to have the shake apply to rather than having to call a separate method after updating the shake object alone.

### 2.1 - The animation loop example of shake.js \( r1 demo \)

Now for a demo of this improved version of the shake module that is an animation loop rather than an event driven demo that I made for the R0 version of shakejs.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GRID HELPER AND MESH OBJECT
//-------- ----------
const gridHelper = new THREE.GridHelper(5, 5);
scene.add(gridHelper);
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
box.position.set(0, 0.5, 0);
scene.add(box);
//-------- ----------
// STATE OBJECT INCLUDING SHAKE OBJECT
//-------- ----------
const state = {
    frame: 0,
    maxFrame: 300,
    fps: 30,
    lt: new Date(),
    shake: ShakeMod.create({
        obj: scene,
        posRange: [0.25, 0.5],
        degRange: [5, 20],
        active: true
    })
};
//-------- ----------
// UPDATE AND LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const update = function (state, secs) {
    ShakeMod.update(state.shake);
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date();
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        // changing intesnity value over time
        state.shake.intensity = state.bias;
        // update, render, step frame
        update(state, secs);
        renderer.render(scene, camera);
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
        state.lt = now;
    }
};
loop();
```

## 3 - The shake module \( r0 \) and event driven demo

In this section I will be going over the state of the first version of this shake module and an event driven demo of the module. This crude start of the module is a little weird, but never the less when used as intended it will result in a kind of shake effect.

### 3.a - The shake module \( r0 \)

This module has a public create method that I can use in a project to create an instance of what I am calling a shake object. This shake object will contain data about the current state of the shake such as the max values to use for position and rotation ranges. The shake object as of this first version also contains the current actual Euler and vector3 instance to use to offset a given object for a current frame tick.

After the create method I have a roll public method which will change the current state of the [Euler](/2021/04/28/threejs-euler/) and [Vector3](/2018/04/15/threejs-vector3/) class instances that are used to [set the position of the object](/2022/04/04/threejs-object3d-position/) to which the shake object is applied to. Speaking of applying a shake object to an object3d based object such as a scene object, to do that I also have one more additional public method that is used to apply the current state of shake object. This object can be the scene object which is what I originally intended to use this with, but it can also be used with any other object based on object3d such as a group, mesh, or camera.

I am making use of the [user data object](/2021/02/16/threejs-userdata/) of the object3d class as a way to park what the original values where for the position and orientation of the object that was passed to it. When the active flag is false the values park there will be used to set the position and orientation of the object, else a set of values in the shake object will be used that can bu updated with a roll method.

```js
/*   shake.js - r0 - for threejs-examples-scene-shake
 *
 *
 */
(function (api) {
    // degree to radian
    var deg = function (deg) {
        return Math.PI / 180 * deg;
    };
    // random pos value for an axis
    var rndPos = function (state) {
        var min = state.pos * -1,
        max = state.pos * 2;
        return min + max * Math.random();
    };
    // random pos value for an axis
    var rndDeg = function (state) {
        var min = deg(state.deg * -1),
        max = deg(state.deg * 2);
        return min + max * Math.random();
    };
    // create
    api.create = function (opt) {
        opt = opt || {};
        var shake = {
            pos: opt.pos === undefined ? 0.5 : opt.pos,
            deg: opt.deg === undefined ? 2.25 : opt.deg,
            euler: new THREE.Euler(0, 0, 0),
            vector: new THREE.Vector3(0, 0, 0),
            active: opt.active || false
        };
        return shake;
    };
    // just make a roll
    api.roll = function (shake) {
        shake.euler.x = rndDeg(shake);
        shake.euler.y = rndDeg(shake);
        shake.euler.z = rndDeg(shake);
        shake.vector.x = rndPos(shake);
        shake.vector.y = rndPos(shake);
        shake.vector.z = rndPos(shake);
    };
    // apply a new shake to object3d
    api.applyToObject3d = function (shake, obj3d) {
        // save home data
        if (!obj3d.userData.shakeData) {
            obj3d.userData.shakeData = {
                homeVector: new THREE.Vector3().copy(obj3d.position),
                homeEuler: new THREE.Euler().copy(obj3d.rotation)
            };
        }
        // if shake is active
        if (shake.active) {
            // copy shake.euler, and shake.vector to object
            obj3d.rotation.copy(shake.euler);
            obj3d.position.copy(shake.vector);
        } else {
            // else set back to home location
            var sd = obj3d.userData.shakeData;
            obj3d.rotation.copy(sd.homeEuler);
            obj3d.position.copy(sd.homeVector);
        }
    }
}(this['ShakeMod'] = {}));
```

There might be many more features I might want to add to something like this, and also maybe change the whole way that I go about creating the shake values to begin with even. However for the sake of this post, and also for the example itself maybe it would be best to try to keep this module relative simple and not go to far beyond what I all ready have here. Also much of the logic that comes to mind when it comes to setting the active flag and updating the roll, and setting the values for position and rotation range values will change a little from one use case to another anyway. So then maybe much more of what comes to mind should not be baked into the module, but just be additional logic in the demo that will be using this module.

### 3.1 - Base demo of the shake module where I am shaking the whole scene \( r0 demo \)

Now that I have my shake module together I am going to want a little more javaScript code that will serve as a way to test this module out. Much of this example is just more of the same when it comes to any other simple threejs code example, of full blown project in which I create a scene, one or more mesh objects, a camera, and a renderer. However one important thing to note is that if I want to use the shake with the scene object like I am doing in this example then I am going to want to not add the camera to the scene.

```js
//-------- ----------
// SCENE, CAMNERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GRID HELPER AND MESH OBJECT
//-------- ----------
const gridHelper = new THREE.GridHelper(5, 5);
scene.add(gridHelper);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0.5, 0);
scene.add(box);
//-------- ----------
// STATE OBJECT INCLDUING SHAKE OBJECT
//-------- ----------
const canvas = renderer.domElement;
const state = {
    fps: 30,
    lt: new Date(),
    shake: ShakeMod.create() // ADJUSTING pos and DEG by EVENTS
};
//-------- ----------
// EVENTS
//-------- ----------
const pointerDown = function () {
    state.shake.active = true;
};
const pointerUp = function () {
    state.shake.active = false;
};
const pointerMove = function (shake, canvas) {
    return function (e) {
        e.preventDefault();
        const canvas = e.target,
        box = canvas.getBoundingClientRect(),
        x = e.clientX - box.left,
        y = e.clientY - box.top;
        if (e.changedTouches) {
            x = e.changedTouches[0].clientX - box.left;
            y = e.changedTouches[0].clientY - box.top;
        };
        // Adjust pos and deg based on pointer position
        shake.pos = x / canvas.width * 0.95;
        shake.deg = y / canvas.height * 18;
    };
};
// mouse
renderer.domElement.addEventListener('mousedown', pointerDown);
renderer.domElement.addEventListener('mousemove', pointerMove(state.shake, canvas));
renderer.domElement.addEventListener('mouseup', pointerUp);
renderer.domElement.addEventListener('mouseout', pointerUp);
// touch
renderer.domElement.addEventListener('touchstart', pointerDown);
renderer.domElement.addEventListener('touchmove', pointerMove(state.shake, canvas));
renderer.domElement.addEventListener('touchend', pointerUp);
renderer.domElement.addEventListener('touchcancel', pointerUp);
//-------- ----------
// UPDATE AND LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const update = function (state, secs) {
    ShakeMod.roll(state.shake);
    ShakeMod.applyToObject3d(state.shake, scene);
};
// loop
const loop = function () {
    const now = new Date();
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        update(state, secs);
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
```

For this demo of the shake module I am using events as a way to adjust the shake pos and deg properties based on the position of a touch move or mouse move event on the canvas element. It is tempting to pull some of this into the module, but I think that this sort of thing will end up changing a little from one use case example to the next actually.

## Conclusion

This turned out to be a quick fun little example of using threejs as a way to create a scene shake module, that can also be used to shake other objects in a threejs environment. When it comes to suing this in projects in which I end up adding the camera to the scene then of course I am not going to want to make the scene object the object to which the shake applies then as the camera will then be relative to the scene object and things will not end up shaking. That kind of problem is easily fixed though by just wrapping everything that I want to shake into a group and then make that group the object that I use with my public method that apples the shake object to a threejs object based off of object 3d.
