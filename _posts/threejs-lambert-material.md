---
title: The Lambert Material in threejs
date: 2018-04-08 16:31:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 170
updated: 2022-12-29 11:31:31
version: 1.32
---

I have been toying around with [three.js](https://threejs.org/) these days, and may continue doing so until I have a solid collection of posts on it, and even continue beynd that if I really get into this sort of thing. So it should go without saying that I am going to end up writing a few [posts on Materials](/2018/04/30/threejs-materials/) such as the [standard material](/2021/04/27/threejs-standard-material/), and features of materials such as [emissive maps](/2021/06/22/threejs-emissive-map/), [transparency](/2021/04/21/threejs-materials-transparent/), and so forth. One such option with materials would be the Mesh material known as the [Mesh Lambert Material](https://threejs.org/docs/index.html#api/materials/MeshLambertMaterial), which is one of many options for skinning a mesh object created with the [THREE.Mesh](/2018/05/04/threejs-mesh/) constructor function. In this post I will be getting into the specifics of this Lambert material a little to get a better sense of what it is all about compared to the many other options.

If you are just getting started with three.js you might be familiar with at least the [Mesh Basic Material](/2018/05/05/threejs-basic-material/), and that you use a Material with a [Buffer Geometry](/2021/04/22/threejs-buffer-geometry/) to make a Mesh object instance to which you can then add to a [scene object](/2018/05/03/threejs-scene/). However you might now be interested in working with [lights](/2022/02/25/threejs-light/), and having a material that will respond to a light source. If so the Lambert Material may be of interest as this is one option that will work with light while the basic material will not. The main material that I would use more often than not would be the standard material, but the Lambert material might prove to use a little less overhead then that material by loosing accuracy when it comes to lighting. So lets take a look at this material, and maybe some additional topics of interest surrounding it that may apply to materials and threejs in general.

<!-- more -->

## The Lambert material and what to know first

If you have no experience with threejs at all then I have my take on the subject of [getting started](/2018/04/04/threejs-getting-started/) on three.js. Also it should go without saying that you should have at least some background working with javaScript by itself, if not I have my [main getting started with javaScript](/2018/11/27/js-getting-started/) type post also. In this case I might not get into everything that you should know before hand in the section, but I will be touching base on some things briefly here.

<iframe class="youtube_video" src="https://www.youtube.com/embed/gGiAEEJm5uU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Why the name Lambert?

It is named after [Johann Heinrich Lambert](https://en.wikipedia.org/wiki/Johann_Heinrich_Lambert), the man who first introduced the concept used in this material in his book [Photometria](https://en.wikipedia.org/wiki/Photometria).

### Why use the Lambert Material?

There are materials in three.js that do not respond to a light source, and then there are materials that do respond to lights, the Lamber Material is one of several options that do respond to a light source. From what I have gathered the Lambert material is one of the faster solutions for having a reflective material that will respond to a light source. If you are interested in knowing why, you might choose to read more about [Lambertian reflectance](https://en.wikipedia.org/wiki/Lambertian_reflectance) and [Gouraud shading](https://en.wikipedia.org/wiki/Gouraud_shading) in order to get into the details.

I often like to develop on systems like a raspberry pi that only has so much resources to work with when it comes to memory and CPU overhead. So I tend to try to keep my models very low poly, and also make use of materials such as the Lambert material to make better use of what I have to work with on platforms such as this. However overall it might still be better to go with the standard material in some cases such as when making video projects where I just need to work about how my frames look and higher processing over head just means I have to wait a little longer for my frames to render.

### The Lambert Material needs a light source

First off the Lambert material needs a light source, unless I am going to just go with emissive maps at least. If you use the material without any light source shining on it, and you have a black background, you may end up staring at a black screen when first getting started with this kind of material. So before we get into the material, lets just take a moment to touch base a lights just for a moment.

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


### The source code examples here, as well as on all my other posts are on guthub

The source code examples I am writing about in this post can be found on my [test threejs github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-lambert-material).


### Version numbers matter

When I first wrote this post I was using threejs version r91, and the last time I came around to do a little editing I was using r135 when making sure that the examples still work okay. Always be mindful of what the version of threejs is that is being used in examples on the open web, threejs moves very fast with development, more so than many other projects. So code breaking changes come into play all the time, as such I have got into habit of mentioning what version I was using when I first wrote a post, and also when I edited the post last.

## 1 - Basic Lambert Material Example

For a simple example I put together a scene containing a cube, and plane both of which use the Lambert material. In order to see anything though I also added a spotLight, and positioned it away from the cube, and plane. This is because when it comes to just using the color property that will set a solid color for the material, but I will only see anything if there is a light source shining on it. There is getting into other properties such as the emissive property, and also using an ambient light source but for now maybe I will save that for another section later.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OF A BOX GEOMETRY AND THE LAMBERT MATERIAL
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 100, 0);
    scene.add(cube);
    // MESH OF A PLANE GEOMETRY AND THE LAMBERT MATERIAL
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1500, 1500, 8, 8),
            new THREE.MeshLambertMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff, 1, 300, Math.PI / 180 * 40, 1, 0),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    spotLight.position.set(150, 200, -100);
    spotLightHelper.update();
    // render
    renderer.render(scene, camera);
}
    ());
