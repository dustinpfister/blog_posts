---
title: Emissive maps in threejs
date: 2021-06-22 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 894
updated: 2023-07-04 11:19:57
version: 1.48
---

There are a lot of texture maps that can be used with the various materials in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), such as using a basic diffuse color map with the [basic material](/2018/05/05/threejs-basic-material/), or an [alpha map](/2019/06/06/threejs-alpha-map/) to set transparent areas. I am not sure if I will ever get around to writing posts on every kind of map there is to be aware of in threejs, but there are some that really stand out for me more than others, and one of these map options is an [emissive map](https://stackoverflow.com/questions/23717512/three-js-emissive-material-maps).

When I am working with a material that will respond to a light source such as the standard material, there is the color property of the material that can be used to set a base color for the material. This color property will work a little different with the standard material compared to other materials like the basic material in that the color will only show up when there is some light in effect. So then there should be some kind of color property that will work with the standard material in the same way as the color property in the basic material in that it can be used to set a color that will always show up regardless of what the situation is with lighting. This is where the emissive property comes into play to set a color that will always show up.

However there is not just thinking in terms of simple solid colors for mesh objects, there is also getting into textures. With the basic material there is using the map property as a way to set a simple color map. When it comes to the standard material, there is also a map property but as with the color property it will only work with light. So then there is also the emissive map property that can be used in place of the map property when compared to the basic material. With that said the color, map, emissive, and emissiveMap options can be used to set the base color and textures in terms of what will respond to light, and what will always show up. Of course there is a whole lot more to this when it comes to yet even more material options, as well as other related topics that have to do with geometry. However in this post the main focus will be on emissive maps.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/jmh4d7BiPIo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Emissive maps and what to know first

There is a great deal that one should be aware of before getting into emissive maps in threejs. Of course it should go without saying that you should know at least a thing or two about [the very basics of staring a threejs project](/2018/04/04/threejs-getting-started/), and how to work with [client side javaScript in general](/2018/11/27/js-getting-started/). So I will not be getting into every little detail about what should be known before hand, but I can take a moment to mention at least a few things that you might want to read up on first in this section.

### The texture loader, canvas textures, and data textures.

The emissive map is a kind of texture map for a material, and in order to use any of these texture maps you will need, well yeah a texture. When it comes to loading an external file such as a PNG file something like the three.js built in [texture loader](/2021/06/21/threejs-texture-loader/) can be used to do so. If you have some other means to load image files as an image object in client side javaScript terms then another options would be to use the THREE.Texture constructor function to create an instance of the kind of object that is used for these kinds of various maps of materials. 

When it comes to creating a texture with a little javaScript code rather than some kind of external image asset, one way to go about doing so would be to make use of [canvas elements](/2018/04/17/threejs-canvas-texture/), and the 2d drawing context as a way to create textures that way by making use of the THREE.CanvasTexture constrictor. Yet another option for creating textures with javaScript code would be to make use of the [THREE.dataTexture constructor](/2022/04/15/threejs-data-texture/), this way one can create textures with a type array of color channel data.

### Read up more on materials to know your options

There are a number of options when it comes to [materials](/2018/04/30/threejs-materials/) that support the emissive map feature, for these examples I will be sticking mainly to the [standard material](/2021/04/27/threejs-standard-material/). The standard material is a great general purpose material, and for that reason it is more or less my first go to material and not just because it supports emissive maps. However another great option would be the [Phong material](/2022/12/29/threejs-phong-material/) which also supports specular highlights which is cool, but getting into that would be a bit off topic here.

### Diffuse Color maps, and lighting.

Although emissive maps and the emissive color can be used without a light source, the main reason why we are bothering with them is becuase we are working with a material that responds to light. So in order to really know what emissive maps are about you are going to want to play around with lighting, and also the color property and color maps that are effected by lighting. When it comes to [what the options are with lighting](/2022/02/25/threejs-light/) there are again a range of options just like that of many other kinds of objects in threejs. 

For the most part thought I like to go with [ambient light](/2018/11/02/threejs-ambientlight/) and [point lights](/2019/06/02/threejs-point-light/) as a way to set an over all base about of light for all surfaces, and to also make use of something  where distance an direction have some effect on surfaces.

### The source code examples in this post are up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-emissive-map). This is also the repo where I park the source code examples for all [my other posts on threejs as well](/categories/three-js/). Also if you want to get things working on you end with these examples I do try to keep them copy and paste friendly but often the best way would be to clone down the repo, start the server, and view the examples that way.

### Version numbers matter

When I wrote this post for the first time I was using r127 of threejs which was a late version of threejs that was released in early 2021. The last time that I came around to do a little editing of this post I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) and the old examples as well as the new one I made at that point on data texture worked fine with that version of threejs. Still code breaking changes are made to threejs often so always be mindful of the version number that you are using.

