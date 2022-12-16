---
title: A waves example using javaScript and threejs
date: 2018-11-14 16:45:00
tags: [three.js]
layout: post
categories: three.js
id: 331
updated: 2022-12-15 20:43:31
version: 1.34
---

So I wanted to start making some posts on [threejs examples](/2021/02/19/threejs-examples/), rather that the usual posts on certain basic things here and there with just the core of what threejs alone is. One of the first ideas that came to mind was to make a waves example where I create an update a buffer geometry based on something like Math.cos. 

In this post I will be writing about a module that makes use of a helper method that I made that can be used to create, or update an instance of [buffered geometry](/2021/04/22/threejs-buffer-geometry/) that is a set of points that move in a wave like pattern. This buffer geometry instance can then be used with an instance of the THREE.Points constructor rather than the usual THREE.Mesh constructor, and when doing so it is just the position attribute of the buffer geometry instance that I need to worry about. At least that is what the plan was for the first version of this example, as I now have plans to create a revised revision of this module that will also work with mesh objects.

So this threejs example might be a good starting point when it comes to figuring out how to go about creating a custom geometry with a little javaScript code, and also how to work with the Buffer Geometry constructor. There is a whole lot to cover when it comes to this sort of thing, but I would say that the first step is to know how to create and update the position attribute of a buffer geometry and this will be the main focus of this example here.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/7NH3ueHkdjSk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The waves threejs example and what to know before you begin

This is a post on a threejs example where I made some waves in the form of a basic custom geometry. This is a more advanced post on threejs, if you are new to threejs you might want to look at my [getting started post on three.js](/2018/04/04/threejs-getting-started/) first. I will not get into the basics here of course, but I do like to write about at least a few things to maybe read more about in this first section.

### Check out Points and the Points material

When it comes to the first revision of the wave module I am just using the Points material, as in this example I only have points set out for the buffered geometry that I am using. As such it would be a good idea to get up to speed with the [Points material](/2018/05/12/threejs-points-material/), and buffered geometry if you have not done so before hand. 

### Might want to read up more on buffer geometry in general

In this post I am using the Buffer Geometry constructor to create a collection of points that will be moving up and down in a wave like pattern. I have a [post in which I have gone over the buffer geometry constructor](/2021/04/22/threejs-buffer-geometry/) in general, but as of this writing it might be a good idea to look that the [how to update things](https://threejs.org/docs/#manual/en/introduction/How-to-update-things) section of the threejs website. There is also looking at the [official docs on buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) on top of that.

### Source code is also up on Github

The source code examples that I write about here can also be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-waves).

### Version numbers matter

When working out this example for the first time I was using revision 98 of threejs, and the last time I can around to do some editing on this post I have updated all the examples to work well with r146. Threejs is a library that is a very fast moving target when it comes to development, it seems like to new revision is coming out every few months. If the code here breaks the first thing that you should check is the version number, because this was working for me when it comes to the version of threejs that I was using at the time.

## 1 - The new Wave Module \( r1 \) that works with mesh objects

With r1 of the wave module I now have a revision of this threejs example that makes and updates a geometry that will work well with mesh objects. The custom geometry that is created will have a position, normal, and uv attribute. This means that there will be the actual points in space as well as normal that help define what side of a face is the front size, and a uv attribute so that textures will work with the geometry. On top of all this I also now have an [index for the geometry](/2022/12/09/threejs-buffer-geometry-index/) as well which is a way to reuse points in the position attribute so that the geometry will be smaller than it would otherwise need to be.

### The Wave module \( r1 \)

This is then the source code for my new wave module example that thus far is working way better than what I had before hand with this. The old wave module would just create a positions attribute and nothing more. However this will create and update all of the core attribute values for a geometry. There an update and create method same as before, but I now also have a parse option method as well that I can use to help with the process of making a options object that will work with create and update methods of the module.

One major problem that I ran into was with setting the index for the geometry, in the threejs Docs it says that a buffer attribute should be passed to the set index method. However I have found that this will result in weird rendering when I set the segment sizes of the geometry to high. I finally took a look at the source code for the plane geometry class of the core of threejs and saw that they are just passing an array to the set index method actually I then made that change and sure enough it was working just fine then.

