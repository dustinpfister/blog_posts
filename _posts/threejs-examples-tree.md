---
title: A Three js example making a tree model
date: 2019-07-30 21:20:00
tags: [three.js]
layout: post
categories: three.js
id: 511
updated: 2021-04-25 10:53:04
version: 1.13
---

So this is another [three js example](/2021/02/19/threejs-examples/) post this time I made a quick model of a tree. This model makes use of the three js built in [cone geometry](/2019/07/31/threejs-cone/) constructor, and groups to make collections of cones sized and positioned in such a way that they look like a kind of evergreen tree. It is one of my many crude yet effective kinds of modles that I like to make just when it comes to having a little fun with three.js and a little javaScript code.

This kind of example is a very basic getting started type example when it comes to just figuring out some basic ideas for projects, and reusable assets that I can use in a larger project. This might not be the most fun and exciting example, but working out a half way decent way of creating a tree model is a good start for creating a larger sense that contains trees, and also other things going on in the sense in addition to just this.

<!-- more -->

## 1 - Before continuing with this three js example post

This is a post on using the javaScript library three js that can be used to work with 3d objects. This is not a getting started post on three js as well as the many constructors and so forth in the library. It is assumed that you have at least some background with the basics when it comes to suing three js as well as javaScript programing in general. If not you might have a hard time following the content of this post.

## 2 - The tree constructor

Here is the javaScript that I worked out that gave me a decent tree model to work with. The Model is a constructor that creates an instance of the tree module and has a group as one of its properties that I add to a scene when creating a project that makes use of the model.

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
    this.coneLengthReduction = opt.coneRadiusReduction || 4.5;
 
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
        secObj.stdLength = this.coneMaxLength - this.coneLengthReduction * (Math.pow(2, secObj.i) - 1) / Math.pow(2, this.sections);
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

If for some reason I want to use a custom expression when it comes to setting the position and rotation of the cones I can use the forConeValues option to do so.

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

## 5 - Conclusion

I hope to get around to making some more three js examples in the near future. I have forgot how fun it can be to make these kinds of projects. So far I have made a few additional simple models like this, such as one that is of a simple little [biplane example](/2021/02/17/threejs-example-biplane/), and also one that is a [group of biplane models](/2021/02/18/threejs-examples-biplane-group/). I might get around to making at least a few more examples that will start to be some kind of interesting animations, or artful like ting, but there is so more more to write about and learn about in the process.
