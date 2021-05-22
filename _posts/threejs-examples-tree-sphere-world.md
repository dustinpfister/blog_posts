---
title: Threejs tree sphere world example
date: 2021-05-21 10:52:00
tags: [three.js]
layout: post
categories: three.js
id: 872
updated: 2021-05-22 14:21:31
version: 1.17
---

Earlier this week I wrote a [post on a simple tree model](/2021/05/19/threejs-examples-tree-sphere/) in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), so today I thought I would write a post on another example in which I am using that tree model to create a simple world of sorts with these trees all over it. The idea here is to just have instances of this simple tree model positioned on the surface of a sphere. With that said I am going to want to have a main world module that will create and position a collection of three models, and it will also make use of some additional features that I have worked out in other examples, such as using canvas elements to create textures for the trees as well as the world sphere itself. 
So this time around the [three.js example](/2021/02/19/threejs-examples/) in this post is actually now just one example but a combination of several examples that I have worked out all ready in the past. This is not the first such example that I have made think this, but I think that I would like to make at least a few of these as I try t find out what I might like to do with three.js over the long term when it comes to making animations, games, or maybe even something practical if I can manage doing so.

<!-- more -->

## 1 - What to know first with this World of tree sphere models in three.js

This is a post on a three.js project example in which I am creating a main world module that makes use of another model that is used to create an instance of a crude tree module that I worked out in another post. In this post I am making use of a while lot of features to work with in three.js, but for the most part I am sticking to using just built in geometries, and materials, and not doing anything to off the rails. Still this is not a post that is intended for developers that are new to three.js, and even if you have some experience with three.js there are still a few things that you might want to brush up on before reading more on this example.

### 1.1 - Version numbers matter with three.js

When this post was written I was using three.js revision 127 of three.js. Just like with any other javaScript library it is impotent to keep in mind which version of the library is being used when working out source code examples, as code breaking changes are often made to the public api of the library.

### 1.2 - Experiment with creating simple models that are just groups of mesh objects

I have wrote a number of posts thus far that have to do with crating a model that is really just a group of mesh objects. It is these mesh objects that are used to create an over all model that looks like something. This kind of approach might be crude compared to the more professional way of doing this sort of thing that would just involve a single geometry, however I have found that this kind of model still works fine with what it is that I would like to do with three.js. This simple tree sphere model is a simple static example of this kind of module that might serve as a good basic starting point for making this sort of thing. However I also have a number of other more complex modules that have some kind of animation that can be used with them.

## 2 - The World model

The main module of this three.js example is then a module that makes use of the tree module that I first started working out in another example. I will be getting to that module later in this post but the root module of everything is what I think I should start out with for now. In this world module I have just two public methods one to create a single world object, and then another to update the state of one of these world objects. Inside the body of this world module I have a number of helper methods including a helper method that will create and position a collection of the tree sphere models.

