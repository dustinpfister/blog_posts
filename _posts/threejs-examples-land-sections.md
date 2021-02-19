---
title: A Three js example of my land sections idea
date: 2021-02-15 14:38:00
tags: [three.js]
layout: post
categories: three.js
id: 803
updated: 2021-02-19 15:01:13
version: 1.11
---

I have been neglecting my content on [threejs](https://threejs.org/), so I thought it would be a good idea to put an end to that by writing some new content on threejs this week, and edit a few posts while I am at it. I have all ready wrote a bunch of posts on the very basics of threejs and although there might sill be more for me to learn about the library itself I think I am at a point now where I should start working on some [actual examples](/2021/02/19/threejs-examples/) using threejs. So to start off this week I thought I would at least start an example that is another way of displaying the basic idea of my [Mr Sun game](/2020/11/03/canvas-example-game-mr-sun/) that I have been working on and off for a while.

The basic idea of my Mr Sun game is to have a display object that represents a sun, and then a bunch of land sections surrounding the sun. It is then possible to move the sun object around and by doing so that effects the surrounding land section objects. There is then all kinds of other ideas that branch off from there and I have many projects that are just that. Still the basic idea is simple enough and I think it would not be so hard to make a basic threejs example that is another way to go about creating that basic idea at least.

<!-- more -->

## 1 - The game object

First off I just worked out a simple game object module that creates a game object that is formated like many of the modules that I have created for this game thus far. If often end up with a main game state object where I have a sun object that contains the current position of the sun, and an array of section objects that share a common set of values for position and radius.

This game module is then not intended to be a replacement for a game module that has all the features of the game. I just want the basic set of values for the objects that have to do with the position of them relative to a center point or origin.

```js
var game = (function () {
 
    var distance = function(game, section){
        return Math.sqrt( Math.pow(game.sun.x - section.x, 2) + Math.pow(game.sun.y - section.y, 2) );
    };
 
    // game state object for now
    var game = {
        sun: {
            x: 40,
            y: 0,
            r: 64
        },
        sectionDist: 75,
        sections: []
    };
    var i = 0,
    section,
    radian,
    sectionCount = 12;
    while(i < sectionCount){
         radian = Math.PI * 2 / sectionCount * i;
         section = {
             x: Math.cos(radian) * game.sectionDist,
             y: Math.sin(radian) * game.sectionDist,
             r: 48,
             per: 0
         };
         section.per = distance(game, section) / (game.sectionDist * 2);
         section.per = section.per > 1 ? 1 : section.per;
         section.per = section.per < 0 ? 0 : section.per;
         game.sections.push(section);
         i += 1;
    }
 
    return game;
 
}
    ());
```

## 2 - The sections.js file

I made a sections.js file that will create and return a [threejs group](/2018/05/16/threejs-grouping-mesh-objects/) object based off of a game object that I pass to a create method. The idea here is to make a standard game object that I can use in a plain 2d view of the game, but I can also use the same game object to create a basic 3d view of the game with threejs. So I just need a module that will create a bunch of groups of mesh objects to which I can then add to a scene in the main.js file. I am pretty sure I am going to go with a plain 2d view, but it would be nice to play around with a 3d option also, and maybe even some kind of project that is a hybrid of sorts actually.

```js
var Sections = (function () {
 
    var THREEJS_MAX_RADIUS = 4;
 
    // create land sections objects
    var createLandSections = function(game){
        var sections = new THREE.Group();
        var sectionCount = game.sections.length,
        sectionIndex = 0,
        section;
        while(sectionIndex < sectionCount){
            section = game.sections[sectionIndex];
            var mesh = new THREE.Mesh(
                new THREE.SphereGeometry(section.r / game.sectionDist, 20),
                new THREE.MeshBasicMaterial({
                    color: 'rgba(0,' + Math.round(255 * section.per) + ',0,1)',
                    wireframe: true
                }));
            mesh.userData.type = 'section';
            mesh.position.x = (section.x / game.sectionDist) * THREEJS_MAX_RADIUS;
            mesh.position.y = (section.y / game.sectionDist) * THREEJS_MAX_RADIUS;
            mesh.position.z = 0;
            mesh.lookAt(0,0,0);
            sections.add(mesh);
            sectionIndex += 1;
        }
        sections.userData.type = 'sectionGroup';
        return sections;
    };
 
    // create land sections objects
    var createSun = function(game){
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(game.sun.r / game.sectionDist, 20),
            new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            }));
        mesh.userData.type = 'sun';
        mesh.position.x = 0
        mesh.position.y = 0
        mesh.position.z = 0;
        return mesh;
    };
 
    // PUBLIC API
    var api = {};
 
    api.create = function(game){
        var mainGroup = new THREE.Group();
        // add land sections
        mainGroup.add(createLandSections(game));
        // add sun
        mainGroup.add(createSun(game));
        return mainGroup;
    };
 
    api.update = function(game, mainGroup){
        mainGroup.children.forEach(function(child){
             if(child.userData.type === 'sun'){
                 child.position.x = game.sun.x / game.sectionDist * THREEJS_MAX_RADIUS;
                 child.position.y = game.sun.y / game.sectionDist * THREEJS_MAX_RADIUS;
             }
        });
    };
 
    return api;
}
    ());
```

## 3 - main.js

I then just have a main.js file that makes use of the game module and sections modules to create this basic three.js example of my Mr sun game idea. In this file I create the main scene, and add a camera to use of the scene. I create a main group object with the sections module and pass the game object to it. For now I just update the state of the main group once also, and set up a renderer for the example.

I am making use of the orbit controls provided in the three.js repo. I will not be getting into this feature in depth here as I have wrote a post on the [threejs orbit controls](/2018/04/13/threejs-orbit-controls/) before hand. I then also have a main app loop and for now the only reason why is because of the orbit controls until I add a way to change the sun position.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
 
    var mainGroup = Sections.create(game);
    scene.add(mainGroup);
 
    Sections.update(game, mainGroup);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
 
    animate();
 
}
    ());
```

## 4 - Conclusion

I might get around to working on this example a little more at some point, but yet again I might not ever go much beyond what I have together here. I am trying to work out the core logic of what the game should be that is independent of having a 2d or 3d view of the game. When it comes to that I have a [land sections vuejs example](/2021/02/02/vuejs-example-land-sections/) actually where I am trying to focus on working out what might be fun when it comes to the basic logic of the game. 

If I get somewhere with what the core of the game is I might get around to working out some kind of 3d view of the game with this example. However it might be best to stick to a more simple 2d view when it comes to my basic 2d canvas examples. Yet another idea is some kind of hybrid actually where I am using an 2d overlay canvas, and then use threejs as a way to create a 3d view with a fixed camera angle in the background.
