---
title: Sphere circles Lines threejs example
date: 2022-06-03 16:16:00
tags: [three.js]
layout: post
categories: three.js
id: 991
updated: 2022-12-19 12:56:20
version: 1.25
---

When it comes to making lines in threejs I wanted to make a [threejs example](/2021/02/19/threejs-examples/) in which I have a collection of lines that form a [sphere like shape](/2021/05/26/threejs-sphere/). So the general idea is to make a JavaScript module that has a create method that will return a [group](/2018/05/16/threejs-grouping-mesh-objects/) of lines, where each line is one circle that forms something that will look like a sphere when it comes to the over all shape of the collection of lines. 

I can then also add a method that can be used to update the state of this group of lines with a new set of options as a way to make various kinds of animations. So there is starting out with the basic idea of what i want to do, and then also maybe make a kind of module form of this example. Once I have a module form of this genera idea I can then make all kinds of additional demos that make use of the module to create, and update the state of the lines.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/nQ0rDFbFwK0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Sphere Circle Lines threejs example and what to know first

This is a post on some javaScript code built on top of the library known as threejs that has to do with making a collection of lines that look like a sphere. This is one of my many threejs project examples that I have made thus far that is for developers that have a fair amount of experience with javaScript and threejs and are now looking into ideas for projects. This is then not a [post for people that are still fairly new with threejs](/2018/04/04/threejs-getting-started/). As such I will not be getting into basic things that you should know about at this point, however in this section I will be going over a few things you might want to read up more on that are related to what I am doing here.

### Read up more on the THREE.Line constructor, and buffer geometry

In this example I am creating an instance of THREE.Group and adding a bunch of Lines as children for this group. The [THREE.Line object](/2018/04/19/threejs-line/) is one of several alternative options to the usual [THREE.Mesh object](/2018/05/04/threejs-mesh/) when it comes to adding objects to a scene that contain some kind of content. What is nice about lines is that I only have to worry about the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of the [buffer geometry objects](/2021/04/22/threejs-buffer-geometry/) that I make when it comes to custom geometry. This allows for me to just focus on how to go about placing points in space in a certain order, and not working about everything else that needs to happen in order to make a mesh friendly geometry.

### Check out Buffer geometry and Vector3 classes

In this example I am creating an array of [Vector3 class](/2018/04/15/threejs-vector3/) instances and then passing this array to the set from points method of the [buffer geometry class](/2021/04/22/threejs-buffer-geometry/) as a way to create a geometry. I am then passing the resulting geometry along with a line material as arguments of the three line constructor. So then there is taking a moment tot read up more on the buffer geometry class as well as the Vetor3 class if yo have not done so before hand. There are a lot of useful methods in the buffer geometry class such as this set from points method, and the Vector3 class also has a lot of great stuff to work with when it comes to playing around with vectors.

### The source code is also on Github

The source code examples that I am writing about in this post can also be found in [my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lines-sphere-circles).

### Version Numbers matter

I was using r135 when I first wrote this post, and the last time I cam around to do some editing I was using r146.

<iframe class="youtube_video" src="https://www.youtube.com/embed/272Z2QvvA7g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 1 - Getting the general idea working first \( r0 \)

When I started a new prototype folder in which to just get the basic idea of what I wanted working I had everything in just one javaScript file which is often the case when first starting out with one of these ideas. In this single javaScript file I create my usual scene object, camera, renderer and so forth, but the main thing of interest are the methods that I made to create an array or points, and a group of lines where each line if a collection of these points.

