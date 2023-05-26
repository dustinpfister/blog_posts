---
title: The basic material options in threejs
date: 2018-05-05 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 184
updated: 2023-05-26 11:56:48
version: 1.32
---

In [threejs](https://threejs.org/) the [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial) is the default material that is used when [creating a mesh object](/2018/05/04/threejs-mesh/) if a material is not specified as the second argument after giving the geometry to use. It is still a decent material if I want to just skin a mesh with a texture, and do not want to do anything special involving the reflection of light. There are also some other use cases that will work okay with the basic material such as using vertex colors with a geometry.

Still the basic material supports a few options when it comes to texture maps, there is the basic color map, but there is are a few more options such as an [alpha map](/2019/06/06/threejs-alpha-map/) for example. Still there are even more options when it comes to texture maps with other materials that will respond to light sources such as the [standard material](/2021/04/27/threejs-standard-material/) which I have found to be my usual go to material.

So today I thought I would continue expanding my [collection of posts on threejs](/categories/three-js/) by writing a post on the basic material, and what it has to offer when making a threejs project. This will involve a few simple hello world type examples, but I will also need to get into at least a few examples that involve the use of textures.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/2SaiqtO_yQA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## What to know before reading up more on the Basic Material

If you are new to threejs, you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on threejs as I will not be covering every little key detail about what you should know before hand here. There is a great deal to be aware of when it comes to setting things up for the first time, and I am not going to want to go over that in every one of these blog posts. However regardless of how much experience you might have with threejs and javaScript in general there are a few things that you might want to read or refresh on.

### Learn a thing or two about canvas elements, or figure out the texture loader

If you like javaScript as much as I do, but have not got into canvas elements and the 2d drawing context just yet it might be time to look into how to do at least a little drawing with [canvas elements and some javaScript code](/2017/05/17/canvas-getting-started/). The reason why I say that is because when working with the basic material one typical way to make sure that the result is not just one solid blob of color is to add some texture to the basic material. This can be done by adding at least a basic color map to the material, and in order to do that a texture is needed. There is the [texture loader](/2021/06/21/threejs-texture-loader/) of threejs that can be used to load some textures in the form of external image files, but what is cool about canvas is that it is a way to create textures with just javaScript code.

### Vertex colors, uv mapping, and other Buffer Geometry topics

Another option for having something other than a mass of color to look at would be to add a [color attribute to the buffer geometry](/2023/01/20/threejs-buffer-geometry-attributes-color/) that is being used if there is not one in place to begin with. Also if using a texture there is adjusting, or creating the [UV attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) that is used to map the 2d texture to the 3D Object.

### Be aware of what the full options are with materials

You might also want to check out my post on [threejs materials](/2018/04/30/threejs-materials/) in general for more info on the various material options in threejs. The basic material is fine when I just want to skin a geometry with a texture, but not do anything to far beyond that. There are a whole lot of other materials that might be a better choice for other situations though, for example the [depth material](/2021/05/04/threejs-depth-material/) might be a good choice when it comes to figuring out what the values should be for the near and far values of a camera. If one will want to add one or more light sources to a project these days I like to go with the [Phong material](/2022/12/29/threejs-phong-material/) for that.

### Source code is up on Github

The source code examples that I am writing about in this post can also be [found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-basic-material). This is also where I place all the source code examples that I have made for my [other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers are impotent with three.js

When I first wrote this post I was using version r91 of threejs and the last time I came around to do some editing I was using r146. Sense then not much has changed when it comes to using the basic material. Still code breaking changes are introduced all the time into threejs as new revision numbers come out, so always be mindful of the versions of threejs that was used when looking at threejs examples on the open web.

## 1 - Some basic exmaples that make use of the basic material

For this section I will be looking at a few basic examples that make use of the mesh basic material as a way to skin the geometry of a mesh object. One of the major problems with the Mesh basic material is that one will end up with a solid mass of color for any geometry unless one makes use of some option to address that. Making use of a light source is out of the question as the basic material does not support that. There is making use of a texture but that is something that I will like to leave to a more advanced section in this post. So here I will be starting out with just a few basic getting started examples, and then maybe some options that address this issue of having a solid mass of color that does not involve a texture.

### 1.1 - The Basic Material is the default material

The Basic material is the default material used for a mesh object. So if I create a mesh object by calling the THREE.Mesh [constructor function](/2019/02/27/js-javascript-constructor/) and just give a geometry by way of the first argument, but give no material as the second argument the result will be that the mesh will use the basic material. This can be confirmed by doing just that creating a mesh with a geometry and no material, and then checking the type property of the materials property of the mesh object.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// THE MESH BASIC MATERIAL IS THE DEFAULT MATERIAL IF NO MATERIAL IS GIVEN
//-------- ----------
const box = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1) );
console.log(box.material.type); // MeshBasicMaterial
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.2 - Setting the Color of the basic material

