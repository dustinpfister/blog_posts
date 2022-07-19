---
title: THREEJS Looping land animation using the Object grid wrap module
date: 2022-07-25 08:55:00
tags: [three.js]
layout: post
categories: three.js
id: 996
updated: 2022-07-19 10:31:57
version: 1.14
---

This week I took another look at my [object grid wrap module threejs example](/2022/05/20/threejs-examples-object-grid-wrap/) that I made a while ago, and when doing so I made some revised versions of that source code. While I was at it I thought I would start a [new threejs example project](/2021/02/19/threejs-examples/) that will be another javaScript file in which I am building on top of this object grid wrap module that is a way to create a grid with a collection of mesh objects that looks like some land in terms of terrain at least. 

When it comes to using this object grid wrap module I need to define a collection of source objects to clone for each grid location, so for this threejs example I am just creating a module that in part creates this collection of objects that include mesh objects with built in [box geometry](/2021/04/26/threejs-box-geometry/) as well as [Extrude geometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) using [shapes](https://threejs.org/docs/#api/en/extras/core/Shape).

<!-- more -->

## The land object grid wrap module and what to know first

This is one of my many threejs example posts in which I am going over some source code for something that is the start of an actual project of some kind using threejs rather than just yet another simple demo of a threejs feature of one kind or another. So then this is not at all in any way a post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) or javaScript in general. So I will not be going over various threejs let alone javaScript basics here, however in this section I will be writing about a few things that you might want to read up more on before continuing with the rest of this post.

<iframe class="youtube_video" src="https://www.youtube.com/embed/CFFCF6lGmHc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

## 2 - Stand alone object grid wrap land module ( r2 )

After working out the crude basic idea of what I want to get done I now just need to create a new javaScript file in which I am taking what I worked out in the main javaScript file and turn it into a stand alone javaScript file. This way I can take this land module with me from project to project just like with the other javaScript file assets that I am working on top of with the object grid module itself, and the additional effect file that I made.

At the time of this writing I all ready complicated two revisions of this land module that works on top of my object grid module, so in this section I will be writing about what I have done thus far with r2 of the land module. So then I will also be covering all of the features that I started in r1 of the module as well in this section.


### 2.1 - The object grid wrap land javascript file

The main method of interest with this module is the create method which is what I will be calling in my main javaScript file to create a land grid. In the body of this create function I will in turn also be calling the create method of my object grid wrap module, so the main thing about this create method is to just set up the proper options, and do any additional custom work after creating the grid that needs to get done. 

The main thing that needs to get done after creating the grid then is to adjust the geometry of each tile in the gird so that each land tile grid mesh geometry is set at a desired altitude. This is done by looping over each tile in the grid and using the clone method of the buffer geometry class to clone a copy of the geometry for the mesh, and then using the translate method of the geometry to set the proper altitude that is set by way of an additional option that is given when calling the create method.

As of r2 of the land module I have added support for built in data textures for the various land mesh objects that are created for the source objects array that is used when creating the grid. This way I can quickly get up and running making a custom land scene and not bother adding textures for the land tiles as they are all ready there to begin with by default. However I might still want to call this set data textures public method when creating the grid in the main javaScript file to make it so that there is more than one texture that is used.

