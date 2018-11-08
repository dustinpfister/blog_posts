---
title: Fat width lines in three.js
date: 2018-11-07 17:52:00
tags: [js,three.js]
layout: post
categories: three.js
id: 324
updated: 2018-11-08 07:26:59
version: 1.6
---

When playing around with lines in [three.js](https://threejs.org/) it would be nice to set the width of lines. Although there is a linewidth property of the lineBasicMaterial, on most platforms any width other than the default value of 1 will not work anyway. However looking over the examples at the three.js site there are some official additional resources that can be used to make think lines that seems to work just fine.

<!-- more -->

## 1 - What to know

This is a post on using some additional assets with three.js to make fat lines, or lines that have a thickness larger than that of one pixel. This is not a getting started post with three.js, or javaScript in general so I trust that yo have at least some experience with these things before hand.

### 1.1 - Version numbers matter

In this post I was using [three.js r98](https://github.com/mrdoob/three.js/tree/r98) that was released on October 31 2018.

### 1.2 - The demos here require more than just three.js

In this post on top of the usual three.js file, I am also using some additional files that can be found in the [examples\/js\/lines](https://github.com/mrdoob/three.js/tree/r98/examples/js/lines) folder of the three.js git hub folder. These files bring additional constructors that are not present in three.js bu itself.

So afetr loading three.js, load the additional files that are fond in the lines folder of the three.js github repository as well.

```html
<script src="/js/three.min.js"></script>
<script src="/js/linesegmentsgeometry.js"></script>
<script src="/js/linegeometry.js"></script>
<script src="/js/linematerial.js"></script>
<script src="/js/linesegments2.js"></script>
<script src="/js/line2.js"></script>
```

## 2 - Creating some fat lines with three.js

So once I have all the files I need downloaded and linked to with scrips tags in my html it is time to make use of them. In this example I made a few helper methods that make use of the classes that are added to Three.js with the additional files. 

If it is any additional help I also based this example off of one of the three.js examples on making fat lines as well.


## 2.1 - The createFatLineGemomety helper


```js
var createFatLineGeometry = function (opt) {
 
    opt = opt || {};
    opt.forPoint = opt.forPoint || function (i, per) {
        return {
            x: i * 5,
            y: 0,
            z: 0
        }
    };
    opt.ptCount = opt.ptCount === undefined ? 20 : opt.ptCount;
    opt.colorSolid = opt.colorSolid === undefined ? false : opt.colorSolid;
    opt.color = opt.color === undefined ? new THREE.Color(0xffffff) : opt.color;
 
    // Position and Color Data
    var positions = [],
    colors = [],
    i = 0,
    point,
    geo;
 
    // for each point
    while (i < opt.ptCount) {
 
        // push point
        point = opt.forPoint(i, i / opt.ptCount);
        positions.push(point.x, point.y, point.z);
 
        // push color
        if (!opt.colorSolid) {
            opt.color.setHSL(i / opt.ptCount, 1.0, 0.5);
        }
        colors.push(opt.color.r, opt.color.g, opt.color.b);
 
        i += 1;
    }
 
    // return geo
    geo = new THREE.LineGeometry();
    geo.setPositions(positions);
    geo.setColors(colors);
    return geo;
 
};
```

## 2.1 - The cretaeFatLine helper

```js
var createFatLine = function (opt) {
 
    opt = opt || {};
    opt.width = opt.width || 5;
 
    // LINE MATERIAL
    var matLine = new THREE.LineMaterial({
            linewidth: opt.width, // in pixels
            vertexColors: THREE.VertexColors
        });
    matLine.resolution.set(320, 240);
 
    var line = new THREE.Line2(opt.geo, matLine);
 
    return line;
 
};
```

### 2.2 - Pull it all together

```js
(function () {
 
    // RENDER
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(-40, 0, 60);
 
    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // CREATE FAT LINE
    var line = createFatLine({
            width: 8,
            geo: createFatLineGeometry({
                ptCount: 80,
                colorSolid: true,
                color: new THREE.Color(0x00ff00),
                forPoint: function (i, per) {
                    return {
                        x: i * 1.5,
                        y: Math.cos(Math.PI * 4 * (per)) * 10,
                        z: Math.sin(Math.PI * 4 * (per)) * 10
                    }
                }
            })
        });
 
    scene.add(line);
 
    // CREATE ANOTHER FAT LINE
    line = createFatLine({
            width: 10,
            geo: createFatLineGeometry()
        });
    scene.add(line);
 
    // LOOP
    var loop = function () {
 
        requestAnimationFrame(loop);
 
        // main scene
        renderer.setClearColor(0x000000, 0);
        renderer.setViewport(0, 0, 320, 240);
 
        // renderer will set this eventually
        renderer.render(scene, camera);
        renderer.setClearColor(0x222222, 1);
        renderer.clearDepth();
 
    };
 
    loop();
 
}
    ());
```
