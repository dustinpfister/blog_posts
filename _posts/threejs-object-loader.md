---
title: The Object Loader in threejs
date: 2023-07-19 13:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1061
updated: 2023-07-19 14:00:09
version: 1.1
---

The [Object Loader](https://threejs.org/docs/#api/en/loaders/ObjectLoader) in threejs is a loader option that is built into the core of the library itself that can be used to load JSON files that follow the [object format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4). Many other loaders for object formats must be added to threejs by making use of an additional add on file beyond just threejs itself so this alone is one reason why one might be interested in the format. However another nice thing about it is that it is also easy to work with when it comes to creating this kind of json data as just simply calling the toJSON method of the object that I want to convert will create the data in an object format, and then I can just pass that to the JSON.stringify method.

<!-- more -->


### 1.1 - Creating an object from a hard coded JSON string using the parse method

One way to get started with this Object Loader, and also to get familiar with the format, would be to use the parse method of the loader to create an object from a hard coded JSON string.

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
// JSON STRING IN OBJECT FORMAT
// ---------- ----------
const uuid_geometry = new THREE.MathUtils.generateUUID();
const uuid_material = new THREE.MathUtils.generateUUID();
const uuid_mesh = new THREE.MathUtils.generateUUID();
const mesh_json = `
{
    "metadata": {
        "version": 4.5,
        "type": "Object",
        "generator": "Hand Coded"
    },
    "geometries": [{
            "uuid": "` + uuid_geometry + `",
            "type": "BoxGeometry",
            "width": 1,
            "height": 1,
            "depth": 1
        }
    ],
    "materials": [{
            "uuid": "` + uuid_material + `",
            "type": "MeshNormalMaterial"
        }
    ],
    "object": {
        "uuid": "` + uuid_mesh + `",
        "type": "Mesh",
        "layers": 1,
        "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        "up": [0, 1, 0],
        "geometry": "` + uuid_geometry + `",
        "material": "` + uuid_material + `"
    }
}
`

const mesh = new THREE.ObjectLoader().parse( JSON.parse( mesh_json ) );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```