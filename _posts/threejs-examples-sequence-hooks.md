---
title: threejs example using a sequence module with hooks
date: 2022-05-12 13:44:00
tags: [three.js]
layout: post
categories: three.js
id: 986
updated: 2022-05-12 14:42:24
version: 1.11
---

When it comes to starting to make some kind of actual product with [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) rather than just simple code examples for the sake of blog posts, I have started going in the direction of making videos. Thus far I have made a whole bunch of You tube videos for my various blog posts on threejs that I have wrote thus far, and still have a lot more to make if I am going to keep up with that. Anyway when it comes to making videos with a little javaScript code I have found that I like to break things down into what I have code to call sequences. So for this [threejs project examples](/2021/02/19/threejs-examples/) post I will be going over the source code of a new sequences module that I have made.

These sequences are just a way of having not just one update method, but an array of update methods with a current index for an update method that will be set based on a percent value that is based off of a current frame index value relative to that of a max frame value. This is something that I have all ready done with a sequence module that I have all ready made for my various video projects, one collection of which has to do with making video embeds for these blog posts. Anyway after using the module that I have made before for a while now I have found that there are a number of additional features that I should add, one of which is to not just have a collection of objects with an update method, but also before and after hook methods that will always fire before and after the calling of the current update method. This way I can use the before hook to set values that are a kind of default value for the sequence object, rather than repeating lines of code for each update method.

While I was making this module I also thought of a whole bunch of other features that are features that I really should have in this kind of module and managed to sneak them into the module also. This allows for me to set what the percent values should be for each update method by means of seconds values for each object, which I have come to find is a must have feature compared to doing the math manually for that. Also although I have made it so that using seconds values is the default when using the create method of the module, this feature can be disabled in the event that I just want to set percent values for each object like that of what I have been dong thus far.


<!-- more -->

## This video sequences module and what to know first

This is a post on the source code of a javaScript module, and a little additional demo code that I aim to use to make threejs powered videos for my various blog posts here, as well as other video projects that I might start or continue to work in in the future. It should go without saying but I will make it clear here, this is an advanced post on the [subject of threejs](/2018/04/04/threejs-getting-started/) and client side [web programing using javaScript](/2018/11/27/js-getting-started/), so I am taking some liberties and assuming that you have at least a little background with these topics.

### Know at least the basics of a the request animation frame method or the threejs clock object

In client side javaScript there is the [request animation frame method](/2018/03/13/js-request-animation-frame/) that is often what is used to set up a basic animation loop. There are a few other options for this sort of thing such as set time out, but when it comes to rendering rather than updating a model it is mostly just the request animation frame method that is used. I often just use this method, but there is also a [threejs built in clock feature](/2021/05/28/threejs-clock/) for this sot of thing as well.

### source code is up on github

The source code examples I am writing about here can also be found in my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-sequence-hooks).

### Version numbers matter

I was using r135 of threejs when testing this out.

## 1 - First revision of this video sequences hooks module

In this section I will be going over the first revision of this sequence hooks module, which might also be the only revision if I never have a need to improve this or fix any bugs. Anyway in this section I will be going over two files then, one of which is the sequence hooks javaScript file itself, and the other is just a demo of this module that tests out the features of this module.

### 1.1 - The sequence hooks module

Here I have the source code of the module itself for the state of the first revision of it. When it comes to this there are a few public methods but for the most part there are just the cerate and set frame methods that I will just be using for most if not all projects. In a video project I will be using the create method to create a standard sequence object, and then that object is what I will be passing to the set frame method that will in turn call the before objects hook method first, then one of the update methods for th current object in the objects array, and then of course the after objects hook.

