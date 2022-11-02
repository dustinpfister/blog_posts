---
title: The texture loader in threejs
date: 2021-06-21 15:51:00
tags: [three.js]
layout: post
categories: three.js
id: 893
updated: 2022-11-02 07:43:46
version: 1.36
---

When it comes to using [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) the [texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) can be used load external image assets in the form of image files such as PNG files. Once the images are loaded they can then bee used a as textures for the various maps of a material such as a color map, or emissive map just to name a few as the final object that is furnished is an instance of the [Texture class](https://threejs.org/docs/#api/en/textures/Texture).

If what I want is the raw Image object to use in some other situation that does not call for Texture objects I could use [the Image loader](https://threejs.org/docs/#api/en/loaders/ImageLoader), but I have found that it might be better to just use the image property of a Texture object. Speaking of the Image loader there are a number of loaders built into threejs itself and the texture loader is just one of them. There are also a number of official loaders in the examples folder that have to do with loading all kinds of external file formats used by various 3d model editing programs such as blender such as the [DAE file loader](/2021/04/30/threejs-dae-collada-loader/) as well. All of these work off of the base loader class of threejs that one will want to learn a thing or two about as there are certain things that will apply to all loaders based off of this class.

When it comes to my various threejs examples that I make for these posts I often like to use [canvas elements](https://threejs.org/docs/#api/en/textures/CanvasTexture), or [data textures](https://threejs.org/docs/#api/en/textures/DataTexture) which are ways to create quick simple textures with javaScript code. However I am sure there will be times when it comes to starting to work on an actually project with threejs that I will want to use external image files rather than some kind of solution that involves a little javaScript code.

<!-- more -->

## The texture loader in threejs and what to know first

This is a post on the texture loader in threejs and as such I assume that you have at least a little background when it comes to the [basics of threejs](/2018/04/04/threejs-getting-started/), and [client side javaScript in general](/2018/11/27/js-getting-started/). Although there is no way that I will be covering every little detail with these subjects here, in this section I will be going over a few things you should know about before continuing to read the rest of this post.

### There are many other ways to load files, and the THREE.Texture constructor can be used directly.

If you prefer to use some other javaScript library for scripting http requests, or you want to use some browser built in feature such as the [fetch api](/2018/03/27/js-fetch/), or the tired yet true [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/) then that can be done as an alternative to the texture loader. The only thing that I would have to do is just pass a reference to the image file to the THREE.texture constructor and that will create an instance of the Texture class. That kind of object can then be used with the map option of a material such as the basic material, or with any other function or property that calls for a texture object.

### Know the differences between absolute and relative paths

In these examples I am using an absolute path to a file that I am hosting locally with the system that I am using. I will not be getting into the specifics about the differences between absolute and relative paths here as that is a bit off topic. However if you do not know what I am taking about then you should [read up more on the topic of absolute and relative paths](http://www.differencebetween.net/technology/difference-between-absolute-and-relative-path/) as it is something that you should get solid sooner or later.

### Canvas elements, and data textures can also be used to create textures

I think I should also mention here that it is possible to use [canvas elements as a way to create textures](/2018/04/17/threejs-canvas-texture) that can then be used for the maps of materials. That is creating an image with the 2d drawing context of a canvas element, and then create a texture with the THREE.CanvasTexture constructor or even just the THREE.Texture constructor actually. This is the main way that I like to make textures with javaScript code rather than an external image file.

On top of being able to use canvas elements and everything there is to work with in the 2d drawing context of canvas elements, another javaScript code powered option with textures would be [data textures](/2022/04/15/threejs-data-texture/). There are also ways of switching between the two as needed, but that will be enough about them for now.

### Version Numbers matter

When I wrote this post and the examples for this post I was using r127 of threejs, and the last time I came around to doing some editing I was using r140 of the library. I have got into the habit of making sure I always make note of the version of threejs that I am using since there are always code breaking changes being made to the library.

### The source code examples in this post are on Github

In my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-texture-loader) on Github the source code examples that I am writing about here can be found. I am also parking the source code examples for my [many other posts on threejs](/categories/three-js/) there as well.

## 1 - Basic threejs texture loader examples

I often like to start out my posts with a basic, simple, hello world type example of a threejs feature. So then for this section I will be starting out with just a few basic examples of the texture loader that mainly just involve loading a single image file, to create a single texture object. Nothing fancy involving loading many files, or getting to deep into a closely related topic of some kind here. 

### 1.1 - Basic Single file hello world threejs texture loader example

In the example I will be loading just a single image that will result in a single texture object. This single texture will then be used to create just a basic color map for an instance of the [THREE.BasicMatreial](/2018/05/05/threejs-basic-material/). I will then be just creating and adding a cube to a scene object that will use this material, and not do anything fancy with the uv attribute of the geometry, or more than one material at this time. As such the end result will the whole of the texture being displayed on each of the faces of the cube.

```js
// creating a scene
var scene = new THREE.Scene();
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var loader = new THREE.TextureLoader();
 
loader.load(
    // the first argument is the relative or absolute path of the file
    '/img/smile-face/smile_face.png',
    // the second argument is an on done call back
    function (texture) {
        // using the texture for a material and a Mesh
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: texture
            }));
        // add the box mesh to the scene
        scene.add(box);
        renderer.render(scene, camera);
    }
);
```

In this example I just passed a string to a single image as the first argument, and I also passed just a single [call back function](/2019/03/25/js-javascript-callback/) that will fire when the loading of the file is done. So then there is the question of what to do when it comes to loading not just one file, but a few files. Also what if there is a problem loading one or more files? With that said there should be a way to set a callback that will fire when something goes wrong. So with that said I think I should get around to making at least a few more examples of this texture loader.

### 1.2 - Drawing to a canvas with an image loaded with the threejs texture loader

If I do just want to load an image and then use that to say draw to a canvas element that I will then use to create a texture that will be used with a material option I could use the Image loader. However it would seem there is a draw back to doing so when it comes to the progress event with the image. As such I might still want to just stick with the texture loader, and when doing so I can always just use the image property of the texture object. Sense the source of the texture is an external image then the image property will be an instance of the Image class in client side javaScript, as such I can use it with something like the draw image method of the 2d canvas drawing context.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
const texture_canvas = new THREE.CanvasTexture(canvas);
//-------- ----------
// MESH THAT IS USING A CANVAS TEXTURE
//-------- ----------
// using the texture for a material and a Mesh
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_canvas
    }));
