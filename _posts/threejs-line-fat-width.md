---
title: Fat width lines in three.js
date: 2018-11-07 17:52:00
tags: [js,three.js]
layout: post
categories: three.js
id: 324
updated: 2021-06-07 14:48:37
version: 1.19
---

When playing around [with lines](/2018/04/19/threejs-line/) in [three.js](https://threejs.org/) it would be nice to set the width of lines to a thickness greater than that of one. That is that although there is a line width property of the [Line Basic Material](https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial), on most platforms, in fact all platforms I think, any width other than the default value of 1 will not work anyway. So it would seem that I am just stuck with having to just have a thickness of 1 when it comes to drawing lines in threejs. However there is not just thinking in terms of drawing a line in space, but drawing a tube like structure in space. When doing so I should be able to use THREE.Mesh, rather than TREE.Line, and then make the radius of this tubing any thickness that I want right?

However looking over the examples at the three.js site there are some official additional resources that can be used to make thick lines that seems to work just fine. The only thing about it is that these features are not built into the core of the three.js library itself. They must be added to a project as an additional external file alone with threejs, however once added to the stack the feature seems to work pretty good.

<!-- more -->

## 1 - What to know

This is a post on using some additional assets with three.js to make fat lines, or lines that have a thickness larger than that of one which seems to be a limitation when working with Lines and the line basic material as a way to draw lines in 3d space using threejs and a little javaScript. This is not a [getting started post with three.js](/2018/04/04/threejs-getting-started/), or javaScript in general so I trust that yo have at least some experience with these things before hand.

### 1.1 - Version numbers matter

In this post I was using [three.js r98](https://github.com/mrdoob/three.js/tree/r98) that was released on October 31 2018, and the last time I did a little editing of this post I was using r127 of three.js and it would seem that this example is still working on that later version of three.js.

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

If it is any additional help I also based this example off of one of the three.js examples on [making fat lines](https://github.com/mrdoob/three.js/blob/master/examples/webgl_lines_fat.html). That example makes use of some more additional assets from the lines folder of the three.js repository. What I did here though is break things down into helpers to make things a little more fine grain, and cover each method in detail in order to help explain things better. When making your own example you might choose to do the same, improving on this, or just simply making it different in some way.


## 2.1 - The createFatLineGemomety helper

So for my first helper I made something that will create geometry using the LineGeometry file that I added to the project along with three.js. This method accepts a method that will be called for each point in the line. When the method is called for a point it is passed the current point index, and a percentage that I can then use when defining the x, y ,a and z values for the given point.

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

This helper makes use of a geometry made with the createFatLineGemomety helper, using it with a material made with the LineMaterial class to return an instance of Line2.

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

So now that I have my two helper methods I can now use them in a project. Here I created a three.js project using the WebGLRenderer, and append the dom element of the renderer to an element in my html. I then create a scene, and a camera as well like normal. In addition I also am using the official [three.js orbit controls](/2018/04/13/threejs-orbit-controls/) in this post as well, which is another external file that can be added to a project.

When using the createFatLine helper I then also call my createFatLineGeometry helper as well which will create and return the geometry for the line with the forPoint method that I give the helper. In this example I made one Fat line using a formula that I worked out that results in a spiral like line, and another that results in just a strait line.

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

## 3 - Conclusion

So the process of making fat lines in three.js is a little complicated, but with a little will power it is not to hard to find a work around. If you enjoyed reading this post you might want to check out [my many other posts on three.js](/categories/three-js/). Also if you have any questions of concerns be sure to let me know in the comments, The more feedback I receive the more inclined I will be to get around to expanding the content on this post, and others like it. In any case thank you for reading and have fun with three.js.
