---
title: The position attribute for buffer geometries in threejs
date: 2021-06-07 13:00:00
tags: [three.js]
layout: post
categories: three.js
id: 883
updated: 2023-07-19 13:08:54
version: 1.68
---

When getting into the subject of making a custom buffer geometry in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are a lot of various little details to cover. There are a number of attributes that must be created from scratch such as the position attribute which is the state of the points to begin with. On top of the position attribute there are additional core attributes such as the normals, and the UV attribute that has to do with figuring out what side of a face is the front size, lighting, and texture mapping. 

However one has to start somewhere when it comes to learning how to do this sort of thing, and with that said maybe a good starting point would be the position attribute. The reason why I say that is because I can start out with using the THREE.Points, or THREE.Line constructor functions in place of the typical THREE.Mesh objects. When working with one of these alternatives to mesh objects I only need to worry about the state of the position attribute.

There is taking the time to create a blank instance of a Buffer geometry using the [THREE.BufferGeometry](https://threejs.org/docs/index.html#api/en/core/BufferGeometry) constructor and then create the position attribute from the ground up. However maybe a good starting point would be to study the results of one of the built in geometry constructors such as the [THREE.boxGeometry constructor](/2021/04/26/threejs-box-geometry/) to get an idea of what a position attribute is all about. There is also taking a look at some other features of a built in geometry instance such as the [index property of a buffer geometry](/2022/12/09/threejs-buffer-geometry-index/) to gain a sense of what that is for when it comes to working with a set of triangles.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/Z4kjKwmCEvo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Attributes of a buffer geometry instance and what to know first

This is a post on the position attribute of a buffer geometry instance in the javaScript library known as three.js. There is a great deal more that you show know at least a little about before hand, or else you might end up finding this post a little hard to follow. So I assume that you have at least some background with client side javaScript, and I also assume that you have worked out at least a few basic examples when it comes to [getting started with threejs](/2018/04/04/threejs-getting-started/). Still in this section I will be going over some things that you might want to read up more on if you find yourself overwhelmed.

### Read up more on Buffer Geometry

There is a great deal more to write about when it comes to [buffer geometry](/2021/04/22/threejs-buffer-geometry/) in threejs. It might be best to start out with getting to know the various prototype methods of the buffer geometry class, and how to do simpler tasks such as translating, or [rotating an all ready made geometry](/2021/05/20/threejs-buffer-geometry-rotation/) before getting into a more advanced topic such as this.

The position attribute is the first attribute that I would want to set up when making a custom geometry. However if I want to use the custom geometry with Mesh objects I will also want to set up at least a [normals](/2021/06/08/threejs-buffer-geometry-attributes-normals/) and [uvs](/2021/06/09/threejs-buffer-geometry-attributes-uv/) attributes for it as well. These additional attributes are very important when it comes to making lighting and textures look the way that they should, or to even work at all actually.

### Curves might be a cool tool to help make custom geometry

I started a [threejs examples project that is a kind of curve module](/2022/11/18/threejs-examples-curves-module/). As of this writing this is something that I am using to set the position of objects in space, but I can see how curves can also be useful for creating custom geometry as well. There are a number of built in options of curve class based objects, and in some cases there is even going so far as to write ones own extensions of the curve class.

### Source is on Github

The examples here, and many others can be [found on my Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-attributes-position). This is also where I park the source code examples that I use in my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I made these source code examples, and first wrote this post I was using revision 127 of threejs. I do come around to doing a little editing of these posts now and then, and the last time I check that everything was working okay I was using r146. code breaking changes are made to threejs very often so always be aware of what revision you are using, and also what revision an author of code examples on the open web was using.

## 1 - Creating a custom triangle geometry from the ground up starting with position

For this section I will be creating an instance of buffer geometry by just using the THREE.BufferGeometry constructor alone rather than one of the built in constructors that will set everything up for me. I am starting out the post with these kinds of examples, but in the next section I will be going over some examples that have to do with looking at a geometry created with one of the built in constructors. To create the position attribute I will have to first have a float32 array that contains all the data for each vertex, and then pass that when calling the THREE.BufferAttribute constructor that will then be used to set the position attribute for the geometry.

To help keep things simple these examples will just involve three points in space. 

### 1.1 - A position attribute only, and the THREE.Points Class

In order to get a geometry to work well with Mesh objects I need more than just a position attribute, however when it comes to using the THREE.Points class all I need is a position attribute. So for this example I will be creating a buffer geometry that just has a position attribute and use that with the Points class rather than that of mesh. 

The fist thing that I would do is call the THREE.BufferGeometry constructor function with the new keyword, and then store the returned result to a variable that can be called something like geometry. I now have an instance of buffer geometry, but there is no data with it, so I will then need to add the position attribute. To do so I create a Float32 array and then set up numbers for each x, y, and z value for each point in space. Once I have that set up the way I like it I can pass that array as an argument when calling the THREE.BufferAttribite constructor. The result of the BufferAttribute constructor can then be set for the position attribute of the buffer geometry by just using the set Attribute method, passing the string 'position' as the first argument, followed by the typed array.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
// create data as Float32Array
const data = new Float32Array( [
    -1.0, 0.0,  0.0,
    1.0, 0.0,  0.0,
    0.0, 2.0,  0.0,
]);
// create new instance of BufferAttribute with Float3sArray and set as 'position'
geometry.setAttribute('position', new THREE.BufferAttribute( data, 3 ));
// can now call methods like translate, center, rotateX, ect
geometry.center();
//-------- ----------
// POINTS
//-------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5}));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(points.position);
renderer.render(scene, camera);
```

### 1.2 - Making it a geometry that will work okay with Mesh Objects

Now that I have an example that is position only out of the way it is now time to work out an example that will also set up a normal and uv attribute so that I can use it with a mesh object. There are a number additional attributes, and properties of interest that may come up also, but the core set of attributes are these three which are once again position, normal, and uv.

One quick way to set up the normal attribute would be to just call the [compute vertex normals method](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) of the buffer geometry class. In some cases I will need to create this manually, or mutate the values, however getting deep into that might be outside the scope of this post, or at least this section to say the least. If I want to use textures with one or more of the maps that are used for the material I will also need to set up the uv attribute for the geometry also. The process for this is more or less the same as setting up position, but I will want to think in terms of two values for each vertex rather than three. These two values for each vertex are a kind of x and y offset for a source texture when it comes to mapping each face. Again I will not be getting into this subject in depth here, but I think I should just make a quick example of how to set up these other attributes for a very simple custom geometry like this.

When it comes to setting up a quick texture for one or more of the materials that I will be using for the mesh objects there are a number of ways to do that with a little javaScript code rather than that of an external image file. For this example I am going with [data textures](/2022/04/15/threejs-data-texture/), but another great option would be to use [canvas textures](/2018/04/17/threejs-canvas-texture/).

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
// ATTRIBUTE 'position' 
const dataPOS = new Float32Array( [
    -1.0, 0.0,  0.0,
    1.0, 0.0,  0.0,
    0.0, 2.0,  0.0,
]);
geometry.setAttribute('position', new THREE.BufferAttribute( dataPOS, 3 ));
// ATTRIBUTE 'normal'
// compute vertex normals method can some times make quick work of setting up the normals attribute
geometry.computeVertexNormals();
// ATTRIBUTE 'uv'
const dataUV = new Float32Array( [
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
]);
geometry.setAttribute('uv', new THREE.BufferAttribute( dataUV, 2 ));
geometry.center();
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight();
dl.position.set(0,1,2)
scene.add(dl);
//-------- ----------
// TEXTURE
//-------- ----------
// create data texture method
const createDataTexture = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    // default for pix method
    opt.forPix = opt.forPix || function(color, x, y, i, opt){
        let v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        color.r = v;
        color.g = v;
        color.b = v;
        return color;
    };
    let size = opt.width * opt.height;
    let data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        let stride = i * 4,
        x = i % opt.width,
        y = Math.floor(i / opt.width),
        color = opt.forPix( new THREE.Color(), x, y, i, opt);
        data[ stride ] = color.r;
        data[ stride + 1 ] = color.g;
        data[ stride + 2 ] = color.b;
        data[ stride + 3 ] = 255;
    }
    let texture = new THREE.DataTexture( data, opt.width, opt.height );
    texture.needsUpdate = true;
    return texture;
};
const tex1 = createDataTexture();
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
mesh1.position.x = -2;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geometry, 
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: tex1
}));
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(mesh2.position);
renderer.render(scene, camera);
```

### 1.3 - The order of the points does very much matter

When it comes to the side option of a material that is used with a mesh the default value for this option is the THREE.FrontSide constant. Other options are then THREE.BackSide, and THREE.DoubleSide that do what the same say they do with this. However this does bring up an interesting question as to how the front side of a triangle determined to begin with? Well it has a whole lot to do with the order of the points of the triangle actually and this demo helps to show just that.

For this demo I have two geometries created with two position attributes where the values of each point in terms of the x,y and z values are very much the same. However one difference between the two is the order of the indices of the points in the array of the position attribute. The end result is that the front sides between the two are flipped.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
// 1
const geometry_1 = new THREE.BufferGeometry();
const data_pos_1 = new Float32Array([
            0.0, 1.0, 0.0, // 0
            -1.0, -1.0, 0.0, // 1
            1.0, -1.0, 0.0 // 2
        ]);
geometry_1.setAttribute('position', new THREE.BufferAttribute(data_pos_1, 3));
//2
const geometry_2 = new THREE.BufferGeometry();
const data_pos_2 = new Float32Array([
            0.0, 1.0, 0.0, // 0
            1.0, -1.0, 0.0, // 2
            -1.0, -1.0, 0.0, // 1
        ]);
geometry_2.setAttribute('position', new THREE.BufferAttribute(data_pos_2, 3));
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
// mesh objects with material set in THREE.FrontSide for side property
const material_mesh = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide
    });
