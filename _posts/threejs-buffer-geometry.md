---
title: The Buffer Geometry Constructor in threejs
date: 2021-04-22 16:11:00
tags: [three.js]
layout: post
categories: three.js
id: 851
updated: 2023-09-14 10:36:06
version: 1.94
---


The basic example of a [buffer Geometry in the three.js documentation works okay](https://threejs.org/docs/index.html#api/en/core/BufferGeometry.groups) as a starting point, but it does not cover every little detail when it comes to what I should be aware of when making a custom geometry. There is not just creating the positions attribute of a geometry, but also the normal, and uv attributes for a geometry as well that are also of importance when it comes to using custom geometries with various materials that use textures and respond to light sources. There are also a whole bunch of other details such as working out an array of groups, and material index values.

So in this post I will be going over the basic examples that I have worked out thus far when it comes to just working with some very simple starting points with a custom geometry using the buffer geometry constructor rather than the plain old geometry constructor. Also in this post I will be going over some examples that are just examples of the various prototype methods and features that one should know about when it comes to working with buffer geometry in general, regardless of what it was made.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/l0CkGHtllxw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The buffer geometry constructor in threejs and what to know first

This is a post on the buffer geometry constructor in three.js which was one of two options to create a custom geometry in three.js before r125, but after r125 is now they only way to do so when it comes to the core library by itself at least. This is then not a [getting started type post with three.js](/2018/04/04/threejs-getting-started/) or any additional skills that are required before hand. However in this section I will be going over some things that you might want to read up more on, as well as be aware of for one reason or another, before continuing to read the rest of this post.

### The Scene Object, Mesh Objects, Cameras, and Object3d in general

In order to make use of a geometry I will need a [Mesh object](/2018/05/04/threejs-mesh/) and pass the geometry to the mesh object as the first argument, and a material as the second argument. After that I will want to make the mesh object a child of a [Scene object](/2018/05/03/threejs-scene/), which I can then pass to a renderer with a camera such as the [perspective camera](/2018/04/07/threejs-camera-perspective/). All of these objects that is a Mesh object, scene object, and a camera are all based on a base class called [Object3d](/2018/04/23/threejs-object3d).

### Know a thing or two about materials also

In order to do anything interesting with a geometry in threejs I am going to want to make the geometry part of a Mesh object, or in some cased a Line object. When creating a Mesh object I will want to of course pass the geometry to the mesh constructor, but I will also want to pass [a material](/2018/04/30/threejs-materials/) along with it to. In the event that I just care about the position property and that is it, then I can pass the geometry to the Line constructor and use a line material actually, with lines I do not have to have so much about the other attributes. However when it comes to using the Mesh object I am going to want to have a position, and at least a normal attribute when it comes to using the normal material. Often I will also need a uv attribute also if I want to do anything with textures using materials like the basic material, and the standard material.

### The source code of these examples is on my github

The source code for these examples can be found in my test [threejs github repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry). The latest state of the source code can always be found there if I just happen to be working on some new examples, as well as making some changes to the ones that I have all ready made. If you want to make a pull request for whatever the reason that would also of course be the place to do so.

### Version Numbers matter with threejs.

When I first wrote this post I was using r127 of threejs, and the last time I came around to doing a little editing I was using [r146 and thus updated the demos to the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) I set for that revision. Still at some point in the future the code here may very well break on older or newer version of threejs. I do try to do my best to keep my threejs content up to date, but at times it might be a while between edits.

As of [revision 125 of threejs](https://github.com/mrdoob/three.js/releases/tag/r125) the [Geometry Constructor](/2018/04/14/threejs-geometry/) has been removed which will result in code breaking changes for a whole Internet of threejs examples out on the open web. There where some nice things to say about this class, and maybe in some ways it helped to make things easier. However now that I know how to work with the buffer geometry class well, I have to say that I do not miss it.


## 1 - Basic custom buffer geometry examples

For this first section on the general topic of buffer geometry I will be going over a number of examples that have to do with the creation of custom buffer geometry objects. The very first step with this is to work out the state of the position attribute of the geometry. That is the state of each point, the order of each point, and also if an index will be used with this or not. In some cases it is just the position attribute that will be needed, but there are some additional core attributes that are important for the sake of textures, and shading.

### 1.1 - The Position attribute of buffer geometry

This first example is not all that different from that of the example that I have found at the official three.js documentation website. However I made an effort to try to make the example yet even more easy to follow by having the geometry be just a single triangle. The first and for most step is to come up with the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/), there is also the normal and uv attributes that are important when it comes to light and textures, but for this basic example it is just the position attribute that I am going to care about for now.

The position attribute, as the name suggests, is the attribute that contains the values that will be the actual points in space. However there is not just the position of each point of each triangle, but also the order in which they are placed in the array as well that comes into play. It turns out that the order of the points of each triangle is what is used to set which side of a triangle is in fact the front side of the triangle.

I started out by just calling the Buffer Geometry constructor with the new keyword to create a new clean instance of the buffer geometry. The next step is to add some points or vertices as they are often called for the geometry. To do this I will want to create an instance of a Float32Array which is one of the many kinds of type arrays to work with in javaScript now these days. 

I then just added three points to the array by having just a linear collection of numbers where the first number is the x axis of the first point, the second element is y for the first point, the third is for the z value of the first point, and so on when it comes to additional points. I then just need to use the set attribute method of the buffer geometry instance of create the position attribute of the geometry passing the array of points as the first argument and the number 3 as the next argument.

I now just need to add this geometry to a mesh by calling the mesh constructor, and passing the geometry as the first argument, and then a material as the second argument. When it comes to a very basic example like this one, the basic material will work just fine for this simple example that is just a single face.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY, MESH
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1, 0, 0,
     1, 0, 0,
     1, 1, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })
);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 1, 3);
camera.lookAt( 0, 0.5, 0 );
renderer.render(scene, camera);
```

This might be okay when it comes to just starting out, but there is a great deal more to do on top of just this even when it comes to just playing around with a single triangle. You will notice for example that I used the THREE.DocubleSide value for the side property of the basic material that I am using to skin the triangle here. So there is then the question of being able to set which side of the triangle is the 'front side', and also lots of other things that have to do with textures. So lets look at a few more examples that have to do with creating a custom buffer geometry instance from the ground up.

### 1.2 - Creating a normal attribute and using the normal material

So if I take my basic example that I worked out above and switch to the normal material rather than the basic material, then I get nothing. That should be what is expected sense there is no [normal attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/) for the geometry just yet. For this demo I am making the normal attribute in more or less the same way as the position attribute in the sense that I often use the same kind of typed array and once again the item count here is 3. What will differ is that I will be setting a value of 'normal' when calling the set Attribute method of the buffer geometry object, and also the values of the normals themselves of course. By default I often start out by pointing them all up \( 0, 1, 0 \), and then adjust from there if I am to do this sort of thing manually like in this demo. However there are of course methods that help to automate this, and more often than not they work okay.

```js
//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// START GEOMETRY / POSITION ATTRIBUTE / NORMAL ATTRIBUTE
//-------- ----------
const geometry = new THREE.BufferGeometry();
const data_pos = [
    0, 0, 0,
    1, 0, 0,
    1, 1, 0
];
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array( data_pos), 3) );
const data_normal = [
   0, -0, 1,
   0, -0, 1,
   0, -0, 1
];
geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array( data_normal ), 3) );
//-------- ----------
// GRID / MESH OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial({
            side: THREE.FrontSide
        }));