```js
//******** **********
// ObjectGridWrap module land module - r2
//******** **********
var ObjectGridWrapLand = (function(){
    // public API
    var api = {};
    // make data texture helper
    var makeDataTexture = function(width, height, vHigh, vLow){
        var size = width * height;
        var data = new Uint8Array( 4 * size );
        for ( let i = 0; i < size; i ++ ) {
            var stride = i * 4;
            var v = Math.floor( vLow + THREE.MathUtils.seededRandom() * ( vHigh - vLow ) );
            data[ stride ] = v;
            data[ stride + 1 ] = v;
            data[ stride + 2 ] = v;
            data[ stride + 3 ] = 255;
        }
        var texture = new THREE.DataTexture( data, width, height );
        texture.needsUpdate = true;
        return texture;
    };
    // default material for land mesh objects
    var MATERIAL_LAND = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color('green'), 
        map: makeDataTexture(16, 16, 120, 255)
    });
    //******** **********
    // MESH OBJECTS
    //******** **********
    // MESH basic cube
    var makeCube = function(material, size){
        size = size === undefined ? 1 : size;
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size), 
            material
        );
        // not a slope
        cube.userData.isSlope = false;
        cube.userData.isCorner = false;
        cube.userData.isInvert = false;
        return cube
    };
    // MAKE MESH SLOPE HELPER
    var makeSlopeMesh = function(material, size, alphaR){
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
        // uv fix ( ceil values like 0.97... to 1 )
        var uv = geometry.getAttribute('uv');
        uv.array.forEach(function(n, i){
            uv.array[i] = Math.ceil(n);
            uv.array[i] = uv.array[i] < 1 ? 0 : 1;
        });
        uv.needsUpdate = true;
        geometry.computeBoundingBox();
        geometry.center();
        geometry.rotateY( Math.PI * 2 * alphaR );
        var slope = new THREE.Mesh( geometry, material);
        // is a slope
        slope.userData.isSlope = true;
        slope.userData.isCorner = false;
        slope.userData.isInvert = false;
        return slope;
    }
    // MAKE CORNER MESH HELPER
    var makeCornerMesh = function(material, size, alphaR, invert){
        alphaR = alphaR === undefined ? 0 : alphaR;
        size = size === undefined ? 1 : size;
        invert = invert || false;
        var geometry = new THREE.PlaneGeometry(size, size, 1, 1);
        // get pos attribute
        var pos = geometry.getAttribute('position');
        if(invert){
            [5,8,11].forEach(function(i){
                pos.array[i] = size;
            })
        }else{
            pos.array[2] = size;
 
        }
        pos.needsUpdate = true;
        geometry.computeVertexNormals();
        // rotate and translate
        geometry.rotateX( Math.PI * 1.5 );
        geometry.translate(0, size / 2 * -1 ,0);
        geometry.rotateY( Math.PI * 2 * alphaR);
        var corner = new THREE.Mesh( geometry, material);
        // not a slope
        corner.userData.isSlope = true;
        corner.userData.isCorner = true;
        corner.userData.isInvert = invert;
        return corner;
    };
    //******** **********
    //  CREATE METHOD
    //******** **********
    api.create = function(opt){
        opt = opt || {};
        opt.crackSize = opt.crackSize === undefined ? 0.1 : opt.crackSize;
        opt.tw = opt.tw === undefined ? 4: opt.tw;
        opt.th = opt.th === undefined ? 2: opt.th;
        opt.dAdjust = opt.dAdjust === undefined ? 1.20: opt.dAdjust;
        var space = opt.space = opt.space === undefined ? 2: opt.space;
        opt.effects = opt.effects || ['opacity2'];
        opt.MATERIAL_LAND = opt.MATERIAL_LAND || MATERIAL_LAND;
        var meshSize = space - opt.crackSize;
        opt.sourceObjects = [
            makeCube(opt.MATERIAL_LAND, meshSize),
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.00),
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.25),
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.50),
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.75),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.00),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.25),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.50),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.75),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.00, true),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.25, true),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.50, true),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.75, true)
        ];
        opt.objectIndices = opt.objectIndices || [
            0,0,1,3,
            0,0,1,3
        ];
        var grid = ObjectGridWrap.create(opt);
        // I will want to have some way to set altitude for each
        // cloned mesh object in the gird
        var altitude = opt.altitude || [
            0,0,1,1,
            0,0,1,1
        ];
        grid.children.forEach(function(obj, i){
            var alt = altitude[i];
            obj.geometry = obj.geometry.clone();
            obj.geometry.translate(0, alt * space, 0)
        });
        // base position for whone grid
        grid.position.set(0, 0.5, 0);
        var ud = grid.userData; 
        // adjust 'minB' value for opacity2 effect
        ud.minB = 0.3;
        ud.space = opt.space;
        ud.tw = opt.tw;
        ud.th = opt.th;
        ud.opt = opt;
        return grid;
    };
    //******** **********
    //  ADD AT METHOD
    //******** **********
    api.addAt = function(grid, mesh, ix, y){
        var tile = 0,
        ud = grid.userData;
        if(y === undefined){
            tile = grid.children[ix];
        }else{
            var w = grid.userData.tw;
            tile = grid.children[ y * w + ix];
        }
        var box = new THREE.Box3();
        tile.geometry.computeBoundingBox();
        box.copy( tile.geometry.boundingBox ).applyMatrix4( tile.matrixWorld );
        // on cubes add half hight, on slopes add 0
        mesh.geometry.computeBoundingBox();
        var v = new THREE.Vector3();
        mesh.geometry.boundingBox.getSize(v);
        // figure out yDelta value starting with a 
        // default value that should work okay for cubes
        var yDelta = v.y / 2;
        // if the tile is a slope?
        if(tile.userData.isSlope){
            yDelta = v.y / 2 - ud.space * 0.75;
        }
        // if the tile is a corner
        if(tile.userData.isCorner){
            yDelta = v.y / 2 - ud.space;
            if(tile.userData.isInvert){
               yDelta = v.y / 2 - ud.space * 0.5;
            }
        }
        mesh.position.y = box.max.y + yDelta;
        tile.add(mesh);
    };
    //******** **********
    //  setDataTextures
    //******** **********
 
    var DEFAULT_DATATEXT = [
        ['#00ff00', 8, 8, 180, 255],
        ['#00ff00', 8, 8, 64, 255],
        ['#00ff00', 8, 8, 80, 160],
        ['#00ff6f', 8, 8, 180, 255],
        ['#aaff6f', 8, 8, 100, 255],
        ['#00ff6f', 8, 8, 80, 160]
    ];
 
    api.setDataTextures = function(grid, dataText){
 
        dataText = dataText || DEFAULT_DATATEXT;
 
        var materials = [];
        dataText.forEach(function(d){
            materials.push(new THREE.MeshStandardMaterial({
                color: new THREE.Color(d[0]),
                map: makeDataTexture(d[1], d[2], d[3], d[4])
            }));
        });

        // seeded random material index values
        var i = 0, len = grid.userData.tw * grid.userData.th;
        while(i < len){
           var mi = Math.floor(THREE.MathUtils.seededRandom() * materials.length);
           grid.children[i].material = materials[mi].clone();
           i += 1;
        }
 
    };
    // return public API
    return api;
}());
```

