---
title: Object3d lookAt and Vector3 apply Euler methods threejs example
date: 2022-05-06 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 984
updated: 2023-01-09 14:59:01
version: 1.18
---

For todays post on a [threejs project example](/2021/02/19/threejs-examples/) I wanted to make some quick code that has to do with how the [look at method of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.lookAt) is not always a kind of golden hammer kind of solution when it comes to setting the orientation of an object. For the most part the look at method works well, and is very easy to use. I just call the method off of the object that is based off of the object3d class, typically a camera or mesh object, and pass the position that I want the object to look at. The position can be given in the form of a Vector3 object, or a set of number literal values, and more often than not the method will in fact have the object look at the point in space. However in some cases the end result may not work the way that I want it to, so I can not just turn my brain off and not think about this kind of stuff at all. In certain situations I will need to work out some other kind of situation when it comes to setting the rotation of an object3d based object.

This example then should help to show what I mean by this as it is a whole bunch of objects positioned around the origin and the are all made to look at the origin with the look at method. However two objects of interest might be at the top of the over all area where one plain is positioned one way and the other is flipped around completely. This is not always such a bad thing, but it is if what I want to do is make an animation in which this kind of object is of that of a plane that might make a motion like that of a loop in space. The end result is that the plane will flip have way threw which is of course not at all how it would happen in reality.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/jLvd_e_uBLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## This threejs example of the lookAt, and applyEuler methods in threejs and what to know first

This is one of my many posts on a threejs project example, this one has to do with using the object3d lookAt method and the Vector3 apply Euler method. This is then not any kind of [getting started with threejs](/2018/04/04/threejs-getting-started/) kind of post, and I assume that you have at least a little experience working with threejs and client side javaScript in general. I will then not be getting into every little detail that you should know before hand in this section, but I will mention a few things you might want to read up more on before and if you have not done so thus far at this point.

### There is reading more on the Object3d look at method and object3d class in general

I have wrote posts on the [Object3d lookAt method](/2021/05/13/threejs-object3d-lookat/) as well as the [object3d class](/2018/04/23/threejs-object3d/) in general. I use the look at method all the time in just about all of my source code examples when it comes to setting the rotation of a camera, however it can also be used with objects in general beyond just that of cameras. In this example I am using the look at method to set to orientation of mesh objects which like cameras are also based on the object3d class.

## Read up more on the apply Euler method of Vector3 as well as Vector3 in general.

In this example I am not just using the look at method, but also the apply Euler method of the Vector3 class along with the Euler class to set the position of mesh objects. With that said I have wrote a [post on the apply Euler method itself](/2021/06/18/threejs-vector3-apply-euler/), as well as another on the [Vector3 class in general](/2018/04/15/threejs-vector3/). When it comes to using the apply Euler method I need to have a Vector3 instance with a value other than 0,0,0 and when calling the method I need to pass an instance of the [Euler class](/2021/04/28/threejs-euler/) which is yet even another class that is worth looking into further.

### Version Numbers matter

When I first made this example I was using r135 of threejs.

### Source code is on github

The source code for this example can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lookat-with-apply-euler), along with many others.

## 1 - airplane.js r0, airplane-wrap.js r0, and demos

In this section I am making use of an airplane module that I use to create a model of a kind of airplane type object. I then have another module that I can use to create a collection of these kinds of objects that I have pulled out into its one file apart from the airplane module. I am then making a few demos that make use of one or more of these files in an effort to come up with some kind of system for showing what the problem is to begin with, and also working out a solution for the problem.

### The airplane module r0

There is showing what the problem is, and figuring out how to deal with the problem. However before I can start to do any of that I will want to have a way to create some kind of object that does not symmetrical. That is that I will want to have some kind of object where it is clear what side is the top, bottom, and front at least. So I came up with some quick code that will be used to create this kind of object.

```js
// airplane.js - r0 - from threejs-examples-lookat-with-apply-euler
(function(api){
     //-------- ----------
     // MATERIALS
     //-------- ----------
     // materuials to use for mesh objects
     const materials = [
         new THREE.MeshStandardMaterial({color: new THREE.Color('white')}),
         new THREE.MeshStandardMaterial({color: new THREE.Color('red')})
    ];
    // make a part of the object
    const mkPart = function(g, partName, w, h, d, x, y, z, mi){
        // the mesh object
        const m = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            materials[mi === undefined ? 0 : mi]);
        // name of part
        m.name = g.name + '_' + partName;
        // position it
        m.position.set(x, y, z);
        return m;
    };
    // make the whole group with all parts
    api.create = function(gName){
        const g = new THREE.Group();
        g.name = gName || 'g-' + g.uuid;
        // add parts
        g.add( mkPart(g, 'body', 1, 1, 4, 0, 0, 0) );
        g.add( mkPart(g, 'tail', 0.5, 1, 1, 0, 1, -1.5, 1) );
        g.add( mkPart(g, 'rwing', 2, 0.5, 1, -1.5, 0, 0) );
        g.add( mkPart(g, 'lwing', 2, 0.5, 1, 1.5, 0, 0) );
        return g;
    };
}( this['airplane'] = {} ));
```

### The airplane wrap module r0

This is a module that I am using to create a collection of these airplane objects, and then use the apply Euler method to position the objects around the origin. I am then also using the object3d look at method to have all of them face the origin as well.

