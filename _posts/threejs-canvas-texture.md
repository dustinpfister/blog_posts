---
title: Using a Canvas element as a Texture in three.js
date: 2018-04-17 09:33:00
tags: [js,canvas,three.js,animation]
layout: post
categories: three.js
id: 177
updated: 2022-04-20 14:42:51
version: 1.91
---

There are many situations in which I will want to have a texture to work with when it comes to making some kind of project with [three.js](https://threejs.org/), as there are a number of ways to add textures to a material. That is that when it comes to the various kinds of maps there are to work with in a material, such as color maps, alpha maps, [emissive maps](/2021/06/22/threejs-emissive-map/), and so forth. One way to add a texture to a material would be to use the built in texture loader in the core of the threejs library, if I have some other preferred way to go about loading external images I can also use the THREE.Texture constructor directly to create a texture object from an Image object. 

However there is also the question of how to go about generating textures using a little javaScript code, and one way to go about creating a texture this way would be with a [canvas element](/2017/05/17/canvas-getting-started/), the 2d drawing context of such a canvas element, and the [THREE.CanvasTexture](https://threejs.org/docs/#api/en/textures/CanvasTexture) constructor. It is also possible to use the plain old THREE.Texture constructor also by just setting the needs update property of the texture to true.

So canvas elements are a nice way to get started with textures in three.js that involves the use of additional javaScript code rather than loading extremal binary image files. Maybe in the long run that is just what will need to happen if I need to do something with a lot of textures, but if it is just a few, and I keep them low res, a canvas might still work okay. Also because I am creating textures with code, this allows be to create textures that are the result of some kind of pure function, or [stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) rather than a fixed static image. I can update the state of this texture by just drawing to the canvas element again and updating the texture object instance. So there is just more to be gained from making textures this way, but it still should generally only be used in situations in which doing so might be called for.

There is a whole lot of ground to cover when it comes to getting into this sort of thing if you do not have much experience working with canvas elements yet. The process of creating a texture with a canvas element is simple enough when it comes to the fact that I just need to pass the canvas element to a constructor function and the desired texture object is returned bu such a constructor. However there are a whole bunch of other topics that branch off from this that have to do with canvas elements in detail, the various ways to go about drawing to canvas elements, and all kinds of other interesting directions. In this post I am mainly just going to be writing about using the built in constructors to create a texture with a canvas element, I might not get into detail about the 2d drawing context, but of course I wil have to touch base on it to say the least, along with all kinds of other various topics that come up to using threejs on top of native canvas elements.

<!-- more -->

## Canvas textures in threejs, and what to know first

In this post I will be going over a lot of source code examples that have to do with using the javaScript library known as threejs, along with various client side javaScript features. This is then not any [kind of getting started type post with threejs](/2018/04/04/threejs-getting-started/), or with [javaScript in general](/2018/11/27/js-getting-started/) for that matter. So I assume that you have at least some background with the basics of threejs, and client side javaScript development in general. 

Regardless of what your level of experience is with threejs and javaScript, in this section I will be going over a few things that you should be up to speed with at this point before continuing to read the rest of this post.

<iframe class="youtube_video" src="https://www.youtube.com/embed/wy5cQ_cwqEo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### The source code examples here can be found on Github

The [source code examples in this post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-canvas-texture) can be found in my test threejs repo, along with all the other examples of all the [other posts I have wrote on threejs thus far](/categories/three-js/). This is a repository that I keep working on a little fairly often when it comes to writing new content on threejs, as well as editing older content such as this post which I have edited many times thus far. If there is something that does not sit right with you about the source code examples here, there is making a comment in this post, but if you want to make a pull request my test threejs repo is where to go about doing that.

### Version numbers matter with threejs

When I first wrote this post I was using threejs version r91, and the last time I came around to do a little editing I was using r135. I do make an effort to come around and edit my threejs posts now and then to fix anything that might brake in late versions of threejs. The library still moves pretty fast in terms of development compared to other projects where progress is kind of slow, so always be mindful of the version of threejs that is being used and how old content on the web might be.

### Start With just a quick canvas element and drawing to the 2d context

I order to use a canvas as a texture I will of course need a reference to a canvas element, and I will also want to have something drawn on the canvas element. One way to create a canvas element would be to use the document.createElement method in client side javaScript to create and return a new canvas element object. The resulting canvas element does not have to be appended to the hard coded HTML, I just need to have one to give to the Canvas Texture constructor to create a texture object. 

As for drawing to the canvas element I am going to need to get a reference to the [2d drawing context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) of the canvas element, and use the various methods of that context to draw to the canvas. Covering every little detail with this part of the process of creating canvas textures in threejs is naturally beyond the scope of this post. I have a [whole other collection of posts](/categories/three-js/) that have to do with just canvas elements alone, including a [canvas examples mega post](/2020/03/23/canvas-example/) in which I link to the many canvas examples that I have made thus far over the years. I will cover a quick basic hello world type example here, and cover some more examples in the rest of the content of this post.

The width and height values should be a base 2 number such as 8, 16, 32 and so forth else you might get webGl errors in the console. Aside from that concern so far it seems like you can just create and draw to a simple plane old canvas element like normal with the various context methods as with any other canvas project. So say you just want to start out with something very simple, just use the canvas 2d drawing context to create a texture that is just a square. In which case I might get together something where I just create the canvas, get a reference to the context, set the size, then use the fill style property, stroke style property, fill rect method, and stroke rect method.

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

### Creating a texture with canvas using THREE.CanvasTexture or just THREE.Texture

Although The base Texture class can be used to create a texture that uses a canvas, there is a constructor for this purpose called THREE.CanvasTexture. The only difference is that it would appear that the needs udate boolean of the texture is set to true by default. In any case you just pass the reference to the canvas \(not it's drawing context\) to the constructor that is used as the first argument.

So then simply put something like this:

```js
var texture = new THREE.CanvasTexture(canvas);
```

Seems to have the same effect as doing this:

```js
var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
```

In any case you now have both a canvas, a drawing context for that canvas, and a texture made from that canvas that can now be used in a material that can make use of that texture. Regardless of what constructor you use the needs update boolean is of interest as even if it is set to true by default, you will want to set it true again each time you want the texture updated. I will be getting into this more in detail in the section that has to do with having an animated canvas texture.

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

## 1 - Basic Full Demo

So now that I have all the basics that should be solid before hand I can now move on to starting out with a basic example of using canvas elements to create a texture. In this demo I will set up a scene object, add a camera, and a renderer just like any other basic threejs code example. On top of that I will also want to add at least one mesh object and set it away from a the position of the camera. For now the Mesh object will make use of the box geometry constructor that I often used for these kinds of examples, and I will also be using the basic material as for now I am thinking I will just use a canvas element to create a simple color map.

In this example I will just be rendering the box once, and be done with it just to show that you can use a canvas to make a static texture. This is a basic example after all, so I will be getting to more advanced examples that have to do with animation later on in this post.

### 1.1 - A create canvas texture helper method

I started out with a helper method that just returns a texture that is created with the THREE.CanvasTexture constructor that I can then go an use with a material. This way I am doing everything in the body of just one function when it comes to the whole process of creating an returning the texture with a canvas element. This involves creating the canvas element, setting the side of the element, and drawing to the canvas. In later sections of this post I will be getting into more advanced forms of this method when it comes to making an actual module of some kind.

```js
// create and return a canvas texture
var createCanvasTexture = function () {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(2.5, 2.5, canvas.width - 4, canvas.height - 4);
    var texture = new THREE.CanvasTexture(canvas);
    return texture;
};
```

Now that I have a simple method that does everything that I want for this basic canvas texture example I will now just want some additional code that makes use of this method such as some kind of create mesh type object. I will then just need some additional code that has to do with all the other usual suspects when it comes to a basic threejs example.

### 1.1 - Create a cube helper

I then have another helper that makes use of the create canvas texture helper by calling it and using the resulting texture that is returned for the map property of the basic material that is used for a mesh. The map property is how to go about making just a simple color map, and with the basic material it is more or less only this map that is of interest when it comes to adding some texture to a mesh. There might be some exceptions to that actually, but the basic material is not like other more advance materials that respond to light sources. 

```js
// create a cube the makes use of a canvas texture
var createCube = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: createCanvasTexture()
        }));
};
```

I then just use the box geometry constructor for the geometry of the mesh, and return the mesh object. So then with this method object the resulting texture will be on all the faces of the geometry, rather than making a different texture for each of the sides of the cube.

### 1.2 - The rest of the full threejs example that involves a canvas texture

With my simple helper functions all set and done I will now just need to create and set up the usual suspects when it comes to any other threejs project. In order words I will want to have a scene object, camera, and renderer to make use of these helper functions. So I create my scene object with the THREE.Scene constructor, and I also like to add a grind helper to the scene with many of my examples these days also. Next I just want to set up an instance of the usual perspective camera, be sure to position it alway from where I am going to place a mesh object, and have the camera look at the location of the mesh object.

```js
// Scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
 
// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
 
// add cube to scene that makes use
// of the canvas texture
scene.add(createCube());
 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

I then call my create cube constructor to create and return a mesh object, that is also using a canvas texture for the color map, and add that to the scene. After that I just need to create an instance of a renderer, and then use that renderer to draw the scene with the camera using the render function.

When this basic example is up and running the result is a cube with a texture created with the 2d canvas drawing context on each of the faces of the cube. So the basic idea of creating a texture with a canvas element is there, however there is a lot more to cover when it comes to this. There is a whole lot to cover when it comes to having more than one material for the geometry, or messing around with the uv values. However when it comes to staying on topic with canvas textures alone for one thing there is how to go about having an animated canvas texture, and also I am going to want to have a draw to use a custom raw function for a canvas too. So now that I have the basic example out of the way lets move on to some more advanced examples.

## 2 - Create canvas helper with a custom draw method

In this section I will be writing about an example that makes use of a slightly more advanced revision of the create canvas helper that I made for the first basic example for this post. This method accepts a custom draw method that can be used to draw something else for the texture that is created. The draw method given is also called within a draw method that is part of a kind of canvas object that is returned by the helper function also. So now the helper does not return a texture, but an object that has a texture as one of the properties. Doing something like this strokes me as a necessary step when it comes to making some kind of canvas module built on top of threejs and native javaScript as when it comes to getting into updating the content of the canvas I am going to want references to the canvas element, and drawing context at the ready.

### 2.1 - A Canvas.js module

Things are starting to get a little cluttered so for this example I will create an external jaavScript file called canavsmod.js, and place all these custom helpers and methods there. The main public method of interest with this module is the method that I will be using to create and return my custom canvas object, the other methods as of this writing have to do with creating and returning a mesh object that uses the texture, and having one or more default draw methods ready work with.

```js
(function(api){
 
    api.draw = function (ctx, canvas) {
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };
 
    // create and return a canvas texture
    api.createCanvasTexture = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var canvasObj = {
            texture: texture,
            canvas: canvas,
            ctx: ctx,
            state: state,
            draw: function(){
                drawFunc.call(state, ctx, canvas, state);
            }
        };
        canvasObj.draw();
        return canvasObj;
    };
 
    // create a cube the makes use of a canvas texture
    api.createCube = function (texture) {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: texture
            }));
    };
 
}( this['canvasMod'] = {} ));
```

### 2.2 - The rest of the example

So now to use my canvas.js module in an example. Here I just made two cubes for the scene one that makes used of the default draw method, and anther where I am passing a custom draw method.

```js
// Scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
 
// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 1);
 
// create texture with default draw method
var canvasObj = canvasMod.createCanvasTexture();
 
var cube = canvasMod.createCube(canvasObj.texture);
scene.add(cube);
 
// create texture with custom draw method that makes use of a state object
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    var hw = canvas.width / 2,
    sx = hw,
    sy = canvas.height / 2,
    radius = hw - hw * state.rPer;
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();
};
var state = {
   rPer: 0.1
};
var canvasObj = canvasMod.createCanvasTexture(state, draw);
cube = canvasMod.createCube(canvasObj.texture);
cube.position.set(0, 0, 2)
scene.add(cube);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Animation

So because the source is a canvas you might be wondering if it is possible to redraw the canvas and update the texture, making an animated texture. The answer is yes, all you need to do is redraw the contents of the canvas, and set the needsUpdate property of the texture to true before calling the render method of your renderer. In this section I will then be going over a revised version of the source code of the above example where I started working with a module that I can use to create and return an object that contains a reference to the drawing context of the canvas as well as the texture. This time the aim is to get things started when it comes to having a way to draw to the canvas used for the texture over and over again as needed.

### 3.1 - The canvas module.

So now I have a slightly updated versions of the canvas module, this time the only major difference that is really worth writing about is that I am making sure that I set the needs update property if the texture back to true after each call of the draw function that is returned by the create canvas object public function of the module.

