---
title: Creating textures with raw data in threejs
date: 2022-04-15 12:56:00
tags: [three.js]
layout: post
categories: three.js
id: 978
updated: 2022-10-05 09:11:07
version: 1.29
---

I have wrote a [number of posts on the use of canvas elements](/2020/03/23/canvas-example/), and also a post on [using canvas elements as a way to create textures](/2018/04/17/threejs-canvas-texture/) for the materials that are used for mesh objects in threejs. However there is another built in way to create textures with javaScript code other than making use of canvas elements, and this option is the [data textures](https://threejs.org/docs/#api/en/textures/DataTexture) class.

When it comes to using data textures as a way to create textures with javaScrript code in threejs I just need to know how to produce the texture that I want in terms of a [Unit8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) with a set of four values for each color channel. That is that I need to create an array with integer values between and including the range of 0 to 255 for red, green, blue and alpha color channels for each pixel. Once I have that I can just pass that array, along with a width and height value to the THREE.DataTexture constructor function and the returned result will be a texture that I can then use for the various maps of a material such as the standard material that in turn can be used with a geometry to skin a mesh object.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/gvLwa6vgesM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Data textures in threejs and what to know first

This is a post on using the THREE.DataTexture constructor in threejs to create a texture using raw data for each color channel of each pixel in the form of a unit8array. This is then not at all any kind of [getting started with threejs](/2018/04/04/threejs-getting-started/) type post, and I also assume that you have learned at least a thing or two about javaScript and client side web development in general before hand. I still make an effort to cover at least a few things that you might want to read up more on in these opening sections of my posts.

### When working with textures there is a lot to be aware of with geometry

The main focus in this post is to just simply create textures using raw color channel data, and then use the resulting texture with say a map property of a material. There is then a lot more to read about when it comes to the various options with material maps, but also just as much if not more when it comes to the [buffer geometry class](/2021/04/22/threejs-buffer-geometry/).

### version numbers matter

The version of threejs that I was using when I first wrote this post was r135, and the last time I came around to do some editing I was using r140.  Still code breaking changes might be made at some point in the future so one should always be mindful of the version of threejs that they are using when reading about and using threejs source code examples on the open web.

### The source code in this post is up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-data-texture).

## 1 - Basic examples of data textures

To start this post off I will want to cover a few basic examples of data textures. I will be trying to keep these examples fairly simple but even then there is a lot to be aware of when it comes to making textures this way.

### 1.1 - A basic data texture example

For a starting simple example of this data texture thing in threejs I made this quick example that involves starting at a value of 32 for the red channel and adding 128 over the length of the total number of pixels for the image. I am then also doing something similar for the green channel just subtracting rather than adding.

I start out by making my usual [scene object](/2018/05/03/threejs-scene/) along with a [camera](/2018/04/06/threejs-camera/) and [web gl renderer](/2018/11/24/threejs-webglrenderer/) just like with any other threejs project. After that I will want to create an instance of a unit8Array where the length is equal to the number of pixels times four. So I just need to figure out that the width and height of the texture should be and then multiply that to get a size in terms of a total number of pixels. I can then use this size value times four to set the length of the typed array, and also use it as a way to know if I should stop looping or not when it comes to setting the values for this array.

I then have a loop in which I am figuring out what the values should be for each red, green, blue, and alpha channel value for each pixel. I can have an index for each pixel and then just figure out what the actual index value in the array is by just multiplying by four and then adding fro there for each channel value. Once I have my array in the state that I want it for the texture the next step is to then pass that array as an argument when calling the THREE.DataTexture [constructor function](/2019/02/27/js-javascript-constructor/).

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// TEXTURE
//-------- ----------
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
const width = 32, height = 32;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4,
    a1 = i / size,
    a2 = i % width / width;
    // set r, g, b, and alpha data values
    data[ stride ] = Math.floor(255 * a1);            // red
    data[ stride + 1 ] = 255 - Math.floor(255 * a1);  // green
    data[ stride + 2 ] = Math.floor(255 * a2);        // blue
    data[ stride + 3 ] = 255;                         // alpha
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
//-------- ----------
// MESH
//-------- ----------
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    })
);
scene.add(plane);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.2 - Distance to method of the Vector2 class

