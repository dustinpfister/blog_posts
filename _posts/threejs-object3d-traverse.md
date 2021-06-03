---
title: Loop over all objects in a threejs scene with the Object3d traverse method
date: 2021-06-03 12:17:00
tags: [three.js]
layout: post
categories: three.js
id: 881
updated: 2021-06-03 12:47:56
version: 1.12
---

If for some reason I want to [loop over all objects](https://discourse.threejs.org/t/to-get-array-of-all-meshes/17458/2) in a [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) scene, or all the objects attached to any single object I can use the [object3d traverse](https://threejs.org/docs/index.html#api/en/core/Object3D.traverse) method. The way this works is I just call the traverse method off of the scene object, or any object based off the object3c class for that matter, and pass a callback function as the first argument. This call back function will then be called for every nested child attached to the object that I call traverse, including the object itself. A reference to the current object will be passed as the first argument of the given callback function and it is then in the body of this function that I can preform whatever action I want to happen for all objects.

So then in this post I will be going over the use of the traverse method of the object3d class. In the process of doing so I will also be touching base on a wide range of other topics of interest that will branch off from the use of this method. There are things like the type property of the object3d class that come to mind when it comes to checking out what kind of object it is that I am dealing with for example.

<!-- more -->

## 1 - Looping over all objects using Object3d traverse and what to know first

This is a post centered on using just one little method in the object3d class in the javaScript library known as threejs, as well as a whole bunch of other little things that might branch off from this method. This is then not a getting started type post on threejs so I assume that you have the basic of the library out of the way so far. However in any case in this section I will be going over some things that you might want to get solid before continuing to read the rest of this post.

### 1.1 - Take a look at the object3d class in general

There is a lot to write about when it comes to the object3d class, and the traverse method is just one little item of interest. So it would be a good idea to maybe check out [my post on the object3d class in general](/2018/04/23/threejs-obhect3d/) if you have some time to get into the thick of this class. Doing so is called for sooner or later when it comes to gaining a solid understanding of the library as the object3d class is a base class that apples to a lot of objects in the library such as Mesh objects, Groups, and even the main scene object.

### 1.2 - Check the version numbers, always

This is something that I think that I just need to mentioning in ever post I write on threejs now, which is that I was using threejs version r127 when I made these code examples here. Threejs is a library that as of this writing is still moving very fast when it comes to development, and code breaking changes are made to the library often.

## 2 - Loop Over all objects in a scene

So first off this will be just a basic example of the object3d traverse method just for the sake of getting started with this method. In this example I am creating a main scene object and then I am adding some grid hepers objects to the scene. These grid helper objects are based off of the object3d class so they will show up in the traverse call that I will be using later in the source code. On top of the helpers I am also adding a group, and this group will have a whole bunch of children, each of which will be an instance of a Mesh. After that I am also adding a camera to the scene when it comes to setting up the camera, and the renderer that I will be suing.

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

## 3 - Conclusion

So then the object3d traverse method is a great way to go about looping over every object that is attached to the main scene object, or any other object from which the traverse method is called. There are a whole bunch of various use case examples that come to mind when it comes to suing this method to preform some kind of action that I would want to apply to all objects, or all objects of a given type.

