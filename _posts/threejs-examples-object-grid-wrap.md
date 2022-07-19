---
title: Object grid wrap threejs javaScript module example
date: 2022-05-20 13:49:00
tags: [three.js]
layout: post
categories: three.js
id: 988
updated: 2022-07-19 11:29:30
version: 1.18
---

I have some ideas for videos that involve a gird of objects the position of which will move, but will also wrap around when also. In other words I would like to have some kind of simple javaScript module in which I can define an array of source objects, and then have an array of index values for tile location in the grid where each index value refers to an object to clone from the source objects array. So then this kind of module could be used in all kinds of ways when it comes to making some kind of looping world that I can then move around in. The module can be used with a number of other components that involve additional objects that might be elements of the main focus of the over all video, but this module would be a nice way to have some kind of repeating background.

So this post will be on what I have together at this time for what I am calling an object grid wrap module which will be yet another one of my [threejs project examples](/2021/02/19/threejs-examples/).

<!-- more -->

## The threejs object grid wrap module and what you should know first

This is a blog post on a javaScript module that I made that can be used to create a grid of objects, and move those objects in such a way that they will loop around again when they go out of bounds. I am making use of a lot of various features of the threejs library as well as core javaScript in the module itself as well as the additional demo code. This is then not at all a post on threejs example code that is for developers that are still new to threejs and javaScript in general. I will not be getting into every little thing that you should know before hand, but I will take a moment in this opening section to outline some general things you might want to read up more on before counting with the rest of this content.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/JqVIlrvMwHs
" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Read up on the subject of shallow and deep cloning of objects

In this object grid module I am taking an array of source objects and then creating new objects based off of those source objects. When doing so there is calling the clone method of the object that I want to make a copy of, but this will just create a copy of a mesh object or group objects itself and not with any nested object such as with a material or geometry that is used. This is one of the reasons why I have added an option that allows for me to pass a custom method for cloning objects, I have what I have made for this when it comes to a built in method for cloning, but I am sure there will be situations in which I might want to use a custom method for this sort of thing.

I have wrote a number of posts in the past about this subject when it comes to my posts on the [lodash clone](/2017/10/02/lodash_clone/), and [lodash clone deep methods](/2017/11/13/lodash_clonedeep/).

### Wrapping, clamping, and Euclidean Modulo

In the past I have wrote a number of posts on the subject of wrapping and clamping which is a subject that seems to come up a whole lot when making all kinds of various projects. I have an old collection of content on the [game framework phaser in which I wrote a post on the built in wrap](/2018/07/22/phaser-math-wrap-and-clamp/) method that works well in the project. I have also wrote a post on the subject of [core javaScript and the built in modulo operator](/2017/09/02/js-whats-wrong-with-modulo/) and what the deal is with that when it comes to negative numbers. However this is a post on the threejs library and when it comes to this project there is a [Euclidean Modulo method in the Math utils library](/2022/04/11/threejs-math-utils/).

### Version numbers matter

When I first made the source code examples that I am writing about in this post I was working on top of r135 of threejs.

### Source code is also up on Github

On Github I have my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap) where I have the source code that I am writing about here as well as the source code for many other such simple project examples.

## 1 - First version ( r0 ) of this object grid warp module and a demo of it thus far

In this section I will be going over the first revision of the object grid wrap module itself as well as demo code that helps to show that this will work they way I want it to. For this first revision I all ready have all of the core ideas that I wanted up and running and there may or may not be a need for an additional revision. I can create an instance of a THREE.Group using the create method of the object grid module that has children added and positioned from the array of source objects and index values that I give. The other core idea that I wanted also seems to be working well when it comes to moving these objects around and having them loop back.

### 1.1 - The object grid wrap module

Here I have the source code for the module that I had in mind that creates and returns a public API with a few useful methods. There is the create method that I can call to create and return a new grid object, as well as additional methods to change and update this grid object. On top of the public methods I have a number of private helper functions for this like getting the true tile home position of an object, as well as other kinds of positions such as positions that are created with alpha values from these given home locations. Also I have a number of hard coded defaults for the various options for the create method so I have something of interest at least when I just call the create method by itself.

