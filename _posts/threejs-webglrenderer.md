---
title: WebGL Renderer core features and more in threejs
date: 2018-11-24 13:18:00
tags: [js,three.js]
layout: post
categories: three.js
id: 335
updated: 2023-05-15 14:40:50
version: 1.40
---

There are a few core components to making a [three.js](https://threejs.org/) project, there needs to be a [scene object](https://threejs.org/docs/#api/en/scenes/Scene), a [camera](https://threejs.org/docs/#api/en/cameras/Camera) to set the point in space by which to look at something in the scene object, and one final other component that is needed on top of all of this and that is a renderer. There is also having something to look at added to the scene object as well such as a [mesh object](/2018/05/04/threejs-mesh/) that is composed of a [buffer geometry](/2021/04/22/threejs-buffer-geometry/), and a [material](/2018/04/30/threejs-materials/). However there are other options when it comes to adding content to a scene object, so the core set of objects are really just those three things. That is a scene object, camera, and renderer.

In older versions of threejs there was both a 2D canvas renderer, and webgl renderer, but in later versions it has been removed from the core of threejs itself. So now when making a threejs project I am pretty much always working with the WebGL renderer as that would seem to be the best option for most typical use cases of threejs. There are some additional options built into the core of the threejs library, and additional renderer options that can be added by way of additional javaScript files. However in this post I will be writing a thing or two about the [WebGL renderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer). I will not get into every little detail but I will be writing about every core feature that I think is important to be aware of with this.

<!-- more -->

## The webGl renderer in threejs and What to know first

This is a post on the WebGlRenderer in threejs as well as some other closely related subjects that might come up with other options built into the core of threejs itself. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), although I will be trying to keep these examples fairly simple. I still assume that you have at least some background when it comes to the very basics of getting started with threejs and [client side javaScript in general](/2018/11/27/js-getting-started/), if not this still might prove to be a little to involved. In any case I take a moment to write about a few things that you might want to read up more on before continuing to read the rest of this post.

### Check out Scene objects and Camera Objects

The main method of interest with the WebGl renderer as well as with renderers in general is the render method that will take a scene object as well as a camera as arguments. After calling the method the given scene object will be drawn from the perspective of the given camera object. So then there is looking more into what there is to be ware of when it comes to creating a [scene object](/2018/05/03/threejs-scene/), as well as many of the features of scene objects much of which is based off of the [object3d class](/2018/04/23/threejs-object3d/). There is also looking into what the options are with [cameras as well](/2018/04/06/threejs-camera/), but for the most part I just go with the [perspective camera](/2018/04/07/threejs-camera-perspective/).

### Source Code examples are on Github

The Source code examples that i am writing about here can also be found in [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-webglrenderer). This is also where I park the source code examples for my many [other blog posts on threejs](/categories/three-js/) as well.

### Version numbers matter

In this post I was using [three.js r98](https://github.com/mrdoob/three.js/tree/r98) when I first wrote the post which was released in November of 2018. The last time I edited this post I was using r146, and thus made additional changes to all the source code examples to make them work better in late versions of threejs. In the r98 of threejs the canvas renderer was removed, there where also a number of other significant changes in that version. So now I am limited in terms of other renderer options that are baked into threejs itself at least. As of r118 the WebGL Renderer will default to using WebGL2, which for the most part will not be a problem on most clients, except for when it is a problem and results in some errors. As such if I am in a situation in which I am sure that WebGL1 features alone will work fine with what I want to do, I can use the WebGL1 Renderer now.

I also fixed some code breaking changes with these examples and they seem to be working fine with r127 as of this writing. Still lots of code breaking changes are made to threejs all the time so if the code in this example, or any of my three.js examples breaks be sure to check the revision number of the three.js file you are using first.

## 1 - Basic WebGL Renderer Demos

To get started with the WebGLRenderer all I need to do is just call the THREE.WebGLRenderer constructor method to create a new instance of the WebGL renderer. Once I have my WebGL renderer instance I can then call methods like the set size method to set the native size of the canvas that is to be used to render my project. I can also use the render function to draw the current state of a scene with a scene object and a camera. In this example I will be creating a basic scene, and a camera just for the sake of having a basic full working getting started type example of the WebGL renderer in threejs.

### 1.1 - Basic three.js example using the WebGLRenderer

For this basic example I just create a WebGL renderer by calling the THREE.WebGlRenderer constructor with the new keyword just like with nay other [constructor function](/2019/02/27/js-javascript-constructor/) in javaScript. Then I use the set size method to set the view port side of the canvas it will be using. The domElement property stores the dom element that will be used to render so I can use something like the appendChild method to append to an element that I have in my hard coded html. For this example I am using the [get element by id method](/2018/12/27/js-document-getelementbyid/) to gain a reference to a container element in my HTML with an id of demo, and defaulting to body in the event that it is not there.

Now that I have the renderer I will want a scene object with something to look at attached to it, and a camera. So the nest step is to just create a new scene object, and then a camera too such as the perspective camera. I then created a Mesh with a simple geometry and material for it, and made sure to add the mesh to the scene object. Now I can use the render function of the WebGL renderer, with that said all I have to do is call the render function. When calling the render function I pass the scene object as the first argument, and the camera as the second argument.

```js
//-------- ----------
// CREATING A WEBGL RENDERER
//-------- ----------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
//-------- ----------
// add something to the scene
//-------- ----------
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 3, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Using WebGL 1 Always, if that works

As of r118+ The WebGL Renderer will always use WebGL2 which for the most part will not present a problem with most clients. However this still might cause some errors on certain platforms. So if I am sure that WebGL1 alone will work fine with what I want to do, and more often that not it will, I can just make sure that I will always use the [WebGL1 Renderer](https://threejs.org/docs/#api/en/renderers/WebGL1Renderer) if it is there to work with in the revision of threejs that I am using.

```js
//-------- ----------
// CREATING A WEBL1 RENDER IF THERE, ELSE WEBGL RENDERER THAT WILL USE WEBGL 2 AS OF R118+
//-------- ----------
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
//-------- ----------
// add something to the scene
//-------- ----------
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 3, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So then in this example I always use the THREE.WebGL1Renderer if it is there. In older versions of threejs it might not be there, so in that case the regular webGL renderer will be used. There may be better ways of handing this sort of thing when it comes to feature testing what there is to work with and make a choice that way. Also there are a number of threejs features that will not work with WebGL1 so in that case if I want to use these kinds of features I will of course need to just always use THREE.WebGLRenderer with a late revision of threejs then. In any case this is something to be aware of as there is more that one built in webgl renderer, one that will always use webgl1 and another that will always use webgl2 as of r118+.


### 1.3 - Using a canvas element that is all ready in place

```js
//-------- ----------
// CANVAS - creating a canvas element with javaScript code and appending to HTML
//-------- ----------
const canvas = document.createElement('canvas');
( document.getElementById('demo') || document.body ).appendChild(canvas);
//-------- ----------
// RENDERER, SCENE, CAMERA
//-------- ----------
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
renderer.setSize(640, 480, false);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.5, 1000);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.4 - Having a transparent background for the renderer

```js
//-------- ----------
// CREATING A WEBGL RENDERER
//-------- ----------
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
renderer.setClearColor(null, 0);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
//-------- ----------
// add something to the scene
//-------- ----------
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 })));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Making a render loop

