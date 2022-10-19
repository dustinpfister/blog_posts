---
title: threejs example using a sequence module with hooks
date: 2022-05-12 13:44:00
tags: [three.js]
layout: post
categories: three.js
id: 986
updated: 2022-10-19 14:38:22
version: 1.18
---

When it comes to starting to make some kind of actual product with [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) rather than just simple code examples for the sake of blog posts, I have started going in the direction of making videos. Thus far I have made a whole bunch of You tube videos for my various blog posts on threejs that I have wrote thus far, and still have a lot more to make if I am going to keep up with that. Anyway when it comes to making videos with a little javaScript code I have found that I like to break things down into what I have code to call sequences. So for this [threejs project examples](/2021/02/19/threejs-examples/) post I will be going over the source code of a new sequences module that I have made.

These sequences are just a way of having not just one update method, but an array of update methods with a current index for an update method that will be set based on a percent value that is based off of a current frame index value relative to that of a max frame value. This is something that I have all ready done with a sequence module that I have all ready made for my various video projects, one collection of which has to do with making video embeds for these blog posts. Anyway after using the module that I have made before for a while now I have found that there are a number of additional features that I should add, one of which is to not just have a collection of objects with an update method, but also before and after hook methods that will always fire before and after the calling of the current update method. This way I can use the before hook to set values that are a kind of default value for the sequence object, rather than repeating lines of code for each update method.

While I was making this module I also thought of a whole bunch of other features that are features that I really should have in this kind of module and managed to sneak them into the module also. This allows for me to set what the percent values should be for each update method by means of seconds values for each object, which I have come to find is a must have feature compared to doing the math manually for that. Also although I have made it so that using seconds values is the default when using the create method of the module, this feature can be disabled in the event that I just want to set percent values for each object like that of what I have been dong thus far.


<!-- more -->

## This video sequences module and what to know first

This is a post on the source code of a javaScript module, and a little additional demo code that I aim to use to make threejs powered videos for my various blog posts here, as well as other video projects that I might start or continue to work in in the future. It should go without saying but I will make it clear here, this is an advanced post on the [subject of threejs](/2018/04/04/threejs-getting-started/) and client side [web programming using javaScript](/2018/11/27/js-getting-started/), so I am taking some liberties and assuming that you have at least a little background with these topics.

<iframe class="youtube_video" src="https://www.youtube.com/embed/hBUt0Jc0lL4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Know at least the basics of a the request animation frame method or the threejs clock object

In client side javaScript there is the [request animation frame method](/2018/03/13/js-request-animation-frame/) that is often what is used to set up a basic animation loop. There are a few other options for this sort of thing such as set time out, but when it comes to rendering rather than updating a model it is mostly just the request animation frame method that is used. I often just use this method, but there is also a [threejs built in clock feature](/2021/05/28/threejs-clock/) for this sot of thing as well.

### Version numbers matter

I was using r135 of threejs when I first wrote this post, and the last time I came around to doing some editing for r1 of the module I was using r140. On my end everything was working fine with these versions of threejs.

### source code is up on github

The source code examples I am writing about here can also be found in my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-sequence-hooks) On Github. This is a pretty major module that I use regularly when making my various demo videos for these blog posts including this one. I have two versions of this module thus far, both of which I am writing about here in this post, however I might all ready have later revisions in the works at the repo, and it might be a long time until I come around to doing some more editing here.

## 0 - First version \( r0 \) of this video sequences hooks module

In this section I will be going over the first revision of this sequence hooks module, which might also be the only revision if I never have a need to improve this or fix any bugs. Anyway in this section I will be going over two files then, one of which is the sequence hooks javaScript file itself, and the other is just a demo of this module that tests out the features of this module.

Here I have the source code of the module itself for the state of the first revision of it. When it comes to this there are a few public methods but for the most part there are just the create and set frame methods that I will just be using for most if not all projects. In a video project I will be using the create method to create a standard sequence object, and then that object is what I will be passing to the set frame method that will in turn call the before objects hook method first, then one of the update methods for the current object in the objects array, and then of course the after objects hook.

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

### 0.1 - Basic hello world type example

For this basic demo of the sequence hooks module I will be using the before objects hook to define some default values for a camera, as well as setting the rotation of a mesh over the whole duration of the video. I am then using the after objects hook to make sure that I am always calling the update projection matrix method of the camera after setting values for the camera in the before objects hook as well as the current update method in the objects array of the sequence object.

