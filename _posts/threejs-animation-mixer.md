---
title: The Animation Mixer in threejs
date: 2023-07-13 12:57:00
tags: [three.js]
layout: post
categories: three.js
id: 1060
updated: 2023-07-13 13:08:21
version: 1.1
---

The animation mixer in threejs is what can be used to play animations for a given object. There is however a whole lot of other classes and features that one will also need to be aware of even to just create a very basic hello world type example of this sort of thing.

<!-- more -->


## 1 - Basic Examples of the Animation Mixer

### 1.1 - Single Vector key frame track used with the position attribute

The animation mixer of threejs is very complex, even when it comes to a simple hello world type example there is still a great deal to be aware of with this one. Still someone needs to start somewhere with this, and with that said that is what this example will be. When it comes to using an animation mixer I will want to create an animation action object. There is a method of the animation mixer object that can be used to create and return this kind of object, however in order to call this method I need an animation clip object. To create an animation clip object I can call THREE.AnimaitonClip to do so, however I will first need at least one Key frame track object to do so. There are a number of options when it comes to this keyframe track object, and sense this is a very basic example of all of this I will be starting out with the THREE.VectorKeyframeTrack class. This vector key frame track class is what I will want to use in order to animate, say the position property of a mesh object over time.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// VECTOR KEY FRAME TRACK, and ANIMATION CLIP
// ---------- ----------
const track = new THREE.VectorKeyframeTrack('.position', [0, 1], [
    5,  0, -5,
   -5,  0,  5
]);
const clip = new THREE.AnimationClip('move', -1, [ track ] );
// ---------- ----------
// OBJECT
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// MIXER/ACTION
// ---------- ----------
const mixer = new THREE.AnimationMixer( mesh )
const action = mixer.clipAction( clip );
action.play();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90,
CLOCK = new THREE.Clock(true);
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
const update = (frame, frameMax) => {
    const a_frame = frame / frameMax;
    const a_framesin = (  Math.sin(  Math.PI * 2 * a_frame ) + 1 ) / 2;
    // when it comes to video projects I will often want to use setTime over update
    mixer.setTime( 1 * a_framesin );
};
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```