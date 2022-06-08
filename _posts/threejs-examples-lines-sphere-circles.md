---
title: Sphere circles Lines threejs example
date: 2022-06-03 16:16:00
tags: [three.js]
layout: post
categories: three.js
id: 991
updated: 2022-06-08 12:59:45
version: 1.17
---

When it comes to making lines in threejs I wanted to make a [threejs example](/2021/02/19/threejs-examples/) in which I have a collection of lines that form a sphere like shape. So the general idea is to make a javaScript module that has a create method that will return a group of lines, where each line is one circle that forms something that will look like a sphere. I can then also add a method that can be used to update the state of this group of lines with a new set of options as a way to make various kinds of animations.

<!-- more -->

## Sphere Circle Lines threejs example and what to know first

This is a post on some javaScript code built on top of the library known as threejs that has to do with making a collection of lines that look like a sphere. This is one of my many threejs project examples that I have made thus far that is for developers that have a fair amount of experience with javaScript and threejs and are now looking into ideas for projects. This is then not a post for people that are still fairly new with threejs, and as such I will not be getting into basic things that you should know about at this point. However in this section I will be going over a few things you might want to read up more on that are related to what I am doing here.

### Read up more on the THREE.Line constructor

In this example I am creating an instance of THREE.Group and adding a bunch of Lines as children for this group. The [THREE.Line object](/2018/04/19/threejs-line/) is one of several alternative options to the usual [THREE.Mesh object](/2018/05/04/threejs-mesh/) when it comes to adding objects to a scene that contain some kind of content.

### Check out Buffer geometry and Vector3 classes

In this example I am creating an array of [Vector3 class](/2018/04/15/threejs-vector3/) instances and then passing this array to the set from points method of the [buffer geometry class](/2021/04/22/threejs-buffer-geometry/) as a way to create a geometry. I am then passing the resulting geometry along with a line material as arguments of the three line constructor. So then there is taking a moment tot read up more on the buffer geometry class as well as the Vetor3 class if yo have not done so before hand. There are a lot of useful methods in the buffer geometry class such as this set from points method, and the Vector3 class also has a lot of great stuff to work with when it comes to playing around with vectors.

### The source code is also on Github

The source code examples that I am writing about in this post can also be found in [my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lines-sphere-circles).

### Version Numbers matter

I was using r135 when I first wrote this post.


## 1 - Getting the general idea working first

When I started a new prototype folder in which to just get the basic idea of what I wanted working I had everything in just one javaScript file which is often the case when first starting out with one of these ideas. In this single javaScript file I create my usual scene object, camera, renderer and so forth, but the main thing of interest are the methods that I made to create an array or points, and a group of lines where each line if a collection of these points.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES
//******** **********
// just create one circle for a set of circles that form a sphere like shape
// createSphereCirclePoints(maxRadius, circleCount, circleIndex, pointsPerCircle)
var createSphereCirclePoints = function(maxRadius, circleCount, circleIndex, pointsPerCircle){
    var points = [];
    var sPer = circleIndex / circleCount;
    var radius = Math.sin( Math.PI * 1.0 * sPer ) * maxRadius;
    var y = Math.cos( Math.PI * 1.0 * sPer ) * maxRadius;
    var i = 0;
    // buch points for the current circle
    while(i < pointsPerCircle){
        // might want to subtract 1 or 0 for this cPer expression
        var cPer =  i / ( pointsPerCircle - 1 );
        var radian = Math.PI * 2 * cPer;
        var v = new THREE.Vector3();
        v.x = Math.cos(radian) * radius;
        v.y = y;
        v.z = Math.sin(radian) * radius;
        points.push( v.clone().normalize().multiplyScalar(maxRadius) );
        i += 1;
    }
    return points;
};
// create sphere Lines helper
var createSphereLines = function(maxRadius, circleCount, pointsPerCircle, randomDelta, colors){
    colors = colors || [0xff0000,0x00ff00,0x0000ff]
    var lines = new THREE.Group();
    var i = 1;
    while(i < circleCount + 1){
        var p = createSphereCirclePoints(maxRadius, circleCount + 1, i, pointsPerCircle, randomDelta);
        var geometry = new THREE.BufferGeometry().setFromPoints( p);
        var line = scene.userData.line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: colors[i % colors.length],
                linewidth: 4
            })
        );
        lines.add(line);
        i += 1;
    };
    return lines;
};
var g = createSphereLines(5, 20, 50, 1.0, [0x00ffff, 0x008800, 0x008888, 0x00ff00]);
scene.add(g);
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
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
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 2 - Stand alone module, and for point methods for mutation of points

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

### 2.2 - Main JavaScript file demo

When it comes to my main javaScript file now I can now just call a few lines of code to create a group of lines using the module rather than having it all in one file. So then after setting up the usual scene object and various other usual suspects I can then just call the create method of my Line Sphere Circles module. When doing so I can now provide a whole bunch of options that can be used to adjust things like the array of colors to use for the lines, the width of the lines for browsers that support thicker lines, and so forth.

One of the coolest feature thus far though is the for point option that I can use to mutate the state of the array of points to use to create the lines. I have a few built in options for this that I ca use by providing a string for the name of the built in for point method, but I can also work out custom methods as needed as well by using a function for the value of the option. In this demo of the module I cam also using my set by frame method as a way to mutate the state of a group of lines that uses the built in sea shell for point method that I made while playing around with things.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES
//******** **********
 
// plain
var g1 = LinesSphereCircles.create({ maxRadius: 4, pointsPerCircle: 20 });
g1.position.set(-10,0,0)
scene.add(g1);
 
// seeded random
var g2 = LinesSphereCircles.create({ maxRadius: 8, forPoint: 'seededRandom' });
g2.position.set(-5,-2,-25)
scene.add(g2);
 
// seashell
var opt = {
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
var g3 = LinesSphereCircles.create(opt);
scene.add(g3);
 
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 15,
lt = new Date(),
frame = 0,
frameMax = 300;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        LinesSphereCircles.setByFrame(g3, frame, frameMax, opt)
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```


## Conclusion

I was able to get the general idea of what i wanted up and running, but there is maybe a bit more to think about when it comes to the idea of working on this more, or maybe starting some other kind of project that has to do with lines. I was thinking that this project was a nice start with it comes to making something interesting just using the THREE.Line constructor in threejs, but maybe it is called for to make another project based on this example but in a more general kind of way. That is to make a project where the goal is to make a javaScript module that I can use to create a group of lines, but not just lines that form a circle.