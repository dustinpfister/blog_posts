---
title: Vector3 in three.js for points in space
date: 2018-04-15 20:18:00
tags: [three.js]
layout: post
categories: three.js
id: 175
updated: 2023-06-13 10:51:03
version: 1.64
---

In [Vector space](https://en.wikipedia.org/wiki/Vector_space) a Vector can be used to represent position, but they are usually described as having a magnitude and direction component. In [threejs](https://threejs.org/) the [Vector3 class](https://threejs.org/docs/index.html#api/math/Vector3) is a class that is used to create an instance of a Vector that has three values, x, y, and z. This Vector3 object is then a major class of interest then when it comes to working with all kinds of various other classes, methods, and features of threejs. 

One major feature of interest in the [Object3d base class](/2018/04/23/threejs-object3d/) is the position property of that kind of object. The position property stores an instance of Vector3, and that instance can be used to set the position of anything that is based off of Object3d like a Mesh, Camera, Group, or a whole Scene object actually for that matter.

Although an instance of Vector3 can very much be used to set a position of something it can also very much be used to set the direction of something also. This is where things might be a little confusing because when it comes to setting the orientation of something based off of Object3d there is the rotation property. This rotation property is not an instance of Vector3, but an Instance of the [Euler class](/2021/04/28/threejs-euler/). This Euler class is similar to that of Vector3, but the values given are in radians, and is then a more appropriate way of setting orientation of an object by rotating on the x, y, and z axis by given angles in the from of radian values. However there is also the concept of a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) that would be in the form of a normalized instance of Vector3 oddly enough. So then Vector3 can be used to set position, but it can also be used as a way to set orientation in the from of a direction using values between 0 and 1 for each axis.

This post is then about the Vector3 constructor that is a useful class for various things in a threejs project. A 3d Vector3 Instance is useful for plotting a single point in 3d space, but these values can also be in the range of numbers between 0 and 1 which can then be raised by a multiplier, and in some ways can be translated to angles and directions that have to do with the rotation of an object rather than its position. There are all kinds of use cases that will come up here and there for Vector3 such as finding [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) via the length method of the Vector3 instance, which is the distance from the vector to the origin for example. 

This will be a fairly lengthy post then as there is a lot of ground to cover with this one. There is not just aspects of the class itself, but how it can be applied when it comes to everything else there is to work with in threejs that is related to the use of Vector3.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/eqdDI6_EXNM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The THREE.Vector3 class and What to know first

This is a post on threejs in which I am writing about the Vector3 constructor, and the various properties, methods of the class that there are to work with. There is then also going to be an awful lot of overlap between the Vector3 class and various other features of threejs. So then this is not a simple [getting started post](/2018/04/04/threejs-getting-started/) on threejs, or [javaScript in general](/2018/11/27/js-getting-started/). I then expect for you to have at least a little background when it comes to the very basics of setting up a threejs project when it comes to client side JavaScript. 

### There is also the Euler class for angles

In the introduction of this post I mentioned the [Euler class](/2021/04/28/threejs-euler/) which is like Vector3 only it deals with angles rather than a position. Like that of the Vector3 class a Euler class also has x, y and z properties, but the expected value range is in radians rather than just any number value. The y value for a Euler instance then has to do with the angle at which an object should be rotated on the y axis rather than the position of an object along the y axis.

### Check out arrow helpers also

There is a built in helper class in threejs called the [THEE.ArrowHelper](/2018/11/10/threejs-arrow-helper/) that can be used to create and add a helper to a scene that will show the direction of a vector. This can be very useful to find out what the current state of affairs is with a single Vector3 class, and there are also many other useful helpers like that of the arrow helper.

### There are other Vector classes such as Vector2 and Vector4

The [Vector2 class](/2023/06/09/threejs-vector2/) is also there to work with when I just need a simple 2d Vector. Also the Vector4 class will come up when getting into some fairly advanced topics of threejs such as quaternion objects.

### The source code examples in this post are on Github

I have a for post folder set up in [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3) where I will be keeping the source code examples for this post, as well as for my [many other posts on threejs](/categories/three-js/).

### Threejs version numbers matter a lot.

