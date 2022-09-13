---
title: Setting the rotation of objects in threejs
date: 2022-04-08 12:53:00
tags: [three.js]
layout: post
categories: three.js
id: 976
updated: 2022-09-13 11:23:13
version: 1.21
---

The [rotation property of the object3d class in threejs](https://threejs.org/docs/#api/en/core/Object3D.rotation) stores and instance of the [THREE.Euler class](/2021/04/28/threejs-euler/) and stores the current rotation, or orientation of an object. This rotation property is a key value pair of the [base class known as Object3d](/2018/04/23/threejs-object3d/) so then it can be used to set the rotation of [Mesh Objects](/2018/05/04/threejs-mesh/), [Groups](/2018/05/16/threejs-grouping-mesh-objects/), [Cameras](/2018/04/06/threejs-camera/), and just about anything else that is based off of the Object3D class including event a whole [Scene Object](/2018/05/03/threejs-scene/).

When it comes to just setting the local rotation of an object by way of this property, one way is by using something like the set method of the Euler class to set the rotation of the object to a given set of Euler angles in terms of radian values. In other worlds values between 0, and Math.PI \* \2. If you have a hard time thinking in radians there are tools that can be used to preform a quick conversion in the MathUtils object. There is a bit more to it than just that though, for example in some cases I might want to set the orientation of a geometry of a mesh object rather than the mesh object itself. There are other related tools and topics that I should also take a moment to cover while I am at it.

<!-- more -->

## The rotation property of the object3d class and what to know first

In this post I am going over some examples of the rotation property of the object3d class in the javaScript library known as threejs. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), let alone client side web development in general, so I assume that you have at least some background when it comes to these things.

### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs, which was still a fairly new version of threejs at the time I started this post. I take a moment to always mention what version I was using when wrote a post on threejs because I have been using it long enough to know that code breaking changes are made to the library often.

### The Source code examples in this post are on github

The source code examples that I am writing about in this post [are up on Gitub](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-rotation).

## 1 - Basic example of the rotation property of Object3d

To start out with rotation and the object3d class I made this quick static scene example that involves just a few mesh objects created with the [box geometry constructor](/2021/04/26/threejs-box-geometry/) and the [normal material](/2021/06/23/threejs-normal-material/). After setting up the scene object, camera, and renderer I then have a simple create cube helper that will create and return one of these cubes. I am then just calling the array for each method off of an array if values that I want to use for rotations of the y value for each cube that I will be creating and adding to the scene in the body of a function that I give to array for each.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCube = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    [-45, 0, 45, 20].forEach(function(d, i, arr){
        var cube = mkCube(),
        p = i / (arr.length - 1 );
        cube.position.set(-3 + 6 * p, 0, 0);
        cube.rotation.y = THREE.MathUtils.degToRad(d);
        scene.add(cube);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
 
}
    ());
```

## 2 - Animation example of rotation and groups

Now for a simple animation example using the request animation frame method in the body of a loop function. Also while I am at it I also made the cubes all children of a group rather than the scene object. So then in this animation example I am using the rotation property of the object3d class to rotate each child of the group over time, as well as the group as a whole.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCube = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    var theCubes = new THREE.Group();
    scene.add(theCubes);
    [-45, 0, 45, 20].forEach(function(d, i, arr){
        var cube = mkCube(),
        p = i / (arr.length - 1 );
        cube.position.set(-3 + 6 * p, 0, 0);
        cube.rotation.y = THREE.MathUtils.degToRad(d);
        theCubes.add(cube);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
    // ---------- ----------
    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    // update
    var update = function(){
        var per = Math.round(frame) / frameMax,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        // rotating the group of cubes
        theCubes.rotation.y = Math.PI * 2 * per;
        // rotation of each child
        theCubes.children.forEach(function(cube, i){
            cube.rotation.x = Math.PI * 2 * ( 1 + i * 2) * per;
        });
    };
    // loop
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            update();
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 3 - The look at method as a way to set rotation

There is working with the rotation property of an object directly, but then there is also using the [lookAt method of the object3d class](/2021/05/13/threejs-object3d-lookat/) as a way to set rotation. This look at method works by just passing a position in terms of a set of three numbers that are values for x, y and z values, or an instance of Vector3 such as the position property of an object that is the position that I want an object to look at.

For this example then I am creating a group of cubes by using a while loop to create and position each cube that I want. I am then looping over the children of the group and calling the look at method for each cube having each child look at the child in front of it, or behind in the case of the last child in the group. In the body of the function that I give to the for each method that I call of the array of children of the group I am just using the index argument as a way to know what I am dealing with in order to get the desired index value of the other cube in the collection that I want to have the current child cube look at.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(2, 4, 8);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCube = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    // creating and positioning mesh objects
    var theCubes = new THREE.Group();
    scene.add(theCubes);
    var i = 0, len = 7;
    while(i < len){
        var cube = mkCube(),
        p = i / (len - 1 );
        //position of each cube
        var x = -3 + 6 * p,
        y = -1.5 + 3 * p,
        z = -4 + Math.sin(Math.PI * p) * 6;
        cube.position.set(x, y, z);
        theCubes.add(cube);
        i += 1;
    }
    // using look at for each cube to set rotation of each cube
    theCubes.children.forEach(function(cube, i, arr){
        var i2 = i + 1, cube2;
        if(i === 0){
            i2 = 1;
        }
        if(i >= arr.length - 1){
            i2 = arr.length - 2;
        }
        cube2 = arr[i2];
        cube.lookAt(cube2.position);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
 
}
    ());
```

