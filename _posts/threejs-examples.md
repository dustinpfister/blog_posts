---
title: 37 threejs examples that showcase many of the features of the library
date: 2021-02-19 14:42:00
tags: [three.js]
layout: post
categories: three.js
id: 807
updated: 2022-07-29 09:56:33
version: 1.71
---

I have wrote a number of posts on [threejs](https://threejs.org/) that is the standard goto library for doing anything with 3d modeling in a client side javaScript environment it would seem. [Many of the posts that I have wrote so far](/categories/three-js/) have to do with the various features of threejs, but thus far I can not say that I have made any kind of real project or example with threejs. That is until I started a collection of posts has to do with making some kind of real application rather than just demos of various features of the library. So this post is a kind of index of all of these kinds of posts thus far that I intend to expand on, and come back to edit often.

There is the official set of [threejs examples](https://threejs.org/examples/) that I think people should check out first and foremost before looking at other peoples examples on random blogs such as this one. Many of these examples though are the kind of examples like that of many of my other blog posts on threejs that have to do with various features of the library. There is the the actually project examples that are shown at the root name space of the threejs website, many of which are great examples of what can be done with the library. However there is always looking into yet even more examples of what can be done with threejs that are like that, and this is then a list of what I have together with that thus far.

<!-- more -->

## 1 - What to know before looking into these three.js examples

If you are new to three.js you might want to start off with a [getting started post on three.js](/2018/04/04/threejs-getting-started/) when it comes to learning the very basics. After that there is a whole lot more to learn about when it comes to all the various little features there are to work with when it comes to using the library. However it is only a matter of time until a developer gets to the point where there is only so much remaining to learn, and things start to change over to applying what a developer has learned rather than continuing to learn new things purely for the intrinsic value of learning. In any case I assume that you are this kind of developer with threejs, where you know a fair amount when it comes to the library itself as well as client side [javaScript in general](/2018/11/27/js-getting-started/), and you now want to take a look at what other developers are making when it comes to threejs projects.

## 2 - The list of three.js examples so far

Here is the list of my threejs simple project examples thus far, at this time I do not have them broken down into categories but if I keep up with this it is only a matter of time until I will have to do something to that effect.

### [ 2.1 - Advanced lerping module  ](/2022/07/29/threejs-examples-aplerp/)

The lerp method of the vector3 class is a nice way to make a basic transition between two points of interest. However after that there is looking into how to go about doing something like that but in very different ways such as a movement that starts out slow, then moves faster, and then slows down again. With that said this example is a kind of advanced lerp module where there are a number of built in get alpha methods, and I also write new get aloha methods that I may or may not built into future revisions of th module.

### [ 2.2 - A Backyard ](/2021/05/07/threejs-examples-backyard/)

This is an example of a backyard type scene that makes use of several modules that create groups of mesh objects. This includes my first guy model that is just a bunch of mesh objects grouped together, with the use of canvas textures as a way to draw a face on one of the sides of a box geometry that acts as a head.

### [ 2.3 - A Basic Framework](/2021/04/20/threejs-examples-basic-framework/)

This example aims to be the start of a basic framework that I might use on top of three.js. Every time I start a new three.js project, or even just a simple example there is a lot of code that I find myself repeating over and over again. So it would make sense to pull some of this code into a collection of reusable functions, and maybe make this collection of functions part of an over all larger project.

### [ 2.4 - A Biplane Group Example](/2021/02/18/threejs-examples-biplane-group/)

This is another example of a model but this time around I experimented with creating a model that is a model of models. This is taking the biplane model that I made and create a new model that is just working with a collection of these biplane models.

### [ 2.5 - A Biplane Example](/2021/02/17/threejs-examples-biplane/)

The first example on this list is an example where I am making a simple biplane model to play around with. I am not taking the time to work out a serious model rather, but just slapping a bunch of box geometries together into an instance of [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/). I am then using the [Object3d.userData](/2021/02/16/threejs-userdata/) object to append some properties to an instance of one of these biplane models. The module that is used to create one of these is also the module that I use to update one of theme also.

### [ 2.6 - Build a box ](/2021/05/17/threejs-examples-build-a-box/)

I wanted to make a quick simple three.js project that will helper me to just get a basic idea of how to go about building a simple box out of wood. This example features with a module that can create a collection of mesh objects out of an object that holds the dimensions of a single board of wood.

### [ 2.7 - A Basic Clock Example](/2019/12/16/threejs-examples-clock-basic/)

This is just a Basic clock example which is another kind of example that I like to make when working with a new framework like threejs or any kind of canvas framework. Clocks are nice because they are generally easy to make, but yet there is also still all kinds of room for improvement when it comes to going in a new and interesting direction with it.

### [ 2.8 - Cube Stack Example](/2022/04/29/threejs-examples-cube-stack/)

I while back I made a cool little example for my blog post on the orthographic camera, for this example I took that source code and added a lot more to it.

### [ 2.9 - Cube Stack Grid Example](/2022/05/02/threejs-examples-cube-stack-grid/)

I wanted to continue with my cube stack module and make an example that is a grid where each tile in the grid is an instance of my cube stack module.

### [ 2.10 - A dea file tools module ](/2021/06/25/threejs-examples-dae-tools/)

A module that serves as a basic set of tools when it comes to loading and processing a collection of dea files for a scene.

### [ 2.11 - DAE TOOLS and a Sphere with inverted normals ](/2022/05/31/threejs-examples-dae-tools-sphere-normals-invert/)

In this example I wanted to work out an alternative to that of using a cube texture for the sake of having a background in a scene. For this example I made a sphere with flipped normals and a custom texture in blender and I am using my DAE tools module, along with the DAE file loader, as a way to import this.

### [ 2.12 - My First basic guy model](/2021/04/29/threejs-examples-guy-one/)

This is my first basic guy model that I made that is very crude, yet still seems to work okay as long as I am okay with going with a very crude basic style when it comes to animation. Some times that kind of angle will work okay actually if the over all project makes up for it. In any case this is my first attempt at this kind of model, and in time I am sure it will not be my last, but hey I have to start somewhere when it comes to this kind of thing.

### [ 2.13 - Hamster Wheel](/2021/04/19/threejs-examples-hamster-wheel/) 

This is a fun example that I made that is a human sized hamster wheel, and I placed a simple person model inside the hamster wheel. This is one that I keep coming back to now and then because I can help but feel that I am expressing something that is very reliable for many people here.

### [ 2.14 - House](/2021/04/23/threejs-examples-house/) 

This one is just a simple house model that I might use in one or more additional examples as a way to built and over all scene of some kind. This one alone can be made in all kinds of different ways, some to be used just to add an out door scene, others might be more of an actual full scale house model complete with interior. However this one aims to just be a very basic starting point for this kind of thing.

### [ 2.15 - Land Sections](/2021/02/15/threejs-examples-land-sections/) 

This is an example that I worked out that is an attempt at a 3d view for my Mr Sun game idea to which I have many prototypes for. There is also a vuejs example that I have started where I am focusing more so on what the core of the game logic should be while not putting to much into graphics. I also have a few canvas examples on Mr Sun where I have started simple 2d views for the game, and have all ready started many forks off of the general idea of the game.

If I get a solid idea for the core of what the game should be I might like to experiment with a 3d view for the game, so this example is just that.

### [ 2.16 - Lerp position attributes of buffer geometries](/2022/07/01/threejs-examples-lerp-geo/) 

Lerping the positions of one buffer geometry to another one.

### [ 2.17 - Lines Group Module ](/2022/06/10/threejs-examples-lines-deterministic/) 

A more generic kind of line group module compared to another similar example where the goal was to just create a group of lines that from a sphere.

### [ 2.18 - Lines Sphere Circles](/2022/06/03/threejs-examples-lines-sphere-circles/) 

I wanted a module that will return a group where each child is an instance of a three line that is one of many circles that compose a sphere like shape. I can then work out a number of ways to create animations from there with addtional code.

### [ 2.19 - Vector3 apply Euler and lookAt](/2022/05/06/threejs-examples-lookat-with-apply-euler/) 

This is an example that shows something that might prove to be a problem when using the look at method of the object3d class. it is not that the look at method is broken, it is just that it works a certain way that is fine in most cases, but not in others.

### [ 2.20 - Menus with threejs](/2021/12/03/threejs-examples-menus/)

If you have not looked into working with a ray caster yet you might want to do so at some point, that truly is the case if you want to make some kind of user interface with threejs among other tasks in which a ray cater comes in handy. Simply put a ray caster is a way to go about finding out if one or more mesh objects have been clicked on by casting a ray from a position such as the position of the camera outward from the camera to get whatever mesh objects come in contact with that ray.

### [ 2.21 - Nested groups](/2021/05/10/threejs-examples-nested-groups/)

An example that is a collection of mesh objects in a group nested in another group that I made just for the hell of it mostly. However I did not make this just for the intrinsic value of doing so, there are a few things that I need to be aware of when it comes to nesting objects within objects mainly when it comes to things like the position attribute and the use of the look at method in the object3d class. In other words there is local position and world space positions and knowing what the difference is between the two.

### [ 2.22 - Object grid Wrap ](/2022/05/20/threejs-examples-object-grid-wrap/)

I wanted to make a quick simple object grid module type project where I can create this grid of objects that are cloned from an array of source objects and an array of index values for these source objects for each tile in the grid. On top of that the objects will loop around in all directions as I move around as well.

### [ 2.23 - Object grid Wrap land ](/2022/07/25/threejs-examples-object-grid-wrap-land/)

Continuing with my object grid wrap module I made this additional example in which I am building on top of the module with additional code that sets up a grid in a way in which I have something that looks like land.

### [ 2.24 - Mutate a plane ](/2021/06/11/threejs-examples-plane-mutate/)

Here I have a quick example that I worked out where I am mutating the position attribute of a buffer geometry instance created with the plane geometry constructor. This is one of a few examples that I worked out after logging some time learning more about working with the buffer geometry class in general. There is learning how to make a custom geometry from the ground up, but there is also learning how to just adjust a few things with a built in geometry also such as the plane geometry that is a good starting point for this sort of thing.

### [ 2.25 - Position things on the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/)

This is an example where I have worked out a crude yet effective module that can be used to create a special kind of sphere wrap group. The main create method of this sphere wrap group returns a group that of course has a sphere as one of the children, however it then also has a surface group. I then have another public method of this module that will create and add a object wrap group to the surface group and then this object wrap group contains a mesh that will end up being positioned on top of the surface of the sphere.

### [ 2.26 - Scene or object3d shake example](/2021/05/06/threejs-examples-scene-shake/)

This is an example of a module that can be used to shake the whole scene that will work if I do not add the camera to the scene of course. However any object in three.js that is based off of object3d can also be used with this shake module.

### [ 2.27 - Video sequence hooks ](/2022/05/12/threejs-examples-sequence-hooks/)

When it comes to making videos I have found that I like to break down things into what I have come to call sequences.

### [ 2.28  - Mutate a sphere ](/2021/06/10/threejs-examples-sphere-mutate/)

In this example I am just working out a helper method that will just move the position of the top point of a sphere geometry. This is just an example that I worked out after writing a bunch of posts on the buffer geometry class in threejs and when I did so I learned a lot more about what the various attributes are for a geometry class in causing the position attribute. So I thought that I should work out at least on or two more examples that have to do with creat8ng a custom geometry, or just mutating the values of a geometry that is created with one of the built in geometry constructors such a s the sphere geometry constructor.

### [ 2.29 - Source layer 3d](/2022/02/11/threejs-examples-tool-source-layer-3d/) 

I wanted to make the first of what might in time be a few tools that are used to create some kind of content such as an image of some kind or so forth. The aim with this example then was to create a kind of art program where I am using threejs to create a scene with one or more dea files that I load into the scene that is drawn as a resource layer. I can then change all kids of values with these objects in the scene including the position, and orientation of the of the camera. I then have one or more additional canvas layers on top of this resource layer that I then draw on free hand, and then desired end product is some kind of 2d image based off of the state of the scene.

### [ 2.30 - Tree sphere world](/2021/05/21/threejs-examples-tree-sphere-world/)

This is an example where I am using my simple tree sphere models and just creating a whole bunch of those and placing them around the surface of a sphere. It is then just a basic example of creating a main world type model and then having a whole bunch of instances of another model be a part of this kind of model.

### [ 2.31 - Tree sphere](/2021/05/19/threejs-examples-tree-sphere/)

This is a very basic static model of a tree that is just a sphere geometry placed on the top of a box geometry that has dimensions that look like a trunk of a tree. It is then one of the most simplistic models of this kind that I have made thus far, and might prove as a good starting point when it comes to making models this way.

### [ 2.32 - Tree](/2019/07/30/threejs-examples-tree/)

This is a typical example when it comes to starting to get a list like this together. So I might as well get this one out of the way for what it is worth. Still when it comes to a simple example like this I think there is still a great deal of room for originality actually when it comes to making some kind of interesting animation with a basic tree model actually.

### [ 2.33 - Waves](/2018/11/14/threejs-examples-waves/) 

The is a basic example of some waves which strokes me as another simple example that I should start out with. In this example I played around with creating a custom geometry and used Math.cos, and Math.sin as a way to create a wave like pattern.

### [ 2.34 - Weird face one](/2022/07/08/threejs-examples-weird-face-one/) 

Updating the state of a geometries is something that can be done in a wide range of ways. There is looking into use bones as a way to do so, but then there is also just working out all kinds of various ways that have to do with updating the state of geometry using a little javaScript code. For this weird face one example I am using the lerp geometry method that I made for a previous example to lerp between to states of a geometry for a mouth of a weird looking face. On top of that I am also making use of other ways of creating a kind of animation my just moving the position of mesh objects which is what I am using with the eyes of this weird face model.

### [ 2.35 - Weird walk guy 1](/2022/04/18/threejs-examples-weird-walk-one/) 

This is another one of my example that is a kind of model that is created by just having a bunch of mesh objects grouped together. This one is just the first of what might become a few examples that are like my guy one model only the goal is to have a weird walk cycle for them. I might like to have a few more features when it comes to the over all look and function of the weird walk model here, but the main idea is to just have a weird and interesting walk cycle.

### [ 2.36 - Weird walk guy 2](/2022/04/25/threejs-examples-weird-walk-two/) 
This is a more advanced example of the first weird walk guy example, continuing to work on adding more to the example in an effort to just make a weird and interesting looping animation.

### [ 2.37 - Weird walk guy 3](/2022/05/24/threejs-examples-weird-walk-three/) 

I wanted to make yet another one of these weird walk examples to which I might make a few more of.

## Conclusion

That is it for now when it comes to threejs examples. For now I think I will like to keep this list short and if I put more time into this the focus will be to make the examples that I have together all ready a little more refined rather than making more examples.

What i really need to start thinking about is what I want to do with three.js when it comes to long terms projects if any. I am starting to get a half way decent grasp on the core basics of what to work with, but to what end? I am not thinking that I will be wanted to make games with three.js, but animations might prove to be more realistic for me, and even then very crude yet possible amusing ones.