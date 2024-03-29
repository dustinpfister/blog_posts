---
title: Arrays of materials, and material index values in threejs
date: 2018-05-14 09:54:00
tags: [js,three.js]
layout: post
categories: three.js
id: 187
updated: 2023-07-17 12:56:40
version: 1.43
---

When working with a [Mesh Object](/2018/05/04/threejs-mesh/) in [threejs](https://threejs.org/) a single instance of a material can be passed to the mesh constructor as the second argument, after the geometry. This is fine if I am okay with every face in the [geometry](/2018/04/14/threejs-geometry/) being skinned with the same material, otherwise I might want to do something else. Often just the use of one material is fine as the state of the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) of the [buffered geometry instance](/2021/04/22/threejs-buffer-geometry/) is in a state in which it will work well with the textures that I am using with one or more of the material map options. However another option might be to not have just one material, but an array of [materials](/2018/04/30/threejs-materials/) and then have a way to set what the material index value is for each face in the geometry. Also an array of materials might need to be used in conjugation with uv mapping as well as I might want some surfaces to be effected by one material, while using another for the rest.

When working with an array of materials there is a property of a [face3](/2018/05/11/threejs-face3/) instance in the geometry of the mesh that is of interest when setting the material index property of the faces, or at least that was the case with the old Geometry Constructor that was removed in r125 of threejs. So then there is how to go about setting material index values with an instance of the [Buffered Geometry constructor](https://threejs.org/docs/#api/en/core/BufferGeometry.groups) that is still part of the core of the three.js library in late versions of threejs. In this post then I will be touching base on this topic of working with an array of materials in a threejs project then, rather than alternatives to doing so such as uv mapping, or having [groups of objects](/2018/05/16/threejs-grouping-mesh-objects/) which would be yet another option for this sort of thing.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/RLu9zFnO5FY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## What to know before getting into Mesh Material index values

It should go without saying that this is not a [getting started post with three.js](/2018/04/04/threejs-getting-started/), and I also will not be getting into the basics of javaScript, and any additional topics that you should have a solid grasp on before hand. Still in this section I will be going over some of the things that you show know before getting into mesh material index values of group objects of a buffer geometry instance.

### It might be good to look over the Buffer Geometry class in detail if you can get around to it

This is a post on the [mesh class object](/2018/05/04/threejs-mesh/) in three.js and how to use an array of materials rather than just one with a geometry. That is when using more than one material with a mesh there is creating an instance of a mesh, passing a geometry as the first argument, and an array of materials as the second argument. When it comes to having control over how to set what material is for what they way to go about doing it is to figure out a thing or two about groups in buffer geometry, or the face3 class if you are still using an old version of threejs that is before r125.

When it comes to using one of the built in geometry constructors such as the BoxGeometry constructor to create an instance of buffer geometry groups and material index values for them are set up for you and it is just a matter of looping over the groups of the geometry and changing the index values to the desired value if needed. However when it comes to making a custom geometry, as well as some of the built in geometries adding groups is something that needs to be done manually. In any case it makes sense to look into the [buffer geometry in greater detail](/2021/04/22/threejs-buffer-geometry/) beyond the scope of just this post alone.

### Using an array of materials is not a replacement for UV Mapping

Using an array of materials is just one tool in the toolbox when it comes to having control over materials that are used for a geometry in a mesh object. The first and foremost thing that should be considered though is what is going on with UV mapping and how that can be used to skin the geometry as desired. The [UV attribute of the buffer geometry instance](/2021/06/09/threejs-buffer-geometry-attributes-uv/) is an array of offset values that correspond to areas in a texture that are used to skin that specific area of the geometry. Getting into understanding this subject in depth can prove to be a little involved but it is how to go about making a geometry look they way I want it to with just one material.

Even when I do use UV mapping there might be a situation in which I might want to use one material for one area of a geometry and another for the rest. For example say I want to use the Lambert material for an area of a geometry that should be wood, and the rest of the geometry I want to use the Phong material for metal surfaces. In such a case uv mapping and arrays of materials with group objects all go hand in hand to get the desired end outcome.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post as well as for my many other posts on threejs can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-mesh-material-index). This is also where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter big time with three.js

Threejs has been, and as of this writing still is, a fast moving target of a library when it comes to development. When I first wrote this post back in May of 2018 I was using r91 of threejs, and I used [r146 last time I edited this post](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Between these two versions of threejs a whole lot of code breaking changes have happened, and this will likely continue to be the case moving forward. Always be mindful of the revision number of threejs that you are using when reading about threejs examples on the open web, much of the content is out dated.

## 1 - Basic static example of an array of materials with a Box Geometry ( r125+ )

A great way to start out with arrays of materials is to create a quick demo that makes use of the Box geometry constructor as this will have a groups array set up for it all ready. The groups array is a way to define how separate WebGL draw calls should be done by setting a start vertex, count index, and material index value for each call for non-indexed geometry. In some cases this can also be a triangle index as well for indexed geometry. What is great about starting out with the box geometry constructor though is that this is all worked otu before hand where each face will be a single call with material index values in the range of 0 to 5. 

Simply put I can just create a mesh with an array of six materials, one for each side of the box, when using the box geometry constructor. So a simple hello world type example of arrays of materials in threejs might look something like this.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTION
//-------- ----------
const mkMaterial = (color, opacity) => {
    return new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity
    })
};
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    // geometry as first argument
    new THREE.BoxGeometry(1, 1, 1),
    // array of materials as the second argument
    [
        mkMaterial(0xff0000, 0.75),
        mkMaterial(0x00ff00, 0.75),
        mkMaterial(0x0000ff, 0.50),
        mkMaterial(0xff00ff, 0.50),
        mkMaterial(0xffff00, 0.25),
        mkMaterial(0x00ffff, 0.25)
    ]
);
mesh.rotation.set(0.6, 0.8, 0.4);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So far so good, but what if I want to change what the material index values are for each face? With that said lets look at a few more examples of arrays of materials with mesh objects.

