---
title: Distance from one point to another in threejs
date: 2021-06-15 12:05:00
tags: [three.js]
layout: post
categories: three.js
id: 889
updated: 2023-03-13 11:27:52
version: 1.31
---

When it comes to points or Vectors if you prefer in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is the question of how to get the distance between two of them in space. In the [Vector3 class](/2018/04/15/threejs-vector3/) there is the [distance to method](https://threejs.org/docs/#api/en/math/Vector3.distanceTo) that can be used as a built in way to go about getting distance which should work fine.

So this post will be on the use of the distance to method of the vector3 class. However it will not just be about the distance to method of course though. I will be touching base on a whole bunch of other methods to work with in the Vector3 class, as well as a whole bunch of other aspects of the threejs library. There are many use case examples that will come up when it comes to using this sort of method, any many of them will involve not just getting the distance of course. I will not be getting into every little detail with the Vector3 class of course, but the focal point here will of course be the distance to method.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/K24IiA2bBNY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Vector3 distance to method and what to know first

This is a post on the distance to method of the Vector3 class in the client side javaScript library known as threejs. The subject here then is on one specific method of one specific class in a single javaScript library, so then this is not a [getting started post with threejs](/2018/04/04/threejs-getting-started/) let along client side javaScript in general. I will not be getting into every little detail about the library here, but I usually write a section like this for every post where I outline a few things you might want to read up more on before continuing to read the rest of this post.

### Read up more on the Vector3 class in general

The distance to method is just one method of interest in the vector3 class to work with, there are a number of other useful methods when it comes to working with these kinds of class instances. So it would be a good idea to look into the [THREE.Vector3 class in greater detail](/2018/04/15/threejs-vector3/) at some point sooner or later in order to gain a better understanding of everything there is to work with when it comes to the Vector3 class.

### Know the basics of Object3d, and the position property specifically

Another Major class to work with in threejs is the [obejct3d class](/2018/04/23/threejs-object3d/), and when it comes to working with the Vector3 class it is mainly the [position property](/2022/04/04/threejs-object3d-position/) of anything based off of object3d that is of interest. One major use case example of the distance to method is to use it as a way to get the distance between two mesh objects. So then to do so I would want to call the distance to method off of the Vector3 instance of the position property of the Mesh, and then pass the position property of the other mesh as the argument for the method. There is a lot to be aware of when it comes to working with Mesh objects, but what there is to know about Object3d applies to Mesh objects, as well as all kinds of other objects that are based off of object3d.

### Source code examples are on Github

The source code examples that I am writing about in this post can also be found in my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-distance-to) on Github.

### Version Numbers matter

When I first wrote this post I was using r127 of threejs and the last time I came around to doing some editing I was using r146 of the library. Code breaking changes are made to threejs often, also there are some major changes coming up ahead with later revisions of threejs that I do not care to get into detail with here. Simply put version numbers matter big time with threejs and not just with respect to the revision number but many more other things deeper down in the software layers as well. If you are running into problems with these source code examples check the revision you are using, also be aware of what your graphics card is capable of, what drivers you are using with them and so forth.

## 1 - Basic Vector3 distance to example

So for now it might be a good idea to just start out with a basic example of the distance to method using the position properties of some Mesh objects which are of course instances of the Vector3 class. In this example I just have a single create cube helper method that will create and return a mesh object that uses the box geometry and the mesh normal material. I am then calling this create cube method twice and adding two cubes to the scene, both of which are located at the same default position at the center of the scene.

I then just have a little extra javaScript code that will check the distance between the position of cube1, and that of cube2. In the event that the distance between the two cubes is less than 2, and in this case it is as the distance is 0, then the position of cube2 will be set to a specific location.

```js
//-------- ---------
// SCENE, CAMERA, RNEDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ---------
// HELPER
//-------- ----------
const createCube = function () {
    var cube = new THREE.Mesh(
           new THREE.BoxGeometry(1, 1, 1),
           new THREE.MeshNormalMaterial());
    return cube;
};
//-------- ---------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const cube1 = createCube();
cube1.position.set(3, 0.5, 2);
scene.add(cube1);
const cube2 = createCube();
cube2.position.set(4, 0.5, -2);
scene.add(cube2);
// doing somehting with distance
const d = cube2.position.distanceTo(cube1.position);
console.log(d);
cube2.scale.set(0, 0, 0)
if (d < 5) {
    const s = 1 - (d / 5); 
    cube2.scale.set(s, s, s);
    cube2.position.y = s / 2;
}
//-------- ---------
// RENDER
//-------- ----------
camera.position.set(8, 2, 8);
camera.lookAt(cube1.position);
renderer.render(scene, camera);
```

