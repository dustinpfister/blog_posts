---
title: Lerping the points of a geometry from one to another
date: 2022-07-01 15:10:00
tags: [three.js]
layout: post
categories: three.js
id: 994
updated: 2023-02-06 17:35:01
version: 1.33
---

I wrote a blog post on the [lerp method of the Vector3 class](/2022/05/17/threejs-vector3-lerp/) in [threejs](https://threejs.org/docs/index.html#api/en/math/Vector3). This lerp method can be used to transition the state of one vector to another target vector by way of giving a target point to move to, and an alpha value between 0 and 1 that is the magnitude to the move the current point to the target point.

Lately I thought about using this lerp method as a way to lerp the points of a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of one geometry back and forth from one geometry to another. This post will be on a [threejs example](/2021/02/19/threejs-examples/) in which I am working out a crude yet effective proof of concept of this idea of lerping the state of a position attribute of one buffer geometry between two differing states.

So in other words I am thinking in terms of having two geometries with similar, and ideally an identical count of vertices in the position attribute. On top of having more or less the same count of vertices the order of the vertices is also of importance I have found as if that is not the case this can result in a less than desired outcome with the effect.

Sense I first wrote this post I have got around to working out some demos on morph attributes of buffer geometry objects though as well. It turns out that morph attributes are a great way to go about doing this sort of thing that involve sticking to some standards. So with that said future revisions of this threejs example will involve the use of morph attributes as a way to lerp between two or more position attributes of buffer geometry. In addition morph attributes are a great way to do this sort of thing with all attributes beyond just that of the position attribute.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/atEMaHaAVjA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Lerping two geometries, and what to know first

This is a post on an advanced topic of threejs that has to do with the position attributes of buffer geometry instances, and one way to go about transitioning between the two. In other words there is creating two geometries both with a similar count of points and lerping all the points from one state to another for another geometry that is the geometry used for a mesh object. This is then not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/), so I trust that you have at least a little background when it comes to the basics. In any case in this section I will write about a few things you might want to read a little more on that is related to this sort of thing.

### There are many other ways to create a kind of animated model

If you feel that this topic might be a little to advance for you now, there is taking a step back and thinking more in terms of creating animations by just moving mesh objects around. This is how I first started out with this sort of thing a long time ago now with my [guy one model](/2021/04/29/threejs-examples-guy-one/) that I made a few years back now at this point. There is also looking into how to really update geometry in a way that goes up certain standards as well when it comes to making a [skinned mesh](https://threejs.org/docs/#api/en/objects/SkinnedMesh) with bones and weight attributes.

### There is also the morph attributes property of buffer geometry objects

When I first started this project I have not yet got around to making a demo or two about the [morph attributes property](/2023/02/03/threejs-buffer-geometry-morph-attributes/) of buffer geometry objects. Use of the morph attributes property is a better way of doing this sort of thing so that should be check out first and foremost. I will of course keep this post up though, and I will also start working on an R1 of this example in which I make use of morph attributes. However at this time I am not fully sure what I can add on top that to keep this from just being a weird, unnecessary abstraction. In any case this may or may not end up being a dead example moving forward at this time.

### There is a whole lot to be aware of when it comes to Buffer Geometry

There is a lot to take in when it comes to [buffer geometry in general](/2021/04/22/threejs-buffer-geometry/), so it would be a good idea to not stop with this post when it comes to learning more about the class. I have my main blog post on the buffer geometry class that might be a good place to start to gain a great over all picture of all the various core attributes and features to be aware of. I also have a number of other threejs project examples that might prove to be an okay starting point when it comes to creating custom geometry in threejs such as [my waves example](/2018/11/14/threejs-examples-waves/).

### The source code in this post can also be found on Github

The source code examples that I am writing about here can be [found on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lerp-geo/) in my test threejs repository. This is also where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/).

### Version Numbers matter

When I first wrote this post I was using r140 of threejs and the examples where working fine on my end with that revision. The last time I came around to edit this post r146 was the revision number I was using when I updated and expanded the code. Again things where working fine with me on my end with the revision numbers I was using. However threejs is a fast moving project and it is safe to assume that at some point these code examples may break. Always be mindful of the revision number you are using, and the version the developer was using when it comes to source code examples here, and on the open web in general.

## 1 - Making use of morph attributes now with R1 of lerp geo