const mesh_1 = new THREE.Mesh(geometry_1, material_mesh);
mesh_1.position.x = -1.25;
scene.add(mesh_1);
const mesh_2 = new THREE.Mesh(geometry_2, material_mesh);
mesh_2.position.x = 1.25;
scene.add(mesh_2);
// points
const material_points = new THREE.PointsMaterial({
        size: 0.25,
        color: new THREE.Color(0, 1, 0)
    });
const points_1 = new THREE.Points(geometry_1, material_points);
points_1.position.copy(mesh_1.position);
scene.add(points_1);
const points_2 = new THREE.Points(geometry_2, material_points);
points_2.position.copy(mesh_2.position);
scene.add(points_2);
//-------- ----------
// RENDER
//-------- ----------
const e = new THREE.Euler(0, 0, 0);
let f = 0;
let lt = new Date();
const fps = 30;
const fm = 300;
const loop = () => {
    requestAnimationFrame(loop);
    const a_frame = f / fm;
    const now = new Date();
    const secs = (now - lt) / 1000;
    if (secs > 1 / fps) {
        e.y = Math.PI * 2 * a_frame;
        camera.position.set(0, 1, 1).normalize().applyEuler(e).multiplyScalar(6);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        f += 1;
        f %= fm;
        lt = now;
    }
}
loop();
```

## 2 - Mutation of box geometry examples

In this section I will be going over some examples of mutating the position attribute of a geometry created with the built in [box geometry constructor function](/2021/04/26/threejs-box-geometry/). However things can still get a little confusing as the number of points in the array of the attribute is not what one might expect when it comes to a cube. For example in a way there is only eight points to a cube sure, so one might think that the length of an array of a position attribute for a cube would be 24. That is that I take the number of points and multiply each by 3 as there is an z, y, and z value for each point. However that is not the case, the count value of the position attribute is indeed 24, but the actual length of the position array is 72. This is because the idea here is to not think in terms of the number of points that are needed, but rather the number of triangles there are in a geometry.

However when one does the math in terms of the number of triangles for each side, the number of point for each triangle, and the number of axis for each point, one will arrive at the number 108, \( 2 \* 6 \* 3 \* 3 = 108 \) which is again wrong. The reason why this is going on is because in a buffer geometry there can be an [index property](https://threejs.org/docs/#api/en/core/BufferGeometry.index) that is another kind of attribute that allows for reusing points. If I call the [to non index method](https://threejs.org/docs/#api/en/core/BufferGeometry.toNonIndexed) of the buffer geometry class, then that 108 number becomes correct actually. This might all prove to be a little confusing, and in all fairness it is a little involved, so lets take a look at some examples that might help to gain a better sense of what is going on here.

### 2.1 - Getting started by just moving one point in the box geometry

If you are still a little confused about all this maybe it would be best to just start playing around with an instance of box geometry, and do a little basic math with some things. Also while you are at it you might chose to change one of the values in the position array to see what the effect is for starters.

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
// GEOMETRY, MESH - starting with a cube and looking at position attribute
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
// check out the position attribute of a cube
const position = geometry.getAttribute('position');
console.log( position.count ); // 24
console.log( position.array.length ); // 72
console.log( position.count * 3 === position.array.length); // true
// get the index for all the trangles
const index = geometry.getIndex();
console.log( index.count );  // 36
console.log( index.count / 3);   /* 12 (index.count / 3 === number of triangles ) */
// mutating a position
const vertIndex = index.array[0];
position.array[vertIndex] = 0.8;
position.array[vertIndex + 1] = 0.5;
position.array[vertIndex + 2] = 0.5;
position.needsUpdate = true;
// use the geometry with a mesh
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
}));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

### 2.2 -  Set vertex helper example

In this example I worked out a simple set vertex helper where I can just pass a geometry, then a vertex instance, and then a position object or instance of vector 3 that can be used to set the position of the vertex. Once again in this example I am working with a built in geometry that is a basic box geometry, and I want to use this set vertex helper method to move a single point in the cube. However doing so does not involve just moving one point, but three points for each triangle at that point.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// set location of a vert given an index value in geometry.index
const setVert = function(geometry, vertIndex, pos){
    pos = pos || {};
    const posIndex = geometry.index.array[vertIndex] * 3,
    position = geometry.getAttribute('position');
    position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
    position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
    position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const pos = {
    x: 1,
    y: 0.25,
    z: 1.25
};
setVert(geometry, 0, pos);
setVert(geometry, 16, pos);
setVert(geometry, 26, pos);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
}));
scene.add(mesh);

//-------- ----------
// LOOP
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const loop = function(){
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

### 2.3 -  Set triangle helper

So now that I have a set vertex helper that seems to work okay I thought it might be nice to create another helper that will helper with each triangle in the cube. This way I can call the set triangle method and pass a position object once, and then that position object will be applied for each vertex in for the given triangle index. This example results in each face being moved away from the center of the cube, which is a cool effect that can be archived by a method such as this.

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
// HELPERS
//-------- ----------
// set location of a vert given an index value in geometry.index
const setVert = function(geometry, vertIndex, pos){
    pos = pos || {};
    const posIndex = geometry.index.array[vertIndex] * 3,
    position = geometry.getAttribute('position');
    position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
    position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
    position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
};
// set triangle
const setTri = function(geometry, triIndex, pos){
    pos = pos || {};
    const vertIndex = triIndex * 3;
    setVert(geometry, vertIndex, pos);
    setVert(geometry, vertIndex + 1, pos);
    setVert(geometry, vertIndex + 2, pos);
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
// example 2 on set tri helper
setTri(geometry, 0, {x: 1});
setTri(geometry, 1, {x: 1});
setTri(geometry, 2, {x: -1});
setTri(geometry, 3, {x: -1});
setTri(geometry, 4, {y: 1});
setTri(geometry, 5, {y: 1});
setTri(geometry, 6, {y: -1});
setTri(geometry, 7, {y: -1});
setTri(geometry, 8, {z: 1});
setTri(geometry, 9, {z: 1});
setTri(geometry, 10, {z: -1});
setTri(geometry, 11, {z: -1});
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
}));
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const loop = function(){
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

### 2.4 - Indexed and non indexed movement of triangles

For this example I am going to create a source geometry that is created with the box geometry constrictor. Then I will create two additional geometries one of which is just a cloned copy of the source, and the other will be the same but in addition I will call the to non indexed method. In the opening text of this section I mentioned that the length of the array of the position attribute of a box geometry is 72 where I would expect 108. The reason why this is is because the box geometry has an index property that allows for the reuse of points which is what helps to crunch that number down. If I call the to non index method then I get an expected length of the array that is 108.

For this example then I have two mesh objects with the two geometries that are clone from the same source geometry one index and the other non indexed. The one that is not indexed can have each triangle move completely apart from the others, while I can not do the same with the indexed one of course because of the shared points.

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
// HELPERS
//-------- ----------
// set location of a vert given an index value in geometry.index
const setVert = function(geometry, vertIndex, pos){
    pos = pos || {};
    const position = geometry.getAttribute('position');
    let i = vertIndex * 3;
    // do we have an index?
    if(geometry.index){
        //then use that
        i = geometry.index.array[vertIndex] * 3;
    }
    position.array[i] = pos.x === undefined ? position.array[i]: pos.x;
    position.array[i + 1] = pos.y === undefined ? position.array[i + 1]: pos.y;
    position.array[i + 2] = pos.z === undefined ? position.array[i + 2]: pos.z;
};
// set triangle
const setTri = function(geometry, triIndex, pos){
    pos = pos || {};
    const vertIndex = triIndex * 3;
    setVert(geometry, vertIndex, pos);
    setVert(geometry, vertIndex + 1, pos);
    setVert(geometry, vertIndex + 2, pos);
};
// triangle movement helper
const triMoveOne = (geometry) => {
    setTri(geometry, 0, {x: 0.8});
    setTri(geometry, 1, {x: 1.1});
    setTri(geometry, 2, {x: -0.8});
    setTri(geometry, 3, {x: -1.1});
    setTri(geometry, 4, {y: 0.8});
    setTri(geometry, 5, {y: 1.1});
    setTri(geometry, 6, {y: -0.8});
    setTri(geometry, 7, {y: -1.1});
    setTri(geometry, 8, {z: 0.8});
    setTri(geometry, 9, {z: 1.1});
    setTri(geometry, 10, {z: -0.8});
setTri(geometry, 11, {z: -1.1});
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_source = new THREE.BoxGeometry(1, 1, 1);
const geo_indexed = geo_source.clone();
const geo_nonindexed = geo_source.clone().toNonIndexed();
// example 2 on set tri helper
triMoveOne(geo_indexed);
triMoveOne(geo_nonindexed);
//-------- ----------
// MESH
//-------- ----------
const material = new THREE.MeshNormalMaterial({
    wireframe: true,
    wireframeLinewidth: 3
});
const mesh1 = new THREE.Mesh(geo_indexed, material);
mesh1.position.x = 1.5;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo_nonindexed, material);
mesh2.position.x = -1.5;
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0.5, 0, 0);
renderer.render(scene, camera);
```

