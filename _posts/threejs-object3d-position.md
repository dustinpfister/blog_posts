---
title: Setting the position of objects in threejs
date: 2022-04-04 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 975
updated: 2022-11-27 15:36:31
version: 1.55
---

The [position property of the Object3d class in threejs](https://threejs.org/docs/index.html#api/en/core/Object3D.position) will hold a instance of the Vector3 class. Setting the values of this will set the position of the origin of an object of interest relative to the parent object or world space in the event that there is no parent object which will often be the case for the scene object. 

Sense the Object3d class is a base class of many objects in threejs such as [Mesh objects](/2018/05/04/threejs-mesh/) and [Cameras](/2018/04/06/threejs-camera/) just to name a few. So learning a thing or two about the position property of an object3d instance will also apply to a whole lot of various objects.

The [position property of an instance of Buffer geometry](/2021/06/07/threejs-buffer-geometry-attributes-position/) is a whole other topic of concern. When it comes to mutating the position attribute of buffer geometry that is a little more involved, however there are ways of using what there is to work with in the Vector3 class to change the various values for vertices in position attributes. However in this post I will for the most part be sticking to examples that just have to do with object3d based objects rather than the arrays of various attributes of geometry.

<!-- more -->

## The position property of the object3d class and what to know first

This is a post on just the position property of the object3d class in the javaScript library known as threejs. This is then not any kind of [how to get started with threejs kind of a post](/2018/04/04/threejs-getting-started/) as well as with any additional skills that are also required beforehand that have to do with client side web development in general. 

There are a whole lot of other topics that will branch off from the position property such as things that have to do with the Vector3 class to which the position property is an instance of in terms of its value. Also there is not just setting position but also orientation of objects so I might also need to touch base on the rotation property also in this post at least a little.

There is no way I will ever cover every little detail that should be known before hand then. Still I often use these opening sections of posts to go over a few things that you might want to read up more on before continuing with the rest of this content.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/iqTSfkGX3no" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Check out the Object3d class in general

There is a great deal to be aware of when it comes to the Object3d class in terms of properties as well as methods that often prove to be helpful. There are all kinds of useful features in this class that apply to just about everything that will be added to a scene object, including the scene object itself. In this post I will be focusing mostly on features that have to do with setting position, but there is also checking out my post on the [object3d class in general](/2018/04/23/threejs-object3d/).

### Read up more on the Vector3 class

The value of the position property of the Object3d class is an instance of the Vector3 class. This vector3 class as the name suggests stores the current state of a 3d Vector, and is also packed with a whole bunch of useful methods that have to do with the mutation of this kind of state. When it comes to Vector3, or any Vector for that matter there is thinking in terms of the direction of the Vector, and what is often called unit length. I will be touching base on a lot of what this all means in this post of course, but you might still want to check out my [main post on the Vector3 class](/2018/04/15/threejs-vector3/).

### Curves are great for moving objects along a path, so I started a threejs project example centered around that

I have a section in this post in which I am writing about using curves as a way to get vector3 objects than can then be used to set the position of an object.  There is scrolling down to read that section to get a basic idea of what the deal is, but you might also want to check out my [threejs project in which I am making a module centered around the use of curves](/2022/11/18/threejs-examples-curves-module/). When it comes to curves this might be one of the best ways to go about defining paths in space in which objects will move. I can use a built in option to create a curve, then add that to a curve path that is just simply a kind of collection of curves that acts as a single curve. There is then calling the get point method and passing an alpha value \(0 - 1\) as the first argument and the returned object in a Vector3 object which I can then copy to the position of an object that I want to position along the curve.

### The Source code example in this post are on Github

The source code examples that I am writing about in this post [can be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-position). This is also the repository where I am parking all the other source code examples for the [many other posts on threejs](/categories/three-js/) that I have written thus far over the years.

### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs, and the last time I came around to do some editing I was using r146 of the library.

## 1 - Basic examples of the position property of Object3d

To start things off, here are a few basic examples of the position property that involves just setting the position of a single mesh object as well as the camera. There are a whole lot of ways of doing this, and I will be outlining many of them here.

As with any threejs example I set up my [scene object](/2018/05/03/threejs-scene/), [camera](/2018/04/06/threejs-camera/), and [renderer](/2018/11/24/threejs-webglrenderer/) and when doing so I also often add a [Grid helper](/2022/02/18/threejs-grid-helper/) to the scene as well to have a better idea of what is going on when I position things around. I then create one or more [mesh objects](/2018/05/04/threejs-mesh/) and when doing so I will need a [geometry](/2021/04/22/threejs-buffer-geometry/) and a [mesh material](/2018/04/30/threejs-materials/) for that. I will not be getting into all the options with that here of course as I have other posts on geometry and material options. So for these basic examples I will be just going with the normal material as well as built in geometry [constructor functions](/2019/02/27/js-javascript-constructor/) such as the [Box](/2021/04/26/threejs-box-geometry/) and [Sphere geometry](/2021/05/26/threejs-sphere/) constructor functions.

### 1.1 - Using the x, y, and z properties of Vector3

Maybe one of the easiest ways of just getting started with setting position would be to just directly set, or step, the x, y, and z properties of the vector3 object stored at the position property of the object of interest. That is that I can just set the value of say the x property of the position property to a desired value and be done with it. There is also using the value itself in the expression I am using or make use of a javaScript operator such as \+\= or \-\= as a way to step the value.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
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

This might be a great way to start, and also in many situations I do in fact still update positions this way. Often I might need to work out some kind of expression and I just wan to apply it to a single axis of the object while preserving the state of the other axis values. There are however a whole lot of other ways of setting the state of the position though so lets look at a few more options.

### 1.2 - Using the set method of Vector3

The set method of the Vector3 instance would be another option to set object position to certain fixed values. With this method I can just call the set method off of the instance of Vector3 at the position property and pass number literals for a desired fixed position of the object. The first argument will be the value that I would like to set for x, followed by y and then z.

On top of using the set method to set object3d position, an instance of Vector3 can be used as a value to give to the [Object3d.lookAt method](/2021/05/13/threejs-object3d-lookat/). Here I am making a clone of the position property of the mesh, and then using the add method of the copy of the Vector3 instance to translate the position for the camera to look at, making it a position that is slightly lower than the actual position of the mesh object.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT
    mesh.position.set(-3, 0.5, 1);
    // SETTNG POSITION OF THE CAMERA
    camera.position.set(8, 4, 0);
    // setting Rotation of the camera using clone, and add Vector3 methods off 
    camera.lookAt( mesh.position.clone().add( new THREE.Vector3(0,-2,0) ) );
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 1.3 - The Copy, and add methods of vector3

Often I might already have a Vector3 object and I would like to copy the state of that vector3 to the vector3 of the position property of an object. For these kinds of tasks there is the copy method of the Vector3 class that can be used to perform this kind of action. Also I often use the copy method along with many other methods to work with in the Vector3 class. 

For example, say that I want to copy the value of one Vector3 to a mesh object, and then also do the same for a camera, but then add another vector3 value that will serve as delta values from the position so that the camera is positioned anyway from the mesh object. This kind of thing can be done with the copy and add methods like so.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
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

Say that I have two vectors that I would like to treat as start and end points in space and I would like to position a whole bunch of mesh objects between these two vectors. Once again I can use the copy method to copy the desired start point for all the mesh objects position property, and then I can call the lerp method after that. When doing so I will then just want to pass the end vector as the first argument, and then an alpha value in the 0 to 1 range. A value of zero will be the start point, 1 will be the end point, and any float value between 0 and 1 will be a point between the start and end point.


```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
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

Alpha values are something that seem to come up a lot when it comes to this sort of thing. There are many built in methods for creating alpha values in the [Math Utils object](/2022/04/11/threejs-math-utils/), and I have also made a number of projects in which I really start to explore some other options outside of the library with this. 

### 1.5 - The normalize and multiply scalar methods

Now say that I am in a situation in which I want to adjust just the length of a vector without changing the direction, or I want to set direction of a vector one way but then adjust the length by another means. For these kinds of situations there is the [normalize method](/2021/06/14/threejs-vector3-normalize/) that will set the length of the vector to 1, but will preserve the direction of the vector. Once the unit length of the vector is one then I can just multiply one or more of the axis values by the desired vector unit length that is higher or lower than 1. If I just want to multiply all axis values by one single value there is the [multiply scalar method](/2022/03/23/threejs-vector3-multiply-scalar/) that can be used to do so.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    const MESH_GEO = new THREE.SphereGeometry(0.5, 10, 10);
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
    const len = 15;
    while(i < len){
        const mesh = makeMesh();
        const alpha = i / len;
        // SETTING MESH POSITION USING set, normalize, and multiplyScalar
        // methods as a way to set a direction and unit length
        const y = -2 + 5 * alpha;
        const unitLength = -5.5 + 15 * alpha;
        mesh.position.set(-5, y, 0).normalize().multiplyScalar(unitLength);
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

### 1.6 - Apply Euler basic example

Now it is time for a not so basic, basic example of the position property of the obejcts3d class. This time I will be using the apply Euler method of the vector3 class as a way to go about setting the position of a whole bunch of mesh objects.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    const makeMesh = () => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshNormalMaterial());
        return mesh;
    };
    const setSpherePos = (mesh, a1, a2, radius) => {
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a1;
        e.z = -Math.PI * 0.5 + Math.PI * a2;
        mesh.position.set(1, 0, 0).applyEuler(e).multiplyScalar(radius);
    }
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    let i = 0;
    const len = 400;
    const perRing = 40;
    while(i < len){
        const mesh = makeMesh();
        const ri = Math.floor( i / perRing);
        const mi = i % perRing;
        const a1 = mi / perRing;
        const a2 = (ri + 1) / (( len / perRing ) + 1);
        setSpherePos(mesh, a1, a2, 5);
        const a3 = 1 - Math.abs(0.5 - a2) / 0.5;
        mesh.scale.multiplyScalar(0.25 + a3 * 1.25)
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

## 2 - Setting the positions of a parent and child objects

Things can get a little confusing when it comes to working with one or more nested objects that are children of another object. In such situations there is setting position relative to a parent object, and then there is setting an object relative to what is called world space. So then I think I should have a section in this post in which I go over at least a few examples that have to do with setting the position of objects by way of both local and world space which is one major thing that comes up when it comes to groups of objects, and setting position of children and parent objects in such situations.

### 2.1 - Group object example and local space

There is not just setting the position of a single object, but also all the children of a single object as well which can be called a  parent object. When I use the add method of a group object, or any object3d based object for that matter to add and object as a child of the parent object, the position of that child object will be relative to the parent object. The example here makes use of the [THREE.Group constructor](/2018/05/16/threejs-grouping-mesh-objects/) as a way to just create a kind of blank object that will just work as a wrapper of sorts for additional objects that I will be adding to the group that are mesh objects.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CREATING A GROUP WITH CHILDREN
    //-------- ----------
    const group = new THREE.Group();
    let i = 0, len = 30, radian, radius, x, y, z;
    while(i < len){
        const mesh = new THREE.Mesh(
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
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

So then the situation here is that I am creating a group, and then adding a bunch of mesh objects to the group, and then I am adding the group to the scene object. The position values of the mesh objects are then relative to the position of the group, and then the group is relative to the position of the scene object. The scene object is also an object3d based object just like that of the group and mesh objects, so then this two has a position property. By default the position of the scene is at 0,0,0 but it too can be moved. When a scene objects is moved it is then relative to a final kind of world space then, which I will be getting into more later in this section.

### 2.2 - Get World Position method

When adding a child object to a group the position of each child object will be relative to the parent object, and not that of world space. There is then a method in the Object3d class to help get a world space relative position rather than a parent object relative position, namely [the get world position method ](/2021/05/25/threejs-object3d-get-world-position/). This is then a method in the object3d prototype that I find myself using all the time whenever I find myself in a situation in which I want a world space relative location rather than the typical local space location of the values of position attributes of nested objects.

To use this get world position method I need to create a new Vector3 object to copy the world position to first. Then I just call the get world position method of the Object3d based object such as a group that I would like to get the world position of, passing the new vector3 object that will get the values copied to. After that I then have the world position of the object, I can then add an additional value from there to get the world space position that would be relative to the group object rather than the scene, or rather world space and a scene object can also have its x and y values alerted to something other than 0,0.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10, 0x0000ff, 0xffffff));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CREATING A GROUP WITH CHILDREN
    //-------- ----------
    const group = new THREE.Group();
    group.add( new THREE.GridHelper(10,10, 0xff0000, 0x00ff00));
    const len = 20;
    let i = 0, radian, radius = 5, x, y = 0, z;
    while(i < len){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        radian = Math.PI * 2 / len * i;
        x = Math.cos(radian) * radius;
        z = Math.sin(radian) * radius;
        mesh.position.set(x, y, z);
        mesh.lookAt(group.position);
        group.add(mesh);
        i += 1;
    }
    scene.add(group);
    group.position.set(-12, 0, -7);
    //-------- ----------
    // WORLD SPACE VECTOR
    //-------- ----------
    const v_ws = new THREE.Vector3(1, 1.5, -1);
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 3, 1),
        new THREE.MeshStandardMaterial({color: 'red'}));
    scene.add(mesh1);
    mesh1.position.copy(v_ws);
    const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 3, 1),
        new THREE.MeshStandardMaterial({color: 'red'}));
    scene.add(mesh2);
    // get world position works
    const v_ls = new THREE.Vector3()
    group.getWorldPosition(v_ls);
    v_ls.add(v_ws)
    mesh2.position.copy( v_ls );
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 4, 2)
    scene.add(dl);
    //-------- ----------
    // RENDER
    //-------- ----------
    // camera position
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 1, 0);
    // render
    renderer.render(scene, camera);
}());
```

## 3 - Setting Position With Curves

As of late I am thinking that maybe the best way to go about setting the position of an object3d based object would be to look into the [curve class](/2022/06/17/threejs-curve/) to do so. This might be a great way to set position when it comes to video projects, but might also work well in games and so forth by creating new curves as needed as well. There are ways of making custom curve classes but I have found that I do not need to bother with that by rather make use of one of the many built in curve classes to do so. In any case once I have a curve object I can use the get point method of the base curve class to get a vector3 object at any point along the curve, and then copy this to the Vector3 object at the position property of the object3d based object that I would like to positon to that point along the curve.

Anyway in this section I will not be getting into anything to advanced but rather just touching base on the basics of creating a curve and then getting a vector3 object along that curve that can then be used with the copy method of the vector3 class to set position. When it comes to really getting into curves and having a whole bunch of logic at the ready from project to project one might want to go as far as starting to have some kind of module in which to take from project to project when it comes to curves. With that said I have one of my [threejs example projects that is a kind of curve module](/2022/11/18/threejs-examples-curves-module/).

### 3.1 - Basic Curve example to set position

To start this section off here I have an example in which I am using the built in [THREE.QuadraticBezierCurve3](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) to create a curve. This curve constructor will take three arguments all of which are Vector3 objects, one for a start point, another for a control point, and a final one for and end point. Once I have my curve object that I want I can use the get point method to get any point along the curve by just calling the get point method and giving a value between 0 and one as the argument for the get point method.

In this example then I am creating a loop in which I am creating a whole bunch of mesh objects that will be placed along the curve. When I call the get point method I just give the current index value over the total number of mesh objects I want to get the point that I want along the curve.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(-5,0,5);
const v_end = new THREE.Vector3(-5,5,-5);
const v_control = new THREE.Vector3(15,0,7);
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const len = 40;
let i = 0;
while(i < len){
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.125, 30, 30), new THREE.MeshNormalMaterial() );
    const alpha = i / ( len - 1 );
    mesh.position.copy( curve.getPoint( alpha ) );
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 3.2 - Creating a Curve and using a number of helper methods to do so

