---
title: The Animation Mixer in threejs
date: 2023-07-13 12:57:00
tags: [three.js]
layout: post
categories: three.js
id: 1060
updated: 2023-07-14 11:46:51
version: 1.7
---

The [animation mixer in threejs](https://threejs.org/docs/#api/en/animation/AnimationMixer) is what can be used to play animations for a given object. There is however a whole lot of other classes and features that one will also need to be aware of even to just create a very basic hello world type example of this sort of thing. As such it should go without saying that this is one of the more advanced topics when it comes to using threejs, but still it is only so complex and I have found that once I have got a basic hello world style example up and running the more complex use case examples end up getting a whole lot easier to follow.

<!-- more -->

## Animation Mixer objects and what to know first

This is a blog post on the use of Animation Mixer objects in the javaScript library known as threejs. If you are new to what these things are then you might want to start with some kind of [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or maybe even on [client side javaScript in general](/2018/11/27/js-getting-started/). Even if you have a fair amount of experience with these topics you might still want to read up on a few topics before hand that are relevant to this topic of animation mixer objects.

### The Vector3 class, and the position property of object3d class based objects

I think that a good starting point for key frame tracks to use with a mixer would be to use vector key frame track objects. If you have no idea what these are that is okay as this will be covered in the very first example of the basic section. However I am still assuming that you know at least a thing or two about [Vector3 class objects](/2018/04/15/threejs-vector3/), and the [position property of object3d class based objects](/2022/04/04/threejs-object3d-position/) such as mesh objects.

### Morph attributes, and attributes in general

When it comes to creating and loading external buffer geometry data that is a whole lot to say that I will not be getting into detail here of course. There are a whole lot of file formats to choose from, and with that both built in and add on loaders to load such files into a threejs project. However the main thing of interest here is to make sure that the geometry data has some [morph attributes](/2023/02/03/threejs-buffer-geometry-morph-attributes/) at least. Morph attributes are ways off adding additional sets of data in ether absolute data, or deltas for other main buffer geometry attributes of interest, mainly the [position](/2021/06/07/threejs-buffer-geometry-attributes-position/) and [normal attributes](/2021/06/08/threejs-buffer-geometry-attributes-normals/).

### Source Code is also up on Github

The source code examples that I am writing about in this post can also be found in my [test threejs project](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-animation-mixer) up on Github. This is also where I have placed all the other source code examples for the [many other blog posts on threejs](/categories/three-js/) that I have wrote over the years.
### Version Numbers Matter

When I first wrote this blog post I was following the [r152 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) that I set for myself. The major change here is the use of module type script tags over that of old school text/javaScript type tags. If you do not know what these means, sorry, getting into that is outside the scope of this post. In general though if you see the use of import at the top of the code examples, then module type tags are being used.

## 1 - Basic Examples of the Animation Mixer

This will then be a basic section of the animation mixer objects of threejs, or at least as basic as I can make it for what it is worth. There are a whole lot of features that one will need to be aware of even when it comes to a very simple hello world type example of this sort of thing. Still the goal in this section is to keep things as striped down as possible while keeping the more advanced examples that have to do with morph attributes and various file formats, loaders and so forth at the later, more advanced sections of this post.

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

## 2 - Examples using JSON file assets from my 'tri12' project

I started a collection of JSON files that I have called just simply tri12 which as the name suggests is a collection of assets where I am creating models that are composed of no more than 12 triangles. In this section I will then be going over some Animation Mixer examples that make use of these files. With that said there are a few options when it comes to loading JSON format files, and also there are several differing formats of course. For example there is having a JSON file that just contains data for a buffer geometry object alone, but then there is a JSON format for loading one or more whole objects with geometry, materials, and animation data.

There are a lot of options when it comes to external data for geometry, and other data that has to do with over all objects. However I think that JSON is maybe one of the best options when it comes to learning about the THREEJS animation system to begin with. The loaders of interest are built into the core of threejs itself rather than in an additional add on loader. Also the process of converting workable objects to JSON strings and vis versa is just a matter of using the JOSN.stringify, and JSON.parse methods built into client side javaScript itself. Yet another good reason for going with this format is that when it comes creating models by hand coding data with a text editor rather than using a program like blender a plain text format like JSON makes the process of doing so easier.

### 2.a - The Buffer Geometry JSON Format

The buffer geometry JSON format that will then be used with the [THREE.BufferGeometry loader](/2018/04/12/threejs-buffer-geometry-loader/) can be created by calling the toJSON method of a buffer geometry object to get a general sense of how that data is structured. However the geometry to which it is created form might not have one or more morph attributes. Morph attributes are a way to update the position, and normal attributes of a buffer geometry over time by giving additional data for these buffer geometry attributes. The data can be absolute values for each position, or in the case of the files that I am using in this section delta values from the original states of the attributes by setting the morphTargetsRelative boolean to true.

```json
{
  "metadata":{
    "version":4.5,
    "type":"BufferGeometry",
    "generator":"Hand Coded"
  },
  "type":"BufferGeometry",
  "data":{
    "attributes":{
      "position":{
        "itemSize":3,
        "type":"Float32Array",
        "array":[
          0.0, 0.0, 0.0,
         -1.0, 2.0, 0.0,
         -1.0, 0.5, 0.0,
          1.0, 2.0, 0.0,
          1.0, 0.5, 0.0,
         -0.7,-1.0, 0.0,
         -0.7,-0.1, 0.0,
          0.7,-1.0, 0.0,
          0.7,-0.1, 0.0
        ],
        "normalized":false
      },
      "normal":{
        "itemSize":3,
        "type":"Float32Array",
        "array":[
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1
        ],
        "normalized":false
      },
      "uv":{
        "itemSize":2,
        "type":"Float32Array",
        "array":[
          0,0,
          1,0,
          1,1,
          1,0,
          1,1,
          1,0,
          1,1,
          1,0,
          1,1
        ],
        "normalized":false
      },
      "color":{
        "itemSize":3,
        "type":"Float32Array",
        "array":[
          1,0,0,
          0.7,0.5,0,
          0.7,0.5,0,
          0.7,0.5,0,
          0.7,0.5,0,
          0.9,0.5,0,
          0.9,0.5,0,
          0.9,0.5,0,
          0.9,0.5,0
        ],
        "normalized":false
      }
    },
    "index":{ 
        "type": "Uint16Array",
        "array": [
          0,1,2,
          0,4,3,
          0,6,5,
          0,7,8
        ]
    },
    "morphTargetsRelative": true,
    "morphAttributes": {
      "position": [
        {
          "itemSize":3,
          "type":"Float32Array",
          "array":[
            0.0, 0.0, 0.0,
            0.0, 0.0,-0.8,
            0.0, 0.0,-0.8,
            0.0, 0.0,-0.8,
            0.0, 0.0,-0.8,
            0.0, 0.0,-0.4,
            0.0, 0.0,-0.4,
            0.0, 0.0,-0.4,
            0.0, 0.0,-0.4
          ],
          "normalized":false
        }
      ]
    }
  }
}
```

### 2.1 - Creating an animation clip using buffer geometry format JSON that has a morph attribute

For this demo then I am loading the above JSON data in the buffer geometry format, and then creating an animation keyframe track from it by using hard coded data in the javaScript file rather than loading additional JSON data. When it comes to the option that I use to do this I am using the new THREE.NumberKeyframeTrack class as the property that I want to mutate is the value of the first element of the morphTargetInfluences property of the mesh object that I will be using for the geometry. Once I have the key frame track I can then created the animation clip, the animation mixer, and then create the animation action by calling the clipAction method of the mixer.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo')  || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0.5, 0);
const state = {
   mesh: null,
   mixer: null
};
// loop
let frame = 0;
const frame_max = 30;
const loop = () => {
    requestAnimationFrame(loop);
    const a1 = frame / frame_max;
    state.mixer.setTime(1 * a1);
    renderer.render(scene, camera);
    frame += 1;
    frame %= frame_max;
};
//-------- ----------
// BUFFER GEOMETY LOADER
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/tri12-butterfly/set1-buffergeometry/0.json',
    // onLoad callback
    (geometry) => {
        // add mesh
        state.mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                vertexColors: true, 
                side: THREE.DoubleSide
            })
        );
        scene.add(state.mesh);
        // creating a Number Key Frame Track, clip, mixer, and action
        const track = new THREE.NumberKeyframeTrack('.morphTargetInfluences[0]', 
           [ 0, 0.25, 0.5, 0.75, 1],
           [ 0, 0.30, 0.5, 0.15, 0]
        );
        const clip = new THREE.AnimationClip('flap', -1, [ track ] );
        state.mixer = new THREE.AnimationMixer(state.mesh);
        const action = state.mixer.clipAction( clip );
        action.play();
        // start loop
        loop();
    }
);
```


## Conclusion

So then there is a lot more ground to cover when it comes to animation mixer objects in threejs, as well as all the various other closley related objects that are needed in order to do anything at all with this kind of threejs feature.
