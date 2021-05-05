---
title: Three js and webGL support
date: 2019-06-11 12:12:00
tags: [three.js]
layout: post
categories: three.js
id: 476
updated: 2021-05-05 10:41:08
version: 1.20
---

As of [version r69](https://github.com/mrdoob/three.js/releases/tag/r69) of [Three.js](https://threejs.org/) the 2d canvas software renderer has been removed from the core of threejs itself, and moved to the examples folder. It is still possible to use it of course it just needs to be added as an additional asset for a project on top of just three js by itself. It would seem that the motivation behind doing so was because support for webGL is now pretty good in general when it comes to modern web browsers which mode people who visit my website do in fact use.

For the most part these days there is no need to bother with the 2d canvas powered software renderer as the built in [webgl renderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer) will work just fine on most clients, but if for some reason you do want to add more robust support for older clients that do not have great web gl support than the software renderer will have to be added in, and feature testing for web gl will need to be preformed. I can not say that I bother with this myself, but never the less there is the question of that small minority of people using outdated browsers and having code not break.

<!-- more -->

## 1 - WebGL in three.js and what to know before hand

This is a post on feature testing for web gl, and using the software renderer in three js in the event that there is no webGL support at all. This is a not a getting started post with three.js, webGL, or javaScript in general. So then I assume that you have at least some background with three.js and javaScript.

When writing this post I was using [revision 104 of three.js](https://github.com/mrdoob/three.js/tree/r104), and on top of that I am also using some additional assets in the renderer's folder of the js folder in the examples folder of the three.js repo. When it comes to rendering a three js scene with a renderer other than the built in webGL renderer additional assets must be used to provide that additional way of rendering, one note worth example might be the 2d canvas drawing api renderer.

## 2 - Using the Software Renderer in the event there is no WebGl support

In this section I will be going over an example that feature tests for the presence of webgl, and in the event that the client does not support web gl use the 2d canvas powered software renderer over the built in webGL renderer.

### 2.1 - The html

In order to get this demo to work on top of using r104 of three.js the [projector.js](https://github.com/mrdoob/three.js/blob/r104/examples/js/renderers/Projector.js) and [softwareRenderer.js](https://github.com/mrdoob/three.js/blob/r104/examples/js/renderers/SoftwareRenderer.js) files will also need to be loaded in as well. Projector.js will need to be loaded after three.js and before softwareRenderer.js as that file depends on projector.js and projector.js depends on three.js

```html
<html>
  <head>
  <title>test_threejs demos</title>
</head>
<body>
  <script src="/js/threejs/0.104.0/three.min.js" ></script>
  <h1>Three.js webGL test</h1>
  <div id="demo"></div>
  <script src="/js/threejs/0.104.0/projector.js"></script>
  <script src="/js/threejs/0.104.0/software-renderer.js"></script>
  <script src="/demos/r104/is-webgl/js/webgl.js"></script>
  <script src="/demos/r104/is-webgl/js/setup.js"></script>
</body>
</html>
```

So in the html of this example I am linking to three.js like normal, but I am also linking to the additional assets in the github repo as well. I am also linking to some additional assets that feature test for webGL and render a scene differently depending on the state of webGL support in the client which are as follows.

### 2.2 - The webgl.js file

Here is my webgl.js file that just contains one method that is just a slightly modified version of what is also in the three.js repo. This method just simply returns true of the client supports webGL 1, and false if that is not the case.

```js
var isWebGL = function (ctxNum) {
    try {
        var canvas = document.createElement('canvas');
        return !!(window['WebGLRenderingContext'] &&
        (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
};
```

If you want to use the official webgl.js file here is a link to that in the repo. The file adds some additional functionality but for the most part it is just to feature test for webGL. Feature testing for just webGL by itself is not always enough also, for example a client count support webGL by itself, but that does not mean that all the features of the three js webGL renderer will work as expected. I can confirm that this is sometimes that case with some clients.

### 2.3 - The setup.js file

Here I have the setup.js file that makes use of the webGL method in webgl.js, as well as the additional assets depending if webGl is supported or not.

The demo involves creating a mesh with an array of [materials](/2018/04/30/threejs-materials/) the first of which is the Depth Material that works great in the Software Renderer and the second material is the standard material that is one of the several materials that will respond to a light source in three js.

The [Material index](/2018/05/14/threejs-mesh-material-index/) property of a [Face3](/2018/05/11/threejs-face3/) instance in three js is what can be used to set the material in this array of materials to use when skinning A Face3 instance in a geometry. So in the event that webGL is supported then the Standard Material will be used else the Depth material will be used as a fall back or sorts that will work okay with the Software Renderer.

```js
var container = document.getElementById('demo'),
scene = new THREE.Scene(),
camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
 
// A mesh with more than one material, by default the
// geometry of the sphere will use the Depth material as all the faces
// have a material index set of 1
var mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30),
        [
            new THREE.MeshDepthMaterial(),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x00001a
            })
        ]);
scene.add(mesh);
 
// test for web gl
if (isWebGL()) {
 
    // if we have webGl we can use the webGL renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    container.appendChild(renderer.domElement);
 
    // Light might still not work, depending on how well
    // supported webGL is, but assuming support is good we
    // can do things with light
    mesh.geometry.faces.forEach(function (face) {
        face.materialIndex = 1;
    });
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 2, 2);
    scene.add(light);
    renderer.render(scene, camera);
 
} else {
    // Use the software renderer
    var renderer = new THREE.SoftwareRenderer();
    renderer.setSize(320, 240);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
```

## 3 - More on the webGL renderer

In this post I am mostly writing about feature testing for webGL and then doing something different in the event that webGL is not supported. However I am not really getting into the webGL renderer in detail as I have wrote a [post on the webGL renderer](/2018/11/24/threejs-webglrenderer/) in detail a while back and there is therefore no need to do so here.

## 4 - Conclusion

Even if a client does support webgl that does not mean that all the webgl features will work as expected. For example I have noticed that on raspberry pi webgl support is fairly poor, at least out of the box. A simple check if webgl is there or not will result in a true response with a simple feature test for webgl alone, but things will still not render as expected.