## 2 - Working with the groups array

Starting out with arrays of materials is easy enough when using something like THREE.BoxGeometry as that is a situation in which the groups array is set up to begin with. However there is the question of how to go about doing the same thing but with only two materials and then set what the index values are for each side of the box using just those two materials rather than six. There is then maybe adjusting the draw call range for one or more materials, and then there is how to go about adding groups to a geometry that does not have one to begin with. So with that said in this section I will be writing a thing or two about how to work with the groups property of geometry.

### 2.1 - New example with groups array using ( r125+ )

In this section I will be going over the source code of an example that shows how to mutate material index values of a built in geometry using by looping over the groups array and setting the desired material index values. Once again this is an example where I am using a geometry created with the built in box geometry constructor that has the groups array set up for me all ready. The main difference here is that I am using less than six materials so I need to loop over the groups array and set material index values that are in the range of the length of the array of materials given.

So once again I create an array of materials, this time I am going with the phong material for each and just changing up the color. Sense I am using a material that will work with a light source I am also adding a directional light so that I will see something as i am just using the color property of the phong material. Anyway this time around although I have an array of materials this time I want to just work with two materials, which is less than six, so I will want to adjust the material index values in the group array.

With that said when I create the box geometry I just loop over the groups array and set all of the material index values to values that are in the range of the length of this array of materials.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// ARRAY OF MATERIALS
//-------- ----------
const materials = [
    new THREE.MeshPhongMaterial({
        color: 0xff0000
    }),
    new THREE.MeshPhongMaterial({
        color: 0x00ff00
    })
];
//-------- ----------
// GEOMETRY AND GROUPS
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1); // Box geometry with groups set up
// SET THE INDEX VALUES FOR EACH FACE
geometry.groups.forEach(function (face, i) {
    face.materialIndex = Math.floor(i % materials.length);
});
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    // geometry as first argument
    geometry,
    // array of materials as the second argument
    materials);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const alpha = frame / frameMax;
    mesh.rotation.x = THREE.MathUtils.degToRad(360 * alpha);
    mesh.rotation.y = THREE.MathUtils.degToRad(360 * 4 * alpha);
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