```js
// airplane-wrap.js - r0 - from threejs-examples-lookat-with-apply-euler
(function(api){
    // position a wrap object
    api.position = function(wrap, bias, ringCount){
        bias = bias === undefined ? 1 : bias;
        ringCount = ringCount === undefined ? 5 : ringCount;
        const count = wrap.children.length,
        perRing = count / ringCount,
        yaStep = 90 / ringCount,
        radius = 15; 
        let i = 0;
        while(i < count){
            const per = i / count;
            var g = wrap.children[i];
            const ring = Math.floor( i / perRing );
            const rPer = ( i - perRing * ring) / perRing;
            const x = Math.PI * 2 * rPer, 
            y = Math.PI / 180 * yaStep * ring * bias, 
            z = 0;
            // USING APPLY EULER
            const e = new THREE.Euler(x, y, z);
            g.position.set(0, 0, radius).applyEuler( e );
            g.lookAt(0, 0, 0);
            i += 1;
        }
    };
    // make a collection of them
    api.create = function(count){
        count = count === undefined ? 50 : count;
        const wrap = new THREE.Group();
        let i = 0;
        while(i < count){
            //const g = mkModel('g' + i);
            const g = airplane.create('g' + i);
            wrap.add( g );
            i += 1;
        }
        wrap.scale.set(0.5, 0.5, 0.5);
        // first call of position method
        api.position(wrap, 1, 5);
        return wrap;
    };
}( this['airplane_wrap'] = {} ));
```

### 1.1 - Demo of airplane wrap

I then have this one demo of the airplane module, and the wrap collection module that does a good job of showing what the problem with the object3d look at method is. Although the method works well there is one little problem with it where I will not be able to just one the look at method along to set the rotation of the objects. As you can see the airplanes will all of a sudden flip over in a way that I do not want them to for the kind of situations in which I would use this airplane module, or any kind of object like it for that matter.

```js
// r0-1-wrap demo from threejs-examples-lookat-with-apply-euler
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);
//-------- ----------
// MESH
//-------- ----------
const wrapA = airplane_wrap.create();
scene.add(wrapA);
const wrapB = airplane_wrap.create();
scene.add(wrapB);
//-------- ----------
// LOOP
//-------- ----------
if(THREE.OrbitControls){
    new THREE.OrbitControls(camera, renderer.domElement);
}
let = lt = new Date(), frame = 0;
const fps = 30, maxFrame = 300;
const update = (frame, maxFrame, secs) => {
    const a1 = frame / maxFrame,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    airplane_wrap.position(wrapA, 1 - 1 * a2, 5);
    airplane_wrap.position(wrapB, -1 + 1 * a2, 5 );
};
const loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        update(frame, maxFrame, secs);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

So now that I have a nice visual idea of what the problem is to begin with it is now a matter to work out at least one or more solutions to help with the process of addressing this kind of problem that has to do with setting position and rotation of objects.

### 1.2 - Demo using a new position helper

With what it is that I have worked out this far it is clear to me that there is not much of anything wrong with what I am doing to set the position of these airplane objects. For the most part the process of using the vector3 apply Euler method works well for setting a local position of an object in space. The main problem here is how to go about setting the rotation of the objects rather than the position. I really do like the object3d look at method, it does very much make the process of setting rotation very easy most of the time. However there are going to be situations in which I am just going to have to work something else out and this is a good example of that kind of situation.

```js
// r0-2-object3d-rotation demo - from threejs-examples-lookat-with-apply-euler
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTION
//-------- ----------
const setPlanePosition = (ap, a_p1, a_p2, a_r1, a_r2, radius) => {
    // NEW SET POS METHOD
    const x = Math.PI * 2 * a_p1, 
    y = Math.PI * 2 * a_p2, 
    z = 0;
    // USING APPLY EULER TO SET POSITION
    const e = new THREE.Euler(x, y, z);
    ap.position.set(0, 0, radius).applyEuler( e );
    // object3d rotation being used in place of Look At
    ap.rotation.y = Math.PI * 2 * a_r1;
    ap.rotation.x = Math.PI * 2 * a_r2;
};
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);
//-------- ----------
// MESH
//-------- ----------
const ap1 = airplane.create('g-1');
scene.add(ap1);
const ap2 = airplane.create('g-2');
scene.add(ap2);
//-------- ----------
// LOOP
//-------- ----------
if(THREE.OrbitControls){
    new THREE.OrbitControls(camera, renderer.domElement);
}
let = lt = new Date(), frame = 0;
const fps = 30, maxFrame = 300;
const update = (frame, maxFrame, secs) => {
    const a1 = frame / maxFrame,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    setPlanePosition(ap1, a1, 0, 0.5, a1, 5);
    setPlanePosition(ap2, a1, 0.65, 0.18, a1, 10);
};
const loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        update(frame, maxFrame, secs);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```


## Conclusion

This example helped me get a good visual idea of what the deal is with the use of the look at method and how it sets rotation for objects. The result is that the look at method will work just fine for most situations in which I would want to use it, but there are a few use cases in which it will now work the way that I would want it to. For example using it to set the rotation of a biplane model that might do a loop or two in a scene, when it comes to that I will need to do a bit more than just use the look at method, for find some other solution completely actually.

