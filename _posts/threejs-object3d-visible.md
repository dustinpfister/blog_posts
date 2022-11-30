---
title: Making objects visible or not in three.js
date: 2021-05-24 12:31:00
tags: [three.js]
layout: post
categories: three.js
id: 873
updated: 2022-11-30 14:47:53
version: 1.36
---

There should be a standard way to go about making an object in [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) visible or not just like that of the [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) and [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) css properties when it comes to styling some html. It would seem that there is such a standard property which would be the [visible property of the Object3d class](https://threejs.org/docs/#api/en/core/Object3D.visible), this property is a Boolean value that is set to true by default. The state of the visible Boolean is used as a way to inform a renderer if a given object such as a [mesh object](/2018/05/04/threejs-mesh/) should even be rendered or not to begin with. 

However it is true there are also a number of other subjects of interest such as setting the [transparency property of materials](/2021/04/21/threejs-materials-transparent/) for example that will will still make an object render, it is just that an opacity value can be set to zero that will have a similar visual effect. There is also just simply moving an object out of view of the camera of course which might often prove to be a quick, brainless way to get this done and move on. Other option that comes to mind would involve moving mesh objects from one group that is added to a [scene object](/2018/05/03/threejs-scene/) to another group that is not. Yet another way to active this kind of effect would be to make use of the [layers feature of threejs](/2021/06/04/threejs-object3d-layers/) as well which is yet even another option.

So in this post I will of course be going over the object3d visible property, but I will also be going over a number of other related topics and code examples so that might also be better ways of getting a desired result when it comes to the visibility of an object in three.js.
<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/ZbQaP60OaVo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Visibility of objects in threejs and what to get solid first

This is a post on threejs and how to go about making object3d based objects in a scene visible or not. I will not be [getting into the very basics details on threejs](/2018/04/04/threejs-getting-started/) here as I assume that you have gone beyond the basics. I will be trying to keep many of these examples fairly simple though so that they might still not be that far beyond people that are new to threejs. However there are maybe still a few things that you should be aware of, or refresh a little with, before continuing reading the rest of this post. So in this section I will be going over some things and link to addtional posts.

### Might want to read up more on Object3d in general

One way to go about making a mesh object visible or not is to just set the visible property of the mesh to false and be done with it. This visible property is not a property of a Mesh object though but the base class of mesh which is object3d. There are a great number of other features in object3d and other classes in three.js that are based off of object3d such as groups. 

It is not like using the visible property is the only way to go about doing this sort of thing and just using the visible property may fall short. For example by just setting the visible property of a mesh in a group to false that will make it so it will not be visible, but it will still be in the group, and as such will still be subject to any kind of update procedure. So maybe a better way would be to have two groups one added to the scene and one not added to it and just move mesh objects between the two as a way to achieve a similar effect to that of using the visible property. In order to do so I would want to use a number of other features in the object3d class when it comes to adding and removing mesh objects from a parent object such as a group. 

In this post I will be going over some examples that have a lot to do with object3d and how to use features of the class to make objects visible or not. However this object3d class is worth spending a fair about of time to work with just to get a fell for what there is to work with when using this class. So you might want to check out [my main post on object3d](/2018/04/23/threejs-object3d/) that might prove to be a good resource for learning more about this class in general.

### There are also properties of materials that might be of interest

There is a lot to be said about the object3d class and how that can be used to make it so objects will or will not show up in a scene. However there is also maybe a thing or two to be said about the [materials that are used to skin mesh objects](/2018/04/30/threejs-materials/). Many materials will support a transparency boolean that when set will apply a transparency effect for the material, and opacity property can then be set form 0 to 1 to set the level of transparency for the material.

### Source code is up on Github

The Source code examples in this post can also be found in my [test threejs github repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-visible).

### Version Numbers matter in three.js

When I wrote this post and made the examples for it I was using threejs version r127, which was still a fairly late version of threejs at the time of this writing. The last time I came around to do a little editing I was able to get all the examples working fine with r146. I have found that I just need to mention what versions I was using when writing a post on threejs, and that doing so is impotent more so than many other libraries that move a little slower when it comes to development.

## 1 - Basic Examples of Object3d visible prop

In this section I will be starting out with a few basic examples of the Object3d visible property. Nothing to fancy in this section as I will want to keep that sort of stuff for later sections in this post. These will then be very simple examples that should be able to be just copied over and work assuming that you have threejs links to at least, and it is a revision that will work with these examples.  

### 1.1 - Toggling the visible Boolean off and on in a loop

Here then I have an example where I am just creating a single mesh object, and then adding the mesh to the scene. I then have a simple loop where I am toggling the Boolean value of the visible property from true to false or back again a set number of times per second. When it comes to the loop method I have an FPS const that will be used to set the number of times to toggle the visibility. The way that I go about toggling this back and forth is by just making use of the [JavaScript not operator](/2019/10/14/js-not/) in core JavaScript which is an exclamation point.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const fps = 2;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        box.visible = !box.visible;
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

That is it more or less when it comes to just using the visible boolean, sure the conditions that are used to set the value of the property might change up a little now and then. However if I just simple want to set the visibly of an object to false without having to do something like removing a reference from one group and placing it into a pool or sorts, or setting the position of the mesh to a distance far away from the camera or something to that effect this will work.

### 1.2 - Conditional example

Although there is just simply toggling the Boolean value on and off, typically when working on some kind of actual project I will want to set the visibility based on some kind of condition. So for this example I am creating and updating a whole bunch of values that are used to set the position of a mesh object over time. I am then using a condition, in this case if the distance to the origin is below 1 or above or equal to 4 as a way to set the visibility to false. Otherwise in my loop I set the visible to true by default every time.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
const v_home = new THREE.Vector3(1, 0, 0);
const e = new THREE.Euler(0,0,0);
let degree = 45;
let dps = 90;
let vector_unit_length = 3;
let frame = 0;
const FRAME_MAX = 300;
let lt = new Date();
const fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // update values use to set position
        e.y = Math.PI / 180 * degree;
        degree += dps * secs;
        delree = THREE.MathUtils.euclideanModulo(degree, 360);
        const a1 = frame / FRAME_MAX;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        vector_unit_length = 5 * a2;
        // update position and rotation
        box.position.copy(v_home).applyEuler(e).normalize().multiplyScalar(vector_unit_length);
        box.lookAt(0, 0, 0);
        // SETTING VIABLE BY WAY OF A CONDITION
        box.visible = true;
        const d = box.position.distanceTo( new THREE.Vector3(0,0,0));
        if(d < 1 || d >= 4 ){
            box.visible = false;
        }
        // step frame
        frame += 1;
        frame %= FRAME_MAX;
        // render
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

## 2 - There is just moving an object out of range of the camera

The visibility property of an object is one way to make it so an object is not visible, however there are of course many ways to go about getting a similar result. One of which would be to just move the object out of range of the render distance of the [camera](/2018/04/06/threejs-camera/) that is being used with the render method of the renderer that I am using. The typical camera that I often use for an example is the [perspective camera](/2018/04/07/threejs-camera-perspective/) and with the kind of camera there is the near and var values of the camera. The near and far values can be set via arguments when calling the constructor of the perspective camera, or I can set the values of them later on and call the update projection matrix method. If I then just simply move a mesh object to a location where the object is just to near, or to far away from the camera, then the object will not render.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20))
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(8,8,8);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// CAMERA STATE
//-------- ----------
let near = 8.25,
far = 20,
maxDist = 10;
camera.near = near;
camera.far = far;
camera.updateProjectionMatrix();
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
frame = 0,
maxFrame = 240,
fps = 15;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // CHANGING POSITION OF BOX SO THAT IT GOES IN ANY OUT OF THE RENDER RANGE OF THE CAMERA
        const dist = maxDist - (maxDist * 2) * bias;
        box.position.x = dist * -1;
        box.position.z = dist * -1;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

