---
title: The Color class in threejs a overview of features
date: 2021-05-03 12:32:00
tags: [three.js]
layout: post
categories: three.js
id: 858
updated: 2023-07-01 12:29:09
version: 1.57
---

When it comes to [threejs](https://threejs.org/) the [THREE.Color](https://threejs.org/docs/#api/en/math/Color) constructor can be used to work with colors for various object properties that need a color value, as well as to just work with color in general. This [constructor function](/2019/02/27/js-javascript-constructor/) can be used to create a THREE.Color class object instance that represents a specific color that can then be used to set the background color and the fog color when it comes to scene objects, the color of various properties of a material such as the color and emissive values, and just about almost everything else that has to do with color.

What is nice about the THREE.Color class is that the class is packed with a number of features that allow for me to create a color in a number of different ways, including just passing three numbers for red, green and blue color channel values in the form of a number between 0 and 1 as arguments when calling the constructor function. Regardless of how I create the color what is returned is an instance of THREE.Color, rather than a string value for a color, and as such there is a red, green, and blue property of the object. There are also a great number of prototype methods that have to do with mutating these values, or returning values based off the state of these properties, or changing the state of the color. For example there is a get hex method that will return a hex string value of the color, and a set RGB method that will change the value of the color by r, g, and b values.

So in this post I will be going over a number of typical use case examples of the THREE.Color constructor, and will also likely touch base on a number of other topics while in the process of doing so when it comes to using this class of the threejs javaScript library.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/QFYxHbt83os" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## THREE.Color and what to know first

This is a post on the THREE.Color constructor in the javaScript library called threejs, this is not a post on the [basics of getting started with threejs](/2018/04/04/threejs-getting-started/), or client side [javaScript in general](/2018/11/27/js-getting-started/), so I assume that you have at least some background with these subjects before hand. I will then not be getting into great detail about threejs as well as the subject of color in general when it comes to client side javaScript. Still in this section I will be going over a few key details that you might want to read up more on that are relevant to the rest of the content of this post.

### A Transparent effect is a whole other can of worms

When it comes to working with color in a client side javaScript environment there are ways of having an alpha channel for a color. In the THREE.Color class there are just properties for red, green, and blue, but not for an alpha channel. It is of course possible to make [materials transparent](/2021/04/21/threejs-materials-transparent/), but doing so involves setting the transparency Boolean for the material to true, and then it is the opacity property of a material that will act as the alpha channel value. 

### Check out more on what there is to know about materials

There are a number of reasons as to why I would want to create an instance of color, one of which is to create a value to be used with one of the various properties of one or more kinds of [mesh materials](/2018/04/30/threejs-materials/). However what properties are what when it comes to creating or change a color value will change a little from one material to another. For example when it comes to the [basic material](/2018/05/05/threejs-basic-material/) it is more or less just the color property that I care about, but when it comes to the [standard material](/2021/04/27/threejs-standard-material), or the [phong material](/2022/12/29/threejs-phong-material/), there is the color and emissive property that I need to be aware of.

### Creating textures from javaScript code

Another use case for the threejs color class is to use it to create one or more colors that I will then use to create textures by way of javaScript code rather and a static external image asset. There are a number of ways to do this such as with the [data texture constructor](/2022/04/15/threejs-data-texture/), or the [canvas texture constructor](/2018/04/17/threejs-canvas-texture/).

## The source code examples in this post, and in many others is on Github

The source code examples that I am writing about in this post, as well as for many of my [other posts on threejs](/categories/three-js/), can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-color). Cloding down the repo, installing the node modules, and running the server would be the best way to quickly get things up and ruining on your end if you would like to see all of these examples in action.

### Version Numbers matter with three.js

When I first wrote this post I was using r127 of threejs which was a late version of three.js in April of 2021. The last time I came around to doing editing with this post I was then using [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) when checking out the source code examples. Code breaking changes are made to threejs all the time, so be sure to always check the version that you are using relative to the dates of the code examples that you are looking at on the open web.

## 1 - Basic examples section of the THREE.Color class

For this very first section I will be trying my best to avoid doing anything fancy as this will be the basic getting started section of the color class. So for these examples I will be avoiding the use of animation loops, lights, textures, and so forth. The focus then will be on the color class and just some basic features of threejs and the usual set of objects that are needed for any threejs project examples.

### 1.1 - Color property of a Mesh material

To start out here how about a basic use case example of the THREE.Color constructor where I am just setting the regular color property of a material, and then using that material with a mesh object and some geometry that was created with one of the built in geometry constructor functions. 

