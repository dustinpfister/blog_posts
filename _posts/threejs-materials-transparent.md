---
title: Transparent Materials in threejs
date: 2021-04-21 14:03:00
tags: [three.js]
layout: post
categories: three.js
id: 850
updated: 2022-02-25 09:41:41
version: 1.27
---

In [threejs](https://threejs.org/) there are a few things to know about when it comes to making transparent materials, so I think it is called for to write a post on the topic. When it comes to working with just the [Basic material](/2018/05/05/threejs-basic-material/) for example the process is not that hard at all actually, when creating the material I just need to set the [transparent property of the material](https://threejs.org/docs/#api/en/materials/Material.transparent) to true. 
Once I have the transparency property value of a material set to true, it is then just a matter of setting the desired [opacity value](https://threejs.org/docs/#api/en/materials/Material.opacity) for the material for the most part. However there might be a bit more to write about when it comes to a few more additional things that branch off from that, as there is a thing or two about more advanced topics such as [alpha maps](/2019/06/06/threejs-alpha-map/) for example. Also things can get a little involves actually when we start brining light sources into the mix and how that should be handled. So in this post I will be covering the very basics of getting started with transparency when working with materials in threejs, but I will also have to at least write about a few things that have to do with other features of threejs while I am at it.

<!-- more -->

## Making a mesh transparent, and what else to know

In this post I am mainly writing about the transparent and opacity properties of materials as a way to adjust the transparency of a material of a [mesh object](/2018/05/04/threejs-mesh/) in the javaScript library known as three.js. However there are a whole lot of other ways to go about making a mesh object visible or not, and there are also a lot of other things that you should be aware of before continuing to read the content of this post. 

I will not be getting into the basics of how to [get started with three.js](/2018/04/04/threejs-getting-started/), and I also assume that you have a [fair amount of experience with client side javaScript in general](/2018/11/27/js-getting-started/) as well. In this section I will not be going over every little detail that you should know before hand of course, but I can take a moment to write about some things that you might want to look into more first if you have not done so all ready.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post can be found in my [test theejs repository on Guthub](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-materials-transparent). This is also where I park the source code examples for my [many other posts on threejs](/categories/three-js/). This post on transparency like many of my other posts is still very much a work in progress, every so often I do get around to expanding posts with more examples while also improving the over all quality of older examples while I am at it. If you see something that should be fixed, or of you can thing of something that should be added there is the comments section in the bottom of this post, and also the test threejs repository where pull requests can be made.

### Version Numbers matter with three.js

When I first wrote this post I was using version r127 of three.js, and the last time I cam around to doing a little editing I made sure the examples still work okay with r135. Code breaking changes might be made to three.js at some point in the future that might cause many of these examples to not work any more. Always be mindful of what the version of three.js is that you are using, and this is also something to always keep in mind when working with javaScript libraries in general actually it is just that threejs moves pretty fast, and the public API keeps changing often.

### The visible property of the Object3d class

If I want to just make a mesh object, or just about any display object based off of object3d not visible for a while I can always just set the [visible boolean of the object](/2021/05/24/threejs-object3d-visible/) to false. There are also a number of other topics to cover when it comes to making an object completely not visible or not beyond just that of the visibility boolean of an object3d based object and the transparency  and opacity properties of materials. For example there is adding one or more mesh objects to one or more [groups](/2018/05/16/threejs-grouping-mesh-objects/) and then adding and removing the groups to the main scene object that is used with the render function of a renderer as needed.

## 1 - Basic Transparency of the whole mesh with the Basic Material

If I just want to make a whole mesh transparent, and I am not doing anything fancy with lights, alpha maps, and so forth. Then transparency is not that hard to get up and running, all I have to do is set the transparency boolean of the basic materials to true. After that all I have to do is set or change the opacity property of the mesh to set the level of transparency for the mesh.

```js
(function () {
    // SCENE, CAMERA, and RENDERER
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(0.9, 0, 3.5);
    camera.lookAt(-1, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    // CREATE MESH OBJECTS
    var createCube = function (size, material, x, y, z) {
        var geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    var materials = {};
    materials.sand = new THREE.MeshBasicMaterial({
        color: 'yellow'
    });
    materials.glass = new THREE.MeshBasicMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
    var glassCube = createCube(1, materials.glass, 0, 0, 2),
    cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    // RENDER
    renderer.render(scene, camera);
}());
```

## 2 - Using a light source and the standard material

Things get a little more involve when using a light source, when this is the case I will have to use a material that will respond to light. Once such material is the standard material rather than the basic material. Then I am going to need to add at least one light source, there are a number of options for that, the one I often go for is a point light. This is is a nice direction light that will shine light in all directions form the position at which it is located.

```js
(function () {
    // ********** **********
    // SCENE, CAMERA, RENDERER, and LIGHT
    // ********** **********
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(0.9, 0, 3.5);
    camera.lookAt(-1, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(2, -5, 5);
    scene.add(pointLight);
    // ********** **********
    // CREATE MESH OBJECTS
    // ********** **********
    var createCube = function (size, material, x, y, z) {
        var geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    var materials = {};
    materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
    materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
    var glassCube = createCube(1, materials.glass, 0, 0, 2),
    cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    // ********** **********
    // RENDER
    // ********** **********
    renderer.render(scene, camera);
}());
```

## 3 - Canvas elements and alpha maps

Another kind of transparency is to get into using [alpha maps](/2019/06/06/threejs-alpha-map/) this is a kind of texture map that can be added to a mesh to set locations in a face that should be transparent. One way to do so would be to load extremal images as a way to load some textures for this sort of thing. However when it comes to just using a little javaScript code I can use canvas elements as a way to create textures which in turn can be used for a alpha map.

So once again I added a bit more to what was once my basic example on transparency in threejs, by adding a method that will help me to make a texture for a map. There are a number of maps to work with when it comes to making a material, but for this example I will just be sticking to an alpha map for the glass cube. When drawing to the canvas element i will want to stick to using gray scale color values, when a color is black that will mean that area in the texture will be fully transparent, while white will mean fully opaque.

Things will get a little involve beyond just that of adding the alpha map to the glass material though, I will want to play around with some additional material properties to get things to work the way that I want them to. For example there is the question of drawing just the front sides of a cube, or all sides. I might want to also play around with the depth function that is used for the material.

For this example I also added an ambient light to make sure that there is always a certain amount of base light for all surfaces.

```js
(function () {
    // ********** **********
    // SCENE, CAMERA, RENDERER, and LIGHTS
    // ********** **********
    var scene = new THREE.Scene();
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(2, -5, 5);
    scene.add(pointLight);
    var light = new THREE.AmbientLight(0xffffff);
    light.intensity = 0.4;
    scene.add(light);
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(0.9, 0, 3.5);
    camera.lookAt(-1, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // CREATE MESH OBJECTS WITH CANVAS ALPHA MAP TEXTURE
    // ********** **********
    var createCube = function (size, material, x, y, z) {
        var geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    var createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
    var alphaMap = createCanvasTexture(function (ctx, canvas) {
            // drawing gray scale areas
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, 32, 32);
            ctx.fillStyle = '#000000';
            ctx.fillRect(32, 0, 32, 32);
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 32, 32, 32);
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(32, 32, 32, 32);
        });
    var materials = {};
    materials.sand = new THREE.MeshStandardMaterial({
            color: 'yellow'
        });
    materials.glass = new THREE.MeshStandardMaterial({
            color: 'cyan',
            alphaMap: alphaMap, // using an alpha map
            side: THREE.DoubleSide,
            depthFunc: THREE.AlwaysDepth,
            transparent: true,
            opacity: 0.2
        });
    var glassCube = createCube(1, materials.glass, 0, 0, 2),
    cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    // ********** **********
    // RENDER
    // ********** **********
    renderer.render(scene, camera);
}
    ());
```

## 4 - Conclusion

So then transparency is something that can be set for a material as a whole, but it can also be set in at a texture level also when it comes to alpha maps. So then transparency can be something that can be very simple if we are taking the use of the basic material, and just setting the transparency of the whole material at a global level. However things can get a little involved when it comes to adding alpha maps to the mix, as that can lead to all kinds of additional things when it comes to sides, and directional light.