```js
// line-sphere-circles - r0 - from threejs-examples-lines-sphere-circles
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
// just create one circle for a set of circles that form a sphere like shape
const createSphereCirclePoints = function(maxRadius, circleCount, circleIndex, pointsPerCircle, randomDelta){
    const points = [];
    const sPer = circleIndex / circleCount;
    const radius = Math.sin( Math.PI * 1.0 * sPer ) * maxRadius;
    const y = Math.cos( Math.PI * 1.0 * sPer ) * maxRadius;
    let i = 0;
    // buch points for the current circle
    while(i < pointsPerCircle){
        // might want to subtract 1 or 0 for this cPer expression
        const cPer =  i / ( pointsPerCircle - 1 );
        const radian = Math.PI * 2 * cPer;
        const p_radius = radius + Math.random() * randomDelta;
        const v = new THREE.Vector3();
        v.x = Math.cos(radian) * p_radius;
        v.y = y;
        v.z = Math.sin(radian) * p_radius;
        points.push( v.clone().normalize().multiplyScalar(maxRadius) );
        i += 1;
    }
    return points;
};
// create sphere Lines helper
const createSphereLines = function(maxRadius, circleCount, pointsPerCircle, randomDelta, colors, lineWidth){
    colors = colors || [0xff0000,0x00ff00,0x0000ff]
    const lines = new THREE.Group();
    let i = 1;
    while(i < circleCount + 1){
        const p = createSphereCirclePoints(maxRadius, circleCount + 1, i, pointsPerCircle, randomDelta);
        const geometry = new THREE.BufferGeometry().setFromPoints( p);
        const line = scene.userData.line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: colors[i % colors.length],
                linewidth: lineWidth
            })
        );
        lines.add(line);
        i += 1;
    };
    return lines;
};
const g = createSphereLines(8, 20, 100, 1.5, [0x00ffff, 0x008800, 0x008888, 0x00ff00], 6);
scene.add(g);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Stand alone module, and for point methods for mutation of points \( r1 \)

In the first revision of this example I got the basic idea of what I wanted working okay, but I wanted to make at least one more additional revision of this example to further refine the core idea here. In the first version of the example I have all my code in a single javaScript file which is fine when first starting out with an idea but when it comes to making some kind of example that is a little more potable the next step is to make a kind of module with what I worked out and that is what I did in this first revision of the example.

### 2.1 - A stand alone module for this

The javaScript module that I then made based off of my first version of this example is then a module that has just two public functions for now. The public methods have to do with creating a group that is an array of lines that from the sphere like shape, and the other public method has to do with setting the state of the lines by way of set by frame method.

```js
//******** **********
// Lines sphere circles module - from THREEJS-EXAMPLES-LINES-SPHERE-CIRCLES ( r1 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LinesSphereCircles = (function(){
    //******** **********
    // BUILT IN "forPoint" METHODS
    //******** **********
    var forPoint = {};
    // seeded random for point method example
    forPoint.seededRandom = function(v, s, opt){
        // min and max radius used
        opt.minRadius = opt.minRadius === undefined ? 0.5: opt.minRadius;
        var scalar = opt.minRadius + (opt.maxRadius - opt.minRadius) * THREE.MathUtils.seededRandom();
        return v.clone().normalize().multiplyScalar(scalar);
    };
    // seaShell method
    forPoint.seaShell = function(v, s, opt){
        opt.minRadius = opt.minRadius === undefined ? 1.5: opt.minRadius;
        var scalar =  opt.minRadius + (opt.maxRadius - opt.minRadius) * s.cPer;
        return v.clone().normalize().multiplyScalar(scalar);
    };
    //******** **********
    // HELPER FUNCTIONS
    //******** **********
    // createSphereCirclePoints - return an array of Vector3 instances that is
    // just one circle for an over all sphere
    //api.createSphereCirclePoints = function(opt, maxRadius, circleCount, circleIndex, pointsPerCircle){
    var createSphereCirclePoints = function(circleIndex, opt){
        // options object
        opt = opt || {};
        opt.r1 = opt.r1 === undefined ? 1 : opt.r1;
        opt.r2 = opt.r2 === undefined ? 1 : opt.r2;
        opt.maxRadius = opt.maxRadius === undefined ? 1: opt.maxRadius;
        opt.circleCount = opt.circleCount === undefined ? 4: opt.circleCount;
        opt.pointsPerCircle = opt.pointsPerCircle === undefined ? 10: opt.pointsPerCircle;
        opt.forPoint = opt.forPoint || null;
        // if opt.forPoint is a string use a built in for point method
        if(typeof opt.forPoint === 'string'){
            opt.forPoint = forPoint[opt.forPoint];
        }
        opt.forOpt = opt.forOpt || null;
        // the current index for this circle over all circles
        circleIndex = circleIndex || 0;
        // create points
        var points = [];
        var s = {};
        s.sPer = circleIndex / opt.circleCount;
        s.radius = Math.sin( Math.PI * opt.r1 * s.sPer ) * opt.maxRadius;
        s.y = Math.cos( Math.PI * opt.r2 * s.sPer ) * opt.maxRadius;
        s.i = 0;
        // buch points for the current circle
        while(s.i < opt.pointsPerCircle){
            // might want to subtract 1 or 0 for this cPer expression
            s.cPer =  s.i / ( opt.pointsPerCircle - 1 );
            s.radian = Math.PI * 2 * s.cPer;
            s.v = new THREE.Vector3();
            s.v.x = Math.cos(s.radian) * s.radius;
            s.v.y = s.y;
            s.v.z = Math.sin(s.radian) * s.radius;
            // use a for point method if one is given
            if(opt.forPoint){
                points.push( opt.forPoint(s.v, s, opt) );
            }else{
                points.push(s.v);
            }
            s.i += 1;
        }
        return points;
    };
    // create a single THREE.Line for a collection of circles
    var createLine = function(points, color, linewidth){
        color =  color || 0xffffff;
        linewidth = linewidth || 0;
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        return new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: color,
                linewidth: linewidth
            })
        );      
    };
    // parseOpt
    var parseOpt = function(opt){
        opt = opt || {};
        opt.circleCount = opt.circleCount === undefined ? 10 : opt.circleCount;
        opt.colors = opt.colors || [0xff0000,0x00ff00,0x0000ff];
        opt.linewidth = opt.linewidth === undefined ? 1 : opt.linewidth;
        return opt;
    };
    //******** **********
    // CREATE GROUP
    //******** **********
    // public api
    var api = {};
    // create a group where each child is a THREE.Line for a circle in the sphere of circles
    api.create = function(opt){
        opt = parseOpt(opt);
        var lineGroup = new THREE.Group();
        lineGroup.userData.opt = opt;
        var i = 1;
        while(i < opt.circleCount + 1){
            // create points for this circle
            var points = createSphereCirclePoints(i, opt);
            // create Line and add to group
            lineGroup.add( createLine(points, opt.colors[i % opt.colors.length], opt.linewidth) );
            i += 1;
        };
        return lineGroup;
    };
    // set state of lineGroup by frame / maxFrame, and optional new opt object
    api.setByFrame = function(lineGroup, frame, frameMax, opt){
        frame = frame === undefined ? 0 : frame;
        frameMax = frameMax === undefined ? 30 : frameMax;
        opt = opt || lineGroup.userData.opt;
        opt = lineGroup.userData.opt = parseOpt(opt);
        var i = 0;
        while(i < opt.circleCount){
            // mutate options before calling createSphereCirclePoints
            if(opt.forOpt){
                var per = frame / frameMax,
                bias = 1 - Math.abs(0.5 - per) / 0.5;
                opt.forOpt(opt, per, bias, frame, frameMax);
            }
            // create points for this circle
            var points = createSphereCirclePoints(i + 1, opt),
            line = lineGroup.children[i];
            line.geometry.setFromPoints(points);
            //line.material.color = opt.colors[i % opt.colors.length];
            //line.material.linewidth = opt.linewidth;
            // create Line and add to group
            //lineGroup.add( createLine(points, opt.colors[i % opt.colors.length], opt.linewidth) );
            i += 1;
        };
 
    };
    // return public API
    return api;
}());
```

### 2.1 - A seaShell like shape demo

So now when it comes to making a main javaScript file I can just call a few lines of code to create a group of lines using the module rather than having it all in one file. After setting up the usual scene object and various other usual suspects I can then just call the create method of my Line Sphere Circles module. When doing so I can now provide a whole bunch of options that can be used to adjust things like the array of colors to use for the lines, the width of the lines for browsers that support thicker lines, and so forth.

One of the coolest feature thus far though is the for point option that I can use to mutate the state of the array of points to use to create the lines. I have a few built in options for this that I can use by providing a string for the name of the built in for point method, but I can also work out custom methods as needed as well by using a function for the value of the option. In this demo of the module I cam also using my set by frame method as a way to mutate the state of a group of lines that uses the built in sea shell for point method that I made while playing around with things.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
// seashell
const opt = {
    circleCount: 20,
    maxRadius: 4,
    pointsPerCircle: 30,
    colors: [0x004444, 0x00ffff],
    linewidth: 4,
    forPoint: 'seaShell',
    forOpt: function(opt, per, bias, frame, frameMax){
        opt.minRadius = 1 + 3 * bias;
    }
};
const g1 = LinesSphereCircles.create(opt);
scene.add(g1);
//-------- ----------
// LOOP
//-------- ----------
let fps = 15,
lt = new Date(),
frame = 0,
frameMax = 300;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        LinesSphereCircles.setByFrame(g1, frame, frameMax, opt);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

### 2.2 - Random points example

Another option then is to use the seeded random built in for point method of the module. The seeded random method is one of many methods to work with in the [math utils object](/2022/04/11/threejs-math-utils/) of the core of the threejs library. This seeded random method is like that of the math random method only it will give the same result when called for the first time. 

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
// seeded random
const opt = { maxRadius: 8, forPoint: 'seededRandom', circleCount: 30, pointsPerCircle: 50 };
var g1 = LinesSphereCircles.create(opt);
scene.add(g1);
//-------- ----------
// LOOP
//-------- ----------
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
frameMax = 300;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        LinesSphereCircles.setByFrame(g1, frame, frameMax, opt);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```


