---
title: Using a Canvas element as a Texture in three.js
date: 2018-04-17 09:33:00
tags: [js,canvas,three.js,animation]
layout: post
categories: three.js
id: 177
updated: 2023-03-23 06:57:16
version: 1.110
---

There are many situations in which I will want to have a texture to work with when it comes to working with materials in [threejs](https://threejs.org/). That is that when it comes to the various kinds of maps there are to work with in a material, such as diffuse maps, [alpha maps](/2019/06/06/threejs-alpha-map/), [emissive maps](/2021/06/22/threejs-emissive-map/), and so forth, one way or another I need to load or create a texture. One way to add a texture to a material would be to use the [built in texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) in the core of the threejs library, if I have some other preferred way to go about loading external images I can also use the THREE.Texture constructor directly to create a texture object from an Image object. However there is also the question of how to go about generating textures using a little javaScript code, and one way to go about creating a texture this way would be with a [canvas element](/2017/05/17/canvas-getting-started/), the 2d drawing context of such a canvas element, and the [THREE.CanvasTexture](https://threejs.org/docs/#api/en/textures/CanvasTexture) constructor

So canvas elements are a nice way to get started with textures in three.js that involve the use of additional javaScript code rather than loading external binary image files. Also because I am creating textures with code, this allows me to create textures that are the result of some kind of pure function, or [stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) rather than a fixed static image. I can update the state of this texture by just drawing to the canvas element again allowing me to have animated textures. Also I have a wide range of methods to work with in the 2d drawing context which is a plus compared to other options for creating textures with javaScript code such as [data textures](https://threejs.org/docs/#api/en/textures/DataTexture).

There is a whole lot of ground to cover when it comes to getting into this sort of thing if you do not have much experience working with canvas elements yet. The process of creating a texture with a canvas element is simple enough when it comes to the fact that I just need to pass the canvas element to a constructor function and the desired texture object is returned. However there are a whole bunch of other topics that branch off from this that have to do with canvas elements in detail, as well as other closely related threejs topics such as the uv attributes of buffer geometry instances that are used in conjuration with one or more materials.

In this post I am mainly just going to be writing about using the built in constructors to create a texture with a canvas element. I might not get into detail about the 2d drawing context, but of course I will have to touch base on it to say the least. There are many other things that I am sure that I will also need to cover at least a little in order to make this post truly comprehensive with respect to this specific topic.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/wy5cQ_cwqEo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Canvas textures in threejs, and what to know first

In this post I will be going over a lot of source code examples that have to do with using the javaScript library known as threejs, along with various client side javaScript features, mainly canvas elements. This is then not any [kind of getting started type post with threejs](/2018/04/04/threejs-getting-started/), or with [javaScript in general](/2018/11/27/js-getting-started/) for that matter. So I assume that you have at least some background with the basics of threejs, and client side javaScript development in general. Regardless of what your level of experience is with threejs and javaScript, in this section I will be going over a few things that you should be up to speed with at this point before continuing to read the rest of this post.

### Canvas elements and the 2d drawing context

I order to use a canvas as a texture I will of course need a reference to a canvas element, and I will also want to have something drawn on the canvas element. One way to create a canvas element would be to use the document.createElement method in client side javaScript to create and return a new canvas element object. The resulting canvas element does not have to be appended to the hard coded HTML, I just need to have one to give to the Canvas Texture constructor to create a texture object.

As for drawing to the canvas element I am going to need to get a reference to the [2d drawing context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) of the canvas element, and use the various methods of that context to draw to the canvas. Covering every little detail with this part of the process of creating canvas textures in threejs is naturally beyond the scope of this post. I have a [whole other collection of posts](/categories/canvas/) that have to do with just canvas elements alone, including a [canvas examples mega post](/2020/03/23/canvas-example/) in which I link to the many canvas examples that I have made thus far over the years. I will cover a quick basic hello world type example here, and cover some more examples in the rest of the content of this post.

The width and height values should be a base 2 number such as 8, 16, 32 and so forth else you might get webGl errors in the console. Aside from that concern so far it seems like you can just create and draw to a simple plane old canvas element like normal with the various context methods. So say you just want to start out with something very simple, just use the canvas 2d drawing context to create a texture that is just a square. In which case I might get together something where I just create the canvas, get a reference to the context, set the size, then use the fill style property, stroke style property, fill rect method, and stroke rect method.

In other words something like this:

```js
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 8;
    canvas.height = 8;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
```

There is of course a great deal more to the 2d drawing context, and the various other client side javaScript features for creating textures with canvas. I have wrote a post on [getting started with canvas](/2017/05/17/canvas-getting-started/) that might be worth checking out if you are totally new to canvas elements.

### The source code examples here can be found on Github

The [source code examples in this post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-canvas-texture) can be found in my test threejs repo, along with all the other examples of all the [other posts I have wrote on threejs thus far](/categories/three-js/). This is a repository that I keep working on a little fairly often when it comes to writing new content on threejs, as well as editing older content such as this post which I have edited many times thus far. If there is something that does not sit right with you about the source code examples here, there is making a comment in this post, but if you want to make a pull request my test threejs repository is where to go about doing that.

### Version numbers matter with threejs

When I first wrote this post I was using threejs version r91, and the last time I came around to do a little editing I was using r140. I do make an effort to come around and edit my threejs posts now and then to fix anything that might brake in late versions of threejs. The library still moves pretty fast in terms of development compared to other projects where progress is kind of slow, so always be mindful of the version of threejs that is being used and how old content on the web might be.


### Creating a texture with canvas using THREE.CanvasTexture or just THREE.Texture

Although The base Texture class can be used to create a texture that uses a canvas, there is a constructor for this purpose called THREE.CanvasTexture. The only difference is that it would appear that the needs update Boolean of the texture is set to true by default. In any case you just pass the reference to the canvas \(not it's drawing context\) to the constructor that is used as the first argument.

So then simply put something like this:

```js
var texture = new THREE.CanvasTexture(canvas);
```

Seems to have the same effect as doing this:

```js
var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
```

In any case you now have both a canvas, a drawing context for that canvas, and a texture made from that canvas that can now be used in a material that can make use of that texture. Regardless of what constructor you use the needs update Boolean is of interest as even if it is set to true by default, you will want to set it true again each time you want the texture updated. I will be getting into this more in detail in the section that has to do with having an animated canvas texture.

### Know your options when it comes to materials and maps

When we look at Materials in depth they are composed of many properties, some of which are part of the base Material class, and others are part of a specific Material such as the [Basic Material](/2018/05/05/threejs-basic-material/), Lambert Material, or the [Standard Material](/2021/04/27/threejs-standard-material/). Properties of materials such as map, and emissiveMap expect a Texture as the value to be used with them, which is an image that can be used to define how the surface is going to look. With the basic material it is just a basic color map for the most part that is of interest, while with the Lambert material there are some additional maps that have to do with light.

So then it is impotent to note that the properties of materials will differ from one to another, and as such the options for maps will differ from one material to the next. If I just want a simple color map and that is it I can go with the basic material and move on when it comes to setting just the color and map properties of a material. However if I want to get into things with light, shadows, and so forth I am going to want to go with a material like the standard material, or Lambert material. There are all kinds of little differences between the various materials when it comes to concerns like performance, and the end result when it comes to how things look. However getting into this subject in depth is of course outside the scope of this post, so it would be called for to read up more on all of these [things that have to do with materials](/2018/04/30/threejs-materials/) elsewhere.

### Using the texture with a Material

I will not get into this in depth, as this matter can quickly become a whole new post when it comes to using a texture with a Material. However a quick example involving the basic material is in order for sure to say the least when it comes to using a texture with a material. For this example I am just setting the texture that is created with a canvas element to the map property of a basic material. This is how to go about making just a simple color map.

```js
var material = new THREE.MeshBasicMaterial({
    map: texture
});
```

The basic material is an example of a material that does not respond to a light source, so for the most part it is just the color of the surface that we are concerned with when working with this kind of material. So when I set the map property of a Basic Material to the texture, the canvas texture will work in place of the color property.

The material that you are using makes a big difference, some materials use the map property for the texture that is to respond to a light source. As such the property that you might want to set the texture that you have made to is the emissiveMap property rather than map. This is the case with the Lambert material

```js
var material = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color(0xffffff),
    emissiveMap: texture
});
```

There are other properties that make use of a texture, I will not get into detail with them all here as it is off topic, but it is something that you should be aware of if not before hand. 

So now that we have the basics when it comes to making a material with a texture that is created using a canvas element we can now use the material with a mesh. So lets start looking at some full examples of this in action.

### There is also loading external images, and dae files with textures

Using canvas elements might be fun, but I am more of the mind set that I should just use static image files to skin objects these days. When doing so there is the [built in texture loader in threejs](/2021/06/21/threejs-texture-loader/) that is one way to go about loading an external image, and create a texture with that image. However if you have a preferred way to go about loading one or more images in a client side javaScript project another option would be to use the THREE.Texture constructor directly. However there is also yet even another option that I think is the best so far when it comes to starting to create external assets with a program like blender and that is to [have dae files with external textures](/2021/06/25/threejs-examples-dae-tools/) that also need to be loaded with them.

## 1 - Some Basic Examples of canvas elements as textures in threejs

So now that I have all the basics that should be solid before hand I can now move on to starting out with a few basic examples of using canvas elements to create a texture. In these demo I will set up a scene object, add a camera, and a renderer just like any other basic threejs code example. On top of that I will also want to add at least one mesh object and set it away from a the position of the camera. For now the Mesh object will make use of the box geometry constructor that I often used for these kinds of examples, and I will also be using the basic material as for now I am thinking I will just use a canvas element to create a simple color map.

### 1.1 - Getting started

For this getting started canvas example I will be doing everything in a single javaScript file, and I will be trying to keep things as simple as possible. Nothing fancy with various helper functions, let alone modules or anything. Just a very simple single copy and paste style example that should sever as a great starting point for canvas textures.

First off I start out by creating the usual set of objects that I need for just about any threejs project. This is the scene object, camera, and renderer. Once that is all set and done I use the document create element method to create a new canvas element, once I have a reference to the canvas element I can use that to get an instance of the 2d drawing context. For this kind of use case example of canvas elements I do not need to append the canvas element to HTML, but rather pass the canvas element to the THREE.CanvasElement constructor function. However before I do that I will want to use the 2d drawing context to draw something to the canvas.

Once I pass the canvas element to the THREE.CanvasElement constructor that was called with the new keyword, the end result that is returned is a texture object. One thing that I have found that I like to change with canvas textures is what the values of the magFiler, and minFilter property values are. I would like for there to not be a blurry look to the textures when used with a material, and over all mesh object. The way to fix this is to set both of these to the value of the [THREE.NearestFilter texture constant](/https://threejs.org/docs/#api/en/constants/Textures). I should get into these in detail, but this is just the first basic example in a basic section so I will move on here.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 32; canvas.height = 32;
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
// Setting magFilter and minFilter to THREE.NearestFilter
console.log(texture.magFilter); // 1006 ( THREE.LinearFilter - r146 )
console.log(texture.minFilter); // 1008 ( THREE.LinearMipmapLinearFilter - r146 )
console.log(THREE.NearestFilter); // 1003 ( r146 )
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// GEOMETRY, MATERIAL, MESH
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

Once I have a canvas texture set up just the way that I like it I can now use it for one of the many map options for a material such as that of the basic material that I am using here. I the  use the material with a geometry to create a mesh object and add it to the scene object like always. Finally I can now call the render method of the renderer passing the scene object and the camera I would like to use. So far so good, but there is a whole lot more I should wrote about even when it comes to just the very basics.

### 1.2 - Helper methods

I started out with a helper method that just returns a texture that is created with the THREE.CanvasTexture constructor that I can then go an use with a material. This way I am doing everything in the body of just one function when it comes to the whole process of creating an returning the texture with a canvas element. This involves creating the canvas element, setting the side of the element, and drawing to the canvas. In later sections of this post I will be getting into more advanced forms of this method when it comes to making an actual module of some kind.

Now that I have a simple method that does everything that I want for this basic canvas texture example I will now just want some additional code that makes use of this method such as some kind of create mesh type object. I will then just need some additional code that has to do with all the other usual suspects when it comes to a basic threejs example.

I then have another helper that makes use of the create canvas texture helper by calling it and using the resulting texture that is returned for the map property of the basic material that is used for a mesh. The map property is how to go about making just a simple color map, and with the basic material it is more or less only this map that is of interest when it comes to adding some texture to a mesh. There might be some exceptions to that actually, but the basic material is not like other more advance materials that respond to light sources. 

I then just use the box geometry constructor for the geometry of the mesh, and return the mesh object. So then with this method object the resulting texture will be on all the faces of the geometry, rather than making a different texture for each of the sides of the cube.

With my simple helper functions all set and done I will now just need to create and set up the usual suspects when it comes to any other threejs project. In order words I will want to have a scene object, camera, and renderer to make use of these helper functions. So I create my scene object with the THREE.Scene constructor, and I also like to add a grind helper to the scene with many of my examples these days also. Next I just want to set up an instance of the usual perspective camera, be sure to position it away from where I am going to place a mesh object, and have the camera look at the location of the mesh object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// create a cube the makes use of a canvas texture
const createCanvasCube = function (draw, size_canvas, size_cube) {
    draw = draw || function(){};
    size_cube = size_cube === undefined ? 1 : size_cube;
    return new THREE.Mesh(
        new THREE.BoxGeometry(size_cube, size_cube, size_cube),
        new THREE.MeshBasicMaterial({
            map: createCanvasTexture(draw, size_canvas)
        })
    );
};
// draw square method to use with create canvas texture
const draw_square = function(ctx, canvas){
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#af0000';
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
};
// add cube to scene that makes use
// of the canvas texture
scene.add( createCanvasCube(draw_square, 16, 1.1) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

I then call my create cube constructor to create and return a mesh object, that is also using a canvas texture for the color map, and add that to the scene. After that I just need to create an instance of a renderer, and then use that renderer to draw the scene with the camera using the render function.

When this basic example is up and running the result is a cube with a texture created with the 2d canvas drawing context on each of the faces of the cube. So the basic idea of creating a texture with a canvas element is there, however there is a lot more to cover when it comes to this. There is a whole lot to cover when it comes to having more than one material for the geometry, or messing around with the uv values. However when it comes to staying on topic with canvas textures alone for one thing there is how to go about having an animated canvas texture, and also I am going to want to have a draw to use a custom raw function for a canvas too. So now that I have the basic example out of the way lets move on to some more advanced examples.

### 1.3 - Basic Module example

So now for a not so basic, basic example of canvas textures in threejs as this will be an example of a javaScript module in which I will be starting to abstract some stuff away. Although this will be an example of a module I will still be keeping this fairly basic by just focusing on the two main public methods that I would want to have in a module such as this, one would be a create method, and another will be an update method. On top of that I will also be adding a few backed in draw methods so that I can quickly get started with canvas textures by just passing a string for an option that would otherwise be a draw function, and then just tweak a few things to get the kind of texture I would like.

```js
(function(api){
    //-------- ----------
    // built in draw methods
    //-------- ----------
    const DRAW = {};
    // square draw method
    DRAW.square = (canObj, ctx, canvas, state) => {
        ctx.fillStyle = canObj.palette[0]
        ctx.lineWidth = 1;
        ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        ctx.strokeStyle = canObj.palette[1]
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };
    // random using palette colors
    DRAW.rnd = (canObj, ctx, canvas, state) => {
        let i = 0;
        const gSize =  state.gSize === undefined ? 5 : state.gSize;
        const len = gSize * gSize;
        const pxSize = canObj.size / gSize;
        while(i < len){
            const ci = Math.floor( canObj.palette.length * Math.random() );
            const x = i % gSize;
            const y = Math.floor(i / gSize);
            ctx.fillStyle = canObj.palette[ci];
            ctx.fillRect(0.5 + x * pxSize, 0.5 + y * pxSize, pxSize, pxSize);
            i += 1;
        }
    };
    //-------- ----------
    // HELEPRS
    //-------- ----------
    // parse draw option helper
    const parseDrawOption = (opt) => {
        // if opt.draw is false for any reason return DRAW.square
        if(!opt.draw){
            return DRAW.square;
        }
        // if a string is given assume it is a key for a built in draw method
        if(typeof opt.draw === 'string'){
            return DRAW[opt.draw];
        }
        // assume we where given a custom function
        return opt.draw;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // create and return a canvas texture
    api.create = function (opt) {
        opt = opt || {};
        // create canvas, get context, set size
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        opt.size = opt.size === undefined ? 16 : opt.size;
        canvas.width = opt.size;
        canvas.height = opt.size;
        // create canvas object
        const canObj = {
            texture: null,
            size: opt.size,
            canvas: canvas, ctx: ctx,
            palette: opt.palette || ['black', 'white'],
            state: opt.state || {},
            draw: parseDrawOption(opt)
        };
        // create texture object
        canObj.texture = new THREE.CanvasTexture(canvas);
        canObj.texture.magFilter = THREE.NearestFilter;
        canObj.texture.minFilter = THREE.NearestFilter;
        api.update(canObj);
        return canObj;
    };
    // update
    api.update = (canObj) => {
        canObj.draw.call(canObj, canObj, canObj.ctx, canObj.canvas, canObj.state);
        canObj.texture.needsUpdate = true;
    };
}( this['canvasMod'] = {} ));
```

So now that I have my canvas module all set up I will now want to make at least one quick demo of the module just to test out that the features are working okay thus far. For this I made a usual threejs setup with the scene, camera and so forth, and then I made just a single helper function to quickly create some mesh objects that use the box geometry and will be using the textures from the canvas objects I will be created with my module.

After that I made not one but three mesh objects each of which use a canvas texture made with my module here. The first one is just using all the default settings when it comes to just calling the create method without any options. The second mesh is using a built in draw method other than the default one by giving the key name in the built in object of draw methods. I can then also further customize things by giving a custom color palette as well as state values that are used for the draw function. The third and final mesh is making use of a custom user defined draw function just for showing that I can create custom draw functions as needed.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 1);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const makeCube = (canObj, size) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            map: canObj.texture
    }));
};
//-------- ----------
// CANVAS DEFAULT
//-------- ----------
// create texture with default draw method, size settings and so forth
let canObj1 = canvasMod.create();
// create cube with the texture
let cube1 = makeCube(canObj1, 1);
scene.add(cube1);
//-------- ----------
// CANVAS WITH RND BUILT IN DRAW METHOD
//-------- ----------
let canObj2 = canvasMod.create({
    draw:'rnd',
    state: { gSize: 12 },
    palette: ['red', 'lime', 'blue', 'cyan', 'purple', 'orange'] });
