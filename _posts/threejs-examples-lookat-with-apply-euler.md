---
title: Object3d lookAt and Vector3 apply Euler methods threejs example
date: 2022-05-06 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 984
updated: 2022-05-07 11:50:48
version: 1.7
---

For todays post on a [threejs example](/2021/02/19/threejs-examples/) I wanted to make a quick project that has to do with how the [lookAt method of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.lookAt) is not always a kind of golden hammer kind of solution when it comes to setting the orientation of an object, or in this case a group of objects. For the most part that method works well, and is very easy to use, I just call the method off of the object that is based off of object3d, typically a camera, but it can be any other object3d based object, and pass the position that I want the object to look at.

<!-- more -->


## This threejs example of the lookAt, and applyEuler methods in threejs and what to know first

This is one of my many posts on a threejs project example, this one has to do with using the object3d lookAt method and the Vector3 apply Eueler method. This is then not any kind of [getting started with threejs](/2018/04/04/threejs-getting-started/) kind of post, and I assume that you have at least a little experience working with threejs and client side javaScript in general. I will then not be getting into every little detail that you should know before hand in this section, but I will mention a few things you might want to read up more on before and if you have not done so thus far at this point.

<iframe class="youtube_video" src="https://www.youtube.com/embed/jLvd_e_uBLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### There is reading more on the Object3d lookAt method and object3d class in general

I have wrote posts on the [Object3d lookAt method](/2021/05/13/threejs-object3d-lookat/) as well as the [object3d class](/2018/04/23/threejs-object3d/) in general.

### Version Numbers matter

When I first made this example I was using r135 of threejs.

### Source code is on github

The source code for this example can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lookat-with-apply-euler), along with many others.

## 1 - The first version of this threejs example

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#8a8a8a');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);
//******** **********
// HELPER FUNCTIONS
//******** **********
// materuials to use for mesh objects
var materials = [
    new THREE.MeshStandardMaterial({color: new THREE.Color('cyan')}),
    new THREE.MeshStandardMaterial({color: new THREE.Color('red')})
];
// make a part of the object
var mkPart = function(g, partName, w, h, d, x, y, z, mi){
    // the mesh object
    var m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    materials[mi === undefined ? 0 : mi]);
    // name of part
    m.name = g.name + '_' + partName;
    // position it
    m.position.set(x, y, z);
    return m;
};
// make the whole group with all parts
var mkModel = function(gName){
    var g = new THREE.Group();
    g.name = gName || 'g-' + g.uuid;
    // add parts
    g.add( mkPart(g, 'body', 1, 1, 4, 0, 0, 0) );
    g.add( mkPart(g, 'tail', 0.5, 1, 1, 0, 1, -1.5, 1) );
    g.add( mkPart(g, 'rwing', 2, 0.5, 1, -1.5, 0, 0) );
    g.add( mkPart(g, 'lwing', 2, 0.5, 1, 1.5, 0, 0) );
    return g;
};
// make a collection of them
var createWrap = function(){
    var wrap = new THREE.Group();
    var i = 0, count = 50;
    while(i < count){
        var g = mkModel('g' + i);
        wrap.add(  g );
        i += 1;
    }
    wrap.scale.set(0.5, 0.5, 0.5);
    return wrap;
};
// position a wrap object
var positionWrap = function(wrap, bias, ringCount){
    bias = bias === undefined ? 1 : bias;
    ringCount = ringCount === undefined ? 5 : ringCount;
    var count = wrap.children.length,
    i = 0;
    perRing = count / ringCount,
    radius = 15; 
    var yaStep = 90 / ringCount;
    while(i < count){
        var per = i / count;
        var g = wrap.children[i];
        var ring = Math.floor( i / perRing );
        var rPer = ( i - perRing * ring) / perRing;
        var x = Math.PI * 2 * rPer, 
        s = ring < ringCount / 2 ? 0 : 1;
        y = Math.PI / 180 * yaStep * ring * bias, 
        z = 0;
        var e = new THREE.Euler(x, y, z);
        g.position.set(0, 0, radius).applyEuler( e );
        g.lookAt(0, 0, 0);
        i += 1;
    }
};
//
var wrapA = createWrap();
positionWrap(wrapA, 1);
scene.add(wrapA);
 
var wrapB = createWrap();
positionWrap(wrapB, -1);
scene.add(wrapB);
//******** **********
// LOOP and ORBIT CONTROLS
//******** **********
new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        positionWrap(wrapA, 1 - 1 * bias, 5);
        positionWrap(wrapB, -1 + 1 * bias, 5 );
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```