---
title: Working with a cube texture threejs to set up a skyBox, and other related tasks
date: 2018-04-22 18:35:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 179
updated: 2023-03-24 05:39:45
version: 1.42
---

In [threejs](https://threejs.org/) I might want to have a way to set up a background that will actually be a bunch of images that would skin each side of the inside of a cube, resulting in a background that can be described as a kind of cube texture. Other terms for this kind of cube texture might also be [skybox](https://en.wikipedia.org/wiki/Skybox_%28video_games%29), or [cube mapping](https://en.wikipedia.org/wiki/Cube_mapping). This kind of texture can be set to the background property of a [scene object](/2018/05/03/threejs-scene/), but I also can place this kind of texture over the surface of some kind of mesh as well to create a reflection type effect often referred to as an [environment map supported by materials like that of the basic material](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.envMap). 

So then with that said in threejs there is a [constructor function](/2019/02/27/js-javascript-constructor) that will produce this kind of texture that can be used as a background, or environment map, called the [Cube Texture](https://threejs.org/docs/index.html#api/textures/CubeTexture) constructor. There are two general way of using it, one of which would be to use the [Cube Texture Loader](https://threejs.org/docs/#api/en/loaders/CubeTextureLoader), and the other way would be to work directly with the CubeTexture Constructor and obtain the textures needed by some other means such as using canvas elements.

If I am to use the cube texture loader I will need six image files to load for each face of the cube. When going this way I can use any six images that I want but it might now look the way that I will want it to. There is some legwork that will have to be done in order to create a set of textures that are not just textures, but textures that will look they way that they should. There are a number of textures that one can look at as examples in the Github repository for threejs to get an idea of what I mean by this. The other option would be to use canvas textures, or data textures with the CubeTexture class directly and figure out what I need to do in terms of mutation of the color index data to get raw seamless images to look okay. In this post I will be covering code examples that have to do with both of these general ways of working with cube textures in threejs.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/-O8fEADJddg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Cube textures in three.js, and What to know before hand

This is not a post for people that are new to threejs, in fact this is a pretty advanced topic that i come back to now and then. If you are new to threejs you might try starting with my [getting started post](/2018/04/04/threejs-getting-started/) on the library. There is a great deal to learn about threejs, with the topic of cube textures alone things turn into a bit of a hornets nest of things that need to be studied in detail to obtain a professional level of knowledge. 

In this post I am going to be using things like materials, mesh objects, assets loaders, and means of generating textures by way of javaScript code. It goes without saying that there are many things that you might want to read up more on before hand, all of which I will not be getting into here at least in detail to say the least. However I do use these opening sections of my posts to at least touch base on some of these things, and link to other posts in which I do expand on what is also relevant.

###  Having some images to load if using the CubeTextureLoader

Before getting started making a cube texture one of the first things to work out is the images to use. I will need not just one, but six images, one for each side of a cube, thus the name cube texture. These should not just be any images also, they should be generated in a way in which they will work well for the intended purpose. Getting into how to go about making these images could prove to be a whole other post by itself. So for this post I will just be using one of the examples provided in the official threejs repository. The collection of examples can be found in the [examples/textures/cube](https://github.com/mrdoob/three.js/tree/r146/examples/textures/cube) folder of the repository.

### Making images to use with javaScript code if using the CubeTexture class directly

The other option apart from loading sky box textures that where made by a means outside of threejs would be to figure out how to generate, or mutate textures with a little javaScript code. There are two general ways of doing about creating textures with javaScript code that I tend to like in threejs. One option is to use [data textures](/2022/04/15/threejs-data-texture) which is a way to create a texture by way of a typed array of color data, and the other means of doing so is [canvas textures](/2018/04/17/threejs-canvas-texture/).

### The source code examples in this post are on Github

You can find the source code examples that I am writing about in this post at my text [threejs Github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-cube-texture). This is also the repository where I am parking the source code examples for [my other posts on three.js](/categories/three-js/).

### Version Numbers matter with three.js

When I first wrote this post I was using r91 of threejs, and the last time I edited this post I was using r146 of the library. Threejs is still a very fast moving project, and code breaking changes happen with it all the time. Always be aware of what version of three.js you are using when working with various random code examples that make use of threejs on the open web as version numbers very much matter with this project.

## 1 - Basic example of Cube Texture using the built in loader

For a basic example of a cube texture I used the Cube Texture loader to load a set of images that I borrowed from the threejs repository as mentioned earlier to procure an instance of CubeTexture. This instance of the CubeTexture class will be passed by means of an argument form the on load callback when using the load method of an instance of the CubeTextureLoader.

I then used the CubeTexture as an [environment map](https://en.wikipedia.org/wiki/Reflection_mapping) for a material that I then used to skin a sphere. This can be achieved be setting the instance of CubeTexture as the value for the envMap property of the Material. When it comes to [choosing a material](/2018/04/30/threejs-materials/) I will want to make sure that the material supports the use of an environment map, for this example I ma using the [Mesh basic material](/2018/05/05/threejs-basic-material/) which supports this feature. In addition I also used the same cube texture to set the background of the scene as an instance of the cube texture can be set for the background in place of what would otherwise just be a static color or texture.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
 //-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LOAD CUBE TEXTURE
//-------- ----------
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
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
    (cubeTexture) => {
        // Geometry
        const geometry = new THREE.SphereGeometry(1, 60, 60);
        // Material
        const material = new THREE.MeshBasicMaterial({
            // CUBE TEXTURE can be used with
            // the environment map property of
            // a material.
            envMap: cubeTexture
        });
        // Mesh
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        // CUBE TEXTURE is also an option for a background
        scene.background = cubeTexture;
        // render
        renderer.render(scene, camera);
    }
);
```

This results in a scene where I have the cube texture as the background, and I am also using it as a means of reflection with respect to the sphere. In order to get the full effect of what is going on I should add some [orbit controls](/2018/04/13/threejs-orbit-controls/), or failing that do something to move the camera around. However I just wanted to have a basic getting started type example with this sort of thing, so I do not want to do anything that further complicate this.

## 2 - Creating a Cube Texture with canvas elements

I have cube textures to load before hand I can use the cube texture loader as a way to load in those textures and then just go ahead and use the cube texture class instance that is given in the load function to add a background or an environment map. However what if I want to make my own cube textures using a little javaScript code? This task has proven to be a little involved, and although there are a lot of blog posts on this topic many of them are just writing about using the cube texture loader to load external images that have been made by someone else, somehow.

In this section I will be creating textures using canvas elements to have a cube texture. When making a cube texture this was the easy part to just simply create six textures with canvas elements and the 2d drawing context. The not so easy part of figuring a way to create a seamless set of textures, and then mutate the state of the images so that they will work well as a set of images for a cube texture. Although I have a solution that might still be a little ruff around the edges with this one, I think that I have at least took a step or two in the right direction to say the least.

### 2.a - A Canvas texture module

I will want a canvas texture module to use with this set of examples, so let me take a moment to write a thing or two about that first. This module contains a create canvas texture method that is a general way of going about creating a texture with canvas by passing a draw function that will create the canvas content, and then a size option that will set both the width and height of the canvas.

This is a crude canvas module, I know, and I will likely replace this with something better in a future edit of this post. However for this it will work well enough for what I need this for.

```js
// canvas_texture.js  - r0 - from threejs-cube-texture
(function (canvasTextureMod) {
    // create a canvas texture with a draw method and size
    canvasTextureMod.createCanvasTexture = function (draw, size) {
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
    // random grid draw helper
    const randomGridDraw = function (ctx, canvas, colorsArray, minValue, maxValue) {
        let i = 0,
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

### 2.1 - Using the canvas texture module

So now I can use this canvas module to just quickly create a texture, and then in turn I can use that texture to create a cube texture instance. For this basic starting example I am using the same texture for all six sides of the cube, and have went with the basic square function of the module to just create a simple square image.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
camera.position.set(14, 6, 14);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
/-------- ----------
// CREATING A CUBE TEXTURE WITH CANVAS
//-------- ----------
const texture = canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 256, 1, 'black', 32, 64).image;
// same texture for all sides
cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture));
cubeTexture.needsUpdate = true;
scene.background = cubeTexture;
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
const loop = function () {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
};
loop();
```

Although this might work there is one problem all ready and that is that by the look of it I am very much aware of the fact that the cube texture is, well, a cube. The reason for this is that I am just making a square texture without running it through any additional processing of any kind so that the image gets distorted in a way in which it will look right.

So maybe if I just simple want to create a cube texture with canvas elements, doing that is easy enough, but the hard part is mutating state of the textures that i create to get them to look a certain way that is a desired outcome.

### 2.2 - A first step might be a Grid example

I am thinking that the first step in the direction of making a system for generating cube textures will involve some kind of grid system that contains data for each pixel that forms a texture.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
camera.position.set(14, 6, 14);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CREATING A CUBE TEXTURE WITH CANVAS
//-------- ----------
// square
const grid1 = {
    w: 16,
    pxData: [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],
    pal: [ [1,1,1], [0,0,0] ]
};
const getTextureFromGrid = (grid, canvasSize) => {
    canvasSize = canvasSize === undefined ? 64 : canvasSize;
    return canvasTextureMod.createCanvasTexture((ctx, canvas) => {
        ctx.fillStyle='white';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        let i = 0, len = grid.pxData.length;
        while(i < len){
            let pX = i % grid.w;
            let pY = Math.floor(i / grid.w);
            let c = grid.pal[ grid.pxData[i] ];
            let color = new THREE.Color(c[0], c[1], c[2]);
            ctx.fillStyle = color.getStyle();
            let pxW = canvas.width / grid.w;
            let pxH = canvas.height / grid.w;
            ctx.fillRect(pX * pxW, pY * pxH, pxW, pxH);
            i += 1;
        }
    }, canvasSize);
};
//-------- ----------
// BACKGROUND
//-------- ----------
const texture =  getTextureFromGrid(grid1, 256);
// same texture for all sides
cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture.image));
cubeTexture.needsUpdate = true;
scene.background = cubeTexture;
//-------- ----------
// SPHERE
//-------- ----------
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 30, 30), 
    new THREE.MeshBasicMaterial({
       envMap: texture
    }) 
);
scene.add(sphere);
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
const loop = function () {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
};
loop();
```

So far so good, but this is still an outcome that is not all that different from the basic example of this section. In order to really get what i want to work I will need to find a way to create a new grid object from a grid object and adjust things so that they are distorted so that it will look right if that makes any scene.

### 2.3 - Distance distort example

This is the first example where I worked out a distance based distort function that will create a new grid of image color data from another one but apply a kind of circle distorted for each pixel based on the distance each pixel is from the center of the image. For this example I worked out a number of additional helper functions that have to do with getting an index value in the gird if I know the x and y values along with the inverse of that. However the main function that is really work writing about in detail here would be the create remapped grid helper function.

As the name suggests the create remapped grid function will create a new grid from a grid with the pixel data values mutated to get a desired outcome for cube textures. This is done by creating a new grid object and just copying the width value from the source grid object, and creating a reference to the same palette array. The real part of this that is of interest though is how I am going about creating the new px data array for the new grid. For that I call the array map method off of the px data array of the source grid, and then preform a fair amount of logic to create a new state of color index values.

The general idea here is to get a vector2 for the current pixel index value and use the distance to method of the Vector2 class to get the distance of the pixel to the center of the image. I can then use this distance compared to a max distance constant to get an alpha value between 0 and one for this pixel. There is then also using the Math.atan2 method to get the distance of the current pixel to the center of the image as well. This alpha value based on distance as well as the angle to the center can then be used to get a pixel index that is closer to the center, or the same pixel index actually depending on the value of the alpha value. This can then be used as a way to kind of remap the color index values of the image, and to some extent it seems to give a result that is what I want.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// get an px index if x and y are known
const getIndex = (grid, vx, y) => {
    const px = THREE.MathUtils.euclideanModulo(vx, grid.w);
    const py = THREE.MathUtils.euclideanModulo(y, grid.w);
    const index = py * grid.w + px;
    return index;
};
// get Vector2 if index is known but not x and y
const getVector2 = (grid, i) => {
    let pi = THREE.MathUtils.euclideanModulo(i, grid.pxData.length);
    let pX = pi % grid.w;
    let pY = Math.floor(pi / grid.w);
    let v2 = new THREE.Vector2(pX, pY);
    return v2;
};
// create a remaped grid
const createRemapedGrid = (grid1, r1) => {
    r1 = r1 === undefined ? Math.floor(grid1.w / 4) : r1;
    const hw = grid1.w / 2;
    const vHalf = new THREE.Vector2(hw - 0.5, hw - 0.5);  //!!! May have to adjust this between even and odd
    const mDist = vHalf.distanceTo( new THREE.Vector2(0, 0) );
    const grid2 = {
        w: grid1.w,
        pxData: grid1.pxData.map((currentColorIndex, i) => {
            const v2 = getVector2(grid1, i);
            const dist = v2.distanceTo( vHalf );
            // dist alpha value, and angle to center
            const dAlpha = dist / mDist;
            const a = Math.atan2(v2.y - vHalf.y, v2.x - vHalf.x) + Math.PI;
            // get another color index from closer to center
            const x = v2.x + Math.round(Math.cos(a) * r1 * (1 - dAlpha));
            const y = v2.y + Math.round(Math.sin(a) * r1 * (1 - dAlpha));
            const refIndex = getIndex(grid1, x, y);
            //console.log(i, a.toFixed(2), refIndex);
            //return currentColorIndex;
            return grid1.pxData[refIndex];
        }),
        pal: grid1.pal
    };
    return grid2;
};
// get a canvas texture from the given grid
const getTextureFromGrid = (grid, canvasSize) => {
    canvasSize = canvasSize === undefined ? 64 : canvasSize;
    return canvasTextureMod.createCanvasTexture((ctx, canvas) => {
        ctx.fillStyle='white';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        let i = 0, len = grid.pxData.length;
        while(i < len){
            let pX = i % grid.w;
            let pY = Math.floor(i / grid.w);
            let c = grid.pal[ grid.pxData[i] ];
            let color = new THREE.Color(c[0], c[1], c[2]);
            ctx.fillStyle = color.getStyle();
            let pxW = canvas.width / grid.w;
            let pxH = canvas.height / grid.w;
            ctx.fillRect(pX * pxW, pY * pxH, pxW, pxH);
            i += 1;
        }
    }, canvasSize);
};
//-------- ----------
// GRID AND RE MAPED GRID
//-------- ----------
const grid1 = {
    w: 16,
    pxData: [
        0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,
        0,3,1,1,1,2,2,1,1,2,2,1,1,1,3,0,
        0,3,1,4,4,4,4,4,4,4,4,4,4,1,3,0,
        0,3,1,4,1,1,1,1,1,1,1,1,4,1,3,0,
        0,3,2,4,1,3,3,3,3,3,3,1,4,2,3,0,
        0,3,2,4,1,3,1,1,1,1,3,1,4,2,3,0,
        0,3,1,4,1,3,1,2,2,1,3,1,4,1,3,0,
        0,3,1,4,1,3,1,2,2,1,3,1,4,1,3,0,
        0,3,2,4,1,3,1,1,1,1,3,1,4,2,3,0,
        0,3,2,4,1,3,3,3,3,3,3,1,4,2,3,0,
        0,3,1,4,1,1,1,1,1,1,1,1,4,1,3,0,
        0,3,1,4,4,4,4,4,4,4,4,4,4,1,3,0,
        0,3,1,1,1,2,2,1,1,2,2,1,1,1,3,0,
        1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,
        0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
    ],
    pal: [ [1,1,1], [0,0,0], [0,1,0], [0,0.6,0], [0, 0.3, 0] ]
};
const grid2 = createRemapedGrid(grid1, 4);
//-------- ----------
// BACKGROUND
//-------- ----------
const texture =  getTextureFromGrid(grid2, 256);
// same texture for all sides
cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture.image));
cubeTexture.needsUpdate = true;
scene.background = cubeTexture;
//-------- ----------
// SPHERE
//-------- ----------
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 30, 30), 
    new THREE.MeshBasicMaterial({
       envMap: texture
    }) 
);
scene.add(sphere);
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(14, 6, 14);
camera.lookAt(0, 0, 0);
const loop = function () {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
};
loop();
```

## Conclusion

I have found that I really like cube textures, and learning more about how to go about making my own when it comes to this sort of thing. The math that is involved with mutating a texture to get it look the right way gets a little involved, and although I have some code together that seems to work okay thus far it is by no means batter tested, and I am sure that I might eventually come up with some better examples if I pour some more time into this subject.

There is not just the idea of making a single image for a skybox, but rather a whole bunch of these kinds of images to produce a kinf of animation. For example there is making a logo with SVG, loading that in with [the SVG loader](/2022/09/16/threejs-svg-loader/), creating an extrude geometry with custom uv mapping for it. Then say that when it comes to working out the material for this logo I would like to have a metallic look, but also with some flames shining off of the surface of the logo. To do that I would need to find or making a kind of animated environment map for the material.

This is what I love about threejs, and programming in general, there is always so much more to learn.

