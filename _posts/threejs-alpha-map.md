---
title: Three js alpha maps
date: 2019-06-06 09:15:00
tags: [js,three.js]
layout: post
categories: three.js
id: 474
updated: 2023-01-01 07:57:57
version: 1.30
---

When working with [materials in threejs](/2018/04/30/threejs-materials/) many of the materials support one or more types of maps for skinning a geometry. One such texture map option is a [alpha map](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.alphaMap) that is a gray scale texture that will be used to define the alpha transparency values for the material. So then the white areas of the texture will result in a face being fully opaque, black areas will result in the face being fully transparent, and values between the two will be used to set any alpha value between the two. 

Alpha maps will then come into play when it comes to working things out with [transparency in a threejs project](/2021/04/21/threejs-materials-transparent/). An alpha map is something more to add after working out the very basics of this with the transparency and opacity properties of a material. With that said the transparency option is used to turn transparency off and on, opacity is used to set an over all global alpha value, and alpha maps can the be used to set opacity values on a texture level.

In this post I will be going over some examples of an alpha maps, and in order to do so I will also be touching base on how to go about creating a texture with a little javaScript code. One way to do so is to use [canvas elements and the THREE.CanvasTexture method](https://threejs.org/docs/#api/en/textures/CanvasTexture) as a way to create a texture to use as an alpha map. This kind of thing can also be used as a way to create textures in general for all kinds of other maps that can be used with a material.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/NDnQksd2LR4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Alpha maps and what to know before hand

This is a post on threejs the javaScript powered 3d modeling library, in addition it is on a very specific topic with threejs which is of course alpha maps. It is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/) or javaScript in general. I then assume that you have at least some background with these topics otherwise you are going to have a hard time getting anything of value from this post. Although I will not be getting into the very basics of threejs, in this section I will touch base on a few topics that I think you should know a thing or two about first before getting into alpha maps.

### You might want to brush up on textures

In order to have an alpha map I need to have a texture, one way to have a texture is to [load an external image file and use that as a texture](/2021/06/21/threejs-texture-loader/). However another option would be to [use canvas elements as a way to create a texture](/2018/04/17/threejs-canvas-texture/) using a little javaScript code by way of the canvas 2d drawing context. There are a number of other ways to create texture objects such as making use of [data textures](/2022/04/15/threejs-data-texture/) as another way to create textures from raw data color channel data, or just directly working with the Texture class if you have some other way to create client side javaScript [Image Objects](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image). Getting into this subject would be a little off topic, but one way or another a texture is needed to have an alpha map. Also the texture needs to be in gray scale as that is what is used to set the transparency values of the material with the texture used as an alpha map.

### There are many other ways to control visibility in threejs.

Alpha maps are a way to go about adjusting opacity of a material with a texture rather than setting the opacity of the material over all. When it comes to just setting the opacity of a material over all there is the [transparent and opacity properties of a material](/2021/04/21/threejs-materials-transparent/). Also there are a number of features when it comes to just turning the visibility of an object on and off completely also. There is the [visible Boolean](/2021/05/24/threejs-object3d-visible/) of the object3d base class of Mesh objects, and there is also getting into learning a thing or two about layers.

### You might want to read up more on what the options are with materials

It is a good idea to really look into what the [options are when it comes to materials](/2018/04/30/threejs-materials/). I often go with the [basic material](/2018/05/05/threejs-basic-material/) if I am not going to do anything involving [light](/2022/02/25/threejs-light/), but when I do get into using light I have found that I like the [standard material](/2021/04/27/threejs-standard-material/), and now also the [Phong material](/2022/12/29/threejs-phong-material/) as well.. However you should not just use that as a way to make a decision when it comes to materials there are many other options with materials that also support the alpha mo feature along with many other features.

### Source code is up on Github

The source code examples in this post are up on [Github in my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-alpha-map).

### Version Numbers matter with three.js

When I first wrote this post I was using three.js version r104, and the last time I edited this post I was using r135. Threejs is still being developed and is moving pretty fast, in the future there might come another time where this code might break. So if things are not working out for you with this example, and many other examples on the open Internet the first thing you should check is the version of threejs that you are using.

## 1 - Alpha map example in three js

