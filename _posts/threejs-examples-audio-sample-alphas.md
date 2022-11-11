---
title: Audio Sample Data Alphas and threejs projects
date: 2022-11-11 06:53:00
tags: [three.js]
layout: post
categories: three.js
id: 1013
updated: 2022-11-11 07:38:05
version: 1.4
---

I have been making a few [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) videos lately in which I am testing out how to go about syncing video with audio. Thus far though I am just working out the timing in terms of time stamps and duration and thus I am not taking into account any kind of actual audio sample data to adjust things that are going on when rendering my frames. However I have found that I can [export audio sample data](https://manual.audacityteam.org/man/sample_data_export.html) in an HTML file format when using [Audacity](https://en.wikipedia.org/wiki/Audacity_%28audio_editor%29) to work out the audio tracks that I want in this video. So I can adjust the sample rate so that I have just one sample per frame, and then I can export the sample data in an HTML file in which I have at least one sample point for each frame of the video. I can then also do this on a track by track basis, so that I have an HTML file of sample data for say drums, then another for bass, and yet another of samples, and so forth.

I then just need to make another [threejs examples](/2021/02/19/threejs-examples/) project that will use something like the [THREE.FileLoader](https://threejs.org/docs/index.html#api/en/loaders/FileLoader) to load these HTML files of audio sample data. The just do a little additional work to create a kind of standard object of this data that I extract from the HTML files. I can then use an array of audio sample numbers that have been adjusted to be in the range of 0 and 1 as alpha values for anything and everything that will call for such a value to adjust things like scale, position, rotation, and any additional effects for any module that I am using and so forth. In other words the goal here is to create [music visualization](https://en.wikipedia.org/wiki/Music_visualization) using threejs, and audio sample data exported from Audacity.

<!-- more -->


## 1 - The first revision of the module

In this section I will be going over the source code of the first revision of the module as well as a few demos of the module as well.

### 1.0 - The source code of the module

The main method of interest for getting started with this is the load public method of the module. When I call this I give a base URL where I store the sample data files that I exported from Audacity. On top of giving a base URL I then give a list of HTML files that I would like to load from that base url. The file names for these files do very much matter a lot as the string values of the file names are what i will be using for key values of the resulting object that will contain the final sample objects.

```js
// sample_alphas.js - r0 - from threejs-examples-audio-sample-alphas
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    const htmlStringToDOM = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };
    // create a sample object for the given html string
    const createSampleObj = (html, colNum) => {
        colNum = colNum === undefined ? 2 : colNum;
        const sampleObj = {
            raw: [],
            abs: [],
            maxABS: 0, maxRaw: 0, minRaw: 0
        };
        const doc = htmlStringToDOM(html);
        const nodes = doc.querySelectorAll('tr');
        const len = nodes.length;
        let i = 1;
        while(i < len){
            let a1 = parseFloat(nodes[i].children[colNum].textContent);
            sampleObj.raw.push(a1);
            sampleObj.abs.push( Math.abs(a1) );
            i += 1;
        }
        sampleObj.maxRaw = Math.max.apply(null, sampleObj.raw);
        sampleObj.minRaw = Math.min.apply(null, sampleObj.raw);
        sampleObj.maxABS = Math.max.apply(null, sampleObj.abs);
        return sampleObj;
    };
    //-------- ----------
    // MANAGER
    //-------- ----------
    const createLoadingManager = (onDone, onError) => {
        const manager = new THREE.LoadingManager();
        // done
        manager.onLoad = function ( ) { onDone(); };
        // ERROR
        manager.onError = function ( url ) { onError(url); };
        return manager;
    };
    //-------- ----------
    // MAIN LOAD PUBLIC METHOD
    //-------- ----------
    api.load = function(opt){
        opt = opt || {};
        opt.URLS_BASE = opt.URLS_BASE || '';
        opt.URLS = opt.URLS || [];
        opt.colNum = opt.colNum === undefined ? 2 : opt.colNum;
        opt.keyer = opt.keyer || function(url, html){
            const file_name = url.split('/').pop().split('.')[0];
            return file_name;
        };
        const files = {};
        // return a promise
        return new Promise(function(resolve, reject){
            const manager = createLoadingManager(
                () => {
                    resolve(files);
                },
                (url) => {
                    reject(url);
                }
            );
            const loader = new THREE.FileLoader(manager);
            opt.URLS.forEach((url) => {
                // set base url path
                loader.setPath(opt.URLS_BASE);
                // load files from base
                loader.load(url, (html) => {
                    // KEY IN THE SAMPLE OBJECT
                    const key = opt.keyer(url, html);
                    files[key] = createSampleObj(html, opt.colNum);
                });
            });
        });
    };
    //-------- ----------
    // Get method
    //-------- ----------
    // return a sample alpha value ( 0 - 1 ) for a given alpha value ( 0 - 1 )
    // for the given result object and sample key
    api.getByAlpha = (result, key, alpha) => {
        const sampleObj = result[key];
        const absNum = sampleObj.abs[ Math.round( ( sampleObj.abs.length - 1) * alpha) ];
        return absNum / sampleObj.maxABS;
    };
    // get an array of alpha values for the given result object and key. The count value
    // will then be the number of elements in the array
    api.getArray = (result, key, count) => {
        count = count === undefined ? 10 : count;
        let i = 0;
        const alphas = [];
        while(i < count){
           alphas.push( sampleAlpha.getByAlpha(result, key, i / ( count - 1) ) );
           i += 1;
        }
        return alphas
    };
}( this['sampleAlpha'] = {} ));
```

### 1.1 - Using two tracks

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 4, 5);
    camera.lookAt(0, 1, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // STATE
    // ---------- ----------
    const state = {
       result: null
    };
    // ---------- ----------
    // OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper( 10,10 ) );
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(box);
    const box_bass = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box_bass.position.set(-3, 0, -1);
    scene.add(box_bass);
    const box_drums = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box_drums.position.set(-5, 0, -1);
    scene.add(box_drums);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = sampleAlpha.getByAlpha(state.result, 'bv_006_bass', a1);
        const a3 = sampleAlpha.getByAlpha(state.result, 'bv_006_drums', a1);
        const s = 0.25 + 1.75 * a2;
        box.scale.set(s, s, s);
        box.position.y = s / 2 + s * a3;
        box.rotation.set(
            Math.PI * 2 * Math.random() * a3,
            Math.PI * 2 * Math.random() * a3,
            Math.PI * 2 * Math.random() * a3
        )
        
        box_bass.scale.set(1, 0.1 + a2 * 2.9, 1);
        box_bass.position.y = a2 * 3 / 2;
        box_drums.scale.set(1, 0.1 + a3 * 2.9, 1);
        box_drums.position.y = a3 * 3 / 2;
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
    // ---------- ----------
    // LOADER
    // ---------- ----------
    sampleAlpha.load({
        URLS_BASE: '/demos/r146/get-audio-alphas/sample-data/',
        URLS: [
           'glavin.html',
           'bv_006_bass.html',
           'bv_006_drums.html' ]
    })
    .then((result) => {
        state.result = result;
        console.log( sampleAlpha.getArray( result, 'glavin', 10) );
        console.log( sampleAlpha.getArray( result, 'bv_006_bass', 10) );
        console.log( sampleAlpha.getArray( result, 'bv_006_drums', 10) );
        loop();
    });
}());
```

### 1.2 - AlphaSum helper example

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(6, 6, 12);
    camera.lookAt(0, -1, 0);
    camera.zoom = 2;
    camera.updateProjectionMatrix();
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // get sum array helper
    const getSumArray = (result, key) => {
        const sampleObj = result[key];
        const alphas = sampleObj.abs;
        const sum_up = [];
        let i = 0;
        const len = alphas.length;
        while(i < len){
            const a1 = alphas[i] / sampleObj.maxABS;
            let a2 = 0;
            if(i > 0){
               a2 = sum_up[ i - 1];
            }
            sum_up.push(a1 + a2);
            i += 1;
        }
        return sum_up;
    };
    // ---------- ----------
    // STATE
    // ---------- ----------
    const state = {
       result: null
    };
    // ---------- ----------
    // OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper( 20, 20 ) );
    const box1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(box1);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = state.sum_array[ Math.round( ( state.sum_array.length - 1 ) * a1) ] / state.sum_max;
        const a3 = 0.25 * a1 + 0.75 * a2;
        box1.position.set(-10 + 20 * a3,0,0);
        camera.lookAt(box1.position);
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
    // ---------- ----------
    // LOADER
    // ---------- ----------
    sampleAlpha.load({
        URLS_BASE: '/demos/r146/get-audio-alphas/sample-data/',
        URLS: [
           'glavin.html',
           'bv_006_bass.html',
           'bv_006_drums.html' ]
    })
    .then((result) => {
        state.result = result;
        state.sum_array = getSumArray(result, 'bv_006_drums');
        state.sum_max = state.sum_array[ state.sum_array.length - 1];
        loop();
    });
}());
```