```js
(function () {
    // SCENE, CAMERA, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        // before current object hook
        beforeObjects: function(seq){
             // default value for camera
             camera.fov = 60;
             camera.aspect = 640 / 480;
             camera.position.set(10, 10, 10);
             camera.lookAt(0, 0, 0);
             // always rotate mesh object
             mesh1.rotation.y = Math.PI * 2 * seq.per;
        },
        // after current object hook
        afterObjects: function(seq){
             // always update the projection matrix so that any values
             // like fov or aspect take effect from before hook, and 
             // current update method in seq.objects
             camera.updateProjectionMatrix();
        },
        // the objects for eac sequence
        objects: [
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    camera.fov = 10 + 50 * partPer;
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                     var w = 640 - 320 * partPer;
                     var h = 480 + 240 * partPer;
                     camera.aspect = w / h;
                }
            }
        ]
    });
    // APP LOOP
    var secs = 0,
    fps_update = 30,
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

### 0.2 - Part Frame example

One thing that I have found to be a problem with r0 of the sequence hooks module has to do with the expressions that I am using to set the values of the part frame and part frame max properties of the sequence object. In some cases this can result in part percent values that are over that of 1 which I would consider not valid and results in weird rendering issues in some videos. This is then the first major bug that I would like to fix in r1, along with adding other feature that I think I should have in this now that I have used it for a long time when making [videos for the javaweaver channel on youtube](https://www.youtube.com/user/javaweaver).

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
    
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        beforeObjects: function(seq){
            mesh2.position.set(4 - 8 * seq.bias, 0, 1);
            //!!! I get werid partper values in r0 THOUGH
            if(seq.partPer >= 1){
                console.log(seq.objectIndex, seq.partPer.toFixed(2), seq.frame + ' / ' + seq.frameMax)
            }
        },
        objects: [
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    camera.position.set(10 - 20 * partPer, 10, 10);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 10, 10 - 20 * partPer);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 2,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 10 - 20 * partPer, -10);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    var a = -10 + 20 * partPer;
                    camera.position.set(a, a, a);
                    camera.lookAt(mesh1.position);
                }
            }
        ]
    });
    // APP LOOP
    var secs = 0,
    fps_update = 30,
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

### 0.3 - using more than one seq object example

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

## 1 - Revision r1 of the sequence hooks module

I have been using r0 of this module for a few months now, and have found that there are a few features that I should add to help keep me from having to repeat the same code over and over again from on video to the next. That is that I would like to have a get per method that I can call of the seq object to get a value from 0 to 1 that will change depending on the current fame rather to a max frame value for the video as a whole, or a current sequence object. This is all ready the case with a static value but I would like to be able to pass a count argument that will change the number of times 0 progress to 1 over the duration of a sequence or video as a whole.

On top of having a get percent function I would also like to have a get bias function that goes from 0 to 1 back to zero a count of times in a linear way. Also I would like another function that works like this get bias function only it uses the Math sin method to do so in a not so linear way.

There is also the part frame bug that I wanted to tackle in this revision, and so so in a way where I can still use the buggy old behavior if I want to if it turns out that my newer expressions do not work as expect in all situations. With that said all of this has been addresses and added in r1 of the module here.

```js
/* seq-hooks-r1.js - sequence hooks library from threejs-examples-sequence-hooks
 *    * added an seq.getPer method
 *    * added an seq.getBias and seq.getSinBias methods
 *    * new public methods for getPer, getBias, and getSinBias
 *    * added an seg.pff (Part Frame Function) that can be set via create options
 *    * pff function is used to set what expressions to use to get partFrame and partFrame max values
 *    * three built in pff functions 'r0', 'r0Cap', and 'r1' with a default of 'r1'
 *    * can define a custom pff function if needed by just using a function rather than string value for seq.pff
 */
