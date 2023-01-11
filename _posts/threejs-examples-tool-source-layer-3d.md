---
title: A source layer 3d drawing application threejs example
date: 2022-02-11 13:15:00
tags: [three.js]
layout: post
categories: three.js
id: 959
updated: 2023-01-11 10:54:02
version: 1.32
---

For this [threejs project example](/2021/02/19/threejs-examples/) I wanted to make a 3D version of a [2d canvas javaScript project](/2022/01/31/js-javascript-example-tool-source-layer-2d/) that I made a little while back that has to do with something I am calling a source layer. The general idea of what I have in mind here is to make my own art program that involves setting up what the content of a resource layer is, then I have one or more additional canvas layers positioned on top of that source layer that I draw on. 

There may be alternative ways of doing this sort of thing such as just creating a scene the way that I want to, adjust the position of the camera and so forth and then just take a still picture and open that still picture up in an image editing program like GIMP. Any decent image manipulation program such as GIMP will have layers as a feature, so I can add the still of the scene as a source layer, then create another layer on top of that and draw to that. with that said there is the question of how to go about justifying making something like this rather than just using tools that are all ready out there to work with. I can not think of that much, but for starters there is just making a minimal custom tailored program that is made for a specific kind of work flow, or over all style. Aside from that it is possible that this example might just prove to be another one of my unfinished prototypes for some kind of application using threejs.

I would like to make at least one, if not more projects that function as a kind of tool to help in in the process of making projects though. This project might not prove to be the best example of this kind of thing, but sooner or later I might expand on this specific kind of threejs example. That is to create some kind of tool that helps in in the process of making some kind of asset or file product.

<!-- more -->


## This source layer threejs project example, and what to know first

This is a project in which I am using [threejs](/2018/04/04/threejs-getting-started/), as well as [vuejs](/2019/05/05/vuejs-getting-started/) when it comes to front end libraries. I am also using one additional file on top of just threejs alone that is the [Collada File loader](/2021/04/30/threejs-dae-collada-loader/) that can be found in the threejs github repository. On top of that I am also making use of several javaScript files of my own that make use of these various files that have to do with threejs and vuejs, as well as a little back end code, and I am also using dae files are a resource for this art application example on top of that actually.

So if you are still fairly new to javaScript this post might prove to be a little to advanced for you, also even if you have some experience with javaScript it still might be a bit of a pain to reproduce what I am writing about here on you end. So maybe the best way would be to clone down my test vjs github repository and do an npm install in order to set things up quick. In any case in this section I will be going over a few quick points about this project example that one should e aware of before continuing to read the result of the content in this post.

### The source code for this example is on Github

The full source code for this project example, as well as the source code for older revisions, and any additional revisions to which I have not revised this content for possible can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-tool-source-layer-3d) on Github. If you want to reproduce what I am writing about here on you end it might be best to install the full project there, as I am making use of additional back end code, and dea models and so forth.

### Version numbers matter with threejs

