---
title: Basic Framework threejs example
date: 2021-04-20 16:00:00
tags: [three.js]
layout: post
categories: three.js
id: 849
updated: 2022-12-28 12:11:57
version: 1.28
---

This will be yet another [threejs](https://threejs.org/) post that will be a [project example of threejs](/2021/02/19/threejs-examples/), rater than a post in with i write about just a single feature of the core of the library. This time though I am thinking more in terms of a framework rater than a full project example. So in this post I think I should start out with at least a few examples that are basic starting points for some kind of framework where I am building on top of threejs.

When making one threejs demo after another I have found that there are patterns that I keep repeating over and over again when it comes to setting up a basic scene. There is typically always setting up a [scene object](/2018/05/03/threejs-scene/), creating an instance of a [perspective camera](/2018/04/07/threejs-camera-perspective/), and of course a [renderer](/2018/11/24/threejs-webglrenderer/) to draw the scene from the perspective of the camera to a canvas element. On top of that I often have some kind of main application loop in which I am updating the state of a scene, and rendering that scene over and over again. Sense there is so much going on and I keep repeating it over and over again it would make sense to create something in which I am creating abstractions for all of this. Once I have that set up the way I like it I can just link to one more additional external files beyond that of just three.js, and write less code when it comes to making a new project.

For now I am not interesting in doing anything to involved when it comes to making some kind of framework or library built on top of threejs. What I want is a way to just have things like an application loop, and some mash creation type stuff abstracted away into an external file that I can then link to and then just add a few things that have to do with a specific code example. This way I can have just a single main.js file where I just call a main create method of this framework, and pass an options object with a few methods and proprieties as a way to make a quick simple looping animation.

There is a wide range of different ways that I could go when it comes to this sort of thing. However as far as this post is concerned I am just going to stick with a general exercise, rather than something that is specific for games, stochastic or deterministic animations, or some other general use case of threejs.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/UaxHBdbvsco" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## A Basic threejs framework example and what to know first

I will not be getting into the [very basics of threejs](/2018/04/04/threejs-getting-started/) and javaScript in general here. The content of this post is about something that might come up for someone that has at least a fair amount of experience with client side web development and making use with threejs as part of an over all project of some kind. However in this section I think I should go over at least some things that should be understood before reading the rest of the content of this post.

### What is a framework to begin with anyway?

This is a post on a basic threejs framework starting point, and because it is a very basic starting point technically it might not really be a framework to begin with. However that all depends on what your definitions of framework, library, and module are to begin with. The general idea that I have in mind is to create something that is almost a finished application by itself actually, and using it is just a matter of adding a few additional lines of code that that act as a way to soft code this almost finished application to create, you guessed it a finished application. 

I would say that what I have in mind here would constitute something that could be called a framework, however it might also loosely fit the definition of a module actually as it is also a single stand alone file ready to be used by itself. However that would only be true assuming that threejs is always there to work with as that is the only dependency with this framework starting point. So all ready it is something that requires a few files in order to produce something that starts to look like a finished product. If I where to counting working on this to make something far more advanced I might end up having a whole bunch of modules all working together to create this single stand alone framework that I can work within.

### The source code examples in this post are up on github

The source code examples in this post can be [found on Guthub in my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-basic-framework). This is also where I have the [source code for my many other blog posts on threejs](/categories/three-js/) beyond just that of this example.

### Version Numbers matter with three.js

When I first wrote this post and the source code of the framework I as using threejs revision 127, and the last time I came around to do some editing I was using r146.

## 1 - The first revision of the basic framework example \( r1 \), start method, user data object

For the first revision of this basic threejs framework I added a few features, but I also removed some as well. The thing about this project is that I think that I am very much going to want this thing to remain a basic framework. There are a whole lot of ideas that come to mind when it comes to additional features, however I am thinking that many of these ideas should be other optional projects that I may use with this, or some whole other project outside of this one.

The features that where removed where the add cube method when it comes to public methods, and the materials property when it comes to the main API of this thing. The process of creating a mesh object and also the materials use with such mesh objects should be the responsibility of something outside of this framework. If I want to keep things like that as part of the framework then that can be a matter for some kind of not so basic, basic framework. For this project I think that the main focus should just be the core set of objects, and creating and starting a main update loop.

Features that where added, include a main start and stop method when it comes to the public methods, as well as a user data object for the main API object as well as some additional properties and other various changes. I can still have the project start up without having to call the start method by setting the active Boolean of the API to true. The loop and lt values are now also part of the pubic API, and I can also pass custom objects for the scene, camera, and renderer if needed by way of create method options as well. There are a number of other little changes as well such as having additional arguments when the update and init methods are called.

```js
// threeframe.js - r1 - from threejs-examples-basic-framework
(function (threeFrame) {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // no operation
    const NOOP = function(){};
    // create a main app loop function, for the given api object
    const createLoopFunction = function (tf) {
        tf.lt = new Date();
        tf.loop = function () {
            const now = new Date(),
            secs = (now - tf.lt) / 1000;
            if(tf.active){
                requestAnimationFrame(tf.loop);
                if (secs >= 1 / tf.fps_target) {
                    tf.update(tf, secs, tf.userData, tf.scene, tf.camera, tf.renderer); ;
                    tf.renderer.render(tf.scene, tf.camera);
                    tf.lt = now;
                }
            }
        };
    };
    // create a basic scene
    const createAPIObject = function (opt) {
        // SCENE
        const scene = opt.scene || new THREE.Scene();
        // CAMERA
        const camera = opt.camera || new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
        // RENDERER
        const renderer = opt.renderer || new THREE.WebGL1Renderer();
        ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
        renderer.render(scene, camera);
        // return an object with refs to scene and other items of interest
        const tf = {
            userData: opt.userData || {},
            scene: scene,
            camera: camera,
            renderer: renderer,
            canvas: renderer.domElement,
            fps_target: opt.fps_target === undefined ? 24 : opt.fps_target,
            active: opt.active === undefined ? false : opt.active,
            lt:null,        // lt and null set up by create loop function helper
            loop: null,
            init: opt.init || NOOP,
            update: opt.update || NOOP
        };
        createLoopFunction(tf);
        if(tf.active){
            threeFrame.start(tf);
        }
        return tf;
    };
    //-------- ----------
    // PUBLIC METHODS
    //-------- ----------
    // create a main project object
    threeFrame.create = function (opt) {
        opt = opt || {};
        // create mainb tf api object
        const tf = createAPIObject(opt);
        // call init method
        tf.init(tf, tf.userData, tf.scene, tf.camera, tf.renderer);
        // return the tf object
        return tf;
    };
    // start the loop
    threeFrame.start = (tf) => {
        tf.active = true;
        tf.lt = new Date();
        tf.loop();
    };
    // start the loop
    threeFrame.stop = (tf) => {
        tf.active = false;
        tf.lt = new Date();
    };
}(typeof threeFrame === 'undefined' ? this['threeFrame'] = {} : threeFrame));
```

### 1.1 - Basic rotating cube demo

Once again I am going to want to start out with a basic getting started type example of this framework. However this time I will be doing so in a way that will showcase the new features and changes compared to the older R0 version of the basic framework. When calling the create method I can set the active Boolean to true to make it so that I do not have to call the start method once after calling the create method. I am still making use of my new start and stop methods in this demo, I am just doing so by adding and event listener to the main canvas of the renderer so that when the canvas is clicked the loop will stop if active, and start again of not.

Another needed change for this framework was to allow for a way to pass custom objects in place of the new ones made in the create method. There are things that will happen now and then where I will want to pass a custom renderer object or camera to use. In some cases I might also all ready have a scene object ready to go actually so it would be nice to just pass that scene object as an option for the create method. This might not be the best demo of why this is needed, but I am testing it out here never the less.

Another needed feature is the user data object of the framework. This is an object where I will want to park any and all user data that I would like to attach to the main API object that has to do with the project that I am building on top of this, rather than something that has to do with the basic framework internals. It is a good idea to have some kind of standard object like this in a framework,  threejs has such as object in the Object3d class speaking of this. For this demo I am using it to store the current state of a radian value that I am using to set the current rotation of a mesh object. Spekaing of that mesh object I am also setting that very mesh object as a property of this user data object as well.

```js
// basic rotating cube
const tf = threeFrame.create({
    // setting active to true will start the loop also
    active: true,
    fps_target: 12,
    // can pass custom objects for camera, renderer, and scene
    camera: new THREE.PerspectiveCamera(70, 32 / 24, 0.1, 1000),
    renderer: new THREE.WebGL1Renderer({alpha: true}),
    scene: (function(){
         const scene = new THREE.Scene();
         scene.add( new THREE.GridHelper(10, 10) );
         return scene;
    }()),
    // user data object
    userData: {
        radian: 0,
        mesh: new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial()
        )
    },
    // called just once and only once
    init: function (api, ud, scene, camera, renderer) {
        // set size of renderer
        renderer.setSize(640, 480, false);
        // add mesh to scene
        scene.add(ud.mesh);
    },
    // update
    update: function (api, secs, ud, scene, camera, renderer) {
        ud.radian += Math.PI / 180 * 45 * secs;
        ud.radian %= Math.PI * 2;
        ud.mesh.rotation.y = ud.radian;
        camera.position.set( 1.25, 1.25, 1.25 );
        camera.lookAt( 0, 0, 0);
    }
});
// start and stop by clicking canvas
tf.canvas.addEventListener('click', ()=>{
   if(tf.active){
      threeFrame.stop(tf);
   }else{
      threeFrame.start(tf);
   }
});
```

## 2 - The source code of the first version of the basic framework \( r0 \)

For this frame work I am packing everything into a [single IIFE](/2020/02/04/js-iife/) and attaching all the public methods to a single global object property called threeFrame. When it comes to public methods of this framework, so far I just have two, one to create an instance of this main frame work API, and another that will just create a simple cube mesh. I then have a number of private helper functions thus far, one to create the main API for this project, and the other to create the main app loop for it as well.

The main API contains the typical objects for any threejs project which are the scene object, the camera object, and the renderer object. I then also have an init and update methods for this main api object that will be called to set things up, and to also update things over time.

```js
// threeframe.js - r0 - from threejs-examples-basic-framework
(function (threeFrame) {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create a basic scene
    var createAPIObject = function (opt) {
        // scene
        var scene = new THREE.Scene();
        // camera
        var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
        camera.position.set(2.5, 2.5, 2.5);
        camera.lookAt(0, 0, 0);
        // RENDERER
        var renderer = new THREE.WebGL1Renderer();
        ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
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
    //-------- ----------
    // PUBLIC METHODS
    //-------- ----------
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

## 2.1 - Now just a single use case example of the framework

Now that I have my basic framework together it is time to create a simple demo of this to make sure that it is working out okay thus far. To start out with this I do not need to do anything fancy, just a simple rotating cube like demo will work just fine for now. So to do that I just need to call the create method and then pass an options object that will be the addition code that I use to soft code the framework. The two options of interest that I want to have here are the init options that will be used to set up my objects for the demo, and then the update method that will be used to change the state of the project over time.

```js
// basic rotating cube
threeFrame.create({
    materials: [new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        }),
        new THREE.MeshNormalMaterial({})],
    init: function (api) {
        api.renderer.setSize(640, 480, false);
        api.cube1 = threeFrame.addCube(api, api.scene, 0, 0, 0, 1, 1);
        api.cube2 = threeFrame.addCube(api, api.scene, -2.5, 1, 0, 1, 0);
        api.rotation = 0;
    },
    update: function (api, secs) {
        api.rotation += 1 * secs;
        api.rotation %= Math.PI * 2;
        api.cube1.rotation.set(0, api.rotation, 0);
        api.cube2.rotation.set(0, api.rotation, api.rotation);
        api.camera.lookAt(api.cube1.position);
    }
});
```

So when this is all up and running it would seem that things are working out as expected. I have two cubes in the scene, and they are both rotating, nothing to much to write home about, but I did just want a basic starting point up and running for now and with that said it looks like I have something that is working okay so far.

There is all ready a great deal that I might want to change and add, but for now I think I just want to be happy with this as a basic starting point. When it comes to adding more on top of this that might change a great deal depending on what I want to do with threejs, making some kind of game is not the same thing as making some kind of looping animation that I might want to export to a stand alone video file contain of some kind.

## Conclusion

Well I was able to slap this basic framework example together in a flash today, but it is still very mush just that a basic framework. Still something like this might still prove to work okay when it comes to making very simple examples that just involve some kind of looping animation type effect. I am sure that I might make at least a few more examples such as this where I might add at least a few more additional features here and there as needed.

One feature that might be nice is to have a single overlay canvas element that I layer on top of the canvas element that draws the 3d scene using threejs. This overlay canvas can be used as a way to attach some event handers when it comes to working with user input, but it can also be used to draw on top of the scene using just the plain 2d drawing context. That however is one idea that I might reserve for a future post, maybe I will even get to that in the next few days.