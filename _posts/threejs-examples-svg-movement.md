---
title: Using SVG for movement of objects threejs example module
date: 2022-09-23 10:40:00
tags: [three.js]
layout: post/2023/03/17/threejs-examples-svg-tools/
categories: three.js
id: 1006
updated: 2023-03-17 09:27:48
version: 1.8
---

For today's new [threejs project](/2021/02/19/threejs-examples/) example post I started a new project this week in which I am looking into using SVG as a way to create paths that can then be used to define the movement and rotation of objects in a scene. The idea cam to be while working on my blog post for the SVG loader last week where I hit me that SVG is a pretty cool standard for creating paths. There is just one little problem which is that SVG is very much 2d, so to create a kind of 3d path with SVG I will need to think in terms of two paths for each 3d path. One path that I will be using to define motion for x and z, and then another in which I just use the y value for y in the 3d path.

If I can work out a decent enough system for creating 3d paths then they can be used as a way to update the [position property](/2022/04/04/threejs-object3d-position/) of any [object3d based object](/2018/04/23/threejs-object3d/) over time. This will mean [mesh objects](//2018/05/04/threejs-mesh/), but also any other kind of object3d based object such as a [camera](/2018/04/06/threejs-camera/). Speaking of cameras there is also using these 3d paths created from SVG to update the rotation of objects as well by using the array of Vector3 objects for values to pass to the [look at method](/2021/05/13/threejs-object3d-lookat/) of an object.

<!-- more -->

## The SVG Movement module and what to know first

The content of this post is about a few draft prototype examples, and then the current state of a javaScript module that has to do with updating the position of objects by way of SVG data. This is then a project example that is not really intended for people that are new to threejs, as well as client side javaScript in general. As such I will not be getting into detail about basic aspects of threejs as well as core javaScript that you should be up to speed with before hand here. However I do always take a moment with these opening sections of my posts to write about a few things that you might want to read up on or refresh a little before continuing with reading the rest of this post.

### The SVG Loader is not built in and must be added on top of the core threejs library

The SVG loader is an example of an asset loader that is not built into the core of the library itself, but is rather one of many official options for assets loaders that can be added on top of threejs by downloading the file for the revision number that you are using in the github folder of threejs. I have wrote a [blog post on the subject of the SVG loader alone](/2022/09/16/threejs-svg-loader/) as I have mentioned above last week in which I write about setting this up.

### Speaking about SVG there is learning and or refreshing with that

If you have not yet looked into what the deal is with SVG then now would be a good time to [read my post on SVG in general](/2019/02/11/js-javascript-svg), or better yet check out the Mozilla docs. There is a lot to take in which it comes to SVG so when it comes to looking at the Mozilla docs it is mainly the [path element tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) that you would want to read about that is most relevant to this javaScript module.

### I now have a general SVG tools threejs example as well

This threejs module has to do with using SVG in a very weird way to which there may be better alternatives. It is just one of my many experimental ideas in which I thought that it would be cool to use SVG in a way to define curves in space because I could just view the SVG in a web browser or any kind of image editor that supports SVG, but also use paths define in the SVG to create 3D curves in space that can then be used to move objects. However when it comes to using SVG in a way that is a little more typical I know [have an SVG tools threejs project example](/2023/03/17/threejs-examples-svg-tools/) for that sort of thing.

### Source code is up on Github

The source code examples as well as the addtional assets and notes that I am using here can be found in my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-svg-movement).

### Version Numbers Matter

The version of threejs that I was using when I first wrote this blog post was r140.

## 1 - Some basic draft examples of what I want to happen

When I start an idea for a project like this often th first step is to create one or more fairly basic examples where I just want to get the core idea up and running first. Once I get the very general idea working then it is often just a process of creating a module form of what I made, add new features, and refine the features that are all ready working. In this section I will then be going over these draft examples of an SVG movement module then.

### 1.1 - Getting the xz array values

The first and for most thing that I need to do is get the path data that I want to use to update the position of an object, and even then maybe just the x and z values first. For this first draft example of an svg movement module then I made a main object called SVGMove and added a create mesh, and set to alpha public methods for the module. The create mesh object is then just a way to create a mesh object with arays set to the user data object of the mesh object that are created from the svg data.

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

### 1.2 - Lerping between points, and y values

So far so good with my first x and z only proof of concept with this, but there are a few things that I will want to change before getting into making an actual module with this. There is of course using another path in the SVG to also get y values rather than just the x and z values and that is what I got up and working in this example. However the other thing that I would like to fix is to make it so that the movement is not so jumpy. So on top of using another path for the y values I also want to have a system where additional vectors are created between the points given from SVG as well.

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

