---
title: SVG tools module threejs example
date: 2023-03-17 08:18:00
tags: [three.js]
layout: post
categories: three.js
id: 1032
updated: 2023-03-17 09:15:43
version: 1.3
---

I made a [threejs project example a while back that had to do with using svg as a way to define curves](/2022/09/23/threejs-examples-svg-movement/) in 3d space, however it would seem that I jumped the gun and did not just simply make a standard set of tools that builds on top of threejs and the SVGLoader. So with that said this week one thing I worked on was a new threejs project example that is just that a standard set of tools to use when working with SVG files. There is just dirrectly working with the SVG loader and threejs itself of course, but there are a lot of little things that come up as well as things that need to happen with many other threejs fetures that I would say valadates a need for an addtional abstraction of some things if I want to keep my main javascript code clean and also not repeat code from one project to the next.

<!-- more -->

## The SVG tools module, and what to know first

There is a whole lot that one should be aware of before hand with this as this is a [threejs project example](/2021/02/19/threejs-examples) post, and not a [getting started type post](/2018/04/04/threejs-getting-started/) on threejs. So I assume that you know at least a thing or two about the basics of getting started with a threejs project, and also have at least some background with client side web devlopemen in general. if not sorry getting into all of that is outside the scope of this post. I will however as always write about a few things in this opening section and link to other resources as needed.

### Read up more on the SVG loader in general

The source code examples that I am writing about in this post do not just run on top of threejs, but also the [SVG loader as well](/2022/09/16/threejs-svg-loader/). The SVG loader is not baked into the core of the threejs librray itself but must be added along with the librray. This SVG loader can be found in the examples folder of the threejs reposatory and as such it is important to make sure that you are using the state of the SVG loader that coresponds to the revision number of threejs that you are using.

### There is also knowing how to create SVG files to begin with

A long time ago I [started a post on the subject of making SVG files](/2019/02/11/js-javascript-svg/). However I would say that the best resource with this on line would be to just start studying the [Modzilla Docs on SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). When it comes to the Modilla docs I would say that a key element of interset, after [the SVG element iself](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) of course, would be the [path element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path). The path element can be used to define just about any kind of 2d path using plain old point to point lines as well as some options when it comes to bezier curves with both one and two control points. 

### Source code is also up on Github

The source code examples that I am writing about in this post can also be found up on my [test threejs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-svg-tools) on Github. This is where you might find revisions of the modules that are a little more up to date as often I might do a little work on a project like this, but maybe not get around to editing the post just yet. Also this is where I park the source code examples for my [many other posts on threejs](/categories/three-js/) projects, as well as various features of the librray istelf.

### Version Numbers matter

When I first wrote this post I was using r146 of the threejs and thus I am following the r146 style rules that I set for myself. Also at this time I think that I should start making it clear in these sections that I am using the old IIFE pattern for modules over that of JSM for now.


## 1 - The first version of SVG tools and some demos \( r0 \)

For this section I am writing about the state of the very first version of the SVG tools module, and with that the set of demos that I have togetaher that make use of this module. For the first version of the module I just wanted to have a load method as I will always be loading an external SVG file rather than parsing SVG text, that is somehting that I may or may not get to with a future revision of the module. Anway when calling the load method there is also a major core feature that I wanted to add which is to pass an option that is a processor funciton. This processor funciton is just simply the logic that should be called for each svg file that is loaded.

### 1.a - The source code of the module isetlf \( r0 \)

As of R0 I just have an IIFE form of this module and that is it as I am putting off getting into JSM for the moment. There is just one public method that is a load method that makes use of the SVG loader as well as a custom loading manager that allows me to load more than one SVG file, and also have a funcion that returns a promise when all SVG files are loaded.