In this example I am using a few helper methods that I made while working on my Frink beta world video project series. In the video project I am creating curves and using those curves to set the position of a camera along with cretaing random points in space along with these curves. However to get to the point here I am using one helper function that is just an abstraction of the THREE.QuadraticBezierCurve3 method, and another helper that calls that abstraction that allows for me to define the control point as a delta from the midpoint between the start and end points that are used to define the curve.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/GDXM1o9hMK4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


I then use these helpers to create the curve that I want at which point I can use it to get any point along the curve by using the get point method of the base curve class. The returned vector3 object can then be used to set the position of an object by just passing it as an argument to the copy method of the Vector3 class that is called off of the Vector3 object store at the position of the object3d based object that I would like to set to that given position.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS - from 'frink3' project in videoground-beta-world
    //           ( https://github.com/dustinpfister/videoground-beta-world )
    //-------- ----------
    // just a short hand for THREE.QuadraticBezierCurve3
    const QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
        let vs = x1;
        let ve = y1;
        let vc = z1;
        if(arguments.length === 9){
            vs = new THREE.Vector3(x1, y1, z1);
            ve = new THREE.Vector3(x2, y2, z2);
            vc = new THREE.Vector3(x3, y3, z3);
        }
        return new THREE.QuadraticBezierCurve3( vs, vc, ve );
    };
    // QBDelta helper using QBC3
    // this works by giving deltas from the point that is half way between
    // the two start and end points rather than a direct control point for x3, y3, and x3
    const QBDelta = function(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        const vs = new THREE.Vector3(x1, y1, z1);
        const ve = new THREE.Vector3(x2, y2, z2);
        // deltas
        const vDelta = new THREE.Vector3(x3, y3, z3);
        const vc = vs.clone().lerp(ve, 0.5).add(vDelta);
        const curve = QBC3(vs, ve, vc);
        return curve;
    };
    //-------- ----------
    // CURVE
    //-------- ----------
    const curve = QBC3(0, 0, 5, 0, 0, -5, -20, 6, 4.5);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    // mesh object that will be positioned along the curve
    const MESH_COUNT = 10;
    const POINT_COUNT = 100;
    let i = 0;
    while(i < MESH_COUNT){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.75, 0.75, 0.75),
            new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5}));
        const a1 = Math.round(i / MESH_COUNT * POINT_COUNT) / (POINT_COUNT - POINT_COUNT / MESH_COUNT );
        const a2 = a1; //0.1 + a1 * 0.9;
        // USING THE getPoint METHOD OF THE CURVE TO GET a Vector3
        // OBJECT THAT I CAN THEN USE WITH THE COPY METHOD TO SET
        // THE STATE OF THE POSITION OF THIS MESH OBJECT
        const v3 =  curve.getPoint( a2);
        mesh.position.copy( v3 );
        mesh.lookAt(0, 0, 0);
        scene.add(mesh);
        i += 1;
    }
    // grid helper
    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);
    // points to get an indea of what the deal is with the curve
    const points = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints( curve.getPoints(POINT_COUNT) ),
        new THREE.PointsMaterial({size: 0.125, color: new THREE.Color(0, 1, 0)})
    );
    scene.add(points);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 3.3 - Curves, get point method, and get alpha methods