### 2.3 - Can still do a plain sphere like shape

I can still to just a plain sphere like shape by just going with the default for point method of the module. So for this example I went with just making a very simple static scene that does not even involve an app loop, or the updating of the geometry over time. When making the options object that will be passed to the create method I can just not give any option at all for the for point method which will result in the default sphere like shape for all the lines. I can then adjust things when it comes to radius, the number of circles in the group, points per circle, and the thickness of the lines.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
const opt = { maxRadius: 5, pointsPerCircle: 70, circleCount: 50, linewidth: 4 }
const g1 = LinesSphereCircles.create(opt);
scene.add(g1);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 2.3 - Rotaiton of lines, whole group, and custom for point method

For this example I just wanted to make a cool looking effect where I rotate and scale each line in the group. On top of that i also made a custom for point method when it comes to setting up the options object to use for this one. The end result is more or less what I wanted which is a pretty cool looking over all effect.
```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
const opt = {
    maxRadius: 8,
    pointsPerCircle: 100,
    circleCount: 40,
    linewidth: 4,
    colors: ['red', 'lime', 'blue', 'yellow', 'green', 'cyan', 'orange', 'pink', 'purple'],
    forPoint: function(v, s, opt){
        v.x = v.x + -0.5 + 1 * Math.random();
        v.z = v.z + -0.5 + 1 * Math.random();
        return v;
    }
}
const g1 = LinesSphereCircles.create(opt);
scene.add(g1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax * 2 % 1;
    const a2 = 1 - Math.abs( 0.5 - a1 * 4 % 1 ) / 0.5;
    g1.children.forEach( (line, i, arr) => {
        // rotate
        const count = Math.floor(i + 1);
        line.rotation.z = Math.PI * 2 * count * a1;
        // scale
        const s = 1 - (i / arr.length * 0.5 * a2);
        line.scale.set(s, s, s);
        // material
        const m = line.material;
        m.transparent = true;
        m.opacity = 0.85 - 0.80 * ( i / arr.length);
    });
    LinesSphereCircles.setByFrame(g1, frame, frameMax, opt);
    g1.rotation.y = Math.PI * 2 * a1;
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

I was able to get the general idea of what i wanted up and running, but there is maybe a bit more to think about when it comes to the idea of working on this more, or maybe starting some other kind of project that has to do with lines. I was thinking that this project was a nice start with it comes to making something interesting just using the THREE.Line constructor in threejs, but maybe it is called for to make another project based on this example but in a more general kind of way. That is to make a project where the goal is to make a javaScript module that I can use to create a group of lines, but not just lines that form a circle.