---
title: Spheres in threejs geometry, positioning, and more
date: 2021-05-26 11:41:00
tags: [three.js]
layout: post
categories: three.js
id: 875
updated: 2023-06-22 12:31:14
version: 1.63
---

In [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) the [sphere geometry constructor](https://threejs.org/docs/#api/en/geometries/SphereGeometry) is one of many geometry [constructor functions](/2019/02/27/js-javascript-constructor/) built into the core of the threejs library itself. These various built in geometry functions are a way to create a geometry by way of a little javaScript code rather than loading an external file. Also it is a way to create geometry by just calling a function rather than making a custom geometry the hard way by working out logic to create the various attributes of a buffer geometry.

However there is not just thinking in terms of the built in geometry constructors, but also the differences between two general ways of thinking about 3d space. Often one might think about 3d space in terms of one big grid where everything has a given x, y, and z position relative to a origin. There is however another way of thinking about this that can be described as a distance, and then two angles, often called [phi and theta](https://en.wikipedia.org/wiki/Spherical_coordinate_system), from an origin.

When it comes to making a sphere geometry just like any other built in geometry constructor I just call THREE.SpeherGeomerty with the new keyword, pass a few arguments, and what is returned is a [buffer geometry instance](/2021/04/22/threejs-buffer-geometry/) of a sphere. I can then add the geometry as the first argument to a [Mesh Object](/2018/05/04/threejs-mesh/) along with a [Material](/2018/04/30/threejs-materials/) as the second argument when calling the THREE.Mesh constructor. However there is a great deal more to it than just that, with the constructor itself, the various properties of a buffer geometry instance in general, and of course a great many things that branch off when it comes to a sphere in general.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/L6buxtRbjBg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Sphere Geometry in threejs and what to know first

In this post I will be writing about a few examples of the Sphere Geometry constructor, and also various things that have to do with spheres in general in the javaScript library known as threejs. I will be trying to keep these examples fairly simple, at least the first few at the top of the post anyway. However you should know at least a few things when it comes to the [very basics of getting started with threejs](/2018/04/04/threejs-getting-started/) and [ client side javaScript ](/2018/11/27/js-getting-started/). I will not be going over little detail that should be known before hand, however in this section I will be briefly mentioning some things that come to mind that you should have solid first.

### Understand the basics of setting up a scene, camera, and renderer.

I trust that you have worked out at least the very basics of setting up a [scene object](/2018/05/03/threejs-scene/), [cameras](/2018/04/06/threejs-camera/), and using this scene object and camera with a renderer such as the built in [webgl renderer](/2018/11/24/threejs-webglrenderer/). If not then there is much to cover when it comes to just setting up a basic hello world type project first when it comes to threejs and client side javaScript.

### It is nice to have a solid understanding of the Mesh, and Object3d classes

There is just creating an instance of sphere geometry, but in order to do anything of interest with that geometry I am going to want to add it to a Mesh Object along with a material. The mesh object is based off of the [object3d class](/2018/04/23/threejs-object3d/) which is a base class for a whole lot of other objects in threejs. This object3d class has properties that can be used to change position, and orientation, and has many other useful features such as the feature of adding additional child objects to the object that are also based on object3d.

### There is knowing a thing or two about "vector length" and various things about the Vector3 class

There is not just creating a sphere, but also learning how to position objects in a spherical kind of way. There are a lot of ways of going about doing this sort of thing of course. However one major thing to look into more when it comes to this sort of thing has to do with the [Vector3 class](/2018/04/15/threejs-vector3/), specifically the length property of an instance of such a class. With any instance of Vector3 the length property can be thought of as a kind of radius from the origin. There are all kinds of methods in the Vector3 class that allow for doing things like normalizing a Vector and the scaling the Vector up and down along this length while preserving the direction of the Vector. Speaking of direction there are also ways of changing that while preserving the length of the vector as well.

### The source code examples in this post are on Github

All the source code examples in this post can be found in [my test threejs github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-sphere). As the name suggests this is where I am parking all the demos and examples not just for this post but all my [other posts on threejs as well](/categories/three-js/).

###  Version Numbers matter with three.js

When I first wrote this post I was using version [r127 of three.js](https://github.com/mrdoob/three.js/releases/tag/r127), that was released in March of 2021. However the last time I came around to edit this post I updated all of the demos to be in line with my [r146 style rules](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r146). I have been playing around with three.js off and of for a long time now, and I can not say that much has changed with the Sphere Geometry constructor alone when it comes to code breaking changes. Still in many of these examples I am using many other features in three.js that might break when it comes to trying to use them with future versions of threejs, the same can be said if you are using an older version of threejs.

## 1 - Basic examples of Sphere Geometry

First things first when it comes to getting into the sphere geometry and that is starting out with just a basic striped down hello world type example. In this example I start out by creating a main scene object. In this section I will then be going over a few examples that are very mush just that.

### 1.1 - Basic Sphere Geometry Example

I then create the camera that I will be using with the render function along with the scene object to draw the scene from a certain perspective, field of view and so forth the state of which is all stored in this camera object. Then calling the perspective camera constructor I am mindful of the values that I will be setting for the near and far render distances, the reason why I will be getting to shortly when it comes to the Mesh object that I will be adding to the scene. Once I have my camera object instance I can use the instance of the Vector3 Class stored in the position property to set the position of the camera as I can do with any object based off of the Object3d class. With that said I will want to move the camera in such a way that it will not be at the same location of the mesh object that i will be adding to the scene. I can also call the object3d look at method off of the instance of the camera to have it loot at a location such as 0,0,0 which is where I will be placing a Mesh object wit the Sphere Geometry.

I then set up my webgl renderer that will provide the render function that will be used to draw the scene, but first I need to add a Mesh object to the scene. With the resulting render object it is the domElement prop that will be the element that I will want to append to my hard coded html by one way or another. In my html I have a div element that has an id of demo assigned to it so I can append that way.

After that I create and add a Mesh object to the scene. When it comes to this Mesh Object the first argument that I pass to it should be a geometry, such as the Sphere geometry. So then here is where I call the THREE.SphereGeomoery constrictor with the new keyword to created this instance of a buffer geometry for the Mesh. For this example I am just directly calling the constructor as an argument to create and return the geometry rather than setting it to a variable first, this is a basic example after all, or at least i am trying to keep things as simple as possible here. After that I will want to pass a material as the second argument.

When I create the instance of the Sphere geometry I am passing just one argument that is the radius that I want for it. There are a fair number of other arguments that are also worth mentioning but those can be introduced in additional examples later on in this post. When it comes to materials for this example I went with the [depth material](/2021/05/04/threejs-depth-material/), there are a great number of other materials to go with, but getting into that would be a bit off topic. The main thing about the depth material is that it is a good starting material as it is one of several options that will work fine without a light source.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// SCENE CHILD OBJECTS - mesh using THREE.SphereGeometry
// ---------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.65),
    new THREE.MeshDepthMaterial());
scene.add(mesh);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Width and Height segments

Now that I have a very basic example out of the way there is taking a look at some of the additional arguments of the sphere geometry constructor. In this example I am creating a helper function that will create and return a mesh that uses the Sphere constructor for the geometry of the mesh, along with the [standard material](/2021/04/27/threejs-standard-material/) to skin the mesh objects this time. 

When calling this create sphere at helper I can pass a location in terms of a x and z position as to where to place the mesh, but I can also set the number of width and height sections of the sphere geometry. I am then calling this helper a few times placing each mesh in different locations of the scene, and with different settings for the width and height segments of each sphere geometry used.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const createSphereAt = function (x, z, w, h, r) {
    w = w === undefined ? 30 : w;
    h = h === undefined ? 15 : h;
    r = r === undefined ? 0.5 : r;
    const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(r, w, h),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040
            }));
    mesh.position.set(x, 0, z);
    return mesh;
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add(createSphereAt(-1.25, 0, 20, 20));
scene.add(createSphereAt(0, 0, 10, 10));
scene.add(createSphereAt(1.25, 0, 5, 5));
scene.add(new THREE.GridHelper(8, 8, 0xff0000));
const pl = new THREE.PointLight(0xffffff); // point light
pl.position.x = 1;
pl.position.y = 1;
camera.add(pl);
scene.add(camera);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(0.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Making a dome shape with Sphere Geometry

The first argument can be used to set the radius, and the second and third arguments can be used to set the number of with and height segments to use for the sphere. The remaining arguments then have to do with setting angles and angle sweeps that allow for the creation of shapes like that of a dome like shape, among other options that can be created with these kinds of arguments.

In this example I am making a create dome helper method that is just like the helper that I made in a previous example but with a few changes. I am now using fixed static values for the width and height segments, and I am now passing some arguments for the four additional arguments that are used to set starting angles and sweep angles for the horizontal and vertical parts of the resulting sphere geometry. 

With the values that I am passing this results in a dome like shape, however it will not be a closed dome, so I am making use of the side property of the material that I am using to make sure that both sides of the geometry and rendered. The value that I will want to pass for the side property will be the [THREE.DoubleSide constant value](https://threejs.org/docs/#api/en/constants/Materials), and it would be best to go with that rather than passing the number value assuming that the constant will always be there and always refer to double side rendering as it should.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// HELPER FUCTIONS
// ---------- ----------
const createDomeAt = function (x, z, rPer, r) {
    r = r === undefined ? 0.5 : r;
    const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040,
                side: THREE.DoubleSide
            }));
    mesh.position.set(x, 0, z);
    mesh.geometry.rotateX(Math.PI * 2 * rPer);
    return mesh;
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(8, 8, 0xff0000));
var pl = new THREE.PointLight(0xffffff);
pl.position.set(1, 1, 0);
camera.add(pl);
scene.add(camera);
scene.add(createDomeAt(0, 0, 0.0));
scene.add(createDomeAt(0, 1, 0.5));
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2, 1, 0);
camera.lookAt(0, 0, 0.4);
renderer.render(scene, camera);
```

### 1.4 - Using the Circle geometry with the sphere geometry to created a capped dome

I might want to create an object that is a dome, but a dome with a cap on one side. I do not think that there is a way to do this with the sphere geometry by itself. However there is a circle geometry constructor, and there is also the add method of the object3d based class of a Mesh Object. So I can create one mesh object that uses the sphere geometry to create a dome shape, and then create another mesh that uses the circle geometry. It is then just a question of adding the circle geometry as a child of the dome mesh, and then use the rotation method of the geometry of the circle to make it so it will line up with the bottom of the dome.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// MATERIAL / HELPER FUNCTIONS
// ---------- ----------
const material = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide
});
const createDomeAt = function (x, z, rPer, r, cap) {
    r = r === undefined ? 0.5 : r;
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
        material);
    if (cap) {
        const circle = new THREE.Mesh(
            new THREE.CircleGeometry(r, 30, 0, Math.PI * 2),
            material);
        circle.geometry.rotateX(Math.PI * 0.5);
        mesh.add(circle);
    }
    mesh.position.set(x, 0.5, z);
    mesh.geometry.rotateX(Math.PI * 2 * rPer);
    return mesh;
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(8, 8, 0xff0000));
scene.add(createDomeAt(0, 0, 0.0));
scene.add(createDomeAt(0, 1.5, 0.5, 0.75));
scene.add(createDomeAt(1.5, 0, 0.5, 0.75, true));
const pl = new THREE.PointLight(0xffffff);
pl.position.set(8, 0, 0)
camera.add(pl);
scene.add(camera);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Using more than one material with a sphere

This is where things can get a little tricky when it comes to using materials with a mesh. That is more than one materials rather than just a single material. The first step with this might be to just simply pass an array of where each element is a single material that I would like to use with a sphere. However after doing just that I will end up not seeing anything. With some built in geometry constructors there are some default groups set up for the geometry and it is just a matter of looping over the groups and setting the desired material index values if the default values are not to my liking, however this is not the case with the Sphere geometry constructor. So I must add the groups first and while doing so I can also set the material index values for each triangle of the sphere.

When it comes to doing this sort of thing with a sphere geometry or any buffer geometry there is the groups array of the geometry that is worth checking out. When it comes to some built in geometry there will all ready be an array of groups in the groups array, but with the sphere geometry it is empty, so I must add them. When it comes to adding groups to a geometry the positions array is a good way to get an idea of how many groups I will need to add, there is suing the length of the array property of the position attribute that will let me know how many verticies there are. I can then start a counter variable, step it by 3, and use the length of the positions array to know when to stop. It is then just a question of working out an expression to figure out what the material index value should be.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// THE SPHERE
// ---------- ----------
const materials = [
    new THREE.MeshPhongMaterial({
        color: 0x880000,
        emissive: 0x181818
    }),
    new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        emissive: 0x1f1f1f
    }),
    new THREE.MeshPhongMaterial({
        color: 0x008800,
        emissive: 0x181818
    }),
    new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x1f1f1f
    })
];
const geometry = new THREE.SphereGeometry(0.5, 15, 15);
const position = geometry.getAttribute('position');
// looking at the state of things here
let len = 1259, mi = 0, i =0;
console.log(len)
console.log(geometry);
console.log(position);
while (i < len) {
    mi = i / 3 % 4;
    geometry.addGroup(i, 3, mi);
    i += 3;
}
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh = new THREE.Mesh(
        geometry,
        materials
    );
mesh.position.set(0, 0, 0);
scene.add(mesh);
const light = new THREE.PointLight(0xffffff, 1.5); 
light.position.set(1, 1, 0);
camera.add(light);
scene.add(new THREE.GridHelper(10, 10));
scene.add(camera);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(0.75, 0.50, 0.75);
camera.lookAt(0, 0, 0);
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

For more on this sort of topic you might want to check out my post on [material index values when working with an array of materials in a mesh object](/2018/05/14/threejs-mesh-material-index/).

## 3 - Moving objects along surface of sphere with Vector length and the apply Euler method

As I have mentioned in the intro of this post it is a good idea to look into the Vector3 class more when it comes to learning how to position things along the surface of a sphere. There are of course a number of ways in order to do this sort of thing, and when it comes to positing objects to the surface of mesh objects in general it might be best to go with a ray caster. Still it is a good idea to work out at least one, if not a few exercises that have to do with vector length.

In this example I have made a set mesh pos helper method that creates and instance of a Vector3 with a default length of 1.1 which I can change by way of an option argument. The reason why I went with 1.1 is because I made the radius of one sphere 1, and th other smaller sphere 0.1. Anyway I am using this home Vector with a length of 1.1 as a kind of starting position for the mesh by using he vector3 copy method to copy the value to the position property of the mesh. Then I am using the apply Euler method as a way to set the phi and these angles. 

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30), new THREE.MeshStandardMaterial());
scene.add(sphere);
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 30, 30), new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(sphere2);
const light = new THREE.PointLight(0xffffff, 1.5); // point light
light.position.set(1, 2, 3);
scene.add(light);
scene.add(new THREE.AmbientLight(0xafafaf, 0.15));
// ---------- ----------
// Vector3
// ---------- ----------
// using apply Euler method to change direction and length
const setMeshPos = function (mesh, deg1, deg2, vecLength) {
    deg1 = deg1 === undefined ? 0 : deg1;
    deh2 = deg2 === undefined ? 0 : deg2;
    vecLength = vecLength === undefined ? 1.1 : vecLength;
    const homeVec = new THREE.Vector3(vecLength, 0, 0);
    const a = THREE.MathUtils.degToRad(deg1),
    b = THREE.MathUtils.degToRad(deg2);
    mesh.position.copy(homeVec).applyEuler(new THREE.Euler(0, a, b));
};
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
let deg1 = 0,
deg2 = 45,
degPerSec = 90,
a = 0,
aMax = 30,
lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    deg2 = Math.sin(Math.PI * 2 * (a / aMax)) / Math.PI * 90;
    setMeshPos(sphere2, deg1, deg2, 1.1);
    deg1 += degPerSec * secs;
    deg1 %= 360;
    a += 1;
    a %= aMax;
    renderer.render(scene, camera);
    lt = now;
};

loop();
```