There is not just using a curve and the get points method, but also using a curve and a custom method for getting the alpha method to use with the get point method.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    // grid helper
    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(5, 7, 5);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // just a short hand for THREE.QuadraticBezierCurve3
    const QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
        let vs = x1;
        let ve = y1;
        let vc = z1;
        if(arguments.length === 9){
            vs = new THREE.Vector3(x1, y1, z1);
            ve = new THREE.Vector3(x2, y2, z2);
            vc = new THREE.Vector3(x3, y3, z3);
        }
        return new THREE.QuadraticBezierCurve3( vs, vc, ve );
    };
    // create curve points
    const createCurvePoints = (curve, point_count, point_size, point_color, get_alpha) => {
        point_count = point_count === undefined ? 100 : point_count;
        point_size = point_size === undefined ? 1 : point_size;
        point_color = point_color || new THREE.Color(1, 1, 1);
        get_alpha = get_alpha || function(a1){ return a1; };
        const v3_array = [];
        let i = 0;
        while(i < point_count){
            v3_array.push( curve.getPoint( get_alpha(i / point_count) ));
            i += 1;
        }
        const points = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints( v3_array ),
            new THREE.PointsMaterial({size: point_size, color: point_color})
        );
        return points;
    };
    // smooth get alpha
    const getAlphaSmoother = (a1) => {
        return THREE.MathUtils.smootherstep(a1, 0, 1);
    };
    // curve mesh objects helper
    const addCurveMeshObjects = (parent, curve, mesh_count, get_alpha) => {
        get_alpha = get_alpha || function(a1){ return a1; };
        let i = 0;
        while(i < mesh_count){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5}));
            const v3 =  curve.getPoint( get_alpha( i / mesh_count ) );
            mesh.position.copy( v3 );
            parent.add(mesh);
            i += 1;
        }
    };
    //-------- ----------
    // CURVE
    //-------- ----------
    const curve1 = QBC3(-2, 0, 5, -2, 0, -5, 2, 0, 0);
    const curve2 = QBC3(2, 0, 5, 2, 0, -5, 6, 0, 0);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    addCurveMeshObjects(scene, curve1, 20);
    scene.add( createCurvePoints(curve1, 40, 0.125, new THREE.Color(0,1,1) ) );
    addCurveMeshObjects(scene, curve2, 20, getAlphaSmoother);
    scene.add( createCurvePoints(curve2, 40, 0.125, new THREE.Color(0,1,0), getAlphaSmoother ) );
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```


## 4 - Deterministic Animation examples

In order to really get a solid grasp on the subject of setting the position of object3d based objects in threejs one will want to work out a number of animations in which they are not just setting the position once, but a whole bunch of times over a length of time to create a kind of animation. When it comes to animation there are two general schools of thought that come to mind for me at least and that would be Deterministic, and Stochastic style animation. In other worlds there is having a Deterministic kind of animation where each frame over time is predicable, in other words think video rather than video game. Stochastic style animation is what I would often call the kinds of animations where randomness,and other factors such as user input are at play.

For this section I will be sticking to just a few examples of a kind of Deterministic style, saving the alternative style for some other post or section outside of this one.


### 4.1 - Just moving a bunch of mesh objects on the x axis by differing rates

To start out with animation I have an example here where I now have an animation loop rather than just a single call of the render method of the webgl renderer. This is an animation loop example that I seem to keep copying and pasting from one example to another over and over again that allows for me to set differing values for a frames per second value, one of which will be used to set the target frame rate at which the update function is called, and the other can be used to set the frame rate. This allows for me to set a low update frame rate while still going by a higher frame rate update when it comes to movement. Regardless of how I go about adjusting these settings the aim here is to update everything just by a frame over max frame value, rather than all kinds of other factors that might be at play.

The main idea here with this one is to create a group of mesh objects and have them all move along the x axis between a min and max value. To set the x value for each mesh object I am multiplying a set max amount delta value from the start point, then multiplying that by a number that is the current index of the child mesh. I then pass the result of this to the THREE.MathUtils.euclideanModulo method of the math utils object, passing the max delta value as the second argument for this function.

The end result of all of this is then to end up with a whole bunch of mesh objects that are moving from a start x position to another position that is a max delta from that start position, but at differing rates, and having them wrap around.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // make a single mesh object
    const MESH_GEO = new THREE.SphereGeometry(0.5, 20, 20);
    const MESH_MATERIAL = new THREE.MeshNormalMaterial();
    const makeMesh = () => {
        const mesh = new THREE.Mesh(
            MESH_GEO,
            MESH_MATERIAL);
        return mesh;
    };
    // make a group of mesh objects
    const makeGroup = () => {
       const group = new THREE.Group();
        let i = 0;
        const len = 9;
        while(i < len){
            const mesh = makeMesh();
            mesh.position.x = -4;
            mesh.position.z = -4 + i;
            mesh.position.y =  0.5;
            group.add(mesh);
            i += 1;
        }
       return group;
    };
    // set a group by an alpha value
    const setGroup = (group, alpha) => {
        group.children.forEach((mesh, i) => {
            mesh.position.x = -4 + THREE.MathUtils.euclideanModulo( 8 * ( i + 1 ) * alpha, 8 );
        });
    };
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    // create group
    const group = makeGroup();
    scene.add(group);
    // camera pos
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        // UPDATE GROUP
        setGroup(group, frame / frameMax);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());
```