```js
//******** **********
// ObjectGridWrap module - from threejs-examples-object-grid-wrap - r0
//******** **********
var ObjectGridWrap = (function(){
    // public API
    var api = {};
    // some defaults
    var  DEFAULT_SOURCE_OBJECTS = [
        new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial()),
        new THREE.Mesh( new THREE.SphereGeometry( 0.5, 30, 30), new THREE.MeshNormalMaterial())
    ];
    var DEFAULT_OBJECT_INDICES = [1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1];
    // default cloner method
    var DEFAULT_CLONER = function(opt, objectIndex){
        var obj_root = opt.sourceObjects[objectIndex].clone();
        obj_root.traverse(function(obj){
            if(obj.material){
                obj.material = obj.material.clone();
            }
        });
        return obj_root;
    };
    // get a 'true' position in the form of a Vector2 for the given object index
    // by true position I mean how things are with the state of the objectIndices array
    // it can also be thought of as a kind of 'home position' as well
    var getTruePos = function(grid, objectIndex){
        var ud = grid.userData,
        trueX = objectIndex % ud.tw,
        trueZ = Math.floor(objectIndex / ud.tw);
        return new THREE.Vector2(trueX, trueZ);
    };
    // get the adjusted position in which alphaX, and alphaZ values are applyed
    var getAdjustedPos = function(grid, objectIndex){
        var ud = grid.userData,
        v_true = getTruePos(grid, objectIndex);
        // adjusted by alphas
        var ax = (v_true.x + ud.tw * ud.alphaX) % ud.tw;
        var az = (v_true.y + ud.th * ud.alphaZ) % ud.th;
        return new THREE.Vector2(ax, az);        
    };
    // The create method will create and return a new THREE.Group with desired source objects
    // and induces for where clones of these objects shall be placed
    api.create = function(opt){
        opt = opt || {};
        opt.sourceObjects = opt.sourceObjects || DEFAULT_SOURCE_OBJECTS;
        opt.objectIndices = opt.objectIndices || DEFAULT_OBJECT_INDICES;
        opt.tw = opt.tw === undefined ? 5: opt.tw; // tile width and height
        opt.th = opt.th === undefined ? 5: opt.th;
        opt.alphaX = 0; // alpha x and z values
        opt.alphaZ = 0;
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        var grid = new THREE.Group();
        var ud = grid.userData;
        ud.space = opt.space === undefined ? 1 : opt.space;
        ud.alphaX = opt.alphaX;
        ud.alphaZ = opt.alphaZ;
        ud.tw = opt.tw;
        ud.th = opt.th;
        ud.aOpacity = opt.aOpacity === undefined ? 1.0 : opt.aOpacity;
        var i = 0, len = opt.tw * opt.th;
        while(i < len){
            var objIndex = opt.objectIndices[i];
            var obj = opt.cloner(opt, objIndex);
            grid.add(obj);
            i += 1;
        };
        api.update(grid);
        return grid;
    };
    // set grid to alphas helper
    var setGridToAlphas = function(grid, objectIndex){
        var ud = grid.userData;
        var obj = grid.children[objectIndex];
        var v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        var x = v_adjust.x * ud.space;
        var z = v_adjust.y * ud.space;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.space / 2;
        z -= (ud.th - 1) * ud.space / 2;
        // set position
        obj.position.set(x, 0, z);
    };
    // set opacity for object and any and all nested objects
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
                obj.material.transparent = true;
                obj.material.opacity = alpha;
            }
        });
    };
    // Object opacity check
    var objectOpacityCheck = function(grid, objectIndex){
        var ud = grid.userData,
        obj = grid.children[objectIndex],
        v_center = new THREE.Vector2(ud.tw / 2, ud.th / 2),
        distMax = v_center.distanceTo( new THREE.Vector2(0.5, 0.5) );
        var v_adjust = getAdjustedPos(grid, objectIndex);
        var v2 = new THREE.Vector2(v_adjust.x + 0.5, v_adjust.y + 0.5),
        d = v2.distanceTo( v_center );
        d *= ud.aOpacity;        
        d = d < 0 ? 0 : d;
        d = d > distMax ? distMax : d;
        var b = d / distMax;
        b = 1 - b;
        b = parseFloat(b.toFixed(2));
        // call set opacity helper
        setOpacity(obj, b);
        //console.log(i, '(' + trueX + ',' + trueZ + ')', 'd=' + d.toFixed(2), distMax.toFixed(2), b);
    };
    // set position
    api.setPos = function(grid, x, z){
        var ud = grid.userData;
        ud.alphaX = THREE.MathUtils.euclideanModulo(x, 1);
        ud.alphaZ = THREE.MathUtils.euclideanModulo(z, 1);
    };
    // main update method
    api.update = function(grid){
        grid.children.forEach(function(obj, i){
            setGridToAlphas(grid, i);
            objectOpacityCheck(grid, i);
        });
    };
    // return public API
    return api;
}());
```

