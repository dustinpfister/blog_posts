---
title: User Data for a Mesh or anything based on Object3d in three.js
date: 2021-02-16 16:20:00
tags: [three.js]
layout: post
categories: three.js
id: 804
updated: 2022-04-07 08:21:03
version: 1.37
---

In [threejs](https://threejs.org/) there is a standard way of adding custom user data for a [mesh object](/2018/05/04/threejs-mesh/), and any other object based off of the [object3d class](/2018/04/23/threejs-object3d/), which is the [user data object](https://threejs.org/docs/#api/en/core/Object3D.userData). This is just an empty object that is not used by any internal logic of threejs itself, thus it is safe to park custom, user defined key value pairs in this object.

It is a good idea to place any data that has to do with an application itself in this user data object as that will help to make sure that it is done in a safe way that will not conflict with anything internal with three.js. Many other libraries and frameworks have some kind of data object that is part of an instance of some kind of class as a way to park data that I want to have assigned to a given object. Just adding custom stuff to the object itself can cause problems in the event that there is a conflict, also making use of the user object helps to make things more clear as to what has to do with the logic of the application and what is part of threejs.

So in this post I will be going over a few simple examples of the user data property of the object3d class. Nothing major for starers, but I think I would like to get into some more advanced examples if I can get to it in order to really help showcase what this object is for when it comes to being creative and having a little fun with three.js.

<!-- more -->

## Objected user data and what to know first

This is a post on some examples that make use of the object3d user data object as a way to park some properties that have to do with and over all application, or module that runs on top of three.js in a client side javaScript environment. So then this is not really a [post for people that are new to three.js](/2018/04/04/threejs-getting-started/), as I think that you should have at least some background with the library and [javaScript in general](/2018/11/27/js-getting-started/) before getting into these kinds of examples. There might still be at least a few things that I should cover before getting into the user data examples, so in this section I will be getting those things out of the way.

### Version numbers matter with three.js

I get emails and comments that tell me that this is something that I just need to mention in every post on three.js. When I write this post I was using r125 of three.js when I first started writing it. The last time I came around to do a little editing I was using r127 of three.js. Code breaking changes are made to three.js often, so it is always a good idea to look into how old a post might be, or how long it has been sense the last time someone came around to edit the post.

## 1 - Basic User Data Object3d Example with rotating cubes

This will be a basic getting started example of the user data object of the object3d class. In this example I have a create cube helper that will create and return a mesh that uses the [Box geometry](/2021/04/26/threejs-box-geometry/), and the [normal material](/2021/06/23/threejs-normal-material/). In this create cube function I am using the userData object as a way to set some rotation rates for each angle in an instance of THREE.Euler in radians per second. There rotation rates as well as the starting position of the cube can be set by way of the create cube helper functions arguments.

I then also have a function that will update a given cube by these rates in the user data object by way of a given time delta value. This function will then need to be called in the body of some kind of main animation loop function that uses [request animation frame](/2018/03/13/js-request-animation-frame/) that I have at the bottom of the source code example.

```js
(function () {
 
    var createCube = function (rotationRates, position) {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        var ud = cube.userData;
        ud.rotationRates = rotationRates || [0, 3.14, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };
 
    var clampRadian = function (radian) {
        return radian %= Math.PI * 2;
    };
 
    var updateCube = function (cube, secs) {
        var ud = cube.userData,
        rr = ud.rotationRates;
        cube.rotation.x += rr[0] * secs;
        cube.rotation.y += rr[1] * secs;
        cube.rotation.z += rr[2] * secs;
        cube.rotation.x = clampRadian(cube.rotation.x);
        cube.rotation.y = clampRadian(cube.rotation.y);
        cube.rotation.z = clampRadian(cube.rotation.z);
    };
 
    // Scene
    var scene = new THREE.Scene();
 
    // add some cubes
    var cubes = new THREE.Group();
    cubes.add(createCube([1.57, 0.00, 0.00], new THREE.Vector3(3, 0, 0)));
    cubes.add(createCube([3.14, 1.57, 0.25], new THREE.Vector3(0, 0, 0)));
    cubes.add(createCube([0.00, 0.00, 6.28], new THREE.Vector3(-3, 0, 0)));
    scene.add(cubes);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
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
            cubes.children.forEach(function (cube) {
                updateCube(cube, secs);
            });
            renderer.render(scene, camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());
```

So after I create the main scene object for the example I then create an instance of THREE.Group, and then create and add a bunch of these cube objects that use the user data object with my create cube helper. In the body of my animation loop I then call the update cube method by looping over all the children of this group, and calling the update cube function for each of them. The end result is then having each of these cubes rotate in different ways and rates, because of there unique values in the userData object.

## 2 - The userData object can also be used in groups because that is also based on object3d

So now that I have the basic idea out of the way it is time to get into having some fun with the user data object. In this section I will be writing about a module that I made where I am using the user data object as a way to set values for an instance of [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/), and then I also have user data objects for each mesh in the group. Just like that of Mesh objects the THREE.Group class is also based off the Object3d Class so there is also a user Data object for an instance of a Group. So when it comes to creating a group that is a collection of Mesh objects, or any number of additional objects I can use the user data object of a group to park any values that will apply to the group as a whole.

### 2.1 - A Cube Groups module

For this example I made a cube groups module that has a main create method that will create and return an Instance of THREE.Group. Inside the body of this create method I am assigning all kinds of values for the group as a whole by way of the user data object of the group. With that said I can set values like the total number of frames for the group animation, as well as the frame rate at which that animation will update. I can also pass options that will set user data objects for each mesh also though, for example I can set the number of rotations for each axis for each cube, and each instance of this cube groups is a collection of eight cubes.

Another major public method of this module is the update method where the first argument is a cube group that I have created with this modules create method, and the second argument is a time delta in seconds. Inside this update method I am updating the position and rotation of each cube in the group based on values set to the user data object of the group, as well as each cube.

```js

(function (api) {
 
    var ANGLES_A = [225, 315, 135, 45];
 
    var toRadians = function (array) {
        return array.map(function(deg){
            return Math.PI / 180 * deg;
        });
    };
 
    // create a single cube mesh
    var createCube = function (rotationCounts, position) {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
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
        gud.secs = 0;
        var i = 0;
        while(i < 8){
            var cubeRotations = opt.cubeRotations[i] || [0.00, 0.00, 0.00];
            var cube = createCube(
                cubeRotations, 
                new THREE.Vector3(0, 0, 0));
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };
 
    var setCubesRotation = function(cubes, per){
        var x = Math.PI * 0 * per,
        y = Math.PI * 0 * per,
        z = Math.PI * 0 * per;
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
        setCubesRotation(cubes, per);
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

### 2.2 - Using the Cube Groups module

Now that I have this cube groups module worked out it is time to test things out with the usual three.js setup. In this main javaScript file where I create my three.js scene as well as the camera, renderer and so forth I decided to create a few instances of this cube group created with this cube group module of mine. For tow instances of the cube group I decided to leave things more or less to the hard coded defaults aside from the frame counts and frame speeds. I also made one additional cube group instance where I really started playing around with all of the various values for one of these cube  groups.

```js
(function () {
 
    var scene = new THREE.Scene();
 
    var gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
 
    var cubes1 = CubeGroupMod.create({maxFrame: 50, fps: 30});
    cubes1.position.set(4,0,4);
    scene.add(cubes1);
 
    var cubes2 = CubeGroupMod.create({maxFrame: 50, fps: 1});
    cubes2.position.set(-4,0,4);
    scene.add(cubes2);
 
    var cubes3 = CubeGroupMod.create({
       anglesA:[180, 270, 90, 0],
       yDelta: 1.25,
       xzDelta: 0.75,
       maxFrame: 60,
       fps: 30,
       cubeRotations: [
          [0, 0, 1],
          [0, 1, 0],
          [0, 1, 1],
          [1, 0, 0],
          [1, 0, 1],
          [1, 1, 0],
          [1, 1, 1],
          [0, 0, 1]
       ]
    });
    scene.add(cubes3);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
   
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            CubeGroupMod.update(cubes1, secs);
            CubeGroupMod.update(cubes2, secs);
            CubeGroupMod.update(cubes3, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());
```

So then this example has turned into a somewhat interesting example of using the user data object of the object3d class with both mesh objects as well as groups. However there are a lot of other kinds of objects based in three.js such as cameras and even the whole scene object that contains just about everything of interest when rendering a three.js project. The user data object can be used with one or more mesh objects as well as groups, I can also nest groups, and also part data for other objects such as cameras and helpers. So maybe I should get into at least a few more examples of this user data object as a way to really start to exercise what user data is all about when it comes to making my own projects and examples with three.js

## 3 - Another example of Spheres changing position and setting back when the go out of range.

This example will not be anything to involved so it will be just a single file that contains all the threejs code as well as my own user data code. 

I have helpers here that are used to create and update a group of mesh objects. If you are still fairly new to three.js a group is a good way to go about having a collection of mesh objects. The group object itself is also a kind of object in threejs that inherits from object3d, so it to actually has a user data object also.

In the create sphere group helper I am just appending some values to each mesh object as I created them and add them to a group that the helper will return. I set a property for user data that will be used to set or update the material in the array of materials, and then a bunch of values that have to do with direction and speed.

In the update sphere group method I am using the distance to method of the [Vector3 Class](/2018/04/15/threejs-vector3/) instance of the current mesh position object relative to another Vector3 instance of the origin. This distance is then used as a way to know if I should reset the position of the mesh or not.

```js
(function () {
 
    var GROUPSIZE = 9,
    MAXDIST = 5,
    PPS_MIN = 1,
    PPS_MAX = 7;
 
    // materials
    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            wireframe: true
        })
    ];
    // random angles helper
    var randomAngles = function (mesh) {
        mesh.userData.pitch = Math.PI * 2 * Math.random();
        mesh.userData.heading = Math.PI * 2 * Math.random();
    };
    // random speed value
    var randomSpeed = function (mesh) {
        mesh.userData.pitchPPS = PPS_MIN + (PPS_MAX - PPS_MIN) * Math.random();
        mesh.userData.headingPPS = PPS_MIN + (PPS_MAX - PPS_MIN) * Math.random();
    };
    // create a sphere group
    var createSphereGroup = function () {
        var group = new THREE.Group();
        var i = 0;
        while (i < GROUPSIZE) {
            var mesh = new THREE.Mesh(
                    new THREE.SphereGeometry(1, 20),
                    materials[0]);
            // SETTING VALUES IN USER DATA OBJECT
            mesh.userData.materalIndex = i % materials.length;
            randomSpeed(mesh);
            randomAngles(mesh);
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update a sphere group
    var updateSphereGroup = function (group, secs) {
        group.children.forEach(function (mesh) {
            // USING VALUES IN USER DATA OBJECT
            var ud = mesh.userData;
            mesh.material = materials[ud.materalIndex];
            mesh.position.x += Math.cos(ud.pitch) * ud.pitchPPS * secs;
            mesh.position.y += Math.sin(ud.pitch) * ud.pitchPPS * secs;
            mesh.position.z += Math.cos(ud.heading) * ud.headingPPS * secs;
            var d = mesh.position.distanceTo(new THREE.Vector3(0, 0, 0));
            if (d >= MAXDIST) {
                mesh.position.set(0, 0, 0);
                randomAngles(mesh);
                randomSpeed(mesh);
            }
        });
    };
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
 
    // create and add sphere group
    var group = createSphereGroup();
    updateSphereGroup(group, 0);
    scene.add(group);
 
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
            updateSphereGroup(group, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());
```

So once I have my helpers that create and return a group of mesh objects I just need to call that and then add the group that it returns to a scene. I then just need to set up a camera, renderer, and update loop just like any other threejs example I would make.

The result of this then is a bunch of spheres start out positioned at the center origin point and then move out from there in random directions and speeds. When the distance of a mesh goes out of the rang that I set with the MAX DIST value then the user data values get set to new values, and the position of the mesh goes back to the origin.

## 4 - Conclusion

So the user data object is one way to go about having some custom data set to a given mesh object, or any object in threejs that inherits from object 3d such as a camera object. There might be other ways of going about doing this sort of thing though such as having two sets of objects, one would be a collection of mesh objects in threejs, and another would be an independent array of user data objects. However it is good to know that there is an official object in every object based on the Object3d class that can be used as a way to go about packing application and module specific data. This allows me to create three.js modules that returned mesh objects, or groups, rather than my own weired object standards where there is a property that is a group or mesh. Which is a habit that I am not going to start to break because that sounds like a good idea to me.

There are a ton or more ideas that I have just for examples to write about for this post, so I am sure that there will be more to come next time I come around to editing this post. One of my three.js example posts is a continuation of one of the examples that I worked out for this post called just simply [nested groups example](/2021/05/10/threejs-examples-nested-groups/). The example is just an exercise of nesting groups, and using the user data object as a way to store data that has to do with certain objects, groups, and the whole main group object that is returned by a create method of the main module that is used in the example.


