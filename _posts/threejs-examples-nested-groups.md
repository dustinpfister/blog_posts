---
title: Nested Groups threejs example
date: 2021-05-10 15:03:00
tags: [three.js]
layout: post
categories: three.js
id: 863
updated: 2021-05-10 15:51:27
version: 1.3
---

This will be a post on a nested groups [threejs example](/2021/02/19/threejs-examples/) that I made today that is a continuation of what I started with my post on use example of the user data object in the object3d class. The user data object of the Object3d class is a standard object for everything based on object3d for parking application or module specific data to help make sure that there are no conflicts with properties that are used with three.js. When making my own code for an over all three.js project I am going to end up with a log of my own properties and javaScript code that updates those properties. I could do something where I keep all of my own code separate, and then apply that to mesh objects, groups, cameras and so forth. However another way of attaching my own user data to anything in three.js that is based off of the object3d class would be to append it to this user data object.

<!-- more -->

## 2 - The cube groups module

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

## 5 - Conclusion

This turned out to just be a quick fun example just for the sake of having a little fun with three.js, after all this is a pretty cool library and I would like to just create weird stuff with it. However I did not just play around with threejs just for the sake of making another project example like this, I would like to get into the habit of making use of the user data object as a way to go about packing data that has to do with my own javaScript code when making one or more modules. Doing so will make it so that the create methods that I make for my modules will return an object that is based off of Object3d rather than having that kind of object be a property of some kind of weird custom object format.

