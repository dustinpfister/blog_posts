---
title: Loop over all objects in a threejs scene with the Object3d traverse method
date: 2021-06-03 12:17:00
tags: [three.js]
layout: post
categories: three.js
id: 881
updated: 2021-06-03 12:30:08
version: 1.4
---

If for some reason I want to [loop over all objects](https://discourse.threejs.org/t/to-get-array-of-all-meshes/17458/2) in a [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) scene, or all the objects attached to any single object I can use the [object3d traverse](https://threejs.org/docs/index.html#api/en/core/Object3D.traverse) method. The way this works is I just call the traverse method off of the scene object, or any object based off the object3c class for that matter, and pass a callback function as the first argument. This call back function will then be called for every nested child attached to the object that I call traverse, including the object itself. A reference to the current object will be passed as the first argument of the given callback function and it is then in the body of this function that I can preform whatever action I want to happen for all objects.

So then in this post I will be going over the use of the traverse method of the object3d class. In the process of doing so I will also be touching base on a wide range of other topics of interest that will branch off from the use of this method. There are things like the type property of the object3d class that come to mind when it comes to checking out what kind of object it is that I am dealing with for example.

<!-- more -->


## 2 - Loop Over all objects in a scene

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // ADDING GRID HELPERS TO THE SCENE
    var helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    scene.add(helper);
    helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    helper.rotation.z = Math.PI * 0.5;
    scene.add(helper);
 
    // ADDING A GROUP OF MESH OBJECTS
    var group = new THREE.Group();
    var i = 20;
    while(i--){
        group.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshNormalMaterial() ));
    }
    scene.add( group );
 
    // camera, renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 25);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE
 
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // TRAVERSING ALL OBJECTS IN THE SCENE
    scene.traverse(function(obj){
        if(obj.type === 'GridHelper'){
            obj.material.color = new THREE.Color(0, 1, 0);
        }
        if(obj.type === 'Mesh'){
            obj.position.x = -5 + Math.floor(10 * Math.random());
            obj.position.z = -5 + Math.floor(10 * Math.random());
            obj.rotation.y = Math.PI * 2 * Math.random();
        }
        if(obj.type === 'Group'){
            var len = obj.children.length;
            obj.children.forEach(function(child, i){
                child.position.y = -5 + Math.floor( 10 * (i / len) );
                var s = 0.25 + 1.75 * (1 - i / len);
                child.scale.set(s, s, s);
            });
        }
    });
 
    renderer.render(scene, camera);
 
}
    ());
```