In this example I am just simply using the [position property of a mesh object](/2022/04/04/threejs-object3d-position/) to move that mesh object into and out of range of a camera as a way to make the mesh visible and not visible by just making use of the near and far value of the camera as a means to do so. There is also the idea of not moving the mesh object, but moving the camera back and forth as a way to change the visibility of the mesh object. There is also yet even another way to go about doing so which would involve adjusting the near and far values of the camera and keep the camera and mesh in fixed locations. When doing so I need to call the update projection matrix method of the camera to update the state of the camera each time I adjust those kinds of values.

## 3 - Removing a child from the scene, or a group that was added to the scene

Maybe another important thing to keep in mind is that a mesh object will not render in a scene, if it is not a child of the scene. There is creating a mesh object and not adding it to a scene object that is passed to the render method, and when doing so the mesh will of course not render because it is not in that scene. So there is creating a reference to a mesh object, and then adding and removing that mesh object to and from the scene as needed.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
fps = 2;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // ADDING AND REMOVING CHILD
        const child = scene.getObjectById(box.id);
        if (child) {
            scene.remove(box);
        } else {
            scene.add(box);
        }
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

This kind of solution might prove to be the way that I will want to do things when it comes to visibility. The reason why is that it is often not just the visibility of a mesh that will be of interest when working on a project. For example say I have a group of mesh objects, and I am looping over the whole group on each update of the scene. If I just set the visibility of a mesh to false that will just make it no longer visible, it will still very much be a part of the group, and as such will still be part of the update cycle and that can often lead to undesired results. So a better way might be to create a group that will serve as an object pool of sorts, and this object pool does not need to be added to the scene object that will be passed to the render method. 

Mesh Objects can just be moved from this object pool to the scene or a group that will be subject to an update procedure and back again as needed. This way mesh objects that are not being used will not be visible, and they will also not be taken into account when updating the scene.

## Conclusion

So I hope that this post helps to clear up some things when it comes to setting the visibly of on object in threejs. If not then I guess you will just need to work out some additional examples of your own, and keep looking until you find or make something that will work for you. However just about every solution that comes to me will often just have to do with setting the visible Boolean on or off as needed, or some other kind of solution where I create and update a group as needed by adding and removing objects to and from it.

At some point in the future I may get around to editing this post a little, and when doing so I will often expand the post with at least one or two additional examples that have to do with the subject matter of the post. I am sure that there are a great number of other things to write about when it comes to the topic of visibility of mesh objects in threejs, but still there is really only so much more to write about with this I think. Well at least I can say that when it comes to the very basics of this sort of thing at least.