```js
// svg-tools.js - r0 - from threejs-examples-svg-tools
(function(api){
    //-------- ----------
    // DEFAULTS
    //-------- ----------
    const DEFAULT_LOAD_OPTIONS = {
        urls: [],
        processor: 'extrude',
        scene: new THREE.Scene(),
        opt_extrude: { depth: 1 },
        opt_shape: { depth: 1 },
        material: new THREE.MeshBasicMaterial(),
        zDepth: 1,
        zIndex: 0
    };
    //-------- ----------
    // HELPERS - internal helper funcitons used by the public api, and other built in features
    //-------- ----------
    // what to do for each SVG file that loads
    const onFileLoaded = (url, i_url, loader, st, resolve, reject) => {
        const scene = st.scene;
        return (data) => {
            st.processor(st, data, i_url, url);
        }
    };
    // on file progress and error methods
    const onFileProgress = (url, i_url, loader, st, resolve, reject) => {
        return (xhr) => {
        };
    };
    const onFileError = (url, i_url, loader, st, resolve, reject) => {
        return (error) => {
            reject(error);
        };
    };
    //-------- ----------
    // ST OBJECT API - an api that is acessible by way of the st object ( used in processor functions )
    //-------- ----------
    const st_api = {};
    // data to shape funciton so that I can quickly just start working with shape objects
    // when writing a new processor
    st_api.dataToShape = (data, forShape) => {
        forShape = forShape || function(){};
        let pi = 0;
        while(pi < data.paths.length){
            const shapes = THREE.SVGLoader.createShapes( data.paths[pi] );
            let si = 0;
            while(si < shapes.length){
                const svgNode = data.paths[pi].userData.node;
                forShape(shapes[si], si, pi, svgNode);
                si += 1;
            }
            pi += 1;
        }
    };
    //-------- ----------
    // PROCESSORS - hard coded options for functions that are used to procress SVG data and add objects to a scene
    //-------- ----------
    const SVG_PROCESSOR = {};
    // extrude
    SVG_PROCESSOR.extrude = (st, data, i_url, url) => {
        const svg_width = data.xml.width.baseVal.value;
        const svg_height = data.xml.height.baseVal.value;
        st.dataToShape(data, (shape, si, pi, svgNode) => {
            const zindex = parseInt( svgNode.getAttribute('svgtools:zindex') || st.zIndex);
            const zDepth = parseFloat( svgNode.getAttribute('svgtools:zDepth') || st.zDepth);
            const geo = new THREE.ExtrudeGeometry(shape, st.opt_extrude);
            geo.rotateX(Math.PI * 1);
            geo.translate( svg_width / 2 * -1, svg_height / 2 * 1, zindex * zDepth);
            const material = st.material.clone();
            material.color = new THREE.Color(svgNode.getAttribute('fill'));
            const mesh = new THREE.Mesh(geo, material);
            mesh.name = 'shape_' + i_url + '_' + pi + '_' + si;
            st.scene.add(mesh);
        });
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.load = (opt) => {
        const st = Object.assign({}, DEFAULT_LOAD_OPTIONS, opt, st_api);
        if(typeof st.processor === 'string'){
            st.processor = SVG_PROCESSOR[st.processor];
        }
        // return a promise
        return new Promise((resolve, reject)=>{
            // loading manager
            const loading_manager = new THREE.LoadingManager();
            loading_manager.onLoad = () => {
                console.log('All Files loaded.');
                resolve(st);
            };
            let i_url = 0;
            const len_url = st.urls.length;
            while(i_url < len_url){
                // svg loader instance a loader
                const loader = new THREE.SVGLoader(loading_manager);
                // load a SVG resource
                const url = st.urls[i_url];
                loader.load(
                    url,
                    onFileLoaded(url, i_url, loader, st, resolve, reject),
                    onFileProgress(url, i_url, loader, st, resolve, reject),
                    onFileError(url, i_url, loader, st, resolve, reject)
                );
                i_url += 1;
            }
        });
    }
}( this['SVGTools'] = {} ));
```

### 1.1 - Getting started demo with default options

For this first demo I just wanted to make sure that things work okat with just one SVG file, and also that things looks okay with the dwefault hard coded options.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.01, 10000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LOAD SVG, OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(100, 10));
SVGTools.load({
   urls: [ '/img/svg-logo/logo_base.svg' ]
})
.then( ( st ) => {
    // add st.scene to the main scene object
    scene.add(st.scene);
    camera.position.set( 100, 50, 100);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
})
```

### 1.2 - Custom Processor function

When it comes to using this in pne project from the next there is no question that I am going to want to write custom processors. For the mosyt part the built in default processor just serves as an example of how to get strated with one of these. In future revisions of this module there will likley be maybe more that one starting point for built in processors but again they will just be slighlty differed starting points for making a custom processor when and where needed which will likley be often.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.01, 10000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 150;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const e = new THREE.Euler();
    e.y = THREE.MathUtils.degToRad(-45 + 90 * a2);
    camera.position.set(100, 50, 100).applyEuler(e);
    camera.lookAt(0,0,0);
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
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set( 0, 1, 2 );
scene.add(dl);
// ---------- ----------
// LOAD SVG, OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(100, 10));
SVGTools.load({
   scene: scene,
   urls: [
       //'/img/svg-test/test1.svg',
       //'/img/svg-test/test2.svg',
       '/img/svg-logo/logo_base.svg'
   ],
   opt_extrude: { depth: 1 },
   zDepth: 5,
   material: new THREE.MeshPhongMaterial(),
   processor: (st, data, i_url, url) => {
        const svg_width = data.xml.width.baseVal.value;
        const svg_height = data.xml.height.baseVal.value;
        st.dataToShape(data, (shape, si, pi, svgNode) => {
            const zindex = parseFloat( svgNode.getAttribute('svgtools:zindex') || st.zIndex);
            const zDepth = parseFloat( svgNode.getAttribute('svgtools:zDepth') || st.zDepth);
            const geo = new THREE.ExtrudeGeometry(shape, st.opt_extrude);
            geo.rotateX(Math.PI * 1);
            geo.translate( svg_width / 2 * -1, svg_height / 2 * 1, zindex * zDepth);
            const material = st.material.clone();
            material.color = new THREE.Color( svgNode.getAttribute('fill') );
            const mesh = new THREE.Mesh(geo, material);
            st.scene.add(mesh);
        });
   }
})
.then(() => {
    console.log('done loading')
    loop();
})
```

## Conclusion

So far the SVG tools module seems to be working okay just fine however I would say that there is a whole lot of work to be done when it comes to what is on the todo lost for future revisions. For one thing there is having a custom UV generator for the SVG tools module which just like that of the processror is yet another thing where there would be a built in one, but also will likley just serve as a getting started example of that sprt of thing as well.

I would also like to expand on the collection of methods when it comes to the api to work with when writing processor funcitons. I might need to go as far as having a class for this, but in any case I can see that there are a few more things that I am going to want to bake into that.




