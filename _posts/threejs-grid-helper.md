---
title: The Grid Helper in three.js
date: 2022-02-18 12:00:00
tags: [three.js]
layout: post
categories: three.js
id: 961
updated: 2022-05-11 06:45:41
version: 1.20
---

I have wrote a number of posts on the various helpers in three.js that can be used to get a better idea of what the visual state of things is with something in a three.js project such as with the arrow helper for example. However thus far I have not wrote one on the [gird helper](https://threejs.org/docs/#api/en/helpers/GridHelper), so todays post will be just a few examples of using this kind of helper in a threejs project.

There are a number of other things that can be done in place of using the grid helper, such as having one or more objects in the scene that can replace what the gird helper is used for, as well as be a part of the scene itself. One of the typical things to do with that would be to use the [plane geometry constructor](/2019/06/05/threejs-plane/) to create a crude yet effective kind of ground mesh. When it comes to that kind of geometry there are ways to have an array of materials, and then also work out some kind of pattern when it comes to using what material with what gird location. There is also just making a single texture for the surface of the plane geometry as well, using another option such as the box geometry, or going so far as making some kind of custom geometry.

However when it comes to just having a grid in the scene to just make sure that objects are where they should be, or to just get a sense of what is going on with things when it comes to working out some kind of animation, the gird helper is a nice quick way of having a grid to look at.

<!-- more -->

## The Grid helper in threejs and what to know first

This is then a post on the Grid helper one of many helper objects based on the [Object3d class](/2018/04/23/threejs-object3d/) in three.js that can be sued to display what the current states is of some kind of object such as a mesh or camera. The gird helper is typically added directly to a scene object as a way to just know what the current state of affairs are when it comes to the center location of the scene, and where certain objects are relative to each other.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-grid-helper) on Github.

### Version numbers matter

When I first wrote this post I was using [r135 of threejs](https://github.com/mrdoob/three.js/releases/tag/r135) with the code examples.

## 1 - A Basic grid helper example

To start out with this Grid helper there is just having a very simple scene that just has the gird helper and nothing else at all. So then for this basic getting started type example I first create a [scene object](/2018/05/03/threejs-scene/), and then I create the grid helper and add the gird helper to the scene object. When calling the THREE.GridHelper [constructor function](/2019/02/27/js-javascript-constructor/) there are at least two argument that i will want to pass. The first is the over all size of the grid in terms of a size that will be used for both the width and height of the gird. The second argument is the number of divisions to have in the gird. With that said if I want a grid that is 8 by 8 with 1 by 1 tiles for each grid location, then I will want to pass 8 as the size, and 8 for the number of divisions.

I will then want to create a camera such as an instance of the [perspective camera](/2018/04/07/threejs-camera-perspective/) and position the camera in a location to which I can get a good view of the helper. After moving the camera I will also want to set the orientation of the camera to make sure it is looking at the grid helper. One way to go about doing that would be to use the look at method to set a position that the camera should be looking at such as the 0,0,0 location.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
 
    // GRID HELPER
    var size = 8;
    var divisions = 8;
    scene.add(new THREE.GridHelper(size, divisions))
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.1, 100);
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 0, 0);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    renderer.render(scene, camera);
}
    ());
```

Now that I have a scene with the grid helper attached, and a camera that can be used to look at it, I now just need to [create a renderer](/2018/11/24/threejs-webglrenderer/). Once I have my renderer set up I can can the render method of the renderer and pass the scene and camera to render the scene from the perspective of the given camera.

## 2 - Line color

There are a few additional options for the THREE.GridHelper Constructor, both of which have to do with setting the colors of the grid lines. If I want to change the center lines, if there are any, that will be done with the third argument, while the fourth argument can be use to set the color from the rest of the lines. The values given for a color can be a hex number, or an instance of [THREE.Color](/2021/05/03/threejs-color/) that can be used to create a color by a wide range of ways including just plain old name strings such as lime.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
 
    // GRID HELPER
    var size = 8;
    var divisions = 8;
    var colorLinesCenter = 0xffffff;
    var colorLinesGrid = new THREE.Color('lime');
    var helper = new THREE.GridHelper(size, divisions, colorLinesCenter, colorLinesGrid);
    scene.add(helper)
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.1, 100);
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 0, 0);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    renderer.render(scene, camera);
}
    ());
```