let cube2 = makeCube(canObj2, 2);
cube2.position.set(-3, 0, 0);
scene.add(cube2);
//-------- ----------
// CANVAS CUSTOM
//-------- ----------
const opt = {
    size: 64,
    state: {
        rPer: 0.2
    },
    draw: function (canObj, ctx, canvas, state) {
        ctx.fillStyle = canObj.palette[1];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = canObj.palette[0];
        ctx.beginPath();
        const hw = canvas.width / 2, sx = hw, sy = canvas.height / 2,
        radius = hw - hw * state.rPer;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
    }
};
const canObj3 = canvasMod.create(opt);
const cube3 = makeCube(canObj3, 1);
cube3.position.set(0, 0, 2);
scene.add(cube3);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

So for this kind of module design is working okay, but there are still a lot more features that I would like to add to a project such as this. I will want to save a lot of that for a more advanced section in this post, or maybe even a whole other post completely actually. In any case there is more to cover when it comes to advanced topics that revolve around canvas textures so lets get to that.

## 2 - Data textures and canvas textures

The other major option for creating and updating textures with javaScript code in threejs would be [data textures to which I wrote a post on](/2022/04/15/threejs-data-texture/) that you might also want to check out. For the most part I do like to work with canvas elements, but I have to admit that I often do find myself in a situation in which I would like to do something with raw data also. Do not worry to much about having to make a choice one way or the other though as converting between the two is not so hard as I will be touching base on that topic in this section.

