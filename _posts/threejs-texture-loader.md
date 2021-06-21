---
title: The texture loader in threejs
date: 2021-06-21 15:51:00
tags: [three.js]
layout: post
categories: three.js
id: 893
updated: 2021-06-21 17:26:57
version: 1.23
---

There are still a great number of features that I have not got around to writing a post about when it comes to using [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), many of them are basic things that I should have wrote about a long time ago. One of which is just using the [texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) to load external image assets to be used a as textures for the various maps of a material. There are a number of loaders built into threejs itself and the texture loader is one of them, there are also a number of official loaders in the examples folder that have to do with loading all kinds of external file formats used by various 3d model editing programs such as blender such as the dae file loader.

When it comes to my various threejs examples that I make for these posts I often like to use canvas elements are a way to create quick simple textures with javaScript code. However I am sure there will be times when it comes to starting to work on an actually project with threejs that I will want to use external image files rather than some kind of solution that involves a little javaScript code.

<!-- more -->

## 1 - The texture loader in threejs and what to know first

This is a post on the texture loader in threejs which is one of several built in loaders in the library. In addition to the texture loader there is an image loader that will just load an image, but not create an instance of THREE.texture for you, and also a generic file loader. However for this post I will be mainly write about a few quick, simple examples using just the Texture loader alone. In this section I will be going over a few things you should know about before continuing to read this beyond the fact that you should know at least a little when it comes to the [basics of using threejs](/2018/04/04/threejs-getting-started/), and know at least a little about javaScript in general.

### 1.1 - There are many other ways to load files, and the THREE.Texture constructor can be used directly.

If you prefer to use some other javaScript library for scripting http requests such as axios, or you want to use some browser built in feature such as the [fetch api](/2018/03/27/js-fetch/), or the tired yet true [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/) then that can be done as an alternative to the texture loader. The only thing that I would have to do is just pass a reference to the image file to the THREE.texture constructor.

### 1.2 - Know the differences between absolute and relative paths

In these examples I am using an absolute path to a file that I am hosting locally with the system that I am using. I will not be getting into the specifics about the differences between absolute and relative paths here as that is a bit off topic. However if you do not know what I am taking about then you should [read up more on the topic of absolute and relative paths](http://www.differencebetween.net/technology/difference-between-absolute-and-relative-path/) as it is something that you should get solid sooner or later.

### 1.3 - Version Numbers matter

When I wrote this post and the examples for this post I was using r127 of threejs.

## 2 - Basic texture loader example

I often like to start out my post with a basic, simple hello world type example of a threejs feature. So in the example I will be loading just a single image that will be used to create a single texture. This single texture will then be used to create just a basic color map for an instance of the THREE.BasicMatreial. I will then be just creating and adding a cube to a scene object that will use this material.

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

In this example I just passed a string to a single image as the first argument, and I also passed just a single call back that will fire when the loading of the file is done. So then there is the question of what to do when it comes to loading not just one file, but a few files. Also what if there is a problem loading one or more files? With that said there should be a way to set a callback that will fire when something goes wrong. So with that said I think I should get around to making at least a few more examples of this texture loader, and many get around to even writing about some alternatives to using the texture loader.

## 3 - Load more than one image to use as a texture

So then there is the topic of how to go about [loading more that one texture in threejs](https://stackoverflow.com/questions/35015251/how-do-i-load-multiple-textures-with-the-new-three-textureloader) as the texture loader by itself will just load one image at a time. Well I am sure that there are all kinds of ways to go about doing this, here I have an example that I worked out real fat that makes use of the [Promise all method](/2019/06/24/js-promise-all/), along with the [array map prototype method](/2020/06/16/js-array-map/) to all the texture loader more than one time for an array of urls.

The promise all is a prototype method of the native Promise object that should be there ti work with in all modern browsers, the array that is passed can be a collection of promise objects, and the returned promise object of the Promise all method will only resolve when all the promise objects in the array resolve. So when it comes to using this promise all method I often like to have a method that will return a promise object, and then just call that method in another function that will call it for each item in an array. 

For this example I pass an array of urls to my load texture collection helper, inside the body of this helper that is given the array of urls I call the promise all method and pass the array of urls as the first argument, but I call the map method off of the array of urls, and call by load texture helper for each url. I then pass each url to the load texture method which wil return a promise object for each url using the texture loader for each image.

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

If all goes well the end result will be an array of textures that will be available in the next then function call of the promise returned by the load texture collection helper. However I think it is always a good idea to have something in place that will fire in the event that sometime goes wrong loading the files. For this example I just create a single cube that makes use of the normal material, rater than two cubes that use each of the textures with the basic material.

This is something that I put together pretty fast, and there are a lot of other features I might want to add when it comes to turning this into some kind of actual support library or something to that effect. However say you all ready have a great way to go about loading a whole bunch of image files just the way you like to, and you jusy want to create textures with those images that are loaded all ready. Well you do not have to use the texture loader, in that case the THREE.Texture constrictor can just be called and a reference to each image can be passed as the first argument for the texture constrictor.

## 4 - Conclusion

That will be it for now on the texture loader at least for today, there is a lot more to write about when it comes to what to do with a texture after it is loader rather than just how to go about loading a texture. In this post I wanted to just stick to using an external image for a color map of a cube, but I did not get into the various other kinds of maps there are to work with in the basic material, as well as the many other materials that will work with light sources. However I guess getting into all of that would be a matter for another post.