```js
// seq-hooks-r0.js
// sequence hooks library from threejs-examples-sequence-hooks
var seqHooks = (function () {
    var api = {};
    // HELPERS
    var getPer = function(a, b){
        return a / b;
    };
    var getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };
    // update the given seq object by way of a frame, and maxFrame value
    api.setFrame = function(seq, frame, frameMax){
        seq.frame = frame === undefined ? 0 : frame;
        seq.frameMax = frameMax === undefined ? 100 : frameMax;
        // set main per and bias values
        seq.per = getPer(seq.frame, seq.frameMax);
        seq.bias = getBias(seq.per);
        // update object index
        seq.objectIndex = 0;
        var i = 0, len = seq.objects.length;
        while(i < len){
            var obj = seq.objects[i];
            var per2 = 1;
            if(seq.objects[i + 1] != undefined){
                per2 = seq.objects[i + 1].per;
            }
            // if this is the current object update object 
            // index as well as other relevant values
            if(seq.per >= obj.per && seq.per < per2){
                seq.objectIndex = i;
                seq.partFrameMax = Math.floor( (per2 - obj.per) * seq.frameMax );
                seq.partFrame = seq.frame - Math.floor(seq.frameMax * obj.per);
                seq.partPer = getPer(seq.partFrame, seq.partFrameMax);
                seq.partBias = getBias(seq.partPer);
                break;
            }
            i += 1;
        }
        // call before hook
        seq.beforeObjects(seq);
        // call update for current object
        var obj = seq.objects[seq.objectIndex];
        if(obj){
            seq.obj = obj;
            obj.update(seq, seq.partPer, seq.partBias, obj);
        }
        // call after objects hook
        seq.afterObjects(seq);
    };
    // get total secs value helper
    var getTotalSecs = function(seq){
        return seq.objects.reduce(function(acc, obj){ return acc + (obj.secs || 0) }, 0);
    };
    // just get an array of per values based on sec values for each object, and DO NOT MUTATE the seq object
    api.getPerValues = function(seq){
        var secsTotal = getTotalSecs(seq);
        var perValues = [];
        var i = 0, len = seq.objects.length;
        while(i < len){
            var per = perValues[i - 1];
            if( per === undefined ){
                perValues.push(0);
            }else{
                var perDelta = seq.objects[i - 1].secs / secsTotal;
                perValues.push( parseFloat( ( per + perDelta ).toFixed(4) ) );         
            }
            i += 1;
        }
        return perValues;
    };
    // get a target frames value
    api.getTargetFrames = function(seq, fps){
        fps = fps === undefined ? 30 : fps;
        var secsTotal = getTotalSecs(seq);
        return Math.ceil(secsTotal * fps);
    };
    // set per values
    api.setPerValues = function(seq, fps){
        // set seq.totalSecs
        seq.totalSecs = getTotalSecs(seq);
        // set per values
        api.getPerValues(seq).forEach(function(per, i){
            seq.objects[i].per = per;
        });
        // set frameMax
        seq.frameMax = api.getTargetFrames(seq, fps);
        return seq;
    };
    // create new seq object method
    var noop = function(){};
    api.create = function(opt){
        opt = opt || {};
        opt.setPerValues = opt.setPerValues === undefined ? true : false;
        var seq = {};
        seq.objectIndex = 0;
        seq.per = 0;
        seq.bias = 0;
        seq.frame = 0;
        seq.frameMax = 100;
        // parse hooks
        seq.beforeObjects = opt.beforeObjects || noop;
        seq.afterObjects = opt.afterObjects || noop;
        // parse objects
        seq.objects = opt.objects || [];
        seq.objects = seq.objects.map(function(obj){
            obj.per = obj.per === undefined ? 0 : obj.per;
            obj.secs = obj.secs === undefined ? 0 : obj.secs;
            obj.data = obj.data || {};
            obj.update = obj.update || noop;
            return obj;
        });
        // set per values is part of the create process
        if(opt.setPerValues){
            api.setPerValues(seq, opt.fps === undefined ? 30: opt.fps);
        }
        return seq;
    };
    // return public api
    return api;
}());
```

### 1.2 - Demo script

So now for a demo script just for the sake of making sure that this module is working out okay just the way I like it to. I am thinking that I should test out the default feature when it comes to setting secs values for each object, but also a few more nested sequence objects that make use of the per values like I have been doing thus far with the older sequence module. So then I maybe it would be a good idea to have two mesh objects one of which is mutated by making use of one or more nested sequence objects that will be used in a main sequence objects, and then another mesh object that will just be mutated with over time in the before objects method of the main sequence object.