// add the box mesh to the scene
scene.add(box);
//-------- ----------
// LOAD TEXTURE, DRAW TO CANVAS TEXTURE WITH IMAGE SOURCE
//-------- ----------
const loader = new THREE.TextureLoader();
loader.load(
    // the first argument is the relative or absolute path of the file
    '/img/smile-face/smile_face_256.png',
    // the second argument is an on done call back
    function (texture) {
        // ref to canvas and image of texture
        const canvas = texture_canvas.image;
        const ctx = canvas.getContext('2d');
        const img = texture.image;
        // I can now draw to the canvas with the static image asset
        ctx.drawImage(img, 128, 0, 128, 128, 0, 0, 32, 32);
        ctx.drawImage(img, 0, 0, 128, 128, 32, 0, 32, 32);
        ctx.drawImage(img, 128, 128, 128, 128, 32, 32, 32, 32);
        ctx.drawImage(img, 0, 128, 128, 128, 0, 32, 32, 32);
        // render
        texture_canvas.needsUpdate = true;
        renderer.render(scene, camera);
    }
);
```

## 2 - Load more than one image to use as a texture

So then there is the topic of how to go about [loading more that one texture in threejs](https://stackoverflow.com/questions/35015251/how-do-i-load-multiple-textures-with-the-new-three-textureloader) as the texture loader by itself will just load one image at a time. There are a number of ways of doing this sort of thing, so I will want to have more than one example here.

### 2.1 - An array of Promise objects

Here I have an example that I worked out that makes use of the [Promise all method](/2019/06/24/js-promise-all/), along with the [array map prototype method](/2020/06/16/js-array-map/) to do so. The promise all method is a prototype method of the native Promise object that should be there in late javaScript specs to work with in all modern browsers. The array that is passed to the promise all method can be a collection of promise objects, and the returned promise object of the Promise all method will only resolve when all the promise objects in the array resolve. So when it comes to using this promise all method I often like to have a method that will return a promise object, and then just call that method in another function that will call it for each item in an array. 

For this example I pass an array of urls to my load texture collection helper, inside the body of this helper that is given the array of urls I call the promise all method and pass the array of urls as the first argument, but I call the map method off of the array of urls, and call by load texture helper for each url. I then pass each url to the load texture method which will return a promise object for each url using the texture loader for each image.

```js
var loadTexture = function (url) {
    var loader = new THREE.TextureLoader();
    return new Promise(function (resolve, reject) {
        var onDone = function (texture) {
            resolve(texture);
        };
        var onError = function (err) {
            reject(err)
        };
        loader.load(url, onDone, function () {}, onError);
    });
};
 
