---
title: Scale Mesh Objects, Groups, and so forth in threejs
date: 2021-05-11 09:40:00
tags: [three.js]
layout: post
categories: three.js
id: 864
updated: 2021-05-11 13:53:51
version: 1.14
---

When it comes to [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) I am trying to think in terms of what the long term plan is, but I have also found that I still need to write a post or two here and there on the basics also, and one thing that I have not got around to yet is the [scale property of the object3d class](https://threejs.org/docs/index.html#api/en/core/Object3D.scale). This scale property contains an instance of vector3 that by default will contain a value of one for each axis. As you might expect setting a fraction for one of the axis values will start to make the object based off of object3d smaller for that axis, while setting a value above one will start to make the object bigger.
This then will be a post on using the scale property of the Object3d class that is a base class of Mesh objects, and many other such objects in three.js. In the process of doing so I will end up also writing about many other three.js, and javaScript related topics.

<!-- more -->

## 1 - The Object3d scale property and what to know first

I trust that you have covered the basics at least when it comes to getting up and running with three.js and javaScript, as i will not be getting into detail with that here. This post is intended for people that have at least some background with javaScript, and have worked out at least a few simple examples of three.js for starters. I will be keeping the examples here fairly simple, at least at the top of the post, but there are still some basic things you should know about before continuing to read this.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using revision 127 of three.js

### 1.2 Read up more on Object3d in general if you have not done so

If you are still relatively new to threejs, and have not done so before hand, it would be a good idea to [learn more about the object3d class in detail](/2018/04/23/threejs-object3d/) beyond just that of the scale property. In this post I am just going to be focusing on a few examples that just have to do with this one little property of this base class, but there is much more to know about it in general. The Object3d class is a base class for Mesh objects in three.js, but it is also a base class for many other major classes in he library also such as Camera, Group, and even Scene.

## 2 - Basic Object3d Scale example with a Mesh and the Mesh copy method

First off a very basic example of the scale property of the Object3d class that involves a Mesh object. In this example I am creating just a single Mesh object with the Mesh Constructor that uses the BoxGeometry and the Normal Material. I am then using the copy method of that mesh object instance to create to copies on this mesh object. I can then change the scale of these copies with the scale property of them and that will change the scale of these copies without effecting the original. The copy method will not fully deep clone the mesh object though when it comes to things like the geometry and material of the mesh object though, however for this example, and the scale property alone things work as expected.

```js
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, -2);
 
var copy1 = box.clone();
copy1.scale.set(0.5, 0.5, 0.5);
copy1.position.set(0, 0, 0);
var copy2 = box.clone();
copy2.scale.set(0.25, 0.25, 0.25);
copy2.position.set(0, 0, 1.25);
 
// scene
var scene = new THREE.Scene();
scene.add(box);
scene.add(copy1);
scene.add(copy2);
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Group example of the Object3d Scale property

The Object3d class is not just the base class of Mesh objects but other classes of objects also such as THREE.Group for example. What is great about this is that I can use the scale property to not just adjust the scale of a single mesh object, but also a collection of mesh objects also when it comes to setting the scale property of a Group. 

When creating a group I can use the add method of a group, which is also a method of Object3d actually, and pass an instance of a Mesh, Camera, or anything based on object3d even another Group. When I do so what I pass to the add method becomes a child of that object, and by doing so setting a value for the scale property of that parent object will also effect all children of that object. In this example I am once again creating a few copies of a Mesh object, and using the scale property to adjust the scale of the copies of this mesh object, but I am then also adding all of the mesh objects to a group. This is all done in a helper function to which I return the group as the return value of the helper function. The scale property can then be adjusted with the resulting group also to adjust the scale of the group that is returned, and I can also make more than one instance of this group of mesh objects.

```js
var createCubeGroup = function () {
    var size = 1,
    scale = 1 / 2,
    halfScale = scale / 2;
    var group = new THREE.Group();
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    group.add(box);
    var i = 0,
    len = 4;
    while (i < len) {
        var copy1 = box.clone(),
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
 
// scene
var scene = new THREE.Scene();
var grid = new THREE.GridHelper(7, 7);
scene.add(grid);
 
// group1 with DEFAULT SCALE
var group1 = createCubeGroup();
group1.position.set(0, 0, 0);
scene.add(group1);
 
// group2 with 0.5 SCALE
var group2 = createCubeGroup();
group2.scale.set(0.5, 0.5, 0.5);
group2.position.set(3, 0, 3);
scene.add(group2);
 
// group3 with 2 SCALE
var group3 = createCubeGroup();
group3.scale.set(2, 2, 2);
group3.position.set(-3, 0, -3);
scene.add(group3);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

I often do something to this effect when it comes to creating crude models using just the built in three.js constructors for geometry and materials. There is just using all the properties and methods of the Object3d class and Mesh objects that are based off of it to create objects that compose a grater whole. The scale property can then be used to change the size of parts of the model as well as an instance of a model itself.

## 4 - An Animation example of scale along with many other object3d features

So then the scale property can be used to set the scale of a single mesh object, and because it is a property of a base class the same property can also be used to set the scale of a group of mesh objects also. So now there is getting into having some fun with this and starting to create some kind of interesting animation or something to that effect just for the sake of exercise. In this example I will be going over a more advanced example of the scale property for single mesh objects, as well as group objects. On top of the use of the scale property I will also be making use of other note worthy aspects of the Object3d class that come into play when making a complex three.js project such as the user data object, position, and rotation properties of the bject3d class.
### 4.1 - The Cube Group module

```js
(function (api) {
 
    var getPerValues = function (frame, maxFrame, base) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 100 : maxFrame;
        base = base || 2;
        var per = frame / maxFrame,
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
 
    var createGroup = function () {
        var size = 1,
        scale = 1 / 2,
        halfScale = scale / 2;
        var group = new THREE.Group();
        var box = new THREE.Mesh(
                new THREE.BoxGeometry(size, size, size),
                new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        group.add(box);
        var i = 0,
        len = 4;
        while (i < len) {
            var copy1 = box.clone(),
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
        var group = createGroup(),
        ud = group.userData;
        ud.perObj = getPerValues(
                opt.frame === undefined ? 0 : opt.frame,
                opt.maxFrame === undefined ? 0 : opt.maxFrame);
        return group;
    };
    // update
    api.update = function (cubeGroup, secs) {
        var ud = cubeGroup.userData,
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

### 4.2 - The main javaScript file

```js
// scene
var scene = new THREE.Scene();
 
var state = {
    lt: new Date,
    fps: 30,
    groups: new THREE.Group()
};
scene.add(state.groups);
 
// a group created with the cube group module
var i = 0,
len = 6,
radius = 3,
radian, x, z;
while (i < len) {
    radian = Math.PI * 2 / len * i;
    x = Math.cos(radian) * radius;
    z = Math.sin(radian) * radius;
    var group = CubeGroup.create({
            frame: Math.floor(120 * (i / len)),
            maxFrame: 120
        });
    state.groups.add(group);
    group.position.set(x, 0, z);
    i += 1;
}
 
var grid = new THREE.GridHelper(7, 7);
scene.add(grid);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var loop = function () {
    var now = new Date(),
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

## 5 - Conclusion

The scale property of object3d can then be used to change the scale of a Mesh object, and many other such objects in three.js. The scale property can the be used along with many other useful methods of Object3d and Mesh objects such as position, rotation, and copy to create interesting artful animations and projects just using the built in geometry and material constructors.

