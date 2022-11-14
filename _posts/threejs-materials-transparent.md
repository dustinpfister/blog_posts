---
title: Transparent Materials in threejs
date: 2021-04-21 14:03:00
tags: [three.js]
layout: post
categories: three.js
id: 850
updated: 2022-11-14 13:47:08
version: 1.41
---

In [threejs](https://threejs.org/) there are a few things to know about when it comes to making transparent materials, so I think it is called for to write a post on the topic. When it comes to working with just the [Basic material](/2018/05/05/threejs-basic-material/) for example the process is not that hard at all actually, when creating the material I just need to set the [transparent property of the material](https://threejs.org/docs/#api/en/materials/Material.transparent) to true. Once I have the transparency property value of a material set to true, it is then just a matter of setting the desired [opacity value](https://threejs.org/docs/#api/en/materials/Material.opacity) for the material.

However there might be a bit more to write about when it comes to a few more additional things that branch off from the basics of the transparent and opacity options. There are many other things that might be considered advanced topics such as [alpha maps](/2019/06/06/threejs-alpha-map/). Also things can get a little involved actually when we start bringing light sources into the mix and how that should be handled. So in this post I will be covering the very basics of getting started with transparency when working with materials in threejs, but I will also have to touch base on a few more things from that as well.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/0DaDB0CTvbY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Making a mesh transparent, and what else to know

In this post I am mainly writing about the transparent and opacity properties of materials as a way to adjust the transparency of a material of a [mesh object](/2018/05/04/threejs-mesh/) in the javaScript library known as three.js. However there are a whole lot of other ways to go about making a mesh object visible or not, and there are also a lot of other things that you should be aware of before continuing to read the full content of this post. 

I will not be getting into the basics of how to [get started with three.js](/2018/04/04/threejs-getting-started/), and I also assume that you have a [fair amount of experience with client side javaScript in general](/2018/11/27/js-getting-started/) as well. In this section I will not be going over every little detail that you should know before hand of course, but I can take a moment to write about some things that you might want to look into more first if you have not done so all ready.

### The visible property of the Object3d class

If I want to just make a mesh object, or just about any display object based off of the object3d class not visible for a while I can always just set the [visible boolean of the object](/2021/05/24/threejs-object3d-visible/) to false. There are also a number of other topics to cover when it comes to making an object completely not visible or not beyond just that of the visibility boolean of an object3d based object. For example there is adding one or more mesh objects to one or more [groups](/2018/05/16/threejs-grouping-mesh-objects/) and then adding and removing the groups to the main scene object that is used with the render function of a renderer as needed. Yet another option for this would be the [layers property of the Object3d class](/2021/06/04/threejs-object3d-layers/) also which is yet another option for that sort of thing.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post can be found in my [test theejs repository on Guthub](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-materials-transparent). This is also where I park the source code examples for my [many other posts on threejs](/categories/three-js/). This post on transparency like many of my other posts is still very much a work in progress, every so often I do get around to expanding posts with more examples while also improving the over all quality of older examples while I am at it. If you see something that should be fixed, or of you can thing of something that should be added there is the comments section in the bottom of this post, and also the test threejs repository where pull requests can be made.

### Version Numbers matter with three.js

When I first wrote this post I was using version r127 of three.js, and the last time I cam around to doing a little editing I made sure the examples still work okay with r135. Code breaking changes might be made to three.js at some point in the future that might cause many of these examples to not work any more. Always be mindful of what the version of three.js is that you are using, and this is also something to always keep in mind when working with javaScript libraries in general actually it is just that threejs moves pretty fast, and the public API keeps changing often.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/nUybyQbaFtk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 1 - Basic Transparency of the whole mesh with the Basic Material

So now to start out with a basic example of transparency in threejs, and as such If I just want to make a whole mesh transparent, and I am not doing anything fancy with lights, alpha maps, and so forth then transparency is not that hard to get up and running. All I have to do is set the transparency boolean of the basic materials to true, and then after that I set the opacity property of the mesh to set the level of transparency that I want for the material.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1, 0, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // CREATE MESH OBJECTS
    //-------- ----------
    const createCube = function (size, material, x, y, z) {
        const geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const materials = {};
    materials.sand = new THREE.MeshBasicMaterial({
        color: 'yellow'
    });
    materials.glass = new THREE.MeshBasicMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
    const glassCube = createCube(1, materials.glass, 0, 0, 2);
    const cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

## 2 - Using canvas elements to create a texture to use with the map option

On top of setting the whole material as transparent there is also working out what the alpha channel values of a texture should be when making the texture for the map option of the material. I could load an external texture in the form of a PNG image which supports alpha channel transparency. However another option that involves just JavaScript code would be to use canvas textures.

When it comes to drawing to a canvas element with the 2d drawing context there are a number of options when it comes to setting the color for the fill and stroke style. One option is to use RGBA which allows for me to set what the values should be fore red, green, blue, and the alpha channel. So in this example I am using this when drawing to the canvas element.

Just as before from the beginning I am going to want to set the transparent option of the material to true. However if I want I can leave the opacity of the material to 1. That is if I want to do everything with transparency with the 2d drawing context alone anyway, otherwise I might want to set it to something else.

There are some other options that I might want to set when setting up the material that I use with this canvas texture such as the side property of the material. If I am making a texture that I would like to show up an both sides of a face then I will want to set it to THREE.DoubleSide rather than the default THREE.FrontSide constant. 

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1.25, 1, 1.75);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createCube = (size, material, x, y, z) => {
        const geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const createCanvasTexture = (draw, size) => {
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
    //-------- ----------
    // TEXTURE
    //-------- ----------
    const texture_map = createCanvasTexture( (ctx, canvas) => {
        // USING rgba TO SET STYLE
        ctx.fillStyle = 'rgba(64,64,64,1)';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        // CLEAR RECT CAN BE USED TO SET AN AREA AS TRANSPARENT
        // THEN FILL WITH AN rgba STYLE
        ctx.clearRect(6, 6, 24, 24);
        ctx.fillStyle = 'rgba(0,255,255,0.4)';
        ctx.fillRect(6, 6, 24, 24);
        // can also rotate
        ctx.save();
        ctx.translate(34 + 7, 34 + 7);
        ctx.rotate( Math.PI / 180 * 45 );
        ctx.clearRect(-12, -12, 24, 24);
        ctx.fillStyle = 'rgba(0,255,255,0.4)';
        ctx.fillRect(-12, -12, 24, 24);
        ctx.restore();
        // FRAME
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)
    });
    //-------- ----------
    // MATERIAL
    //-------- ----------
    const material =  new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 1, 1),
        map: texture_map,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    //-------- ----------
    // MESH
    //-------- ----------
    const cube = createCube(1, material, 0, 0, 0);
    scene.add(cube);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 3 - Using a light source and the Standard material

Things get a little more involve when using a light source, when this is the case I will have to use a material that will respond to light so I can not use the basic material as it will not do that. There are a lot of options with materials that will respond to light to choose form, one such material is the standard material that strokes me as a good middle of the road type chose when it comes to this sort of thing when making choices between performance and how things look. Now that I have made a choice when it comes to materials I am going to need to add at least one light source, there are a number of options for that also of course, the one I often go for is a [point light](/2019/06/02/threejs-point-light/). This is is a nice kind of light that will shine light in all directions form the position at which it is located which works well for many of this kind of examples.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1, 0, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, -5, 5);
    scene.add(pl);
    //-------- ----------
    // CREATE MESH OBJECTS
    //-------- ----------
    const createCube = function (size, material, x, y, z) {
        const geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const materials = {};
    materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
    materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
    const glassCube = createCube(1, materials.glass, 0, 0, 2);
    const cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

## 4 - Canvas elements and alpha maps

Another kind of transparency is to get into using [alpha maps](/2019/06/06/threejs-alpha-map/) this is a kind of texture map that can be added to a material to set locations in a face that should be transparent, and if so by how much by using gray scale coloring. One way to do so would be to load extremal images as a way to create some textures for an alpha map as well as other kinds of maps. However when it comes to just using a little javaScript code I can use [canvas elements as a way to create textures](/2018/04/17/threejs-canvas-texture/) which in turn can also be used to create textures that can be used for an alpha map along with the other kinds of maps.

So once again I added a bit more to what was once my basic transparency example by adding a method that will help me to make a texture for a alpha map using a canvas element. When drawing to the canvas element I will want to stick to using gray scale color values, when a color is black that will mean that area in the texture will be fully transparent, while white will mean fully opaque. So I need to just set the stroke color, and or fill color values of the 2d canvas drawing context as needed when working gout the texture for the alpha map.

Things will get a little involve beyond just that of adding the alpha map to the a material though, I will want to play around with some additional material properties to get things to work the way that I want them to. For example there is the question of drawing just the front sides of a cube, or all sides. I might want to also play around with the depth function that is used for the material.

For this example I also added an ambient light to make sure that there is always a certain amount of base light for all surfaces, on top of the ushual point light that I like to use.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1, 0, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, -5, 5);
    scene.add(pl);
    const al = new THREE.AmbientLight(0xffffff);
    al.intensity = 0.4;
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createCube = function (size, material, x, y, z) {
        const geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const createCanvasTexture = function (draw, size) {
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
    //-------- ----------
    // CREATE MESH OBJECTS WITH CANVAS ALPHA MAP TEXTURE
    //-------- ----------
    const alphaMap = createCanvasTexture(function (ctx, canvas) {
            // drawing gray scale areas
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, 32, 32);
            ctx.fillStyle = '#000000';
            ctx.fillRect(32, 0, 32, 32);
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 32, 32, 32);
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(32, 32, 32, 32);
        });
    const materials = {};
    materials.sand = new THREE.MeshStandardMaterial({
            color: 'yellow'
        });
    materials.glass = new THREE.MeshStandardMaterial({
            color: 'cyan',
            alphaMap: alphaMap, // using an alpha map
            side: THREE.DoubleSide,
            depthFunc: THREE.AlwaysDepth,
            transparent: true,
            opacity: 0.2
        });
    const glassCube = createCube(1, materials.glass, 0, 0, 2);
    const cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 5 - Setting a transparent background