## 3 - Vector3 arrays, buffer geometry position attributes, and Points

I really like the vector3 class as there are a whole lot of very useful methods to work with in that class than help with the process of creating, or mutating a geometry. Also when it comes to just creating and mutating a position attribute alone I have the option to use the THREE.Points constructor in place of the usual THREE.Mesh.

In the basic section of this post on the position attribute I covered a basic example of using the THREE.Points constructor all ready. However in this section I will be focusing  more so on how to create  an array of vector3 class instances from a geometry as well as the inverse of this. There is then using the various features of the vector3 class to mutate the state of a portion attribute and much more.

### 3.1 - Geometry with position attribute from a vector3 array

There are a number of ways to go about making a buffer geometry from an array of Vector3 class instances of course. There are many ways of doing it that might prove to be a little complex, and then other ways that just make use of a method in one of the classes and tools to with with in threejs as well as other official files. For this example I am making use of the [set from points method of the buffer geometry class](/2023/01/05/threejs-buffer-geometry-set-from-points/) to create a buffer geometry with  position attribute from an array of vector3 class instances.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// POINTS
//-------- ----------
// ARRAY of VECTOR3 CLASS INSTANCES
const v3Array = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(0, 0, 2),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(0, 0, 3)
];
// THREE.Points INSTANCE UISNG THREE.PointsMaterial
scene.add(
    new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(v3Array),
        new THREE.PointsMaterial({
            color: 0x00afaf,
            size: 0.25
        })
    )
);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.2 - A vector3 array from a geometry

