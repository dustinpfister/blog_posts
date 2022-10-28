---
title: Create Path tool threejs example
date: 2022-10-28 07:27:00
tags: [three.js]
layout: post
categories: three.js
id: 1011
updated: 2022-10-28 09:16:30
version: 1.12
---

Lately I have been taking another look into [curves in threejs](https://threejs.org/docs/#api/en/extras/core/Curve) by making a few quick demos of the [Quadratic Bezier curve3 constructor](https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve3) which is one of several options to create a curve apart from creating a custom curve. There are a number of uses for creating curves, but for the most part my interest in them is to explore what my options are for coming up with a javaScript project that helpers me define the movement of object3d based objects, mainly mesh objects and cameras.

One major [threejs example project](/2021/02/19/threejs-examples/) that I made and also have made a few revisions of this far is my [sequence hooks module](/2022/05/12/threejs-examples-sequence-hooks/) that I use to break down a video project into several sequence objects. Anyway in a late revision of the example I added a feature that allows for me to add paths to be used for each sequence which gave me the idea to make a tool to help with the process of creating the data to use for these, thus I started this create path tool threejs example that I will be writing about here.

<!-- more -->

## The create path tool threejs example and what to know first

This is a post on a threejs example of a tool that can be used to create paths. There is a lot to be aware of before getting into making this kind of project that I will not be getting into detail in this post. However I will take a moment to write about a few key things that are closely related to this example, and like to other posts in which I do get into detail.

### Check out the base curve class

The [base curve class](/2022/06/17/threejs-curve/) is what I would want to use when it comes to creating my own custom curve object instances to use with threejs features such as the Tube geometry constrictor, or create arrays of vector3 objects to create a collection of points. The curve class can also be used to get a single Vector3 object that is along a curve by making use of a get point prototype method of the curve class. There are a lot of key details to be aware of which it comes to the base curve class then and how it can prove to be useful.

### The Quadratic Bezier curve3 constructor is a great choice when it comes to just using a built in class and moving on

Although the base curve class is what I will want to use when it comes to making my own custom curves in space there are a number of built in options that also will work well for most common tasks. The main task that I want to do with this curve creation tool will be resolve just fine with the [THREE.QuadraticBezierCurve3 class](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) that works by giving a start, control and end option in space by way of Vector3 objects.

### Orbit controls

I would like to have a tool where I can orbit around a scene and then click and drag mesh objects around to adjust the state of a curve. So then this project will make use of the orbit controls file that can be found in the threejs Github repository. That is that this is a feature that is not baked into the core of the threejs library itself but rather must be added on top of the library. If you want to [read up more on orbit controls I have wrote a post](/2018/04/13/threejs-orbit-controls/) on this before hand.

### Raycaster

In this threejs example I want to click and drag mesh objects in a scene and use the position property of the object to set the start, control, and end points of a curve. I am doing this by making use of the [raycaster class](//2021/05/18/threejs-raycastser/) which is very useful for this sort of thing. 

### Source code is up on github

This threejs example started as one of my [r140 demos in my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r140/proto-curve-paths-tool). I also have my [for post folder set up](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-create-path-tool) where I will be parking any and add future revisions of this project that I might get to at some point when and if I get the time to do so.

### version numbers matter

When I first started this post I was using r140 of threejs.

## The first prototype of the tool thus far \(r0\).

In this section I will be writing a thing or two about the first prototype of this path creation tool where I just mutate the start control and end points of a single quadratic curve3 object. Event when it comes to doing that alone though there are still a few things to be aware of. For example there is how to go about clicking a mesh object to begin with, when it comes to that there is of course using the raycaster class. Another thing it how to go about getting a visual idea of what is going on with the current state of the curve, for this I can use the get points method of the curve class to get an array of Vector3 objects that I can then use with the set from points method of the buffer geometry class to create a geometry that I can then use with THREE.Points. Still the goal here is to keep things as simple as possible and just get the core idea of what I want to work.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// STATE OBJECT
//-------- ----------
const state = {
    controls: new THREE.OrbitControls(camera, renderer.domElement),
    down: false,
    raycaster : new THREE.Raycaster(),
    mouse_down: new THREE.Vector2(-5, -5),
    mouse_current: new THREE.Vector2(-5, -5),
    axis: 'x', //the current axis to control
    snapMode: true,
    d: 0, // distance and angle
    a: 0,
    mesh: null,
    v_start: new THREE.Vector3(),
    v_end: new THREE.Vector3()
};
//-------- ----------
// HELPERS
//-------- ----------
// create curve helper
const createCurve = (vStart, vEnd, vControl) => {
    return new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
};
// create points helper
const createPoints = (curve) => {
    return new THREE.Points(
         (new THREE.BufferGeometry).setFromPoints( curve.getPoints(50) ),
         new THREE.PointsMaterial({ size: 0.4, color: new THREE.Color(0,1,0) })
    );
};
// update points
const updatePoints = (points, curve) => {
    const geo = points.geometry;
    const pos = geo.getAttribute('position');
    const v3Array = curve.getPoints(50);
    const len = v3Array.length;
    let i = 0;
    while(i < len){
        const v = v3Array[i];
        pos.array[i * 3] = v.x;
        pos.array[i * 3 + 1] = v.y;
        pos.array[i * 3 + 2] = v.z;
        i += 1;
    }
    pos.needsUpdate = true;
};
// create mesh helper
const createMesh = () => {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 20, 20),
        new THREE.MeshNormalMaterial()
    );
    return mesh;
};
// update a mouse v2 with the given event
const updateMouse = ( event, mouse ) => {
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
// reset mouse v2
const resetMouse = ( event, mouse ) => {
    mouse.x = -5;
    mouse.y = -5;
};
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh_start = createMesh();
const mesh_end = createMesh();
const mesh_control = createMesh();
scene.add(mesh_start);
scene.add(mesh_end);
scene.add(mesh_control);
//-------- ----------
// CURVE POINTS
//-------- ----------
const vStart = new THREE.Vector3(0, 0, 5);
const vEnd = new THREE.Vector3(0, 0, -5);
const vControl = new THREE.Vector3(0, 0, 0);
const curve = new THREE.CurvePath();
curve.add( createCurve( vStart, vEnd, vControl) );
const points = createPoints(curve);
scene.add(points);
mesh_start.position.copy(vStart);
mesh_end.position.copy(vEnd);
mesh_control.position.copy(vControl);
// ---------- ----------
// ORBIT CONTROLS
// ---------- ----------
renderer.domElement.addEventListener('pointerdown', (event) => {
    state.down = true;
    updateMouse(event, state.mouse_down);
    updateMouse(event, state.mouse_current);
    state.raycaster.setFromCamera( state.mouse_current, camera );
    const intersects = state.raycaster.intersectObjects([mesh_control, mesh_start, mesh_end], true );
    state.mesh = null;
    if(intersects[0]){
        state.controls.enabled = false;
        state.mesh = intersects[0].object;
        state.v_start = state.mesh.position.clone();
    }
});
renderer.domElement.addEventListener('pointerup', (event) => {
    state.down = false;
    state.controls.enabled = true;
    resetMouse(event, state.mouse_current);
    const vStart = mesh_start.position;
    const vEnd = mesh_end.position;
    const vControl = mesh_control.position;
    const curve = new THREE.CurvePath();
    curve.add( createCurve( vStart, vEnd, vControl) );
    // calling update points method
    updatePoints(points, curve);
});
renderer.domElement.addEventListener('pointermove', (event) => {
    updateMouse(event, state.mouse_current);
    if(state.down && state.mesh){
         const m1 = state.mouse_down;
         const m2 = state.mouse_current;
         state.d = parseFloat( m1.distanceTo(m2).toFixed(4) );
         state.a = Math.PI + parseFloat( ( Math.atan2( m1.y - m2.y, m1.x - m2.x) ).toFixed(4) );
         // moving control mesh
         const x = Math.cos(state.a) * 5 * state.d;
         const v = new THREE.Vector3();
         v[state.axis] = x;
         state.v_end = state.v_start.clone().add( v );
         if(state.snapMode){
             state.v_end.x = Math.round( state.v_end.x );
             state.v_end.y = Math.round( state.v_end.y );
             state.v_end.z = Math.round( state.v_end.z );
         }
         state.mesh.position.copy(state.v_end)
    }
});
// ---------- ----------
// KETBOARD EVENTS
// ---------- ----------
window.addEventListener('keydown', (e) => {
    ['x', 'y', 'z'].forEach( (key) => {
         if(e.key.toLowerCase() === key){
             state.axis = key;
         }
    });
});
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){};
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

Event with what I have together thus far I am ready have the core idea of what I want working, but now the question is do I put more time into this in order to add the additional features that I want. It would be nice to have some kind of tool in which I can adjust things my just clicking and dragging mesh objects as a way to change the start point, end point, and control point. However I have found that I can also just manually define these when working out the  source code for a video project also, and doing so is not all that time consuming thus far.

I have found that if I use a tool often enough I will get around to making improvements to it now and then, otherwise it will just be yet another one of my unfinished projects that is just the core idea up and running and that is it.