## 3 - Moving a camera around a scene animation example

I am thinking that I might want to have at least one advanced example of this grid helper that has to do with a basic animation loop of some kind. WIth this example I just made a slight revision of an example that I made for [my post on camera movement](/2019/12/17/threejs-camera-move/) as a way to have this kind of example here.

This example once again has a scene, and a gird helper attached to the scene. On top of that though I also added a mesh object and a whole lot more logic that has to do with moving a camerae around in the scene.

```js
(function () {
 
    var getBias = function(per){
        return 1 - Math.abs(per - 0.5) / 0.5;
    };
 
    // create camera helper
    var createCamera = function(opt){
        opt = opt || {};
        var width = 640, height = 480,
        fieldOfView = 40, aspectRatio = width / height,
        near = 0.1, far = 1000,
        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
        camera.userData.subject = new THREE.Vector3();
        return camera;
    };
 
    var camMoveMethod = {};
 
    // follow subject1 method
    camMoveMethod.flyAround = function(camera, per){
        var bias = getBias(per),
        radian = Math.PI * 2 * per,
        x = Math.cos(radian) * 10,
        y = 10 - 5 * bias,
        z = Math.sin(radian) * 10;
        return {
            position: new THREE.Vector3(x, y, z), 
            lookAt: camera.userData.subject
        };
    };
 
    // move camera update helper
    var moveCamera = function (camera, per, moveFunc) {
        var camState = moveFunc(camera, per);
        // set the position and lookAt values with the
        // data in the returned camState object
        camera.position.copy(camState.position)
        camera.lookAt(camState.lookAt);
    };
 
    // CAMERA
    var camera = createCamera();
 
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8))
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    mesh.position.set(3, 0, 0);
    scene.add(mesh);
 
    camera.userData.subject = mesh.position;
 
    // APP LOOP
    var secs = 0,
    methodSecs = 0,
    methodIndex = 0,
    methodName = '',
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = Math.round(frame) / frameMax,
        bias = getBias(per);
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            methodSecs += secs;
            if(methodSecs >= 5){
                methodSecs = 0;
                methodIndex += 1;
                methodIndex %= Object.keys(camMoveMethod).length;
            }
            // calling camera update method
            methodName = Object.keys(camMoveMethod)[methodIndex];
            moveCamera(camera, per, camMoveMethod[methodName]);
            // moving mesh
            mesh.position.x = -4 + 8 * bias;
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());
```

## Conclusion

So the grid helper has become a kind of started thing to add to a scene when I am working out one or more simple demos of doing some kind of task in a basic threejs project of one kind or another. This is the main reason why I have wrote a post on this actually, so that I ca have a content piece to link to from a whole lot of [other posts on threejs that I have wrote over the years](/categories/three-js) that I edit now and then in which I am using the Grid Helper.

I guess that there is not much more to write about when it comes to the GridHelper alone, but maybe there is more to cover when it comes to other options for having something that will function as something that I often use the Grid helper for. The thing about it is that I often use the gird helper as a place holder for some other kind of object that should be a best or group actually that is a floor, or ground of some kind. I have mentioned the plane geometry, but I could also use a [Box geometry](/2021/04/26/threejs-box-geometry/), or a geometry that is loaded by way of an extremal file created in blender or something to that effect. Maybe the best way to go about loading an external file would be to look into the [dea file AKA Collada file standard](/2021/04/30/threejs-dae-collada-loader/). Yet another option would be to find a way to generate some terrain by directly working with the [buffer geometry constructor](/2021/04/22/threejs-buffer-geometry/).