### 2.2 - The new main.js file

There is the the question of having a little demo of the use of the module in a main javaScript file with the usual scene object and so forth so then lets get to that here. After setting up my usual collection of objects that I want to have with just about any other threejs example I then also set up a few light sources as I am going with the standard material here and color maps. There is then calling the create method of the land module and preforming any other additional tasks that I want to do to set up this land grid when it comes to doing things like adding additional mesh objects as children for each land tile that are trees or anything to that effect. Finally I will want to set up a basic animation loop function and update the state of the object grid wrap with the typical methods for doing so.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#00afaf');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 10, -5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-8, 2, 4);
scene.add(dl);
//camera.add(dl);
//scene.add(camera);
scene.add( new THREE.AmbientLight(0xffffff, 0.05 ) )
//******** **********
// GRID
//******** **********
var grid = ObjectGridWrapLand.create({
    tw: 14,
    th: 14,
    crackSize: 0,
    //effects:[],
    altitude: [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,1,1,1,0,0,0,1,1,1,1,0,
        0,0,0,1,1,1,0,0,0,1,1,1,1,0,
        0,0,0,1,1,1,0,0,0,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,1,1,1,1,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,0,0,0,0,0,0,0,
        0,1,2,2,2,1,1,0,0,0,0,0,0,0,
        0,1,2,2,2,1,1,0,0,0,1,1,1,0,
        0,1,2,2,2,1,1,0,0,0,1,1,1,0,
        0,1,1,1,1,1,0,0,0,0,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    objectIndices: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 7, 4, 6, 0, 0, 0, 7, 4, 4, 6, 0,
        0, 0, 0, 1, 0, 3, 0, 0, 0, 1, 0, 0, 3, 0,
        0, 0, 0, 8, 2, 5, 0, 0, 0, 8, 2, 2, 5, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 7, 4, 4, 6, 0, 0, 0, 0, 0, 0, 0,
        0, 7, 4, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 7, 4, 6, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 3, 0, 3, 0, 0, 0, 7, 4, 6, 0,
        0, 1, 8, 2, 5,11, 5, 0, 0, 0, 1, 0, 3, 0,
        0, 8, 2, 2, 2, 5, 0, 0, 0, 0, 8, 2, 5, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
});
grid.scale.set(1, 1, 1);
 
ObjectGridWrapLand.setDataTextures(grid)
 
scene.add(grid);
//******** **********
// ADDING CHILD MESH OBJECTS
//******** **********
var mkCone = function(height){
    return new THREE.Mesh(
        new THREE.ConeGeometry(0.5, height, 30, 30),
        new THREE.MeshStandardMaterial({color: new THREE.Color('#00ff88')})
    );
};
// can make another system that involves a grid if index values
// but with child objects
var mkMeshFunctions = [
    null,
    function(){
        return mkCone(2)
    },
    function(){
        return mkCone(3)
    },
    function(){
        return mkCone(4)
    }
];
// object index grid
[
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,2,0,0,0,0,0,0,0,1,0,0,
    0,0,1,0,0,0,3,0,0,1,2,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,1,0,1,1,0,0,
    0,0,0,1,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,1,0,1,2,1,0,0,
    0,0,2,0,0,0,0,0,0,2,0,0,0,0,
    0,0,0,1,0,0,0,2,1,0,1,1,0,0,
    0,0,1,0,0,0,0,1,0,1,3,3,0,1,
    0,1,0,1,0,1,2,0,1,2,1,1,2,0,
    0,0,0,0,2,0,0,1,0,3,1,1,0,0,
    0,1,0,1,0,1,0,0,0,1,2,3,1,1,
    0,0,0,0,0,0,0,0,0,0,1,0,1,0
].forEach(function(objIndex, i){
    var mkMesh = mkMeshFunctions[objIndex];
    if(mkMesh){
        var mesh = mkMesh(),
        x = i % grid.userData.tw,
        y = Math.floor(i / grid.userData.tw)
        ObjectGridWrapLand.addAt(grid, mesh, x, y);
    }
});
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 600;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000,
    ud = grid.userData;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // set position of the grid
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, Math.sin( Math.PI * 2 * per ) * 0.5 );
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

## conclusion

This project is looking good so far even thought I just have a ruff starting point thus far. The state of the source code is not where I would like it to be, but when it comes to the final outcome with how things look I would say I all ready have a done deal with this. Any additional revisions of this project will likely involve better ways of creating the grid that involve passing just one array literal to create the state of the land, as well as maybe ways to generate the state of the grid also. Another thing that comes to mind is just having a wider collection of source objects that are used to create the state of the grid as well.