There is having an array of vector3 objects and wanting to create a buffer geometry from it, and then there is also doing the inverse of that. That is to create an array of vectro3 objects from the position attribute of a buffer geometry that was created with one of the built in constructor functions or some other means.

Amway thus far I am not sure of there is any single method that can be used to do this, but thankfully it is not to hard to just create this kind of array with a quick helper method if that is the way it needs to get done. When doing this one way would be to use the count property of the position buffer attribute object and then pass each value of I to the getX, getY, and getZ methods of the attribute class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Buffer Geometry from v3Array
const Vector3ArrayToGeometry = (v3Array) => {
    return new THREE.BufferGeometry().setFromPoints(v3Array);
};
// Vector3 array from geometry
const Vector3ArrayFromGeometry = (geometry) => {
    const pos = geometry.getAttribute('position');
    let i = 0;
    const len = pos.count, v3Array = [];
    while(i < len){
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
        v3Array.push(v);
        i += 1;
    }
    return v3Array;
};
//-------- ----------
// POINTS
//-------- ----------
// Geometry created with the Torus Geometry Constructor
const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
geometry.rotateX(Math.PI / 180 * 90);
// array of Vector3 class instances
const v3Array = Vector3ArrayFromGeometry(geometry);
// do something to the v3 array
v3Array.forEach((v) => {
    const vd = new THREE.Vector3();
    vd.copy(v).normalize().multiplyScalar(0.75 * THREE.MathUtils.seededRandom())
    v.add(vd);
});
// THREE.Points INSTANCE UISNG THREE.PointsMaterial
scene.add(
    new THREE.Points(
        Vector3ArrayToGeometry(v3Array),
        new THREE.PointsMaterial({
            color: 0x00afaf,
            size: 0.125
        })
    )
);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.3 - Updating a buffer geometry from a Vector3 array

