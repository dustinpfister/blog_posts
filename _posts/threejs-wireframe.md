---
title: Wire frames in threejs the basic material and custom canvas solutions
date: 2019-12-19 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 584
updated: 2022-08-03 10:34:55
version: 1.40
---

It is often desirable to set a material into a [wire frame](https://en.wikipedia.org/wiki/Wire-frame_model) type mode so that just the basic form of the object is apparent without any faces rendered. Many materials in threejs such as the [Basic material](/2018/05/05/threejs-basic-material/) have a [wire frame property](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.wireframe) that when set to true will render the mesh in as a wire frame. The built in wire frame mode will work okay for the most part, but many might not care for the look of it, so there is a need to look for [additional ways to create a wire frame such as using the line material with a custom geometry](https://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges). This alternative to the wire frame mode of materials will work fine most of the time, but another solution might involve creating custom textures using canvas elements or data textures that can then be applied to another property of a material such as the map property.

This post will be on wire frame mode of various materials in threejs, the basic use of the property of most materials that just involves setting a boolean value to true. Sense setting a material into wire frame mode just involves setting a boolean to true, for the sake of having something more to write about I could also take a moment to get into some more complex solutions that will take a bit more to get working. These alternatives to the wire frame mode of materials will result in a similar effect, but with some kind of added benefit when it comes to creating some kind of style when making a final product with a wire frame kind of look.

<!-- more -->

## Wire frame mode of a material in three.js and what to know first

This is a post on wire frames in three.js which is a javaScript library for working with 3d modeling. This is not a [getting started type post on three.js](/2018/04/04/threejs-getting-started/) as well as many addition skills that might be needed in order to gain something of value from reading this. Still I will take a moment at least in this section to outline some things to brush up on first before making use of wire frame mode, as well as other ways of having a wire frame like look when it comes to making textures.

### Know your materials

The wire frame option is one of many options of various materials that support a wire frame mode. If you have not gone over the [various options with materials](/2018/04/30/threejs-materials/) then that is something that you should take a moment to look over when you get a moment. For most of my examples that I make for my various posts on threejs I often like to go with the [standard material](/2021/04/27/threejs-standard-material/) as it is a good all around material for most use cases. However as far as the built in wire frame mode is concerned a material option that does not respond to light such as the basic of normal material will work just fine. 

Still looking into the other options is very much called for depending on a rage of factors such as making the choice of using a light source or not. When it comes to the subject of light with wire frame mode it might not matter that much, but with some of the alternative solutions that have to do with making textures it will matter if I go with the map property and the standard material.


### Version Numbers matter with three.js

When I first wrote this post I was using r111 of three.js, and the last time I cam around to do a little editing of this content I was testing things out on r127. Code breaking changes are introduced to three.js all the time, so I need to repeat this in every three.js post regardless of what the post might be on. When it comes to just using the wire frame mode boolean of a material I can not say that has changed much, but other aspects of these examples might break in future versions of three.js.

## 1 - Basic wire frame demo

Like many of my other three.js posts I like to start off with a very basic example of something, and get that out of the way before moving on to more complex examples, of just simply other ways of doing more or less the same thing. The easiest way to get started with wire frames is to just set the wire frame property of a material like that of the [basic material](/2018/05/05/threejs-basic-material/) to true, and that will just about wrap it up.

```js
(function () {
 
    // mesh in wire frame mode
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true
            }));
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(mesh);
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

Some people might not like the outcome of this though when it comes to having a wire frame type mode though. Also in this example I am using the basic material, there are maybe a few things to cover when it comes to materials that respond to a light source such as with the standard material. However before I get into anything with light maybe it would be best to look at a few more basic examples, and maybe some not so basic examples of also getting a kind of wire frame like effect for a mesh object.

## 2 - Using Line Segments

Another option is to convert a geometry to an instance of [THREE.EdgesGeomerty](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) and then use that to create an instance of [THREE.LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments) with a Line Material such as [THREE.LineBasicMaterial](https://threejs.org/docs/#api/en/materials/LineBasicMaterial). This will result in a look that differs from what the usual is when just setting a material into wire frame mode that I tend to like better. The result of this is lines draw in a way in which it is just the sides of a cube and not all the triangles that make up the cube.

```js
(function () {
    // bog geometry and an edge geometry created from it
    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo);
 
    // Line Segments
    var line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

However there are still some drawbacks with this when it comes to how things look and that is not being able to set the line width to something other than 1.

## 3 - Wire frame style effect using canvas textures

In this section I will be going over some helper methods that create cubes that make use of materials that are in wireframe mode, or create a wireframe like effect using textures and various material properties.

In this post I was using version r111 of threejs, so if the code breaks it might be because you are using and older or newer version number than that. I also trust that you have at least some background with threejs, javaScript, and client side web programing in general. If not this is not a good starting point for the very basics.

### 3.1 - A create basic write cube helper

Here I have a basic create wire cube helper method. This helper returns a new mesh that uses a simple box geometry and a basic material that is in wire frame mode. To set a basic material in write frame mode I just need to set the wire frame property to true when  passing an options object to the Mesh Basic Material constructor.

```js
    // create a basic write frame cube
    var createBasicWireCube = function () {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true
            }));
    };
```

### 3.2 - a Create canvas texture helper

Here I have a create canvas texture helper method that will return a texture using a canvas element by creating the canvas element, drawing to the 2d drawing context, and then used the THREE.Texture constructor to create and return a texture. When doing so all I need to do is pass the canvas element to the THREE.Texture constructor it as the first argument, save the resulting texture to a variable, and be sure to set the needs update boolean to true.

```js
    // create a canvas texture
    var createCanvasTexture = function (draw) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        draw = draw || function (ctx, canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        };
        draw(ctx, canvas);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };
```

This is then a great way to go about creating textures by way of javaScript code rather than external image assets. For this example I am using it as a way to go about creating a texture that is just fully transparent aside from some lines that I am drawing along the sides of the canvas. I am then going to use this image as a color map for all the sides of a cube my using if for the map property of the material that I will be using.

This subject of [canvas textures in three.js course deserves a whole post on its own, and I have done so if you would like to read up more on this sort of thing](/2018/04/17/threejs-canvas-texture/). For now this will work just fine for what I have in mind here, I just need an additional helper method that will create and return a mesh using this method.

### 3.3 - A create canvas wire cube helper

Now I can make a more advanced canvas powered helper that creates a cube that uses a material with a texture for the map property that results in a wire frame like effect. The process involves more than just simply creating a texture where I am drawing lines at the corners of the texture. I need to make sure the texture is transparent, and I also want to draw the texture on both sides of a face.

```js
    // create a cube with a canvas as a texture
    // the material is transparent and rendering is done on
    // both sides.
    var createCanvasWireCube = function () {
        var texture = createCanvasTexture();
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0.8,
                map: texture,
                side: THREE.DoubleSide
            }));
    };
```

### 3.4 - create the scene and everything else

So now to test out what I put together for this section. I start out by creating a scene, camera, and renderer like always. However I now just call my create basic write cube, and create canvas wire cube helpers to created cubes that make use of the wire frame solutions. I then add them to the scene with the add method of the scene instance.

```js
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(1, 0, 0);
 
    scene.add(createBasicWireCube());
    var cube = createCanvasWireCube();
    cube.position.set(3, 0, 0)
    scene.add(cube);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
```

This results in two cubes that both have a write frame like look.

## 4 - Wire frame mode and lighting

When using a materials like that of the standard material for a mesh, setting the material into wire frame mode will not change the situation when it comes to lighting. If I set the emissive color of the material to that of the background color, and I do not currently have a light source then the material will not show up. So when working with a materials that will respond to light sources I am still going to want to make sure that there is one or more light sources, and I am still going to want to set the color and emissve color properties of the material to appropriate values so that things show up.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0000ff);
 
    // mesh1
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: 0xffffff, // color is white
                emissive: 0x0000ff, // emissive color is the same as the background color
                wireframe: true
            }));
    scene.add(mesh);
 
    var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: 0xffffff, // color is white
                emissive: 0x000000, // emissive color is Black
                wireframe: true
            }));
    mesh2.position.set(-1.5, 0, 0);
    scene.add(mesh2);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    camera.add(light)
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lt = new Date(),
    deg = 0,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            deg += 10 * secs;
            deg %= 30;
            var per = deg / 30,
            radian = Math.PI * 2 * per,
            bias = 1 - Math.abs(per - 0.5) / 0.5;
            light.position.set(Math.cos(radian) * 2, Math.sin(radian) * 2, 0);
            light.intensity = 1 * bias;
            renderer.render(scene, camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());