```js
(function (api) {
 
    var MATERIALS_TREE = {
        sphere: new THREE.MeshNormalMaterial(),
        trunk: new THREE.MeshNormalMaterial()
    };
 
    var MATERIALS_LIGHTS = {
        sun: new THREE.MeshNormalMaterial(),
        moon: new THREE.MeshNormalMaterial()
    };
 
    var MATERIALS_GROUND = {
        grass: new THREE.MeshNormalMaterial()
    };
 
    var createTrees = function (count, radius, MATERIALS_TREE) {
        count = count === undefined ? 5 : count;
        radius = radius === undefined ? 4 : radius;
        var group = new THREE.Group();
        var i = 0;
        while (i < count) {
            // create a tree
            var tree = TreeSphereMod.create({
                    sphereSize: 0.25 + 0.75 * Math.random(),
                    trunkLength: 1 + 4 * Math.random(),
                    materials: MATERIALS_TREE
                });
            // position and rotate the tree
            var per = i / count,
            radian = Math.PI * 2 * per;
            tree.position.set(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
            tree.lookAt(0, 0, 0);
            //tree.rotation.set(0, Math.PI * 2 - Math.PI / (count / 2) * i, Math.PI * 1.5);
            group.add(tree);
            i += 1;
        }
        return group;
    };
 
    // create and return a lights group
    var createLights = function (MATERIALS_LIGHTS) {
        var lights = new THREE.Group();
        var sun = new THREE.Mesh(
                new THREE.SphereGeometry(1, 20, 20),
                MATERIALS_LIGHTS.sun);
        sun.add(new THREE.PointLight(0xffff00, 1));
        sun.position.set(11, 0, 0);
        lights.add(sun);
        var moon = new THREE.Mesh(
                new THREE.SphereGeometry(0.25, 20, 20),
                MATERIALS_LIGHTS.moon);
        moon.add(new THREE.PointLight(0x0040ff, 1));
        moon.position.set(-11, 0, 0);
        lights.add(moon);
        // add AmbientLight
        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.intensity = 0.1;
        lights.add(ambientLight);
        return lights;
    };
 
    api.create = function (opt) {
        opt = opt || {};
        opt.MATERIALS_GROUND = opt.MATERIALS_GROUND || MATERIALS_GROUND;
        opt.MATERIALS_TREE = opt.MATERIALS_TREE || MATERIALS_TREE;
        opt.MATERIALS_LIGHTS = opt.MATERIALS_LIGHTS || MATERIALS_LIGHTS;
 
        var world = new THREE.Mesh(
                new THREE.SphereGeometry(4, 30, 30),
                opt.MATERIALS_GROUND.grass);
        world.position.set(0, 0, 0);
        var trees = createTrees(8, 4, opt.MATERIALS_TREE);
        trees.rotation.z = Math.PI / 180 * 0;
        world.add(trees);
 
        var trees2 = createTrees(8, 4, opt.MATERIALS_TREE);
        trees2.rotation.y = Math.PI / 180 * 20;
        trees2.rotation.x = Math.PI / 180 * 0;
        trees2.rotation.z = Math.PI / 180 * 90;
        world.add(trees2);
        world.userData.lights = createLights(opt.MATERIALS_LIGHTS);
        world.add(world.userData.lights);
        world.userData.lightsDPS = {
            x: opt.lightsDPSX || 0,
            y: opt.lightsDPSY || 0,
            z: opt.lightsDPSZ || 0
        };
        world.userData.worldRotation = opt.worldRotation || 0;
        return world;
    };
 
    api.update = function (world, secs) {
        var ud = world.userData;
        world.rotation.y += Math.PI / 180 * ud.worldRotation * secs;
        world.rotation.y %= Math.PI * 2;
 
        var lights = ud.lights;
        lights.rotation.x += Math.PI / 180 * ud.lightsDPS.x * secs;
        lights.rotation.y += Math.PI / 180 * ud.lightsDPS.y * secs;
        lights.rotation.z += Math.PI / 180 * ud.lightsDPS.z * secs;
        lights.rotation.x %= Math.PI * 2;
        lights.rotation.y %= Math.PI * 2;
        lights.rotation.z %= Math.PI * 2;
    };
 
    return api;
}
    (this['WorldMod'] = {}));
```

## 3 - The tree model

Here I have the source code of the tree sphere model that i will be using in the world module. The state of the source code is not all the different form what I world out for my example on this tree model by itself. It is just that this time around I am writing a whole bunch more code around this as a way to do something more with it.