### 2.2 - Create groups of a built in geometry that does not have one ( r125+ )

The box geometry is a great starting point for this sort of thing as there is a groups array is all ready set up for me. Often I might just need to adjust the material index values, but if I just use six materials for each face then I do not even need to do that. This is however not always the case with many of the other built in geometry constructors though such as the plane geometry. However maybe the plane geometry is a good built in geometry constructor to start with when it comes to learning a thing or two about how to go about adding groups to a geometry.

For this example I want to create a plane geometry that is 5 by 5 in terms of unit size, but just 2 by 2 when it comes to the grid size of the plane. I want to then use to materials to skin this plane but when I do so nothing happens, and the reason why is because the groups are not set up for me out of the box. This is not to big of a deal though as all I need to do is just make a few calls of the add group method of the buffer geometry class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY AND GROUPS
//-------- ----------
// new plane geometry
const geometry = new THREE.PlaneGeometry(5, 5, 2, 2);
geometry.rotateX(Math.PI * 1.5);
// adding groups
// give a start vertex index, count of vertex and material index for each call
geometry.addGroup(0, 6, 0);
geometry.addGroup(6, 6, 1);
geometry.addGroup(12, 6, 1);
geometry.addGroup(18, 6, 0);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    // geometry as first argument
    geometry,
    // array of materials as the second argument
    [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        })
    ]
);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 7, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

When calling the app group method the first argument is a start vertex index, followed by a count of vertices to use in the call. The final argument when calling add group is then the material index in the array of materials that I would like to use for the group. The end result of these few calls is then a group array in the buffer geometry of this plane set up to use two materials in a checkered kind of way.

### 3.1 - Art example one

This is the example that I have together for the first video that I have made for this blog post. For this example I am have a collection of materials for a cube in which I am making a data texture for each face of the cube. On top of that I also worked out a crude yet effective system for making images with materials in a plane geometry also.

