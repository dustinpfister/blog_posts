---
title: Fat Lines in threejs by making use of additional files
date: 2018-11-07 17:52:00
tags: [js,three.js]
layout: post
categories: three.js
id: 324
updated: 2023-06-07 08:24:26
version: 1.31
---

When playing around [with lines](/2018/04/19/threejs-line/) in [three.js](https://threejs.org/) it would be nice to set the width of lines to a thickness greater than that of one. That is that although there is a line width property of the [Line Basic Material](https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial), on most platforms, any width other than the default value of 1 will not work. I have found that it will work on some of the Linux systems that I would with, but on Windows, and I assume many others it will now work.

So it would seem that I am just stuck with having to just have a thickness of 1 when it comes to drawing lines in threejs. However there is not just thinking in terms of drawing a line in space, but drawing a tube like structure in space. When doing so I should be able to use [THREE.Mesh](/2018/05/04/threejs-mesh/), rather than [THREE.Line](/2018/04/19/threejs-line/), and then make the radius of this tubing any thickness that I want. There is the option of looking into using curves, and the Tube geometry class as a way to create something like that. However it would be nice to also have a way to draw lines in a way in which the thickness will work on most platforms.

Looking over the examples at the threejs site there are some official additional resources that can be used to make thick lines that seems to work just fine. The only thing about it is that these features are not built into the core of the threejs library itself. They must be added to a project as an additional external files along with threejs. However once added to the stack the feature seems to work pretty good from what I am seeing on my end.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/kIDK-4vpWtM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Fat lines in threejs and What to know first

This is a post on using some additional assets with threejs to make fat lines, or lines that have a thickness larger than that of one.  Not being ablble to set a width hoght than one with the built in lines of threejs seems to be a limitation when working with Lines, and the line basic material. This is not a [getting started post with threejs](/2018/04/04/threejs-getting-started/), or javaScript in general so I trust that yo have at least some experience with these things before hand. In any case in this section I will be going over a few quick key details that you should be aware of before containing to read the rest of this post.

### Take a look at curves and tube geomerty

These fat lines do seem to work okay, but I still run into limits with what can be done with the material that is used. For the most part it would seem that this just results in fat lines that will work on most if not all platforms by making use of a custom shader. In the long run it might be best to see about [using curves](/2022/06/17/threejs-curve/), and tube geometry as a way to draw 3d lines in space. What is nice about this is that it allows for me to use Mesh objects, and then therefrom mesh materials, and all that there is to work with when it comes to mesh materials.

### The demos here require more than just three.js

In this post on top of the usual three.js file, I am also using some additional files that can be found in the [examples\/js\/lines](https://github.com/mrdoob/three.js/tree/r140/examples/js/lines) folder of the three.js git hub folder. These files bring additional constructors that are not present in three.js by itself. Make sure that you are using the version of the files that corresponds to the revision number of threejs that you are using.

So after loading three.js, load the additional files that are fond in the lines folder of the three.js Github repository as well.

```html
<script src="/js/three.min.js"></script>
<script src="/js/linesegmentsgeometry.js"></script>
<script src="/js/linegeometry.js"></script>
<script src="/js/linematerial.js"></script>
<script src="/js/linesegments2.js"></script>
<script src="/js/line2.js"></script>
```

### Source code is on Github

The Source code exmaples in this [post can also be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-line-fat-width).

### Version numbers matter

When I first wrote this post I was using [three.js r91](https://github.com/mrdoob/three.js/tree/r91) that was released on March 18 2018. The last time I came around to do a little editing I started a new set of examples working with r140 of the library. It would seem that the files needed to have fat lines are still being supported which is great.

## 1 - Creating some fat lines with threejs and addtional files ( r140 )

In this section I will be writing about at least one of not more examples of these fat lines using r140 of threejs along with the addtional files needed for that revision.

### Once again be sure to download the addtional files for your revision and link to them

Once again these examples will not work with threejs alone, addtional files are needed. You will need to see somehting like this in your html then:

```html
<script src="/js/threejs/0.140.0/three.min.js"></script>
<script src="/js/threejs/0.140.0/controls/OrbitControls.js"></script>
<script src="/forpost/threejs-line-fat-width/js/r140/LineSegmentsGeometry.js"></script>
<script src="/forpost/threejs-line-fat-width/js/r140/LineGeometry.js"></script>
<script src="/forpost/threejs-line-fat-width/js/r140/LineMaterial.js"></script>
<script src="/forpost/threejs-line-fat-width/js/r140/LineSegments2.js"></script>
<script src="/forpost/threejs-line-fat-width/js/r140/Line2.js"></script>
<script src="/forpost/threejs-line-fat-width/s1-1-basic-r140/js/main.js"></script>
```

be sure to change the URLS as needed depending on your setup.

### 1.1 - Basic example of Fat lines ( r140 )

This time Around I would lik to start out with a very simple example with this. The general idea here is that I just need to create a geometry using the THREE.LineGeometry class that should now be a part of threejs when the above files are loaded. After that I can use the set positions method to define the points that will compose the fat line. I can then use the line material that is also added now as a way to create the material that is used for this kind of line. After that I then use the Line2 class that should also be there now as that is another one of the files that are added. I can then add the Line2 object to the scene just as with any other object3d based object and then render.



```js
(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LINE2
    //-------- ----------
    const geo = new THREE.LineGeometry();
    geo.setPositions([0,0,0, 0,3,0, -3,3,-5, -3,3,5, 0,0,5, 0,0,0]);
    const line_material = new THREE.LineMaterial({
        linewidth: 0.025,
        color: 0xff0000
    });
    const line = new THREE.Line2(geo, line_material);
    scene.add(line)
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

### 1.2 - Vertex colors

There is a set colors method of the line geometry that can be used as a way to set what the vertex colors should be for the geometry. This corresponds with the positions only it is r,g,b, rather than x,y,z. The values should be in 0 to 1 form for each color channel values as well.

```js
(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LINE2
    //-------- ----------
    const geo = new THREE.LineGeometry();
    geo.setPositions([0,0,0, 0,3,0, -3,3,-5, -3,3,5, 0,0,5, 0,0,0]);
    // use the set colors method an pass an array of color channel values
    // in the from of 0 to 1 values for each color channel (rgb)
    geo.setColors([0,1,0, 0,1,1, 0,0.5,0, 0,0.5,0.5, 0,0.25,0, 0,0.25,0.25]);
    // use vertex colors when setting up the material
    const line_material = new THREE.LineMaterial({
        linewidth: 0.025, vertexColors: true
    });
    const line = new THREE.Line2(geo, line_material);
    scene.add(line)
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 2 - Animation loop examples

For this Section I have a few examples where I aim to just make one or more animation loop examples for the sake of having a demo video for this post. It would seem that updating the state of the geometry as well as the vertex colors use for these kinds of lines is fairly easy. I can just call the set position method over and over again in a loop, and thus far it would seem that works fine for this sort of thing.

### 2.1 - Transition color

Here I just wanted to make a simple example where I Transition the values of the colors use for vertex colors. For this example the color array is set just once, and then the position array is what is updated over time. When it comes to setting the state of the position array I made a quick helper function that creates a kind of sin wave for the sake of just having something for the lines. Speaking of lines I made a group of line3 objects rather than just one for this animation loop example.

The end result of this is then a property cool looking effect and I am convinced that using vertex colors might be the best way to have at least some kind of sense of depth when using this sort of thing compared to suing something like tube geometry. With tube geometry I can use a mesh material such as the [phong](/2022/12/29/threejs-phong-material/) or standard material that will work with light sources in the scene. For this line material making use of vertex colors is how to keep what I have from just being a solid mas of color.
```js
(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create sin wave position array to use with the setPositions method
    const sinWave = (zStart, zEnd, x, waves, yMax, pointCount, radianOffset) => {
        const pos = [];
        let i = 0;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           const z = zStart - (zStart - zEnd) * a1;
           let r = Math.PI * 2 * waves * a1 + radianOffset;
           r = THREE.MathUtils.euclideanModulo(r, Math.PI * 2);
           const y = Math.sin(r) * yMax;
           pos.push(x, y, z);
           i += 1;
        }
        return pos;
    };
    // color trans
    const colorTrans = (color1, color2, pointCount) => {
        const colors = [];
        let i = 0;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           let r = color1.r * (1 - a1) + color2.r * a1;
           let g = color1.g * (1 - a1) + color2.g * a1;
           let b = color1.b * (1 - a1) + color2.b * a1;
           colors.push(r,g,b);
           i += 1;
        }
        return colors;
    }
    //-------- ----------
    // LINE2
    //-------- ----------
    // use vertex colors when setting up the material
    const line_material = new THREE.LineMaterial({
        linewidth: 0.025,
        vertexColors: true
    });
    const group = new THREE.Group();
    scene.add(group);
    let i = 0;
    const count = 7;
    while(i < count){
        const a_line = i / (count - 1);
        const geo = new THREE.LineGeometry();
        const colorArray = colorTrans( new THREE.Color(1,0,1 -a_line), new THREE.Color(a_line,1, 0), 80 );
        geo.setColors( colorArray);
        const line = new THREE.Line2(geo, line_material);
        group.add(line);
        i += 1;
    }
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        let i = 0;
        const count = group.children.length;
        while(i < count){
            const a_line = i / (count - 1);
            const a_line2 = 1 - Math.abs(0.5 - a_line) / 0.5;
            const line = group.children[i];
            const x = -5 + 10 * a_line;
            const yMax = 1 + 3 * a_line2;
            const radianOffset = Math.PI * 2 / count * i + Math.PI * 2 * a1; 
            line.geometry.setPositions( sinWave(5, -5, x, 4, yMax, 80, radianOffset) );
            i += 1;
        }
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
}
    ());
```


### 2.2 - Color Depth

This example is more or less the same outcome as the above example that I started this section with, however now I would like to have some depth for the colors by making use of a camera object to effect the state of the colors array. So on top of updating the position array over time I am now also updating the color array over time as well here. On top of that I am also using the state of the position array and how it compares to the position of a given camera as a way to effect the state of the vertex colors of the lines.

```js
(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, 2.5, 25);
    //camera.position.set(12, 12, 12);
    //camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create sin wave position array to use with the setPositions method
    const sinWave = (zStart, zEnd, x, waves, yMax, pointCount, radianOffset) => {
        const pos = [];
        let i = 0;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           const z = zStart - (zStart - zEnd) * a1;
           let r = Math.PI * 2 * waves * a1 + radianOffset;
           r = THREE.MathUtils.euclideanModulo(r, Math.PI * 2);
           const y = Math.sin(r) * yMax;
           pos.push(x, y, z);
           i += 1;
        }
        return pos;
    };
    // color trans
    const colorTrans = (color1, color2, posArray, camera) => {
        const colors = [];
        let i = 0;
        const pointCount = posArray.length / 3;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           // raw color values
           let r = color1.r * (1 - a1) + color2.r * a1;
           let g = color1.g * (1 - a1) + color2.g * a1;
           let b = color1.b * (1 - a1) + color2.b * a1;
           // vector3 in pos Array
           let v3 = new THREE.Vector3( posArray[i], posArray[i + 1], posArray[i + 2] );
           const d = v3.distanceTo(camera.position);
           let a_d = 0;
           if(d >= camera.near && d <= camera.far){
                a_d = 1 - 1 * (d - camera.near) / ( camera.far - camera.near );
           }
           colors.push(r * a_d, g * a_d, b * a_d);
           i += 1;
        }
        return colors;
    };
    // update line group
    const updateLine2Group = (l2Group, camera, a1 ) => {
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        let i = 0;
        const count = l2Group.children.length;
        const pointCount = 120;
        while(i < count){
            const a_line = i / (count);
            const a_line2 = 1 - Math.abs(0.5 - a_line) / 0.5;
            const line = l2Group.children[i];
            const x = -5 + 10 * a_line;
            const yMax = 1 + 3 * a_line2;
            const radianOffset = Math.PI * 2 / count * i + Math.PI * 2 * a1;
            const posArray = sinWave(5, -5, x, 4, yMax, pointCount, radianOffset);
            line.geometry.setPositions( posArray );
            // color
            const c1 = new THREE.Color(1,0,1 - a_line);
            const c2 = new THREE.Color(a_line, 1, 0);
            const colorArray = colorTrans( c1, c2, posArray, camera );
            line.geometry.setColors( colorArray );
            i += 1;
        }
    };
    const createLine2Group = (count) => {
        const group = new THREE.Group();
        scene.add(group);
        let i = 0;
        while(i < count){
            const a_line = i / (count - 1);
            const geo = new THREE.LineGeometry();
            // use vertex colors when setting up the material
            const line_material = new THREE.LineMaterial({
                linewidth: 0.05, //0.05 - 0.025 * a_line,
                vertexColors: true
            });
            const line = new THREE.Line2(geo, line_material);
            group.add(line);
            i += 1;
        }
        return group;
    };
    //-------- ----------
    // LINE2
    //-------- ----------
    const group = createLine2Group(10);
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
    const campos1 = new THREE.Vector3(15, 15, 15);
    const campos2 = new THREE.Vector3(-5, 5, 5);
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        camera.position.copy(campos1).lerp(campos2, a2);
        camera.lookAt(0, 0, 0);
        updateLine2Group(group, camera, a1 * 4 % 1);
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
}
    ());
```

## 3 - Creating some fat lines with threejs and addtional files ( r91 )

So once I have all the files I need downloaded and linked to with scrips tags in my html it is time to make use of them. In this example I made a few helper methods that make use of the classes that are added to Three.js with the additional files. 

If it is any additional help I also based this example off of one of the three.js examples on [making fat lines](https://github.com/mrdoob/three.js/blob/master/examples/webgl_lines_fat.html). That example makes use of some more additional assets from the lines folder of the three.js repository. What I did here though is break things down into helpers to make things a little more fine grain, and cover each method in detail in order to help explain things better. When making your own example you might choose to do the same, improving on this, or just simply making it different in some way.


## 3.1 - The createFatLineGemomety helper

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

## 3.2 - The cretaeFatLine helper

This helper makes use of a geometry made with the create Fat Line Geometry helper, using it with a material made with the Line Material class to return an instance of the Line2 class. This is just so I can have a way to just quickly create and return a complete ready to go instance of the Line2 class with a material and given geometry.

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

### 3.3 - Pull it all together

So now that I have my two helper methods I can now use them in a project. Here I created a three.js project using the WebGLRenderer, and append the dom element of the renderer to an element in my html. I then create a scene, and a camera as well like normal. In addition I also am using the official [three.js orbit controls](/2018/04/13/threejs-orbit-controls/) in this post as well, which is another external file that can be added to a project.

When using the createFatLine helper I then also call my createFatLineGeometry helper as well which will create and return the geometry for the line with the forPoint method that I give the helper. In this example I made one Fat line using a formula that I worked out that results in a spiral like line, and another that results in just a strait line.

```js
(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(15, 15, 15);
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
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
    var createFatLine = function (opt) {
        opt = opt || {};
        opt.width = opt.width || 5;
        // LINE MATERIAL
        var matLine = new THREE.LineMaterial({
            linewidth: opt.width, // in pixels
            color: 0xff0000
            //vertexColors: THREE.VertexColors
        });
        matLine.trasparent = true;
        matLine.opacity = 0.4;
        matLine.resolution.set(320, 240);
        var line = new THREE.Line2(opt.geo, matLine);
        return line;
    };
    //-------- ----------
    // FAT LINES
    //-------- ----------
    // CREATE FAT LINE
    var line = createFatLine({
            width: 10,
            geo: createFatLineGeometry({
                ptCount: 80,
                colorSolid: true,
                color: new THREE.Color(0x00ff00),
                forPoint: function (i, per) {
                    return {
                        x: i * 0.1,
                        y: Math.cos(Math.PI * 4 * (per)) * 5,
                        z: Math.sin(Math.PI * 4 * (per)) * 2.5
                    }
                }
            })
        });
    scene.add(line);
    // CREATE ANOTHER FAT LINE
    var line2 = createFatLine({
            width: 10,
            geo: createFatLineGeometry({
                ptCount: 2
            })
        });
    scene.add(line2);
    //-------- ----------
    // CONTROLS
    //-------- ----------
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //-------- ----------
    // LOOP
    //-------- ----------
    var loop = function () {
        requestAnimationFrame(loop);
        // main scene
        renderer.setClearColor(0x000000, 0);
        renderer.setViewport(0, 0, 640, 480);
        // renderer will set this eventually
        renderer.render(scene, camera);
        renderer.setClearColor(0x222222, 1);
        renderer.clearDepth();
    };
    loop();
}
    ());
```


## 3 - Basic Tube Geometry Example \( r152 demo \)

Although The Fat Line with add on will work okay, and help at address the problems with THREE.Line where line width will not work on all platforms, there is also [THREE.TubeGeometry](/2023/06/02/threejs-tube-geometry/). What is great about TubeGeometry is that the geometry that is created with it can be used with mesh objects. So not only can a solid color, and vertex coloring be used, but all features of all mesh materials. One draw back though is that a curve is what is needed as the first argument, so one will need to learn at least a thing or two about curves in other to make use of these.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 1, 1);
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(-5,0,0);
const v_end = new THREE.Vector3(5,0,0);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-4,3,-5) );
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.4;
const radial_segments = 16;
const closed = false;
const geometry = new THREE.TubeGeometry(curve, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
// grid
scene.add( new THREE.GridHelper(10, 10) );
// light
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(7, -1.5, 3);
scene.add(dl);
// mesh
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5.5, 2, 5.25);
camera.lookAt(2, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

So the process of making fat lines in three.js is a little complicated, but with a little will power it is not to hard to find a work around. There are a number of other great features that can be worth with in my own projects that exist in the examples folder of the official threejs github repository, such as orbit and [fly controls](/2021/05/05/threejs-fly-controls/) just to name a few of the features to worth with there.

If you enjoyed reading this post you might want to check out [my many other posts on three.js](/categories/three-js/). Also if you have any questions of concerns be sure to let me know in the comments, The more feedback I receive the more inclined I will be to get around to expanding the content on this post, and others like it. In any case thank you for reading and have fun with three.js.
