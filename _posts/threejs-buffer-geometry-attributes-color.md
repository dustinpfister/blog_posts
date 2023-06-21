---
title: Material Vertex Color and the buffer geometry attribute used for doing so
date: 2023-01-20 09:35:00
tags: [three.js]
layout: post
categories: three.js
id: 1024
updated: 2023-06-21 13:17:52
version: 1.9
---

One of the core features of the[ base material class](https://threejs.org/docs/#api/en/materials/Material.vertexColors) in threejs is a vertex colors Boolean that when set to true will cause the material to be rendered using color channel data stored in an attribute of the [buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) used. This feature should work with most materials, although some might require a light [source](/2022/02/25/threejs-light/) might still be needed or something to that effect. It will not work at all with certain materials such as the mesh normal material, however it is still very much a feature of the base material class. So then unless there is something else going on that will override this vertex color feature it should work many materials including line and point materials.

 I would say that the color attribute is not one of the major must have attributes of a buffer geometry. However it is an example of an additional attribute that can be added to a geometry to allow for coloring an over all mesh object apart from other options that will have to do with textures and uv mapping. It is then not at all a replacement for [uv mapping](/2021/06/09/threejs-buffer-geometry-attributes-uv/), and the various material options that can be used with textures. However it is an alternative way of coloring a mesh object that works by adding data to geometry rather than bothering with images. In some cases I might want to use vertex colors as a quick way to have something other than just a single solid color, but I am not sure I would take this kind of approach in the long run, at least not with the built in materials anyway.

The main thing that got me into vertex colors is that recently I got around to writing a new blog post on the [shader material](/2023/01/13/threejs-shader-material/). Simply put it is a way to go about creating a custom material using GLSL. When doing so I have found that vertex coloring might be a nice way to go about styling a geometry, and when it comes to creating my own materials that opens the door for custom attributes that will allow for not just creating one color attribute but several such attributes.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/nsjFS2VRjpM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Vertex colors and what to know first

This is a post in which I am writing about one little feature of a javaScript library known as threejs that has to do with 3d modeling. It should go without saying but this is not a post for people that are new to threejs let alone with programming in javaScript in general. So if you are still fairly new to threejs there is starting out with some [post that is about getting started with threejs](/2018/04/04/threejs-getting-started/) before getting into things like the vertex color attribute of buffer geometry objects. Even if you do have some experience with threejs there are still a few things that you might want to brush up on before continuing to read the rest of this post.

### Check out more on buffer geometry and buffer attributes

There is a whole lot more to [buffer geometry](/2021/04/22/threejs-buffer-geometry/) beyond just that of color attribute. There is also being aware of the other buffer attributes of buffer geometry such as the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) which would be a good starting point when it comes to the attributes of geometry. I say that because in order to have a geometry that will present much of anything even when using the points class to show it, at a minimum one will at least need a position attribute first.

### Source code examples are also up on Github

The source code examples in this post are also [up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-attributes-color), along with all the other source code examples for my [many other posts on threejs](/categories/three-js/).

### Check your version numbers

When I first wrote this post I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) and thus I followed the style rules that I set for that revision. Always be mindful of what version of threejs you are using, and also if possible what revision an author of code examples was suing also.

## 1 - Some basic examples of the vertex color buffer geometry attribute

To start out in this section I will be going over a few quick basic example of color attributes in buffer geometry. There are two general things to keep in mind here one is that the color attribute will need to be added to the geometry if it is not there to begin with, and then there is also choosing a proper built in material to use with the color attribute by setting the vertex color attribute to true. So for the most part the examples here will focus on just adding the color attribute to begin with, and also test out things with the various built in material options while I am at it.

### 1.1 - Vertex colors hello world example

One has to start somewhere when it comes to this sort of thing, and with that said that is what this example is about right here. So when it comes to a vertex color hello world threejs example this is what I put together real quick. Like with any other threejs example I start out by setting up my scene object, camera, and renderer objects just the way that I like to. After that I will want to create a geometry and add a color attribute to it. Once I have the set up I will then want to create the material that i will want to use with the geometry when creating the mesh object, when doing so I will want to go with a material that will work well with vertex colors such as the [mesh basic material](/2018/05/05/threejs-basic-material/). After that I can then use the geometry and material to create a mesh object, add it to the scene object, and render the scene.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 4, 60, 60 );
// adding a color attribute
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material1 = new THREE.MeshBasicMaterial({
    vertexColors: true
});
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, material1);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.2 - Mesh Material options

One might assume that because the vertex color Boolean is a property of the base material class this feature will work with all materials. For the most part that is true, but there are a few exceptions. Also when it comes to materials that work with light sources one will still need to add one or more lights to the scene, and make sure that they are using a renderer that will work with such light sources.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
camera.position.set(4, 2, 5);
camera.lookAt(2.5, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);

// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 0.5, 60, 60 );
// adding a color attribute
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// MESH OBJECT FOR EACH BUILT IN MESH MATERIAL
// ---------- ----------
const meshOpt = {
    vertexColors: true
};
// looks like vertex colors work with just about all of them, with the exception of Depth and Normal materials
'Basic,Depth,Lambert,Matcap,Normal,Phong,Physical,Standard,Toon'.split(',').forEach( (matStr, i) => {
    const x = i % 5;
    const y = Math.floor(i / 5);
    const material = new THREE['Mesh' + matStr + 'Material'](meshOpt);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(0.5 + x, 0, 0.5 + y)
    scene.add(mesh);
});
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2,1,0)
scene.add(dl);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.3 - Lines and vertex colors

Vertex colors are very much a property of the base material class, and the base material class is not just used as a base class for mesh materials. The base material class is also very much the base of the two line materials, and also the points material. So one thing that is nice about vertex colors is that it is a great way to style lines and points when one is making use of those features of the core threejs library.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
camera.position.set(5, 4, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 3, 10, 10 );
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// Line - vertexColors boolen is a Material base class prop, so it works with LineBasicMaterial
// ---------- ----------
const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 6 });
const line = new THREE.Line(geo, material);
scene.add(line);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.4 - Points and vertex colors

[Points objects](/2023/02/23/threejs-points/) like that of lines can also prove to be a nice alternative to that of the usual mesh object when it comes to displaying the state of a geometry. Just like with lines the geometry needs to at least have a position attribute to display anything at all. Again just like with the liens materials the points material is also based off of the common material class, and sense vertex colors is a feature of the base material class they do indeed work when there is a color attribute in the geometry.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.BoxGeometry( 4, 4, 4, 8, 8, 8 );
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// POINTS
// ---------- ----------
const material = new THREE.PointsMaterial({ vertexColors: true, size: 0.25 });
const points = new THREE.Points(geo, material);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5, 4, 5);
camera.lookAt(0, -0.5, 0);
renderer.render(scene, camera);
```

## 2 - Updating a color attribute over time

Just like all the other buffer attributes the process of updating the attribute of more or less the same. I just need to mutate the values in the array of the color buffer attribute and then make sure that the needs update Boolean is set to true.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, -1.25, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// just make a color array
const make_color_array = (geo, a1, a2, a3) => {
    a1 = a1 === undefined ? 1 : a1;
    a2 = a2 === undefined ? 1 : a2;
    a3 = a3 === undefined ? 1 : a3;
    const len = geo.getAttribute('position').count;
    const color_array = [];
    let i = 0;
    while(i < len){
        const a_index = i / len;
        const a_indexbias = 1 - Math.abs(0.5 - a_index) / 0.5;
        color_array.push(a1, a_indexbias * a2, 1 - a_indexbias * a3);
        i += 1;
    }
    return color_array;
};
// update color attribute
const update_color_attribute = (geo, a1, a2, a3) => {
    const color_array = make_color_array(geo, a1, a2, a3);
    const color_attribute = geo.getAttribute('color');
    if(color_attribute){
        color_attribute.array = color_attribute.array.map((n, i) => {
            return color_array[i];
        });
        color_attribute.needsUpdate = true;
    }else{
        const new_color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
        geo.setAttribute('color', new_color_attribute);
    }
};
// get bias alpha helper
const getBias = (a1, count) => {
    return 1 - Math.abs(0.5 - a1 * count % 1) / 0.5;
};
// ---------- ----------
// GEOMETRY, MATERIAL, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 4.00, 1.75, 80, 80 );
geo.rotateX(Math.PI * 0.55)
update_color_attribute(geo, 1, 1, 1);
const material1 = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 15,
    specular: new THREE.Color(0.75, 0.75, 0.75)
});
const mesh1 = new THREE.Mesh(geo, material1);
scene.add(mesh1);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(5, 3, 1);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(al);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = getBias(a1, 1);
    const a3 = getBias(a1, 8);
    const a4 = getBias(a1, 16);
    update_color_attribute(geo, a2, a3, a4);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion


There are a lot of things that I like about vertex colors, part of me seems to like doing everything with javaScript code and data in the form of text files. I guess maybe the main reason why is because it allows for nice quickly copy and paste style code examples that i can just place into a blog post such as this one. When it comes to making use of external images that make the process a little more complex, but I guess the same is true when it comes to pulling code and data into other files that I then like to so I guess I should get over that kind of thing, and I do now and then of course. With that said although vertex colors are cool, when it comes to working on a real project I am not sure of I would use vertex coloring. Maybe I would, but I am sure that I would want to also get into writing some custom shaders also if I where going to do so. When it comes to working with the built in materials alone though, it is best to get into uv mapping and creating textures for one or more of the map options.

