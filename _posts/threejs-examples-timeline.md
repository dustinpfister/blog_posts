---
title: Timeline module threejs example
date: 2023-05-05 13:25:00
tags: [three.js]
layout: post
categories: three.js
id: 1038
updated: 2023-05-06 12:54:36
version: 1.4
---

For this weeks post I worked out another [threejs example](/2021/02/19/threejs-examples/), this time it is a module that helps me break down a project into a kind of timeline. This kind of project might be used in conjunction with, or maybe even as a replacement for a simular module that I use all the time in my video projects called [sequnce hooks](/2022/05/12/threejs-examples-sequence-hooks/). Both of these projects are ways of breaking up a video into many parts in which differing logic will be used to update the over all scene of a threejs project. With sequence hooks I was thinking in terms of having an array of, well sequence objects that will be fired one after another. With this timeline project I am thinking more in terms of having a collection of objects that will only fire when a main alpha value that is the over all progress of the video is between a start and end value of a single object in a collection. So then this timeline project will allow for gaps between event objects.

There are a lot of other little details that I would like to work out with this kind of project rather than just making a replacement for sequence hooks. For one thing I would like to define a kind of start and end time that will be used as a way to define not the start and end time of an over all video, but rather the start and end time between a collection of events that are between these start and end times. The actual final time of the video can then be any about of time actually because all of these time stamps are just used to figure out what the alpha values should be for all of these timeline events.

<!-- more -->


## The Timeline module and what to know first

This is a post in which I am writing about a javaScript module that I might use in one or more future video projects if I refine it a bit more. This is not in any way a post on getting started with threejs or any additional skills that are needed before hand with things like javaScript in general for example. I have all ready wrote getting started type posts on threejs, and javaScript a long time ago. I have also wrote posts on many threejs various threejs features alone. This is just one of my many threejs example posts where the goal is to make some kind of final project. This can be some kind of full application, however often it is a module that I would use in an over all application such is the case here.

### Source code is also up on Github

The soucre code that I am writing about in this post can also be found in my [test threejs repository up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-timeline). This is also where I park the source code examples for my many [other posts on threejs as well](/categories/three-js/).

### Version Numbers Matter

When I first wrote this blog post I was using r146 of threejs. I always make sure to write about what revision I am using in these opening sections because threejs is a very fast moving project and code breaking changes are made to it all the time.

There are later revisions of threejs out at the time of this writing, but I find myself frozen at r146 of the moment and for some good reasons that I will not be getting into detail here. On top of sticking with r146 I am also sticking with the use of plain old regular javaScript type script tags over that of module script tags. At some point later this year I will need to start working with modules more in order to stay current.


## 1 - The First Revision of the timeline module and demos

For the very first revision of this timeline module I just wanted to get the core idea of what I have in mind working with this. This is just about the case with all of my threejs project examples as I have found that I never get everything addressed in a single revision. The general process is to just get the core idea up and running with a module, then make at least one if not a few demos using the module. Often when doing so I run into libations making the demos, and while doing so take note of what I want to add or change in future revisions.

### 1.a - R0 of timeline.js

When it comes to this first revision of the timeline module I have three public methods. The first public method of interest would then be the create method that will just create and return a standard timeline object that will then be used with the other public methods. I then have an add method that will add in timeline event objects to the main timeline object. When doing so the add method will create the alpha values for the event object that are relative to the main over all start and end times. The final method public method then is the set method which is what I will be calling in a main update loop of an over all project that will make use of this.

