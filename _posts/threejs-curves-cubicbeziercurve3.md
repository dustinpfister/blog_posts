---
title: Cubic Bezier Curves in threejs
date: 2023-02-10 09:37:00
tags: [three.js]
layout: post
categories: three.js
id: 1027
updated: 2023-02-10 15:56:58
version: 1.8
---

I would like to expand more on the use of curves in threejs and maybe part of doing that will involve taking another look at what there is to work with when it comes to built in options with curves. I have all [ready wrote a blog post on the THREE.QuadraticBezierCurve3 class](/2022/10/21/threejs-curve-quadratic-bezier-curve3) so for this post I will be writing about a few quick examples using the [THREE.CubicBezierCurve3](https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve3) class. Both of these options are built on top of [the base Curve class](https://threejs.org/docs/#api/en/extras/core/Curve) of course, so in any case there are Curve class prototype methods that are very useful such as the get point method. However one thing that is nice about this Cubic Bezier Curve Class is that it will allow for two control points rather than just one. This might be one of the major reasons why I see a lot of developers choosing the Cubic option over Quadratic as this will allow for a greater degree of flexibility when creating curves for a project.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/vRyUZF-zscQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Cubic Bezier Curve class in threejs and what to know before continuing

In this blog post I am writing about one of the built in options for creating an object that extends the base curve class of threejs. There is a whole lot of other ground to cover when it comes to things like the other options for built in curves, creating custom curves, features of the base curve class and so forth. Of course there is also a whole lot to be aware of when it comes to threejs in general as well as all the various other skills that are required on top of that when it comes to javaScript and client side web development in general. I assume that you have at least a little experience with these subjects, I have a whole lot of other [getting started type posts with threejs](/2018/04/04/threejs-getting-started/) and [javaScript](/2018/11/27/js-getting-started/) and do not which to pad this post with content that should be parked in such a post. Still I do lik to always have an opening section at the top here where I write about a few things that you might want to also read up on that are closely related to the over all content of this post on Cubic Bezier Curves in threejs.

### Check out the base Curve class in detail if you have not done so.

The [base curve class](/2022/06/17/threejs-curve/) is packed with a bunch of useful methods and features that one should be aware of before getting into what the built in options are that extend the class. There are methods like that get points method that will return an array of Vector3 objects. There is also an option for just getting a single point along the line of a curve as well.

### Source code is also up on Github

I have the source code examples for this post, as well as for my [many other blog posts on threejs](/categories/three-js/) up on Github at my [test threejs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-curves-cubicbeziercurve3).

### Version Numbers matter

When I first wrote this blog post I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r146), and there are a lot of good reasons why I was still using that revision of threejs over later versions that out at the time of this writing. There are a lot of code breaking changes that have happened and will continue to happen moving forward. If you are using a bleeding edge revision of threejs and also need to use JSM over plain old javaScript tags I can tell you now that these code examples will break. It will not take much to fix that mind you but at the time of this writing I have not yet started updating my content to JSM code style syntax. Although I [do have plans to do so for r150+](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r150) at this time.

## 1 - Basic examples of the CubicBezierCurve3 class

To kick things off as always I will be starting out this post with a few real quick hello world type examples before getting into subjects that might prove to be a little more advanced. These examples are not just for people that are new to threejs mind you, I have years of experience at this point and often I do still like to be able to quickly grab at a simple, clean starting point with things.

### 1.1 - Basic getting started example of CubicBezierCurve3

For this first basic example of CubicBezierCurve3 I am just making a single curve object with the constructor function and then using that curve to create geometry for a THREE.Points object. This can be done by just calling the get points base curve class method to get an array of vector3 objects. I can use the set from points method of the Buffer geometry class to create a geometry with just a position attribute. A position attribute alone will now work well with mesh objects, but it is good enough for THREE.Points. When it comes to just simply getting a visual idea of what the current state of a curve is THREE.Points and THREE.Lines works okay.

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
// CURVES
// ---------- ----------
const v_start = new THREE.Vector3(5,0,5);
const v_end = new THREE.Vector3(-5,0,-5);
const v_control_1 = new THREE.Vector3(5,0,-10);
const v_control_2 = new THREE.Vector3(-5,0,10);
const curve = new THREE.CubicBezierCurve3(v_start, v_control_1, v_control_2, v_end);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.PointsMaterial({ size: 0.2, color: new THREE.Color(0,1,0) });
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(100) );
const points = new THREE.Points(geometry, material);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.2 - CubicBezierCurve3 and CurvePath

