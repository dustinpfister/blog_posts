---
title: The webGL renderer in three.js
date: 2018-11-24 13:18:00
tags: [js,three.js]
layout: post
categories: three.js
id: 335
updated: 2021-05-29 08:18:53
version: 1.23
---

There are a few core components to making a [three.js](https://threejs.org/), there needs to be a scene, at least one mesh to look at that is composed of a geometry, and a material. There also needs to be a camera to set the point in space by which to look at the mesh in the scene as well, however there is still one final other component that is needed as well and that is a render. In older versions of three.js there was both a 2d canvas and webgl renderer but in later versions it has been removed, and now when making a three.js project I am pretty much always working with the webgl renderer. As such this post will serve as a general overview of the [webgl renderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer), I will not get into every little detail here, but I will link to other relevant posts when it is called for.

<!-- more -->

## 1 - What to know

There is more than one option when it comes to rendering a three.js scene and camera with a renderer in threejs, maybe not so much with the core library but there are some additional render options in the github repo examples folder. The 2d canvas renderer is another option, but many three.js features will not work with it, it renders a lot slower, and as of three.js r98 it is not even part of three.js anymore. So for the most part it just makes sense to just use the web gl renderer as support for web gl is now pretty good with modern web browsers.

### 1.1 - Version numbers matter

In this post I was using [three.js r98](https://github.com/mrdoob/three.js/tree/r98) when I first wrote the post which was released in November of 2018, and the last time I edited this post I was using r127 which was still a late version of three.js in early 2021. In the r98 of three.s the canvas renderer was removed, there where also a number of other significant changes in that version. I also fixed some code breaking changes with these examples and they seem to be workin fine with r127 as of this writing. Still lots of code breaking changes are made to threejs all the time so if the code in this example, or any of my three.js examples breaks be sure to check the revision number of the three.js file you are using first.

## 2 - Basic three.js example using the WebGLRenderer

To get started with the WebGLRenderer all I need to do is just call the THREE.WebGLRenderer constructor method to create a new instance of the web gl renderer. Once I have my web gl renderer instance I can then call methods like setSize to set the native size of the canvas that is to be used to render my project. I can also use the render function of the renderer to draw the current state of a scene with a camera. So in this example I will be creating a basic scene, and camera just for the sake of having a basic full working getting started type example.

So for this basic example I just create a web gl renderer by calling the THREE.WebGlRenderere constructor, and then use the set size method to set the view port side of the canvas it will be using. The domElement property stores the dom element that will be used to render so I can use something like the appendChild method to append to an element that I have in my html.

Now that I have the renderer I will want a scene object with something to look at attached to it, and a camera. So the nest step is to just create a new scene object, and then a camera too such as the perspective camera. I then created a Mesh with a simple geometry and material for it, and made sure to ass the mesh to the scene object. Now I can use the render function of the web gl renderer, with that said all I have to do is call the render function, pass the scene object as the first argument, and the camera as the second argument.

```js
(function () {
 
    // CREATING A WEBL RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    // add something to the scene
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            })));
 
    // RENDERING
    renderer.render(scene, camera);
 
}
    ());
```

To render the scene I just need to pass the scene, and camera to the render method of the webGLRenderer instance.

## 3 - Making a render loop

Many of the projects I make with three.js are just simple looping animations. To have a loop I just need to call the render method in a method that is going to be called over and over again using something like the request animation frame method. There is a wide range of ways to go about doing something like this so I will not be getting into the full depth of this topic here. However I should cover at last one or two examples of this kind of loop using threejs  and native javaScript features.

### 3.1 - Using request animation frame

One way to set up an animation loop would be to use the native client side javaScript [request animation frame](/2018/03/13/js-request-animation-frame/) method. This is a method that one should all ready be familiar with when it comes to setting up a render loop when it comes to just directly working with canvas elements by themselves as this method is the typical standard way to o about doing so.

```js
(function () {
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 0.5);
    light.position.set(2, 0, 2);
    camera.add(light);
    scene.add(camera);
 
    // add something to the scene
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x2a0000
            }));
    scene.add(cube);
 
    var state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 20, // capping at 12 fps
        per: 0
    };
    var loop = function () {
        var wSecs = performance.now() - state.clock.oldTime,
        secs;
        requestAnimationFrame(loop);
        if (wSecs > 1 / state.fps) {
            secs = state.clock.getDelta();
            state.per = state.frame / state.maxFrame;
            // update
            cube.rotation.y = Math.PI * 2 * state.per;
            // RENDER
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    };
 
    state.clock.start();
    loop();
 
}
    ());
```

In this example I am doing something to limit the number of frames that are rendered per second. There are many more simple animation loop examples where they do not go this far with things, but I think that having a way to adjust that is impotent when it comes to making a final product. When it comes to setting a low frame rate target the lower the better until it starts to get to the point where the animation is just too choppy, doing so helps to reduce stress on the clients resources.

### 3.2 - Using the set animation loop method

Another option for setting up and animation loop in which the render function will be called would be to use the [set animation loop method](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.setAnimationLoop) of the web gl renderer instance. The process of using it is pretty straight forward I just need to call the method off of the renderer instance and pass the function that I want called over and over again as the first argument for the function. If I want to stop the animation for any reason I can then just pass a null value as a way to stop it.

```js
(function () {
 
    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 0.5);
    light.position.set(2, 0, 2);
    camera.add(light);
    scene.add(camera);
    // add something to the scene
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x2a0000
            }));
    scene.add(cube);
 
    var state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 12,
        per: 0
    };
 
    state.clock.start();
    // USING SET ANIMATION LOOP
    renderer.setAnimationLoop(function () {
        var wSecs = performance.now() - state.clock.oldTime,
        secs;
        if (wSecs > 1 / state.fps) {
            secs = state.clock.getDelta();
            state.per = state.frame / state.maxFrame;
            // update
            cube.rotation.y = Math.PI * 2 * state.per;
            // RENDER
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    });
 
}
    ());
```

## 4 - WebGL browser support

In the event that there is no support for webGL in a client browser there are ways of feature testing for webGL and then using another kind of renderer to render a scene that makes use of the 2d canvas drawing api, or some other way or rendering other than that of webGL. For more on this topic check out my other post that has to do with [feature testing on webGL](/2019/06/11/threejs-webgl/).

## 5 - Conclusion

The WebGL renderer is the default renderer that I often go with mainly because it is a renderer that is built into the core of three.js itself. Many of the other renderer options have to be added by way of an additional external file, such is the case with the 2d canvas renderer for example.