When setting the color value of a material it is important to take into consideration what kind of material it is to begin with. In this example I am using the basic material which is a kind of material that does not work with light sources. This will help to keep the example a little more basic as I do not need to add additional objects to the scene that add light to the over all scene. However one draw back of just using a solid color with the basic material is that I get a solid mass of color in the screen. Still when it comes to just getting started with this sort of thing this will work okay for a basic example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 0, 0)
    })
);
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

In this example it is just the color property of the basic material that I am setting a solid color for with the color class. Although this example works okay for a starting point one thing that is a pain about this is that I just end up with one big solid mass of color. If I want to have some sense of depth there is doing a number of things that can help with that. There is of course getting into using a material that will respond to a light source for sure which would be one way to address this. However for the sake of this basic section I think I should stick to the basic material and what there is to work with when it comes to other options that can be sued to add some depth.

### 1.2 - Using lines and adding them as a child for a mesh object, and setting color for that as well

One way to add some depth to the object is to create some lines based on the same geometry as a mesh object, and then add that as a child of the mesh object. When making a Line object I have to stick to using special materials that are made for line objects rather than mesh objects. When doing so I can also set the color option of line materials with a color object as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const color1 = new THREE.Color(0.0,0.5,0.5);
const color2 = new THREE.Color(0.8,0.8,0.8);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material_mesh = new THREE.MeshBasicMaterial({ color: color1 });
const mesh1 = new THREE.Mesh( geometry,material_mesh);
// adding a line as a child of the mesh object
const material_line = new THREE.LineBasicMaterial({ color: color2, linewidth: 6 })
const line1 = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), material_line)
mesh1.add(line1)
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1.5, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.1 - Setting Color and Emissive Color with THREE.Color

Another property of interest when it comes to setting the color values of a material that responds to light is the emissive property of a material. This property is a color that will be used always regardless of what the situation might be when  it comes to what is going on with light in the scene. Just like with the color property the emissive property can also be set with a color object created with THREE.Color. When doing so I will often want to adjust the emissive intensity of the material as I might now always want the emmisve color to be full bast of course.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: new THREE.Color(1, 1, 1),
        emissiveIntensity: 0.8,
        emissive: new THREE.Color(1, 0, 0)
    })
);
scene.add(mesh1);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

There is also creating a texture to use as an emmisive map which can often be used as a way to create cool effects with textures. The use of this emissive map will allow me to set what areas of a face will be effected by the emmisve color and intensity, as well as what areas will not be effected by these values.

## 3 - Tetxures and the Color class

One use case in which I have found that the Color class comes into a play a lot is when making textures by way of a little javaScript code rather than that of an external image asset. When doing so there are two general ways to do so with threejs, one is to use canvas textures, and the other way is to use data textures. With canvas textures I can make use of the 2d drawing context of image assets, where with data textures I work with raw color channel data. So in this section I think I will need to go over at least a few demos of this kind of use case with the Color Class.

## 3.1 - Using Canvas textures, emissive maps, and the THREE.Color.getStyle method

For this demo I will be getting into the user of [canvas textures](/2018/04/17/threejs-canvas-texture/) a s a way to create a texture by javaScript code. I will then be using the texture as a value for the emissive option of an instance of the standard material.

Getting into emissive maps might be a little off topic from the THREE.Color class, but yet again maybe not as it might prove to serve as a way to demonstrate a use case example for the get style method. This get style method will return a string value like 'rgb\(255,0,0\)' from an instance of the color class like this new THREE.Color(1, 0, 0). So I can use the THREE.Color class not just for properties of materials and the scene object, but also to set the value of a style for an instance of the 2d drawing context of a canvas when creating a texture with a canvas element.

Anyway for this demo I have a helper function that will create and return a new texture that is created with the THREE.CanvasTexture. However in order to call this canvas texture constructor function I first need to have a canvas element, and I also will want to draw to the canvas at some point, typically before passing the canvas. Inside this helper function I am doing so by way of a draw method that will be passed when calling the create canvas texture helper. In this custom draw method, when it comes to setting a fill style or stroke style I can not just use the THREE.Color object directly, however I can call the get style method of a THREE.Color instance and then use the resulting string to set such a value.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const createCanvasTexture = function (draw) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
//-------- ----------
// TETURES
//-------- ----------
const COLOR_EMISSIVE_MAP_FRONT = new THREE.Color(1, 1, 1);
const texture = createCanvasTexture(function (ctx, canvas) {
    ctx.strokeStyle = COLOR_EMISSIVE_MAP_FRONT.getStyle();
    ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
});
//-------- ----------
// OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(0, 1, 0),
            emissiveIntensity: 0.75,
            emissive: new THREE.Color(1, 0.5, 0),
            emissiveMap: texture
        }));