I have wrote a number of posts at this point on the [Vector3 class in threejs](/2018/04/15/threejs-vector3/) that is without question one of the major classes in threejs that a developer should become familiar with. However there is also the Vector2 class that has to do with just plain old 2d points which also will come into play when doing things like working with the [raycaster class](/2021/05/18/threejs-raycaster/), or in this case making 2d textures with a little javaScript code and the data texture constructor.

For this example I am doing more or less the same thing as in the basic example, but now I am using the distance to method of the Vector2 class as a way to get a distance value from a current pixel location to that of the center of the texture. I can then use this as a main to come up with different color channel values for each pixel in the texture.

```js
// scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Using the distanceTo method of the Vector2 class
const width = 16, height = 16;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4,
    x = i % width,
    y = Math.floor(i / width),
    v2 = new THREE.Vector2(x, y),
    d = v2.distanceTo( new THREE.Vector2(width / 2, height / 2) ),
    iPer = i / size;
    let dPer = d / (width / 2);
    dPer = dPer > 1 ? 1 : dPer;
    // set r, g, b, and alpha data values
    data[ stride ] = 255 - Math.floor(255 * dPer);
    data[ stride + 1 ] = Math.floor(64 * iPer);
    data[ stride + 2 ] = 64 - Math.floor(64 * iPer);
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```

### 1.3 - Using the math random method

Now for a quick example using the [math random](/2020/04/21/js-math-random/) method to create color channel values. There are of course a great number of ways that I could go about doing this sort of thing, but for this example I just went with creating a single value that will be used for each color channel. So in other words I am doing a kind of random gray scale color effect here.

```js
// scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// To create a texture using the Math.random method
const width = 16, height = 16;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4;
    const v = Math.floor( Math.random() * 255 );
    data[ stride ] = v;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = v;
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```

### 1.4 - The seeded random method of the Math Utils object

I just also wrote a new post on the [math utils object](/2022/04/11/threejs-math-utils/) in threejs, and one interesting method in there is a seeded random method that will work like math random, with one little difference. Each time I reload the page I see the same texture rather than a new one. So then  this seeded random method is a way to get an effect like that of what happens when using the math random method, but in a deterministic kind of way which is cool.

```js
// scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Uisng the seeded random method of the MathUtils object
const width = 16, height = 16;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4;
    const v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
    data[ stride ] = v;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = v;
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```

## 2 - Animation examples

Now that I have some basic examples out of the way it is time to go over at least one if not more examples of animated data texture examples.

### 2.1 – Having a helper function that has some kind of for pixel function option

Thus far all of these data texture examples are just blocks of code that create a single texture. When it comes to making a real project with data textures I will likely want to make a number of them, and do so in different ways. To keep myself from repeating the same code over and over again each time I want to make a data texture I can then make some kind of helper function and pass some values that will result in the kind of texture that I want.

