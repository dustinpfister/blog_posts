---
title: THREEJS Looping land animation using the Object grid wrap module
date: 2022-07-25 08:55:00
tags: [three.js]
layout: post
categories: three.js
id: 996
updated: 2022-07-15 10:12:57
version: 1.8
---

This week I took another look at my [object grid wrap module threejs example](/2022/05/20/threejs-examples-object-grid-wrap/) that I made a while ago, and when doing so I made some revised versions of that source code. While I was at it I thought I would start a [new threejs example project](/2021/02/19/threejs-examples/) that will be another javaScript file in which I am building on top of this object grid wrap module that is a way to create a grid with a collection of mesh objects that looks like some land in terms of terrain at least. 

When it comes to using this object grid wrap module I need to define a collection of source objects to clone for each grid location, so for this threejs example I am just creating a module that in part creates this collection of objects that incude mesh objects with built in [box geometry](/2021/04/26/threejs-box-geometry/) as well as [Extrude geometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) using [shapes](https://threejs.org/docs/#api/en/extras/core/Shape).

<!-- more -->

## The land object grid wrap module and what to know first

This is one of my many threejs example posts in which I am going over some source code for something that is the start of an actual project of some kind using threejs rather than just yet another simple demo of a threejs feature of one kind or another. So then this is not at all in any way a post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) or javaScript in general. So I will not be going over various threejs let alone javaScript basics here, however in this section I will be writing about a few things that you might want to read up more on before continuing with the rest of this post.

### Check out Shape and Extrude geometry if you have not done so

In this example I am using the threejs Shape constructor to create an instance of a 2d shape with the built in threejs shape class. I can then use one of these shape classes to create an instance of Extrude geometry that is just a 2d shape with a little depth added to it. For this project example this is what I am using to create mesh objects that will be slopes in the object grid that will resemble land. However this is of course something that you might want to read up more on in detail and with that said I wrote a [blog post on this subject of shapes and Extrude geometry in threejs](/2021/06/01/threejs-shape/).

### The source code here is also on Github

The source code that I am writing about here can also be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap-land). There is also the for [post folder for my object grid wrap module](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap) that I am working on top of that can also be found in that repository.

### Version Numbers matter

When I wrote this post I was testing out the source code here with r140 of threejs and everything was working okay on my end with that revision of threejs.


## 1 - Starting out with a single main javaScript file and a new opacity effect for the object grid wrap module

Like with many of my threejs example projects I often start out with a usual copy and paste cook book style block of code that sets up just a basic threejs scene object, camera, and renderer. I then just start writing some code that ends up being a crude yet effective starting point for the specific project idea in the main javaScript file. For this section I will then be writing about this main javaScript file that is the first version of what I want, and I will also be touching base on the source code of a new opacity effect plug in for revision 2 of my object grid wrap module.

### 1.1 - The main javaScript file

In the main javaScript file I have the usual set of objects that I am creating such as the scene object, camera, and renderer. On top ox this I am also setting up a few light sources as I will be going with the standard material when it comes to skinning the mesh objects that will be used in the grid.

To help with the process of creating the collection of source objects for the grid I have a few helper functions that I can use to quickly create the desired objects that will be coned for each grid location. So I have a make cube helper, and another helper function that will create each of the slope objects that I can work with when it comes to creating a land grid.

Now that I have my usual collection of threejs objects, and some helper functions for creating mesh objects, I can now create my grid object using the object grid wrap module. To do so I call the create method of the object grid wrap module, and pass an object containing all the options to use when setting up the grid. For the source objects I am of course calling the helper functions with the desired arguments for each object index. For now when it comes to creating the array of index values for each grid location I am just working out a array literal of primitives. On top of the source object index values I will also want to have an array of values that are the altitude values for each mesh object also, for this I am also working this out manually and just having arrays of primitives for these values as well.

When it comes to setting up some effects to use for this grid I am using opacity2 which is a new alternative to the original opacity effect that I made for the object grid wrap module that I made for this project. I will be getting into this in detail later in this section, but the basic idea is to have it so that opacity does not start to go down right away, but after a certain distance from the center of the grid.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 2, 4);
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05 ) )
 
//******** **********
// MESH OBJECTS
//******** **********
 
var MATERIAL_LAND = new THREE.MeshStandardMaterial({color: new THREE.Color('green')})
 
// MESH basic cube
var makeCube = function(size){
    size = size === undefined ? 1 : size;
    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size), 
        MATERIAL_LAND
    );
    return cube
};
 
