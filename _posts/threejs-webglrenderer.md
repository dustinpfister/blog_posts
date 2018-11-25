---
title: The webGL renderer in three.js
date: 2018-11-24 13:18:00
tags: [js,three.js]
layout: post
categories: three.js
id: 335
updated: 2018-11-25 18:57:31
version: 1.5
---

There are a few core components to making a [three.js](https://threejs.org/), there needs to be a scene, at least one mesh to look at that is composed of a geometry, and a material. There also needs to be a camera to set the point in space by which to look at the mesh in the scene as well, however there is still one final other component that is needed as well and that is a render. In older versions of three.js there was both a 2d canvas and webgl renderer but in later versions it has been removed, and now when making a three.js project I am pretty much always working with the webgl renderer. As such this post will serve as a general overview of the [webgl renderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer), I will not get into every little detail here, but I will link to other relevant posts when it is called for.

<!-- more -->

## 1 - What to know

There is more than one option when it comes to rendering a three.js scene and camera. The 2d canvas renderer is another option, but many three.js features will not work with it, it renders a lot slower, and as of three.js r98 it is not even part of three.js anymore. So for the most part it just makes sense to just use the web gl renderer.



## 2 - Basic three.js example using the WebGLRenderer

```js
(function () {
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
 
    // add something to the scene
    scene.add(new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
                color: 0xff0000
            })));
 
    // render the scene with the camera
    renderer.render(scene, camera);
 
}
    ());
```