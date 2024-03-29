---
title: Vector3 set from spherical coords method
date: 2022-02-04 11:09:00
tags: [three.js]
layout: post
categories: three.js
id: 957
updated: 2023-06-12 09:04:11
version: 1.26
---

There is a [whole lot to write about when it comes to the Vector3 class](/2018/04/15/threejs-vector3/) such as things like [normalizing an instance of Vector3](/2021/06/14/threejs-vector3-normalize/), or getting the [distance between two instances of a Vector3 object](/2021/06/15/threejs-vector3-distance-to/). One thing that often want to do when making any kind of project with threejs is to position an object in terms of a spherical set of values in terms of a radius, and then two angles that have to do with coordinates similar to that of latitude and longitude. 

Thus far I have made one [threejs project example that had to do with creating a module that is centered around the single purpose of positioning an object3d based object of one kind or another to the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/). That example has to do not just with setting a position, but also setting a desired value for the rotation of an object3d based object such as a mesh or camera. 

The system I made for that example does seem for the most part to work okay, but I still think that there are more ways of doing the same thing, some of which might prove to be better for one reason or another. With that said while I was taking a second look at the Vector3 documentation I have found that there is a prototype method in the vector3 class that has to do with setting the values of a verctor3 instance using a radius, and two angles in radian values called [Vector3.setFromSphericalCoords](https://threejs.org/docs/#api/en/math/Vector3.setFromSphericalCoords). So then this method might also prove to be a helpful fool for working out some kind of system like the one I made for the threejs project example example post, but to know for sure I have to make at least a few quick demos.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/lEAAAfVRaVU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The basics of the set from spherical coords method and what else to know first

In this post I will be starting out with a few very basic examples of just using the method directly with a few other threejs features. I assume that you know at least a thing or two when it comes to [getting started with a front end javaScript project](/2018/11/27/js-getting-started/), if not getting into things of that nature is outside the scope of this post. 

Also all though I will be trying to keep the examples here fairly simple with threejs, there is still an awful lot to take in when it comes to everything there is to work with in the library. I have mentioned the Vector3 class of which I am writing a post about just one method in this class, there is then a wide range of other classes in the library that are major features to be aware of also. Such as Euler, and Object3d, just to name a hand full.

### Check out my position things to sphere surface threejs example

I have made one of my [threejs project examples on a subject that has to do with the set from sphere coords method](/2021/05/14/threejs-examples-position-things-to-sphere-surface/). When it comes to that project I am not using the set from spherical coords method, but rather I am exploring what all the options are when it comes to this sort of thing and have found other options that I like better. 

### The Vector3 apply EUler method, and Raycaster

I think it is called for in this opening section to say that there are many alternatives to eb aware of beyond just this set from spherical coords method. The two main alternatives that come to mind are the [Apply Euler method](/2021/06/18/threejs-vector3-apply-euler) of the Vector3 class, and the [raycaster class](/2021/05/18/threejs-raycaster/). When it comes to vector3 class methods I find myself preferring the use of apply Euler of this method most of the time. Also if I want to position an object to the surface of just about any kind of geometry of a mesh object then I would want to use the raycaster class.

### Source code examples are on Github

The source code examples that I am writing about in this post [can also be found up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-set-from-spherical-coords). This is also where I park the source code examples for the many other [blog posts that I have wrote on threejs](/categories/three-js/) as well. Although many of the examples here are copy and paste friendly, cloning down the repo and getting this up and running on your end might be the best way to get some demos for certain posts working.

### Version Numbers matter

The version of threejs that I was using for this example was r127 when I first wrote the post, and the last time I cam around to do a little editing I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Because of feedback that I have received about various things I have made a habit of always taking note of what version of threejs I was using when I made the examples in a blog post on threejs. The reason why is because threejs is a very fast moving library in terms of development, and code breaking changes are often made in each new revision.

## 1 - Some basic getting started examples of the set from spherical coords method

For this section I will be starting out with just some very basic getting started type examples of the set from spherical coords method of the vector3 class. There is just calling simply creating an instance of a Vector3 class object, and then calling the method and taking a look at the values of the vector after calling it. Then there is making one of not more static scene examples in which the method is used as a way to say, set the position of an object such as a camera or a mesh object.

### 1.1 - A Very basic example of the setFromSphericalCoords Vector3 method

For a very simple getting started type example of this method there is just calling the setFromSphericalCoords method off of an instance of Vector3, passing some arguments and see if I get a desired outcome with the values. The first argument that I want to pass to this method is the radius for the sphere, the second and third and then the angles that I want to use. The angle values that are used for this method, like many methods in javaScript will expect a radian value, not a degree value for the angles. Conversion is fairly easy when it comes to just doing a quick expression, but there is also a number of useful methods in the [MathUtils object of threejs](https://threejs.org/docs/#api/en/math/MathUtils) for making this kinds of conversions also.

```js
// creating a vector3 instance
const a = new THREE.Vector3();
//-------- ----------
// USING VECTOR3.setFromSphericalCoords
//-------- ----------
// getting radian values for phi and theta with the help
// of the MathUtils.degToRad method
const phi = THREE.MathUtils.degToRad(54.74),
theta = THREE.MathUtils.degToRad(45);
// setting to position of the vector3 with a radius and two angles
a.setFromSphericalCoords(10, phi, theta);
// distnaceTo
const radius = new THREE.Vector3(0, 0, 0).distanceTo( new THREE.Vector3(10, 10, 10));
const b = new THREE.Vector3().setFromSphericalCoords(radius, 
    THREE.MathUtils.degToRad(45),
    THREE.MathUtils.degToRad(0)); 
// output
const p = document.createElement('p');
p.innerText = a.x.toFixed(2) + ', ' + a.y.toFixed(2) + ',' + a.z.toFixed(2);
document.body.appendChild(p); // 5.77, 5.77,5.77
```

### 1.2 - Basic Scene example

So now that I am getting some values that look good there is now the question of starting to use this set from spherical coords method in at least one if not more basic scene examples. For this example of a basic threejs scene I am just going to be using this spherical coords method to position a mesh. I will not be doing anything fancy when it comes to light and animation so for the single method object that I will be positioning I will be using the [THREE.SphereGeomrty](/2021/05/26/threejs-sphere/) constructor with the [THREE.MeshBasicMaterial](/2018/05/05/threejs-basic-material/) which is the typical go to material for any scene in which I am not doing anything with light.

When it comes to mesh object, camera object, or any object that is based off of the Object3d class in threejs there is the position property of such an object. The value of this position property is an instance of the Vector3 class, as such at any moment I can just call the setFromSphericalCoords method and pass the values that I want to set the position of the object by a radius and two angles. In this example I am doing just that with the camera, as well as a single mesh object of a sphere.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
camera.position.setFromSphericalCoords(
    25,
    THREE.MathUtils.degToRad(70),
    THREE.MathUtils.degToRad(225)
);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
const container = ( document.getElementById('demo') || document.body);
container.appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
// A Mesh with a Sphere for geometry and using the Standard Material
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(3, 30, 30),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color('red'),
        wireframe: true
    })
);
scene.add(mesh);
// USING setFromSphericalCoords to set position of the Mesh
const radius = 10,
phi = THREE.MathUtils.degToRad(90),
theta = THREE.MathUtils.degToRad(270);
mesh.position.setFromSphericalCoords(radius, phi, theta);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Animation loop examples

