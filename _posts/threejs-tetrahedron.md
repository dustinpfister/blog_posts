---
title: Pyramid AKA Tetrahedron Geometry in threejs.
date: 2022-12-02 08:23:00
tags: [three.js]
layout: post
categories: three.js
id: 1016
updated: 2022-12-02 08:48:46
version: 1.1
---

When looking into the built in Geometry Classes in threejs for the first time there are a few that can be used to make a Pyramid Type Geometry. Both the Cone Geometry, and the Cylinder Geometry classes can be used to do so if one gives a certin set of arguments when calling them. There is however also a built in Tetrahedron Geometry Class that can also be used to do this bu just simply calling it and giving a radius that will also result in a Pyramid shape as well. However one might run into some problems with this sort of thing when it comes to rotation of the result, and there are also a few addtional reasons why one might want to make some kind of custom geometry for this sort of thing as well. So in this post I will be writing about this built in Tetrahedron Geometry Class, but also an array of altertaive ways to create this kind of geometry inclduing some custom ways to do so while I am at it.

<!-- more -->


## 1 - 

### 1.1 - Using the Tetrahedron Geometry Class to create a Pyramid

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // Tetrahedron Geometry
    // ---------- ----------
    const geo = new THREE.TetrahedronGeometry(1, 0);
    const mesh_material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh( geo, mesh_material );
    scene.add(mesh);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    camera.position.set(3.25, 2.25, 3).normalize().multiplyScalar(2);
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
}());
```

### 1.2 - Using the Cone Geometry Class to create a Pyramid

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0 ,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // Cone Geometry set up to result in a kind of Tetrahedron
    // ---------- ----------
    const geo = new THREE.ConeGeometry(0.75, 1, 3, 1, true);
    geo.rotateX(Math.PI * 0.5);
    // ---------- ----------
    // MESH AND POINTS
    // ---------- ----------
    const mesh_material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh( geo, mesh_material );
    scene.add(mesh);
    const points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.25}));
    mesh.add(points);
    mesh.position.set(0,0,0);
    mesh.lookAt(10,0,0);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    // loop
    const loop = () => {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}());
```

### 1.3 - Using the Cylinder Geometry Class to create a Pyramid

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0 ,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // CYlinder Geometry set up to result in a kind of Tetrahedron
    // ---------- ----------
    const geo = new THREE.CylinderGeometry(0, 1, 2, 3, 1, true);
    geo.rotateX(Math.PI * 0.5);
    // ---------- ----------
    // MESH AND POINTS
    // ---------- ----------
    const mesh_material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh( geo, mesh_material );
    scene.add(mesh);
    const points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.25}));
    mesh.add(points);
    mesh.position.set(0,0,0);
    mesh.lookAt(10,0,0);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    // loop
    const loop = () => {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}());
```

## 2 - Tetrahedron Geometry and the position attribute

### 2.1 - The count of points is 12 rather than 4 becuase it is NOT indexed

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1, 3, 5);
    camera.lookAt(0, 0 ,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // CHECKING OUT THE POSITION ATTRIBUTE
    // ---------- ----------
    const geo = new THREE.TetrahedronGeometry(1, 0);
    // getting position attribute
    const pos = geo.getAttribute('position');
    // it has a count of 12 becuase it is not indexed
    console.log(pos.count); // 12 ?!
    console.log(geo.index); // null
    // ---------- ----------
    // NEW GEOMETRY WITH A POS COUNT OF 4, WITH INDEX
    // ---------- ----------
    const geo2 = new THREE.BufferGeometry();
    const posB = new THREE.BufferAttribute( pos.array.slice(0, 4 * 3), 3);
    geo2.setAttribute('position', posB);
    // making an index for it
    const data = new Uint8Array([1,2,0,  3,1,0,  2,3,0,  1,3,2]);
    const index = new THREE.BufferAttribute(data, 1)
    geo2.setIndex(index);
    geo2.computeVertexNormals();
    console.log(geo2.getAttribute('position').count); // 4
    // ---------- ----------
    // MESH 
    // ---------- ----------
    const mesh1 = new THREE.Mesh( geo, new THREE.MeshNormalMaterial() );
    mesh1.position.set(-2,0,0);
    scene.add(mesh1);
    const mesh2 = new THREE.Mesh( geo2, new THREE.MeshNormalMaterial() );
    scene.add(mesh2);
    // vertex helpers
    scene.add( new THREE.VertexNormalsHelper(mesh1) );
    scene.add( new THREE.VertexNormalsHelper(mesh2) );
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    // loop
    const loop = () => {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}());
```

