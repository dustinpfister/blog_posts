---
title: The uv attribute for buffer geometries in threejs
date: 2021-06-09 09:44:00
tags: [three.js]
layout: post
categories: three.js
id: 885
updated: 2021-06-09 11:46:24
version: 1.3
---

When working out a custom geometry or playing around with a built in geometry there are a number of attributes for the geometry. I have wrote posts on the position and normal attributes that have to do with the position of points in space, and the direction that those points are facing that is used for lighting. Today though I will be getting into the uv attribute that is used to position the textures that are used when skinning the geometry with a material.

<!-- more -->

## 2 - Basic uv mutation example using a Plane, and a canvas texture

```js
(function () {
 
    // creating a simple canvas generated texture
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#004040'; // fill
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath(); // draw red and white circle
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - starting with a plane
    var geometry = new THREE.PlaneGeometry(1, 1);
    var uv = geometry.getAttribute('uv');
    // MUTATING THE UV VALUES
    uv.array[0] = 0.27;
    uv.array[1] = 0.73;
    uv.array[6] = 0.27;
    uv.array[7] = 0.73;
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh.position.set(1, 0, 0);
    scene.add(mesh);
 
    // another mesh where I am not doing anything to the uv values
    var geometry = new THREE.PlaneGeometry(1, 1);
    var mesh2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh2.position.set(-1, 0, 0);
    scene.add(mesh2);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
 
}
    ());
```

### 3 - Animation loop updating uvs over time

```js
(function () {
    // creating a simple canvas generated texture
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#004040'; // fill
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath(); // draw red and white circle
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - using a plane and getting the uv attribute
    var geometry = new THREE.PlaneGeometry(1, 1);
    var uv = geometry.getAttribute('uv');
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var frame = 0,
    maxFrame = 300;
    var loop = function(){
        var per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        requestAnimationFrame(loop);
        // MUTATING UV VALUES IN THE LOOP MAKING SURE TO SET
        // uv.needsUpdate to true
        uv.array[0] = -2 + 2 * bias;
        uv.array[1] = 2 - 1 * bias;
        uv.needsUpdate = true;
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
    };
    loop();
 
}
    ());
```

## 4 - Conclusion

The uvs of a geometry are for setting up the [texture cornets](http://paulyg.f2s.com/uv.htm) of a geometry when it comes to what portions of a texture should be used when applying it to the face of geometry. This array of values should not be confused with other values of a geometry such as the groups that are used when setting material index values. That is that another part of creating a custom geometry would involve also creating an array of groups, and each group object would contain a material index value to use for a given set of triangles when using an array of materials for a mesh object that will be used with a buffer geometry.