This might not be the most interesting example in the worked when it comes to the distance to method, however this is of course a basic example and that is often the case with these kinds of examples. I just wanted to start with something very simple for this post, and with that said the basic idea of the distance to method is there. If I play around with the hard coded values for the position of cube2 the results will always be the same for any position that is within a distance of two from cube1, as one might expect. So now that I have the basic example out of the way we can move on to one or more real examples of this method.

## 2 - Move an object to a point, and adjust the rate by distance example

So now that I have a basic example out of the way it is time to start looking into a few use case examples of the distance to method. In this example I am changing the rate at which one point is moving to another point based on the distance to that point. 

There are all kinds of examples that could be made like this, but I have to start somewhere. The general idea with this one was to just move one mesh object directly towards another, and do so by passing the object, then a vector, and then a value between 0 and 1 which is the percent of the difference between the two points to move the object. So with that said I have this move object by difference method that does not use the distance to method actually, it just has to do with getting the difference between two vectors, and then move one object by a percent of that difference. I then have another helper function that makes use of my move obj by diff method, and it is this other helper method that is a kind of move object by distance difference helper.

I also have another method that will check the distance between two points and return true of the distance is lower that a given min distance. I also have a helper method that will set a new random start location, and I am then using this distance check method to know if I should set a new position or not.

```js
(function () {
 
    // simple create cube helper
    var createCube = function () {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // move cube by difference and percent
    var moveObjByDiff = function (obj, pos, per) {
        per = per === undefined ? 1 : per;
        per = per > 1 ? per % 1 : per;
        var diff = obj.position.clone().sub(pos);
        obj.position.sub(diff.multiplyScalar(per));
    };
 
    var moveObjByDistDiff = function (obj, pos, maxDist, maxPer) {
        maxDist = maxDist === undefined ? 5 : maxDist;
        maxPer = maxPer === undefined ? 0.25 : maxPer;
        var d = obj.position.distanceTo(pos),
        per = maxPer;
        if (d <= maxDist) {
            per = d / maxDist * maxPer;
        }
        moveObjByDiff(obj, pos, per);
    };
 
    var minDistCheck = function (obj, pos, minDist) {
        minDist = minDist === undefined ? 0.125 : minDist;
        var d = obj.position.distanceTo(pos);
        if (d < minDist) {
            return true;
        }
        return false;
    };
 
    var newRandomStartPos = function (maxLength) {
        maxLength = maxLength === undefined ? 10 : maxLength;
        return new THREE.Vector3().random().subScalar(0.5).normalize().multiplyScalar(maxLength);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));
 
    // cubes
    var cube1 = createCube();
    cube1.position.set(0.001, 0, 0);
    scene.add(cube1);
    var cube2 = createCube();
    cube2.position.copy(newRandomStartPos());
    scene.add(cube2);
 
    //moveObjByDiff(cube2, cube1.position, 1);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var update = function () {
        // move
        moveObjByDistDiff(cube2, cube1.position, 2, 0.125);
        // check distance
        if (minDistCheck(cube2, cube1.position, 0.25)) {
            // if below min dist set new pos
 
            cube2.position.copy(newRandomStartPos());
        }
    };
 
    var lt = new Date(),
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update();
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
 
}
    ());
```

The result is then cube2 moving to cube1 and going slower as it gets closer to cube1. When cube2 gets to close to cube1 then a new random position is set for cube2, and the process starts all over again. In this example I am not just using the distance to method, but a whole bunch of methods in the Vector3 class all of which deserve a post, and a few examples on there own. 

For example take a look at the method that has to do with getting a new random position, in there I am creating a new Vector, and then calling the random method to make it so that all the values for the vector are random numbers between 0 and 1. I then want to make sure that I get a vector that will be going in all possible directions, so I subtract 0.5 from all axis values. The [normalize](/2021/06/14/threejs-vector3-normalize/) method make sure that I am dealing with a vector that has a vector unit length of 1, which can then be easily scaled up to any distance from the origin by just multiplying.

## 3 - Using length, and distance to methods to set opacity and rotation with group of mesh objects

