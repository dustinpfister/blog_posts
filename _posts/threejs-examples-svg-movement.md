---
title: Using SVG for movement of objects threejs example module
date: 2022-09-23 10:40:00
tags: [three.js]
layout: post
categories: three.js
id: 1006
updated: 2022-09-23 11:28:06
version: 1.2
---

For todays new [threejs project](/2021/02/19/threejs-examples/) example post I started a new project this week in which I am looking into using SVG as a way to create paths that can then be used to define the movement and rotation of objects in a scene. The idea cam to be while working on my blog post for the SVG loader last week where I hit me that SVG is a prerrty cool standard for cretaing paths. There is just one little propblem which is that SVG is very much 2d, so to create a kind of 3d path with SVG I will need to think in terms of two paths for each 3d path. One path that I will be using to define motion for x and z, and then another in which I just use the y value for y in the 3d path.

If I can work out a decent enough system for creating 3d paths then they can be used as a way to update the [position property](/2022/04/04/threejs-object3d-position/) of any [object3d based object](/2018/04/23/threejs-object3d/) over time. This will mean [mesh objects](//2018/05/04/threejs-mesh/), but also any other kind of object3d based object such as a [camera](/2018/04/06/threejs-camera/). Speaking of cameras there is also using these 3d paths created from SVG to update the rotation of objects as well by using the array of Vector3 objects for values to pass to the [look at method](/2021/05/13/threejs-object3d-lookat/) of an object.

<!-- more -->

## The SVG Movement module and what to know first

The content of this post is about a few draft prototype examples, and then the current state of a javaScript module that has to do with updating the posiiton of objects by way of SVG data. This is then a project exmaple that is not really inteneed for people that are new to threejs, as well as client side javaScript in general. As such I will not be getting into detail about basic aspects of threejs as well as core javaScript that you should be up to speed with before hand here. However I do always take a moment with these opening seciton sof my post to write about a few things that you might want to read up on or refresh a little before contning with reading the rest of this post.

### The SVG Loader is not built in and must be added on top of the core threejs librray

The SVG loader is an example of an asset loader that is not built into the core of the librray itself, but is rather one of many offical optiions for assets loaders that can be added on top of threejs by dowloanding the file for the revision number that you are using in the github folder of threejs. I have wrote a [blog post on the subject of the SVG loader alone](/2022/09/16/threejs-svg-loader/) as I have mentuned abouve last week in which I write about setting this up.

### Speaking about SVG there is learning and or refreshing with that

If you have not yet looked into what the deal is with SVG then now would be a good time to [read my post on SVG in general](/2019/02/11/js-javascript-svg), or better yet check out the modzilla docs. There is a lot to take in which it comes to SVG so when it comes to looking at the modzilla docs it is mainly the [path element tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) that you would want to read about that is most relatevnt to this javaScript module.

### Source code is up on Github

The source code examples as well as the addtional assets and notes that I am using here can be found in my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-svg-movement).

### Version Numbers Matter

The version of threejs that I was using when I first wrote this blog post was r140.

## 1 - Some basic draft examples of what I want

### 1.1 - getting the xz array values

