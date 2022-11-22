---
title: Menus System threejs project example
date: 2021-12-03 15:00:00
tags: [three.js]
layout: post
categories: three.js
id: 943
updated: 2022-11-22 12:25:08
version: 1.21
---

I was thinking about slapping together a quick project that makes use of the Raycaster class to create a simple yet effective menu system in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). If you are not familiar with the [raycaster constructor in threejs yet, it is something that you will want to look into](https://threejs.org/docs/#api/en/core/Raycaster) at some point sooner or layer as it is a very usful tool when it comes to figuring out how to click a mesh object sort of speak. The Raycaster constructor is what can be used to find out if a 2d pointer click of one kind or another has resulted in a mesh object being clicked or not. This raycaster class can be used to find one or more objects from any point in space to another also actually, but for todays [threejs project](/2021/02/19/threejs-examples/) example a raycster instance will help a whole lot if the aim is to make some kind of menu system using threejs.

<!-- more -->

## Making a menu system in threejs and What to know first

There are a lot of things that you should know before getting into how to go about making a menu system with three.js. There is of course starting out with a [basic getting started type example with threejs](/2018/04/04/threejs-getting-started/) if you still have very little experience with threejs first. However regardless of how much experience you may have it might be a good idea to learn more or refresh on a few things so I will be writing about what that is in this intro section of this post.

### Read up more on the Raycaster class

It might be better to just start out with some very basic hello world type examples with [the raycaster class in threejs first](/2021/05/18/threejs-raycaster/). Once one gains a decent grasp on the raycaster class it becomes clear what the various use case examples are for it, and one typical thing to do would be to work out some kind of menu system using it. However I also find it very usful for other tasks as well such as having a way to position a mesh object to the surface of another mesh object and doing so in a way that will work well with just about any kind of geometry.

### Check your version numbers

When I was working on this threejs example last I was using [threejs r135](https://github.com/mrdoob/three.js/releases/tag/r135), and the code was working well for me at that time with the old example that I started with. The last time I came around to do some editing of this post I started an official r0 of a menu.js module, and with the demos that I started with that I was using r146 of threejs. If the code examples here are not working for you the version of threejs is what you are going to want to check first. After that you might be running into some other kind of problem.

### Source is on Github

The source code for this threejs example can be found in [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs). I also have the source code for [my many other posts on threejs](/categories/three-js/) located in that repository as well.

## 1 - The menu.js file and demos \(r0\) using r146 of threejs

In this section I will be going over r0 of my menu.js file, and at least one if not more demos of the module in action. This is based off of the source code that I started with when I first wrote this post, but with many changes. For one thing I am not leaving the process of setting up the typical objects that have to do with a typical three js project as part of the demo. The create method of the menu module will only create a renderer and so forth if needed in the even that I do not pass one to the create method by way of an options object.

Speaking of the create options I have also added a long of additional basic options that have to do with things like just setting the number of buttons that I want and the size of each button. I did not go to far of the rails with this thus far though as I am not seeing myself using this example in any kind of production project just yet. However if I even do need or want to make some kind of menu system with threejs this might prove to be an okay starting point now.

### 1.a - The menus module \( r0 \)

Here I have the source code for r0 of my menu.js module that seems to work okay thus far. There is just one public method that I call in a project in which I use this that will create and return an object that will contain a group of mesh objects. Each mesh object of the group will be a button that when clicked will fire an on click method and pass a ref to that button mesh object as an argument for the on click method. So then I can set a number of buttons that I want for the menu, and then a custom on click method where I will define the logic that I want to call when a button object is clicked.

```js
// menu.js - r0 - from threejs-examples-menus
// https://dustinpfister.github.io/2021/12/03/threejs-examples-menus/
(function(api){
    // create menu buttons
    var checkButtons = function(menu){
        // set raycaster
        menu.raycaster.setFromCamera( menu.pointer, menu.camera );
        // check buttons group
        var intersects = menu.raycaster.intersectObjects( menu.buttons.children, true );
        // if button clicked
        if(intersects.length > 0){
            var button = intersects[0].object,
            data = button.userData;
            data.onClick(menu, button, menu.pointer, button.userData);
        }
    };
    // create and return a pointer down hander for the given sm object
    var createPointerDownHandler = function(menu){
        return function(event) {
            var canvas = event.target,
            box = canvas.getBoundingClientRect(),
            x = event.clientX - box.left,
            y = event.clientY - box.top;
            // update sm.pointer values
            menu.pointer.x = ( x / canvas.scrollWidth ) * 2 - 1;
            menu.pointer.y = - ( y / canvas.scrollHeight ) * 2 + 1;
            checkButtons(menu);
        };
    };
    // create a button group;
    var createButtonGroup = function(opt, menu){
        var group = new THREE.Group();
        group.name = opt.prefix;
        var i = 0;
        while(i < opt.count){
            var button = new THREE.Mesh(
                new THREE.BoxGeometry(opt.d, opt.h, opt.w),
                new THREE.MeshNormalMaterial());
            button.position.y = opt.h - ( opt.h + opt.space ) * i;
            button.name = opt.prefix + '_' + i;
            var data = button.userData;
            data.i = i;
            data.onClick = opt.onClick || function(menu, button, v2, mud){
                 console.log('button ' + mud.i + ' clicked')
            };
            group.add(button);
            i += 1;
        }
        return group;
    };
    // STATE MACHINE (sm) OBJECT
    api.create = function(opt){
        opt = opt || {};
        var menu = {
            raycaster: new THREE.Raycaster(),
            pointer: new THREE.Vector2(1, 1),
            camera : opt.camera || new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000),
            renderer : opt.renderer || new THREE.WebGL1Renderer(),
            scene : opt.scene || new THREE.Scene(),
            buttons: null
        };
        // create button mesh objects
        opt.count = opt.count === undefined ? 4 : opt.count;
        opt.prefix = opt.prefix || 'menu';
        opt.d = opt.d === undefined ? 0.5 : opt.d;
        opt.h = opt.h === undefined ? 1.0 : opt.h;
        opt.w = opt.w === undefined ? 3.0 : opt.w;
        opt.space = opt.space === undefined ? 0.25 : opt.space;
        menu.buttons = createButtonGroup(opt, menu);
        // add grid helper to the scene
        menu.scene.add(new THREE.GridHelper(9, 9));
        // adding a button group to the scene
        menu.scene.add(menu.buttons);
        // EVENTS
        menu.renderer.domElement.addEventListener( 'pointerup', createPointerDownHandler(menu), false );
        // return the sm object
        return menu;
    };
}( this['menuMod'] = {} ));
```

### 1.1 - Basic demo of the module where the button scale just changes when clicked

This is my first basic demo of r0 of menu.js where I just want to create a few buttons and have the scale of each button change when a button is clicked. So after creating my typical set of objects that I want when making any threejs project I then call the main create method of the menu module. I then use the scene, renderer, and camera objects that I just created for the menu by passing them with the options object when calling the create method. In addition to that I also set the number of buttons that I want for the menu, and define a custom on click method.

The custom on click method that I made for this demo will just set a scale delta value for the button that was clicked to a given amount. This amount will then be used in the process of setting the actual scale value that will be used in an update method. Also in this update method the scale value will reduce over time.

I am then using the object3d traverse method to loop over all the objects of the main group of the menu that is returned. I could use this to do things like set up new materials, and anything else that i would want to change on a mesh by mesh basic. However for the sake of this demo I just want to set up some values for the user data objects of each mesh object.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.5, 100);
camera.position.set(2.75, 2.75, 2.75);
camera.lookAt(0, -0.25, 0 );
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// CREATE MENU
// ---------- ---------- ----------
var menu = menuMod.create({
    renderer: renderer,
    scene: scene,
    camera: camera,
    count: 3,
    prefix: 'menu1',
    onClick: function(menu, button, v2, mud ){
        console.log('Button ' + mud.i + ' clicked at: ' + v2.x.toFixed(2) + ', ' + v2.y.toFixed(2));
        mud.scaleDelta = 0.25;
    }
});
// set up buttons
menu.buttons.traverse( (obj) => {
    if(obj.type === 'Mesh'){
        const button = obj;
        const mud = button.userData;
        mud.scaleDelta = 0;
        console.log(mud);
        mud.scale = 1;
    }
});
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20;
let secs = 0,
lt = new Date();
// update
const update = function(secs){
    menu.buttons.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            const button = obj;
            const mud = button.userData;
            mud.scaleDelta -= 0.5 * secs;
            mud.scaleDelta = mud.scaleDelta < 0 ? 0 : mud.scaleDelta;
            mud.scale = 1 + mud.scaleDelta;
            button.scale.set(mud.scale, mud.scale, mud.scale);
        }
    });
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( secs );
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```


## 2 - OLD example of this threejs powered menu system using r135 of threejs

In this section I will be starting out with just the basics of what needs to happen first in order to get this menu system up and running. The main thing is that I have at least one javaScript sm.js file that provides a means to create what I am calling a state machine object. This library just has one public method thus far that is used to create and return a main state machine object. This state machine object can then be used in a main app loop of a main javaScript file thus far. 

As of this writing the state of this sm.js is not so great, so things will likely change a whole lot in any future reversions of this examples when I get around to editing this post next. However much of the core functionality that I had in mind is all ready working, so maybe only so much more will need to change.

In any case this is kind of an advanced post on threejs so I assume  that you know at least a little when it comes to using threejs and javaScript in general. If not you might want to step back and start out with something aimed more for developers that are new to threejs such as the [getting started with threejs post](/2018/04/04/threejs-getting-started/) that I wrote a while back.

### 2.1 - The sm.js file that creates and returns a State Machine Object

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

### 2.2 - Basic example of this so far

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

Still when this is up and running the very crude, basic idea, is in fact working. So what needs to happen is just a little refinement of the source code in terms of a standard module type project that I can drop into a folder and link to. There is just a lot more that I would like to add in any and all future revisions of this module that may or may not come to pass if I do ever put more time into this one at some point in the future. Some additional public methods that will help with the process of styling the buttons for one thing maybe.