### 4.2 - Lerp method animation example

Now that I have a nice basic by frame over max frame animation example, I can now start to move into another example that makes use of many of the Vector3 class features that I wrote about in the basic section. One very useful method that I covered out of many others was the lerp method of the vector3 class which can be used in combination with the clone method as a great way to move an object back and from between a start and end vector.

So then for this animation example I will have a collection of mesh objects that I move between a start and end Vector with the Lerp method and the use of that method will be the center point of this specific example. I will however also make use of a number of other features of the vector3 class such as the add method, as well as some Math utils methods to helper make things more interesting.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // camera pos
    camera.position.set(6, 9, 6);
    camera.lookAt(1.4, 0, 1.4);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // get a value between 0 and 1 with the given numerator denominator and count
    const getAlpha = (n, d, ct) => {
        return THREE.MathUtils.euclideanModulo(n / d * ct, 1);
    };
    // getBias is like getAlpha but the value will 'pingpong', I often also refer to this as a 'bias' value
    const getBias = (n, d, ct) => {
        return THREE.MathUtils.pingpong(getAlpha(n, d, ct) - 0.5, 1) * 2;
    };
    // just passing a getBias call to THREE.MathUtils.smoothstep
    const getSmoothBias = (n, d, ct) => {
        return THREE.MathUtils.smoothstep(getBias(n, d, ct), 0, 1);
    }
    // make a single mesh object with custom user data
    const MESH_GEO = new THREE.SphereGeometry(0.75, 20, 20);
    const makeMesh = (opt) => {
        opt = opt || {};
        const mesh = new THREE.Mesh(
            MESH_GEO,
            new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 }));
        const ud = mesh.userData;
        ud.v_start = opt.v_start || new THREE.Vector3(-4, 0, -4);
        ud.v_end = opt.v_end || new THREE.Vector3(4, 0, -4);
        ud.v_add = opt.v_add || new THREE.Vector3(0, 0, 8);
        return mesh;
    };
    const updateMesh = (mesh, opt) => {
        opt = opt || {};
        opt.alphaLerp = opt.alphaLerp === undefined ? 0 : opt.alphaLerp;
        opt.alphaAdd = opt.alphaAdd === undefined ? 1 - getSmoothBias(opt.alphaLerp, 1, 1) : opt.alphaAdd;
        //const alpha = getSmoothBias(frame, frameMax, 4);
        const ud = mesh.userData;
        const delta = ud.v_add.clone().multiplyScalar( opt.alphaAdd );
        mesh.position.copy(ud.v_start).lerp(ud.v_end, opt.alphaLerp).add( delta );
    }
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    const group = new THREE.Group();
    const len = 18;
    let i = 0;
    while(i < len){
        const alpha = i / len;
        const mesh = makeMesh({
            v_add: new THREE.Vector3(0, 4, 8)
        });
        group.add(mesh);
        i += 1;
    }
    scene.add(group);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        group.children.forEach((mesh, i, arr)=>{
            let alpha1 =  1 - getSmoothBias(frame, frameMax, 4),
            alpha2 = getAlpha( alpha1 - 0.75 * ( i / arr.length ), 1, 1);
            updateMesh(mesh, {
                alphaLerp: alpha2,
                alphaAdd: 1 - getSmoothBias(alpha2, 1, 2 * alpha1)
            });
            // opacity
            let alphaEffect = 1 - getSmoothBias(alpha2, 1, 1);
            mesh.material.opacity = alphaEffect;
            // scale
            let s = 0.25 + 0.75 * alphaEffect;
            mesh.scale.set(s, s, s);
        });
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());
```

### 4.3 - Using a Curve to position a mesh object over time

Here I have an animation loop example based off the basic curve section example. This time I made a custom get alpha method that makes use of a number of methods in the [Math Utils object](/2022/04/11/threejs-math-utils/) to get a smooth animation along the curve back and forth.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS - from 'frink3' project in videoground-beta-world
    //           ( https://github.com/dustinpfister/videoground-beta-world )
    //-------- ----------
    // just a short hand for THREE.QuadraticBezierCurve3
    const QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
        let vs = x1;
        let ve = y1;
        let vc = z1;
        if(arguments.length === 9){
            vs = new THREE.Vector3(x1, y1, z1);
            ve = new THREE.Vector3(x2, y2, z2);
            vc = new THREE.Vector3(x3, y3, z3);
        }
        return new THREE.QuadraticBezierCurve3( vs, vc, ve );
    };
    // QBDelta helper using QBC3
    // this works by giving deltas from the point that is half way between
    // the two start and end points rather than a direct control point for x3, y3, and x3
    const QBDelta = function(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        const vs = new THREE.Vector3(x1, y1, z1);
        const ve = new THREE.Vector3(x2, y2, z2);
        // deltas
        const vDelta = new THREE.Vector3(x3, y3, z3);
        const vc = vs.clone().lerp(ve, 0.5).add(vDelta);
        const curve = QBC3(vs, ve, vc);
        return curve;
    };
    // custom get alpha method
    const getAlpha = (a1) => {
        const a2 = THREE.MathUtils.pingpong(a1, 0.5);
        return THREE.MathUtils.smoothstep(a2 * 2, 0, 1);
    };
    //-------- ----------
    // CURVE
    //-------- ----------
    const curve = QBC3(0, 0, 5, 0, 0, -5, -15, 7, 2.5);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    // grid helper
    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);
    // mesh object that will be positioned along the curve
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // points
    const POINT_COUNT = 300;
    let i = 0, v3Array = [];
    while(i < POINT_COUNT){
        const a2 = getAlpha( i / POINT_COUNT);
        v3Array.push( curve.getPoint( a2 ) );
        i += 1;
    }
    const points = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints( v3Array ),
        new THREE.PointsMaterial({size: 0.075})
    );
    scene.add(points);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = POINT_COUNT;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = getAlpha(a1);
        const v3 = curve.getPoint( a2 );
        mesh.position.copy( v3 );
        mesh.lookAt(0, 0, 0);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());
```

## Conclusion

The position property of the Object3d class is one feature of threejs that I find myself using all the time in projects, as the name suggests it is how to go about setting the current position of something in an over all project. The rotation property and the look at method of the object3d class is also of interest of course when it comes to setting the orientation of objects as well. There are also a whole lot of other features in threejs that are closely related to the position property also that I should maybe mention in this conclusion section when it comes to fuhrer reading topics related to this. One such feature that comes to mind right away is the [Raycaster class](/2021/05/18/threejs-raycaster/). If you are wondering how to go about getting a position on the surface of the geometry of a mesh object this raycaster class is a very helpful toll for that kind of thing.
