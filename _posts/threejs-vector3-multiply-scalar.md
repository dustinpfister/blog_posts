---
title: The multiply scalar Vector3 prototype method in threejs
date: 2022-03-23 11:54:00
tags: [three.js]
layout: post
categories: three.js
id: 971
updated: 2022-04-10 08:37:05
version: 1.15
---

One major part of doing anything interesting with threejs is learning how to go about positioning things when it comes to working with the Vector3 class in the library. There are the very basics with this class when it comes to starting out with the set, and copy methods for example. However there are also a number of other useful methods in this class including methods like the [multiply scalar method](https://threejs.org/docs/#api/en/math/Vector3.multiplyScalar) which will be the main focal point of this post today.

The multiply scalar method is a way to adjust the unit length of the vector without chaining anything with the direction of the vector. In other words it is a way to change the position of the vector, but only along a ray that comes out from an origin that is found by way of the current values of the Vector. I often use this multiply scalar method in combination with other Vector3 methods such as the normalized method that will set the unit length of the vector to that of one, which would be a good starting point before using a method like the multiply scalar method. So then in this post I will be going over example of the multiply scalar method, but also many other Vector3 class features and various features of threejs in general as always.

<!-- more -->

## The multiply scalar methods of the Vector3 class and what to know first

This is a post on using the multiply scalar method of the [Vector3 class](/2018/04/15/threejs-vector3/) in the javaScript library known as threejs. This is not a getting [started type post with threejs](/2018/04/04/threejs-getting-started/), and I also assume that you have at least a little experience with [client side javaScript in general](/2018/11/27/js-getting-started/) also.

### Be mindful of version numbers

The version of threejs that I was using when I first wrote this post was r135. Code breaking changes are made to threejs often so check your version numbers first and for most if any of these code examples are breaking on versions of threejs later than r135.

### The source code examples in this post are also on Github

I have the source code examples in this post up on [my test threejs Github Repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-multiply-scalar).

## 1 - Basic Vector3 multiply scalar example

For a basic example of this multiply scalar method there is starting out with just using the typical set method to set an initial length for the vector that is greater than 0. Once I have a non zero length for the vector I can then use the multiply scalar method to multiply that length by any desired value that I give as the first argument when calling the multiply scalar method.

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OBJECTS
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var cube2 = cube1.clone();
    scene.add(cube1);
    scene.add(cube2);
 
    // SETTING POSITION WITH Vector3.set and Vector3.multiplyScalar
    cube1.position.set(-1, 0, -1).multiplyScalar(4);
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 2 - Copy and normalize, then use scalar

The copy method of the Vector 3 class allows for me to copy the values of one instance of Vector3 over to another instance. The normalize method of the Vector3 class is also a very useful one that will set the length of a vector to 1 while preserving the direction of the vector. So then I can create a new Instance of Vector3, then copy that to another such as the position object of a mesh, and the normalize the position to a length of one with the same direction of the vector that I copied from. Sense the length is now one, I can then use the multiply scalar method to set a desired length from there easily.

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OBJECTS
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var cube2 = cube1.clone();
    var cube3 = cube1.clone();
    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
 
    // SETTING POSITION WITH Vector3.copy, normalize, and Vector3.multiplyScalar
    var radian = THREE.MathUtils.degToRad(90 + 45),
    radius = 4;
    var vec = new THREE.Vector3(
        Math.cos(radian) * radius,
        0,
        Math.sin(radian) * radius
    );
    cube1.position.copy(vec);
    var scalar = 1 + Math.round(2 * Math.random())
    cube2.position.copy(vec).normalize().multiplyScalar(scalar);
    // adjust rotation of cubes
    cube1.lookAt(0, 0, 0);
    cube2.lookAt(0, 0, 0);
    cube3.lookAt(cube1.position);
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 3 - Translate, normalize and scalar

One additional method that I might also pull into the mix is the add method that can be used to translate from a set point. This add method can be used to add another Vector to the vector value after the use of a method like that of copy or set if I want to make adjustments to direction before normalizing and scaling. Or it can be used after doing so as a way to adjust things after normalizing and scaling.

For this example I am not also creating and positioning mesh objects in the body of a function that I am passing to the [array for each method](/2019/02/16/js-javascript-foreach/). The array that I am calling for each off of then contains data for each method object that I want in the form of nested arrays with number values that can be used to set position and a scalar value to use after normalizing that position..

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // CREATING ANSD POSITIONING MESH OBJECTS WITH Vector3 METHODS
    // including copy, add, normalize, and multiplyScalar
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
 
    var radian = THREE.MathUtils.degToRad(90 + 25),
    radius = 4;
    var vec = new THREE.Vector3(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
    [[0,0,0,0], [-2,1,0,1.5], [-4,2,0,3], [-8,3,0,4.5]].forEach(function(data){
        var mesh = cube1.clone(),
        x = data[0], y = data[1], z = data[2], scalar = data[3];
        mesh.position.copy(vec).add(new THREE.Vector3(x, y, z) ).normalize().multiplyScalar(scalar);
        mesh.lookAt(cube1.position);
        scene.add(mesh);
    });
    scene.children[1].lookAt(scene.children[2].position)
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 4 - Conclusion

So then the multiply scalar method is one of many tools in the toolbox that is the Vector3 class. This Vecotr3 class comes up when it comes to just about anything that has to do with a single point in space, so it is used for the value of the position attribute of the [Object3d class](/2018/04/23/threejs-object3d/) as well as with many other features in the over all library. With that said the multiply scalar method is a great tool for increasing the unit length of a vector without messing around with the direction of it.