The end result is more or less what I had in mind for this example, but I think that I will need to write about at least one if not more examples about this sort of thing. The situation here works okay because each of the cubes look more or less the same on each side, for some other mesh objects this might not always be the case with the nature of the geometry. The thing about this is that the rotation property and the look at method are ways of setting the rotation of the object, but not the geometry of a mesh object. In some cases I might want to adjust the rotation not just of a mesh object, but also the geometry at least once in order to change what the 'front' of the geometry is.

## 4 - Rotating geometry and Mesh objects

The rotation property effects just the local rotation of the object in which I set the rotation property. In addition to this there is also setting the rotation properties of any nested children, or in the case of Mesh objects there is rotating or changing he state of the geometry that is used with the Mesh.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(2, 4, 8);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCone = function(){
        var cone = new THREE.Mesh(
            new THREE.ConeGeometry(0.125, 0.66, 30, 30),
            new THREE.MeshNormalMaterial());
        // Rotating the geometry of each cone once
        cone.geometry.rotateX(1.57);
        return cone;
    };
    // get position helper
    var getPos = function(i, len){
        var p = i / (len - 1 ),
        x = -8 + 15 * p,
        y = -1.5 + 3 * p,
        z = -8 + Math.sin(Math.PI * p) * 12;
        return new THREE.Vector3(x, y, z);
    };
    // creating and positioning mesh objects
    var theCones = new THREE.Group();
    scene.add(theCones);
    var i = 0, len = 20;
    while(i < len){
        var cone = mkCone();
        //cone.position.set(x, y, z);
        cone.position.copy(getPos(i , len))
        theCones.add(cone);
        i += 1;
    }
    // using look at for each cube to set rotation of each cube
    theCones.children.forEach(function(cone, i, arr){
        var i2 = i + 1, 
        cone2, vec;
        if(i === 0){
            i2 = 1;
        }
        if(i >= arr.length - 1){
            vec = getPos(len, len);
        }else{
            vec = arr[i2].position;
        }
        cone.lookAt(vec);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
 
}
    ());
```

## 5 - Setting position from rotation with the apply euler method of the Vector3 class

A really cool and useful method in the Vector3 class is the apply Euler method which is the usual go to method for setting the state of a vector3 class based on the state of a Euler class such as the one at the rotation property of a an object3d class based object such as a mesh object. 

When I use the apply Euler method I will often define some kind of start position and start out my copying that to the position property of what I want to effect. This start position is more for the purpose of defining what the start direction should be rather than vector unit length. After I set a start position I can then use the apply Euler method as a way to change the direction relative to the start direction, normalize, and then use a method like multiply scalar to set the desired vector unit length.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const makeMesh = () => {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial() );
    };
    const degToRad = (deg) => {
         return THREE.MathUtils.degToRad(deg);
    };
    const getBias = (a, b, count) => {
        count = count === undefined ? 1 : count;
        return THREE.MathUtils.pingpong(  a / b  * ( 2  * count ), 1);
    }; 
    // ---------- ----------
    // SCENE CHILD OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh1 = makeMesh();
    scene.add(mesh1);
    const mesh2 = makeMesh();
    scene.add(mesh2);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const vStart = new THREE.Vector3(0, 0, 1);
    const update = function(frame, frameMax){
        const per = frame / frameMax;
        // setting rotation of mesh1
        mesh1.rotation.x = degToRad(90 * getBias(frame, frameMax, 1));
        mesh1.rotation.y = degToRad(360) * per;
        mesh1.rotation.z = 0;
        // using the state of the rotation of mesh1 to effect the position of mesh2
        let radius = 5 - 4 * getBias(frame, frameMax, 4);
        mesh2.position.copy(vStart).applyEuler( mesh1.rotation ).normalize().multiplyScalar(radius);
        mesh2.lookAt(mesh1.position);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}
    ());
```

## 6 - Setting rotation from position using the set from Vector3 Euler class method

Okay so there is using the apply Euler method of the Vector3 class to set position based on rotation, but what if I want to do the inverse of that? In other words to set the rotation of an object based on the state of a Vector3 class instance. In the Euler class there is a set from Vector3 method, so there you go the name says it all.

In this example I am creating and updating a Vector3 class instance. With mesh1 I am just simply coping the current state of this vector3 instance to the position property as a way to know the current state of the Vector. With that out of the way with mesh2 I am using this set from vector method to set the rotation of the mesh object based on the state of this vector3 instance. When doing so I might want to clone and normalize the vector depending on the desired outcome.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const makeMesh = () => {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial() );
    };
    const degToRad = (deg) => {
         return THREE.MathUtils.degToRad(deg);
    };
    const getBias = (a, b, count) => {
        count = count === undefined ? 1 : count;
        return THREE.MathUtils.pingpong(  a / b  * ( 2  * count ), 1);
    }; 
    // ---------- ----------
    // SCENE CHILD OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh1 = makeMesh();
    scene.add(mesh1);
    const mesh2 = makeMesh();
    scene.add(mesh2);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v = new THREE.Vector3(0, 0, 0);
    const update = function(frame, frameMax){
        // state of vector
        v.x = 2;
        v.y = 1.5 - 3 * getBias(frame, frameMax, 8);
        v.z = -5 + 10 * getBias(frame, frameMax, 1);
        // just set position of mesh1 to the vector
        mesh1.position.copy(v);
        // setting mesh2 rotation based on state of vector
        mesh2.rotation.setFromVector3(v.clone().normalize());
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}
    ());
```

## Conclusion

The rotation property is then what I often used in order to set the rotation of an object such as a mesh object, group or camera. There is also the position property of the object3d class that holds an instance of the Vector3 class that is what is used to store and change the position of the object as well. There are a whole lot of other properties as well as method to be aware of in the object3d class that come into play allot when making one or more threejs projects such as the scale property and the lookAT method just to name a few.

