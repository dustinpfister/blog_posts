---
title: Materials in threejs an overview options and features
date: 2018-04-30 09:14:00
tags: [three.js]
layout: post
categories: three.js
id: 181
updated: 2023-08-13 10:32:55
version: 1.114
---

In [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are a few materials to choose from to help skin a mesh object that all share the same common base [Material class](https://threejs.org/docs/index.html#api/en/materials/Material). There are also additional materials for rendering lines, points, and sprites that stand out from the various materials that are used to change the look of of the typical mesh object. There is also the shader material that is a good way to get started with raw GLSL code, but with training wheels thanks to the shader lib of threejs, that is used to author custom shaders, and thus do just about everything that can be done with materials in a web browser by way of full power that is WebGL. There is then also the Raw Shader material in which one will drop kick the shader lib to the curb and just work directly with GLSL by itself.

There are materials that will respond to a light source, and then there are materials that will not. When it comes to materials that respond to light some will preform a little better than others, but will result in a less than desirable look compared to others that are a little more resource heavy but deliver in the looks department. When it comes to mesh materials that will not respond to a light source there are materials like the basic mesh material that is a good choice when it comes to just having a simple color map for the mesh. There are a few other materials that render textures based on the state of the normal attribute of the geometry used, or based on the depth in terms of a distance from the camera.

There is a whole lot to take in when it comes to materials, so this post will serve as a general overview of the materials in general in threejs then, not just as a starting point, but also as a fairly comprehensive post on the subject. However this will not be a truly comprehensive post on materials alone in threejs mind you as once one gets into custom shaders you will start to understand that even this post is not a even a drop in the bucket with this subject. As I have stated, just above there is the matter of GLSL code which is short for openGL Shader Language, so in other worlds when it comes to getting into THREE.ShaderMaterial, and THREE.RawShaderMaterial there is a whole language to learn.

I will start out this post with a whole lot of basic examples that at least touch base on various materials related subjects to be begin with. For example there is just simply having a simple \"I am bender, please insert girder\" type example of just simply adding texture to a material, but then also have a whole section in this post on just the subject of textures alone with materials.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/J7iGSqVXyzM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Materials in threejs and what to know first

This is not my [getting started post on threejs](/2018/04/04/threejs-getting-started/), if you are new to threejs you might choose to start with a post in which the basics of the library are covered. I assume you have basic knowledge of how to make a threejs project, and now only seek to have a deeper understanding of materials to work with when it comes to creating mesh objects. Also even if you have some experience with threejs there is a whole lot of other topics that branch off from the use of materials of course, much of which I will at least touch base on in this post. Still in this section I will be writing about a few things that you might want to read up more on regardless of experience, before reading this post in part or full.

<iframe class="youtube_video" src="https://www.youtube.com/embed/EouYzHldZd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### The color class, and the color and emissive options of materials

The [Color class](/2021/05/03/threejs-color) can prove to be useful for creating color values for the various material options that expect a color for the value. Also it is a helpful tool for working with color in general. For example it can be used in the process of creating a color from some expressions that compute values for each color channel and then the get style method can be used to get a string values that can be used to set the fill or stroke style when drawing to a canvas element

Speaking of color many materials have a way to set a color option for the material, but how this works will change a little from one material to another. For example the basic material will not do anything with light, so when a solid color is set for the basic material that will just be the solid color for all the faces of the geometry used in the mesh. This might lead one to assume that will be the case in all other materials, but that is not true. The color property in the standard material is more or less the same thing, but it works in conjunction with what is going on when it comes to light in a scene. So if I set a solid color for an instance of a standard material, but do not add light to a scene, then I will not see anything. So when it comes to the standard material there is another property that comes into play called the emissive property. It is this emissive property that I use to set a color that will always show up not matter what when it comes to what might be going on with light.

### Lots of overlap with Materials and Geometry

There is a lot of overlap between materials and geometry of course so you might want to read more on the [subject of geometry in general](/2021/04/22/threejs-buffer-geometry/) then. For example certain features of materials will not work at all if corresponding attributes of the geometry are not there such as the Vertex Colors options of the base material class which will not work if there is no color attribute in the geometry.

Speaking of buffer geometry attributes it might not be such a bad idea to look into what the [position](/2021/06/07/threejs-buffer-geometry-attributes-position/), [normal](/2021/06/08/threejs-buffer-geometry-attributes-normals), and [uv](/2021/06/09/threejs-buffer-geometry-attributes-uv/) attributes of a geometry are if you have not done so at this time.

### Source is also on Github

The source for these examples is [also on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-materials) in my test threejs repo. In the specific folder for this post I also have additional notes when it comes to future edits, as well as links to additional resources and so forth. 


This test threejs repo is also where I place all the source code that I work out for my many [other blog posts on various threejs topics](/categories/three-js/) as well.

### Version number matters with three.js

Threejs is a project in which the version number matters a whole lot as older posts on threejs often contain examples that will break on newer revisions and vise versa. When I first started writing this post I was using [three.js 0.91.0 (r91)](https://github.com/mrdoob/three.js/tree/r91). However the last time I came around to edit this post I updated all of the demos to what I have layed down for my [r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). This means that for the demos in this post I am still using plain javaScript script tags over that of modules type script tags. 

However r146 will be the last revision in which I will be using plain text/javaScript mime type script tags as future code style rules will observe the use of module type script tags. There are a whole lot of code breaking changes up ahead that I will not be getting into detail about here. However I will say that it is as always very important to know what revision you are using, and also what revision an author of content might have used when writing a post such as this.


## 1 - Basic getting started type exmaples of matreials

There is a whole lot to say about materials in general, so this is going to be a very lengthy post. However there is just going over a few very basic examples of materials that should help to address most general concerns when first getting started with materials. There are for example a number of options for mesh materials that will help to show depth right away without getting too in depth with lights and various more advanced options. However there is still getting into some of those more advanced options just in a simple striped down way. There are also a lot of things that I would like to at least touch base on here that I will then expand more with in later more advanced sections in this post.

### 1.1 - First Things First, A Basic Mesh example

One of the best ways to get started is to just create a geometry with one of the built in geometry class constructor functions such as THREE.BoxGeometry to create the geometry for a mesh object. When it comes to a mesh material options that will help show some depth without a light source a good one for that would be the mesh normal material. I will be going over what all the mesh material options are in a section later in this post, but for now there is just getting this very first simple demo up and working.

So after setting up the usual collection of objects when it comes to things like the main scene object, camera, and renderer I then create an instance of the mesh normal material. When doing so I am not going to bother with any options at all. There are of course options for the mesh normal material, as well as base material class options as well as a whole lot about geometry as well. However much of that will have to come up in later examples in this section and post over all.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE NORMAL MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial();
//-------- ----------
// MESH with Box Geometry with the 
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - More than one kind of object, so more than one kind of material

Most of the time I do very much use mesh objects, but there are also line and point objects as well that can be used as a way to display some content. For this example then I am creating a mesh and using the basic material for the mesh. This will often result in just a solid mass of color in the canvas when just used with the color option and nothing else. There are ways of dealing with this such as using a texture as a way to show some depth with this kind of material, but another way would be to add points, lines or both in this case as child objects of the mesh which is the main focus of this demo.

When it comes to using a line I must use the LineBasicMaterial or the LineBasicMaterial. When it comes to points there is just the point material alone that can be used to add style to these kinds of objects. There are some options that are just for each kind of material alone. For example the size option is just for points, and the lineWidth options is just for lines. However there are common options as well such as color in this example that are gained from the common base material class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material_mesh = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const material_line = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 6});
const material_points = new THREE.PointsMaterial({ color: 0xff0000, size: 0.25 });
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry_edge = new THREE.EdgesGeometry( geometry );
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( geometry, material_mesh );
mesh.add( new THREE.LineSegments( geometry_edge, material_line ) );
mesh.add( new THREE.Points( geometry_edge, material_points ) );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Just getting started with texture and materials

One of the first things that many will want to figure out right away is how to go about getting started with textures and how to apply these textures to objects. Of course there is a great deal to cover when it comes to this, and not just with respect to the lengthy volume of options for materials that will take a texture as the value. There is a great deal of overlap with geometry as well when it comes to advanced topics surrounding the uv attribute of geometry and so forth. Still one has to start somewhere when it comes to textures and materials, so lets start out with a basic example of that then.

Although there is a lot to say about the geometry on top of the material option used, for this demo the focus is just going to be on how to get a texture to begin with. There is of course loading one or more images and then using those images as a way to create texture object. However there is also the subject of how to go about creating textures by way of some javaScript code. With that said the best way to go about doing that might very well be by way of canvas textures. This is a way to go about creating a texture object by passing a canvas element, and when it comes to creating the content of that canvas one can use everything there is to work with when it comes to the 2d drawing context, or any context for that matter.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 32; canvas.height = 32;
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// MATERIAL - using basic material with the map option
//-------- ----------
const material = new THREE.MeshBasicMaterial({ map: texture });
//-------- ----------
// GEOMETRY, MESH
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Although a demo like this might be a good start there is a whole lot more to be aware of when it comes to textures, features of geometry objects such as the UV attribute, and of course a massive amount of things to be aware of when it comes to material options and textures. What there is to work with in terms of material options will change form one material to the next. Also the way that options work will change form material to material as well including this map option as it will not work the same way as with the Basic Material in other mesh material options such as the Phong material. Be sore to read on with my Mesh Materials section and the textures section in this post for more details with this.

### 1.4 - Arrays of materials

One of the many subjects that I see being overlooked in other blog posts on materials in general is the subject of using an array of materials rather than just one for a display object. This subject alone can quickly turn into a time consuming black hole if one lets it become that and I have many times done just that over the years. There is a lot of overlap with this subject as there is not just simply passing an array of materials but also adding or changing the state of the groups property of the geometry.

For the sake of this basic section demo though there is just using the box geometry constructor as this has a groups property set up to begin with. Also on top of that the groups are set up to make use of six materials one for each side of the box which would often be the case when doing this sort of thing. So to get started with this as least one will just need to pass an array of six materials rather than just one when making the mesh object that will use the box geometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    [
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 1.0, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 1.0, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 1.0, side: THREE.DoubleSide })
    ]
);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0.75, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Do not let this fool you though if you thing that this is how to add texture to 3d objects. The first and foremost way to do this would typically be to use just one material, with one texture, and a well worked out uv attributive for the geometry. However some times there are in fact situations in which it would be a good idea to use more than one material, and this is how to get started with it. Once again the groups are set up to begin with in this demo though, so when it comes to working on an asset of some kind one might need to work out the state of the groups array. I have a more advanced section in this post where I get into this subject more in depth, with demos that make use of the add group method of the buffer geometry class for example.

