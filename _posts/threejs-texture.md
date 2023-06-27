---
title: Textures in threejs
date: 2023-06-27 08:24:00
tags: [three.js]
layout: post
categories: three.js
id: 1055
updated: 2023-06-27 12:44:02
version: 1.6
---

The [texture class in threejs](https://threejs.org/docs/#api/en/textures/Texture) is a way to go about creating the kind of object that is used for the various map options of materials. There are a number of ways to create this kind of object, such using the texture loader, or creating an image with javaScript code by way of canvas of data textures. In any case there are a lot of little details that one will need to be aware of when it comes to what there is to work with when it comes to th texture class alone. Also things can end up branching off into a wide range of other topics while we are at it when it comes to texture in general when it comes to how textures are used with mesh materials, backgrounds, and so forth.

<!-- more -->

## Textures and what to know first

This will be a blog post on the texture class in threejs, and while I am at it I will also have to at least touch base on some closely related topics as well. I will not be getting into detail with various course skills that you should all ready have solid before hand here when it comes to the [basics of threejs](/2018/04/04/threejs-getting-started/). However in any case I do like to always use these opening sections to wrote about a few subjects that you might want to read up on also if you have not done so before hand.

### There are also UV attributes, material index values, and various buffer geometry topics 

When it comes to really getting into how to work with textures the process of doing so is not just with the texture, but also how to work with some details with the geometry that is used as well. For example there is the [UV attribute of buffer geometry objects](/2021/06/09/threejs-buffer-geometry-attributes-uv) that is an attribute of geometry that contains offset values that are used in the process of mapping a 2d image of a texture object to a 3d object in terms of buffer geometry, a mesh material and an overlapping mesh object.

Another feature of geometry to be aware of that is relevant to the use of textures is the [groups array of buffer geometry](/2018/05/14/threejs-mesh-material-index/) objects. This will come into play when using an array of materials, each of which might have there own texture.

### There is also knowing a thing or two about materials

There is a whole lot of [ground to cover when it comes to materials](/2018/04/30/threejs-materials/) that I will not be getting into here of course. When using textures there are certain materials such as the normal, and depth materials to which the various map options of interest are just not supported at all. Also depending on things like adding light or not the various map options will change from one material to the next. A good starting material option would be the [basic material](/2018/05/05/threejs-basic-material/), and just sticking with the map option of that material. Once the basics of textures are solid it is just a material of knowing what map is for what and which needs to change with the state of the texture used for it.
### Source code examples are up on Github

I also have the source code examples that I am writing about here up on [my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-texture). This is also the place on Github where I park the source code examples that I have made for my [many other blog posts on threejs](/categories/three-js/) that I have wrote thus far.

### Version Numbers matter

When I first wrote this blog post I was [using r152](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) for the source code examples of the post.

## 1 - Some Basic examples of Textures

TO kick off this post I am going to want to start out with some very basic getting started type demos. For this section then I will be sticking to using just the basic material and map option. On top of that these will be just simple static, single frame renders that will not involve anything to advanced that will come up when getting into animation loops.

### 1.1 - Basic example using canvas textures

One way to go about creating a texture object with a little javaScript code would be to use [canvas textures](/2018/04/17/threejs-canvas-texture/). There is the THREE.CanvasTexture constructor, however it is also possible to use THREE.Texture as well, it is just that the needs update boolean of the texture will need to be set to true after creating the texture that way as I am doing in this demo.

```js
// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT
//-------- ----------
const canvas = document.createElement('canvas'), 
ctx = canvas.getContext('2d');
canvas.width = 32;
canvas.height = 32;
ctx.fillStyle = '#0a0a0a';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
//-------- ----------
// TEXTURE - using a canvas element
//-------- ----------
const texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// GEOMETRY, MATERIAL, MESH
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

One thing that is really nice about canvas texture is that I can use everything and anything in the 2d drawing context of canvas elements to create whatever kind of texture that I want. As such this might be one of the best ways to go if one needs to create textures by way of some javaScript code rather that external image assets.

### 1.2 - Using the Texture loader

The texture loader is then one way to go about loading in textures in the form of external image assets. There are a whole lot of other ways to go about loading textures this way of course. If you have any preferred way to load image files then the Image object can just be passed to THREE.texture. However if I just want to load images alone, and then do something else when it comes to geometry, materials and the state of objects then the texture loader is a good option for doing so.

```js
// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LOAD TEXTURE, ADD MESH, RENDER
//-------- ----------
const loader = new THREE.TextureLoader();
loader.load(
    '/img/smile-face/smile_face_256.png',
    (texture) => {
        texture.magFilter = THREE.NearestFilter;
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture
        });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const mesh = new THREE.Mesh( geometry, material);
        scene.add(mesh);
        renderer.render(scene, camera);
    }
);
```

There Might be a lot more to get into when it comes to the texture loader, and loaders in general. However this is very much a basic section on textures alone. I have my [main blog post on the texture loader](/2021/06/21/threejs-texture-loader/) if you are interested in some examples that have to do with loading many images, and other various advanced features of the texture loader, and loading managers.

## 2 - Features of the Texture Class

For this section I will not want to go over a few demos of the various features of the texture class.

### 2.1 - WrapS, WrapT, center, and repeat

By default a texture will not repeat as the Wraps And WrapT properties of textures will default to the THREE.ClampToEdgeWrapping constant. However the tick to get this to work does not just simply involve setting WrapS and WrapT to THREE.RepeatWrapping as there are some additional features of the Texture class that will typically also need to be adjusted for this. These other features are the center and repeat properties of the texture both of which are instances of the [Vector2 class](/2023/06/09/threejs-vector2/). The center vector object will need to have th x and y values adjusted with values between 0 and 1 as a way to adjust where there center of the image should be each repeat. After that there is the values of the Vector2 for the repeat property which default to 1 for x, and y, these will need to be increase to whatever values you want for the number or repeats for each axis.

```js
// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT
//-------- ----------
const canvas = document.createElement('canvas'), 
ctx = canvas.getContext('2d');
canvas.width = 32;
canvas.height = 32;
const gradient = ctx.createLinearGradient(0, 0, 32, 32);
gradient.addColorStop(0.0, 'red');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1.0, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
//-------- ----------
// TEXTURE - Using wraps wrapt and other features for having a repeating background
//-------- ----------
const texture_bg = new THREE.Texture(canvas);
texture_bg.needsUpdate = true;
texture_bg.wrapS = THREE.RepeatWrapping;
texture_bg.wrapT = THREE.RepeatWrapping;
texture_bg.offset.set(0.5, 0.5);
texture_bg.repeat.set(4, 4);
//-------- ----------
// USING TEXTURE AS BACKGROUND
//-------- ----------
scene.background = texture_bg;
scene.add( new THREE.GridHelper(10, 10, 0xffffff, 0xffffff) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

There is a great deal more to be aware of when it comes to textures, and all kinds of additional topics that will come up the branch off from the subject of textures as well of course. However that might have to be it for this blog post at least. Some additional subjects with textures have to do with geometry, and the various map options of the various materials. In the opening section I wrote about uv attributes, with that said I have a [threejs example post that is a kind of advanced subject with uv mapping](/2022/11/04/threejs-examples-uvmap-cube-canvas-update/) that you might want to check out with that. As of the various map options I have wrote posts on [alpha maps](/2019/06/06/threejs-alpha-map/), and [emissve maps](/2021/06/22/threejs-emissive-map) which are to great options for some materials beyond just the map option.