Many of the projects I make with three.js are just simple looping animations where I update a scene and then need to redraw over and over again. To have a loop I just need to call the render method in a method that is going to be called over and over again using something like the request animation frame method. There are a lot of other options with this sort of thing such as using the [THREE.Clock](/2021/05/28/threejs-clock/) class when it comes to tools built into the core of threejs. I should cover at last one or two examples of this kind of loop using threejs and native javaScript features so that will be the deal in this section.

### 2.1 - Using request animation frame

One way to set up an animation loop not just with threejs but in client side javaScript in general would be to use the native client side javaScript [request animation frame](/2018/03/13/js-request-animation-frame/) method. This is a method that one should all ready be familiar with when it comes to setting up a loop when working with canvas elements by themselves as this method is the typical standard way to go about doing so in vanilla javaScript.

```js
//-------- ----------
// RENDERER, SCENE, CAMERA
//-------- ----------
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.5, 100);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 0.5);
pl.position.set(2, 0, 2);
camera.add(pl);
scene.add(camera);
//-------- ----------
// MESH
//-------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x2a0000
        }));
scene.add(cube);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 20, // capping at 12 fps
    per: 0
};
const loop = function () {
    const wSecs = performance.now() - state.clock.oldTime;
    requestAnimationFrame(loop);
    if (wSecs > 1 / state.fps) {
        const secs = state.clock.getDelta();
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
```

In this example I am doing something to limit the number of frames that are rendered per second. There are many more simple animation loop examples where they do not go this far with things, but I think that having a way to adjust that is important when it comes to making a final product. When it comes to setting a low frame rate target the lower the better until it starts to get to the point where the animation is just too choppy, doing so helps to reduce stress on the clients resources.

### 2.2 - Using the set animation loop method

Another option for setting up and animation loop in which the render function will be called would be to use the [set animation loop method](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.setAnimationLoop) of the WebGL renderer instance. The process of using it is pretty straight forward I just need to call the method off of the renderer instance and pass the function that I want called over and over again as the first argument for the function. If I want to stop the animation for any reason I can then just pass a null value as a way to stop it.

```js
//-------- ----------
// RENDERER, SCENE, CAMERA
//-------- ----------
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.5, 100);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 0.5);
pl.position.set(2, 0, 2);
camera.add(pl);
scene.add(camera);
//-------- ----------
// MESH
//-------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x2a0000
        }));
scene.add(cube);
//-------- ----------
// USING SET ANIMATION LOOP
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 12,
    per: 0
};
state.clock.start();
const loop = function () {
    const wSecs = performance.now() - state.clock.oldTime;
    if (wSecs > 1 / state.fps) {
        const secs = state.clock.getDelta();
        state.per = state.frame / state.maxFrame;
        // update
        cube.rotation.y = Math.PI * 2 * state.per;
        // RENDER
        renderer.render(scene, camera);
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
    }
};
// start
renderer.setAnimationLoop(loop);
// stop after 3 secs
setTimeout(function () {
    renderer.setAnimationLoop(null);
}, 3000);
```

## Conclusion

In the event that there is no support for webGL in a client browser there are ways of feature testing for WebGL and then using another kind of renderer to render a scene, or at least inform the user of what the problem is. For more on this topic check out my other post that has to do with [feature testing on webGL](/2019/06/11/threejs-webgl/).

The WebGL renderer is the default renderer that I often go with mainly because it is a renderer that is built into the core of threejs itself. Many of the other renderer options have to be added by way of an additional external file, or do not have the same set of features such is the case with the SVG renderer for example. Some of these other renderer's might still prove to be a good choice in some situations though, it is just that so far I can not say that I have found myself in situations in which I need to work with these other options.

