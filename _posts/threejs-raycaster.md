---
title: Clicking a mesh in three.js with the Raycaster class
date: 2021-05-18 09:46:00
tags: [three.js]
layout: post
categories: three.js
id: 869
updated: 2023-07-27 14:42:58
version: 1.35
---

When making a [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) project there might be situations in which it would be nice to have a way to click on a [mesh object](/2018/05/04/threejs-mesh/). When dong so this will result in some kind of action being preformed that is event driven by way of user input rather than some kind of run time script. To do this I need a way to cast a ray from the [camera](/2018/04/06/threejs-camera/) that I am using outward based on a 2d location of the canvas element of the [renderer](/2018/11/24/threejs-webglrenderer/). Then I need to get a collection of mesh objects that intersect with this ray that is going from the camera outward. Luckily this kind of functionality is built into threejs itself and it is called the [THREE.RayCaster Class](https://threejs.org/docs/#api/en/core/Raycaster).

There is also the idea of using a raycatser by positioning one at some location in world space, set a direction, and then just get a point on a surface of any kind of geometry. There are all kinds of use case examples for that kind of situation that has to do with knowing how to position one mesh object onto the surface of another mesh object. So that is another general use case that comes to mind that may or may not also involve human input.

There is just getting started with the very basics of raycasting in threejs, and of course I will be starting out with that in this post. However there might be a whole bunch more advanced topics that will also come up when it comes to this sort of thing. So I think that it might be called for to go over at least a few examples of the ray cater class in threejs.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/uD9kTlszL2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Clicking a Mesh in three.js and what to know before hand

This is a post on using the THREE.Raycaster class in threejs as a way to help with the process of clicking on a mesh object. This is then a post on a topic that might prove to be a little to advanced for some developers that are still a little to new with [threejs](/2018/04/04/threejs-getting-started/) and [javaScript](/2018/11/27/js-getting-started/). In this section I will then be going over a few topics that are worth checking out for the first time, or refreshing on before continuing with the rest of the continent here.

### Read up more on mesh objects, and the object3d base class

There is starting out with reading a bit more on mesh objects, and the underlying base class [known as object3d](/2018/04/23/threejs-object3d/).

### Source code is on Github

The source code examples that I am wiring about here as well as additional draft examples, notes and  much more can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-raycaster). This is also where I park the source code for my many other [posts on threejs](/categories/three-js/).

### version Numbers matter with threejs

