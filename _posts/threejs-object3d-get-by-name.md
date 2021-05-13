---
title: Get an Object by name not id in three.js
date: 2021-05-12 11:44:00
tags: [three.js]
layout: post
categories: three.js
id: 865
updated: 2021-05-13 16:21:01
version: 1.28
---

When it comes to getting a reference to a mesh object in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) things are not the same as what I have become accustomed to when it comes to working with the Document Object Model. When it comes to html elements there is setting an id to an element, and then having the option to get a reference to that element by id later in a body of javaScript code. 

When it comes to the Object3d class in three.js there is an id property of each object3d instance, however I have found that this is something that I should not mess around with when it comes to setting my own id strings for mesh objects, groups, cameras and anything based off of object3d. There is another property of Object3d that I can set to what I want, and that is [the name property of the Object3d class](https://threejs.org/docs/#api/en/core/Object3D.name) that is more like that of the id property that I have come to know well in native client side javaScript. There is then the get object by name method of the object3d class that I can then use as a way to get an object in three.js that has a set name for it.

<!-- more -->

## 1 - Object3d name property, and learning the basics first

This is a post on the name property of the object3d class in three.js that is an empty string by default, but can be used to set a unique value that will act as a way to get a reference to the object at a later point in a body of javaScript code. This is an advanced post on three.js where I am just writing about one little property and some corresponding prototype method in the object3d class. I will not be getting into detail about the object3d class and everything that it is based off of in this post. It should also go without saying that I will not be getting into the basics of creating a three.js project in general also, and assume that you have at least some background working with this javaScript library.

### - 1.1 Version Numbers are a big deal with three.js

When I wrote this post I was using three.js revision r127 of three.js which was a late version of three.js at the time that I first wrote this post in May of 2021. In the future code breaking changes might be made that will case these code examples to no longer work, and such changes might happen sooner rather than later as three.js is a project that is moving fairly fast when it comes to development.

### 1.2 - Might want to read up more on the Object3d class in general

There is a great deal more to be aware of when it comes to working with the object3d class so it would be a good idea to read up more on the [object3d class in general](/2018/04/23/threejs-object3d/) if you have some time to do so. The object3d class is a major base class in three.js, and here are a lot of other objects that are based off of the Object3d class such as Mesh objects, cameras, Groups, and even the Scene object just to name a few things. So when it comes to learning something about the Object3d class such as the name property this is then something that can be applies to everything that is built on top of Object3d. SO the name property can be set for a mesh object, but it can also be set for things like groups, and cameras.

## 2 - Basic get by name example

So then I should start off with a basic getting started type example with the name property and the get by name method of the object3d class. In this example I create a group using the THREE.Group constructor which is also based on the Object3d class, so I set a name property for it. In then add to mesh objects to this group, each of them I also set a name for called just simply box1 and box2. Later on in the example I can then call the get object by name method off of the group to get the first box object in the group. I can then do something simple to that mesh object such as changing the rotation of the object.

```js
// creating a group
var group = new THREE.Group();
group.name = 'boxGroup';
// adding two boxes to the group with names
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, 0);
box.name = 'box1';
group.add(box);
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(-2, 0, 0);
box.name = 'box2';
group.add(box);

// box helper
group.add(new THREE.BoxHelper(group));
group.position.set(0, 0, 0);

// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
scene.add(group);

// GETTING BOX1 BY THE NAME
var box = group.getObjectByName('box1');
box.rotation.set(Math.PI / 180 * 45, 0, 0);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

That is then the basic idea of the name property it is just like that of the id property when it comes to HTML elements. I can set a string value to a mesh object, and then I can get a reference to that mesh object later by using a method that can be used to get a reference to the object by this name string value. However in order to really get what this is all about solid I might want to work out at least a few more examples that prove to be something that is at least starting to look like some kind of actual project.

## 3 - Using get by name to set custom values for each box in a group

Now that I have the basic idea of what the name property is used for it is time to move into making a more complex example where I am using the name property and the get by name property to get at specific objects and change there properties to desired values. When it comes to making an actual project with three.js I often like to make simple little animations using models that are just groups of mesh objects. When doing so I often have many parts of these kinds of models so it makes sense to use this name property as a way to set names for the various parts, or just use this as a way to set and change values of the mesh objects to make a kind of crude model of something.

In this example I have a method that just creates and returns a group of mesh objects and when doing so it sets a name for each mesh object. I then have a method that positions these mesh objects into positions that are along the circumference of a circle. However the real method here is my create object 1 method that make use use of both of these helper functions to set things up, and then I am using the names set with the create box group method to adjust some things to make a kind of whole object using just box geometries.

```js
// creating a group
var createBoxGroup = function(count){
    var group = new THREE.Group();
    group.name = 'boxGroup';
    var i = 0,
    box,
    len = count;
    while(i < len){
        box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        box.name = 'box_' + i;
        group.add(box);
        i += 1;
    }
    return group;
};
 
// SETTING SCALE OF BOX GROUP AND GETTING BOX OBJECTS BY NAME
// WHEN DOING SO
var createObject1 = function(){
    var group = createBoxGroup(4);
    // set cube zero to a bigger scale than the others
    // this should be the front
    var box = group.getObjectByName('box_0');
    box.scale.set(1, 1, 3);
    box.position.set(0, 0, 1);
    // side box objects
    box = group.getObjectByName('box_1');
    box.scale.set(1, 1, 1);
    box.position.set(2, 0, 0);
    box = group.getObjectByName('box_2');
    box.scale.set(1, 1, 1);
    box.position.set(-2, 0, 0);
    // rear
    box = group.getObjectByName('box_3');
    box.scale.set(1, 1, 1);
    box.position.set(0, 0, -2);
    return group
};
 
// create a group
var group = createObject1();
// box helper
group.add(new THREE.BoxHelper(group));
// scene
var scene = new THREE.Scene();
// grid helper
scene.add(new THREE.GridHelper(7, 7));
// add group
scene.add(group);
// dir mesh
var dir = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25), 
    new THREE.MeshBasicMaterial());
