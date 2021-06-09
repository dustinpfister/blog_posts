---
title: Grouping two or more Mesh Objects together in three.js
date: 2018-05-16 11:52:00
tags: [js,three.js]
layout: post
categories: three.js
id: 188
updated: 2021-06-09 14:18:26
version: 1.16
---

After writing a lot of demos in [three.js](https://threejs.org/) I have arrived at a point where it is time to start getting into some more advanced topics in three.js, or at least something new beyond just the very basics of getting started with the library. So with that said, it might be time for me to get into animation with three.js, but doing so the professional way will prove to be a little complicated, and it will also largly involve the use of an application like blender as a way to create models with animations. So another simple way of making some animations is to have Mesh Objects grouped together, and then have it so they are moving in relation to each other. In addition to this I can also have the whole group move by updating the position property of the group just like it was a single mesh object.

Also for one reason or another it is often a good idea to have a way to group two or more objects in general and not just mesh objects. For example I might want to add a light to a camera and then add the camera to a scene object. So this post today will be about the three.js [Group](https://threejs.org/docs/index.html#api/objects/Group) constructor, but a whole lot of what a group is about is also a feature of the [object3d class](https://threejs.org/docs/#api/en/core/Object3D) in general. So here I will be going over some of the basics when it comes to this sort of thing, but also I will likely touch base on many other related topics what will come up when creating groups of objects that have to do with rotating a geometry just once, and the difference between world space, and space that is relative to a group.

<!-- more -->

## 1 - Groups in threejs and what else to know

This is not a post on three.js for beginners, I have a post for that, and if you are still fairly to threejs you might want to [start by reading some kind of getting started post on threejs first](/2018/04/04/threejs-getting-started/). The main focus in this post has to do with creating a group of two or more or more [Mesh Object](/2018/05/04/threejs-mesh/) instances to create a single Group that can then be worked with by itself in a scene. These groups of objects can from complex shapes composed of many mesh objects using a collection of built in geometry constructors and materials. So then I assume that you have at least a basic working knowledge of three.js, and of course javaScript in general. 

### 1.1 - THREE.Object3D vs THREE.Group

When it comes to grouping two ore more Mesh Objects together it may be preferable to use the Group constructor in place of just using Object3D by itself. However as far as I can tell there is not much of any difference other than it makes the readability of your code more clear as to what the object is. The fat of the matter is that when it comes to grouping things together such a task can be done with any object that is based off the Object3d class. This includes Groups, Mesh objects, Cameras, various helpers, and even a whole Scene object.

### 1.2 - Version numbers matter

I also often try to mention that three.js is a project where the version number matters a great deal, in this post I am using [three.js r91](https://github.com/mrdoob/three.js/tree/r91).

## 2 - Basic Mesh Group example in three.js

For a basic example of grouping in three.js I put together a demo that involves creating a whole bunch of Mesh Object instances. Each time I create a mesh object I of course change a few values when it comes to the position of the mesh object. and then add it to a group ht was created with the THREE.Group constructor. I just used the simple plain old Box Geometry constructor for the geometry, and when with the Mesh basic material when it comes to skinning these mesh objects. When changing the positions of the mesh objects the positions are going to be relative to the position of the group rather than the main scene object, and for this example I am just positing them around the center of the group.

Each time I make a new Mesh I just add it to the instance of group rather than Scene, by doing this the origin of each Mesh is relative to the instance of Group rather than the Scene. Once that is done whenever I change the position, or rotation of the group it changes the position, and rotation of the whole group.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
 
    // CREATING A GROUP
    var group = new THREE.Group();
    var i = 0,
    radius = 2,
    count = 5;
    while (i < count) {
        // creating a mesh
        var bx = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    wireframe: true
                })),
        r = Math.PI * 2 / count * i;
        // set position of mesh
        bx.position.set(
            Math.cos(r) * radius,
            0,
            Math.sin(r) * radius);
        // add mesh to the group
        group.add(bx);
        i += 1;
    }
    scene.add(group);
 
    // Camera and Render
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 50);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Example of grouping with a camera

Grouping is basically whenever you use the add property of anything that inherits from the Object3D class. This includes things like cameras, as such I can use the add method to add things like lights, and a Mesh, and position them relative to the camera. Say for example I want to have a point light on top of camera, and a Mesh that is always in front of the camera as it moves around in a scene, no problem.

```js
// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 50);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
 
// positioning a light above the camera
var light = new THREE.PointLight();
light.position.set(0, 5, 0);
camera.add(light);
 
// positioning a mesh in front of the camera
var withCamera = new THREE.Mesh(
 
    new THREE.BoxGeometry(.1, .1, .1),
    new THREE.MeshStandardMaterial({
 
        color: 0xffffff,
        emissive: 0x1a1a1a
 
    })
);
withCamera.position.set( - .25, .2,  - .75);
camera.add(withCamera);
 
// adding the camera to the scene
scene.add(camera);
```

## 4 - Using Grouping when making a Model

Grouping comes in handy when I want to make a Constructor function that will include a group of Mesh Object instances that can be added to a Scene that will constitute some kind of model. The group will typically be one of many properties of the constructor, and will also contain methods that I can use on that group.

