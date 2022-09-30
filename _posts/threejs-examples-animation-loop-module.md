---
title: Animation Loop Framework threejs project example
date: 2022-09-30 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 1007
updated: 2022-09-30 13:42:27
version: 1.5
---

The subject of creating an animaiton loop is somehting that will come up a lot, not just with threejs alone, but indeed with client side javaScript in general. When it comes to client side javaScript alone there are methods like that of setTimeout, as well as request animation frame. There are also a number of addtional features that are realted to this sort of thing in client side javaScript, but also in the threejs librray such as the [THREE.Clock class](https://threejs.org/docs/#api/en/core/Clock), and thus also [ performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now), and Date.now that the class works on top of. However in todays post I am going to be writing a thing or two about a new javaScript module project that is a kind of framework that builds on top of the core idea of an animation loop.

This is then yet another [threejs example project](/2021/02/19/threejs-examples/) to add on top of the many others that I may continue to work on a bit more off and on in the future. I have a genreal idea of what I would like this project to be in terms of the core set of ideas. That is to have the ushual code that I keep copying and pasing from one project to the next, abstracted away into a module, or framework kind of from which I would say is the case here with this project. That is that with this module I call a main create method and pass an object that contains a method that can be called to set up the scene, camera, and so forth, and then another that will update things over time.

<!-- more -->

## The animation loop framework and what to know first

This is a post on a threejs animtion framework that can be used to create litte animation projects in a page. 

### There is a lot to take in when it comes to animation loops, I would not stop with this post for sure

There is more than one way to skin a cat as the expression goes, in the context of this post there is more than one way to make an animation loop. For this example I am just using the [requestAnimationFrame method](/2018/03/13/js-request-animation-frame/) to call a loop function recursivly, or at least that is what I was using in r0 of this threejs example. when it comes to future revisions I might revisit what it is that I am doing to create this main loop and maybe chnage a few things around. Anyway this request animation frame method is my default go to method for this sort of thing and I am sure that I am not alone with that. On the open interett there may be a lot of devopers that say that you should only use that and nothing else ever, but I am not sure if I would automaticly assume that. 

In some cases I might want to make use of [setTimeout actually](/2018/12/06/js-settimeout/), the main reason why is that there might be some sitatuions in which I would want to have two loops. One loop for updating a model which would be poweared by settimeout, and another loop for updating a view which would use request animation frame or simular altertaive. This will be espeshaly true if I get into using web workers as a way to push some heavry listing type tasks to a sepearte event loop, as I am limited to useing methods like setTimeout in that kind of envioement.

### Just keep what is most inporant it sight with this

It can get a little overwhelimng wheit omes to really looking into how to do an animion loop. However I think one of the most important things to keep in mind is that many visiters to a web site might only have so much in terms of system resources to work with. Also there might be a lot going on in a page that is all running in the main event loop of the page as well. So right off the bat I will want to build in a user interface that allows visiters to press a stop button that will stop the animaiton loop compleatly. 

Right away my stop button feature seems to work great as when I press the stop button I notuice my systems CPU use drop way down to more or less zero. In future revisions I might add addtional features that will allow for uses to adjust the frame rate for updating, and movement, or work out a way to adjust that automatuicly, but for now at a minimum that is working great right off the bat with r0 of the framework.

### Source code is up on Github

On Github the source code as well as addtonal notes, and also the latest source code can be [found here](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-animation-loop-module).

### Version Numbers matter

When I first made this project and wrote this post I was using r140 of threejs.

## 1 - The first version (r0) of the animation loop framework and demos

In this section I will be wriging about the state of the first revision of the animation loop module, as well as seom demos thus far of the project that test out what I have thus far here. I had a core set of ideas that i wanted to get up and working right away with this one, and the first and formost was to have a stop button for it. If I use this code in production it will likley be used for add a little header app type project at the top of the page, and when it comes to such things I think a stop button is a must. There is a lot that can end up going on in a page that will be fighting for resources, and even in cases where there is not much else going on some people use ecodnly hardware that onoly has so much FLOP Power to work with as well.

There where a lot of other core ideas also that are up and running. When making animaitons with threejs thus far there are two general kinds of animaitons that come to mind. One kind of animaiton I would call a frame by frame style, or determansict style, while the other kind I would call random, or stocastic style. When it comes to the kind of animaitons that I willbe making with this kind of projhect I am sure most of them will be the random style, but I am still baking in feature that help with both.

### 1.0 - The source code of the framework

At the top of the module I have a whole lot of private helper functions that are used in the process of createing a loop object, or to add addtional methods to work with when it comes to creating the source code of an animaiton. At the very top I have some methods that I copid over from my recent [wrap module threejs project](/2022/09/09/threejs-examples-wrap-module/). This is used to create a wrap vector method that is one of severl methds that I can use off of the public API of this that will come into play with random rather than frame by frame style animaitons. Simply put it is a way to wrap values around when sonting goes out of bounds, rather than clamping the value and not ketting it continue.

Another helper funciton that I have here is my [get canvas relative method](/2020/03/04/canvas-get-point-relative-to-canvas/) that will return an object with an x, and y positon that is relative to a canvas or container element, trather than the main window object of a page. Addtional helpers thus far have to do with setting up style or rather class names for container and canvas elements, as well as attaching events for and drawing the user interface thus far.

I then have my main Loop Class that is used by the public create method to create a new instance of the main loop object of this framework. Afyter that main constructor of the Loop class and the few protoype methods thus far for it I then also have a few public methods that can be used to create an instance of this Class as well a start and stop the main loop fuction.

```js
// ---------- ----------
// ANIMATION LOOP MODULE - r0 - from threejs-examples-animation-loop-module
//  Copyright 2022 by Dustin Pfister - https://dustinpfister.github.io/about
// ---------- ----------
const loopMod = (function(){
    //-------- ----------
    // HELPERS
    //-------- ----------
    // wrap and wrap axis methods from threejs-examples-wrap-module
    // https://dustinpfister.github.io/2022/09/09/threejs-examples-wrap-module/
    const wrap = function (value, a, b){
        // get min and max this way
        let max = Math.max(a, b);
        let min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        let range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    const wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
    };
    // get canvas relative position from mouse or touch event object
    const getCanvasRelative = (e) => {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        pos = {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
        // ajust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        return pos;
    };
    // set the style of the container as well as all children
    const setContainerStyle = (li) => {
        const con = li.container;
        const len = con.children.length;
        let i = 0;
        // set style (of classNames, ids)
        con.className = 'aniloop_parent'
        while(i < len){
           const item = con.children.item(i);
           item.className = 'aniloop_child'
           i += 1;
        }
    };
    // attach event handers
    const attachUIEvents = (li) => {
        const con = li.container;
        con.onselectstart = function () { return false; };
        // play pause button check
        con.addEventListener('click', (e) => {
            const pos = getCanvasRelative(e);
            // prevent default
            e.preventDefault();
            const pb = li.buttons.play;
            const v_click = new THREE.Vector2(pos.x, pos.y);
            const v_pb = new THREE.Vector2(pb.x, pb.y);
            const d = v_click.distanceTo(v_pb);
            if(d <= pb.r ){
                if(li.active){
                    loopMod.stop(li);
                }else{
                    loopMod.start(li);
                }
                drawUI.draw(li, li.canvas_ui, li.ctx_ui);
            }
        });
    };
    // UI DRAW METHIDS
    const drawUI = {};
    // draw the 'play/pause' button
    drawUI.playButton = (loop, canvas, ctx) => {
        const pb = loop.buttons.play;
        const x = pb.x;
        const y = pb.y;
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, pb.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // if active draw square, else triangle
        ctx.beginPath();
        ctx.fillStyle = 'white';
        const r = pb.r / 2;
        if(loop.active){
            ctx.rect( pb.x - r, pb.y - r, r * 2, r * 2 );
        }else{
            ctx.moveTo(pb.x + r * 1.25, pb.y);
            ctx.lineTo(pb.x - r, pb.y + r);
            ctx.lineTo(pb.x - r, pb.y - r);
        }
        ctx.fill();
    };
    // main draw ui method
    drawUI.draw = (loop, canvas, ctx) => {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawUI.playButton(loop, canvas, ctx);
    };
    //-------- ----------
    // LOOP CLASS CONSTRUCTOR
    //-------- ----------
    const Loop = function(opt){
        const li = this; // li for Loop Instance
        opt = opt || {};
        li.frame = 0;
        li.FRAME_MAX = opt.FRAME_MAX || 300;
        li.lt = new Date();
        li.secs = 0;
        li.active = false;
        li.alpha = 0;
        li.fps_update = opt.fps_update || 20;
        li.fps_movement = opt.fps_movement || 30;
        li.init = opt.init || function(){};
        li.onStart = opt.onStart || function(){};
        li.update = opt.update || function(){};
        li.scene = opt.scene || new THREE.Scene();
        li.camera = opt.camera || new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
        // renderer, ui canvas, and container div
        li.container = document.createElement('div');
        li.renderer = new THREE.WebGLRenderer({ alpha: true });
        li.canvas_ui =  document.createElement('canvas');
        li.ctx_ui =  li.canvas_ui.getContext('2d');
        // append
        li.container.appendChild(li.renderer.domElement);
        li.container.appendChild(li.canvas_ui);
        // ui buttons
        const buttons = li.buttons = {};
        buttons.play = opt.pb || { x:0, y:0, r: 20, dx: 24, dy: 24 };
        // set style
        setContainerStyle(li);
        // attach UI EVENTS
        attachUIEvents(li);
        // set size for first time
        li.setSize(640, 480);
    };
    //-------- ----------
    // LOOP CLASS PROTOTYPE
    //-------- ----------
    // GetAlpha method pased off of frame and FRAME_MAX by default
    // or the given count, n, d, values
    Loop.prototype.getAlpha = function(count, n, d){
        count = count === undefined ? 1 : count;
        n = n === undefined ? this.frame : n;
        d = d === undefined ? this.FRAME_MAX : d;
        return THREE.MathUtils.euclideanModulo(n / d * count, 1);
    };
    // get a bias or ping pong value
    Loop.prototype.getBias = function(count, n, d){
        const alpha = this.getAlpha(count, n, d);
        return THREE.MathUtils.pingpong(alpha - 0.5, 1) * 2;
    };
    // the setSize method
    Loop.prototype.setSize = function(w, h){
        // set renderer
        this.renderer.setSize(w, h);
        // set container, and canvas with style api
        const con = this.container;
        const can = this.canvas_ui;
        con.style.width = w + 'px';
        con.style.height = h + 'px';
        can.style.width = w + 'px';
        can.style.height = h + 'px';
        can.width = w;
        can.height = h;
        // draw ui
        const pb = this.buttons.play;
        pb.x = this.canvas_ui.width - pb.dx;
        pb.y = this.canvas_ui.height - pb.dy;
        drawUI.draw(this, this.canvas_ui, this.ctx_ui);
    };
    // loop function at prototype level is noop (might remove)
    Loop.prototype.loop = function(){};
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create loop helper
    const createLoopObject = (opt) => {
        opt = opt || {};
        // create a Loop Class Object
        const loop = new Loop(opt);
        // the loop function as own property
        loop.loop = function(){
            const now = new Date();
            let secs = loop.secs = (now - loop.lt) / 1000;
            // keep calling loop over and over again i active
            if(loop.active){
                requestAnimationFrame(loop.loop);
            }
            if(secs > 1 / loop.fps_update){
                // update, render
                loop.update.call(loop, loop, loop.scene, loop.camera, loop.renderer);
                loop.renderer.render(loop.scene, loop.camera);
                // step frame
                loop.frame += loop.fps_movement * secs;
                loop.frame %= loop.FRAME_MAX;
                loop.lt = now;
            }
        };
        // call init
        loop.init(loop, loop.scene, loop.camera, loop.renderer);
        return loop;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    const api = {};
    // create a loop object
    api.create = (opt) => {
        opt = opt || {};
        // the loop object
        const loop = createLoopObject(opt);
        // return the loop object
        return loop;
    };
    // start a loop object
    api.start = (loop) => {
        loop.active = true;
        loop.lt = new Date();
        loop.onStart(loop, loop.scene, loop.camera, loop.renderer);
        drawUI.draw(loop, loop.canvas_ui, loop.ctx_ui);
        loop.loop();
    };
    // stop the loop
    api.stop = (loop) => {
        loop.active = false;
        drawUI.draw(loop, loop.canvas_ui, loop.ctx_ui);
    };
    // making wrap helper public
    api.wrap = wrap;
    // Wrap a vector method of public api
    api.wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(-1, -1, -1);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        Object.keys(vec).forEach(function(axis){
            wrapAxis(vec, vecMin, vecMax, axis);
        });
        return vec;
    };
    // return public api
    return api;
}());
```

### 1.1 - Frame by frame demo

Now that I have the source code of the framnework out of the way I should go over at least one or two demos of the module.

```js
// ---------- ----------
// Frame by Frame animation example for r0 of threejs-examples-animation-loop-module
// ---------- ----------
const loopObj = loopMod.create({
    // fps_update is actual update FPS rate ( lower for less CPU use, but choppy )
    fps_update: 16,
    // fps_movement is the rate at which frames will update by system time
    fps_movement: 30,
    // if FAME_MAX == 300 and fps_movement === 30 then it is a 10 sec loop
    FRAME_MAX: 300,
    // init hook for prefroming actions that will only happen once
    // this is called once the loopObj is ready but has not been 
    // started yet for first time
    init: function(loopObj, scene, camera, renderer){
        // ---------- ----------
        // ADD OBJECTS
        // ---------- ----------
        // light
        const dl = new THREE.DirectionalLight(0xffffff, 1);
        dl.position.set(2, 1, 3);
        scene.add(dl);
        // cube
        const ud = scene.userData;
        const cube = ud.cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.5}));
        scene.add(cube);
        // progress bar mesh
        const bar = ud.bar = new THREE.Group();
        bar.add(new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 5),
                new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5})));
        bar.add(new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 0.25, 5),
                new THREE.MeshStandardMaterial({ color: 0x008888, transparent: true, opacity: 0.25})));
        scene.add(bar);
        bar.position.set(0.75, -1, 0);
        // ---------- ----------
        // SETUP CAMERA, SIZE, AND APPEND CONTAINER TO HTML
        // ---------- ----------
        // setup camera and size
        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);
        camera.position.set(2, 2, 0);
        camera.lookAt(0, -0.5, 0);
        ( document.getElementById('demo') || document.body ).appendChild( loopObj.container )
    },
    // what needs to happen each time the loop starts
    onStart: function(loopObj, scene, camera, renderer){
        loopObj.frame = 0;
    },
    // update method
    update: function(loop, scene, camera){
        const ud = scene.userData;
        const cube = ud.cube;
        const bar = ud.bar;
        cube.rotation.x = Math.PI * 2 * loop.getBias(2);
        cube.rotation.y = Math.PI * 2 * loop.getAlpha(1);
        let alpha = loop.getAlpha(1);
        bar.children[0].scale.set(1, 1, alpha);
        bar.children[0].position.z = (5 / 2) * (1 - alpha);
    }
});
// do just once
loopMod.start(loopObj);
```

### 1.2 - Random demo

I like frame bt frame style animations a lot, so much in fact that I have made a major project that I still work on a little now and then for making videos. However this animaiton loop module is not that kind of project, there goal here is to make the kind of aniamiton loop framework that would be used on a web page, rather than makign a video. Althouh I can still very much make frame by frame animation with it, the focus is very much animaiton in general, inclduing ones that muight make use of user input, seed data, and random values.

For this example I then wanted to make another animaiton on top of the framework that is more on point with the other general style of animaiton. Nothing major for this one, but i would like to test out that wrap vector method that i put in place with this style of animaiton in mind.

```js
// ---------- ----------
// Random animation example for r0 of threejs-examples-animation-loop-module
// ---------- ----------
const loopObj = loopMod.create({
    fps_update: 12,
    fps_movement: 80,
    pb: { r: 32, dx: 40, dy: 40},
    // init hook for prefroming actions that will only happen once
    // this is called once the loopObj is ready but has not been 
    // started yet for first time
    init: function(loopObj, scene, camera, renderer){
        const sud = scene.userData;
        sud.vMin = new THREE.Vector3(-5, -5, -5);
        sud.vMax = new THREE.Vector3(5, 5, 5);
        sud.vCenter = new THREE.Vector3();
        sud.dMax = 5;
        // SETUP MESH GROUP
        const group = scene.userData.group = new THREE.Group();
        const len = 60;
        let i = 0;
        while(i < len){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial({transparent: true}));
            const mud = mesh.userData;
            // setting a normalize direction
            mud.dir = new THREE.Vector3(
               -3 + 6 * Math.random() ,
               1 + 9 * Math.random() * (Math.random() > 0.5 ? 1 : -1),
               -3 + 6 * Math.random() );
            mud.dir.normalize();
            // setting a unit length to use to create a delta vector3
            mud.unit_length = 0.25 + 2.75 * Math.random();
            group.add(mesh);
            i += 1;
        };
        scene.add(group);
        ( document.getElementById('demo') || document.body ).appendChild( loopObj.container );
        // update camera and size
        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
    },
    // update method
    update: function(loop, scene, camera){
        const group = scene.userData.group;
        const sud = scene.userData;
        // update children
        group.children.forEach( (mesh, i) => {
             const ud = mesh.userData;
             // creating a delta vector that will be used to step position
             // based on current value of ud.dir, and ud.unit_length
             const delta = ud.dir.clone().multiplyScalar(ud.unit_length * loop.secs);
             mesh.position.x += delta.x;
             mesh.position.y += delta.y;
             mesh.position.z += delta.z;
             // USING THE WRAP VECTOR METHOD HERE
             loopMod.wrapVector(mesh.position, sud.vMin, sud.vMax);
             // setting opacity
             const d = mesh.position.distanceTo( sud.vCenter );
             let dAlpha = d / sud.dMax;
             dAlpha = THREE.MathUtils.clamp(dAlpha, 0, 1);
             mesh.material.opacity = 0.5 - 0.5 * dAlpha;
             // mesh objects look at 0, 0, 0;
             mesh.lookAt(0, 0, 0);
        });
    }
});
// do just once
loopMod.start(loopObj);
```

## Concusion

That will be it for now when it comes to this project, at least until I come aroud to do some editing of this post at least which may or may not happen. I do have a lot of pots boilding when it comes to these various projects, and some are more deserving of additonal work than others. I have foudn that if this does prove to be the kind of project that I do in fact end up using in produciton that I will be working on it more.

In any case I do have a lot of ides writen down for future revisons, such as seeing about using iframes as the kind of container element. Having a more advanmed user interface that aloos for adjusting the update frames per second rate, seeing about doing a thing or two with more than one layer that is updated at difering rates and a whole lot more.