```

This results in reflection in a manner that is expected with light reflecting from areas where the spotlight is striking the surfaces of the cube, and plane.

## 2 - The emissive, and color properties

Unlike materials like the [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial), the Lambert Material does not just have a single color for filling the faces of a geometry. There is a color that is shown when it is effected by a light source, and then there is a color that it is by default regardless if there is any light or not which would be the emissive color.

To set the color value that is not effected by light you will want to set the emissve property of the Lambert material, and use the color property to set the color that is to be reflected when effected by a light source. When doing so there is also the emissive Intensity property that can be used to adjust the intestacy of this emissive color.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // add plane to the scene
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1500, 1500, 8, 8),
        new THREE.MeshLambertMaterial({
            color: 0x00afaf,
            emissive: 0x004a4a,
            emissiveIntensity: 0.75,
            side: THREE.DoubleSide
    }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff, 1, 300, Math.PI / 180 * 40, 1, 0),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    spotLight.position.set(150, 200, -100);
    spotLightHelper.update();
    // render
    renderer.render(scene, camera);
 
}
    ());
```

This will make all the area of the plane that is not effected by the spot light a shade of gray, rather than the default which is black. In addition to being able to set the emissive color, the intensity can also be set from a 0 to one value, it is also possible to define a texture that will modulate with the emissive color using the emmsiveMap property. To set a texture that will function as the regular color map, you will want to use the plain old map property.

## 3 - The map property and data textures

Like many other materials in threejs there are a number of options for adding texture to the material, one such option would me the map property which is how to define a texture that will respond to a light source. In order to use one of these properties I will need some kind of texture first and one way to go about creating a texture without having to bother with loading an external image asset first would be to use [data textures](/2022/04/15/threejs-data-texture/).
In threejs the THREE.DataTexture constructor is one of several options for creating a texture by way of some javaScript code rather that loading an image first. In order to use if first I need to create an instance of a uint8array, then it is just a matter of creating the color channel data for the array. For this example I just want to make a simple pseudo random gray scale texture so I am just creating a random value between 0 and 255 and setting that for read, green, and blue for each pixel, then always setting 255 for the alpha channel for a pixel. Once I have my data array all set I just need to pass that array as the first argument for the THREE.DataTexture constructor function, along with the width and height arguments. The return value of the constructor is then the texture which I can the use for that map property when creating an instance of the Lambert material.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // data texture
    var width = 16,
    height = 16;
    var size = width * height;
    var data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        var stride = i * 4;
        var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v;
        data[stride + 1] = v;
        data[stride + 2] = v;
        data[stride + 3] = 255;
    }
    var texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1500, 1500, 8, 8),
            new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: texture,
                emissive: 0x004a4a,
                emissiveIntensity: 0.75,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    scene.add( new THREE.AmbientLight(0xffffff, 0.05));
    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff, 1, 300, Math.PI / 180 * 40, 1, 0),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    spotLight.position.set(150, 200, -100);
    spotLightHelper.update();
 
    // render
    renderer.render(scene, camera);
 
}
    ());
```

## Conclusion

The Lambert Material is a good first choice for having a material that responds to light, but depending on the project it might not be the best. The good point of it is speed, but not so much accuracy, the [Standard material](https://threejs.org/docs/index.html#api/materials/MeshStandardMaterial) seems to do a better job in that regard. There are also a number of other options for materials that might prove to be yet even a better choice depending on the end result that is desired such as the [Phong Material](/2022/12/29/threejs-phong-material/) which will produce a nice shine effect.

I would not sink to much time into getting into the details about each material though when it comes to taking into account what really matters moving forward with threejs. In the long run what I really want to do is figure out what I really want to do with threejs when it comes to making actual projects. 

As long as I do a decent job of keeping my code easy to read it should not be to hard to switch from Lambert to standard materials and back again. So if you are having a hard time choosing what material to use don't work about it to much, if you think the Lambert material is a good choice now, but later on switching to another options is often just a matter of using one of the constructor names as long as we are just taking in terms of the Lambert, standard, and prong materials as possible options at least.