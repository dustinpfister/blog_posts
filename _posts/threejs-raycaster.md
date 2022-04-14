---
title: Clicking a mesh in three.js with the Raycaster class
date: 2021-05-18 09:46:00
tags: [three.js]
layout: post
categories: three.js
id: 869
updated: 2022-04-14 11:22:43
version: 1.16
---

When making a [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) project there might be situations in which it would be nice to have a way to click on a [mesh object](/2018/05/04/threejs-mesh/) in a [scene object](/2018/05/03/threejs-scene/). When dong so this will result in some kind of action being preformed that is event driven by way of user input rather than some kind of script. To do this I need a way to cast a ray from the camera outward based on a 2d location of the canvas, and then get a collection of mesh objects that intersect with this ray that is going from the camera outward. Luckily this kind of functionality is built into three.js itself and it is called the [THREE.RayCaster Class](https://threejs.org/docs/#api/en/core/Raycaster).

There is just getting started with the very basics when it comes to ray casting in three.js, and of course I will be starting out with that in this post. However there might be a whole bunch more advanced topics that will also come up when it comes to this sort of thing. So I think that it might be called for to go over at least a few examples of the ray cater class in three.js.

<!-- more -->

## 1 - Clicking a Mesh in three.js and what to know before hand

This is a post on using the THREE.Raycaster class in three.js as a way to help with the process of clicking on a mesh object. This is then a post on a topic that might prove to be a little to advanced for some developers that are still a little to new with three.js and javaScript. In this section I will then be going over a few topics that are worth checking out for the first time, or refreshing on before continuing with the rest of the continent here.

### 1.1 - version Numbers matter with three.js

When I made these examples and wrote this post I was using r127 of three.js which was still a fairly later version of three.js as of this writing. Code breaking changes are always made with three.js as new revision s come out so if you run into problems with getting this to work on your end that might be the first thing you should check actually.

## 2 - A Basic Raycaster example

The main method of interest with the Raycaster class is the intersect objects method, but in order to set the state of the Raycaster instance first I will want to use the set from camera method. In order to use the set from camera method of course I am going to need an instance of a camera, but I am also going to need a Vector2 instance that is the mouse position in the canvas.

```js
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(1, 1);
 
var onMouseMove = function( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    var canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    // set mouse Vector2 values
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
    //console.log(mouse.x.toFixed(2), mouse.y.toFixed(2));
};
 
var update = function(group){
    // default scale
    group.children.forEach(function(obj){
        obj.scale.set(1, 1, 1);
    });
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(group.children, true );
    if(intersects.length > 0){
        var mesh = intersects[0].object;
        mesh.scale.set(2, 2, 2);
    }
};
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// Attach mouse event
renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
 
var boxGroup = new THREE.Group();
scene.add(boxGroup);
 
// box 1
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, 0);
boxGroup.add(box);
// box 2
box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(3, 0, 0);
boxGroup.add(box);
// box 3
box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(-3, 0, 0);
boxGroup.add(box);
 
// orbit controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
// loop
var lt = new Date(),
fps = 30;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // update
        update(boxGroup);
        // render
        renderer.render(scene, camera);
        lt = now;
    }
}
loop();
```

## 3 - Cube Group Raycaster class example

For this example of the Raycaster class I decided to make use of a module that I made for my [post on nested groups in three.js](/2021/05/10/threejs-examples-nested-groups/) that is a kind of cube group model. This module is just a way to create a group of eight mesh objects where each mesh object has an instance of the built in box geometry of three.js as its geometry. These eight mesh objects are positioned in such a way so that they from a larger cube of cubes sort of speak. I can then use an update method of the cube group module to update the state of ones of these cube groups so that the cubes expand outward from the center of the group, and back again.

### 3.1 - Cube Group module

Here I have the state of the cube group module as I have used it for this example. I did not change much with this from what I have worked out in the for the other three.js example post. Still I often do make a few minor changes here and there with these when I use them in other projects, so I just got into the habit of always posing what it is that I am using here.

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
        gud.maxFrame = opt.maxFrame || 60;
        gud.fps = opt.fps || 30;
        gud.anglesA = toRadians(opt.anglesA || ANGLES_A);
        gud.yDelta = opt.yDelta === undefined ? 2 : opt.yDelta;
        gud.xzDelta = opt.xzDelta === undefined ? 2 : opt.xzDelta;
        gud.rotations = opt.rotations || [0, 0, 0];
        gud.secs = 0;
        gud.type = 'cubegroup';
        gud.active = false;
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
 
    var updateCubes = function(cubes, per, bias){
        var gud = cubes.userData;
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
    };
 
    // update the group
    api.update = function(cubes, secs) {
        // GROUP USER DATA OBJECT
        var gud = cubes.userData;
        var per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
 
        if(gud.active){
            updateCubes(cubes, per, bias);
            // whole group rotation
            setCubesRotation(cubes, bias);
            // step frame
            gud.secs += secs;
            if(gud.secs >= 1 / gud.fps){
                gud.frame += 1; // gud.fps * secs;
                gud.frame %= gud.maxFrame;
                gud.secs %= 1 / gud.fps;
                if(gud.frame === 0){
                    gud.active = false;
                }
            }
        }
    };
 
}
    (this['CubeGroupMod'] = {}));
