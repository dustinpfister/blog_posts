---
title: A Timer video javaScript module threejs example
date: 2022-12-23 11:00:00
tags: [three.js]
layout: post
categories: three.js
id: 1019
updated: 2023-02-13 12:52:16
version: 1.11
---

This [threejs project examples post](https://threejs.org/examples/) is on a javaScript file that I am using to help me with the process of making what I would call a count down, or [timer videos](https://www.youtube.com/watch?v=_W0bSen8Qjg). This is just simply a kind of video where there is a count down that starts from when the video starts from a given start time such as 30 seconds, and then counts down to 0. When 0 is reached the video is over, or there is a little additional time that is an alarm sound or something to that effect.

When it comes to making videos for these blog posts using threejs as well as some of my own additional software, I am always thinking about what it is that I should do different with them. For now as of this writing the existing state of affairs is to just continue with simple demo videos that just showcase what the JavaScript code for a given post on threejs will do. Once again I think that this will be the case here, but maybe with only just one video. I can use the countdown module to create one of my usual 30 second demo videos that has been the pattern thus far, however I can also use it to make videos that are any given time length long. So this will then be a great tool for my other collection of video content thus far which is just a general experimental collection of content.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/5g1hAQ0LuX0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The count-down.js threejs project example and what to know first

This is a blog post on some JavaScript code that I have made that works on top of threejs as well as additional code both of mine as well as additional official threejs assets to create timer videos. It should got without saying but I will say it anyway, this is not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/) or JavaScript in general. This post and the many others that i have made like it thus far, are for people that have at least a fair about of experience with JavaScript and the threejs library and are now looking for ideas for various projects to make. I will not then be getting into basic things that should be solid at this point. Still in this section I might write about a few things that you might want to read about more before reading the rest of the content.

### The count-down.js file as well as the demos make use of additional files and assets beyond just threejs