I know that I have covered an example that has to do with creating a buffer geometry from an array of vector3 objects. However I have found that it is not such a good idea to use the method over and over again for a buffer geometry. When doing so I have run into problems, so it would be a good idea to also have another way to not create a new geometry, but update a geometry that is all ready there before hand by mutating the array of the positing attribute.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Buffer Geometry from v3Array
const Vector3ArrayToGeometry = (v3Array) => {
    return new THREE.BufferGeometry().setFromPoints(v3Array);
};
// Vector3 array from geometry
const Vector3ArrayFromGeometry = (geometry) => {
    const pos = geometry.getAttribute('position');
    let i = 0;
    const len = pos.count, v3Array = [];
    while(i < len){
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
        v3Array.push(v);
        i += 1;
    }
    return v3Array;
};
// Vector3 Array to Typed Array
const Vector3ArrayToTyped = (v3Array) => {
    let i = 0, len = v3Array.length, vertArray = [];
    while(i < len){
        let v = v3Array[i];
        vertArray.push(v.x, v.y, v.z);
        i += 1;
    }
    return vertArray;
};
//-------- ----------
// GEO AND POINTS
//-------- ----------
let geo_sphere = new THREE.SphereGeometry(1.5, 30, 30);
let geo_torus = new THREE.TorusGeometry(1, 0.5, 30, 30);
let v3array = Vector3ArrayFromGeometry(geo_torus);
let points = new THREE.Points( geo_sphere, new THREE.PointsMaterial({ size: 0.1}) );
scene.add(points);
let typed = Vector3ArrayToTyped(v3array);
let pos = geo_sphere.getAttribute('position');
let alpha = 1;
pos.array = pos.array.map( (n, i) => {
    let d  = typed[i] === undefined ? 0: typed[i];
    return n + d * alpha;
});
pos.needsUpdate = true;
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.4 - The Apply Euler method for chaining direction