### 2.1 - Creating a Canvas Texture from Data texture

To draw the state of a data texture to a canvas texture I can just make use of the [put image data method of the 2d canvas drawing context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData). When doing so I will want to pass the raw image data from the data texture to the ImageData constructor function to get an instance of image data that will work with the put image data method. When calling the put image data method after passing the image data object as the first argument I can then pass additional arguments that have to do with setting the position where drawing will start in the canvas. There are additional options after that which can be used to define an area in the data texture to use as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// DATA TEXTURE
//-------- ----------
const width = 16, height = 16;
const size = width * height;
const data = new Uint8ClampedArray( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4, a = i / size;
    // set r, g, b, and alpha data values
    data[ stride ] = 255 * a;            // red
    data[ stride + 1 ] = 128 - 128 * a;  // green
    data[ stride + 2 ] = 0;              // blue
    data[ stride + 3 ] = 255;            // alpha
}
const texture_data = new THREE.DataTexture( data, width, height );
texture_data.needsUpdate = true;
//-------- ----------
// CANVAS TEXTURE FROM DATA TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
canvas.width = 32;
canvas.height = 32;
// white background
ctx.fillStyle = 'white';
ctx.fillRect(0,0, canvas.width, canvas.height);
// draw box line around edge
ctx.strokeStyle = 'black';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.rect(2, 2, 32 - 4, 32 - 4);
ctx.stroke();
// PUTTING IMAGE DATA FROM DATA TEXTURE
const imgData = new ImageData(texture_data.image.data, 16, 16);
ctx.putImageData(imgData, 8, 8);
const texture_canvas = new THREE.CanvasTexture(canvas);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_canvas
    })
);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 2.2 - Creating a Data Texture from a Canvas Texture