```js
// waves - r1 - from threejs-examples-waves
(function (api) {
    // parse options
    api.parseOpt = function (opt) {
        opt = opt || {};
        opt.width = opt.width === undefined ? 1 : opt.width;
        opt.height = opt.height === undefined ? 1 : opt.height;
        opt.waveHeight = opt.waveHeight === undefined ? 0.5 : opt.waveHeight;
        opt.xWaveCount = opt.xWaveCount === undefined ? 4 : opt.xWaveCount;
        opt.zWaveCount = opt.zWaveCount === undefined ? 2 : opt.zWaveCount;
        opt.widthSegs = opt.widthSegs === undefined ? 20 : opt.widthSegs;
        opt.heightSegs = opt.heightSegs === undefined ? 20 : opt.heightSegs;
        opt.degree = opt.degree === undefined ? 45 : opt.degree;
        opt.alpha = opt.alpha === undefined ? 0 : opt.alpha;
        return opt;
    };
    // update the geometry
    api.update = function (geo, opt) {
        opt = api.parseOpt(opt);
        const att_pos = geo.getAttribute('position');
        const att_uv = geo.getAttribute('uv');
        const width_half = opt.width / 2;
        const height_half = opt.height / 2;
        const gridY = opt.heightSegs;
        const gridX = opt.widthSegs;
        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;
        const segment_width = opt.width / gridX;
        const segment_height = opt.height / gridY;
        // update
        for ( let iz = 0; iz < gridY1; iz ++ ) {
            const z = iz * segment_height - height_half;
            const a1 = iz / gridY1;
            for ( let ix = 0; ix < gridX1; ix ++ ) {
                const x = ix * segment_width - width_half;
                const i = iz * gridX1 + ix;
                // alphas
                const a2 = ix / gridX1;
                // radian
                const radian_dir = Math.PI / 180 * opt.degree;
                const r1 = Math.PI * 2 * Math.sin( radian_dir ) * opt.zWaveCount * a1;
                const r2 = Math.PI * 2 * Math.cos( radian_dir ) * opt.xWaveCount * a2;
                const r3 = Math.PI * 2 * opt.alpha;
                // y
                const y = Math.sin( (r1 + r2 + r3) % (Math.PI * 2) ) * opt.waveHeight;
                // set x,y,z
                att_pos.setXYZ(i, x, y, z);
                // set uv
                att_uv.setXY(i, ix / gridX, 1 - ( iz / gridY ));
            }
        }
        att_pos.needsUpdate = true;
        // update the normal attribute
        geo.computeVertexNormals();
    };
    //-------- ----------
    // CREATE METHOD AND HELPERS
    //-------- ----------
    // create a position attribute
    const create_position_uv = (geo, opt) => {
        const data_pos = [];
        const data_uv = [];
        const len = (opt.widthSegs + 1) * (opt.heightSegs + 1);
        let i = 0;
        while(i < len){
            data_pos.push(0, 0, 0);
            data_uv.push(0, 0);
            i += 1;
        }
        geo.setAttribute('position', new THREE.BufferAttribute( new Float32Array(data_pos), 3));
        geo.setAttribute('uv', new THREE.BufferAttribute( new Float32Array(data_uv), 2));
    };
    // create an index for the position attribute
    const create_index = (geo, opt) => {
        const data_index = [];
        const gridY = opt.heightSegs;
        const gridX = opt.widthSegs;
        const gridX1 = gridX + 1;
        for ( let iy = 0; iy < gridY; iy ++ ) {
             for ( let ix = 0; ix < gridX; ix ++ ) {
                 const a = ix + gridX1 * iy;
                 const b = ix + gridX1 * ( iy + 1 );
                 const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
                 const d = ( ix + 1 ) + gridX1 * iy;
                 data_index.push( a, b, d );
                 data_index.push( b, c, d );
             }
        }
        // THIS WAS WHAT THE DEAL WAS!
        // THE DOCS SAY TO PASS A BUFFER ATTRIBUTE, BUT PASSING AN ARRAY WORKS
        // FOUND THIS OUT BY READING THE PLANE GEO SOURCE CODE AT
        // https://github.com/mrdoob/three.js/blob/dev/src/geometries/PlaneGeometry.js
        // const att_index = new THREE.BufferAttribute( new Uint8Array(data_index), 1);
        geo.setIndex(data_index);
    };
    // create a geometry and update it for the first time
    api.create = function (opt) {
        opt = api.parseOpt(opt);
        const geo = new THREE.BufferGeometry();
        // position, and index
        create_position_uv(geo, opt);
        create_index(geo, opt);
        // update
        api.update(geo, opt);
        return geo;
    };
}( this['waveMod'] = {} ));
```

