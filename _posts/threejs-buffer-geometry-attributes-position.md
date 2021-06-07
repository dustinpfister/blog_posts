---
title: The position attribute for buffer geometries in threejs
date: 2021-06-07 13:00:00
tags: [three.js]
layout: post
categories: three.js
id: 883
updated: 2021-06-07 13:53:57
version: 1.17
---

When getting into the subjects of making a custom buffer geometry in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are a lot of various little details to cover. There are a number of attributes that must be created from scratch when it comes to the positions of the vertices, normals, and other various values. However one has to start somewhere when it comes to learning how to do this sort of thing, and with that said maybe a good starting point would be the position attribute.

There is taking the time to create a blank instance of a Buffer geometry using the [THREE.BufferGeometry](https://threejs.org/docs/index.html#api/en/core/BufferGeometry) constructor and then created the position attribute from the ground up. However maybe a good starting point would be to study the results of one of the built in geometry constructors such as the THREE.boxGeometry constrictor to get an idea of what a position attribute is all about. There is also taking a look at some other features of a built in geometry instance such as the index property of a buffer geometry to gain a sense of what that is for when it comes to working with a set of triangles.

So then this post might get a little involved when it comes to the position property of a geometry in threejs, but still the subject is only so complicated. When it comes to the position property alone as one might guess it is an array that holds all the values of each point in space, and that is all there is to it. However things can get a little confusing when it comes to the difference between the count value of a position, and the length of an array. Also there is the relationship between the position array and the index attribute of a buffer geometry instance.

<!-- more -->

## 1 - The Attributes of a buffer geometry instance and what to know first

This is a post on the position attribute of a buffer geometry instance in the javaScript library known as three.js. There is a great deal more that you show know at least a little about before hand, or else you might end up finding this post a little hard to follow. So I assume that you have at least some background with client side javaScript, and I also assume that you have worked out at least a few basic examples when it comes to [getting started with threejs](/2018/04/04/threejs-getting-started/). Still in this section I will be going over some things that you might want to read up more on if you find yourself overwhelmed.

### 1.1 - Read up more on buffer geometry in general

There is a great deal more to write about when it comes to [buffer geometry](/2021/04/22/threejs-buffer-geometry/) in threejs. It might be best to start out with getting to know the various prototype methods of the buffer geometry class, and how to do simpler tasks such as translating, or rotating a all ready made geometry.

### 1.2 - Version Numbers matter

When I made these source code examples, and first wrote this post I was using revision 127 of threejs.

## 2 - Basic example of the position attribute of a buffer geometry

However things can still get a little confusing as the number of points in the array is not what one might expect when it comes to a cube for example. In a way there is only eight points to a cube, so one might think that the length of a position array for a cube would be 24 when it comes to all the axis positions for each point.

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

In this example I worked out a simple set vertex helper where I can just pass a geometry, then a vertex instance, and then a position object or instance of vector 3 that can be used to set the position of the vertex. Once again in this example I am working with a built in geometry that is a basic box geometry, and I want to use this set vertex helper method to move a single point in the cube. However doing so does not involve just moving one point, but three points for each triangle at that point.

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

So now that I have a set vertx helper that seems to work okay I thought it might be nice to create another helper that will helper with each triangle in the cube.

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

Now I am going to want to make some kind of animation example of what I have worked out thus far.

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

## 6 - Conclusion

This week I think I will be focusing on the buffer geometry class more when it comes to continuing to learn a thing or two about using threejs in a client side javaScript project. There is a great deal more to learn about when it comes to making a custom geometry in threejs, or mutating one that has all ready been created using one of the built in geometry constructors.