There is also making a curve path from a few of these curve objects made with CubicBezierCurve3. This is just simply a way to make a path with a whole bunch of these curve objects by creating a THREE.CurvePath object and then just adding curve objects to that which are made with CubicBezierCurve3 or any other option for making a curve object.

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
// HELPERS
// ---------- ----------
// helper that is just an abstraction for THREE.CubicBezierCurve3
const createCurve = (sx,sy,sz, ex,ey,ez, c1x, c1y, c1z, c2x, c2y, c2z ) => {
    const v_start = new THREE.Vector3(sx, sy, sz);
    const v_end = new THREE.Vector3(ex, ey, ez);
    const c1 = new THREE.Vector3(c1x, c1y, c1z);
    const c2 = new THREE.Vector3(c2x, c2y, c2z);
    return new THREE.CubicBezierCurve3(v_start, c1, c2, v_end);
};
// can still have a single control kind of effect by just using the same
// control point for both
const createCurveSC = (sx,sy,sz, ex,ey,ez, c1x, c1y, c1z) => {
    return createCurve(sx,sy,sz, ex,ey,ez, c1x,c1y,c1z, c1x,c1y,c1z );
};
// ---------- ----------
// CURVE PATH
// ---------- ----------
const curve = new THREE.CurvePath();
curve.add( createCurveSC(-4, 0,-5,   0, 0, 3,  -4, 0, 3 ) );
curve.add( createCurve(   0, 0, 3,   5, 0, 3,   5, 0, 6,   3, 0, -6 ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.PointsMaterial({ size: 0.15, color: new THREE.Color(0,1,0) });
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(100) );
const points = new THREE.Points(geometry, material);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.3 - Setting the Position of Objects using CubicBezierCurve3, Curve.getPoint, and Vector3.copy

For this example I will now like to use a curve object to set the position of one or more mesh objects. For this sort of thing there is using the get point method of the base curve class to get a single Vector3 objects at any given point along the curve. I can then use the copy method of the Vector3 class of the vector3 object stored at the position property of the mesh object to set the position of that mesh object to the values of this vector3 object along the curve.

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
// HELPERS
// ---------- ----------
// I like to think in terms of deltas from center of what would be a string line
const createCurve = (v_start, v_end, v_d1, v_d2) => {
    v_d1 = v_d1 || new THREE.Vector3();
    v_d2 = v_d2 || new THREE.Vector3();
    const v_c1 = v_start.clone().lerp(v_end, 0.5).add(v_d1);
    const v_c2 = v_start.clone().lerp(v_end, 0.5).add(v_d2);
    return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
};
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(4, 0, -5);
const v_end = new THREE.Vector3(-5, 0, 4);
const v_d1 = new THREE.Vector3(5,0,5)
const curve = createCurve(v_start, v_end, v_d1, v_d1.clone().add( new THREE.Vector3(-3,0,-8)) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
// points
const material = new THREE.PointsMaterial({ size: 0.15, color: new THREE.Color(0,1,0) });
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(100) );
const points = new THREE.Points(geometry, material);
scene.add(points);
// mesh objects I would like to posiiton to the curve
const material_mesh = new THREE.MeshNormalMaterial();
[
  [0.20, 1.00],
  [0.75, 0.50],
  [0.95, 0.20]
].forEach((data)=>{
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(data[1], 20, 20), material_mesh );
    mesh.position.copy( curve.getPoint(data[0]) );
    scene.add(mesh);
});
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 2 - Using curves to create tracks