```js
(function (api) {
 
    // default materials
    var materials_default = {
        sphere: new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x004f00,
            side: THREE.DoubleSide
        }),
        trunk: new THREE.MeshStandardMaterial({
            color: 0xffaf00,
            emissive: 0x442200,
            side: THREE.DoubleSide
        })
    };
 
    var createSphere = function (opt, materials) {
        var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(opt.sphereSize, opt.widthSegments, opt.heightSegments),
                materials.sphere);
        var adjust = (opt.trunkLength / 2 + opt.sphereSize * 0.75);
        sphere.position.set(0, 0, adjust * -1);
        return sphere;
    };
 
    var createTrunk = function (opt, materials) {
        var trunk = new THREE.Mesh(
                new THREE.BoxGeometry(opt.trunkSize, opt.trunkLength, opt.trunkSize),
                materials.trunk);
        trunk.position.set(0, 0, 0);
        trunk.rotation.set(1.57, 0, 0);
        return trunk;
    };
 
    // create and return a house
    api.create = function (opt) {
 
        opt = opt || {};
        opt.trunkLength = opt.trunkLength === undefined ? 2 : opt.trunkLength;
        opt.sphereSize = opt.sphereSize === undefined ? 1 : opt.sphereSize;
        opt.trunkSize = opt.trunkSize === undefined ? 0.25 : opt.trunkSize;
        opt.widthSegments = opt.widthSegments === undefined ? 15 : opt.widthSegments;
        opt.heightSegments = opt.heightSegments === undefined ? 15 : opt.heightSegments;
 
        var materials = opt.materials || materials_default;
        var tree = new THREE.Group();
 
        var sphere = createSphere(opt, materials);
        tree.add(sphere);
        var trunk = createTrunk(opt, materials);
        tree.add(trunk);
 
        return tree;
    };
 
}
    (this['TreeSphereMod'] = {}));
```

## 4 - Going to make use of canvas textures for this example

A while back I worked out another example where I was making use of canvas elements as a way to quickly create some textures to use with materials with a little javaScript code rather than external images. I thought that would be a nice touch to this example as a way to just quickly generate some texture for the trees and the world itself also.

```js
(function (canvasTextureMod) {
    // create a canvas texture with a draw method and size
    canvasTextureMod.createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
 
    var randomGridDraw = function (ctx, canvas, colorsArray, minValue, maxValue) {
        var i = 0,
        r1,
        r,
        g,
        b,
        x,
        y,
        len = canvas.width * canvas.height;
        while (i < len) {
            x = i % canvas.width;
            y = Math.floor(i / canvas.width);
            r1 = minValue + Math.floor((maxValue - minValue) * Math.random());
            r = colorsArray[0] === 'r1' ? r1 : colorsArray[0];
            g = colorsArray[1] === 'r1' ? r1 : colorsArray[1];
            b = colorsArray[2] === 'r1' ? r1 : colorsArray[2];
            ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            ctx.fillRect(x, y, 1, 1);
            i += 1;
        }
    };
 
    // create random gird texture
    canvasTextureMod.randomGrid = function (colorsArray, size, valueMin, valueMax) {
        colorsArray = colorsArray === undefined ? ['r1', 'r1', 'r1'] : colorsArray;
        size = size || 32;
        valueMin = valueMin === undefined ? 64 : valueMin;
        valueMax = valueMax === undefined ? 128 : valueMax;
        return canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            randomGridDraw(ctx, canvas, colorsArray, valueMin, valueMax);
        }, size);
    };
    // create a basic square texture
    canvasTextureMod.basicSquare = function (colorsArray, size, lineSize, lineStyle, minValue, maxValue) {
        colorsArray = colorsArray === undefined ? ['r1', 'r1', 'r1'] : colorsArray;
        size = size || 32;
        return canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            // draw random grid texture
            randomGridDraw(ctx, canvas, colorsArray, minValue || 0, maxValue === undefined ? 64 : maxValue);
            // draw lines
            ctx.strokeStyle = lineStyle || 'white';
            ctx.lineWidth = lineSize || 3;
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.stroke();
        }, size);
    };
}
    (this['canvasTextureMod'] = {}));
```

## 5 - The main javaScript file

Just like with any other three.js example of mine I am always going to want to have some kind of main javaScript file. In some examples that are simple enough I might just have this file alone, but in more complex examples such as this one there are just a few core features that are just about always parked here. In this file I create my scene object, renderer, and main application animation loop. this is also where I will just end up placing anything else that might come up before it ends up having some kind of module of its own, or because I am not sure where to go with it.