```

When working with light I have found that it is often a good idea to have more than one light source. Typically I will add an ambient light source, and then a light source like of the point light that I used in this example.

## 5 - Using the override material scene object property to set all mesh objects into a wire frame mode

I think I should take a moment to write about the material override property of the scene object at this point that can be used to set a materials that will be applied to all mesh objects. This scene object property can be used to set all mesh object to a single material that is set in wire frame mode, and then everything can be set back again by just stetting the value of the property back to the default value of null.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2f2f2f);
 
    var material_override = new THREE.MeshBasicMaterial({
            color: new THREE.Color('lime'),
            wireframe: true
        });
    scene.overrideMaterial = material_override;
 
    // mesh1
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshDepthMaterial());
    scene.add(mesh);
 
    var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial());
    mesh2.position.set(-1.5, 0, 0);
    scene.add(mesh2);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.75, 10);
    camera.position.set(1.15, 0.85, 0.75);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    camera.add(light)
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lt = new Date(),
    time = 0,
    switchTime = 1.0,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            time += secs;
            if (time >= switchTime) {
                if (scene.overrideMaterial) {
                    scene.overrideMaterial = null;
                } else {
                    scene.overrideMaterial = material_override;
                }
                time %= switchTime;
            }
            renderer.render(scene, camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());
```

## 6 - Conclusion

For the most part just setting the wire frame property of a material to true will work just fine, however if I want a more custom look then I am going to need to do something with textures. The wire frame look is great for when I am just trying to work out a geometry and do not care about the final look of an object just yet. However when it comes to skinning a mesh object I am going to want to start making some textures by one way or another. There is creating textures with just javaScript code using canvas elements, and then there is creating some custom textures with an image editor and using the texture loader as a way to get into skinning mesh object materials.