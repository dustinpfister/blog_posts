---
title: Deterministic Lines threejs example
date: 2022-06-10 14:49:00
tags: [three.js]
layout: post
categories: three.js
id: 992
updated: 2023-02-02 09:49:23
version: 1.17
---

I wanted to make a new [threejs example](/2021/02/19/threejs-examples/) that has to do with creating and mutating a [group](/2018/05/16/threejs-grouping-mesh-objects/) of [lines](https://threejs.org/docs/#api/en/objects/Line). As of late I have also been playing around with tube geometry, which requires passing a [curve](/2022/06/17/threejs-curve/) as the first argument when making the geometry. 

This example however will just be a project in which I continued with my last [threejs example](/2022/06/03/threejs-examples-lines-sphere-circles/) that also had to do with creating a group of lines. However the goal with the older example was just to create a group of lines that form a sphere of sorts, and then mutate things from there. With this example what I wanted to do is make a similar system of sorts, but to make it so that a group of lines that form a sphere is just one of many options. So in other words this is just a general kind of system for a group of lines that can be set into all kinds of various states beyond just that of a sphere like shape.

<!-- more -->

## This Deterministic line group module threejs example and what to know first

This is one of many threejs example that I have made after acquiring a fair amount of experience before hand with threejs as well as with javaScript in general. So in other words this is not a post for developers that might be [new to threejs](/2018/04/04/threejs-getting-started/) and client side javaScript in general. As such I will not be getting into every basic little thing about the library and language that you should know before hand. However I do still use these opening sections to cover a few things that you might want to read up more on before continuing with the rest of this post.

### Read up more on lines and line materials

The module that I have made that I am writing about can be used to create an instance of a threejs group where each child of the group is an [instance of a line](/2018/04/19/threejs-line). A line in threejs is one alternative to that of the typical [mesh object](/2018/05/04/threejs-mesh/) that is used to add content to an over all scene object. What is nice about lines is that when making a custom geometry I just have to worry about the position attribute of the geometry and that is it. There is also things like the index of the position attribute and also with lines the order of the points is of concern, but I do not have to care so much about the additional values that are needed when making geometry to be used with a mesh object and the various mesh materials.

### Check out more on the buffer geometry class

One major aspect of this module has to do with setting and updating the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of an instance of [buffer geometry](/2021/04/22/threejs-buffer-geometry/) using the set from points method as well as an alternative method that is better for updating the geometry rather than creating it for the first time.

### Source code is also up on Github

The source code that I am writing about here can also be [found on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lines-deterministic) along with the source for my many other threejs example thus far.

### Version numbers matter

When I wrote this post I was using r140 of threejs and the code in this post as working fine for me on my end with that revision of threejs.

## 1 - First version of the line group module and some plug-ins for types

In this section I will be going over the source code of the line group module that helps me with the process of creating and updating a collection of lines that are children of a group. In additional to the module itself I have also worked out a few types as I am calling them thus far when it comes to objects that define the logic for creating an updating the state of a group of lines. In the module itself I have a single built in line group type to mainly serve as a guide when knowing how to go about making a custom line group for the module.

### 1.1 - The line group module itself

The Line group module itself has a create, load, and set public methods thus far. The create method is what I call to create a new line group, the load methods is what I use to load a type of line group, and the set method is what to use to update the state of a line group with a given set of frame, maxFrame, and base data values to set the state of the line group.

```js
//******** **********
// Lines Grpoup module - ( r0 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LineGroup = (function(){
    var DEFAULT_FORLINESTYLE = function(m, i){
        m.linewidth = 4;
        m.color = new THREE.Color( ['red', 'lime', 'white', 'blue', 'purple'][ i % 5] );
    };
    //******** **********
    // BUILT IN TYPE(S)
    //******** **********
    var TYPES = {};
    // just a 'tri' built in type will be built in for now to mainly serve as an example
    // on how to make custom types built into the module itself
    TYPES.tri = {
        key: 'tri',
        // default options such as the number of lines, and how many points per line
        // these are options that should be given just once when creating the line group
        opt: {
            lineCount: 3,
            pointsPerLine: 80,
            forLineStyle: function(m, i){
                m.linewidth = 4;
                m.color = new THREE.Color( 'lime' );
            }
        },
        // base data for the lines that can be changed when calling set method these are then
        // values that define starting conditions for a determinstic animation
        baseData:{
            // the three home vectors to use that define the starting positions
            // of the three Vectors of the triangle
            homeVectors: [
                new THREE.Vector3(3, 0, 0),
                new THREE.Vector3(-3, 0, 3),
                new THREE.Vector3(-3, 0, -3)
            ],
            lerpVectors: [],
            rBase: 2,
            rDelta: 8
        },
        // called just once in LineGroup.create before lines are created, this can be used to
        // generate options once rather than on a frame by frame basis
        create: function(opt, lineGroup){
        },
        // for frame method used to set the current 'state' with 'baseData', and 'frameData' objects
        forFrame : function(state, baseData, frameData, lineGroup){
            var ud = lineGroup.userData;
            var i = 0, len = ud.opt.lineCount;
            // for this tri type I want to create an array of three Vectors
            // based on the home vectors of the base data
            state.vectors = [];
            state.t = 1 - frameData.bias;
            state.rCount = baseData.rBase + baseData.rDelta * frameData.bias;
            while(i < len){
                var v = state.vectors[i] = new THREE.Vector3();
                var hv = baseData.homeVectors[i] || new THREE.VEctor3();
                var lv = baseData.lerpVectors[i] || new THREE.Vector3();
                v.copy(hv).lerp(lv, frameData.bias)
                i += 1;
            }
        },
        // create/update points of a line in the line group with 'current state' object
        forLine : function(points, state, lineIndex, lineCount, lineGroup){
            var ud = lineGroup.userData;
            var i = 0, len = ud.opt.pointsPerLine;
            // start and end points
            var vs = state.vectors[lineIndex],
            ve = state.vectors[ (lineIndex + 1) % 3 ];
            while(i < len){
                var pPer = i / (len - 1),
                pBias = 1 - Math.abs(0.5 - pPer) / 0.5;
                var v1 = new THREE.Vector3();
                var dx = 0,
                dy = 3 * Math.cos( Math.PI * state.rCount *  pBias) * state.t,
                dz = 0;
                v1.copy(vs).lerp( ve, i / ( len - 1 ) ).add(new THREE.Vector3(dx, dy, dz));
                points[i].copy(v1);
                i += 1;
            }
        }
    };
    //******** **********
    // PUBLIC API
    //******** **********
    var api = {};
    // create a type
    api.create = function(typeKey, opt){
        typeKey = typeKey || 'tri';
        typeObj = TYPES[typeKey];
        // make the line group
        var lineGroup = new THREE.Group();
        // the opt object
        // use given option, or default options to create an opt object
        opt = opt || {};
        Object.keys( typeObj.opt ).forEach(function(key){
            opt[key] = opt[key] || typeObj.opt[key]; 
        });
        // create blank points
        var groupPoints = [];
        var lineIndex = 0;
        while(lineIndex < opt.lineCount){
            var pointIndex = 0;
            var points = [];
            while(pointIndex < opt.pointsPerLine){
                points.push( new THREE.Vector3() )
                pointIndex += 1;
            }
            groupPoints.push(points);
            lineIndex += 1;
        }
        // user data object
        var ud = lineGroup.userData; 
        ud.typeKey = typeKey;
        ud.opt = opt;
        ud.groupPoints = groupPoints;
        ud.forLineStyle = opt.forLineStyle || DEFAULT_FORLINESTYLE;
        // call create hook
        typeObj.create(opt, lineGroup);
        // call set for first time
        api.set(lineGroup, 0, 30, {});
        return lineGroup;
    };
    // load a type
    api.load = function(typeObj){
        typeObj.baseData = typeObj.baseData || {}; 
        TYPES[typeObj.key] = typeObj;
    };
    // set a line group with the given frame, maxFrame, and initState
    api.set = function(lineGroup, frame, frameMax, baseData){
        var ud = lineGroup.userData,
        typeKey = ud.typeKey,
        typeObj = TYPES[typeKey];
        // parse baseData
        baseData = ud.baseData = baseData || {};
        Object.keys( typeObj.baseData ).forEach(function(key){
            baseData[key] = baseData[key] === undefined ? typeObj.baseData[key]: baseData[key]; 
        });
        // state object
        var state = {};
        // frame data object
        var frameData = {
            frame: frame,
            frameMax: frameMax
        };
        frameData.per = frameData.frame / frameData.frameMax;
        frameData.bias = 1 - Math.abs(0.5 - frameData.per) / 0.5;
        // call for frame method of type to update state object
        typeObj.forFrame(state, baseData, frameData, lineGroup);
        // create or update lines
        ud.groupPoints.forEach(function(points, lineIndex){
            // call for line to update points
            typeObj.forLine(points, state, lineIndex, ud.opt.lineCount, lineGroup);
            // get current line            
            var line = lineGroup.children[lineIndex];
            // no line? create and add it
            if( !line ){
                // create and add the line
                var geo = new THREE.BufferGeometry();
                // calling set from points once, when making the line
                // for the first time should work okay
                geo.setFromPoints(points);
                // create the line for the first time
                line = new THREE.Line(geo, new THREE.LineBasicMaterial());
                // !?!? Using the add method is needed, but I might still need to make sure
                // that the index numbers are as they should be maybe...
                //lineGroup.children[lineIndex] = line;
                lineGroup.add(line);
            }
            // so then I have a line and I just need to update the position attribute
            // but I can not just call the set from points method as that will result in
            // a loss of context error
            var geo = line.geometry,
            pos = geo.getAttribute('position');
            points.forEach(function(v, i){
                pos.array[i * 3] = v.x;
                pos.array[i * 3 + 1] = v.y;
                pos.array[i * 3 + 2] = v.z;
            });
            pos.needsUpdate = true;
            ud.forLineStyle(line.material, lineIndex, ud)
            
        });
    };
    // return public API
    return api;
}());
```

### 1.2 - Circle stack plug-in

I made a number of external plug-ins while making the first version of this module in order to just test out that the loading method works as a way to pull logic that has to do with a specific line group out of the module and into an external optional file. This module turned out similar to what I worked out for my sphere circles example, but I was thinkging more in terms of just a stack of circles that I am chaining in a way that does not have to form a sphere like shape when it came to making this one.

```js
//******** **********
// Lines Group circleStack plug-in for line-group.js in the threejs-examples-lines-deterministic project
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load({
    key: 'circleStack',
    // default options such as the number of lines, and how many points per line
    opt: {
        lineCount: 5,
        pointsPerLine: 30
    },
    baseData:{
        radiusMax : 3,
        yDelta: 0.25,
        waveCount: 2
    },
    // called just once in LineGroup.create before lines are created
    create: function(opt, lineGroup){
    },
    // for frame method used to set the current 'state' with 'baseData', and 'frameData'
    forFrame : function(state, baseData, frameData, lineGroup){
        state.radius = [];
        state.yDelta = baseData.yDelta;
        // figure radius and other state values for each circle
        var ud = lineGroup.userData;
        var i = 0, len = ud.opt.lineCount;
        var rDiff = baseData.radiusMax - baseData.radiusMin;
        while(i < len){
            var radian = Math.PI * baseData.waveCount * ( ( 1 / len * i + frameData.per) % 1);
            state.radius[i] = Math.cos(radian) * baseData.radiusMax;
            i += 1;
        }
    },
    // create/update points of a line in the line group with 'current state' object
    forLine : function(points, state, lineIndex, lineCount, lineGroup){
         var ud = lineGroup.userData;
         var i = 0, len = ud.opt.pointsPerLine;
         while(i < len){
             var v1 = new THREE.Vector3();
             var cPer = i / (len - 1);
             var r = Math.PI * 2 * cPer; 
             v1.x = Math.cos(r) * state.radius[lineIndex];
             v1.z = Math.sin(r) * state.radius[lineIndex];
             v1.y = state.yDelta * lineIndex;
             points[i].copy(v1);
             i += 1;
         }
    }
});
```

### 1.2 - Sphere Circles plug-in

The whole idea of this project was to make a module that provides a way to create a more flexible from of what I worked out for my lines sphere circles example where the collection of lines that I made for that example is just one way to go about using the module. So then I should be able to just quickly create a plug-in that is more of less the same code that I worked out for that example as a plug-in for this line group module and sure enough here it is and it seems to work fine just far.

```js
//******** **********
// Lines Group sphereCircles plug-in for line-group.js in the threejs-examples-lines-deterministic project
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load({
    key: 'sphereCircles',
    // default options such as the number of lines, and how many points per line
    opt: {
        lineCount: 15,
        pointsPerLine: 30,
        forLineStyle: function(m, i){
            m.linewidth = 4;
            m.color = new THREE.Color( ['lime', 'cyan', 'green'][ i % 3] );
        }
    },
    baseData:{
        maxRadius: 4,
        yAdjust: 1,
        radiusAdjust: 0.25,
        r1: 1,
        r2: 1
    },
    // called just once in LineGroup.create before lines are created
    create: function(opt, lineGroup){
    },
    // for frame method used to set the current 'state' with 'baseData', and 'frameData'
    forFrame : function(state, baseData, frameData, lineGroup){
        state.circleCount = lineGroup.userData.opt.lineCount;
        state.maxRadius = baseData.maxRadius - baseData.maxRadius * baseData.radiusAdjust * frameData.bias;
        state.r1 = baseData.r1;
        state.r2 = baseData.r2;
        state.yAdjust = baseData.yAdjust * frameData.bias;
        // figure radius and other state values for each circle
        var ud = lineGroup.userData;
        var i = 0, len = ud.opt.lineCount;
        while(i < len){
            i += 1;
        }
    },
    // create/update points of a line in the line group with 'current state' object
    forLine : function(points, state, lineIndex, lineCount, lineGroup){
         var ud = lineGroup.userData;
         var i = 0, len = ud.opt.pointsPerLine;
        var s = {};
        s.sPer = (lineIndex + 0) / state.circleCount;
        s.radius = Math.sin( Math.PI * state.r1 * s.sPer ) * state.maxRadius;
        s.y = Math.cos( Math.PI * state.r2 * s.sPer ) * state.maxRadius * state.yAdjust;
        s.i = 0;
         while(i < len ){
            s.cPer =  i / ( len - 1 );
            s.radian = Math.PI * 2 * s.cPer;
            s.v = new THREE.Vector3();
            s.v.x = Math.cos(s.radian) * s.radius;
            s.v.y = s.y;
            s.v.z = Math.sin(s.radian) * s.radius;
             points[i].copy(s.v);
             i += 1;
         }
    }
});
```

### 1.3 - Main javaScript file

For the sake of this section then I now just want a little additional code that is a simple use case example of the built in line group type 'tri', as well as the two additional types that I have made thus far in the form of external fines to use with this module then.


```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES GROUP(s)
//******** **********
// built in 'tri' type
var lg1Base = {
    homeVectors: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
    ], 
    lerpVectors: [
        new THREE.Vector3(-5, 0, -5),
        new THREE.Vector3(-5, 0, 5),
        new THREE.Vector3(5, 0, 0)
    ],
    rBase: 0,
    rDelta: 2
};
var lg1 = LineGroup.create();
lg1.position.set(3, 0, 0);
lg1.scale.set(0.5, 0.5, 0.5)
scene.add(lg1);
// the 'circleStack' type
var lg2 = LineGroup.create('circleStack', { lineCount: 20 } );
lg2.position.set(-5, 0, -5);
scene.add(lg2);
// the 'sphereCircles' type base off my other lines example
var lg3 = LineGroup.create('sphereCircles', { } );
lg3.position.set(-5, 0, 5);
scene.add(lg3);
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
frameMax = 90;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // update line group (s)
        LineGroup.set(lg1, frame, frameMax, lg1Base);
        LineGroup.set(lg2, frame, frameMax, {});
        LineGroup.set(lg3, frame, frameMax, {});
        // render
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

## Conclusion

This lines group module is shaping up to be what it is that I had in mind when I started working on it, but I am not sure if I would want to put much more time into further refining this project or not. I am sure that I would if I end up using this on a day to day basis that goes without saying, but I am not sure if that will end up being the case with this project thus far. In the event that I do start using something like this all the time I am currently of the mindset that I might want to do so with yet another example that is similar to this one, only it will involve the use of TubeGeometry rather than that of lines. Also I might want to go so far as to even make custom geometry, but in other case use curves as a way to create the geometry that would then be used with mesh objects. 

There are a lot of things that I like about lines, but they do have there limitations. For one thing when it comes to setting the width of lines doing so will not work with all platforms. The main thing that I like to do with threejs is to make videos, so to address that I can just render my frames on platforms in which line thickness does work. However there is still just way more that can be done with mesh materials. However maybe I could still address some of these problems by making use of the [shader material](/2023/01/13/threejs-shader-material/).
