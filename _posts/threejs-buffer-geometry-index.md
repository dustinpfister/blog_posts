---
title: Indexed Buffer Geometry in threejs
date: 2022-12-09 09:22:00
tags: [three.js]
layout: post
categories: three.js
id: 1017
updated: 2023-05-23 10:51:00
version: 1.13
---

The [index property of a buffer geometry instance in threejs](https://threejs.org/docs/#api/en/core/BufferGeometry.index) is a way to define an array of index values in a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) that will be used to draw triangles. Simply put it is a way to reuse points stored in the position attribute so that the over all length of the array in the position attribute is lower than it would otherwise have to be. The main reason why I might want to have a geometry indexed is to save memory when it comes to geometries with a lot of points in them. Also it would help to reduce the amount of overhead it would take to update geometry also a little as it is less points that have to be looped over in order to do so. 

However there are also some draw backs with this as well that have to do with the state of the [normal attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/) the corresponds with the position attribute for example. Also because I am reusing points any kind of effect that has to do with exploding a geometry into a hole bunch of single triangles is not possible as the points are being reused. It is not so hard to convert an index geometry to a non indexed one though, doing so involves just calling the to non indexed method of the buffer geometry class. Things might be a little involved when it comes to the other way around though as it will involve creating a buffer attribute instance and using the set index method.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/x-qV4hYJLOA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Index property of buffer geometry and what to know first

The index property if an advanced topic in threejs that hs to do with how to go about reusing points that are defined I the position attribute of a buffer geometry. It should go without saying then that this is not a [good starting point for people that are new to threejs](/2018/04/04/threejs-getting-started/), let alone JavaScript in general. I am the assuming that you know a thing or two about the basics of setting up a threejs project, as well a various other things that have to do with client side web development. I will not be getting into every little detail that you should know before hand at this point, but I do like to use these opening sections to write about a few things you might want to read up more on before continuing to read the rest of this post.

### Read More on Buffer geometry in general

The index property if just one little feature of a buffer geometry object in threejs. There is a great deal more to be aware of when it comes to buffer geometry, so you might want to check out my [main post on buffer geometry in general](/2021/04/22/threejs-buffer-geometry/).

### Source Code is up on Github

The examples that I write about in this post can also [be found on my Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-index). This is also where I park the source code exmaples that I have made for my [other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers Matter

When I first wrote this post I was using r146 pf threejs.


## 1 - Some Basic examples of Indexed Buffer Geometry in threejs

This first section will be just a few quick basic examples that have to do with the index property of a buffer geometry centered around examples that involve a very simple custom geometry. The index property has to do with reusing points in the position attribute so then these examples will involve a very simple custom geometry that is just two triangles. There is then just understanding the difference between using 6 points with no index, and 4 points with an index if two points are at the same location.

### 1.1 - The basic Index of an Indexed Geometry

For this example I am creating what might very well be the most basic form of an index geometry that is composed of just two triangles made from 4 points in the position attribute. I start out by making a new blank buffer geometry by calling the THREE.BufferGeometry with the new keyword and no arguments of any kind. The result is then a blank clean buffer geometry returned that I store to a variable. Now I can use the set attribute method of the buffer geometry class to set a position attribute. However first I will need an instance of THREE.BufferAttribute set up with the position data that I want to use to create my two triangles.

To create the position attribute I call the THREE.BufferAttribute constructor and pass a Float32Array that will contain the points in space that I want to use. Each three numbers in the array will be for x,y, and then z values for a single point in space. I want 4 points and 3 axis values for each point so that means the length of the array will be 12. After I pass the array as the first argument I will then pass the number 3 as the second argument as there are 3 values for each item in this buffer attribute. Now that I have the buffer attribute for the position attribute I can now call the set attribute method of that blank geometry, pass the string position as the first argument, and then the buffer attribute for position as the next.

So now I have a geometry with a position attribute, now I will want to add the index. For this it is more or less the same process as with making the custom position attribute. However I will be using a Uint8Array, and this time it is just 1 number per item as this is an array of index values for points in the position attribute that I just set. When I have my index buffer attribute instance I can then pass it as an argument when calling the set index method of the geometry.

One last thing with the geometry is that I will want to call the [compute vertex normals](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) method to quickly create a normals attribite for this geometry. The reason why is because I am going to use this geometry with a mesh object that will use the [mesh normal material](/2021/06/23/threejs-normal-material/) so I will need this.

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

### 1.2 - Indexed and non indexed geometry compared

When it comes to getting started with the index property of buffer geometry there is making a custom geometry that is just two triangles. With a non indexed geometry these two triangles will consist of 6 points in space stored in the position attribute, even if two of the points of each triangles are the same. When it comes to an indexed geometry however only 4 points can be defined in the position attribute, and then an index can be used to define 6 index values of points in the position attribute as a way to draw the triangles.

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
// INDEX GEO
//-------- ----------
const geo_indexed = new THREE.BufferGeometry();
// position array of 4 points to draw two triangles, by using an index
geo_indexed.setAttribute('position',
    new THREE.BufferAttribute(new Float32Array([0,0,0, 0,2,0, -2,0,0, 0,0,-2]), 3)
);
geo_indexed.setIndex([0,1,2,0,1,3]);
geo_indexed.computeVertexNormals();
//-------- ----------
// INDEX GEO
//-------- ----------
const geo_non_indexed = new THREE.BufferGeometry();
// position array of 6 points for two triangles ( no index )
geo_non_indexed.setAttribute('position',
    new THREE.BufferAttribute(new Float32Array([0,0,0, 0,2,0, -2,0,0, 0,0,0, 0,2,0, 0,0,-2]), 3)
);
geo_non_indexed.computeVertexNormals();
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_indexed = new THREE.Mesh(geo_indexed, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
mesh_indexed.position.x = -1;
scene.add(mesh_indexed);
const mesh_non_indexed = new THREE.Mesh(geo_non_indexed, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
mesh_non_indexed.position.x = 2;
scene.add(mesh_non_indexed);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

With both mesh objects In this example I am using the mesh normal material and if you look closely at the outcome of this you will notice that they both look a littler different. This is because for both geometries I am calling the compute vertex normals method to create the normal attribute of the geometries and with the indexed geometry the state of the normal attribute is not a typically desired outcome.  This is because we have four points rather than sit which results in 4 normal vector rather than six, which in turn also effects the face normals sense vector normals are used to find that.

## 2 - The set index method

One thing that I learned is that it is a good idea to be aware of the limits of typed arrays when making a buffer attribute that is to be used with the set index method of the buffer geometry class. In the threejs docs it is shown that a buffer attribute needs to be passed as the first and only argument when calling the set index method. However the good news is that a plane old JavaScript array can be passed in place of a buffer attribute as well and it may be best to just simply do that actually.

If you do want to pass a buffer attribute when calling the set index method just keep in mind that there are limits to these various data types. The numbers should be integers however it might still be best to go with a float option actually sense some of them have higher max safe integer values than the integer options for typed arrays. This is very true with the Uint8Array typed array that is just a single byte of course, and as such it will limit the usable point count of the geometry to 256.

### 2.1 - Custom Plane Geometry based on THREE.PlaneGeometry that just passes an array when calling setIndex

If you are not sure what typed array you should use one option is to just pass a plane old javaScript array and let the set index method figure that out for you. I have found that this is something that is being done in the actual threejs source code when it comes to the [plane geometry constructor function](https://github.com/mrdoob/three.js/blob/r146/src/geometries/PlaneGeometry.js) for example. Speaking of plane geometry the source code of the plane geometry is what this example is based off of with just a few very minor changes to create a helper funciton that creates and mutates a Buffer Geometry, rather than a Class that extends BufferGeometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 2000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTION
//-------- ----------
// custom plane geo function based off of THREE.PlaneGeometry source code found at:
// https://github.com/mrdoob/three.js/blob/r146/src/geometries/PlaneGeometry.js
const PlaneGeo = ( width = 1, depth = 1, widthSegments = 1, depthSegments = 1) => {
    const geo = new THREE.BufferGeometry();
    const width_half = width / 2;
    const depth_half = depth / 2;
    const gridX = Math.floor( widthSegments );
    const gridZ = Math.floor( depthSegments );
    const gridX1 = gridX + 1;
    const gridZ1 = gridZ + 1;
    const segment_width = width / gridX;
    const segment_depth = depth / gridZ;
    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];
    // position, normal, and uv data arrays
    for ( let iz = 0; iz < gridZ1; iz ++ ) {
        const z = iz * segment_depth - depth_half;
        for ( let ix = 0; ix < gridX1; ix ++ ) {
            const x = ix * segment_width - width_half;
            vertices.push( x, 0, z );
            normals.push( 0, 0, 1 );
            uvs.push( ix / gridX );
            uvs.push( 1 - ( iz / gridZ ) );
         }
    }
    geo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geo.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
    //-------- ----------
    // THE BUFFER GEOMETRY INDEX DATA, and the BufferGeometry setIndex method
    //-------- ----------
    for ( let iz = 0; iz < gridZ; iz ++ ) {
        for ( let ix = 0; ix < gridX; ix ++ ) {
            const a = ix + gridX1 * iz;
            const b = ix + gridX1 * ( iz + 1 );
            const c = ( ix + 1 ) + gridX1 * ( iz + 1 );
            const d = ( ix + 1 ) + gridX1 * iz;
            indices.push( a, b, d );
            indices.push( b, c, d );
        }
    }
    // UISNG THE SET INDEX METHOD TO CREATE THE INDEX FOR THE BUFFER GEOMETRY
    // PASSING AN ARRAY, AND NOT A BUFFER ATTRIBUTE. IF A BUFFER ATTRIBUTE IS PASSED
    // MAKE SURE IT IS NOT A Uint8 TYPED ARRAY AS INDEX VALUES CAN GO BEYOND 255
    //--------
    // YES - Just give an array and let setIndex figure out what Attribute Type to use
    geo.setIndex(indices);
    //--------
    // MAYBE - There is passing a BufferAttribute to make things explicit. 
    //         Just be mindful of the number range limits.
    // geo.setIndex( new THREE.Uint32BufferAttribute( indices, 1) );
    // geo.setIndex( new THREE.Float64BufferAttribute( indices, 1) );
    //--------
    // NO!! - limit of Unit8Array is 255
    // geo.setIndex( new THREE.BufferAttribute( new Uint8Array(indices), 1) );
    // geo.setIndex( new THREE.Uint8BufferAttribute( indices, 1) );
    return geo;
};
//-------- ----------
// GEO
//-------- ----------
// geo1 is a 1000 x 1000 size with a 1 * 1 with segment size
// that results in 4 points which results in a Uint16Array
const geo1 = PlaneGeo(1000, 1000, 1, 1);
console.log(geo1.getAttribute('position').count); // 4
console.log(geo1.index.array.constructor.name);   // Uint16Array
// geo2 is a 1000 x 1000 size with a 100 * 100 with segment size
// that results in 10201 points which results in a Uint16Array
const geo2 = PlaneGeo(1000, 1000, 100, 100);
console.log(geo2.getAttribute('position').count); // 10201
console.log(geo2.index.array.constructor.name);   // Uint16Array
// geo3 is a 1000 x 1000 size with a 280 * 280 with segment size
// that results in a total of 78961 points which results in a Uint32Array
const geo3 = PlaneGeo(1000, 1000, 280, 280);
console.log(geo3.getAttribute('position').count); // 78961
console.log(geo3.index.array.constructor.name);   // Uint32Array
//-------- ----------
// MATERIAL, MESH
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, 1, 0),
    wireframe: true,
    wireframeLinewidth: 1
});
const mesh = new THREE.Mesh(geo2, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Notice that when passing a plane javaScript array to the set index method it will choose a Uint16Array, or a Uint32Array depending on the count of points in the position attribute. So if the count of points is below the limit of Uint16Array it will use that else it will go higher to the Uint32Array. The limit of a Uint32Array is 4,294,967,295 which is a whole lot of points, and for the most part I do not think that is something that I will end up going over for any geometry at least in terms of typical, practical use anyway. 

Still if for some weird reason I do need the next step up there is no Uint64Array but there is Float64Array that has a max safe integer value of 9,007,199,254,740,991. I would not just use that though, it might be best to use Uint32Array arrays if I want to make things static and explicit, or just pass a plane old javaScript array and be done with this.


## 3 - Animaiton loop exmaples

As always I like to work out at least one if not more animation loop example for my posts that help to give a better idea of what the subject of the post is all about. For the subject of indexed and none indexed geometry there is a whole lot of potential when it comes to this subject that involves changing the state of a position attribute over time for both and indexed and non indexed geometry to showcase a major difference between they two.

### 3.1 - Two Box Geometry based Mesh Objects

When using the [THREE.BoxGeometry class to create a geometry](/2021/04/26/threejs-box-geometry/) it will have an index for it set up for me. If I want the box to not be indexed I can just call the to non index method to do so. For this example I create a geometry with the box geometry constructor function, and then another geometry that is just a clone of this. I then class the to non indexed method off of the clone of the box geometry to end up with an indexed and non indexed box geometry that I then use with two mesh objects. I then add both of these mesh objects to a group and loop over the children of the group in a main update method.

When updating the same points in each position attribute the result as one should expect is very different. When it comes to the non index geometry I can move a whole triangle by itself from the rest of the geometry, however of course when it comes to the indexed geometry there are shared points which effect the whole of the geometry.

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
// TWO GEOS ONE INDEX ONE NOT INDEXED
// ---------- ----------
const geo_index = new THREE.BoxGeometry(1, 1, 1);
const geo_noindex = geo_index.clone().toNonIndexed();
console.log(geo_index.index);   // ( buffer attribute object )
console.log(geo_noindex.index); // null
// ---------- ----------
// MESH OBJECTS USING EACH GEO
// ---------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide});
const group = new THREE.Group();
scene.add(group)
const mesh1 = new THREE.Mesh(geo_index, material);
mesh1.userData.pos_home = mesh1.geometry.getAttribute('position').clone();
const mesh2 = new THREE.Mesh(geo_noindex, material);
mesh2.userData.pos_home = mesh2.geometry.getAttribute('position').clone();
group.add(mesh1);
group.add(mesh2);
mesh1.position.set(-2, 0, 0);
mesh2.position.set(2, 0, 0);
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0, frame = 0, lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs( 0.5 - a1 ) / 0.5;
    // loop over group children
    group.children.forEach( (mesh) => {
        const pos = mesh.geometry.getAttribute('position');
        const pos_home = mesh.userData.pos_home;
        let i = 0;
        let len = pos.array.length;
        pos.array[9] = pos_home.array[9] + 2 * a2;
        pos.array[12] = pos_home.array[12] + 2 * a2;
        pos.array[15] = pos_home.array[15] + 2 * a2;
        pos.needsUpdate = true;
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

### 3.2 - Two Plane Geometry Objects video1 example

Although the box geometry example shows what the deference is between index and non indexed geometry I have found that this example that involves the use of plane geometry does a better job of showing the difference. When it comes to the mesh that uses the geometry that does not have an index that breaks apart into a whole bunch of triangles, where the indexed geometry just turns into a bunch of peaks and values and starts to look like land.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(9, 9) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 1, 2)
scene.add(dl);
// ---------- ----------
// HELPERS
// ---------- ----------
// create ddeltas for the traingle y values
const createTriDeltas = (geo) => {
    const pos = geo.getAttribute('position');
    const len_tri = Math.floor(pos.array.length / 9);
    let i_tri = 0;
    const deltas = [];
    while(i_tri < len_tri){
        deltas.push(-2 + 4 * Math.random() );
        i_tri += 1;
    }
    return deltas;
};
// create group helper
const createGroup = () => {
    // material
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: new THREE.Color(0,1,0),
        emissive: new THREE.Color(1,1,1),
        emissiveIntensity: 0.1
    });
    // geo indexed and non indxed
    const geo_index = new THREE.PlaneGeometry(4, 5, 20, 25);
    geo_index.rotateX(Math.PI * 1.5)
    const geo_noindex = geo_index.clone().toNonIndexed();
    const group = new THREE.Group();
    // indexed mesh
    const mesh1 = new THREE.Mesh(geo_index, material);
    mesh1.userData.pos_home = mesh1.geometry.getAttribute('position').clone();
    mesh1.userData.deltas = createTriDeltas(mesh1.geometry);
    // no index mesh
    const mesh2 = new THREE.Mesh(geo_noindex, material);
    mesh2.userData.pos_home = mesh2.geometry.getAttribute('position').clone();
    mesh2.userData.deltas = createTriDeltas(mesh2.geometry);
    group.add(mesh1);
    group.add(mesh2);
    mesh1.position.set(-2.5, 0, 0);
    mesh2.position.set(2.5, 0, 0);
    return group;
};
const updateGroup = (group, alpha) => {
    // loop over group children
    group.children.forEach( (mesh) => {
        const pos = mesh.geometry.getAttribute('position');
        const pos_home = mesh.userData.pos_home;
        let len_tri = Math.floor(pos.array.length / 9);
        let i_tri = 0;
        while(i_tri < len_tri){
            let i = i_tri * 9;
             const delta = mesh.userData.deltas[i_tri];
             pos.array[i + 1] = pos_home.array[ i + 1] + delta * alpha;
             pos.array[i + 4] = pos_home.array[i + 4] + delta * alpha;
             pos.array[i + 7] = pos_home.array[ i + 7] + delta * alpha;
             i_tri += 1;
        }
        pos.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
    });
};
const createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
// ---------- ----------
// TEXTURE
// ---------- ----------
const texture_map = createCanvasTexture(function (ctx, canvas) {
    const w = 16, h = 16;
    let i = 0, len = w * h;
    while(i < len){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = canvas.width / w * x;
        const py = canvas.height / h * y;
        const v = 0.5 * Math.random().toFixed(2);
        const color = new THREE.Color(v,v,v);
        ctx.fillStyle = color.getStyle();
        ctx.fillRect(px, py, canvas.width / w, canvas.width / h);
        i += 1;
    }
}, 64);
// ---------- ----------
// GROUP
// ---------- ----------
const group = createGroup();
scene.add(group);
group.children.forEach((mesh) => {
    mesh.material.map = texture_map;
});
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0, frame = 0, lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs( 0.5 - a1 ) / 0.5;
    updateGroup(group, a2);
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

In any case the index of a geometry is something to be aware of to say the least. There are situations in which I might want to create one in order to crunch down the size of the position array. Also there are situations in which I might want to create a non indexed geometry and recompute the normal and uv attributes for a geometry while I am at it.

