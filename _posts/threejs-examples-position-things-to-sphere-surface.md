---
title: Position Other Mesh Objects onto the surface of a Sphere Three.js example
date: 2021-05-14 13:40:00
tags: [three.js]
layout: post
categories: three.js
id: 867
updated: 2021-05-14 14:10:47
version: 1.15
---

I still have some more writing when it comes to all the various little methods and classes to worth with in [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), but I am getting to the point where it is time to start thinking in terms of some actual projects of some kind, so I started  writing some posts about basic [threejs project examples](/2021/02/19/threejs-examples/). Today I think I will write about another basic project idea and this time it is a simple module for creating a group that contains one Mesh that is a sphere, and then another groups that is a collection of groups that contain a mesh that will be positioned and rotated so that the child of the group is positioned over the surface of the sphere.

I am sure that there are a number of ways of going about doing this sort of thing, but the example that I worked out that I will be writing about here involves rotating a group, and then just changing the position of a child of this group as a way to go about doing this. In any case the general idea that I have in mind here is to actually have some kind of 2d coordinate system when it comes to latitude and longitude type values. That is that i just want to have a way to position a mesh object onto the surface of a sphere by way of just setting two values that will determine the position of the sphere on the surface.

When writing the source code for this example I ended up exercising a few methods and features of three.js that are worth writing about also that can apply to a great many other things. For example there is using the look at method of the object3d class to get a mesh object to look at the center of the sphere. However when doing so I want to mesh to look at the actual center of the sphere rather than the location relative to world space so I am also using the get world position method of the object3d class to do so. However because I am always having the mesh objects look at the center of the sphere I will also want to make sure that the geometries of the mesh objects are always looking up away from the sphere, or in any other direction that I might want apart from the downward direction. So to help with this there are methods to work with when it comes to an instance of Buffer Geometry to change the orientation of the geometry independent from that of the mesh object.
<!-- more -->

## 1 - What to know first before getting into this Sphere Surface Mesh Placement example

This is a post on a three.js project example that is a module that I can use to create a sphere, with other mesh objects positioned onto the surface of the sphere.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using three.js version r127 which was a late version of three.js at of April of 2021. Always be mindful of the dates of posts, as well as the dates at which I have last updated them. many code breaking changes are introduced to three.js that will case code examples such as the ones I have outline here to stop working. I do make an effort to update my content and the code examples in them now and then, but I have a whole lot of other posts on three.js and other categories that are also in need of some editing.

## 2 - The Sphere wrap module

In this section I will be going over the source code of this sphere warp module that creates an instance of a special group that contains a sphere as a child, along with another group that contains object wrap groups. Each object wrap group then contains a Mesh Object. The system is a little convoluted, and I am sure than in time I might be able to find or more elegant solution for this sort of thing, however when  it just comes to how things look the module seems to work as I expect it to.
The main create wrap method is what I will be using in the main javaScript file of a project that uses this module to create an instance of this sphere wrap group. The value that is returned by the create wrap method is an instance of the THREE.Group class which is of course based on object3d. So the object that is returned by the create method can just be directly passed to the add method of the scene object when I use this module. I then park any additional data that I will be using with my other methods in the user data object of this main wrap method and any other groups and mesh objects as needed.

To add a Mesh object to be placed on the surface of the sphere I will want to use the add object to wrap method for this. When calling this method the first value I pass is the wrap object I want to add an object for, followed by a name for this object. By default the method will add a cube mesh object, but I can also pass my own mesh object as a third value for this method. When calling the app object to wrap method the mesh object will be added as a child of an object wrap group and then this group will be added to a surface group. The values of the object wrap group and the mesh object itself are then what are mutated to change the position of the mesh object so it is positioned onto the surface of the sphere.

