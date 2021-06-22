---
title: Working with Scenes in three.js
date: 2018-05-03 09:36:00
tags: [js,three.js]
layout: post
categories: three.js
id: 182
updated: 2021-06-22 11:52:37
version: 1.30
---

A [Scene](https://threejs.org/docs/index.html#api/scenes/Scene) object in [three.js](https://threejs.org/) is an instance of the THREE.Scene constructor that can be used to place everything that makes up an environment in a three.js project. It can contain cameras, lights, and of course mesh objects composed of a geometry and material, along with many other types of various objects such as arrow helpers. The scene object can then be passed to a render function along with a camera to render a view of the scene from the perspective of the given camera.

There is a great deal of other things to cover when it comes to a scene though, such as the background and fog properties, and the fact that it inherits from the Object3d base class which allows for things like having a whole scene can be repositioned, and rotated just like mesh objects, and cameras and anything based off of Object3d. So in this post I will be going over at least a few details here and there when it comes to a scene object in three.js.

<!-- more -->

## 1 - What to know

This is an post on [three.js](https://threejs.org/) and even then this is just a general post that covers just one little constructor known as [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene). If you are new to three.js you might want to start with [my getting started post on three.js](/2018/04/04/threejs-getting-started/) as a starting point an three.js. If you are new to javaScript in general I have wrote a few [getting started type posts with javaScript](/2018/11/27/js-getting-started/) that might be worth checking out if you are still fairly new to JavaScript in general. So then I assume that you have at least some basic working knowledge of the basics of threejs and JavaScript, so I will not be getting into the basics of these topics here. However in this section I will quickly cover a few things that you might want to read up more on when it comes to getting a more solid understanding of the scene objects, and some other related topics that you show know in order to do something with a scene object.

### 1.1 - In order to view a scene you will want to known how to set up a renderer

The scene object is a main object that will contain all of the objects that compose the objects of a threejs project. However in order to view the state of one of these scene objects it is called for to use some kind of renderer as a way to view the current state of the scene object. The typical render that I often go with these days as of r127 is the [Web Gl renderer](/2018/11/24/threejs-webglrenderer/), as browser support for web gl is now pretty good compared to the way things where a few years ago. In older versions of threejs inclining the ones I was using when I first wrote this post there was also the 2d canvas renderer which is not removed from the core of threejs. It is still possible to use [some alternative renderer's](https://github.com/mrdoob/three.js/tree/r127/examples/js/renderers) which can be found in the examples folder of the threejs git hub repository.

### 1.2 - In order to use a renderer with a scene you will also need a camera

In order to use the render function of a renderer I will need to pass the scene object to it, but I will also need to pass a camera to use also. There is a lot to cover when it comes to what the options are with cameras, but I typically like to just go with the [perspective camera](/2018/04/07/threejs-camera-perspective/). The camera object can or can not be added to the scene object, but often I will add it to the scene anyway. if I add some kind of child object to the camera that I want to effect the scene such as a light source then I will have to add the camera t the scene of else those children will not be in the scene naturally.

### 1.3 - Mesh objects, Geometry, Materials, and the Object3d base class

In order to have something to look at in a scene I am going to want to create and add at least one or more mesh objects. In order to create a mesh object I will want to have a geometry, and one or more materials by which to style that geometry.

### 1.4 - Version Numbers matter with three.js

When I first wrote this post I was using three.js r91, and the last time I edited this post and did some testing and editing of the source code examples I was using r127. I have made an effort of making sure I mentioning what version of threejs I am using when making these posts as threejs is a pretty fast moving project, and code breaking changes happen often.

## 2 - Basic example of THREE.Scene

First off I will want to create the scene by just calling the THREE.Scene constructor with the new keyword, and saving the result of that to a variable. This result will be my scene object but there at least a little more to do if I want to actual see something. At a minimum beyond just having a scene object I will want to have at least some kind of mesh object to look at added to a Scene.  For now this mesh object could just be a mesh that used a geometry from one of the built in geometry constructors in three.js such as [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry), and then I can use something like the Normal material which does not require a light source.

Unless I aim to do something headless with a scene and one or more mesh objects, I will also want a camera and a renderer to look at what it is that I am doing with this scene object. There are a number of options when it comes to a camera, but I typically like to go with the [perspective camera](/2018/04/07/threejs-camera-perspective/). In some cases I might want to add the camera to the scene, but in any case I will want to have this ready to be used with a renderer where I will pass a scene object, and a camerae which will then be used to render to a canvas element.

So a basic example of THREE.Scene might look something like this:

```js
(function () {
 
    // CREATE A SCENE
    var scene = new THREE.Scene();
 
    // add a Mesh to look at
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
    mesh.position.set(0, 0, -2);
    scene.add(mesh);
    // add a CAMERA to it so we can see something
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1, 1, 1); // position the camera away from the mesh
    camera.lookAt(mesh.position); // look at the mesh
    // we need a RENDERER to render the scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo') || document.body;
    container.appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());
```

If I did not give a normal material when creating the mesh then by default a Mesh will use the Basic material with a random color used to paint the faces of the geometry. Of course I could create an instance of some other material, or give a color or texture to another instance of basic material that I would then give as the second argument to the Mesh constructor. However getting into materials in depth might be a bot off topic, I have wrote a a post on materials in general anyway so I do not care to repeat that all here. I will however be getting into the properties of THREE.Scene including the material override property, more on that later.

## 3 - Adding Fog to a scene

A property of interest in a scene instance is the [scene.fog Property](/2018/04/16/threejs-fog/) which can be used to add a fog effect to that will effect mesh objects that use materials that are effected by a fog. When adding a fog I typically keep the background color, and the color of the fog the same, and stick to using materials that will work with a fog like that of the standard material.

```js
var scene = new THREE.Scene(),
fogColor = new THREE.Color(0xffffff);
 
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.1);
```

There are two kinds of fog that can be added to a scene in three.js which are [Fog](https://threejs.org/docs/index.html#api/scenes/Fog), and [FogExp2](https://threejs.org/docs/index.html#api/scenes/FogExp2). The regular Fog constructor will add a fog that works in a linear way, while the FogExp2 constructor works in an exponential way.

## 4 - Changing the background of the Scene with Scene.background

It goes without saying that an important part of the scene instance is the background property. By default it is a solid black color, but it can be set to another solid color using THREE.Color.

```js
scene.background = THREE.Color(0xffffff);
```

If you want to use a texture, or a cube texture that can be used as well. I have written a [post on how to used a cube texture](/2018/04/22/threejs-cube-texture/) in which I get into how to go about doing just that in detail. The process of doing so is a little complicated when it comes to using a cube texture that was made before hand, and making a skymap can prove to be a little involved. However it is a pretty cool background effect that can result in this texture that one can see in all directions so it is worth looking into more for sure.

## 5 - Using Scene.overrideMaterial to add a material that overrides all materials

There is the scene override property of a scene that will do exactly as you would expect, override all materials used in the scene with the material given to the material override property of the scene instance.

```js
(function () {
 
    // create a Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);
 
    // can set an override material for everything
    scene.overrideMaterial = new THREE.MeshDepthMaterial();
 
    // just adding a 1x1x1 cube with the default
    // MeshBasicMaterial and random color for faces
    // when added to the scene like this
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
 
    // adding another 1x1x1 cube but this time I am giving
    // and instance of MeshBasicMaterial in which I am setting
    // the face color of the faces to red
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
 
            new THREE.MeshBasicMaterial({
 
                color: 0x00ff00
 
            }));
    cube2.position.set(-2, 0, 0);
    scene.add(cube2);
 
    // a sphere using the lamber material in wire frame mode
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
 
            new THREE.MeshLambertMaterial({
 
                emissive: 0x00004a
 
            }));
    sphere.position.set(0, 0, -2);
    scene.add(sphere);
 
    // add a CAMERA to it so we can see something
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
 
    // position The camera away from the origin
    // and have it look at the origin
    // by default that is where something goes.
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
 
    // we need a RENDERER to render the scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // render the scene with the camera
    renderer.render(scene, camera);
 
}
    ());
```

In the above demo I created a simple scene with a few instances of Mesh that each use a different material and or settings for the material. By setting an instance of THREE.MeshDepthMaterial as the value of Scene.overrideMaterial, all the other materials are ignored and the depth material is just used for everything.

This can be useful if you want to have a feature that allows for doing something like setting everything in the scene to wire frame mode.

```js
scene.overrideMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe:true
});
```

## 6 - Using Object3D methods with a Scene Object

Be sure to read my full [post on the Object3D](/2018/04/23/threejs-object3d/) class in order to help gain more insight into what the Object3d class is all about, and why it is a big deal. However simply put, like a lot of things in three.js the Scene Class inherits from the Object3D class. This Object3d class gives THREE.Scene properties and methods like Object3D.position, Object3D.rotation and Object3D.add which can be used to add additional objects to the scene.

There is a lot that could be written about this, and how it applies the a scene object, but one interesting thing is that if I play with the instance of [Vector3](/2018/04/15/threejs-vector3/) that is stored in the position property of my scene instance this will change the position of the whole Scene, and everything in it that is added relative to the scene.

```js
    var frame = 0,
    maxFrame = 50,
    loop = function () {
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;
        requestAnimationFrame(loop);
        // using Object3D properties to change
        // the position and rotation of a scene
        scene.position.set(0, 1 * bias, 0);
        scene.rotation.set(Math.PI * 2 * per, 0, 0);
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
    };
    loop();
```

## 7 - Conclusion

That is all that I have to say about these scene of a three.js project example for now. There is a great deal more to write about when it comes to a scene in three.js, but much of that might branch off into just about everything with the library actually. A scene is a major part of any three.js project, along with other vital components such as a camera, and a renderer all of which just about every three.js example I have made includes each of those.

The best way to learn more about the THREE.Scene constructor and everything else that is used with it would be to just start making some actual projects of some kind with three.js and just start learning as one goes. With that said I have some simple project examples to start off with in my [post on three.js examples](/2021/02/19/threejs-examples/) that might be worth checking out when it comes to getting some ideas for actual projects of some kind.