```

### 3.2 - the main javaScript file

Now for a main javaScript file in which I am using the Raycaster class to run an animation for any and all cube groups that intersect when using a Raycater. When it comes to working with an instance of this cube group of mine it is a little different from working with a collection of mesh objects, as what I am dealing with here is a collection of groups of mesh objects. However the situation is not all that more involved as I just need to loop over the collection of cube groups, and pass the children of each group to the intersects objects method. I can then just the the first mesh object if any and just use the parent property of that mesh to get a reference to the group of cube mesh objects. I can then set the active flag of the cube group to true.

```js
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(1, 1);
 
// on mouse move
var onMouseMove = function( event ) {
    var canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
 
// update the picking ray with the camera and mouse position
var update = function(cubeGroups, secs){
    raycaster.setFromCamera( mouse, camera );
    cubeGroups.children.forEach(function(cubeGroup){
        var intersects = raycaster.intersectObjects( cubeGroup.children, true );
        if(intersects.length > 0){
            var mesh = intersects[0].object,
            group = mesh.parent;
            group.userData.active = true;
        }
        CubeGroupMod.update(cubeGroup, secs);
    });
};
 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
 
var cubeGroups = new THREE.Group();
scene.add(cubeGroups);
 
var cg = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg.position.x = 0;
cubeGroups.add(cg);
 
var cg = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg.position.x = 3;
cubeGroups.add(cg);
 
var cg = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg.position.x = -3;
cubeGroups.add(cg);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
 
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
// loop
var lt = new Date(),
frame = 0,
maxFrame = 300,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
 
        update(cubeGroups, secs);
 
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
```


So then the outcome of this is more or less what I had in mind when it comes to what I wanted to do. When I mouse over a cube group the cube group beginnings an animation loop, until the loop is over at which point the active false ends up getting set back to false. Maybe not the most interesting example, but I wanted to do something at least a little more advanced then just the usual basic copy and paste cook book style code examples.

## 4 - Conclusion

So then the raycaster class is a useful tool to go about clicking on mesh objects in three.js. However I am sure that there are many uses for the class that will come up when it comes to writing scripts that update some kind of simulation also when it comes to getting a collection of mesh objects from a given object outward or anything to that effect. I think that there might be a need for maybe a few more basic examples of this kind of class as I am sure that there are a number of issues that will come up here and there when using this class. Not just with the class itself, but also when it comes to three.js, and javaScript in general. For example many of the examples that I have worked out as of this writing will just work with a mouse, but I did not do anything when it comes to working with touch devices, and this day in age I have to take that into account when making any kind of production project.