### 1.1 - Demo of wave module

For this demo I want to test out using the geometry that I make an update from the wave module with a mesh object. I would then also like to test out that all the features of the geometry are working as expect as well. So I am adding a light source, and I am also making use of data textures as a way to create a quick texture with a little javaScript code.

When it comes to making the geometry for the first time I call the parse option method of the wave module and pass what values I would like to set. Whatever I do not set will default to hard coded defaults in the wave module. I can then use the resulting options object to create the geometry for the first time. When calling the create method the geometry will also be updated for the first time based on the values if the options object. After that I can use the geometry to make a mesh object, and what it comes to the material I went with the Phong material and use the date texture for the map option.

In the body of the loop method I can update some of the options over time if I like and then use the update method of the wave module with the options object to change the state of the geometry over time. For this example I am changing the main alpha value, as well as the degree options. This results in the waves moving, and also the direction in which they are moving changes over time as well.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
//scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.001, 1000);
camera.position.set(10, 8, 10);
camera.lookAt(0, -2, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const getAlpha = (n, d, c) => {
    return (n / d * c) % 1;
};
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// TEXTURE
//-------- ----------
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Uisng the seeded random method of the MathUtils object
const width = 32, height = 32;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4;
    const v = 50 + Math.floor( THREE.MathUtils.seededRandom() * 205 );
    data[ stride ] = 0;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = 0;
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
//-------- ----------
// GEO
//-------- ----------
const wave_opt = waveMod.parseOpt({
    width: 10,
    height: 10,
    waveHeight: 0.5,
    xWaveCount: 2,
    zWaveCount: 2,
    widthSegs: 50,
    heightSegs: 50
});
const geo = waveMod.create( wave_opt );
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: texture });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.position.set( 0, 0, 0 )
//-------- ----------
// LOOP
//-------- ----------
//new THREE.OrbitControls(camera, renderer.domElement);
let frame = 0, lt = new Date();
const maxFrame = 800, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    //per = frame / maxFrame,
    //bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // wave options and update of wave geo
        wave_opt.alpha = getAlpha(frame, maxFrame, 32);
        wave_opt.degree = 360 * getAlpha(frame, maxFrame, 1);
        waveMod.update(geo, wave_opt);
        // render
        renderer.render(scene, camera);
        // step frame
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 2 - The old wave module example and demo \( r0 \)

In this section I will be writing about the first revision of this threejs project example, as well as a single demo of it in action.

<iframe class="youtube_video" src="https://www.youtube.com/embed/7vrx8646Y7s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The wave module example I made involves a helper method that can be used to create, or update geometry, buffered geometry, or just about anything by making the helper a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function). This method accepts another method as one of the arguments that is passed the x,y,and z values for each point that will compose the vertices of the wave. I then use this method in conjunction with others to help make an update the geometry of the wave. The wave grid helper method that accepts a method that can then be used to define what to do for each point in the grid of points. I use this to create an instance of buffer geometry and again later to update it in a loop.

I have a method that makes use of my waveGrid helper method to go about making the initial state of the buffered geometry that I will then be updating later on with the update method that I will be getting to soon. The basic idea here is that I am just creating the initial size and state of the geometry, which will end up being a fixed static thing in terms of the count of points. The update method later on just needs to be used to update this position of these points it does not need to add or delete them, which can not really be done with a geometry because it is buffer geometry after all. A buffer is often a fixed thing once it is created in other words.

