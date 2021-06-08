---
title: The normal attribute for buffer geometries in threejs
date: 2021-06-08 14:41:00
tags: [three.js]
layout: post
categories: three.js
id: 884
updated: 2021-06-08 15:29:18
version: 1.15
---

Yesterday I wrote a post on the position attribute of a [buffer geometry](https://threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html) in threejs, and today I thought I would continue the trend by writing another post on an attribute of buffer geometry this time the normal attribute. the values in this attribute are used to find out what the direction is of each point of each triangle in an instance of buffer geometry. These values are then used when it comes to rendering textures for various materials such as with the normal material.

<!-- more -->

## 1 - The normals attribute in a buffer geometry, and what to know first

This is a post on the nature of the normal attribute in an instance of buffer geometry in the javaScript library known as threejs. This is just one of several core attributes of any given geometry in the library alone with position, and the uvs attribute. This is not a post on buffer geometry in general let alone any kind of getting started post on threejs and javaScript in general. So I assume that you have worked out at least some basic examples of threejs projects, and are not just at the point where you want to learn more about what the deal is with the normals attribute of a geometry.

### 1.1 - Be sure to read up more on buffer geometry in general

Be sore to read up more on the subject of [buffer geometry](/2021/04/22/threejs-buffer-geometry/) in general before getting into learning a thing or two about the normal attribute. When it comes to learning how to make a custom geometry the first step might be to create the position attribute first, so there is looking into how to go about doing that before getting into the normal attribute. Also there is a wide range of key features that have to do with the buffer geometry class that you should know about before hand.

### 1.2 - Arrow helpers are your friend when it comes to normals

The normal attribute has to do with direction and not so much position which is what the position attribute is about. So then there is learning how to use the [arrow helper](/2018/11/10/threejs-arrow-helper/) as a way to see what the position of each vertex normal is currently. The use of arrow helpers is a great tool for debugging any problems with a geometry that may be related to the normals attribute.

### 1.3 - Version numbers matter with threejs

The version of threejs that I was using when I worked out these source code examples was threejs r127. If you have used threejs long enough you show be aware that code breaking changes are made to the library often, so always check what version you are using. Also I think that it is a good idea to always get into the happen of mentioning what version of threejs I am using when writing and updating my posts on threejs.

## 2 - Basic example of the normals attribute

First off I think I should start out with a very basic example of thee normal attribute that involves just playing around with the normal attribute that will be set up to begin with when using one of the built in geometry constructors such as the box geometry constructor. I have found that the best way to learn abut these attributes is to just study the results of a geometry that has all ready been made and then mutate the values of them to see what the effect is.

So in this basic example I just create a scene object, and then I intend to create and add a Mesh object to the scene that uses a geometry created with the THREE.BoxGeometry constructor, and uses the THREE.MeshNormalMaterial as a way to go about skinning the geometry. The only thing that I am going to do out of the usual here is to create an instance of THREE.ArrowHelper and then use the values in the normal and position attributes to set the position and direction of the arrow helper for the first vertex of the first triangle of the geometry.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                side: THREE.FrontSide //THREE.DoubleSide
            }));
 
    // check out the normal attribute of a cube
    var normal = geometry.getAttribute('normal');
    var position = geometry.getAttribute('position');
 
    // create and set up an arrow helper to find the direction of the first normal value
    var dir = new THREE.Vector3(normal.array[0], normal.array[1], normal.array[2]),
    origin = new THREE.Vector3(position.array[0], position.array[1], position.array[2]);
    var helper = new THREE.ArrowHelper(dir, origin, 1, 0x00ff00);
    helper.position.copy(origin);
 
    scene.add(mesh);
    scene.add(helper);
 
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

So then this shows be the direction of the first normal of the box geometry, but what about the rest of the normals of the first triangle, and what happens when I change the direction of them? With that said sets move on to some additional examples of the normal attribute that involve mutation and animation.

## 2 - Mutating the values of the normals array

So now that I have the very basics out of the way when it comes to mutating the values of a normal attribute in a buffer geometry maybe now the next step is to work out a slightly more advanced example that involves the use of an animation loop that will show what happens as the direction of one or more normals changes when using the THREE.MeshNormalMatreial.

```js
(function () {
 
    var setNormal = function (geometry, normalIndex, pos) {
        var normal = geometry.getAttribute('normal');
        normal.array[normalIndex * 3] = pos.x;
        normal.array[normalIndex * 3 + 1] = pos.y;
        normal.array[normalIndex * 3 + 2] = pos.z;
        normal.needsUpdate = true;
    };
 
    // set a given arrow helper to the given normal index
    var setArrowHelperToNormal = function (geometry, arrowHelper, normalIndex) {
        // check out the normal attribute of a cube
        var normal = geometry.getAttribute('normal');
        var position = geometry.getAttribute('position');
        var values = normal.array.slice(normalIndex * 3, normalIndex * 3 + 3);
        var dir = new THREE.Vector3(values[0], values[1], values[2]);
        var values = position.array.slice(normalIndex * 3, normalIndex * 3 + 3);
        var origin = new THREE.Vector3(values[0], values[1], values[2]);
        arrowHelper.setDirection(dir);
        arrowHelper.position.copy(origin);
        arrowHelper.setColor(0x00ff00);
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                side: THREE.FrontSide //THREE.DoubleSide
            }));
    scene.add(mesh);
 
    var pos = {
        x: -1,
        y: -1,
        z: 0
    };
 
    var helper1 = new THREE.ArrowHelper();
    var helper2 = new THREE.ArrowHelper();
    var helper3 = new THREE.ArrowHelper();
    scene.add(helper1);
    scene.add(helper2);
    scene.add(helper3);
 
    var update = function () {
        setNormal(geometry, 0, pos);
        setNormal(geometry, 1, pos);
        setNormal(geometry, 2, pos);
        setArrowHelperToNormal(geometry, helper1, 0);
        setArrowHelperToNormal(geometry, helper2, 1);
        setArrowHelperToNormal(geometry, helper3, 2);
    };
    update();
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var radian = 0,
    dps = 22.5,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 30) {
            radian += Math.PI * 2 / 180 * dps * secs;
            pos.y = Math.sin(radian);
            pos.x = Math.cos(radian);
            update();
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 3 - Conclusion

That will be it for now when it comes to the normal attribute when it comes to earning more about the buffer geometry used in late versions of threejs. The general thing here is that the normals array is a way to set the direction of each point of each triangle that is used in the geometry. So there is the position attribute that is the collection of positions for each point of each triangle and this normal attribute is a way to declare which direction each point is facing. These values are then used along with other attributes such as the uvs attribute to render textures for various materials. So then understating the nature of the normal attribute along with the position and uvs attributes is all part of the process when it comes to learning how to create a custom geometry from the ground up.