```js
(function (api) {
 
    // create wrap method
    api.createWrap = function () {
        // create a wrap group
        var wrap = new THREE.Group();
        // add a sphere to the wrap
        var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(1, 40, 40),
                new THREE.MeshNormalMaterial({
                    wireframe: true
                }));
        wrap.userData.sphere = sphere;
        wrap.add(sphere);
        // create a surface group and add to wrap
        var surface = new THREE.Group();
        wrap.userData.surface = surface;
        wrap.add(surface);
        return wrap;
    };
 
    // set to lat and long helper
    api.setObjToLatLong = function (wrap, childName, latPer, longPer, dist) {
        var childWrap = wrap.getObjectByName('objwrap_' + childName),
        child = childWrap.children[0]; //wrap.getObjectByName(childName),
        // set lat
        var radian = Math.PI * -0.5 + Math.PI * latPer,
        x = Math.cos(radian) * dist,
        y = Math.sin(radian) * dist;
        child.position.set(x, y, 0);
        // set long
        childWrap.rotation.y = Math.PI * 2 * longPer;
        // look at origin of wrap
        var v = new THREE.Vector3();
        wrap.getWorldPosition(v);
        child.lookAt(v);
    };
 
    // Add an Object to a Sphere Wrap Group
    api.addObjectToWrap = function (wrap, objectName, obj) {
        // create an obj
        obj = obj || new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial({
                    wireframe: false
                }));
        obj.name = objectName;
        var objWrap = new THREE.Group();
        objWrap.name = 'objwrap_' + objectName;
        objWrap.add(obj);
        // obj wrap user data object
        var ud = objWrap.userData;
        ud.latPer = 0;
        ud.longPer = 0;
        var radius = wrap.userData.sphere.geometry.parameters.radius;
        ud.dist = radius + 0.25;
        // add the objWrap group to the surface group
        wrap.userData.surface.add(objWrap);
        //set position for the first time
        api.setObjToLatLong(wrap, objectName, ud.latPer, ud.longPer, ud.dist);
    };
 
}
    (this['SphereWrap'] = {}));
```

I then also have my set object to lat and long method that is what I can use to set the position of the mesh relative to a location on the surface of the sphere. When calling this method I pass the wrap object as the first object followed by the name of the object I want to set the position for. I can then set a latitude and longitude values in the form of numbers between 0 and 1. I then also have an additional argument that can be used to adjust the distance from the center of the sphere.

## 3 - Time to test this module out

In this section I will now be going over one demo of this module to test things out and make sure that everything is working as it should before toying with the idea of using this module in additional examples. In this demo of the sphere wrap module I set up an instance of a scene object, and then also set up my camera and renderer as well as an an animation loop method like mmany other such three.js examples.

```js
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
// add wrap the the scene, and some cube objects
var wrap = SphereWrap.createWrap();
scene.add(wrap);
SphereWrap.addObjectToWrap(wrap, 'cube');
SphereWrap.addObjectToWrap(wrap, 'cube2');
 
// adding a cone rather than the default cube
// some times I might want to rotate the geometry when doing so
// rather than Object3d as I will always have that looking at the origin of the
// sphere wrap group
var cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 0.5, 30, 30),
        new THREE.MeshNormalMaterial({
            wireframe: true
        }));
cone.geometry.rotateX(Math.PI * 1.5);
SphereWrap.addObjectToWrap(wrap, 'cone', cone);
 
var wrap2 = SphereWrap.createWrap();
SphereWrap.addObjectToWrap(wrap2, 'box');
SphereWrap.setObjToLatLong(wrap2, 'box', 0.75, 0.9, 1.25);
wrap2.position.set(-4, 0, -4);
scene.add(wrap2);
 
// dist and lat log values
var dist = 1.25, // radius + half of mesh height
latPer = 0.75, // 0 - 1
longPer = 0.5; // 0 - 1
SphereWrap.setObjToLatLong(wrap, 'cube', latPer, longPer, dist);
SphereWrap.setObjToLatLong(wrap, 'cube2', 0, 0, 1.25);
SphereWrap.setObjToLatLong(wrap, 'cone', 0.9, 1, 1.25);
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
 
        // setting lat and long for 'cube'
        latPer = 0.25 + Math.sin(Math.PI * bias) * 0.25;
        longPer = per;
        SphereWrap.setObjToLatLong(wrap, 'cube', latPer, longPer, dist);
 
        // rotating cube2
        var obj = wrap.getObjectByName('cube2');
        obj.geometry.rotateZ(Math.PI / 180 * 20 * secs);
 
        // cone
        SphereWrap.setObjToLatLong(wrap, 'cone', 1 - 0.25 * bias, 1 - 1 * per, dist);
 
        // whole group
        wrap.position.x = 1 - 2 * bias;
        wrap.position.z = Math.sin(Math.PI * 2 * bias) * 2;
 
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
```

## 4 - Conclusion

I learned a lot about three.js while working on this example, and a whole lot of other examples that I worked on this week. There are still a few methods and properties of classes like the object3d class that I have just not been using that much thus far, but now have a better understand of the class and why I some times need to use methods like the get world position method of the object 3d class. As such much of what I have worked out here will apply to future edits of other three.js posts, and examples when it comes to addressing some problems that I have discovered with some of my older work.

