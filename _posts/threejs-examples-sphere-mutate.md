---
title: Mutating a point in a sphere with threejs
date: 2021-06-10 14:19:00
tags: [three.js]
layout: post
categories: three.js
id: 886
updated: 2022-10-11 09:55:09
version: 1.21
---

This week I was learning more about how to work with a [buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) when it comes to the various attributes that make up such a feature in threejs. There is the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) in the geometry which is the attribute that holds the current positions of all the points in the geometry for example. 

So I think it might be a good idea to wrap this week up with a few simple [threejs project examples](/2021/02/19/threejs-examples/) that have to do with mutating the position attributes of built in geometry constructors. One such constructor to work with when it comes to this is the sphere geometry constructor which is just one of many kinds of built in geometry constructors where it might prove to be an interesting learning experience to work out some methods that have to do with changing the geometry a little.

In this post then I will be going over my first quick example that has to do with a helper method that changes the position of a point on a sphere. The process of doing so is not always so easy as there is not just one point that needs to move but all points of all triangles at that point in space actually. So this might prove to be the kind of example that I might come back to now and then in order to find new ways to go about doing this.

<!-- more -->

## Mutating sphere geometry and what to know first

This is a post on a threejs example where I am mutating the geometry of a sphere made with the [THREE.SphereGeometry constructor](/2021/05/26/threejs-sphere/) in the library. It should do without saying that this post is not intended for people that are new to threejs, and javaScript in general as the topic might prove to be a bit to advanced. So it might be best to start out with a [getting started type post with threejs](/2018/04/04/threejs-getting-started/), even if you have some experience with these topics there are still a few things you might want to read up on more first.

### Might want to read up more on the buffer geometry class in general

It might be a good idea to read up more on the [buffer geometry class in general](/2021/04/22/threejs-buffer-geometry/), as there are a great number of properties and methods in an instance of buffer geometry that you should be aware of before getting into an example like this. The main feature of interest when it comes to changing the points in a geometry would be the position attribute of a geometry created with one of the built in geometry constructor methods.

### Source code is on Github

The source code for this example and many more is [on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-sphere-mutate) in my test threejs repo. I have learned a great deal more about threejs and buffer geometry, as well as buffer attributes sense then, so I now have an r1 example that I will be writing about first and foremost in this post. In addition I also have notes for a few additional future revisions of the example that I might get to at some point sooner or later that are stored in a to do list of the for post folder that corresponds with this blog post.

### version numbers matter

When I wrote this post I was using threejs version r127, and the last time I came around to do a little editing I was using r140. When I first wrote this post I has what I was refering to as r0 of a sphere geometry mutation example.

## 1 - Random Vector unit length while preserving direction \( r1 \)

For r1 of my sphere mutation threejs example project I wanted to just make an example that makes better use of buffer attribute class features in place of what I made first in r0. If you still want to check out the older code for whatever reason it is down below in a latter section in this post as I am thinking that I will want to always pull the latest revisions up to the top.

Anyway the main feature of interest here is the create new vectors helper function that will create and append arrays to the [User Data object](/2021/02/16/threejs-userdata/) of a mesh object based off of the original state of the position attribute of the buffer geometry of the sphere. The goal here is to create to arrays of vector3 objects, one of which is for each point in the original position attribute state, and the other is a new state of random points to lerp to. In my later update geometry method I will be using the [lerp method of the Vector3](/2022/05/17/threejs-vector3-lerp/) class to transform the starting state of the sphere geometry to this new set of points that are random vector unit lengths but with the same direction as the original points.

I then have a special create mesh helper function that will create a mesh object with a sphere geometry and also set up the pos\_base property of the user data object with a clone of the starting state of the sphere geometry. On top of that I am also calling the create new vectors helper for the first time which will of course set up those additional user data object properties that i want to have at the ready for updating things. Speaking of updating things the final helper function of interest here then is the update geometry helper function that I will be calling in the main update method of the animation loop for this example. In this method I am looping over each point in the sphere geometry and using the lerp method to update each point of the sphere to a position that is between the state point and the new random vector unit length point based on a given alpha value.

