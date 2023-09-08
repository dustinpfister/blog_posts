---
title: Drag Controls in threejs
date: 2023-09-07 12:00:00
tags: [three.js]
layout: post
categories: three.js
id: 1070
updated: 2023-09-08 09:51:41
version: 1.3
---

There is always working out my own UI controls for a threejs project. However if I want to quickly create typical types of controls there are a number of official options for this that can be pulled from the examples folder in the github repository. I have all ready wrote posts on the orbit and fly controls way back in the day that I come around to edit once in a while. However I still have not got around to covering all the the official options just yet and with that said this post will be on the [drag controls](https://threejs.org/docs/#examples/en/controls/DragControls).

Just like with all the other kinds of official controls the drag controls and not baked into the core of the threejs library itself. Rather it must be added along with the core library. If you are still using an older revision of threejs such as r147 or older you still have the js folder and with that plain old javaScript tag type forms of the drag controls to use if you navigate to the revision you are using. However if you are using r148 or later you will need to use the JSM form of the drag controls, or hack over the code to get it to work for you.

<!-- more -->

## Drag Controls in threejs and what to know first

There are a lot of things that you should be up to speed with before hand that I am not going to get into detail with here. I assume that you have at least a little experience with threejs and client side javaScript in general. If not this is not a post for you and I suggest that you start with some kind of [post that is a starting point for threejs](/2018/04/04/threejs-getting-started/) or [javaScript in general](/2018/11/27/js-getting-started/). I will as always with these kind of post write about at least a few things that you might want to be aware of though here in this opening section of the post.

### There are a lot of other official controls to check out

As I have said in the intro of this post there are a few other official options for controls. With that said I have wrote a post on the subject or [Orbit controls](/2018/04/13/threejs-orbit-controls/) all ready. Also in addition to that there is also my post on [fly controls](/2021/05/05/threejs-fly-controls/) as well. There are a number of additional options beyond all of these as well that at this time I have not wrote posts on.

### Source is up on Github

The source code examples that I am writing about here can also be found in my [test threejs repository on GitHub](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-drag-controls). This is also where I park the examples for the many other [posts that I have wrote on threejs](/categories/three-js/) thus far as well.

### Version Numbers matter

When I first wrote this post I was following my [r152 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) that I have set for myself. This means that I am using module type script tags over that of ye old text\/javaScript mime type script tags. This needs to be the case sense r148+ at this time sense the js folder in the examples folder of the threejs GitHub repository is no longer being rendered. If you want to use the plain JavaScript form files you will need to use r147- to get that working.



### 1.1 - Simple form of the offical drag controls example

There is maybe starting out by looking at the source code of the [official threejs example on the subject of drag controls](https://github.com/mrdoob/three.js/blob/r152/examples/misc_controls_drag.html). However I have found that this example is a little to busy for a getting started demo. So I hacked over things a lot with that to make a var more basic getting started type example of that demo. This still results in a bunch of mesh objects with random position, rotation, and  scale along with random color. The positioning is a bit different, but I was able to reduce the number of lines a lot.

Anyway the basic idea here is that I pass an array of objects that I want to be the subjects of the drag controls as the first argument when calling the main DragControls constructor. After that I pass a reference to the camera object that I want to use, and then the element to attacked the control events to.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { DragControls } from 'DragControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 32 / 24, 0.1, 500);
const container = document.querySelector('#demo') || document.body;
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
container.appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
scene.add(new THREE.AmbientLight(0xaaaaaa, 0.1));
const dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);
// ---------- ----------
// OBJECTS
// ---------- ----------
const geometry = new THREE.BoxGeometry();
const objects = [];
for (let i = 0; i < 100; i++) {
    const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff
    });
    const object = new THREE.Mesh(geometry, material);
    object.position.randomDirection().multiplyScalar(10);
    object.scale.random().multiplyScalar(3).add( new THREE.Vector3(0.5, 0.5, 0.5) );
    object.quaternion.random();
    scene.add(object);
    objects.push(object);
}
// ---------- ----------
// RENDER
// ---------- ----------
function render() {
    renderer.render(scene, camera);
};
// ---------- ----------
// CONTROLS / SETUP
// ---------- ----------
const controls = new DragControls(objects, camera, renderer.domElement);
controls.addEventListener('drag', render);
camera.position.z = 30;
render();
```

### 1.2 - Lock objects along an axis and the drag start event

For this demo I am not working with an even more basic starting point that is just a single mesh object. Also I am now using the mesh normal material which is a nice option to help show some depth without the need for a light source. The main event with this demo though is the use of the drag start event along with the drag event. You see the event objects will contain a reference to the object that is being dragged here. Also on top of that the drag start event will fire before the drag event. This can then prove to be useful if I want to do something that involves locking the drag action to just one or to axes. I can use the drag start to set the current value of a vector of the object, and then in the drag event I can set one or more axes in that vector to the vector of the position property of the object.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { DragControls } from 'DragControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 32 / 24, 0.1, 500);
const container = document.querySelector('#demo') || document.body;
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
container.appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
const geometry = new THREE.BoxGeometry();
const objects = [];
const material = new THREE.MeshNormalMaterial();
const object = new THREE.Mesh(geometry, material);
object.position.set( 0, 0, 0)
scene.add(object);
objects.push(object);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
const render = function() {
    renderer.render(scene, camera);
};
// ---------- ----------
// CONTROLS / SETUP
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt( 0, 0, 0 );
const controls = new DragControls(objects, camera, renderer.domElement);
const v_locked = new THREE.Vector3( 1,1,0);
const v_lockedAt = new THREE.Vector3();
controls.addEventListener('dragstart', (evnt) => {
    const obj = evnt.object;
    v_lockedAt.copy( obj.position );
});
controls.addEventListener('drag', (evnt) => {
    const obj = evnt.object;
    if(v_locked.x){
        obj.position.x = v_lockedAt.x;
    }
    if(v_locked.y){
        obj.position.y = v_lockedAt.y;
    }
    if(v_locked.z){
        obj.position.z = v_lockedAt.z;
    }
    render();
});
render();
```

## Conclusion

The Drag controls can then prove to be a useful tool to quickly create the kind of typical UI controls that one will want to have in many projects that one would want to have this kind of control of objects. Often there might need to be some additional coded added in the from of some logic for one or more of the events such as the case with the lock to axis methods. However The core, basic functionally that is needed is very much there and it is just a little touch up work that will need to be added beyond that when making the oval all final controls for a project.
