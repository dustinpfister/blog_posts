---
title: Fly Controls in threejs
date: 2021-05-05 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 860
updated: 2022-12-04 14:41:22
version: 1.22
---

There are a number of official camera controls that can be used with [threejs](https://threejs.org/) it is just that they are not built into the core of three.js itself. I [wrote a post on one of these camera control options which was the orbit controls](/2018/04/13/threejs-orbit-controls/) a long time ago, but I thought that I should take a moment to look into at least one of the other options to make use of in some examples such as the [three.js fly controls](https://threejs.org/docs/#examples/en/controls/FlyControls.dragToLook). So then this will be a quick post on use the official fly controls in a three.js project.

<!-- more -->

## Fly Controls in three.js and what to know first

In this post I am writing about the official three.js fly controls in three.js which is a javaScript library that can be used to work with 3d models. So then this is not a [getting started type post with three.js](/2018/04/04/threejs-getting-started/) as I have wrote a post on that topic before. However in this section I will be going over a few quick things to know about before continuing with the code examples that I am writing about here with the three.js fly controls.

### Make sure that you have added the fly controls after adding three.js in the html

The official fly controls can be found in the [examples folder of the official three.js github repository](https://github.com/mrdoob/three.js/blob/r127/examples/js/controls/FlyControls.js). When grabbing a copy from there make sure that it is for the version of three.js that you are using. Changes are rare with many of these controls, but I have found that they do happen once in a while.

### Source code is on Github

The Source code examples that I am writing about here [can also be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-fly-controls/s1-1-basic).

### Version Numbers matter with three.js

When I wrote this post I was using [r127 of three.js](https://github.com/mrdoob/three.js/tree/r127). Code breaking changes are made to three.js every now and then so if the examples here are not working the first thing to check is what version of three.js is being used. After that there are some additional things to be aware of such as the fact that these code examples will break if you are not adding the official fly controls on top of three.js by itself.

## 1 - Some Basic getting started type examples of fly controls

There are two general ways of using fly controls, one of which I think is intended, and the other way maybe not. You see everything will work just fine if and only if the whole page is being used for the project. In the event that I am using a dom element that just takes up and area of the page the mouse controls will not work as expected. There are ways of addressing this though by making use of an iframe for example. So in this section I will have a basic example where the whole page is used, and another where an iframe is being used.

### 1.1 - Fly controls example that uses the whole page

So now that I have all the basic stuff in place when it comes to having a scene object as well as something to look at in terms of one or more mesh objects, a camera object, and a renderer all in place now I can get to the actual fly controls. To use the Fly Controls I just need to call the THREE.FlyControls constructor that is added by way of the additional files in the examples folder of the three.js github repo that I mentioned in the basic section of this post. 

When calling the constructor the first argument that I am going to want to pass is a reference to the [camera object](/2018/04/06/threejs-camera/) that I want to control with the fly controls, followed by a dom element reference that should typically be the dom element used by the renderer that I am using. However in this example I am using the debug canvas as that is on top of the canvas that is used to remder the threejs scene. After that I am more often than not going to want to save the returned instance of fly controls to a variable or object property to set some additional values, and also to call the update method in a main app loop method.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 1, 100);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
const container = ( document.getElementById('demo') || document.body );
container.appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const appendDebugCanvas = (parent) => {
    const canvas = document.createElement('canvas');
    canvas.width = parent.width;
    canvas.height = parent.height;
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    parent.parentNode.insertBefore(canvas, parent);
    return canvas;
};
const drawDebugInfo = (canvas, ctx, camera, fc) => {
    // clear and draw black overlay
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    // text style
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    // draw camera position object into
    const v = camera.position;
    const cx = v.x.toFixed(2);
    const cy = v.y.toFixed(2);
    const cz = v.z.toFixed(2);
    ctx.fillText('campos: ' + cx + ', '  + cy + ', ' + cz, 10, 10);
    // draw yaw flight control movement
    const yl = fc.moveState.yawLeft.toFixed(2);
    const yr = fc.moveState.yawRight.toFixed(2);
    ctx.fillText('yaw: ' + yl + ' left, ' + yr + ' right', 10, 25);
    // pitch
    const pd = fc.moveState.pitchDown.toFixed(2);
    const pu = fc.moveState.pitchUp.toFixed(2);
    ctx.fillText('pitch: ' + pu + ' up, ' + pd + ' down', 10, 40);
};
//-------- ----------
// DEBUG CANVAS
//-------- ----------
// debug canvas
const canvas_debug = appendDebugCanvas(renderer.domElement);
const ctx_debug = canvas_debug.getContext('2d');
//-------- ----------
// FULL PAGE
//-------- ----------
const style1 = container.style;
style1.zIndex = 3;
style1.position = 'absolute';
style1.top = '0px';
style1.left = '0px';
style1.width = '100%';
style1.height = '100%';
const style2 = renderer.domElement.style;
style2.width = '100%';
style2.height = '100%';
const style3 = canvas_debug.style;
style3.width = '100%';
style3.height = '100%';
//-------- ----------
// MESH
//-------- ----------
const groundBox = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshDepthMaterial());
groundBox.position.set(0, -1, 0);
scene.add(groundBox);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// FLY CONTROLS
//-------- ----------
// With FLY CONTROLS the camera is given as the first argument, and
// the DOM element must now be given as a second argument for this example
// I am giving the debug cnavas
const flyControls = new THREE.FlyControls(camera, canvas_debug);
console.log(flyControls);
flyControls.dragToLook = true;
flyControls.movementSpeed = 3;
flyControls.rollSpeed = Math.PI / 24;
flyControls.autoForward = false;
// draw debug into for first time
drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);
// change event
flyControls.addEventListener('change', (evnt) => {
    drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);
});
//-------- ----------
// WINDOW EVENTS
//-------- ----------
// supress up and down
const supressKeys = (evnt) => {
    if(evnt.key === 'ArrowUp' || evnt.key === 'ArrowDown'){
        evnt.preventDefault();
    }
};
window.addEventListener('keyup', supressKeys);
window.addEventListener('keydown', supressKeys);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    requestAnimationFrame(loop);
    // UPDATE CONTROLS
    flyControls.update(secs);
    renderer.render(scene, camera);
};
loop();
```

When it comes to the additional properties there is the draw to look Boolean that I have chose to set to true from the default false value of the controls. There is also the movement speed, and rotation speed values that I have played around with a little and it would seem that these are the per second deltas to use when passing a time delta value when calling the update method.

After that I have my main app loop in which I am getting a seconds value each time the loop method is called and I am then of course passing that to the update method of the fly controls each time.

There is then how to go about using the fly controls when and if you do get them up and running, with that said there are the w,a,s,d keys along with the q, and e keys on the keyboard that should be of interest for you. The wasd keys can be used to change the camera position along a forward backward and up and down kind of movement. The q and e keys are then ways to adjust rotation with the keyboard rather than the mouse. The mouse then can be used as a way to look around from the current camera position.

### 1.2 - Fly controls in an iFrame

Often I might not want to use the whole page, but rather use the fly controls in a single canvas element in a web page. This is where things can get a little weird, but there are ways of doing this, and one way would be to use an iframe. So for this example I am attaching the dome element of my renderer not to the usual div element, or body, but rather to the body of a document that is in the content window of an iframe. When doing so I have found that the keyboard events will stop working when the iframe is focused on, this is because in the source code of the fly controls the keyboard events are attached to the main window event and not the window event of this iframe. So they way that I went about fixing this was to just use the function bind prototype method to create a handler for the on down and on up methods of the fly controls that and attached that for the on key down and on key up events of the iframe.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 1, 100);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
const container = ( document.getElementById('demo') || document.body );
//-------- ----------
// IFRAME
//-------- ----------
const iFrame = document.createElement('iframe');
iFrame.width = 640;
iFrame.height = 480;
iFrame.frameBorder = 0;
container.appendChild(iFrame);
const body = iFrame.contentWindow.document.body;
body.appendChild(renderer.domElement);
// some style
body.style.margin = '0px';
//-------- ----------
// HELPERS
//-------- ----------
const appendDebugCanvas = (parent) => {
    const canvas = document.createElement('canvas');
    canvas.width = parent.width;
    canvas.height = parent.height;
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    parent.parentNode.insertBefore(canvas, parent);
    return canvas;
};
const drawDebugInfo = (canvas, ctx, camera, fc) => {
    // clear and draw black overlay
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    // text style
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    // draw camera position object into
    const v = camera.position;
    const cx = v.x.toFixed(2);
    const cy = v.y.toFixed(2);
    const cz = v.z.toFixed(2);
    ctx.fillText('campos: ' + cx + ', '  + cy + ', ' + cz, 10, 10);
    // draw yaw flight control movement
    const yl = fc.moveState.yawLeft.toFixed(2);
    const yr = fc.moveState.yawRight.toFixed(2);
    ctx.fillText('yaw: ' + yl + ' left, ' + yr + ' right', 10, 25);
    // pitch
    const pd = fc.moveState.pitchDown.toFixed(2);
    const pu = fc.moveState.pitchUp.toFixed(2);
    ctx.fillText('pitch: ' + pu + ' up, ' + pd + ' down', 10, 40);
};
//-------- ----------
// MESH
//-------- ----------
const groundBox = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshDepthMaterial());
groundBox.position.set(0, -1, 0);
scene.add(groundBox);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// FLY CONTROLS
//-------- ----------
// debug canvas
const canvas_debug = appendDebugCanvas(renderer.domElement);
const ctx_debug = canvas_debug.getContext('2d');
// With FLY CONTROLS the camera is given as the first argument, and
// the DOM element must now be given as a second argument for this example
// I am giving the debug cnavas
const flyControls = new THREE.FlyControls(camera, canvas_debug);
console.log(flyControls);
flyControls.dragToLook = true;
flyControls.movementSpeed = 3;
flyControls.rollSpeed = Math.PI / 24;
flyControls.autoForward = false;
// draw debug into for first time
drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);
// change event
flyControls.addEventListener('change', (evnt) => {
    drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);
});
//-------- ----------
// WINDOW EVENTS
//-------- ----------
// iframe keyboard
iFrame.contentWindow.addEventListener('keyup', flyControls.keyup.bind(flyControls) );
iFrame.contentWindow.addEventListener('keydown', flyControls.keydown.bind(flyControls) );
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    requestAnimationFrame(loop);
    // UPDATE CONTROLS
    flyControls.update(secs);
    renderer.render(scene, camera);
};
loop();
```

Although this seems to work okay, still the best way might be to make a whole other html file, and make that the src of the iframe. In any case you get the general idea of how this works and how it will resolve the problem with mouse events not working as I would like them to when not using the whole page.

## Conclusion

So that is all that I have to say about the official fly controls in three.js so far, when I get some time to edit this post I will be sure to expand things when and if I get the time to do so. For now there is maybe taking a moment to look into some of the other official controls to worth with such as the orbit controls also, before considering to look into how to get started with making ones own custom camera controls. I think that I will be getting around to working one or two demos about making custom controls sooner or later, but for now I just like to make use of what there is to work with that is official to just save some time.