Typically I will want to use the Mesh Basic Material constructor to create an instance of basic material and pass that as the second argument when making a mesh even if it is the default material anyways. When doing so I can pass an options object to the mesh basic material constructor which can have one or more options that I would like to set. One such option would be to set a solid color for the material, for thus there is the color option. The color should follow the syntax that I have in the example below, or the [THREE.Color constructor](/2021/05/03/threejs-color/) can be used to create the color as well.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH WITH BASIC MATERIAL
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

This results in a cube that is sold red all over, but it looks like just one blob of red rather than a cube. This is often not a desired result as there is no sense of depth on the cube. If I add a light source of some kind nothing will change because the basic material of course does not work with light sources. This alone is one of the major reasons why I often like to go with the standard material so I can use a point light, directional light, or one of many other options for light sources to get some sense of depth that way. However when it comes to sticking with the basic material there are of course some options here. If I do not want to use a solid color, and just have a blob of color, then a texture can be used with the map property. A texture can then be used as a way to get some sense of depth then. 

### 1.3 - Using vertex colors

One option to go about having some depth without using a texture would be to make use of vertex colors. If you are lucky there will be a color attribute set up all ready for the geometry, but more often then not one will need to define what that is. The process of doing so is a little involved but I will be quickly touching base on a fairly simple example here. 

For this example of vertex colors and the mesh basic material I am getting a reference to the position attribute of the box geometry. Once I have that I can use the count property of the position attribute to know how many color values to create. So for the value of the count property of the position attribute I will want to push a red, green and blue color channel value. Once that is done I ca create the color attribute by calling the THREE.BufferAttribute function and pass the array of color channel data making sure that it is a Float32Array. I will also want to pass the number 3 as the second argument for the attribute as this is a situation I which I have three values for each item. I can then add my color attribute to the box geometry by calling the set attribute method followed by the string color, and then the color buffer attribute I just made.

Now that I have a geometry with a color attribute I can set the vertex colors option of the basic material to true, and the n end result will be random vertex colors.


