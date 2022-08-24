---
title: Normalizing Vectors in threejs
date: 2021-06-14 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 888
updated: 2022-08-24 13:29:33
version: 1.35
---

The Vector3 class in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) has many prototype methods one of which is the [Vector3 normalize](https://threejs.org/docs/#api/en/math/Vector3.normalize) method. Calling the normalize method of a Vector3 instance will preserve the direction of the vector, but it will reduce the euclidean distance of the vector to a length of one. 

A Vector with a [euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) of one is often referred to as a [unit vector](https://en.wikipedia.org/wiki/Unit_vector), and what is nice about this kind of vector is that it can quickly be scaled up by just simply multiplying the values of the normalized vector by a desired magnitude that is any value other than one to result in any vector that is along a given line that is the direction of the vector.

Vectors are often described as being a unit of direction, and magnitude, the direction can be thought of as what the normalized vector is in terms of numbers between 0 and 1 for x, y, and z. This direction can then be raised, or lowered actually towards zero, by a magnitude to get any point in space. So then in this post I think I will be going over some basic examples of the normalize method, and while I am at it also end up writing about a few other topics that are closely related to the normalize method.

<!-- more -->

## Normalizing Vectors and what to know before hand

This is a post on using the Vector3 normalize method, and other related features in the javaScript library know as threejs. There are a great number of things that you should be aware of before continuing to read this. For one thing this is not any kind of [getting started type post on threejs](/2018/04/04/threejs-getting-started/) let alone [javaScript in general](/2018/11/27/js-getting-started/). However in this section I will be going over a few key details that you might want to read up on more in detail in order to gain a better understanding of what the Vector3 normalize method is all about.

<iframe class="youtube_video" src="https://www.youtube.com/embed/-bJmhnyPlus" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### You might want to read up more on Vector3 in general

There is checking out my main post on the [Vector3 class](/2018/04/15/threejs-vector3/) where I am going over the Vector3 class in general. Normalizing a Vector is a major part of becoming proficient with the Vector3 class, but there is a great deal more to it when it comes to the basics of Vector3, as well as other various methods of the class. 

The thing to keep in mind here is that the normalize method will just set the length of a vector to one, while preserving the direction of the Vector, but that is it. What if I want to set direction of a Vector by a set of given angles in terms of radians or degrees for example? I will be going over some additional methods other than just the normalize method here, but there is a great deal more to be aware of that can be used with the normalize method, and I will not be getting to all of it here.

### Source code is also up on GitHub

On my GitHub account I have a repository in which I am parking all the source code examples for my [various posts on threejs](/categories/three-js/) including this one. With that said all the examples here can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-normalize) on Github.

### Version Numbers matter

When I first wrote this post I was using r127 of threejs which was a late version of threejs as or min 2021, and the last time I cam around to do some edited I was testing these examples out on r140. Things where working fine on my end with those versions.

I have made a habit of mentioning what version of threejs I am using when writing new threejs posts, and also add a section like this to older posts when I get around to doing a little editing. Maybe this is something that I should do with just about any javaScript library actually, but threejs seems to be moving along real fast compared to other javaScript projects where development is very slow.

## 1 - Basic Vector3 normalize example

In this basic example I am creating an instance of THREE.Vector3 that is not normalized, and then just calling the normalized method of the Vector3 instance to get a normalized vector. The value of the Vector before normalizing it was -20, 0, 0, and the value after normalizing it is -1, 0, 0. So in other words the direction of the Vector is preserved but the length of the vector is reduced to a magnitude of 1. Once the vector is normalized I cal call a [method like multiply scalar](/2022/03/23/threejs-vector3-multiply-scalar/) off of the normalized vector to set any desired magnitude, or distance if you prefer while preserving the direction of the Vector.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));
 
    var dir = new THREE.Vector3(-20, 0, 0);
    // NORMALIZING DIR FROM -20,0,0 to -1,0,0
    dir.normalize();
    console.log(Object.values(dir)); // [-1, 0, 0]
 
    // cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // MULTIPLYING DIR BY 2
    cube.position.copy( dir.multiplyScalar(2) );
    scene.add(cube);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 2 - Some more on the concept of vector length