In this section I will now be getting into at least one if not more video project examples for this post. As of this writing I have just the one video that is shown at the top of this post. However sooner or later I will come around to edit and expand this post more, so there will likely be more examples in this section at some point in the future.

### 2.1 - Simple Video1 loop example

What I have here is a quick example that is based off of the source code for the first video that I made for this blog post. For that video I made a simple set mesh position helper function and when it comes to this function I am of course using the set from spherical coords method of the vecotr3 class. The example involves a sphere that I have placed at the center of the scene, and I am then using this set mesh position helper to set the position of the cube on the surface of the sphere.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// HELPER FUNCTIONS
// ---------- ---------- ----------
// USING setFromSphericalCoords to set position of the Mesh
const setMeshPos = function(mesh, p, t, r){
    const radius = r === undefined ? 3 : r,
    phi = THREE.MathUtils.degToRad(p === undefined ? 0 : p),
    theta = THREE.MathUtils.degToRad(t === undefined ? 0 : t);
    mesh.position.setFromSphericalCoords(radius, phi, theta);
    mesh.lookAt(0, 0, 0);
};
// ---------- ---------- ----------
// ADD A MESH
// ---------- ---------- ----------
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 20, 20),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color('lime'),
        wireframe: true,
        transparent: true,
        opacity: 0.4
    })
);
scene.add(sphere);
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial({
    })
);
scene.add(cube);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    //const degree = 360 * (frame / frameMax);
    //mesh.rotation.x = THREE.MathUtils.degToRad(degree);
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    setMeshPos(cube, 90, 90 + 90 * a2, 3);
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
```

## Conclusion

That will be it for now when it comes to this set from spherical coords method for now at least until I come around to do a bot more editing of this post. I may get around to doing that later thins month but I would not hold by breath on that I have a [whole lot of other posts on threejs](/categories/three-js/) that I have wrote over the years, and many of them need a great deal of editing also. This is a subject that I do seem to keep coming back to now and then though So I am sure that there is more to add on this when I get around to it.