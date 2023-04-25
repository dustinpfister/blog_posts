---
title: Three js and webGL support
date: 2019-06-11 12:12:00
tags: [three.js]
layout: post
categories: three.js
id: 476
updated: 2023-04-25 16:27:52
version: 1.32
---

As of [version r69](https://github.com/mrdoob/three.js/releases/tag/r69) of [Threejs](https://threejs.org/) the 2d canvas software renderer has been removed from the core of threejs itself, and moved to the examples folder. It was still possible to use it as an add on file but as of late versions of threejs it would seem that is no longer the case. There once was a time where webGL support was not so great, however that was then, and now when comes to modern web browsers webgl support is pretty good.

For the most part these days there is no need to bother with the 2d canvas powered software renderer as the built in [webgl renderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer) will work just fine on most clients, but if for some reason you do want to add more robust support for older clients that do not have great web gl support than the some other renderer option will need to be used in the event that it will not work.

I can not say that I bother with this myself, but never the less there is the question of that small minority of people using outdated browsers and having code not break. Also there is not just concerns over using older browsers but using a client where certain webgl features will just not work. For example webGl2 features will not work on my raspberry pi 4 because of limitations with the video adapter that is used on it even if I am using a modern browser. So then in this post I thought I would touch base on this sort of topic for those that might be interested.

<!-- more -->

## WebGL in three.js and what to know before hand

This is a post on feature testing for web gl, and using the software renderer in three js in the event that there is no webGL support at all. I am also slowly turning this post into a general overview of webgl in general rather than the webgl renderer alone. In any case this is a not a [getting started post with three.js](/2018/04/04/threejs-getting-started/), or javaScript in general. So I assume that you have at least some background with skills that are needed to begin with in order to get something of value from reading this.

### More on the webGL renderer

In this post I am mostly writing about feature testing for webGL and then doing something different in the event that webGL is not supported. However I am not really getting into the webGL renderer in detail as I have wrote a [post on the webGL renderer](/2018/11/24/threejs-webglrenderer/) in detail a while back and there is therefore no need to do so here.

### Also check out the shader material

Sense I first wrote this blog post I got around to writing at least one post on the [shader material](/2023/01/13/threejs-shader-material/) in threejs. The shader material is a great way to get started with GLSL code that is a lot easier compared to starting from the ground up as I have access to the shader library of threejs.

### Source Code is also up on Github

The source code examples that I am writing about here can also be [found up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-webgl). This is also the repo where I store the source code examples for my [many other blog posts on threejs as well](/categories/three-js/).

### Version numbers matter

When writing this post for the first time I was using [revision 104 of three.js](https://github.com/mrdoob/three.js/tree/r104), and the last time I cam around to do some editing I was using r146 of threejs. So a lot has changed between those two revision numbers, far more that I can write about when it comes to this single little blog post on the subject. However I will say that as of revision r141+ it is now assumed that a client has webgl2 support, which will case erros when working on a project on a client system that does not. So I find myself using the WebGl1Renderer now as my default go to renderer that is built into the threejs core.

On top of all of this I am also using some additional assets in the renderer's folder of the js folder in the examples folder of the three.js repo. When it comes to rendering a three js scene with a renderer other than the built in webGL renderer additional assets must be used to provide that additional way of rendering. To further complicate matters there the options of what there are to work with in terms of software rendering will differ from one revision to the next. When it came to r104 the 2d canvas renderer was still an option when added as an additional external file which was called the software-renderer.js file. However in later revisions of threejs it would seem the best option would be to use the SVGRenderer as of r146+.

## 1 - Testing if webgl is there to work with

It is becoming less of a problem every day, but there is still a concern if webGl is even there to work with to begin with. Even if I stop caring about old browsers all together there is still a possibility that a lot of people might be using not so great graphics adapters that do not support all webgl features. So there is still testing if webgl is there to work with, and if so what version. There is also going into depth as to what features are working and what are not but that might prove to be a bit to advanced for now.

### 1.a - The webgl-r0.js file

Here is my webgl.js file that just contains one method that is just a slightly modified version of what is also in the three.js repo. This method just simply returns true of the client supports webGL 1, and false if that is not the case with the main is web gl method. In addition to this I also have a method that will just return true or false in the event that a client supports webgl2 or not.

```js
// webgl.js - r0 - plain javaScript webgl test tools based on the threejs JSM module found
// at : https://github.com/mrdoob/three.js/blob/r146/examples/jsm/capabilities/WebGL.js
const WebGL = {};
// can the client use WEBGL1
WebGL.isWebGL = function () {
    try {
        var canvas = document.createElement('canvas');
        return !!(window['WebGLRenderingContext'] &&
        (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
};
// can the client use WEBGL2
WebGL.isWebGL2 = function () {
    try {
        const canvas = document.createElement( 'canvas' );
        return !! ( window.WebGL2RenderingContext && canvas.getContext( 'webgl2' ) );
    } catch ( e ) {
        return false;
    }
};
```

If you want to use the official webgl.js file here is a link to that in the repo. The file adds some additional functionality but for the most part it is just to feature test for webGL. Feature testing for just webGL by itself is not always enough also, for example a client count support webGL by itself, but that does not mean that all the features of the three js webGL renderer will work as expected. I can confirm that this is sometimes that case with some clients.


### 1.1 - Using the SVGRenderer \(threejs r146\) demo

As of revision r146 of threejs it would seem that the best alternative option to that of the web gl renderer would be the SVG Renderer. It would seem that the 2d canvas renderer is not longer being supported at all, so that might only be an option when using older revisions of threejs, or if for some reason one can get that working on later revisions.

```js
//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0,0,0);
const container = (document.getElementById('demo') || document.body);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// IS WEBGL TEST
//-------- ----------
console.log('using threejs r' + THREE.REVISION);
if (WebGL.isWebGL()) {
    // if we have webGl so I will default to using webgl1, but might replace
    // with the webgl 2 renderer if there
    console.log('We have webgl.');
    let renderer = new THREE.WebGL1Renderer();
    if(WebGL.isWebGL2()){
        console.log('We have webgl 2');
        renderer = new THREE.WebGLRenderer();
    }
    renderer.setSize(640, 480, false);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
} else {
    console.log('We do not have webgl, so I am using THREE.SVGRenderer');
    const renderer = new THREE.SVGRenderer();
    renderer.setSize(640, 480);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
```

### 1.2 - Software renderer \(threejs r104\) demo

Here I have the setup.js file that makes use of the webGL method in webgl.js, as well as the additional assets depending if webGl is supported or not.

In order to get this demo to work on top of using r104 of three.js the [projector.js](https://github.com/mrdoob/three.js/blob/r104/examples/js/renderers/Projector.js) and [softwareRenderer.js](https://github.com/mrdoob/three.js/blob/r104/examples/js/renderers/SoftwareRenderer.js) files will also need to be loaded in as well. Projector.js will need to be loaded after three.js and before softwareRenderer.js as that file depends on projector.js and projector.js depends on three.js

So in the html of this example I am linking to three.js like normal, but I am also linking to the additional assets in the github repo as well. I am also linking to some additional assets that feature test for webGL and render a scene differently depending on the state of webGL support in the client which are as follows.

```html
<html>
  <head>
  <title>test_threejs demos</title>
</head>
<body>
  <script src="/js/threejs/0.104.0/three.min.js" ></script>
  <h1>Three.js webGL test</h1>
  <div id="demo"></div>
  <script src="/js/threejs/0.104.0/three.min.js"></script>
  <script src="/js/threejs/0.104.0/projector.js"></script>
  <script src="/js/threejs/0.104.0/software-renderer.js"></script>
  <script src="/forpost/threejs-webgl/js/webgl-r0.js"></script>
  <script src="/forpost/threejs-webgl/r0-2-software/setup.js"></script>
</body>
</html>
```

The demo involves creating a mesh with an array of [materials](/2018/04/30/threejs-materials/) the first of which is the Depth Material that works great in the Software Renderer and the second material is the standard material that is one of the several materials that will respond to a light source in three js.

The [Material index](/2018/05/14/threejs-mesh-material-index/) property of a [Face3](/2018/05/11/threejs-face3/) instance in three js is what can be used to set the material in this array of materials to use when skinning A Face3 instance in a geometry. So in the event that webGL is supported then the Standard Material will be used else the Depth material will be used as a fall back or sorts that will work okay with the Software Renderer.

```js
//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0,0,0);
const container = (document.getElementById('demo') || document.body);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// IS WEBGL TEST
//-------- ----------
console.log('using threejs r' + THREE.REVISION);
if (WebGL.isWebGL()) {
    // if we have webGl so I will default to using webgl1, but might replace
    // with the webgl 2 renderer if there
    console.log('We have webgl.');
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
} else {
    // in the event that webgl is not supported I can give an error message to the
    // use, or in this case use some other option for rendering
    console.log('We do not have webgl, so I am using THREE.SoftwareRenderer');
    const renderer = new THREE.SoftwareRenderer();
    renderer.setSize(640, 480);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
```

## 2 - Starting out with WebGl From the ground up

In this section I will be going over a few examples that have to do with starting to work with WebGl alone from the ground up. At the time of this writing I have to say that I do not think that this is a good idea, unless of course you want to get into writing custom shaders, or not use threejs but work directly with webGL. There is all kinds of ways of getting started with webgl alone which is something that I am going to touch base on at least here. However there is also making use of the shader library of threejs as well which is great for quickly adding certain common features.

### 2.1 - Raw WebGl Hello world program with a script tag

There are a whole lot of ways to go about getting started with a WebGl hello world type program. There is making use of script tags that are used to define shaders, there is using the shader librray of threejs, and then there is [starting from the ground up with some vanilla html and javaScript](https://jameshfisher.com/2017/09/27/webgl-hello-world/). To start with a vanilla style example I would want to start out by creating a canvas element by one way or another, get a reference to a [webgl context](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) rather than the 2d one, and then use some methods to draw to it.

```html
<div id="demo"></div>
<script src="/forpost/threejs-webgl/s2-1-helloworld-scripttag/main.js"></script>
```

```js
const container = ( document.getElementById('demo') || document.body );
const canvas = document.createElement('canvas');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);
const ctx = canvas.getContext('webgl');
const r = 1, g = 0, b = 0, alpha = 0.5;
ctx.clearColor( r, g, b, alpha );
ctx.clear( ctx.COLOR_BUFFER_BIT );
```

### 2.2 - Raw Webgl demo with shader tags

Although the first example in this section is a great supper simple getting started type example in order to create a hello world that is a little more interesting than just a solid color background I am going to need some shdaers. There are a number of ways to go about adding some shaders and starting to write custom shaders. One way of doing this is to create some script tag elements that are of the type 'shader' rather than module or the regular plain old javaScript type. There are two kinds of shaders that I am going to need one of which is the vertex shader that is used to define position data, and the other is a fragment shader that is used to define what the color is going to be.

```html
<script id="vertex-shader" type="shader">
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 40.0;
    }
</script>
<script id="fragment-shader" type="shader">
    void main(void) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1);
    }
</script>
<div id="demo"></div>
```

```js
// started with this codepen https://codepen.io/urishaked/pen/PEpoYo
// fixed a few problems with it
const container = ( document.getElementById('demo') || document.body );
const canvas = document.createElement('canvas');
canvas.width = 160;
canvas.height = 120;
container.appendChild(canvas);
const gl = canvas.getContext('webgl');
// use the vertex shader
const vertShader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource(vertShader, document.querySelector('#vertex-shader').textContent);
gl.compileShader(vertShader);
// use the fragment shader
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, document.querySelector('#fragment-shader').textContent);
gl.compileShader(fragShader);
// the shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader); 
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);
gl.viewport(0, 0, 160, 120);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
// https://stackoverflow.com/a/20315187
const vertices = new Float32Array([0.0, 0.0, 0.0]), vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.bindAttribLocation(shaderProgram, 0, 'a_Position');
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);
// the draw arrays method can be used to draw a single point
gl.drawArrays(gl.POINTS, 0, 1);
```

## Conclusion

Even if a client does support webgl that does not mean that all the webgl features will work as expected. A simple check if webgl is there or not will result in a true response with a simple feature test for webgl alone, but things will still not render as expected.

Also when it comes to trying to get things work on both new and old platforms it is not always a question of using this late version of three.js, and then using the 2d canvas renderer with a later version of three.js as a later version of three.js might very well break on older platforms. Doing this sort of thing can prove to be very time consuming, and often it is just not worth the hassle.
