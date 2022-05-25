---
title: Weird walk three threejs example
date: 2022-05-24 12:43:00
tags: [three.js]
layout: post
categories: three.js
id: 989
updated: 2022-05-25 11:05:30
version: 1.7
---

I am looking to continue expanding my collection of [threejs examples](/2021/02/19/threejs-examples/) as I think I have hit a bit of a wall when it comes to leaning more about the library itself, for the moment at least. So it would very much seem to be just the thing two do to start thinking in terms of what I would like to do with threejs when it comes to making actually projects rather than just demos of various threejs features. So today I would like to make another one of my weird walk modules where the goal is to just have fun with the library to make some kind of collection of mesh objects that is just some kind of character or object that looks like it has legs and is just going threw something that can be thought of as a kind of walk cycle.

<!-- more -->

## The weird walk three module and what to know first

This is a post on a javaScript module that I am calling weird walk three which as the name suggests is the third project where I am making a kind of informal module that is of some kind of character that is just going threw a walk cycle of sorts. This is not a post for people that are new to threejs or javaScript in general I have wrote those posts a ling time ago and will nit be getting into detail about the basics of these subjects here. However I do often have an opening section such as this to just write about a few things you might want to read up more on before continue to read the rest of the post.

<iframe class="youtube_video" src="https://www.youtube.com/embed/ZBIW8gQmdGE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Version numbers matter

The version of threejs that I was using when I first made this module and wrote this post was r135.

### Latest source is on Github

The latest source code for this module as well as many others can be found in my [test threejs repository]().


## First version of weird walk three, and other additional files

In this section I will be going over the source code of the first version of this weird walk three module as well as additional files that I ma using to get the over all demo that I made for it up and running as well.

### 1.1 - The weird walk module r0

```js
//******** **********
// Weird Walk Module - r0
//******** **********
var WeirdWalk = (function(){
    // public API
    var api = {};
 
    var MATERIALS = {}
 
    var DEFAULT_MATERIAL = new THREE.MeshNormalMaterial();
 
    MATERIALS.foot = DEFAULT_MATERIAL;
    MATERIALS.calf = DEFAULT_MATERIAL;
    MATERIALS.center = DEFAULT_MATERIAL;
 
    // just make and return Leg object
    var mkLegObj = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        opt.radius = opt.radius === undefined ? 1 : + opt.radius; 
        var leg = new THREE.Group();
        // foot mesh
        var foot = new THREE.Mesh( new THREE.BoxGeometry(1, 0.75, 2), opt.materials.foot );
        foot.position.set( 0, 3.74 + opt.radius, 0.62);
        leg.add(foot);
        // calf mesh
        var calf = new THREE.Mesh( new THREE.BoxGeometry(1, 3, 0.75), opt.materials.calf );
        calf.position.set(0, 1.87 + opt.radius, 0);
        leg.add(calf);
        return leg;
    };
 
    var mkBody = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        var body = new THREE.Group();
        var center = new THREE.Mesh( new THREE.SphereGeometry(1.5, 30, 30), opt.materials.center );
        body.add(center);
        return body;
    };
 
    api.create = function(opt){
        var weird = new THREE.Group(),
        ud = weird.userData;
        // add legs
        var legs = ud.legs = new THREE.Group();
        weird.add(legs);
        var i = 0, len = 8;
        while(i < len){
            var leg = mkLegObj(opt);
            leg.rotation.x = Math.PI * 2 / len * i;
            legs.add(leg);
            i += 1;
        }
        // add body
        var body = ud.body = mkBody(opt);
        weird.add(body);
        return weird;
    };
 
    // return public API
    return api;
}());
```

### 1.2 - object grid wrap module r1