mesh1.rotateY(Math.PI * 0.15);
scene.add(mesh1);
//-------- ----------
// VERTEX HELPERS IF THERE
//-------- ----------
if(THREE.VertexNormalsHelper){
    const vertHelper1 = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper1);
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 0.5, 3);
camera.lookAt( 0, 0, 0);
renderer.render(scene, camera);
```

This might prove to be a good start at least, but in order to really know what is going on with face normals I might need to use some kind of helper to see what the direction of each normal vector is. With that said in this example I am making use of the THREE.VertextNormalsHelper which I can add to a project on top of the threejs file. This file should be located in the examples folder of the threejs Github repository. However depeding on what revision you are using the type of file that you need might not be there anymore. If you are using the module form of threejs you will need to use the JSM file, if you are still using an older version of threejs the js folder might still be there.

There might be [more then one way to go about making a normals attribute](https://stackoverflow.com/questions/29202480/three-js-calculating-vertex-normals), but the quick and simple way might be to just call the [compute vertex normals method](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) of the geometry.

### 1.3 - The uv attribute

There is then the position attribute, the normals attribute and then one more major attribute of interest in order to make a geometry that will work well with most materials and that is the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/). 

This is where I store data that will have to do with texture offset data that will be used to map a 2d texture to the 3d model. So in order to really get a sense of what the deal is with this uv attribute on top of how to create the attribute I will also want to have a texture for the material that I use with the mesh as well. 

So once again I will need to create an attribute this time for the uv, however in order to really know if what I have done is working or not I will also need a texture to use with the material. There are a number of ways to create o load a textures, however for this example I will want to just stick with a JavaScript solution to make the texture. One way to do about doing this would be to make use of a [Data texture](/2022/04/15/threejs-data-texture/).

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(0, 0.5, 3);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2)
scene.add(dl);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
            0, 0, 0,
            1, 0, 0,
            1, 1, 0
        ]);
// create position property
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// compute vertex normals
geometry.computeVertexNormals();
// creating a uv
const uvs = new Float32Array([
            0, 0,
            1, 0,
            1, 1
        ]);
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
//-------- ----------
// TEXTURE
//-------- ----------
const width = 4,
height = 4;
const size = width * height;
const data = new Uint8Array(4 * size);
for (let i = 0; i < size; i++) {
    const stride = i * 4;
    const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
    data[stride] = v;
    data[stride + 1] = v;
    data[stride + 2] = v;
    data[stride + 3] = 255;
}
const texture = new THREE.DataTexture(data, width, height);
texture.needsUpdate = true;
const mesh1 = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.FrontSide
        }));
//-------- ----------
// MESH
//-------- ----------
mesh1.rotateY(Math.PI * 0.15);
mesh1.position.x = -0.50;
scene.add(mesh1);
// vertex helper
const vertHelper = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
scene.add(vertHelper)
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.4 - Material index values and groups

So how about material index values for a geometry that consists of more then one face? Well this is where the add group method comes into play as it can be used to create an array of group objects where each group object contains a material index property. For this example I am then going to want to have just a slightly more complex geometry in which I now have two triangle in space rather than just one. Sense that is the case I and then call the add group method twice to create two face objects for each triangle while doing so I can set what the material index values should be.

Now that I have that done when I create a mesh with this geometry I can now pass an array of materials, and each material will then be used for each face depending on the material index values.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ARRAY OF MATERIALS
//-------- ----------
const materials = [
    new THREE.MeshBasicMaterial({
        color: 'red',
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime',
        side: THREE.DoubleSide
    })
];
//-------- ----------
// GEOMETRY - with groups
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
            0, 0, 0, // triangle 1
            1, 0, 0,
            1, 1, 0,
            0, 0, 0, // triangle 2
            0, 1, 0,
            1, 1, 0
        ]);
// create position property
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// add groups, and set material index values
geometry.addGroup(0, 3, 1);
geometry.addGroup(3, 3, 0);
//-------- ----------
// MESH using custrom geometry with groups added, and an array of materials
//-------- ----------
scene.add( new THREE.Mesh( geometry, materials) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 0.5, 3);
renderer.render(scene, camera);
```

### 1.5 - Basic example of adding an index to a geometry