```js
(function () {
    // SCENE, CAMERA, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10))
    var width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(width, height);
    // MESH
    var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    // seq object for mesh1 that scales the mesh
    var seq_mesh1_scale = seqHooks.create({
        setPerValues: false,
        beforeObjects: function(seq){
            mesh1.scale.set(1, 1, 1);
        },
        objects: [
            {
                per: 0,
                update: function(seq, partPer, partBias){
                    var s = 1 + 2 * partPer;
                    mesh1.scale.set(s, s, s);
                }
            },
            {
                per: 0.15,
                update: function(seq, partPer, partBias){
                    mesh1.scale.set(3, 3, 3);                    
                }
            },
            {
                per: 0.25,
                update: function(seq, partPer, partBias){
                    var s = 3 - 2 * partPer;
                    mesh1.scale.set(s, s, s);                    
                }
            }
        ]
    });
    // seq object for mesh1 that rotates the mesh
    var seq_mesh1_rotate = seqHooks.create({
        setPerValues: false,
        beforeObjects: function(seq){
            mesh1.scale.set(1, 1, 1);
            mesh1.rotation.set(0, 0, 0);
            mesh1.rotation.y = Math.PI * 4 * seq.per;
        },
        objects: [
            {
                per: 0,
                update: function(seq, partPer, partBias){
                    mesh1.rotation.x = Math.PI * 1.5;
                }
            },
            {
                per: 0.5,
                update: function(seq, partPer, partBias){
                    mesh1.rotation.x = Math.PI;
                }
            }
        ]
    });
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        beforeObjects: function(seq){
            var r = Math.PI * 2 * seq.per;
            var x = Math.cos(r) * 4;
            var z = Math.sin(r) * 4;
            mesh2.position.set(x, 0, z);
        },
        afterObjects: function(seq){
            camera.lookAt(mesh1.position);
        },
        objects: [
            {
                per: 0,
                secs: 3,
                update: function(seq, partPer, partBias){
                    // seq_mesh1
                    seqHooks.setFrame(seq_mesh1_scale, seq.partFrame, seq.partFrameMax);
                    // camera
                    camera.position.set(10, 10, 10);
                }
            },
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    // camera
                    camera.position.set(10 - 20 * partPer, 10, 10);
                }
            },
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    // camera
                    camera.position.set(-10, 10 - 7 * partPer, 10);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    // camera
                    camera.position.set(-10, 3, 10);
                    var x = 10 * partBias;
                    camera.lookAt(mesh1.position.clone().add(new THREE.Vector3(x, 0, 0)));
                }
            },
            {
                secs: 10,
                update: function(seq, partPer, partBias){
                    // seq_mesh1
                    seqHooks.setFrame(seq_mesh1_rotate, seq.partFrame, seq.partFrameMax);
                    // camera
                    camera.position.set(-10, 3 - 10 * partPer, 10 - 30 * partPer);
                }
            }
        ]
    });
    // APP LOOP
    var secs = 0,
    fps_update = 10,
    fps_movement = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            // update by hooks
            seqHooks.setFrame(seq, seq.frame, seq.frameMax);
            renderer.render(scene, camera);
            seq.frame += fps_movement * secs;
            seq.frame %= seq.frameMax;
            lt = now;
        }
    };
    loop();
}());
```

## Conclusion

This is looking good so far and I think that I will be using this in place of a similar module that I made before hand that I have been using to make my videos thus far. With that sequence module I have found that there are a few features that I should have in a module such as this that I now have which is great. Mainly it was the before and after objects hooks that I wanted to have the most, but a few more ideas came up that I think I will be using now and then for future video projects.

I am sure that I will end up running into other problems that might result in me wanting to have just a few more additional features on top of what I am working with all ready here with this module. So at some point in the future I will likely make another revision of this module, or maybe a whole other project based off of what I worked out here.
