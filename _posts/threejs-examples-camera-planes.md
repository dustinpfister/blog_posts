---
title: Camera Planes module threejs example
date: 2023-03-10 08:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1031
updated: 2023-03-10 12:43:05
version: 1.9
---

When working on various threejs projects I have thought that it would be nice to have a way to just simply have a simple 2d layer to display debug info, or when making a final product to just use for any and all overlays that have to do with simple messages and so forth. Anyway of course, as always there is more than one way to go about doing something like this. One way would be to just have an HTML Collection of canvas elements, some of which are the DOM element properties of a threejs renderer, and others are just plane old 2d drawing content canvas elements. That is all fine and good, and maybe that is how I will need to go about doing things with certain projects. However for this [threejs project example](/2021/02/19/threejs-examples/) I am thinking more in terms of just going with a single canvas element that is the DOM element of a WebGL renderer, and making use of mesh objects, plane geometry, and various camera properties to just position, rotate, and scale such mesh objects so they are just in front of a camera at all times.


<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/72QHKMsQejM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Camera Planes module threejs example and what to know first

This is a blog post on a project example that works on top of the javaScript library known as threejs. I assume that you have all ready broke ground when it comes to the very basics of threejs, and also know a thing or two about client side javaScript in general, as well as at least a little bit about certain back end javaScript topics. If not then the content of this post might prove to be a little too advanced for you and getting into all of that would be outside the scope of this post. I have all ready wrote [getting started type posts on threejs](/2018/04/04/threejs-getting-started/), and these various other topics a long time ago at this point. However in this section I will write about at least a few things that you might want to read up more on before reading the rest of this post.

### Read more on the base camera class, and the perspective camera.

There is the [base camera class](/2018/04/06/threejs-camera/), and also the [perspective camera](/2018/04/07/threejs-camera-perspective/) that extends that base camera class. There are a lot of other options when it comes to cameras, but for the most I stick with the perspective camera with most projects. I am using the aspect property of the perspective camera as a way to know how to scale the mesh object, and there are a lot of other camera related topics that i will not be getting into depth with here.

### Check out plane geometry, mesh objects, and the object3d class

There is also looking into the [plane geometry](/2019/06/05/threejs-plane/) constructor which is a good option for learning the basics of geometry in threejs. Speaking of geometry, yes there is a whole lot to be aware of when it comes to [buffer geometry](/2021/04/22/threejs-buffer-geometry/) in general as well. On top of that there is also knowing a thing or two about [mesh objects](/2018/05/04/threejs-mesh/), and the base class of mesh objects as well as cameras and just about any object that will be added to a scene object which is the [object3d class](/2018/04/23/threejs-object3d/).

### Source code is up on Github

The source code examples that I am writing about in this post can also be found in my [test git hub repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-camera-planes) on Github. That is also where I park the [source code examples for my many other blog posts](/categories/three-js/) on threejs as well.

### Version Numbers matter

When I first wrote this post I was using r146 of threejs.

## 1 - The first version of the camera planes module ( R0 ), and some demos

There is always that very first version of a module where I end up being the core idea of what I want working, but there are likely at least a few bugs, and a lack of features. With that said in this section I am starting out with the source code of the very first revision of the module, and with that a few demos that make use of that module. This first version has just two public methods, one to create a THREE.Group object that will contain a camera and a number of mesh objects, and an update method that will be used to update the state of these objects over time. The demos that I have thus far are to just test out that the features are working okay, and also to find things that i might want to change or add in future revisions of this project.

### 1.a - The camera planes module ( R0 - r146 style - IIFE format )

The main thing that I wanted to do with this first version is to just have a method that creates a THREE.Group object, and appends a camera as well as a number of mesh objects with plane geometry. I then thought that it would be a good idea to have the camera at a fixed local position of the group, say a -1 on the z axis and have it face the origin of the group. I can then position a mesh object with plane geometry at the origin, rotate the mesh so that the front side is facing the camera, and then have options to adjust things so that it can be lined up in a way so that it will work as a 2d overlay of sorts.
There is a lot more that I would like to do of course, as it would be nice to have more than one mesh objects, and also update those mesh objects over time. With that said I put in a few options that give me a fair amount of flexibility with respect to those things. However the core idea that I have in mind for most projects is to have just one mesh object, and to maybe always have it fixed at a standard location. 