scene.add(dir);
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
// loop
var lt = new Date(),
frame = 0,
maxFrame = 600,
r = 0,
x, 
z,
fps = 30;
var loop = function(){
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        r = Math.PI  * 2 * per;
        x = Math.cos(r) * 5;
        z = Math.sin(r) * 5;
        dir.position.set(x, 5 * Math.sin(Math.PI * 4 * per), z);
        group.lookAt(dir.position);
        renderer.render(scene, camera);
        lt = now;
        frame += fps * secs;
        frame %= maxFrame;
    }
};
loop();
```

So then this is starting to look like something kind of interesting now, however there is a great deal that I would like to add and change. In this example I just have one instance of this object 1 model of sorts, and of course things will get a little weird when I have more than one group with the same name, and then each of those groups having the same set of names for each child. So maybe I should get around to making at least one or two more examples where I am working out some kind of system for creating and setting name values for mesh objects and groups of such objects..

## 4 - A model where I am setting truly unique name values for each mesh object of interest

The name property of object3d is then a great way to set some string values for each mesh object of interest and then use that as a way to get and set values for mesh objects that have a given unique string value. In this example I am taking the basic idea that I started in the previous example and am not going just a little farther with it by making name values that are unique for all parent and child mesh objects.

It might make sense to go all out with name values by making sure that all mesh objects have their one unique values as this will enable me to get any mesh object that I want by calling the get by name value off from the scene object. However this might also prove to be overkill assuming that I can also get a reference of a group object by some other means. In any case when it comes to having more than one instance of a group of mesh objects it just starts to make more sense to do something to this effect.

### 4.1 - The Box Group module

The logic that I first worked out in my previous example is now pulled into its own module. This is just something that I often end up doing when I start to make something that is starting to look like an actual project rather than just a simple copy and paste code snippet. The main feature of interest with this module with respect to the theme of this post is the create box group method at the top of the source code. In the body of this function I am setting names that should end up being unique for the group, and also each child of the group.

```js
(function (api) {
 
    // CREATE A BOX GROUP HELPERS
 
    // creating a group
    var createBoxGroup = function (count, groupNamePrefix, groupNameCount, childNamePrefix) {
        var group = new THREE.Group();
        // SETTING A NAME FOR THE GROUP
        group.name = groupNamePrefix + '_' + groupNameCount;
        var i = 0,
        box,
        len = count;
        while (i < len) {
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshNormalMaterial());
            box.position.set(0, 0, 0);
            // SETTING A NAME FOR THE CHILD
            box.name = group.name + '_' + childNamePrefix + '_' + i;
            group.add(box);
            i += 1;
        }
        return group;
    };
 
    // position children
    var positionChildren = function (group) {
        var prefix = group.name + '_' + 'box_'
            // front
            var box = group.getObjectByName(prefix + '0');
        box.scale.set(1, 1, 3);
        box.position.set(0, 0, 1);
        // side box objects
        box = group.getObjectByName(prefix + '1');
        box.scale.set(1, 1, 1);
        box.position.set(2, 0, 0);
        box = group.getObjectByName(prefix + '2');
        box.scale.set(1, 1, 1);
        box.position.set(-2, 0, 0);
        // rear
        box = group.getObjectByName(prefix + '3');
        box.scale.set(1, 1, 1);
        box.position.set(0, 0, -2);
    };
    // create user data object
    var createUserData = function (wrap, group) {
        var ud = wrap.userData;
        ud.group = group;
        ud.heading = 0; // heading 0 - 359
        ud.pitch = 0; // pitch -180 - 180
        // direction object
        ud.dir = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        wrap.add(ud.dir);
    };
 
    // CREATE A BOX GROUP
    var groupCount = 0;
    api.create = function () {
        var wrap = new THREE.Group();
        var group = createBoxGroup(4, 'boxgroup', groupCount, 'box');
        wrap.add(group);
        positionChildren(group);
        createUserData(wrap, group);
        api.update(wrap);
        group.add(new THREE.BoxHelper(group, 0xffffff));
        // step group count
        groupCount += 1;
        return wrap;
    };
 
    // UPDATE A BOX GROUP
 
    api.update = function (wrap) {
        var ud = wrap.userData,
        group = ud.group;
        var headingRadian = Math.PI / 180 * ud.heading;
        var x = Math.cos(headingRadian) * 5,
        z = Math.sin(headingRadian) * 5,
        // might light to work out a better expression for pitch
        y = Math.abs(ud.pitch) / 180 * 5 * (ud.pitch < 0 ? -1 : 1);
        ud.dir.position.set(x, y, z);
        // look at is relative to world space, so this needs to be adjusted for that
        group.lookAt(ud.dir.getWorldPosition());
    };
 
}
    (this['BoxGroup'] = {}));