scene.add(mesh1);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


### 3.2 - For Pix method using Data Textures and THREE.Color

Sense I first wrote this [blog post I wrote a blog post on data textures](/2022/04/15/threejs-data-texture/) which is another option when it comes to making a texture from javaScript code rather an external image asset. When working out what the color values should be for each pixel the THREE.Color class can come in handy for making some kind of abstraction where I can pass a function that will be called for each pixel location in a texture. In this section I am doing just that when making a create data texture helper function that will take a forPix function as one of the options. In the body of this for pix function I am passing an instance of THREE.Color as one of the arguments, and this is also the value that should be returned by the function.

By default the forPix function will use the Seeded Random method of the Math utils object in threejs as a way to get a value between 0 and 255 that I then set for each color channel using the set rgb method of the color class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// DATA TEXTURE HELPER
//-------- ----------
const createDataTexture = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    opt.forPix = opt.forPix || function(color, x, y, i, opt){
        let v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        color.setRGB(v, v, v);
        return color;
    };
    let size = opt.width * opt.height;
    let data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        let stride = i * 4,
        x = i % opt.width,
        y = Math.floor(i / opt.width),
        color = opt.forPix( new THREE.Color(), x, y, i, opt);
        data[ stride ] = color.r;
        data[ stride + 1 ] = color.g;
        data[ stride + 2 ] = color.b;
        data[ stride + 3 ] = 255;
    }
    let texture = new THREE.DataTexture( data, opt.width, opt.height );
    texture.needsUpdate = true;
    return texture;
};
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
//-------- ----------
// OBJECTS
//-------- ----------
const tex1 = createDataTexture();
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        map: tex1
    })
);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    mesh1.material.map = createDataTexture();
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

### 4.1 - Background and Fog

Another use case example of the THREE.Color constructor would be to set the background color and or a [fog color](/2018/04/16/threejs-fog/). When doing so I typically will want to make the background color the same as the fog color, and I will also want to use the fog color for the color property of materials also. So it would make sense to have some kind of global, or constant local variable that is a fog color variable and set the color for that once with the THREE.Color Constructor. Then use that values for the scene.background property, as well as the value to pass to THREE.fogExp2 to create the value for scene.fog, and to use the color for mesh materials.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const fogColor = new THREE.Color(0, 1, 0);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
// ---------- ----------
// OBJECTS
// ---------- ----------r
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: fogColor,
        emissive: new THREE.Color(1, 0, 0),
        emissiveIntensity: 0.6,
    })
);
scene.add(mesh1);
// ---------- ----------
// LIGHT
// ---------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
    mesh1.position.set(0, 0, -1 - 2.5 * a2);
    mesh1.rotation.set(0, Math.PI * 2 * a1, Math.PI * 4 * a1);
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

In this example I am now making use of a loop that make used of the [requestiAnimationFrame method](/2018/03/13/js-request-animation-frame/) to call the render function of the web gl render over and over again. Each time I do so I update some things when it comes to the position and rotation of the box object. The effect is then that the box will disappear as it moves away from the camera and will gradually appear again as it comes back in range of the camera. When doing so I am using th set method of the [vector3](/2018/04/15/threejs-vector3/) instance when it comes to the position of the box, and a similar set method for the [Euler instance](/2021/04/28/threejs-euler/) when it comes to setting rotation. These classes are also worth checking out in detail if you have not done so before hand.


## 5 - Color Class Methods

There are a number of methods to work with when it comes to the color class. So I should at least start a section on these various methods, and expand on it when it comes to future edits.

### 5.1 - Color add and equals methods

