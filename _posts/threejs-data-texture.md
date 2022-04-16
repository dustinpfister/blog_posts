---
title: Creating textures with raw data in threejs
date: 2022-04-15 12:56:00
tags: [three.js]
layout: post
categories: three.js
id: 978
updated: 2022-04-16 08:50:38
version: 1.13
---

I have wrote a [number of posts on the use of canvas elements](/2020/03/23/canvas-example/), and also a post on [using canvas elements as a way to create textures](/2018/04/17/threejs-canvas-texture/) for mesh objects in threejs. However there is another built in way to create textures with javaScript code other than making use of canvas elements, and this option is [data textures](https://threejs.org/docs/#api/en/textures/DataTexture).

When it comes to using data textures as a way to create textures with javaScrript code in threejs I just need to know how to produce the texture that I want in terms of a [Unit8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) with a set of four values for each color channel. That is that I need to create an array with integer values between and including the range of 0 to 255 for red, green, blue and alpha color channels for each pixel.

<!-- more -->

## data textures in threejs and what to know first

This is a post on using the THREE.DataTexture constructor in threejs to create a texture using raw data for each color channel of each pixel in the form of a unit8array. This is then not at all any kind of [getting started with threejs](/2018/04/04/threejs-getting-started/) type post, and I also assume that you have learned at least a thing or two about javaScript and client side web development in general before hand.

### version numbers matter

The version of threejs that I was using when I first wrote this post was r135. I also quikly checked that the source code examples also seem to work well in just about every major version of threejs that I have been using when writing these posts going back as far as r91. Still code breaking changes might be made at some point in the future so one should always be mindful of the version of threejs that they are using when reading about and using threejs source code examples on the open web.

### The source code in this post is up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-data-texture).

## 1 - A basic data texture example

For a simple example of this data texture thing in threejs I made this quick example that involves starting at a value of 32 for the red channel and adding 128 over the length of the total number of pixels for the image. I am then also doing something similar for the green channel just subtracting rather than adding.

I start out by making my usual [scene object](/2018/05/03/threejs-scene/) along with a [camera](/2018/04/06/threejs-camera/) and [web gl renderer](/2018/11/24/threejs-webglrenderer/) just like with any other threejs project. AFter that I will want to create an instance of a unit8Array where the length is equal to the number of pixels times four. So I just need to figure out that the width and height of the texture should be and then multiply that to get a size in terms of a total number of pixels. I can then use this size value times four to set the length of the typed array, and also use it as a way to know if I should stop looping or not when it comes to setting the values for this array.

I then have a loop in which I am figuring out what the values should be for each red, green, blue, and alpha channel value for each pixel. I can have an index for each pixel and then just figure out what the actual index value in the array is by just multiplying by four and then adding fro there for each channel value. Once I have my array in the state that I want it for the texture the next step is to then pass that array as an argument when calling the THREE.DataTextyre [constructor function](/2019/02/27/js-javascript-constructor/).

```js
// scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
var width = 512, height = 512;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4,
    per = i / size;
    // set r, g, b, and alpha data values
    data[ stride ] = 32 + Math.floor(128 * per); // red
    data[ stride + 1 ] = 255 - 200 * per;        // green
    data[ stride + 2 ] = 255;                    // blue
    data[ stride + 3 ] = 255;                    // alpha
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```

## 2 - Distance to method of the Vector2 class

I have wrote a number of posts at this point on the [Vector3 class in threejs](/2018/04/15/threejs-vector3/) that is without question one of the major classes in threejs that a developer should become familiar with. However there is also the Vector2 class that has to do with just plain old 2d points which also will come into play when doing things like working with the [raycaster class](/2021/05/18/threejs-raycaster/), or in this case making 2d textures with a little javaScript code and the data texture constructor.

For this example I am doing more or less the same thing as in the basic example, but now I am using the distance to method of the Vector2 class as a way to get a distance value from a current pixel location to that of the center of the texture. I can then use this as a main to come up with different color channel values for each pixel in the texture.

```js
// scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Using the distanceTo method of the Vector2 class
var width = 16, height = 16;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4,
    x = i % width,
    y = Math.floor(i / width),
    v2 = new THREE.Vector2(x, y),
    d = v2.distanceTo( new THREE.Vector2(width / 2, height / 2) ),
    iPer = i / size,
    dPer = d / (width / 2);
    dPer = dPer > 1 ? 1 : dPer;
    // set r, g, b, and alpha data values
    data[ stride ] = 255 - Math.floor(255 * dPer);
    data[ stride + 1 ] = Math.floor(64 * iPer);
    data[ stride + 2 ] = 64 - Math.floor(64 * iPer);
    data[ stride + 3 ] = 255;
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```

## 3 - Using the math random method

```js
// scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// To create a texture using the Math.random method
var width = 16, height = 16;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4;
    var v = Math.floor( Math.random() * 255 );
    data[ stride ] = v;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = v;
    data[ stride + 3 ] = 255;
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```

## 4 - The seeded random method of the Math Utils object

```js
// scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Uisng the seeded random method of the MathUtils object
var width = 16, height = 16;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4;
    var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
    data[ stride ] = v;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = v;
    data[ stride + 3 ] = 255;
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```

## 5 - Conclusion

The use of data textures to create textures for threejs geometries can then prove to be a little useful here and there then. However I am not sure if this is what I will want to always use, even when it comes to this sort of thing. For the most part I do still like to use canvas elements to create textures as there are a lot of useful methods to work with in the 2d drawing context. When it comes to really working out modules I, and also uv wrapping while doing so I sometimes think the best way to go would be external image files when it comes to working with dae files for a project.