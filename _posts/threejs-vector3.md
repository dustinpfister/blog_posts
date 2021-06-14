---
title: Vector3 in three.js for points in space
date: 2018-04-15 20:18:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 175
updated: 2021-06-14 09:50:51
version: 1.32
---

In [Vector space](https://en.wikipedia.org/wiki/Vector_space) there are these thing called Vectors, these vectors can be used to represent position, but they are usually described as having magnitude and direction. In [three.js](https://threejs.org/) there are many constructors of interest that have to do with many properties of objects, as well as base classes that are at the core of all kinds of objects one example of this world be the Object3d class. One major property of interest in the Object3d class is the position property of the Object3d class. The position property is an instance of Vector3, and that instance can be used to set the position of anything that is based off of Object3d like a Mesh, Camera, Group, or a whole Scene object actually for that matter.

Although an instance of Vector3 can very much be used to set a position of something it can also very much be used to set the direction of something also. This is where things might be a little confusing because when it comes to setting the orientation of something based off of Object3d there is the rotation property. This rotation property is not an instance of Vector3, but an Instance of the [Euler class](/2021/04/28/threejs-euler/). This Euler class is similar to that of Vector3, but the values given are in radians, and is then a more appropriate way of setting orientation of an object by rotating on the x, y, and z axis by given angles in the from of radian values. However there is also the concept of a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) that would be in the form of a normalized instance of Vector3 oddly enough. So then Vector3 can be used to set position, but it can also be used as a way to set orientation in the from of a direction using values between 0 and 1 for each axis.