## 1 - Some basic examples of emsiive maps

As with all my other posts on threejs I start things off with a few basic examples of the topic. However there are a few problems that are going to result in these examples being, well, not so basic. This is a topic on a feature in which a texture is needed in order to go forward. So in any case I have to use the texture loader, and thus the example will not be so copy and paste friendly. Or I have to generate textures with a little javaScript code which can be copy and paste friendly, but will result in the example being a little intense for people that are still new to threejs and javaScript. This however is a post on a topic that is not so much for people that are new to this though, so as long as you are aware of this then maybe these examples will still prove to be not so intense.

### 1.1 - Data texture example of an emissive map

This example of emissive maps that I made makes use of data textures as a way to create the texture that will be used for an emissive map. This is a way of creating a texture by making an instance of a unit8Array and then having values between 0 and 255 for each color channel, including alpha, for each pixle. To quickly just create a texture with random color values purely or the sake of having an emissive map texture I am using the seeded random method of the math utils object and then using function arguments to change what the values are for each color channel.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const light = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.25);
light.position.set(8, 10, 2);
scene.add(light);
//-------- ----------
// HELPERS
//-------- ----------
// create data texture helper
const createDataTexture = (rPer, gPer, bPer) => {
    rPer = rPer || 0;
    gPer = gPer || 0;
    bPer = bPer || 0;
    const width = 16, height = 16;
    const size = width * height;
    const data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        const stride = i * 4;
        const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v * rPer;
        data[stride + 1] = v * gPer;
        data[stride + 2] = v * bPer;
        data[stride + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    return texture;
};
// create emissive cube helper
const createCube = (emissiveMap, map, emissiveIntensity) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            map: map || null,
            emissiveIntensity: emissiveIntensity || 0,
            emissive: new THREE.Color(1, 1, 1),
            emissiveMap: emissiveMap || null
        }));
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
[ 
 [[1,1,1], 1], 
 [[0,0,1], 0.25], 
 [[0,1,0], 0.1] 
].forEach( (cubeArgs, i, arr) => {
    const emissiveMap = createDataTexture.apply(null, cubeArgs[0]);
    const map = null;
    const box = createCube(emissiveMap, map, cubeArgs[1]);
    box.position.x = -5 + 10 * (i / arr.length);
    scene.add(box);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Canvas texture example of an emissive map

In this section I will be writing about a quick basic example of an emissive map where I am creating the emissive map with a canvas element rather than loading an external texture. So for this example I have a create canvas texture helper that I can call and then pass a function that will be by draw function that will be called to create the texture with the 2d drawing context.

I then have my create emiisve map helper that will create and return the texture that I want to use for an emissive map using my create canvas texture helper. For this basic example I am just creating a square around the edge of the canvas element to define the outer edge of the texture as the emissive area.

I also have one more helper function for this example and that is one that will create and return a mesh object that will make use of a material that has an emissive map created with the other above helper functions. I am calling the create emissive map as a way to create and return the texture that I want to use for the emissive map. In addition to this there are a few more properties that are worth taking about for the material. One of which is the emissive intensity property that can be used to adjust the intensity of the emissive glow effect. There is then also adjusting what the solid emissive, and regular color values are. In any case the emisisve color is the color that will be the glow effect, and as such it should be just about any desired color other than the default black.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create canvas texture helper
const createCanvasTexture = function (draw) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
// create emissive map helper
const createEmissiveMap = function(){
    const COLOR_EMISSIVE_MAP_FRONT = new THREE.Color(1, 1, 1);
    return createCanvasTexture(function (ctx, canvas) {
        ctx.strokeStyle = COLOR_EMISSIVE_MAP_FRONT.getStyle();
        ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
    });
};
// create emissive cube helper
const createEmissiveCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            emissiveIntensity: 1,
            emissive: new THREE.Color(1, 0, 0),
            emissiveMap: createEmissiveMap()
        }));
};
//-------- ----------
// SCENE OBJECTS
//-------- ----------
const box = createEmissiveCube();
scene.add(box);
//-------- ----------
// LIGHT
//-------- ----------
const light = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
light.position.set(8, 6, 2);
scene.add(light);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

