---
title: Nested Groups threejs example
date: 2021-05-10 15:03:00
tags: [three.js]
layout: post
categories: three.js
id: 863
updated: 2023-09-12 08:58:30
version: 1.15
---

This will be a post on a nested groups [threejs example](/2021/02/19/threejs-examples/) that I made today that is a continuation of what I started with my post on use of the [user data object](/2021/02/16/threejs-userdata/) in the object3d class. The user data object of the Object3d class is a standard object for parking application specific data to help make sure that there are no conflicts with properties that are used with threejs internals. In other worlds if you find yourself that you want to park some of your own data that has to do with your own code on an object by object basis the user data object is the safe way to do just that. 

When making my own code for an over all threejs project I am going to end up with a lot of my own properties and javaScript code that updates those properties. I could do something where I keep all of my own code separate, and then apply that to mesh objects, groups, cameras and so forth. That is to have say to separate collections of state data, one of which I create and update with my own code, and then methods that I used to update the state of a scene objects and all children. However there should still be a standard way of appending some data to objects and the way to do so would be to make use of this user data object. So this threejs example project is just an exercise of doing just that.

<!-- more -->

## What to know first before reading more about this three.js example

This is one of my many three.js examples that makes use of the client side [javaScript library known as three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). This post is intended for javaScript developers that have learned a thing or two about the basics and are not looking into how to go about getting started when it comes to making some actual projects of some kind with three.js. So I assume that you have at least some background with the [basics of three.js](/2018/04/04/threejs-getting-started/), and know at least a thing or two about [javaScript in general](/2018/11/27/js-getting-started/). So I will not be touching base on the basics of three.js and javaScript here, but in this section I will be going over a few things that I think you should read up mre on before getting into this example.

<iframe class="youtube_video" src="https://www.youtube.com/embed/3hN1kC7mH6k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Source code is up on Github

The source code examples that I am wriirng about in this post can also be found in my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-nested-groups). This is also where I have the source code examples for my [many other posts on threejs](/categories/three-js/) as well.

### Version Numbers matter with threejs

When I first wrote this post I was using three.js revision r127. I do get around to editing my content on threejs, a post or two at a time, and the last time I came around to edit this I was using r146. At that time I updated the one demo that I made to my [r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md), but did not do so with the modules as this is not a project that I think I should invest much time into when it comes to addtional revisions. Speaking of which there may not be any future revisions for this project at this time. I have a lot of other examples that I think are a better fit for that sort of thing.

Again the examples here where working fine with the revision that I was using at the lat time I edited this post. However code breaking changes are made to threejs often so always me mindful of what revision number you are using.

### Read up more on the user data property of the Object3d class

This example is an advanced continuation of [one of the examples that I worked out for my post on the user data object](/2021/02/16/threejs-userdata/) of the object3d class. This object is the official object in a Mesh, Group, Camera, or anything the is based on the object3d class that can be used to park user defined data. This user defined data is just data that belongs to a given object of some kind of a three.js project that has to do with ones own code rather than three.js internal logic. Speaking of the [object3d class](/2018/04/23/threejs-object3d/) it might be a good idea to read up more on that class in general as it is a major part of three.js that I tend to use just about all the time.

## 1 - The nested groups and cube groups modules ( R0 )

For this this first section I am writing about R0 of the nested groups module as well as the cube groups module. Also at this time this is the only revision still, and I also do not have any plans of making a R1 any time soon or possibly ever. I do have some notes written down for what I would do for a R1 of this example as this is not how I would go about making this kind of thing these days.

### 1.a - The cube groups module

This is the cube group module that I started in my post that has to do with the user data object of the object3d class. I do not think that I did much to it when it comes to changes from what I wrote about in that post, but still I think I should write a thing or two about it here as I am using it in my main nested groups module that I will be getting to later in this post.

This cube groups module will return a group of mesh objects where each mesh object is a box geometry and a given material that is given when calling the main create method of this module. Tne idea here is to just have a collection of eight of these mesh objects, and then be able to tweak some options to change the way that these groups of objects move over time.

