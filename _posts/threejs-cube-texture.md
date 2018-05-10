---
title: Adding a cube texture to a mesh in three.js
date: 2018-04-22 18:35:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 179
updated: 2018-04-23 16:37:23
version: 1.8
---

In [three.js](https://threejs.org/) you might want to have a way to set up a background that will actually be a bunch of images that would line each side of the inside of a box, resulting in a background that is different for any given general direction in 3d space. You might also want to have that kind of texture placed over the surface of some kind of mesh as well. In three.js there is a constructor that will produce this kind of texture that can be used with an array of materials, called [CubeTexture](https://threejs.org/docs/index.html#api/textures/CubeTexture).

A CubeTexture can be used with any property, of any material that makes use of a cube texture. In addition it is also one of three options when it comes to setting the background of a scene, allowing you to make a background that is way cooler than just a solid color background. In this post I will be writing about setting up a cube texture, loading it with the [CubeTextureLoader](https://threejs.org/docs/index.html#api/loaders/CubeTextureLoader), and using that cube texture as a background as well as a texture for a sphere.

<!-- more -->

## What to know before hand

This is not a post for people that are new to three.js. If you are new to three.js you might try starting with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. This is also not a post on the basics of javaScript, and all other related background that might be require to get to this point. There is a great deal to learn about three.js, I am going to be suing things like materials, and meshes in this post you might try bouncing around [my other posts on three.js](/categories/three-js/), and as always there is the [official site]((https://threejs.org/) ) on three.js as well to check out other topics in further detail.

## Having some images

Before getting started making a cue texture one of the first things to work out is the images. I will need not just one, but six images, one for each side of a cube, thus the name cube texture. These should not just be any images also, they should be generated in a way in which they will work well for the intended purpose.

Getting into how to go about making these images could prove to be a whole other post by itself. So for this post I will just be using one of the examples provided in the official three.js repository. The collection of examples can be found in the [examples/textures/cube](https://github.com/mrdoob/three.js/tree/r91/examples/textures/cube) folder of the repository.

## The Cube Texture Loader

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

## Basic example of Cube Texture use

For a basic example of cube texture use I used the Cube Texture loader to load a set of images that compose a [cube mapping](https://en.wikipedia.org/wiki/Cube_mapping) that I borrowed from the three.js repository as mentioned earlier to procure an instance of CubeTexture.

I then used the CubeTexture as an [environment map](https://en.wikipedia.org/wiki/Reflection_mapping) for a material that I then used to skin a sphere. this can be achieved be setting the instance of CubeTexture to the envMap property of the Material. In addition I also used the same cube texture to set the background of the scene.

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
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

This results in a scene where I have the cube texture as the background, and I am also using it as a means of cheep reflection with respect to the sphere. In order to get the full effect of what is going on I should add some [orbit controls](/2018/04/13/threejs-orbit-controls/), or failing that do something to move the camera around.