---
title: Getting world position of any Object3D Class based object in three.js
date: 2021-05-25 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 874
updated: 2022-10-12 14:35:04
version: 1.28
---

In [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is [getting into using groups](https://threejs.org/docs/#api/en/objects/Group) as a way to compartmentalize a collection of [mesh objects](/2018/05/04/threejs-mesh/). When doing so there is using the [look at method](https://threejs.org/docs/#api/en/core/Object3D.lookAt) to get a mesh to look at another child object of the group, or some other group in an over all [scene object](/2018/05/03/threejs-scene/). 

When Working with nested objects, and the look at method of the objecy3d class, it is important to remember that the look at method will always have the object to look at something relative to world space, not local space, or space relative to the parent object if you prefer. To help with these kinds of problems there is the [get world position method of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.getWorldPosition) that when called will return the position of an object relative to world space, rather than the position property of the object which is a position relative to the group rather than world space. There is one weird thing about it though which is that a target vector3 instance must be given when it comes to late versions of threejs at least r135+ last I checked.

Knowing the difference between world space, and space that is relative to a group, or any object that is based off of Object3d is one of the many little details that one should get familiar with at one point or another when it comes to making projects with three.js. So in this post I will be addressing this issue with some source code that has to do with nested mesh objects and the use of this get world space method.


<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/H9jAlG9fOa8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Getting world position in threejs and what to know first

In this post I will be writing about the [get world position method in the object3d base class](https://stackoverflow.com/questions/15098479/how-to-get-the-global-world-position-of-a-child-object) in the javaScript library known as three.js. So the content here has to do with just one little issue in an over all larger library that is written in a specific programing language called [javaScript](/2018/11/27/js-getting-started/). I assume that you have at least some basic working knowledge of how to get up and running with the basics at least, because I am not going to do that here in this post. However I always like to start off my three.js posts with a section like this in which I outline some things that you should be aware of before continuing to read the rest of the content.

### Read up more on the look at method of object3d and what it has to do with world space

There is working out not just one but many examples of the [look at method](/2021/05/13/threejs-object3d-lookat/) of the object3d class to get a feel for where and when the method is useful, but also to become aware of the drawbacks in some situations. The methods works great but it will always look at a position that is relative to world space. Using the get world position method of the object 3d class can help with this, but even then there are some situations in which I am just going to need to work out another solution to set the orientation of an object.

### learn a thing or two about groups and object3d in general beyond just this post

The use of the get world position often ends up going hand in hand with the [use of groups](/2018/05/16/threejs-grouping-mesh-objects/), or in any way shape or form the use of objects that are a child of a parent object. That parent object can be a group, but it can also be anything that is based off of object3d, including even the scene object.

### The source code examples in this post are up on Github

The source code examples that I am writing about in this post can be found on Github in my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-get-world-position).

### Version numbers matter in three.js

When I first wrote this post I was using revision 127 of threejs which was a late version of threejs as of April of 2021, and the last time I came around to do some editing I was using r140. When I cam around to editing this post I have found that the basic example that I have made for this post did in fact break with r135. In older versions of threejs I did not have to give a target vector as the first and only argument, but now the method will not work if I do note give one. Code breaking changes are introduced to three.js all the time, this is just one of may examples of this sort of thing when it comes to code breaking changes with the pubic API. So if the code examples are not working as expected always check your version numbers first.

## 1 - Basic group example of look at using and not using get world position

In this example I am making a helper function that will create and return a group that I can then add to a scene object. This group object contains two mesh objects, one of which is a cone, and the other is a cube. In this helper function that creates the group I am doing a rotation of the geometry of the cone once to make it so that the orientation of the cone geometry lines up with the face of the mesh object. So it is now just a question of using the look at method of the cone mesh to have it point at something where the tip of the cone is facing the given direction.

So everything in my create group helper method seems to work just fine when it comes to creating a group with two children. So now there is just creating two instances of this group as a way to showcase what the difference is between just passing the position property of the cube to the look at method of the cone, compared to using the get world position method.

```js
var createGroup = function (color) {
    color = color || new THREE.Color(1, 1, 1);
    // creating a group
    var group = new THREE.Group();
    // creating and adding a pointer mesh to the group
    var geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
    geo.rotateX(Math.PI * 0.5);
    var pointer = group.userData.pointer = new THREE.Mesh(
            geo,
            new THREE.MeshNormalMaterial());
    pointer.position.set(0, 0, 0);
    pointer.rotation.y = 1.57; // BY DEFAULT THE POINTER IS NOT POINTING AT THE CUBE
    group.add(pointer);
    // creating and adding a cube
    var cube = group.userData.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 }));
    cube.position.set(0, 0, 1);
    group.add(cube);
    // box helper for the group
    group.add(new THREE.BoxHelper(group));
    return group;
};
 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
 
var group = createGroup(0xff0000); // group 1
scene.add(group);
group.position.set(-2.0, 0, 0.0);
var group2 = createGroup(0x00ff00); // group2
scene.add(group2);
group2.position.set(2.0, 0, 0.0);
 
// the first group in am just using the look at method, and passing
// the value of the cube.position instance of vector3. THIS RESULTS IN THE
// CONE NOT POINTING AT THE CUBE, but at the location of the cube if it where
// positioned relative to world space rather than a location relative to the group
group.userData.pointer.lookAt(group.userData.cube.position);
 
// IF I WANT TO HAVE THE POINTER LOOK AT THE CUBE
// THAT IS A CHILD OF THE GROUP, THEN I WILL WANT TO ADJUST
// FOR THAT FOR THIS THERE IS THE getWorldPosition METHOD
var v = new THREE.Vector3(0, 0, 0);
group2.userData.cube.getWorldPosition(v);
group2.userData.pointer.lookAt(v);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

With the group in which I am using the get world position method as a way to get a position to pass to look at the cone points to the cube that is inside the group. However the group where I am just passing the position of the cube to the look at method that cone is not pointing to the cube, it is however pointing to a position where the cube world be if that position value was relative to the world rather that the parent group object. So then this example helps to show the difference, and why in some cases I will want to use the get world position method when working with an object that is a child of a group.

## 2 - Animation loop examples

I would like to make at least one if not more videos for each of my blog posts on threejs, and this one is no exception. Also in order to really gain a good sense of what is going on with various things that have to go with world space and local space it would be best to make at least a few animation examples with this sort of thing.

### 2.1 - Animation example of the cone and cube groups

Here I have an animation example of the groups that contain a cone and a cube as a way to show what the difference is with world space compared to the typical local space that is given to the look at method of the object3d class. Once again I create two groups with the same create group helper function that returns a new group object with two child mesh objects. One child mesh object contains a cylinder geometry that is shaped like a cone, and the other mesh object is just a box geometry. I then also now have an update group helper function that will move the box geometry mesh around in a circle relative to the position of the group.

So then I am creating both groups with the same helper, and I am also updating the positions of the cubes with the same helper function as well. The difference in the update method of the animation loop though is that for group1 I am just passing the raw position of the child cube of group1 to the look a method that I am calling off the cone. This results in the cone looking in the direction of where the cube would be relative to world space. Often I will not want this to happen so I need to get the position of the cube relative to world space rather than just use the local space relative to the group. So to do this with group2 I am using the get world position method to copy the world relative location to a vector3 that I then use with the look at method, the end result is that the cone looks where the cube really is rather than where it would be if it where relative to the scene object rather than the group.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = function (color, x) {
    color = color || new THREE.Color(1, 1, 1);
    const group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
    geo.rotateX(Math.PI * 0.5);
    const pointer = group.userData.pointer = new THREE.Mesh(
            geo,
            new THREE.MeshNormalMaterial());
    pointer.position.set(0, 0, 0);
    pointer.rotation.y = 1.57;
    group.add(pointer);
    const cube = group.userData.cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 }));
    cube.position.set(0, 0, 1);
    group.add(cube);
    group.position.set(x, 0, 0);
    return group;
};
// update
const updateGroup = (group, alpha) => {
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * alpha;
    group.userData.cube.position.copy( new THREE.Vector3(1,0,0) ).applyEuler(e).normalize().multiplyScalar(1.5);
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(5, 5));
// just set up group1 and group2
const group1 = createGroup(0xff0000, -2);
scene.add(group1);
const group2 = createGroup(0x00ff00, 2);
scene.add(group2);
const helper1 = new THREE.BoxHelper(group1);
scene.add(helper1);
const helper2 = new THREE.BoxHelper(group2);
scene.add(helper2);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    // animate groups the same way
    let a = frame / frameMax;
    updateGroup(group1, a);
    updateGroup(group2, a);
    helper1.update();
    helper2.update();
    // with group1 I am just passing lookAt the LOCAL position of the cube
    group1.userData.pointer.lookAt(group1.userData.cube.position);
    // with group to I am USING GETWORLDPOSITION to get a vector to pass to lookAt
    const v = new THREE.Vector3(0, 0, 0);
    group2.userData.cube.getWorldPosition(v);
    group2.userData.pointer.lookAt(v);
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

The get world position method of the object3d class seems to work well for the sake of having a way to go about getting an instance of Vector3 that is relative to a fixed static world space rather than a parent instance of object3d such as a group, or even a scene. The look at method will always point to a position that it is given relative to world space, so it is nice to always have a way to go about getting that kind of position by just calling a method that will always return that kind of position.

Understanding the difference between positions that a relative to group, and positions that are relative to world space is an impotent part of the process of learning how to go about making crude yet effective models that are collections of mesh objects. As of this writing there are still a few ruff edges in my understanding of little topics like this, so each time I become aware of something that I think I should have solid by now I write a lengthly post such as this as a way to help me get a topic like this hardwired into my mind.

When it comes to additional reading in the long run sooner or later there is getting into starting to make some actual projects of one kind or another with three.js. With that said I have a [post that I have wrote that is my current standard collection of general threejs project example prototypes](/2021/02/19/threejs-examples/) for all kids of various things.



