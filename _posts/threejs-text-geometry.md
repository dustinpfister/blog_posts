---
title: Text Geometry in threejs
date: 2023-07-05 12:20:00
tags: [three.js]
layout: post
categories: three.js
id: 1058
updated: 2023-07-06 11:33:42
version: 1.6
---

When it comes to adding text to threejs projects there might be a number of ways to do so. There is thinking in terms of adding text in the form of [canvas textures](/2018/04/17/threejs-canvas-texture) that are then used with some geometry as a way to add text. There is also working out something where I just have a plain old fashion 2d canvas drawing context and then draw to it with the dom element property of the WebGl Renderer, and then while I am at it use the 2d drawing context to draw some text on top of that which is what I often like to do these days. However todays post will be on the [text geometry class](https://threejs.org/docs/#examples/en/geometries/TextGeometry) that can be added in with a project by way of an additional add in module alone with the core library of threejs itself.

Using the text geometry constructor is a little involved as it will not just require adding the text geometry module, but also an additional [font loader](https://threejs.org/docs/#examples/en/loaders/FontLoader) that is needed to load the JSON files that will contain the data that is the font to be used. Speaking of fonts, yes that is yet another file that will need to be obtained by one means or another. The good news though is that all of this can be found in the threejs github repo if you just want to use what there is to work with there.

<!-- more -->

## Text Geometry and what to know first

I assume that you have at least a fair amount of background with client side javaScript, and have also worked out at least a few demos of your own with threejs at this point. If not you might want to take a step back because this is not a [post for people that are totally new to threejs](/2018/04/04/threejs-getting-started/) and client side javaScrit in general.

### Source code is also up on Github

I also have the source code examples for this post up on my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-text-geometry) on Github. This is also where I place the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first wrote this blog post I was following my [r152 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) when getting the source code demos together. This means that I am using javaScipt module type script tags.

## 1 - Basic Text Geometry Example

So then even a basic example of the text loader will be not so basic sadly. However I will be doing by best to keep things fairly simple here. Sense I am using r152 of threejs, and at this point the js folder in the examples folder of the threejs Github repo is no more, I will need to be using javaScript module tags, and the JSM versions of the additional add on  files as there is no alternative when using this revision. If you are using r147 or older you have the option to use plain old fashion text.javaScript mime type script tags.


So for my set up in the test threejs repo I am using an import map when I am loading in the three.module.js file to have the main core library of threejs at the ready. After that I am also loading in the FontLoader, and the TextGeometry class that can be found in the examples folder of the threejs repo. I then have a single module type script tag to which I am loading the main javaScript module file in which I am making  use of all of this.

```html
<script type="importmap">
    {
        "imports": {
            "three": "/js/threejs/0.152.0/three.module.js",
            "FontLoader": "/js/threejs/0.152.0/loaders/FontLoader.js",
            "TextGeometry": "/js/threejs/0.152.0/geometry/TextGeometry.js"
        }
    }
</script>
<script type="module" src="/forpost/threejs-text-geometry/s1-1-basic/main.js"></script>
```

The the main javaScript file I import the core threejs library as well as the additional add-ons that I need for this demo. For the text geometry loader I will need the FontLoader, and TextGeometry. Now that I have all of that at the ready, I can set up the usual collection of objects that I will want to have when it comes to any threejs project when it comes to the scene, camera, and renderer. After that I can then use the font loader to load the additional font file that I want to use, and then once I have that I can finally create a text geometry object.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { FontLoader } from 'FontLoader';
import { TextGeometry } from 'TextGeometry';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const loader = new FontLoader();
loader.load( '/json/fonts/threejs/helvetiker_regular.typeface.json', function ( font ) {
    const geometry = new TextGeometry( 'This is Text!', {
        font: font,
        size: 1,
        height: 0.25,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.125,
        bevelSize: 0.025,
        bevelOffset: 0,
        bevelSegments: 4
    } );
    geometry.center();
    // material, mesh
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // render
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
} );
```

## Conclusion

There is a whole lot of let work in order to get the text geometry class up and running but all of these does very much make sense. The core threejs library is all ready a little bloated to begin with without all of this baked into the core. There is not just the javaScript code for the text geometry class, but also the font loader. Then on top of all of that the data for at least one font would have to be baked into the library as well. So then it makes sense for all of this to be pulled out into these additional optional files.

As I have said there are a lot of ways to go about adding text to a threejs project, and the text geometry is just a way to go about doing so by way of some json data for a font along with some additional javaScript code resources. Often I might not always want or need 3d like text, but just simple plain old 2d text as an overlay, or as a texture that will be used for one of the map options of a material. When it comes to my [threejs examples](/2021/02/19/threejs-examples/) collection I made [one project where I was working out a simple for scrolling text textures](/2022/10/14/threejs-examples-text-plane/).
 
