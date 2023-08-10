---
title: The Matcap material in threejs
date: 2023-08-10 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 1066
updated: 2023-08-10 13:45:58
version: 1.0
---

The [Matcap material](https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial) is a mesh material option that can be used to have a model with baked in lighting. The way that this is done is by making use of the main option of interest with this material which I would say is the matcap option. The value of this mapcap option should be a drawing of a shaded sphere and it is this shaded sphere texture that will be used as a way to define the direction and intensity of the light. The texture of the mapcap option can also contain color data, but there is also a map option with this material that can be used as a way to separate these concerns.

<!-- more -->


## 1 - Basic MapCap Material demos

For this section I will just be going over a few simple demos of the matcap material that aim at just getting up and running with the material. Although you can just create an instance of the material without any options, chances are you are going to want to play around at least a little with some textures to use with the matcap option. So although the main focus in this section will be on just the matcap material alone, I am also going to want to at least touch base on some ways to create textures with a little javaScript code as well.

### 1.1 - Using a canvas texture for the matcap option

I think the most basic demo of this kind of material should still include some code that is used to create the kind of texture that will typicaly be used for the matcap option. So for this fist basic section demo I will be baking use of THREE.CanvasTexture as a way to create the kind of texture that I will want to use for the matcap option. The good news with this is that there is a method in the 2d drawing context that helps to make quick work of this which is of course the Create Radial Gradient Method, along with additional methods such as the add color shop method. When calling the  Create Radial Gradient Method I will want to give the center point of the texture, along with have the width as the radius. After that the remaining arguments can be used to adjust the position and radius of the additional circle for the gradient and it is these values that can be used as a way to adjust the direction and intensity of light.


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
// CANVAS / TEXTURE
// ---------- ----------
const canvas = document.createElement('canvas');
canvas.width = 128;
canvas.height = 128;
const ctx = canvas.getContext('2d');
const r1 = canvas.width / 2;
const x1 = r1, y1 = r1, x2 = r1 * 1.4, y2 = r1 * 1.4, r2 = r1 / 4;
const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
gradient.addColorStop(0, 'black');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
const texture = new THREE.CanvasTexture( canvas );
texture.colorSpace = THREE.SRGBColorSpace;
texture.magFilter = THREE.NearestFilter;
document.body.appendChild(canvas);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshMatcapMaterial({ matcap: texture });
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry(1, 30, 30);
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

So I am not sure if I will be using this matcap material that much in actual projects, if at all, but in any case this does bring up some interesting topics with materials. Often the deal with materials is you go with one of the options that will respond to light sources such as the Phong, Lambert, or Standard materials and then add some light sources to the scene. However an alternative that I have found that I like to do is to just go with the Mesh Basic Material, and then just work out what shading should be with some plain old map textures, and kick lights to the curbe. I would still take that approach first and foremost when it comes to that kind of over all style, but this matcap material is a nice similar alternative that will be on my radar to say the least about it.