One thing that you should at least be aware of is if a [geometry has an index or not](/2022/12/09/threejs-buffer-geometry-index/). What this means is that of a geometry has an index that means that there are just a few points in the position attribute, and then there are many triangles being drawn from the same set of points. If there is no index, then that means that there needs to be a point for every triangle in the position attribute.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CUSTOM GEO WITH JUST A POSITION, AND NORMAL ATTRIBUTES
//-------- ----------
const geometry = new THREE.BufferGeometry();
// position array of 4 points
const pos = new THREE.BufferAttribute(
    new Float32Array([
        0,-3, 0,  // 0
        0, 3, 0,  // 1
       -5, 0, 0,  // 2
        0, 0,-5   // 3
    ]),
    3    // 3 numbers for every item in the buffer attribute ( x, y, z)
);
geometry.setAttribute('position', pos);
// using computeVertexNormals to create normal attribute
geometry.computeVertexNormals();
//-------- ----------
//CREATING AN INDEX BY USING THE setIndex METHOD AND PASSING AN ARRAY
//-------- ----------
// drawing 2 trangles with just 4 points in the position attribute by giving an
// array of index values for points in the position attribute to the setIndex method
geometry.setIndex( [0,1,2,0,1,3] );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 5, 5);
camera.lookAt(-2, 0, -2);
renderer.render(scene, camera);
```

## 2 - Working with light

Now it is time to see how a custom geometry works with a situation involving a few light sources, and how the use of a materials that will respond to light will work with the custom geometry as well. So then in this section I will be going over code in which I am working out some simple custom geometry, and then using one or more light sources in the scene. For the most part it is just the position attribute and the normal attribute that is of concern if I only care about solid color shading for each triangle. There are some exceptions to this though when it comes to getting into indexed geometry, and with that tangent attributes and normal maps that will be used with the material.

The uv attribute will very much be needed as well if I want to add color maps, and also of course all the various other maps that are used for applying texture such as the normal maps that are used to address problems with indexed geometry. With all of that said I think that it is called for to have a whole section in this post on the subject of light, and with that overlap between light, geometry, and materials.

### 2.1 - Simple two triangle demo with Directional light

For this demo I am making a non indexed geometry that is just composed of two triangles. The only main thing that I want to make sure I am doing with this is to just make sure that these two trainees are not on the same plane. After that I just need to set up the normal attribute for this one I am just calling the compute vertex normal method to do so.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const materials = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    side: THREE.FrontSide
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0.00,  0.00,  0.00,
    1.00,  0.00,  0.00,
    0.50,  1.00, -0.50,
    1.00,  0.00,  0.00,
    0.75,  0.00, -1.00,
    0.50,  1.00, -0.50
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.computeVertexNormals();
//-------- ----------
// SCENE CHILD OBJECTS - GRID, MESH, AND LIGHTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh( geometry, materials);
scene.add(mesh1);
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(4, 2, 4);
scene.add(dl);
//-------- ---------- 
// LOOP
//-------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.2 - Indexed geometry and normal maps

As of this writing this is a topic in which I am trying to do more research as I have only got so far with it at this time. The general thing with this is that there are problems with lightning when dealing with an indexed geometry as the state of the normal attribute will differ compared to that of a non indexed geometry. There are then two general ways of dealing with this it would seem, one of which would be to just not use an index. The other way of dealing with this would be to stick with using an index, but learn a thing or two about normal maps as a way to address these lighting problems.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// TEXTURES / MATERIALS
//-------- ----------
const data_normalmap = [
    [1,1,1],[1,1,1],[1,1,1],[1,1,1],
    [9,1,1],[1,1,1],[1,1,1],[1,1,1],
    [9,1,1],[9,9,9],[1,1,1],[1,1,1],
    [9,2,0],[9,1,1],[9,1,1],[1,1,1]
].map( (ci_array) => {
    const r = Math.round( 255 * (ci_array[0] / 9) );
    const g = Math.round( 255 * (ci_array[0] / 9) );
    const b = Math.round( 255 * (ci_array[0] / 9) );
    return [ r, g, b, 255];
}).flat();

const texture_normal = new THREE.DataTexture( new Uint8Array( data_normalmap ), 4,  4 );
texture_normal.needsUpdate = true;
const material_nm = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    normalMap: texture_normal,
    side: THREE.FrontSide
});
const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.FrontSide
});
//-------- ----------
// GEOMETRY - indexed
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0.00,  0.00,  0.00,
    2.00,  0.00,  0.00,
    0.00,  2.00,  0.00,
    0.00,  0.00, -3.50
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex([0,1,2,1,3,2]);
geometry.computeVertexNormals();
const data_uv = new Float32Array([
    0.00,  1.00,
    0.00,  0.00,
    1.00,  0.00,
    1.00,  1.00,
]);
geometry.setAttribute('uv', new THREE.BufferAttribute(data_uv, 2));
geometry.computeTangents();
//-------- ----------
// GEOMETRY - non-indexed
//-------- ----------
const geometry_ni = geometry.toNonIndexed();
geometry_ni.computeVertexNormals();
//-------- ----------
// SCENE CHILD OBJECTS - GRID, MESH, AND LIGHTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh( geometry, material_nm);
mesh1.position.set(0,0.01,2);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry_ni, material);
mesh2.position.set(0,0.01,-2);
scene.add(mesh2);
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,2,3);
scene.add(dl);
scene.add( new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00) );
//-------- ---------- 
// LOOP
//-------- ----------
camera.position.set(6, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - Prototype methods of the Buffer Geometry class

There are a number of methods to work with in the buffer geometry class prototype that one should be aware of. In this section then I will be writing about at least a few of these buffer geometry class prototype methods. We have all ready covered a number of them in the basic section of course such as the setAttribute method that is used to define attributes for a blank geometry object. However there are a whole lot more that prove to be useful for various things that will pop up now and then.

### 3.1 - Rotation Methods

When I add a geometry to a Mesh object the resulting Mesh object is based off of Object3d and as such it has a position and rotation property that can be used as a way to translate and rotate the mesh object as a whole. However I think that it is important to point out that this is the way to go about moving a geometry around once the translation and rotation of a geometry is in the initial fixed state that I want. If that is not the case I will want to adjust that using the translate and [rotation methods of the Buffer geometry](/2021/05/20/threejs-buffer-geometry-rotation/) class instance, and not that of the containing mesh object. 

When doing this sort of thing I typically will only want to adjust the position and rotation of the geometry just once, when it comes to updating things over and over again in a loop I will want to stick to the object3d values that there are to work with.

In the even that I do want to update the geometry over and over again I tend to run into problems compared to what I am used to when working with the Euler class that I deal with when working with the rotation property of an mesh object. The main problem that I run into is that the rotation methods of buffer geometry apply deltas to the current state of the geometry rather than setting the rotation from a kind of home position. One way to address this would be to use the copy method to always set the geometry to a desired starting state, and then translate from there as I am doing in this sections source code example.

```js
//-------- ----------
// SCENE, CAMERA, RENDER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(7, 7));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.25, 2, 30, 30),
    new THREE.MeshNormalMaterial()
);
mesh1.position.set(-1.5, 0, 0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.25, 2, 30, 30),
    new THREE.MeshNormalMaterial()
);
mesh2.position.set(1.5, 0, 0);
scene.add(mesh2);
// CHILD MESH OBEJECTS
const childMaterial = new THREE.MeshNormalMaterial({ 
    transparent: true,
    opacity: 0.5
});
mesh1.add( new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    childMaterial) );
mesh2.add( new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    childMaterial) );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(6, 8, 6);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 200,
fps_target = 24,
lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = Math.abs(.5 - per) / .5;
    requestAnimationFrame(loop);
    if (secs >= 1 / fps_target) {
        // ROTATION OF GEOMETRY COMPARED TO MESH
        const rx = Math.PI * 2 * per,
        rz = Math.PI * 8 * per;
        // USING COPY AND ROTATION METHODS
        mesh1.geometry.copy( new THREE.ConeGeometry(0.25, 2, 30, 30) );
        mesh1.geometry.rotateX( rx );
        mesh1.geometry.rotateZ( rz );
        // USING OBJECT3D ROTATION PROPERTY OF MESH2 to ROTATE THE MESH OBJECT
        // RATHER THAN THE GEOMETRY
        mesh2.rotation.set(rx ,0, rz)
        // render, step frame, ect...
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

### 3.2 - BufferGeometry.toJSON - Converting buffer geometry to JSON TEXT

One thing that I would like to do now and then is to convert the current state of a buffer geometry instance to a standard JOSN format that I can then sore as a file or some other from of storage. Later I would then use some kind of means to load this json data as a way to create a geometry form the stored json data.

Built into threejs itself there is the buffer geometry loader, in a later section in this post I should have at least one example of that here, but first in order to use that loader I will need some JOSN to load. When doing so I have found that the first thing that I want to do is call the to [non index method](https://threejs.org/docs/#api/en/core/BufferGeometry.toNonIndexed), if I do not when calling the to JSON method I will get a different from of json when the buffer geometry is the product of one of the built in geometry constrictors.

After calling the [to josn method](https://threejs.org/docs/#api/en/core/BufferGeometry.toJSON) the end result will end up being an object that is ready to use with the [JSON stringify method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). After passing the object to the strignify method the end result will then be JSON text that I can store as a file and then use with the loader. Alliteratively there is working directly with the parse method of the buffer geometry loader, when using the the first argument is expected to be an object so I will want to pass the text to the [JSON parse method](/2020/02/28/js-json-parse/) first.

```js
//-------- ----------
// Scene, Camera, renderer
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// BUFFER GEOMETRY TO TEXT
//-------- ----------
const geo = new THREE.SphereGeometry(1, 10, 10);
// make sure to use to non indexed before calling to json
const buffObj = geo.toNonIndexed().toJSON();
const text = JSON.stringify(buffObj);
console.log(text);
//-------- ----------
// TEXT TO BUFFER GEOMETRY
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
const obj = JSON.parse(text);
const geo2 = loader.parse( obj );
const mesh = new THREE.Mesh(geo2);
//-------- ----------
// RENDER
//-------- ----------
scene.add(mesh);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera)
```

### 3.3 - The Compute vertex normals method

A very useful method in the buffer geometry class that can often make quick work of setting up a normal attribute would be the compute vertex normals method. This method will work fine in most cases when it comes to looking into ways to automate this process, however I am sure there are some cases in which I will still need to work this out manually. To make sure that the normals are set up the way that they should be be sure to still make use of tools like the MeshNormalMaterial, and better yet the Vertex Normals Helper to still make sure that things are as they should be with the normal attribute.

```js
//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// START GEOMETRY / POSITION ATTRIBUTE / NORMAL ATTRIBUTE
//-------- ----------
const geometry = new THREE.BufferGeometry();
const data_pos = [ -1, 0.1, 0,   1, 0.1, 0,   0, 1.1, 0 ];
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array( data_pos), 3) );
// USING COMPUTE VERTEX NORMALS TO ADD A NORMAL ATTRIBUTE
geometry.computeVertexNormals();
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial({
            side: THREE.FrontSide
        }));
scene.add(mesh1);
//-------- ----------
// VERTEX HELPERS IF THERE
//-------- ----------
if(THREE.VertexNormalsHelper){
    const vertHelper1 = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper1);
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.5, 1, 2);
camera.lookAt( 0, 0.5, 0);
renderer.render(scene, camera);
```

### 3.4 - Apply Quaternion

The apply quaternion method can be used to rotate the geometry by way of a quaternion object rather than using the various rotate methods. These [quaternion objects](/2023/03/24/threejs-quaternion/) are something that you will want to look into more at some point sooner or later as they are very helpful when working out problems that have to do with setting orations of objects, and also in this case geometry.

```js
//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - rotation by way of quaternion object
//-------- ----------
const geometry = new THREE.CylinderGeometry(0, 1, 5, 40, 40);
const q = new THREE.Quaternion();
q.setFromAxisAngle( new THREE.Vector3( 0, 0, 1), 45 );
geometry.applyQuaternion(q);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const material = new THREE.PointsMaterial( { size: 0.1} );
const points = new THREE.Points( geometry, material );
scene.add(points);
scene.add( new THREE.GridHelper( 10, 10 ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 1, 5);
camera.lookAt( 0, 0.0, 0);
renderer.render(scene, camera);
```

### 3.5 - The center method

If I just want to quickly center a geometry based on the current state of the bound box property of the geometry I can just simply call the center method. If the bound box property is not there, then it will be created or updated. Also this should go without saying, but yes I will need a position attribute first of course. So then in this demo I am just creating a few points in a position attribute and then drawing two triangles with an index. I am then creating the normals attribute by calling the compute vertex normals method, and then after that I am centering the geometry as the points are all positive for this and I want them to be centered. This is a nice quick way to just center, but it is not at all a replacement for the translate method.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([ 0,0,0,    2,0,0,    0,2,0,    2,2,0 ]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex([0,1,2,1,3,2]);
geometry.computeVertexNormals();
geometry.center();
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
);
scene.add(mesh);
camera.lookAt(mesh.position)
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 1, 4);
camera.lookAt( 0, 0.5, 0 );
renderer.render(scene, camera);
```

### 3.6 - Translate Geometry

The translate method of the buffer geometry class can be used to move around the geometry relative to the origin. This can be used in conjunction with the position property of the object 3d class that is used to set the position of the containing object rather that the geometry. Sense the act or translating a geometry can often result in the use of more overhead translation of geometry is typicality done just one to adjust things and then object3c lass level feature are used from there.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry_source = new THREE.BufferGeometry();
const vertices = new Float32Array([ -1,-1,0,    1,-1,0,    -1,1,0,    1,1,0 ]);
geometry_source.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry_source.setIndex([0,1,2,1,3,2]);
geometry_source.computeVertexNormals();
//-------- ----------
// MESH, MATERIAL
//-------- ----------
[ [0,1,0], [1,0,-1], [0,1,-4], ].forEach( (pos, i, arr) => {
    const geometry = geometry_source.clone().translate( pos[0], pos[1], pos[2]);
    const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            side: THREE.FrontSide,
            transparent: true,
            opacity: 0.5
        })
    );
    mesh.renderOrder = arr.length - i;
    scene.add(mesh);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-0.25, 1, 4);
camera.lookAt( 0, 0.5, 0 );
renderer.render(scene, camera);
```

### 3.7 - The Set from points method

Say that you are in a situation in which you have an array of vector3 objects and you just simply want to create a geometry from this array of vector3 objects. One way to do so would be to just simply create a blank buffer geometry object, and then call the [set from points method](/2023/01/05/threejs-buffer-geometry-set-from-points/) and pass the array of vector3 objects. This will result in a position attribute being added to the buffer geometry that has the values of the vector3 objects as the values for each vertex.

There is a whole lot more to write about when it comes to how to get a geometry that is created this way to work well with mesh objects mind you. There is not just the positions of each vertex but the order of each vertex, or the order of the position attribute index values that you given for an index property of a geometry that very much matter. Also there is much more that just the position attribute that matters when it comes to making geometry that will work well with mesh objects. However this is very much a first step, and also when it comes to using an alternative to mesh objects such as Points it can even prove to be a done deal depending on what you are trying to accomplish.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS - array of Vector3 Objects
// ---------- ----------
const points_array = [
    new THREE.Vector3( -1, -1,  1),
    new THREE.Vector3( -1, -1, -1),
    new THREE.Vector3(  1, -1,  1),
    new THREE.Vector3(  1, -1, -1),
    new THREE.Vector3( -1,  1,  1),
    new THREE.Vector3( -1,  1, -1),
    new THREE.Vector3(  1,  1,  1),
    new THREE.Vector3(  1,  1, -1),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method to create one from points_array
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points_array);
// ---------- ----------
// Points - using geometry with THREE.Points rather than THREE.Mesh
// ---------- ----------
const material = new THREE.PointsMaterial({ color: 0xffff00, size: 0.25 });
scene.add( new THREE.Points(geometry, material) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 3, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.8 - The Clone Method for making quick copies

If I am ever in a situation in which I just need to make a new buffer geometry object that is a clone of another I can always just call the clone method and then do whatever I need to do with this clone. When doing so it will not effect the source geometry form which I have made the clone from. In this demo I am making a clone of a cone geometry, I am then rotating and translate the clone. In then make another clone of which is the same as the source geometry as the changes that I made only effect the clone and not the source.

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
const geo_source = new THREE.ConeGeometry(0.5, 1, 20, 20);
const geo1 = geo_source.clone().rotateX( Math.PI / 180 * 45 ).translate(-2,0,0);
const geo2 = geo_source.clone();
// ---------- ----------
// MATERIAL, MESH, GRID
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geo1, material);
const mesh2 = new THREE.Mesh(geo2, material);
scene.add(mesh1, mesh2, new THREE.GridHelper(10,10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 3, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 4 - Built in Geometry Constructor functions

Although in time it might be best to work out custom geometry by way to modeling things out in an external program and then exporting by one of the many options for loading geometry in the form on an external asset, there is also creating geometry by way of some javaScript code also. I have all ready covered a number of ways to do so but there is still a number of built in geometry construction functions built into the threejs library itself. There is just making use of these when it is just a simple shape that is needed. Also there is looking into how to make ones own geometry constructor functions by extending from one of these, in fact some of them are just that. This might need to be a hole other subject maybe, but for now in this section I will be going over a few of the built in options to begin with.

### 4.1 - The Box Geometry

The [Box Geometry constructor](/2021/04/26/threejs-box-geometry) when called can take the first three arguments as width height and depth for an over all size of a box shape. There is then an additional set of three arguments that can also be given after this that can be used to set the point density of the over all geometry that comes into play in some cases such as when using it with TREE.Points.

You might thing that is all there is to it then, just give  it a few arguments and you are done. However there is a whole lot more to be aware of with this one. Such as the fact that a groups property will come set up with it, and can be sued right away when using an array of materials. Another major thing about this geometry though I have found is the nature of the index. It is not fully indexed as some might expect, this might be so that it can be used right away with out having to get into working out a normal map for it which would end up being the case for a fully indexed geometry like this. It is not fully non indexed also though as you will come to find when it comes to writing code that has to do with mutation of the position attribute over time.

For most practical purposes though the Box geometry class built into threejs itself will work just fine. It is only a few rare, weird edges cases where one might want to write an alternative to this.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const w=1, h=3, d=2;
const ws = 8, hs=16, ds = 32;
const geometry = new THREE.BoxGeometry(w, h, d, ws, hs, ds);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.PointsMaterial({ size: 0.05, color: 0x00ffff });
const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 4.2 - The Capsule Geometry

There is a [capsule geometry](/2022/07/22/threejs-capsule-geometry/) that can be used to create a geometry that looks like a pill. This built in geometry is really just a clever extension of the late geometry which is another built in geometry function of interest that has to do with creating a 3d shape from a simple 2d path. With that said it might be better to look into the lathe geometry more so then this one as the lathe geometry can be used to create this kind of shape also, as well as all kinds of other shapes so it is a bot more versatile in that regard.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const radius = 1;
const length = 2;
const capsubs = 8;
const radsegs = 16;
const geometry = new THREE.CapsuleGeometry(radius, length, capsubs, radsegs);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 4.3 - The circle geometry

The circle geometry is cab be used to quickly create this kin d of simple geometry. When doing so the first argument is the radius, and the second argument t is the number of sides. With that said this can also be used to create just about any kind of polygon as well for the most part.
```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.CircleGeometry(2, 100);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 4.4 - The cone geometry

The [cone geometry](/2019/07/31/threejs-cone/) class can be used to create a cone geometry by giving a first argument that is the radius of the base of the cone, followed by the section argument that will be the length of the cone. After that there are additional arguments that have to do with the number of divisions that will result in a denser geometry with higher values. One thing that I have notices with this is that if I want to use the look at method of the object3d class based object that will be used with the geometry I will often want to use the rotate methods to adjust the geometry so that the point of the cone will face the point in space that is given with the look at method.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.ConeGeometry(0.75, 3, 40, 40);
geometry.rotateX(Math.PI * 1.5);
geometry.rotateY(Math.PI * 1.0);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({  });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.lookAt( 0, 0, 1);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 4.5 - The cylinder geometry

The [cylinder geometry](/2022/08/12/threejs-cylinder-geometry/) can be used to create a geometry of the cylinder or can like shape if you prefer. However it can also be used to create a lot of other shapes and also can be used as another way to create a cone like shape as well as I am doing in this demo. The reason why is because I can give a radius for both sides of the cylinder so by giving a radius value of zero for one side I can then use the other radius value to create the base of a cone. There is then the length argument and then once again additional argument that will set the density of the geometry as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.CylinderGeometry(0, 0.75, 4, 40, 40);
geometry.rotateX(Math.PI * 1.5);
geometry.rotateY(Math.PI * 1.0);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({  });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.lookAt( 0, 0, 1);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 4.6 - Dodecahedron

A Dodecahedron just simply means 12 sides, and by default that is what this geometry option will give you. There is then two arguments that can be given one of which is a radius, and the second one is a detail value. This detail value can then be used to increases the number of points which will then result in a geometry that is no longer a Dodecahedron. It would then seem that this is another way to go about creating a kind of sphere like geometry then. In some cases this might be what one would want to use actually sense the sphere geometry has a very different process of creating a kind of sphere like shape.

 I assumed that this kind of geometry must just be a clever extension of one of the other geometrys and after taking a look at the source code it would seem that this time around at least I have assumed correctly. This Icosahedron geometry is an extnesion of the Polyhedron Geometry class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const radius = 1;
const detail = 0;
const geometry = new THREE.DodecahedronGeometry(radius, detail);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({  });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.lookAt( 0, 0, 1);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 4.7 - Edges and Line Segements

The [Edges geometry](/2021/05/31/threejs-edges-geometry/) is another options that you might want to make use of in some select use cases. One use case would be if I want to create a geometry that will work well with Line Segments objects from another geometry that exists before hand. In fact thus far this seems like the typical use case for this geometry constructor With that aid in order to use it at all you first need a geometry to begin with as that is what needs to be passed as the first argument. For this demo I am just creating a box geometry, and then passing that as the first argument. After that I can give an angle threshold that might prove to be useful for some cases, but as far as this demo is concerned the default value of 1 for this works just fine.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_source = new THREE.BoxGeometry();
const threshold_angle = 1;
const geometry = new THREE.EdgesGeometry( geo_source, threshold_angle);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.LineBasicMaterial({ linewidth: 6 });
const line = new THREE.LineSegments(geometry, material);
scene.add(line);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 2, 4);
camera.lookAt( line.position );
renderer.render(scene, camera);
```

### 4.8 - Extrude Geometry

When dealing with shape objects there is very much the shape geometry, however often I will want to go with the [extrude geometry](/2023/06/13/threejs-extrude-geometry/) when using shape objects in the process of creating 3d geometry. There are a number of ways to go about certaing one or more shapes to begin with, in this demo I am using the built in path options to create a simple shape and be done with it. There are also ways of creating shapes by way of an array of vector2 objects, however the typical way that one might end up with these kinds of objects to begin with would be when using the SVG Loader. However getting into all of this though might be needed in a more advanced section in this topic or a whole other post completely even as there is a lot to cover when it comes to SVG.

For now in this demo there is just making note of the fact that the first argument is the shape object to use. After that there is an options object that can be passed for setting various settings for this that have to do with things like the nature of the bevel, and even a custom UV generator if need be.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHAPE / PATH
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo(  0,-1 );
shape.bezierCurveTo( 0.25,-0.25,    0.25,0,    1,0 );
shape.lineTo(  1,1 );
shape.lineTo( -1,1 );
shape.bezierCurveTo(-2,0,   -2,-1,   0,-1 );
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.ExtrudeGeometry(shape);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({  });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 2, 4);
camera.lookAt( mesh.position );
renderer.render(scene, camera);
```

### 4.9 - Icosahedron Geometry

This is yet another option for creating a sphere like shape, this time by way of a fancy term for a a polyhedron with 20 faces rather than 12. Once again this has both a radius and detail argument where the default value for detail is 0, and any value greater than that will add points and thus turn this into an object that is no longer a Icosahedron. Like that of the Dodecahedron geometry this class is also a extension of the PolyhedronGeometry class, but dont just take my word for it [check the source code for yourself](https://github.com/mrdoob/three.js/blob/r146/src/geometries/DodecahedronGeometry.js). There is reading posts such as this, but there is also taking a moment to read source code as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const radius = 1;
const detail = 0;
const geometry = new THREE.IcosahedronGeometry(radius, detail);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 1, 2);
camera.lookAt( mesh.position );
renderer.render(scene, camera);
```

### 4.10 - Lathe Geometry

There is a way to go about creating 3d shapes by way of creating a 2d path and then spinining that around an axis. The way to go about doing this would be to use the [lathe geometry](/2023/06/07/threejs-lathe-geometry/). The 2d path needs to be created first and there are a number of ways to create such and array, on of which would be to make use of 2d curves.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE/V2ARRAY
// ---------- ----------
const v1 = new THREE.Vector2( 0, 0 );
const v2 = new THREE.Vector2( 0.5, 0 );
const v3 = new THREE.Vector2( 0.5, 0.5);
const v4 = new THREE.Vector2( 0.4, 0.5);
const v5 = new THREE.Vector2( 0.2, 0.1);
const v6 = new THREE.Vector2( 0, 0.1);
const vc1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector2(0.25,-0.1) );
const vc2 = v4.clone().lerp(v5, 0.5).add( new THREE.Vector2(0.25, 0) );
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve( v1, v2 ) );
curve.add( new THREE.QuadraticBezierCurve(v2, vc1, v3) );
curve.add( new THREE.LineCurve( v3, v4 ) );
curve.add( new THREE.QuadraticBezierCurve( v4, vc2, v5 ) );
curve.add( new THREE.LineCurve( v5, v6 ) );
const v2array = curve.getPoints(20);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_lathe = 80;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(1, 0, 3)
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.01) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0x8a8a8a, side: THREE.FrontSide }) );
scene.add(mesh1);
mesh1.scale.set(2,2,2)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 1);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
```

### 4.11 - Octahedron Geometry

This is yet another extension of the Polyhedron Geometry this time it is for a Octahedron Geometry Class or 8 sides rather than 12 or 20. Again there is just working with the Polyhedron Geometry as a way to make this kind of shape and also all the others as well by just knowing how to set the proper arguments for each. Still it is very much one of the built in options and if I want this section to be comprehensive I need to get this one out of the way. As with the other extensions of Polyhedron Geometry the two arguments are radius and detail.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const radius = 3;
const detail = 0;
const geometry = new THREE.OctahedronGeometry(radius, detail);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ wireframe: true }) );
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 1, 8);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
```

