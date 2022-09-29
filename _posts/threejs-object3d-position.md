---
title: Setting the position of objects in threejs
date: 2022-04-04 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 975
updated: 2022-09-29 16:42:35
version: 1.33
---

The [position property of the Object3d class in threejs](https://threejs.org/docs/index.html#api/en/core/Object3D.position) will hold an instance of the Vector3 class, and setting the values of this will set the position of the origin of an object of interest. Sense the Object3d class is a base class of many objects in threejs such as [Mesh objects](/2018/05/04/threejs-mesh/) and [Cameras](/2018/04/06/threejs-camera/) just to name a few, what applys to the position property of an object3d instance and also be done with a whole lot of various objects that can be added to a scene object. Speaking of scene objects they two are based off of object3d, so the position property can be used to change the position of a whole scene relative to what is often refer to as world space.

The [position property of an instance of Buffer geometry](/2021/06/07/threejs-buffer-geometry-attributes-position/) is a whole other topic of concern. When it comes to mutating the position attribute of buffer geometry that is a little more involved, however there are ways of using what there is to work with in the Vector3 class to change the various values for vertices in position attributes. However in this post I will for the most part be sticking to examples that just have to do with object3d based objects rather than the arrays of various attributes of geometry.

<!-- more -->

## The position property of the object3d class and what to know first

This is a post on just the position property of the object3d class in the javaScript library known as threejs. So then this is not any kind of [how to get started with threejs kind of a post](/2018/04/04/threejs-getting-started/) as well as with any additional skills that are also required before hand that have to do with client side web development in general. There are a whole lot of other topics that will branch off from the position property such as things that have to do with the Vector3 class to which the position property is an instance of. Also There is not just setting position but also orientation of objects so I might also need to touch base on the rotation property also in this post at least a little.

I will then not be getting into detail with every little thing that you should know at this point before hand. However I do often use these opening sections of posts to go over a few things that you might want to read up more on before continuing with the rest of this content.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/iqTSfkGX3no" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Check out the Object3d class in general

There is a great deal to be aware of when it comes to the Object3d class in terms of properties as well as methods that often prove to be helpful. In this post I will be focusing mostly on features that have to do with setting position, but there is also checking out my post on the [object3d class in general](/2018/04/23/threejs-object3d/).

### Read over what there is to work with when it comes to Vector3 also

The value of the position property of the Object3d class is an instance of the Vector3 class. This vector3 class as the name suggests stores the current state of a 3d Vector, and is also packed with a whole bunch of useful methods that have to do with the mutation of this kind of state. When it comes to Vector3, or any Vector for that matter there is thinking in terms of the direction of the Vector, and what is often called vector unit length. I will be touching base on a lot of what this all means in this post of course, but you might still want to check out my [main post on the Vector3 class](/2018/04/15/threejs-vector3/).

### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs, and the last time I came around to do some editing I was using r140 of the library.

### The Source code example in this post are on github

The source code examples that I am writing about in this post [can be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-position). This is also the repository where I am parking all the other source code examples for the [many other posts on threejs](/categories/three-js/) that I have wrote thus far over the years.

## 1 - Basic examples of the position property of Object3d

To start things off here are a few basic examples of the position property that involves just setting the position of a single mesh object as well as the camera that is used to render at least for starters.

As with any threejs example I set up my scene object, camera, and renderer and when doing so I also often add a Grid helper to the scene as well if it is going to just be some simple example like this. I then create one or more mesh objects and when doing so I will need a geometry and a material for that. I will not be getting into all the options with that here of course as I have other posts on geometry and material options. So for these basic examples I will be just going with the normal material as well as built in geometry constructors such as the Box and Sphere geometry constructor functions.

### 1.1 - Using the x, y, and z properties of Vector3

here are a number of ways to set the state of the Vector3 class instance of the position of an object3d based object in threejs such as a camera or mesh object. However maybe one of the easy, just getting started type ways would be to just directly set, or step the x, y, and z values of the instance. That is that I can just set the value of say the x property of the vector3 class instance of the position property to a desired value and be done with it. This can also be done with the various other properties of interest when it comes to the y and z axis as well.

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

This might be a great way to start, and also in many situations I do in fact still update position this way. However there are a whole lot of other ways of setting position in the Vector3 class tool box, so lets look at a few more basic examples before moving on to some more advanced topics.

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

### 1.5 - The normalize and multiply scalar methods

Say that I am in a situation in which I want to adjust just the length of a vector without changing the direction, or I want to set direction of a vector one way but then adjust the length by another means. For these kinds of situations there is the normalize method that will set the length of the vector to 1, but will preserve the direction of the vector. Once the unit length of the vector is one then I can just multiply one or more of the axis values by the desired vector unit length that is higher or lower than 1. If I just want to multiply all axis values by one single value there is the multiply scalar method that can be used to do so.

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

## 2 - Setting the positions of a parent and child objects

things can get a little confusing when it comes to working with one or more nested objects that are children of another object. In such situations there is setting position relative to a parent object, and then there is setting an object relative to what is called world space. Sense this is very much a blog post on the subject of the position property of Object3d based objects, I think I should have a section in this post in which I go over at least a few examples that have to do with setting the position of objects by way of both local and world space.

### 2.1 - Basic group example

There is not just setting the position of a single object, but also all the children of a parent object as well as the parent object as a whole. In other words the add method of the scene object is not just a method of the scene object, but yet another method of the Object3d class to which the scene object is another example of an object that is based off of the object 3d class. Yes the scene object also has a position property and if desired that can be used as a way to change the position of a whole scene relative to what is often called world space. However for now when it comes to this section I will be going over an example that make use of the [THREE.Group constructor](/2018/05/16/threejs-grouping-mesh-objects/) as a way to have a parent and child kind of situation with the position of objects.

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

In this example I am creating a group and then I am created and positioning a whole bunch of mesh objects and adding them as children for the group. 

### 2.2 - Get World Position method

When adding a child object to a group the position of each child object will be relative to the parent object, and not that of world space. There are methods in the Object3d class to help get a world space relative position rather than a group relative position, namely [the get world position method ](/2021/05/25/threejs-object3d-get-world-position/) that will prove to be useful if I want to position an object relative to another object, without making it a child of that object.

To use this get world position method I need to create a new Vector3 to copy the world position to first. The I just call the get world position method of the Object3d based object such as a group that I would like to get the world position of, passing the new vector3 object that will get the values copied to. After that I then have the world position of the object, I can then add an additional value from there to get the world space position that would be relative to the group object rather than the scene, or rather world space and a scene object can also have its x and y values alerted to something other than 0,0.

```js
(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10, 0x0000ff, 0xffffff));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
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

## 3 - Basic Deterministic Animation examples

In order to really get a solid grasp on the subject of setting the position of object3d based objects in threejs once will want to work out a number of animations in which they are not just setting the position once, but a whole bunch of times over a length of time to create a kind of animation. When it comes to animation there are two general schools of thought that come to mind for me at least and that would be Deterministic, and Stochastic style animation. In other worlds there is having a Deterministic kind of animation where each frame over time is predicable, in other words think video rather than video game. Stochastic style animation is what I would often call the kinds of animations where randomness,and other factors such as user input and stream data are at play.

For this section I will be sticking to just a few examples of a kind of Deterministic style, saving the alternative style for some other post of section outside of this one.


### 3.1 - Just moving a bunch of mesh objects on the x axis by differing rates

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
    const renderer = new THREE.WebGLRenderer();
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

### 3.2 - Lerp method animation example

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
    const renderer = new THREE.WebGLRenderer();
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

## Conclusion

The position property of the Object3d class is one feature of threejs that I find myself using all the time in projects, as the name suggests it is how to go about setting the current position of something in an over all project. The rotation property and the look at method of the object3d class is also of interest of course when it comes to setting the orientation of objects as well. There are also a whole lot of other features in threejs that are closely related to the position property also that I should maybe mention in this conclusion section when it comes to fuhrer reading topics related to this. One such feature that comes to mind right away is the [Raycaster class](/2021/05/18/threejs-raycaster/). If you are wondering how to go about getting a position on the surface of the geometry of a mesh object this raycaster class is a very helpful toll for that kind of thing.