### 1.5 - UV mapping and textures

Although an array of materials can be used as a way to skin each side of a Box Geometry, this is not the way to go about skinning a geometry in general. The first and foremost way to skin a Box Geometry, or any geometry for that matter is to create, or in this case mutate the values of the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/). This attribute of a geometry contains offset values for each point in the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of the geometry which is the actual points in space.

Anyway when it comes to a box geometry the UV attribute is set up for us to begin with. However by default the values are set in such a way that all of the content of the texture will be used for all of the faces of the box. Often this might very well be what I would want to happen when creating this kind of geometry anyway. However in some cases I might want to map just one area of a texture to one face, and then another area to another face and so forth. To do that I will need to write a little logic to set the values of the uv attributes to what I want for that kind of situation which is what I am doing in this demo.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT, TEXTURE - Whole Bunch of cells
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1024; canvas.height = 1024;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const w = 8;
const wp = canvas.width / w;
const len = w * w;
let i = 0;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '100px arial';
ctx.lineWidth = 3;
while( i  < len ){
    const a_cell = (i + 5) / (len + 15);
    const x = i % w;
    const y = Math.floor( i / w );
    ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
    ctx.fillRect(x * wp, y * wp, wp, wp);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#5f5f5f';
    ctx.fillText(i, x * wp + wp / 2, y * wp + wp / 2);
    ctx.strokeText(i, x * wp + wp / 2, y * wp + wp / 2);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// MATERIAL - using basic material with the map option and the texture from canvas
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const att_uv = geo.getAttribute('uv');
const cellX = 5, cellY = 3; // cellX and cellY can be used to set the cell to draw in the texture
const cx = 1 / w * cellX;
const cy = 1 / w * cellY;
const faceIndex = 2; // the face index to use
const i2 = faceIndex * 4;
att_uv.setXY(i2,     0.000 + cx, 1.000 - cy);
att_uv.setXY(i2 + 1, 0.125 + cx, 1.000 - cy);
att_uv.setXY(i2 + 2, 0.000 + cx, 0.875 - cy);
att_uv.setXY(i2 + 3, 0.125 + cx, 0.875 - cy);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So what is going on with this demo on basic UV mapping and materials is that once again I am just passing a texture for the map option of an instance of the Basic Material. However this time when it comes to the nature of the texture I have worked out a little logic where I am drawing a whole bunch of cells in the texture. I will then want to have a way to draw a given cell in the texture to a given face index, and that is what I am doing with the additional logic that has to do with the mutation of the UV attribute values.

There is a whole lot more to write about this sort of subject of course that I will have to get into more later in this post in the texture section. However I wanted to work out at least one basic section demo of this along with the material array index values demo just to make it clear right away that an array of materials and the groups array is just one tool that is not a replacement for UV mapping.

### 1.6 - A Basic Starting example of light and a material that will work with light

There is a whole lot of get into when it comes to the subject of adding light to a scene, and using materials that will work with one or more light sources. With that said I do very much have an advanced section in this post in which I get into this subject in depth. However this is still very much the basic section  of the post so if you just simply want to get started with light the demo I have here should be just that.

First off not all mesh material options will even work with a light source to begin with. So if you are using say the MeshBasicMaterial and wondering why it is that the light source you added is not working that is why. I have a section in this post in which I go over the various options for mesh materials, including the ones that will work with light, but for now I am just going to go with the Phong Material.

When working with a material that will respond to light sources the color option of the material will be the color that will show up to one extent or another depending on what the situation is with lighting. If you are wondering if there is another kind of material option that will define a color that will always show up regardless of what is going on with light the typical option for that in most mesh material options is the emissive color option. Be default this is set to black, so you might want to set it to something other than black if you want to use this color option. There is then also adjusting that by way of the emissive Intesnity option. The Phong material has a few other options that are relevant to the use of light such as the specular color and the shininess options.

There is then the question of what kind of light source to add. I will not be getting into depth here with that of course, so for now I think a good starting option for that might be directional light.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    emissive: 0x2a2a2a,
    emissiveIntensity: 0.15,
    specular: 0x8f8f8f,
    shininess: 12
});
//-------- ----------
// LIGHT SOURCE
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 4, -2).normalize();
scene.add(dl);
//-------- ----------
// GEOMETRY / MESH
//-------- ----------
const geo = new THREE.SphereGeometry(1, 60, 60);
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So this might be a good starting point for light but there is still a whole lot more to read about when it comes to the various material options that a relevant to the use of light. There are a number of various texture map options for example, and also various little details from one mesh object to the next. If you want to read more on this there is the advanced light section later in this post in which I will be expanding more on this topic.

### 1.7 - More than one map option when it comes to textures

In this section I all ready covered a basic example of getting started with texture. However that demo would just make use of the map option of the mesh basic material. Just using that map option of that material alone is not such a bad idea mind you, that can prove to be a simple way of just getting what I want to do done and then move on with things. However now that I covered a demo in this section that has to do with light I can now write about the emissive map option that is often found in materials that work with light sources. While I am at it I should also maybe make this demo about another typical map option that is found in most materials such as the alpha map option.

You see when using the basic material the texture that I give by way of the map option will just show up, but when I give such a texture to a material like the standard material the map texture will only should up for parts of the mesh where light it hitting the surface. So then this is where the emissive map comes into play, and with that the emissive color option and other standard material options such as emissive intensity. This emissive map will show up regardless of what is going on with light, however I will want to make sure that I am setting the color to something other than the default black color, and I might also want to adjust the intensity when using these kinds of maps. 

```js
//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const canvas_texture_grid = ( grid, size = 4, palette = null ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    grid.forEach( (a, i) => {
        const x = i % canvas.width;
        const y = Math.floor( i / canvas.width );
        if(palette){
            ctx.fillStyle = palette[a];
        }
        if(!palette){
            ctx.fillStyle = new THREE.Color( a, a, a).getStyle();
        }
        ctx.fillRect( x, y, 1, 1);
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    return texture;
};
//-------- ----------
// TEXTURES
//-------- ----------
const texture_map = canvas_texture_grid([
   0, 0, 0, 0,
   0, 1, 1, 1,
   0, 1, 2, 2,
   0, 1, 2, 2
], 4, [ 'red', 'green', 'blue' ]);
const texture_emissive = canvas_texture_grid([
   0.10, 0.20, 0.20, 0.10,
   0.20, 0.80, 0.80, 0.20,
   0.20, 0.80, 0.80, 0.20,
   0.10, 0.20, 0.20, 0.10
], 4);
const texture_alpha = canvas_texture_grid([
    0.00, 1.00, 1.00,0.00,
    1.00, 0.25, 1.00,1.00,
    1.00, 1.00, 0.25,1.00,
    0.00, 1.00, 1.00,0.00
], 4);
//-------- ----------
// BASIC MATERIAL USING A TEXTURE FOR THE MAP OPTION
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture_map,
    emissive: 0xffffff,
    emissiveMap: texture_emissive,
    emissiveIntensity: 0.75,
    alphaMap: texture_alpha,
    transparent: true,
    side: THREE.DoubleSide
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(6, 2, 1);
scene.add(dl);
scene.add(new THREE.GridHelper(10, 10));
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.75, 1.2, 1.5);
camera.lookAt(0, -0.10, 0);
renderer.render(scene, camera); // render
```

Another map of interest might be the alpha map, this is a way to define what the transparency effect should be for one part of a texture compared to another. The texture that I will want to give with this one should be in gray scale and the value of the gray scale will be what the opacity value should be for that part of the texture.

## 1.8 - Common Base Materials class features

I have read a lot of posts on materials on materials in threejs over the years, and continue to do so, and one thing that I see authors failing to do over and over again is to emphasize the importance of being aware of what there is to work with in the common base materials class. All mesh materials, as well as the various other materials that are used with other display objects all extent from the common material class. There is a whole lot to be aware of just in the base class alone, as such I have a whole section in this post on the subjects of the Material class.

For this demo alone though in the basic section of this post I will just be going over a quick example of the vertex colors feature of the base material class. This is just simply a Boolean value that can be set for any material that will cause the  material to use vertex coloring. Now this feature might not work for all materials mind you as just because something is a base materials class feature that does not mean that it will work in all materials. For this vertex color option for example it will not work with materials such as the Mesh Normal Material for example. Never the less this is very much a base material class feature that will work in most materials.

This vertex coloring is  a way to show depth by way of an additional buffer attribute that can  be added to a geometry that contains color channel data for each point in the position attribute of the geometry that is used.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material_mesh = new THREE.MeshBasicMaterial({ vertexColors: true });
const material_line = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 2});
const material_points = new THREE.PointsMaterial({ vertexColors: true, size: 0.25 });
//-------- ----------
// GEOMETRY - with color
//-------- ----------
const geometry = new THREE.SphereGeometry( 1, 16, 16 );
const len = geometry.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a_len = i / len;
   color_array.push(a_len, 0,  0 );
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array( color_array ), 3);
geometry.setAttribute('color', color_attribute);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points = new THREE.Points( geometry, material_points );
points.position.x = 2;
scene.add(points);
const line = new THREE.Line( geometry, material_line );
line.position.x = 0;
scene.add(line);
const mesh = new THREE.Mesh( geometry, material_mesh );
mesh.position.x = -2;
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.9 - Basic example of the not so basic THREE.ShaderMaterial