This post is then about the [Vector3](https://threejs.org/docs/index.html#api/math/Vector3) constructor that is a useful class for various things in a three.js project. A 3d Vector3 Instance consists of an x, y, and z value which makes it useful for plotting a single point in 3d space, but these values can also be in the range of numbers between 0 and 1 which can then be raised by a multiplier, and in some ways can be translated to angles and directions that have to do with the rotation of an object rather than its position. There are all kinds of use cases that will come up here and there for Vector3 such as finding [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) via the length method of the Vector3 instance, which is the distance from the vector to the origin for example.

<!-- more -->

Vector3 instances are also used when creating geometry that will be used in a mesh, and there are also many properties in various objects that expect an instance of Vector3. There are also a whole bunch of useful methods that can be used for typical tasks such as finding the distance between two points in space, or to copy the values of one vector instance to another. While I am looking into the vector3 class I might also touch base one some other Class instances of interest such as the [Euler class](/2021/04/28/threejs-euler/) which is like Vecor3 only it deals with angles rather than a position.

## 1 - The THREE.Vector3 class and What to know first

This is a post on three.js in which I am writing about the Vector3 constructor, and the various properties but mainly methods of the class that there are to work with. So then this is not a simple [getting started post](/2018/04/04/threejs-getting-started/) on three.js, or javaScipt in general, and I expect for you to have at least a little background on those topics. 

### 1.1 - Check out arrow helpers also

There is a built in helper class in threejs called the [THEE.ArrowHelper](/2018/11/10/threejs-arrow-helper/) that can be sued to create and add a helper to a scene that can be used to know the direction of a vector.

### 1.2 - Three.js version number matters.

Three.js is a project where the version number matters, when I first wrote this post I was using [r91](https://github.com/mrdoob/three.js/tree/r91) of threejs, and the last time I got around to doing a little editing of this post I was using threejs r127. However some of the code examples here where still made when I was using a much older version of threejs, so if the code examples in this post or [any three.js post](/categories/three-js/) of mine no longer work that might be a reason why. When I edit I generally make an effort to keep the newer examples to the top of the page, and leave the older examples towards the bottom for the sake of historical reasons, and for the off chance that one might be using an older version of threejs for one reason or another.

## 2 - Basic example of a THREE.Vector3 class instance

To create a single instance of Vector3 I just need to call the constructor and pass three arguments that are the x, y, and z values of the vector. Doing so will set the starting values for the x, y, and z properties of the Vector3 instance that is returned by the constructor. I can then use this instance of Vector3 to set the position of a mesh object by calling the Vector3 copy method of a Vector3 instance stored as a position property of anything that is based off of the Object3d class such as a Mesh Object. Another option for doing so would be to use the set method which would allow for me to set the value of a Vector3 instance with values from another instance of Vector3, or by nay means of producing a desired numerical value such as the result of a javaScript expression.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    // CREATING AN INSTANCE OF Vector3 WITH
    // THE THREE.Vector3 CONSTRUCTOR
    var r = Math.PI / 180 * 90,
    x = Math.cos(r) * 2,
    z = Math.sin(r) * 2;
    var vec = new THREE.Vector3(x, 0, z);
 
    // PROPERTIES OF Vector3
    console.log(vec.isVector3); // true
    console.log(vec.x, vec.y, vec.z); // 0.70... 0.70... 0
    console.log(vec.length()); // 1
 
    // THE POSITION PROPERTY OF A MESH (OR ANYTHING BASED OFF OF OBJECT3D )
    // IS AN INSTANCE OF Vector3 SO I CAN USE THE Vector3.copy METHOD TO
    // COPY THE VALUES OF A STAND ALONE INSTANCE OF Vector3 TO THE INSTANCE
    // OF Vector3 STORED IN THE POSITON PROPERTY OF A MESH TO SET THE POSTION
    // OF THE MESH
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube.position.copy(vec);
    scene.add(cube);
 
    // I CAN ALSO USE THE Vector3.set METHOD OF THE INSTNACE OF Vector3 IN THE
    // POSIITON PROPERTY TO SET THE POSIITON OF THE MESH WITH NUMBERS IN THE FORM
    // OF NUMBER LITERALS AND/OR VARIABLES
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube2.position.set(2, 0, 0);
    scene.add(cube2);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

There are only 3 public properties of a Vector3 instance that are of interest which are of course is the x , y, and z properties of the Vector3 object that is returned when calling the constructor. To my knowledge there are only four properties in total, the fourth being the isVector3 property which should always be true. Every thing else of interest in a Vector3 instance is a method, such as the length method that will give the current Euclidean distance, or distance from the origin.

## 3 - Setting the values of a Vector3 instance

Setting the values of a Vector3 instance can be done by just setting the values directly, that is the I can just set a desired number value to say the x property of the instance. However there is also the set prototype method of the class that can be called off of an instance of vector3 and then values can be passed by way of the arguments of the set method.

### 3.1 - Basic example of the Vector3.set method

One of the many use case examples of the set method is to just use it as a way to change the position of a Mesh object, or any object based off of the Object3d class such as a Camera. The position property of anything based off of the Object3d class is an instance of the Vector3 class, and as such has the set method in the prototype as a way to go about setting the values for that instance.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    // creating a mesh called cube and adding it to a scene
    // by default it will be located at 0,0,0
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(cube);
 
    // creating a mesh called cube2 and adding it to the scene
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // USING THE SET METHOD OF THE Vector3 INSTANCE
    // AT THE POSITON PROPERTY OF MESH OBJECT cube2
    // TO SET THE POSTION OF cube2
    cube2.position.set(2, 0, 0);
    scene.add(cube2);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
 
    // USING THE SET METHOD TO SET THE POSITION OF THE CAMERA
    camera.position.set(3, 3, 3);
 
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

### 3.2 - Set objects in a circle e around the center of a group example of Vector3.set

In this example I will once again be using the set method to set the position of objects, this time it is a collection of mesh objects that are children of a group.

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // CREATE AND RETURN A GROUP OF CUBES
    // WHERE EACH CUBE IS POSITIONED IN A
    // CIRCLE AROUND THE CENTER OF THE GROUP
    var createCubeCircle = function(){
        var i = 0,
        x, z, radian, radius = 3,
        len = 10,
        cube,
        group = new THREE.Group();
        while(i < len){
            cube = createCube();
            radian = Math.PI * 2 / len * i;
            x = Math.cos(radian) * radius;
            z = Math.sin(radian) * radius;
            cube.position.set(x, 0, z);
            group.add(cube);
            i += 1;
        }
        return group;
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var cubeCircle = createCubeCircle();
    scene.add(cubeCircle);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

### 3.3 - Setting objects onto the surface of a sphere example of Vector3.set

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };
 
    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(cube, x, y, z, alt);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);
 
    var cube = createCube();
    scene.add(cube);
 
    //setOnSphereFromPos(cube, 5, 0, 0, 2);
    setOnSphere(cube, 0.1, 0.3, 2);
 
    cube.lookAt(0, 0, 0);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lat = 0.1;
    var loop = function(){
        requestAnimationFrame(loop);
        setOnSphere(cube, lat, 0, 2);
        lat += 0.1;
        lat %= 1;
        cube.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    };
    loop();
}
    ());
```

## 4 - Object3d and vector3

A very important base class in three.js is [Object3D](https://threejs.org/docs/index.html#api/core/Object3D). Many constructors in three.js such as Camera, Mesh, ect inherit from Object3d. The reason why I bring this up is because there are a few properties in this base class the expect an instance of Vector3. Manly Object3D.position, and Object3D.scale.

```js
    var obj = new THREE.Object3D();
 
    // {"x":0,"y":0,"z":0}
    console.log(JSON.stringify(obj.position));
 
    obj.position.set(1, 2, 3);
 
    // {"x":1,"y":2,"z":3}
    console.log(JSON.stringify(obj.position));
```

Because Vector3 is the constructor that is used to represent a point in 3d space in three.js, it's use is to be expected in any situation in which its use is appropriate. Therefor it pays to have a solid foundational understanding of this constructor.

## 5 - Adding, diving, and multiplying Vectors

Vectors can be added together with the add method, which is pretty straight forward. There are also methods for diving, and multiplying as well.

```js
    var vec = new THREE.Vector3(.25, 1, 5);
    vec.add(new THREE.Vector3(.25, 1, 2));
 
    console.log(vec.x, vec.y, vec.z); // 0.5 2 7
