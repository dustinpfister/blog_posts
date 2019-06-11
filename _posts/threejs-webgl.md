---
title: Three js and webGL support
date: 2019-06-11 12:12:00
tags: [three.js]
layout: post
categories: three.js
id: 476
updated: 2019-06-11 12:43:46
version: 1.4
---

In late releases of Three.js the 2d canvas software renderer has been removed from the core of threejs itself. It is possible to still use it of course it just needs to be added as an additional asset for a project on top of just three js by itself. For the most part these days there is no need to bother with the 2d canvas powered software renderer as the built in webgl renderer will work just fine on most clients, but if for some reason you do want to add more robust support for older clients that do not have great web gl support than the software renderer will have to be added in, and feature testing for web gl will need to be preformed.

<!-- more -->

## 1 - Using the Software Renderer in the event there is no WebGl support

### 1.1 - The html

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

### 1.2 - The webgl.js file

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

### 1.3 - The setup.js file

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

## 2 - Conclusion

Even if a client does support webgl that does not mean that all the webgl features will work as expected. For example I have noticed that on raspberry pi webgl support is fairly poor, at least out of the box. A simple check if webgl is there or not will result in a true response with a simple feature test for webgl alone, but things will still not render as expected.