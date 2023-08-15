---
title: The Matcap material in threejs
date: 2023-08-10 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 1066
updated: 2023-08-15 11:53:52
version: 1.4
---

The [Matcap material](https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial) is a mesh material option that can be used to have a model with baked in lighting. The way that this is done is by making use of the main option of interest with this material which I would say is the matcap option. The value of this mapcap option should be a drawing of a shaded sphere and it is this shaded sphere texture that will be used as a way to define the direction and intensity of the light. The texture of the mapcap option can also contain color data, but there is also a map option with this material that can be used as a way to separate these concerns.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/ZmVjX_nTfYU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Matcap material and what to know first

This is a post on just one material option for mesh objects in the javaScript library known as threejs. This is not in any way a getting started post on threejs, let alone additional skills that are needed before learning about any javaScript library for that matter. As always with this post on threejs I am taking some liberties and assuming that you know what you should know before hand. However I do still like to use these opening sections of my blog posts on threejs to write about a few topics that you might want to read up on a bit more in any case before reading the rest of this post.

### There is a whole lot more to be aware of when it comes to materials

I am just writing about topics that have to do with just one mesh material option, but there are of course many others. Also there is a whole lot to be aware of when it comes to [materials in general as such you might want to read my deep dive post on that subject](/2018/04/30/threejs-materials). Much of what I get into in detail in that post will of course apply here as well when it comes to things like the various options that can be used to create textures with a little javaScript code, and common base material class features.

### Textures

One can just create an instance of the matcap material without giving any options. However more often than not the matcap option will need to be used, and in order to do that you [need a texture](/2023/06/27/threejs-texture). There are a number of ways to get the kind of texture that is needed such as creating one in a paint program and then loading it in with the texture loader. However there are also a number of options for creating this kind of texture with a little javaScript code by way of [canvas textures](/2018/04/17/threejs-canvas-texture/), and [data textures](/2022/04/15/threejs-data-texture/). In any case there are a lot of common texture class features that might need to be adjusted.

### Source code is up on Github

The source code examples that I write about here can also be found in the [folder that coresponds with this post in my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-matcap-material). With that said yes this is also where I park source code exmaples, notes, and various other assets for my [many other blog posts that I have wrote on threejs](/categories/three-js/) thus far.

### Version Numbers Matter

When I first wrote this blog post I was using [r152 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) when testing out if the demos here work okay on my end at least. Thus I am following the style rules that I have set for myself when it comes to using that revision of threejs. This means that I am now using javaScript module type script tags over that of the default, and with that an import map as well. If you do not know what I am talking about with this I sugest that you take a moment to try to get up to speed with javascript modules as this is the direciton that things are very much going when it comes to future revisions of threejs.