```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY WITH 'color' attribute added
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
// get position attribute to find count of points
const att_pos = geometry.getAttribute('position');
// the count of points can then be used to know how much color data I need
const data_color = [];
let i = 0;
while(i < att_pos.count){
   data_color.push(Math.random(), Math.random() ,Math.random());
   i += 1;
}
// create and add color attribute
const att_color = new THREE.BufferAttribute( new Float32Array(data_color), 3 );
geometry.setAttribute('color', att_color);
//-------- ----------
// USING GEOMETRY WITH A COLOR ATTRIBUTE WITH THE BASIC MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial( { vertexColors: true } );
const box = new THREE.Mesh( geometry, material);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.4 - Using Geometry Groups and an array of Mesh Basic material objects

Another option would be to use not one but an [array of materials](/2018/05/14/threejs-mesh-material-index/). When doing this I will want to make sure that I have a groups property set up for the geometry. When it comes to the box geometry this is all ready set up for me, I just need to adjust the material index values as needed. If the groups property of the geometry is set up the way I want it then I just need to pass an array for materials where each material can be a basic material, with a differing color.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// USING AN ARRAY OF BASIC MATERIALS WITH A GEOMETRY THAT HAS GROUPS
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
// set material index values as needed
[0,0,1,0,2,0].forEach( (mi, i) => {
    geometry.groups[i].materialIndex = mi;
});
// uisng an array of materials
const material = [
    new THREE.MeshBasicMaterial({color: new THREE.Color(1,0,0)}),
    new THREE.MeshBasicMaterial({color: new THREE.Color(0,1,0)}),
    new THREE.MeshBasicMaterial({color: new THREE.Color(0,0,1)})
];
const box = new THREE.Mesh( geometry, material);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.5 - Using Lines as a child object of the mesh

Yet another option do have something other than a big blob of color in the scene would be to [create a Line](/2018/04/19/threejs-line/) and then add that as a child for the mesh object. The same geometry that is used for the mesh can also be used for the Line or LineSegemnets Objects, but often I might want to create a new geometry from the geometry by using THREE.EdgesGeometry.

The use of lines might work okay on most platforms, but I have found that the line width will not work on all platforms. For this reason I might want to go with other options that I have outlined in this section, mainly just using a texture, and working out what needs to happen in terms of uv mapping.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// USING THE BASIC MATERIAL, BUT ADDING A LINE AS A CHILD OF THE MESH OBJECT
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material_mesh = new THREE.MeshBasicMaterial( { color: new THREE.Color(1,0,0) } );
const material_line = new THREE.LineBasicMaterial( { color: new THREE.Color(1,1,1), linewidth: 4 } );
const box = new THREE.Mesh( geometry, material_mesh);
box.add(new THREE.LineSegments( new THREE.EdgesGeometry(geometry), material_line))
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 2.1 - Adding a color map texture to a basic material in threejs using canvas

The Basic material is a good choice if you do not what to do much of anything involving light, but do still want to have some kind of color map texture at least as a way to show that the mesh is indeed some kind of solid geometry object. A texture can be added in from an external image using a loader, or it can be created with javaScript using the 2d canvas drawing context of a canvas element.

To create a texture with canvas I am going to want to create the canvas element using the document.createElement method and then also get the 2d drawing context from that canvas element by way of the get context canvas prototype method. Getting into every little detail about the 2d drawing context with canvas is of course beyond the scope of this post. However I will start out with a basic texture where I am just drawing a circle and square on the canvas element. Once I am done drawing to the canvas element I can use the THREE.CanvasTexture constructor to create a texture with the canvas element. The resulting texture created with that constrictor can then be used as the value for the map value of the material.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ---------- 
// CANVAS
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
// set canvas native size
canvas.width = 32;
canvas.height = 32;
// draw to canvas
ctx.fillStyle = '#00ffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 3;
ctx.fillStyle = 'white';
ctx.strokeStyle = '#000000';
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 14, 0, Math.PI * 2);
ctx.closePath();
ctx.stroke();
ctx.fill();
ctx.beginPath();
ctx.rect(0,0,canvas.height,canvas.height)
ctx.stroke();
//-------- ---------- 
// CUBE
//-------- ----------
const cube = new THREE.Mesh(
    // box GEOMETRY
    new THREE.BoxGeometry(1, 1, 1),
    // BASIC MATERIAL WITH A COLOR MAP
    new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(canvas)
    })
);
scene.add(cube);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

I have written a [post on using canvas as a texture]( /2018/04/17/threejs-canvas-texture/) in which I covered this in further detail, but the basic idea is there.

### 2.2 - UV Mapping and setting images for each side of a cube using a color map and the basic material

I have made a number of threejs project examples that I write about in blog posts such as this one, and one of them has to do with the [mutation of the uv attribute of a Box geometry](/2022/11/04/threejs-examples-uvmap-cube-canvas-update/). The reason why I bring this up is because often one can not just simply create a texture by some means and then add it to the basic material by way of the map option and be done with it. There is the matter of the UV attribute and adjusting that to work with a texture. In many of these examples thus far I am working with a Box Geometry, and by default the UV attribute is set up to use all of the texture for each face of the box. More often than not this will work fine, but if I want to use differing parts of a texture for various faces of the cube then I will need to mutate the UV attribute.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCITONS
//-------- ----------
// get a uvData array for a given uv face index and cell index
const getUVData = (faceIndex, cellIndex, gridSize) => {
    faceIndex = faceIndex === undefined ? 0: faceIndex;
    cellIndex = cellIndex === undefined ? 0: cellIndex;
    gridSize = gridSize === undefined ? 4: gridSize;
    const cellX = cellIndex % gridSize;
    const cellY = Math.floor(cellIndex / gridSize);
    // for each set of uvs for the face
    let di = 0;
    const uvd = 1 / gridSize;
    let uvData = [];
    while(di < 4){
        const i = faceIndex * 4 + di;
        const x = di % 2;
        const y = 1 - 1 * Math.floor(di / 2);
        // get u and v using cellX and cellY
        const u = uvd * cellX + x * uvd;
        const v = 1 - uvd * ( cellY + 1 ) + y * uvd;
        uvData.push({i:i,u:u,v:v});
        di += 1;
    }
    return uvData;
};
// set uvs with the uvData, and order arrays
const setUVData = (uv, uvData, order ) => {
    order = order || [0, 1, 2, 3]; // normal
    uvData.forEach((a, di, uvData) => {
        const b = uvData[ order[di] ]
        uv.setXY(a.i, b.u, b.v);
    });
    uv.needsUpdate = true;
};
// main helper
const setUVFace = (uv, faceIndex, cellIndex, order, gridSize) => {
    const uvData = getUVData(faceIndex, cellIndex, gridSize);
    setUVData(uv, uvData, order );
};
//-------- ---------- 
// CANVAS
//-------- ----------
const CELL_SIZE = 4;
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
// set canvas native size
canvas.width = 128;
canvas.height = 128;
// draw to canvas
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "black");
gradient.addColorStop(1, "lime");
// Set the fill style and draw a rectangle
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
let i = 0;
const len = CELL_SIZE * 2;
const cellsize = canvas.width / CELL_SIZE;
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '32px arial';
while(i < len){
    const gx = i % CELL_SIZE;
    const gy = Math.floor( i / CELL_SIZE );
    const x = cellsize * gx + cellsize / 2;
    const y = cellsize * gy + cellsize / 2;
    ctx.fillText(i + 1, x, y);
    i += 1;
}
// draw to cells
//-------- ---------- 
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const att_uv = geometry.getAttribute('uv');
'0,1,2,3,4,5'.split(',').forEach( ( i ) => {
    setUVFace(att_uv, i, i, [0,1,2,3], CELL_SIZE);
});
//-------- ---------- 
// texture
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
//-------- ---------- 
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ---------- 
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    geometry,
    material
);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    mesh1.rotation.y = Math.PI * 2 * a1;
    mesh1.rotation.x = Math.PI * 8 * a1;
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
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

## 3 - An Alpha map with the Basic material

One more quick example of the basic material in action for now until I come around to edit this post once again at some point in the future. So the basic material is a bit limited in terms of the options when it comes to texture maps, but there are still a few to chose from, and getting into all of them might be beyond the scope of this post. Yet again maybe not, in any case I will need time to work out some more basic examples of each of the features of the basic materials when it comes to texture maps. However for now I think I will write about one more texture map option with the basic material when is an alpha map.

An alpha map is a way to apply a texture that does not change color like the color map example that I coved above, but what it does do is apply a texture that will effect the transparency of the mesh. When using the alpha map it is important to make sure that the transparent boolean of the material is set to true. In addition to that I might also want to play around with the global opacity of the material.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x002a2a);
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ---------- 
// ALPHA MAP CANVAS
//-------- ----------
const alphaCanvas = document.createElement('canvas'),
ctx = alphaCanvas.getContext('2d');
// set canvas native size
alphaCanvas.width = 32;
alphaCanvas.height = 32;
// draw to canvas
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, alphaCanvas.width, alphaCanvas.height);
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 3;
ctx.strokeRect(3, 3, alphaCanvas.width - 6, alphaCanvas.height - 6);
//-------- ---------- 
// MESH USING BASIC MATERIAL with an alpha map
//-------- ----------
const cube = new THREE.Mesh(
    // box GEOMETRY
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.5,
        color: 0xffffff,
        alphaMap: new THREE.CanvasTexture(alphaCanvas)
    })
);
scene.add(cube);
//-------- ---------- 
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

For this example of an alpha map I once again used a canvas element as a way to create a texture. However when it comes to alpha maps I want to make sure that the resulting image is in gray scale. The levels of black and white are what are used to set the range of opacity and transparency.

## Conclusion

The basic material is just as the name suggests, there are other materials to use in three.js if you want to do something more advanced but the basic material gets the job done when it comes to simple projects. There is of course the Lambert material that is a good choice if you want to do something involving light in a real time environment. There are of course many other [materials](/2018/04/30/threejs-materials/) to chose from when working with a [mesh](/2018/05/04/threejs-mesh/) as well that might have better values to offer when it comes to how things look compared to how much resources they eat up. 
