---
title: The type property of Objects in threejs
date: 2022-04-01 11:46:00
tags: [three.js]
layout: post
categories: three.js
id: 974
updated: 2023-06-28 06:04:30
version: 1.26
---

One major part of learning how to use threejs is to get a solid grasp on what there is to work with in the [object3d class](https://threejs.org/docs/#api/en/core/Object3D). There is not just the base object3d class itself, but also a whole lot of other objects that are extended from this class such as mesh objects, [groups](/2018/05/16/threejs-grouping-mesh-objects/), [cameras](/2018/04/06/threejs-camera/) and even whole scene objects. So once one gets an idea as to what the [position property of the Object3d class is all about](/2022/04/04/threejs-object3d-position/) for example, they can also apply that same understanding to a lot of typical objects that are used when working out a scene.

So there are all these different kinds, or types of objects in threejs that are all based off of object3d. With that said there should be some kind of standard way of finding out what type of object that I am working with when looping over all the objects attached to an root object of interest. As with any other kind of class in threejs there is of course using something like the instanceof operator to find out if I am dealing with a given class of object or not, and that might work okay. However there is also a type property of all these various types of objects that can also be used as a way to find out what type of object as well. With that said this post will be about just that how to go about figuring out what the type of a given object3d based object is in threejs.

<!-- more -->

## The type property of objects in threejs and what to know first

This is a post on the type property of various objects in threejs that are based off of the object3d class. I am assuming that you have at [least a little experience working with threejs](/2018/04/04/threejs-getting-started/), as well as with [client side javaScript in general](/2018/11/27/js-getting-started/). If not you might find what it is that I am writing about here a little hard to follow. As such I often write this kind of section in my posts as a way to outline some things that you should know first before continuing to read the rest of the content.

### Know a thing out two about looping over object3d based objects

I will be going over code examples that involve looping over objects in a scene. When doing so one way is to make use of the children property of objects. Sense the child property is just a plain old javaScript Array prototype methods like that of the [array foreach](/2019/02/16/js-javascript-foreach/), or the [array map method](/2020/06/16/js-array-map/) can be used with the children arrays of these objects. 

Another option for looping over the contents of objects in threejs would be the built in [traverse method](/2021/06/03/threejs-object3d-traverse/) that is another object3d class method of interest when it comes to this sort of thing. This will not just loop over children, but also children of children, and the object that I call the traverse method off of as well.

### Read up more on the object3d class in general

This post is not a general overview of the object3d class as a whole as I have [wrote a post like that all ready](/2018/04/23/threejs-object3d/). Rather it is a post in which I am just going over some source code examples that have to do with what kind of object3d based object I am dealing with, and with that a general overview of types in the process. In my main object3d post I also have a section on this topic, but also sections on a whole lot of other object3d related topics.

### The source code examples here are on Github

The source code examples that I am writing about here can be found in my [test threejs Github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-type). This is also where I am keeping the source code examples that I am writing about for all [my other various posts on threejs](/categories/three-js/), so there is a whole lot of code examples to look at for what it is worth.

### Version Numbers matter with threejs

The version of threejs that I was using when I first wrote this post was r135, and the version that I used last time I came around to edit this post was [r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Threejs is a javaScript library that moves very fast in terms of the rate at which major code breaking changes are made. Each revision that is put out might contain major code breaking changes actually so be sore to always check what version number you are using when working with random code examples using threejs on the open internet.

## 1 - Some Basic examples of the type property

To start things off here as always I am going to want to get a few basic hello world style examples out of the way. So in this section I will have a few quick examples in which I am making use of the type property to just quickly get the type string of the current object. However while I am at it I will also be covering some vanilla javaScript features as well that come to mind when it comes to what the type property if often used for.

### 1.1 - Using the type property of an object

For this example I am just logging out what the result of the type property is for a few objects that I added to a very basic start point for a threejs project. When I do so the result is what I would expect I get a string value that corresponds to the name of the constructor function that was used to create the object.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADDING GRID HELPER
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
scene.add( grid );
//-------- ----------
// TYPE
//-------- ----------
console.log( grid.type );    // GridHelper
console.log( camera.type );  // PerspectiveCamera
console.log( scene.type );   // Scene
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -2.5, 0);
renderer.render(scene, camera);
```

### 1.2 - Using core javaScript instanceof keyword

There is also the [instance of operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) in core javaScript that can be used to find out if I am dealing with a given type of object or not. The instance of operator will return a true Boolen value if the left operand is an instance of the given constructor function that is given as the right operand. What is good about this is that because it is a core javaScript feature it will work with all kinds of objects in threejs, not just object3d class based objects.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADDING GRID HELPER
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
scene.add( grid );
//-------- ----------
// The instance of keyword might be a better general way of checking objects
//-------- ----------
console.log( grid instanceof THREE.GridHelper ); // true
// This might be  better way of checking in general
const v = new THREE.Vector3();
console.log( v.type );                        // undefined
console.log( v instanceof THREE.Vector3 );    // true
console.log( v instanceof THREE.GridHelper ); // false
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -2.5, 0);
renderer.render(scene, camera);
```

### 1.2 - Using core javaScript constructor object prototype property

Yer another option would be to use the [constructor Object Protoype property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) of the object that I want to test. Every object in javaScript has this property and it should be a reference to the function that was used to create the object. So I can jut compare the value of the constructor property of the object to the constructor that I want to test of it is that type of object, and if it is the expression will evaluate to a true Boolen value.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADDING GRID HELPER
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
scene.add( grid );
//-------- ----------
// There is also the constructor object prototype
//-------- ----------
console.log( grid.constructor ===  THREE.GridHelper); // true
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -2.5, 0);
renderer.render(scene, camera);
```

## 2 - Looping over children and checking type

Often the type property is something that I will want to check when it comes to looping over all the objects from a given start point object such as a group object, or maybe even a whole scene. With that said in this section I will be going over a few quick examples that have to do with looping over the children of object3d based objects to check type of each child. When it comes to doing this there is just looping over the child array, but there are also additional object3d class methods of interest that help with this sort of thing as well.

### 2.1 - Looping over the children array using array prototype methods to check type

For a very basic kind of getting started or hello world type example of the type property of objects in threejs there is starting out with some example that is just a basic [scene object](/2018/05/03/threejs-scene/) with objects added of various types. So then I made a quick example where I am just creating a main scene object along with the other typical objects that I want for any threejs project such as a [camera](/2018/04/06/threejs-camera/) and [renderer](/2018/11/24/threejs-webglrenderer/). When making the camera I made sure to add the camera to the scene object so that it is a child of the scene object so that it will be one of the objects to loop over later in the code.

After setting up my scene object, camera, and renderer I will now want to add at least one instance iof the Object3d class. While I am at it I think I will also want to add at least a few [mesh objects](/2018/05/04/threejs-mesh/) to the object3d instance as children of it. For this I made a quick function that will create and return a new Mesh object that uses the built in box geometry constructor for the geometry of the mesh, and also uses the normal material for the mesh when it comes to adding texture for the geometry of the mesh object. I then created an [array of arrays](/2020/03/31/js-array-multidimensional/) where each nested array is a set of values that I want to set for the position of each mesh object. I am then just looping over this array of arrays and using the [Function apply prototype method](/2017/09/21/js-call-apply-and-bind/) with the [set method of the vector3 class instance](/2018/04/15/threejs-vector3/) of the position property of each of these mesh objects that I want to create. I then of course add each mesh object to the Object3d class instance in the body of the function that I am passing to array for each while doing this.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 5, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const mkMesh = function(){
    return  new THREE.Mesh(
       new THREE.BoxGeometry(1, 1, 1),
       new THREE.MeshNormalMaterial());
};
//-------- ----------
// OBJECTS - a group with mesh objects as children, a grid helper, also added the camera to the scene
//-------- ----------
const group = new THREE.Group();
scene.add(group);
[[0,0,1],[0,0,-1],[1,0,0],[-1,0,0]].forEach(function(meshData){
    const mesh = mkMesh();
    THREE.Vector3.prototype.set.apply(mesh.position, meshData)
    group.add(mesh);
});
scene.add(new THREE.GridHelper(10, 10));
scene.add(camera);
//-------- ----------
// LOOPING OVER OBJECTS AND CHECKING TYPE BY WAY OF THE children ARRAY
//-------- ----------
// LOOPING OVER ALL CHILDREN OF THE SCENE AND USING THE TYPE
// PROPERTY OF EACH OBJECT TO PREFORM AN ACTION FOR THAT TYPE
const depth = new THREE.MeshDepthMaterial();
scene.children.forEach(function(obj){
    if(obj.type === 'PerspectiveCamera'){
        obj.position.set(8, 8, 8);
        obj.lookAt(0,0,0)
    }
    if(obj.type === 'Group'){
        // looping the children of children
        obj.children.forEach(function(obj){
            if(obj.type === 'Mesh'){
                obj.material = depth;
            }
        });
    }
});
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

So now that I have a scene object with all these various kinds of objects added to the scene object as children I might want to have a way to go about looping over the children of the scene object, and then preform some kind of action for each type of object that is encountered. One way to do that would be to just loop over the contents of the children property of the scene object and check the type property of each objects, using that as a way to know of an specific action should be preformed or not.

### 2.2 - Using the traverse method

Although I might often just loop over the children array using array prototype methods there is another object3d feature that can be used for looping over objects, and also the objects of objects called the object3d traverse method. When I call this method it will give me a reference of the object that I call it off of, all the children of that object, and then also the children of children and so on. So when it comes to looping over objects to check the type of each, and do something on  a type by type basis thing method might prove to be a better choice for many situations.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 5, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const mkMesh = function(){
    return  new THREE.Mesh(
       new THREE.BoxGeometry(1, 1, 1),
       new THREE.MeshNormalMaterial());
};
//-------- ----------
// OBJECTS - adding children of children
//-------- ----------
const group = new THREE.Group();
scene.add(group);
[[0,0,2],[0,0,-2],[2,0,0],[-2,0,0]].forEach(function(meshData, i, arr){
    const mesh = mkMesh();
    THREE.Vector3.prototype.set.apply(mesh.position, meshData);
    group.add(mesh);
    // adding a child for the child
    mesh2 = mkMesh();
    const a1 = i  / arr.length;
    const e = new THREE.Euler(0,Math.PI * 2 * a1, 0);
    mesh2.position.set(1,0,0).applyEuler(e).multiplyScalar(1.25);
    mesh.add(mesh2);
});
scene.add(new THREE.GridHelper(10, 10));
scene.add(camera);
//-------- ----------
// LOOPING OVER OBJECTS USING traverse to do soehting for all objects of a type
//-------- ----------
const depth = new THREE.MeshDepthMaterial();
scene.traverse(function(obj){
    if(obj.type === 'PerspectiveCamera'){
        obj.position.set(8, 8, 8);
        obj.lookAt(0,0,0)
    }
    if(obj.type === 'Mesh'){
        obj.material = depth;
    }
});
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## Types of Object3d class based objects

For this section I think that I will want to go over a number of demos that will be an overview of some of the various types of object3d class based objects that there are to work with. I will not be able to get to all of them of course, but when it comes to future edits I will add a new demo now and then. The real thing to do here is to just demo why the type property will prove to be useful when looping over objects. When doing so I might want to preform some logic for all objects of a given type, so that is what these demos are mainly about.

### 3.1 - Mesh Objects

A [Mesh object]](/2018/05/04/threejs-mesh/) will contain a geometry and a material. So when looping over all objects in a scene I might want to do something with say the material of all mesh objects. For example say I created a whole bunch of mesh objects that all share the same geometry, but they all have there own material. With that said I could change, say the color option of each material in each of these mesh objects after they where created. So I can use the traverse method to loop over the contents of the scene object, and set the color of each mesh by checking the type property to make sure it is indeed a mesh object.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const geometry = new THREE.BoxGeometry();
let i = 0;
const len = 20;
while(i < len){
    const material = new THREE.MeshPhongMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// OTHER OBJECTS
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
scene.add( grid );
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// DOING SOMETHING FOR ALL TYPE MESH OBJECTS
//-------- ----------
scene.traverse( (obj) => {
    if(obj.type === 'Mesh'){
        const x = -5 + 10 * Math.random();
        const z = -5 + 10 * Math.random();
        obj.position.set(x, 0, z);
        obj.material.color.setRGB(Math.random(), Math.random(), Math.random());
    }
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

The type property of objects in threejs is then one of the ways that I will go about fining out what kind of object I am working with in threejs. This might work well when it comes to most objects in threejs, but I have not look into seeing if this type property is also set for all other kinds of objects in threejs. Also I have to say that checking the type of object this way is not a substitute for other means of finding the type of object that are more true to that of javaScript in general. When it comes to core javaScript there is checking the constructor property of the object which will contain a name property of the function that made it. Also there is the instance of operator as well that can often work well when it comes to working with code outside of threejs.