### 4.12 - Plane Geometry

This is then a good one that I find myself using in a lot of projects, and also might be a good starting option for learning a lot about geometry which is of course the [Plane geometry class](/2019/06/05/threejs-plane/). The first two arguments of this class will set the width and height of the plane geometry, and then there are an additional two arguments that can set the number of sections in the plane. Sections will come into play when I want to do something with THREE.Points, THREE.Lines or the usual THREE.Mesh if I for example want to do something with groups or draw calls.

This is then often a good kind of geometry to start with when it comes to starting to look into all kinds of advanced features such as the groups property of geometry that is used when working with an array of materials. Unlike other built in options the groups option is not set up for me so I must use the add group method to define the areas for each material index. This is also a good choice when it comes to doing things like mutation of the position attribute, add morph attributes, and so forth.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MESH - 
// ---------- ----------
// shared material in wire frame mode
const material = new THREE.MeshBasicMaterial( { wireframe: true, wireframeLinewidth: 3 });
// 5 by 5 size, but just 1 by 1 with segments ( DEFAULT ) 
const mesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material);
mesh2.geometry.rotateX( Math.PI * 0.5 );
mesh2.position.set(-3, 0, 0);
scene.add(mesh2);
// 5 by 5 size, and 10 by 10 with segments
const mesh3 = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5, 10, 10),
    material);
