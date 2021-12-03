---
title: Menus and crude state machine threejs example
date: 2021-12-03 15:00:00
tags: [three.js]
layout: post
categories: three.js
id: 943
updated: 2021-12-03 15:31:18
version: 1.4
---

It has been a few months sense the last time I started a new post on [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) so then with that said I think it might be called for to write a new [three example](/2021/02/19/threejs-examples/) type post. This time I was thinking about slapping together a quick project that makes use of Raycaster to create a simple yet effective menu system. If you are not familiar with the [raycaster constructor in threejs yet, it is something that you will want to look into](/2021/05/18/threejs-raycaster/) at some point sooner or layer of you like playing around with threejs. The Raycasetr constructor is what can be used to find out if a 2d pointer click of one kind or another has resulted in a mesh object being clicked or not. So then the use of a raycster instance will help a whole lot if the aim is to make some kind of menu system using threejs.

<!-- more -->


## 1 - The basics of this threejs powerd menu system

In this section I will be starting out with just the basics of what needs to happen first i n order to get this menu system up and running. The main thing is that I have at least one javaScript sm.js file that provides a means to create what I am calling a state machine object. This library just has one public method thus far that is used to create and return a main state machine object. This state machine object can then be used in a main app loop of a main javaScript file thus far. 
As of this writing the state of this sm.js is not so great, so things will likely change a whole lot in any future reversions of this examples when I get around to editing this post next. However much of the core functionality that I had in mind is all ready working, so maybe only so much more will need to change.

In any case this is kind of an advanced post on threejs so I assume  that you know at least a little when it comes to using threejs and javaScript in general. If not you might want to step back and start out with something aimed more for developers that are new to threejs such as the [getting started with threejs post](/2018/04/04/threejs-getting-started/) that I wrote a while back.

### Check your version numbers, and source is on Github

When I was working on this threejs example last I was using [threejs r135](https://github.com/mrdoob/three.js/releases/tag/r135), and the code seems to be working well for me at that time. If the code examples here are not working for you the version of threejs is what you are going to want to check first. AFter that you might be running into some other kind of problem.

Also the source code for this threejs example can be found in [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs). I also have the source code for [my many other posts on threejs](/categories/three-js/) located in that repository as well.

### 1.1 - The sm.js file that creates and returns a State Machine Object

```js
var smMod = (function(){
 
    var api = {};
 
    var checkButtons = function(sm){
        // set raycaster
        sm.raycaster.setFromCamera( sm.pointer, sm.camera );
        // check buttons group
        var intersects = sm.raycaster.intersectObjects( sm.buttons.children, true );
        // if button clicked
        if(intersects.length > 0){
            var button = intersects[0].object,
            data = button.userData;
            data.onClick(sm, button, sm.pointer.x, sm.pointer.y);
        }
    };
 
    // create and return a pointer down hander for the given sm object
    var createPointerDownHandler = function(sm){
        return function(event) {
            var canvas = event.target,
            box = canvas.getBoundingClientRect(),
            x = event.clientX - box.left,
            y = event.clientY - box.top;
            // update sm.pointer values
            sm.pointer.x = ( x / canvas.scrollWidth ) * 2 - 1;
            sm.pointer.y = - ( y / canvas.scrollHeight ) * 2 + 1;
            checkButtons(sm);
        };
    };
 
    // create a button group;
    var createButtonGroup = function(opt){
        opt = opt || {};
        var group = new THREE.Group();
        var i = 0;
        while(i < 3){
            var button = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 2),
                new THREE.MeshNormalMaterial());
            button.position.y = 1 - 1.25 * i;
            var data = button.userData;
            data.i = i;
            data.onClick = opt.onClick || function(sm, button, x, y){
                 console.log('button ' + button.userData.i + ' clicked')
            };
            group.add(button);
            i += 1;
        }
        return group;
    };
 
    // STATE MACHINE (sm) OBJECT
    api.createSMObject = function(){
        var sm = {
            lt: new Date(),
            fps: 30,
            raycaster: new THREE.Raycaster(),
            pointer: new THREE.Vector2(1, 1),
            camera : new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000),
            renderer : new THREE.WebGLRenderer(),
            scene : new THREE.Scene(),
            buttons: createButtonGroup()
        };
        // add grid helper to the scene
        sm.scene.add(new THREE.GridHelper(9, 9));
        // adding a button group to the scene
        sm.scene.add(sm.buttons);
        // starting positon and look at for camera
        sm.camera.position.set(4, 2, 2);
        sm.camera.lookAt(0, 0, 0);
        // renderer
        sm.renderer.setSize(640, 480);
        document.getElementById('demo').appendChild(sm.renderer.domElement);
        // EVENTS
        sm.renderer.domElement.addEventListener( 'pointerdown', createPointerDownHandler(sm), false );
        // return the sm object
        return sm;
    };
 
    return api;
 
}());
```

### 1.2 - Basic example of this so far

```js
var sm = smMod.createSMObject();
 
var update = function(state, secs){
};
 
// LOOP
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / sm.fps) {
        // update
        update({}, secs);
        // render
        sm.renderer.render(sm.scene, sm.camera);
        sm.lt = now;
    }
}
loop();
```

## 2 - Conclusion

It has been a while sense I worked on anything with threejs so I am a little rusty when it comes to working with it. However it would seem that my content on threejs is taking off a little so it seems like I might be writing some new content on three.js as well as editing my older content while I am at it soon.

This example alone as well as many of the other simple project examples I have made thus far are in a dire need of a little more work. This is why thinks have sowed down a little when it comes to writing new posts, this content as well as many others that I have write before need to be revised now and then.