Now that I have covered how to go about creating a canvas texture from a data texture I should also cover how to go about creating a data texture from a canvas texture. The main proper of interest with the canvas texture is the image property that will store a reference to the canvas element. That can then be used to get a referenced to the 2d drawing context and thus the [getImageData method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) that I will want to call to get raw image data from the canvas element. The data property of the resulting image data object can then be passed to the THREE.DataTexture constructor along with the width and height to get a data texture from the canvas image data. I can then do whatever it is that I would like to do to change the state of the texture such as adding noise.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.75, 0.75, 1.5);
camera.lookAt(0, -0.2, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
canvas.width = 32;
canvas.height = 32;
// white background
ctx.fillStyle = 'white';
ctx.fillRect(0,0, canvas.width, canvas.height);
// draw box line around edge
ctx.strokeStyle = 'black';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.rect(2, 2, 32 - 4, 32 - 4);
ctx.stroke();
const texture_canvas = new THREE.CanvasTexture(canvas);
//-------- ----------
// DATA TEXTURE FROM CANVAS 2D CONTEXT
//-------- ----------
const canvasData = texture_canvas.image.getContext('2d').getImageData(0, 0, 32, 32);
const texture_data = new THREE.DataTexture(canvasData.data, 32, 32 );
// Can do somehting to the data like add noise
const data = texture_data.image.data;
let i = 0, len = data.length;
while(i < len){
    let delta = -200 + 300 * Math.random();
    data[i + 0] = data[i + 0] + delta;
    data[i + 1] = data[i + 1] + delta;
    data[i + 2] = data[i + 2] + delta;
    i += 4;
};
texture_data.needsUpdate = true;
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_data
    })
);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 2.3 - Data Texture Sources and rotaiton of that source image