mesh3.geometry.rotateX( Math.PI * 0.5 );
mesh3.position.set(3, 0, 0);
scene.add(mesh3);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(6, 6, 6);
camera.lookAt(0.75, -2, 0);
renderer.render(scene, camera);
```

### 4.13 - Polyhedron Geometry

So I have covered a number of built in geometry constructors thus far that are extensions of the [Polyhedron class](/2023/09/14/threejs-polyhedron-geometry/) such as the Icosahedron Geometry to name just one. Now it is time to write a thing about the main class of off of them all when it comes to directly working with the Polyhedron class. Doing so is a bit more tricky though as the nature of the Polyhedron needs to be defined by way of an array of vertices and index values for the faces.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const vertices = [
    1,1,1,    -1,1,1,    1,-1,1,   1,1,-1
];
const indices_of_faces = [
    0,1,2,
    0,3,1,
    0,2,3,
    1,2,3
];

const radius = 1;
const detail = 3;
const geometry = new THREE.PolyhedronGeometry(vertices, indices_of_faces, radius, detail);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
```

### 4.14 - Ring Geometry

The ring geometry as the name suggests is to create a 2d ring like shape with an outer and inner radius given bu way of the first two arguments when calling the constructor function. There is then also an additional third argument that can be used to set the number of segments for the ring geometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const radius1 = 1.5;
const radius2 = 1.0;
const segments = 80;
const geometry = new THREE.RingGeometry(radius1, radius2, segments);
//-------- ----------
// LINE, GRID HELPER
//-------- ----------
const material = new THREE.LineBasicMaterial({ linewidth: 3, color: 0x00ffff });
const line = new THREE.LineSegments(geometry, material);
scene.add( line );
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 4.15 - Shape Geometry