### 1.3 - Sample Mean method to help smooth things out

```js
(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(6, 6, 12);
    camera.lookAt(0, -1, 0);
    camera.zoom = 2;
    camera.updateProjectionMatrix();
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // get a sample alpha by a given sample index and a backCount that is
    // the max number of samples back to go to create a mean to use.
    const getByIndexMean = (result, key, csi, backCount) => {
        backCount = backCount === undefined ? 3 : backCount;
        const sampleObj = result[key];
        // current sample index
        const bsi = csi - backCount;
        // by default just use the
        let samples = [];
        // if csi is bellow backCount
        if(bsi < 0){
            samples = sampleObj.abs.slice( 0, csi + 1 );
        }
        // we have at least the back count
        if(bsi >= 0){
            samples = sampleObj.abs.slice( bsi + 1, csi + 1 );
        }
        let absNum = 0; //sampleObj.abs[ csi ];
        const sampCount = samples.length;
        if(sampCount > 0){
            const sum = samples.reduce((acc, n) => { return acc + n;  }, 0);
            absNum = sum / sampCount;
        }
        const alphaSamp = absNum / sampleObj.maxABS;
        return alphaSamp;
    };
    // get a sample alpha by a given alpha value and a backCount that is
    // the max number of samples back to go to create a mean to use.
    const getByAlphaMean = (result, key, alpha, backCount) => {
        const sampleObj = result[key];
        const csi = Math.round( ( sampleObj.abs.length - 1) * alpha);
        return getByIndexMean(result, key, csi, backCount);
    };
    // make a mesh helper
    const makeMesh = (x, y, z, color) => {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshPhongMaterial({ color: color }));
        mesh.position.set(x, y, z);
        return mesh;
    };
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 2, 3)
    scene.add(dl);
    // ---------- ----------
    // STATE
    // ---------- ----------
    const state = {
       result: null
    };
    // ---------- ----------
    // OBJECTS
    // ---------- ----------
    // for the build in getByAlpha method that is limited to just one sample to create the alpha
    scene.add( new THREE.GridHelper( 20, 20 ) );
    const mesh1 = makeMesh(-2, 0, -2, new THREE.Color( 1, 0, 0) );
    scene.add(mesh1);
    const mesh2 = makeMesh(-2, 0, 2, new THREE.Color( 1, 0, 0) );
    scene.add(mesh2);
    // for the getByAlphaMean method
    const mesh3 = makeMesh(2, 0, -2, new THREE.Color( 0, 1, 0) );
    scene.add(mesh3);
    const mesh4 = makeMesh(2, 0, 2, new THREE.Color( 0, 1, 0) );
    scene.add(mesh4);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = sampleAlpha.getByAlpha(state.result, 'bv_006_drums', a1);
        const a3 = getByAlphaMean(state.result, 'bv_006_drums', a1, 5);
        const a4 = sampleAlpha.getByAlpha(state.result, 'bv_006_bass', a1);
        const a5 = getByAlphaMean(state.result, 'bv_006_bass', a1, 5);
        const s1 = 0.1 + 0.9 * a2;
        mesh1.scale.set(1, s1, 1);
        const s2 = 0.1 + 0.9 * a4;
        mesh2.scale.set(1, s2, 1);
        const s3 = 0.1 + 0.9 * a3;
        mesh3.scale.set(1, s3, 1);
        const s4 = 0.1 + 0.9 * a5;
        mesh4.scale.set(1, s4, 1);
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
    // ---------- ----------
    // LOADER
    // ---------- ----------
    sampleAlpha.load({
        URLS_BASE: '/demos/r146/get-audio-alphas/sample-data/',
        URLS: [
           'bv_006_drums.html', 'bv_006_bass.html']
    })
    .then((result) => {
        state.result = result;
        loop();
    });
}());
```

## Conclusion

The module is working okay as I have it all ready, but I can all ready see that I am going to want to make at least one revision in which I bake some of the things that I have worked out in my demos into the module itself. There is also not just loading and processing sample data, but also what it is that I can do with just data. I would like to have better methods for things like certain paths that are the result of sample data and things to that effect, however maybe all of that is something that should all be part of another project.

