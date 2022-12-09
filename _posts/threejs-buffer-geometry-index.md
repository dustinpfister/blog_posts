---
title: Indexed Buffer Geometry in threejs
date: 2022-12-09 09:22:00
tags: [three.js]
layout: post
categories: three.js
id: 1017
updated: 2022-12-09 10:01:06
version: 1.1
---

The index property of a buffer geometry instance is a way to define an array of index values in a position attribute that will be used to draw triangles. Simply put it is a way to reuse points stored in the position attribute so that the over all length of the array in the position attribute is lower than it would otherwise have to be. The main reason why I might want to have a geometry indexed is to save memory when it comes to geometries with a lot of points in them. Also it would help to reduce the amount of overhead it would take to update geometry also a little as it is less points that have to be looped over in order to do so. 

However there are also some draw backs with this as well that have to do with the state of the normal attribute the corresponds with the position attribute for example. Also because I am reusing points any kind of effect that has to do with exploding a geometry into a hole bunch of single triangles is not possible as the points are being reused. It is not so hard to convert an index geometry to a non indexed one though, doing so involves just calling the to non indexed method of the buffer geometry class. Things might be a little involved when it comes to the other way around though as it will involve creating a buffer attribute instance and using the set index method.

<!-- more -->


## 1 – Some Basic examples of Indexed Buffer Geometry in threejs

This first section will be just a few quick basic examples that have to do with the index property of a buffer geometry. 

### 1.1 - The basic Index of an Indexed Geometry

For this example I am creating what might very well be the most basic form of an index geometry that is composed of just two triangles made from 4 points in the position attribute.

```js
(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 5, 5);
    camera.lookAt(-2, 0, -2);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // INDEX GEO
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
    // position array of 4 points
    const pos = new THREE.BufferAttribute(new Float32Array([0,-3,0,0,3,0,-5,0,0,0,0,-5]), 3);
    geometry.setAttribute('position', pos);
    // using 4 points to draw two trangles by adding an index
    const index = new THREE.BufferAttribute( new Uint8Array([0,1,2,0,1,3]) , 1);
    geometry.setIndex(index)
    // using this to create normal attribute
    geometry.computeVertexNormals();
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 1.2 - Indexed and non indexed geometry compared

When it comes to getting started with the index property of buffer geometry there is making a custom geometry that is just two triangles. When it comes to a non indexed geometry these two triangles will consist of 6 points in space stored in the position attribute, even if two of the points of each triangles are the same. When it comes to an indexed geometry however only 4 points can be defined in the position attribute, and then an index can be used to define 6 index values of points in the position attribute as a way to draw the triangles.

```js
(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
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
    const index = new THREE.BufferAttribute( new Uint8Array([0,1,2,0,1,3]), 1);
    geo_indexed.setIndex(index)
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
    // MESH
    //-------- ----------
    const mesh_indexed = new THREE.Mesh(geo_indexed, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
    mesh_indexed.position.x = -1;
    scene.add(mesh_indexed);
    const mesh_non_indexed = new THREE.Mesh(geo_non_indexed, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
    mesh_non_indexed.position.x = 2;
    scene.add(mesh_non_indexed);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

With both mesh objects In this example I am using the mesh normal material and f you looks closely at the outcome of this you will notice that they both look a littler different. This is because for both geometries I am calling the compute vertex normals method to create the normal attribute of the geometries and with the indexed geometry the state of the normal attribute is not a typically desired outcome.  This is because we have four points rather than sit which results in 4 normal vector rather than six, which in turn also effects the face normals sense vector normals are used to find that.

## 2 - Animaiton loop exmaples

### 2.1 - Two Box Geometry based Mesh Objects

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
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
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
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
}());
```