In this example I am using the add method of a color class instance of each material or each mesh in a group of mesh objects. I just get a reference to the material that I am using for a mesh, and then I can call the add method of that color to add the values of another instance of THREE.Color to that color. I can also use the equals method to find out of a color is fully white or not, and of so I can set a new random color using a random color helper.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const randomColor = function () {
    const r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
const randomPosition = function () {
    const x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};
const createBoxGroup = function(){
    // creating a group of mesh object with random colors
    const group = new THREE.Group(), len = 15;
    let i = 0;
    while (i < len) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: randomColor()
            })
        );
        mesh.position.copy(randomPosition());
        group.add(mesh);
        i += 1;
    }
    return group;
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(8,8))
const group = createBoxGroup();
scene.add(group);
// ---------- ----------
// LIGHT
// ---------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
    group.children.forEach(function (box) {
        const r = 0.05 * a1,
        g = r, b = r,
        color = box.material.color;
        color.add( new THREE.Color(r, g, b) );
        color.r = color.r > 1 ? 1 : color.r;
        color.g = color.g > 1 ? 1 : color.g;
        color.b = color.b > 1 ? 1 : color.b;
        if(color.equals(new THREE.Color(1,1,1))){
            box.material.color = randomColor();
        }
    });
    group.rotation.y = Math.PI * 2 * a2;
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

### 5.2 - Set From Vector3

As of revision r151 there is now a set from vector3 method of the color class. However as of this writing I am still sticking with r146 for these demos so I made a pony fill for this method. The native method just sets the x value to the r value, and so forth anyway. So making a pony fill is what I will typically want to do anyway as that would often not be enough with what I would want to do with this sort of thing anyway. There is doing things like normalizing the vector, and also maybe using Math.abs when it comes to handling negative values of a vector as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// pony fill as Color.setFromVector3 is not in any revision < 151
const setColorFromVector3 = (color, v3_source) => {
    const v3 = v3_source.clone().normalize();
    color.r = Math.abs(v3.x);
    color.g = Math.abs(v3.y);
    color.b = Math.abs(v3.z);
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(8,8) );
const mesh = new THREE.Mesh(
    new THREE.TorusGeometry( 0.5, 0.25,  30, 30),
    new THREE.MeshPhongMaterial({ color: new THREE.Color() })
);
scene.add(mesh);
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1)
scene.add(dl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,
FPS_MOVEMENT = 30;
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * a1;
    e.z = Math.PI * 2 * 16 * a1;
    mesh.position.set(1, 0, 0).applyEuler(e);
    mesh.lookAt(0, 0, 0);
    setColorFromVector3( mesh.material.color, mesh.position);
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

### 6.1 - Random Color example

Now for a random color example, for this I made a few helper method one of which is of course a random color helper. In there I just need to call Math.random for red, green and blue values of the THREE.Color Constructor. At least that is all I need to do in order to have a full range of possibles when it comes to random colors.

I also have a similar method when it comes to creating a random position to pace a box object, with this one I am creating an instance of Vector3 and then using the instance of vector three as an argument to be passed to the Vector3 copy method later in the source code when creating a group of box objects.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const randomColor = function () {
    const r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
const randomPosition = function () {
    const x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};
//-------- ----------
// OBJECTS
//-------- ----------
const group = new THREE.Group(), len = 15;
let i = 0;
while (i < len) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshStandardMaterial({
            color: randomColor(),
            emissiveIntensity: 0.8,
            emissive: randomColor()
        })
    );
    mesh.position.copy(randomPosition());
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// LIGHT
// ---------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
        group.children.forEach(function (box) {
            box.rotation.set(0, Math.PI * 2 * a1, Math.PI * 4 * a1);
        });
        group.rotation.y = Math.PI * 2 * a1;
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

When it comes to some kind of simple random color example such as this there are a great number of things that I might want to change when it comes to creating random colors. However for the most part it might be just playing around with the expressions that are used to create a color.

### 7.1 - Mutation of color value over time

So I have covered some example that have to do with creating an instance of color, and using that color when it comes to things like setting the background color of a scene object, or colors that can be used when drawing to a canvas element to be used for a texture in an emissive map. Now I am thinking that I will wan to make at least one of not more examples that have to do with mutation of a color object instance over time.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(8,8))
const color = new THREE.Color(1, 0, 0);
const material = new THREE.MeshStandardMaterial({
    color: color
})
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    material
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
    material.color.setRGB(a2, 1 - a2, 0);
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





## Conclusion

Well I think that might be it for now at least when it comes to the THREE.Color constructor in three.js until I get around to editing this post. There is not just setting solid color values though when it comes to everything that has to do with color in three.js though. There is a great deal more to write about when it comes to color and the various types of texture maps there are to work with when ti comes to creating a material for example. With an alpha map for example I want to set the colors of the various pixels to colors that are gray scale rather than solid colors as gray scale colors are what are used to set levels of transparency for the alpha map. When creating a texture for a mesh I might often use a canvas element, so setting the color values for the texture might not make use of the THREE.Color constrictor but that is never the less one of many additional little details that have to do with color in threejs.
