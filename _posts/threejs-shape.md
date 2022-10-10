---
title: Shapes in threejs as well as extrude geometry
date: 2021-06-01 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 879
updated: 2022-10-10 11:25:20
version: 1.38
---

Today I thought I would look into making a few quick examples of the [Shape](https://threejs.org/docs/#api/en/extras/core/Shape) constructor in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene). This Shape Constructor is a way to go about creating a 2d shape which can then in turn be used with THREE.ShapeGeometry, or THREE.ExtrudeGeometry to create a [buffer geometry](/2021/04/22/threejs-buffer-geometry/) that can then be used in a [mesh object](/2018/05/04/threejs-mesh/). So then the shape geometry constructor might come in handy as a way to quickly and easily go about making some custom geometries that are just 2d geometries that can then be brought into a threejs project as a custom cut surface, or a solid object that is extended.

<!-- more -->

## The Shape Constructor and what to know first

This is a post on the THREE.Shape class in the javaScript library known as threejs, so it should go without saying that you should have at least some basic knowledge of threejs in order to gain something of value from reading this post. I will not be getting into the very basics of threejs and client side javaScript in general here, so if you are still fairly new to threejs you might want to start out with a [getting started type post on threejs](/2018/04/04/threejs-getting-started/). Still in this section I will go over at least a few key details about some things that you might want to read up on more when getting into the shape constructor.

### Also look into the path class

When it comes to knowing how to create shapes you will want to also look into the [paths class](https://threejs.org/docs/index.html#api/en/extras/core/Path). This paths class is what will contains methods like move to and line to.

### Source code is on Github

The Source code that I am writing about here [can also be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-shape).

### Version Numbers matter with threejs

I have got into the habit of mentioning this is every post I write on threejs these days, so here it goes once again. When I first wrote this post I was using threejs revision 127, which was a late version of threejs in early 2021.

## 1 - Shape Constructor Basic example using the shape geometry

Maybe a good starting point with the Shape constructor would be to use it to create a simple triangle shape, and then use that with the Shape Geometry constructor. So in this example I start out with just calling the THREE.Shape constructor and then saving the returned instance of Shape to a variable. I can then use the Shape move to method to move to a location in the 2d plain, and then call the line to method to create my shape. I can then pass the shape as the first argument to the THREE.ShapeGeomerty constructor which will then return my instance of geometry that I will then want to use with a mesh Object. When I then use the geometry with the Mesh constrictor I might want to set the side property of the material that I use with the Mesh constructor to THREE.DoubleSide so that both dies of the triangle are rendered.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
 
// make the shape
var tri = new THREE.Shape();
tri.moveTo(0, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
// geometry
var geometry = new THREE.ShapeGeometry(tri);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
// mesh
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

So then this kind of use case of the Shape constructor might work out just fine if I just want to create a flat surface that is of a custom shape and place it into the scene. In other words it is a kind of custom cut alternative to using the plain geometry constructor.

## 2 - Using the Extrude geometry constructor with THREE.Shape

The Shape geometry constructor works great if I want to create something that is just a flat surface, however another option would be to use the Extrude geometry constructor. This will result in the creation of a geometry that is the shape geometry, but just adding a little depth to it. When doing so there are a bunch of options when it comes to things like the depth, and if the edges should be beveled.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
 
// make the shape
var tri = new THREE.Shape();
tri.moveTo(0, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
// geometry
var extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
var geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
// mesh
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

There may be a great deal more to cover when it comes to the THREE.ExtrudeGeometry constructor, but maybe that is all something that I should save for another post.

## 3 - Heart shape example and the bezierCurveTo method of the Shape Class

The official example of the Shape class makes use of the bezier curve to method as a way to go about making a heart shape. It would seem that the Sharp class has a number of methods to work with when it comes to creating the lines that will be used to create the shape. There is making use of them, or just working out the math when it comes to just sticking to the move to and line to methods.

```js
 
// creating a scene
var scene = new THREE.Scene();

// SHAPE
var heartShape = new THREE.Shape();
heartShape.moveTo( 25, 25 );
heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

// geometry
var extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
geometry.rotateX(Math.PI * 1)
// mesh
var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 4 - Punching a hole in  shape with another shape

One thing that comes up when it comes to working with shapes is how to go about [punching a hole in a shape with another shape](https://stackoverflow.com/questions/28532878/three-js-punch-hole-in-shape-with-another-shape). To do this all I need to do is just create two shapes actually one of which will be the base shape, and the other will be a shape that will represent a hole in the shape. The shape that will be the hole just needs to be added to the holes array that is a property of an instance of Shape.

In this example then I am just creating a triangle type shape again, but then I am creating another shape that will be a hole in the shape. When it comes to this shape I am using the [arc method of the path class](https://threejs.org/docs/index.html#api/en/extras/core/Path.arc) to create a hole shape that will be a circle. This method works just like the [arc method of the 2d canvas drawing context](/2019/03/05/canvas-arc/) method when it comes to the order of the arguments. In other words the first argument is the x axis position of the center of the arc, the second argument is the y position, then the radius, and the start and end angles of the arc. Once I have my hole shape I just need to punch that shape to the holes array of the shape that I want to punch a hole in and that should be it.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
 
// make the shape
var tri = new THREE.Shape();
tri.moveTo(0, 2);
tri.lineTo(2, -2);
tri.lineTo(-2, -2);
// add the hole
var hole = new THREE.Shape();
hole.arc(0, -0.8, 1.0, 0, Math.PI * 2);
// push to the shapes holes array
tri.holes.push(hole);
 
// geometry
var extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
var geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
// mesh
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

So then If I want to add more than one hole to a shape then the process is just creating the shapes the way that I want them and then just adding more than one shape to the holes array.

## 5 - Shapes and Groups

I wanted to make at least a quick example of using shapes to create mesh objects along with other mesh objects created with built in geometry constructors such as the box geometry constructor to create a group of mesh objects. I often like to create groups of mesh objects that can come together to resemble some kind of over all object of one kind or another. I often make these kinds of groups just composed of mesh objects that use built in geometry constructors however with the shape geometry constructor this allows me to make some interesting custom objects without getting to in depth with making a truly custom geometry constructor.

So in this example I made an instance of THREE.Group, and then created and added a mesh to that group that uses the THREE.BoxGeometry constructor for the geometry. I then wanted to add another mesh object to that group this time using the THREE.ExtrudeGeometry constructor and of course a Shape. I then rotate and position the mesh object of the Mesh that makes use of the Shape so that it looks like it is just an extension of the mesh that is just a box.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
 
// GROUP
var group = new THREE.Group();
scene.add(group);
 
// BOX
var mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 1), new THREE.MeshNormalMaterial());
group.add(mesh)
 
// SHAPE
var tri = new THREE.Shape();
tri.moveTo(-1, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
var extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
var geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.position.set(0, 2.0, 0);
mesh.rotation.set(0, 0, Math.PI * 0.5);
 
// add the mesh to the group
group.add(mesh);
group.add(new THREE.BoxHelper(group));
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

So then all kinds of interesting shapes are possible by just making use of more than one option with the built in geometry to create an over all object composed or a group of mesh objects. For more on this kind of topic it might be a good idea to take a look at [my post on grouping mesh objects](/2018/05/16/threejs-grouping-mesh-objects/).

## Conclusion

The Shape Constructor can prove to be yet another helpful tool in the toolbox of sorts that is threejs. It can be used with the extrude geometry constructor to help create the geometry for all kinds of mesh objects that can be used on there own, or as part of a group actually. For example I can have a mesh that makes use of a box geometry, and then have a extruded triangle shape geometry added to another mesh that can then be positioned next to it.