So for a basic example of an alpha map in threejs I have this example that makes used of a texture that is created from a canvas element. I just create a canvas and then make gray scale areas of the canvas by using the 2d drawing context. When drawing to the canvas any area that I draw as black will end up being totally transparent, and any area that is white will be fully opaque, shads of gray then set values between the two extremes. 

I then used the THREE.CanvasTexture constructor to create a texture that I can then use with the alpha map property of a material that supports alpha maps such as the Mesh basic Material.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.3, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// creating a texture with canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
// drawing gray scale areas
ctx.fillStyle = '#404040';
ctx.fillRect(0, 0, 32, 32);
ctx.fillStyle = '#808080';
ctx.fillRect(32, 0, 32, 32);
ctx.fillStyle = '#c0c0c0';
ctx.fillRect(0, 32, 32, 32);
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(32, 32, 32, 32);
var texture = new THREE.CanvasTexture(canvas);
 
// creating a mesh that is using the Basic material
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            // using the alpha map property to set the texture
            // as the alpha map for the material
            alphaMap: texture,
            // I also need to make sure the transparent
            // property is true
            transparent: true,
            // even when opacity is one the alpha map will 
            // still effect transparency this can just be used to set it even lower
            opacity: 1,
            side: THREE.DoubleSide
        }));
scene.add(mesh);
renderer.render(scene, camera);
```

The transparent property of the material also needs to be set to true, and a renderer that supports transparency also needs to be used. The usual WebGl renderer worked just fine for me in this example, but other renderer options may not support this feature. Still that is the basic idea to create a texture that is in gray scale and then just add that texture to the alpha map property of the material to which I want to add an alpha map for.

## 2 - Animation loop example of an alpha map

So now that I have a basic, static example out of the way maybe the next step is to do something involving an animation loop using request animation frame. When I made the first video for this post I took the basic example and reworked what I was doing to update the canvas texture. So then I made another example based off of that that I now have for this new section on alpha maps and using canvas textures for such maps.

When it comes to updating a canvas texture all I need to do is just update the state of the canvas element that was used for the texture object, and then just make sure that the needs update property of the texture is set to true.

```js
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// creating a texture with canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
var drawMethod = {};
drawMethod.grid = function (ctx, canvas, opt) {
    opt = opt || {};
    opt.w = opt.w || 4;
    opt.h = opt.h || 4;
    opt.colors = opt.colors || ['#404040', '#808080', '#c0c0c0', '#f0f0f0'];
    opt.colorI = opt.colorI || [];
    var i = 0,
    len = opt.w * opt.h,
    sizeW = canvas.width / opt.w,
    sizeH = canvas.height / opt.h;
    while (i < len) {
        var x = i % opt.w,
        y = Math.floor(i / opt.w);
        ctx.fillStyle = typeof opt.colorI[i] === 'number' ? opt.colors[opt.colorI[i]] : opt.colors[i % opt.colors.length];
        ctx.fillRect(x * sizeW, y * sizeH, sizeW, sizeH);
        i += 1;
    }
};
var texture = new THREE.CanvasTexture(canvas);
// creating a mesh that is using the Basic material
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            // using the alpha map property to set the texture
            // as the alpha map for the material
            alphaMap: texture,
            // I also need to make sure the transparent
            // property is true
            transparent: true,
            // even when opacity is one the alpha map will
            // still effect transparency this can just be used to set it even lower
            opacity: 0.8,
            side: THREE.DoubleSide
        }));
scene.add(mesh);
// LOOP
var frame = 0,
maxFrame = 90,
fps = 20,
lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        var colorI = [],
        i = 6 * 6;
        while (i--) {
            colorI.push(Math.floor(4 * Math.random()))
        }
        drawMethod.grid(ctx, canvas, {
            w: 6,
            h: 6,
            colorI: colorI
        });
        texture.needsUpdate = true;
        mesh.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## Conclusion

There are a whole bunch of different maps to be aware of when it comes to skinning faces of a geometry with a material in threejs. There is the plain old color map that can also be used, and with materials that respond to light sources there are many other maps of interest as well such as an emissive map that will be a color that will always show up regardless of the lighting situation. Still alpha maps are one of the many types of maps to be aware of, and they can be fun to play around with when working out details with the materials that are going to be used with objects in a scene.