On top of using threejs alone I also am using the [threejs DAE file Loader](/2021/04/30/threejs-dae-collada-loader/) as an additional threejs file. The reason why is because I have a DAE loader method as one of the public methods of the count-down.js file that works on top of this feature that is not baked into the core of threejs itself. Also a number of my demos make use of this methods and thus also external [dae files](https://github.com/dustinpfister/test_threejs/tree/master/views/dae/count_down_basic) that are loaded with said dae loader methods and underlying file that makes use of it. Also a number of my demos for count-down.js make use of canvas texture that I am creating with my canvas.js file that I made for my [blog post on canvas textures](/2018/04/17/threejs-canvas-texture/).

<iframe class="youtube_video"  src="https://www.youtube.com/embed/E1RSRGI6RkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Source code examples up on Github

I also have the source that I am writing about here [up on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-count-down).

### Version Numbers matter.

When I first wrote this post I was using [r146 of threejs](https://github.com/mrdoob/three.js/releases/tag/r146).

## 1 - R1 of count-down.js and demos, Removed dae loader and using Scene objects for source mesh objects

One major change with this revision of count-down.js is the removal of the DAE loader abstraction in favor of the use of another abstraction that works better, or just directly working with the DAE loader alone. Another major change was to start using Scene objects in place of plain old javaScript objects when it comes to giving a set of objects to use for the numbers. This allows for me to make use of object3d class methods like that of the [get object by name method](/2021/05/12/threejs-object3d-get-by-name/) as a way to get only the objects that are needed in the given source object.

There is a lot more that I also wanted to change of course but for now I will be just chalking all of that up for the next revision of this module that may very well happen if I do continue to use this module in actual projects. So in this section I will be just quikly going over the state of R1 of count-down.js, and just two demos.

### 1.a - Source code of count-down.js \( r1 \) 

First off the source code of the module itself. With that said code that has to do with loading and processing objects created from a DAE file asset have been removed. There is now just the create and set methods along with that one add lines method when it comes to public methods. Changes have also been made when it comes to the 

```js
// count-down.js - r1 - from threejs-examples-count-down
//    * create method now takes a scene_source object that is a THREE.Scene Object
//    * DAE loader removed in favor of using things like demo-helper-r0 from threejs-dae-loader
(function(api){
    //-------- ----------
    // DEFAULT OPTIONS
    //-------- ----------
    const DEFAULT_WIDTH = 2;
    const DEFAULT_DIGIT_COUNT = 2;
    //-------- ----------
    // DEFAULT SCENE SOURCE OBJECTS
    //-------- ----------
    const DEFAULT_SCENE_SOURCE = new THREE.Scene();
    let i = 0;
    while(i < 10){
        const n = 5 + 10 * i;
        const geo = new THREE.SphereGeometry(DEFAULT_WIDTH / 2, n, n);
        const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ wireframe: true}));
        mesh.name = 'num_' + i;
        DEFAULT_SCENE_SOURCE.add(mesh);
        i += 1;
    }
    //-------- ----------
    // HELPERS
    //-------- ----------
    // to pad string ( 9 to 009 if 3 digits )
    const toPadString = (a, digits) => {
        return String(a).padStart(digits, '0');
    };
    // position a digit group
    const positionDigit = (digit, di, digitCount, width) => {
        const hd = digitCount / 2;
        const sx = hd * width * -1;
        digit.position.x = width / 2 + sx + width * di;
    };
    //-------- ----------
    // CREATE METHOD
    //-------- ----------
    api.create = (opt) => {
        opt = opt || {};
        opt.digitCount = opt.digitCount === undefined ? DEFAULT_DIGIT_COUNT : opt.digitCount;  // 2 digits
        opt.timeStr = opt.timeStr || '';
        // USE A SCENE OBJECT
        opt.scene_source = opt.scene_source || DEFAULT_SCENE_SOURCE;
        opt.width = opt.width === undefined ? DEFAULT_WIDTH : opt.width;
        opt.countID = opt.countID || '';
        // main count object
        const countObj = new THREE.Group();
        countObj.name = opt.countID;
        // for each digit, clone all source objects
        let di = 0;
        while(di < opt.digitCount){
            const digit = new THREE.Group();
            digit.name = opt.countID + '_' + di;
            // position digit group
            positionDigit(digit, di, opt.digitCount, opt.width);
            countObj.add(digit);
            let ni = 0;
            while(ni < 10){
                // clone the mesh object by getting the propper object from scene
                const mesh = opt.scene_source.getObjectByName('num_' + ni).clone();
                mesh.name = opt.countID + '_' + di + '_' + ni;
                mesh.visible = false; // mesh objects viable gets set true based on time value
                // I will want a clone for the geometry and material also
                mesh.geometry = mesh.geometry.clone();
                mesh.material = mesh.material.clone();
                digit.add(mesh);
                ni += 1;
            }
            di += 1;
        }
        api.set(countObj, opt.timeStr);
        return countObj;
    };
    //-------- ----------
    // SET METHOD
    //-------- ----------
    // set to the given time string
    api.set = (countObj, timeStr) => {
        let di = 0;
        const digitCount = countObj.children.length;
        timeStr = toPadString(timeStr, digitCount);
        while(di < digitCount){
            let ni = 0;
            while(ni < 10){
                const mesh = countObj.getObjectByName(countObj.name + '_' + di + '_' + ni);
                const n = parseInt(timeStr[di]);
                mesh.visible = false;
                if(n === ni){
                    mesh.visible = true;
                }
                ni += 1;
            }
            di += 1;
        }
    };
    //-------- ----------
    // OTHER PUBLIC METHODS
    //-------- ----------
    // add lines for a mesh object
    api.addLine = (obj, s, pos, lw, color) => {
        s = s === undefined ? 1 : s;
        pos = pos || new THREE.Vector3();
        const material_line = new THREE.LineBasicMaterial({
            color: color || 0xffffff, 
            linewidth: lw === undefined ? 8: lw,
            transparent: true, opacity: 1
        });
        const line = new THREE.LineSegments( new THREE.EdgesGeometry(obj.geometry), material_line );
        line.scale.set(s, s, s);
        line.position.copy(pos);
        obj.add(line);
    };
}( this['countDown'] = {} ));
```

### 1.1 - Built in objects work okay \( r1 demo \) 

For this demo I just wanted to make sure that the new default scene object works okay when it comes to just calling the main create method without any arguments at all. I never do this when it comes to final projects of course but still I thing this module should have some built in place holder objects. This is a feature that I might refine better in future revisions, but for now the built in objects are still just mesh objects with sphere geometry that will increases in terms of the number of vertices for each number.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const group_cd_default = countDown.create();
group_cd_default.position.set(0,0,-3)
scene.add(group_cd_default);
const group_cd = countDown.create({ digitCount: 3 });
scene.add(group_cd);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,  // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    countDown.set( group_cd_default, frame );
    countDown.set( group_cd, frame );
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
```

### 1.2 - Using DAE helper method from my post on the DAE loader

I pulled out the code from count-down.js that was an abstraction for the DAE loader. There where a number of problems with it that I could have fixed, but I figured that this is something that should be done in the demo or project code actually. This is what I have found myself starting to do with projects anyway, that is just directly working with the DAE loader, or when it comes to this demo use a better abstraction that resolves the problems that I have ran into. With that said in this example I am using the dae helper module that I write about in detail [my blog post on the DAE loader](/2021/04/30/threejs-dae-collada-loader/).

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// THE COINT DOWN GROUP - using let here so that I can re-assign in loader code below
// ---------- ----------
let group_cd = countDown.create();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,  // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    countDown.set( group_cd, frame );
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
//-------- ----------
// LOAD CUSTOM SCENE OBJECT FOR NUMBERS
//-------- ----------
DAE_loader({
    urls_dae: ['/dae/count_down_basic/cd4-nums.dae'],
    urls_resource: ['/dae/count_down_basic/skins/depth_256/'],
    cloner: function(obj, scene_source, scene_result, result){
        if(obj.type === 'Mesh' ){
            obj.position.set(0,0,0);
            obj.material = new THREE.MeshBasicMaterial({ map: obj.material.map });
            scene_source.add(obj.clone());
        }
    }
})
.then((scene_source) => {
    group_cd = countDown.create({
        scene_source: scene_source,
        digitCount: 3
    });
    scene.add(group_cd);
    loop();
});
```

## 2 - The first version of count-down.js \( r0 \) and demos

In this section I am writing about the very first version of this count down module, and a few demos that make use of it.

### 2.a - The count down module

The very first version of this count down module all ready has a number of public methods. There is the create method that when called will create and return a main group object. This main group object will contain a number of children each of which is another group that is for a given digit. Each digit group object will then also contain ten mesh objects one for each number that is used in a base 10 counting system. Setting the current time is then a matter of looping over each child of each digit group setting the [visible object3d property](/2021/05/24/threejs-object3d-visible/) of each mesh to false by default and then true if the current mesh object is the number for the current digit.

There is the idea of making the kind of system where I just simply create a single mesh object for each digit, and maybe that is something that I will get to in future revisions when and if I even make it to that bridge to begin with. It may prove to be a better all around solution, but it also presents a number of problems that can be fixed by way this alternative nested group like system. One of the major concerns that comes to mind has to do with updating the geometry for the mesh objects, I would need to keep things consistent in terms of the number of points used in each geometry for each number. Maybe that is not such a bad thing and maybe it is something that I should be doing anyway when it comes to making my DAE files for this project. However getting into this can of worms is something that I would like to not get into at this point. This is the first version after all so for now I would like to have something that just works okay to create the final product, which in this case is a collection of frames for a video.

I then have my set method in which I pass one of these group objects that I make with the create method along with a string value that will be used to set the current state of the objects to a given count. After that I have a DAE loader method that works on top of the threejs DAE loader.

```js
// count-down.js - r0 - from threejs-examples-count-down
(function(api){
    //-------- ----------
    // DEFAULT SOURCE OBJECTS
    //-------- ----------
    const DEFAULT_OBJECTS = {};
    let i = 0;
    while(i < 10){
        const n = 5 + 10 * i;
        const geo = new THREE.SphereGeometry(0.5, n, n);
        DEFAULT_OBJECTS[i] = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ wireframe: true}));
        i += 1;
    }
    //-------- ----------
    // HELPERS
    //-------- ----------
    // to pad string ( 9 to 009 if 3 digits )
    const toPadString = (a, digits) => {
        return String(a).padStart(digits, '0');
    };
    // position a digit group
    const positionDigit = (digit, di, digits, width) => {
        const hd = digits / 2;
        const sx = hd * width * -1;
        digit.position.x = width / 2 + sx + width * di;
    };
    // what to do for a DAE result object
    const DAE_on_loaded_item = (result, SOURCE_OBJECTS) => {
        // loop children of scene object
        result.scene.children.forEach( (obj) => {
            // if an object is a mesh object
            if(obj.type === 'Mesh'){
                let key = obj.name;
                // if name begins with num_ replace with ''
                if(key.match(/num_/)){
                    key = key.replace('num_', '');
                }
                SOURCE_OBJECTS[key] = obj;
                obj.position.set(0, 0, 0);
            }
        });
    };
    //-------- ----------
    // CREATE METHOD
    //-------- ----------
    api.create = (opt) => {
        opt = opt || {};
        opt.timeStr = opt.timeStr || '00';
        opt.digits = opt.digits === undefined ? 2 : opt.digits;  // 2 digits
        opt.source_objects = opt.source_objects || DEFAULT_OBJECTS;
        opt.width = opt.width === undefined ? 1 : opt.width;
        opt.countID = opt.countID || '';
        // main count object
        const countObj = new THREE.Group();
        countObj.name = opt.countID;
        // for each digit, clone all source objects
        let di = 0;
        while(di < opt.digits){
            const digit = new THREE.Group();
            digit.name = opt.countID + '_' + di;
            // position digit group
            positionDigit(digit, di, opt.digits, opt.width);
            countObj.add(digit);
            let ni = 0;
            while(ni < 10){
                // clone the mesh object
                const mesh = opt.source_objects[ni].clone();
                mesh.name = opt.countID + '_' + di + '_' + ni;
                mesh.visible = false; // mesh objects viable gets set true based on time value
                // I will want a clone for the geometry and material also
                mesh.geometry = mesh.geometry.clone();
                mesh.material = mesh.material.clone();
                digit.add(mesh);
                ni += 1;
            }
            di += 1;
        }
        api.set(countObj, opt.timeStr);
        return countObj;
    };
    //-------- ----------
    // SET METHOD
    //-------- ----------
    // set to the given time string
    api.set = (countObj, timeStr) => {
        let di = 0;
        const digits = countObj.children.length;
        timeStr = toPadString(timeStr, digits);
        while(di < digits){
            let ni = 0;
            while(ni < 10){
                const mesh = countObj.getObjectByName(countObj.name + '_' + di + '_' + ni);
                const n = parseInt(timeStr[di]);
                mesh.visible = false;
                if(n === ni){
                    mesh.visible = true;
                }
                ni += 1;
            }
            di += 1;
        }
    };
    //-------- ----------
    // DAE FILE LOADER 
    //-------- ----------
    api.DAE_loader = function( dae_urls, on_loaded_item ){
        on_loaded_item = on_loaded_item || function(){};
        const manager = new THREE.LoadingManager();
        const SOURCE_OBJECTS = {};
        return new Promise( (resolve, reject) => {
            // ERROR WHEN LOADING
            manager.onError = function(url){
                reject(new Error( 'error when loading: ' + url ));
            };
            // WHEN ALL LOADING IS DONE
            manager.onLoad = function(){
                resolve(SOURCE_OBJECTS);
            };
            dae_urls.forEach((url) => {
                const loader = new THREE.ColladaLoader(manager);
                loader.load(url, function(result){
                    // what to do for each DAE by calling the built in helper for this
                    DAE_on_loaded_item(result, SOURCE_OBJECTS);
                    on_loaded_item(result, SOURCE_OBJECTS );
                });
            });
        });
    };
    // add lines for a mesh object
    api.addLine = (obj, s, pos, lw, color) => {
        s = s === undefined ? 1 : s;
        pos = pos || new THREE.Vector3();
        const material_line = new THREE.LineBasicMaterial({
            color: color || 0xffffff, 
            linewidth: lw === undefined ? 8: lw,
            transparent: true, opacity: 1
        });
        const line = new THREE.LineSegments( new THREE.EdgesGeometry(obj.geometry), material_line );
        line.scale.set(s, s, s);
        line.position.copy(pos);
        obj.add(line);
    };
}( this['countDown'] = {} ));
```

### 2.1 - Using canvas elements to create textures

This will be the first demo of the count-down.js file in which I am using a custom set of source objects that I create in the demo file. I do have the default objects of course, but I am sure that in any given project I am not going to be using those. The source objects for this demo are then just a bunch of mesh objects that use the [THREE.BoxGeometry](/2021/04/26/threejs-box-geometry/) class for the Geometry of each object. However I will be making use of my [canvas.js file from my canvas textures module](/2018/04/17/threejs-canvas-texture/) in order to create the textures that I will use for each mesh object of each number.

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1, 3, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // CUSTOM OBJECTS
    //-------- ----------
    // draw method
    const drawNumber = (canObj, ctx, canvas, state) => {
        // black background
        ctx.fillStyle = canObj.palette[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // white outline
        ctx.strokeStyle = canObj.palette[1];
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        // white text
        ctx.fillStyle = canObj.palette[1];
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '16px arial';
        ctx.fillText(state.char, 16, 16);
    };
    // createing custom objects using canvas.js r2
    const SOURCE_OBJECTS = {};
    let i = 0;
    while(i < 10){
        const canObj = canvasMod.create({
            size: 32,
            update_mode: 'canvas',
            palette: ['black', 'white'],
            state: {
               char: i,
            },
            draw: drawNumber
        });
        canvasMod.update(canObj);
        SOURCE_OBJECTS[i] = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: canObj.texture
            })
        );
        i += 1;
    }
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    // seconds
    const count_sec = countDown.create({
        countID: 'sec',
        digits: 2,
        width: 1.25,
        source_objects: SOURCE_OBJECTS
    });
    count_sec.position.set(-1, 0, 0);
    scene.add(count_sec);
    const count_ms = countDown.create({
        countID: 'ms',
        digits: 3,
        width: 1.15,
        source_objects: SOURCE_OBJECTS
    });
    count_ms.scale.set(0.5, 0.5, 0.5);
    count_ms.position.set(1.25, 0, 0.5);
    scene.add(count_ms);
    // frame counter
    const count_frames = countDown.create({
        countID: 'frames',
        digits: 3,
        width: 1.25,
        source_objects: SOURCE_OBJECTS
    });
    count_frames.position.set(-3.5,0,-5);
    scene.add(count_frames);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 900;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = (frame + 1) / frameMax;
        let secs = Math.floor(30 - 30 * a1);
        let a2 = (30 - 30 * a1) % 1;
        let ms = Math.floor(1000 * a2);
        //const timeStr = String(secs).padStart(3, '0');
        countDown.set(count_sec, secs);
        countDown.set(count_ms, ms);
        countDown.set(count_frames, frame);
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
}());
```

### 2.2 - Using the DAE load method

When it comes to any and all real projects that I will be making with this module I am sure that I will want to use one or more DAE files to load custom geometry for the numbers and additional geometry for other objects that will compose the over all scene. For this example I am loading just one DAE file which is my cd1.dae file in which I just have objects for each number that have a position and normal attribute and that is it. For now I am not doing anything fancy when it comes to changing values for the materials of the objects that default to phong material. Because of this I will want to add a light source as usual then and for this I am going with my typical choice these days with that which is a directional light.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(3, 3, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 1, 2);
scene.add(dl);
// ---------- ----------
// SOURCE_OBJECTS OBJECT that will hold the number objects
// ---------- ----------
const SOURCE_OBJECTS = {};
// ---------- ----------
// HELPERS
// ---------- ----------
// what to do for a DAE result object
const DAE_on_loaded_item = (result) => {
    let i = 0;
    while(i < 10){
        const obj = result.scene.getObjectByName('num_' + i);
        obj.position.set(0, 0, 0);
        SOURCE_OBJECTS[i] = obj;
        i += 1;
    }
};
// create a count_sec count down object
const create_count_sec = ( objects ) => {
    const count_sec = countDown.create({
        countID: 'sec',
        digits: 2,
        width: 1.05,
        source_objects: objects
    });
    count_sec.position.set(0, 1, 0);
    return count_sec;
};
// create loop method with given update method
const create_loop = (update) => {
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    update = update || function(frame, frameMax){};
    // loop
    const loop = function() {
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
    return loop;
};
// ---------- ----------
// LOADING MANAGER
// ---------- ----------
countDown.DAE_loader(['/dae/count_down_basic/cd1.dae'], DAE_on_loaded_item)
.then( () => {
    console.log('Done Loading.');
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    // count secs count down object
    const count_sec = create_count_sec(SOURCE_OBJECTS);
    scene.add(count_sec);
    // ---------- ----------
    // UPDATE / ANIMATION LOOP
    // ---------- ----------
    const update = function(frame, frameMax){
        const a1 = (frame + 1) / frameMax;
        let secs = Math.floor(30 - 30 * a1);
        countDown.set(count_sec, secs);
    };
    const loop = create_loop(update);
    loop();
})
.catch( (e) => {
    console.log(e.message);
    scene.add( new THREE.GridHelper(10, 10) );
    renderer.render(scene, camera);
});
```