The apply Euler method of the Vector3 class is a way to go about changing the direction of a vector while preserving the unit length. So then this apply Euler method goes hand in hand with other Vector class tools such as as normalize and multiplt scalar to change not just the direction but also the unit length.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Buffer Geometry from v3Array
const Vector3ArrayToGeometry = (v3Array) => {
    return new THREE.BufferGeometry().setFromPoints(v3Array);
};
// Vector3 array from geometry
const Vector3ArrayFromGeometry = (geometry) => {
    const pos = geometry.getAttribute('position');
    let i = 0;
    const len = pos.count, v3Array = [];
    while(i < len){
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
        v3Array.push(v);
        i += 1;
    }
    return v3Array;
};
//-------- ----------
// POINTS
//-------- ----------
const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
geometry.rotateX(Math.PI / 180 * 90);
const v3Array = Vector3ArrayFromGeometry(geometry);
v3Array.forEach((v) => {
    const v_delta = new THREE.Vector3(0, 0, 1);
    const eu = new THREE.Euler();
    if(v.y > 0){
        eu.x =  1 * Math.random();
    }
    v_delta.normalize().applyEuler(eu).multiplyScalar(1);
    v.add(v_delta);
});
// THREE.Points INSTANCE UISNG THREE.PointsMaterial
scene.add(
    new THREE.Points(
        Vector3ArrayToGeometry(v3Array),
        new THREE.PointsMaterial({
            color: 0x00afaf,
            size: 0.125
        })));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 4 - Curves as a tool to help create position attributes

[Curves are a great tool](/2022/06/17/threejs-curve/) for many various tasks that will come up when working on a threejs project. They can come into play for things like defining a path in space that will be used as a way to set the position of an object, or a point of reference to have an object look at. However another use case might be to use them as a way create and update a position attribute of a custom buffer geometry. In this section I will then be doing just that with built in extensions of the curve class and base curve class methods to create a position attribute for a buffer geometry object.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/biHkLTM5MRs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 4.1 - The get points method of the base curve class, and the set from points method of buffer geometry