The end result of this then is a cube where the sides are lit up a little because of the presence of the light source in the form of a point light. However regardless of what the lighting situation is with a side all the areas effected by the emissive map are glowing a little with the color that I set with the emissive property.

## 2 - Animation loop examples of emissive maps

For this section I will be going over a few examples that make use of an animation loop. This allows for me to update things over time to really help get an idea of what the deal is with emissive maps.

### 2.1 - First video example

For the first video that I made for this blog post I created a video using a hacked over version of r2 of my [object grid warp threejs example](/2022/05/20/threejs-examples-object-grid-wrap/). I have the full source code of this hacked over version of the object grid wrap module and the addtional files that I am using in the Girhub folder.

<iframe class="youtube_video" src="https://www.youtube.com/embed/6q1jP6Y6srU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
var dl = new THREE.DirectionalLight(0xffffff, 0);
dl.position.set(2, 1, 3);
scene.add(dl);
var al = new THREE.AmbientLight(0xffffff, 0);
scene.add(al);
//-------- ----------
// TEXTURES
//-------- ----------
var texture_rnd1 = datatex.seededRandom(40, 40, 1, 1, 1, [0, 255]);
// emmisve map textures
var data_square = [
    3,3,2,1,1,2,3,3,
    3,2,1,1,1,1,2,3,
    2,1,0,0,0,0,1,2,
    1,1,0,0,0,0,1,1,
    1,1,0,0,0,0,1,1,
    2,1,0,0,0,0,1,2,
    3,2,1,1,1,1,2,3,
    3,3,2,1,1,2,3,3
];
// square
var texture_square = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [32,32,32,255],
    [64,64,64,255],
    [128,128,128,255],
]);
var texture_square_cyan = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [0,32,32,255],
    [0,64,64,255],
    [0,128,128,255],
]);
var texture_square_red = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [32,0,0,255],
    [64,0,0,255],
    [128,0,0,255],
]);
var texture_square_green = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [0,32,0,255],
    [0,64,0,255],
    [0,128,0,255],
]);
var texture_square_blue = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [0,0,32,255],
    [0,0,64,255],
    [0,0,128,255],
]);
//-------- ----------
// GRID OPTIONS
//-------- ----------
var tw = 9,
th = 9,
space = 2;
// source objects
var mkBox = function(color, h, emmisive_texture){
    emmisive_texture = emmisive_texture || texture_square;
    var box = new THREE.Group();
    var a = space * 0.75;
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( a, h, a),
        new THREE.MeshStandardMaterial({ 
            color: color,
            map: texture_rnd1,
            emissive: new THREE.Color('white'),
            emissiveMap: emmisive_texture,
            emissiveIntensity: 1}) );
    mesh.position.y = h / 2;
    //mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture_rnd1}) );
    ground.position.y = 0.05 * -1;
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkBox(0x00ffff, 0.25, texture_square_cyan),
    mkBox(0xff0000, 4.75, texture_square_red),
    mkBox(0x00ff00, 3.50, texture_square_green),
    mkBox(0x0000ff, 1.25, texture_square_blue)
];
var array_oi = [
    0,0,0,0,0,3,3,0,0,
    0,0,0,0,3,2,3,0,0,
    0,0,0,3,2,3,3,0,0,
    0,0,3,2,2,2,3,0,0,
    0,3,2,2,1,2,3,0,0,
    3,2,3,2,2,2,2,3,0,
    0,3,0,3,3,3,2,3,0,
    0,0,0,0,0,0,3,3,0,
    0,0,0,0,0,0,0,0,0
];
//-------- ----------
// CREATE GRID
//-------- ----------
var grid = ObjectGridWrap.create({
    space: space,
    tw: tw,
    th: th,
    dAdjust: 1.25,
    effects: ['opacity2', 'scale', 'rotationB'],
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
// minB value can be used to adjust min distance for opacity drop off
// when it comes to using the opacity2 effect
grid.userData.minB = 0.25;
scene.add(grid);
var setGridemissiveIntensity = function(emissiveIntensity){
    emissiveIntensity = emissiveIntensity || 0;
    grid.children.forEach(function(g){
         g.children.forEach(function(child){
             child.material.emissiveIntensity = emissiveIntensity;
         })
    });
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    // default light intensity for al and dl is 0
    dl.intensity = 0;
    al.intensity = 0;
    setGridemissiveIntensity(1);
    ObjectGridWrap.setPos(grid, (1 - a1) * 2, Math.cos(Math.PI * a2) * 0.25 );
    ObjectGridWrap.update(grid);
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

### 2.2 - Animation loop with directional light and updating textures

When I write posts on subjects like this I have come to find that I should make at least one of not more animation loop examples. The main thing here might be how to go about creating a new texture on each frame tick with data textures or canvas elements. So this section will be about a quick example that involves a animation lop function powered by the request animation frame method, and in the body of this loop method I will be creating anew textures each frame tick.

To create new textures with data textures I went with some code that I made for my video ground project that I just hacked over a little. The main thing about this data texture module is that I have a for each mix public method that is a function that I can use to quickly create a data texture with some javaScript logic that will be applied for each pixel. This is what I will be using to then make two additional helper functions that will create and return a new texture each time that it is called. One helper function will return just random noise and this is what I will be using for the color map of this example, the other will return a circle area, and will take one argument that can be used to adjust the radius which is what I will be using for the emissive map.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// DATA TEXTURE METHODS
//-------- ----------
// make a data texture by passing w, h, and a function
// that will be called for each pixel
const datatex = (function () {
    const api = {};
    // mk data texture helper
    api.mkDataTexture = (data, w) => {
        data = data || [];
        w = w || 0;
        const width = w,
        height = data.length / 4 / w;
        const texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = (w, h, forEach) => {
        const width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        const size = width * height;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const x = i % width;
            const y = Math.floor(i / width);
            let obj = forEach(x, y, w, h, i, stride, data);
            obj = obj || {};
            data[stride] = obj.r || 0;
            data[stride + 1] = obj.g || 0;
            data[stride + 2] = obj.b || 0;
            data[stride + 3] = obj.a === undefined ? 255: obj.a;
        }
        return api.mkDataTexture(data, width)
    };
    // return the api
    return api;
}
    ());
// square texture
const circleTexture = function(t){
    t = t === undefined ? 1 : t;
    return datatex.forEachPix(16, 16, (x, y, w, h, i, stride, data) => {
        const v = new THREE.Vector2(x, y);
        const d = v.distanceTo( new THREE.Vector2(w / 2, h / 2) );
        let cv = d / ( 16 * t ) * 255;
        cv = cv > 255 ? 255 : cv;
        cv = cv < 0 ? 0 : cv;
        return {
            g: Math.round(cv)
        };
    });
};
//  rnd
const rndTexture = function(){
    return datatex.forEachPix(16, 16, (x, y, w, h, i, stride, data) => {
        const cv = Math.round( Math.random() * 255 );
        return {
            r: cv,
            g: cv,
            b: cv
        };
    });
};
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xafafaf, 0.5);
dl.position.set(8, 10, 2);
scene.add(dl);
const helper = new THREE.DirectionalLightHelper( dl, 5 );
scene.add( helper );
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({
        emissive: new THREE.Color('white'),
        emissiveIntensity: 1
    })
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    mesh.material.emissiveMap = circleTexture(a2 * 4);
    // new color map
    mesh.material.map = rndTexture();
    // moving directional light
    var r = Math.PI * 4 * a1,
    x = Math.cos(r) * 4,
    z = Math.sin(r) * 4;
    dl.position.set(x, 4, z);
    helper.update();
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

On top of also updating the texture used for both of the map and emissive map, I am also changing the location of a directional light as a way to show that as the light moves that will effect the map. That is that the light source will effect the noise texture used with the map, but it will not do anything with the emssive map as that will always show up no matter what regardless of what the state if with light in the scene object.

## Conclusion

That will be it for now when it comes to emissive maps, I wanted to write at least something about them for now at least so this should work for the moment. There might be a great deal more to write about with this subject but I think for the most part a great deal of it has to do with other aspects of the threejs library beyond just that of the emissive map property of a material that supports this. There is not just having an emiaaive map, but also a regular color map on top of that, and also there is the solid colors for but the regular color that is effected by a light source as well as the emissive color as well. On top of all of that there is also the emissive intensity value that is also something that I might want to adjust when it comes to this sort of thing.

