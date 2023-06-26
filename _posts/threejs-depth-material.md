---
title: The Depth Material, near, and far camera values in threejs
date: 2021-05-04 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 859
updated: 2023-06-26 12:27:15
version: 1.43
---

The [depth material](https://threejs.org/docs/#api/en/materials/MeshDepthMaterial) in [threejs](https://threejs.org/) is a material that will render a texture on the faces of the geometry of a mesh using the near and far values of the camera that is used when rendering such a mesh object. 

There are a [few materials](/2018/04/30/threejs-materials/) to choose from when it comes to skinning a mesh object without having to bother with external image assets, code generated textures, color attributes, or setting up a light source to show some depth. Often I find myself going with the [normal material](/2021/06/23/threejs-normal-material/) when it comes to this kind of place holder material but the depth material would be another option.

When it comes to a final choice in materials I often like to go with the the [standard material](/2021/04/27/threejs-standard-material/) as it is a good over all choice for the most part when it comes to the various maps that it supports. However there are some good things to write about when it comes to the depth material, as well as some other options for materials that work right away without a light source. There is also what branches off from the use of the depth material when it comes to things like the arguments that are given when creating a camera, namely the near and far values.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/Xxhg8eB6ojU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Depth Material and what to know first

This is a post on the depth material in threejs, as such I expect for you to at least understand the basics of creating a threejs project. If not there is looking into one or more [getting started type posts on three.js](/2018/04/04/threejs-getting-started/), and also maybe [javaScript in general](/2018/11/27/js-getting-started/). On top of knowing the very basics of getting started on threejs there is maybe a few more things that a developer should look into more with cameras. Also there is a lot to be aware of when it comes to certain base classes such as the Vector3 and Object3d class. These things will come into play when it comes to doing things like setting the position of the camera. I will not be getting into all of this in detail in this post, but in this section I will be outlining a few things that you should know about before continuing reading the rest if the post.

### You might want to read up more on the perspective camera

There are a [few options when it comes to cameras in threejs](/2018/04/06/threejs-camera/), but the typical camera that I use just about all the time would of course be the [perspective camera](/2018/04/07/threejs-camera-perspective/). This is a camera that will render a scene in a way that is similar to the way that the human eye sees things. Each time I create an instance of a perspective camera there are a few arguments that I pass to the constructor such as the filed of view, aspect ratio, and the near and far render values of the camera. When it comes to the depth material it is the position from the camera, and the near and far settings that are used to set what the state of the color should be when rendering a texture for the mesh that uses the depth material.

### Check out Object3d, Vector3, and Euler if you have not done so

So then the near and far values of a camera are used for the depth material, but there is also the position of the mesh from the camera, and also the orientation of the mesh and or camera that will have an effect also. With that said it might be a good idea to look into the [Object3d class](/2018/04/23/threejs-object3d/) a bit more if you are still relative new to threejs at this time. The object3d class is a base class of other class objects in threejs such as Mesh, and Camera. The [position property of Object3d](/2022/04/04/threejs-object3d-position/) is an instance of [Vector3](/2018/04/15/threejs-vector3/) and this can be used to set the position of a Mesh object, and also a camera for that matter. However any mesh might have high and low areas often, so there should be a way to rotate a mesh and or a camera with that there is the [rotation property](/2022/04/08/threejs-object3d-rotation) of Object3d that is an instance of [Euler](/2021/04/28/threejs-euler/).

### The source code examples in this post are on Github

The source code examples on the depth material that I am writing about here can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-depth-material). This is also a place where I park the source code for my [many other blog posts on threejs as well](/categories/three-js/).

### Version Numbers matter with three.js

When I first wrote this post I was using r127 of threejs, and the last time I cam around to doing a little editing of this post I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Always be aware of what version of threejs is being used in an example code braking changes are introduced with threejs often. I have been writing posts on threejs now and then sense r91, and from that point to now I do not think much has changed with the depth material alone. Still I have got into the habit of mentioning  this in every post from now on.

## 1 - Basic Depth Material example

First off there is starting with a basic example of what the deal is with the depth material. So there is creating a mesh with a geometry and an instance of the depth material. For that I just call the THREE.Mesh constructor and pass an instance of the bx geometry as the first argument, followed by and instance of the depth material by calling the THREE.MeshDepthMatreial constructor. I then save the resulting mesh to a variable called something like box, and then I can position that box by way of the position property that is an instance of vector3 by calling the set method of that class.

I will then want to create the rest of my threejs example just like that of any other example where I will want to have a scene, and add this box mesh to that scene. However I am also going to want a renderer, and a camera, and it is the camera that I should write about a little more with this example as there are two values of interest when it comes to the depth material. When calling the THREE.PerspectiveCamera constructor function the first value is the field of view, the second argument is an aspect ration, but then there are the third and fourth arguments. The third argument is an initial value for the near value of the camera, and the fourth argument is a far value for it.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 3.0);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH, MATERIAL
//-------- ----------
// creating a box mesh with the Box Geometry constructor,
// and the normal material
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshDepthMaterial());
box.position.set(0, 0.20, 0);
// add the box mesh to the scene
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

This example then helps to get a basic idea as to what the depth material is about, but in order to gain an even better understanding there are maybe some things that should change over time. So I think that I should cover at least one more example on the depth material that has to do with using a loop to change some values with the camera and or the position of the mesh.