This is then a basic getting started at least type example when it comes to using THREE.ShaderMaterial for making custom materials with a little GLSL code. For this example I am just going to have a solid mass of white color for the geometry. Of course there is a great deal more to write about when it comes to this subject and for that I have a full section on this topic later in this post.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        void main() {
            gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
        }`
});
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry( 1, 16, 16);
const mesh = new THREE.Mesh(geometry, material1);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Overview of Mesh Material Options

There might be points, lines, and sprites, but for the most part just about every threejs project will make use of Mesh objects, or a similar kind of object that will also make use of one of the Mesh Materials that there are to work with. There is a whole lot to be aware of with these so it is called for in a post such as this to go over each of the mesh material options and write a thing or two about what each of them are good at, and also there limitations of course.

Keep in mind that if you feel that you are getting overwhelmed with all of this the most important thing is application. If you want to go with a certain style the involves low poly models, a simple color map, and not bother at all with light in any capacity then just going with the Mesh Basic Material might prove to work okay. Things just get a little complex when you start pulling light into the mix, or you need to do some kind of weird custom rendering to which even none of these might work okay and as such you might need to go with the shader material and some custom GLSL code. However getting into that is a matter for a later more advanced section in this post.

### 2.1 - The not so basic, basic material that is THREE.MeshBasicMaterial

The [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial) is the kind of material that I would use if I do not aim to do anything special with light. The basic material will not respond to any light sources, and the faces will be filled with a solid color if it is just the color option alone that will be used with it. However there are a lot of options when it comes to doing things to show some depth, one option would be to create a texture by one means or another and use that with the map option. Another option would be to add a color attribute to the geometry that is used, and then set the vertex color boolean of the material to true.

Do not let the name fool you with this one, as that is a mistake I see other authors of content like this make over and over again. The Basic material is not so basic, you still have everything that there is to work with in the common base material class, as well as a lot of features with the Basic material itself. Not to mention that there is also adding an additional child object of some kind such as lines that use a geometry that is created by passing the geometry of the parent object into the edge geometry constructor. Then adding the line object as a child of the mesh object as yet another way to show some depth as I covered back in the basic section of this post.

If using textures to show depth there is then doing some shading when drawing the textures themselves that are to be used with the geometry that is worked out. With this said this is often the typical use case when it comes to using this material in an actual project.

```js
//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE BASIC MATERIAL
//-------- ----------
const data = [
    100,100,100,255,  150,150,150,255,  150,150,150,255,  100,100,100,255,
    150,150,150,255,  200,200,200,255,  200,200,200,255,  150,150,150,255,
    150,150,150,255,  200,200,200,255,  200,200,200,255,  150,150,150,255,
    100,100,100,255,  150,150,150,255,  150,150,150,255,  100,100,100,255
];
const texture = new THREE.DataTexture(new Uint8Array( data ), 4, 4);
texture.needsUpdate = true;
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10))
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.75, 1.2, 1.5);
camera.lookAt(0, -0.10, 0);
renderer.render(scene, camera); // render
```

There are a number of ways of going about using the map option all of which will involve getting a texture object one way or another, such as using the [texture loader](/2021/06/21/threejs-texture-loader/) to load in a texture from an external image, but there are also a number of ways of doing so that will involve the use of some javaScript code to create a texture. One option would be to use [canvas elements](/2018/04/17/threejs-canvas-texture/), and another would be to make use of the [data texture constructor](/2022/04/15/threejs-data-texture/) as a way to create a texture from raw color channel data as I went with in this demo.

### 2.2 - THREE.MeshDepthMaterial

Another mesh material option that will not respond to light sources would be the [depth material](/2021/05/04/threejs-depth-material/) that will shade a geometry of a mesh based on the distance of the mesh object from the current position of the camera. Speaking of cameras there is the near and far values of camera objects such as the perspective camera that are a major part of getting this material to look right. With that said that is one good use case of using this material now and then as it makes me thing in terms of what the values should be for those properties of a camera object.

There does not appear to be much to write about in terms of other properties to know about with this one aside from the fact that the depth packing encoding can be changed from the default which is basic depth packing. The only other constant seems to be THREE.RGBADepthPacking apart from what the default if for this option which would be THREE.BasicDepthPacking. All the other options that are not Base material class options are options that I see in other materials.

```js
//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
// NEAR AND FAR VALUES MATTER WITH THE DEPTH MATERIAL
const near = 0.5,
far = 100;
const camera = new THREE.PerspectiveCamera(45, 4 / 3, near, far);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || docuemnt.body).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE DEPTH MATERIAL
//-------- ----------
const material = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add( new THREE.GridHelper(10, 10) );
scene.add( new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


### 2.3 - The THREE.MeshLambertMaterial

In some ways the [Lambert material](/2018/04/08/threejs-lambert-material/) is a good choice for having a general use case material that will work with light sources. It might prove to eat up the least amount of overhead compared to a lot of the other options so it might be a good idea to start with this one in any kind of real time project such as a game. However there is also the way that the end result looks when it comes to this kind of material and because this material lacks secular highlight features, it might not prove to be the best choice for certain types of surfaces such as metal, or any kind of polished surface. It will still look just fine with many surfaces though such as untreated wood, stone, dirt, and most fabrics.

```js
//-------- ----------
// Scene
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE LAMBERT MATERIAL
//-------- ----------
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xff0000,
    emissiveIntensity: 0.5
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(4, 2, 1);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera); ;
```

### 2.4 - THREE.MeshNormalMaterial

The [normal material](/2021/06/23/threejs-normal-material/) has to do with [vector normals](https://en.wikipedia.org/wiki/Normal_%28geometry%29) that exist in the [normal attribute of a buffer geometry instance](/2021/06/08/threejs-buffer-geometry-attributes-normals/) that is used with the mesh object. Coloring of the shape is based on the direction of the vector normals then, but the material does not take into account anything that is going on with light in a scene unlike other materials that make use of the normal attribute of the geometry. 

This material then might serve well as a kind of debugging tool when working out any kind of problem that might be going on with the normals of a geometry as the final result should have a certain look when the normals are set in such a way that is typically what is desired with these values. However I would say that the mesh normal material is just one tool in the toolbox with that sort of thng and there are other add on features that I would say have more weight for that kind of task, mainly the [VertexNormalsHelper](https://threejs.org/docs/#examples/en/helpers/VertexNormalsHelper).

I do often use this material for many of my demos in posts such as this one, the main reason why is that it is a nice quick way to show some depth without having to do something a bit advanced with things like adding light sources, color attributes, textures and so forth.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE NORMAL MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial();
//-------- ----------
// MESH with Box Geometry with the 
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material ));
scene.add( new THREE.GridHelper(10, 10) )
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.5 - THREE.MeshPhongMaterial

The [phong material](/2022/12/29/threejs-phong-material/) is another option for a material that will respond to a light source. Unlike the Lambert material the Phong material dos support secular highlights which makes it a better choice for polished shiny surfaces. However I might still want to go with Lambert all around if it is a real time project, or add some features for allowing users to change what material is used for certain objects in display settings when it comes to working out features that might help to improve FPS.

To get this material working great it might be best to use some kind of directional light source such as the directional light I am using in this demo. The specular property can be used to set the color of the shine is, by default it is a very dark gray so often that is something that I adjust when using this material. There is then also the shininess option that I might care to adjust as well with this one that has a default value of 30. There is also the specular map option of the phong material which is a way that one can adjust the intensity of the specular effect by way of a gray scale texture. The white areas of the texture will be full specular intensity where black areas will be areas of the material in which there is no specular effect at all.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// SPECULAR TEXTURE
//-------- ----------
const data = [
   0,0,0,0,0,0,
   9,9,9,9,9,9,
   6,7,8,9,9,9,
   3,3,3,3,3,3,
   2,2,2,2,2,2,
   1,1,1,1,1,1
].map( (a) => {
    const v = Math.round( 255 * (a / 9) );
    return [ v, v, v, 255 ];
}).flat();
const texture_specular = new THREE.DataTexture( new Uint8Array(data), 6, 6 );
texture_specular.needsUpdate = true;
//-------- ----------
// INSTANCE OF THE PHONG MATERIAL
//-------- ----------
const material = new THREE.MeshPhongMaterial({
    specular: 0xffffff,
    specularMap: texture_specular,
    shininess: 80,
    color: 0xff0000,
    emissive: 0x220000,
    emissiveIntensity: 0.5
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(1, 5, -3);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.6 - THREE.MeshStandardMaterial

The [standard material](/2021/04/27/threejs-standard-material/) might be the best option for most surfaces if a more realistic rather than speedy rendering is desired when it comes to doing something with light. The standard material will also work with a wide range of various texture maps, and is somewhat of an industry standard, thus the name standard material. I tend to like to go with this material as it is generally a great all around material that results in a decent look when it comes to working on a final result.

Because this material supports light it is called for to use this material with a light source in order for anything to be seen when it comes to the color and map attributes of the material. If a light source is not going to be used it is still possible to have something to see with this material it is just that values need to be set with the emissive and emissive map properties rather than color and map alone witch is the case with the basic material.

Unlike the phong material this material does not support specular highlights, but it would appear that is the only feature lost of interest compared to phong.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.7 - THREE.MeshPhysicalMaterial 

Another two materials in three.js that can be used with a mesh are the [Physical](https://threejs.org/docs/index.html#api/materials/MeshPhysicalMaterial), and [Toon](https://threejs.org/docs/index.html#api/materials/MeshToonMaterial) materials. Both of these materials are like that of the standard material, and phong materials respectfully, but with additional features. The physical material is like the standard material but gives a greater deal of control over reflectivity, while the toon material is just like phong only with toon shading.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE PHYSICAL MATERIAL
//-------- ----------
const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.8 - THREE.MeshToonMaterial

The toon material seems to shade with a limited number of tones which is a nice feature to have for certain projects and styles. This feature can be adjusted by making use of a texture for the gradientMap option which would seem to be a unique texture map option for this material. When working out this kind of texture the colors of the texture should be in gray scale like many similar map options such as the specular map in the phong material, or the alpha map which seems to be a feature in most mesh materials.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT for gradientMap used in toon material
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 64; canvas.height = 64;
const s = 8;
const len = s * s;
const ps = canvas.width / s;
let i = 0;
while( i < len ){
    const x = i % s;
    const y = Math.floor( i / s );
    let gValue = ( x / s + y / s ) / 2;
    ctx.fillStyle = new THREE.Color( gValue, gValue, gValue).getStyle();
    ctx.fillRect(x * ps, y * ps, ps, ps);
    i += 1;
}
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// INSTANCE OF THE TOON MATERIAL
//-------- ----------
const material = new THREE.MeshToonMaterial({ color: 0xff0000, gradientMap: texture });
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.8 - Baked in lighting with THREE.MeshMatcapMaterial

The mapcap material is a way to add baked in lighting using what is called a mapcap or lit sphere. Sense it is this mapcap option that is used to add baked in lighting then this is another material that will not work with light sources as this is the way to do about adding depth to the material. This matmap option can also then be used to add color to the material as well, but there is also a map option as well for this one. There is also the color option as always that is set to a default of white which in most cases is what one would want to leave this one on as well.

A good way to get started with this material would be to work out a quick demo involving sphere geometry and with that also a texture that is of a shaded sphere. There is a way to make quick work of this by using canvas textures, and with that the create Radial Gradient method of the 2d canvas drawing API. When using this method as a way to create the texture there is playing around with the values that are used to set the position and radius of the second circle of the radial gradient. It would seem that this is a way to change what the direction and intensity of the light is for this kind of map.

```js
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
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const r1 = canvas.width / 2;
const x1 = r1, y1 = r1, x2 = r1 * 1.35, y2 = r1 * 1.10, r2 = r1 / 8;
const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
gradient.addColorStop(0, 'black');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
const texture = new THREE.CanvasTexture( canvas );
texture.colorSpace = THREE.SRGBColorSpace;
texture.magFilter = THREE.NearestFilter;
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

## 3 - The Points Material

There is one Material in threejs that can be used to display just the points in a geometry which can come in handy some times. One major use case with this has to do with creating custom geometry from the ground up as this helps to keep things simple as I only need to worry about the position attribute of the geometry.

### 3.1 - The Points Material

If for some reason I want to create my own custom geometry in which I only care about points in space and nothing at all then I will want to have at least a [position attribute of the buffer geometry instance](/2021/06/07/threejs-buffer-geometry-attributes-position/) that I will the use with the THREE.Points constructor rather than the usual mesh constructor. So for this example I am creating a blank buffer geometry object and then I will want to create a typed array that will contain the values for each axis of each point. For now I will be keeping this simple by just adding points for a single triangle in space. However when it comes to using points if I want I could make this even more basic by just setting a single point for the typed array. Anyway once I have my data worked out for this I can call the Buffer Attribute constructor and pass the array as the first argument and then the item size which in the case is 3 as there is x, y, and z for each point. This buffer attribute object can then be used when calling the set attribute method of the blank buffer geometry object to create the position attribute of the geometry.

When it comes to creating an instance of the Points material I will just be creating a single instance of this material, and just set a color option for it. 

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// POINTS MATERIAL
//-------- ----------
const material = new THREE.PointsMaterial( { color: 0x00afaf } );
//-------- ----------
// GEOETRY WITH JUST A POSITION ATTRIBUTE
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0,
    1, 0, 0,
    1, 1, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

For more on Points and the points material I have [written a post](/2018/05/12/threejs-points-material/) on the subject, it's fun to just play with points in space when you have some time.

### 3.2 - Size Attenuation and The Points Material

By default the Size Attenuation option of the points material is set to true. What this means is out of the box the side of the points will get smaller or bigger depending on the distance of the point from the camera. In some cases I might want to set this option to false if I want to just have a single size for each point in the geometry.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// POINTS MATERIAL
//-------- ----------
const material1 = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 0.8,
    sizeAttenuation: true
});
const material2 = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 10,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.2
});
//-------- ----------
// GEOMETRY / SCENE CHILD OBJECTS
//-------- ----------
const geometry = new THREE.BoxGeometry(7, 7, 7, 3, 3, 3);
const points1 = new THREE.Points(geometry, material1);
scene.add(points1);
const points2 = new THREE.Points(geometry, material2);
scene.add(points2);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(9, 9, 9);
camera.lookAt(0, -1.0, 0);
renderer.render(scene, camera);
```

## 4 - Lines Material

Another object to work with that is an alternative to a mesh object would be [THREE.Line](/2018/04/19/threejs-line/) or THREE.LineSegments. There are two material options to choose from when it comes to using these kinds of objects which include THREE.LineBasicMaterial and THREE.LineDashedMaterial. They work just like mesh objects in the sense that the first argument that is passed when making one is a geometry. Just like that of THREE.Points though it is just the position attribute of the geometry of these that matter. This is a good reason why as this the use of these kinds of objects help to simplify the process of creating custom geometry. However it is also one of the best reasons why not to use them as well. 

### 4.1 - Using the Edge Geometry constructor and the Line Basic Material

For this demo I am using the Edge Geometry constructor to create a geometry from another geometry made with the box geometry constructor. The end result geometry is then what I am using for the geometry that will be used with THREE.Line. When it comes to materials I am going with the Line Basic Material here, and I am also making use of a few common base material class features as I can also do with mesh and point materials.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LINE MATERIAL
//-------- ----------
const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('lime'),
    transparent: true,
    opacity: 0.25
});
//-------- ----------
// GEO, SCENE CHILD OBJECTS
//-------- ----------
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const edgeGeo = new THREE.EdgesGeometry(boxGeo);
const line = new THREE.LineSegments( edgeGeo, material );
line.rotation.y = Math.PI / 180 * 12;
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 4.2 - Setting the width of lines, and Tube Geometry as a possible alternative

If you care about how the final product looks you might want to look into [curves and the tube geometry](/2023/06/02/threejs-tube-geometry/) class as an alternative to the use of these kinds of objects and materials. Lines and Line materials are okay when I just simply want to draw a line in space and be done with it. However if I care mouse about how the final product looks, and also try to get it to work on a wide range of clients I am generally not going to want to use lines in part because of a problem with line width. There is an option for changing the wide of course, but I have found that it will not work on a lot of clients, however using tube geometry and with that mesh materials will work on these clients of concern.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material_line = new THREE.LineBasicMaterial({
    linewidth: 6,
    color: new THREE.Color('lime'),
    transparent: true,
    opacity: 0.25
});
const material_mesh = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
});
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(5, 0, -5);
const v_c1 = v1.clone().lerp(v2, 0.5).add( new THREE.Vector3( -10, 0, 0 ) );
const curve = new THREE.QuadraticBezierCurve3( v1, v_c1, v2);
//-------- ----------
// GEOMETRY / LINE
//-------- ----------
const geometry_line = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 20 ) );
const line = new THREE.Line( geometry_line, material_line );
line.position.x = 0;
scene.add(line);
//-------- ----------
// GEOMETRY / MESH
//-------- ----------
const geometry_mesh = new THREE.TubeGeometry( curve, 30, 0.25, 30 );
const mesh = new THREE.Mesh( geometry_mesh, material_mesh );
mesh.position.x = -2;
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


