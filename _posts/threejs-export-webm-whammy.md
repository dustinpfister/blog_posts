---
title: Exporting a threejs animation to webm using Whammy
date: 2018-11-01 20:24:00
tags: [js,three.js]
layout: post
categories: three.js
id: 318
updated: 2023-08-04 09:38:52
version: 1.33
---

When I am playing around with [threejs](https://threejs.org/) I often like to use it to make simple looping animations, and it would be nice to have at least one or two ways to export these projects to a reliable, well supported video file format like the [webm file format](https://en.wikipedia.org/wiki/WebM) making it easy to share as a stand alone video file. 

Now there may be a great number of ways to go about doing this sort of thing actually on [stack overflow I saw an example the makes use of some built in browser features](https://stackoverflow.com/questions/50681683/how-to-save-canvas-animation-as-gif-or-webm) as a way to go about capturing video from a canvas element on the fly. However what I have in mind is something where I can create a video on a frame by frame basis rather than recording for an amount of time which is not what I am after here.

To help with this I have come across a project called [whammy](https://github.com/antimatter15/whammy) that seems to work okay for the sake of making a webm file on a frame by frame basis, or at least it did until code breaking changes where made in chrome. I am not sure what to do with this post when it comes to additional future edits at this point. However every now and then I do come around to this topic and will likely expand on this when I find other ways to export other than what I have worked out here that no longer works on late versions of chrome.

<!-- more -->

## Exporting as WebM from threejs and what to know first

This is a post on exporting a threejs animation to webm using an additional javaScript project called whammy. This is not a [getting started post with three.js](/2018/04/04/threejs-getting-started/) or [javaScript in general](/2018/11/27/js-getting-started/), so I will not be getting into detail about each of the various details about making a three.js project in this post. However I will like to other relevant posts where appropriate.

### USING WHAMMY NO LONGER WORKS FOR ME IN LATE VERSIONS OF CHROME

There is not just being mindful of the version of threejs that is being used, but also the version numbers of the web browsers that I am running code in, and also the version number of whammy. In late versions of chrome using whammy seems to no loner work, and it also looks like the whammy library is not being supported also to make matters worse. It would seem like the root cause of this has to do with code breaking changes that have been bade with respect to the [URL.createObjectURL method](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL). Thus far I have not found a way to fix what has happened using more modern means of doing so.

### I AM USING MY OWN ELECTRONJS APPLACTION I CALL VIDEOGROUND WITH FFMPEG

I have a lot of collections of content on other javaScript libraries and various tech related subjects including [electronjs](/2022/02/07/electronjs-hello-world/). One of the posts that I have wrote on electronjs thus far is on a [prototype for an application that I can use to create a collection of frames](/2022/03/10/electronjs-example-videoground/) in the form of png files in a folder. From there I can use a [Linux command like that of ffmpeg](/2022/03/04/linux-ffmpeg/) to convert this collection of png files to a final video file, on top of that ffmpeg is great for video ending from the command line in general as I also use to to add audio tracks to me videos as well.

Sense I started that prototype for my electronjs project example post I started a [stand alone repository for my video ground application](https://github.com/dustinpfister/videoground). As such this is a project that I continue to work on every so often for a little while. It is also a program that I use just about every day to create videos like this one from my [beta world collection](https://github.com/dustinpfister/videoground-beta-world).

<iframe class="youtube_video"  src="https://www.youtube.com/embed/GDXM1o9hMK4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Not much on Github for this one

As with all [my other posts on threejs](/categories/three-js/) I do have a [for post folder for this on my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-export-webm-whammy), but for now it is just a readme file where I keep some notes on possible future edits of this content.

### Version numbers matter

When I last edited this post I was using three.js r127, and when I first wrote this post I was using three.js r91. Also it would seem that whammy is not being maintained, however I think that is not always such a bad thing with what it is that I intend to use if for, and as long as it still works I do not see any major problem. However it would seem that with this that is the case sadly.

I am sure that there might be other options for this sort of thing, but I will always want to use something that works more or less the same way by passing frames one at a time, rather than recording on the fly video. Future edits of this post might just involve vanilla javaScript code examples on how to do that.

## 1 - Exporting a simple rotating cube example

For the sake of keeping this post simple and to the point I will just be using a simple rotating cube example for this post. This will help to take the focus away from the animation and place it more so with the process of exporting an threejs animation to webm with whammy. Using whammy is fairly simple, but there are a few pitfalls that I have ran into. Nothing major, but I will be going over them here.

### 1.1 - Create Whammy instance, and setup some variables

Once I have both whammy, and three.js included in my html with script tags, I start off by setting some variables that I will be using to help with the movement of the animation. Using whammy starts off by just calling the Whammy. Video constructor passing the desired frame rate for the exported video. This will return an encoder that I can use to add frames one by one in a render loop, and then them I am done I just need to call a compile method from this encoder.

```js
// create encoder
var seconds = 20,
fps = 12,
frame = 0,
maxFrame = fps * seconds,
encoder = new Whammy.Video(fps);
```

### 1.2 - The animate method

Next I have an animation method that will be used to update the scene, call the renderer, and use the whammy exporter. Here I am using the current values of my frame, and maxFrame variables to find a percentage value that I then use to set the status of the frame animation for the current frame. For this animation I am just moving the position of the camera, and having it look at a simple mesh of a cube with the [lookAt method](/2021/05/13/threejs-object3d-lookat/) that is called off of the camera.

In the body of this method I [request another animation frame](/2018/03/13/js-request-animation-frame/) for the method over and over again as long as the current frame index is lower than the maxFrame value that I set. Each time after rendering I add the current state of the canvas to the encoder with the encoder.add method, by creating a dataUrl of the image/webp type. The whammy documentation says that I can just add the canvas, but I run into an error when doing that.

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

### 1.3 - The export Video method

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

### 1.4 - The Three.js scene, camera, mesh, and renderer

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

## 2 - Conclusion

I will still want to look into other options for this sort of thing sense sadly it is no longer working for me. Some of the solutions for exporting video seem to be more complex then they need to be for this, including the current solution that I am using for that matter. One problem that I seem to keep running into is not finding a way to build the file on a frame by frame basis which is what I want to do with most if not all of my video projects. Because of the code breaking changes that have happed as of this writing I have been r3educed to having to use a solution that involves creating a collection of PNG files and then using the [program ffmpeg to create a video](/2022/03/04/linux-ffmpeg/) file that way.

Still the use of whammy will allow me to create a webm file of an animation using three.js, from there it is just a question of what I do with that. With that said I have found that I like to use a [program called Open Shot](https://www.openshot.org/) to create a finished video with audio. I could also use just about any video editing program with one or more webm files crated with whammy, and then do editing and any additional processing to create a finished product of some kind.

If you know of any other methods of getting this done, or have an questions or concerns please let me know in the comments, and thanks for reading.