```js
(function(api){
    // create and return a canvasObj with texture
    api.createCanvasObject = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var canvasObj = {
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
 
    // create a cube the makes use of a canvas texture
    api.createCube = function (canvasObj) {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: canvasObj.texture
            }));
    };
 
}( this['canvasMod'] = {} ));
```

### 3.2 - The main JavaScript file

I now just need a little more code to make use of the canvas module, for this I have a state object for the animation, and a custom draw function that I will be used to draw to the canvas over and over again in a loop.

```js
(function () {
    // state object
    var state = {
       frame: 0,
       maxFrame: 90,
       fps: 30,
       lt: new Date()
    };
    // draw function
    var draw = function(ctx, canvas, state){
        var per = state.frame / state.maxFrame,
        bias = Math.abs(0.5 - per) / 0.5,
        x = canvas.width / 2 * bias;
        y = canvas.height / 2 * bias;
        w = canvas.width - canvas.width * bias;
        h = canvas.height - canvas.height * bias;
        ctx.lineWidth = 3;
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ff00ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(x, y, w, h);
    };
    // create canvas obj
    var canvasObj = canvasMod.createCanvasObject(state, draw);
    // filter
    canvasObj.texture.magFilter = THREE.NearestFilter;
    // SCENE
    var scene = new THREE.Scene();
    fogColor = new THREE.Color(0xffffff);
    scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 0.0025, 20);
    scene.fog = new THREE.FogExp2(fogColor, 0.1);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    // using create cube method
    var mesh = canvasMod.createCube(canvasObj);
    scene.add(mesh);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // Loop
    var loop = function () {
        var now = new Date(),
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

It should go without saying that this will use more overhead compared to a static texture, so I would not go wild with it just yet, but it is pretty cool that I can do this.

## 4 - Canvas animations and using more than one texture for a geometry

I have wrote a number of posts on threejs and as such I have [touched based on how to go about using more than one material](/2018/05/14/threejs-mesh-material-index/) with a mesh in threejs a while back all ready. However I am thinning that this is something that also deserves at least one of not more sections in this post also, as this can lead to some interesting projects even by making use of just the built in geometry constructors.

### 4.1 - The canvas module

Once again I have a canvas module that will be used to create a object that will contain a reference to a texture, as well as all the other objects that I will want to grab at such as the canvas element, and drawing context. One major change from the other revisions of this module in the other sections thus far is the create cube method that will allow for me to create a cube with an array of materials rather than just one.

```js
(function(api){
    // create and return a canvasObj with texture
    api.createCanvasObject = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var canvasObj = {
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
        var materials = [];
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
```

### 4.2 - The main javaScript file

I then have the main javaScript file for this example in which I am not creating two canvas objects that use two difference draw methods to update the state of the canvas. One canvas object makes use of a draw method that will draw a animated square, while the other is a circle. I can then use the create cube method of the canvas module to set what texture to what side of the cube.

```js

(function () {
    // SCENE, CAMERA, LIGHT, RENDERER
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var light = new THREE.PointLight();
    light.position.set(0, 0, 0)
    camera.add(light);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // state object
    var state = {
       frame: 0,
       maxFrame: 300,
       per: 0,
       bias: 0,
       fps: 30,
       lt: new Date()
    };
    var drawBackground = function(ctx, canvas, state){
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#afafaf';
        ctx.strokeRect(0,0, canvas.width, canvas.height);
    };
    // drawBox function
    var drawBox = function(ctx, canvas, state){
        var x = canvas.width / 2 * state.bias, y = canvas.height / 2 * state.bias,
        w = canvas.width - canvas.width * state.bias, h = canvas.height - canvas.height * state.bias;
        drawBackground(ctx, canvas, state);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(x, y, w, h);
    };
    var drawCircle = function(ctx, canvas, state){
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
    var canvasObjBox = canvasMod.createCanvasObject(state, drawBox);
    var canvasObjCircle = canvasMod.createCanvasObject(state, drawCircle);
    // using create cube method
    var mesh = canvasMod.createCube([
        canvasObjBox.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,
        canvasObjCircle.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,]);
    scene.add(mesh);
    // Loop
    var loop = function () {
        var now = new Date(),
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

What is great about using built in geometry constructors like the THREE.BoxGeomety constructor is that the groups that are used to achieve this are all ready set up for me. Things can get a little involved with this sort of thing when it comes to making custom geometry by working with the buffer geometry constructor directly.

## 5 - Conclusion

That about does it when it comes to the basics, and a little beyond just the basics at least when it comes to using canvas elements to create textures in three.js. Of course there is much more to write about when it comes to working with textures, maps, materials, and [material index values](/2018/05/14/threejs-mesh-material-index/) but maybe all of those things are matters for other posts on three.js.

This is a post that I do come around to edit now and then, and with that said it is only a matter of time until I get around to expanding this post even more when it comes to this topic.