## 5 - The Sprite Material

There are also sprite objects and with that the sprite material. These sprite objects are a way to add a texture to a scene that will always face the camera. I can then also adjust the scale and position values of the sprite objects to move them around in the scene and adjust the size. However there are also a number of options for the material, and also some relevant base material class features to write about with these.

### 5.1 - Crosshair example Sprite Material using depthTest, and  sizeAttenuation options

There are a number of options that can be set to make these sprite objects work as a kind of crosshair that will always show up over everything else by setting the depth test option to false. Like with the Points material there is also a size attenuation option that I will want to set to false for this kind of application. After that I can use the object2d features of the sprite object to do things like adjust the scale, and the position of the sprite in the scene.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a texture for the sprite
const createTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = 32, h = 32;
    canvas.width = w; canvas.height = h;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 3;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( 0, 0);
    ctx.lineTo( w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo( w, 0);
    ctx.lineTo( 0, h);
    ctx.stroke();
    const texture = new THREE.CanvasTexture( canvas );
    return texture;
};
// create a sprite object using the THREE.SpriteMaterial
const createCursorSprite = () => {
    const material = new THREE.SpriteMaterial({
        map: createTexture(),
        sizeAttenuation: false,
        depthTest: false,
        transparent: true,
        opacity: 1
    });
    const sprite = new THREE.Sprite(  material );
    return sprite;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const sprite = createCursorSprite();
sprite.scale.set(0.1, 0.1, 0.1);
sprite.position.set(0.5, 0, 0);
scene.add( sprite );
scene.add( new THREE.GridHelper(10, 10) );
scene.add( new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial()  ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 5.2 - The rotation option of the sprite material

The rotation option of the sprite material is a way to go about setting what the rotation should be used for the sprite. It would seem that this is generally what it is that I will want to use in place of the various features that have to do with the local rotation of the sprite object.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a texture for the sprite
const createTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = 32, h = 32;
    canvas.width = w; canvas.height = h;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( 0, 0);
    ctx.lineTo( w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo( w, 0);
    ctx.lineTo( 0, h);
    ctx.stroke();
    return new THREE.CanvasTexture( canvas );
};
const createSprite = () => {
    const material = new THREE.SpriteMaterial({
        map: createTexture(),
        sizeAttenuation: true,
        depthTest: false,
        transparent: true,
        rotation: 0,
        opacity: 1
    });
    const sprite = new THREE.Sprite(  material );
    return sprite;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const sprite = createSprite();
scene.add( sprite );
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
let deg = 0;
const dps = 20;  // degrees per second
const fps = 12;  // frames per second
let lt = new Date();
const loop = () => {
    const now = new Date();
    const secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        deg += dps * secs;
        deg %= 360;
        sprite.material.rotation = Math.PI / 180 * deg;
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

## 6 - The Common Base Material class

There are a number of options in the base material class that should work with all materials, but there are some exceptions with some of these features. For example the side option is very much a part of the base material class, but this option has no effect when used with line or point materials. Still there are lots of options in the base material class that do work with more or less all materials and in this section I will be going over a few key examples of these base material class features.

### 6.1 - Transparent and opacity options

The transparent boolen can be used to set transparency on and off for a material. In the event that transparency is on the opacity value can be used to set the global alpha value of the transparency for the material. This feature seems to work okay for just about all mesh materials, and also for points and lines as well.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTION
//-------- ----------
const createCube = function (size, material, x, y, z) {
    const geometry = new THREE.BoxGeometry(size, size, size, 8, 8, 8),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// mesh objects and mesh materails using opacity
scene.add( createCube(1, new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.4 } ), 0, 0, 0) );
scene.add( createCube(1, new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.7 } ), -1.4, -0.5, 0) );
scene.add( createCube(1, new THREE.MeshPhongMaterial( { transparent: true, opacity: 0.2 } ), -0.4, -0.5, -2) );
// points
const material_points = new THREE.PointsMaterial({ size: 0.2, transparent: true, opacity: 0.05 });
const points = new THREE.Points( new THREE.SphereGeometry(2, 20, 20), material_points );
scene.add(points);
// light
const dl = new THREE.DirectionalLight();
dl.position.set(3, 2, 1)
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 6.2 - Blending

It would seem that the blending property of the base material class is it itself just one feature of the class that deserves its own section in this post, and maybe even a whole other deep dive content piece actually. In any case for the sake of this one demo in this over all base material class section it goes without saying that I should have at least one demo on this subject here to touch base on this at least. 

For now I worked out this demo where I am setting the blending value of all materials used to the THREE.NoBlending constant over that of what the default is for materials which is THREE.NormalBlending.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
// array of materials for a box geometry where each 
// material is using THREE.NoBlending over the default of THREE.NormalBlending
const materials_box = [
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0x00ffff, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0x00ff00, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xffff00, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xff0000, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xff00ff, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xffffff, transparent: true, opacity: 0.10 } )
];
// line material for grid. Also using THREE.NoBlending
const material_grid = new THREE.LineBasicMaterial({
    blending: THREE.NoBlending,
    vertexColors: true,
    linewidth: 8,
    transparent: true,
    opacity: 0.1
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_box = new THREE.Mesh(geometry, materials_box);
scene.add(mesh_box);
const grid = new THREE.GridHelper( 10, 10, 0x00ff00, 0x00ff00 );
grid.material = material_grid;
scene.add(grid);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 6.3 - Vertex colors

One major base material class feature would be the vertex colors Boolean that when set to true will cause the material to use the color attribute of the geometry if it has one. Although this is a base material class feature it will not work with all materials, some will not make use of the base class feature such as the MeshNormalMaterial. However it does work with most mesh material options such as basic, standard, and phong just to name a s few. This feature also works with line materials and the points materials as well as a great way to style those materials when they are used.

If the geometry does not have a color attribute then one will need to be created for the geometry. If you would like to read more about his topic you might want to check out my [main blog post on color attributes](/2023/01/20/threejs-buffer-geometry-attributes-color/) in buffer geometry objects.


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
const geo = new THREE.SphereGeometry( 4, 20, 20 );
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a_vert = i / len;
   const a_blue = Math.sin( Math.PI * (16 * a_vert % 1) );
   color_array.push(a_vert, 1 - a_vert, a_blue );
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array( color_array ), 3);
geo.setAttribute('color', color_attribute);
// ---------- ----------
// MATERIAL - using vertex colors
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

### 6.4 - Side

The side option will set what side of a face is to be rendered which by default is set to the THREE.FontSide constant. Often I might want to set this to THREE.DoubleSide, and in a few rare cases THREE.BackSide. If you are wondering how the side of a face is determined it has to do with the order of the points in the position attribute of the geometry, or the index of it.

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
// MATERIAL
// ---------- ----------
const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide
});
// ---------- ----------
// GEOMETRY MESH
// ---------- ----------
const geo = new THREE.PlaneGeometry(5, 5, 1, 1);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// LOOP
// ---------- ----------
let frame = 0;
const maxFrame = 120;
const loop = () => {
    requestAnimationFrame(loop);
    const a_frame = frame / maxFrame;
    mesh.rotation.y = Math.PI * 2 * a_frame;
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
```

## 6.5 - The depth test property to making something show up on top of everything else

Now and then I might end up running into a problem in which I will need to make sure that a certain object will always render on top of everything else regardless of what the status might be in terms of that objects depth relative to the camera and any other objects between such an object and the camera. One way of doing this would be to work out some kind of system for layering, that is to have more than one renderer and therefor canvas element, and then just set the render order of all of these canvas elements in such a way that what I need rendering on top will be drawn to a final canvas element last. Doing something such as that will work of course, but one way to get a desired outcome with a single canvas and  renderer might be to set the depth test option of the material of the object that i want to render on top to false.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material_mesh = new THREE.MeshNormalMaterial();
const material_points = new THREE.PointsMaterial({
    size: 5,
    sizeAttenuation: false,
    depthTest: false
});
// ---------- ----------
// GEOMETRY MESH
// ---------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8);
scene.add( new THREE.Mesh(geo, material_mesh) );
scene.add( new THREE.Points(geo, material_points) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 0.75, 1.5);
camera.lookAt(0, -0.15, 0);
renderer.render(scene, camera);
```

## 7 - Blending options 

I covered one demo of the blending option in the above section in which I go over many of the features of the main material class. However I would say that the blending option does very much deserve a section of its own. So I will at least start this section to say the least, and then expand more with additional future edits as I look into this subject about threejs materials more so.

### 7.1 - No Blending compared to default normal blending

I have all ready covered one demo of the no blending value for the blending option. However there are some things that I should do different in this section of blending in depth. To start oput this section I am once again going to go with a demo that makes use of the no blending option over that of the default blending mode which is normal blending. However this time I am going to have two objects with two materials to have something to compare to. 

Also I am doing something out of the usual when it comes to rendering in this example and will also be doing so for the rest of these demos. The thing that I am doing different here is that I am using a canvas element that I draw to with the plain old 2d drawing content as the element that I am appending to my hard coded HTML. I am then drawing to this plain old 2d canvas with the drawImage method of the 2d canvas and I am passing the canvas of the webgl renderer as the image to draw with. This then allows me to use the 2d drawing context to draw a background that will show up when the canvas of the webgl renderer is transparent.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, 2D CANVAS
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'block';
canvas.width = 640;
canvas.height = 480;
(document.getElementById('demo') || document.body).appendChild(canvas);
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({ 
    blending: THREE.NoBlending, 
    color: 0xff0000,
    transparent: true,
    opacity: 0.1
});
const material_compare = new THREE.MeshBasicMaterial({ 
    blending: THREE.NormalBlending,
    color: 0x00ff00,
    transparent: true,
    opacity: 0.1
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.SphereGeometry( 1, 60, 60 );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_1 = new THREE.Mesh(geometry, material);
mesh_1.position.x = -1.25;
scene.add(mesh_1);
const mesh_2 = new THREE.Mesh(geometry, material_compare);
mesh_2.position.x = 1.25;
scene.add(mesh_2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 3, 3);
camera.lookAt(0, 0, 0);
scene.background = 0x000000;
renderer.setClearColor(0x000000, 0.75);
renderer.render(scene, camera);
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "black");
gradient.addColorStop(0.5, "white");
gradient.addColorStop(1, "black");
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.drawImage(renderer.domElement, 0,0, canvas.width, canvas.height );
```

## 8 - The Material loader, and other loader related concerns

Creating a material by calling one of the constructor functions as a way to obtain a material is one thing. However when it comes to starting to work on real projects I will want to have a way to pack a lot of the data that has to do with one or more materials into some kind of external file format. With that said baked into the core of threejs itself is the [Material Loader](/2023/07/27/threejs-materials-loader/) which is one option for doing this sort of thing. 

However there are also a lot of other options for loading not just a material but other data that is needed to create final display objects. There is then a lot to say about how to go about loading materials, as well as everything else that one would want to load into a project by way of some external data as well such as textures to use with such materials. So in this section I will be writing a thing or two about loaders and what the options are for at least materials, but maybe also a few that help with more than just that.

### 8.1 - Parse a JSON string of a material using THREE.MaterialLoader

The toJSON method of a material can be used to convert a material to a JSON object format, that Object can then be passed to JSON.stringify to create a JSON text form that can then be used with the THREE.MaterialLoader. However for this demo I am hand coding a string of json and I would like to parse it into a workable material that I can then use with a mesh object. To create a material from one of these strings I can pass the string threw the JSON.parse method to get an object to which I can then pass to the parse method of an instance of the material loader. The end result of the call of the parse method is then  a material that I can then use with a mesh object just like with any other.

So then it would look like the JSON string of this demo could then be saved as a json file, and this JSON file can then also be loaded with the material loader as well.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL JSON AS HARD CODED STRING
// ---------- ----------
const str_material = `{
  "metadata":
    {
      "version":4.5,
      "type":"Material",
      "generator":"Hand Coded"
    },
    "uuid":"3106bcfd-f862-49cd-9f87-d4807d818af2",
    "type":"MeshBasicMaterial",
    "color":16711680
}`;
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 8.2 - One loader to rule them all \( THREE.ObjectLoader \)

The material loader might be the first option one might go with to go about loading materials, and if I just need to load materials and not much of anything else that will often work fine. However I have found that what often makes things a little tricky is the question of how to go about loading external image files that I want to use with the various material options that need a texture object. Also the material loader is just simply that, so with that said what about geometry, objects, animations and so on. So then I am of the mindset that [the object loader](/2023/07/19/threejs-object-loader/) is a good option for having some kind of plain text format to work with that can then be loader with a loader option that is baked into the core of the threejs library alone.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// JSON STRING IN OBJECT FORMAT
// ---------- ----------
const uuid_geometry = new THREE.MathUtils.generateUUID();
const uuid_material = new THREE.MathUtils.generateUUID();
const uuid_mesh = new THREE.MathUtils.generateUUID();
const mesh_json = `
{
    "metadata": {
        "version": 4.5,
        "type": "Object",
        "generator": "Hand Coded"
    },
    "geometries": [{
            "uuid": "` + uuid_geometry + `",
            "type": "BoxGeometry",
            "width": 1,
            "height": 1,
            "depth": 1
        }
    ],
    "materials": [{
            "uuid": "` + uuid_material + `",
            "type": "MeshNormalMaterial"
        }
    ],
    "object": {
        "uuid": "` + uuid_mesh + `",
        "type": "Mesh",
        "geometry": "` + uuid_geometry + `",
        "material": "` + uuid_material + `"
    }
}
`
const mesh = new THREE.ObjectLoader().parse( JSON.parse( mesh_json ) );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 8.3 - Texture data can be baked into the object format also by way of data urls

Another great thing that I like about the Object Loader over that of the material loader is that I can bake image data directly into the JSON data by way of data URL values. It is possible to get textures working with the material loader, but as one would expect it involves loading the images, and then creating a special object where each key of the textures object is the value to set for each material option key that is to use the texture in the JSON data. This way I can just bake everything that has to do with a single object, into just one file. Not just the material, and the material option values, but also all the additional values of the texture objects, and with that the image data used for each texture object.

Again with the material loader if I use the texture loader that will just create a new texture with the image that UI load. If for example I need to load a texture with all kinds of custom values for the image I can not do that with the texture loader. I am sure that there are ways of dealing with these issues and also there are things about going that way that will help to keep me from repeating data, but still over all this just makes things a lot easier.

For example everything that I want for a single object can be baked into a json file like this:

```json
{
  "metadata":{
    "version":4.5,
    "type":"Object",
    "generator": "Object3D.toJSON"
   },
  "geometries":[
    {
      "uuid":"2edf3239-f3e2-42f1-b5f1-4d73f83ec1fe",
      "type":"BoxGeometry",
      "width":1,
      "height":1,
      "depth":1,
      "widthSegments":1,
      "heightSegments":1,
      "depthSegments":1
    }
  ],
  "materials":[
    {
      "uuid":"20a1a759-2af8-4ac7-8475-531cd36230b2",
      "type":"MeshBasicMaterial",
      "color":16777215,
      "map":"09e8941e-b83b-478e-976b-7b3c53ee8298",
      "reflectivity":1,
      "refractionRatio":0.98,
      "depthFunc":3,
      "depthTest":true,
      "depthWrite":true,
      "colorWrite":true,
      "stencilWrite":false,
      "stencilWriteMask":255,
      "stencilFunc":519,
      "stencilRef":0,
      "stencilFuncMask":255,
      "stencilFail":7680,
      "stencilZFail":7680,
      "stencilZPass":7680
    }
  ],
  "textures":[
    {
      "uuid":"09e8941e-b83b-478e-976b-7b3c53ee8298",
      "name":"",
      "image":"234825b5-4883-4f89-bc44-96428108b48b",
      "mapping":300,
      "repeat":[1,1],
      "offset":[0,0],
      "center":[0,0],
      "rotation":0,
      "wrap":[1001,1001],
      "format":1023,
      "type":1009,
      "encoding":3000,
      "minFilter":1008,
      "magFilter":1003,
      "anisotropy":1,
      "flipY":true,
      "premultiplyAlpha":false,
      "unpackAlignment":4
    }
  ],
  "images":[
    {
      "uuid":"234825b5-4883-4f89-bc44-96428108b48b",
      "url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAACJJREFUGFdjZPgPhHgAI1gBI1AFujKoGEQBQRPooIASRwIAF0kT+UaQEawAAAAASUVORK5CYII="
    }
  ],
  "object":{
    "uuid":"e5b75f7f-e1de-41f1-bff5-1d4ef7b5c944",
    "type":"Mesh",
    "layers":1,
    "matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
    "geometry":"2edf3239-f3e2-42f1-b5f1-4d73f83ec1fe",
    "material":"20a1a759-2af8-4ac7-8475-531cd36230b2"
  }
}
```

Then I can load that file with the load method of the THREE.ObjectLoader class.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LOAD JSON FILE - that is in the object format with geometry, material, and texture
// ---------- ----------
const loader = new THREE.ObjectLoader();
loader.load('./demo.json', ( mesh ) => {
    scene.add(mesh)
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
```

## 9 - Textures

In the basic section I covered a simple getting started type example of the use of textures and materials. However there is of course a whole lot more to write about [when it comes to textures](/2023/06/27/threejs-texture), and how they overlap with geometry, and yes mesh material options that require a texture as the value to be given. In the basic example I was using the map option for the texture which is a good start but there are of course many other options from one material to another. So in this section the focus is going to be more so on textures, but while I am at it I will of course need to focus on features of buffer geometry objects as well, mainly the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) which I would say that you would want to look into more at some point.

 I will also have to at least touch base on many other various features of threejs that are relevant to the use of textures with materials such as light sources. However this is still very much a section on the subject of materials in general with threejs. So there will still be a lot to say about the various options when it comes to the kinds of maps there are to work with from one material to another.

### 9.1 - Repeating The WrapS and WrapT properties of textures

One thing that might come up when dealing with a texture, geometry, and the material that is being used with a mesh is a situation that will happen when dealing with uv attributes values that will go out of range of the texture. I have found that it is a good practice to try to keep the uv attributes values in a range between 0, and 1. However that is more of a guild line than a rule it would seem on my part as I see a lot of uv generator code that does very much result in UV values that go out of that range. This might not present much of a problem though as long as you know about what the deal is with the wrapS and wrapT values of the texture object mind you.

By default the wrapS and wrapT properties of a texture will be set to the THREE.ClampToEdgeWrapping, which again should not be a problem as along as you keep the UV values in the 0 to 1 range. However if UV values are going are of range, and you can not work out how to go about addressing that, then you might try setting the wrapS and wrapT property values to THREE.RepeatWrapping. The demo in this section will do a good job of showing what the deal is with this.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT, TEXTURE - Whole Bunch of cells
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1024; canvas.height = 1024;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const w = 2;
const wp = canvas.width / w;
const len = w * w;
let i = 0;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '500px arial';
ctx.lineWidth = 8;
while( i  < len ){
    const a_cell = i / len;
    const x = i % w;
    const y = Math.floor( i / w );
    ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
    ctx.fillRect(x * wp, y * wp, wp, wp);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#8f8f8f';
    ctx.fillText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    ctx.strokeText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
// USING THREE.RepeatWrapping OVER THE DEFAULT VALUE OF
// THREE.ClampToEdgeWrapping FOR wrapS and WrapT
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
geo.rotateX( Math.PI * 1.5 );
const att_uv = geo.getAttribute('uv');
console.log( att_uv.array );
att_uv.setXY(0, -0.25,  1.25);
att_uv.setXY(1,  0.25,  1.25);
att_uv.setXY(2, -0.25,  0.75);
att_uv.setXY(3,  0.25,  0.75);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geo, material );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set( 1.7, 1.2, 1.7 );
camera.lookAt( 0, -0.5, 0 );
renderer.render(scene, camera);
```

### 9.2 - Light, standard material, Set UVmapping of BoxGeometry, diffuse and emissive maps

This example features a helper function that can be called over and over again to create not one, but many textures using canvas elements. I am then using this create canvas texture helper to create not one but two textures. One texture will be used for the map option of an instance of the standard material, and the other texture will be used for the emissive map of the material. 

As I have covered in the mesh materials section the standard material is an example of the kind of material that will respond to a light source. As such the map option does not work the same way as it does in say the basic material as the texture will only show up when some light is shining on it. There is however the emissive color, and with that the emissive map that will work like what one might be used to when it comes to the use of the basic material. So for the instance of the standard material in this demo I am using one texture for the map option, and another for the emissive map option. I am also using the emissive option to set what the emissive color is as I will want it to be something other than the default black color, and there is also the emissive intensity option that will of course adjust the intestacy of the emissive effect.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// function to help create a texture with javaScript code
const createCanvasTexture = (opt) => {
    opt = opt || {};
    opt.size = opt.size === undefined ? 1024 : opt.size;
    opt.userData = opt.userData || {};
    opt.draw = opt.draw || function (ctx, canvas, state) {};
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = opt.size;
    canvas.height = opt.size;
    opt.draw(ctx, canvas, opt.userData);
    const texture = new THREE.CanvasTexture(canvas);
    texture.userData = Object.assign(texture.userData, opt.userData);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture
};
// mutate the state of a BoxGeometrys UV attribute
const setUVBoxFace = (geo, w = 8, face_index = 0, v_cell = new THREE.Vector2( 0, 0 ), offset = new THREE.Vector2( 0, 0 )) => {
    const att_uv = geo.getAttribute('uv');
    const cx = 1 / w * v_cell.x + offset.x;
    const cy = 1 / w * v_cell.y + offset.y;
    const i2 = face_index * 4;
    att_uv.setXY(i2, 0.000 + cx, 1.000 - cy);
    att_uv.setXY(i2 + 1, 0.125 + cx, 1.000 - cy);
    att_uv.setXY(i2 + 2, 0.000 + cx, 0.875 - cy);
    att_uv.setXY(i2 + 3, 0.125 + cx, 0.875 - cy);
};
//-------- ----------
// TEXTURES
//-------- ----------
// diffuse color map texture composed of a grid where each cell has and index number
const texture_map = createCanvasTexture({
    userData: {
        w : 8
    },
    draw: (ctx, canvas, userData) => {
        const w = userData.w;
        const wp = canvas.width / w;
        const len = w * w;
        let i = 0;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '100px arial';
        ctx.lineWidth = 3;
        while (i < len) {
            const a_cell = (i + 5) / (len + 15);
            const x = i % w;
            const y = Math.floor(i / w);
            ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
            ctx.fillRect(x * wp, y * wp, wp, wp);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = '#5f5f5f';
            ctx.fillText(i, x * wp + wp / 2, y * wp + wp / 2);
            ctx.strokeText(i, x * wp + wp / 2, y * wp + wp / 2);
            i += 1;
        }
    }
});
// texture for the emissive map where I have just random gray scale blocks
const texture_emissive = createCanvasTexture({
    userData: {
        w : 32
    },
    draw: (ctx, canvas, userData) => {
        let i = 0;
        const w = userData.w;
        const pw = canvas.width / w;
        const len = w * w;
        while(i < len){
            const x = i % w;
            const y = Math.floor( i / w );
            const v = 0.25 * 0.75 * Math.random();
            ctx.fillStyle = new THREE.Color( v, v, v ).getStyle();
            ctx.fillRect(x * pw, y * pw, pw, pw)
            i += 1;
        }
    }
});
//-------- ----------
// MATERIAL - 
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    map: texture_map,
    emissive: new THREE.Color(1, 1, 1),
    emissiveMap: texture_emissive,
    emissiveIntensity: 1
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const v_cell = new THREE.Vector2( -0.5, -0.5 );
setUVBoxFace(geo, 8, 2, v_cell)
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.7);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 9.3 - Rotation of UV values demo

For this demo I worked out another demo that has to do with the mutation of the uv attribute to change what the state is when it comes to mapping the 2d texture to the 3D geometry. With this demo I am once again just using the Mesh Basic Material with the map option and I am once again using a canvas texture to create a simple texture with a little javaScript code. This time I am also once again mutating the state of the uv attribute but now I am doing so in a way that will result in a rotation kind of effect with a very simple plain geometry once again.

This demo might be a bit off topic when it comes to materials, but still a major part of starting to do something involving a final product of some kind will have to deal with setting up things with the UV attribute. The focus here in this section is still with materials, but there is not just what is going on with materials but also the state of the geometry as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELEPRS
//-------- ----------
const setUVRotation = ( geo, c = new THREE.Vector2(0.5, 0.5), radius = 0.75, a_start = Math.PI * 1.75, order = 'XZ' ) => {
    const att_uv = geo.getAttribute('uv');
    const att_pos = geo.getAttribute('position');
    let i = 0;
    while( i < att_uv.count ){
        const a = a_start + Math.atan2( att_pos[ 'get' + order[0] ](i), att_pos[ 'get' + order[1] ](i) );
        const u = c.x + Math.cos(a) * radius;
        const v = c.y + Math.sin(a) * radius;
        att_uv.setXY( i, u, v );
        i += 1;
   }
   att_uv.needsUpdate = true;
};
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT, TEXTURE - Whole Bunch of cells
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1024; canvas.height = 1024;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const w = 2;
const wp = canvas.width / w;
const len = w * w;
let i = 0;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '500px arial';
ctx.lineWidth = 8;
while( i  < len ){
    const a_cell = i / len;
    const x = i % w;
    const y = Math.floor( i / w );
    ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
    ctx.fillRect(x * wp, y * wp, wp, wp);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#8f8f8f';
    ctx.fillText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    ctx.strokeText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
geo.rotateX( Math.PI * 1.5 );
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geo, material );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set( 1.7, 1.2, 1.7 );
camera.lookAt( 0, -0.5, 0 );
const sm = {
   FPS_UPDATE: 12,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date(),
   c: new THREE.Vector2(0.5, 0.5),
   radius: 0.8,
   a_start: 0
};
const update = function(sm){
    const a_frame = sm.frame / sm.FRAME_MAX;
    const a_rotation = a_frame * 16 % 1;
    const a_radius = (1 + Math.sin( Math.PI * 2 * (a_frame * 4 % 1) ) ) / 2
    sm.a_start = Math.PI * 2 * a_rotation;
    sm.radius = 0.5 + 1.75 * a_radius;
    setUVRotation(geo, sm.c, sm.radius, sm.a_start);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

## 10 - Light and Materials

Of course I am going to need to write at least a few things about light sources and materials in general in threejs. The first thing that people that are new to threejs should know is that not all materials will work with light sources to begin with. Another major thing is that some of the options of materials will work a little differently between certain materials. I would say that this is the case with the color option of the basic material compared to that of a material that will work with light such as the standard material. So in this section I will be focusing on at least some of these basic details about light. You might want to check out my [main blog post on light in threejs](/2022/02/25/threejs-light/) if you would like to read up more on this subject though.

### 10.1 - Getting started with Directional Light

A good option to start with I think would be directional light as a light source. This is a kind of object where I just set the direction part of the Vector of the position property of the directional light object to create a situation in which light is moving in an even, parallel direction along the direction part alone of the position. Sense it is just the direction part of the vector that matters with this light option I might choose to [normalize the vector](/2021/06/14/threejs-vector3-normalize/) to a length of 1.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1).normalize();
scene.add(dl);
//-------- ----------
// INSTANCE OF THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
//-------- ----------
// GRID AND MESH
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 10.2 - Ambient Light and Emissive color

There is the ambient light option that when added to the scene object will result in a base intensity of light being applied to all materials that will work with light sources. When calling the THREE.AmbientLight constructor I can give a color as the first argument followed by a starting intensity value of the light. 

There is also the emissive color, and the emissive intensity options that are typically found in materials that respond to light sources that can also be used to get a base amount of color. By default the emissive color is black, so often I might want to set the emissive color to something other than black. After that another option of interest would be the emissive intensity option. This emissive intensity option can be adjusted along with the intensity of the ambient light to change the base intensity of the emissive and color options of the matreial.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const al = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(al);
//-------- ----------
// MATERAILS
//-------- ----------
const material_1 = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
const material_2 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x00ff00,
    emissiveIntensity: 1
});
//-------- ----------
// GRID AND MESH
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const geo = new THREE.BoxGeometry(1, 1, 1);
const mesh_1 = new THREE.Mesh( geo, material_1 );
mesh_1.position.x = -0.7;
scene.add( mesh_1 );
const mesh_2 = new THREE.Mesh( geo, material_2 );
mesh_2.position.x = 0.7;
scene.add( mesh_2 );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


## 11 - Shadows

For this section I will be taking a look at the use of shadows with materials. There are a lot of details to be aware of when it comes to getting these up and running with a project. There is not just what one should be aware of when it comes to materials mind you, but also the various other typical features of the project. For example there is checking if the renderer that you are using will even support shades to begin with, when t comes to that the webGl Renderer seems to do so just fine, but the shadow map setting might need to be set to true first. There are also a lot of other properties at the mesh object level, and also with the light sources that one is using as well that need to be addressed.

### 11.1 - Spotlight Example of Shadows

For this example I worked out a bAsic hello world kind of example with shadows. When setting up the renderer I need to make sure shadow map is set to true for it. After that there are the castShadow and receive shadow booleans of the mesh objects that I also want to make sure are set to true as well. When it comes to the spot light that I am using there are a whole bunch of properties that I might want to adjust as well. However when it comes to the materials uses it would seem that there is not that much that I need to bother with, at least when it comes to the basics with this when using the standard material, and phong material at least. One thing that I have noticed thus far is that the material option used for an object that is casting a shadow might not matter that much, but the object that is receiving a shadow does very much matter. Although much of this has to do with the renderer, mesh, and light source objects the material used still does need to support these shadow effects as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// MESH OBJECTS
// ---------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
       }));
cube.position.set(0, 0.5, 0);
cube.castShadow = true;
scene.add(cube);
const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 8, 8),
        new THREE.MeshPhongMaterial({
            color: 0x00afaf
        }));
plane.geometry.rotateX(Math.PI * 1.5)
plane.receiveShadow = true; // the plane will receive a shadow
scene.add(plane);
// ---------- ----------
// SPOTLIGHT
// ---------- ----------
const spotLight = new THREE.SpotLight(0xffffff);
// I must at least set the caseShadow boolean
// of the spotLight to true
spotLight.castShadow = true;
// additional shadow properties of interest
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 1000;
// additional spotlight properties of interest
spotLight.intensity = 2;
spotLight.penumbra = .5;
spotLight.angle = Math.PI / 2.5;
spotLight.distance = 1000;
spotLight.position.set(-2.5, 2.5, 2.5);
scene.add(spotLight);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 12 - Using Arrays of Materials and the Groups property of Buffer Geometry Objects

For this section I will now be getting more into the subject of using an [array of materials](/2018/05/14/threejs-mesh-material-index/) rather than just one for a display object. When it comes to older versions of threejs this would involve the use of the now defunct face3 class. I will not be getting into the use of that class of course, however I am still seeing a lot of outdated threejs source code examples pop up in Google search when it comes to this so be aware of that when looking elsewhere when it comes to this topic. I have my own posts on face3 mind you, but the difference is that I keep up with editing, and thus inform people visiting that it is an outdated feature of the library.

The general process of doing this will not always just involving passing an array of materials and then moving on with ones life. If you are lucky the groups property is all ready set up just the way that you want it and maybe that will in fact actually be the case. However more often that not one will need to update, or even create to begin with the groups property of the geometry that is used with the over all display object.

### 12.1 - Cube Example Revisited

In the Basic Section I covered a simple example of the use of an array of materials using an instance of the Box Geometry. The Box geometry is one example of a geometry cerated with a built in geometry constructor where the groups property is set up to begin with. So demos that involve this kind of geometry often serve as a good start point for this sort of thing for that reason. With that said for this first demo on my arrays of materials section here I will once again be starting out with that, but this time I will be looping over the array of groups objects and setting the values of the material index properties of each group object.

So then this time I will not just be passing an array fo six materials, but rather an array of only three materials. Sense the total number of materials is less than the number of groups one way to work with this would be to set each material index value of each group to the material index value that I want fir each side.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH - Using BoxGeometry and an Array of Materials
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    ]
);
scene.add(mesh);
//-------- ----------
// MUTATION OF MATERIAL INDEX VALUES OF GROUP OBEJCTS THAT ARE ALL READY IN PLACE
//-------- ----------
const geometry = mesh.geometry;
let i = 0;
const len_groups = geometry.groups.length;
const len_materials = mesh.material.length;
while( i < len_groups ){
    const group = geometry.groups[i];
    group.materialIndex = i % len_materials;
    i += 1;
}
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set(1, 1, 2);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    mesh.rotation.y += Math.PI / 180 * 5;
    mesh.rotation.y %= Math.PI * 2;
    renderer.render(scene, camera);
};
loop();
```

There are a lot of other ways of branching off from this point such as using more than six materials and what one might want to do with that kind of situation. There is updating the material index values over time to switch to whatever material I want to use for whatever side at any given moment. However there is also increasing the point density of the box geometry and creating a whole new groups array from the ground up by leaning how to use the various buffer geometry class methods that there are to work with when it comes to this sort of thing.

### 12.2 - Material for each side of a plane, getting started with the add group method

So when it comes to working with a geometry in which the groups property is worked out for me to begin with, often I might just need to give an array of materials that I want to use and that is it. In other cases I might need to loop over the array of group objects and adjust the material index values, but not mess with anything that has to do with the start and count properties of these group objects.

However often I might need to adjust things with the start and count values of these kinds of objects. Of course this will be the case when working out custom geometry in the form of an external asset, or a custom geometry constructor that extends from one of the buffer geometry classes. As far as we are concerned with this demo at least here I am just starting with a plane geometry which I would say is a good way to get started with this aspect of buffer geometry objects, and with that arrays of materials Unlike the box geometry the plane geometry does not have a group property set up to begin with, it must be added to the geometry by making use of the add group method of the buffer geometry class.

One thing to watch out for here is to check if the geometry that is being used is an indexed geometry or not. This is of course a whole other ball of wax when it comes to overlap between materials, geometry objects, and the object3d class based mesh objects that wrap up everything together. However getting back to the matter at hand here at least, by default the geometry that is returned after calling the plane geometry constructor is an indexed geometry. So then I will want to look at the index of the geometry for values that will help me to know what the range is with the start, and count values to use when calling the add group method. When it comes to non indexed geometry there is just looking at the count of points in the position attribute. I made a helper for this demo that seems to work okay for both cases with plane geometry though. So this is just an For Your information type deal when it comes to dealing with geometry other than than of plane geometry that may or may not be indexed.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER
//-------- ----------
const addPlaneGroups = ( geometry ) => {
    const pos = geometry.getAttribute('position');
    let count = pos.count;
    if(geometry.index){
        count = geometry.index.count;
    }
    geometry.addGroup(0, count, 0);
    geometry.addGroup(0, count, 1);
};
//-------- ----------
// MATERIALS
//-------- ----------
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.BackSide })
];
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.PlaneGeometry(2, 2, 2).toNonIndexed();
addPlaneGroups(geometry);
//-------- ----------
// MESH 
//-------- ----------
const mesh = new THREE.Mesh( geometry, materials );
scene.add(mesh);
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    mesh.rotation.y += Math.PI / 180 * 5;
    mesh.rotation.y %= Math.PI * 2;
    renderer.render(scene, camera);
};
loop();
```

## 13 - Fog and materials

I thought that I should start a section on the [subject of FOG and materials](/2018/04/16/threejs-fog), and have at least one demo that I might expand on more as there is a great deal to be aware of when it comes to this subject. When it comes to the options for Fog Objects to set to the scene.fog property there are two options [THREE.FogExp2](https://threejs.org/docs/#api/en/scenes/FogExp2), and [THREE.Fog](https://threejs.org/docs/#api/en/scenes/Fog). More often than not I like to go with THREE.FogExp2 over that of THREE.Fog as I like the exponential effects rather than the similar linear effect of THREE.Fog.

### 13.1 - EXP2 FOG

Here I have an animation loop demo of THREE.FogExp2 where I pass the color I want to use as the first argument and then a density value for the fog. I then this fog object as the value for scene.fog, and then any material that supports fog will then be effected by it such as with the mesh basic material which is what I am using in this demo here. I will also more often than not want to set the background color to that of the fig color as well as the fog will just effect materials and not much of anything else. So If I am not going to add additional mesh objects to serve as background in the scene that will also be effected by the fog I will want to set the style of my solid background to work well with what I want to do here.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ADDING BACKGROUND AND FOG
//-------- ----------
const fog_color = new THREE.Color(0xffffff);
scene.background = fog_color;
scene.fog = new THREE.FogExp2(fog_color, 0.5);
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.5, 0.75, 1.5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const per = frame / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    mesh.position.z = 1 + 4 * bias;
    mesh.rotation.x = Math.PI * 2 * 4 * per;
    mesh.rotation.y = Math.PI * 2 * 2 * per;
    camera.lookAt(mesh.position);
};
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
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

### 13.2 - Simple Linear Fog

The other built in option for adding Fog would be to use the Plain Linear Fog that is created using THREE.Fog. For this one I want to give not just a density, but rather a near and far value for when the fog starts and when it is full blast. Sense this is a linear fog option the rate at which the Fog goes up is alone a straight line from the near and far value.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ADDING BACKGROUND AND FOG
//-------- ----------
let near = 1.5, far = 6;
const fog_color = new THREE.Color(0xffffff);
scene.background = fog_color;
scene.fog = new THREE.Fog(fog_color, near, far);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a_frame = frame / frameMax;
    const a_near = a_frame * 16 % 1;
    scene.fog.near = 5 * a_near;
};
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
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

## 14 - Shader Materials

First thing is first and that is that chances are what it is that you want to do can be done with one of the built in material options. If you think that what you want to do can only be done with a custom shader, think again, take a step back, and make sure because this is where things really start to get time consuming when it comes to materials.

After looking over everything there is to work with the built in materials then there might be a situation here and there where you might want to work out some kind of custom material by writing a little bit of original GLSL code that will then be used for the the vertex and fragment shaders that are needed to [create an instance of the THREE.ShaderMaterial](/2023/01/13/threejs-shader-material/). This is without queation the best way to get started with this because with the THREE.ShaderMatreial there is the whole of the threejs shader library to work with to make quick work of just adding in certain features of the built in materials such as a diffuse color map just to give one example.

So then there are a number of things that you will need to look into more before even getting started with this, if you are in fact up for the task. With this there is not just looking into what there is to work with in threejs, there is also a whole other language that is used to crate these custom shaders Called GLSL which is short for openGL Shader Language. Mind you that you will not need to write everything from the ground up with GLSL with THREE.ShaderMaterial, but you will still need to lean enough to hack over things a little.

### 14.1 - Shader Material Hello World

For this very first demo in this shader material section I will be starting out with a very simple hello world type example of this sort of thing to at least get the ball rolling with this. Nothing fancy here at all just getting to a point where we have a solid mass of color on the screen, but I would like to go beyond that at least a little for this one as this is no longer the basic section of the post after all.

When it comes to this there is working out just two values of interest which is gl\_position in the vertex shader, and gl\_FragColor in the fragment shader.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.8, 3);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        void main() {
            float d = 1.0 - gl_FragCoord.z;
            vec3 v = vec3( d );
            gl_FragColor = vec4( v, 1.0 );
        }`
});
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry( 1.2, 80, 80);
const mesh = new THREE.Mesh(geometry, material1);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 14.2 - Uniform values