One problem that I can into with put image data method of the 2d canvas drawing context is that it will not respond to the [rotate method](/2019/11/05/canvas-rotate/). That is that the put image data method will not work like the [draw image method](/2019/03/08/canvas-image), or many of the other drawing context methods when it comes to using the usual save, translate, rotate, and restore methods for rotation that drawing context. it would seem that the put image data method will ignore all of that. So then there is the question of how to go about rotating a data texture source to a canvas element, and with that said one trick that worked for me was to draw the data texture to another canvas element, and then use that canvas element as a source for the draw image method, and by doing that I was able to do an on the fly rotation just fine.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// DATA TEXTURE
//-------- ----------
const width = 16, height = 16;
const size = width * height;
const data = new Uint8ClampedArray( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4, a = i / size;
    // set r, g, b, and alpha data values
    data[ stride ] = 255 * a;            // red
    data[ stride + 1 ] = 128 - 128 * a;  // green
    data[ stride + 2 ] = 0;              // blue
    data[ stride + 3 ] = 255;            // alpha
}
const texture_data = new THREE.DataTexture( data, width, height );
texture_data.needsUpdate = true;
//-------- ----------
// CANVAS_DS - canvas element from DATA TEXTURE SOURCE
//-------- ----------
const img_ds = texture_data.image;
const w_ds = img_ds.width;
const h_ds = img_ds.height;
const canvas_ds = document.createElement('canvas'),
ctx_ds = canvas_ds.getContext('2d');
canvas_ds.width = w_ds;
canvas_ds.height = h_ds;
// PUTTING IMAGE DATA FROM DATA TEXTURE
const imgData = new ImageData(img_ds.data, w_ds, h_ds);
ctx_ds.putImageData(imgData, 0, 0);
//-------- ----------
// CANVAS - final canvas texture
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 32;
canvas.height = 32;
// background
ctx.fillStyle = '#004444';
ctx.fillRect(0,0, 32, 32);
ctx.strokeStyle = '#aaaaaa';
ctx.lineWidth = 2;
ctx.strokeRect(2, 2, 28, 28);
// can now draw to this canvas with the canvas_ds canvas
// by using the drawImage method of the 2d context. As such
// I can now use methods like ctx.rotate
ctx.save();
ctx.translate(16, 16);
ctx.rotate(Math.PI / 180 * 45);
ctx.drawImage(canvas_ds, -11, -11, 22, 22);
ctx.restore();
const texture_canvas = new THREE.CanvasTexture(canvas);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_canvas
    })
);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 3 - Canvas module example

For this section I will be writing about the current state of my canvas module that I have made, and am using many of my various video projects including the one that I made for this blog post here. So then I will be writing about the current state of the module itself as of this writing that was r1 of the module, as well as a few demos of it while I am at it.

There is then starting out with the source code of the canvas module that I have thus far. This canvas module features a main create public method that will create and return a canvas object by which I mean a plan old javaScript object with references to a canvas element and 2d context as two of the properties of the object. In addition to this I have a state object that is what I will be using to park values that are used in the draw method that is used to render to the canvas element. Speaking of draw methods I have two built i draw methods to have a way to quickly get started with something at least, and also to serve as examples by which to make custom draw methods. 

Other features of the main canvas object include a palette array as I like to think in terms of a small set of index value colors when making draw methods. Also I have one one but two texture properties one of which is used to store a canvas texture, and the other is used to store a data texture. The reason for this is that I am split in terms of what way I like to update textures using javaScript code so I have both. So then I also have more than one update mode that can be set with an update mode property of the canvas object.

```js
// canvas.js - r2 - from threejs-canvas-texture
(function(api){
    //-------- ----------
    // HELEPRS
    //-------- ----------
    // parse draw option helper
    const parseDrawOption = (opt) => {
        // if opt.draw is false for any reason return DRAW.square
        if(!opt.draw){
            return DRAW.square;
        }
        // if a string is given assume it is a key for a built in draw method
        if(typeof opt.draw === 'string'){
            return DRAW[opt.draw];
        }
        // assume we where given a custom function
        return opt.draw;
    };
    // parse state data objects
    const parseStateData = (canObj, opt) => {
        const data = canObj.state.data
        // all of this only applys to data strings
        if(typeof data != 'string'){
            return;
        }
        // plain data string ex '0,0,0,0,0,0,0,0'
        if(opt.dataParse === 'string'){
            canObj.state.data = data.split(',');
            return;
        }
        // try to use LZString if it is there
        if(opt.dataParse === 'lzstring'){
           try{
               const str = LZString.decompress(data);
               canObj.state.data = str.split(',');
               return;
           }catch(e){
               console.log('some error with lz-string.js');
               console.log(e);
           }
        }
        // try to use LZString if it is there base64 style
        if(opt.dataParse === 'lzstring64'){
           try{
               const str = LZString.decompressFromBase64(data);
               canObj.state.data = str.split(',');
               return;
           }catch(e){
               console.log('some error with lz-string.js');
               console.log(e);
           }
        }
    };
    // draw grid helper for built in draw methods 'grid_palette' and 'rnd'
    const draw_grid_fill = (ctx, canvas, iw, ih, getColor) => {
        getColor = getColor || function(color){ return color };
        const len = iw * ih;
        const pxW = canvas.width / iw;
        const pxH = canvas.height / ih;
        let i = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        while(i < len){
            const x = i % iw;
            const y = Math.floor(i / iw);
            const color = getColor( new THREE.Color(), x, y, i);
            ctx.fillStyle = color.getStyle();
            const px = x * pxW;
            const py = y * pxH;
            ctx.fillRect(px, py, pxW, pxH);
            i += 1;
        }
    };
    //-------- ----------
    // built in draw methods
    //-------- ----------
    const DRAW = {};
    // draw a grid with palette data
    DRAW.grid_palette = (canObj, ctx, canvas, state) => {
        const w =  state.w === undefined ? 16 : state.w;
        const h =  state.h === undefined ? 16 : state.h;
        const data = state.data || [];
        const len = w * h;
        const pxW = canObj.size / w;
        const pxH = canObj.size / h;
        draw_grid_fill(ctx, canvas, w, h, function(color, x, y, i){
            const ci = data[i];
            return color.setStyle( canObj.palette[ci] );
        });
    };
    // random using palette colors
    DRAW.rnd = (canObj, ctx, canvas, state) => {
        let i = 0;
        const gSize =  state.gSize === undefined ? 5 : state.gSize;
        const len = gSize * gSize;
        const pxSize = canObj.size / gSize;
        draw_grid_fill(ctx, canvas, gSize, gSize, function(color, x, y, i){
            const ci = Math.floor( canObj.palette.length * Math.random() );
            return color.setStyle(canObj.palette[ci]);
        });
    };
    // square draw method
    DRAW.square = (canObj, ctx, canvas, state) => {
        const squares = state.squares || [ {
            lw: 1,
            fi: 0,
            si: 1,
            rect: [ 0.5, 0.5, canvas.width - 1, canvas.height - 1 ] } ];
        let i = 0;
        const len = squares.length;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        while(i < len){
            const sq = squares[i];
            ctx.lineWidth = sq.lw === undefined ? 1 : sq.lw;
            ctx.fillStyle = canObj.palette[ sq.fi === undefined ? 0 : sq.fi];
            ctx.strokeStyle = canObj.palette[ sq.si === undefined ? 1 : sq.si ];
            ctx.beginPath();
            ctx.rect.apply(ctx, sq.rect);
            ctx.fill();
            ctx.stroke();
            i += 1;
        }
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // to data texture method
    api.toDataTexture = (canObj) => {
        const canvasData = canObj.ctx.getImageData(0, 0, canObj.size, canObj.size);
        const texture_data = new THREE.DataTexture(canvasData.data, canObj.size, canObj.size );
        texture_data.needsUpdate = true;
        return texture_data;
    };
    // create and return a canvas texture
    api.create = function (opt) {
        opt = opt || {};
        // create canvas, get context, set size
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d', { willReadFrequently: true } );
        opt.size = opt.size === undefined ? 16 : opt.size;
        opt.dataParse = opt.dataParse || 'string'; // parse data strings into arrays 
        canvas.width = opt.size;
        canvas.height = opt.size;
        // create canvas object
        const canObj = {
            texture: null,
            texture_data: null,
            update_mode: opt.update_mode || 'dual',
            size: opt.size,
            canvas: canvas, 
            ctx: ctx,
            palette: opt.palette || ['black', 'white'],
            state: opt.state || {},
            draw: parseDrawOption(opt)
        };
        // parse data strings into arrays
        parseStateData(canObj, opt);
        // create texture object
        canObj.texture = new THREE.CanvasTexture(canvas);
        canObj.texture_data = api.toDataTexture(canObj);
        // update for first time
        api.update(canObj);
        return canObj;
    };
    // update
    const UPDATE = {};
    // update canvas only update mode
    UPDATE.canvas = (canObj) => {
        // update canvas texture
        canObj.draw.call(canObj, canObj, canObj.ctx, canObj.canvas, canObj.state);
        canObj.texture.needsUpdate = true;
    };
    // update canvas AND data texture AKA 'dual' mode ( default for r1 )
    UPDATE.dual = (canObj) => {
        UPDATE.canvas(canObj);
        // update data texture
        const canvasData = canObj.ctx.getImageData(0, 0, canObj.size, canObj.size);
        const data = canObj.texture_data.image.data;
        const len = data.length;
        let i = 0;
        while(i < len){
            data[i] = canvasData.data[i];
            i += 1;
        }
        canObj.texture_data.flipY = true; // need to do this even though it should be the default in r140
        canObj.texture_data.center = new THREE.Vector2(0.5, 0.5);
        canObj.texture_data.needsUpdate = true;
    };
    api.update = (canObj) => {
        UPDATE[canObj.update_mode](canObj);
    };
}( this['canvasMod'] = {} ));
```