As of late I have been working on a project that is a kind of virtual train set. I like how the project has come out thus far, but I have all ready run into some things that I would do differently if I where to start over. For one thing when it comes to making the land object in which I place a train I have that as one solid geometry. Maybe that kind of approach is not always such a bad thing, but as of late I am in more of the mindset of breaking things down into a collection of various component source objects. I can then create a track by making clones of these source objects and then just position and rotate the clones as needed to create a track along with core geometry around the track. These source objects can be [groups](/2018/05/16/threejs-grouping-mesh-objects/) that have a curve attached to the [user data object](/2021/02/16/threejs-userdata/) of the group. I can then add whatever it is that I want in terms of mesh objects, points, and so forth when it comes to adding children to these source objects.

### 2.1 - Starting out with the tracks example, using CubicBezierCurve3 for curves

For this first example of what I have worked out thus far for this I have just about all the core ideas that I had in mind working. Including the deal with having a curve for each source object. I can then create a curve path object by just looping over all the track objects that are cloned from source options, and this main curve path is then what is used to set the position of a mesh object that is the current train object that moves along the curve path.

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
// HELPERS
// ---------- ----------
// I like to think in terms of deltas from center of what would be a string line
const createCurve = (v_start, v_end, v_d1, v_d2) => {
    v_d1 = v_d1 || new THREE.Vector3();
    v_d2 = v_d2 || new THREE.Vector3();
    const v_c1 = v_start.clone().lerp(v_end, 0.5).add(v_d1);
    const v_c2 = v_start.clone().lerp(v_end, 0.5).add(v_d2);
    return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
};
// create a source object
const createSourceObject = (w, d, sx, sz, ex, ez, dx, dz) => {
    const obj1 = new THREE.Group();
    const gud = obj1.userData;
    const v_start = new THREE.Vector3(sx, 1.0, sz);
    const v_end =  new THREE.Vector3(ex, 1.0, ez);
    const v_d =  new THREE.Vector3(dx, 0.0, dz);
    gud.curve = createCurve(v_start, v_end, v_d, v_d);
    obj1.add( new THREE.Mesh( new THREE.BoxGeometry(w, 1, d), new THREE.MeshNormalMaterial()) )
    const geo_points = new THREE.BufferGeometry().setFromPoints( gud.curve.getPoints(19) );
    obj1.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
    return obj1;
};
// create a curve to be used as a track curve from a tack object
const createTrackCurvePart = (obj_track) => {
    const c1 = obj_track.userData.curve;
    const v_objpos = new THREE.Vector3();
    obj_track.getWorldPosition(v_objpos);
    const v_start = v_objpos.clone().add(c1.v0);
    const v_c1 = v_objpos.clone().add(c1.v1);
    const v_c2 = v_objpos.clone().add(c1.v2);
    const v_end = v_objpos.clone().add(c1.v3);
    return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
};
// create a track object for the scene
const createTrackObject = (group_source, index, x, z, dy) => {
    dy = dy === undefined ? 0 : dy;
    const obj_source = group_source.children[index];
    const track = obj_source.clone();
    track.userData.curve = obj_source.userData.curve;
    track.position.set(x, 0.5 + dy, z);
    return track;
};
// ---------- ----------
// SOURCE OBJECTS
// ---------- ----------
const group_source = new THREE.Group();
group_source.add( createSourceObject(1.0, 4.0,   0.0,-2.0,    0.0, 2.0,   0.0, 0.0) );
group_source.add( createSourceObject(4.0, 4.0,   1.5,-2.0,   -2.0, 1.5,   1.5, 1.5) );
group_source.add( createSourceObject(4.0, 1.0,   2.0, 0.0,   -2.0, 0.0,   0.0, 0.0) );
// ---------- ----------
// TRACK OBJECTS
// ---------- ----------
const curve = new THREE.CurvePath();
[
    [0,  4.5, -1.0,  0.0],
    [1,  3.0,  3.0,  0.0],
    [2, -1.0,  4.5,  0.0]
].forEach((data)=>{
    const track = createTrackObject(group_source, data[0], data[1], data[2], data[3]);
    scene.add(track);
    curve.add( createTrackCurvePart(track) );
});
// curve
const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const a3 = ( a2 * 0.98 + 0.01 ) % 1;
    mesh.position.copy( curve.getPoint(a2) );
    mesh.lookAt( curve.getPoint( a3 ) );
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
```

### 2.2 - Rotation of curve objects when cloning source objects

With that last example I got more or less everything that I want working with just one exception. That exception is that I can not just rotate a clone of a source object and have that effect the state of the curve object. This should be expected as a curve is not an example of an object3d based object, and it is stored in the user data object so of course it is not effected by such actions. I will then need to have a way to update the state of the various Vector3 objects that compose the start point, end point, and control points. So I worked out a simple example where I do just this with a curve.

When it comes to this sort of thing the [Euler class](/2021/04/28/threejs-euler/) and the [apply Euler methods of the Vector3 class](/2021/06/18/threejs-vector3-apply-euler/) work great to preform a rotation of the various Vector3 objects of the curve.

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
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(4,0,5);
const v_end = new THREE.Vector3(-5,0,-4);
const v_c1 = new THREE.Vector3(4, 0,-1);
const v_c2 = new THREE.Vector3(1, 0,-4);
const curve = new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
let vi = 0;
while(vi < 4){
    const v = curve['v' + vi];
    const e = new THREE.Euler();
    e.y = Math.PI * 1.5; // can adjust this to set rotation
    v.applyEuler(e);
    vi += 1;
};
const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(29) );
scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
mesh.position.copy( curve.getPoint(0.5) );
mesh.lookAt( curve.getPoint( 0.6 ) );
renderer.render(scene, camera);
```

