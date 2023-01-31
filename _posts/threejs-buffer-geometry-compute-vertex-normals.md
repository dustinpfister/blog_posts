---
title: Compute Vertex Normals for Buffer Geometry in threejs
date: 2022-04-22 10:22:00
tags: [three.js]
layout: post
categories: three.js
id: 980
updated: 2023-01-31 11:36:53
version: 1.19
---

The process of creating a [custom buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry), or mutating a built in geometry in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) might be a little involved, but still there is only so much to be aware of to get started at least. The first step might be to work out the [positions attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) which is the values for the actual points in space. However after the position array is in a good idea to also work out what the deal should be with the [normals attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/). 

The normals attribute is one of many core attributes of a buffer geometry class that are needed in order to get geometry to look the way that one will typicaly want it to with mesh objects, rather than point or line objects. With points and lines all the one really needs are position attributes, and then maybe additional attributes that are used to mutate the position attribute. However with mesh objects there is a need to know what side of a face is the _front side_ of the face, and with that said the normals attribute is how to go about doing just this. In some cases I might have to work out the values of the normal attribute manually, however in most cases just calling the compute vertex normals method of the buffer geometry class will work just fine. With that said this post will be on the use of the compute vertex normals attribute method of the buffer geometry class in threejs.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/yApc9lnw53o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The compute vertex normals method and what to know first

This is a post centered around a single method of the buffer geometry class in the popular javaScript library known as threejs. This is not a post that is a general overview of the buffer geometry class in general, or a [getting started type post with threejs](/2018/04/04/threejs-getting-started/), javaScript,  and any other additional skills that are needed before hand. So I assume that you have at least a little background when it comes to the core set of skills that are needed in order to gain something of value from reading this. I will not be covering everything in detail here, but I will take a moment to write about a few things that you might want to read up more on when it comes to what branches off from the computer vertex normals method.

### Read up more on buffer geometry in general

This is a post on just one method of the over all greater class that is the buffer geometry class. There is a whole lot of ground to cover with just this one class alone, so it might be a good idea to also check out my [main blog post on the buffer geometry class as well]( /2021/04/22/threejs-buffer-geometry/).

### The source code examples in this post are on Github

The source code examples that I write about here in this post can be found in the for post folder of my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-compute-vertex-normals). This is also where I am parking the source code for my [many other post on threejs](/categories/three-js/), as well as many more demos that I also have parked there on all kinds of other topics that have to do with the over all librray that is threejs.

### Version numbers matter with threejs

The version of threejs that I was using when I first wrote this post was r135, and the last time I came around to edit this post a little I was using r146. I have got myself into the habit of also making sure I write down what version of threejs that I am using when writing a post on a threejs example or two. Code breaking changes are made to the library often so it makes sense to always check what version of threejs you are using and how to compares with the blog post, or any online resource that you are reading.

## 1 - Some Basic examples of custom geometry and adding normals by way of compute vertex normals method

For this very first section I will be starting out with some very simple custom geometry examples. Some of these will not have a normal attribute at all that will serve as just a way to outline what can be done when working with a geometry that just has a position attribute alone. After that I will be getting into some examples where I do in fact quickly add a nomal attribute by way of the compute vertex normals method.

### 1.1 - Just starting out with a position attribute

For this very first basic example I am making a custom geometry that just has a position attribute and no normal attribute at all. So the this kind of geometry will not work so great with most mesh materials, at least not with default options and not without additional attributes anyway. So for this first example I will not be using a mesh object but rather a point object.

To start to create a geometry from the ground up then I call the THREE.BufferGeometry constructor function and then store the result from that to a variable. Next I will want to have at least a position attribute for this new blank buffer geometry so I will want an array for the x, y, and z values for each point in space that I want. For this first example I am just making a single triangle, so I will want three numbers for each point which will be a total of nine numbers in the array. Once I have my points data array I can use this to create a buffer attribute and set that as the position attribute of the buffer geometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - creating from raw hard coded data
//-------- ----------
const geometry = new THREE.BufferGeometry();
const data_points = [
    -1.0,  0.0,  0.0,
     1.5,  0.0,  0.0,
     1.0,  1.0,  0.0
];
// create attributes
geometry.setAttribute('position', new THREE.Float32BufferAttribute(data_points, 3) );
//-------- ----------
// MESH with GEOMETRY, and STANDARD MATERIAL
//-------- ----------
const points = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.5 }));
scene.add(points);
// RENDER
renderer.render(scene, camera);
```

### 1.2 - Basic compute vertex normals method example

When working with one of the built in geometry constructors the normals are worked out for me as that is part of making a comprehensive geometry constructor function. However when making a custom geometry from the ground up I will of course have to make attributes one way or another on my own. For example of the compute vertex normals method I am then just making a very simple geometry of a single triangle, and then calling the compute vertex normals method of the buffer geometry as a way to go about creating the normals attribute. Once I have a geometry with a position and normal attribute then the faces of the geometry will have a front face, and will also work with light sources.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 0, 3);
scene.add(dl);
scene.add(new THREE.AmbientLight(0xffffff, 0.1));
//-------- ----------
// GEOMETRY - cretaing from raw hard coded data
//-------- ----------
const geometry = new THREE.BufferGeometry();
const data_points = [
    -1.0,  0.0,  0.0,
     1.5,  0.0,  0.0,
     1.0,  1.0,  0.0
];
// create attributes
geometry.setAttribute('position', new THREE.Float32BufferAttribute(data_points, 3) );
geometry.computeVertexNormals(); // COMPUTE VERTEX NORMALS FOR THE GEMOERTY
//-------- ----------
// MESH with GEOMETRY, and STANDARD MATERIAL
//-------- ----------
const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    }));
scene.add(mesh);
// RENDER
renderer.render(scene, camera);
```