### 2.2 - Regular Tetrahedron test using Vector3 distance to method

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1, 2, 3);
    camera.lookAt(0, 0 ,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // create 4 count helper
    const create4Count = (radius) => {
        const geo_source = new THREE.TetrahedronGeometry(radius === undefined ? 1 : radius, 0);
        const pos = geo_source.getAttribute('position');
        const geo = new THREE.BufferGeometry();
        const posB = new THREE.BufferAttribute( pos.array.slice(0, 4 * 3), 3);
        geo.setAttribute('position', posB);
        const data = new Uint8Array([1,2,0,  3,1,0,  2,3,0,  1,3,2]);
        const index = new THREE.BufferAttribute(data, 1);
        geo.setIndex(index);
        geo.computeVertexNormals();
        return geo;
    }
    // test helper
    const testTetrahedron = (geo) => {
        const pos = geo.getAttribute('position');
        // if count is not 4 then false
        if(pos.count != 4){
            return false;
        }
        let i_p = 0;
        // check lengths of all edges
        const points = [];
        while(i_p < pos.count){
            points.push( new THREE.Vector3( pos.getX(i_p), pos.getY(i_p),pos.getZ(i_p) ) )
            i_p += 1;
        }
        let point_indices = [ [0,1], [1,2], [2,3], [3,1], [0,2], [0,3] ];
        let n;
        let i2 = 0;
        while(i2 < point_indices.length){
            const a = point_indices[i2]
            const d = points[ a[0] ].distanceTo( points[ a[1] ] );
            if(n === undefined){
                n = d;
            }else{
                if(d != n){
                    // return false if any edge does not equal another
                    return false;
                }
            }
            i2 += 1;
        }
        // if we make it this far, then true
        return true;
    };
    // ---------- ----------
    // CUSTOM GEOMETRY MADE FROM THREE.TetrahedronGeometry
    // ---------- ----------
    const geo = create4Count(2);
    console.log( testTetrahedron(geo) ); // true
    // ---------- ----------
    // MESH 
    // ---------- ----------
    const mesh1 = new THREE.Mesh( geo, new THREE.MeshNormalMaterial() );
    scene.add(mesh1);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    // loop
    const loop = () => {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}());
```

## 3 - Animation loop example

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const appendLine = (mesh, color, lw, opacity ) => {
        const line_material = new THREE.LineBasicMaterial( {
            color: color|| 0xffffff,
            linewidth: lw === undefined ? 6 : lw,
            transparent: true,
            opacity: opacity === undefined ? 1 : opacity
        });
        const line = new THREE.LineSegments( mesh.geometry, line_material );
        mesh.add(line)
    };
    // ---------- ----------
    // Tetrahedron Geometry
    // ---------- ----------
    const geo = new THREE.TetrahedronGeometry(3, 0);
    // ---------- ----------
    // MESH
    // ---------- ----------
    const mesh_material1 = new THREE.MeshPhongMaterial( {
        color: 0x00ff88, flatShading: true,
        side: THREE.DoubleSide,
        transparent: true, opacity: 0.50 } );
    const mesh_material2 = new THREE.MeshPhongMaterial( {
        color: 0x00ff00, flatShading: true,
        transparent: true, opacity: 0.25
    });
    const mesh = new THREE.Mesh( geo, mesh_material1 );
    scene.add(mesh);
    appendLine(mesh);
    // sphere mesh
    const mesh_sphere = new THREE.Mesh( new THREE.SphereGeometry(3.0, 30, 30), mesh_material2);
    scene.add(mesh_sphere);
    appendLine(mesh_sphere, 0xffffff, 3, 0.2);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1.0);
    dl.position.set(3, 1, 2);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(al);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        mesh.rotation.y = Math.PI * 2 * a1;
        mesh.rotation.z = Math.PI * 4 * a1;
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
