---
title: The Standard Material in Threejs
date: 2021-04-27 15:25:00
tags: [three.js]
layout: post
categories: three.js
id: 854
updated: 2021-06-20 11:27:40
version: 1.34
---

A long time ago I wrote a post on the [basic material](/2018/05/05/threejs-basic-material/) in [three js](https://threejs.org/), but oddly enough I never got around to writing a post on the [standard material](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) which is on of several options with materials that make use of light sources. When it comes to mesh materials in threejs the basic material is a nice starting point, and in some examples and projects in which I am not doing anything with light it might even get the job done just fine. However when it comes to working with everything that three.js has to offer when it comes to light sources, and the various kinds of texture maps there are to work with, the standard material is maybe one of the best all round options.

There are some additional materials that might be worth mentioning as contenders when it comes to a great general use case material in three.js such as the [Lambert material](/2018/04/08/threejs-lambert-material/), and the phong material. The nice thing about the lamber material is that it might eat up a little less overhead compared to the standard material, which might come in handy with certain kinds of projects. However over all the standard material seems to work fine on the systems that I test on, and also it might prove to reproduce more realistic lighting compared to the lamber material.

<!-- more -->

## 1 - The standard material and what to know first

This is a post on the standard material in three.js that is used along with a geometry to skin a Mesh object that can then be added to a scene. There is a great deal that you should be aware of before getting into the depth of what there is to know about when it comes to materials specifically, so in other words this is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/) let alone javaScript in general. So I assume that you have worked out at least a few basic examples of three.js, and are not just looking into what the options are when it comes to skinning a mesh object. I will not be going over all the little basics that you should know at this point, but I will be going over a few things that you might want to read up more on in this section.

### 1.1 - There are many other basic options with materials

The standard material is still just one of many options with the various [mesh materials](/2018/04/30/threejs-materials/) to work with in threejs. The standard material is a good option when it comes to creating a final state of a project, however there are a number of other options that work well as place holders when it comes to focusing on other aspects of a project that have to do with the state of a geometry, or how a scene should be updated over time. There is the Mesh Normal Material that is great for seeing what the the current state of the normal property of a geometry is. Another good starting option is the [depth material](/2021/05/04/threejs-depth-material/) that will render the faces of a geometry based on the position of the geometry to a camera and the near and far settings of the camera.

### 1.2 - Be mindful of the differences with the color property compared to the baisc material

One of the major reasons why I would use the standard material is because I want to do something involving one or more light sources. When it comes to the Basic Material I just need to worry about the color property when it comes to setting a solid color for the mesh. I then will maybe just use a color map with the basic material as a way to go about adding some texture. I can do the same with the standard material it is just that now I would want to set a solid color for the mesh using the emissve property as any color that I set with the color property will only show up when a light source of some kind is present.

### 1.3 - Know the options when it comes to light sources

There are a number of options to chose from when it comes to light sources, the two I generally find myself going with are the [point light](/2019/06/02/threejs-point-light/), and an [ambient light](/2018/11/02/threejs-ambientlight/).

### 1.4 - Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js which was a later version of threejs in early 2021. I do not think much has changed with the standard material in some time now, but code breaking changes are made every now and then with many other aspects of the library.

## 2 - Basic example of the standard material

First off lets start with a very basic example of the standard material, by creating a cube using the [Box Geometry constructor](/2021/04/26/threejs-box-geometry/) for the geometry to use for the mesh. Next I will create an instance of the standard material for the mesh that will use a solid color of red. However this will not work out as you might expect when it comes to using the basic material, as when I just use the standard material itself without a light source I will not see anything. The reason why is because a light source is needed in order to see the color, and if I want to have a color that will always show up no mater what I will want to use the emissive property.

For this example though I am not going to do anything to advanced when it comes to the emissive property and other related properties just a solid color. So I create the Mesh object with the THREE.Mesh constructor, and then pass the geometry that I want as the first argument, followed by the instance of the standard material created with the THREE.MeshStandardMaterial constructor. I then add the mesh object to the scene with the add method of the scene object.

I will then want to add at least one of not more light sources to the scene. For this example I am going with the Point light which I create with the THREE.PointLight constructor. I could position this point light by itself and add it directly to the scene, but I often like to make it a child of another object in the scene such as another mesh object, or even a child of the camera. For this example I made it a child of a mesh object where I am using the sphere geometry for it along with the basic material. This way I can see where the point light is located in the scene.

