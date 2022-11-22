---
title: Menus System threejs project example
date: 2021-12-03 15:00:00
tags: [three.js]
layout: post
categories: three.js
id: 943
updated: 2022-11-22 09:21:23
version: 1.18
---

I was thinking about slapping together a quick project that makes use of the Raycaster class to create a simple yet effective menu system in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). If you are not familiar with the [raycaster constructor in threejs yet, it is something that you will want to look into](https://threejs.org/docs/#api/en/core/Raycaster) at some point sooner or layer as it is a very usful tool when it comes to figuring out how to click a mesh object sort of speak. The Raycaster constructor is what can be used to find out if a 2d pointer click of one kind or another has resulted in a mesh object being clicked or not. This raycaster class can be used to find one or more objects from any point in space to another also actually, but for todays [threejs project](/2021/02/19/threejs-examples/) example a raycster instance will help a whole lot if the aim is to make some kind of menu system using threejs.

<!-- more -->

## Making a menu system in threejs and What to know first

There are a lot of things that you should know before getting into how to go about making a menu system with three.js. There is of course starting out with a [basic getting started type example with threejs](/2018/04/04/threejs-getting-started/) if you still have very little experience with threejs first. However regardless of how much experience you may have it might be a good idea to learn more or refresh on a few things so I will be writing about what that is in this intro section of this post.

### Read up more on the Raycaster class

It might be better to just start out with some very basic hello world type examples with [the raycaster class in threejs first](/2021/05/18/threejs-raycaster/). Once one gains a decent grasp on the raycaster class it becomes clear what the various use case examples are for it, and one typical thing to do would be to work out some kind of menu system using it. However I also find it very usful for other tasks as well such as having a way to position a mesh object to the surface of another mesh object and doing so in a way that will work well with just about any kind of geometry.

### Check your version numbers

When I was working on this threejs example last I was using [threejs r135](https://github.com/mrdoob/three.js/releases/tag/r135), and the code seems to be working well for me at that time. If the code examples here are not working for you the version of threejs is what you are going to want to check first. AFter that you might be running into some other kind of problem.

### Source is on Github

The source code for this threejs example can be found in [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs). I also have the source code for [my many other posts on threejs](/categories/three-js/) located in that repository as well.

## 1 - A Basic example of this threejs powered menu system

In this section I will be starting out with just the basics of what needs to happen first in order to get this menu system up and running. The main thing is that I have at least one javaScript sm.js file that provides a means to create what I am calling a state machine object. This library just has one public method thus far that is used to create and return a main state machine object. This state machine object can then be used in a main app loop of a main javaScript file thus far. 

As of this writing the state of this sm.js is not so great, so things will likely change a whole lot in any future reversions of this examples when I get around to editing this post next. However much of the core functionality that I had in mind is all ready working, so maybe only so much more will need to change.

In any case this is kind of an advanced post on threejs so I assume  that you know at least a little when it comes to using threejs and javaScript in general. If not you might want to step back and start out with something aimed more for developers that are new to threejs such as the [getting started with threejs post](/2018/04/04/threejs-getting-started/) that I wrote a while back.

### 1.1 - The sm.js file that creates and returns a State Machine Object

So then here I have the state of the sm.js file thus far that will create and return a main sm object. The first and foremost method of concern then is the public createSmObject method which is what I would call from a main javaScript file in which I would want to use this file.

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

Now for just a basic hello world style example of this sm module this far. With that said I guess that there is just calling the create sm object method of the module to get my sm object. I will then just need to make sure that I am calling the render method of the object in the body of my main animation loop of the example.

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

For now the basic idea of what I want to happen seems to work just fine as expected. When I client one of the mesh objects in the scene the default message is shown in the javaScript console. So then the module even in its current from seems to work okay thus far. So then now that the basic idea of what I have in mind seems to work the next step is maybe just making one or more examples that are a little more interesting than this. Something that works like that of some kind if DVD menu or something to that effect would be cool.

## Conclusion

This example alone as well as many of the other simple project examples I have made thus far are in a need of a little more work of course. This is why things have slowed down a little when it comes to writing new posts, this content as well as many others that I have write before need to be revised a little. This whole thing needs to be redone into what I might call a first revision of what I want to have when it comes to this sort of thing, and at the time of this writing I do not have the time yet to do that.

I have poked my head in and edited this content piece a little at this time, but I can not say that this example has a high priority for me when it comes to putting a little more time into it. I have a lot of pots boiling all at once and this project is on a far back burner it at the moment. I seem to me more interested in using threejs as a way to make programs that have to do with making videos, rather than some kind of menu system.

Still when this is up and running the very crude, basic idea, is in fact working. So what needs to happen is just a little refinement of the source code in terms of a standard module type project that I can drop into a folder and link to.