I again use my waveGrid method to update points by just using the for point option of the wave grid method. I just need to set the desired values for x, y, and z for all points in the geometry. When calling this method I will want to pass a percent value as a second argument after passing the instance of points as the first method. More on this later when I use it in the main update loop of this example when it comes to how to go about getting that percent value.

```js
// waves - r0 - from threejs-examples-waves
(function (api) {
    // Wave grid helper
    const waveGrid = function (opt) {
        opt = opt || {};
        opt.width = opt.width || 30;
        opt.depth = opt.depth || 30;
        opt.height = opt.height || 2;
        opt.forPoint = opt.forPoint || function () {};
        opt.context = opt.context || opt;
        opt.xStep = opt.xStep || 0.075;
        opt.yStep = opt.yStep || 0.1;
        opt.zStep = opt.zStep || 0.075;
        opt.waveOffset = opt.waveOffset === undefined ? 0 : opt.waveOffset;
        const points = [];
        let radPer,
        x = 0,
        i = 0,
        y,
        z;
        // points
        while (x < opt.width) {
            z = 0;
            while (z < opt.depth) {
                // radian percent
                radPer = (z / opt.depth + (1 / opt.width * x) + opt.waveOffset) % 1;
                // y value of point
                y = Math.cos(Math.PI * 4 * radPer) * opt.height;
                // call forPoint
                opt.forPoint.call(opt.context, x * opt.xStep, y * opt.yStep, z * opt.zStep, i);
                // step z, and point index
                z += 1;
                i += 3;
            }
            x += 1;
        };
    };
    // make a points mesh
    api.create = function (opt) {
        opt = opt || {};
        const geometry = new THREE.BufferGeometry();
        const points = [];
        opt.forPoint = function (x, y, z, i) {
            points.push(x, y, z);
        };
        waveGrid(opt);
        const vertices = new Float32Array(points);
        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        return new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .125,
                color: new THREE.Color(0.0, 0.25, 0.25)
            }));
    };
    // update points
    api.update = function (points, per, opt) {
        opt = opt || {};
        const position = points.geometry.getAttribute('position');
        opt.waveOffset = per;
        opt.forPoint = function (x, y, z, i) {
            position.array[i] = x - 0;
            position.array[i + 1] = y;
            position.array[i + 2] = z - 0;
        };
        // update points
        waveGrid(opt);
        position.needsUpdate = true;
    };
}( this['waveMod'] = {} ));
```


### 2.1 - Get it going with a basic demo of the module

So now it is time to get this all working with the usual scene, camera, renderer, and animation loop function that I often do in examples like this. After setting up the renderer and scene object I just use my makePoints helper to make the instance of a Points mesh that makes use of my geometry, and the Points material. I then set up a camera, and then I have some values for my main app loop function that will be using request animation frame.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.001, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// POINTS
//-------- ----------
const w = 30, h = 30;
const tw = 4, th = 4;
const opt_waves = {
   width: w,
   depth: h,
   xStep: tw / w,
   zStep: th / h
};
const points = waveMod.create(opt_waves);
points.position.set(tw / 2 * -1, 0, th / 2 * -1);
scene.add(points);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // calling update method
        waveMod.update(points, per * 8 % 1, opt_waves);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

The result of this up and running is then a bunch of dots in the canvas moving up and down in a wave like pattern, I am also doing a number of other things in this example that have to do with many other note worthy features of three.js. For example I wanted to do something that involves moving the camera around by making use of the position and rotation properties as well as the look at method of the camera all of which are methods and properties of the base class known as Object3d.


## Conclusion

This example proved to be a nice little example on something that was kind of fun to work out. It has been done before many times, but when it comes to making some kind of real project that is some kind of animation doing something to this effect might prove to be part of the process.

So far all of my real examples are often just making crude yet effective low poly models consisting of just grouping together a bunch of box geometries in mesh objects together. So it is nice to work out something where I am coming up with my own custom little thing with geometry and then using that.