This is a section where I will now be writing about R1 of the lerp geo threejs example that is what I have together thus far when it comes to making use of morph attributes in place of the vector3 lerp method. When I was writing a post on the vector3 lerp method the idea came to me to make this threejs project. However now that I have wrote more on the buffer geometry class I have found that although  using the vectro3 lerp method as a tool to lerp between two buffer attributes works, there is a built in feature in the buffer geometry class for doing this sort of thing as well and that is what should be used first and foremost when it comes to making animations.

### 1.a - The lerp geo javaScript file R1

For this new revision I have made it so that I can still use the same old lerp geometry method if I want to. However now there are some additional methods that have to do with creating a geometry, or whole mesh object with an array of geometries. This way I can just go ahead and use this as a drop in replacement for the older revision, but now also have some options for playing around with morph attributes as a way to do this sort of thing.

```js
// lerpgeo.js - r1 - from threejs-examples-lerp-geo
(function (global) {
    //-------- ----------
    // THE OLD R0 LERP GEO FUNCTION as the global API object ( for now )
    //-------- ----------
    const api = global['lerpGeo'] = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // get refs to position attributes
        const pos = geo.getAttribute('position');
        const posA = geoA.getAttribute('position');
        const posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        let i = 0; 
        const len = pos.array.length;
        while(i < len){
            const v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            const v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            v.lerp(v2, alpha);
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
    };
    //-------- ----------
    // THE NEW R1+ CREATE FUNCTION + HELPERS AND CONSTS
    //-------- ----------
    // const values
    const ATT_TYPES = 'position,normal,uv'.split(','); // what attributes to use?
    const ATT_FOR_UNDEFINED_ITEMS = 0;  // what value to use for value of undefined items in attribites?
    const GEO_SOURCE_SHIFTOUT = true;   // shift out geo source index 0 that is used to create the main geometry?
    // sort by count helper
    const sortByCount = (sourceGeos) => {
        return sourceGeos.map((geo) => { return geo; }).sort( (a, b) => {
            const aPos = a.getAttribute('position'),
            bPos = b.getAttribute('position');
            if(!aPos || !bPos){
                return 1;
            }
            if(aPos.count > bPos.count){
                return -1;
            }
            if(aPos.count < bPos.count){
                return 1;
            }
            return 0;
        });
    };
    // new buffer attribute for the given geo, based on a given source geo
    // placing 0 for numbers of each item that is not there
    const newAttributeFromGeo = (type, geo, geo_source) => {
        const att_source = geo_source.getAttribute(type);
        const att_geo = geo.getAttribute(type);
        const data_array = [];
        let i = 0;
        while(i < att_geo.array.length){
             let d = 0;
             while(d < att_geo.itemSize){
                 const n = att_source.array[i + d];
                 data_array.push( n === undefined ? ATT_FOR_UNDEFINED_ITEMS : n );
                 d += 1;
             }
             i += att_geo.itemSize;
        }
        const att = new THREE.BufferAttribute( new Float32Array(data_array), att_geo.itemSize);
        return att;
    };
    // public create method
    api.createGeo = (sourceGeos, opt) => {
        opt = opt || {};
        const geo_source_array = sortByCount(sourceGeos);
        const geo = geo_source_array[0].clone();
        if(opt.GEO_SOURCE_SHIFTOUT === undefined ? GEO_SOURCE_SHIFTOUT : opt.GEO_SOURCE_SHIFTOUT){
            geo_source_array.shift();
        }
        geo_source_array.forEach( (geo_source, i) => {
            (opt.ATT_TYPES || ATT_TYPES).forEach( (attType) => {
               if(geo.morphAttributes[attType] === undefined){
                   geo.morphAttributes[attType] = [];
               }
               geo.morphAttributes[attType][ i ] = newAttributeFromGeo(attType, geo, geo_source);
            });
        });
        return geo;
    };
    // public create method
    api.create = (sourceGeos, opt) => {
        opt = opt || {};
        const geo = api.createGeo(sourceGeos);
        const mesh = new THREE.Mesh(geo, opt.material || new THREE.MeshBasicMaterial());
        return mesh;
    };
    api.update = (mesh, alphas, opt) => {
        alphas.forEach( (a, i) => {
            mesh.morphTargetInfluences[ i ] = a;
        });
    };
}( this ));
```