Threejs is a project where the version number matters a lot, more so then what you might have grown accustom to when it comes to other libraries. When I first wrote this post I was using [r91](https://github.com/mrdoob/three.js/tree/r91) of threejs, and the last time I got around to doing a little editing of this post I was using threejs r135 with the later examples that I am keep at the top of this content. I still have older examples here that i am now pushing down to the bottom of this text, and the latest version that I am using with them is r111, those code examples will break in late versions of threejs.

When I edit I generally make an effort to keep the newer examples to the top of the page, and leave the older examples towards the bottom for the sake of historical reasons, and for the off chance that one might be using an older version of threejs for one reason or another.


## 1 - Basic example of a THREE.Vector3 class instance

To create a single instance of Vector3 I just need to call the constructor and pass three arguments that are the x, y, and z values of the vector. Doing so will set the starting values for the x, y, and z properties of the Vector3 instance that is returned by the constructor. I can then use this instance of Vector3 to set the position of a mesh object by calling the Vector3 copy method of a Vector3 instance stored as a position property of anything that is based off of the Object3d class such as a Mesh Object. Another option for doing so would be to use the set method which would allow for me to set the value of a Vector3 instance with values from another instance of Vector3, or by nay means of producing a desired numerical value such as the result of a JavaScript expression.

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

## 2 - Basic example of the Vector3.set method

Setting the values of a Vector3 instance can be done by just setting the values directly, that is the I can just set a desired number value to say the x property of the instance. However there is also the set prototype method of the class that can be called off of an instance of vector3 and then values can be passed by way of the arguments of the set method.

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

## 3 - Set objects in a circle around the center of a group example of Vector3.set

In this example I will once again be using the set method to set the position of objects, this time it is a collection of mesh objects that are [children of a group](/2018/05/16/threejs-grouping-mesh-objects/), and they will be positioned in a circle like formation. Speaking of groups that is yet another feature of threejs that will come into play a lot when I want to make two or more instances of Mesh objects, or any kind of Object really that is based off of Object3d children  of another Object that can then be moved and rotated and when doing so effects all children of that Object.

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

## 4 - Setting objects onto the surface of a sphere example of the Vector3 set method

Now for a more advanced example of the Vector3 set method that might help one to gain a better understanding of how a vector can be used for positioning things with an example that has to do with position one mesh onto the surface of a another mesh object that is a sphere. 

This should not be thought of as any kind of definitive solution for this sort of thing, there are a lot of ways of going about doing this, as such I have [wrote a project example post that is detected to this topic](/2021/05/14/threejs-examples-position-things-to-sphere-surface/) that I revise from time to time with other solutions some of which might prove to be better for other specific cases.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // HELPER FUNCTIONS
    // ---------- ----------
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
    // ---------- ----------
    // ADDING MESH OBJECTS TO SCENE
    // ---------- ----------
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);
    var cube = createCube();
    scene.add(cube);
    setOnSphere(cube, 0.1, 0.3, 2);
    cube.lookAt(0, 0, 0);
    // ---------- ----------
    // LOOP
    // ---------- ----------
    var sm = {
        lat: 0,
        frame: 0,
        maxFrame: 180,
        fps: 30,
        lt: new Date(),
        per: 0,
        bias: 0
    };
    var loop = function(){
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs >= 1 / sm.fps){
            sm.frame += sm.fps * secs;
            sm.frame %= sm.maxFrame;
            sm.per = sm.frame / sm.maxFrame;
            sm.bias = 1 - Math.abs(0.5 - sm.per) / 0.5;
            sm.lat = sm.bias;
            setOnSphere(cube, sm.lat, 0, 2);
            cube.lookAt(0, 0, 0);
            renderer.render(scene, camera);
            sm.lt = new Date();
        }
    };
    loop();
}
    ());
```

## 5 - Object3d and vector3

A very important base class in three.js is the [Object3D](https://threejs.org/docs/index.html#api/core/Object3D) class that is at the hart of many objects in threejs. Constructors such as Camera, Mesh, Group, and many more inherit from the base Object3d class. The reason why I bring this up is because there are a few properties in this base class the expect an instance of Vector3. Manly the Object3D.position, and Object3D.scale properties, so in this example I will be going a quick example of using the Object3d class, and also methods of the Vector3 class such as the copy method that can be used to copy the values of one instance of vector3 to another.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // OBJECT3d position property
    // ---------- ----------
    // creating a plain base instance of object3d
    var obj = new THREE.Object3D();
    console.log(JSON.stringify(obj.position));
    // {"x":0,"y":0,"z":0}
    obj.position.set(1, 2, 3);
    console.log(JSON.stringify(obj.position));
    // {"x":1,"y":2,"z":3}
    // mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // a mesh is also based on object3D and as such also has a
    // position property the copy method can be used to copy the values
    // of one instance of vector 3 to another
    mesh.position.copy(obj.position);
    scene.add(mesh);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

Because Vector3 is the constructor that is used to represent a point in 3d space in three.js, it's use is to be expected in any situation in which its use is appropriate. Therefor it pays to have a solid foundational understanding of this constructor.

## 6 - Adding, diving, and multiplying Vectors

Vectors can be added together with the add method, which is pretty straight forward. There are also methods for diving, and multiplying as well that can often prove to be useful in various types of situations. These kinds of methods can then also be used in conjunction with many others in a chain. For example I can use the set method as a way to just define a kind of direction that I want and when doing so I can use any values that i want to do so assuming that I then normalized this, then I can use the multiply scalar method to set the desired length or magnitude with that set direction.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    // center mesh
    scene.add(mkMesh());
    // adding a vector to this mesh position
    var mesh1 = mkMesh();
    mesh1.position.add(new THREE.Vector3(3, 0, 2));
    scene.add(mesh1);
   // using set, normalize, and multiplyScalar
    var mesh2 = mkMesh();
    mesh2.position.set(-1,0,-1).normalize().multiplyScalar(6);
    scene.add(mesh2);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

I will want to write more about normalization of vectors later in this post in at least one if not more examples as this is a very impotent concept to understand when it comes to working out all kinds of problems that one will run into with vectors. For now the basic idea is that it will turn a vector like 0,0,3 into 0,0,1 which I can then use with multiply scalar with a value of 6 to get 0,0,6.

## 7 - Finding the distance between two vectors.

The length method of Vector3 returns the distance from the origin, but what if I want the distance from one instance of vector3 to another that might not be the origin then I will want to use the distance to method of the vector3 class.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    scene.add(mkMesh());
 
    var m1 = mkMesh();
    m1.position.set(0, 0, 4);
    scene.add(m1);
    var m2 = mkMesh();
    var d = m1.position.distanceTo(new THREE.Vector3(0,0,0));
    m2.position.copy(m1.position).normalize().multiplyScalar(d / 2);
    console.log(m2.position);
    scene.add(m2);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
 
}
    ());
```