```js
// cube-groups.js - r0 - from threejs-examples-nested-groups
(function (api) {
    var ANGLES_A = [225, 315, 135, 45];
    var toRadians = function (array) {
        return array.map(function(deg){
            return Math.PI / 180 * deg;
        });
    };
    // create a single cube mesh
    var createCube = function (rotationCounts, position, materials) {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials || new THREE.MeshNormalMaterial());
        // USER DATA OBJECT FOR A SINGLE CUBE
        var ud = cube.userData;
        ud.rotationCounts = rotationCounts || [0, 0, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };
    // update a single cube
    var updateCube = function (cube, per) {
        var ud = cube.userData,
        rc = ud.rotationCounts,
        pi2 = Math.PI * 2;
        cube.rotation.x = pi2 * rc[0] * per;
        cube.rotation.y = pi2 * rc[1] * per;
        cube.rotation.z = pi2 * rc[2] * per;
    };
    // public method to create a cube group
    api.create = function(opt) {
        opt = opt || {};
        opt.cubeRotations = opt.cubeRotations || [];
        var cubes = new THREE.Group(),
        // USER DATA OBJECT FOR A GROUP OF CUBES
        gud = cubes.userData;
        gud.frame = 0;
        gud.maxFrame = opt.maxFrame || 180;
        gud.fps = opt.fps || 30;
        gud.anglesA = toRadians(opt.anglesA || ANGLES_A);
        gud.yDelta = opt.yDelta === undefined ? 2 : opt.yDelta;
        gud.xzDelta = opt.xzDelta === undefined ? 2 : opt.xzDelta;
        gud.rotations = opt.rotations || [0, 0, 0];
        gud.secs = 0;
        gud.type = 'cubegroup';
        var i = 0;
        while(i < 8){
            var cubeRotations = opt.cubeRotations[i] || [0.00, 0.00, 0.00];
            var cube = createCube(
                cubeRotations, 
                new THREE.Vector3(0, 0, 0),
                opt.materials);
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };
    var setCubesRotation = function(cubes, per){
        var gud = cubes.userData,
        r = gud.rotations,
        PI2 = Math.PI * 2;
        var x = PI2 * r[0] * per,
        y = PI2 * r[1] * per,
        z = PI2 * r[2] * per;
        cubes.rotation.set(x, y, z);
    };
    // update the group
    api.update = function(cubes, secs) {
        // GROUP USER DATA OBJECT
        var gud = cubes.userData;
        var per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        // update cubes
        cubes.children.forEach(function (cube, i) {
            // start values
            var sx = i % 2 - 0.5,
            sz = Math.floor(i / 2) - Math.floor(i / 4) * 2 - 0.5,
            sy = Math.floor(i / (2 * 2)) - 0.5;
            // adjusted
            var aIndex = i % 4,
            bIndex = Math.floor(i / 4),
            r1 = gud.anglesA[aIndex],
            x = sx + Math.cos(r1) * gud.xzDelta * bias,
            y = sy + gud.yDelta * bias * (bIndex === 0 ? -1 : 1),
            z = sz + Math.sin(r1) * gud.xzDelta * bias;
            // set position of cube
            cube.position.set(x, y, z);
            // call cube update method
            updateCube(cube, per);
        });
        // whole group rotation
        setCubesRotation(cubes, bias);
        // step frame
        gud.secs += secs;
        if(gud.secs >= 1 / gud.fps){
            gud.frame += 1; // gud.fps * secs;
            gud.frame %= gud.maxFrame;
            gud.secs %= 1 / gud.fps; 
        }
    };
}(this['CubeGroupMod'] = {}));
```

### 1.b - The nested groups module

Here I now I have my main nested groups module that will create an return a main group that I will be adding to the scene in my main javaScript file. The general idea I have here is to have a main module like this that will return a group object, and then everything else the composes the example that is attached to that group as a child. This group will contain additional groups, and thus be a situation in which I am dealing with nested groups, thus the name of this example.

At the top of the file I have a create point light, and create point light group helpers. The method that is used to create a point light group is one of several nested groups that I will be attaching to the main group that is returned by the create method of this module. This group of lights is a collection of three point lights one lime, one blue, and another that is read along with a white one that I have placed at the center. I can then rotate and position this group of lights relative to the main group.

I then have a create world group helper that will contain all the instances of my cube group module that I wen over in an above section in this post. I wanted to create at least a few instances of this kind of group and position them all over the place in the world group. At the time of this writing the only other object that I have in this word group is a grid helper that that I often like to add to many examples like this. Although I might not be doing much of anything with this group now, if I keep working on this I might want to do something that will effect all mesh objects in this group, but not any objects or groups outside of it, such as a screen shake type thing or something to that effect.

