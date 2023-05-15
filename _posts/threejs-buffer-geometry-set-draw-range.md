---
title: The set draw range method of the buffer geometry class in threejs
date: 2023-05-12 13:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1040
updated: 2023-05-15 15:40:04
version: 1.4
---

In the buffer geometry class of threejs there is a [set draw range method](https://threejs.org/docs/#api/en/core/BufferGeometry.setDrawRange) that will change the state of the draw range object of a buffer geometry index. This can be done by calling the method and then passing a start argument along with a count after that. The numbers given should be terms of vertices, or indices depending if the geometry is indexed or non indexed. With that said there is not just calling this method and passing some values but also being aware of some other aspects of a buffer geometry object. Mainly the position attribute, and also the index if it has one.

This will then just be a quick blog post on this set draw range method as well as a few other buffer geometry related topics while I am at it.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/2RlMPufuBBI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Set Draw range method of the buffer geometry class and what to know first

In this post I am writing about some javaScript code examples that work on top of the library known as threejs that make use of a single method of interest in the buffer geometry class known as the set draw range method. As always it should go without saying but this is not a post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) as well as other related skills, mainly client side javaScript. Also even if you have some experience with these topics there are a number of things that you might want to read up on before hand as well, so in this opening section I will take a moment to outline what those things are.

### There is reading more on the buffer geometry class in general

There is my [main blog post on the buffer geometry](/2021/04/22/threejs-buffer-geometry/) class that might be a good read for learning a thing or two about the buffer geometry class in general. 

### Know about the position attribute of a buffer geometry object

There are a number of attributes that compose data for a geometry, maybe the most relevant one of interest with this post would be the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/). This attribute contains the actual points in space that will form one or more triangles that are use to define the state of the geometry. There are a number of other core attributes that you should also know a thing or two about at this point such as the normal, and uv attribute. However when it just comes to the set draw range method this is the main attribute of interest here.

### Know what an indexed and non indexed geometry is

The [index of a buffer geometry](/2022/12/09/threejs-buffer-geometry-index/) is something that you show be aware of at this point when it comes to the use of this method. If a geometry has an index then the values that I want to pass to the set draw range method should be in terms of the state of the index, otherwise I want to think more in terms of the count of the position attribute.

### Source code is also up on Github

The Source code examples that I write about here can also be found on my [test threejs Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-set-draw-range) repo. This is also where I park the source code examples for the [other blog posts](/categories/three-js/) that I have wrote over the years.

## Version Numbers matter

When I first wrote these code examples I was using r146 of threejs. Code breaking changes are made to the library all the time so it is a good idea to know what revision you are using, and what revision an author of code, and corresponding text was using as well.

## 1 - Some basic examples of the set draw range method

As always I like to start out with at least one if not a few basic examples of a threejs feature when I write a blog post about it. So with that said these will just be a few basic examples that make use of a geometry created with one of the built in geometry constructor functions such as the Sphere Geometry constructor. There is then thinking in terms of having at least one example that will be with an indexed form of a geometry, and then another that is with a non indexed geometry.

### 1.1 - Working with an indexed geometry

For this demo I am starting out with an indexed geometry. When doing so I will want to use the count property of the index of the geometry as a way to get an index of what the range should be for the values that are used when calling the set draw range method. 

So the first thing as always is to set up the first core set of objects that I would want to use in any threejs project. That is the usual scene object, camera, and then a renderer as well. After I have all of that set up just the way that I like it I will then want to create a geometry. For that I went with the sphere geometry constructor function which be default will return a geometry that has an index. Although this geometry has an index, and it is the values in there I will be using to set the draw range, I am still getting a reference to the position attribute for the sake of comparison.

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
// GEOMETRY
// ---------- ----------
const geometry = new THREE.SphereGeometry(1, 30, 30);
const att_pos = geometry.getAttribute('position')
const index = geometry.index;
const start = Math.round( index.count * 0.50 );
const count = Math.round( index.count * 0.10 );
geometry.setDrawRange(start, count );
console.log(att_pos.count);      // 961
console.log(index.count);        // 5220
console.log(geometry.drawRange); // {start: 2610, count: 522}
// ---------- ----------
// SCENE CHILDREN
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial( {side: THREE.DoubleSide } ));
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Once I have a reference to the index I can then use the count property of the index to help get start and count values that will be passed when calling the set draw range method. I then do just that and after that I log out the values for each of these to get a better idea of what is going on.

### 1.2 - Working with a non indexed geometry

There is then making use of the set draw range method with a geometry that does not have an index. For this example then I am doing more or less the same thing as before only now I will want to count value of the position attribute to know what the range is. However before I even do that I will want to have a geometry that does not have an index. One way to do so would be to take a geometry that does have an index, and then call the to non index method of the buffer geometry. This will not mutate the geometry that I call it off of, but rather return a new one from the source geometry that does not have an index.

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
// GEOMETRY
// ---------- ----------
const geometry_source = new THREE.SphereGeometry(1, 30, 30);
const geometry = geometry_source.toNonIndexed();
const att_pos = geometry.getAttribute('position');
const start = Math.round( att_pos.count * 0.50);
const count = Math.round( att_pos.count * 0.10);
geometry.setDrawRange(start, count );
console.log(att_pos.count);       // 5220
console.log(geometry.index);      // null
console.log(geometry.drawRange);  // {start: 2610, count: 522}
// ---------- ----------
// SCENE CHILDREN
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial( {side: THREE.DoubleSide } ));
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - An Animation loop example

I always like to make at least one animaiton loop exmaple that will then be used to make at least one of my blog post videos. For this animaiton loop example I am then making a few helper functions that will create and return a non index geometry using the sphere geometry constructor and the to non indexed method, and then also update such a geometry. In the update geometry helper I am then setting the draw range with a given alpha value and then also a count that is the number of triangles that I want to draw from the start point. 

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const canvas_3d = renderer.domElement;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// HELPERS
// ---------- ----------
// create a non indexed geometry
const createGeometry = () => {
    return new THREE.SphereGeometry(1, 30, 30).toNonIndexed();
};
//
const updateGeometry = (geometry, alpha, tri_count) => {
    const att_pos = geometry.getAttribute('position');
    const total_tri = att_pos.count / 3;
    const start = Math.floor( total_tri * alpha) * 3;
    const count = Math.round( 3 * tri_count );
    geometry.setDrawRange( start, count );
};
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = createGeometry();
// ---------- ----------
// SCENE CHILDREN
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ));
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const sm = {
   FPS_UPDATE: 12,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = 1 - Math.abs( 0.5 - (a1 * 4 % 1) ) / 0.5;
    updateGeometry(geometry, a2, 200);
};
const render2d = (sm) => {
    ctx.clearRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('tick              : ' + sm.tick, 5, 5)
    ctx.fillText('frame_frac        : ' + sm.frame_frac.toFixed(3), 5, 20);
    ctx.fillText('frame / FRAME_MAX : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 35);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

## Conclusion

The set draw range is then one way to just draw a given range of points in a geometry. However there might only be so much practical use for a method such as this when I come to think of it. There might be some cool effects that can be done with if for sure by adjusted what the start and count value are for sure. However beyond that there might only be so much more to say when it comes to maybe using this method in a project. There is the idea that the use of this method might help in the process of making a project sun faster by reducing the amount of geometry that is drawn. That might be the case but there are a whole lot of other things to look into that might be a better choice in that matter such as having more than one level of detail and so forth.
