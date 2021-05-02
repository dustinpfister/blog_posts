---
title: Exporting a three.js animation to webm using Whammy
date: 2018-11-01 20:24:00
tags: [js,three.js]
layout: post
categories: three.js
id: 318
updated: 2021-05-02 17:01:00
version: 1.23
---

When I am playing around with [three.js](https://threejs.org/) I often like to use it to make simple looping animations, and it would be nice to have at least one or two ways to export these projects to a reliable, well supported video file format like the [webm file format](https://en.wikipedia.org/wiki/WebM) making it easy to share as a stand alone video file. Now there may be a great number of ways to go about doing this sort of thing actually on [stack overflow I saw an example the makes use of some built in browser features](https://stackoverflow.com/questions/50681683/how-to-save-canvas-animation-as-gif-or-webm) as a way to go about capturing video from a canvas element on the fly. However what I have in mind is something where I can create a video on a frame by frame basis rather than recoding for an amount of time.

To help with this I have come across a project called [whammy](https://github.com/antimatter15/whammy) that seems to work okay for the sake of making a webm file on a frame by frame basis. In this post I will be outlining a simple example of doing just this using three.js, and whammy.

<!-- more -->

## 1 - What to know

This is a post on exporting a three.js animation to webm using an additional javaScript project called whammy. This is not a [getting started post with three.js](/2018/04/04/threejs-getting-started/) or javaScript in general, So i will not be getting into detail about each of the various details about making a three.js project in this post. However I will like to other relevant posts where appropriate.

### 1.1 - Version numbers matter

When I last edited this post I was using thee.js r127, and when I first wrote this post I was using three.js r91. Also it would seem that whammy is not being maintained, however I think that is not always such a bad thing with what it is that I intend to use if for, and as long as it still works I do not see any major problem. I am sure that there might be other options for this sort of thing, but I will always want to use something that works more or less the same way by passing frames one at a time, rather than recoding on the fly video.

## 2 - Exporting a simple rotating cube example

For the sake of keeping this post simple and to the point I will just be using a simple rotating cube example for this post. This will help to take the focus away from the animation and place it more so with the process of exporting an three.js animation to webm with whammy. Using whammy is fairly simple, but there are a few pitfalls that I have ran into. Nothing major, but I will be going over them here.

### 2.1 - Create Whammy instance, and setup some variables

Once I have both whammy, and three.js included in my html with script tags, I start off by setting some variables that I will be using to help with the movement of the animation. Using whammy starts off by just calling the Whammy.Video constructor passing the desired frame rate for the exported video. This will return an encoder that I can use to add frames one by one in a render loop, and then them I am done I just need to call a compile method from this encoder.

```js
// create encoder
var seconds = 20,
fps = 12,
frame = 0,
maxFrame = fps * seconds,
encoder = new Whammy.Video(fps);
```

### 2.2 - The animate method

Next I have an animation method. Here I am using the current values of my frame, and maxFrame variables to find a percentage value that I then use to set the status of the frame animation for the current frame. For this animation I am just moving the position of the camera, and having it look at a simple mesh of a cube with the camera.lookAt method.

In the body of this method I request another animation frame for the method over and over again as long as the current frame index is lower than the maxFrame value that I set. Each time after rendering I add the current state of the canvas to the encoder with the encoder.add method, by creating a dataUrl of the image/webp type. The whammy documentation says that I can just add the canvas, but I run into an error when doing that.

```js
// loop
var animate = function () {
 
    // find current percent
    // and set values based on that
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;
 
    // make changes to for new frame
    camera.position.set(Math.cos(r) * 200, Math.sin(r) * 200, 250);
    camera.lookAt(0, 0, 0);
 
    // render frame
    renderer.render(scene, camera);
 
    // add frame to encoder
    encoder.add(renderer.domElement.toDataURL('image/webp'));
 
    // if the animation is not over
    if (frame < maxFrame) {
 
        // request the next frame
        requestAnimationFrame(animate);
 
    } else {
 
        // else comple, and export
        encoder.compile(false, function (output) {
            exportVid(output);
        });
 
    }
 
    frame += 1;
 
};
```

Once the animation is over, and all the frames have been added using the encoder.add method, I then call the encoder.compile method that will output a blob than can then be used to create a data url which is what I do with the exportVid method.

### 2.3 - The export Video method

When the encoder is finished compiling, a callback will fire with a blob passed as the first argument for that callback. I Can then use the URL.createObjectURL method to convert the blob to a data url. This data url can then be used as the src attribute when making a video element.


```js
// export video helper
var exportVid = function (blob) {
    var vid = document.createElement('video');
    vid.src = URL.createObjectURL(blob);
    vid.loop = true;
    vid.controls = true;
    document.body.appendChild(vid);
};
```

I make sure to set the controls attribute to true, so that I can play the video element. In addition in chrome there is a download option for the video as well.

### 2.4 - The Three.js scene, camera, mesh, and renderer

So here I just set up the usual scene, camera, mesh, and renderer. Once I do that I call the animate method to get the ball running with this.

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
 
// MESH
var mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }));
scene.add(mesh);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
animate();
```

## 3 - Conclusion

So far this seems like one of the best options for converting a simple three.js looping animation to a stand alone webm file. I have look into other options, but some of them are more complected, or I could not find a way to build the file on a frame by frame basis. If you know of any other methods of getting this done, or have an questions or concerns please let me know in the comments, and thanks for reading.