### 2.3 - Using the DAE load method, and canvas to add texture

With this example I am once again using the DAE loader method, but now I am also once again using my canvas module to create textures for these objects. With that said at this time I am using the cd2.dae file in which I have worked out okay uv maps for each number.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0.8, 0.8);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1.5, 2.5, 4.0);
camera.lookAt(0, 0.85, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.8);
dl.position.set(-2, 1, 2);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
// ---------- ----------
// CONST
// ---------- ----------
const SECS = 30;
// ---------- ----------
// TEXTURE
// ---------- ----------
const canObj_rnd1 = canvasMod.create({
    size: 1024,
    draw: 'rnd',
    palette: [
        '#ffffff', '#fefefe','#fdfdfd','#fcfcfc', '#fbfbfb', '#fafafa', '#f9f9f9','#f8f8f8', '#f7f7f7', '#f6f6f6',
        '#f5f5f5','#f4f4f4', '#eeeeee', '#dddddd', '#cccccc','#bbbbbb', '#aaaaaa', '#999999', '#888888', '#666666'
    ],
    state: { gSize: 64 }
});
const canObj_rnd2 = canvasMod.create({
    size: 1024,
    draw: 'rnd',
    palette: [
        '#007700','#009900','#00bb00','#00dd00','#00ff00', // light greens
        '#007733','#009944','#00bb55','#00dd66','#00ff77', // light cyans
        '#004400','#005500','#006600', // dark greens
        '#003311' // drak cyan
    ],
    state: { gSize: 128 }
});
// ---------- ----------
// HELPERS
// ---------- ----------
// create loop method with given update method
const create_loop = (update) => {
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = SECS * FPS_UPDATE;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    update = update || function(frame, frameMax){};
    // loop
    const loop = function() {
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
    return loop;
};
// ---------- ----------
// LOADING MANAGER
// ---------- ----------
countDown.DAE_loader([ '/dae/count_down_basic/cd2.dae' ])
.then( (SOURCE_OBJECTS) => {
    console.log('Done Loading.');
    // use canvas textures
    Object.keys(SOURCE_OBJECTS).forEach( (key) => {
        const obj = SOURCE_OBJECTS[key];
        if(parseInt(key) + '' != 'NaN'){
            obj.material.map = canObj_rnd1.texture_data;
            countDown.addLine(obj, 1, new THREE.Vector3(), 2, 0xffffff);
        }else{
            obj.material.map = canObj_rnd2.texture_data;
            countDown.addLine(obj, 1, new THREE.Vector3(0.01,0,0.01), 2, 0xffffff);
        }
    });
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    // count secs count down object
    const count_sec = countDown.create({
        countID: 'sec',
        digits: 2,
        width: 1.1,
        source_objects: SOURCE_OBJECTS
    });
    count_sec.scale.set(0.75, 0.75, 0.75);
    count_sec.position.set(0, 2.05, -0.5);
    scene.add(count_sec);
    // adding a frame count
    const count_frames = countDown.create({
        countID: 'frames',
        digits: 3,
        width: 1.4,
        source_objects: SOURCE_OBJECTS
    });
    count_frames.scale.set(0.25, 0.25, 0.25);
    count_frames.position.set(0, 0.80, 0.30);
    scene.add(count_frames);
    // add ground object
    scene.add( SOURCE_OBJECTS['ground_0'] );
    // ---------- ----------
    // UPDATE / ANIMATION LOOP
    // ---------- ----------
    const loop = create_loop(function(frame, frameMax){
        const a1 = (frame + 1) / frameMax;
        let secs = Math.floor(SECS - SECS * a1);
        countDown.set(count_sec, secs);
        countDown.set(count_frames, frame);
        // camera
        camera.position.x = 2 - 4 * a1;
        camera.lookAt( 0, 1.20, 0 );
    });
    loop();
})
.catch( (e) => {
    console.log(e.message);
    scene.add( new THREE.GridHelper(10, 10) );
    renderer.render(scene, camera);
});
```

### 2.4 - Using the DAE load method with more than one file, and with DAE file textures

For this example I am now ditching the use of canvas textures in favor of textures that I have made for the DAE files. As at this point I am not only using external files for geometry that has position, as well as custom uv and normals attributes, but now also textures as well. Also I am now getting into the habit of making more than one DAE file one for numbers, and the other for everything else that I want in the scene. Moving forward I am sure that I will end up with just one great file for the numbers that I will want to reuse from one project to the next, but have many other files for additional objects to place in the scene. So for this example I am now using my cd3\-nums file along with my cd3-ground files. These files have uvmaps and on top of that textures that are use for each material of each object. I am thinking that this might be the final form of the kinds of files I want to make for this, at least when it comes to r0 of the count-down.js file.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0.8, 0.8);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1.5, 1.5, 5.0);
camera.lookAt(0, 0.85, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.8);
dl.position.set(-2, 1, 2);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
// ---------- ----------
// CONST
// ---------- ----------
const SECS = 30;
// ---------- ----------
// HELPERS
// ---------- ----------
// create loop method with given update method
const create_loop = (update) => {
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = SECS * FPS_UPDATE;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    update = update || function(frame, frameMax){};
    // loop
    const loop = function() {
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
    return loop;
};
// ---------- ----------
// LOADING MANAGER
// ---------- ----------
countDown.DAE_loader(
    [
        '/dae/count_down_basic/cd4-nums.dae',
        '/dae/count_down_basic/cd3-ground.dae'
    ]
)
.then( (SOURCE_OBJECTS) => {
    console.log('Done Loading.');
    Object.keys( SOURCE_OBJECTS ).forEach( ( key ) => {
        const obj = SOURCE_OBJECTS[key];
        const mat = obj.material;
        if(mat.map){
            const tex = mat.map;
            tex.magFilter = THREE.NearestFilter;
            tex.minFilter = THREE.NearestFilter;
        }
    });
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    // colon object
    const colon = SOURCE_OBJECTS.colon;
    colon.position.set(-1.5, 1.30, 0.4);
    scene.add(colon);
    // count secs count down object
    const count_sec = countDown.create({
        countID: 'sec',
        digits: 2,
        width: 1.1,
        source_objects: SOURCE_OBJECTS
    });
    count_sec.position.set(0, 1.30, 0.4);
    scene.add(count_sec);
    // adding a frame count
    const count_frames = countDown.create({
        countID: 'frames',
        digits: 3,
        width: 1.4,
        source_objects: SOURCE_OBJECTS
    });
    count_frames.scale.set(0.25, 0.25, 0.25);
    count_frames.position.set(0, 0, 1.50);
    scene.add(count_frames);
    // add ground object
    scene.add( SOURCE_OBJECTS['ground_0'] );
    // ---------- ----------
    // UPDATE / ANIMATION LOOP
    // ---------- ----------
    const loop = create_loop(function(frame, frameMax){
        const a1 = (frame + 1) / frameMax;
        let secs = Math.floor(SECS - SECS * a1);
        countDown.set(count_sec, secs);
        countDown.set(count_frames, frame);
        // camera
        camera.position.x = 2 - 4 * a1;
        camera.lookAt( 0, 0.5, 0 );
    });
    loop();
})
.catch( (e) => {
    console.log(e.message);
    scene.add( new THREE.GridHelper(10, 10) );
    renderer.render(scene, camera);
});
```

## Conclusion

This far I would have to say that this count down module is working just the way that I would like it, at least when it comes to a first set of basic timer videos to say the least. It is not to say that there is not more work to do with any and all future revisions of this examples when and it I get to it. Sure there are a whole lot of ideas that comes to mind with that, in fact way to many actually. The bottom line here though when it comes to making videos though is how the frames come out though, that is what is most important here. So many ideas that have to do with improving pref romance are of lower priority as I do not have to worry so much about real time rendering.

