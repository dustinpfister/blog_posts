---
title: The dae or Collada file loader in threejs
date: 2021-04-30 11:44:00
tags: [three.js]
layout: post
categories: three.js
id: 857
updated: 2021-04-30 12:45:21
version: 1.12
---

I would like to look into the extremal file formats more with [threejs](https://threejs.org/), and maybe a good place to start would be with the dae file, also known as the Collada file loader. The [Collada file format](https://en.wikipedia.org/wiki/COLLADA) is the default file format that is used by [blender](https://www.blender.org/) to export files. This format uses an XML schema as a way to store data for all objects in a blender project, so right off the bat I like it for that reason as it is a plain text file format that I can just use right away with blender by itself when it comes to creating the files.

Once I have a Collada files exported from blender it is then just a question of how to load that files into three.js. The Collada file loader is not built into three.js itself, but it can be added by way of an external files loaded in the examples folder of the three.js github repository. The loader is fairly easy to use, but there are still just a few things here and there to be aware of that call for a quick post on this subject.

<!-- more -->

## 1 - DAE AKA Collada files with three.js and what to know first

This is a post on using the ColladaLoader which can be added on top of three.js to load Collada files with a DAE file extension which is the default file format used in blender. So this is not a getting started post on three.js, and client side javaScript in general. It is also not a getting started post with blender also. The subject here is just using the Collada file loader in the examples folder of the three.js repository to load an external dae file into a three.js scene.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js, in the future this code might break on later versions. I try to do a half way decent job of editing files, but I have a lot of pots boiling with that. So if the code breaks the first thing you should check is what version of three.js you are using, it really matters a lot.

### 1.2 - Start Playing around with blender a little at least

In order to create a dea file a program like blender has to be used to create and export such a file. You do not have to learn everything about using it at this point, exporting the default cube that is added when first starting blender will work as a starting file to load. However the whole point of doing this is to get into the swing of creating files in blender that can then be loaded into a three.js project.

## 1.3 - You will need additional javaScript files beyond just that of three.js

On top of loading the usual three.js file, the Collada file loader will also need to be loaded first before any additional javaScript that makes use of three.js and the  Collada loader. In many of these examples I am also using the Orbit Controls file which is yet another external files that can be located in the examples folder.

## 2 - Load a single dae file

In this example I will just be loading a single dae file using the THREE.ColladaLoader constructor to create an instance of such a loader. I then just need to call the load method of this Collada loader instance and pass the url to the dae file that I want to load as the first argument. For the second argument I am going to want to pass a callback function to call when the resource has finished loading. It is then within this call back function that I am going to want to add the whole scene, or a child object of the dae file into the three.js scene, or do whatever it is that needs t be done with what the file contains.

```js
(function () {
 
    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    // scene
    var scene = new THREE.Scene();
    //scene.add(pl);
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    // controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        controls.update();
    };
 
    // CREATE A COLLADALOADER INSTANCE
    var loader = new THREE.ColladaLoader();
    // CALL THE LOAD METHOD, PASS THE ABSOLUTE OR RELATIVE PATH
    // TO THE *.DAE FILE AS THE FIRST ARGUMENT, AND A DONE CALLBACK
    // AS THE SECOND ARGUMENT
    loader.load("/dae/obj/obj.dae", function (result) {
        console.log(result);
        scene.background = new THREE.Color('cyan');
        scene.add(result.scene.children[2]);
        // start the app loop
        loop();
    });
 
}
    ());
```

## 3 - Conclusion

The dae format seems to work okay thus far, in order to really know what I can do with the Collada format I am going to need to look into how to use blender more. I am thinking for now I will want to just focus on making simple static models, but there is also looking into how to go about create animations for a dae file also that can then be used in three.js with the Animation mixer. However maybe all of that is a matter for a whole other post, for now I just waned to have this kind of getting started type post.

The alternative to getting into the various extremal file formats is to just make crude yet effective models using just three.js, and javaScript alone. This might actually be a decent starting point when it comes to making assets for three.js actually as thus far I find it to be the easiest way to go about making them. However there is a draw back to this sort of thing when it comes to making something that can be shared between three.js, blender, and other applications. So with that said it makes sense to look into what the options are with external file formats that are fairly open and standard and the Collada format seems to be just that.