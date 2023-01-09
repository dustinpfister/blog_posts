---
title: Object3d lookAt and Vector3 apply Euler methods threejs example
date: 2022-05-06 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 984
updated: 2023-01-09 10:23:40
version: 1.17
---

For todays post on a [threejs project example](/2021/02/19/threejs-examples/) I wanted to make some quick code that has to do with how the [look at method of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.lookAt) is not always a kind of golden hammer kind of solution when it comes to setting the orientation of an object. For the most part the look at method works well, and is very easy to use. I just call the method off of the object that is based off of the object3d class, typically a camera or mesh object, and pass the position that I want the object to look at. The position can be given in the form of a Vector3 object, or a set of number literal values, and more often than not the method will in fact have the object look at the point in space. However in some cases the end result may not work the way that I want it to, so I can not just turn my brain off and not think about this kind of stuff at all. In certain situations I will need to work out some other kind of situation when it comes to setting the rotation of an object3d based object.

This example then should help to show what I mean by this as it is a whole bunch of objects positioned around the origin and the are all made to look at the origin with the look at method. However two objects of interest might be at the top of the over all area where one plain is positioned one way and the other is flipped around completely. This is not always such a bad thing, but it is if what I want to do is make an animation in which this kind of object is of that of a plane that might make a motion like that of a loop in space. The end result is that the plane will flip have way threw which is of course not at all how it would happen in reality.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/jLvd_e_uBLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## This threejs example of the lookAt, and applyEuler methods in threejs and what to know first

This is one of my many posts on a threejs project example, this one has to do with using the object3d lookAt method and the Vector3 apply Euler method. This is then not any kind of [getting started with threejs](/2018/04/04/threejs-getting-started/) kind of post, and I assume that you have at least a little experience working with threejs and client side javaScript in general. I will then not be getting into every little detail that you should know before hand in this section, but I will mention a few things you might want to read up more on before and if you have not done so thus far at this point.

### There is reading more on the Object3d lookAt method and object3d class in general

I have wrote posts on the [Object3d lookAt method](/2021/05/13/threejs-object3d-lookat/) as well as the [object3d class](/2018/04/23/threejs-object3d/) in general. I use the look at method all the time in just about all of my source code examples when it comes to setting the rotation of a camera, however it can also be used with objects in general beyond just that of cameras. In this example I am using the lookAt method to set to orientation of mesh objects which like cameras are also based on the object3d class.

## Read up more on the apply Euler method of Vector3 as well as Vector3 in general.

In this example I am not just using the look at method, but also the apply Euler method of the Vector3 class along with the Euler class to set the position of mesh objects. With that said I have wrote a [post on the apply Euler method itself](/2021/06/18/threejs-vector3-apply-euler/), as well as another on the [Vector3 class in general](/2018/04/15/threejs-vector3/). When it comes to using the apply Euler method I need to have a Vector3 instance with a value other than 0,0,0 and when calling the method I need to pass an instance of the [Euler class](/2021/04/28/threejs-euler/) which is yet even another class that is worth looking into further.

### Version Numbers matter

When I first made this example I was using r135 of threejs.

### Source code is on github

The source code for this example can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lookat-with-apply-euler), along with many others.

## 1 - The first version of this threejs example

For this example I have everything that I want packed into a single javaScript file, at least when it comes to this first revision to which I might expand on at a later point in the future when and if I get to it. Anyway I start out the file with the usual set of objects that I will want for any threejs project my creating the scene object, camera and renderer. After that I am adding a light source in the form of a directional light, after that I get into some helper functions that I am going to be using to create an update the collection of mesh objects for this. Finally I have an app loop but for now it is just a way to make to so that the [orbit controls will work](/2018/04/13/threejs-orbit-controls/).

When it comes to the helpers section I have an array of materials that I will be using for each mesh object of each group that I will be using for the sake of having a kind of object to use for this. I have one material for the tail of each plane group, and another for all the other mesh objects that I am using. I then have a function that I can call that will create a single mesh object for an over all group of mesh objects. After that I have a make model helper that will crate a new instance of THREE.Group and add all the parts for the over all model.

There is then a create wrap method that will just create a collection fo these models objects, and then I have a helper that I am using to position a whole bunch of these mesh objects, for this example I have it set at about 50 of them.

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

## Conclusion

This example helped me get a good visual idea of what the deal is with the use of the look at method and how it sets rotation for objects. The result is that the lookAt method will work just fine for most situations in which I would want to use it, but there are a few use cases in which it will now work the way that I would want it to. For example using it to set the rotation of a biplane model that might do a loop or two in a scene, when it comes to that I will need to do a bit more than just use the lookAt method, for find some other solution completely actually.