When I made these examples and wrote this post I was using r127 of threejs which was still a fairly later version of threejs as of this writing. The last time I cam around to do a little editing, and expand with new examples I was [using r146 of the library](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Code breaking changes are always made with threejs as new revisions come out so if you run into problems with getting this to work on your end that might be the first thing you should check actually.

## 1 - Basic examples of the Raycaster class

When it comes to starting out with anything in threejs, or when it comes to just about anything in programming there is thinking in terms of first starting out with a simple hello world style example of what that something is. So then in this section I will be starting out with some fairly simple examples of the use of the raycaster class, before moving on to more complex examples of various use cases.

### 1.1 - Sphere Raycaster example

The goal here is to use the raycaster class to get a position on the surface of a sphere, and then use that as a way to position a new mesh object on the surface of that sphere. There [may be better ways of doing this sort of thing](/2021/05/14/threejs-examples-position-things-to-sphere-surface/) when it comes to a sphere geometry as I could just use the apply Euler, normalize, and multiply scalar methods to do with actually. However this is very much a post on the raycaster class so I am  using just that.

```js
//-------- ----------
// SPHERE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 30, 30),
        new THREE.MeshNormalMaterial());
scene.add(sphere);
//-------- ----------
// RAYCASTER
//-------- ----------
const v_ray_origin = new THREE.Vector3(50, 50, 25); // where the ray comes from
const v_ray_dir = v_ray_origin.clone().negate().normalize(); // getting direction by inverting origin
const near = 0, far = 100;
const raycaster = new THREE.Raycaster(v_ray_origin, v_ray_dir, near, far);
// intersect
const result = raycaster.intersectObject(sphere, false)
if(result.length > 0){
    const hit = result[0];
    console.log(hit.point);
    // create mesh at point
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box.position.copy(hit.point.clone().normalize().multiplyScalar(3.5));
    box.lookAt(sphere.position);
    scene.add(box);
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Torus  Raycaster example

This will be another quick example of using a raycaster to position one mesh object to the surface of another, this time I will be doing so with a torus geometry.

```js
//-------- ----------
// SPHERE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const torus = new THREE.Mesh(
        new THREE.TorusGeometry(4, 0.75, 20, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
torus.geometry.rotateX(Math.PI * 0.5)
scene.add(torus);
//-------- ----------
// RAYCASTER
//-------- ----------
const v_ray_origin = new THREE.Vector3(0, 3, 0); // where the ray comes from
let radian = Math.PI / 180 * 300;
let v_lookat = new THREE.Vector3(1, 0, 0).applyEuler( new THREE.Euler(0, radian, 0) ).multiplyScalar(4);
// object to helper set dir
const obj = new THREE.Object3D();
obj.position.copy(v_ray_origin);
obj.lookAt(v_lookat);
const v_ray_dir = new THREE.Vector3(0, 0, 1);
v_ray_dir.applyEuler(obj.rotation).normalize();
// create raycaster
const near = 0, far = 100;
const raycaster = new THREE.Raycaster(v_ray_origin, v_ray_dir, near, far);
// intersect
const result = raycaster.intersectObject(torus, false)
if(result.length > 0){
    const hit = result[0];
    // create mesh at point
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box.position.copy( hit.point );
    box.lookAt(v_lookat);
    scene.add(box);
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Mouse over example of the Raycaster class

For this example I am going to b going over an example where I am using a raycaster to find out if a mesh in the scene has been clicked or touched. In the event that is was I will just do something that will be a confirmation of sorts that it has been clicked such as increase the scale. 

The main method of interest with the Raycaster class is the intersect objects method, but in order to set the state of the Raycaster instance first I will want to use the set from camera method. In order to use the set from camera method of course I am going to need an instance of a camera, but I am also going to need a Vector2 instance that is the mouse or pointer position in the canvas.

So then I create my instance of raycaster, and then also an instance of the Vecot2 class. I can then use mouse, touch, or pointer events to get a canvas relative position that was clicked and use that to update the state of the vecotr2 that I will be using with the set from camera method. In a main update method I can then call the set from camera method, and pass the camera along with the current state of the vecotr2 class that can be mutated by pointer events.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MOUSE OVER EVENT
//-------- ----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-5, -5);
// update mouse Vector2 on pointer down event
const onDown = ( event ) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    // set mouse Vector2 values
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
// set vector2 baco to -5 -5 on pointer up
const onUp = ( event ) => {
    mouse.x = -5;
    mouse.y = - -5;
};
// Attach mouse event
renderer.domElement.addEventListener( 'pointerdown', onDown, false );
renderer.domElement.addEventListener( 'pointerup', onUp, false );
//-------- ----------
// CHILD OBJECTS
//-------- ----------
const boxGroup = new THREE.Group();
scene.add(boxGroup);
// box 1
let box = new THREE.Mesh(
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
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
// orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
let lt = new Date();
const fps = 30;
const update = (group) => {
    // default scale
    group.children.forEach(function(obj){
        obj.scale.set(1, 1, 1);
    });
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects(group.children, true );
    if(intersects.length > 0){
        const mesh = intersects[0].object;
        mesh.scale.set(2, 2, 2);
    }
};
const loop = function () {
    const now = new Date(),
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

For this example of the Raycaster class I decided to make use of a module that I made for my [post on nested groups in threejs](/2021/05/10/threejs-examples-nested-groups/) that is a kind of cube group model. This module is just a way to create a group of eight mesh objects where each mesh object has an instance of the built in box geometry of threejs as its geometry. These eight mesh objects are positioned in such a way so that they from a larger cube of cubes sort of speak. I can then use an update method of the cube group module to update the state of ones of these cube groups so that the cubes expand outward from the center of the group, and back again.

### 3.1 - Cube Group module

Here I have the state of the cube group module as I have used it for this example. I did not change much with this from what I have worked out in the for the other threejs example post. Still I often do make a few minor changes here and there with these when I use them in other projects, so I just got into the habit of always posing what it is that I am using here.

```js
(function (api) {
    const ANGLES_A = [225, 315, 135, 45];
    const toRadians = function (array) {
        return array.map(function(deg){
            return Math.PI / 180 * deg;
        });
    };
    // create a single cube mesh
    const createCube = function (rotationCounts, position, materials) {
        const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials || new THREE.MeshNormalMaterial());
        // USER DATA OBJECT FOR A SINGLE CUBE
        const ud = cube.userData;
        ud.rotationCounts = rotationCounts || [0, 0, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };
    // update a single cube
    const updateCube = function (cube, per) {
        const ud = cube.userData,
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
        const cubes = new THREE.Group(),
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
        let i = 0;
        while(i < 8){
            const cubeRotations = opt.cubeRotations[i] || [0.00, 0.00, 0.00];
            const cube = createCube(
                cubeRotations, 
                new THREE.Vector3(0, 0, 0),
                opt.materials);
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };
    const setCubesRotation = function(cubes, per){
        const gud = cubes.userData,
        r = gud.rotations,
        PI2 = Math.PI * 2,
        x = PI2 * r[0] * per,
        y = PI2 * r[1] * per,
        z = PI2 * r[2] * per;
        cubes.rotation.set(x, y, z);
    };
    const updateCubes = function(cubes, per, bias){
        const gud = cubes.userData;
        // update cubes
        cubes.children.forEach(function (cube, i) {
            // start values
            const sx = i % 2 - 0.5,
            sz = Math.floor(i / 2) - Math.floor(i / 4) * 2 - 0.5,
            sy = Math.floor(i / (2 * 2)) - 0.5;
            // adjusted
            const aIndex = i % 4,
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
        const gud = cubes.userData;
        const per = gud.frame / gud.maxFrame,
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
}(this['CubeGroupMod'] = {}));
```

### 3.2 - the main javaScript file

Now for a main javaScript file in which I am using the Raycaster class to run an animation for any and all cube groups that intersect when using a Raycater. When it comes to working with an instance of this cube group of mine it is a little different from working with a collection of mesh objects, as what I am dealing with here is a collection of groups of mesh objects. However the situation is not all that more involved as I just need to loop over the collection of cube groups, and pass the children of each group to the intersects objects method. I can then just the the first mesh object if any and just use the parent property of that mesh to get a reference to the group of cube mesh objects. I can then set the active flag of the cube group to true.

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
// RAYCASTER
//-------- ----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);
// on mouse move
const onMouseMove = function( event ) {
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};

renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
//-------- ----------
// OBJECTS
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
// ORBIT CONTROLS
//-------- ----------
let controls = null
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let lt = new Date(),
frame = 0;
const maxFrame = 300,
fps = 30;
// update the picking ray with the camera and mouse position
const update = function(cubeGroups, secs){
    raycaster.setFromCamera( mouse, camera );
    cubeGroups.children.forEach(function(cubeGroup){
        const intersects = raycaster.intersectObjects( cubeGroup.children, true );
        if(intersects.length > 0){
            let mesh = intersects[0].object,
            group = mesh.parent;
            group.userData.active = true;
        }
        CubeGroupMod.update(cubeGroup, secs);
    });
};
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


So then the outcome of this is more or less what I had in mind when it comes to what I wanted to do. When I mouse over a cube group the cube group beginnings an animation loop, until the loop is over at which point the active false ends up getting set back to false. Maybe not the most interesting example, but I wanted to do something at least a little more advanced then just the usual basic copy and paste cook book style code examples.

## 4 - Animation loop examples

In this section I will then be going over at least one if not more source code examples for any videos that I have made for this post. As of this writing I made just once video that has to do with using the raycaster class to get the position of a location on the surface of a torus geometry. In time when I get around to editing this post again, which I might very well do because this is an important subject I am sure that the collection will grow here.

### 4.1 - Torus

The first video that I made for this post is based off of this source code that I will be writing about in this section. For this video I just wanted to move a mesh object around with the center of the mesh located at the position at which the raycatser has round on the surface. The goal here then is to just show one of the core use cases of the raycaster class which is to use it as a tool to find a location on the surface of a geometry, typically to help with setting the position of the a mesh object on the surface of another.

```js
//-------- ----------
// SPHERE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// set mesh posiiton if we have a hit
const setMeshIfHit = (raycaster, mesh, target, v_lookat) => {
    const result = raycaster.intersectObject(target, false);
    if(result.length > 0){
        const hit = result[0];
        mesh.position.copy( hit.point );
        mesh.lookAt(v_lookat);
   }
};
// get dir
const getDir = (v_origin, v_lookat) => {
    const obj = new THREE.Object3D();
    obj.position.copy(v_origin);
    obj.lookAt(v_lookat);
    const dir = new THREE.Vector3(0, 0, 1);
    dir.applyEuler(obj.rotation).normalize();
    return dir;
};
// get look at vector
const getLookAt = (deg, radius) => {
    let radian = Math.PI / 180 * deg;
    return new THREE.Vector3(1, 0, 0).applyEuler( new THREE.Euler(0, radian, 0) ).multiplyScalar(radius);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const torus_radius = 4;
const torus = new THREE.Mesh(
        new THREE.TorusGeometry(torus_radius, 1.25, 20, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
torus.geometry.rotateX(Math.PI * 0.5)
scene.add(torus);
// create mesh at point
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// RAYCASTER
//-------- ----------
// create raycaster
const raycaster = new THREE.Raycaster();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a * 2 % 1 ) / 0.5;
    let v_lookat = getLookAt(360 * a, torus_radius);
    let v_ray_origin = new THREE.Vector3(0, -20 + 40 * b, 0)
    let v_ray_dir = getDir(v_ray_origin,  v_lookat);
    raycaster.set(v_ray_origin, v_ray_dir);
    setMeshIfHit(raycaster, box, torus, v_lookat);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

There is still finding ways to adjust the geometry of the sphere that I am moving on the surface of the torus, by ether translating the geometry of the sphere, or making use of the [compute bounding box method](/2022/10/07/threejs-buffer-geometry-compute-bounding-box/) of buffer geometry and get size method of the box3 class. In any case the core idea is working just fine in this video when it just comes to getting a position on the surface of a geometry.

### 4.2 - Torus, bounding box, and lerp to adjust mesh position from hit position

So far it looks like raycaster works more or less okay for getting a desired position on the surface of a geometry. However now there is just the question of how to go about adjusting from that position depending the size of the geometry that I am using with a mesh that I wish to place on the surface. If I just place a mesh at the hit location without doing anything to translate the geometry, or adjust that values that I use to position the child mesh lets call it, then things might not always look so great.

The first thing to keep in mind here is that I am not dealing with a problem with Raycaster, but rather the position of the geometry relative to the origin of the mesh. When it comes to a box geometry I can just get the size of the geometry, and then divide the desired axis by half as the origin is typically in the center of the geometry when it is created by such a built in constructor. That is what I am doing here in this example.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/me1YeImrU2Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


The main tools that are my friend here are Vecotr3 class methods such as the lerp and distance to methods, along with the bounding box property of the child mesh geometry. So there is also the Compute Bounding box method of the buffer geometry, and also the Box3 class, and with that the getSize method of the box3 class. Using all these tools I updated the source code of my set mesh if hit helper function to adjust the position of the mesh object.

```js
//-------- ----------
// SPHERE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// set mesh posiiton if we have a hit
const setMeshIfHit = (raycaster, mesh, target, adjustAxis, adjustMulti) => {
    adjustAxis = adjustAxis || 'z';
    adjustMulti = adjustMulti === undefined ? 0.5 : adjustMulti;
    // raycatsre result
    const result = raycaster.intersectObject(target, false);
    //if we have a hit, update mesh pos
    if(result.length > 0){
        const hit = result[0];
        // use distance to, lerp, and bounding box to adjust
        mesh.geometry.computeBoundingBox();
        let v_size = new THREE.Vector3();
        mesh.geometry.boundingBox.getSize(v_size);
        let hh = v_size[adjustAxis] * adjustMulti;
        let d = hit.point.distanceTo(raycaster.ray.origin);
        mesh.position.copy( hit.point ).lerp(raycaster.ray.origin, hh / d);
        //mesh.position.copy( hit.point );
        // can use the origin prop of the Ray class
        mesh.lookAt(raycaster.ray.origin);
   }
};
// get dir
const getDir = (v_origin, v_lookat) => {
    const obj = new THREE.Object3D();
    obj.position.copy(v_origin);
    obj.lookAt(v_lookat);
    const dir = new THREE.Vector3(0, 0, 1);
    dir.applyEuler(obj.rotation).normalize();
    return dir;
};
// get look at vector
const getLookAt = (deg, radius) => {
    let radian = Math.PI / 180 * deg;
    return new THREE.Vector3(1, 0, 0).applyEuler( new THREE.Euler(0, radian, 0) ).multiplyScalar(radius);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const torus_radius = 4;
// the torus mesh
const torus = new THREE.Mesh(
        new THREE.TorusGeometry(torus_radius, 1.25, 40, 40),
        new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.8 }));
torus.geometry.rotateX(Math.PI * 0.5);
scene.add(torus);
// raycaster point mesh
const mesh_ray = new THREE.Mesh(
    new THREE.ConeGeometry(0.25, 2, 10, 10),
    new THREE.MeshNormalMaterial());
mesh_ray.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh_ray);
// create a mesh object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 2, 1.25),
    new THREE.MeshNormalMaterial());
mesh.geometry.rotateX(Math.PI * 0.5);
// just translating the geometry works, but I would rather adjust by another means
//box.geometry.translate(0, 0, -0.75);
scene.add(mesh);
//-------- ----------
// RAYCASTER
//-------- ----------
// create raycaster
const raycaster = new THREE.Raycaster();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
new THREE.OrbitControls(camera, renderer.domElement);
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a * 2 % 1 ) / 0.5;
    // update raycaster
    let v_lookat = getLookAt(360 * a, torus_radius);
    let v_ray_origin = new THREE.Vector3(0, -5 + 10 * b, 0);
    let v_ray_dir = getDir(v_ray_origin,  v_lookat);
    raycaster.set(v_ray_origin, v_ray_dir);
    // update mesh_ray to have the same position as the raycaster origin
    mesh_ray.position.copy(v_ray_origin);
    mesh_ray.lookAt(v_lookat);
    // if we have a hit, update the mesh object
    setMeshIfHit(raycaster, mesh, torus);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

Although this might be working okay with the box ge9ometry mesh that I am using in this example you will notice that i added some arguments for changing what the adjust axis is, as well as a multiplier for that axis. The reason why is because when using many other states of geometry I might need to adjust what those values are. However maybe the best way of making sure that this always works well is to adjust the geometry so that the origin is always in a standard location that is like that of what happens with the box geometry. In other words make sure that it is always more or less in the center of the geometry, and that the rotation of the geometry is consistent

## Conclusion

So then the raycaster class is a useful tool to go about clicking on mesh objects in threejs. However I am sure that there are many uses for the class that will come up when it comes to writing scripts that update some kind of simulation also when it comes to getting a collection of mesh objects from a given object outward or anything to that effect. I think that there might be a need for maybe a few more basic examples of this kind of class as I am sure that there are a number of issues that will come up here and there when using this class. Not just with the class itself, but also when it comes to threejs, and javaScript in general. For example many of the examples that I have worked out as of this writing will just work with a mouse, but I did not do anything when it comes to working with touch devices, and this day in age I have to take that into account when making any kind of production project.