---
title: Linear lerping with the Vector3 lerp method
date: 2022-05-17 10:48:00
tags: [js,three.js]
layout: post
categories: three.js
id: 987
updated: 2022-05-17 14:16:12
version: 1.7
---

When working on a project that involves threejs and a little javaScript, say I am in a situation in which I have an object at one position and I want to translation the object from that one starting position to a new position. There are a number of ways of doing that, but in the [Vector3 class there is a method that can be used to quickly preform a kind of linear lerp](https://threejs.org/docs/#api/en/math/Vector3.lerp) from one point to another that I think I should write a blog post on.

This lerp method can just be called of of an instance of Vector3, and when doing so the point I want to lerp to can be passed as the first argument, and an alpha value can then also be passed as a second argument. This alpha value is just simply a value between 0 and 1 that is a magnitude between these two points that the vector should be changed. Often I will not want to just use the lerp method alone though, often I used it in combination with other vector3 class methods such as the clone, copy, and set methods.

<!-- more -->

## The Lerp Vector3 class method and what to know first

This is a post that centers around just a single method of the Vector3 class in the javaScript library known as threejs. There is a lot of other ground to cover that I am not going to be getting into detail in this post, but I often use this opening section as a place to write about a few things that you should know about before hand.

### read up more on the Vector3 class in general

There are a lot of other methods in the [Vector3 class that are also work checking out in greater detail](/2018/04/15/threejs-vector3/). Maybe of these methods will be used in the various source code examples in this post.

### Version numbers matter

When I first wrote this post I was using r135 of threejs.

### The source code examples in this post are on Github

The source code examples in this post can also be found in my test threejs Github repository.

## 1 - Basic vector3 lerp example

For this basic example of the Vector3 lerp method I will be using the vector3 set method as a way to set the position property of a mesh object to a given home location of 5,0,0 and then use the lerp method to lerp from 5,0,0 to -5,0,0 over the course of a certain number of frames and back again.

```js
(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    let scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
    let camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    scene.add(camera);
    let light = new THREE.PointLight(0xffffff);
    light.position.set(1, 2, 4);
    scene.add(light);
    // MESH
    let geo = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        });
    let mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);
    // LOOP
    let lt = new Date(),
    f = 0, 
    fm = 300; 
    let loop = function(){
        let now = new Date();
        let secs = ( now - lt ) / 1000;
        let p = f / fm,
        b = 1 - Math.abs(0.5 - p) / 0.5;
        requestAnimationFrame(loop);
        // BASIC LERP EXPRESSION between 5,0,0 and -5,0,0
        mesh.position.set(5,0,0).lerp( new THREE.Vector3(-5, 0, 0), b );
        // render
        renderer.render(scene, camera);
        f += 30 * secs;
        f %= fm;
        lt = now;
    };
    loop();
}
    ());
```

## 2 - Using Math pow in an expression to create an alpha value

```js
(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    let scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
    let camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    scene.add(camera);
    let light = new THREE.PointLight(0xffffff);
    light.position.set(1, 2, 4);
    scene.add(light);
    // MESH
    let mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1), 
            new THREE.MeshStandardMaterial({
                color: 0x00ff00
            })
        );
    };
    // HELPER METHOD USING LERP AND MATH POW
    let lerpPow = function(a, b, n, alpha){
        let alphaPow = Math.pow( n, 1 + ( ( n - 1 ) * alpha) ) / Math.pow( n, n );
        return a.clone().lerp(b, alphaPow);
    };
 
    let mesh1 = mkMesh();
    scene.add(mesh1);
    let mesh2 = mkMesh();
    scene.add(mesh2);
    let mesh3 = mkMesh();
    scene.add(mesh3);
    // LOOP
    let lt = new Date(),
    f = 0, 
    fm = 300; 
    let v1 = new THREE.Vector3( 5, 0, 0);
    let v2 = new THREE.Vector3(-5, 0, 0);
    let loop = function(){
        let now = new Date();
        let secs = ( now - lt ) / 1000;
        let p = f / fm,
        b = 1 - Math.abs(0.5 - p) / 0.5;
        requestAnimationFrame(loop);
        // BASIC LERP EXPRESSION between 5,0,0 and -5,0,0
        //mesh.position.set(5,0,0).lerp( new THREE.Vector3(-5, 0, 0), b );
        mesh1.position.copy( lerpPow(v1, v2, 4, b) );
        mesh2.position.copy( lerpPow(
            v1.clone().add( new THREE.Vector3(0, 0, 2) ), 
            v2.clone().add( new THREE.Vector3(0, 0, 2) ), 
            6, b) );
        mesh3.position.copy( lerpPow(
             v1.clone().add( new THREE.Vector3(0, 0, 4) ), 
             v2.clone().add( new THREE.Vector3(0, 0, 4) ),
             8, b) );
        // render
        renderer.render(scene, camera);
        f += 30 * secs;
        f %= fm;
        lt = now;
    };
    loop();
}
    ());
```