### 1.1 - Basic demo just to test things out so far

Here I have the first and only demo that I have made thus far with R1 of the lerp geo method. So far things seem to work okay, but I am sure that I will want to do at least a little more work on an additional revision before using this in any kind of project at all actually. Yet again maybe not, maybe I just need to make some more demos and do so with geometry that is not made using the built in geometry constructors. In any case in this demo I just wanted to make sure that the old lerp method still works, and then the new methods that I have made do not case any errors at least. WIth that said this demo was a success at least for what it is worth.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SOURCE GEOS
//-------- ----------
//const source_geo = [
//    new THREE.SphereGeometry(1, 26, 25),
//    new THREE.TorusGeometry(1, 0.25, 26, 25)
//];

const source_geo = [
    new THREE.ConeGeometry(0.25, 2, 20, 20),
    new THREE.SphereGeometry(1, 21, 21)
];


console.log(source_geo[0].getAttribute('position').count);
console.log(source_geo[1].getAttribute('position').count);
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial({ wireframe: false });
//-------- ----------
// MESH
//-------- ----------
// mesh1 will be used with old lerpGeo method
const geo1 = source_geo[1].clone();
const mesh1 = new THREE.Mesh(geo1, material);
mesh1.position.set(-1,0,0)
scene.add(mesh1);
// mesh2 is created using lerpGeo.create
const mesh2 = lerpGeo.create(source_geo, { material: material});
mesh2.position.set(1,0,0)
scene.add(mesh2);
//-------- ----------
// GET ALPHA HELPERS
//-------- ----------
const getAlpha = (n, d, count) => {
    return n / d * count % 1;
};
const getAlphaBias = (n, d, count) => {
    const a1 = getAlpha(n, d, count);
    return  1 - Math.abs( 0.5 - a1) / 0.5;
};
//-------- ----------
// APP LOOP
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
let frame = 0;
const frameMax = 300;
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    const a1 = getAlphaBias(frame, frameMax, 2);
    // can still use old lerp go method
    lerpGeo(geo1, source_geo[1], source_geo[0], a1);
    // using morph target Influences of mesh object
    lerpGeo.update(mesh2, [ a1 ] );
    frame += 1;
    frame %= frameMax;
};
loop();
```

## 2 - The first version of the lerp geo module threejs example

In this section I am writing about the first revision of the lep geo module that I started before I got into morph attributes. The later versions of lerp geometry now makes use of morph attributes so it can be used to morph not just a position attribute but the other various attributes of buffer geometry as well. Still I will be keeping this up here as well just for the hell of it.

### 2.a - The lerp geo javaSccript file R0

The core of this idea is to just have a function that I can use to pass a geometry that I want to change, and then two geometries that are the state that I want to start at that can be called something like geoA, and the state that I want to change to that would then be geoB. The last argument would then be the alpha value to use between these two states that is a value between and including 0 and 1.

So inside the body of the lerp geometry function I use the get attribute function of the buffer geometry class to get the position attributes of geoA and GeoB I can then just loop over the position attribute of the geometry I want to update and use the Vector3 class to create two points in space for both geoA and geoB. I then just use the lerp method of the vector3 that I created for geoA to lerp it from that state to the state of geoB using the lerp method of the Vector3 class. I can now set the state of the vertex for the geometry that I am updating.

```js
// lerpgeo.js - r0 - from threejs-examples-lerp-geo
(function (global) {
    // LERP GEO FUNCTION
    global.lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // pos, and new pos
        let pos = geo.getAttribute('position');
        // positions for a and b
        let posA = geoA.getAttribute('position');
        let posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        var i = 0, len = pos.array.length;
        while(i < len){
            // creating Vector3 instances for current posA and PosB vertices
            var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
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
        geo.computeVertexNormals();
    };
}(this));
```

When updating the state of a position attribute of a geometry I need to set the needs update boolean of the position attribute to true. After that there is also thinking in terms of other attributes that may also need to be updated as a result of the change of the state of the position attribute. I have found that I do want to at least make sure the the normals attribute is also updated to make sure that lighting looks the way it should with the new position state. In some cases I might need to work out a custom solution for this, however often just using the [compute vertex normals](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) method of the buffer geometry will work fine.

### 2.1 - Two Geometry example using cone and sphere geometry

Now that I have my lerp geo helper function I just need to test it out with a little more javaScript code that has to do with setting up a basic scene and having two two geometries to update the state of the geometry of a mesh object. For this first little demo of the hel0er functionI am using a cone geometry and a sphere geometry as the two geometries that I would like to lerp back and forth between.

I then have a main app loop function in which I will render the current state of the scene object, and also call my lerp geo helper function to change the state of the geometry. The result is an interesting looking effect where all the points of a cone geometry are lerping from the state of the cone geometry to a sphere and back again.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 3);
scene.add(dl);
scene.add( new THREE.AmbientLight(0xafafaf, 0.25) );
//-------- ----------
// GEO AND MESH
//-------- ----------
const g0 = new THREE.ConeGeometry(1, 1, 20, 18);
const g1 = new THREE.SphereGeometry(1, 20, 20);
console.log( g0.getAttribute('position').count ); // trying to get simular counts
console.log( g1.getAttribute('position').count );
const mesh = new THREE.Mesh(g0.clone(), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide}));
scene.add(mesh);
//-------- ----------
// APP LOOP
//-------- ----------
let frame = 0;
const frameMax = 300;
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    const per = frame / frameMax;
    const bias = 1 - Math.abs( per - 0.5) / 0.5;
    lerpGeo(mesh.geometry, g0, g1, bias);
    frame += 1;
    frame %= frameMax;
};
loop();
```