```js
//******** **********
// ObjectGridWrap module - based off of threejs-examples-object-grid-wrap r1
// * works with mesh objects that use an array of materials
// * Effects object started with opacity and scale effects built in
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
    // set opacity for object and any and all nested objects
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
    var EFFECTS = {
        // effect method that will set opacity of object based on distance from center
        opacity : function(grid, obj, objData){
            var ud = grid.userData;
            var b = objData.da / ud.distMax;
            b = 1 - b;
            b = parseFloat(b.toFixed(2));
            // call set opacity helper
            setOpacity(obj, b);
        },
        // set scale based on distance from center
        scale : function(grid, obj, objData){
            var ud = grid.userData;
            var b = objData.da / ud.distMax;
            obj.scale.set(1, 1, 1).multiplyScalar(1 - b);
        },
        // rotationA demo effect
        rotationA : function(grid, obj, objData){
            var ud = grid.userData;
            var b = objData.da / ud.distMax;
            var y = ( 1 - b ) * Math.PI * 4;
            obj.rotation.set(0, y, 0);
        },
        // rotationB demo effect
        rotationB : function(grid, obj, objData){
            obj.rotation.set(0, 0, 0);
        },
        // positionA demo effect
        positionA : function(grid, obj, objData){
            var ud = grid.userData;
            var b = objData.da / ud.distMax;
            obj.position.y = ud.tw / 2 * (1 - b);
        }
    };
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
        var x = v_adjust.x * ud.space;
        var z = v_adjust.y * ud.space;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.space / 2;
        z -= (ud.th - 1) * ud.space / 2;
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
        ud.space = opt.space === undefined ? 1 : opt.space;
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
        var x = v_adjust.x * ud.space;
        var z = v_adjust.y * ud.space;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.space / 2;
        z -= (ud.th - 1) * ud.space / 2;
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
            // create object data
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
            // apply all effects
            ud.effects.forEach(function(effectKey){
                EFFECTS[effectKey](grid, obj, objData)
            });
        });
    };
    // return public API
    return api;
 
}());
```

### 1.3 - Demo code for r0 of weird walk three

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-12, 3, -7);
 
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
th = 15,
space = 3;
// source objects
var mkGround = function(){
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0xffffff}) );
    ground.position.y = 0.05 * -1;
    return ground;
};
var mkBox = function(color, h){
    var box = new THREE.Group();
    var a = space * 0.5;
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( a, h, a),
        new THREE.MeshStandardMaterial({ color: color}) );
    mesh.position.y = h / 2;
    //mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = mkGround();
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkGround(),
    mkBox(0x00ffff, 0.50),
    mkBox(0xff00ff, 1.00),
    mkBox(0x0000ff, 1.50),
    mkBox(0x00ff00, 2.00),
    mkBox(0xffff00, 2.50),
    mkBox(0xff8f00, 3.50),
    mkBox(0xff0000, 4.00),
    mkBox(0xffffff, 7.00)
];
var array_oi = [
0,0,0,2,4,0,0,0,8,
0,0,0,1,4,0,0,0,7,
0,0,0,1,5,0,0,8,7,
0,0,0,2,5,7,0,0,7,
0,0,0,2,6,0,0,0,8,
0,0,0,1,5,7,0,0,7,
0,0,0,3,5,0,0,0,7,
0,0,0,1,4,7,0,0,8,
0,0,0,2,4,0,0,0,7,
0,0,0,3,4,0,0,0,7,
0,0,0,2,4,0,0,0,7,
0,0,0,1,4,0,0,0,8,
0,0,0,1,4,7,0,0,7,
0,0,0,2,4,0,0,8,7,
0,0,0,3,4,0,0,0,7
]
//******** **********
// CREATE GRID
//******** **********
var grid = ObjectGridWrap.create({
    space: space,
    tw: tw,
    th: th,
    //aOpacity: 1.25,
    dAdjust: 1.25,
    effects: ['opacity'],
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
scene.add(grid);
//******** **********
// WERID WALK THREE
//******** **********
var ww3_1 = WeirdWalk.create();
var s = 0.5;
ww3_1.scale.set(s, s, s);
ww3_1.position.set(-7, 2.7, -3);
scene.add(ww3_1);
 
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
        //ObjectGridWrap.setPos(grid, (1 - per) * 2, Math.cos(Math.PI * bias) * 0.25 );
        ObjectGridWrap.setPos(grid, 0.10 - 0.10 * bias, per * 1 );
        ObjectGridWrap.update(grid);
 
        ww3_1.userData.legs.rotation.x = -Math.PI * 4 * per;
        ww3_1.userData.legs.rotation.z = Math.PI / 180 * 20;
 
        camera.lookAt(ww3_1.position.clone().add(new THREE.Vector3(0,-0.5,0)));
 
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```