There is the ShapeGeometry built in geometry option that is one of two options for creating a geometry from a [shape object](/2021/06/01/threejs-shape/). There are a number of ways to create the shape object to being with, for this demo I am making use of the path class from which shape extends from to create a heart shape. Other ways of creating a shape involve creating an array of vector2 objects, or a 2d curve that can then be used to create this v2 array to pass to the shape construction. However maybe the main way to which one will end up working with shapes is by way of the SVG loader.

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
const geometry = new THREE.ShapeGeometry( heartShape );
geometry.rotateX(Math.PI);
geometry.rotateY(Math.PI);
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 4.16 - Sphere Geometry

There is a [Sphere Geometry](/2021/05/26/threejs-sphere/) that works by giving width and height segments to do so. There are a number of other arguments that have to do with starting and ending angles as well so it can also be used to make a number of other similar shapes like domes.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const radius = 2,
width_segments = 30,
height_segments = 30;
const geometry = new THREE.SphereGeometry(radius, width_segments, height_segments);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.PointsMaterial({ size: 0.20, color: 0x00ffff });
const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

## 5 - The Buffer Geometry loader

If I have a josn file to load that is formatted the way as I have outline in the above example for doing so I can use the [buffer geometry loader](https://threejs.org/docs/#api/en/loaders/BufferGeometryLoader) to load the json text file. I just need to create an instance of the threejs buffer geometry loader, and then call the load method of the loader instance that is returned when calling the constructor function with the new keyword. Well at least that might be all that I need to do if I just need to load one file rather than a massive collection of these kinds of JSON files. When it comes to loading a lot of JSON files, and not just JSON files of geometry but all kinds of various assets, and having an over all progress bar and so on that is where this kind of thing can turn into a bit of a rabbit hole. Still it goes without saying that this is something that I should at least write a thing or two about in this general overview of buffer geometry. If you want to read more about what I have in terms of this kind of topic you might want to check out [my main blog post on the buffer geometry loader](/2018/04/12/threejs-buffer-geometry-loader/).

### 5.1 - Basic single file buffer geometry loader example

The most basic form of this would be to just load a single JSON file that contains buffer geometry data with the Buffer Geometry loader. To do this I just need to create a single buffer geometry loader object by calling THREE.BufferGeometryLoader(). Once I have a buffer geometry loader instance I can then call the load method, and pass the url to the JSON file as the first argument. After passing the url, I will then also want to pass a function that I will want to fire when this file is done loading as the second argument. There are additional functions that I might want to pass after that, but for this basic example of the buffer geometry loader I might just keep it with that for now.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo')  || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GRID
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// Loader
//-------- ----------
camera.position.set(2,2,2);
camera.lookAt(0, 2, 0);
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/vertcolor-trees/6tri/0.json',
    // onLoad callback
    (geometry) => {
        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                vertexColors: true, 
                side: THREE.DoubleSide
            }));
        scene.add(mesh);
        renderer.render(scene, camera);
    }
);
```

Something like this might work okay if I just want to load a single JSON file. However there is a whole lot more to this sort of thing when it comes to how to go about parsing a large collection of files.

### 5.2 - Loading more and one file with THREE.LoadingManager, and using Promsies.

This is where things can start to get a little messy I have found thus far. However there are tools to work with in threejs, and also of course many native javaScript features that can help in the process of doing this sort of thing. For this example I am now making use of the [loading manager class](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager) as a way to define some callbacks that I would like to fire when all of the files that I want to load are in fact done loading. On top of this I am also now making use of those additional call back functions that can be passed when calling the buffer geometry loader as well. The end result is a load buffer geometry JSON helper function that will load not just one url, but an array of urls, and if all goes well will resolve with a scene object where each child of the scene object contains the geometry of each file that was loaded.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER
//-------- ----------
const loadBufferGeometryJSON = ( urls = [], w = 2, scale = 5, material = new THREE.MeshNormalMaterial() ) => {
    const scene_source = new THREE.Scene();
    const onBuffLoad =  (geometry, i) => {
        const x = i % w;
        const z = Math.floor( i / w);
        const mesh = new THREE.Mesh( geometry, material);
        mesh.name = 'buffer_source_' + i;
        mesh.position.set(x, 0, z).multiplyScalar(scale);
        scene_source.add(mesh);
    };
    const onBuffProgress =  (geometry) => {};
    return new Promise( ( resolve, reject ) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            resolve(scene_source);
        };
        const onBuffError =  (err) => {
           reject(err);
        };
        const loader = new THREE.BufferGeometryLoader(manager);
        urls.forEach( (url, index) => {
            loader.load(url, (geometry) => { onBuffLoad(geometry, index) }, onBuffProgress, onBuffError);
        });
    });
};
//-------- ----------
// GRID/ LIGHT / CAMERA POS
//-------- ----------
const grid = new THREE.GridHelper(100, 10);
scene.add(grid)
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
camera.position.set(-10, 15, 15);
camera.lookAt( 5, 0, 5);
//-------- ----------
// BUFFER GEOMETRY LOADER
//-------- ----------
const URLS = [
   '/json/vertcolor-trees/6tri/0.json',
   '/json/vertcolor-trees/6tri/1.json',
   '/json/vertcolor-trees/6tri/2.json',
   '/json/vertcolor-trees/6tri/3.json'
];
const material = new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.DoubleSide });
loadBufferGeometryJSON(URLS, 2, 10, material)
.then( (scene_source) => {
    console.log('JSON files are loaded!');
    scene.add( scene_source );
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn('No Good.');
    console.warn(e);
});
```