### 3.1 - The rnd built in draw method

First off there is starting out with just testing out one of the built in options for drawing to the canvas, such as that rnd method.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 1000);
camera.position.set(0, 1.5, 2.75);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// make cube helper function
const makeCube = (texture, size) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            map: texture || null
    }));
};
//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj2 = canvasMod.create({
    draw:'rnd',
    size: 256,
    update_mode: 'canvas',
    state: {
        gSize: 20
    },
    palette: ['black', 'white', 'cyan', 'lime', 'red', 'blue', 'yellow', 'orange', 'purple']
});
//-------- ----------
// MESH
//-------- ----------
let cube1 = makeCube(canObj2.texture, 2);
cube1.position.set(0, 0, 0);
scene.add(cube1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    //if(Math.floor(frame) % 5 === 0){
        canObj2.state.gSize = 40 - Math.round(38 * b);
        canvasMod.update(canObj2);
    //}
    cube1.rotation.y = Math.PI * 2 * a;
    cube1.rotation.x = Math.PI / 180 * 45 * b;
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
```

### 3.2 - The square build in draw method

Now I am testing out the square built in draw method that also seems to be working okay. The square built in method works by having an array of square objects where each square object contains properties that have to do with setting the location, size and style of each rectangle. In the update method that I made for this example I am creating this array of objects over and over gain, but in other demos I could do something that involves moving squares around rater than just moving them to random locations all over the pace.

I would not want to go to nuts with examples of this square built in draw function, and also I am thinking that mainly I will want to be using custom draw functions for each project, or have an additional module that I use on top of this canvas module in which I define what the draw method is.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 1000);
camera.position.set(0, 2, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// make cube helper function
const makeCube = (texture, size) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            map: texture || null
    }));
};
//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj2 = canvasMod.create({
    draw:'square',
    size: 64,
    update_mode: 'canvas',
    state: {},
    palette: ['black', 'white', 'cyan', 'lime', 'red', 'blue', 'yellow', 'orange', 'purple']
});
//-------- ----------
// MESH
//-------- ----------
let cube1 = makeCube(canObj2.texture, 2);
cube1.position.set(0, 0, 0);
scene.add(cube1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    if(Math.floor(frame) % 5 === 0){
        let i = 0, len = 20;
        canObj2.state.squares = [];
        while(i < len){
            canObj2.state.squares.push({
                lw: 1 + Math.floor(4 * Math.random()),
                si: 0,
                fi: 1 + Math.floor( Math.random() * ( canObj2.palette.length - 1 ) ),
                rect: [
                    Math.random() * (64 - 16),
                    Math.random() * (64 - 16),
                    16,
                    16]
            });
            i += 1;
        }
        canvasMod.update(canObj2);
    }
    cube1.rotation.y = Math.PI * 2 * a;
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
```

### 3.3 - Custom text plane draw method

Last but not least here I have an example in which I have a custom draw function that I am using with the module that was a [starting point for my text plane javaScript module threejs example](/2022/10/14/threejs-examples-text-plane/). I put a whole lot of time into just making the first version of that example, and I have a whole lot of planes for making additional revisions of the project. However there is first starting out with the very basic idea of what I want and that seems to be working well all ready here with just this quick demo of the canvas module.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// TEXT LINES
//-------- ----------
const textLines = [
    '',
    '',
    '',
    'This is just some demo text',
    'for a kind of text plane module',
    'idea that I might get into',
    'it will work with this canvas.js',
    'module that I made.',
    '',
    'It might prove to be a cool',
    'Little project that I will then',
    'start to use in future video projects',
    'as I seem to like to make videos',
    'using threejs.',
    '',
    'I hope that getting this to work does',
    'not end up eating up to much time',
    'as I have way to many ideas for',
    'projects such as this one.',
    '',
    'So far it looks like I need to',
    'figure out how to go about adjusting',
    'some things that have to do with',
    'the rate at which the text is moved',
    ''
];
//-------- ----------
// HELPERS
//-------- ----------
// make plane helper function
const makePlane = (texture, size) => {
    return new THREE.Mesh(
        new THREE.PlaneGeometry(6, 4, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture || null,
            side: THREE.DoubleSide
        })
    );
};
// create an array of text objects to use with the drawText method
// this is a reusable set of objects
const createLines = (rows) => {
    let i = 0;
    const lines = [];
    while(i < rows){
        lines.push({
            text: '#' + i,
            x: 10, y : 30 + 60 * i,
            lw: 2, fc: '', sc: '',
            a: 'left', f: 'arial', fs: '30px', bl: 'top'
        });
        i += 1;
    }
    return lines;
};
// smooth move of lines on the Y
const smoothY = (lines, alpha, sy, dy) => {
    let i = 0;
    const len = lines.length;
    while(i < len){
        const li = lines[i];
        li.y = sy + dy * i - dy * alpha * 1;
        i += 1;
    }
};
// move full set of text lines
const moveTextLines = (lines, textLines, alpha) => {
    linesLen = lines.length;
    const tli = Math.floor( textLines.length * alpha);
    textLines.slice(tli, tli + linesLen).forEach( (text, i) => {
        lines[i].text = text;
    });
    smoothY(lines, alpha * textLines.length % 1, 30, 60);
};
// The custom draw text method to be used with canvas.js
const drawText = (canObj, ctx, canvas, state) => {
    ctx.fillStyle = canObj.palette[0];
    ctx.fillRect(0,0, canvas.width, canvas.height);
    state.lines.forEach((li)=>{
        ctx.lineWidth = li.lw;
        ctx.textAlign = li.a;
        ctx.textBaseline = li.bl;
        ctx.font = li.fs + ' ' + li.f;
        ctx.fillStyle = li.fc || canObj.palette[1] || 'white';
        ctx.strokeStyle = li.sc || canObj.palette[2] || 'white';
        ctx.fillText(li.text, li.x, li.y);
        ctx.strokeText(li.text, li.x, li.y);
    });
};
//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj2 = canvasMod.create({
    draw: drawText,
    size: 512,
    update_mode: 'canvas',
    state: {
       lines : createLines(9)
    },
    palette: ['#002a2a', '#afafaf', '#ffffff']
});
//-------- ----------
// MESH
//-------- ----------
let plane = makePlane(canObj2.texture, 2);
plane.position.set(0, 2, 0);
scene.add(plane);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 60, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 60;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 600;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // using move text lines helper
    moveTextLines(canObj2.state.lines, textLines, b);
    // update canvas
    canvasMod.update(canObj2);
    // update camera
    camera.position.set(-4 * b, 1, 5);
    camera.lookAt(0, 1, 0);
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
```

### 3.4 - Palette Grid built in draw method ( r2 + )

In r2 of the canvas module I added a grid palette draw method that will draw a grid based on palette index data. The index data can be just an array, or a string that can be split into an array. However if I add [lz-string.js](https://github.com/pieroxy/lz-string) to the stack of the project I can also use that which will help to crunch down the size of the data strings.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, -3, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS OBJECT
//-------- ----------
// Base64 strings made with LZString can help to cruch down the string size a lot
let canObj2 = canvasMod.create({
    draw: 'grid_palette',
    size: 512,
    update_mode: 'canvas',
    dataParse: 'lzstring64',
    state: {
       w: 32, h: 32,
       data: 'IwGl7SAYRvYfJiXIjCnJYEwj8oasUaSlhHgSTWXbedvg/ayzbu29106NT0G80TAcP'+
          'FCMkMZInj+zWUvmK5yoQvVqVM7VrJU9Rnrv3Hip82etXbN+3ccPnT1y/dvPIjzdA/'+
          'bfl4BQb4hwf5a6GHKURHasdFyFExxIhRAA'
    },
    palette: ['white', '#004400', '#008800', '#00cc00', '#00ff00']
});
//-------- ----------
// GEO, MATERIAL, MESH
//-------- ----------
const geo = new THREE.PlaneGeometry(10, 10, 1, 1);
geo.rotateX(Math.PI * 1.5);
const material = new THREE.MeshBasicMaterial({ map: canObj2.texture });
const mesh2 = new THREE.Mesh(geo, material);
scene.add(mesh2)
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
renderer.render(scene, camera);
```