var seqHooks = (function () {
    var api = {};
    //******** **********
    // SET PART FRAME FUNCTIONS
    //******** **********
    var partFrameFunctions = {
        // expressions used in r0
        r0: function(seq, per2, obj){
            seq.partFrameMax = Math.floor( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = seq.frame - Math.floor( seq.frameMax * obj.per );
        },
        r0cap: function(seq, per2, obj){
            partFrameFunctions['r0'](seq, per2, obj);
            seq.partFrame = seq.partFrame >= seq.partFrameMax ? seq.partFrameMax - 1 : seq.partFrame;
        },
        // new expression for r1
        r1: function(seq, per2, obj){
            seq.partFrameMax = Math.round( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = Math.floor(seq.frame - seq.frameMax * obj.per);
        }
    }
    //******** **********
    // HELPERS
    //******** **********
    // no operation
    var noop = function(){};
    // internal get per method
    var getPer = function(a, b){
        return a / b;
    };
    // internal get bias method
    var getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };
    // get total secs value helper
    var getTotalSecs = function(seq){
        return seq.objects.reduce(function(acc, obj){ return acc + (obj.secs || 0) }, 0);
    };
    // get sin bias helper
    var getSinBias = function(per){
        var b = getBias(per);
        return Math.sin( Math.PI * 0.5 * b );
    };
    // create and return a getPer method to be used as seq.getPer
    var createGetPerMethod = function(seq){
        return function(count, objectPer){
            // by default return current 1 count per value for the current sequence object
            count = count === undefined ? 1 : count;
            objectPer = objectPer === undefined ? true: objectPer;
            // if I want a objectPer value
            var a = seq.partFrame, b = seq.partFrameMax;
            // not object per
            if(!objectPer){
                a = seq.frame; 
                b = seq.frameMax;
            }
            // base p value
            var p = getPer(a, b);
            // return base p value effected by count
            return p * count % 1;
        };
    };
    // create a get bias method to be used for sm.getBias
    var createGetBiasMethod = function(seq){
        return function(count, objectPer){
            var per = seq.getPer(count, objectPer);
            return getBias(per);
        };
    };
    // create a get bias method to be used for sm.getBias
    var createGetSinBiasMethod = function(seq){
        return function(count, objectPer){
            var per = seq.getPer(count, objectPer);
            return getSinBias(per);
        };
    };
    //******** **********
    // CREATE - create and return a new seq object
    //******** **********
    // create new seq object method
    api.create = function(opt){
        opt = opt || {};
        opt.setPerValues = opt.setPerValues === undefined ? true : false;
        var seq = {};
        seq.objectIndex = 0;
        seq.per = 0;
        seq.bias = 0;
        seq.frame = 0;
        seq.frameMax = 100;
        seq.pff = opt.pff || 'r1';
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
        // create get per method for this object
        seq.getPer = createGetPerMethod(seq);
        seq.getBias = createGetBiasMethod(seq);
        seq.getSinBias = createGetSinBiasMethod(seq);
        return seq;
    };
    //******** **********
    // SET FRAME
    //******** **********
    // update the given seq object by way of a frame, and maxFrame value
    api.setFrame = function(seq, frame, frameMax){
        seq.frame = frame === undefined ? 0 : frame;
        seq.frameMax = frameMax === undefined ? 100 : frameMax;
        // just making sure frame value is vaild
        seq.frame = seq.frame % frameMax;
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
                // fix for #0 still allows for using old methid for setting partFrame values if needed
                // while also allowing for addtional custom fix if needed by setting seq.pff to a function
                // see partFrameFunctions above for examples
                if(typeof seq.pff === 'function'){
                    seq.pff(seq, per2, obj);
                }else{
                    partFrameFunctions[seq.pff](seq, per2, obj);
                }
                // set partPer and partBias
                seq.partPer = getPer(seq.partFrame, seq.partFrameMax);
                seq.partBias = getBias(seq.partPer);
                seq.partSinBias = getSinBias(seq.partPer);
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
            obj.update(seq, seq.partPer, seq.partBias, seq.partSinBias, obj);
        }
        // call after objects hook
        seq.afterObjects(seq);
    };
    //******** **********
    // PUBLIC GET PER AND BIAS METHODS
    //******** **********
    api.getPer = function(a, b, count){
        a = a === undefined ? 0 : a;
        b = b === undefined ? 1 : b;
        count = count === undefined ? 1 : count;
        var per = a / b;
        return per * count % 1;
    };
    api.getBias = function(a, b, count){
        var per = api.getPer(a, b, count);
        return getBias(per);
    };
    api.getSinBias = function(a, b, count){
        var per = api.getPer(a, b, count);
        return getSinBias(per);
    };
    //******** **********
    // OTHER PUBLIC METHODS
    //******** **********
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
    // return public api
    return api;
}());
```

### 1.1 - Demo of new getPer, getBias and getSinBias methods

I then will want to work out at least one demo that tests these new get percent methods out. With that it would seem that the public methods of the seqhooks main global work great. I am not sure if I will need them or not but I do not thing that these should just be internal or usable for the current state of sequence objects alone.

It would seem that the methods that I added for the seq object work great, and the new get sin bias method results in some cool camera movement and mutation of values effects with fov and so forth.

```js
(function () {
    //******** **********
    // SCENE, CAMERA, and RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10))
    var width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(width, height);
    //******** **********
    // MESH
    //******** **********
    var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    //******** **********
    // PUBLIC seqHooks.getPer
    //******** **********
    console.log( seqHooks.getPer(2, 10, 1) ); // 0.2
    console.log( seqHooks.getPer(2, 10, 2) ); // 0.4
    console.log( seqHooks.getBias(2, 10, 1) ); // 0.4
    console.log( seqHooks.getBias(2, 10, 2) ); // 0.8
    console.log( seqHooks.getSinBias(2, 10, 1) ); // 0.5877852522924731
    console.log( seqHooks.getSinBias(2, 10, 2) ); // 0.9510565162951535
    //******** **********
    // CREATE seq objects using seq.getPer
    //******** **********
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        // before current seq.objects
        beforeObjects: function(seq){
            // mesh1
            var r = Math.PI * 2 * seq.per;
            var x = Math.cos(r) * 2;
            var z = Math.sin(r) * 2;
            mesh1.position.set(x, 0, z);
            mesh1.lookAt(mesh2.position);
            // defaults for camera
            camera.fov = 40;
        },
        // after current seq.objects
        afterObjects: function(seq){
            // always update camera matrix after beforeObjects hook, 
            // and current update in seq.objects
            camera.updateProjectionMatrix();
        },
        // array of objects for each sequnce
        objects: [
            {
                secs: 3,
                update: function(seq, partPer, partBias, partSinBias){
                    var p = seq.getPer(4);
                    var r = Math.PI * 2 * p,
                    x = Math.cos(r) * 5,
                    z = Math.sin(r) * 5;
                    mesh2.position.set(x, 0, z);
                    // camera
                    var b = seq.getSinBias(4);
                    camera.fov = 40 - 15 * b;
                    camera.position.set(10, 10, 10 - 5 * partSinBias);
                    camera.lookAt(0, 0, 0);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    var p = seq.getPer(2);
                    var r = Math.PI * 2 * p,
                    x = Math.cos(r) * 5,
                    z = Math.sin(r) * 5;
                    mesh2.position.set(x, z, 0);
                    // camera
                    var b = seq.getBias(2);
                    camera.fov = 40 - 15 * b;
                    camera.position.set(10, 10, 10);
                    camera.lookAt(0, 0, 0);
                }
            }
        ]
    });
    //******** **********
    // APP LOOP
    //******** **********
    var secs = 0,
    fps_update = 30,
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