```js
// threejs-examples-sphere-mutate - r1 - random vector unit length with same direction
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDRER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.02,0.02,0.02)
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1.25, 0.25, 1.25);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 1, -2);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(al);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // create new vectors
    const createNewVectors = (mesh, mag) => {
        mag = mag === undefined ? 0.25 : mag
        const pos = mesh.userData.pos_base;
        const len = pos.count, vstart=[], vend= [];
        let i = 0;
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
            const ul = v.length();
            vstart.push(v);
            vend.push(v.clone().normalize().multiplyScalar(ul - mag + mag * 2 * Math.random()));
            i += 1;
        }
        mesh.userData.vstart = vstart;
        mesh.userData.vend = vend;
    };
    // create the mesh object
    const createMesh = () => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 40, 40, 0, Math.PI * 1.6), 
            new THREE.MeshPhongMaterial({
                color: 'white',
                map: texture,
                side: THREE.DoubleSide
            }));
        mesh.userData.pos_base = mesh.geometry.getAttribute('position').clone();
        createNewVectors(mesh);
        return mesh;
    };
    // update the mesh object
    const updateMeshGeo = (mesh, alpha) => {
        const geo = mesh.geometry;
        const pos = geo.getAttribute('position');
        const len = pos.count;
        const mud = mesh.userData;
        let i = 0;
        while(i < len){
            const v = mud.vstart[i].clone().lerp( mud.vend[i], alpha );
            pos.array[i * 3] = v.x;
            pos.array[i * 3 + 1] = v.y;
            pos.array[i * 3 + 2] = v.z;
            i += 1;
        }
        pos.needsUpdate = true;
    };
    //-------- ----------
    // TEXTURE
    //-------- ----------
    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    const width = 32, height = 32;
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4;
        const a1 = i / size;
        const a2 = i % width / width;
        const v = 30 + 70 * Math.random();
        data[ stride ] = v + 150 * a1;           // red
        data[ stride + 1 ] = v + 150 - 150 * a1; // green
        data[ stride + 2 ] = v + 50 * a2;        // blue
        data[ stride + 3 ] = 255;                // alpha
    }
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    // ---------- ----------
    // GEOMETRY, MESH
    // ---------- ----------
    const mesh = createMesh();
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        let alpha = frame / frameMax;
        let bias = 1 - Math.abs(0.5 - (alpha * 4 % 1)) / 0.5;
        if(frame === 0){
            createNewVectors(mesh, 0.05 + 0.20 * Math.random())
        }
        updateMeshGeo(mesh, bias);
        mesh.rotation.y = Math.PI * 4 * alpha;
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
}
    ());
```

## 2 - The first mutation of sphere example \( r0 \)

So now for the source code of this threejs example where I am changing the position of a point at the top of a sphere. In this example I started out with by set vertex helper method that I worked out in a previous example this week that had to do with the position attribute in general. This helper makes use of the geometry.index property as a way to help change the right position data in the position attribute of a given geometry.

I then have my update sphere top point helper method where I just pass a sphere geometry as the first argument, and then the y value for the top point of the sphere. So in other words this is a method where I can pull the top point of a sphere up or down along the y axis. Inside this helper method I get a reference to the position attribute of the sphere geometry, and then I also create a new position object that will be used for all points of all triangles that are at that point. I then use the set vertex helper to set the position of all of these points in the body of a while loop. When it comes to setting up a condition for getting out of the while loop I have found that I can use the width segments parameter as a way to create a value that seems to work well with just about any sphere that I pass to it.

I then set up a scene object, renderer and camera just like with any other threejs example. I then create a mesh object that will of course use the THREE.SphereGeomerty constructor  and add the mesh to the scene. I then also have a main animation loop for this example and in the body of that loop I am calling my update sphere top point method that will change the position of the top point of the sphere over time.

```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function (geometry, vertIndex, pos) {
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex] : pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1] : pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2] : pos.z;
        position.needsUpdate = true;
    };
 
    // update top of sphere
    var updateSphereTopPoint = function (geometry, topPoint) {
        topPoint = topPoint === undefined ? 0.5 : topPoint;
        var position = geometry.getAttribute('position');
        var pos = {
            x: position.array[0],
            y: topPoint,
            z: position.array[2]
        };
        // getting width segments of sphere
        var ws = geometry.parameters.widthSegments;
        var i = 0;
        while (i < ws * 3) {
            setVert(geometry, i, pos);
            i += 1;
        }
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.SphereGeometry(0.5, 30, 10);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
                color: 'red',
                side: THREE.DoubleSide
            }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(mesh.position);
    scene.add(camera);
 
    // LIGHT
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    camera.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var per = 0,
    bias,
    lt = new Date(),
    maxFrames = 300,
    FPS = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / FPS) {
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;
            bias = 1 - Math.abs(per - 0.5) / 0.5;
            // calling update sphere helper
            updateSphereTopPoint(geometry, 0.75 - 0.75 * bias);
 
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

This example might have turned out into a decent starting point at least when it comes to just playing around with sphere geometry, however there are so many other things that come to mind that I would like t work out and have a better understanding of. Some things that might help would be to just loop over all the points in a geometry and return all the points that share the same point in space. That way I can just call that method and move all points that are at that location which might prove to be a very helpful tool when it comes to doing things like this.

## Conclusion

So then that will be it for now when it comes to this threejs example on mutating the values of a position attribute of a geometry of a sphere. What I have together thus far has proven to be a good start at least when it comes to just sinking a hour or two of time into this sort of thing, however there is more I would like to figure out when it comes to sphere geometry.

At some point in the future I hope to get back ground to working on this source code and see about making some more methods that have to do with just moving the points on a sphere around a little to get weird sphere like shapes that are not really a sphere. I might want to work out a lot more example before coming back ground to this one though, so it might be a while till I get around to doing that.