On another note the matcap material was [added to the core of threejs in r97](https://github.com/mrdoob/three.js/releases/tag/r97). So unless you are using what is now a very old revision of threejs the matcap material should be there to work with.

## 1 - Basic MapCap Material demos

For this section I will just be going over a few simple demos of the matcap material that aim at just getting up and running with the material. Although you can just create an instance of the material without any options, chances are you are going to want to play around at least a little with some textures to use with the matcap option. So although the main focus in this section will be on just the matcap material alone, I am also going to want to at least touch base on some ways to create textures with a little javaScript code as well.

### 1.1 - Using a canvas texture for the matcap option

I think the most basic demo of this kind of material should still include some code that is used to create the kind of texture that will typicaly be used for the matcap option. So for this fist basic section demo I will be baking use of THREE.CanvasTexture as a way to create the kind of texture that I will want to use for the matcap option. The good news with this is that there is a method in the 2d drawing context that helps to make quick work of this which is of course the Create Radial Gradient Method, along with additional methods such as the add color shop method. When calling the  Create Radial Gradient Method I will want to give the center point of the texture, along with have the width as the radius. After that the remaining arguments can be used to adjust the position and radius of the additional circle for the gradient and it is these values that can be used as a way to adjust the direction and intensity of light.


```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CANVAS / TEXTURE
// ---------- ----------
const canvas = document.createElement('canvas');
canvas.width = 128;
canvas.height = 128;
const ctx = canvas.getContext('2d');
const r1 = canvas.width / 2;
const x1 = r1, y1 = r1, x2 = r1 * 1.4, y2 = r1 * 1.4, r2 = r1 / 4;
const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
gradient.addColorStop(0, 'black');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
const texture = new THREE.CanvasTexture( canvas );
texture.colorSpace = THREE.SRGBColorSpace;
texture.magFilter = THREE.NearestFilter;
document.body.appendChild(canvas);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshMatcapMaterial({ matcap: texture });
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry(1, 30, 30);
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Using a data texture

Another way to go about creating the kind of texture needed might involve the use of a data texture to do so. This is another way to create a texture by way of some javaScript code rather than loading an external image asset. This way of doing it involves directly creating color channel data rather than using the 2d drawing context of canvas elements.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// DATA 
//-------- ----------
const size = 32;
const index_max = 9;
const v2_center = new THREE.Vector2(size * 0.5, size * 0.5);
const data_indexed = [ ];
let i = 0;
const len = size * size;
while(i < len){
    const v2 = new THREE.Vector2( i % size, Math.floor( i / size) );
    const d = v2.distanceTo( v2_center );
    const a_dist = d / (size / 2);
    let color_index = 1 - a_dist;
    color_index = color_index < 0 ? 0 : color_index;
    color_index = color_index > index_max ? index_max : color_index;
    data_indexed.push( color_index );
    i += 1;
}
const data = data_indexed.map( ( color_index ) => {
    const v = Math.round(color_index / index_max * 255);
    return [ v, v, v, 255];
}).flat();
const texture = new THREE.DataTexture( new Uint8Array( data ), size, size );
texture.needsUpdate = true;
//-------- ----------
// MATCAP MATERIAL
//-------- ----------
const material = new THREE.MeshMatcapMaterial({
    color: 0xffffff,
    matcap: texture
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10))
scene.add( new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, -0.10, 0);
renderer.render(scene, camera);
```

## 2 - Animation loop demo

One question that comes to mind with this is how would one go about updating the baked in lighting over time? Well I am sure that for the most part the best way to address that would be to just not use the matcap material and use one of the many other mesh material options that work with the various light object options. However if for some reason I do want to update the light over time one way to do so would be to use canvas textures, and just update the texture as needed.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// update a texture
const update_texture = ( texture, v_offset = new THREE.Vector2(1, 1), intensity = 1 ) => {
    const canvas = texture.image;
    const ctx = canvas.getContext('2d');
    const r1 = canvas.width / 2;
    const x1 = r1, y1 = r1, x2 = r1 * v_offset.x, y2 = r1 * v_offset.y, r2 = r1 * ( 0.125 * intensity );
    const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'white');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0, canvas.width, canvas.height);
    texture.needsUpdate = true;
};
// create a canvas texture
const create_texture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const texture = new THREE.CanvasTexture( canvas );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    update_texture(texture);
    return texture;
};
// ---------- ----------
// MATERIAL
// ---------- ----------
const texture = create_texture();
const material = new THREE.MeshMatcapMaterial({ matcap: texture });
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry(1, 30, 30);
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20,
FPS_MOVEMENT = 30,
FRAME_MAX = 120,
CLOCK = new THREE.Clock(true);
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
const v_offset = new THREE.Vector2( 1, 1)
const update = (frame, frameMax) => {
    const a_frame = frame / frameMax;
    const a_bias = 1 - Math.abs(0.5 - a_frame ) / 0.5;
    const a_smooth = THREE.MathUtils.smoothstep(a_bias, 0, 1);
    v_offset.x = -1 + 3 * a_bias;
    update_texture(texture, v_offset, 0.25 + 1.75 * a_frame);
};
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion

So I am not sure if I will be using this matcap material that much in actual projects, if at all, but in any case this does bring up some interesting topics with materials. Often the deal with materials is you go with one of the options that will respond to light sources such as the Phong, Lambert, or Standard materials and then add some light sources to the scene. However an alternative that I have found that I like to do is to just go with the Mesh Basic Material, and then just work out what shading should be with some plain old map textures, and kick lights to the curbe. I would still take that approach first and foremost when it comes to that kind of over all style, but this matcap material is a nice similar alternative that will be on my radar to say the least about it.

