---
title: Apply Euler angles to a Vector3 in threejs
date: 2021-06-18 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 892
updated: 2021-06-18 09:57:19
version: 1.14
---

When it comes to moving and rotating objects around in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are two general classed that come to mind [THREE.Vector3](https://threejs.org/docs/#api/en/math/Vector3), and [THREE.Euler](https://threejs.org/docs/#api/en/math/Euler). The Vector3 class has to do with creating an object that represents a Vector in Vector space, and as such the Vector3 class is great for working with a set of numbers that have to do with a specific position in space. 

However a Vector can also be though of as a way to go about having a direction in space when it comes to the distance of the vector from the origin. In fact Vectors are often descried as being a direction and a magnitude, that is a normalized set of values between 0 and one for each axis that is then raised to what is often called a euclidean distance from the origin. There is another way of thinking about this though, such as having angels using the Euler class and using that as a way to set the position, or direction and magnitude of a Vector if you prefer.

So in this post I will be looking at the Vector3.applyEuler method and how it can be combined with various other Vector3 prototype methods to accomplish some various tasks.

<!-- more -->

## 1 - Applying a Euler angle to a Vector and what to know first

This is a post on the Apply Euler method in the Vector3 class and any additional subjects that might come up when it comes to using this method. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or javaScript in general so I assume that you are beyond the basic hello world type project when it comes to using threejs. However on top of that there are a few things that you should have fairly solid at this point, so in this section I will be quickly going over what those things are.

### 1.1 - There is a great deal more to be aware of when it comes to the eEctor3 class

It might be a good idea to take a second look at the Vector3 class in general and look over what there is to work with when it comes to the various prototype methods beyond that of the apply Euler method.

### 1.2 - Check out the Euler class in general

In order to use the apply Euler method of the Vector3 class it should go without saying that an instance of the Euler class will be needed.

### 1.3 - Version Numbers matter with threejs

When I wrote this post I was using r127 of threejs.

## 2 - Basic Vector3.applyEuler example

So then lets start out with a basic example of this apply user Vector3 method to gain a scene as to how it works. Here I have an example where I have a create cube helper method that will create and return a Mesh object that uses the Box geometry, and the Mesh normal material. The intention is that I will be creating one or more cubes with this method and using Euler and Vector3 class instances along with the apply Euler Vector3 prototype method as a way to set the position of this cube in a scene.

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    // creating a cube and adding it to the scene
    var cube = createCube();
    scene.add(cube);
    // USING THE APPLY EULER Vector3 METHOD
    var e = new THREE.Euler(
        THREE.MathUtils.degToRad(45),
        THREE.MathUtils.degToRad(0), 
        THREE.MathUtils.degToRad(0));
    var v = new THREE.Vector3(1, 0, 0).applyEuler(e).normalize().multiplyScalar(3);
    cube.position.copy(v);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Animation example

So now that I have a basic example of this worked out, I often like to make at least one or more examples that involve an animation loop function using something like request animation frame, or some other means to do so.


```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    var vectorFromAngles = function(a, b, c, len){
        len = len = undefined ? 1 : len;
        var e = new THREE.Euler(
            THREE.MathUtils.degToRad(a),
            THREE.MathUtils.degToRad(b), 
            THREE.MathUtils.degToRad(c));
        var v = new THREE.Vector3(0, 1, 0).applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var cube = createCube();
    scene.add(cube);
 
    var v = vectorFromAngles(90, 0, 0, 1);
    console.log(v);
    cube.position.copy(v);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lt = new Date(),
    a = 0,
    b = 0,
    c = 90,
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
 
        requestAnimationFrame(loop);
 
        if(secs > 1 / fps){
            b += 90 * secs;
            b %= 360;
            var v = vectorFromAngles(a, b, c, 1.5);
            cube.position.copy(v);
 
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
```

## 4 - Conclusion

It would seem like there is at times a lot of over lap between the Vector3 class and the Euler class, and there is a lot of similarities between the two. I remember that when I was first getting started wit threejs that I would often confuse the two, but it is a good idea to work out the confusion. When it comes to Vector3 instances I am dealing with three properties that have to do with an x, y, and z, values and these values often have to do with a position in space. However they can be used for many other things such as ratios that have to do with these values that can then be applied to another Vector3 instance, or a Euler instance. With a Euler class instance it is a similar situation when it comes to the property values, however now I am dealing with radian values that represent angles.

