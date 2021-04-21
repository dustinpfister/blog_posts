---
title: Basic Framework threejs example
date: 2021-04-20 16:00:00
tags: [three.js]
layout: post
categories: three.js
id: 849
updated: 2021-04-21 14:06:01
version: 1.11
---

This will be yet another [threejs](https://threejs.org/) post that will be yet another basic [project example of threejs](/2021/02/19/threejs-examples/) this time around I think I should start at least a few examples that are basic starting points for some kind of framework where I am building on top of threejs.

For now I am not interesting in doing anything to involve when it comes to making this kind of project. What I want is a way to just have things like an application loop, and some mash creation type stuff abstracted away into a framework. This way I can have just a single main.js file where I just call a main create method of this framework, and pass an options object with a few methods and proprieties as a way to make a quick simple looping animation type thing.

<!-- more -->


## 1 - The source code of the basic framework

For this frame work I am packing everything into a [single IIFE](/2020/02/04/js-iife/) and attaching all the public methods to a single global object property called threeFrame. When it comes to public methods of this framework, so far I just have two, one to create an instance of this main frame work API, and another that will just create a simple cube mesh.

```js
(function (threeFrame) {
 
    // Just an add cube method for now
    threeFrame.addCube = function (api, obj3d, x, y, z, size, materialIndex) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        z = z === undefined ? 0 : z;
        size = size === undefined ? 2 : size;
        var geometry = new THREE.BoxGeometry(size, size, size);
        var cube = new THREE.Mesh(geometry, api.materials[materialIndex || 0]);
        cube.position.set(x, y, z);
        obj3d.add(cube);
        return cube;
    };
 
    // create a basic scene
    var createAPIObject = function (opt) {
        // scene
        var scene = new THREE.Scene();
        // camera
        var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
        camera.position.set(2.5, 2.5, 2.5);
        camera.lookAt(0, 0, 0);
        // RENDERER
        var renderer = new THREE.WebGLRenderer();
        document.getElementById('demo').appendChild(renderer.domElement);
        renderer.render(scene, camera);
        // return an object with refs to scene and other items of interest
        return {
            scene: scene,
            camera: camera,
            renderer: renderer,
            canvas: renderer.domElement,
            fps_target: 24,
            init: opt.init,
            update: opt.update,
            materials: opt.materials || [new THREE.MeshBasicMaterial({
                    color: 0x00ffff,
                    wireframe: true
                })]
        };
    };
 
    // create a main app loop function, for the given api object
    var createLoopFunction = function (api) {
        var lt = new Date();
        var loop = function () {
            var now = new Date(),
            secs = (now - lt) / 1000;
            requestAnimationFrame(loop);
            if (secs >= 1 / api.fps_target) {
                api.update(api, secs); ;
                api.renderer.render(api.scene, api.camera);
                lt = now;
            }
        };
        return loop;
    };
 
    // create a main project object
    threeFrame.create = function (opt) {
        opt = opt || {};
        // create api
        var api = createAPIObject(opt);
        // call init method
        api.init(api);
        // start loop
        var loop = createLoopFunction(api);
        loop();
        return api;
    };
 
}(typeof threeFrame === 'undefined' ? this['threeFrame'] = {} : threeFrame));
```

## 2 - Now just a single use case example of the framework

Now that I have my basic framework together it is time to create a simple demo of this to make sure that it is working out okay thus far. To start out with this I do not need to do anything fancy, just a simple rotating cube like demo will work just fine for now.

```js
// basic rotating cube
threeFrame.create({
    materials: [new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        }),
        new THREE.MeshNormalMaterial({})],
    init: function (api) {
        api.cube1 = threeFrame.addCube(api, api.scene, 0, 0, 0, 1, 1);
        api.cube2 = threeFrame.addCube(api, api.scene, -2.5, 1, 0, 1, 0);
        api.rotation = 0;
    },
    update: function (api, secs) {
        api.rotation += 1 * secs;
        api.rotation %= Math.PI * 2;
        api.cube1.rotation.set(0, api.rotation, 0);
        api.cube2.rotation.set(0, api.rotation, api.rotation);
    }
});
```

So when this is all up and running it would seem that things are working out as expected. I have two cubes in the scene, and they are both rotating, nothing to much to write home about, but I did just want a basic starting point up and running for now and with that said it looks like I have something that is working okay so far.

There is all ready a great deal that I might want to change and add, but for now I think I just want to be happy with this as a basic starting point. When it comes to adding more on top of this that might change a great deal depending on what I want to do with threejs, making some kind of game is not the same thing as making some kind of looping animation that I might want to export to a stand alone video file contain of some kind.

## 3 - Conclusion

Well I was able to slap this basic framework example together in a flash today, but it is still very mush just that a basic framework. Still something like this might still prove to work okay when it comes to making very simple examples that just involve some kind of looping animation type effect. I am sure that I might make at least a few more examples such as this where I might add at least a few more additional features here and there as needed.

One feature that might be nice is to have a single overlay canvas element that I layer on top of the canvas element that draws the 3d scene using threejs. This overlay canvas can be used as a way to attach some event handers when it comes to working with user input, but it can also be used to draw on top of the scene using just the plain 2d drawing context. That however is one idea that I might reserve for a future post, maybe I will even get to that in the next few days.