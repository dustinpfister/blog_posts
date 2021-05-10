---
title: Nested Groups threejs example
date: 2021-05-10 15:03:00
tags: [three.js]
layout: post
categories: three.js
id: 863
updated: 2021-05-10 16:28:25
version: 1.8
---

This will be a post on a nested groups [threejs example](/2021/02/19/threejs-examples/) that I made today that is a continuation of what I started with my post on use example of the user data object in the object3d class. The user data object of the Object3d class is a standard object for everything based on object3d for parking application or module specific data to help make sure that there are no conflicts with properties that are used with three.js. When making my own code for an over all three.js project I am going to end up with a log of my own properties and javaScript code that updates those properties. I could do something where I keep all of my own code separate, and then apply that to mesh objects, groups, cameras and so forth. However another way of attaching my own user data to anything in three.js that is based off of the object3d class would be to append it to this user data object.

<!-- more -->

## 1 - What to know first before reading more about this three.js example

This is one of my many three.js examples that makes use of the client side [javaScript library known as three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). This post is intended for javaScript developers that have learned a thing or two about the basics and are not looking into how to go about getting started when it comes to making some actual projects of some kind with three.js. So I assume that you have at least some background with the basics of three.js, and know at least a thing or two about javaScript in general. So I will not be touching base on the basics of three.js and javaScript here, but in this section I will be going over a few things that I think you should read up mre on before getting into this example.

### 1.1 - version Numbers matter with three.js

When I first wrote this post I was using three.js revision r127, as such the code here might break in future versions of three.js.

### 1.2 - Read up more on the user data property of the Object3d class

This example is an advanced continuation of [one of the examples that I worked out for my post on the user data object](/2021/02/16/threejs-userdata/) of the object3d class. This object is the official object in a Mesh, Group, Camera, or anything the is based on the object3d class that can be used to park user defined data. This user defined data is just data that belongs to a given object of some kind of a three.js project that has to do with ones own code rather than three.js internal logic. Speaking of the [object3d class](/2018/04/23/threejs-object3d/) it might be a good idea to read up more on that class in general as it is a major part of three.js that I tend to use just about all the time.

## 2 - The cube groups module

This is the cube group module that I started in my post that has to do with the user data object of the object3d class. I do not think that I did much to it when it comes to changes from what I wrote about in that post, but still I think I should write a thing or two about it here as I am using it in my main nested groups module that I will be getting to later in this post.

This cube groups module will return a group of mesh objects where each mesh object is a box geometry and a given material that is given when calling the main create method of this module. Tne idea here is to just have a collection of eight of these mesh objects, and then be able to tweak some options to change the way that these groups of objects move over time.

```js
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
 
}
    (this['CubeGroupMod'] = {}));
```

## 3 - The nested groups module

Here I now I have my main nested groups module that will create an return a main group that I will be adding to the scene in my main javaScript file. The general idea I have here is to have a main module like this that will return a group object, and then everything else the composes the example that is attached to that group as a child. This group will contain additional groups, and thus be a situation in which I am dealing with nested groups, thus the name of this example.

At the top of the file I have a create point light, and create point light group helpers. The method that is used to create a point light group is one of several nested groups that I will be attaching to the main group that is returned by the create method of this module. This group of lights is a collection of three point lights one lime, one blue, and another that is read along with a white one that I have placed at the center. I can then rotate and position this group of lights relative to the main group.

I then have a create world group helper that will contain all the instances of my cube group module that I wen over in an above section in this post. I wanted to create at least a few instances of this kind of group and position them all over the place in the world group. At the time of this writing the only other object that I have in this word group is a grid helper that that I often like to add to many examples like this. Although I might not be doing much of anything with this group now, if I keep working on this I might want to do something that will effect all mesh objects in this group, but not any objects or groups outside of it, such as a screen shake type thing or something to that effect.

```js
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
 
    var createWorldObjects = function(nud){
        var worldObjects = new THREE.Group();
        // grid helper
        var gridHelper = new THREE.GridHelper(10, 10);
        worldObjects.add(gridHelper);
        // nested cube group one
        var cubes1 = nud.cubes1 = CubeGroupMod.create({
            materials: MATERIALS_CUBE,
            rotations: [0, 0, 0]
        });
        worldObjects.add(cubes1);
        var cubes2 = nud.cubes2 = CubeGroupMod.create({
            materials: MATERIALS_CUBE,
            anglesA: [180, 180, 90, 90],
            rotations: [0, 1, 0]
        });
        cubes2.position.set(5, 0, 5);
        worldObjects.add(cubes2);
        var cubes3 = nud.cubes3 = CubeGroupMod.create({
            materials: MATERIALS_CUBE,
            anglesA: [180, 0, 0, 0],
            rotations: [2, 0, 1]
        });
        cubes3.position.set(-5, 0, -5);
        worldObjects.add(cubes3);
        return worldObjects;
    };
 
    // create nested groups
    api.create = function(opt) {
        var nested = new THREE.Group(),
        nud = nested.userData;
        nud.frame = 0;
        nud.maxFrame = 600;
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
        nud.worldObjects = createWorldObjects(nud);
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
 
}
    (this['NestedGroupsMod'] = {}));
```

## 4 - The main javaScript file

The main javaScript file of this example is then pretty thin as much of the logic is pulled away into the nested groups module. I do not even create a camera here in as I typically would in most other projects because this time I want the camera to be part of the nested groups module.

```js
(function () {
    var scene = new THREE.Scene();
    var nested = NestedGroupsMod.create();
    scene.add(nested);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            NestedGroupsMod.update(nested, secs);
            renderer.render(scene, nested.userData.camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());
```

When I have this example up and running I end up with a pretty cool looking scene, but there is still more I think I would like to change around a little when it comes to making this a little more interesting maybe. I like how everything is pretty animated and that it is all combined together into this one main module. If I get more time to work on this example I might want to break things down more by having separates modules for the light objects, as well as maybe bring some additional modules that I have worked out in other examples into this scene.

## 5 - Conclusion

This turned out to just be a quick fun example just for the sake of having a little fun with three.js, after all this is a pretty cool library and I would like to just create weird stuff with it. However I did not just play around with threejs just for the sake of making another project example like this, I would like to get into the habit of making use of the user data object as a way to go about packing data that has to do with my own javaScript code when making one or more modules. Doing so will make it so that the create methods that I make for my modules will return an object that is based off of Object3d rather than having that kind of object be a property of some kind of weird custom object format.

