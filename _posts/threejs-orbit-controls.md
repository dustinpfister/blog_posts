---
title: Quick orbit controls for three.js
date: 2018-04-13 18:22:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 173
updated: 2018-04-14 09:41:12
version: 1.8
---

It would not be to hard to implement some camera controls for a [three.js](https://threejs.org/) project from scratch. It would involve some event handlers, and the use of a few [Object3D](https://threejs.org/docs/#api/core/Object3D) methods like lookAt, and position.set. However there is some additional resources in the three.js project repository itself that can be used to quickly set this up in a flash. In this post I will be covering how to quickly set up some orbit controls for the camera, so you do not have to keep changing hard coded values, or spend a great deal of time working on your own solution to just look around a scene.

The Orbit Controls solution that can be found in the three.js examples folder in the github repo of the project can be used to quickly set up a solution for panning, zooming, and changing the orientation of a camera with the mouse, keyboard, and touch events.

<!-- more -->

## What to know before hand

This is an advanced post on one of the many useful time saving features fount in the three.js examples folder in the [three.js github repository](https://github.com/mrdoob/three.js/tree/r91). If you are looking for my take on [getting started with three.js](/2018/04/04/threejs-getting-started/) type post I have written that before. In this post I assume you have a basic working knowledge of javaScript, and three.js and are wondering if there is some kind of official solution for quickly adding some orbit controls to a three.js project, in which case you are at the right place.

## Where to get the file for orbit controls

In order to quickly add Orbit controls you need to add a \*.js file that is in the three.js repository that can be found [here](https://github.com/mrdoob/three.js/blob/r91/examples/js/controls/OrbitControls.js). You will want to add this file to your project in a way so that it will append three.js, and add a constructor called [THREE.OrbitControls](https://threejs.org/docs/#examples/controls/OrbitControls).


## Using the OrbitControls constructor

Once you have the constructor you just need to call the constructor passing the instance of the camera you want to to control which will give you an instance of THREE.OrbitControls.

```js
// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(250, 200, 250);
camera.lookAt(0, 0, 0);
 
// add controls for the camera
var controls = new THREE.OrbitControls(camera);
```

Once you have an instance of the controls you just need to call the update method of the controls in a render or update loop.

```js
function animate() {
 
    requestAnimationFrame(animate);
    controls.update();
 
    renderer.render(scene, camera);
 
};
 
animate();
```

## Full working Example of three.js Orbit Controls

For a full working example of this I will of course want something to look at such as a cube, and of course I will want the usual scene, camera, and renderer. In my html not only will I want to load three.js like normal, I will want to see to it that the Orbit controls are added to three.js, as or r91 they are not part of three.js itself, so it must be added by some means.

### html
```html
<html>
    <head>
        <title>test_threejs demos</title>
    </head>
    <body>
        <div id="demo"></div>
 
        <!-- Three.js, and orbit controls -->
        <script src="/js/threejs/0.91.0/three.min.js" ></script>
        <script src="/js/threejs/0.91.0/controls/OrbitControls.js" ></script>
 
        <!-- My demo -->
        <script src="orbit-controls/js/main.js"></script>
 
    </body>
</html>
```

If all goes well I should now be able to use the OrbitControls constructor just like any other constructor in three.js.

### js
```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4/3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
 
    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // Something to look at
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1), 
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })));
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    function animate() {
 
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
 
    };
 
    animate();
 
}());
```

From here I have my basic example of how to go about using the orbit controls to quickly allow for the basic control of the camera that is typical of many games, and 3d modeling programs. From here it is just a question if you want to further tweak the behavior of the controls, there are plenty of additional properties to do that.

## AutoRotate

A common task with any three.js project is to have the camera rotate around a mesh or scene that you have made. With the orbit controls constructor there is an boolean that can be set true to start an automation rotation around a target position.

```js
var controls = new THREE.OrbitControls(camera);
 
// auto rotate
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.target = new THREE.Vector3(.5, .5, .5);
```

By default the target position is the origin, but you can use the vector3 to change it to another point. Speed can be set as well by giving a Number to the autoRotateSpeed property where 1 will mean it will take about a minute to make one rotation ad sixty frames per second.

## Min max values

There are a bunch of properties that can be used to set man and max values for the two angles of rotation [Azimuth](https://en.wikipedia.org/wiki/Azimuth), and Polar angle of the [Spherical coordinate system](https://en.wikipedia.org/wiki/Spherical_coordinate_system).

```js
//  horizontally angle control
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 4;
 
// vertical angle control
controls.minPolarAngle = -Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
```

There are also a bunch of other values that can be used to set limits on distance, and paining. The range of the values for the min, and max values for the angles range from -Math.PI to Math.PI

## Set the panning mode

There is an option to set the panning mode for panning. By default the orbit controls use Screen Space Panning, but it can be set to Horizontal Panning if desired.

```js
// HorizontalPanning ( 0 ScreenSpacePanning is the default)
controls.panningMode = 1;
```

## Enable Damping

There is the Enable Damping Boolean value that can be set true to give the controls some inertia. If you enable this you may also want to play around with the damping factor value as well.

```js
controls.enableDamping = true;
controls.dampingFactor = .2;
```

## Disables right clicking on the page

One thing about the Orbit Controls is that it ends up disabling right clicking on the page in which I am using it, in most cases this does not present a problem. If for some reason it does the reason why is because event.preventDefault() is used in an on context menu event handler in the Orbit Controls source file, disabling it would be as simple as just commenting it out or removing the code all together.

The code of interest looks like this
```js
function onContextMenu( event ) {
 
    if ( scope.enabled === false ) return;
 
    event.preventDefault();
 
}

scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );
```

## Other Controls of interest

If you take a look at the [other controls](https://github.com/mrdoob/three.js/tree/r91/examples/js/controls) in the three.js examples folder it looks like there are some additional options for quickly adding some typical controls to a three.js project, including fly controls. I have not check theme out yet, but I feel they might also come in handy at some point as well.

## Conclusion

I have not covered everything that the Orbit controls has to offer. It looks like it has some methods for saving and loading camera save states among other things but you get the idea. If you are thinking about taking the time to make your own controls for something like this think again, chances are it has been done before, and there is so shame of just taking advantage of these things like this to save time. The focus on any three.js project, or any project for that matter should be whatever it is that sets your project apart from all others. Chances are that is not going to be the orbit controls is it? I didn't think so, just use this stuff and move on.