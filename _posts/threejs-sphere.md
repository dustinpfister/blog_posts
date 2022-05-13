---
title: Spheres in threejs geometry, positioning, and more
date: 2021-05-26 11:41:00
tags: [three.js]
layout: post
categories: three.js
id: 875
updated: 2022-05-13 08:18:27
version: 1.51
---

In [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) the [sphere geometry constructor](https://threejs.org/docs/#api/en/geometries/SphereGeometry) is one of many geometry constructor functions built into the core of the threejs library itself to create a geometry by way of javaScript code rather than loading an external file. However there is not just thinking in terms of the built in geometry constructors, but also the differences between two general ways of thinking about 3d space. There is thinking in terms of a 3d grid of sorts, and then there is thinking in terms of concentric spheres radiating outward from an origin. In other words there is thinking in terms of x,y, and z as a way to find a point in space, and then there is thinking in terms of a radius or Vector length if you prefer, and then two angles often called something like [phi and theta](https://en.wikipedia.org/wiki/Spherical_coordinate_system).

Just like any other built in geometry constructor I just call THREE.SpeherGeomerty with the new keyword and what is returned is a [buffer geometry instance](/2021/04/22/threejs-buffer-geometry/) of a sphere, I can then add the geometry as the first argument to a [Mesh Object](/2018/05/04/threejs-mesh/) along with a [Material](/2018/04/30/threejs-materials/) as the second argument when calling the THREE.Mesh constructor. However there is a great deal more to it than just that, with the constructor itself, and of course a great many things that branch off from it.

<!-- more -->

## Sphere Geometry in threejs and what to know first

In this post I will be writing about a few examples of the Sphere Geometry constructor in a javaScript library known as three.js. I will be trying to keep these examples fairly simple, at least the first few at the top of the post anyway. However you should know at least a few things when it comes to the very basics of getting started with three.js and javaScript in general. I will not be going over little detail that should be known before hand, however in this section I will be briefly mentioning some things that come to mind that you should have solid first.

### Understand the basics of setting up a scene, camera, and renderer.

I trust that you have worked out at least the very basics of setting up a [scene object](/2018/05/03/threejs-scene/), [cameras](/2018/04/06/threejs-camera/), and using this scene object and camera with a renderer such as the built in [webgl renderer](/2018/11/24/threejs-webglrenderer/). If not you might want to read up [my getting started post on three.js](/2018/04/04/threejs-getting-started/), or some content on cameras and renderer's first.

### It is nice to have a solid understanding of the Mesh, and Object3d classes

There is just creating an instance of sphere geometry, but in order to do anything of interest with that geometry I am going to want to add it to a Mesh Object along with a material. The mesh object is based off of the [object3d class](/2018/04/23/threejs-object3d/) which is a base class for a whole lot of other objects in three.js. This object3d class has properties that can be used to change position, and orientation, and has many other useful features such as the feature of adding additional child objects to the object that are also based on object3d. 

###  Version Numbers matter with three.js

When I first wrote this post I was using version [r127 of three.js](https://github.com/mrdoob/three.js/releases/tag/r127), that was released in March of 2021. I have been playing around with three.js off and of for a long time now, and I can not say that much has changed with the Sphere Geometry constructor alone when it comes to code breaking changes. Still in many of these examples I am using many other features in three.js that might break when it comes to trying to use them with future versions of three.js, the same can be said if you are using an older version of threejs.

### The source code examples in this post are on Github

All the source code examples in this post can be found in [my test threejs github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-sphere). As the name suggests this is where I am packing all the demos and examples not just for this post but all my other posts on threejs as well.

## 1 - Basic Sphere Geometry Example

First things first when it comes to getting into the sphere geometry and that is starting out with just a basic striped down hello world type example. In this example I start out by creating a main scene object.

I then create the camera that I will be using with the render function along with the scene object to draw the scene from a certain perspective, field of view and so forth the state of which is all stored in this camera object. Then calling the perspective camera constructor I am mindful of the values that I will be setting for the near and far render distances, the reason why I will be getting to shortly when it comes to the Mesh object that I will be adding to the scene. Once I have my camera object instance I can use the instance of the Vector3 Class stored in the position property to set the position of the camera as I can do with any object based off of the Object3d class. With that said I will want to move the camera in such a way that it will not be at the same location of the mesh object that i will be adding to the scene. I can also call the object3d look at method off of the instance of the camera to have it loot at a location such as 0,0,0 which is where I will be placing a Mesh object wit the Sphere Geometry.

I then set up my webgl renderer that will provide the render function that will be used to draw the scene, but first I need to add a Mesh object to the scene. With the resulting render object it is the domElement prop that will be the element that I will want to append to my hard coded html by one way or another. In my html I have a div element that has an id of demo assigned to it so I can append that way.

After that I create and add a Mesh object to the scene. When it comes to this Mesh Object the first argument that I pass to it should be a geometry, such as the Sphere geometry. So then here is where I call the THREE.SphereGeomoery constrictor with the new keyword to created this instance of a buffer geometry for the Mesh. For this example I am just directly calling the constructor as an argument to create and return the geometry rather than setting it to a variable first, this is a basic example after all, or at least i am trying to keep things as simple as possible here. After that I will want to pass a material as the second argument.

When I create the instance of the Sphere geometry I am passing just one argument that is the radius that I want for it. There are a fair number of other arguments that are also worth mentioning but those can be introduced in additional examples later on in this post. When it comes to materials for this example I went with the [depth material](/2021/05/04/threejs-depth-material/), there are a great number of other materials to go with, but getting into that would be a bit off topic. The main thing about the depth material is that it is a good starting material as it is one of several options that will work fine without a light source.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING A MESH WITH SPHERE GEOMOTY TO THE SCENE
    // ---------- ----------
    var mesh = new THREE.Mesh(
            // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
            new THREE.SphereGeometry(0.5),
           // Using the Depth Material
            new THREE.MeshDepthMaterial() );
    scene.add(mesh); // add the mesh to the scene
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 2 - Width and Height segments

Now that I have a very basic example out of the way there is taking a look at some of the additional arguments of the sphere geometry constructor. In this example I am creating a helper function that will create and return a mesh that uses the Sphere constructor for the geometry of the mesh, along with the [standard material](/2021/04/27/threejs-standard-material/) to skin the mesh objects this time. 

When calling this create sphere at helper I can pass a location in terms of a x and z position as to where to place the mesh, but I can also set the number of width and height sections of the sphere geometry. I am then calling this helper a few times placing each mesh in different locations of the scene, and with different settings for the width and height segments of each sphere geometry used.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING A MESH OBJECTS TO SCENE
    // ---------- ----------
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
    scene.add(createSphereAt(-1.25, 0, 20, 20));
    scene.add(createSphereAt(0, 0, 10, 10));
    scene.add(createSphereAt(1.25, 0, 5, 5));
     // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());
```

## 3 - Making a dome shape with Sphere Geometry

The first argument can be used to set the radius, and the second and third arguments can be used to set the number of with and height segments to use for the sphere. The remaining arguments then have to do with setting angles and angle sweeps that allow for the creation of shapes like that of a dome like shape, among other options that can be created with these kinds of arguments.

In this example I am making a create dome helper method that is just like the helper that I made in a previous example but with a few changes. I am now using fixed static values for the width and height segments, and I am now passing some arguments for the four additional arguments that are used to set starting angles and sweep angles for the horizontal and vertical parts of the resulting sphere geometry. 

With the values that I am passing this results in a dome like shape, however it will not be a closed dome, so I am making use of the side property of the material that I am using to make sure that both sides of the geometry and rendered. The value that I will want to pass for the side property will be the [THREE.DoubleSide constant value](https://threejs.org/docs/#api/en/constants/Materials), and it would be best to go with that rather than passing the number value assuming that the constant will always be there and always refer to double side rendering as it should.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(1.2, 0.8, 0);
    camera.lookAt(0, 0, 0.4);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.set(1, 1, 0);
    camera.add(light);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING A MESH OBJECTS TO SCENE
    // ---------- ----------
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
    scene.add(createDomeAt(0, 0, 0.0));
    scene.add(createDomeAt(0, 1, 0.5));
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());
```

## 4 - Using the Circle geometry with the sphere geometry to created a capped dome

I might want to create an object that is a dome, but a dome with a cap on one side. I do not think that there is a way to do this with the sphere geometry by itself. However there is a circle geometry constructor, and there is also the add method of the object3d based class of a Mesh Object. So I can create one mesh object that uses the sphere geometry to create a dome shape, and then create another mesh that uses the circle geometry. It is then just a question of adding the circle geometry as a child of the dome mesh, and then use the rotation method of the geometry of the circle to make it so it will line up with the bottom of the dome.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.set(8,0,0)
    camera.add(light);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING A MESH OBJECTS TO SCENE
    // ---------- ----------
    var material = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        });
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
                    new THREE.CircleGeometry(r, 30, 0, Math.PI * 2),
                    // standard material
                    material);
            circle.geometry.rotateX(Math.PI * 0.5);
            mesh.add(circle);
        }
        mesh.position.set(x, 0.5, z);
        mesh.geometry.rotateX(Math.PI * 2 * rPer);
        return mesh;
    };
    scene.add(createDomeAt(0, 0, 0.0));
    scene.add(createDomeAt(0, 1.5, 0.5, 0.75));
    scene.add(createDomeAt(1.5, 0, 0.5, 0.75, true));
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());
```

## 5 - Using more than one material with a sphere

This is where things can get a little tricky when it comes to using materials with a mesh. That is more than one materials rather than just a single material. The first step with this might be to just simply pass an array of where each element is a single material that I would like to use with a sphere. However after doing just that I will end up not seeing anything. With some built in geometry constructors there are some default groups set up for the geometry and it is just a matter of looping over the groups and setting the desired material index values if the default values are not to my liking, however this is not the case with the Sphere geometry constructor. So I must add the groups first and while doing so I can also set the material index values for each triangle of the sphere.

When it comes to doing this sort of thing with a sphere geometry or any buffer geometry there is the groups array of the geometry that is worth checking out. When it comes to some built in geometry there will all ready be an array of groups in the groups array, but with the sphere geometry it is empty, so I must add them. When it comes to adding groups to a geometry the positions array is a good way to get an idea of how many groups I will need to add, there is suing the length of the array property of the position attribute that will let me know how many verticies there are. I can then start a counter variable, step it by 3, and use the length of the positions array to know when to stop. It is then just a question of working out an expression to figure out what the material index value should be.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 1, 0.75);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.set(1, 1, 0);
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // THE SPHERE
    // ---------- ----------
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
    var mesh = new THREE.Mesh(
            geometry, // USING A SPHERE GEOMETRY
            materials // PASSING AN ARRAY OF MATERIALS
    );
    scene.add(mesh);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());
```