```js
// nested-groups.js - r0 - from threejs-examples-nested-groups
(function (api) {
    var MATERIALS_CUBE = new THREE.MeshStandardMaterial({color: 'white'});
    var createPointLight = function(color){
        color = color || new THREE.Color('white');
        var light = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 30, 30), 
            new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 1
            })
        );
        light.userData.pointLight = new THREE.PointLight(color, 0.25);
        light.add(light.userData.pointLight);
        return light;
    };
    var createPointLightGroup = function(){
        var lightGroup = new THREE.Group();
        // lights
        var light = createPointLight(new THREE.Color('lime'));
        light.position.set(0, 8, 0);
        lightGroup.add(light);
        var light = createPointLight(new THREE.Color('blue'));
        light.position.set(0, -8, 0);
        lightGroup.add(light);
        var light = createPointLight(new THREE.Color('red'));
        light.position.set(8, 0, 0);
        lightGroup.add(light);
        var light = createPointLight(new THREE.Color('white'));
        light.position.set(0, 0, 0);
        lightGroup.add(light);
        return lightGroup;
    };
    var createWorldObjects = function(nud, opt){
        var worldObjects = new THREE.Group();
        // grid helper
        var gridHelper = new THREE.GridHelper(10, 10);
        worldObjects.add(gridHelper);
        var data = opt.data || [ [[225, 315, 135, 45], [0, 0, 0], [0,0,0] ] ];
        // nested cube group one
        let i = 0;
        while(i < data.length){
            var cubes = nud['cubes' + i] = CubeGroupMod.create({
                materials: opt.MATERIALS_CUBE || MATERIALS_CUBE,
                anglesA: data[i][0],
                rotations: data[i][1]
            });
            cubes.position.fromArray( data[i][2] );
            worldObjects.add(cubes);
            i += 1;
        }
        return worldObjects;
    };
    // create nested groups
    api.create = function(opt = {} ) {
        var nested = new THREE.Group(),
        nud = nested.userData;
        nud.frame = 0;
        nud.maxFrame = opt.maxFrame === undefined ? 600: opt.maxFrame;
        // Camera
        var camera = nud.camera = new THREE.PerspectiveCamera(45, 4 / 3, 5, 60);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);
        nud.cameraRadian = 0;
        // add camera to nested
        nested.add(camera);
        // lights
        var lightGroup = nud.lightGroup = createPointLightGroup();
        nested.add(lightGroup);
        // world objects
        nud.worldObjects = createWorldObjects(nud, opt);
        nested.add(nud.worldObjects);
        return nested;
    };
    // update the nested groups
    api.update = function(nested, secs) {
       var nud = nested.userData,
       per = nud.frame / nud.maxFrame,
       bias = 1 - Math.abs(per - 0.5) / 0.5;
       // camera
       nud.cameraRadian = Math.PI * 2 * per;
       nud.camera.position.x = Math.cos(nud.cameraRadian) * 15;
       nud.camera.position.y = 15 * Math.sin(nud.cameraRadian);
       nud.camera.position.z = Math.sin(nud.cameraRadian) * 15;
       nud.camera.lookAt(0,0,0);
       // update cube group
       nud.worldObjects.children.forEach(function(obj){
           if(obj.userData.type){
               if(obj.userData.type === 'cubegroup'){
                   CubeGroupMod.update(obj, secs);
               }
           }
       });
       // lights
       nud.lightGroup.rotation.x = Math.PI * 8 * per;
       nud.lightGroup.children.forEach(function(light){
           var pointLight = light.userData.pointLight,
           intensity = 0.05 + 0.95 * bias;
           pointLight.intensity = intensity;
           light.material.opacity = intensity;
       });
       // step frame
       nud.frame += 30 * secs;
       nud.frame %= nud.maxFrame;
    };
}(this['NestedGroupsMod'] = {}));
```

### 1.1 - The main javaScript file

The main javaScript file of this example is then pretty thin as much of the logic is pulled away into the nested groups module. I do not even create a camera here in as I typically would in most other projects because this time I want the camera to be part of the nested groups module.

```js
//-------- ----------
// SCENE RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const nested = NestedGroupsMod.create();
scene.add(nested);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const fps = 24;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        NestedGroupsMod.update(nested, secs);
        renderer.render(scene, nested.userData.camera);
        lt = now;
    }
};
loop();
```

When I have this example up and running I end up with a pretty cool looking scene, but there is still more I think I would like to change around a little when it comes to making this a little more interesting maybe. I like how everything is pretty animated and that it is all combined together into this one main module. If I get more time to work on this example I might want to break things down more by having separates modules for the light objects, as well as maybe bring some additional modules that I have worked out in other examples into this scene.

### 1.2 - Many Nested groups demo

For this demo I am just making use of the data option that can be used to define what the values should be for each cube group.

```js
//-------- ----------
// SCENE RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const nested = NestedGroupsMod.create({
    data : [
        [ [225, 315, 135, 45], [0,0,0], [0,0,0] ],
        [ [180, 180, 90, 90],  [0,1,0], [5,0,5] ],
        [ [180, 0, 0, 0],      [2,0,1], [-5, 0,-5] ]
    ]
});
scene.add(nested);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const fps = 24;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        NestedGroupsMod.update(nested, secs);
        renderer.render(scene, nested.userData.camera);
        lt = now;
    }
};
loop();
```

## Conclusion

This turned out to just be a quick fun example just for the sake of having a little fun with three.js, after all this is a pretty cool library and I would like to just create weird stuff with it. However I did not just play around with threejs just for the sake of making another project example like this, I would like to get into the habit of making use of the user data object as a way to go about packing data that has to do with my own javaScript code when making one or more modules. Doing so will make it so that the create methods that I make for my modules will return an object that is based off of Object3d rather than having that kind of object be a property of some kind of weird custom object format.