A [uniform value IN GLSL](https://www.khronos.org/opengl/wiki/Uniform_%28GLSL%29) is a global Shader variable declared with the "uniform" [storage qualifier](https://www.khronos.org/opengl/wiki/Type_Qualifier_%28GLSL%29#Storage_qualifier). These kinds of values are values that can be passed to the shader program by the user. For example there is setting the color option, or the opacity option of the Mesh basic Material. 

With this example then I made a custom kind of Depth Material by studying the GLSL source code of the Mesh Depth Material which is where I found out that I can use gl\_FragCoord.z over the higher precision values that are used in the Depth Material. One feature that I would like to add while making this is to have a kind of base color optiin for the depth material that is then effected by the depth values.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.8, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: {
        baseColor : { value: new THREE.Color('cyan') },
        opacity: { value: 1 }
    },
    vertexShader: `
        varying vec2 vHighPrecisionZW;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        uniform vec3 baseColor;
        uniform float opacity;
        uniform float depthAlpha;
        varying vec2 vHighPrecisionZW;
        void main() {
            float d = (1.0 - gl_FragCoord.z);
            gl_FragColor = vec4( baseColor * d, opacity );
        }`
});
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.BoxGeometry( 1, 1, 1);
const mesh1 = new THREE.Mesh(geometry, material1);
mesh1.rotation.y = Math.PI / 180 * 20;
scene.add(mesh1);
const material2 = material1.clone();
material2.uniforms.baseColor.value = new THREE.Color('lime');
console.log(material2);
const mesh2 = new THREE.Mesh(geometry, material2);
mesh2.position.set(-1, 0, 1)
mesh2.rotation.y = Math.PI / 180 * 20;
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 14.3 - Varying variables