```

### 4.2 - A main.js module

Now that I have my code that has to do with the creation and mutation of these model objects pulled into an additional separate file the main javaScript file is now a little lighter. I can now just create a scene and then start creating and adding these groups of objects to the scene by calling the create method of the module.

```js
// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5)); // grid helper
 
// create some of these groups with the BoxGroup Module
var group1 = BoxGroup.create();
group1.position.set(-15, 0, 0);
scene.add(group1);
var group2 = BoxGroup.create();
group2.position.set(-15, 0, -15);
scene.add(group2);
var group3 = BoxGroup.create();
console.log(group3.name);
scene.add(group3); // add group
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// loop
var lt = new Date(),
frame = 0,
maxFrame = 600,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group1.userData.heading = 360 * per;
        BoxGroup.update(group1);
        group2.userData.heading = 90;
        group2.userData.pitch = 180 * Math.sin(Math.PI * 4 * per);
        BoxGroup.update(group2);
        group3.userData.heading = 360 * per;
        group3.userData.pitch = 180 * Math.sin(Math.PI * 4 * per);
        group3.position.z = -5 + 10 * bias;
        BoxGroup.update(group3);
        renderer.render(scene, camera);
        lt = now;
        frame += fps * secs;
        frame %= maxFrame;
    }
};
loop();
```

## 5 - Conclusion

The name property is one of the many basic things about three.js that I should get into the habit of using, but just never really took the time to look into. It is true that I will not be using every little feature of every little class when it comes to using three.js to make an actual project. However I think that the name property is just one of these little aspects of three.js that I should be using often when making my crude yet effective modules that are just groups of mesh objects.

There are a number of other basic features of the three.js object3d class that a javaScript developer should be aware of when using three.js such as the user data object, the look at method, and the rotation and position properties. Mush of what has to do with working with three.js seems to center around the object3d class so looking into additional resources to learn more about the class is advised.

What I have worked out for this example can and will apply to new three.js examples, and it is also something that I would like to keep in mind when it comes to editing my older content when it comes to making three.js project examples. I have a number of examples where I am working out modules, and over all whole animations composed of these modules that are collections of group objects. From now on I should get in the habit of setting sound name string values for the mesh objects, and groups that are created when making these modules. If you would like to check out some of these there is my [main post on my three.js examples](/2021/02/19/threejs-examples/) that is worth checking out to see what the current states is with these examples, and I often update that post when I add new examples, and edit old ones.