So then the normalize method will set the length of any vector to a length of 1, and then from there the length can easily be adjusted to any desired length. Also when it comes to the subject of the length of a vector the Vector3.length method can be used to find out what the current length of any vector is. So then the normalize method combined with a method like multiply scalar can be used to set the length of a vector while the length method can be used as a way to get what that length is.

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    var setPosByDirAndLength = function(obj, dir, len){
        var v = dir.normalize().multiplyScalar(len);
        return obj.position.copy(v);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var cube = createCube();
    scene.add(cube);
    var dir = new THREE.Vector3(-5, 5, -5);
    setPosByDirAndLength(cube, dir, 4);
    console.log( cube.position.length() ); // 4
 
    // CAMERA
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

## 3 - Placing an object on the surface of a sphere example

So then one use case example for all of this would be to work out one or more methods that have to do with positioning an object on the surface of a sphere. That is that I can create a method in which I can pass values that will be used to create any point in space, and then normalized that point to a vector with the same direction but with a length of one. I can then set the length of the normalized vector to the radius of the sphere, plus one half the height of the object that I want on the surface of a sphere. That basic method seems to work pretty well, and it is then just a question of making other methods that serve as an abstraction for that kind of method, such as a method where I can just give a lat and long value in terms of values between 0 and 1 for each argument a a way to position something on to a sphere. This will then also serve as a way to take some kind of system that involves positioning things on a grid and make it so that it can also be used to position the same things on a corresponding sphere surface.

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };
 
    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(cube, x, y, z, alt);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);
 
    var cube = createCube();
    scene.add(cube);
 
    //setOnSphereFromPos(cube, 5, 0, 0, 2);
    setOnSphere(cube, 0.1, 0.3, 2);
 
    cube.lookAt(0, 0, 0);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lat = 0.1,
    long = 0,
    latDir = 1,
    lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
 
        requestAnimationFrame(loop);
 
        if(secs > 1 / fps){
            // call set on sphere for cube
            setOnSphere(cube, lat, long, 2);
 
            lat += 0.25 * secs * latDir;
            if(lat >= 1){
                lat = 1;
                latDir = -1;
                long += 1 / 30;
            }
            if(lat <= 0){
                lat = 0;
                latDir = 1;
                long += 1 / 30;
            }
            long %= 1;
 
            cube.lookAt(0, 0, 0);
 
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
```

This is the sort of thing that I find myself coming back to now and then when it comes to working out new systems for placing objects onto the surface of a sphere. I have a [simple project example that I made a little while back](/2021/05/14/threejs-examples-position-things-to-sphere-surface/) in which I was able to work out a solution for doing this sort of thing but it was very different from this kind of example that I like better.

## 4 - Apply Euler example to change direction

There is normalizing a vector to a length of one, and keeping the direction, but what if I want to change the direction while I am at it as well on top of that? In other words what if I want some kind of helper function that will return a normalized vector, but I can also set the direction of that normalized vector with some angle arguments. In addition I can also set a length as a way to not return a normalized vector but a vector with an interested length, and also adjust what the starting vector is.

One way to make this kind of method would be to make use of the [apply Euler method](/2021/06/18/threejs-vector3-apply-euler/) that can be used to change the direction of a vector by way of using some angles to do so. The apply Euler vector3 prototype method accepts radian values, but if I want to use degrees there is a deg to rad convince method in the [math utils object](/2022/04/11/threejs-math-utils/). I will then just want a starting vector by which to use the apply Euler method with, and this vector should have a length greater than zero.

```js

(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
    // vector from angles helper
    var vectorFromAngles = function(a, b, c, len, start){
        len = len = undefined ? 1 : len;
        var e = new THREE.Euler(
            THREE.MathUtils.degToRad(a),
            THREE.MathUtils.degToRad(b), 
            THREE.MathUtils.degToRad(c));
        var v = start || new THREE.Vector3(0, 1, 0);
        v.applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // ADD MESH
    //-------- ----------
    var cube = createCube();
    scene.add(cube);
    var v = vectorFromAngles(90, 0, 0, 1);
    console.log(v);
    cube.position.copy(v);
    //-------- ----------
    // LOOP
    //-------- ----------
    var lt = new Date(),
    a = 45,
    b = 0,
    c = 90,
    d = 2.5,
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            b += 90 * secs;
            b %= 360;
            // using vector from angles helper to copy new position
            // to the cube mesh object that uses apply Euler and normalize
            var v = vectorFromAngles(a, b, c, d);
            cube.position.copy(v);
            cube.lookAt(0, 0, 0);
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());

```

## 5 - Animation example 

Now for an example that might help to really visualize what the deal is with normalization and unit length of vector3 instances. This example involves creating a group of groups where each end child node is a mesh object that uses the capsule geometry. I am then using buffer geometry and object3d class methods and properties to make it so that each capsule geometry of each mesh is alight in such a way that each end is between 0 and a fixed end vector unit length.

The general idea here is to pick a few directions and use the capsule geometry as a way to mark those directions. I can then make one or more mesh objects and have them move along one or more of the directions.

```js

(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create capsule group
    var createCapsuleGroup = function(opt){
        opt = opt || {};
        opt.data = opt.data || [];
        var group = new THREE.Group();
        opt.data.forEach(function(opt, i, arr){
            // create a normalize vector based on the given options for x, y, and z
            // then apply the unit length option using multiplyScalar
            var v = new THREE.Vector3(opt.x, opt.y, opt.z).normalize().multiplyScalar(opt.ul);
            // UNIT LENGTH ( or distance to 0,0,0 ) can be used to 
            // set length attribute of capsule geometry based mesh object
            var geo = new THREE.CapsuleGeometry( 0.1, v.length(), 30, 30 );
            // translate geometry on y by half the vector length
            // also rotate on x by half of unit length
            geo.translate(0, v.length() / 2, 0);
            geo.rotateX(Math.PI * 0.5);
            // creating mesh object
            var mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.6}));
            // copy vector to position of mesh object
            // and have the mesh look at the origin
            mesh.position.copy(v);
            mesh.lookAt(0, 0, 0);
            group.add(mesh);
        });
        return group;
    };
    // set to group helper
    var setToGroup = function(groups, mesh, groupIndex, capsuleIndex, alpha){
        var v = new THREE.Vector3();
        var g = groups.children[groupIndex];
        g.children[capsuleIndex].getWorldPosition(v);
        var origin = g.position.clone();
        mesh.position.copy( origin.clone().lerp(v, alpha) );
        mesh.lookAt(g.position);
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-2.5, 5, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // ADD MESH OBJECTS
    //-------- ----------
    // create groups
    var groups = new THREE.Group();
    scene.add(groups);
    // group index 0
    var g = createCapsuleGroup({
        data: [
            {x: 0, y: 1, z: 0, ul: 3},
            {x: 1, y: 0, z: 0, ul: 5},
            {x: 0, y: 0, z: 1, ul: 5},
            {x: 1, y: 1, z: 1, ul: 2},
            {x: -1, y: 0, z: -1, ul: 5},
            {x: -1, y: -1, z: 1, ul: 4}
        ]
    });
    groups.add(g);
    // group index 1
    var g = createCapsuleGroup({
        data: [
            {x: 0, y: 1, z: 0, ul: 4},
            {x: 1, y: 0, z: -1, ul: 3},
            {x: -5, y: 0, z: 0, ul: 3}
        ]
    });
    g.position.set(-4, 0, -5);
    groups.add(g);
    // MESH OBJECT
    var s = 1.0;
    var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(new THREE.SphereGeometry(s, 30, 30), new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    var mesh3 = new THREE.Mesh(new THREE.ConeGeometry(s / 2, s * 2, 30, 30), new THREE.MeshNormalMaterial());
    mesh3.geometry.rotateX(Math.PI * 1.5);
    scene.add(mesh3);
    //-------- ----------
    // LOOP
    //-------- ----------
    var d = 0,
    f = 0,
    fMax = 30;
    var lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            // update
            var p = f / fMax;
            var b = 1 - Math.abs(0.5 - p) / 0.5;
            d = 1 - b;
            setToGroup(groups, mesh1, 0, 0, d);
            setToGroup(groups, mesh2, 1, 1, 1 - 0.95 * d);
            setToGroup(groups, mesh3, 0, 5, 0.5 + 0.5 * d);
            // step frame
            f += 1;
            f %= fMax;
            // render
            renderer.render(scene, camera);
            // lt
            lt = now;
        }
    };
    loop();
}
    ());
```

## Conclusion

That will be it for now when it comes to the normalize method in the Vector3 class, but I am sure that I will come around to expand on this post at some point in the future when I have more to write about on this subject. There are many other methods in the Vector3 class that can be used with a normalized vector that I might get around to writing about sooner or later, but I need to get to working out some demos, and doing some more research first.

Never the less I think I did an okay job covering the basics of what a normalized vector is, now it is just a question of applying this to make some useful or interesting projects. Or improve some ones that I have made all ready, and I can think of a few that I would like to fix up now that I have a better understanding of this sort of thing.