### 1.2 - Demo of the module

Now I am just going to want to have a little demo code then just to take this module for a text drive of sorts. For this demo I made custom arrays for the source objects as well as using the Math utils seeded random method as a way to generate index values when it comes to cloning what source objects for which tile location in the grid.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 5, 0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-2, 1, 3);
scene.add(dl);
//******** **********
// GRID OPTIONS
//******** **********
var tw = 20,
th = 20,
space = 1.25;
// source objects
var mkBox = function(color, h){
    var box = new THREE.Group();
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 1, h, 0.25 + 0.25),
        new THREE.MeshStandardMaterial({ color: color}) );
    mesh.position.y = h / 2;
    mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0xffffff}) );
    ground.position.y = 0.05 * -1;
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkBox(0xff0000, 0.5),
    mkBox(0x00ff00, 1),
    mkBox(0x0000ff, 1.5),
    mkBox(0x00ffff, 2),
    mkBox(0xff00ff, 2.5)
];
var array_oi = [],
len = tw * th, i = 0;
while(i < len){
    array_oi.push( Math.floor( array_source_objects.length * THREE.MathUtils.seededRandom() ) );
    i += 1;
}
//******** **********
// CREATE GRID
//******** **********
var grid = ObjectGridWrap.create({
    space: space,
    tw: tw,
    th: th,
    aOpacity: 1.25,
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
scene.add(grid);
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
        ObjectGridWrap.setPos(grid, (1 - per) * 2, Math.cos(Math.PI * bias) * 0.25 );
        ObjectGridWrap.update(grid);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 2 - Plug in system, arrays of materials, and many little things fixed in r2 thus far

Sense I first wrote this post I have made two revisions of the state of the source code of this object grid wrap module and I am sure that there will be at least a few more as I seem to be using this module now and then in my many various threejs blog posts videos to have a looping grid of objects that composes some kind of interetsing scene.

Anyway the main fetaure of intest thus fra here sense the first version is that I have added a plug in system for a way to go baout adding various effects that I want to use with an object grid such as an opacity effect. When it comes to the core set of files that I have for r2, thus far I just have one plug in that is a core set of effects. When it comes to built in effects thus far there are none actually as I am thinking that making effects are somehting that I might want to do as a project to project type thing when using this. That is not to say there there will end up being a few ushual methods that I will want to take with me to each new project it is just that I have found that thus far I might want to even park thoses in an optional external file for now at least.

### 2.1 - r2 of the object grid wrap module

```js
//******** **********
// ObjectGridWrap module - r2 - for threejs-examples-object-grid-wrap post
// * spaceW and spaceH options in place of space
// * objData.b prop to work with when making an effect
// * ud argument for effect functions
// * load method started to load external plug ins that contain just effects for now
//******** **********
var ObjectGridWrap = (function(){
    // public API
    var api = {};
    //******** **********
    //  DEFAULTS
    //******** **********
    var  DEFAULT_SOURCE_OBJECTS = [
        new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial()),
        new THREE.Mesh( new THREE.SphereGeometry( 0.5, 30, 30), new THREE.MeshNormalMaterial())
    ];
    var DEFAULT_OBJECT_INDICES = [1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1];
    // DEFAULT CLONER METHOD
    var DEFAULT_CLONER = function(opt, objectIndex){
        var obj_root = opt.sourceObjects[objectIndex].clone();
        obj_root.traverse(function(obj){
            if(obj.material){
                if(obj.material instanceof Array){
                    obj.material = obj.material.map(function(m){
                        return m.clone();
                    });
                }else{
                    obj.material = obj.material.clone();
                }
            }
        });
        return obj_root;
    };
    //******** **********
    //  EFFECTS OBJECT - BUILT IN EFFECTS + HELPERS
    //******** **********
    var EFFECTS = {};
    //******** **********
    //  POSITION HELPERS
    //******** **********
    // get a 'true' position in the form of a Vector2 for the given object index
    // by true position I mean how things are with the state of the objectIndices array
    // it can also be thought of as a kind of 'home position' as well
    var getTruePos = function(grid, objectIndex){
        var ud = grid.userData,
        trueX = objectIndex % ud.tw,
        trueZ = Math.floor(objectIndex / ud.tw);
        return new THREE.Vector2(trueX, trueZ);
    };
    // get the adjusted position in which alphaX, and alphaZ values are applyed
    var getAdjustedPos = function(grid, objectIndex){
        var ud = grid.userData,
        v_true = getTruePos(grid, objectIndex);
        // adjusted by alphas
        var ax = (v_true.x + ud.tw * ud.alphaX) % ud.tw;
        var az = (v_true.y + ud.th * ud.alphaZ) % ud.th;
        return new THREE.Vector2(ax, az);        
    };
    // final getPos in which space is applyed
    var getPos = function(grid, objectIndex){
        var ud = grid.userData,
        v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        var x = v_adjust.x * ud.spaceW;
        var z = v_adjust.y * ud.spaceH;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.spaceW / 2;
        z -= (ud.th - 1) * ud.spaceH / 2;
        return new THREE.Vector2(x, z);        
    };
    //******** **********
    //  CREATE METHOD
    //******** **********
    // The create method will create and return a new THREE.Group with desired source objects
    // and induces for where clones of these objects shall be placed
    api.create = function(opt){
        opt = opt || {};
        opt.sourceObjects = opt.sourceObjects || DEFAULT_SOURCE_OBJECTS;
        opt.objectIndices = opt.objectIndices || DEFAULT_OBJECT_INDICES;
        opt.tw = opt.tw === undefined ? 5: opt.tw; // tile width and height
        opt.th = opt.th === undefined ? 5: opt.th;
        opt.alphaX = 0; // alpha x and z values
        opt.alphaZ = 0;
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        var grid = new THREE.Group();
        var ud = grid.userData;
        ud.effects = opt.effects || [];
        // use opt.space to set ud.spaceW + H or set them by opt.spaceW + H 
        if(opt.space){
            ud.spaceW = opt.space;
            ud.spaceH = opt.space;
        }else{
            ud.spaceW = opt.spaceW === undefined ? 1 : opt.spaceW;
            ud.spaceH = opt.spaceH === undefined ? 1 : opt.spaceH;
        }
        // alphaX and Z values for setting offsets of grid
        ud.alphaX = opt.alphaX;
        ud.alphaZ = opt.alphaZ;
        ud.tw = opt.tw;
        ud.th = opt.th;
        // ud.dAdjust aka ud.aOpacity 
        ud.aOpacity = ud.dAdjust = opt.dAdjust === undefined ? 1.0 : opt.dAdjust;
        // ud center, and ud.distMax
        ud.center = new THREE.Vector2(ud.tw / 2, ud.th / 2);
        ud.distMax = ud.center.distanceTo( new THREE.Vector2(0.5, 0.5) );
        var i = 0, len = opt.tw * opt.th;
        while(i < len){
            var objIndex = opt.objectIndices[i];
            // if we have a vailid index clone the source object of that index
            if(typeof objIndex === 'number' && objIndex >= 0 && objIndex <= opt.sourceObjects.length - 1){
                var obj = opt.cloner(opt, objIndex);
                grid.add(obj);
            }else{
                // else push a blank object
                grid.add(new THREE.Object3D());
            }
            i += 1;
        };
        api.update(grid);
        return grid;
    };
    //******** **********
    //  SET / UPDATE GRID + HELPERS
    //******** **********
    // set grid to alphas helper
    var setGridToAlphas = function(grid, objectIndex){
        var ud = grid.userData;
        var obj = grid.children[objectIndex];
        var v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        var x = v_adjust.x * ud.spaceW;
        var z = v_adjust.y * ud.spaceH;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.spaceW / 2;
        z -= (ud.th - 1) * ud.spaceH / 2;
        // set position
        obj.position.set(x, 0, z);
    };
    // set position
    api.setPos = function(grid, x, z){
        var ud = grid.userData;
        ud.alphaX = THREE.MathUtils.euclideanModulo(x, 1);
        ud.alphaZ = THREE.MathUtils.euclideanModulo(z, 1);
    };
    // main update method
    api.update = function(grid){
        var ud = grid.userData;
        // for all children
        grid.children.forEach(function(obj, i){
            // set the position of all objects based on 
            // the current state of alphaX and alphaY
            setGridToAlphas(grid, i);
            // create objData object that will be used for all effects
            var objData = { i : i };
            objData.truePos = getTruePos(grid, objData.i );
            objData.adjustPos = getAdjustedPos(grid, objData.i );
            objData.pos = getPos(grid, objData.i);
            // d and da
            var v2 = new THREE.Vector2(objData.adjustPos.x + 0.5, objData.adjustPos.y + 0.5),
            d = objData.d = v2.distanceTo( ud.center );
            var da = d * ud.dAdjust;       
            da = da < 0 ? 0 : da;
            da = da > ud.distMax ? ud.distMax : da;
            objData.da = da;
            // 'b' value
            var b = objData.da / ud.distMax;
            b = 1 - b;
            objData.b = parseFloat( b.toFixed(2) );
            // apply all effects
            ud.effects.forEach(function(effectKey){
                var effect = EFFECTS[effectKey];
                if(effect){ 
                    effect(grid, obj, objData, obj.userData);
                }
            });
        });
    };
    //******** **********
    //  LOAD PLUG-IN
    //******** **********
    api.load = function(plugObj){
        // load any effects given
        if(plugObj.EFFECTS){
            Object.keys( plugObj.EFFECTS ).forEach(function(effectKey){
                EFFECTS[effectKey] = plugObj.EFFECTS[effectKey];
            });
        }
    };
    // return public API
    return api;
}());
```

### 2.2 - Core effects plug in

```js
(function(){
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
                //obj.material.transparent = true;
                //obj.material.opacity = alpha;
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
            // effect method that will set opacity of object based on distance from center
            opacity : function(grid, obj, objData){
                setOpacity(obj, objData.b);
            },
            // set scale based on distance from center
            scale : function(grid, obj, objData){
                obj.scale.set(1, 1, 1).multiplyScalar( objData.b );
            },
            // rotationA demo effect
            rotationA : function(grid, obj, objData){
                var y = objData.b * Math.PI * 4;
                obj.rotation.set(0, y, 0);
            },
            // rotationB demo effect
            rotationB : function(grid, obj, objData){
                obj.rotation.set(0, 0, 0);
            },
            // positionA demo effect
            positionA : function(grid, obj, objData){
                var ud = grid.userData;
                obj.position.y = ud.tw / 2 * objData.b;
            }
        }
    } );
}());
```
 
### 2.3 - Demo of r2
 
```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 5, 0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-2, 1, 3);
scene.add(dl);
//******** **********
// GRID OPTIONS
//******** **********
var tw = 9,
th = 9,
space = 1.5;
// source objects
var mkBox = function(color, h){
    var box = new THREE.Group();
    var a = space * 0.95;
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( a, h, a),
        new THREE.MeshStandardMaterial({ color: color}) );
    mesh.position.y = h / 2;
    //mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0xffffff}) );
    ground.position.y = 0.05 * -1;
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkBox(0x00ffff, 0.25), //new THREE.Object3D(),
    mkBox(0xff0000, 10.00),
    mkBox(0xffff00, 4.50),
    mkBox(0x00ff00, 1.50)
];
 
var array_oi = [
0,0,0,0,0,3,3,0,0,
0,0,0,0,3,2,3,0,0,
0,0,0,3,2,3,3,0,0,
0,0,3,2,2,2,3,0,0,
0,3,2,2,1,2,3,0,0,
3,2,3,2,2,2,2,3,0,
0,3,0,3,3,3,2,3,0,
0,0,0,0,0,0,3,3,0,
0,0,0,0,0,0,0,0,0
]
 
//******** **********
// CREATE GRID
//******** **********
var grid = ObjectGridWrap.create({
    spaceW: 4,
    spaceH: space,
    tw: tw,
    th: th,
    dAdjust: 1.25,
    effects: ['opacity', 'scale', 'positionA', 'rotationA'],
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
scene.add(grid);
 
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
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, Math.cos( Math.PI * bias ) * 0.25 );
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

## Conclusion

So far so good with this object grid wrap module, I have a basic idea of what I wanted in mind and that basic idea is now up and running. I am sure that I will want to make at least one if not more revisions of this though, but in order to really be sure of what is needed in terms of new features and what needs to be fixed I will want to make at least a few if not more projects that make use of this module.
