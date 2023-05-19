---
title:  Level Of Detail Objects in threejs
date: 2023-05-19 08:49:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1042
updated: 2023-05-19 09:32:45
version: 1.2
---

The [Level Of Detail LOD Object](https://threejs.org/docs/#api/en/objects/LOD) in threejs is an [Object3d class based object](/2018/04/23/threejs-object3d/) that can be composed of a collection of mesh objects where each mesh object is a differing degree of detail for the same LOD Object. It is then possible to set a camera distance for each of these mesh objects that are added to the LOD object so that as an object moves away from the camera the level of detail will go down. Therefore the use of LOD objects is one way to help go about reduce the volume of work that needs to be done when rendering a frame, therefore helping to improve Frame Rate.

<!-- more -->

## The LOD Object in threejs and what to know first

This is a Blog post on Level of Detail Objects in the javaScript library known as threejs. With that said I am assuming that anyone that is reading this has at least a little experience when it comes to using threejs, as well as with client side javaScript in general. If not then it might be hard for you to gain something of value from reading this. In any case in these opening sections I write about a few things that you might want to read up more on before continuing.

### The Source code Examples here are on Github

As with all my [other blog posts on threejs](/categories/three-js/), the source code examples here are also up on Github in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-lod).

### Version Numbers Matter

When I wrote this blog post I was using [r152 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md), and I am also using [javaScript module script tags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) over that of standard plain text/javaScript mime type script tags. This will have to end up being the standard at some point in the future, so I am starting to work out how to go about doing that while also trying to write content that is friendly for people that want to stick with older revisions of threejs. So if things are not working on your end with these examples, one of the first things to check is the revision number. Also on top of that now there is also making sure if you are using module type script tags or regular script tags.

## 1 - Basic LOD example

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 50, 50 ) );
// lod object with levels added
const lod = new THREE.LOD();
const material = new THREE.MeshNormalMaterial({ wireframe: true, wireframeLinewidth: 1 });
const detail_levels = 3;
const dist_max = 50;
for( let i = 0; i < detail_levels; i++ ) {
    const a_level = i / ( detail_levels - 1);
    const widthSegments = Math.floor( 50 - 40 * a_level );
    const heightSegments = Math.floor( 30 - 25 * a_level );
    const geometry = new THREE.SphereGeometry( 4, widthSegments, heightSegments );
    const mesh = new THREE.Mesh( geometry, material );
    lod.addLevel( mesh, dist_max / detail_levels * i );
}
scene.add( lod );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 3, 5);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 600,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 ) / 0.5;
    const a3 = THREE.MathUtils.smoothstep(a2, 0, 1);
    lod.position.z = dist_max * -1 + dist_max * a3;
    camera.lookAt(lod.position);
};
// loop
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

## Conclusion