```js
// creating a box with the standard material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'red'}));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// adding a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 4, 2);
scene.add(sun);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

Just like any other threejs example I will also want a camera and a renderer, for this example I went with the perspective camera and the Web GL renderer which are my usual suspects for just about everything that I do with threejs. With this example up and running I get a red cube, but the color will be a little different depending on the position of the point light and the location of the face of the cube.

## 3 - Using a color map and a light source

What is great about the standard material is that there are a lot of texture maps that can be used with the standard material. There is having a regular color map like that of the basic material, it is just that one needs to use a light source with it just like with the plain solid color setting. There are a number of ways to create a texture, typically I might want to load an external file to do so. However for these kinds of examples I like to go with some kind of solution that avoids bothering with external images by making use of a solution that involves using canvas elements and a little javaScript code.

To create canvas textures I will want to use the canvas texture constructor in thee.js, but first I will need a canvas element with the desired texture drawn on it to pass to the constructor. The topic of working with canvas elements is beyond the scope of this post of course, however I have a [getting started post on canvas](/2017/05/17/canvas-getting-started/), as well as a lot of [canvas example](/2020/03/23/canvas-example/) type posts when it comes to learning how to work with canvas elements. For more on this sort of thing when it comes to using canvas elements to create textures there is my post on the [canvas texture constructor](/2018/04/17/threejs-canvas-texture/).

```js
(function (utils) {
    utils.createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 32;
        canvas.height = size || 32;
        canvas.style.imageRendering = 'pixelated';
        ctx.imageSmoothingEnabled = false;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
}
    (this['utils'] = {}));
 
var colorMap = utils.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.stroke();
    });
 
// creating a box with the standard material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshStandardMaterial({
            map: colorMap
        }));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// adding a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
radian = 0;
 
var loop = function () {
 
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
 
    requestAnimationFrame(loop);
 
    radian += 1.57 * secs;
    radian %= Math.PI * 2;
 
    var x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
 
    renderer.render(scene, camera);
};
loop();
```

## 4 - The emissive map and other related properties

Now for one more map example this time using the emissve map option to make it so that the material will still show something at least even if there is not light at all. With the basic material there is just having a color map, but with the standard material the color map will only should up when there is some light. The functionally of the basic material color map can still show up though I just need to do so by having an emissve map.

In this example I am doing more or less the same thing with it comes to my color map example, but now I am also using the map I created with a canvas element for the emissve map also. When doing so I will want to set the solid emissive color to something other than black, and I will also typically want to adjust the intensity of this effect also.

```js
(function (utils) {
    utils.createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 32;
        canvas.height = size || 32;
        canvas.style.imageRendering = 'pixelated';
        ctx.imageSmoothingEnabled = false;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
}
    (this['utils'] = {}));
 
var colorMap = utils.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.stroke();
    });
 
// creating a box with the standard material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshStandardMaterial({
            map: colorMap,
            emissive: 'white',
            emissiveIntensity: 0.3,
            emissiveMap: colorMap
        }));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// adding a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
radian = 0;
 
var loop = function () {
 
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
 
    requestAnimationFrame(loop);
 
    radian += 1.57 * secs;
    radian %= Math.PI * 2;
 
    var x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
 
    renderer.render(scene, camera);
};
loop();
```

Another options when it comes to something like this is to use some ambient light on top of a point light as this will make sure that the color map will always show up at least a little. However one nice thing about this is that I can make the emissive map something completely different from that of the regular color map.

## 5 - Conclusion

More often than not the standard material is my default go to material that I use with just about every project in which I start playing around with light. There is a great deal more to write about when it comes to the various kind of maps to work with when it comes to using this material. When it comes to getting more into the details of this material I might come around to edit this post, or write some new ones as I get around to it. For now there is my main post on [mesh materials](/2018/04/30/threejs-materials/) in general in which I briefly go over most of the materials that are built into three.js.

I do get around to editing my posts on threejs now and then, so at some point I would like to expand this post with additional examples that make use of more of the features there are to work with when it comes to the standard material. One feature I would like to look into more is the metalness property.


```js
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'red', metalness: 1}));
```

There is also a kind of map that allows for me to set want areas of a face that will be effected more so than others when it comes to this feature. There are a number of other kinds of maps that I should work out examples for when it comes to this materials, the most pressing of which might be the environment map.