## 2 - Changing the near and far values of a camera

The near and far values of a camera are what are mainly used to adjust the outcome of how the depth material looks on top of things like the distance of the object from the camera. So then there is taking a moment to play around with the near and far values of a camera just as a way to confirm this first hand, and also to gain a better sense of what the near and far values of a camera should be for a given project. After all I often seem to just set the values to some kind of value that comes to might that might be a good range, but I never really look into it much more than that.

The thing about adjusting the near and far values of a camera after it has been created though is that after making any kind of change there is a special method of a camera instance that I am going to want to call after changing a value like near or far. This method is called the [update projecting matrix method](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix) of the perspective camera. This method will need to be called in an update loop, or event handler that will mutate a static values of a camera such as the near and far values that are used with the depth material.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 3.0);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH, MATERIAL
//-------- ----------
// creating a box mesh with the Box Geometry constructor,
// and the normal material
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshDepthMaterial());
box.position.set(0, 0.2, 0);
// add the box mesh to the scene
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(), frame = 0;
const maxFrame = 100, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // adjusting near and far values of the camera
        camera.near = 0.4 + 0.4 * bias;
        camera.far = 1 + 2 * bias;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        lt = now;
        frame += 1;
        frame %= maxFrame;
    }
};
loop();
```

There is playing around with the position and rotation of the mesh object also, but this helps to gain what the deal is with the near and far values of a camera and how that can effect how a mesh with the depth material is effected by those values.

## 3 - CDepth Material Alternatives

There is looking into how to go about working out some kind of alternative to that of the depth material. There is of course a wide range of ways to go about doing this sort of thing of course. Some ways of doing it might prove to be a bit complex such as working out something using the shader material, and some GLSL code. However there are also a number of ways of doing what i might wan to do with just a little javaScript code, and the features of the various other built in material options.

### 3.1 - Using Data Textures to create a kind of depth material effect

On thing that I wanted to find out is how to go about making some kind of custom depth material. Like many things in programming there is more than one way to go about doing this, but for this section I will be going over a way to get a desired effect by making use of [data textures](/2022/04/15/threejs-data-texture/) and various features of the mesh basic material.

Data textures are one of several options when it comes to making a texture with javaScript cod rather than that of a static external image asset. So then there is just getting the distance between a mesh object and a camera, and then using that with various other metrics to create the color channel values for each pixel of a data texture which can be thought of as a kind of custom depth material then.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(2.25, 2.25, 2.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const getMeshDPer = function(mesh, camera, maxDist){
    let d1 = mesh.position.distanceTo( camera.position );
    d1 = d1 > maxDist ? maxDist : d1;
    return d1 / maxDist;
};
const createDepthData = function(mesh, camera, maxDist, width, height){
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    const d1Per = getMeshDPer(mesh, camera, maxDist);
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4,
        x = i % width,
        y = Math.floor(i / width),
        v2 = new THREE.Vector2(x, y),
        d2 = v2.distanceTo( new THREE.Vector2(width / 2, height / 2) );
        let d2Per = d2 / (width / 2);
        d2Per = d2Per > 1 ? 1 : d2Per;
        // set r, g, b, and alpha data values
        const v = 255 - Math.floor(245 * d2Per) * ( 1 - d1Per );
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    return data;
};
const createDistBox = function(camera, x, y, z, maxDist){
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
           color: 0xffffff,
           transparent: true,
           opacity: 1
        })
    );
    box.position.set(x, y, z);
    // texture
    const width = 16, height = 16;
    const data = createDepthData(box, camera, maxDist, width, height);
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    box.material.map = texture;
    // transparency
    box.material.opacity = 1 - parseFloat( getMeshDPer(box, camera, maxDist).toFixed(2) );
    return box;
};
//-------- ----------
// OBJECTS
//-------- ----------
const box1 = createDistBox(camera, 0, 0, 0, 10);
scene.add(box1);
const box2 = createDistBox(camera, -2, 0, -3.25, 10);
scene.add(box2);
const box3 = createDistBox(camera, -5.5, 0, -3.25, 10);
scene.add(box3);
const box4 = createDistBox(camera, 2.15, 1.15, 1.1, 10);
scene.add(box4);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

Another way to go about creating textures with a little javaScript code would be to make use of [canvas elements](/2018/04/17/threejs-canvas-texture/) to do so. The process would be more or less the same, but what would be nice about that is that I can use all kinds of methods in the 2d drawing context of canvas element sot create the textures.

## Conclusion

So the depth material as the name suggests is a way to go about showing some depth of on object without having to bother with one or ore light sources. When it comes to other materials that can help to show some sense of depth often a few light sources will need to be used to do so. There is also thinking in terms of just using color maps with a material like the basic material, and just work out something that will help show a sense of depth using static textures which would be yet another option for this sort of thing. 

More often than not I will end up going with a material like the standard material when it comes to working on an actual project of one kind or another. The reason why is because I can use a light source with the standard material and color maps as a way to show depth, but I can also use [emissive maps](/2021/06/22/threejs-emissive-map/) and work out textures for showing depth like I would with the basic material. However the depth material can prove to be useful to know what is going on with values of interest that have to do with depth, and the camera.