### 1.2 - Fix for partFrame bug in r0, still allows for older functionally depending of seq.pff value

There is then also the question of my new expressions that are used to set the part frame and part frame max values. I need to make sure that things look good when using them and that the part percent values do not equal, let alone go over the value of 1. It would seem that the hard coded expressions that I am using for this work well, but there might come a time where I will run into some weird rendering issues again. To address this I can use the new seq.pff value to change to another built in function that sets these part frame values, including the old expressions from r0. In addition I can also define a custom function for this if need be by just setting the value of seg.pff to a function in which I define the expressions I want to use rather than a string value.

```js
(function () {
    //********
    // SCENE, CAMERA, and RENDERER
    //********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        beforeObjects: function(seq){
            mesh2.position.set(4 - 8 * seq.bias, 0, 1);
            // this will still happen depeding on the method used to get partFrame and partFrame max values
            // uncomment to use old 'r0' expressions of define custom
            //seq.pff = 'r0';
            //seq.pff = 'r0cap';
            //seq.pff = function(seq, per2, obj){
            //        seq.partFrameMax = Math.ceil( (per2 - obj.per) * seq.frameMax );
            //        seq.partFrame = Math.floor(seq.frame - seq.frameMax * obj.per);
            //};
            if(seq.partPer >= 1){
                console.log(seq.objectIndex, seq.partPer.toFixed(2), seq.partFrame + ' / ' + seq.partFrameMax)
            }
        },
        objects: [
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    camera.position.set(10 - 20 * partPer, 10, 10);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 10, 10 - 20 * partPer);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 2,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 10 - 20 * partPer, -10);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    var a = -10 + 20 * partPer;
                    camera.position.set(a, a, a);
                    camera.lookAt(mesh1.position);
                }
            }
        ]
    });
    // APP LOOP
    var secs = 0,
    fps_update = 30,
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

This might be a killing a mosquito with a cannon kind of situation, but if the r1 expressions work well long enough I might remove this bloat in any future revisions of this and just use the r1 expressions alone for this.

## 2 - Vector3 Paths feature added in r2 of sequence hooks

The main feature that I wanted to add in r2 of the sequence hooks module is a way to define some paths that can be used to define the motion of objects such as mesh objects and the camera. I have started a few projects outside of this module for this sort of thing, but sense this is a module that I use all the time I thought that if i bake something into this they I will have something at the ready to use right away while I explore options for other ways of doing this sort of thing that might involve things like the Curve class for example.

Anyway the way that I use this so to define one or more path objects that contain an array of Vector3 objects, or an array of numbers that can be converted to such an array. One example of an array fo numbers that would work is the array of a position attribute of a buffer geometry instance which is what I am doing in one of the demos for this revision of the module.

```js
/* seq-hooks.js - r2 - from threejs-examples-sequence-hooks
 *        * Made 'OTHER' publuc methods private helper
 *        * using this['seqHooks'] = {} in place of returning public api
 *        * using let and const
 *        * V3Paths
 */
