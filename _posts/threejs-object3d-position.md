---
title: Setting the position of objects in threejs
date: 2022-04-04 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 975
updated: 2022-09-26 16:40:53
version: 1.24
---

The [position property of the Object3d class in threejs](https://threejs.org/docs/index.html#api/en/core/Object3D.position) will hold an instance of the [Vector3 class](/2018/04/15/threejs-vector3/), and setting the values of this will set the position of the origin of an object of interest. Sense [the Object3d class](/2018/04/23/threejs-object3d/) is a base class of many objects in threejs such as [Mesh objects](/2018/05/04/threejs-mesh/) and [Cameras](/2018/04/06/threejs-camera/) just to name a few, what applys to the position property of an object3d instance and also be done with a whole lot of various objects that can be added to a scene object. Speaking of scene objects they two are based off of object3d, so the position property can be used to change the position of a whole scene relative to what is often refer to as world space.

The [position property of an instance of Buffer geometry](/2021/06/07/threejs-buffer-geometry-attributes-position/) is a whole other topic of concern. When it comes to mutating the position attribute of buffer geometry that is a little more involved, however there are ways of using what there is to work with in the Vector3 class to change the various values for vertices in position attributes. However in this post I will for the most part be sticking to examples that just have to do with object3d based objects rather than the arrays of various attributes of geometry.

<!-- more -->

## The position property of the object3d class and what to know first

This is a post on just the position property of the object3d class in the javaScript library known as threejs. So then this is not any kind of [how to get started with threejs kind of a post](/2018/04/04/threejs-getting-started/) as well as with any additional skills that are also required before hand that have to do with client side web development in general. There are a whole lot of other topics that will branch off from the position property such as things that have to do with the Vector3 class to which the position property is an instance of with respect to the value of the property. Also There is not just setting position but also orientation of objects so I might also need to touch base on the rotation property also in this post.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/iqTSfkGX3no" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs, and the last time I came around to do some editing I was using r140 of the library.

### The Source code example in this post are on github

The source code examples that I am writing about in this post [can be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-position). This is also the repository where I am parking all the other source code examples for the [many other posts on threejs](/categories/three-js/) that I have wrote thus far over the years.

## 1 - Basic examples of the position property of Object3d

To start things off here are a few basic examples of the position property that involves just setting the position of a single mesh object as well as the camera that is used to render at least for starters.

As with any threejs example I set up my scene object, camera, and renderer and when doing so I also often add a Grid helper to the scene as well if it is going to just be some simple example like this. I then create one or more mesh objects and when doing so I will need a geometry and a material for that. I will not be getting into all the options with that here of course as I have other posts on geometry and material options. So for these basic examples I will be just going with the normal material as well as built in geometry constructors such as the Box and Sphere geometry constructor functions.

### 1.1 - Using the x, y, and z properties of Vector3

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT WITH x,y,z props
    mesh.position.x = 4;
    mesh.position.y = 0.5;
    mesh.position.z = 4;
    // A Camera can also be set this way
    camera.position.z = 8;
    camera.position.y = 8;
    // look at 0,0,0
    camera.lookAt( 0, 0, 0 );
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 1.2 - Using the set method of Vector3

The set method of the Vector3 instance would be one way to go about setting the value of the position of something such as the mesh object. With this method I can just call the set method off of the instance of Vector3 at the position property of say the mesh object and pass number literals for a desired fixed position of the mesh object. The same can be done with the camera as well as that is also an object3d based object.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // adding a mesh object
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT
    mesh.position.set(-3, 0.5, 1);
    // SETTNG POSITION OF THE CAMERA
    camera.position.set(8, 4, 0);
    // setting Rotation of the camera using clone, and add Vector3 methods off 
    camera.lookAt( mesh.position.clone().add( new THREE.Vector3(0,-2,0) ) );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

It would be a good idea to [look into the Vector3 class more](/2018/04/15/threejs-vector3/) at some point if you have not done so, as like that of the Object3d class it will come up a lot. For example in this basic example n instance of Vector3 can be used as a value to give to the [Object3d.lookAt method](/2021/05/13/threejs-object3d-lookat/). Here I am making a clone of the position property of the mesh and then using the add method of the copy of the Vector3 instance to translate the position for the camera to look at making it a position that is slightly lower than the actually position of the mesh object.

### 1.3 - The Copy, and add methods of vector3

Often I might all ready have a Vector3 object and I would like to copy the state of that vector3 to the vector3 of the position property of an object. For these kinds of tasks there is the copy method of the Vector3 class that can be used to preform this kind of action. Also I often use the copy method along with many other methods to work with in the Vector3 class. For example say that I want to copy the value of one Vector3 to a mesh object, and then also do the same for a camera, but then add another vector3 value that will serve as delta values from the position so that the camera is positioned anyway from the mesh object. This kind of thing can be done with the copy and add methods like so.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    // mesh
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SOME INSTANCES OF Vector3 THAT I would like to COPY to other Vector3 instances
    const v1 = new THREE.Vector3(-4, -0.5, 4);
    const v2 = new THREE.Vector3( 5, 5, 5);
    // COPYING v1 TO THE POSITION OF THE MESH
    mesh.position.copy(v1)
    // COPYING V1 TO THE CAMERA AND THEN ADDING v2
    camera.position.copy(v1).add(v2);
    camera.lookAt(v1);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 1.4 - The lerp method, along with clone for positioning between two vectors

Say that I have two vectors that I would like to treat as start and end points in space and I would like to position a whole bunch of mesh objects between these two vectors. Once again I can use the copy method to copy the desired start point for all the mesh objects position property, and then I can call the lerp method after that. When doing so I will then just want to pass the end vector as the first argument, and then an alpha value in the 0 to 1 range.


```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    const MESH_GEO = new THREE.SphereGeometry(0.5, 20, 20);
    const MESH_MATERIAL = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.8});
    const makeMesh = () => {
        const mesh = new THREE.Mesh(
            MESH_GEO,
            MESH_MATERIAL);
        return mesh;
    };
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    let i = 0;
    const len = 20;
    // STRT AND END VECTORS TO LERP TO AND FROM
    const v_start = new THREE.Vector3(-25,-20, 0);
    const v_end = new THREE.Vector3(6, 5, 0);
    while(i < len){
        const mesh = makeMesh();
        const alpha = i / len;
        // UISNG COPY AND LERP TO SET POSITION
        mesh.position.copy(v_start).lerp(v_end, alpha);
        // scale
        const s = 5 - 4.75 * alpha;
        mesh.scale.set(s, s, s);
        // add to scene
        scene.add(mesh);
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

## 2 - Setting the position of a parent and child

There is not just setting the position of a single object, but also all the children of a parent object as well as the parent object as a whole. In other words the add method of the scene object is not just a method of the scene object, but yet another method of the Object3d class to which the scene object is another example of an object that is based off of the object 3d class. Yes the scene object also has a position property and if desired that can be used as a way to change the position of a whole scene relative to what is often called world space. However for now when it comes to this section I will be going over an example that make use of the [THREE.Group constructor](/2018/05/16/threejs-grouping-mesh-objects/) as a way to have a parent and child kind of situation with the position of objects.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CREATING A GROUP WITH CHILDREN
    var group = new THREE.Group();
    var i = 0, len = 30, radian, radius, x, y, z;
    while(i < len){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        radian = Math.PI * 2 * 4 / len * i;
        radius = 1;
        x = Math.cos(radian) * radius;
        y = 10 / 2 * -1 + 10 * ( i / len);
        z = Math.sin(radian) * radius;
        // SETTING THE POSITION OF JUST THIS MESH
        mesh.position.set(x, y, z);
        group.add(mesh);
        i += 1;
    }
    scene.add(group);
 
    // SETTING POSITION OF THE GROUP
    group.position.set(-5,0,-5)
 
    // POSITON AND ROTATION OF CAMERA
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 1, 0);
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

In this example I am creating a group and then I am created and positioning a whole bunch of mesh objects and adding them as children for the group. When adding a child object to a group the position of each child object will be relative to the parent object, and not that of world space. There are methods in the Object3d class to help get a world space relative position rather than a group relative position, namely [the get world position method ](https://threejs.org/docs/#api/en/core/Object3D.getWorldPosition), but for now there is just being mindful of the situation with parent and child objects.

## Conclusion

The position property of the Object3d class is one feature of threejs that I find myself using all the time in projects, as the name suggests it is how to go about setting the current position of something in an over all project. The rotation property and the look at method of the object3d class is also of interest of course when it comes to setting the orientation of objects as well. There are also a whole lot of other features in threejs that are closely related to the position property also that I should maybe mention in this conclusion section when it comes to fuhrer reading topics related to this. One such feature that comes to mind right away is the [Raycaster class](/2021/05/18/threejs-raycaster/). If you are wondering how to go about getting a position on the surface of the geometry of a mesh object this raycaster class is a very helpful toll for that kind of thing.