```js
// camera-planes - r0 - from threejs-examples-planes
(function(api){
    //-------- ----------
    // CONST VALUES
    //-------- ----------
    const MATERIAL_PLANE = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        transparent: true,
        opacity: 0.25
    });
    const DEFAULT_EFFECT = (group, mesh_plane, gud, mud, a_plane, alpha) => {
        const z = gud.zMax - gud.zMax * a_plane * alpha;
        mesh_plane.position.set(0, 0, z);
        mesh_plane.material.opacity = alpha;
    };
    const DEFAULT_CREATE_OPTIONS = {
        camera: new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 1000),
        planeScale: 0.75,
        zMax: 15,
        count: 1,
        effect: DEFAULT_EFFECT
    };
    //-------- ----------
    // HELPER FUNCITONS
    //-------- ----------
    // create a single plane
    const createPlane = (id) => {
        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        geometry.rotateY(Math.PI);
        const mesh_plane = new THREE.Mesh(geometry, MATERIAL_PLANE.clone());
        mesh_plane.name = 'plane_' + id;
        const mud = mesh_plane.userData;
        mud.id = id;
        return mesh_plane
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.update = (group, alpha) => {
        const gud = group.userData;
        group.traverse( (obj, i) => {
            // if an object is a mesh, and the name starts with 'plane'
            if(obj.type === 'Mesh' && obj.name.split('_')[0] === 'plane'){
                const mesh_plane = obj;
                const mud = mesh_plane.userData;
                const s = gud.planeScale;
                mesh_plane.scale.set( gud.camera.aspect * s, s, s );
                const a_plane = ( mud.id + 1 ) / gud.count;
                gud.effect(group, mesh_plane, gud, mud, a_plane, alpha);
            }
        });
    };
    api.create = (opt) => {
        opt = opt || {};
        // create group, set up userData Object
        const group = new THREE.Group();
        const gud = group.userData;
        Object.assign(gud, DEFAULT_CREATE_OPTIONS, opt);
        group.add(gud.camera);
        gud.camera.position.set(0, 0, -1);
        gud.camera.lookAt(group.position);
        // create first plane, call update for first time
        let i = 0;
        while(i < gud.count){
            group.add( createPlane(i) );
            i += 1;
        }
        api.update(group, 1);
        return group;
    };
}( this['cameraPlanes'] = {} ));
```

### 1.1 - Basic demo creating a camera planes with default options

The first demo of the very first version of the module should always be a kind of hello world typo example. With that said that is what this demo will be. Here I just create my usual set of objects, and then I create the group by calling the create method of the camera planes module. WIth these hello world examples I often just call the cerate method without any options to just know what the outcome is when using it with the hard coded options for everything.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GRID
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );
//-------- ----------
// camera group
//-------- ----------
const group_camera = cameraPlanes.create();
scene.add(group_camera);
// ---------- ----------
// RENDER
// ---------- ----------
// it is then the group that I would want to move and rotate rather than the camera
group_camera.position.set(0,1,-3);
group_camera.lookAt( 0, 0, 0 );
renderer.render(scene, group_camera.userData.camera);
```

### 1.2 - Layers demo with custom effect

Now that I have the basic example out of the way I can now get started with a demo where I make use of some custom options.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GRID
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );
//-------- ----------
// camera group
//-------- ----------
const group_camera = cameraPlanes.create({
    planeScale: 0.9,
    camera: new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000),
    zMax: 3,
    count: 5,
    effect: (group, mesh_plane, gud, mud, a_plane, alpha) => {
        const z = gud.zMax - gud.zMax * a_plane * alpha;
        mesh_plane.position.set(0, 0, z);
        mesh_plane.material.opacity = alpha * 0.25;
    }
});
scene.add(group_camera);
// ---------- ----------
// RENDER
// ---------- ----------
// it is then the group that I would want to move and rotate rather than the camera
group_camera.position.set(0,1,-3);
group_camera.lookAt( 0, 0, 0 );
renderer.render(scene, group_camera.userData.camera);
```


## Conclusion

That will be it for now when it comes to this camera planes module, however I think that thins might prove to be one of the projects that I will be coming back to now and then with future revisions and demos. This will without question be the case if this ends up being one of the modules that I use every day when making video projects.