On top of setting a transparent material there is also the question of how to go about having a [transparent background](https://stackoverflow.com/questions/20495302/transparent-background-with-three-js) in the threejs project as well. For this there is setting the alpha option for the renderer to true when calling the web gl renderer constructor function. After that I can use the set clear color method of the renderer to adjust what the clear color is if needed.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1.5, 1.25, 1.5);
    camera.lookAt(0, 0, 0);
    // setting alpha option to true, and then using set clear color as needed
    const renderer = new THREE.WebGL1Renderer( { alpha: true } );
    renderer.setClearColor( 0x0000ff, 0.25 );
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 2, 1);
    scene.add(dl);
    //-------- ----------
    // CREATE MESH OBJECTS
    //-------- ----------
    const createCube = function (size, x, y, z, material ) {
        var geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const material =  new THREE.MeshPhongMaterial({
        color: 'yellow',
        transparent: true,
        opacity: 0.5
    });
    const cube1 = createCube(1, 0, 0, 0, material);
    scene.add(cube1);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

## Conclusion

So then transparency is something that can be set for a material as a whole, but it can also be set in at a texture level also when it comes to alpha maps. So then transparency can be something that can be very simple if we are taking the use of the basic material, and just setting the transparency of the whole material at a global level. However things can get a little involved when it comes to adding alpha maps to the mix, as that can lead to all kinds of additional things when it comes to sides, and directional light.

I still thing I need to work out some more examples on this topic, and also how to deal with various tings that will come up when working with light and various maps that are used in a material to skin a geometry that are used together for a single mesh object.