## 8 - Clone, and Copy

If I want to make an independent copy of a vector I can use the clone method which will return a whole new instance of vector3 with the same values of the instance of vector3 that I called the method off of. I can then mutate this new instance of vector3 without mutating any of the values of the source instance that I call the clone method off of. There is also a copy method but that is not use to create a copy of a vector3 like clone does, but rather copy the values of one instance of vector three into another, so then the copy method can be used as an alternative to the set method that involves setting an instance of vector three with another instance of vector3 rather than that of number values.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    // using the vector3 copy method to copy position
    // of m1 to position of m2
    var m1 = mkMesh();
    m1.position.set(2,0,0);
    scene.add(m1);
    var m2 = mkMesh();
    m2.position.copy(m1.position);
    m2.position.y = 2;
    scene.add(m2);
    // using the clone method of Vector3 to create a copy of
    // the position of m3, so that I can mutate a copy rather than
    // than the source of m3, that I then use to set the position of m4
    var m3 = mkMesh();
    m3.position.set(-2,0,2);
    scene.add(m3);
    var v = m3.position.clone().add(new THREE.Vector3(0, 2, 0));
    var m4 = mkMesh();
    m4.position.copy(v);
    scene.add(m4);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

Remember that objects are copied by reference in in JavaScript so you will want to use one of these methods or some other similar method to make copies of a vector.

## 9 - Normalize a Vector

Normalizing a vector will keep the direction from the origin the same, but change its distance from it to a unit vector of just one. From there it additional methods like the of the multiply scalar method can be used to set any desired length alone that same direction. For example I can create a mesh and place it at a given position, I can then use that mesh position with methods like the copy method to set a whole much of mesh objects to the same position as that mesh, but then normalize, and then use multiply scalar to set each mesh on its own position that is the same direction, but with different unit lengths.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-7, 4, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 3, 1),
            new THREE.MeshNormalMaterial());
    };
    var m1 = mkMesh();
    m1.position.set(-3, 1.5,-3);
    scene.add(m1);
    [3, 1.5, 0, -1.5, -3, -4.5,-6].forEach(function(scalar){
        var mX = mkMesh();
        mX.position.copy(m1.position).normalize().multiplyScalar(scalar);
        scene.add(mX);
    });
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

## Old EXAMPLES ( r111 and before ) that make use of the Geometry constructor

When I first wrote this post I was using r91 of threejs, and the last version of threejs that I was using in my test threejs repository before the Geometry constructor was removed was r111. Last time I cam around to do a little editing with this post version r111 is still the latest version of threeejs that I was using to get these examples to work, they will break in late version of threejs that not longer have the Geometry constructor built in.


### Create Geometry Vertices with Vector3

Although I will not be getting into making custom geometry in detail, doing so will often involve the use of Vector3 to create the array of vertices. The faces will then reference them by the index value of the vertex in the vertices array of the geometry.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-7, 4, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 3, 1),
            new THREE.MeshNormalMaterial());
    };
    var geometry = new THREE.Geometry();
    // create vertices with Vector3
    geometry.vertices.push(
        new THREE.Vector3(5, 3, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(1, -3, 1),
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
    var mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());
    mesh.scale.set(6,6,6)
    scene.add(mesh);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

### Making Lines with Vector3

Read my [full post on lines](/2018/04/19/threejs-line/).

So now that you have at least the basic idea of Vector3 down, another typical use example of the use of Vector3 is to make lines. There are a number of ways to make 3d, and 2d lines in threejs. However maybe the most important way to do so is with the Line constructor.

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

### Changing a Vector3 value in a geometry

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

## Conclusion

The Vector3 class is then a major class that will be used a whole lot in threejs projects, it is used as a way to go about setting positions of things in a scene, but the various methods are also used to set new positions by making use of tricks that have to do with the length of a vector. That is that there is knowing a thing or two about how a vector is not just position but also direction, and how the length of a vector can be adjusted without changing the direction.

It is not to say there are not a whole lot of other classes in threejs that are not a bit deal also. Another major class that I often look into now and again when  I spend a little to much time away from threejs is the Euler class, and the object3d class. The Euler class has more to do with the rotation of objects, but there is also ways of converting from one to another. The object3d class is the base class of a mesh object, and as such in contains properties like the position property as well as the scale property both of which are instances of Vector3.