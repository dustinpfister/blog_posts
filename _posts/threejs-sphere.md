---
title: Sphere Geometry in threejs
date: 2021-05-26 11:41:00
tags: [three.js]
layout: post
categories: three.js
id: 875
updated: 2021-05-26 14:31:12
version: 1.17
---

I have wrote a number of posts on the built in geometry constructors in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) all ready, but oddly enough I never got around to writing a thing or two about the [sphere geometry constructor](https://threejs.org/docs/#api/en/geometries/SphereGeometry), and everything that centers around it. Just like any other built in geometry constructor I just call THREE.SpeherGeomerty with the new keyword and what is returned is a buffer geometry instance that will be a sphere, I can then add the geometry as the first argument to a Mesh along with a material and add it to a scene. However there is a great deal more to it than just that, with the constructor itself, and of course a great many things that branch off from it.

<!-- more -->

## 1 - Sphere Geometry in threejs and what to know first

In this post I will be writing about a few examples of the Sphere Geometry constructor in a javaScript library known as three.js. I will be trying to keep these examples fairly simple, at least the first few at the top of the post anyway. However you should know at least a few things when it comes to the very basics of getting started with three.js and javaScript in general. I will not be going over little detail that should be known before hand, however in this section I will be briefly mentioning some things that come to mind that you should have solid first.

### 1.1 - Understand the basics of setting up a scene, camera, and renderer.

I trust that you have worked out at least the very basics of setting up a scene object, and a cameras, and using this scene object and camera with a renderer such as the built in webgl renderer. If not you might want to read up [my getting started post on three.js](/2018/04/04/threejs-gettingg-started/), or some content on cameras and renderer's first.

### 1.2 - It is nice to have a solid understanding of the Mesh, and Object3d classes

There is just creating an instance of sphere geometry, but in order to do anything of interest with that geometry I am going to want to add it to a Mesh Object along with a material. The mesh object is based off of the object3d class which is a base class for a whole lot of other objects in three.js. This object3d class has properties that can be used to change position, and orientation, and has many other useful features such as the feature of adding additional child objects to the object that are also based on object3d. 

### 1.3 - Version Numbers matter with three.js

When I first wrote this post I was using version r127 of three.js. I have been playing around with three.js off and of for a long time now, and I can not say that much has changed with the Sphere Geometry constructor alone when it comes to code breaking changes. Still in many of these examples I am using many other features in three.js that might break when it comes to trying to use them with future versions of three.js.

## 2 - Basic Sphere Geometry Example

First thins first when it comes to getting into the sphere geometry and that is starting out with just a basic striped down hello world type example. In this example I start out by creating a main scene object that I will be passing to the render function of the renderer along with a camera later. After that I create and add a Mesh object to the scene, and when doing so I will pass an instance of the Sphere Geometry as the first argument of the Mesh constructor, and after that I will want to pass a material as the second argument.

First this example when I create the instance of the Sphere geometry I am passing just one argument that is the radius that I want for it. There are a fair number of other arguments that are also worth mentioning but those can be introduced in additional examples later on in this post. When it comes to materials for this example I went with the standard material, there are a great number of other materials to go with, but getting into that would be a bit off topic. The main thing about the standard material is that it is a kind of material that will respond to a light source, so I set some properties for it that have to do with setting the color that will be used with a light source, and what the base color should be in the event of no light.

```js
(function () {
 
    // creating a scene
    var scene = new THREE.Scene();
 
    // mesh
    var mesh = new THREE.Mesh(
            // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
            new THREE.SphereGeometry(0.5),
           // standard material
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040
            }));
    scene.add(mesh); // add the mesh to the scene
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 1, 0.75);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

I then create the camera that I will be using for the render function, and when doing so I have decided to add a point light as a child of the camera. So because I added a point light to the camera I am going to want to add the camera to the scene along with the mesh object, otherwise the light that I added to it will have no effect. I then set up my webgl renderer and call the render function of that renderer pass in the scene as the first argument, followed by the camera.

## 2 - Width and Height segments

Now that I have a very basic example out of the way there is taking a look at some of the additional arguments of the sphere geometry constructor. In this example I am creating a helper function that will create and return a mesh that uses the Sphere geometry constructor for the geometry of the mesh. When calling this create sphere at helper I can pass a location in terms of an x and z position as to where to place the mesh, but I can also set the number of width and height sections.

```js
(function () {
 
    // create a sphere at helper
    var createSphereAt = function (x, z, w, h, r) {
        w = w === undefined ? 30 : w;
        h = h === undefined ? 15 : h;
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
                new THREE.SphereGeometry(r, w, h),
                // standard material
                new THREE.MeshStandardMaterial({
                    color: 0xff0000,
                    emissive: 0x404040
                }));
        mesh.position.set(x, 0, z);
        return mesh;
    };
 
    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
 
    scene.add(createSphereAt(-2, 0, 20, 20));
    scene.add(createSphereAt(0, 0, 10, 10));
    scene.add(createSphereAt(2, 0, 5, 5));
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Making a dome shape with Sphere Geometry

Okay so the first argument can be used to set the radius, and the second and third arguments can be used to set the number of with and height segments to use for the sphere. The remaining arguments then have to do with setting angles and angle sweeps that allow for the creating of shapes like that of a dome like shape.

In this example I am making a create dome at helper method that is just like the helper that I made in a previous example but with a few changes. I am not using fixed static values for the width and height segments and I am not passing some arguments for the four additional arguments that are used to set starting angles and sweep angles for the horizontal and vertical parts of the sphere. With the values that I am passing this results in a dome like shape, however it will not be a closed dome, so I am making use of the side property of the material that I am using to make sure that both sides of the geometry and rendered.

```js
(function () {
 
    // create a Dome at helper
    var createDomeAt = function (x, z, rPer, r) {
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
                new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
                // standard material
                new THREE.MeshStandardMaterial({
                    color: 0xff0000,
                    emissive: 0x404040,
                    side: THREE.DoubleSide
                }));
        mesh.position.set(x, 0, z);
        mesh.geometry.rotateX(Math.PI * 2 * rPer);
        return mesh;
    };
 
    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
 
    scene.add(createDomeAt(0, 0, 0.0));
    scene.add(createDomeAt(0, 1, 0.5));
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2.0, 2.0, 2.0);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 4 - Using the Circle geometry with the sphere geometry to created a capped dome

I might want to create an object that is a dome, but a dome with a cap on one side. I do not think that there is a way to do this with the sphere geometry by itself. However there is a circle geometry constructor, and there is also the add method of the object3d based class of a Mesh Object. So I can create one mesh object that uses the sphere geometry to create a dome shape, and then create another mesh that uses the circle geometry. It is then just a question of adding the circle geometry as a child of the dome mesh, and then use the rotation method of the geometry of the circle to make it so it will line up with the bottom of the dome.

```js
(function () {
 
    var material = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0x404040,
            side: THREE.DoubleSide
        });
 
    // create a Dome at helper
    var createDomeAt = function (x, z, rPer, r, cap) {
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY
                new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
                // standard material
                material);
        if (cap) {
            var circle = new THREE.Mesh(
                    // USING A CIRCLE GEOMETRY
                    new THREE.CircleGeometry(r, 30),
                    // standard material
                    material);
            circle.geometry.rotateX(Math.PI * 0.5);
            mesh.add(circle);
        }
        mesh.position.set(x, 0.5, z);
        mesh.geometry.rotateX(Math.PI * 2 * rPer);
        return mesh;
    };
 
    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
 
    scene.add(createDomeAt(0, 0, 0.0));
    scene.add(createDomeAt(0, 1.5, 0.5, 0.75));
    scene.add(createDomeAt(1.5, 0, 0.5, 0.75, true));
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 4;
    light.position.y = -0.5;
    camera.add(light);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 5 - Using more than one material with a sphere

This is where things can get a little tricky when it comes to using materials with a mesh. That is more than one materials rather than just a single material.

```js
(function () {
 
    // creating a scene
    var scene = new THREE.Scene();
 
    var materials = [
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x101010
        }),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x202020
        })];
 
    var geometry = new THREE.SphereGeometry(0.5, 15, 15);
 
    var position = geometry.attributes.position,
    len = position.array.length,
    mi = 0,
    i = 0;
    while (i < len) {
        mi = i / 3 % 2 === 0 ? 0 : 1;
        geometry.addGroup(i, 3, mi);
        i += 3;
    }
 
    // mesh
    var mesh = new THREE.Mesh(
            // USING A SPHERE GEOMETRY
            geometry,
            // PASSING AN ARRAY OF MATERIALS
            materials);
    scene.add(mesh); // add the mesh to the scene
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 1, 0.75);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 6 - Conclusion

That is it for now when it comes to there sphere geometry constructor in threejs and a hold bunch of other little side topics that stem off from the use of the constructor. There is knowing all the arguments of the sphere geometry constrictor and how they can be used to help make smoother or more course sphere surfaces, and also how to make other sphere like shapes such as a dome. However it is not just a question or learning a thing or two about the Sphere Geometry constructor though, learning a think or two about Mesh Objects, Object3d in general, materials, and the other geometry constructors helper to get to a point where one can start to make crude models that are just collections of mesh objects using these built in constructors.