(function (api) {
    //-------- ----------
    // SET PART FRAME FUNCTIONS
    //-------- ----------
    const partFrameFunctions = {
        // expressions used in r0
        r0: function(seq, per2, obj){
            seq.partFrameMax = Math.floor( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = seq.frame - Math.floor( seq.frameMax * obj.per );
        },
        r0cap: function(seq, per2, obj){
            partFrameFunctions['r0'](seq, per2, obj);
            seq.partFrame = seq.partFrame >= seq.partFrameMax ? seq.partFrameMax - 1 : seq.partFrame;
        },
        // new expression for r1
        r1: function(seq, per2, obj){
            seq.partFrameMax = Math.round( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = Math.floor(seq.frame - seq.frameMax * obj.per);
        }
    }
    //-------- ----------
    // HELPERS
    //-------- ----------
    // no operation
    const noop = function(){};
    // internal get per method
    const getPer = function(a, b){
        return a / b;
    };
    // internal get bias method
    const getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };
    // get total secs value helper
    const getTotalSecs = function(seq){
        return seq.objects.reduce(function(acc, obj){ return acc + (obj.secs || 0) }, 0);
    };
    // get sin bias helper
    const getSinBias = function(per){
        const b = getBias(per);
        return Math.sin( Math.PI * 0.5 * b );
    };
    // create and return a getPer method to be used as seq.getPer
    const createGetPerMethod = function(seq){
        return function(count, objectPer){
            // by default return current 1 count per value for the current sequence object
            count = count === undefined ? 1 : count;
            objectPer = objectPer === undefined ? true: objectPer;
            // if I want a objectPer value
            let a = seq.partFrame, b = seq.partFrameMax;
            // not object per
            if(!objectPer){
                a = seq.frame; 
                b = seq.frameMax;
            }
            // base p value
            let p = getPer(a, b);
            // return base p value effected by count
            return p * count % 1;
        };
    };
    // create a get bias method to be used for sm.getBias
    const createGetBiasMethod = function(seq){
        return function(count, objectPer){
            const per = seq.getPer(count, objectPer);
            return getBias(per);
        };
    };
    // create a get bias method to be used for sm.getBias
    const createGetSinBiasMethod = function(seq){
        return function(count, objectPer){
            const per = seq.getPer(count, objectPer);
            return getSinBias(per);
        };
    };
    // just get an array of per values based on sec values for each object, and DO NOT MUTATE the seq object
    const getPerValues = function(seq){
        const secsTotal = getTotalSecs(seq);
        const perValues = [];
        let i = 0, len = seq.objects.length;
        while(i < len){
            const per = perValues[i - 1];
            if( per === undefined ){
                perValues.push(0);
            }else{
                const perDelta = seq.objects[i - 1].secs / secsTotal;
                perValues.push( parseFloat( ( per + perDelta ).toFixed(4) ) );
            }
            i += 1;
        }
        return perValues;
    };
    // get a target frames value
    const getTargetFrames = function(seq, fps){
        fps = fps === undefined ? 30 : fps;
        const secsTotal = getTotalSecs(seq);
        return Math.ceil(secsTotal * fps);
    };
    // set per values
    const setPerValues = function(seq, fps){
        // set seq.totalSecs
        seq.totalSecs = getTotalSecs(seq);
        // set per values
        getPerValues(seq).forEach(function(per, i){
            seq.objects[i].per = per;
        });
        // set frameMax
        seq.frameMax = getTargetFrames(seq, fps);
        return seq;
    };
    //-------- ----------
    // CREATE - create and return a new seq object
    //-------- ----------
    // Parse a v3Paths object, filling in any blanks, anc convert forms other than v3array to v3array
    const parseV3PathsObject = (seq, v3Paths) => {
        // check each path object given
        v3Paths.forEach( (pathObj) => {
            // must have a key, array, and lerp bool
            pathObj.key = pathObj.key || 'unnamed_' + Object.keys(seq.v3Paths.paths).length;
            pathObj.array = pathObj.array || [];
            pathObj.lerp = pathObj.lerp === undefined ? false : pathObj.lerp; 
            // IF NUMBER ARRAY, convert to vector3 array
            if(typeof pathObj.array[0] === 'number'){
                let v3Array = [];
                let i = 0, len = pathObj.array.length;
                while(i < len){
                    v3Array.push(new THREE.Vector3(
                        pathObj.array[i],
                        pathObj.array[i + 1],
                        pathObj.array[i + 2]
                    ))
                    i += 3;
                }
                pathObj.array = v3Array;
            }
        });
    };
    // create new seq object method
    api.create = function(opt){
        opt = opt || {};
        opt.setPerValues = opt.setPerValues === undefined ? true : false;
        const seq = {};
        seq.objectIndex = 0;  // index of current sequence object in seq.objects
        seq.per = 0;          // main per and bias values
        seq.bias = 0;
        seq.frame = 0;        // frame and frameMax for the full video
        seq.frameMax = 100;
        seq.partFrameMax = 0; // partFrame and partFrame max are set by the Part Frame Function ( seq.pff )
        seq.partFrame = 0;
        seq.pff = opt.pff || 'r1';
        // parse hooks
        seq.beforeObjects = opt.beforeObjects || noop;
        seq.afterObjects = opt.afterObjects || noop;
        // setup sequence objects
        seq.objects = ( opt.objects || [] ).map(function(obj){
            obj.per = obj.per === undefined ? 0 : obj.per;
            obj.secs = obj.secs === undefined ? 0 : obj.secs;
            obj.data = obj.data || {};
            obj.update = obj.update || noop;
            obj.v3Paths = obj.v3Paths || [];
            // parse v3Paths into Vector3 objects if numbers are given
            parseV3PathsObject(seq, obj.v3Paths);
            return obj;
        });
        // set per values is part of the create process
        if(opt.setPerValues){
            setPerValues(seq, opt.fps === undefined ? 30: opt.fps);
        }
        // create get per method for this object
        seq.getPer = createGetPerMethod(seq);
        seq.getBias = createGetBiasMethod(seq);
        seq.getSinBias = createGetSinBiasMethod(seq);
        // MAIN seq.v3Paths object
        seq.v3Paths = {
            main: opt.v3Paths || [],
            paths: {}
        };
        // get pos helper
        seq.getPos = (key) => {
            return seq.v3Paths.paths[key];
        };
        // copy pos helper
        seq.copyPos = (key, target) => {
            target = target || {};
            const v3 = seq.v3Paths.paths[key];
            // if target is object3d assume copy to position
            if(target.isObject3D){
                target.position.copy(v3);
            }
            // if instance of Vector3 assume copy to that
            if(target instanceof THREE.Vector3){
                target.copy(v3)
            }
            return v3;
        };
        parseV3PathsObject(seq, seq.v3Paths.main );
        // CALL SET FRAME FOR FIRST TIME
        api.setFrame(seq, seq.frame, seq.frameMax);
        return seq;
    };
    //-------- ----------
    // SET FRAME
    //-------- ----------
    // set v3 paths for an object ( main seq object or a seq.objects object )
    const setV3PathsForObject = (seq, mainObj) => {
        const obj = mainObj ? seq : seq.objects[seq.objectIndex];
        const per = mainObj ? seq.per : seq.partPer;
        const v3Paths = mainObj ? seq.v3Paths.main : obj.v3Paths;
        const maxFrame = mainObj ? seq.frameMax: seq.partFrameMax;
        if(v3Paths){
            let i = 0, len = v3Paths.length;
             while(i < len){
                 const pathObj = v3Paths[i];
                 const array = pathObj.array;
                 const cv = new THREE.Vector3(); // current vector
                 const len = array.length - 1;
                 let vi1 = Math.floor( len * per );
                 let vi2 = vi1 + 1;
                 v12 = vi2 > len ? len : vi2;
                 // if lerp mode is true I will want to have a Vector3 that
                 // is between two as there is not one on a frame by frame basic
                 if(pathObj.lerp && array.length < maxFrame){
                     const alpha =  len * per % 1;
                     cv.copy( array[ vi1 ] ).lerp( array[ vi2 ], alpha );
                 }else{
                     // if not lerp mode just copy a vector3 from
                     // the array is it is equal to or greater than
                     // the count of frames
                     let vi1 = Math.floor( array.length * per );
                     v11 = vi1 > len ? len : vi1;
                     cv.copy( array[ vi1 ] );
                 }
                 // key in to seq.v3Paths
                 seq.v3Paths.paths[ pathObj.key ] = cv;
                 i += 1;
             }
        }
    };
    // set v3 paths for main seq and current object in seq.objects
    const setV3Paths = (seq) => {
        seq.v3Paths.paths = []; // clear paths to empty array
        setV3PathsForObject(seq, true);
        setV3PathsForObject(seq, false);
    };
    // update the given seq object by way of a frame, and maxFrame value
    api.setFrame = function(seq, frame, frameMax){
        seq.frame = frame === undefined ? 0 : frame;
        seq.frameMax = frameMax === undefined ? 100 : frameMax;
        // just making sure frame value is vaild
        seq.frame = seq.frame % frameMax;
        // set main per and bias values
        seq.per = getPer(seq.frame, seq.frameMax);
        seq.bias = getBias(seq.per);
        // update object index
        seq.objectIndex = 0;
        let i = 0, len = seq.objects.length;
        while(i < len){
            const obj = seq.objects[i];
            let per2 = 1;
            if(seq.objects[i + 1] != undefined){
                per2 = seq.objects[i + 1].per;
            }
            // if this is the current object update object 
            // index as well as other relevant values
            if(seq.per >= obj.per && seq.per < per2){
                seq.objectIndex = i;
                // fix for #0 still allows for using old methid for setting partFrame values if needed
                // while also allowing for addtional custom fix if needed by setting seq.pff to a function
                // see partFrameFunctions above for examples
                if(typeof seq.pff === 'function'){
                    seq.pff(seq, per2, obj);
                }else{
                    partFrameFunctions[seq.pff](seq, per2, obj);
                }
                // set partPer and partBias
                seq.partPer = getPer(seq.partFrame, seq.partFrameMax);
                seq.partBias = getBias(seq.partPer);
                seq.partSinBias = getSinBias(seq.partPer);
                break;
            }
            i += 1;
        }
        // V3 PATHS
        setV3Paths(seq);
        // call before hook
        seq.beforeObjects(seq);
        // call update for current object
        const obj = seq.objects[seq.objectIndex];
        if(obj){
            seq.obj = obj;
            obj.update(seq, seq.partPer, seq.partBias, seq.partSinBias, obj);
        }
        // call after objects hook
        seq.afterObjects(seq);
    };
    //-------- ----------
    // PUBLIC GET PER AND BIAS METHODS
    //-------- ----------
    api.getPer = function(a, b, count){
        a = a === undefined ? 0 : a;
        b = b === undefined ? 1 : b;
        count = count === undefined ? 1 : count;
        const per = a / b;
        return per * count % 1;
    };
    api.getBias = function(a, b, count){
        const per = api.getPer(a, b, count);
        return getBias(per);
    };
    api.getSinBias = function(a, b, count){
        const per = api.getPer(a, b, count);
        return getSinBias(per);
    };
}( this['seqHooks'] = {} ));
```

### 2.1 - Using an array of Vector3 class instances

In this demo I am creating arrays of Vector3 objects by directly calling the Vector3 constructor function. Chances are that I will not be creating paths this way in actually projects but I just want to confirm that I can create paths this way of I want to. I am thinking that the real way that I would want to create these paths would be to use some function that will create and return an array of vector3 objects.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    renderer.setSize(640, 480, false);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    // A MAIN SEQ OBJECT
    const seq = seqHooks.create({
        v3Paths: [
            {
                key: 'm1pos',
                array: [
                    new THREE.Vector3(0, 0, 5),
                    new THREE.Vector3(2,-1, 0),
                    new THREE.Vector3(2,-2,-5)
                ],
                lerp: false
            }
        ],
        beforeObjects: (seq) => {
            camera.position.set(-10, 5, 5);
            camera.lookAt(0, 0, 0);
            mesh1.position.copy(seq.v3Paths.paths['m1pos'] );
        },
        afterObjects: (seq) => {},
        objects: [
            // seq0 - 
            {
                secs: 3,
                v3Paths: [
                    {
                        key: 'm2pos',
                        array: [
                            new THREE.Vector3(5, 0, 5),
                            new THREE.Vector3(5, 0, 4),
                            new THREE.Vector3(5, 0, 3),
                            new THREE.Vector3(5, 0, 2),
                            new THREE.Vector3(5, 0, 1),
                            new THREE.Vector3(5, 0, 0),
                            new THREE.Vector3(5, 0, -1),
                            new THREE.Vector3(5, 0, -2),
                            new THREE.Vector3(5, 0, -3)
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    mesh2.position.copy(seq.v3Paths.paths['m2pos'] );
                }
            },
            // seq1 - 
            {
                secs: 7,
                v3Paths: [
                    {
                        key: 'm2pos',
                        array: [
                            new THREE.Vector3(5, 0,-3),
                            new THREE.Vector3(4, 0,-3),
                            new THREE.Vector3(3, 0,-3),
                            new THREE.Vector3(2, 0,-3),
                            new THREE.Vector3(1, 0,-3),
                            new THREE.Vector3(0, 0,-3),
                            new THREE.Vector3(-1, 0,-3),
                            new THREE.Vector3(-2, 0,-3),
                            new THREE.Vector3(-3, 0,-3),
                            new THREE.Vector3(-4, 0,-3),
                            new THREE.Vector3(-5,0,-3)
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    mesh2.position.copy(seq.v3Paths.paths['m2pos'] );
                }
            }
        ]
    });
    // APP LOOP
    const fps_update = 30,
    fps_movement = 30;
    let lt = new Date();
    const loop = () => {
        const now = new Date(),
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

### 2.2 - Using an array of numbers

Here I am testing out that the feature that I added where an array of numbers can be used that will then be converted to an array of vector3 objects works. Here I am using an array literal as a way to define the position of a camera over time. When it comes to the position of a mesh object though I am actually using the position attribute of a buffer geometry as that is an array that is formatted thins kind of way and sure enough that works just fine.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    renderer.setSize(640, 480, false);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    const pathGeo = new THREE.SphereGeometry(5, 20, 20);
    const points = new THREE.Points(pathGeo, new THREE.PointsMaterial({size: 0.25}));
    scene.add(points)
    // A MAIN SEQ OBJECT
    const seq = seqHooks.create({
        v3Paths: [
            {
                key: 'm1pos',
                // using the array of a position attribute
                array: pathGeo.getAttribute('position').array,
                lerp: true
            }
        ],
        beforeObjects: (seq) => {
            //mesh1.position.copy(seq.v3Paths.paths['m1pos'] );
            seq.copyPos('m1pos', mesh1);
            //mesh1.lookAt( seq.copyPos('m1pos') );
            mesh1.lookAt(0, 0, 0);
            camera.position.set(-12, 7, 7);
            camera.lookAt(0, 0, 0);
        },
        afterObjects: (seq) => {},
        objects: [
            // seq0 - 
            {
                secs: 30,
                v3Paths: [
                    {
                        key: 'campos',
                        array: [
                            2, 14, 2,
                            0, 12, 2,
                            -5, 10, 4,
                            -8, 7, 5,
                            -12, 7, 7
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    seq.copyPos('campos', camera);
                    camera.lookAt(0, 0, 0);
                }
            },
            // seq1 - 
            {
                secs: 30,
                update: (seq, partPer, partBias) => {
                }
            }
        ]
    });
    // APP LOOP
    const fps_update = 30,
    fps_movement = 30;
    let lt = new Date();
    const loop = () => {
        const now = new Date(),
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