var loadTextureCollection = function (urlArray) {
    return Promise.all(urlArray.map(function (url) {
            return loadTexture(url);
        }));
};
 
var createTextureCube = function (texture) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture
        }));
};
 
// creating a scene
var scene = new THREE.Scene();
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var urlArray = [
    '/img/smile-face/smile_face_128_128.png',
    '/img/smile-face/smile_face_32_32.png'
];
 
loadTextureCollection(urlArray)
// then if all images load
.then(function (textures) {
    var box = createTextureCube(textures[1]);
    box.position.set(1, 0, 0);
    scene.add(box);
    var box = createTextureCube(textures[0]);
    box.position.set(-1, 0, 0);
    scene.add(box);
    renderer.render(scene, camera);
 
})
// if there is a problem
.catch(function () {
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);
    renderer.render(scene, camera);
});
```

If all goes well the end result will be an array of textures that will be available in the next then function call of the promise returned by the load texture collection helper. However I think it is always a good idea to have something in place that will fire in the event that sometime goes wrong loading the files. For this example when there is a problem I just create a single cube that makes use of the normal material, rater than two cubes that use each of the textures with the basic material.

This is something that I put together pretty fast, and there are a lot of other features I might want to add when it comes to turning this into some kind of actual support library or something to that effect. However say you all ready have a great way to go about loading a whole bunch of image files just the way you like to, and you just want to create textures with those images that are loaded all ready. Well you do not have to use the texture loader, in that case the THREE.Texture constrictor can just be called and a reference to each image can be passed as the first argument for the texture constrictor.

### 2.2 - Using the loading manager

Although the Promise all solution that I made a while back seems to work okay, these days I am more of the minbdset of using the [THREE.Loading manager](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager) for this sort of thing.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2.5, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);
//-------- ----------
// URLS TEXTURE OBJECT
//-------- ----------
const URLS = [
    '/img/smile-face/smile_face_256.png',
    '/img/smile-face/smile_face_128.png',
    '/img/smile-face/smile_face_32.png'
];
const textureObj = {};
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({
            color: new THREE.Color(1,1,1),
            emissive: new THREE.Color(0.05,0.05,0.05)
        })
    );
};
//-------- ----------
// MESH
//-------- ----------
const box1 = createCube();
box1.position.set(1, 0, 0);
scene.add(box1);
const box2 = createCube();
box2.position.set(-1, 0, 0);
scene.add(box2);
//-------- ----------
// MANAGER
//-------- ----------
const manager = new THREE.LoadingManager();
// starting
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
// done
manager.onLoad = function ( ) {
    console.log( 'Loading complete!');
 
    box1.material.map = textureObj['smile_face_256'];
    box2.material.map = textureObj['smile_face_32'];
    box2.material.emissiveMap = textureObj['smile_face_128'];
 
    renderer.render(scene, camera);
};
// progress
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
// ERROR
manager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
};
//-------- ----------
// TEXTURE LOADER
//-------- ----------
const loader = new THREE.TextureLoader(manager);
URLS.forEach((url) => {
    loader.load(url, (texture) => {
        const file_name = url.split('/').pop().split('.')[0];
        // keying the textureObj by using file name as the key
        textureObj[file_name] = texture;
    });
});
```