```

To quickly add a scalar values to all three values there is addScalar.

```js
    // addScalar
    var vec = new THREE.Vector3(3, 3, 7);
    vec.addScalar(10);
 
    console.log(vec.x, vec.y, vec.z); // 13 13 17
```

## 6 - Finding the distance between two vectors.

The length method of Vector3 returns the distance from the origin, but what if you want the distance from another instance of Vector3? For that there is the distance method.

```js
var a = new THREE.Vector3(10, 10, 10),
b = new THREE.Vector3(10, 5, 10);
console.log(a.distanceTo(b)); // 5
```

## 7 - Clone, and Copy

If you want to make an independent copy of a vector you can use the clone method, and if you want to copy in the values of one vector into another there is the copy method.

```js
    // clone
    var original = new THREE.Vector3(10, 10, 10),
    copy = original.clone();
    copy.x += 5;
 
    console.log(copy.x); // 15
    console.log(original.x); // 10
 
    // copy
    var a = new THREE.Vector3(1, 2, 1),
    copy = new THREE.Vector3().copy(a);
    copy.z += 2;
 
    console.log(a.z); // 1
    console.log(copy.z); // 3
```

Remember that objects are copied by reference in in javaScript so you will want to use one of these methods or some other similar method to make copies of a vector.

## 8 - Normalize a Vector

Normalizing a vector will keep it's direction from the origin the same, but change its distance from it to a unit vector of 1.

```js
    var vec = new THREE.Vector3(7, 7, 7);
 
    console.log(vec.length()); // 12.12...
 
    vec.normalize();
 
    console.log(vec.x, vec.y, vec.z); // 0.57... 0.57... 0.57...
    console.log(vec.length()); // 1
```

## 9 - Create Geometry Vertices with Vector3

Although I will not be getting into making custom geometry in detail, doing so will often involve the use of Vector3 to create the array of vertices. The faces will then reference them by the index value of the vertex in the vertices array of the geometry.

```js
    var geometry = new THREE.Geometry();
 
    // create vertices with Vector3
    geometry.vertices.push(
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1));
 
    // faces are made with the index
    // values of from the vertices array
    geometry.faces.push(
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4));
 
    geometry.normalize();
    geometry.computeFlatVertexNormals();
```

## 10 - Making Lines with Vector3

Read my [full post on lines](/2018/04/19/threejs-line/).

So now that you have at least the basic idea of Vector3 down, another typical use example of the use of Vector3 is to make lines. There are a number of ways to make 3d, and 2d lines in three.js. However maybe the most important way to do so is with the Line constructor.

Doing so is not so different from making a custom geometry that will be used in a material that renders faces. The main difference is that you only really have to work about the array of verticies, and not at all about the faces if there is not going to be any. There are two special materials that can be used with the Line constructor that are in place for this purpose that do not make use of faces, and are there purely for lines only.

```js
var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(0, 10, 0));
 
scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 0x0000ff
})));
```

## 11 - Changing a Vector3 value in a geometry

This can be done by having a reference to the vertex that you want to change, and then just go ahead and change it's position with the set method, or any other method that will have an impact on it's values. When doing this the changes might not take effect with respect to the instance of geometry, so you will need to make sure that the verticesNeedUpdate property of the geometry is set to true.

```js
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(0, 3, 3);
    camera.lookAt(0, 0, 0);
 
    // a SPHERE
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0x0f0f0f,
                wireframe: true
            }));
 
    scene.add(sphere);
 
    // THE VECTOR
    var v = new THREE.Vector3(1, 0, 0);
 
    // geometry that is using the VECTOR
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0), v);
 
    // using the geometry in a line
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
 
    scene.add(line);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var frame = 0,
    maxFrame = 100,
    per = 0,
    bias = 0;
    var loop = function () {
 
        requestAnimationFrame(loop);
 
        var radian = Math.PI * 2 * per,
        radius = .25 + .75 * bias,
        x = Math.cos(radian) * radius,
        y = Math.sin(radian) * radius,
        z = radius,
        s;
 
        // change the vector
        v.set(x, y, z);
        s = v.length();
 
        // geometry needs an update
        geometry.verticesNeedUpdate = true;
 
        sphere.geometry.normalize();
        sphere.geometry.scale(s, s, s);
 
        renderer.render(scene, camera);
 
        frame += 1;
        frame = frame % maxFrame;
        per = frame / maxFrame;
        bias = Math.abs(.5 - per) / .5;
 
    };
 
    loop();
}
    ());
```

It can go without saying that doing this can result in something that might eat up a lot of overhead, but is necessary from making things that mimic fabric, and the surface of water.

## 12 - Conclusion

Vectors are a big part of working with three.js, all the objects contain them as a way of defining points in space. Many properties of Objects are instances of Vector three as well such as Object3d.position that can be used to set the position of a Mesh, Camera or any other find of Object in a Scene. So having a solid understanding of where there is to work with when it comes to Vector three is important, as it will come up often.