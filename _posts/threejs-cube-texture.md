---
title: Adding a cube texture to a mesh in three.js
date: 2018-04-22 18:35:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 179
updated: 2022-04-01 12:41:50
version: 1.18
---

In [three.js](https://threejs.org/) you might want to have a way to set up a background that will actually be a bunch of images that would line each side of the inside of a box, resulting in a background that is can be descrive then as a kind of cube texture, or skybox if you prefer. You might also want to have that kind of texture placed over the surface of some kind of mesh as well. In three.js there is a constructor that will produce this kind of texture that can be used with an array of materials, called [CubeTexture](https://threejs.org/docs/index.html#api/textures/CubeTexture).

A CubeTexture can be used with any property, of any material that makes use of a cube texture. In addition it is also one of three options when it comes to setting the background of a scene, allowing you to make a background that is way cooler than just a solid color background. In this post I will be writing about setting up a cube texture, loading it with the [CubeTextureLoader](https://threejs.org/docs/index.html#api/loaders/CubeTextureLoader), and using that cube texture as a background as well as a texture for a sphere.

<!-- more -->

## Cube textures in three.js, and What to know before hand

This is not a post for people that are new to three.js. If you are new to three.js you might try starting with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. This is also not a post on the basics of javaScript, and all other related background that might be require to get to this point. There is a great deal to learn about three.js, I am going to be suing things like materials, and meshes in this post you might try bouncing around [my other posts on three.js](/categories/three-js/), and as always there is the [official site](https://threejs.org/)on three.js as well to check out other topics in further detail.

### Version Numbers matter with three.js

When I first wrote this post I was using r91 of three.js, and the last time I edited this post I was using r127. Three.js is still a very fast moving projects, and code breaking changes happen with it all the time. Always be aware of what version of three.js you are using, and in general when it comes to various javaScript libraries.

###  Having some images

Before getting started making a cue texture one of the first things to work out is the images. I will need not just one, but six images, one for each side of a cube, thus the name cube texture. These should not just be any images also, they should be generated in a way in which they will work well for the intended purpose.

Getting into how to go about making these images could prove to be a whole other post by itself. So for this post I will just be using one of the examples provided in the official three.js repository. The collection of examples can be found in the [examples/textures/cube](https://github.com/mrdoob/three.js/tree/r91/examples/textures/cube) folder of the repository.

### The Cube Texture Loader

Although it is possible to work directly with the [CubeTexture constructor](https://threejs.org/docs/index.html#api/textures/CubeTexture), typical use will involve the [CubeTextureLoader](https://threejs.org/docs/index.html#api/loaders/CubeTextureLoader) that will give me an instance of CubeTexture.

```js
 
    // LOAD CUBE TEXTURE
    new THREE.CubeTextureLoader()
    .setPath('/img/cube/skybox/')
    .load(
 
        // urls of images used in the cube texture
        [
            'px.jpg',
            'nx.jpg',
            'py.jpg',
            'ny.jpg',
            'pz.jpg',
            'nz.jpg'
        ],
 
        // what to do when loading is over
        function (cubeTexture) {
 
            // CUBE TEXTURE is also an option for a background
            scene.background = cubeTexture;
 
            renderer.render(scene, camera);
 
        }
 
    );
```

The setPath method of the CubeTextureLoader instance can be used to set the base url of where the images are stored. Then the load method can be used to start loading some images that should be at that location. When calling the load method, at a minimum the first argument should be the filenames of the images. Although some examples make use of what is returned by the CubeTextureLoader I prefer to use the onload callback, which will be the second argument giave to the load method.

If desired a third argument can be used that will be the on progress method, and a final argument given can be an on error method.

## 1 - Basic example of Cube Texture use

For a basic example of cube texture use I used the Cube Texture loader to load a set of images that compose a [cube mapping](https://en.wikipedia.org/wiki/Cube_mapping) that I borrowed from the three.js repository as mentioned earlier to procure an instance of CubeTexture.

I then used the CubeTexture as an [environment map](https://en.wikipedia.org/wiki/Reflection_mapping) for a material that I then used to skin a sphere. this can be achieved be setting the instance of CubeTexture to the envMap property of the Material. In addition I also used the same cube texture to set the background of the scene.

```js
(function () {
    // camera
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // LOAD CUBE TEXTURE
    new THREE.CubeTextureLoader()
    .setPath('/img/cube/skybox/')
    .load(
        // urls of images used in the cube texture
        [
            'px.jpg',
            'nx.jpg',
            'py.jpg',
            'ny.jpg',
            'pz.jpg',
            'nz.jpg'
        ],
        // what to do when loading is over
        function (cubeTexture) {
            // Geometry
            var geometry = new THREE.SphereGeometry(1, 20, 20);
            // Material
            var material = new THREE.MeshBasicMaterial({
                // CUBE TEXTURE can be used with
                // the environment map property of
                // a material.
                envMap: cubeTexture
            });
            // Mesh
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            // CUBE TEXTURE is also an option for a background
            scene.background = cubeTexture;
            renderer.render(scene, camera);
        }
    );
}
    ());
```

This results in a scene where I have the cube texture as the background, and I am also using it as a means of cheep reflection with respect to the sphere. In order to get the full effect of what is going on I should add some [orbit controls](/2018/04/13/threejs-orbit-controls/), or failing that do something to move the camera around. However I just wanted to have a basic getting started type example with this sort of thing, so I do not want to do anything that further complicate this.

## 2 - Creating a Cube Texture with canvas elements

In this section I will be quickly going over an example where I am using canvas elements as a way to create an image to use to create a cube texture. However this is just for the sake of showing that it can be done and that is it.

### 2.1 - A Canvas texture module

I will want a canvas texture module that I often use when it comes to a project where I am using canvas elements to generate textures.

```js
(function (canvasTextureMod) {
    // create a canvas texture with a draw method and size
    canvasTextureMod.createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
    // random grid draw helper
    var randomGridDraw = function (ctx, canvas, colorsArray, minValue, maxValue) {
        var i = 0,
        r1,
        r,
        g,
        b,
        x,
        y,
        len = canvas.width * canvas.height;
        while (i < len) {
            x = i % canvas.width;
            y = Math.floor(i / canvas.width);
            r1 = minValue + Math.floor((maxValue - minValue) * Math.random());
            r = colorsArray[0] === 'r1' ? r1 : colorsArray[0];
            g = colorsArray[1] === 'r1' ? r1 : colorsArray[1];
            b = colorsArray[2] === 'r1' ? r1 : colorsArray[2];
            ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            ctx.fillRect(x, y, 1, 1);
            i += 1;
        }
    };
    // create a basic square texture
    canvasTextureMod.basicSquare = function (colorsArray, size, lineSize, lineStyle, minValue, maxValue) {
        colorsArray = colorsArray === undefined ? ['r1', 'r1', 'r1'] : colorsArray;
        size = size || 32;
        return canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            // draw random grid texture
            randomGridDraw(ctx, canvas, colorsArray, minValue || 0, maxValue === undefined ? 64 : maxValue);
            // draw lines
            ctx.strokeStyle = lineStyle || 'white';
            ctx.lineWidth = lineSize || 3;
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.stroke();
        }, size);
    };
}(this['canvasTextureMod'] = {}));
```

### 2.2 - Using the canvas texture module

So now I can use this canvas texture module to just quickly create some textures, and then in turn I can use that texture to create a cube texture instance.

```js
var scene = new THREE.Scene();
 
// CREATING A CUBE TEXTURE WITH CANVAS
var texture = canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 128, 6, 'black', 32, 64).image;
cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture));
cubeTexture.needsUpdate = true;
scene.background = cubeTexture;
 
// CAMERA
var camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
camera.position.set(14, 6, 14);
camera.lookAt(0, 0, 0);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
//renderer.width = 640;
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
var container = document.getElementById('demo');
container.appendChild(renderer.domElement);
 
// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var loop = function () {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
};
loop();
```

## 3 - Conclusion

The cube texture is mainly used for sky maps, and to use for a material when it comes to having an environment map, at least that is what I have been using for thus far anyway. In this post I was just going over how to make use of a sky map in terms of a set of images that have been made before hand. However I did not get around to how to go about making them from the ground up. Thus far I have found a number of resources on how to make them, but often the process of doing so is a little involved. I am interesting in finding ways to make these kinds of assets though, so if I find a quick sane way to go about making them maybe I will get around to edit this post with some info on that one.

