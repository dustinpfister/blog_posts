---
title: Using a Canvas element as a Texture in three.js
date: 2018-04-17 09:33:00
tags: [js,canvas,three.js,animation]
layout: post
categories: three.js
id: 177
updated: 2018-04-17 10:36:42
version: 1.4
---

So far I have not written any posts on textures with my [three.js](https://threejs.org/) collection of posts, so lets put and end to that today. In three.js you have a Scene, and in that scene you place things like cameras, and other Objects like a Mesh that is composed of a Geometry, and a Material. When we look at Materials in depth they are composed of many properties, some of which are part of the base Material class, and others are part of the specific Material such as the Basic Material, or Lambert Material. Properties such as map, and emissiveMap that expect a Texture, which is an image that can be used to define how the surface is going to look. 

The Image used to define a Texture can be loaded from an external source such as a \*png image, but it can also be defined with javaScript, by making something with canvas, and then using that as an Image source. This is useful to help make projects that do not depend an an extremal source aside from three.js, or to make dynamic animated textures.

<!-- more -->

## Start With just a quick simple Canvas Example

I order to use a canvas as a texture we will of course need an instance of a canvas that can be created with document.createElement. The dom element does not have to be appended to the HTML, we just need to have one to give to the Texture constructor. The width and height values should be a base 2 number such as 8, 16, 32 and so forth else you might get webGl errors in the console. aside from that so far it seems like you can just create a simple plane old canvas element like normal using the 2d drawing context.

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

Once you have a canvas it can be used to create a texture.

## Creating a texture with canvas

Although The base Texture class can be used to create a texture that uses a canvas, there is a constructor for this purpose called THREE.CanvasTexture. The only difference is that it would appear that the needsUpdate boolean of the texture is set to true by default. In any case you just pass the reference to the canvas (not it's drawing context) to the constructor that use use as the first argument.

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

## Using the texture with a Material

I will not get into this in depth, as this matter can quickly become a whole new post when it comes to using a texture with a Material. However a quick example involving the basic material is in order for sure to say the least.

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

## Full Demo

Once you have the canvas, texture, and material we can go on with everything else as normal. In this demo I will set up a scene, add a camera and set it away from a the origin where I will be placing a simple Mesh with the simple box geometry that is often used for these kinds of examples.

In this example I will just be rendering the box once and be done with it just so show that you can use a canvas to make a static texture, more on animation later.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // CANVAS
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    canvas.width = 8;
    canvas.height = 8;
 
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
 
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
 
    // MATERIAL
    var material = new THREE.MeshBasicMaterial({
            map: texture
        });
 
    // MESH
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
}
    ());
```

Notice that I set the needs update property of the texture to true. As I mentioned earlier this does not need to be set true if I where to use the CanvasTexture constructor, if I am just doing something like this in which I am not redrawing the canvas this only needs to be set true once.

## Animation

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