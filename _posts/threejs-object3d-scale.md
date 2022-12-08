---
title: Scale Mesh Objects, Groups, and so forth in threejs
date: 2021-05-11 09:40:00
tags: [three.js]
layout: post
categories: three.js
id: 864
updated: 2022-12-08 11:49:54
version: 1.40
---

In [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there is the [scale property of the object3d class](https://threejs.org/docs/index.html#api/en/core/Object3D.scale) that stores an instance of the [vector3 class](https://threejs.org/docs/#api/en/math/Vector3) in terms of its value. By default the values for this Vector3 value are 1,1,1 which means that the scale of the object is 1 for each axis of the object. I can then change what the values are for this vector3 object making them higher or lower, and by doing so I will end up changing the scale of the object.

This then will be a post on using the scale property of the Object3d class that is a base class of [Mesh objects](/2018/05/04/threejs-mesh/), and many other such objects in three.js. In the process of doing so I will end up also writing about many other three.js, and javaScript related topics as they come up as well.

<!-- more -->

## The Object3d scale property and what to know first

I trust that you have covered the basics at least when it comes to [getting up and running with three.js](/2018/04/04/threejs-getting-started/) and javaScript in general. This post is intended for people that have at least some background with javaScript, and have worked out at least a few simple examples of three.js for starters. I will be keeping the examples here fairly simple, at least at the top of the post, but there are still some basic things you should know about before continuing to read this. As such I like to use these opening sections of my blog posts to write about at least a few things that you might want to read up more on before continuing to read the rest of the content.

<iframe class="youtube_video" src="https://www.youtube.com/embed/jpcjC3jedrQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Check out my main post on the Vector3 class

The value of the scale property of an object3d based object is an instance of the Vector3 class. There are a whole lot of useful features to work with in this class so it might be a good idea to read my main blog post on the [Vector3 class](/2018/04/15/threejs-vector3/). I will be writing about many of the features of this class in this post of course but there is a lot more to be aware of with this one. Also setting scale is just one use case example of the Vector3 class and this seems to be something that comes up all the time when working with a threejs project. So it makes sense to get solid with everything that there is to work with when it comes to this class.

### Read up more on Object3d in general if you have not done so

If you are still relatively new to threejs, and have not done so before hand, it would be a good idea to [learn more about the object3d class in detail](/2018/04/23/threejs-object3d/) beyond just that of the scale property. In this post I am just going to be focusing on a few examples that just have to do with this one little property of this base class, but there is much more to know about it in general. The Object3d class is a base class for Mesh objects in three.js, but it is also a base class for many other major objects in the library also such as Camera, Group, and even whole Scene objects. So learning a thing or two about an object3d feature can often apply to a wide range of other objects that are based off of object3d.

### Source code is on Github

The examples in this post and my many other posts on threejs can be [found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-scale). This is also where I park all the source code for my many [other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter with three.js

When I wrote this post for the first time I was using revision 127 of three.js which was release in April of 20201, and the last time I came around to doing a little editing I was using r146. It would seem that much has not changes with the Object3d scale property and the Vercor3 class to which the scale property is an instance of. However it is still possible that the code examples here might break with future versions of three.js.

### 1.1 - The Vector3 set method

For a very basic example of using scale there is just simply using the set method of the Vector3 class. This way I can call the set method off of the scale property and then give the values that I want for each axis value.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(5,5,5);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.scale.set(6, 4, 2); // using the Vector3 set method
scene.add(box);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

### 1.2 - The Vector3 Multiply Scalar Method

Another way to quickly scale up and object by way of all axis values at once would be to use the [multiply scalar method](/2022/03/23/threejs-vector3-multiply-scalar/) to do so. This can be called just once off of the scale property and then I can give just a single value that will then be applied to all the axis values of the Vector3 object.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(5,5,5);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.scale.multiplyScalar(5); // Multiply Scalar
scene.add(box);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

### 1.3 - Mesh copy method example

Now for a basic example of the scale property of the Object3d class that involves a few Mesh objects. In this example I am creating just a single Mesh object with the Mesh Constructor that uses the BoxGeometry and the Normal Material. I am then using the copy method of that mesh object instance to create to copies on this mesh object. I can then change the scale of these copies with the scale property of them and that will change the scale of these copies without effecting the original. The copy method will not fully deep clone the mesh object though when it comes to things like the geometry and material of the mesh object though, however for this example, and the scale property alone things work as expected.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, -2);
const copy1 = box.clone();
copy1.scale.set(0.5, 0.5, 0.5);
copy1.position.set(0, 0, 0);
const copy2 = box.clone();
copy2.scale.set(0.25, 0.25, 0.25);
copy2.position.set(0, 0, 1.25);
scene.add(box);
scene.add(copy1);
scene.add(copy2);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

## 2 - Group example of the Object3d Scale property

The Object3d class is not just the base class of Mesh objects but other classes of objects also such as [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/) for example. What is great about this is that I can use the scale property to not just adjust the scale of a single mesh object, but also a collection of mesh objects as well when it comes to setting the scale property of a Group. 

When creating a group I can use the add method of a group, which is also a method of Object3d actually, and pass an instance of a Mesh, Camera, or anything based on object3d even another Group. When I do so what I pass to the add method becomes a child of that object, and by doing so setting a value for the scale property of that parent object will also effect all children of that object. In this example I am once again creating a few copies of a Mesh object, and using the scale property to adjust the scale of the copies of this mesh object, but I am then also adding all of the mesh objects to a group. This is all done in a helper function to which I return the group as the return value of the helper function. The scale property can then be adjusted with the resulting group also to adjust the scale of the group that is returned, and I can also make more than one instance of this group of mesh objects.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(7,7,7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// HELPERS
// ---------- ---------- ----------
const createCubeGroup = function () {
    const size = 1,
    scale = 1 / 2,
    halfScale = scale / 2;
    const group = new THREE.Group();
    const box = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    group.add(box);
    let i = 0;
    const len = 4;
    while (i < len) {
        const copy1 = box.clone(),
        r = Math.PI * 2 / 4 * i,
        x = Math.cos(r) * 1,
        z = Math.sin(r) * 1;
        copy1.scale.set(scale, scale, scale);
        copy1.position.set(x, 0, z);
        group.add(copy1);
        i += 1;
    }
    return group;
};
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
// group1 with DEFAULT SCALE
const group1 = createCubeGroup();
group1.position.set(0, 0, 0);
scene.add(group1);
// group2 with 0.5 SCALE
const group2 = createCubeGroup();
group2.scale.set(0.5, 0.5, 0.5);
group2.position.set(3, 0, 3);
scene.add(group2);
// group3 with 2 SCALE
const group3 = createCubeGroup();
group3.scale.set(2, 2, 2);
group3.position.set(-3, 0, -3);
scene.add(group3);
// ---------- ---------- ----------
//  RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

I often do something to this effect when it comes to creating a crude model using just the built in three.js constructors for geometry and materials. There is just using all the properties and methods of the Object3d class and Mesh objects that are based off of it to create objects that compose a grater whole. The scale property can then be used to change the size of parts of the model as well as an instance of a model itself. I have a few threejs project examples in that also function as these kinds of projects such as [my guy one model](/2021/04/29/threejs-examples-guy-one) and my first [tree model](/2019/07/30/threejs-examples-tree/). However there is also looking into how to go about exporting from blender as well which might be the best way of going about doing this sort of thing.

## 3 - Scaling Buffer Geometry once and then using object3d scale method

There is also the scale method of the buffer geometry class that can also come into play when doing this sort of thing. The scale method of the buffer geometry class is what I would want to use just once to adjust what the base size of the geometry of a mesh should be to begin with. For example say I load a source geometry of a guy model and the height of the guy is to small for what I would want the default 1 1 1 scale should be. Once way to fix this would be to edit the source geometry, but another way to fix it on the fly would be to just use the buffer geometry scale method once to adjust what the size of the geometry is to begin with.

I will want to call the scale method of the geometry just once as it will take some overhead to do this. After that any additional scaling can be done with the object3d scale method.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(7,7,7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
// a 'source geometry'
const geo_source = new THREE.BoxGeometry(0.5, 2, 0.5);
// making a new geometry by cloning the source, and then
// scaling the geometry once
const geo = geo_source.clone();
geo.scale(4, 3, 2);
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
mesh1.position.y = 3;
scene.add(mesh1);
// ---------- ----------
// GET SIZE
// ---------- ----------
mesh1.geometry.computeBoundingBox();
const size = new THREE.Vector3();
mesh1.geometry.boundingBox.getSize(size);
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
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs( 0.5 - a1) / 0.5;
    const yScale = 1 - 0.8 * a2;
    mesh1.scale.set(1, yScale, 1);
    mesh1.position.y = size.y / 2 * yScale;
    camera.lookAt(mesh1.position);
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

## 4 - An Animation example of scale along with many other object3d features

So then the scale property can be used to set the scale of a single mesh object, and because it is a property of a base class the same property can also be used to set the scale of a group of mesh objects also. So now there is getting into having some fun with this and starting to create some kind of interesting animation or something to that effect just for the sake of exercise. In this example I will be going over a more advanced example of the scale property for single mesh objects, as well as group objects. On top of the use of the scale property I will also be making use of other note worthy aspects of the Object3d class that come into play when making a complex three.js project such as the [user data object](/2021/02/16/threejs-userdata/), position, and rotation properties of the bject3d class.

### 4.1 - The Cube Group module example

It is time to start breaking things down a little now, so for this example I made a stand alone module that I will be using to create a group of mesh objects. In the module I have two public methods one of which is used to create a single group of mesh objects, and the other is used to apply an update effect to the values of one of these groups of mesh objects.

```js
(function (api) {
    // get per values for the current frame and max frame
    const getPerValues = function (frame, maxFrame, base) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 100 : maxFrame;
        base = base || 2;
        const per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        return {
            frame: frame,
            maxFrame: maxFrame,
            fps: 30,
            per: per,
            bias: bias,
            base: base,
            biasLog: Math.log(1 + bias * (base - 1)) / Math.log(base)
        };
    };
    // create group helper
    const createGroup = function () {
        const size = 1,
        scale = 1 / 2,
        halfScale = scale / 2;
        const group = new THREE.Group();
        const box = new THREE.Mesh(
                new THREE.BoxGeometry(size, size, size),
                new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        group.add(box);
        let i = 0;
        const len = 4;
        while (i < len) {
            const copy1 = box.clone(),
            r = Math.PI * 2 / 4 * i,
            x = Math.cos(r) * 1,
            z = Math.sin(r) * 1;
            copy1.scale.set(scale, scale, scale);
            copy1.position.set(x, 0, z);
            group.add(copy1);
            i += 1;
        }
        return group;
    };
    // create the full group object with user data
    api.create = function (opt) {
        opt = opt || {};
        const group = createGroup(),
        ud = group.userData;
        ud.perObj = getPerValues(
                opt.frame === undefined ? 0 : opt.frame,
                opt.maxFrame === undefined ? 0 : opt.maxFrame);
        return group;
    };
    // update
    api.update = function (cubeGroup, secs) {
        const ud = cubeGroup.userData,
        perObj = ud.perObj,
        s = 0.25 + 0.75 * perObj.biasLog;
        // SET CURRENT SCALE
        cubeGroup.scale.set(s, s, s);
        cubeGroup.rotation.z = Math.PI * 2 * perObj.per;
        // update frame and perObj
        perObj.frame += perObj.fps * secs;
        perObj.frame %= perObj.maxFrame;
        ud.perObj = getPerValues(perObj.frame, perObj.maxFrame);
    };
}
    (this['CubeGroup'] = {}));
```

Now that I have all the logic that has to do with a group of mesh objects pulled out into this external module I am going to want to create just a little more additional code that will make use of this module. In the main javaScript file I still create my scene, camera, and renderer as always. However now I am creating a state object that will contain a group that will be a collection of these cube groups that I will be making with the cube group module. I also have a main animation loop in which I am making use of the request animation frame method to create an animation type product rather than just a static scene.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(7,7,7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// STATE
// ---------- ---------- ----------
const state = {
    lt: new Date,
    fps: 30,
    groups: new THREE.Group()
};
scene.add(state.groups);
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
// Groups created with the module
let i = 0;
const len = 6, radius = 3
while (i < len) {
    const radian = Math.PI * 2 / len * i;
    const x = Math.cos(radian) * radius;
    const z = Math.sin(radian) * radius;
    const group = CubeGroup.create({
            frame: Math.floor(120 * (i / len)),
            maxFrame: 120
        });
    state.groups.add(group);
    group.position.set(x, 0, z);
    i += 1;
}
// ---------- ---------- ----------
// LOOP
// ---------- ---------- ----------
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        state.groups.children.forEach(function (group, i) {
            CubeGroup.update(group, secs);
        });
        state.groups.rotation.x += Math.PI / 180 * 5 * secs;
        state.groups.rotation.x %= Math.PI * 2;
        state.groups.rotation.y += Math.PI / 180 * 10 * secs;
        state.groups.rotation.y %= Math.PI * 2;
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
```

The end result of this is then a ring of these cube groups rotating and scaling up and down. Looks kind of cool, but there is much more that could be done when it comes to really going off the rails with this. I could maybe create additional modules like this cube group that create additional effects with groups of mesh objects, there is also a great deal more that could be done with materials and lighting.


## Conclusion

The scale property of object3d can then be used to change the scale of a Mesh object, and many other such objects in three.js. The scale property can the be used along with many other useful methods of Object3d and Mesh objects such as position, rotation, and copy to create interesting artful animations and projects just using the built in geometry and material constructors.

I have a whole lot more ideas that come to mind for examples with the scale property of course, however maybe I should save a lot of them for my growing collection of [three.js project examples](/2021/02/19/threejs-examples/). This is just a single blog post on this one little topic of three.js development and the final example that I have made for this is all ready starting to look like some kind of major deal.