## 3 - Module example of the texture loader

When it comes to making use of the texture loader often I will want to abstract away code that I find myself using over and over again into a module form that I can then just like to and use for every new project in which I will want to load a few textures. The most primitive form of this kind of module would be something that I just call a load method and then give a base url and a list of files that I will like to load at that base url. This load method will then return a promise and the resolved object will be an object where every key is a file name, and every value is a texture made from that file.

### 3.0 - The current state of the module

So I made an r0 of a texture.js javaScript module that will abstract away some code that allows for me to load more than one texture.

```js
// texture.js - r0 - from threejs-texture-loader
(function (api) {
    //-------- ----------
    // MANAGER
    //-------- ----------
    const createLoadingManager = (onDone, onError) => {
        const manager = new THREE.LoadingManager();
        // done
        manager.onLoad = function ( ) { onDone(); };
        // ERROR
        manager.onError = function ( url ) { onError(url); };
        return manager;
    };
    //-------- ----------
    // TEXTURE LOADER
    //-------- ----------
    api.load = (opt) => {
        opt = opt || {};
        opt.URLS_BASE = opt.URLS_BASE || '';
        opt.URLS = opt.URLS || [];
        opt.onDone = opt;
        const textureObj = {};
        return new Promise(function(resolve, reject){
            const manager = createLoadingManager(
                () => {
                    resolve(textureObj);
                },
                (url) => {
                    reject(url);
                }
            );
            const loader = new THREE.TextureLoader(manager);
            opt.URLS.forEach((url) => {
                // set base url path
                loader.setPath(opt.URLS_BASE);
                // load files from base
                loader.load(url, (texture) => {
                    // get file name from url
                    const file_name = url.split('/').pop().split('.')[0];
                    // keying the textureObj by using file name as the key
                    textureObj[file_name] = texture;
                });
            });
        });
    };
}( this['textureMod'] = {} ));
```

### 3.1 - load method example

Here I have a basic example of the load method of this module that is based off of the load many manager example above. Now that I abstracted away much of what was in that example, the code is now a lot cleaner.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2.5, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({
            color: new THREE.Color(1,1,1),
            emissive: new THREE.Color(0.05,0.05,0.05)
        })
    );
};
//-------- ----------
// MESH
//-------- ----------
const box1 = createCube();
box1.position.set(1, 0, 0);
scene.add(box1);
const box2 = createCube();
box2.position.set(-1, 0, 0);
scene.add(box2);
//-------- ----------
// TEXTURE.js load
//-------- ----------
textureMod.load({
    URLS_BASE: '/img/smile-face/',
    URLS : [
        'smile_face_256.png',
        'smile_face_128.png',
        'smile_face_32.png'
    ]
}).then( (textureObj) => {
    box1.material.map = textureObj['smile_face_256'];
    box2.material.map = textureObj['smile_face_32'];
    box2.material.emissiveMap = textureObj['smile_face_128'];
    renderer.render(scene, camera);
});
```

## Conclusion

That will be it for now on the texture loader at least for today, there is a lot more to write about when it comes to what to do with a texture after it is loader rather than just how to go about loading a texture. In this post I wanted to just stick to using an external image for a color map of a cube, but I did not get into the various other kinds of maps there are to work with in the basic material, as well as the many other materials that will work with light sources. However I guess getting into all of that would be a matter for another post.

