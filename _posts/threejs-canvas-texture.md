---
title: Using a Canvas element as a Texture in three.js
date: 2018-04-17 09:33:00
tags: [js,canvas,three.js,animation]
layout: post
categories: three.js
id: 177
updated: 2021-06-27 12:36:04
version: 1.40
---

There are many situations in which I will want to have a texture to work with when it comes to making some kind of project with [three.js](https://threejs.org/), as there are a number of ways to add textures to a material. That is that when it comes to the various kinds of maps there are to work with in a material, I need a texture to use with the map. One way to add a texture to a material would be to use the built in texture loader in the core of the threejs library, if I have some other preferred way to go about loading external images I can also use the THREE.texture constructor to create a texture object from an image. However there is also the question of how to go about generating textures using a little javaScript code, and one way to go about creating a texture this way would be with a canvas element and the THREE.CanvasTexture constructor. 

So canvas elements are a nice way to get started wit textures in three.js that involves just additional javaScript code rather than loading extremal binary image files. Maybe in the long run that is just what will need to happen if we are taking about a lot of textures, but if it is just a few, and I keep them low res, a canvas might still work okay. So then with just a little javaScript code I can start playing around with various types of maps in three.js such as a basic color map, emissive maps, alpha maps, and many more.

When we look at Materials in depth they are composed of many properties, some of which are part of the base Material class, and others are part of the specific Material such as the Basic Material, or Lambert Material. Properties such as map, and emissiveMap that expect a Texture, which is an image that can be used to define how the surface is going to look. With the basic material it is just a basic color map for the most part that is of interest, while with the Lambert material there are some additional maps that have to do with light.

The Image used to define a Texture can be loaded from an external source such as a \*png image, but it can also be defined with javaScript, by making a canvas element, drawing to the canvas element with the 2d drawing context, and then using that as an Image source for a texture. This is useful to help make projects that do not depend an an extremal source asset aside from three.js.  However another great bonus with canvas is that the texture can be updated over time, or by way of some kind of event or condition, so it is a way to make dynamic animated textures that can be [stochastic in nature](https://en.wikipedia.org/wiki/Stochastic_process) which would be hard, or resource consuming, or just not possible to do with static image file assets.

The main three.js constructor of interest with this is the [CanvasTexture](https://threejs.org/docs/#api/en/textures/CanvasTexture) constructor, however the plain old Texture constructor can be used also by just setting one little property value for the texture after it is created. Both constructors can be used by just passing a reference to the canvas element that is to be used for the texture. There are a few things to be aware of there and there though, so in this post I will be trying to cover everything that I have become aware of with canvas elements and textures in three.js.

<!-- more -->

## 1 - Getting started with threejs and canvas for textures

In this post I will be going over a lot of source code examples that have to do with using canvas elements as a way to create textures to be used to skin one more more mesh objects in the javaScript library known as threejs. This is then not any [kind of getting started type post with threejs](/2018/04/04/threejs-getting-started/), or javaScript in general. However in this section I will be going over the basics of using canvas to create a texture before getting into some more advanced examples involving the basic material, standard material and so forth. I will also be going over a few other things that you should be up to speed with at this point before continuing.

### 1.1 - Start With just a quick canvas element and drawing to the 2d context

I order to use a canvas as a texture we will of course need an instance of a canvas that can be created with document.createElement. The dom element does not have to be appended to the HTML, we just need to have one to give to the Texture constructor. 

The width and height values should be a base 2 number such as 8, 16, 32 and so forth else you might get webGl errors in the console. Aside from that concern so far it seems like you can just create and draw to a simple plane old canvas element like normal using the 2d drawing context. The resulting image created with the drawing context and javaScript code can then be used as your texture from things like the map property of a material.

So say you just want to start out with something very simple, just use the canvas 2d drawing context to create a texture that is just a square. In which case you might get together something like this:

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

So I created a canvas, set the size of it to something that is a base 2 number, and drawn something to it. Great now I have the easy part out of the way, I am now ready to use it to passed it as an argument to a threejs constructor that will return a texture that I can the use in a material that I can then use with a mesh.

### 1.2 - Creating a texture with canvas using THREE.CanvasTexture or just THREE.Texture

Although The base Texture class can be used to create a texture that uses a canvas, there is a constructor for this purpose called THREE.CanvasTexture. The only difference is that it would appear that the needsUpdate boolean of the texture is set to true by default. In any case you just pass the reference to the canvas \(not it's drawing context\) to the constructor that use use as the first argument.

So then this:
```js
var texture = new THREE.CanvasTexture(canvas);
```

Seems to have the same effect as doing this:.
```js
var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
```

In Any case you now have both a canvas, a drawing context for that canvas, and a texture made from that canvas that can now be used in a Material that can make use of that texture. Regardless of what constructor you use the needUpdate boolean is of interest as even if it is set to true by default, you will want to set it true again each time you want the texture updated, more on that later.

### 1.3 - Know your options when it comes to materials and maps

It is impotent to note that the properties of materials will differ from one to another, the [basic material](/2018/05/05/threejs-basic-material/) does not do anything with light but other materials do. For example in the [standard material](/2021/04/27/threejs-standard-material/) I would want to use the emissive property of the material to define a texture that will always emit light even if there is not light source.

### 1.4 - Using the texture with a Material

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

### 1.5 - There is also loading external images, and dae files with textures

Using canvas elements might be fun, but I am more of the mind set that I should just use static image files to skin objects these days. When doing so there is the [built in texture loader in threejs](/2021/06/21/threejs-texture-loader/) that is one way to go about loading an external image, and create a texture with that image. However if you have a preferred way to go about loading one or more images in a client side javaScript project another option would be to use the THREE.Texture constructor directly. However there is also yet even another option that I think is the best so far when it comes to starting to create external assets with a program like blender and that is to [have dae files with external textures](/2021/06/25/threejs-examples-dae-tools/) that also need to be loaded with them.

### 1.6 - Version numbers matter with threejs

When I first wrote this post I was using threejs version r91, and the last time I came around to do a little editing I was using r127.

## 2 - Basic Full Demo

Once you have the canvas, texture, and material we can go on with everything else as normal. In this demo I will set up a scene, add a camera and set it away from a the origin where I will be placing a simple Mesh with the simple box geometry that is often used for these kinds of examples.

In this example I will just be rendering the box once and be done with it just so show that you can use a canvas to make a static texture, more on animation later.

### 2.1 - A create canvas texture helper method

I started out with a helper method that just returns a texture that is ready to use with a material. In this helper I create a canvas element, get the drawing context, and draw to it. In then used to THREE.Texture constructor to create the texture by just passing the canvas element as the first argument when calling it. I then set the needs update flag to true, and return the texture.

```js
// create and return a canvas texture
var createCanvasTexture = function () {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};
```

### 2.1 - create a cube helper

I then have another helper that makes use of the create canvas texture helper by calling it and using the resulting texture that is returned for the map property of the basic material that is used for a mesh. I then just use the box geometry constructor for the geometry of the mesh, and return the mesh.

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

So when putting together a scene I just need to call this method, and then I have a mesh that is all set to be added to a scene.

### 2.2 - The rest of the full threejs example that involves a canvas texture

So now to make use of my create cube, and thus create canvas texture helpers.

```js
// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);

// add cube to scene that makes use
// of the canvas texture
scene.add(createCube());

// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

Notice that I set the needs update property of the texture to true. As I mentioned earlier this does not need to be set true if I where to use the CanvasTexture constructor, if I am just doing something like this in which I am not redrawing the canvas this only needs to be set true once.

## 3 - Create canvas helper with a custom draw method

In this section I will be writing about an example that makes use of a slightly more advanced revision of the create canvas helper that I made for the first example for this post. This method accepts a custom draw method that can be used to draw something else for the texture that is created.

### 3.1 - A Canvas.js module

Things are starting to get a little cluttered so for this example I will create an external jaavScript file called canavs.js and place all these custom helpers and methods there.

```js
var can3 = {};

can3.draw = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
}
 
// create and return a canvas texture
can3.createCanvasTexture = function (draw) {
    draw = draw || can3.draw;
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    draw(ctx, canvas);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};
 
// create a cube the makes use of a canvas texture
can3.createCube = function (texture) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture
        }));
};
```

### 3.2 - The rest of the example

So now to use my canvas.js module in an example. Here I just made two cubes for the scene one that makes used of the default draw method, and anther where I am passing a custom draw method.

```js
// Scene
var scene = new THREE.Scene();
 
// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
 
// create texture with default draw method
var texture = can3.createCanvasTexture();
var cube = can3.createCube(texture);
scene.add(cube);
 
// create texture with custom draw method
texture = can3.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + 0.5, canvas.height / 2 + 0.5, canvas.width / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
    });
cube = can3.createCube(texture);
cube.position.set(0, 0, 2)
scene.add(cube);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 4 - Animation

So because the source is a canvas you might be wondering if it is possible to redraw the canvas and update the texture, making an animated texture. The answer is yes, all you need to do is redraw the contents of the canvas, and set the needsUpdate property of the texture to true before calling the render method of your renderer.

Something like this:

```js
    // Loop
    var frame = 0,
    maxFrame = 500,
    loop = function () {
 
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        x = canvas.width / 2 * bias;
        y = canvas.height / 2 * bias;
        w = canvas.width - canvas.width * bias;
        h = canvas.height - canvas.height * bias;
 
        requestAnimationFrame(loop);
 
        ctx.lineWidth = 3;
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ff00ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(x, y, w, h);
 
        controls.update();
        texture.needsUpdate = true;
        renderer.render(scene, camera);
 
        frame += 1;
        frame = frame % maxFrame;
 
    };
 
    loop();
```

It should go without saying that this will use more overhead compared to a static texture, so I would not go wild with it just yet, but it is pretty cool that I can do this.

## 5 - Conclusion

That about does it when it comes to the basics at least when it comes to suing canvas elements to create textures in three.js. Of course there is much more to write about when it comes to working with textures, maps, materials, and [material index values](/2018/05/14/threejs-mesh-material-index/) but maybe all of those things are matters for other posts on three.js.

There are also a lot more to write about when it comes to drawing to a canvas elements that is to be used as a texture also. However all of that is also mainly a matter for another post, or even a collection of posts on canvas. With that said I have  [getting started post on canvas](/2017/05/17/canvas-getting-started/), and also a post in which I am listing all the [canvas project example type posts](/2020/03/23/canvas-example/) that I have made thus far.