```js
// timeline.js - r0 - from threejs-examples-timeline
(function(api){
    //-------- ----------
    // DEFAULT ON IDLE
    //-------- ----------
    const DEFAULT_ON_IDLE = (tl, index_next, index_last) => {
        let index = null;
        let alpha = 1;
        // have a last index?
        if( typeof index_last === 'number' ){
            index = index_last;
        }
        // have a next index?
        if( typeof index_next === 'number'){
           index = index_next;
           alpha = 0;
        }
        const event = tl.events[index];
        event.update(tl, alpha );
    };
    //-------- ----------
    // CONST VALUES
    //-------- ----------
    const MS_PER_HOUR = 1000 * 60 * 60;
    const MS_PER_MINUTE = 1000 * 60;
    const MS_PER_SECOND = 1000;
    //-------- ----------
    // HELPERS
    //-------- ----------
    // get a time of day in millieseconds
    const getDayMS = (str) => {
        const arr = str.split(':');
        const h = parseInt(arr[0]) * 60 * 60 * 1000;
        const m = parseInt(arr[1]) * 60 * 1000;
        const s = parseInt(arr[2].split('.')[0]) * 1000;
        const r = parseInt(arr[2].split('.')[1]);
        return  h + m + s + r;
    };
    // get a total time value in MS
    const getTotalTime = (tl) => {
        const ms_start = getDayMS(tl.st);
        const ms_end = getDayMS(tl.et);
        return ms_end - ms_start;
    };
    // get a current time string based on current tl.time
    const getTimeStr = (tl) => {
        const h = Math.floor( tl.time / MS_PER_HOUR);
        const m = Math.floor( tl.time % MS_PER_HOUR / MS_PER_MINUTE);
        const s = Math.floor( tl.time % MS_PER_MINUTE / MS_PER_SECOND);
        const ms = tl.time % MS_PER_SECOND;
        return String(h).padStart(2, '0') + ':' + 
               String(m).padStart(2, '0') +':' + 
               String(s).padStart(2, '0') + '.' + 
               String(ms).padStart(3, '0');
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.set = (tl, alpha) => {
        tl.time = Math.floor( tl.totalTime * alpha );
        tl.ct = getTimeStr(tl);
        tl.a_main = tl.time / tl.totalTime;
        let index_event = 0;
        let event_called = false;
        let index_last = null;
        let index_next = null;
        const event_count = tl.events.length;
        while(index_event < event_count){
            const event = tl.events[index_event];
            if(tl.a_main <= event.a_start && index_next === null ){
                index_next = index_event;
            }
            if(tl.a_main >= event.a_end ){
                index_last = index_event;
            }
            if(tl.a_main >= event.a_start && tl.a_main < event.a_end){
                const a_event = (event.a_start - tl.a_main) / ( event.a_start - event.a_end );
                event.update(tl, a_event );
                event_called = true;
                break;
            }
            index_event += 1;
        }
        // idle?
        if(!event_called){
            tl.on_idle(tl, index_next, index_last);
        }
    };
    api.create = (opt) => {
        opt = opt || {};
        const tl = {
           st: opt.st || '00:00:00.000',
           et: opt.et || '22:59:59.999',
           ct: '00:00:00.000',
           on_idle : opt.on_idle || DEFAULT_ON_IDLE
        };
        tl.events = [];
        tl.totalTime = getTotalTime(tl);
        //api.set(tl, 0);
        return tl;
    };
    api.add = (tl, opt) => {
        opt = opt || {};
        const event = {};
        event.st = opt.st || tl.st;
        event.et = opt.et || tl.et;
        const ms_start = getDayMS(event.st) - getDayMS(tl.st);
        const ms_end = ms_start + ( getDayMS(event.et) - getDayMS(event.st));
        event.a_start = ms_start / tl.totalTime;
        event.a_end = ms_end / tl.totalTime;
        event.update = opt.update || function(){};
        tl.events.push(event);
    };
}( this['timeLine'] = {} ));
```

### 1.1 - A basic getting started demo

I have to start somewhere when it comes to demos that make use of this timeline module, with that said this is my very first getting started type demo that I worked out for this. I create a timeline object that starts at 7 in the morning and ends at 5 in the afternoon. I then started adding a few event objects to this that have time stamps that are between this main start and end time strings. When doing so I give update methods that are to be called on each frame when the event is currently active.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
scene.add(mesh1);
// ---------- ----------
// TIMELINE
// ---------- ----------
const tl = timeLine.create({
    st: '07:00:00.000',
    et: '17:00:00.000'
});
timeLine.add(tl, {
   st: '08:00:00.000',
   et: '09:00:00.000',
   update: (tl, a_event) => {
       mesh1.position.set( 4.5, 0.5, 4.5 - 4.5 * a_event)
   }
});
timeLine.add(tl, {
   st: '11:30:00.000',
   et: '11:40:00.000',
   update: (tl, a_event) => {
       mesh1.position.set( 4.5 - 4.5 * a_event, 0.5, 0);
   }
});
timeLine.add(tl, {
   st: '13:00:00.000',
   et: '16:30:00.000',
   update: (tl, a_event) => {
       mesh1.position.set( 4.5 * a_event, 0.5, 4.5 * a_event);
   }
});
// ---------- ----------
// GRID
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    timeLine.set(tl, a1);
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

The end result of this is then what it is that I would want to happen. The mesh object changes position in a way that is constant with what I would expect. So the very core idea of what it is that I have in mind with this is thus far working just fine. However it goes without saying that I would still want to add at least a few more features with the module. For one thing I can not say that I am very happy with the time stamp string format. In fact I think I might loose it all together in favor of using an array of options, including values that are used with the core javaScript Date class. It would also be nice to not just go by time of day, but also Dates as well when it comes to certain kinds of video projects that come to mind.

Still I just wanted to get the core idea of what I wanted up and ruining with this revision and that is it. From this point forward when I get around to working on this more I just need to refine what I all ready have here, make some more demos, and also maybe at least one if not more real projects with what I have going here.

### Conclusion

That is it for now when it comes to this project example. If I get around to making more revisions of this, as well as some more demos as always I will see about doing a little editing. I have the very basic core idea of what I wanted working just fine it would seem. However I am sure much more will pop up if I begin to start using this in one or more tactfully projects of course.