```js
// Basic load SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    let SVGMove = {};
    // create an Mesh based object with the given
    // svg data and id prefix
    SVGMove.createMesh = (data, id_prefix, ) => {
        const obj = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial());
        const ud = obj.userData;
        data.paths.forEach((path)=>{
            // get id of the path
            const id = path.userData.node.id;
            const idParts = id.split('_');
            if(idParts[0] === id_prefix){
                // get points
                const points = path.subPaths[0].getPoints();
                ud[ idParts[1] + '_' + idParts[2] ] = points;
            }
        });
        return obj;
    };
    // set an object by an alpha value of 0 - 1
    SVGMove.setToAlpha = (obj, alpha) => {
        const ud = obj.userData;
        let len = 0, i = 0;
        // get current xz Vector2
        len = ud.pos_xz.length;
        i = Math.floor( ( len - 1) * alpha);
        const v2_pos_xz = ud.pos_xz[i];
        // use xz Vector2 to set position of object
        obj.position.set(v2_pos_xz.x, 0, v2_pos_xz.y);
    };
    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // mesh object to move
    let mesh;
    // update
    const update = function(frame, frameMax){
        // calling set to alpha here
        SVGMove.setToAlpha(mesh, frame / frameMax);
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
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-examples-svg-movement/svg/obj1.svg',
        // called when the resource is loaded
        function ( data ) {
            // creating mesh object, adding to scene, and starting loop
            mesh = SVGMove.createMesh(data, 'box1');
            scene.add(mesh);
            loop();
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

### 1.2 - lerping between points, and y values

```js
// Basic load SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    let SVGMove = {};
    // create an Mesh based object with the given
    // svg data and id prefix
    SVGMove.createMesh = (data, id_prefix, ) => {
        const obj = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial());
        const ud = obj.userData;
        data.paths.forEach((path)=>{
            // get id of the path
            const id = path.userData.node.id;
            const idParts = id.split('_');
            if(idParts[0] === id_prefix){
                // get points
                const points = path.subPaths[0].getPoints();
                ud[ idParts[1] + '_' + idParts[2] ] = points;
            }
        });
        return obj;
    };
    // create a v2 from the given obj, useStr, valueStr, and index
    // ex getV2(obj, 'pos', 'xz', 0)
    const getV2 = (obj, useStr, valueStr, index) => {
        const ud = obj.userData;
        const arr = ud[ useStr + '_' + valueStr ];
        const len = arr.length;
        const i = THREE.MathUtils.euclideanModulo(index, len);
        return arr[i];
    };
    // create a v3 for the given obj, use string, and alpha value
    // ex crateV3(obj, 'pos', 0.35);
    const createV3 = (obj, useStr, alpha) => {
        const ud = obj.userData;
        let len = 0, fi, i = 0, lerpAlpha;
        // get current xz Vector2
        len = ud[useStr + '_xz'].length;
        fi = ( len - 1) * alpha; // fraction index ex: 1.44
        i = Math.floor( fi);     // index ex: 1
        lerpAlpha = fi % 1;      // lerpAlpha from current to next point ex: 0.44
        // current pos
        const xz = getV2(obj, useStr, 'xz', i); 
        const xz_next = getV2(obj, useStr, 'xz', i + 1); 
        // next pos
        const y = getV2(obj, useStr, 'y', i);
        const y_next = getV2(obj, useStr, 'y', i + 1);
        // use xz Vector2 to set position of object
        const v3_current = new THREE.Vector3(xz.x, y.y, xz.y);
        const v3_next = new THREE.Vector3(xz_next.x, y_next.y, xz_next.y);
        return v3_current.clone().lerp(v3_next, lerpAlpha);
    };
    // set an object by an alpha value of 0 - 1
    SVGMove.setToAlpha = (obj, alpha) => {
        // just setting position for now
        obj.position.copy( createV3(obj, 'pos', alpha) );
    };
    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // mesh object to move
    let mesh;
    // update
    const update = function(frame, frameMax){
        // calling set to alpha here
        SVGMove.setToAlpha(mesh, frame / frameMax);
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
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-examples-svg-movement/svg/obj1.svg',
        // called when the resource is loaded
        function ( data ) {
            // creating mesh object, adding to scene, and starting loop
            mesh = SVGMove.createMesh(data, 'box1');
            scene.add(mesh);
            loop();
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## 2 - r0 of the svgmove.js javaScript module and demos

### 2.0 - r0 of the module

```js
// svgmove.js - r0 - from threejs-examples-svg-movement
const SVGMove = (function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create a v2 from the given obj, useStr, valueStr, and index
    // ex getV2(obj, 'pos', 'xz', 0)
    const getV2 = (obj, useStr, valueStr, index) => {
        const ud = obj.userData;
        const arr = ud[ useStr + '_' + valueStr ];
        const len = arr.length;
        const i = THREE.MathUtils.euclideanModulo(index, len);
        return arr[i];
    };
    // create a v3 for the given obj, use string, and alpha value
    // ex crateV3(obj, 'pos', 0.35);
    const createV3 = (obj, useStr, alpha) => {
        const ud = obj.userData;
        let len = 0, fi, i = 0, lerpAlpha;
        // get current xz Vector2
        len = ud[useStr + '_xz'].length;
        fi = ( len - 1) * alpha; // fraction index ex: 1.44
        i = Math.floor( fi);     // index ex: 1
        lerpAlpha = fi % 1;      // lerpAlpha from current to next point ex: 0.44
        // current pos
        const xz = getV2(obj, useStr, 'xz', i); 
        const xz_next = getV2(obj, useStr, 'xz', i + 1); 
        // next pos
        const y = getV2(obj, useStr, 'y', i);
        const y_next = getV2(obj, useStr, 'y', i + 1);
        // use xz Vector2 to set position of object
        const v3_current = new THREE.Vector3(xz.x, y.y, xz.y);
        const v3_next = new THREE.Vector3(xz_next.x, y_next.y, xz_next.y);
        return v3_current.clone().lerp(v3_next, lerpAlpha);
    };
    // return true if an object has the given values else false
    const hasValues = (obj, useStr, valueStr) => {
        valueStr = valueStr || 'xz';
        const ud = obj.userData;
        return !(ud[useStr + '_' + valueStr] === undefined);
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    let api = {};
    // use the given object for svg path data
    // this is what I will want to use if I all ready have an object
    // that I want to use
    api.useObj = (data, id_prefix, obj) => {
        const ud = obj.userData;
        ud.data = data; // ref to raw data
        data.paths.forEach((path)=>{
            // get id of the path
            const id = path.userData.node.id;
            const idParts = id.split('_');
            if(idParts[0] === id_prefix){
                // get points
                const points = path.subPaths[0].getPoints();
                ud[ idParts[1] + '_' + idParts[2] ] = points;
            }
        });
        return obj;
    };
    // create an Mesh based object with the given
    // svg data and id prefix
    api.createMesh = (data, id_prefix, opt ) => {
        opt = opt || {};
        opt.con = opt.con || 'Box';
        opt.argu = opt.argu || [1, 1, 1, 1];
        opt.material = opt.material || new THREE.MeshNormalMaterial();
        opt.geometry = null;
        // if opt is a string try to get con function like this
        // else assume the value given is all ready a function
        if(typeof opt.con === 'string'){
            opt.con = THREE[opt.con + 'Geometry'];
        }
        // if geometry is given use that and ignore any con and argu 
        // props that might be there, else we will need to create it
        if(!opt.geometry){
            opt.geometry = new opt.con(...opt.argu);
        }
        // create the mesh
        const mesh = new THREE.Mesh( 
            opt.geometry,
            opt.material);
        // use path data with the mesh
        api.useObj(data, id_prefix, mesh);
        // return the mesh
        return mesh;
    };
    // set an object by an alpha value of 0 - 1
    api.setToAlpha = (obj, alpha) => {
        // set position
        if( hasValues(obj, 'pos')){
            obj.position.copy( createV3(obj, 'pos', alpha) );
        }
        if( hasValues(obj, 'lookat')){
            obj.lookAt( createV3(obj, 'lookat', alpha) );
        }
    };
    return api;
}());
```

### 2.1 - look at example

```js
// Basic load SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // mesh object to move
    let mesh1;
    // update
    const update = function(frame, frameMax){
        // calling set to alpha here
        SVGMove.setToAlpha(mesh1, frame / frameMax);
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
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-examples-svg-movement/svg/obj1.svg',
        // called when the resource is loaded
        function ( data ) {
            // CREATING A MESH OBJECT WITH SVG DATA FOR 'cone1' THAT
            // HAS BOTH 'pos', AND 'lookat' paths
            mesh1 = SVGMove.createMesh(data, 'cone1', {
                con: 'Cone', argu: [0.5, 4, 10, 5],
                material: new THREE.MeshBasicMaterial({wireframe: true})
            });
            // rotation geo once here so that it is pointing the way I want it
            mesh1.geometry.rotateX(Math.PI * 0.5);
            scene.add(mesh1);
            loop();
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

### 2.2 - objects example

```js
// Basic load SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // mesh object to move
    let mesh1;
    // update
    const update = function(frame, frameMax){
        // calling set to alpha here
        SVGMove.setToAlpha(mesh1, frame / frameMax);
        SVGMove.setToAlpha(camera, frame / frameMax);
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
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-examples-svg-movement/svg/obj1.svg',
        // called when the resource is loaded
        function ( data ) {
            // USE OBJECT METHOD SHOULD WORK WITH ANY OBJECT3D BASED OBJECT
            // SUCH AS A CAMERA
            SVGMove.useObj(data, 'cam1', camera);
            // CREATING A MESH OBJECT WITH SVG DATA FOR 'cone1' THAT
            // HAS BOTH 'pos', AND 'lookat' paths
            mesh1 = SVGMove.createMesh(data, 'cone1', {
                con: 'Cone', argu: [0.5, 4, 10, 5],
                material: new THREE.MeshBasicMaterial({wireframe: true})
            });
            // rotation geo once here so that it is pointing the way I want it
            mesh1.geometry.rotateX(Math.PI * 0.5);
            scene.add(mesh1);
            loop();
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```