A real quick way to create a geometry with just a position attribute would be to use the set from points method of the buffer geometry class as covered in the v3 array section of this post. However in order to use this method I will first need an array of vector3 objects to pass to this method that are created from a curve. So I first need to create a curve object, and after that is done I can use the get points method of the base curve class to create this array of Vector3 objects.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// CURVE/DATA
//-------- ----------
const v_start = new THREE.Vector3(-5, 2, -5);
const v_end = new THREE.Vector3(5, 0, 0);
const curve = new THREE.LineCurve3(v_start, v_end);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 10 ) );
//-------- ----------
// POINTS
//-------- ----------
scene.add(  new THREE.Points(geometry, new THREE.PointsMaterial( { size: 1.25 } ) ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 4.2 - The set attribute method, and the get point method of the base curve class

Although the set from points method of the buffer geometry class, and the get points method of the base curve class might help to make quick work of this sort of thing the use of these methods to have there down sides. For one thing it is not such a good idea to use the set from points method over and over again in a loop as I have ran into problems with that. Also although the get points method of the curve class might be nice, I have found that often I might want to have custom spacing between points that are a long a curve so I will need to use the get point method of the curve class and create the points that way.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// CURVE/DATA
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, 0);
const v_end = new THREE.Vector3(5, 0, 0);
const v_controlA = v_start.clone().lerp(v_end, 0.25).add( new THREE.Vector3(0,8,0) );
const v_controlB = v_start.clone().lerp(v_end, 0.75).add( new THREE.Vector3(0,-8,0) );
const curve = new THREE.CubicBezierCurve3(v_start, v_controlA, v_controlB, v_end);
const data = [];
let i = 0, count = 100;
while(i < count){
    const a = i / ( count - 1 );
    const v = curve.getPoint(a);
    data.push(v.x, v.y, v.z)
    i += 1;
}
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array( data ), 3 ));
geometry.center();
//-------- ----------
// POINTS
//-------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.25}));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 8);
camera.lookAt(points.position);
renderer.render(scene, camera);
```

### 4.3 - Update both the curve, and the geometry over time

So then there is the question of how to go about updating this kind of position attribute over time. Well the process will have to involve updating the curve object, and then also updating the position attribute of the buffer geometry as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// HELPERS
//-------- ----------
// update a curve by radian, radius, and a control vector
const updateCurve = (curve, degree = 0, radius = 3, v_control = new THREE.Vector3(0,2,0) ) => {
    const e = new THREE.Euler();
    const radian = Math.PI / 180 * degree;
    e.y = radian;
    curve.v0.set(1, 0, 0).applyEuler(e).multiplyScalar(radius);
    curve.v1.copy(v_control);
    e.y = radian + Math.PI;
    curve.v2.set(1, 0, 0).applyEuler(e).multiplyScalar(radius);
};
// create and return a curve ( HREE.QuadraticBezierCurve3 )
const createCurve = (degree = 45, radius = 3, y = 5) => {
    const curve = new THREE.QuadraticBezierCurve3();
    updateCurve(curve, Math.PI / 180 * degree, radius, new THREE.Vector3(0, y, 0) );
    return curve;
};
// create a curve geometry
const createCurveGeometry = ( curve = createCurve() ) => {
    const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
    geometry.userData.curve = curve;
    const len = geometry.getAttribute('position').count;
    const color_array = [];
    let i = 0;
    while(i < len){
        const a1 = i / len;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        color_array.push(a1, a2, 1 - a2);
        i += 1;
    }
    const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
    geometry.setAttribute('color', color_attribute);
    return geometry;
};
// update a curve geometry to the given curve, or userData.curve of there
const updateCurveGeometry = (geometry, curve) => {
    curve = curve || geometry.userData.curve || createCurve();
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    while(i < att_pos.count){
       const v = curve.getPoint(i / ( att_pos.count - 1) );
       att_pos.setXYZ(i, v.x, v.y, v.z);
       i += 1;
    }
    att_pos.needsUpdate = true;
};
const getBiasAlpha = (a1, count) => {
    let a = 1 - Math.abs(0.5 - (a1 * count % 1) ) / 0.5;
    return a;
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = createCurveGeometry();
//-------- ----------
// POINTS
//-------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5, vertexColors: true }));
scene.add(points);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 8);
camera.lookAt(points.position);
const sm = {
   FPS_UPDATE: 30,    // FPS RATE
   FRAME_MAX: 450,
   secs: 0,
   frame: 0,         // 30 / 450
   tick: 0,          //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = getBiasAlpha(a1, 3);
    const a3 = getBiasAlpha(a1, 12);
    const a4 = getBiasAlpha(a1, 5);
    const a5 = getBiasAlpha(a1, 1);
    const deg = 360 * a1;
    const radius = 7 - 3.5 * a5;
    const x = 5 - 10 * a2;
    const y = 8 - 16 * a3;
    const z = -5 + 10 * a4
    const v_control = new THREE.Vector3(x, y, z);
    updateCurve(geometry.userData.curve, deg, radius, v_control);
    updateCurveGeometry(geometry);

};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render
        update(sm);
        renderer.render(scene, camera);
        // step frame
        sm.frame = ( sm.frame += 1 ) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

## 5 - Animation loop examples of buffer geometry position attribute mutation

For this post I just have to make at least one, if not a few animation examples of the position attribute. In this section then I will be doing just that making animated forms of what I worked out for this post, as well as make use of what I worked out for many other posts including my [threejs examples collection posts](/2021/02/19/threejs-examples/).

### 5.1 - Box Geometry Animation

In this example I am going with what I worked out in the box geometry section of this post by using the set vertex and set triangle helpers to create an update box geometry helper. In this helper method I am doing the same thing that I did for my example on the set tri helper, only I worked out a way to do so in a while loop to update all the triangles of the geometry. The one major difference in this update method beyond that is that I can also pass a percent, or alpha values as it is some times called that can be used to set the state of an animation in terms of a value between 0 and 1.

When doing anything that involves mutating the geometry over an over again by changing values in the position attribute there is one thing that I must always do and that is to make sure that I always set the needs update boolean of the position attribute to true each time I change the values in the position array. Thus far doing so was not that important because I was just updating the geometry once, and that seems to work okay even if i do not make sure it is set to true. However now if I forget that step the geometry will update only once, and then not again on the next call of the animation function.

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
// HELPERS
//-------- ----------
// set location of a vert given an index value in geometry.index
const setVert = function(geometry, vertIndex, pos){
    pos = pos || {};
    const posIndex = geometry.index.array[vertIndex] * 3,
    position = geometry.getAttribute('position');
    position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
    position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
    position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
};
// set pos for tri index
const setTri = function(geometry, triIndex, pos){
    pos = pos || {};
    const vertIndex = triIndex * 3;
    setVert(geometry, vertIndex, pos);
    setVert(geometry, vertIndex + 1, pos);
    setVert(geometry, vertIndex + 2, pos);
};
// update method for a box geo
const updateBoxGeo = function(geometry, per){
    const bias = 1 - Math.abs(per - 0.5) / 0.5,
    size = 0.5 + 1 * bias,
    position = geometry.getAttribute('position'),
    triCount = geometry.getIndex().count / 3;
    let i = 0, pos, axis;
    while(i < triCount){
        axis = ['x', 'y', 'z'][Math.floor(i / 4)];
        pos = {};
        pos[axis] = size * ( i % 4 < 2 ? 1: -1);
        setTri(geometry, i, pos);
        i += 1;
    }
    // MUST SET THE needsUpdate prop of position to true
    position.needsUpdate = true;
};
//-------- ----------
// GEOMETRY, MESH
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
}));
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(mesh.position);
const maxFrames = 300,
FPS = 30;
let lt = new Date(), per = 0;
const loop = function(){
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS){
        per += 1 / (maxFrames / FPS) * secs;
        per %= 1;
        updateBoxGeo(geometry, per);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

So then this animation works out the way that I would more or less expect it to the faces of each side of the cube move out from each other and then back again. There is the a whole bunch of other things that I could do when it comes to creating various other kinds of animations that are just slightly different use case of these basic helper functions.

### 5.2 - Lerp Geometry position helper function

This example makes use of my [lerp geo function](/2022/07/01/threejs-examples-lerp-geo/) that I made for one of my many threejs examples. This is a little project that I made a while back that involves using the lerp method of the vector3 class as a way to transition all the points of a geometry between two sets of geometry to create a cool kind of transition effect. Here in this example I am using it to lerp all the points of a sphere geometry to that of a torus geometry and back again.

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
// HELPERS
//-------- ----------
// LERP GEO FUNCTION
const lerpGeo = function(geo, geoA, geoB, alpha){
    alpha = alpha || 0;
    // pos, and new pos
    let pos = geo.getAttribute('position');
    // positions for a and b
    let posA = geoA.getAttribute('position');
    let posB = geoB.getAttribute('position');
    // loop over pos and lerp between posA and posB
    let i = 0;
    const len = pos.array.length;
    while(i < len){
        // creating Vector3 instances for current posA and PosB vertices
        const v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
        const v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
        // lerping between v and v2 with given alpha value
        v.lerp(v2, alpha);
        // set pos vertex to state of v
        pos.array[i] = v.x;
        pos.array[i + 1] = v.y;
        pos.array[i + 2] = v.z;      
        i += 3;
    }
    // the needs update bool of pos should be set true
    // and I will also need to update normals
    pos.needsUpdate = true;
};
//-------- ----------
// GEO AND POINTS
//-------- ----------
let geo_sphere = new THREE.SphereGeometry(1.5, 30, 30);
let geo_torus = new THREE.TorusGeometry(1, 0.5, 30, 30);
let points = new THREE.Points( geo_sphere.clone(), new THREE.PointsMaterial({ size: 0.1}) );
scene.add(points);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 25, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a = frame / frameMax;
    const b = 1 - Math.abs(0.5 - a) / 0.5;
    lerpGeo(points.geometry, geo_sphere, geo_torus, b);
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

### 5.3 - Box Geometry Move Point example

This is a quick animation form of the box geometry vert helper example in which I am moving a single point in a geometry that was created with the box geometry constructor. When I made this example I still not not have the best system worked out when it comes to working with an index attribute of a buffer geometry that has one.

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
// HELPERS
//-------- ----------
// set location of a vert given an index value in geometry.index
const setVert = function(geometry, vertIndex, pos){
    pos = pos || {};
    const posIndex = geometry.index.array[vertIndex] * 3,
    position = geometry.getAttribute('position');
    position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
    position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
    position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    position.needsUpdate = true;
};
// get bias
const getBias = (n, d, count) => {
    const a = n / d * count % 1;
    return 1 - Math.abs(0.5 - a) / 0.5;
};
//-------- ----------
// GEOMETRY, MESH
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    side: THREE.FrontSide,
    wireframe: true
}));
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 1);
camera.lookAt(mesh.position);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a = frame / frameMax;
    const s = 1 * getBias(frame, frameMax, 8);
    const v1 = new THREE.Vector3(s, s, s);
    setVert(geometry, 0, v1);
    setVert(geometry, 16, v1);
    setVert(geometry, 26, v1);
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

This week I think I will be focusing on the buffer geometry class more when it comes to continuing to learn a thing or two about using threejs in a client side javaScript project. There is a great deal more to learn about when it comes to making a custom geometry in threejs, or mutating one that has all ready been created using one of the built in geometry constructors. The position attribute is just one of many attributes that will come into play when creating custom geometry, in addition to position note worthy attributes are normals and uvs just to name a few.

However there might still be a great deal more to cover when it comes to just messing around with the position array, and creating such an array for a custom geometry. So at some point in the future I should come back around to expand this post even more with additional examples of the position attribute.