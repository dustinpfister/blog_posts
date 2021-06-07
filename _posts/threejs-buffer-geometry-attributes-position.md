---
title: The position attribute for buffer geometries in threejs
date: 2021-06-07 13:00:00
tags: [three.js]
layout: post
categories: three.js
id: 883
updated: 2021-06-07 13:19:13
version: 1.1
---

This week I think I will be focusing on the buffer geometry class more when it comes to continuing to learn a thing or two about using threejs in a client side javaScript project.

<!-- more -->

## 1 - The Attributes of a buffer geometry instance and what to know first

## 2 - Basic example of the position attribute of a buffer geometry

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // check out the position attribute of a cube
    var position = geometry.getAttribute('position');
    console.log( position.count ); // 24
    console.log( position.array.length ); // 72
    console.log( position.count * 3 === position.array.length); // true
    var index = geometry.getIndex();
    console.log( index.count );      // 36
    console.log( 2 * 6 );            // 12 ( number of triangles )
    console.log( index.count / 3);   /* 12 (index.count / 3 === number of triangles ) */
 
    // mutating a position
    var vertIndex = index.array[0] * 3;
    position.array[vertIndex] = 1;
    position.needsUpdate = true;
 
    
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
 
 
}
    ());
```

## 3 - Set vert helper example

```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    var pos = {
       x: 1,
       y: 0.25,
       z: 1.25
    };
    setVert(geometry, 0, pos);
    setVert(geometry, 16, pos);
    setVert(geometry, 26, pos);
 
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    var loop = function(){
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
 
}
    ());
```

## 4 - Set triangle helper

```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
 
    var setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // example 2 on set tri helper
    setTri(geometry, 0, {x: 1});
    setTri(geometry, 1, {x: 1});
    setTri(geometry, 2, {x: -1});
    setTri(geometry, 3, {x: -1});
 
    setTri(geometry, 4, {y: 1});
    setTri(geometry, 5, {y: 1});
    setTri(geometry, 6, {y: -1});
    setTri(geometry, 7, {y: -1});
 
    setTri(geometry, 8, {z: 1});
    setTri(geometry, 9, {z: 1});
    setTri(geometry, 10, {z: -1});
    setTri(geometry, 11, {z: -1});
 
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    var loop = function(){
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
 
}
    ());
```

## 5 - Animation loop example

```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
 
    // set pos for tri index
    var setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };
 
    // update method for a box geo
    var updateBoxGeo = function(geometry, per){
        var bias = 1 - Math.abs(per - 0.5) / 0.5;
        var size = 0.5 + 1 * bias,
        position = geometry.getAttribute('position'),
        triCount = geometry.getIndex().count / 3,
        i = 0, pos, axis;
        while(i < triCount){
            axis = ['x', 'y', 'z'][Math.floor(i / 4)];
            pos = {};
            pos[axis] = size * ( i % 4 < 2 ? 1: -1);
            setTri(geometry, i, pos);
            i += 1;
        }
        // MUST SET THE needsUpdate prop of position to true
        position.needsUpdate = true;
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(mesh.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var per = 0,
    lt = new Date(),
    maxFrames = 300,
    FPS = 30;
    var loop = function(){
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS){
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;
            updateBoxGeo(geometry, per);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```