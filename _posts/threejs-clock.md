---
title: The Clock constructor in threejs
date: 2021-05-28 10:33:00
tags: [three.js]
layout: post
categories: three.js
id: 877
updated: 2021-05-28 13:00:05
version: 1.12
---

When it comes to making an animation loop in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) I have been using the built in JavaScript Date class along with request animation frame, but have not been making use of the Built in [THREE.Clock](https://threejs.org/docs/#api/en/core/Clock) constructor. Turns out that there are still a whole lot of basic features that I have not got around to looking into with three.js when it comes to this constructor and why it might be a good idea to go with this in place of the way that I have been making animation loops thus far. Still better late than never, so in this post I will be looking into the THREE.Clock constructor and also touching base on some client side javaScript features that are closely related to the class such as the [performance global](https://developer.mozilla.org/en-US/docs/Web/API/Performance) mainly the [now method](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) of that.

<!-- more -->

## 1 - THREE.Clock and what to know first

This is a post on using the THREE.Clock class in the javaScript library known as three.js. In this post I am also using a lot of other features of the library, and client side javaScript in general that I will not be getting into detail here. So I assume that you have at least some experience working with threejs, and client side javaScript, otherwise you might end up having a hard time gaining something of value from reading this. So in this section I will be mentioning some things that you might want to look into if you feel you need to take a step back.

### 1.1 - There are some client side javaScript features you should be aware of.

The use of the THREE.Clock class can be used with, or as a replacement for the built in javaScript Date object when it comes to setting up an animation loop with function. This kind of function is something that deserves a post on its own when it comes to how to go about making such a loop outside of threejs when it comes to native javaScript features. In fact I have wrote a few posts on this sort of thing when it comes to the use of the setTimeout method, and requestAnaimationFrame.

### 1.2 - Version Numbers matter with threejs

WhenI first wrote this post I was using r127 of threejs, always be mindful of what version of threejs you are suing and what version the developer of a content piece like this was suing when looking at threejs examples on the open web. Threejs is a fast moving project in terms of development and code breaking changes are made to it often.

## 2 - Basic loop example using THREE.Clock

To start out with the THREE.Clock class I made a basic example where I am using the THREE.Clock class as a way to replace the use of the javaScript Date constructor. When I make an animation loop I often have some kind of state object that will contain a property that contains a date object that is the time stamp at which the last time a frame tick was rendered. I then use that as a way to gage how much time has elapsed sense the last time the scene has rendered and then use that as a way to update objects by way of a per second value for everything. For example say I want to rotate a cube on the y axis at a rate of 45 degrees per second, I can take Math.PI divide by 180, multiply by 45, and then multiply by the number of seconds that have passed sense the last frame update to get a delta value in radians.

With this example in place of having an instance of Date, I am creating an instance of THREE.Clock. I then start the clock by calling the state method of the clock instance, and start the loop. I then call the get delta method of the clock inside the body of the loop which will return an amount of time in seconds. I can then use this seconds value to update the state of objects when it comes to working out some expressions for doing so. On top of that each time I call the get delta method that will result in the old time property of the clock being reset, so just calling the method is all I need to do, for this example at least.

```js
// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};
// a scene
var scene = new THREE.Scene();
// a mesh
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
// camera render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// START CLOCK
state.clock.start();
// loop
var loop = function () {
    // USING THE GET DELTA METHOD
    var secs = state.clock.getDelta();
    state.per = state.frame / state.maxFrame;
    requestAnimationFrame(loop);
    box.rotation.y = Math.PI * 2 * state.per;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    renderer.render(scene, camera);
};
loop();
```

So then this might prove to be an okay basic example, however there are some times a range of things that I might want to do differently when working out some kind of pattern for a main application loop like this. So I think that at least a few more additional examples of this THREE.Clock class are in order.

## 3 - Elapsed Time Demo

The get delta method is great for getting an amount of time that has elapse sense the last frame update, but if I want to get the total about of time that has elapsed sense the clock has started then there is the get elapsed time method. In this example I am still updating the rotation of a cube by way of the get delta method, but I am also rotating on anther axis over all time using get elapsed time.

```js
// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};
// a scene
var scene = new THREE.Scene();
// a mesh
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
// camera render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// START CLOCK
state.clock.start();
// loop
var loop = function () {
    // USING THE GET DELTA METHOD FOR SECS
    // AND GET ELAPSED TIME DELTA FOR TOTAL SECS
    var secs = state.clock.getDelta(),
    totalSecs = state.clock.getElapsedTime();
    requestAnimationFrame(loop);
    // rotating box on y by SECS
    state.per = state.frame / state.maxFrame;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    box.rotation.y = Math.PI * 2 * state.per;
 
    // rotating x by TOTAL SECS
    box.rotation.x = Math.PI / 180 * 45 * (1 / totalSecs);
 
    renderer.render(scene, camera);
};
loop();
```

## 4 - Cap FPS example

One thing that is impotent to be aware of when it comes to these loop functions is having a way to limit the number or frames that are being rendered for every second. If no effort is made to do so the example might prove to eat up to much processor overhead on many clients and result in a bad user experience. It might be best to have some way to let users let what the target frame rate should be when it comes to some kind of options menu in a user interface. However maybe a good starting point would be to cope up with some kind of hard coded frame rate that still works well, while still being a low frame rate. Basically the lower the frame rate the lower the load on the processor and graphics adapter of the client, that means it will then use less power, and also have more resources to do other things that might be going on in the page.

```js
// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 12, // capping at 12 fps
    per: 0
};
// a scene
var scene = new THREE.Scene();
// a mesh
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
// camera render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// loop
var loop = function () {
    var wSecs = performance.now() - state.clock.oldTime,
    secs;
    requestAnimationFrame(loop);
    if (wSecs > 1 / state.fps) {
        secs = state.clock.getDelta();
        state.per = state.frame / state.maxFrame;
        box.rotation.y = Math.PI * 2 * state.per;
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
        renderer.render(scene, camera);
    }
};
// START CLOCK
state.clock.start();
console.log();
// start loop
loop();
```

## 5 - Conclusion

The THREE.Clock class might prove to me a more convenient solution when it comes to setting up an animation loop in threejs compared to what I often work out with just plane vanilla javaScript features. However there is not just using the Clock class when it comes to learning a thing or two about what is going on when it comes to vanilla javaScript by itself. What if I want to apply what it is that the Clock class is all about to a project outside that of three.js when it comes to a vanilla javaScript project for example? With that said there is not just using the Clock class there is also looking into the preference object in general in client side javaScript, however maybe getting deep into that is a matter for a whole other post.
