---
title: Custom User Data for a Mesh in three.js
date: 2021-02-16 16:20:00
tags: [three.js]
layout: post
categories: three.js
id: 804
updated: 2021-02-16 16:31:04
version: 1.1
---

In [threejs](https://threejs.org/) there is a standard way of adding custom user data for a mash object which is the [user data object](https://threejs.org/docs/#api/en/core/Object3D.userData). The user data object is actually a property of the [object32 class](/2018/04/23/threejs-object32/) which is a class to which a mesh, and many other objects in three.js inherit from.

It is a good idea to place any data that has to do with the applaction in this user data object as that will help to make sure that I do so in a safe way. Many frameworks have some kind of data object that is part of an instnace of some kind of class as a way to park data that I want to have assigned to a given object like a display object, sprite, or in threejs a mesh.

So in the post I will be going over a simple examppe of the user data property of the object3d class.

<!-- more -->

## 1 - The javaScript file

```js

(function () {
 
    var GROUPSIZE = 9,
    MAXDIST = 5,
    PPS_MIN = 1,
    PPS_MAX = 7;
 
    // materials
    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            wireframe: true
        })
    ];
    // random angles helper
    var randomAngles = function(mesh){
        mesh.userData.pitch = Math.PI * 2 * Math.random();
        mesh.userData.heading = Math.PI * 2 * Math.random();
    };
    var randomSpeed = function(mesh){
        mesh.userData.pitchPPS = PPS_MIN + (PPS_MAX - PPS_MIN) * Math.random();
        mesh.userData.headingPPS = PPS_MIN + (PPS_MAX - PPS_MIN) * Math.random();
    };
    // create a sphere group
    var createSphereGroup = function(){
        var group = new THREE.Group();
        var i = 0;
        while(i < GROUPSIZE){
            var mesh = new THREE.Mesh(
                new THREE.SphereGeometry(1, 20),
                materials[0]
            );
            mesh.userData.materalIndex = i % materials.length;
            randomSpeed(mesh);
            randomAngles(mesh);
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update a sphere group
    var updateSphereGroup = function(group, secs){
        group.children.forEach(function(mesh){
            var ud = mesh.userData;
            mesh.material = materials[ud.materalIndex];
            mesh.position.x += Math.cos(ud.pitch) * ud.pitchPPS * secs;
            mesh.position.y += Math.sin(ud.pitch) * ud.pitchPPS * secs;
            mesh.position.z += Math.cos(ud.heading) * ud.headingPPS * secs;
            var d = mesh.position.distanceTo(new THREE.Vector3(0,0,0));
            if(d >= MAXDIST){
                mesh.position.set(0,0,0);
                randomAngles(mesh);
                randomSpeed(mesh);
            }
        });
    };
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
 
    // create and add sphere group
    var group = createSphereGroup();
    updateSphereGroup(group, 0);
    scene.add(group);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var lt = new Date();
    function animate() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(animate);
        updateSphereGroup(group, secs);
        renderer.render(scene, camera);
        lt = now;
    };
 
    animate();
 
}
    ());
```

## 2 - Conclusion

So the user data object is one way to go about having some custom data set to a given mesh object, or any object in threejs that inhertis from object 3d such as a camera object. There might be other ways of going about doing this sort of thing though such as having two sets of objects, one would be a collection of mesh objects in threejs, and another would be an indepedant array of user data objects.