In this main javaScript file I am creating some custom materials for the sphere and trunk parts of trees using the canvas texture module of mine. These materials are what will be used to override what it is that I am using as hard coed defaults in the tree module.

```js
(function () {
    var MATERIALS_TREE = {
        sphere: new THREE.MeshStandardMaterial({
            //color: 0x00ff80,
            map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 32, 32, 150),
            side: THREE.DoubleSide
        }),
        trunk: new THREE.MeshStandardMaterial({
            color: 0xffaf80,
            map: canvasTextureMod.randomGrid(['r1', 'r1', '64'], 32, 32, 150),
            side: THREE.DoubleSide
        })
    };
    var MATERIALS_LIGHTS = {
        sun: new THREE.MeshStandardMaterial({
            emissive: 'white',
            emissiveMap: canvasTextureMod.randomGrid(['r1', 'r1', '0'])
        }),
        moon: new THREE.MeshStandardMaterial({
            emissive: 'white',
            emissiveMap: canvasTextureMod.randomGrid(['0', 'r1', 'ri'])
        })
    };
    var MATERIALS_GROUND = {
        grass: new THREE.MeshStandardMaterial({
            color: 'white',
            map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 128, 125, 200),
        })
    };
 
    // creating a scene
    var scene = new THREE.Scene();
 
    var worldOptions = {
        MATERIALS_GROUND: MATERIALS_GROUND,
        MATERIALS_TREE: MATERIALS_TREE,
        MATERIALS_LIGHTS: MATERIALS_LIGHTS,
        lightsDPSY: 20,
        lightsDPSZ: 5,
        worldRotation: 5
    };
    var world = WorldMod.create(worldOptions);
    scene.add(world);
 
    // world2
    worldOptions.worldRotation = 65;
    worldOptions.lightsDPSY = 75;
    worldOptions.lightsDPSZ = 25;
    var world2 = WorldMod.create(worldOptions);
    world2.position.set(-28, -3, -5);
    scene.add(world2);
 
    // world3
    worldOptions.worldRotation = 1;
    worldOptions.lightsDPSX = 25;
    worldOptions.lightsDPSY = 25;
    worldOptions.lightsDPSZ = 0;
    var world3 = WorldMod.create(worldOptions);
    world3.position.set(-15, -20, -50);
    scene.add(world3);
 
    // camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(12, 12, 12);
    camera.lookAt(0, 0, 0);
 
    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    //renderer.width = 640;
    renderer.domElement.width = 640;
    renderer.domElement.height = 480;
    renderer.setViewport(0, 0, 640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);
    var full = false;
    var toggleFull = function (canvas) {
        var canvas = renderer.domElement;
        full = !full;
        container.style.position = 'static';
        container.style.width = '640px';
        container.style.height = '480px';
        canvas.style.width = '640px';
        canvas.style.height = '480px';
        if (full) {
            canvas.style.width = 'auto';
            canvas.style.height = window.innerHeight + 'px';
            canvas.style.margin = 'auto';
            container.style.position = 'fixed';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.background = 'black';
            container.style.left = '0px';
            container.style.top = '0px';
        }
    };
    // press f for full screen
    window.addEventListener('keydown', function (e) {
        if (e.key === 'f') {
            toggleFull();
        }
    });
 
    var lt = new Date(),
    sunRadian = Math.PI,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            WorldMod.update(world, secs);
            WorldMod.update(world2, secs);
            WorldMod.update(world3, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 6 - Conclusion

This example has proved to be a half way decent exercise with a great many various topics in three.js that I am using together to create a single project. There is having a single model of a tree that is composed of just a sphere and a box geometry of a trunk, but then there is getting into having a collection of these kinds of models, and also beginning a number of other things into play in order to make a somewhat interesting over all scene. This was more or less the goal with this three.js example, and I am to make at least a few more examples such as this when it comes to making something that is at least starting to look like some kind of finished product.