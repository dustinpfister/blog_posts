---
title: Shapes in threejs as well as extrude geometry
date: 2021-06-01 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 879
updated: 2023-07-27 14:42:58
version: 1.48
---

Today I thought I would look into making a few quick examples of the [Shape](https://threejs.org/docs/#api/en/extras/core/Shape) constructor in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene). This Shape Constructor is a way to go about creating a 2d shape which can then in turn be used with THREE.ShapeGeometry, or THREE.ExtrudeGeometry to create a [buffer geometry](/2021/04/22/threejs-buffer-geometry/). This geometry can then be used in a [mesh object](/2018/05/04/threejs-mesh/), or with anything else that needs a geometry such as with THREE.Points or THREE.LineSegmenets. The shape geometry constructor might come in handy as a way to quickly and easily go about making some custom geometries that are just 2d geometries that can then be brought into a threejs project as a custom cut surface, or a solid object that is extended with a little depth.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/Iz6bW-QJATc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Shape Constructor and what to know first

This is a post on the THREE.Shape class in the javaScript library known as threejs, so it should go without saying that you should have at least some basic working knowledge of threejs in order to gain something of value from reading this post. I will not be getting into the very basics of threejs, and client side javaScript in general here. So if you are still fairly new to threejs you might want to start out with a [getting started type post on threejs](/2018/04/04/threejs-getting-started/). Still in this section I will go over at least a few key details about some things that you might want to read up on more when getting into the shape constructor.

### Also look into the path class

When it comes to knowing how to create shapes you will want to also look into the [paths class](https://threejs.org/docs/index.html#api/en/extras/core/Path). This paths class is what will contains methods like move to and line to that can be used to create the paths that are needed to make a shape object. This is what I will want to use if I am in a situation in which I need to create a 2d path withjajavScript code rather than an external file. When it comes to using an external file I will want to go with SVG and with that the SVG loader in which case I do not have to bother working with the path class directly.

### Also Check out the SVG Loader

The [SVG loader is an additional loader](/2022/09/16/threejs-svg-loader/) that can be added on top of the threejs library alone to load SVG files and thus use the path data of those kinds of files to create Shapes. This is actually the main way that I often like to end up with both paths as well as shape objects that I can then use to create shape and extrude geometry. Often I am in a situation in which I all ready have an SVG file that I would like to use to create a 3d form of a logo. Also SVG is a great standard for making a common plane old 2d form of something while also being able to use it with shape and extrude geometry constructors by importing it into threejs by using this loader.

### Source code is on Github

The Source code that I am writing about here [can also be found on Github in my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-shape). This is also where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter with threejs

I have got into the habit of mentioning this is every post I write on threejs these days, so here it goes once again. When I first wrote this post I was using threejs revision 127, which was a late version of threejs in early 2021. I have come around to edit this post a few times sense then, and with that said the examples in this post now conform to [my r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md).

## 1 - The Basics of getting started with THREE.Shape 

For this first section I will be going over a few very basic hello world style examples of the THREE.Shape class. When it comes to the paths for now I will be sticking to just using the move to, and line to methods. There are a lot more methods in the path class to work with but I will be getting to those in later sections of this post. Once a Shape object is ready it can be passed as the first argument for two geometry constructor options which are the Shape geometry and extrude geometry constructors. After that I can use the resulting geometry with the usual mesh object, and also choose a material with such mesh objects. Again for this section at least i will not be doing anything fancy with materials, textures, and so forth.

### 1.1 - Shape Constructor Basic example using the shape geometry

Maybe a good starting point with the Shape constructor would be to use it to create a simple triangle shape, and then use that with the Shape Geometry constructor. So in this example I start out with just calling the THREE.Shape constructor and then saving the returned instance of Shape to a variable. I can then use the Shape move to method to move to a location in the 2d plain, and then call the line to method to create my shape. I can then pass the shape as the first argument to the THREE.ShapeGeomerty constructor which will then return my instance of geometry that I will then want to use with a mesh Object. When I then use the geometry with the Mesh constrictor I might want to set the side property of the material that I use with the Mesh constructor to THREE.DoubleSide so that both dies of the triangle are rendered.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SHAPE
//-------- ----------
const tri = new THREE.Shape();
tri.moveTo(0, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
// geometry
const geometry = new THREE.ShapeGeometry(tri);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So then this kind of use case of the Shape constructor might work out just fine if I just want to create a flat surface that is of a custom shape and place it into the scene. In other words it is a kind of custom cut alternative to using the plain geometry constructor.

### 1.2 - Using the Extrude geometry constructor with THREE.Shape

The Shape geometry constructor works great if I want to create something that is just a flat surface, however another option would be to use the Extrude geometry constructor. This will result in the creation of a geometry that is the shape geometry, but just adding a little depth to it. When doing so there are a bunch of options when it comes to things like the depth, and if the edges should be beveled.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SHAPE
//-------- ----------
const tri = new THREE.Shape();
tri.moveTo(0, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
// geometry
const extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
const geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

There may be a great deal more to cover when it comes to the THREE.ExtrudeGeometry constructor, but maybe that is all something that I should save for another post.

## The Path Class

As I have mentioned above it would be a good idea to look into the path class in detail as well. This is  subject that might deserve a whole other post and then some maybe, however in this post I think I should still have at least a section on PATH. There are a number of useful methods in the Path class for making a 2d path, in the basic examples I all ready covered the move to and line to methods of the path class, but in this section I will be getting into some more options for making the path that forms the 2d shape.

### 2.1 - Set from points example

The set from points method of the Path class is how to go about setting the state of a path by way of an array of THREE.vector2 class objects. So then I can create an array of these Vector2 objects by any means that I would like, and then I can just create a shape, and then call the set from points method off of the shape and pass the array of Vector2 objects.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SHAPE
//-------- ----------
// cretaing an array of THREE.Vector2 objects
const points = [];
const len = 100;
let i = 0;
while(i < len){
    const a = i / len;
    const x = -3  + 6 * a;
    const y = Math.sin( Math.PI * 1.0 * a ) * 4;
    points.push(new THREE.Vector2(x, y));
    i += 1;
}
const shape = new THREE.Shape();
// creating the path by using the set from points method
// with the array of THREE.Vector2 objects
shape.setFromPoints(points);
//-------- ----------
// GEOMETRY
//-------- ----------
const extrudeSettings = {
    depth: 1.5,
    bevelEnabled: false,
    steps: 2};
const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
//geometry.rotateX(Math.PI * 1);
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
// add the mesh to the scene
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.2 - Heart shape example and the bezierCurveTo method of the Shape Class

The official example of the Shape class makes use of the bezier curve to method as a way to go about making a heart shape. It would seem that the Sharp class has a number of methods to work with when it comes to creating the lines that will be used to create the shape. There is making use of them, or just working out the math when it comes to just sticking to the move to and line to methods.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SHAPE
//-------- ----------
const heartShape = new THREE.Shape();
heartShape.moveTo( 2.5, 2.5 );
heartShape.bezierCurveTo( 2.5, 2.5, 2.0, 0, 0, 0 );
heartShape.bezierCurveTo( - 3.0, 0, - 3.0, 3.5, - 3.0, 3.5 );
heartShape.bezierCurveTo( - 3.0, 5.5, - 1.0, 7.7, 2.5, 9.5 );
heartShape.bezierCurveTo( 6.0, 7.7, 8.0, 5.5, 8.0, 3.5 );
heartShape.bezierCurveTo( 8.0, 3.5, 8.0, 0, 5.0, 0 );
heartShape.bezierCurveTo( 3.5, 0, 2.5, 2.5, 2.5, 2.5 );
//-------- ----------
// GEOMETRY
//-------- ----------
const extrudeSettings = {
    depth: 1.5,
    bevelEnabled: true,
    curveSegments: 40,
    bevelSegments: 20,
    steps: 8,
    bevelThickness: 0.75,
    bevelSize: 0.75 };
const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
geometry.rotateX(Math.PI * 1);
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
let s = 0.25;
mesh.scale.set(s, s, s);
// add the mesh to the scene
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - Punching a hole in  shape with another shape

One thing that comes up when it comes to working with shapes is how to go about [punching a hole in a shape with another shape](https://stackoverflow.com/questions/28532878/three-js-punch-hole-in-shape-with-another-shape). To do this all I need to do is just create two shapes actually one of which will be the base shape, and the other will be a shape that will represent a hole in the shape. The shape that will be the hole just needs to be added to the holes array that is a property of an instance of Shape.

In this example then I am just creating a triangle type shape again, but then I am creating another shape that will be a hole in the shape. When it comes to this shape I am using the [arc method of the path class](https://threejs.org/docs/index.html#api/en/extras/core/Path.arc) to create a hole shape that will be a circle. This method works just like the [arc method of the 2d canvas drawing context](/2019/03/05/canvas-arc/) method when it comes to the order of the arguments. In other words the first argument is the x axis position of the center of the arc, the second argument is the y position, then the radius, and the start and end angles of the arc. Once I have my hole shape I just need to punch that shape to the holes array of the shape that I want to punch a hole in and that should be it.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SHAPE, GEOMETRY
//-------- ----------
const tri = new THREE.Shape();
tri.moveTo(0, 2);
tri.lineTo(2, -2);
tri.lineTo(-2, -2);
// add the hole
const hole = new THREE.Shape();
hole.arc(0, -0.8, 1.0, 0, Math.PI * 2);
// push to the shapes holes array
tri.holes.push(hole);
// geometry
const extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
const geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So then If I want to add more than one hole to a shape then the process is just creating the shapes the way that I want them and then just adding more than one shape to the holes array.

## 4 - Shapes and Groups

I wanted to make at least a quick example of using shapes to create mesh objects along with other mesh objects created with built in geometry constructors such as the box geometry constructor to create a group of mesh objects. I often like to create groups of mesh objects that can come together to resemble some kind of over all object of one kind or another. I often make these kinds of groups just composed of mesh objects that use built in geometry constructors however with the shape geometry constructor this allows me to make some interesting custom objects without getting to in depth with making a truly custom geometry constructor.

So in this example I made an instance of THREE.Group, and then created and added a mesh to that group that uses the THREE.BoxGeometry constructor for the geometry. I then wanted to add another mesh object to that group this time using the THREE.ExtrudeGeometry constructor and of course a Shape. I then rotate and position the mesh object of the Mesh that makes use of the Shape so that it looks like it is just an extension of the mesh that is just a box.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GROUP, MESH, HELPER
//-------- ----------
const group = new THREE.Group();
scene.add(group);
// BOX
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 1), new THREE.MeshNormalMaterial());
group.add(mesh1)
// SHAPE
const tri = new THREE.Shape();
tri.moveTo(-1, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
const extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
const geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
const mesh2 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh2.position.set(0, 2.0, 0);
mesh2.rotation.set(0, 0, Math.PI * 0.5);
// add the mesh to the group
group.add(mesh2);
group.add(new THREE.BoxHelper(group));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So then all kinds of interesting shapes are possible by just making use of more than one option with the built in geometry to create an over all object composed or a group of mesh objects. For more on this kind of topic it might be a good idea to take a look at [my post on grouping mesh objects](/2018/05/16/threejs-grouping-mesh-objects/).


## 5 - Animation loops Examples

I like to make at least one if not more videos for my blog posts on threejs these days, and when I do so I also like to start out with at least one if not more animation loop examples. This will then be the section will I will be starting out with at least one or more of these kinds of examples that will be used in any videos that might be included in this blog post.

The main thing here is that I would like to not just update the position, rotation, and scale over time with these animations, but also the geometry. I have found that the best way to do so it to mutate the state of a geometry rather than creating new ones over and over again when it comes to this.

### 5.1 - Heart Shape example

Here I have a current standing animation loop example based off of that heart shape example that I have for the paths section.  

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// make a heart shape
const makeHeartShape = (b, mb, sx, sy) => {
    b = b === undefined ? 9: b;
    mb = mb === undefined ? 0.75: mb;
    sx = sx === undefined ? 2.5: sx;
    sy = sy === undefined ? 2.5: sy;
    const shape = new THREE.Shape();
    shape.moveTo( sx, sy );
    shape.bezierCurveTo( sx, sy, 2, 0, 0, 0 );
    shape.bezierCurveTo( -3, 0, -3, 3, -3.0, 3 );
    shape.bezierCurveTo( -3, 5, -1, b * mb, 2, b );
    shape.bezierCurveTo( 6, b * mb, 8, 5, 8, 3 );
    shape.bezierCurveTo( 8, 3, 8, 0, 5, 0 );
    shape.bezierCurveTo( 3, 0, sx, sy, sx, sy );
    return shape;
};
// make a heart geometry
const makeHeartGeo = (b, mb, sx, sy, extrudeSettings) => {
    const shape = makeHeartShape(b, mb, sx, sy);
    extrudeSettings = extrudeSettings || {
        depth: 1.5,
        bevelEnabled: false,
        steps: 2};
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    geometry.rotateX(Math.PI * 1);
    geometry.center();
    return geometry;
};
// update geo
const updateGeo = (geoA, geoB) => {
    const posA = geoA.getAttribute('position');
    const posB = geoB.getAttribute('position');
    posA.array = posA.array.map((n, i)=>{
        return posB.array[i];
    });
    posA.needsUpdate = true;
    geoA.computeVertexNormals();
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = makeHeartGeo();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
let s = 0.25;
mesh.scale.set(s, s, s);
// add the mesh to the scene
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a = frame / frameMax;
    const ab = 1 - Math.abs(0.5 - a) / 0.5;
    let b = 6 + 6 * ab;
    let mb = 0.75;
    let sy = 2.5 * ab;
    updateGeo(mesh.geometry, makeHeartGeo(b, mb, 2.5, sy));
    mesh.rotation.y = Math.PI * 2 * a;
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

The Shape Constructor can prove to be yet another helpful tool in the toolbox of sorts that is threejs. It can be used with the extrude geometry constructor to help create the geometry for all kinds of mesh objects that can be used on there own, or as part of a group actually. For example I can have a mesh that makes use of a box geometry, and then have a extruded triangle shape geometry added to another mesh that can then be positioned next to it.
