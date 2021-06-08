---
title: A Three js example making a tree model
date: 2019-07-30 21:20:00
tags: [three.js]
layout: post
categories: three.js
id: 511
updated: 2021-06-08 10:49:48
version: 1.29
---

I want to start creating some video projects some of which will feature an outdoor type scene, so I would like to make some crude yet functional models composed of built in threejs geometry constructors, and one such model that I will want will be a kind of tree. I might want to end up making a few models that are a kind of tree actually, but one will be something that looks like a pine tree rather than one of the other general types of trees. So this post will be another one of my posts on a [three js basic model example](/2021/02/19/threejs-examples/) using just the [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) JavaScript library, and a little additional vanilla javaScript code to make a quick crude model of a tree that looks like some kind of ever green type tree. 

This model makes use of the three js built in [cone geometry](/2019/07/31/threejs-cone/) constructor, and the [THREE.group constructor](/2018/05/16/threejs-grouping-mesh-objects/) to make collections of cones sized and positioned in such a way to from a circle of cones with each cone pointing outward from the center. I will then have a few of these kinds of groups stacked on top of each other that will form an over all group that is the full tree. I will then just want to adjust the length, and possibly the radius of the cones from the bottom cone group section to the top.

I have made a number of other models like this that can be described as a crude yet effective kinds of model that can be used in an over all larger project, when it comes to creating a typical outdoor like scene. There is not just stopping with this kind of model for a tree, but going on to make a few more with a similar style, I will want at least a few models like this and not just one. These kinds of models in my opinion work when it comes to a kind of simple low polly art style, where the focus is more on the over all subject of the project and not so much the graphics. Also there are many other things in a project that I would like to move on with, and not end up spending vast abouts of time making models, so it seems like a good idea to just slap some quick solutions together and focus on something else when it comes to this. So it would seem that I would just like to make the decision to set the bar fairly low, make a simple model of something, and then move on to the next thing when it comes to an over all project.

This kind of example is a very basic getting started type example when it comes to just figuring out some basic ideas for projects, and reusable assets that I can use in a larger project. This might not be the most fun and exciting example, but working out a half way decent way of creating a tree model is a good start for creating a larger over all project in which I might make use of this. There is not just making a module that will be used to create and maybe mutate this kind of group of mesh objects, but using this tree model with a bunch of other little projects to make an over all larger project.

<!-- more -->

## 1 - Before continuing with this three js example post

This is a post on using the javaScript library known as three.js that can be used to create and work with 3d objects in a client side JavaScript environment. This is not a [getting started post on three js](/2018/04/04/threejs-getting-started/) by itself as well as how to use the many various constructors functions in threejs, as well as [what a constructor function is to begin with](/2019/02/27/js-javascript-constructor/). So then I assume that you have at least some background with the basics when it comes to using three js, as well as javaScript programing in general. If not you might have a hard time following the content of this post as I am using a lot of features in the source code that you should have at least some understanding of before hand. I will not be getting into every little detail that you show know at this point here, but I will be outline some things tht you might want to read up on more before continuing with this post.

### 1.1 - Read up on THREE.Group, THREE.Mesh, and the Object3d base class in general

This model of a tree is a collection of Mesh Objects that are part of a Group that are in turn a part of another Group. There is reading up more on the Mesh class, and also the Group class, but it might be best to read up more on the [Object3d class in general](/2018/04/23/threejs-object3d/). The Object3d class is a base class of Mesh objects, Groups, Cameras, and even a whole Scene object. So my learning everything there is to know about the Object3d class it is then possible to apply that to all kinds of other objects in three.js.

### 1.2 - Do not just stop with this example when it comes to making trees

There are a lot of ways of going about making tree models even when it comes to the crude informal style that I like to make them with. This is an example where I am making a whole bunch of mesh objects using the cone geometry, but another nice way to just quickly make something that looks a little like a three is to just place a sphere on top of a box or cylinder geometry and calling it a day. In fact I [have another tree model worked out](/2021/05/19/threejs-examples-tree-sphere/) that is just that simple, and if you ask me it still works when it comes to a crude low Polly art style.

### 1.3 - Be sure to check the version number you are using

When I first wrote this post and the source code of the example here I was using revision 106 of threejs, and the last time I tested things out and did a little editing of this post I was using revision 127 of threejs. Code breaking changes are made to threejs all the time so be mindful of what version you are using when working with threejs code example on the open web.

## 2 - The tree constructor

So now lets get to the source code of this basic tree model that are present is just a single constructor function that will create and return an instance of this Tree Class. This tree class has many properties to it, but the main property of interst here is the group property that contains an instance of THREE.Group. It is this group that I will want to add to a scene object when it comes to using this in an over all threejs project.

When calling the constructor function there are a number of options that I can pass to it by way of an options object. These options are for setting things like the number of cone sections to use, and how many cones there should be per section. Other options of interest include the material to use when skinning the cones, by default I am using the Mesh basic Material, however in other use case examples I will of course what create create and pass a custom material for the cones.

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