## 4 - Animation examples

In this section I will now be going over a few examples that involve having an animation loop and therefor update the state of the canvas elements over time.

### 4.1 - Update example with fog

So because the source is a canvas you might be wondering if it is possible to redraw the canvas and update the texture, making an animated texture. The answer is yes, all you need to do is redraw the contents of the canvas, and set the needsUpdate property of the texture to true before calling the render method of your renderer. In this section I will then be going over a revised version of the source code of the above example where I started working with a module that I can use to create and return an object that contains a reference to the drawing context of the canvas as well as the texture. This time the aim is to get things started when it comes to having a way to draw to the canvas used for the texture over and over again as needed.

```js
//-------- ----------
// CANVAS MODULE
//-------- ----------
(function(api){
    // create and return a canvasObj with texture
    api.createCanvasObject = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const canvasObj = {
            texture: texture,
            canvas: canvas,
            ctx: ctx,
            state: state,
            draw: function(){
                drawFunc.call(state, ctx, canvas, state);
                // making sure I am setting this to true each time
                texture.needsUpdate = true;
            }
        };
        canvasObj.draw();
        return canvasObj;
    };
}( this['canvasMod'] = {} ));
//-------- ----------
// DEMO
//-------- ----------
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, FOG
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const fogColor = new THREE.Color(0xffffff);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.35);
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 100);
    camera.position.set(1.75, 1.75, 1.75);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CANVAS OBJECT
    //-------- ----------
    // state object
    const state = {
       frame: 0,
       maxFrame: 90,
       fps: 30,
       lt: new Date()
    };
    // draw function
    const draw = function(ctx, canvas, state){
        const per = state.frame / state.maxFrame,
        bias = Math.abs(0.5 - per) / 0.5,
        x = canvas.width / 2 * bias;
        y = canvas.height / 2 * bias;
        w = canvas.width - canvas.width * bias;
        h = canvas.height - canvas.height * bias;
        ctx.lineWidth = 3;
        ctx.fillStyle = '#00ff00';
        ctx.strokeStyle = '#ff00ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(x, y, w, h);
    };
    // create canvas obj
    const canvasObj = canvasMod.createCanvasObject(state, draw);
    // filter
    canvasObj.texture.magFilter = THREE.NearestFilter;
    //-------- ----------
    // LIGHT
    //-------- ----------
    const light = new THREE.PointLight();
    light.position.set(0,0.5,0)
    camera.add(light);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                map: canvasObj.texture
            }));
    scene.add(mesh);
    //-------- ----------
    // LOOP
    //-------- ----------
    const loop = function () {
        const now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / state.fps){
            canvasObj.draw();
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame = state.frame % state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
```

