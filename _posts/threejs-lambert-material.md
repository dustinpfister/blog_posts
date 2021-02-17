---
title: Three.js Lambert Material Example
date: 2018-04-08 16:31:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 170
updated: 2021-02-17 16:04:45
version: 1.6
---

I have been toying around with [three.js](https://threejs.org/) these days, and may continue doing so until I have a solid collection of posts on it. You can count on at least a few posts on Materials which I have been working with today. If you are just getting started with three.js you might be familiar with at least the Basic Material, and that you use a Material with a Geometry to make a Mesh. However you might now be interested in working with lights, and having a material that will respond to a light source, if so the Lambert Material may be of interest.
In this post I will be writing about the [Lambert basic material](https://threejs.org/docs/index.html#api/materials/MeshLambertMaterial) in three.js, and a basic example of it's use.

<!-- more -->

## 1 - What to know

I assume you have at least a basic working knowledge of three.js, and are now interested in learning more about the material options used in three.js, if not I have a [getting started post](/2018/04/04/threejs-getting-started/) on three.js. Also it should go without saying that you should have at least some background working with javaScript by itself, and many other things that have to do with client side javaScript development.

### 1.22 - Why the name Lambert?

It is named after [Johann Heinrich Lambert](https://en.wikipedia.org/wiki/Johann_Heinrich_Lambert), the man who first introduced the concept used in this material in his book [Photometria](https://en.wikipedia.org/wiki/Photometria).

### 1.3 - Why use the Lambert Material?

There are materials in three.js that do not respond to a light source, and then there are materials that do respond to lights, the Lamber Material is one of several options that do respond to a light source.

From what I have gathered this is one of the faster solutions for having a reflective material that will respond to a light source. If you are interested in knowing why, you might choose to read more about [Lambertian reflectance](https://en.wikipedia.org/wiki/Lambertian_reflectance) and [Gouraud shading](https://en.wikipedia.org/wiki/Gouraud_shading).

I often like to develop on systems like a raspberry pi that only has so much resources to work with when it comes to memory and CPU overhead. So I tend to try to keep my models very low poly, and also make use of materials such as the Lambert material to make better use of what I have to work with on platforms such as this. However overall it might still be better to go with the standard material in some cases.

### 1.4 - The Lambert Material needs a light source

First off the Lambert material needs a light source. If you use the material without any light source shining on it, and you have a black background, you may end up staring at a black screen. So before we get into the material, lets just take a moment to touch base a lights just for a moment.

```js
// spotlight
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(200, 400, 300);
scene.add(spotLight);
```

There are many lights to work with in three.js, but in this demo I will be using a [spot light](https://threejs.org/docs/index.html#api/lights/SpotLight). This is a directional light that casts out light in the shape of a cone, it can also be used to case shadows. The spot light inherits some things from the base [Light class](https://threejs.org/docs/index.html#api/lights/Light), and the Light class inherits from [Object3D](https://threejs.org/docs/index.html#api/core/Object3D) which means I can move it around, and work with it just like a camera, or any other object in three.js. However the Object3D.lookAt method will not work for changing the direction of the spot light, to change that you will need to use the target property of the spot light.

```js
// spotlight
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 350, 0);
scene.add(spotLight);
```

I could get into spot lights more, but this post is on the Lambert Material, so that will have to wait for another day.

## 2 - Basic Lambert Material Example

For a simple example I put together a scene containing a cube, and plane both of which use the Lambert material. In order to see anything though I also added a spotLight, and positioned it away from the cube, and plane.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
 
    // Cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 100, 0);
    scene.add(cube);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // background
    scene.background = new THREE.Color(0x000000);
 
    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1500, 1500, 8, 8),
            new THREE.MeshLambertMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
 
    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight(),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
 
    // set position of spotLight,
    // and helper bust be updated when doing that
    spotLight.position.set(100, 200, -100);
    spotLightHelper.update();
 
    renderer.render(scene, camera);
 
}
    ());
```

This results in reflection in a manner that is expected with light reflecting from areas where the spotlight is striking the surfaces of the cube, and plane.

## 3 - The emissive, and color properties

Unlike materials like the [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial), the Lambert Material does not just have a single color for filling the faces of an polygon. There is a color that is shown when it is effected by a light source, and then there is a color that it is by default regardless if there is any light or not.

To set the color value that is not effected by light you will want to set the emissve property of the Lambert material, and use the color property to set the color that is to be reflected when effected by a light source.

for example say we add the emissive property to the material that I gave in the plain to this:
```js
// add plane to the scene
var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1500, 1500, 8, 8),
    new THREE.MeshLambertMaterial({
        color: 0x00afaf,
        emissive: 0x2a2a2a,
        emissiveIntensity: .5,
        side: THREE.DoubleSide
}));
```

This will make all the area of the plane that is not effected by the spot light a shade of gray, rather than the default which is black. In addition to being able to set the emissive color, the intensity can also be set from a 0 to one value, it is also possible to define a texture that will modulate with the emmsive color using the emmsiveMap property. To set a texture that will function as the regular color map, you will want to use the plain old map property.

## 4 - Conclusion

The Lambert Material is a good first choice for having a material that responds to light, but depending on the project it might not be the best. The good point of it is speed, but not so much accuracy, even the [Standard material](https://threejs.org/docs/index.html#api/materials/MeshStandardMaterial) seems to do a better job in that regard.