## 6 - Morph Attributes

In the opening sections of this post I wrote a thing or two about the various attributes that are used to compose a buffer geometry object. There is the position attribute that is the actual points in space which can be index, or not indexed. Then there is the normal attribute that can be used to define what side of a face is the front side of a face and is also used in the process of rendering with many materials. There is also the uv attribute which is what it is used to define what the offsets are in a texture when it comes to mapping a 2d texture to a 3d object. However in this section I will now be writing about [morph attributes](/2023/02/03/threejs-buffer-geometry-morph-attributes) where are a way to go about defining an array of attributes for each of these attributes each of which is a state for all of them. These morph attributes can then be used to change from one state to another, not just with the position attribute but all of the various attributes.

### 6.1 - Basic example on morph attributes

This is a basic example on morph attributes that I copied over from my post on the subject that is based on one of the official examples on morph attributes that can be [found here](https://github.com/mrdoob/three.js/blob/r146/examples/webgl_morphtargets.html). It involves just creating a buffer geometry with the built in box geometry constructor function. Then one just needs to start out by creating an empty array for the position attribute in the morph attributes property of the returned geometry. After that it is a matter of adding at least one or more elements to this array that are other states to morph to from the starting box geometry state. For this there is some code that will create a new position attribute that is a sphere like state to transition to for each point in this box geometry. 

There is then making a mesh object with the geometry like always. However now I can use the morph Target Influences property of the mesh object to set what the alpha value should be between the starting state, and the the sphere state.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// base on this: https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_pos = [];
for ( let i = 0; i < pos.count; i ++ ) {
     const x = pos.getX( i );
     const y = pos.getY( i );
     const z = pos.getZ( i );
     data_pos.push(
         x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
         y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
         z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
     );
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos, 3 );
// ---------- ----------
// MATERIAL, MESH
// ---------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.morphTargetInfluences[ 0 ] = 0.75;
mesh.geometry.computeVertexNormals();
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

## Conclusion

I have a lot of work cut out for me when it comes to working on editing a lot of my old three.js content. A lot of my examples made use of the old geometry constructor, so They will need to be updated to work with the buffered geometry constructor if I want them to still work with late versions of three.js. The only other options would be to just make quick edits that mention what version of three.js I was using when I made they example which might prove to be a good temporarily fix when it comes to editing.

There might be more to work out when it comes to just some very basic examples like the ones that I worked out for this post when it comes to the various properties of a geometry and how they apply to various features of three.js. For now they seem to work okay, but I am sure that there will be some minor fixes for some of these examples when and if I get around to them.

