---
title: A Three js example making a tree model
date: 2019-07-30 21:20:00
tags: [three.js]
layout: post
categories: three.js
id: 511
updated: 2021-06-06 14:42:11
version: 1.22
---

So this is another [three js example](/2021/02/19/threejs-examples/) post using just the [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) JavaScript library, and a little additional vanilla javaScript code to make a quick crude model of a tree that looks like some kind of every green type tree. 

This model makes use of the three js built in [cone geometry](/2019/07/31/threejs-cone/) constructor, and the [THREE.group constructor](/2018/05/16/threejs-grouping-mesh-objects/) to make collections of cones sized and positioned in such a way that they look like a kind of evergreen tree rather than other general type of trees. It is one of my many crude yet effective kinds of models that I have made thus far that I can use in over all larger projects when it comes to having some kind of outdoor like scene. There kinds of models in my opinion work when it comes to a kind of simple low polly type of art style, and also there are many other things in a project that I would like to move on with anyway.So it would seem that I just like to make the decision to set the bar fairly low, make a simple model of something, and then move on to the next thing when it comes to an over all project.

This kind of example is a very basic getting started type example when it comes to just figuring out some basic ideas for projects, and reusable assets that I can use in a larger project. This might not be the most fun and exciting example, but working out a half way decent way of creating a tree model is a good start for creating a larger scene that contains trees, and also other things going on in the sense in addition to just this.

<!-- more -->

## 1 - Before continuing with this three js example post

This is a post on using the javaScript library three js that can be used to work with 3d objects. This is not a [getting started post on three js](/2018/04/04/threejs-getting-started/) by itself as well as how to use the many various constructors functions and what a constructor function is to begin with. It is assumed that you have at least some background with the basics when it comes to suing three js as well as javaScript programing in general. If not you might have a hard time following the content of this post as I am using a lot of features in the source code that you should have at least some understanding of.

### 1.1 - Do not just stop with this example when it comes to making trees

There are a lot of ways of going about making tree models even with it comes to the crude informal style that I like to make them with. This is an example where I am making a whole bunch of mesh objects using the cone geometry, but another nice way to just quickly make something that looks a little like a three is to just place a sphere on top of a box or cylinder geometry and calling it a day. In fact I [have another tree model worked out](/2021/05/19/threejs-examples-tree-sphere/) that is just that simple, and if you ask me it still works when it comes to a crude low Polly art style.

### 1.2 - Be sure to check the version number you are using

When I first wrote this post and the source code of the example here I was using revision 106 of threejs, and the last time I tested things out and did a little editing of this post I was using revision 127 of threejs. Code breaking changes are made to threejs all the time so be mindful of what version you are using.

## 2 - The tree constructor

Here is the javaScript that I worked out that gave me a decent tree model to work with in various projects where I just want a crude yet effective looking type of tree in the scene. The Model is a constructor that creates an instance of this Tree class and has a group as one of its properties that I add to a scene when creating a project that makes use of the model. When calling the constructor function there are a number of options that I can pass it it my way of an options object. These options are for setting things like the number of cone sections to use.

I am not doing much of anything with the prototype but it contains a few static methods. This might change if I ever get around to doing more work on this at some point in the future.