// MAKE MESH SLOPE HELPER
var makeSlopeMesh = function(alphaR, size){
    alphaR = alphaR === undefined ? 0 : alphaR;
    size = size === undefined ? 1 : size;
    var shape_slope = new THREE.Shape();
    var hSize = size / 2;
    shape_slope.moveTo(hSize, hSize);
    shape_slope.lineTo(hSize * -1, hSize * -1);
    shape_slope.lineTo(hSize, hSize * -1);
    // geometry
    var geometry = new THREE.ExtrudeGeometry(shape_slope, {
        depth: size,
        bevelEnabled: false
    });
    geometry.computeBoundingBox();
    geometry.center();
    geometry.rotateY( Math.PI * 2 * alphaR );
    var slope = new THREE.Mesh( geometry, MATERIAL_LAND);
    return slope;
}
 
//******** **********
// GRID
//******** **********
 
var tw = 10,
th = 10,
space = 2;
var grid = ObjectGridWrap.create({
    spaceW: space + 0.05,
    spaceH: space + 0.05,
    tw: tw,
    th: th,
    dAdjust: 1.25,
    effects: ['opacity2'],
    sourceObjects: [
        makeCube(space),
        makeSlopeMesh(0.00, space),
        makeSlopeMesh(0.25, space),
        makeSlopeMesh(0.50, space),
        makeSlopeMesh(0.75, space)
    ],

    objectIndices: [
        0,4,0,0,0,0,0,0,0,0,
        1,0,3,0,0,0,0,0,0,0,
        1,0,3,0,4,4,4,4,0,0,
        0,2,0,4,0,0,0,0,4,0,
        0,0,1,0,0,0,4,0,0,3,
        0,0,1,0,0,1,0,3,0,3,
        0,0,0,2,0,0,2,0,0,3,
        0,4,0,0,1,0,0,0,2,0,
        1,0,3,0,1,0,0,3,0,0,
        0,2,0,0,0,2,2,0,0,0,
    ]
});
scene.add(grid);
 
// I will want to have some way to set altitude for each
// cloned mesh object in the gird
var altitude = [
        0,1,0,0,0,0,0,0,0,0,
        1,1,1,0,0,0,0,0,0,0,
        1,1,1,0,1,1,1,1,0,0,
        0,1,0,1,1,1,1,1,1,0,
        0,0,1,1,1,1,2,1,1,1,
        0,0,1,1,1,2,2,2,1,1,
        0,0,0,1,1,1,2,1,1,1,
        0,1,0,0,1,1,1,1,1,0,
        1,1,1,0,1,1,1,1,0,0,
        0,1,0,0,0,1,1,0,0,0,
];
grid.children.forEach(function(obj, i){
    var alt = altitude[i];
    obj.geometry = obj.geometry.clone();
    obj.geometry.translate(0, alt * space, 0)
});
// base position for whone grid
grid.position.set(0, 0.5, 0);
 
// adjust 'minB' value for opacity2 effect
grid.userData.minB = 0.3;
 
console.log(grid.userData)
 
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
    secs = (now - lt) / 1000,
    ud = grid.userData;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        // set position of the grid
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, 0 );
        // update grid by current alphas and effects
        ObjectGridWrap.update(grid);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

### 1.2 - The new opacity effect plug in

For this project example I made a new opacity effect plug in for r2 of my object grid wrap module that seems to be working great so far and as such I might make this part of a collection of standard effects for future revisions of the module. With my first opacity effect objects will begin to loose opacity from the very center of the grid, which more often than not is not what I want to happen when adding an opacity effect to projects that make use of the object grid wrap module. So then in this new opacity effect I am still doing more or less the same thing as with the first opacity effect it is just that now I have a way to set a value between 0 and 1 that will be the minimum remaining distance from center where opacity loss will start.

```js
/*********
 Opcaity2 effect for object-grid-wrap.js r2
*********/
(function(){
    // set opacity helper function
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
                if(obj.material instanceof Array){
                    obj.material.forEach(function(m){
                        m.transparent = true;
                        m.opacity = alpha;
                    });
                }else{
                    obj.material.transparent = true;
                    obj.material.opacity = alpha;
                }
            }
        });
    };
    ObjectGridWrap.load( {
        EFFECTS : {
            // opacity2 works by only lowering the alpha value once objData.b value
            // is lower than of equal to a min value such as 0.25. A 'minB' value of the 
            // userData object of the grid can be used to change this
            opacity2 : function(grid, obj, objData, ud){
                var minB = grid.userData.minB === undefined ? 0.5: grid.userData.minB;
                if(objData.b <= minB){
                   var alpha = objData.b / minB;
                   alpha = alpha < 0 ? 0 : alpha;
                   // using Math.pow for smoother change
                   alpha = Math.pow(1.75, 8 * alpha) / Math.pow(1.75, 8)
                   setOpacity(obj, alpha);
                }else{
                   setOpacity(obj, 1);
                }
            }
        }
    } );
}());
```