So now I have a slightly updated versions of the canvas module, this time the only major difference that is really worth writing about is that I am making sure that I set the needs update property if the texture back to true after each call of the draw function that is returned by the create canvas object public function of the module.

I now just need a little more code to make use of the canvas module, for this I have a state object for the animation, and a custom draw function that I will be used to draw to the canvas over and over again in a loop.

It should go without saying that this will use more overhead compared to a static texture, so I would not go wild with it just yet, but it is pretty cool that I can do this.

### 4.2 - Canvas animations and using more than one texture for a geometry

I have wrote a number of posts on threejs and as such I have [touched based on how to go about using more than one material](/2018/05/14/threejs-mesh-material-index/) with a mesh in threejs a while back all ready. However I am thinning that this is something that also deserves at least one of not more sections in this post also, as this can lead to some interesting projects even by making use of just the built in geometry constructors.

```js
//-------- ----------
// CANVAS MODULE
//-------- ----------
(function(api){
    // create and return a canvasObj with texture
    api.createCanvasObject = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const canvasObj = {
            texture: texture,
            canvas: canvas,
            ctx: ctx,
            state: state,
            draw: function(){
                drawFunc.call(state, ctx, canvas, state);
                // making sure I am setting this to true each time
                texture.needsUpdate = true;
            }
        };
        canvasObj.draw();
        return canvasObj;
    };
    // create a cube the makes use of one or more textures
    api.createCube = function (texture) {
        let materials = [];
        if(texture instanceof Array){
            texture.forEach(function(t){
                t.magFilter = THREE.NearestFilter;
                materials.push(new THREE.MeshStandardMaterial({
                    map: t,
                    side: THREE.DoubleSide
                }));
            });
        }else{
            materials = new THREE.MeshStandardMaterial({
                map: texture
            });
        }
        return new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), materials);
    };
}( this['canvasMod'] = {} ));
//-------- ----------
// DEMO
//-------- ----------
(function () {
    //-------- ----------
    // SCENE, CAMERA, LIGHT, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const light = new THREE.PointLight();
    light.position.set(0, 0, 0)
    camera.add(light);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // STATE, DRAW, CANVAS OBJECT
    //-------- ----------
    const state = {
       frame: 0,
       maxFrame: 300,
       per: 0,
       bias: 0,
       fps: 30,
       lt: new Date()
    };
    const drawBackground = function(ctx, canvas, state){
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#afafaf';
        ctx.strokeRect(0,0, canvas.width, canvas.height);
    };
    // drawBox function
    const drawBox = function(ctx, canvas, state){
        const x = canvas.width / 2 * state.bias, y = canvas.height / 2 * state.bias,
        w = canvas.width - canvas.width * state.bias, h = canvas.height - canvas.height * state.bias;
        drawBackground(ctx, canvas, state);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(x, y, w, h);
    };
    const drawCircle = function(ctx, canvas, state){
        ctx.lineWidth = 3;
        drawBackground(ctx, canvas, state);
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(
           canvas.width / 2, canvas.height / 2,
           32 * state.bias,
           0, Math.PI * 2
        );
        ctx.stroke();
    };
    // create canvas objs
    const canvasObjBox = canvasMod.createCanvasObject(state, drawBox);
    const canvasObjCircle = canvasMod.createCanvasObject(state, drawCircle);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = canvasMod.createCube([
        canvasObjBox.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,
        canvasObjCircle.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,]);
    scene.add(mesh);
    //-------- ----------
    // LOOP
    //-------- ----------
    const loop = function () {
        const now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / state.fps){
            state.per = state.frame / state.maxFrame * 4 % 1,
            state.bias = 1 - Math.abs(0.5 - state.per) / 0.5;
            canvasObjBox.draw();
            canvasObjCircle.draw();
            mesh.rotation.y = Math.PI * 2 * (state.per / 4 % 1);
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame = state.frame % state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
```

Once again I have a canvas module that will be used to create a object that will contain a reference to a texture, as well as all the other objects that I will want to grab at such as the canvas element, and drawing context. One major change from the other revisions of this module in the other sections thus far is the create cube method that will allow for me to create a cube with an array of materials rather than just one.

I then have the main javaScript file for this example in which I am not creating two canvas objects that use two difference draw methods to update the state of the canvas. One canvas object makes use of a draw method that will draw a animated square, while the other is a circle. I can then use the create cube method of the canvas module to set what texture to what side of the cube.
What is great about using built in geometry constructors like the THREE.BoxGeomety constructor is that the groups that are used to achieve this are all ready set up for me. Things can get a little involved with this sort of thing when it comes to making custom geometry by working with the buffer geometry constructor directly.

## Conclusion

That about does it when it comes to the basics, and a little beyond just the basics at least when it comes to using canvas elements to create textures in three.js. Of course there is much more to write about when it comes to working with textures, maps, materials, and [material index values](/2018/05/14/threejs-mesh-material-index/) but maybe all of those things are matters for other posts on three.js.

This is a post that I do come around to edit now and then, and with that said it is only a matter of time until I get around to expanding this post even more when it comes to this topic.
