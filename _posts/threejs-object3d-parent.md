---
title: Parent and child objects in threejs
date: 2021-06-02 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 880
updated: 2023-06-27 14:48:56
version: 1.33
---

I have been taking another look at everything there is to work with in the object3d class in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), and have found that I should write a lot more about this class. For example one such property of the object3d class is the [parent property of an object3d instance](https://threejs.org/docs/index.html#api/en/core/Object3D) which is something that can come in handy now and then just like that of the children property of an object. That is where the children property is a collection of other objects that are children of an object, the parent property is, well the parent of the current object of course if there is one.

Say I am looping over all the objects of a scene object using something like that of the [object3d transverse method](/2021/06/03/threejs-object3d-traverse/), and for each mesh object I want to take a look at what the parent object of the mesh object is. Say that in the scene there may be some mesh objects that are part of a group and the [user data object](/2021/02/16/threejs-userdata) of the group may have some data that I will want to use when applying some changes to the mesh object. In these kinds of situations I can use the parent property of the object3d class as a way to just simply check what the parent object of a current child object is to do this sort of thing.

However I can not say that I use the parent property that much, and maybe the reason why is because often there are other ways of having references to objects at the ready, such as having names for every object in the scene. So then in this post I will be going over a few examples that make use of the parent property of objects that are based on the object3d class. While I am at it I might also touch base on a wide range of other threejs related topics that might also be work checking into in detail, so lets get to it.

<!-- more -->

## The parent property of the Object3d class and what to know first.

This is a post on the parent property of the object3d class which is a major class in threejs as it is a base class of all kinds of other classes in the library such as [Mesh](/2018/05/04/threejs-mesh/), and [Camera](/2018/04/06/threejs-camera/) just to name a few. I will be keeping these examples fairly simple, however this is still not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/) in general. However in this section I will be quickly going over a few things that you might want to read up on more if you have not done so before hand at this time.

### Check out the Object3d class in general

The [obejct3d class is worth checking out in detail](/2018/04/23/threejs-object3d/), when doing so there is a whole lot of ground to cover even when it comes to just this one little class in threejs. That is what I started writing all these little posts, as I keep learning about something in the class that I should know about by now, so in order to remember that it is there to work with I wrote a post.

### Take a look at names as yet another way to get a reference to an object.

The parent property is one of many ways to go about getting a reference to an object that is based on object 3d from another objects that is based on object3d. The parent property is indeed useful for what it is intended for, however in a major project it might be a good idea to work out some kind of system when it comes to setting the [name values of objects](/2021/05/12/threejs-object3d-get-by-name/) and using the get by name method.

### Source code is up on Github

The source code examples in this post are also up on [Github in my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-parent). This is also where I place the source code examples for the many other [blog posts that I have wrote on threejs](/categories/three-js/) thus far as well

### version numbers matter

When I created these source code examples for the first time and wrote this post I was using threejs r127. This was a late version of threejs in the first half of 2021. However sense I first wrote this post I have came around to edit this post at least once, and the last time I did I was using [r146 of the library](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md).

## 1 - Basic object3d parent example

For a basic example of this parent property I thought I would start out with something that just involves getting a reference to the scene object by way of the parent property. So in other words this example is just a very basic hello world type threejs example where I am creating a scene object, adding and [positioning a mesh](/2022/04/04/threejs-object3d-position/) to the scene, and then setting up a camera and a renderer. I am then getting a reference to the scene object by way of the parent property of the mesh object as it was added to the scene object rather than a child of some other object.



```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(5, 5));
const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 10, 10),
        new THREE.MeshNormalMaterial());
mesh.position.set(0, 0.5, 0);
scene.add(mesh);
const mesh_parent = mesh.parent;
mesh_parent.rotation.x = Math.PI * 2 * Math.random();
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);```

This might not be the most compelling example of the Object3d.parent property as I could just use the scene variable to do the same thing. However never the less this is a basic example, and as such you should get the basic idea. As one might expect the Object3d.parent property is just a reference to the parent object of an object of there is one. So now that I have this out of the way I can get into some real use case examples of the parent property.

## 2 - The parent property, object3d.name, and Object3d.traverse

Now that I have got a basic example out of the way when it comes to the parent property of object3d it is now time to get into something that is just a little more advanced. In this example I have a method that will create and return not just a mesh object, but a group object that is a collection of two or more mesh objects. I then have another helper function that will process any given object that I pass to it by checking the value of the name property of the object. In the event that the first part of the name property starts with mesh it will get a reference to the parent object by way of you guessed it the Object3d.parent property.

