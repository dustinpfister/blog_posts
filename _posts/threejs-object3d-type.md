---
title: The type property of Objects in threejs
date: 2022-04-01 11:46:00
tags: [three.js]
layout: post
categories: three.js
id: 974
updated: 2022-04-01 12:19:13
version: 1.11
---

One major part of [learning how to use threejs](https://threejs.org/docs/#api/en/core/Object3D) is to get a solid grasp on what there is to work with in the [object3d class](/2018/04/23/threejs-object3d/). There is not just the base object3d class itself, but also a whole lot of other objects that are based off of the object 3d class. So once one gets an idea as to what the position property of the Object3d class is all about for example, they can also apply that same understanding to Mesh objects, Groups, Cameras and even a whole Scene object of the feel inclined to do so.

So then because there are all these different kinds of objects in threejs that are all based off of three.js there should be some kind of standard way of finding out what kind of object that I am working with. As with any other kind of class in threejs there is of course using something like the instanceof operator to find out if I am dealing with a given class of object or not. However there is also a type property of all these various types of objects that can also be used as a way to find out what type of object I am dealing with when looping over objects in a scene.

Speaking of looping over objects in a scene there is also the children property of objects, as well as things like the add method of these objects. Array prototype methods like that of the [array forach method](/2019/02/16/js-javascript-foreach/) can be used with the children arrays of these objects, but there are other threejs built in options to work with such as the [traverse method](/2021/06/03/threejs-object3d-traverse/) that can also be used to loop over the full contents of an object and the children of the object.

<!-- more -->


## 1 - Basic example of the type property of an Object3d instance as well as other objects

For a very basic kind of getting started or hello world type example of the type property of objects in threejs there is starting out with some example that is just a basic [scene object](/2018/05/03/threejs-scene/) with objects added of various types. So then I made a quick example where I am just creating a main scene object along with the other typical objects that I want for any threejs project such as a [camera](/2018/04/06/threejs-camera/) and [renderer](/2018/11/24/threejs-webglrenderer/). When making the camera I made sure to add the camera to the scene object so that it is a child of the scene object so that it will be one of the objects to loop over later in the code.

After setting up my scene object, camera, and renderer I will now want to add at least one instance iof the Object3d class. While I am at it I think I will also want to add at least a few [mesh objects](/2018/05/04/threejs-mesh/) to the object3d instance as children of it. For this I made a quick function that will create and return a new Mesh object that uses the built in box geometry constructor for the geometry of the mesh, and also uses the normal material for the mesh when it comes to adding texture for the geometry of the mesh object. I then created an array of arrays where each nested array is a set of values that i want to set for the position of each mesh object. I am then just looping over this array of arrays and using the Function apply protoype method with the set method of the vector3 class instance of the position property of each of these mesh objects that I want to create. I then of course add each mesh object to the Object3d class instance in the body of the function that I am passing to array for each while doing this.

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

## 2 - Conclusion

The type property of just about almost any object in threejs is then one of the ways that I will go about fining out what kind of object I am working with in threejs. This might work well when it comes to most objects in threejs, but I have not look into seeing if this type property is also set for all other kinds of objects in threejs. Also I have to say that checking the type of object this way is no substitute for other means of finding the type of object that are more true to that of javaScript in general such as checking the constructor property of the object, or using the instanceof operator.

