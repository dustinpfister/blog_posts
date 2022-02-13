---
title: threejs source layer 3d example
date: 2022-02-11 13:15:00
tags: [three.js]
layout: post
categories: three.js
id: 959
updated: 2022-02-13 08:55:18
version: 1.9
---

For this weeks post on threejs I made another simple [threejs project example](/2021/02/19/threejs-examples/), this time around I wanted to make a 3d version of a [2d plain canvas javaScript project](/2022/01/31/js-javascript-example-tool-source-layer-2d/) that I made a little while back that has to do with something I am calling a source layer. The general idea of what I have in mind here is to make my own art program that involves setting up what the content of a resource layer is, then I have one or more additional canvas slayers positioned on top of that source layer that I draw on.

<!-- more -->


## 1 - What to know first

This is a project in which I am using threejs, as well as vuejs when it comes to front end libraries. So if you are still fairly new to javaScript this post might prove to be a little to advanced for you.

### 1.1 - The source code for this example is on Github

The full source code for this project example, as well as the source code for older revisions, and any additional revisions to which I have not revised this content for possible can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-tool-source-layer-3d) on Github. If you want to reproduce what I am writing about here on you end it might be best to install the full project there, as I am making use of additional back end code, and dea models and so forth.

### 1.2 - Version numbers matter with threejs

When I was first working on this example I was using r127 of threejs, and I am also using 2.6.14 of vuejs.

## 2 - The Main javaScript file

In my main javaScript file I have code worked out for the scene layer of this project as well as additional code that has to do with updating the content of this scene layer.

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

## 3 - The draw javaScript for for the draw canvas layer

I have an additional file that is all the source code that has to do with the draw canvas layer that I position on top of the source layer. So then where the source layer is the resource that I will be using for a reference as to what to draw, the draw layer on top of that is the layer where I will actually be drawing to with the mouse and or touch screen.

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


## 4 - The dae tools file

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

## 5 - Conclusion

This is it for now then, at least when it comes to revision 1 of this example as that Is the revision that I was writing about when I first started writing this blog post. I do have things planed out for future revisions in my todo list for this example, but that is a practice for all my other threejs examples also. I may or may not get around to actually making improvements to this.