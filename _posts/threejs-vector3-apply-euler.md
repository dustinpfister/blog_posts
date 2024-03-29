---
title: Setting a vector from angles and unit vector with the Vector3 apply Euler method in threejs
date: 2021-06-18 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 892
updated: 2023-07-23 08:44:28
version: 1.52
---

When it comes to moving and rotating objects around in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are two general classed that come to mind [THREE.Vector3](https://threejs.org/docs/#api/en/math/Vector3), and [THREE.Euler](https://threejs.org/docs/#api/en/math/Euler). The Vector3 class has to do with creating an object that represents a Vector in Vector space, and as such the Vector3 class is great for working with a set of numbers that have to do with a specific position in space. 

However a Vector can also be though of as a way to go about having a direction in space when it comes to the distance of the vector from the origin. In fact Vectors are often descried as being a direction and a magnitude, that is a normalized set of values between 0 and one for each axis that is then raised to what is often called a euclidean distance from the origin. There is another way of thinking about this though, such as having angels using the Euler class and using that as a way to set the position, or direction and magnitude of a Vector if you prefer.

So in this post I will be looking at the Vector3.applyEuler method and how it can be combined with various other Vector3 prototype methods to accomplish some various tasks.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/YZgyvCXSrmM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Applying a Euler angle to a Vector and what to know first

This is a post on the Apply Euler method in the Vector3 class and any additional subjects that might come up when it comes to using this method. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or [javaScript in general](/2018/11/27/js-getting-started/) so I assume that you are beyond the basic hello world type project when it comes to using threejs. However on top of that there are a few things that you should have fairly solid at this point, so in this section I will be quickly going over what those things are.

### There is a great deal more to be aware of when it comes to the eEctor3 class

It might be a good idea to take a second look at the [Vector3 class in general](/2018/04/15/threejs-vector3/) and look over what there is to work with when it comes to the various prototype methods beyond that of the apply Euler method. In the examples that I am going over in this post I am not just using the apply Euler method, but a few other Vector3 class methods that have to do with [normalizing a Vector3 instance](/2021/06/14/threejs-vector3-normalize/) to a Vector3 that is a unit vector of a length of 1 for example. So it might make sense to look into the class more if you still find something like that a little confusing.

### Check out the Euler class in general

In order to use the apply [Euler method](/2021/04/28/threejs-euler/) of the Vector3 class it should go without saying that an instance of the Euler class will be needed. This is then another class that is worth checking out in detail if you have not done so all ready, it is similar to that of Vector3, but is has to do with a collation of three angles.

### Source code examples are also up on github

The source code examples that I am writing about in this post can also be found in my [test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-apply-euler). This is also where I park the code for [my many other posts on threejs](/categories/three-js/) as well as additional draft demos, noted for future examples and so forth. If you are on Github and see something that might require a pull request that would be where to do so. There is also the comments section of this post that can be used as a means of bringing something up.

### Version Numbers matter with threejs

When I wrote this post I was using r127 of threejs, and the last time I came around to do a little editing I was using [r146 of the library](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). I have made a habit of making sure that I always mentioning what version I was using when writing a post like this because of code breaking changes that are made to the library often.

## 1 - Some basics examples of the Apply Euler method

For this section I will be going over a few basic examples of the apply Euler method before getting into some more advanced examples that have to do with animation loops, mutation of geometry, and so forth. There is starting out with just the apply Euler method alone, but often when I use the apply Euler method I do so with a number of other vector3 class methods, as well as make use of many other features in the threejs java Script library.

### 1.1 - Basic Vector3.applyEuler example

So then lets start out with a basic example of this apply user Vector3 method to gain a scene as to how it works. Here I have an example where I have a create cube helper method that will create and return a Mesh object that uses the Box geometry, and the Mesh normal material. The intention is that I will be creating one or more cubes with this method and using Euler and Vector3 class instances along with the apply Euler Vector3 prototype method as a way to set the position of this cube in a scene.

When positioning the cube I create an Instance of the Euler class that I will be using as the argument value for the apply Euler method. For this example I am using the [THREE.MathUtils.getToRad](https://threejs.org/docs/#api/en/math/MathUtils.degToRad) convenience method to convert a degree value to a radian value that is used with the Euler class. For now I am creating a Euler class instance where I have a 45 degree angle for the y value of the Euler class, and I am just leaving the other values at 0.

Next I want to create a new Instance of the THREE.Vector3 class and here is where things get a little tricky. I want to make sure that the length of the Vector3 instance is not zero. The default values for a Vector3 are 0,0,0 and if that is the case applying any Euler value to the vector will not change anything when it comes to the direction of the vector because everything is 0. So for now I am just setting the starting position of the vector at some kind of starting direction such as any positive number on the x axis. I can now call the apply Euler method off of the vector, and apply the Euler instance to the vector.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function(){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
//-------- ----------
// MESH
//-------- ----------
// creating a cube and adding it to the scene
const cube = createCube();
scene.add(cube);
// USING THE APPLY EULER Vector3 METHOD
const e = new THREE.Euler(
    THREE.MathUtils.degToRad(0),
    THREE.MathUtils.degToRad(45), 
    THREE.MathUtils.degToRad(0));
const v = new THREE.Vector3(2, 0, 0).applyEuler(e);
cube.position.copy(v);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

```

Now there is doing something with that Vector3 class instance to say set the position of a cube mesh object. When it comes to this the position property of a mesh object is also an instance of Vector3, and as such I can use the copy method of the position property of the mesh to copy the values of this stand alone vector3 to the position property. The result then is that the position of the cube is set to the position of the vector to which I have applied the Euler instance to and I have expected results. The cube is now 45 degrees from the starting position of the vector, and it would seem that the Vector still has the same length that I have set for it.

### 1.2 - Making a vector from angles and vector unit length using applyEuler, normalize, multiplyScalar

Now that I have a real basic example of the apply Euler method out of the way it is time to get into another example in which I am making use of a few vector3 class methods. For this example I am making a vector from angles method in which I give to angles, and a unit length to get a position from an origin. The angle values that I give are in degrees and once again I am using the Math Utils degree to radian method to convert these values to the radian values that are used for Euler class Objects. The first angle that I give will have a range from 0 to 360, and the second will have a range from 0 to 180, and then the third argument given will be a vector unit length.

So then when it comes to creating and returning a vector I once again start out with a standard starting position, and then call the apply Euler method passing the Euler object that I want to use that has values set from the angle arguments that I given when calling the helper function. I then call the normalize method to set the length of the vector to one while preserving the direction of the vector, and then call multiply scalar to set the unit length to the desired value.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Vector from angles method
const vectorFromAngles = function (a, b, len) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    len = len === undefined ? 1 : len;
    const startVec = new THREE.Vector3(1, 0, 0);
    const e = new THREE.Euler(
        0,
        THREE.MathUtils.degToRad(a),
        THREE.MathUtils.degToRad(-90 + b));
    return startVec.applyEuler(e).normalize().multiplyScalar(len);
};
// create a cube
const createCube = function(a, b, len){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshNormalMaterial());
    cube.position.copy( vectorFromAngles(a, b, len) );
    cube.lookAt(0, 0, 0);
    return cube;
};
//-------- ----------
// MESH
//-------- ----------
scene.add( createCube(0,  135, 2) );
scene.add( createCube(45, 135, 2) );
scene.add( createCube(90, 135, 2) );
scene.add( createCube(0,  90, 2) );
scene.add( createCube(45, 90, 2) );
scene.add( createCube(90, 90, 2) );
scene.add( createCube(0,  45, 2) );
scene.add( createCube(45, 45, 2) );
scene.add( createCube(90, 45, 2) );
scene.add( createCube(0, 0, 2) );
scene.add( createCube(0, 180, 2) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-5, 5, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Using applyEuler, vector3 add, lerp, normalize, multiply scalar, and groups

This will the then be a not so basic, basic example to rap up this section. It is still a basic example for me and where I am at sense I am still not doing anything with an animation loop, state machines, a whole bunch of additional javaScript modules and so forth. However This is an example in which I am making use of a fair about of features in the Vector3 class as well as threejs as a whole.

Once again I am making use of the Vector from angles method that I covered in an above example. So then once again I am making use of the apply Euler method as well as normalize, and multiply scalar Vector3 class methods. However I am not making use of additional helper functions that have to do with creating and updating the state of a [group of mesh objects](/2018/05/16/threejs-grouping-mesh-objects/). I have one helper function that will just create a group of mesh objects, and then another that will loop over each mesh object in the group and preform actions on each.

One of the actions that is preformed when looping over the mesh objects is to change the position of each mesh object. For this I am of course using the vector from angles method, but I am also making n use of the add method of the Vector3 class to apply an additional delta for each mesh object. On top of this I am also using the [Lerp method of the Vector3 class](/2022/05/17/threejs-vector3-lerp/) to Lerp all of the mesh objects between a final position based on arguments given as well as another fixed point.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Vector from angles method
const vectorFromAngles = function (a, b, len) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    len = len === undefined ? 1 : len;
    const startVec = new THREE.Vector3(1, 0, 0);
    const e = new THREE.Euler(
            0,
            THREE.MathUtils.degToRad(a),
            THREE.MathUtils.degToRad(-90 + b));
    return startVec.applyEuler(e).normalize().multiplyScalar(len);
};
// create a cube
const createCube = function(pos, size){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshNormalMaterial());
    cube.position.copy( pos || new THREE.Vector3() );
    cube.lookAt(0, 0, 0);
    return cube;
};
// create a group
const createGroup = (len) => {
    const group = new THREE.Group();
    let i = 0;
    while(i < len){
        group.add( createCube(null, 1) );
        i += 1;
    }
    return group;
};
// set a group
const setGroup = (group, aCount, unitLength, vd, vlt, alpha) => {
    aCount = aCount === undefined ? 1 : aCount;
    unitLength = unitLength === undefined ? 1 : unitLength;
    vd = vd === undefined ? new THREE.Vector3() : vd;       // vector delta for each object effected by i / len
    vlt = vlt === undefined ? new THREE.Vector3() : vlt;    // vector to lerp to for each mesh positon
    alpha = alpha === undefined ? 0 : alpha;
    let len = group.children.length;
    let i = 0;
    while(i < len){
        const p = i / len;
        const a = 360 * aCount * p;
        // using my vector from angles method
        const v = vectorFromAngles(a, 180 * p, unitLength);
        // adding another Vector
        v.add( vd.clone().multiplyScalar(p) );
        const cube = group.children[i];
        cube.position.copy(v.lerp(vlt, alpha));
        cube.lookAt(0, 0, 0);
        const s = 1 - 0.75 * p;
        cube.scale.set(s, s, s);
        i += 1;
    }
}
//-------- ----------
// MESH
//-------- ----------
const group = createGroup(100);
const vd = new THREE.Vector3(6, 0, 0);
const vlt = new THREE.Vector3(-10, 2, 0);
setGroup(group, 4, 3, vd, vlt, 0.25);
scene.add(group);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


## 2 - Animation examples

So now that I have a basic example of this worked out, I often like to make at least one or more examples that involve an animation loop function using something like request animation frame, or some other means to do so. This will allow for me to use the apply Euler method over and over again with a range of values to get a better sense of what the apply Euler method does, and why it can prove to be a useful tool when working out various things that have to do with the movement of objects in space.

### 2.1 - Moving cube sround animation example

This example then involves the use of a vector from angles helper method in which I can pass values for the various angles along with a length, and a start vector as a way to create and return a Vector3 instance created with these arguments. It is with this vector from angled helper function that I am using the apply Euler method along with other vector3 class methods to get a desired outcome. I can then use the copy method of the Vector3 class to copy the result that is returned to by the helper as a way to update the position property of an object3d based object such as the mesh objects as I am doing here.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// simple create cube helper
const createCube = function () {
    const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
             new THREE.MeshNormalMaterial());
    return cube;
};
// vector fro angles helper
const vectorFromAngles = function (a, b, c, len, startVec) {
    len = len === undefined ? 1 : len;
    startVec = startVec === undefined ? new THREE.Vector3(1, 0, 0) : startVec;
    const e = new THREE.Euler(
            THREE.MathUtils.degToRad(a),
            THREE.MathUtils.degToRad(b),
            THREE.MathUtils.degToRad(c));
    const v = startVec.applyEuler(e).normalize();
    return v.multiplyScalar(len);
};
//-------- ----------
// MESH
//-------- ----------
const cube = createCube();
scene.add(cube);
// USING MY VECTOR FROM ANGLES METHOD
const v = vectorFromAngles(90, 0, 0, 1);
cube.position.copy(v);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let lt = new Date(),
a = 0,
b = 0,
c = 0,
fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        b += 90 * secs;
        b %= 360;
        const v = vectorFromAngles(a, b, c, 1.5);
        cube.position.copy(v);
        lt = now;
        renderer.render(scene, camera);
    }
};
loop();
```

The result is then having the cube move around in a circle around the origin of the scene as expected. So then it is possible to create all kinds of helper methods like this that might come in handy when it comes to creating Vectors than can be applied to a mesh object, or used fr any other purpose that might come up.

### 2.2 - Group of mesh objects animation example

This animation loop example is just a continuation of the basic section example that had to do with creating and updating a group. The only real difference is that I am calling the set group method in an update method that is being called over and over again in the animation loop function. 

With that said I have a few variables where I am steeping a count that I can then divide over that of a max count value to get an alpha value. On top of that I can then also use that alpha value to get a kind of bias, or ping pong value by making use of another method of interest in the Math Utils object. This ping pong method will give a value that goes up to a given value and then back down again, there is more than one way of going about doing this of course including a vanilla javaScript expression that I find myself typing over and over again but in any case that is what it does. Anyway I can use the result of this ping pong, or bias value that I often call it, to get a value for that aCount argument when using calling my set group method.

On top of getting values for calling the set group method I can also again use my apply Euler powered vector from angles method to move the group object around as a whole. Both the mesh objects and the group object are object3d based objects that both contain position properties that are instances of Vector3 that I can copy to with the results of the vector from angles helper function calls.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Vector from angles method
const vectorFromAngles = function (a, b, len) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    len = len === undefined ? 1 : len;
    const startVec = new THREE.Vector3(1, 0, 0);
    const e = new THREE.Euler(
        0,
        THREE.MathUtils.degToRad(a),
        THREE.MathUtils.degToRad(-90 + b));
    return startVec.applyEuler(e).normalize().multiplyScalar(len);
};
// create a cube
const createCube = function(pos, size){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshNormalMaterial());
    cube.position.copy( pos || new THREE.Vector3() );
    cube.lookAt(0, 0, 0);
    return cube;
};
// create a group
const createGroup = (len) => {
    const group = new THREE.Group();
    let i = 0;
    while(i < len){
        group.add( createCube(null, 1) );
        i += 1;
    }
    return group;
};
// set a group
const setGroup = (group, aCount, unitLength, vd, vlt, alpha) => {
    aCount = aCount === undefined ? 1 : aCount;
    unitLength = unitLength === undefined ? 1 : unitLength;
    vd = vd === undefined ? new THREE.Vector3() : vd;       // vector delta for each object effected by i / len
    vlt = vlt === undefined ? new THREE.Vector3() : vlt;    // vector to lerp to for each mesh positon
    alpha = alpha === undefined ? 0 : alpha;
    let len = group.children.length;
    let i = 0;
    while(i < len){
        const p = i / len;
        const a = 360 * aCount * p;
        // using my vector from angles method
        const v = vectorFromAngles(a, 180 * p, unitLength);
        // adding another Vector
        v.add( vd.clone().multiplyScalar(p) );
        const cube = group.children[i];
        cube.position.copy(v.lerp(vlt, alpha));
        cube.lookAt(0, 0, 0);
        const s = 1 - 0.75 * p;
        cube.scale.set(s, s, s);
        i += 1;
    }
};
//-------- ----------
// MESH
//-------- ----------
const group = createGroup(400);
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
let c = 0;
const CMAX = 200;
let acRange = [-5, 5];
const vd = new THREE.Vector3(0, 0, 0);
const vlt = new THREE.Vector3(0, 0, 0);
const update = function(frame, frameMax){
    // step count, figire p and b alpha values
    c += 1;
    c = c > CMAX ? CMAX : c;
    const p = c / CMAX;
    const b = THREE.MathUtils.pingpong(p - 0.5, 1) * 2;
    // get acount set group
    const aCount = acRange[0] + (acRange[1] - acRange[0]) * b;
    setGroup(group, aCount, 3, vd, vlt, b);
    // if c === CMAX new values
    if(c === CMAX){
        c = 0;
        acRange[0] = -20 + 20 * Math.random();
        acRange[1] = 20 * Math.random();
    }
    // ALSO MOVEING GROUP POSITION WITH APPLY EULER
    group.position.copy( vectorFromAngles(360 * p, 90, 2.5) );
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

### 2.3 - Using apply Euler to update the position attribute of a geometry

Another Idea of an animation example would involve the mutation of the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of a buffer geometry that is used with a mesh object. When it comes to buffer geometry the position attribute is the first and for most attribute that comes to mind that is used to store the position of each vertex cor each triangle. So the Vector3 apply Euler method could be used to cause some interesting chanced to geometry if I am to create an array of Vector3 instances for each point and use apply Euler as part of the expressions to change the values of the array of vector3 objects, then use this array to update the position attribute if that makes nay sense.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// Vector3 array from geometry
const Vector3ArrayFromGeometry = (geometry) => {
    const pos = geometry.getAttribute('position');
    let i = 0;
    const len = pos.count, v3Array = [];
    while(i < len){
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
        v3Array.push(v);
        i += 1;
    }
    return v3Array;
};
// lerp two vector3 arrays
const Vector3ArrayLerp = (v3Array_1, v3Array_2, alpha) => {
    return v3Array_1.map((v, i) => {
        return v.clone().lerp( v3Array_2[i], alpha )
    });
};
const Vector3ArrayToTyped = (v3Array) => {
    let i = 0, len = v3Array.length, vertArray = [];
    while(i < len){
        let v = v3Array[i];
        vertArray.push(v.x, v.y, v.z);
        i += 1;
    }
    return new THREE.Float32BufferAttribute(vertArray, 3)
};
// update geo helper
const updateGeo = (geometry, toV3array, alpha) => {
    const v3array3 = Vector3ArrayLerp(v3array1, toV3array, alpha);
    const pos = sphere.geometry.getAttribute('position');
    const typed = Vector3ArrayToTyped(v3array3);
    typed.array.forEach((n, i)=>{
        pos.array[i] = n;
    });
    pos.needsUpdate = true;
};
// ---------- ----------
// MESH
// ---------- ----------
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 60, 60),
    new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
);
scene.add(sphere);
const angleEffect = function(v, i, arr) {
    const unitLength = 0.5 + 4.5 * Math.random();
    const e = new THREE.Euler();
    if(v.x >= 0){
         e.x = Math.PI / 180 * 90;
         e.y = Math.PI / 180 * 20 * Math.random();
    }else{
         e.x = Math.PI / 180 * 90 * -1;
         e.y = Math.PI / 180 * 20 * Math.random() * -1;
    }
    return v.clone().normalize().applyEuler(e).multiplyScalar(unitLength)
}
const v3array1 = Vector3ArrayFromGeometry(sphere.geometry);
const v3array2 = v3array1.map(angleEffect);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     let p = frame / frameMax;
     let b = 1 - Math.abs(0.5 - p) / 0.5;
     updateGeo(sphere.geometry, v3array2, b)
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

## Conclusion

It would seem like there is at times a lot of over lap between the Vector3 class and the Euler class, and there is a lot of similarities between the two. I remember that when I was first getting started wit threejs that I would often confuse the two, but it is a good idea to work out the confusion. When it comes to Vector3 instances I am dealing with three properties that have to do with an x, y, and z, values and these values often have to do with a position in space. However they can be used for many other things such as ratios that have to do with these values that can then be applied to another Vector3 instance, or a Euler instance. With a Euler class instance it is a similar situation when it comes to the property values, however now I am dealing with radian values that represent angles.