<iframe class="youtube_video" src="https://www.youtube.com/embed/EH9SqTWA51E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 640 / 480, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(al);
const pl = new THREE.PointLight(0xffffff, 0.5);
pl.position.set(-3, 2, -3);
scene.add(pl);
//-------- ----------
// HELPERS
//-------- ----------
// create a plane geo with groups set up to work with images
const createPlaneGeo = () => {
    const geometry = new THREE.PlaneGeometry(10, 10, 16, 16);
    geometry.rotateX(Math.PI * 1.5);
    let pxIndex = 0, len = 256;
    while(pxIndex < len){
        geometry.addGroup(pxIndex * 6, 6, 0);
        pxIndex += 1;
    }
    return geometry;
};
// update plane geo to given imageindex and images array
const updatePlaneGeo = (geometry, images, imageIndex) => {
    const img = images[imageIndex];
    let pxIndex = 0, len = 256;
    while(pxIndex < len){
        const group = geometry.groups[pxIndex]
        group.materialIndex = img[pxIndex];
        pxIndex += 1;
    }
    return geometry;
};
const mkMaterial = (color, opacity, texture) => {
    return new THREE.MeshPhongMaterial({
        color: color,
        map: texture || null,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity
    })
};
// data texture module
const datatex = (function () {
    const api = {};
    // mk data texture helper
    api.mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        const width = w, //20,
        height = data.length / 4 / w;
        const texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = function (w, h, forEach) {
        const width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        const size = width * height;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const x = i % width;
            const y = Math.floor(i / width);
            let obj = forEach(x, y, w, h, i, stride, data);
            obj = obj || {};
            data[stride] = obj.r || 0;
            data[stride + 1] = obj.g || 0;
            data[stride + 2] = obj.b || 0;
            data[stride + 3] = obj.a === undefined ? 255: obj.a;
        }
        return api.mkDataTexture(data, width)
    };
    // from px data method
    api.fromPXDATA = function(pxData, width, palette){
        palette = palette || [
            [0,0,0,255],
            [0,255,0,255],
            [32,32,32,255],
            [64,64,64,255],
            [128,128,128,255]
        ];
        const height = Math.floor(pxData.length / width);
        return api.forEachPix(width, height, function(x, y, w, h, i){
            const obj = {};
            const colorIndex = pxData[i];
            const color = palette[colorIndex];
            obj.r = color[0];
            obj.g = color[1];
            obj.b = color[2];
            obj.a = color[3];
            return obj;
        });
    };
    // simple gray scale seeded random texture
    api.seededRandom = function (w, h, rPer, gPer, bPer, range) {
        w = w === undefined ? 5 : w,
        h = h === undefined ? 5 : h;
        rPer = rPer === undefined ? 1 : rPer;
        gPer = gPer === undefined ? 1 : gPer;
        bPer = bPer === undefined ? 1 : bPer;
        range = range || [0, 255]
        const size = w * h;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const v = Math.floor(range[0] + THREE.MathUtils.seededRandom() * (range[1] - range[0]));
            data[stride] = v * rPer;
            data[stride + 1] = v * gPer;
            data[stride + 2] = v * bPer;
            data[stride + 3] = 255;
        }
        return api.mkDataTexture(data, w);
    };
    // return the api
    return api;
}
());
// create plane mesh to use with images
const createPlaneMesh = (materials) => {
    // new plane geometry
    const geometry = createPlaneGeo(images, 1);
    const mesh = new THREE.Mesh(
        // geometry as first argument
        geometry,
        // array of materials as the second argument
        materials || [
            mkMaterial(0xffffff, 1, null),
            mkMaterial(0x000000, 1, null),
            mkMaterial(0x888888, 1, null)
        ]
    );
    return mesh;
};
//-------- ----------
// PLANE MATERIAL INDEX DATA
//-------- ----------
const images = [
    [
        1,2,2,0,0,0,0,0,0,0,0,0,0,2,2,1,
        2,2,0,0,0,1,1,2,2,1,1,0,0,0,2,2,
        2,0,0,0,1,2,2,0,0,2,2,1,0,0,0,2,
        0,0,0,1,2,0,0,0,0,0,0,2,1,0,0,0,
        0,0,0,2,0,1,2,0,0,2,1,0,2,0,0,0,
        0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,
        0,0,0,0,1,1,2,0,0,2,1,1,0,0,0,0,
        0,0,0,0,1,1,2,0,0,2,1,1,0,0,0,0,
        0,0,0,0,2,2,2,1,1,2,2,2,0,0,0,0,
        0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0,
        0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,
        0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,
        0,0,0,0,2,1,1,1,1,1,1,0,0,0,0,0,
        2,0,0,0,0,2,2,1,1,2,2,0,0,0,0,2,
        2,2,0,0,0,0,0,2,2,0,0,0,0,0,2,2,
        1,2,2,0,0,0,0,0,0,0,0,0,0,2,2,1
    ],
    [
        0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0
    ],
    [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,2,0,1,1,1,2,0,0,0,
        0,0,0,0,0,2,2,1,1,2,2,2,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,0,2,1,1,0,0,0,0,0,
        0,0,0,1,1,1,1,0,2,1,1,1,1,2,0,0,
        0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,
        0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
        0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
        0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,
        0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    [
        0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,1,
        1,0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,
        0,1,0,1,2,1,0,1,0,1,0,1,0,1,0,1,
        1,0,1,0,1,2,1,0,1,0,1,0,1,0,1,2,
        0,1,0,1,2,1,0,1,0,1,0,1,0,1,2,1,
        1,0,1,2,1,0,1,0,1,0,1,0,1,2,1,0,
        0,1,0,1,2,1,0,1,0,1,0,1,2,1,0,1,
        1,2,1,2,1,0,1,0,1,0,1,0,1,2,1,0,
        2,1,0,1,0,1,0,1,0,1,0,1,0,1,2,1,
        1,0,1,0,1,0,1,0,1,0,1,0,1,2,1,0,
        0,1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,
        1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,
        0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,
        1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,0,
        0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,
        1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,0
    ]
];
//-------- ----------
// TEXTURES
//-------- ----------
const texture_rnd1 = datatex.seededRandom(32, 32, 1, 1, 1, [128, 255]);
const texture_top = datatex.fromPXDATA([
    1,1,1,1,
    1,2,3,3,
    1,2,2,2,
    1,2,3,3
], 4);
const texture_side1 = datatex.fromPXDATA([
    1,1,1,1,
    2,3,2,1,
    3,2,3,1,
    1,1,1,1
], 4);
const texture_side2 = datatex.fromPXDATA([
    1,1,1,1,
    2,2,2,2,
    3,3,3,3,
    3,3,3,3
], 4);
const texture_side3 = datatex.fromPXDATA([
    3,1,2,1,
    3,1,1,1,
    3,2,2,2,
    3,3,3,3
], 4);
const texture_side4 = datatex.fromPXDATA([
    3,1,2,2,
    3,1,1,1,
    2,2,2,1,
    3,3,3,1
], 4);
const texture_bottom = datatex.fromPXDATA([
    2,2,1,3,
    1,1,1,3,
    2,2,2,3,
    3,3,3,3
], 4);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(
    // geometry as first argument
    new THREE.BoxGeometry(2, 2, 2),
    // array of materials as the second argument
    [
        mkMaterial(0xffffff, 0.5, texture_side1),
        mkMaterial(0xffffff, 0.5, texture_side3),
        mkMaterial(0xffffff, 0.5, texture_top),
        mkMaterial(0xffffff, 0.5, texture_bottom),
        mkMaterial(0xffffff, 0.5, texture_side2),
        mkMaterial(0xffffff, 0.5, texture_side4)
    ]
);
mesh.position.set(0, 1.5, 0);
scene.add(mesh);
// plane
const plane = createPlaneMesh([
   mkMaterial(0xffffff, 1, texture_rnd1),
   mkMaterial(0x222222, 1, texture_rnd1),
   mkMaterial(0x008800, 1, texture_rnd1)
]);
updatePlaneGeo(plane.geometry, images, 0);
scene.add(plane);
// sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(200, 30, 30),
    new THREE.MeshBasicMaterial({wireframe:true, wireframeLinewidth: 3}))