When I was first working on this example I was using [r127 of threejs](https://github.com/mrdoob/three.js/releases/tag/r127), and I am also using 2.6.14 of vuejs. The vuejs library seems to be fairly solid, and development on it is slow, however that is not so much the case with threejs as new revisions come out often and code breaking changes are often introduces in new revisions.

## 1 - The Main javaScript file

In my main javaScript file I have code worked out for the scene layer of this project as well as additional code that has to do with updating the content of this scene layer.

For the source layer application I am doing the typical set of things that are true with any threejs application as such it is here that I am creating a scene, camera, light, and renderer objects that compose any other threejs object. On top of that thought I am also creating a vuejs instance that will serve as a way to [create a template](/2019/05/07/vuejs-template/) for a user interface that will be used to mutate settings for a [vue data object](/2019/05/18/vuejs-data/), and then it will be these vue data object settings that will be used to then update values of the scene and render the new state of the scene.

I have found a way to directly work with the Collada loader in revision 1 of this example. To do so I just need to pass the text content for the first argument of the parser, and then the path argument of the loader is used to know what the base url is when it comes to loading any additional assets that the dea file may use such as textures. So then there is a file input element that is used to load the dae file, and then there is also a dea path text input element that is used to set what the path os for any additional assets. The path set must be absolute relative to the view folder in my test threejs project folder.

```js
(function () {
 
    // ---------- ----------
    // SCENE CAMERA LIGHT, RENDERER, and CONTAINER
    // ---------- ----------
    var scene = new THREE.Scene(); // scene
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var pl = new THREE.PointLight(0xffffff); // point light
    pl.position.set(2, 5, 3);
    scene.add(pl);
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000); // camera
    camera.position.set(-15, 15, -15);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer(); // render
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    renderer.domElement.style.position = 'absolute';
    container.style.width = "940px";
    container.style.height = "480px";
    container.style.position = 'relative';
    container.appendChild(renderer.domElement);
 
    var div_sl = document.createElement('div');
    div_sl.id = 'source-layer-ui';
    container.appendChild(div_sl);
 
    // ---------- ----------
    // SOURCE LAYER UI
    // ---------- ----------
 
    var vm = new Vue({
            el: '#source-layer-ui',
            template: '<div style="background:#00afaf;position:relative;left:640px;width:280px;padding:10px;">' +
            '<h4>SOURCE LAYER 3D <span>{{ version }}</span> UI: </h4>' +
            '<h5>Model</h5>' +
            '<span> <input type="button" value="clear" v-on:click="clear"> </span><br> ' +
            '<span> dea file: <input type="file" v-on:change="loadFile"> </span><br> ' +
            '<span> dae path: <input type="text" v-model="path" > </span><br> ' +
            '<h5>Zoom and Rotate</h5>' +
            '<span> zoom:  <input v-model="zoom" type="range" min="2" max="20" step="0.25"></span> {{ zoom }} <br> ' +
            '<span> phi:   <input v-model="phi" type="range" min="0" max="360" step="1"></span> {{ phi }} <br>' +
            '<span> theta: <input v-model="theta" type="range" min="0" max="360" step="1"></span> {{ theta }} <br>' +
            '</div>',
            mounted: function () {
                this.setZoom();
                // creating dea objects
                this.$data.daeObjects = DAE.create({
                    onItemProgress: function (per, n, d) {},
                    onFileLoad: function (result, allResults, daeObjects) {},
                    onLoad: function (daeObjects, results) {
                        results.forEach(function (result, i) {
                            var group = DAE.createGroup(daeObjects, result);
                            group.z = 0;
                            scene.add(group);
                        });
                        renderer.render(scene, camera);
                    }
                });
                this.loadDEAFiles();
            },
            updated: function () {
                this.setZoom();
            },
            data: {
                version: 'r1',
                path: '/dae/rpi4/',
                zoom: 20,
                phi: 65,
                theta: 45,
                daeObjects: null
            },
            methods: {
                // set zoom and rotation
                setZoom: function () {
                    var dat = this.$data,
                    phi = dat.phi / 360 * (Math.PI * 2),
                    theta = dat.theta / 360 * (Math.PI * 2);
                    camera.position.setFromSphericalCoords(dat.zoom, phi, theta);
                    camera.lookAt(0, 0, 0);
                    renderer.render(scene, camera);
                },
                // clear the source layer
                clear: function () {
                    console.log('clear');
                    this.$data.daeObjects = DAE.create({});
                    scene.children.forEach(function (obj3d) {
                        console.log(obj3d.type)
                        if (obj3d.type === 'Group') {
                            scene.remove(obj3d);
                        }
                    })
                    renderer.render(scene, camera);
                },
                // load a single file by file input element
                loadFile: function (e) {
                    var data = this.$data;
                    var daeObjects = data.daeObjects;
                    e.target.files[0].text()
                    .then(function (text) {
                        var manager = new THREE.LoadingManager();
                        // the collada loader instance
                        var loader = new THREE.ColladaLoader(manager);
                        var result = loader.parse(text, data.path)
                        manager.onLoad = function(){
                            renderer.render(scene, camera);
                        }
                        var group = DAE.createGroup(daeObjects, result);
                        scene.add(group);
                    })
                },
                // load dea files
                loadDEAFiles: function () {
                    DAE.loadAll(this.$data.daeObjects, {
                        baseUrl: '/dae',
                        relUrls: [
                            //'rpi4/rpi4_start_box.dae',
                            'obj/obj.dae'
                        ]
                    });
                }
            }
        });
 
}
    ());
```

## 2 - The draw javaScript for for the draw canvas layer

I have an additional file that is all the source code that has to do with the draw canvas layer that I position on top of the source layer. So then where the source layer is the resource that I will be using for a reference as to what to draw, the draw layer on top of that is the layer where I will actually be drawing to with the mouse and or touch screen.

With the canvas element that I append to a shared container element with the source layer I am attaching a number of events for pointer events. I went with pointer events rather than mouse and touch events alone because for this drawing module I did not care to go all out with features, I just wanted a simple clean, simple drawing application type thing to use on top of the source layer which is really the main focus of this project example. If I where to keep working on this I might want to have separate events for touch and mouse events and do things like have a custom right click menu and so forth, but for now I just want to keep things simple with this.

Just like with the source layer application I have a vue instance in which I am defining a template for a user interface that will be used to control things when it comes to various settings for the state of the drawing app. When it comes to a very simple drawing app I am still going to want to be able to do things like change brush size, color, and clear the canvas at the very least and the ui that this template creates allows for me to do just that by mutating a vue data object that contains those settings.

```js
(function () {
 
    // ---------- ----------
    // CANVAS
    // ---------- ----------
    var container = document.getElementById('demo'),
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.width = '640px';
    canvas.style.height = '480px';
 
    canvas.onselectstart = function () { return false; }
    container.appendChild(canvas);
 
    var div_dl = document.createElement('div');
    div_dl.id = 'draw-layer-ui';
    container.appendChild(div_dl);
    // ---------- ----------
    // DRAW LAYER UI
    // ---------- ----------
    var vm = new Vue({
        el:'#draw-layer-ui',
        template: '<div style="background:#4faf00;position:relative;left:640px;width:280px;padding:10px;">'+
            '<h4>DRAW UI: </h4>'+
            '<span> Color: <input v-model="color" type="color" ></span><br>' +
            '<span> Size:  <input v-model="size" type="range" min="0.5" max="20" step="0.25"></span> {{ size }} <br>' +
            '<span> Clear: <input type="button" value="Clear" v-on:click="clear" ></span><br>' +
        '</div>',
        mounted: function () {
            
        },
        updated: function () {
         
        },
        data: {
            color: '#000000',
            size: 1
        },
        methods: {
            clear: function(){
                ctx.clearRect(-1, -1, canvas.width + 2, canvas.height + 2);
            }
        }
    });
 
    // ---------- ----------
    // DRAW LAYER EVENTS
    // ---------- ----------
    var drawState = {
       down: false
    };
    canvas.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(e.pointerType === 'mouse'){
            if(e.button === 0){
                drawState.down = true;
            }
        }else{
            drawState.down = true;
        }
    });
    canvas.addEventListener('pointerup', (e) => {
        drawState.down = false;
    });
    canvas.addEventListener('pointerout', (e) => {
        drawState.down = false;
    });
    canvas.addEventListener('pointermove', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(drawState.down){
            var bx = canvas.getBoundingClientRect(),
            dat = vm.$data,
            x = e.clientX - bx.left,
            y = e.clientY - bx.top;
            ctx.fillStyle = dat.color;
            ctx.beginPath();
            ctx.arc(x, y, dat.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });
 
}
    ());
```


## 3 - The dae tools file

A while back I started another [threejs project example that has to do with a dae files](/2021/06/25/threejs-examples-dae-tools/). When it comes to working just with threejs alone, as well as additional files in the repository there is the Collada Loader that can be used on top of just threejs alone. However this loader will just load whatever the state of the file is, and not preform any additional filtering when it comes to what it is in the file that I actually want to add to a scene. Also there might be more than one way that I would want to use the features of this Collada Loader, and so forth. As such there appears to be a need for at least a little additional javaScript code that acts as one little additional abstraction for loading dae files, and also I will want a place to park any and all additional code that has to do with dae files, beyond just that of what there is to work with when it comes to threejs and the Collada Loader alone, thus I am using a dae files module of my own for this project.

This module contains a create method where I can set methods for events like what to do as a file is being loaded, what to do when the loading of a dae file is over an so forth. I can then pass this object as an argument when calling a load all method of the module and when doing so I can set additional options that have to do with a base url, along with one or more additional relative paths from that base url that are dea files that I want to load. However when it comes to the kind of project there might be alternative ways that I go about loading  a dae file that involve for example the File Input element to load a dae file in a local file system rather than that of making a scripted http call over a network. So in any case as to how to I go about parsing dae files I also have methods that have to do with filtering the end result, regardless of how that result was created.

```js
(function (api) {
 
    // create a daeObjects state object
    api.create = function (opt) {
        opt = opt || {};
        var state = {
           results: [],
           onItemProgress : opt.onItemProgress || function(){},
           onFileLoad : opt.onFileLoad || function(){},
           onLoad : opt.onLoad || function(){}
        };
        return state;
    };
 
    // load one dae file
    var loadOne = function(daeObjects, url, onFileLoad){
        // I will want a manager for this
        var manager = new THREE.LoadingManager();
        // the collada loader instance
        var loader = new THREE.ColladaLoader(manager);
        // result value to pass to onFileLoad
        var resultValue = {};
        onFileLoad = onFileLoad || function(){};
        // return a promise
        return new Promise(function(resolve, reject){
            // call on done, and resolve the promise only when the dae file AND all textures load
            var len = daeObjects.results.length;
            manager.onLoad = function(){
                onFileLoad(resultValue, daeObjects.results, daeObjects);
                resolve(daeObjects);
            };
            // load the dae file and any textures
            loader.load(url,
                // done
                function (result) {
                    resultValue = result;
                    daeObjects.results.push(result);
                },
                // progress
                function(xhr){
                  //console.log(xhr);
                },
                // error
                function(e){
                    reject(e);
                }
             );
        });
    };
 
    // load a collection of dea files
    api.loadAll = function(daeObjects, opt){
        opt = opt || {};
        opt.baseUrl = opt.baseUrl === undefined ? '/' : opt.baseUrl;
        opt.relUrls = opt.relUrls === undefined ? [] : opt.relUrls;
        opt.origin = opt.origin === undefined ? document.location.origin : opt.origin;
        // resolve urls
        var url_obj_base = new URL(opt.baseUrl, document.location.origin);
        var urls = opt.relUrls.map(function(relUrl){
            var url_obj_file = new URL(relUrl, url_obj_base.href + '/');
            return url_obj_file.href;
        });
        // create and return Promise.all of load one method called for each file
        var n = 0,
        d = urls.length;
        return Promise.all(urls.map(function(url, i){
            return loadOne(daeObjects, url, daeObjects.onFileLoad).then(function(){
                n += 1;
                daeObjects.onItemProgress(n / d, n , d);
            });
        })).then(function(){
            daeObjects.onLoad(daeObjects, daeObjects.results);
        });
    };
 
    // create a group from a dae result object
    api.createGroup = function(daeObjects, what){
        var result = typeof what === 'object' ? what : daeObjects.results[what];
        var group = new THREE.Group();
        // copy mesh objects only
        result.scene.children.forEach(function(obj){
            if(obj.type === 'Mesh'){
                group.add(obj.clone());
            }
        });
        // copy result.scene rotation to group
        group.rotation.copy(result.scene.rotation);
        return group;
    };
}
    (this['DAE'] = {}));
```

## Conclusion

This is it for now then, at least when it comes to revision 1 of this example as that Is the revision that I was writing about when I first started writing this blog post. I do have things planed out for future revisions in my todo list for this example, but that is a practice for all my other threejs examples also.

Even if I do not get around to make any and all additional improvements to this example there are a few things that I have done in this example that I have not done in any other threejs example of min thus far that I do aim to repeat in future examples, and also with additional revisions of older examples. Thus far with my threejs example I have been sticking mainly to just using threejs alone, however with this example I also made use of vuejs with the fron end system also rather than doing what I often do with is just having my own vanilla javaScript code alone on top of threejs. I have found that I do like using vuejs when it comes to a front end framework, and I have to say that it does help to keep this well organized compared to what I often do working with vanilla javaScript alone.

Regardless of who many libraries I use with a project, compared to how much vanilla javaScritp code I right there is another things that I think I should keep up with when it comes to making additional projects. For this example I in a way I did not make just one application, but in a way to separate applications that can be used together in a single web page. That is that I though not of making just one single application but two or more applications that work together. When doing this sort of thing each application should still work well on its own. For this example I have code that is just used to create a scene, and another application that is just a simple drawing app. They could both be used on there own, but by making use of both of them in a certain way I can have this one application that is used to create and mutate the state of a scene, and other layer that is used to create an mutate the state of a drawing of that scene.