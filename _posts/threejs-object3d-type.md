---
title: The type property of Objects in threejs
date: 2022-04-01 11:46:00
tags: [three.js]
layout: post
categories: three.js
id: 974
updated: 2023-01-25 10:12:58
version: 1.20
---

One major part of learning how to use threejs is to get a solid grasp on what there is to work with in the [object3d class](https://threejs.org/docs/#api/en/core/Object3D). There is not just the base object3d class itself, but also a whole lot of other objects that are based off of the object 3d class such as [mesh objects](/2018/05/04/threejs-mesh/), [groups](/2018/05/16/threejs-grouping-mesh-objects/), [cameras](/2018/04/06/threejs-camera/) and so forth. So once one gets an idea as to what the [position property of the Object3d class is all about](/2022/04/04/threejs-object3d-position/) for example, they can also apply that same understanding to a lot of typical objects that are used when composing any kind of of over all scene.

So there are all these different kinds, or types of objects in threejs that are all based off of object3d. With that said there should be some kind of standard way of finding out what type of object that I am working with when looping over all the objects attached to an object3d based object. As with any other kind of class in threejs there is of course using something like the instanceof operator to find out if I am dealing with a given class of object or not, and that might work okay. However there is also a type property of all these various types of objects that can also be used as a way to find out what type of object as well. With that said this post will be about just that how to go about figuring out what the type of a given object3d based object is in threejs.

<!-- more -->

## The type property of objects in threejs and what to know first

This is a post on the type property of various objects in threejs that are based off of the object3d class. I am assuming that you have at [least a little experience working with threejs](/2018/04/04/threejs-getting-started/), as well as with [client side javaScript in general](/2018/11/27/js-getting-started/). If not you might find what it is that I am writing about here a little hard to follow. As such I often write this kind of section in my posts as a way to outline some things that you should know first before continuing to read the rest of the content.

### Know a thing out two about looping over object3d based objects

I will be going over code examples that involve looping over objects in a scene. When doing so one way is to make use of the children property of objects. Sense the child property is just a plain old javaScript Array prototype methods like that of the [array foreach](/2019/02/16/js-javascript-foreach/), or the [array map method](/2020/06/16/js-array-map/) can be used with the children arrays of these objects. 

Another option for looping over the contents of objects in threejs would be the built in [traverse method](/2021/06/03/threejs-object3d-traverse/) that is another object3d class method of interest when it comes to this sort of thing. This will not just loop over children, but also children of children, and the object that I call the traverse method off of as well.

### Read up more on the object3d class in general

This post is not a general overview of the object3d class as a whole as I have [wrote a post like that all ready](/2018/04/23/threejs-object3d/). Rather it is a post in which I am just going over some source code examples that have to do with what kind of object3d based object I am dealing with, and with that a general overview of types in the process. In my main object3d post I also have a section on this topic, but also sections on a whole lot of other object3d related topics.

### The source code examples here are on Github

The source code examples that I am writing about here can be found in my [test threejs Github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-type). This is also where I am keeping the source code examples that I am writing about for all my other various posts on threejs, so there is a whole lot of code examples to look at for what it is worth.

### Version Numbers matter with threejs

The version of threejs that I was using when I first wrote this post was r135.

## 1 - Basic example of the type property of an Object3d instance as well as other objects

For a very basic kind of getting started or hello world type example of the type property of objects in threejs there is starting out with some example that is just a basic [scene object](/2018/05/03/threejs-scene/) with objects added of various types. So then I made a quick example where I am just creating a main scene object along with the other typical objects that I want for any threejs project such as a [camera](/2018/04/06/threejs-camera/) and [renderer](/2018/11/24/threejs-webglrenderer/). When making the camera I made sure to add the camera to the scene object so that it is a child of the scene object so that it will be one of the objects to loop over later in the code.

After setting up my scene object, camera, and renderer I will now want to add at least one instance iof the Object3d class. While I am at it I think I will also want to add at least a few [mesh objects](/2018/05/04/threejs-mesh/) to the object3d instance as children of it. For this I made a quick function that will create and return a new Mesh object that uses the built in box geometry constructor for the geometry of the mesh, and also uses the normal material for the mesh when it comes to adding texture for the geometry of the mesh object. I then created an [array of arrays](/2020/03/31/js-array-multidimensional/) where each nested array is a set of values that I want to set for the position of each mesh object. I am then just looping over this array of arrays and using the [Function apply prototype method](/2017/09/21/js-call-apply-and-bind/) with the [set method of the vector3 class instance](/2018/04/15/threejs-vector3/) of the position property of each of these mesh objects that I want to create. I then of course add each mesh object to the Object3d class instance in the body of the function that I am passing to array for each while doing this.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 5, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // object of TYPE OBJECT3D
    var obj = new THREE.Object3D();
    scene.add(obj);
    // adding MESH TYPE objects to object3d
    var mkMesh = function(){
        return  new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    [[0,0,1],[0,0,-1],[1,0,0],[-1,0,0]].forEach(function(meshData){
        var mesh = mkMesh();
        THREE.Vector3.prototype.set.apply(mesh.position, meshData)
        obj.add(mesh);
    });
    // LOOPING OVER ALL CHILDREN OF THE SCENE AND USING THE TYPE
    // PROPERTY OF EACH OBJECT TO PREFORM AN ACTION FOR THAT TYPE
    var depth = new THREE.MeshDepthMaterial();
    scene.children.forEach(function(obj){
        if(obj.type === 'PerspectiveCamera'){
            obj.position.set(8, 8, 8);
            obj.lookAt(0,0,0)
        }
        if(obj.type === 'Object3D'){
            obj.children.forEach(function(obj){
                if(obj.type === 'Mesh'){
                    obj.material = depth;
                }
            });
            
        }
    });
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

So now that I have a scene object with all these various kinds of objects added to the scene object as children I might want to have a way to go about looping over the children of the scene object, and then preform some kind of action for each type of object that is encountered. One way to do that would be to just loop over the contents of the children property of the scene object and check the type property of each objects, using that as a way to know of an specific action should be preformed or not.

## Conclusion

The type property of objects in threejs is then one of the ways that I will go about fining out what kind of object I am working with in threejs. This might work well when it comes to most objects in threejs, but I have not look into seeing if this type property is also set for all other kinds of objects in threejs. Also I have to say that checking the type of object this way is not a substitute for other means of finding the type of object that are more true to that of javaScript in general. When it comes to core javaScript there is checking the constructor property of the object which will contain a name property of the function that made it. Also there is the instance of operator as well that can often work well when it comes to working with code outside of threejs.