For more on this sort of topic you might want to check out my post on [material index values when working with an array of materials in a mesh object](/2018/05/14/threejs-mesh-material-index/).

## 6 - Conclusion

That is it for now when it comes to there sphere geometry constructor in threejs and a hold bunch of other little side topics that stem off from the use of the constructor. There is knowing all the arguments of the sphere geometry constrictor and how they can be used to help make smoother or more course sphere surfaces, and also how to make other sphere like shapes such as a dome. However it is not just a question or learning a thing or two about the Sphere Geometry constructor though, learning a think or two about Mesh Objects, Object3d in general, materials, and the other geometry constructors helper to get to a point where one can start to make crude models that are just collections of mesh objects using these built in constructors.

### 6.1 - Positioning things on the surface of a sphere

I have wrote a few threejs project examples and one of them was an example where I wanted to [position some mesh objects on the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/), I might get around to coming up with a simple example of it that I will then write about in this post when it comes to editing, but for now there is just checking out that post. This proved to be a fun little example and I might apply what I learned making it for some additional future projects examples. 

If you enjoyed this post and would like to read more on threejs I have wrote a whole lot of [other posts on threejs of course](/categories/three-js/). There is sticking to just learning about the various built in geometry constructors, as well as all the other classes to work with in order to make some kind of project with threes. Sooner or later one will get to the point that they will want to make some kind of real project, or at least some prototypes that are a step in that direction to say the least. With that said I have a [post on threejs project examples](/2021/02/19/threejs-examples/) in general that I have made thus far which might also be work checking out when it comes to finding additional material to read with three.js.