## 3 - Animation loop examples using Cubic Bezier Curve3

For this section I will now be working out at least one animation loop example that will be a start point for a demo video for this blog post.

### 3.1 - Using mesh object position properties

For this first video project I thought it would be a good idea to see about making a quick demo where I am using the position properties of some mesh objects as the Vector3 objects for the start, end and control points of one of these cubic bezier curves. This way I can then move the mesh objects around all over the place and when I do so that will of course change the state of the curve. I can then use the curve to say set the position properties of a group of other mesh objects as a way to see the outcome of changes to the state of the curve.

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
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2,1,10);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
// ---------- ----------
// MESH POINTERS
// ---------- ----------
const geo_pointer = new THREE.SphereGeometry(0.4, 20, 20);
const material_pointer = new THREE.MeshNormalMaterial();
const mesh_start = new THREE.Mesh(geo_pointer, material_pointer);
const mesh_end = new THREE.Mesh(geo_pointer, material_pointer);
const mesh_c1 = new THREE.Mesh(geo_pointer, material_pointer);
const mesh_c2 = new THREE.Mesh(geo_pointer, material_pointer);
scene.add(mesh_start);
scene.add(mesh_end);
scene.add(mesh_c1);
scene.add(mesh_c2);
// ---------- ----------
// MESH GROUP
// ---------- ----------
const material_child = new THREE.MeshPhongMaterial({
    color: new THREE.Color(1,0,0),
    specular: new THREE.Color(0.2,0.2,0.2)
});
const geometry_child = new THREE.SphereGeometry(0.25, 20, 20);
const group = new THREE.Group();
let i = 0; const len = 14;
while(i < len){
    const mesh = new THREE.Mesh(geometry_child, material_child);
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// CURVE
// ---------- ----------
const curve = new THREE.CubicBezierCurve3(mesh_start.position, mesh_c1.position, mesh_c2.position, mesh_end.position);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-8,8,8);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    mesh_start.position.set(0,0,5);
    mesh_end.position.set(0,0,-5);
    mesh_c1.position.set(-5 + 10 * a2,0,2.5);
    mesh_c2.position.set(5 - 10 * a2,0,-2.5);
    group.children.forEach( (mesh, i, arr) => {
        const a4 = (i + 1) / (arr.length + 1);
        mesh.position.copy( curve.getPoint(a4) );
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
```

## Conclusion

So it looks like over all this Cubic Bezier Curve class is a great built in option for quickly making curve objects in threejs for the sake of defining a path by which objects will follow. However there are a whole lot of other [use case examples for curves such as using them as a tool in the process of creating custom geometry](/2022/12/16/threejs-curve-geometry-from).