So we have Uniform values that are a way to set values by way of some custom user space options, but then we also have varying variables as well. These are another kind of value that will come up all the time in GLSL code also and they are a way to share values from the vertex shader to the fragment shader.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.8, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: {
        intensity: { value: 3.0 }
    },
    vertexShader: `
        uniform float intensity;
        varying vec3 v_color;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            v_color = position * intensity;
        }`,
    fragmentShader: `
        varying vec3 v_color;
        void main() {
            gl_FragColor = vec4( v_color, 1.0 );
        }`
});
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry( 1.0, 30, 30);
const mesh1 = new THREE.Mesh(geometry, material1);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
let frame = 0;
const frameMax = 900;
const loop = () => {
    const a_frame = frame / frameMax;
    a_inten = Math.sin( Math.PI * (a_frame * 9 % 1) );
    requestAnimationFrame(loop);
    material1.uniforms.intensity.value = 1 + (1 + 7 * a_frame) * a_inten;
    renderer.render(scene, camera);
    frame += 1;
    frame %= frameMax;
};
loop();
```

## Conclusion

That covers just about everything when it comes to materials, but I would still not go so far as to say that this post is truly comprehensive on the subject of materials in threejs. Many of these sections could still use further expansion and refinement. Also when it comes to getting into the subject of the shader material, and with that what there is to work with in the shader library, the sky might very will be the limit with materials. There are all the little chunks of the shader lib to use to help add various common parts of materials to a custom material. Also there is the subject of using the Raw shader material and with that using raw GLSL code to create a material from the ground up. So yes there is a whole other language to learn when it comes to getting truly proficient with materials in threejs. I have been at this for years off and on and I am still just scratching the surface on this subject alone with threejs, and there is still every other little part of the library to look into.

This is one of my oldest blog posts on threejs that I have of course edited a number of times sense I first started it. I will of course come around to edit this post some more now and then in an effort to try my best to really do this subject justice.
