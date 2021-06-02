---
title: Getting parent of an object in threejs
date: 2021-06-01 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 880
updated: 2021-06-02 13:04:57
version: 1.7
---

I have been taking a second long look at everything there is to work with in the object3d class in threejs, and it turns out that there is still a great deal more to the class that I still feel as though I need to get solid with. One such property of the object3d class is the parent property of an object3d instance which is something that can come in handy now and then just like that of the children property. That is where the children property might be a collection of other objects that are descendant of an object, the parent property is well the parent of the current object.

For example say I am looping over all the objects of a scene object and for each mesh object I want to take a look at what the parent object of the mesh object is. Say that in the scene there may be some mesh objects that are part of a group and the user data object of the group may have some data that I will want to use when applying some changes to the mesh object. There are a range of other use case situations where I will want to get at the parent object, such as when working with raycasting and groups of objects.

So then in this post I will be going over a few examples that make use of the parent property of objects that are based on the object3d class. While I am at it I might also touch base on a wide range of other threejs related topics that might also be work checking into in detail, so lets get to it.

<!-- more -->

## 2 - Basic object3d parent example

For a basic example of this parent property I thought I would start out with something that just involves getting a reference to the scene object by way of the parent property. So in other words this example is just a very basic hello world type threejs example where I am creating a scene object, adding a mesh to the scene, and then setting up a camera and a renderer. I am then getting a reference to the scene object by way of the parent property of the mesh object as it was added to the scene object rather than a child of some other object.



```js
// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
 
// adding a mesh
var mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 10, 10),
        new THREE.MeshNormalMaterial());
mesh.position.set(0, 0.5, 0);
scene.add(mesh);
 
// getting the parent of the mesh, and preforming an action on it
var parent = mesh.parent;
parent.rotation.x = Math.PI * 2 * Math.random();
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - The parent property, object3d.name, and Object3d.traverse

Now that I have got a basic example out of the way when it comes to the parent property of object3d it is now time to get into something that is just a little more advanced.

```js
var createGroup = function(gid){
    var group = new THREE.Group();
    group.name = 'group_' + gid;
    // adding a cone
    var cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 10, 10),
        new THREE.MeshNormalMaterial());
    cone.geometry.rotateX(Math.PI * 0.5);
    cone.position.set(0, 0, 2.0);
    cone.name = 'mesh_ ' + group.name + '_cone';
    group.add(cone);
    // adding a box
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 3),
        new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    box.name = 'mesh_ ' + group.name + '_cone';
    group.add(box);  
    return group;
};
 
var rndRad = function(){
    return Math.PI * 2 * Math.random();
};
 
var processObject = function(obj){
    var nameArray = obj.name.split('_');
    if(nameArray[0] === 'mesh'){
       // USING OBJECT3D parent prop to get Group
       var mesh = obj,
       group = mesh.parent;
       console.log(group.name);
       group.rotation.set(rndRad(), rndRad(), rndRad());
    }
 
};
 
// scene
var scene = new THREE.Scene();
scene.name = 'scene_myworld';
var grid = new THREE.GridHelper(9, 9);
grid.name = 'helper_grid_1';
scene.add(grid);
 
var group = createGroup('0');
scene.add(group);
group.lookAt(-10, 10, -10);
 
group = createGroup('1');
group.position.set(3, 1.5, 0);
group.lookAt(3, 10, 0);
scene.add(group);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
 
renderer.domElement.addEventListener('click', function(){
    scene.traverse( function(obj){
        processObject(obj);
    });
    renderer.render(scene, camera);
});
```

## 4 - Conclusion

The parent property of the object3d class is then yet another useful property that can be used as a way to gain a reference to another object based on object3d. This property is of course just one tool in the tool box when it comes to gaining a reference to any given object is a scene object. What is nice about the parent property is that it is a way to gain a reference that will always be the parent object of another if there is one. In major projects I also often work out some kind of system when it comes to setting name strings for all objects, as long as it follows some kind of system that system can also be used as a way to gain a reference to anything that I might want.