Looks like the core idea of what I want to work is working okay with my draft examples so after I have them looking good the next step is to create the first version of the SVG movement module. While I am at it I will also want to create a number of demos to make sure that the module is working okay thus far.

### 2.0 - r0 of the module

This first version is for the most part just a module form of what I all ready got working well in my draft examples above but with some much needed changes made, as well as additional features. In my lerp draft example I laid the groundwork for additional sets of values that can be defined in the SVG by adding what I call a use string value as part of the id of an SVG path element. In this module I made changed to the set to alpha method to make use of a look at use string if it is there to use.

Another major feature change that is very much needed is a general use object public method on top of the create mesh method that I improved from the demos. This way I can just use and object3d based object with a set of paths that I define for the object in the SVG file. I still have a create mesh method as will but now it is far more flexible in terms of choosing the constructor function that I use to create the geometry and I can also pass a geometry rather than create one. In any case the create mesh object still uses the general use object method when it comes to appending values to the user data object.

Another thing that I wanted to add at the last moment was a system for checking for a revision number in the SVG file that should correspond to the revision number of this module. I have a lot of plans for this project when it comes to future work that I might do that will result in the svg path data being treated in a new way. So I can check revision numbers and process the data as it should moving forward.

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
    // get the revision number of the svg file
    const getRNum = (data) => {
        let rNum = -1;
        let i = 0, len = data.xml.childNodes.length;
        while(i < len){
            let item = data.xml.childNodes.item(i);
            if(item.id === 'svgmove_r'){
                rNum = parseInt(item.textContent)
                break;
            }
            i += 1;
        }
        return rNum;
    }
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
        let rNum = getRNum(data);
        if(rNum === 0){
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
        }
        if(rNum === -1){
            console.warn('Could not figure out r num for the SVG file.')
        }
        if(rNum >= 1){
            console.warn('This is r0 of svgmove.js, but svg file is for r' + rNum);
        }
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

### 2.1 - Look at example

The general idea that I had in mind with this project is to not just use SVG paths as a way to define the position of an object over time but to also use SVG as a way to set the rotation of an object as well. For this demo I wanted to test drive the new set to alpha method of the module to see that both position and rotation can be set by SVG Paths. So I am using the create method method to create an create a mesh with the cone geometry and the basic material in wire frame mode. After creating the mesh object I also rotate the geometryto make sure that the cone is pointing in the direction that I want it to. For this cone mesh I am using SVG paths that start with a cone1 prefix in the SVG file as this is a collection of paths that I set up that have both position and look at paths.

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

The end result of this is then working just the way that I expect it to, with the cone moving by way of the position paths and also having the front of the mesh facing values created with the look at paths. This works pretty good then, and what is also great is that I can use my use object method to get this to work with any kind of object including cameras.

### 2.2 - Objects example

Another major change that I made with this module is worked out some better methods for creating the vector arrays that are then parked i the mesh objects user data object. In the draft prototypes I was doing this in a crude create mesh helper function that did not give many options when it comes to changing what the geometry is for the mesh and so forth. Now I have a way better method for creating mesh objects, but I am also doing the core actions that need to be preformed with my new use object method where I just give the SVG data result, an id prefix and then a camera that I want to create the vectors for in its user data object.

Simply put although I can use the create mesh object to quickly create a mesh with one of the built in geometry constructors, or a geometry that I have in the code of a project, I can also just create any object3d based object by any means and pass that to my use object method. So in this example I am once again creating a mesh object with the create mesh object method as before, but I am now also using my use object method with the camera of the demo.

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

The end result with this now is that both the cone mesh object as well as the camera are moving by way of SVG paths. This is more or less just what it is that I had in mind when it comes to this sort of thing, as I am always thinking in terms of having a better system for controlling the movement and rotation of a camera. I can then create all kinds of paths in SVG that will allow for real fine grain controls of camera movement and I can also use this kind of system for doing so with all kinds of values with cameras if I end up going that far in any and all future revisions of the module.

## Conclusion

That will be it for now then when it comes to this SVG Movement library that is a great way to go about moving objects around in a scene over time. Or at least it is for what I would like to use it for when it comes to my video projects to say the least. I am sure that there are other ways of doing this sort of thing that might work in a way that is maybe a bit more appropriate for the kind of situation that this is. I have been meaning to take another look at the Curve class that would be a starting point for some kind of alternative project that is another way of doing the same thing here. Although I am sure that such a system would work well I would have to store the data that I use with it as JSON rather than SVG. You see the plan here is to work out a real nice system where I can create the Paths that I want to use with a kind of simply 2d SVG editor and then use this data to display a 2d view of what the movements are and then also use that same data to update the position of the objects in the 3d scene as well.



