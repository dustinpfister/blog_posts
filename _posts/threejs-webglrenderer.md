---
title: The webGL renderer in three.js
date: 2018-11-24 13:18:00
tags: [js,three.js]
layout: post
categories: three.js
id: 335
updated: 2019-06-11 15:06:42
version: 1.10
---

There are a few core components to making a [three.js](https://threejs.org/), there needs to be a scene, at least one mesh to look at that is composed of a geometry, and a material. There also needs to be a camera to set the point in space by which to look at the mesh in the scene as well, however there is still one final other component that is needed as well and that is a render. In older versions of three.js there was both a 2d canvas and webgl renderer but in later versions it has been removed, and now when making a three.js project I am pretty much always working with the webgl renderer. As such this post will serve as a general overview of the [webgl renderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer), I will not get into every little detail here, but I will link to other relevant posts when it is called for.

<!-- more -->

## 1 - What to know

There is more than one option when it comes to rendering a three.js scene and camera. The 2d canvas renderer is another option, but many three.js features will not work with it, it renders a lot slower, and as of three.js r98 it is not even part of three.js anymore. So for the most part it just makes sense to just use the web gl renderer.

### 1.1 - Version numbers matter

In this post I am using [three.js r98](https://github.com/mrdoob/three.js/tree/r98) which was released on nov 1st 2018. In this version the canvas renderer was removed, there where also a number of other significant changes. So if the code in this example, or any of my three.js examples breaks be sure to check the revision number of the three.js file you are using first.

## 2 - Basic three.js example using the WebGLRenderer

To get started with the WebGLRenderer all I need to do is just call the THREE.WebGLRenderer constructor method to create a new instance of the web gl renderer. Once I have my web gl renderer instance I can then call methods like setSize to set the native size of the canvas that is to be used to render my project. 

The domElement property stores the dom element that will be used to render so I can use something like the appendChild method to append to an element that I have in my html.

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

To render the scene I just need to pass the scene, and camera to the render method of the webGLRenderer instance.

## 3 - Making a render loop

Many of the projects I make with three.js are just simple looping animations. To have a loop I just need to call the render method in a method that is going to be called over and over again. In this example I am using requestAnimationFrame to do so.

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
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
                color: 0xff0000
            }));
    scene.add(cube);
 
    // render the scene with the camera
    var frame = 0,
    frameMax = 50;
 
    var loop = function () {
 
        requestAnimationFrame(loop);
 
        var per = frame / frameMax,
        a = Math.PI * 2 * per;
 
        cube.rotation.y = a;
 
        renderer.render(scene, camera);
 
        frame += 1;
        frame %= frameMax;
 
    };
 
    loop();
 
}
    ());
```

## 4 - WebGL browser support

In the event that there is no support for webGL in a client browser there are ways of feature testing for webGL and then using another kind of renderer to render a scene that makes use of the 2d canvas drawing api, or some other way or rendering other than that of webGL. For more on this topic check out my other post that has to do with [feature testing on webGL](/2019/06/11/threejs-webgl/).