scene.add(sphere);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(7, 3, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const alpha = frame / frameMax;
    updatePlaneGeo(plane.geometry, images, [0,1,2,3,0,1,2,3][ Math.floor(alpha * 8)] );
    mesh.rotation.set(
        Math.PI * 2 * 1 * alpha, 
        Math.PI * 2 * 8 * alpha, 0);
    sphere.rotation.y = Math.PI * 2 * alpha;
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

### 3.2 - Material options loop example ( r125+ )

I wanted to make a new video for this post as the first one that I made I think is to complex, and it does not do the best job of showing what the deal is with material index values in the process. So for this animation loop example I just made a single cube that rotates around and I have a collection of six materials for the cube. In the first loop example I also did the same, however I used the Phong material for each of the side where with this example I am using all kinds of differing material options. Also I am doing things a little differently when it comes to the options objects that I am making for each of the materials as well. There is having a single common object where I set common options for all materials, and then there is having another option object on top of that which can contain options that might only work for a single type of material such as shininess in the phong material.

One cool note worthy thing about this that has to do with the base matreial class is the [depth funciton](https://threejs.org/docs/#api/en/materials/Material.depthFunc) that I am using here for the common options object. When it comes to the common object I am making all matreials transparent, and setting the opacity to 0.5. However when doing so I run into problems when it comes to faces behind another face not rendering. One way to adress this is to take a look at the depth function option of the base matreial class. There are a few options when it comes to the value to set for this base material class option and have found that the [AlwaysDepth constant](https://threejs.org/docs/#api/en/constants/Materials) gives the end result I was looking for with this.

```js
// ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.9);
dl.position.set(1, 2, 3);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
// ---------- ----------
// MATERIALS
// ---------- ----------
const opt_mat_all = {
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthFunc: THREE.AlwaysDepth
};
const createMatOpt = (opt) => {
    return Object.assign({}, opt_mat_all, opt);
};
const materials = [
    new THREE.MeshNormalMaterial(createMatOpt({
    })),
    new THREE.MeshBasicMaterial(createMatOpt({
    })),
    new THREE.MeshStandardMaterial(createMatOpt({
        color: 0xff0000
    })),
    new THREE.MeshPhongMaterial( createMatOpt({
        color: 0x00ff00, shininess: 120, specular: 0xffffff
    })),
    new THREE.MeshLambertMaterial( createMatOpt({
        color: 0x00ffff
    })),
    new THREE.MeshBasicMaterial( createMatOpt({
        wireframe: true
    }))
];
// ---------- ----------
// GEOMETRY/OBJECTS
// ---------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1, 8, 8);
const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = a1 * 4 % 1;
    mesh.rotation.x = THREE.MathUtils.degToRad(360 * a2);
    mesh.rotation.y = THREE.MathUtils.degToRad(720 * a2);
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

## 4 - Old Basic Example of an array of materials, and face material index values using ( r91 ).

If I am using a really old revision of threejs then I might want to be using the faces array. A basic example of this would be to just have an array of instances of some kind of Mesh Material such as the Mesh Basic Material. Once I have an array the materials can be used by setting the material index value of all face3 instances in the geometry that I am using to point to the corresponding index of the material in the array of materials that I want to use with a given face.

```js
// REVISION 91 style 'face3' demo
(function () {
    console.log('You are using threejs revision: R' + THREE.REVISION + ', this was made for R91');
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MATERIALS
    //-------- ----------
    // an array of materials
    var materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    ];
    //-------- ----------
    // GEOMETRY/OBJECTS
    //-------- ----------
    // create the mesh
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // set material index values
    var len = materials.length;
    geometry.faces.forEach(function (face3, i) {
        face3.materialIndex = Math.floor(i % (len * 2) / 2);
    });
    // create the mesh
    var mesh = new THREE.Mesh( geometry, materials);
    // add mesh to scene
    scene.add(mesh);
    // some helpers
    scene.add( new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1) );
    scene.add( new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1) );
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

Using modulo to get the remainder when diving the current face index over the length of materials will result in an effect where each material is used in an alternating fashion. I can write different expressions to get different effects, but you should get the basic idea. The process is to have a collection of materials, and then do what is necessary to see that each face is painted with the desired material.

## Conclusion

When starting to make a real project of one kind or another it is important to know how to go about doing this sort of thing of course. Even when it comes to developing some kind of crude yet effective kind of style for 3d modeling I am still going to want to know how to skin different faces with different materials.

### More Examples of Material index values

On my post on the [sphere geometry constructor](/2021/05/26/threejs-sphere/) I worked out an example that has to do with creating groups for a sphere geometry. However maybe the best additional post on this topic thus far would be my [post on the plane geometry constructor](/2019/06/05/threejs-plane/) where I worked out a few more examples of this sort of thing.

### Additional THREEJS reading

To really get a solid grasp on working with material index values, as well as the materials themselves, and everything that branches off from that it would be best to just start making one or two actual projects of some kind and learn as you go. At least I have found that is the best way to go about things speaking from my experience thus far. With that said it might be a good idea to check out some of my threejs project examples thus far, one that stands out when it comes to material index values would be my [guy on a hamster wheel example](/2021/04/19/threejs-examples-hamster-wheel/) where I am making use of material index values, and canvas generated textures for those materials.