## 4 - Using the Lath Geometry as a way to create a Sphere, and Sphere Like Objects

Another way to create a sphere geometry, and many other shapes that are like that of a sphere would be to use the [Lathe Geometry class](/2023/06/07/threejs-lathe-geometry/). In order to use this kind of geometry though the first thing that one will need is a 2d [curve](/2022/06/17/threejs-curve/) to pass as the first argument when calling the constructor function. If one just wants a sphere like shape, then the arc curve can be used. However this is just an alias for the ellipse curve class, so that can be used also, and with that said the value of the lath geometry should be clear. Yes this can be used to create a sphere like shape, but it can also be used to create all kinds of shapes by working out differing kinds of 2d curves.

### 4.1 - Using An Arc Curve

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const curve = new THREE.ArcCurve(0, 0, 5.5, Math.PI * 1.5, Math.PI * 0.5, false);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_curve = 40;
const v2array = curve.getPoints(segments_curve);
const segments_lathe = 40;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10, 10 ) );
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(9, 6, 9);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


## Conclusion

That is it for now when it comes to there sphere geometry constructor in threejs and a hold bunch of other little side topics that stem off from the use of the constructor. There is knowing all the arguments of the sphere geometry constrictor and how they can be used to help make smoother or more course sphere surfaces, and also how to make other sphere like shapes such as a dome. However it is not just a question or learning a thing or two about the Sphere Geometry constructor though, learning a think or two about Mesh Objects, Object3d in general, materials, and the other geometry constructors helper to get to a point where one can start to make crude models that are just collections of mesh objects using these built in constructors.

### Positioning things on the surface of a sphere

I have wrote a few threejs project examples and one of them was an example where I wanted to [position some mesh objects on the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/), I might get around to coming up with a simple example of it that I will then write about in this post when it comes to editing, but for now there is just checking out that post. This proved to be a fun little example and I might apply what I learned making it for some additional future projects examples. 

If you enjoyed this post and would like to read more on threejs I have wrote a whole lot of [other posts on threejs of course](/categories/three-js/). There is sticking to just learning about the various built in geometry constructors, as well as all the other classes to work with in order to make some kind of project with threes. Sooner or later one will get to the point that they will want to make some kind of real project, or at least some prototypes that are a step in that direction to say the least. With that said I have a [post on threejs project examples](/2021/02/19/threejs-examples/) in general that I have made thus far which might also be work checking out when it comes to finding additional material to read with three.js.