When doing so the first feature that comes to mind that I would want to have in this kind of helper function would be an option that I can use to define the logic that is used to create the texture. In other words a kind of for pixel function that would have some kind of hard coded value.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
//scene.add(new THREE.GridHelper(8,8))
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL THAT I AM USING
//-------- ----------
const light = new THREE.PointLight( new THREE.Color(1, 1, 1), 1 );
light.position.set(4, 2, 10);
scene.add(light);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// create data 
const createData = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    // default for pix method
    opt.forPix = opt.forPix || function(color, x, y, i, opt){
        let v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        color.r = v;
        color.g = v;
        color.b = v;
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
    return data;
};
// create data texture
const createDataTexture = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    const data = createData(opt);
    let texture = new THREE.DataTexture( data, opt.width, opt.height );
    texture.needsUpdate = true;
    return texture;

};
// update a texture
const updateTexture = (texture, opt) => {
    // just updating data array only
    const data = createData(opt);
    texture.image.data = data;
    //!!! old way of doing this where I create a whole new texture object each time
    //const texture_new = createDataTexture(opt);
    //texture.image = texture_new.image;
    texture.needsUpdate = true;
};
// get random from range
const getRndFromRange = (range) => {
    return range[0] + THREE.MathUtils.seededRandom() * ( range[1] - range[0] );
};
// get bias or ping pong method
const getBias = (n, d, count) => {
    const a = n / d * count % 1;
    return 1 - Math.abs(0.5 - a) / 0.5;
};
// make cube
const makeCube = (x, y, z, opt) => {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            map : createDataTexture(opt)
        })
    );
    mesh.position.set(x, y, z);
    return mesh;
};
//-------- ----------
// CREATE FOR PIX FUNCTIONS
//-------- ----------
const forPix = {};
// better random function
forPix.rndChannel = (r, g, b) => {
   r = r || [0, 255];
   g = g || [0, 255];
   b = b || [0, 255];
   return function(color, x, y, i, opt){
        color.r = getRndFromRange(r);
        color.g = getRndFromRange(g);
        color.b = getRndFromRange(b);
        return color;
    };
};
// better random function
forPix.square = (size, fgColor, bgColor, v2_center) => {
   size = size === undefined ? 2 : size;
   fgColor = fgColor || new THREE.Color(255, 255, 255);
   bgColor = bgColor || new THREE.Color(0, 0, 0);
   v2_center = v2_center || new THREE.Vector2(0, 0);
   // create box2
   const b2 = new THREE.Box2(
       v2_center.clone().add( new THREE.Vector2(size * -1, size * -1) ),
       v2_center.clone().add( new THREE.Vector2(size, size) )
   );
   return function(color, x, y, i, opt){
        color.copy(bgColor);
        // vector2 for current px
        const v2_px = new THREE.Vector2(x, y);
        // is current px inside box2
        if(b2.containsPoint(v2_px)){
            color.r = fgColor.r;
            color.g = fgColor.g;
            color.b = fgColor.b;
        }
        return color;
    };
};
//-------- ----------
// MESH OBJECTS 
//-------- ----------
//let m = makeCube(0, 0, 0, { forPix: forPix.square(), width: 4, height: 4 });
const group = new THREE.Group();
let i = 0;
let w = 5;
let len = w * w;
while(i < len){
    const x = i % w;
    const z = Math.floor(i / w);
    const mesh = makeCube(-3 + x * 1.5, 0, -3 + z * 1.5);
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const fg = new THREE.Color(255, 255, 255),
bg = new THREE.Color(0, 0, 0),
v2_center = new THREE.Vector2(8, 8);
const update = function(frame, frameMax){
    // update group 
    group.children.forEach( (mesh, i) => {
        // using the update texture method
        updateTexture(mesh.material.map, { forPix: forPix.rndChannel() });
        // square update - size up and down
        if( i % 4 === 0){
            const size = 9 * getBias(frame, frameMax, 2)
            updateTexture(mesh.material.map, { forPix: forPix.square(size, fg, bg, v2_center) });
        }
        // square update - random pos
        if( i % 3 === 0){
            const size = 4;
            const v2_rnd = new THREE.Vector2(16 * Math.random(), 16 * Math.random())
            updateTexture(mesh.material.map, { forPix: forPix.square(size, fg, bg, v2_rnd) });
        }
        // !!! this old way of doing it would result in a loss of context
        //mesh.material.map = createDataTexture({ forPix: forPix.rndChannel() });
    });
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

The use of data textures to create textures for threejs geometries can then prove to be a little useful here and there then. However I am not sure if this is what I will want to always use, even when it comes to this sort of thing. For the most part I do still like to use canvas elements to create textures as there are a lot of useful methods to work with in the 2d drawing context. 

When it comes to really working out modules I, and also uv wrapping while doing so I sometimes think the best way to go would be external image files when it comes to working with dae files for a project.

Thus far I have found that I do some times like to use data textures over that of canvas elements when it comes to just quickly creating texture with raw data created with javaScript code and some quick expressions. One example that I have made thus far as of late was for my [post on the depth material where I made a kind of custom depth material](/2021/05/04/threejs-depth-material/) that is create just using the basic material with a texture created with, you guessed it, a data texture.