In this example I am also attaching an event handler to the canvas element of the renderer and in the body of the callback for the event handler I am making use of another useful feature of the object3d class for getting references to objects which is the and Object3d.traverse method. When I call this traverse method off of the scene object I can use it to loop over all instances of object3d that are children of the scene object. I can then pass each of the objects that are attached to scene to this process object helper function of mine.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.name = 'scene_myworld';
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = function(gid){
    const group = new THREE.Group();
    group.name = 'group_' + gid;
    // adding a cone
    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 10, 10),
        new THREE.MeshNormalMaterial());
    cone.geometry.rotateX(Math.PI * 0.5);
    cone.position.set(0, 0, 2.0);
    cone.name = 'mesh_ ' + group.name + '_cone';
    group.add(cone);
    // adding a box
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 3),
        new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    box.name = 'mesh_ ' + group.name + '_cone';
    group.add(box);  
    return group;
};
const rndRad = function(){
    return Math.PI * 2 * Math.random();
};
const processObject = function(obj){
    const nameArray = obj.name.split('_');
    if(nameArray[0] === 'mesh'){
       // USING OBJECT3D parent prop to get Group
       const mesh = obj,
       group = mesh.parent;
       console.log(group.name);
       group.rotation.set(rndRad(), rndRad(), rndRad());
    }
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const grid = new THREE.GridHelper(9, 9);
grid.name = 'helper_grid_1';
scene.add(grid);
const group1 = createGroup('0');
scene.add(group1);
group1.lookAt(-10, 10, -10);
const group2 = createGroup('1');
group2.position.set(3, 1.5, 0);
group2.lookAt(3, 10, 0);
scene.add(group2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
renderer.domElement.addEventListener('click', function(){
    scene.traverse( function(obj){
        processObject(obj);
    });
    renderer.render(scene, camera);
});
```

## 3 - Groups of mesh objects and clicking groups of objects

Another note worthy use case example of the object3d parent property might have to do with clicking a group of mesh objects rather than just a single stand alone mesh object. When I say clicking I mean just that as in this section I will be going over an example that makes use of the raycaster class. As the name suggests  the raycaster class is a way to go about shooting a ray outward from a given point in space outward by a given direction. When doing so we can check if there are any objects that are along this ray. So for example I can use this raycaster to find if a mesh is along a ray from the current position of a camera, outward from the current facing direction of the camera.

### 3.1 - The main javaScript file

First off the main javaScript file of this example of the parent property where I am using the parent property in the update method that I worked out for this example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// RAYCASTER / HELPER FUNCTIONS
//-------- ----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);
const onMouseMove = function( event ) {
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
const update = function(cubeGroups, secs){
    raycaster.setFromCamera( mouse, camera );
    cubeGroups.children.forEach(function(cubeGroup){
        const intersects = raycaster.intersectObjects( cubeGroup.children, true );
        if(intersects.length > 0){
            const mesh = intersects[0].object,
            group = mesh.parent;
            group.userData.active = true;
        }
        CubeGroupMod.update(cubeGroup, secs);
    });
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(9, 9));
const cubeGroups = new THREE.Group();
scene.add(cubeGroups);
const cg1 = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg1.position.x = 0;
cubeGroups.add(cg1);
const cg2 = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg2.position.x = 3;
cubeGroups.add(cg2);
const cg3 = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg3.position.x = -3;
cubeGroups.add(cg3);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
let lt = new Date(),
frame = 0,
maxFrame = 300,
fps = 30;
const loop = function () {
    const now = new Date(),
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

### 3.2 - The cube group module

In this example I am also using one additional file that is just the module that I use to create and return one of these groups of mesh objects.

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

## Conclusion

The parent property of the object3d class is then yet another useful property that can be used as a way to gain a reference to another object based on object3d. This property is of course just one tool in the tool box when it comes to gaining a reference to any given object is a scene object. What is nice about the parent property is that it is a way to gain a reference that will always be the parent object of another if there is one. 

When it comes to related reading to this in major projects I also often work out some kind of system when it comes to setting name strings for all objects, as long as it follows some kind of system that system can also be used as a way to gain a reference to anything that I might want. This might prove to be the best way to always have a way to go about getting at a specific object in an over all scene, but still the parent object might prove to be another useful means for getting references to objects.