```js
var Tree = function (opt) {
    // options
    opt = opt || {};
    this.sections = opt.sections || 5;
    this.conesPerSection = opt.conesPerSection || 7;
    this.coneMaterial = opt.coneMaterial || new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.coneMaxRadius = opt.coneMaxRadius || 0.7;
    this.coneRadiusReduction = opt.coneRadiusReduction || 0.3;
    this.coneMaxLength = opt.coneRadiusReduction || 5;
    this.coneLengthReduction = opt.coneLengthReduction || 4.5;
    // call backs
    this.forConeValues = opt.forConeValues || function () {};
    this.forConeMesh = opt.forConeMesh || function () {};
    this.forSection = opt.forSection || function () {};
    this.onDone = opt.onDone || function () {};
    // the main group to add to scene
    this.group = new THREE.Group();
    // section object
    var secObj = {
        i: 0
    }
    // loop sections
    while (secObj.i < this.sections) {
        var groupSection = new THREE.Group();
        // cone object
        var coneObj = {
            i: 0
        };
        // standard radius and length
        // and set default radius and y position of section
        secObj.stdRadius = this.coneMaxRadius - this.coneRadiusReduction * (secObj.i / this.sections);
        secObj.stdLength = this.coneMaxLength - (this.coneLengthReduction * (secObj.i / this.sections) );
        secObj.radius = secObj.stdLength - secObj.stdLength / 2;
        secObj.y = secObj.stdRadius * 2 * secObj.i;
        secObj.radOffset = (secObj.i % 2) * Math.PI;
        // call for section
        this.forSection.call(this, secObj);
        // loop cones
        while (coneObj.i < this.conesPerSection) {
            Tree.defaultConeObj(this, coneObj, secObj);
            // call any forConeValues method that may be given
            this.forConeValues.call(this, coneObj, secObj);
            // create the cone geometry
            var cone = new THREE.ConeGeometry(
                    coneObj.radius,
                    coneObj.length,
                    coneObj.segRad,
                    coneObj.segLength,
                    coneObj.open,
                    coneObj.thetaStart,
                    coneObj.thetaLength);
            // create the mesh
            var mesh = new THREE.Mesh(
                    cone,
                    coneObj.material || this.coneMaterial);
            // position and rotate
            mesh.position.set(coneObj.x, coneObj.y, coneObj.z);
            mesh.rotation.set(coneObj.r.x, coneObj.r.y, coneObj.r.z)
            // call forConeMesh
            this.forConeMesh.call(this, mesh, coneObj, secObj);
            groupSection.rotation.set(0, secObj.radOffset, 0);
            // add mesh to group
            groupSection.add(mesh);
            // next cone
            coneObj.i += 1;
        }
        // set y position of section
        // and add the section to the group
        groupSection.position.y = secObj.y;
        this.group.add(groupSection);
        // next section
        secObj.i += 1;
    }
    // call on done if given
    this.onDone.call(this);
};
 
Tree.defaultConeObj = function (tree, coneObj, secObj) {
    coneObj.per = coneObj.i / tree.conesPerSection;
    coneObj.radian = Math.PI * 2 * coneObj.per;
    Tree.setConePos(coneObj, secObj);
    coneObj.r = {
        x: Math.PI / 2,
        y: 0,
        z: Math.PI * 2 / tree.conesPerSection * coneObj.i - Math.PI / 2
    };
    coneObj.radius = secObj.stdRadius;
    coneObj.length = secObj.stdLength;
    coneObj.segRad = 32;
    coneObj.seglength = 1;
    coneObj.open = false;
    coneObj.thetaStart = 0;
    coneObj.thetaLength = Math.PI * 2;
};
 
Tree.setConePos = function (coneObj, secObj) {
    var radian = coneObj.radian;
    coneObj.x = Math.cos(radian) * secObj.radius;
    coneObj.y = 0;
    coneObj.z = Math.sin(radian) * secObj.radius;
};
```

When I use the model to create an instance of the tree model there are a wide range of options that I can give alone with methods that are to be called for each cone that I can use to override some of the values that are used to position and size the cones.

## 3 - Basic example of the tree model

For a basic example I just called the constructor and only used a custom material that will respond to a light source, the standard material is one such material that will work light. In this example I am also using the three js built in orbit controls also.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
 
    // BASIC TREE
    var tree = new Tree({
            coneMaterial: new THREE.MeshStandardMaterial({
                color: 0x00af00
            })
        });
    scene.add(tree.group);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}
    ());
```

## 4 - Using the forConeValues option

If for some reason I want to use a custom expression when it comes to setting the position, rotation, or any other value on a cone by cone basis of the cones I can use the forConeValues option as one way to go about doing so.

```js
// TREE with custom forConeValues method
var tree = new Tree({
        coneMaterial: new THREE.MeshStandardMaterial({
            color: 0x00af00
        }),
        sections: 10,
        forConeValues: function (cone, section) {
            cone.length = 4;
            cone.radius = 1.1 - 0.4 * (section.i / this.sections);
            var radius = cone.length - cone.length * 0.80 * (section.i / this.sections);
            cone.x = Math.cos(cone.radian) * radius;
            cone.z = Math.sin(cone.radian) * radius;
        }
    });
scene.add(tree.group);
```

This feature was just added in just for the heck of it, and I am not sure if this is a feature that I would really want or need in this kind of project. I also made this tree constructor back before I was aware of an object3d method known as object3d.traverse that I can also use as a way to loop over all the mesh objects of a group. So at some point in the future it is possible that I might remove this feature actually.

## 5 - Conclusion

I might get around to making a few more additional changes to these models at some point in the future, but only if I start to actually use this in a project or two.

I hope to get around to making some more three js examples in the near future as they prove to be quick, simple, basic projects at least when it comes to the ones that I like to make thus far. I have forgot how fun it can be to make these kinds of projects, and when I keep things simple progress and move along fast. 

So far I have made a few additional simple models like this, such as one that is of a simple little [biplane example](/2021/02/17/threejs-example-biplane/), and also one that is a [group of biplane models](/2021/02/18/threejs-examples-biplane-group/). I might get around to making at least a few more examples that will start to be some kind of interesting animations, or artful like ting, but there is so more more to write about and learn about in the process.