### 2.2 - Four Source Geometries to make two geometries that are then also lerped for one

For this example I have four source  Geometries that I am then lerping between to make two geometries. I then lerp the two geometries again to make the final geometry state that is used for a lines object.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 3);
scene.add(dl);
scene.add( new THREE.AmbientLight(0xafafaf, 0.25) );
//-------- ----------
// SOURCE GEOS
//-------- ----------
const s0 = new THREE.TorusGeometry(1, 1, 20, 20);  // 441
const s1 = new THREE.SphereGeometry(1, 20, 20);    // 441
const s2 = new THREE.ConeGeometry(1, 1, 20, 18);   // 440
const s3 = new THREE.PlaneGeometry(1, 1, 20, 20);  // 441
//console.log(s3.getAttribute('position').count);
//-------- ----------
// GEOS
//-------- ----------
const g0 = s0.clone();
const g1 = s0.clone();
const g3 = s0.clone();
//-------- ----------
// LINE
//-------- ----------
const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 4})
const line = new THREE.Line(g3, material);
scene.add(line);
//-------- ----------
// GET ALPHA HELPERS
//-------- ----------
const getAlpha = (n, d, count) => {
    return n / d * count % 1;
};
const getAlphaBias = (n, d, count) => {
    const a1 = getAlpha(n, d, count);
    return  1 - Math.abs( 0.5 - a1) / 0.5;
};
//-------- ----------
// APP LOOP
//-------- ----------
let frame = 0;
const frameMax = 300;
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    const a1 = getAlphaBias(frame, frameMax, 2);
    const a2 = getAlphaBias(frame, frameMax, 4);
    const a3 = getAlphaBias(frame, frameMax, 8);
    lerpGeo(g0, s0, s1, a1);
    lerpGeo(g1, s1, s2, a2);
    lerpGeo(g3, g0, g1, a3);
    frame += 1;
    frame %= frameMax;
};
loop();
```

## Conclusion

That is one way to make some animation of sorts, however there are also a lot of other ways of doing this sort of thing some of which might prove to be a better choice. I have done a little reading on animation clips in threejs and thus far have found that may be the best route to go when it comes to really working out a real model of sorts for one or more projects. 
I have been putting of getting into how to go about getting started with bones and animation clips for a while. For one thing I have run into some technical problems getting even the official threejs examples working on my preferred platform for getting work done, but that would not ally for more popular platforms that most people use. Anyway for the moment I have been looking into all kinds of various other ways to go about updating the state of a geometry beyond that of making ringed models in blender. When it comes to this there is just working out solutions like what I made here to just mutate the position attributes of geometries.

Sense I first wrote this post I have made one additional threejs example that makes use of what I worked out here called my [weird face on threejs example](/2022/07/08/threejs-examples-weird-face-one/). In this threejs example I am using the lerp geometry method to animation the mouth of the crude model of a face.