So now that I have a normals attribute with this geometry I can now use a [light source](/2022/02/25/threejs-light/) and see the material when using a material like that of the [standard material](/2021/04/27/threejs-standard-material/) with a light source. Although that might be the case there is still one additional attribute that I will need to add to the geometry in order for this to be a done deal in terms of the core set of attributes that are needed which would be the uv attribute. However for the sake of this post I think I should first cover a few more examples that focus more so on the state of this normals attribute and how to know what the state of it is.

## 2 - The THREE.VertexNormalsHelper

In order to really get an idea of what is going on with the state of the normals attribute of a geometry it might be best to make use of the [THREE.VertexNormalsHelper](https://threejs.org/docs/#examples/en/helpers/VertexNormalsHelper) that can be added to an example by way of one additional javaScript file that can be found in the threejs repository. There is a whole lot to work with when it comes to the core of the threejs library alone, but there are also a number of additional files in to form of helpers, loaders and controls. For this example I am not just making use of the vertex normals helper, but also the [orbit controls](/2018/04/13/threejs-orbit-controls/) that can also be added by way of an additional javaScript file as well.

Here I have two plane geometries both of what I am mutating over time in the same way, but with one I am calling the compute vertex normals method and with the other I am not. On top of that I am also using the vertex normals helper to show what the deal is with the state of the normals for each geometry. It is also possible to see that there is indeed a clear differences with the textures.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 1, 0);
scene.add(dl);
//-------- ----------
// CONTROLS - if there to work with
//-------- ----------
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// ADJUST PLANE POINT HELPER
const adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    const position = geo.getAttribute('position');
    const normal = geo.getAttribute('normal');
    const i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    position.needsUpdate = true;
};
// update a geo
const updatePlaneGeo = function(geo, bias, computeNormals){
    computeNormals = computeNormals || false;
    adjustPlanePoint(geo, 0, 0 + 0.75 * bias);
    adjustPlanePoint(geo, 1, 0.75 - 1.00 * bias);
    adjustPlanePoint(geo, 2, 0.1);
    adjustPlanePoint(geo, 8, -0.4 * bias);
    // ADJUSTING NORMALS USING computeVertexNormals method
    if(computeNormals){
        geo.computeVertexNormals();
    }
};
// create a data texture
const createDataTexture = function (pr, pg, pb) {
    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    // Using the seeded random method of the MathUtils object
    const width = 16,
    height = 16,
    size = width * height;
    data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        const stride = i * 4;
        const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v * pr;
        data[stride + 1] = v * pg;
        data[stride + 2] = v * pb;
        data[stride + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    return texture;
};
//-------- ----------
// MESH
//-------- ----------
const geo1 = new THREE.PlaneGeometry(1, 1, 2, 2);
geo1.rotateX(Math.PI * 1.5);
const plane1 = new THREE.Mesh(
        geo1,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: createDataTexture(0,1,0),
            side: THREE.DoubleSide
        }));
scene.add(plane1);
const geo2 = new THREE.PlaneGeometry(1, 1, 2, 2);
geo2.rotateX(Math.PI * 1.5);
const plane2 = new THREE.Mesh(
        geo2,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: createDataTexture(0,1,1),
            side: THREE.DoubleSide
        }));
plane2.position.x = -1.1;
scene.add(plane2);
//-------- ----------
// HELPER OBJECTS - using THREE.VertexNormalsHelper method if there to work with
//-------- ----------
let helper1, helper2;
if(THREE.VertexNormalsHelper){
    helper1 = new THREE.VertexNormalsHelper(plane1, 2, 0x00ff00, 1);
    scene.add(helper1);
    helper2 = new THREE.VertexNormalsHelper(plane2, 2, 0x00ffff, 1);
    scene.add(helper2);
}
//-------- ----------
// LOOP
//-------- ----------
const state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0,
    lt: new Date()
};
const update = function (secs, per, bias, state) {
    updatePlaneGeo(geo1, bias, true);
    updatePlaneGeo(geo2, bias, false);
    if(THREE.VertexNormalsHelper){
        helper1.update();
    }
};
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    update(secs, state.per, state.bias, state);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    state.lt = now;
};
loop();
```

This is a hacked over source code example of what I worked out for my [threejs example on mutation of plane geometry](/2021/06/11/threejs-examples-plane-mutate/) that I will likely comes back to at some point again. There are a lot of other threejs features as well as client side javaScript features that I am making use of in this example that I should also write about for a sec here as well. When it comes to creating a quick texture with javaScript code I am making use of a [data texture](/2022/04/15/threejs-data-texture/) to do so, which is one of several options for doing so on top of other options like making use of [canvas textures](/2018/04/17/threejs-canvas-texture/).

## Conclusion

The compute vertex normals method will work just fine for most cases as a way to create, or update the normals attribute of a buffer geometry instance. However there are some cases in which I might need to manually edit these values also, so I can not just call this method and be done with it all the time.

The general though process that I have when making a geometry is that first I need to just work out the positions attribute, then I need to get the normals attribute working as it should. However there is then the question of what the next step is after the positions and normals attribute are looking good. With that said I would say that the next thing I would want to figure out would be the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) which is important when it comes to working out what the offsets of textures should be. There are some additional things after that as well though such as what the deal should be when it comes to [groups, and material index values](/2018/05/14/threejs-mesh-material-index/) when using an array of materials to skin a mesh object rather than juts one.