The length method is a way to go about getting the current vector unit length which is also a kind of distance to the origin of the Vector at least. In some cases then this length can be used as a way to get the value that I want it is just the it will always be the distance to the origin rather than another point of interest. In this example I am using the length method to get the distance to the origin and I am using that as a way to set an opacity effect. On top of this I am also using the distance to method but to create another kind of effect that has to do with the rotation of the mesh objects.


```js
(function () {
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // opaicty effect using length method which is distance to origin
    let opacityEffect = (mesh) =>  {
        mesh.material.opacity = 1 - mesh.position.length() / 5;
    };
    // rotation effect using the distanceTo method
    let rotationEffect = (group, mesh) =>  {
        let minDist = 5;
        group.children.forEach( (child) => {
            mesh.lookAt(0, 0, 0);
            if(child != mesh){
                let d = mesh.position.distanceTo(child.position);
                if(d < minDist){
                    let p = d / minDist;
                    let ud = mesh.userData;
                    ud.rp += p;
                    ud.rp %= 1;
                    mesh.rotation.z += Math.PI / 180 * ud.maxDegPerChid * ud.rp;
                }
            }
        })
    };
    // get a start position by passing two values that are 0 - 1
    let getStartPosition = (a, b) => {
        a = a === undefined ? 0 : a;
        b = b === undefined ? 0 : b;
        let pos = new THREE.Vector3( 5, 0, 0);
        let e = new THREE.Euler(0, a * Math.PI * 2, b * Math.PI * 2);
        return pos.applyEuler(e);
    };
    // get a seeded random start position
    let getSeededRandomStartPosition = function(){
        return getStartPosition(
            THREE.MathUtils.seededRandom(), 
            THREE.MathUtils.seededRandom() );
    };
    // set new mesh user data
    let newMeshUserData = (mesh) => {
        // user data
        let ud = mesh.userData;
        ud.startPos = getSeededRandomStartPosition();
        ud.alphaDelta = 0.1 + 0.5 * THREE.MathUtils.seededRandom();
        ud.alpha = 0;
        ud.rp = 0;
        ud.maxDegPerChid = 5 + 355 * THREE.MathUtils.seededRandom();
    };
    // create group
    let createGroup = (count) => {
        count = count === undefined ? 10 : count;
        let group = new THREE.Group();
        let i = 0;;
        while(i < count){
            // create mesh object
            let mesh = new THREE.Mesh( 
                new THREE.BoxGeometry(1,1,1), 
                new THREE.MeshNormalMaterial({
                    transparent: true
                }) );
            // user data
            let ud = mesh.userData;
            newMeshUserData(mesh);
            // start pos, lookAt, add to group
            mesh.position.copy( ud.startPos );
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update group
    let updateGroup = function(group, secs){
        secs = secs === undefined ? 0 : secs;
        group.children.forEach( (mesh) => {
            let ud = mesh.userData;
            ud.alpha += ud.alphaDelta * secs;
            ud.alpha = ud.alpha > 1 ? 1 : ud.alpha;
            // new positon using start pos in userData and lerping from there
            mesh.position.copy(ud.startPos).lerp( new THREE.Vector3(), ud.alpha );
            // new data if alpha === 1
            if(ud.alpha === 1){
                newMeshUserData(mesh);
            }
            // opaicty effect
            opacityEffect(mesh);
            rotationEffect(group, mesh);
        });
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    let scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    let camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    let group1 = createGroup(80);
    scene.add(group1);
    let group2 = createGroup(20);
    group2.position.set(-10, 0, 0);
    scene.add(group2);
    let group3 = createGroup(20);
    group3.position.set(0, 0, -10);
    scene.add(group3);
    //-------- ----------
    // LOOP
    //-------- ----------
    let lt = new Date(),
    fps = 30;
    let loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroup(group1, secs);
            updateGroup(group2, secs);
            updateGroup(group3, secs);
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
```

## Conclusion

That will be it for now at least when it comes to the distance to method in threejs, there is of course way more examples that I could make, but I only have some much time to work with. There are a lot of other related topics that I might not have go to just yet when it comes to distance to such as the subject of collision detection. The distance to method could be used to rig up a crud yet effective kind of collection detection that has to do with a spherical distance from one point to another of course, but there are other things to work with that might be a better option when it comes to that sort of thing.