For a quick example of this I would place something like this in an external javaScript file called something like model.js:

```js
var Model = (function () {
 
    // the constructor
    var Mod = function (opt) {
 
        // this is what will be added to the Scene
        this.group = new THREE.Group;
 
        // set default, or use what is given
        opt = opt || {};
        this.radius = opt.radius === undefined ? 4 : opt.radius;
        this.count = opt.count === undefined ? 5 : opt.count;
        this.bxSize = opt.bxSize === undefined ? 1 : opt.bxSize;
        this.color = opt.color === undefined ? 0x00ff00 : opt.color;
 
        var i = 0,
        bx,
        radian;
        while (i < this.count) {
 
            bx = new THREE.Mesh(
                    new THREE.BoxGeometry(this.bxSize, this.bxSize, this.bxSize),
                    new THREE.MeshStandardMaterial({
                        color: this.color,
                        emissive: 0x0f0f0f
 
                    }));
 
            this.group.add(bx);
 
            i += 1;
        }
 
        this.update();
 
        console.log(this.group);
 
    };
 
    // update the group
    Mod.prototype.update = function () {
 
        var i = 0,
        bx,
        radian;
        while (i < this.count) {
 
            bx = this.group.children[i];
 
            radian = Math.PI * 2 / this.count * i;
 
            bx.position.set(
 
                Math.cos(radian) * this.radius,
                0,
                Math.sin(radian) * this.radius);
 
            bx.lookAt(0, 0, 0);
 
            i += 1;
 
        };
 
    };
 
    // set radius and update
    Mod.prototype.setRadius = function (radius) {
 
        this.radius = radius;
        this.update();
 
    };
 
    // return the constructor
    return Mod;
 
}
    ());
```

This will give me a model that I can use to create a circle of boxes that all face the origin of the group. I just have to add the group property of an instance of this to the scene, and I can of course make many instances of this model in my scene.

When I make my main.js file that will contain the basic elements of my three.js project I can call this constructor from there and give it a bunch of arguments that will define it's state. In the main update, or render loop of the project I can call setRadius to change the radius of the circle of boxes.

So I would use it in a main.js file to make something like this:

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 150);
    camera.position.set(20, 20, 20);
 
    // Orbit Controls
    //var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0, 0, 0);
 
    // three instances of the model
    var mod1 = new Model({
 
            count: 8,
            bxSize: 1,
            color: 0xff0000
 
        });
    scene.add(mod1.group);
 
    var mod2 = new Model({
 
            count: 16,
            radius: 8,
            bxSize: 1
 
        });
    scene.add(mod2.group);
 
    var mod3 = new Model({
 
            count: 32,
            radius: 9,
            bxSize: 1,
            color: 0x0000ff
 
        });
    mod3.group.rotation.set(Math.PI * 1.5, 0, 0)
    scene.add(mod3.group);
 
    // light
    scene.add(new THREE.PointLight().add(new THREE.Mesh(
                new THREE.SphereGeometry(.5, 10, 10),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff
                }))));
 
    var light = new THREE.PointLight();
    light.position.set(15, 0, 0);
    light.add(new THREE.Mesh(
            new THREE.SphereGeometry(.5, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })))
    scene.add(light);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var frame = 0,
    maxFrame = 500;
    var loop = function () {
 
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        r = Math.PI * 2 * per;
 
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
 
        // using the setRadius method of the model to change
        // the radius.
        mod1.setRadius(1 + 6 * bias);
 
        // changing the rotation of the group
        mod1.group.rotation.set(
            Math.PI * 2 * per,
            Math.PI * 4 * per,
            Math.PI * 8 * per);
 
        // change position of light, and camera
        light.position.set(Math.cos(r) * 15, 0, Math.sin(r) * 15);
        camera.position.set(
            Math.cos(r + Math.PI * bias) * 20,
            -50 + 100 * bias,
            Math.sin(r) * 20);
        camera.lookAt(0, 0, 0);
 
        frame += 1;
        frame = frame % maxFrame;
 
    };
 
    loop();
 
}
    ());
```

This results in three instances of the model, each with different radius, count of boxes, and color. I am also changing the state of one of theme in a loop, by calling one of the methods of the model, as well as by directly working with the group instance as it has all the [Object3D](/2018/04/23/threejs-object3d/) methods to play with that will effect the group as a whole when used.

## 5 - Conclusion

Grouping is a useful in three.js projects, don't forget that it is also something that you can do with anything in three.js that inherits from the Object3D class. So not only can you use grouping with Mesh Object instances, it can also be done with things like lights, and cameras, and also even additional groups.

One thing that might be work checking out next is one of my [threejs example](/2021/02/19/threejs-examples/) posts, [including one where I have made a crude model of sorts that is a group of groups where each nested group is a bunch of mesh objects that from a biplane](/2021/02/18/threejs-examples-biplane-group/) of sorts. There are a number of additional other examples that I have made like that where I am using groups as a way to make weird, simple models, which I have to admit is a little fun. There are all kinds of things that can be done with threejs groups that are pretty fun, and so far I have only scratched the surface of what can be done.