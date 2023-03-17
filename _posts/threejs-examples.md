---
title: 53 threejs project example ideas from basic to not so basic
date: 2021-02-19 14:42:00
tags: [three.js]
layout: post
categories: three.js
id: 807
updated: 2023-03-17 08:52:30
version: 1.114
---

I have wrote a number of posts on [threejs](https://threejs.org/) that is the standard library for doing anything with 3d modeling in a client side javaScript environment it would seem. [Many of the posts that I have wrote so far](/categories/three-js/) have to do with the various features of threejs itself, but thus far I can not say that I have made any kind of real project with threejs. That is until I started a collection of posts that have to do with making some kind of real application rather than just demos of various features of threejs. So this post is a kind of index of all of these kinds of posts thus far that I intend to expand on, and come back to edit often.

There is the official set of [threejs examples](https://threejs.org/examples/) that I think people should check out first and foremost before looking at other peoples examples on random blogs such as this one. The examples there are not just application examples also mind you, as there are a great deal of official modules for doing all kinds of things that are not baked into the core of the library itself. However often I might find myself wanting to do something to which there is not an official example of, which it turn would lead me to various posts on stack overflow, and the occasional blog post such that is a collection of threejs project example ideas. This is then my take on that kind of post so lets get to the examples I have thus far.

<!-- more -->

## 1 - What to know before looking into these three.js examples

If you are new to three.js you might want to start off with a [getting started post on three.js](/2018/04/04/threejs-getting-started/) when it comes to learning the very basics. After that there is a whole lot more to learn about when it comes to all the various little features there are to work with when it comes to using the core of the library. However it is only a matter of time until a developer gets to the point where there is only so much remaining to learn, and things start to change over to applying what a developer has learned rather than continuing to learn new things. 

In any case I assume that you are this kind of developer with threejs, where you know a fair amount when it comes to the library itself as well as client side [javaScript in general](/2018/11/27/js-getting-started/). You now want to take a look at what other developers are making when it comes to threejs projects in terms of modules, frameworks, and full applications built on top of at least threejs if not more.

## 2 - The list of three.js examples so far

Here is the list of my threejs project examples thus far, at this time I do not have them broken down into categories but if I keep up with this it is only a matter of time until I will have to do something to that effect. Until I get around to that I will still have the lest in this alphabetic kind of long list format. 

### [ 2.1 - Animation loop framework ](/2022/09/30/threejs-examples-animation-loop-module/)

This is a framework in which I am taking one of my typical copy and paste animation loop templates that I have been using in a not of examples in my various posts, and abstract it away into a framework. I then added a whole bunch of other features around it of course where the focus is to make something that will work well for creating frame by frame, as well as random style animations. 

### [ 2.2 - Advanced lerping module  ](/2022/07/29/threejs-examples-aplerp/)

The lerp method of the vector3 class is a nice way to make a basic transition between two points of interest. However after that there is looking into how to go about doing something like that but in very different ways such as a movement that starts out slow, then moves faster, and then slows down again. With that said this example is a kind of advanced lerp module where there are a number of built in get alpha methods, and I also write new get aloha methods that I may or may not built into future revisions of th module.

### [ 2.3 - Audio Sample Deltas for music visualization  ](/2022/11/11/threejs-examples-audio-sample-alphas/)

The goal with this module was to have a way to load HTML files that contain audio sample data for a track of audio for a video. It will then parse this ray data into more workable arrays that contain values between 0 and one and thus can be used as alpha values for nay and all methods that call for such a value. So in other words this is a kind of music visualization module of sorts.

### [ 2.4 - A Backyard ](/2021/05/07/threejs-examples-backyard/)

This is an example of a backyard type scene that makes use of several modules that create groups of mesh objects. This includes my first guy model that is just a bunch of mesh objects grouped together, with the use of canvas textures as a way to draw a face on one of the sides of a box geometry that acts as a head.

### [ 2.5 - A Basic Framework](/2021/04/20/threejs-examples-basic-framework/)

This example aims to be the start of a basic framework that I might use on top of threejs for certain projects. Every time I start a new threejs project, even just a simple example of a threejs feature, there is a lot of code that I find myself repeating over and over again. For the most part this is the scene object, camera, and renderer. However there is also making a static scene, or an update loop so often I repeat code over and over from one project to the next to set up some kind of main app loop function also. So it would make sense to pull some of this code into a collection of reusable framework that I can use from one project to the next to quickly set up the basic core of any given demo, and then go from there.

### [ 2.6 - A Biplane Group Example](/2021/02/18/threejs-examples-biplane-group/)

This is another example of a model but this time around I experimented with creating a model that is a model of models. This is taking the biplane model that I made and create a new model that is just working with a collection of these biplane models.

<iframe class="youtube_video" src="https://www.youtube.com/embed/Mq37hBHx-Qc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### [ 2.7 - A Biplane Example](/2021/02/17/threejs-examples-biplane/)

The first example on this list is an example where I am making a simple biplane model to play around with. I am not taking the time to work out a serious model rather, but just slapping a bunch of box geometries together into an instance of [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/). I am then using the [Object3d.userData](/2021/02/16/threejs-userdata/) object to append some properties to an instance of one of these biplane models. The module that is used to create one of these is also the module that I use to update one of theme also.

### [ 2.8 - breath module](/2023/03/03/threejs-examples-breath-module/)

A Controlled Breathing Exercises module.

### [ 2.9 - Build a box ](/2021/05/17/threejs-examples-build-a-box/)

I wanted to make a quick simple three.js project that will helper me to just get a basic idea of how to go about building a simple box out of wood. This example features with a module that can create a collection of mesh objects out of an object that holds the dimensions of a single board of wood.

### [ 2.10 - Camera Kit ](/2022/08/05/threejs-examples-camera-kit/)

This is a project that has to do with updating the values of a camera over time. However at the time of this writing it would seem that for the most part I made this project in such a way that I am just working out ways to move a camera around in world space. Sense I first made this project I now have a number of other examples here that I have made that work well not just for the same of moving cameras around but very much objects in general actually.

Sooner or later I might get around to adding more features that have to do with updating values of a camera that are not just object3d based values, but rather values that have to do more with a camera object alone.

### [ 2.11 - camera planes ](/2023/03/10/threejs-examples-camera-planes/)

This is a another camera centered project that time involving creating not just a camera, but a group in which a camera is a child of the group. I then also have one or more mesh objects with plane geometry that I position in front of the camera. When it comes to changing what the camera is looking at I move the group, and not the camera.

### [ 2.12 - A Basic Clock Example](/2019/12/16/threejs-examples-clock-basic/)

This is just a Basic Clock example that I started a long time ago, and have not revised much sense then. Clock Projects are nice because they are generally easy to make, but yet there is also still all kinds of room for improvement when it comes to going in a new and interesting directions with this sort of thing. When it comes to this one I did not do much of anything all that fancy, just a crude basic starting point is what I hand in mind.

I can not say that I have much interest in revising this project as of this writing at least. There might come a time though that I will want or need to clean up the code here though.

### [ 2.13 - A count-down.js file for timer video projects ](/2022/12/23/threejs-examples-count-down/)

I wanted to make a basic tool for creating one or more timer videos. A timer video is a kind of video in which a count down starts with the start of a video from a given number, down to zero. When zero is reached that will be either the end of the video, or a little additional content that is an alarm of some kind. This javaScript module helps me with the process of quickly creating and updating a nested collection of objects that are created from source objects that are use to display a current time string or count value. This count value can be a number of seconds from a given start point down to zero, however I am also using it for other tasks such as having a frame counter in a scene for example.

### [ 2.14 - Create Path tool](/2022/10/28/threejs-examples-create-path-tool/)

This is a quick 3d path creation tool example that I started and might work on a little more if it does prove to be one of my regular tools that I use every day. Even if that is not the case it is still a tool that I made thinking that I will be suing it to create data that I will then use when making use of my sequence hooks module which is very much a project that I use just about every day when making my video projects.

### [ 2.15 - Cube Stack Example](/2022/04/29/threejs-examples-cube-stack/)

I while back I made a cool little example for my blog post on the orthographic camera, for this example I took that source code and added a lot more to it. The added features mainly have to do with adding additional effects that have to do with how to go about updating the stacks of cubes on top of each other. This might prove to be an example that I might reuse a little now and then from one project to another in order to just have something interesting to look at when making a demo for some other threejs feature.

### [ 2.16 - Cube Stack Grid Example](/2022/05/02/threejs-examples-cube-stack-grid/)

I wanted to continue with my cube stack module and make an example that is a grid where each tile in the grid is an instance of my cube stack module. I had a lot of fun making this one and the end result looks kind of cool. However I can not say that this is the kind of examples that i will be putting a great deal more time into any time soon. I starred another project that is like this one, but it is more in tune with having a grid of objects in general which is something that will be taking priority over this for sure.

### [ 2.17 - Curves Module ](/2022/11/18/threejs-examples-curves-module/)

If you have not yet looked into the THREE.Curve base class as well as the various additional classes built on top of that base class it would be a good idea to look into it sooner rather than later. Curves are great when it comes to really getting into how to go about figuring out truly professional object movement over time as it allows for me to quickly create a path in 3d space and then get a Vector3 object at any point along that path. I can then copy that Vector object to say the position property of any object3d based objects such as a mesh, group, or camera. There are a lot of other great uses for curves beyond just that though such as using them to compute smooth alpha values such as that of what is returned by methods such as MathUtils.smoothstep, and it also goes without saying the curves can prove to be a useful tool for writing custom geometry constrictor functions.

This is then a threejs project example that is my current set of tools to help me with the process of creating and working with curves, as well as all kinds of closely related tasks revolving around curves.

### [ 2.18 - A DAE file tools module ](/2021/06/25/threejs-examples-dae-tools/)

This is a project that I started that is a module that serves as a basic set of tools for loading, and processing a collection of [DAE files](/2021/04/30/threejs-dae-collada-loader/). The [DAE or Collada file format](https://en.wikipedia.org/wiki/COLLADA) is a standard for interchange of data for interactive 3D applications including threejs when adding the DAE file loader as an additional script beyond just the core threejs library alone. The DAE format is a good choice because it is a text file format in the form of XML data, so it is very web friendly, and also easy to debug and fix as the data can be opened up and edited in a plane old text editor if need be.

This project is just a collection of tools that I have started when working on top of threejs, and the DAE file loader where I park any methods that I might want to add for this sort of thing.

### [ 2.19 - DAE TOOLS and a Sphere with inverted normals ](/2022/05/31/threejs-examples-dae-tools-sphere-normals-invert/)

In this example I wanted to work out an alternative to that of using a cube texture for the sake of having a background in a scene. For this example I made a sphere with flipped normal values and a custom texture in blender. I am then using my DAE tools module, along with the DAE file loader, as a way to import this into a project. 

There may be easier ways to go about doing this sort of thing by just writing a little javaScript code to invert the normal attribute of a sphere created with the THREE.SphereGeometry constructor function though.

### [ 2.20 - My First basic guy model](/2021/04/29/threejs-examples-guy-one/)

This is my first basic guy model that I made that is very crude, yet still seems to work okay as long as I am okay with going with a very crude basic style when it comes to animation. Some times that kind of angle will work okay actually if the over all project makes up for it. In any case this is my first attempt at this kind of model, and in time I am sure it will not be my last, but hey I have to start somewhere when it comes to this kind of thing.

<iframe class="youtube_video" src="https://www.youtube.com/embed/u5tRAChrMfM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### [ 2.21 - Hamster Wheel](/2021/04/19/threejs-examples-hamster-wheel/) 

This is a fun example that I made that is a human sized hamster wheel, and I placed a simple person model inside the hamster wheel. This is one that I keep coming back to now and then because I can help but feel that I am expressing something that is very reliable for many people here.

<iframe class="youtube_video" src="https://www.youtube.com/embed/evvbFFwIEXw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### [ 2.22 - House](/2021/04/23/threejs-examples-house/) 

This one is just a simple house model that I might use in one or more additional examples as a way to built and over all scene of some kind. This one alone can be made in all kinds of different ways, some to be used just to add an out door scene, others might be more of an actual full scale house model complete with interior. However this one aims to just be a very basic starting point for this kind of thing.

### [ 2.23 - House Two ](/2023/01/27/threejs-examples-house-two/) 

I looks like my first house example is getting a little traction in a relative sense at least. Anyway I did update the source code for the first house example above to address a few major problems with it. However it is still a model example that involves making a house by way of using the built in geometry constructors and also making a custom geometry for some of the parts of the house. With this threejs project example I am creating the geometry that I want in blender and then juts loading a DAE file export from the blender project. This is just the way that I think this sort of thing needs to be done when it comes to making a house model. For sure it is what I would want to do when it comes to making the kind of project that is an actual model of a house that one could build. However even when it comes to just making some kind of asset where it is just the outside shell that matters this is still just a good way to go about making assets.


### [ 2.24 - Land Sections](/2021/02/15/threejs-examples-land-sections/) 

This is an example that I worked out that is an attempt at a 3d view for my Mr Sun game idea to which I have many prototypes for. There is also a vuejs example that I have started where I am focusing more so on what the core of the game logic should be while not putting to much into graphics. I also have a few canvas examples on Mr Sun where I have started simple 2d views for the game, and have all ready started many forks off of the general idea of the game.

If I get a solid idea for the core of what the game should be I might like to experiment with a 3d view for the game, so this example is just that.

### [ 2.25 - Lerp attributes of buffer geometries](/2022/07/01/threejs-examples-lerp-geo/) 

This is a project centered around the idea of lerping the points of a position attribute, and now attributes in general of one buffer geometry to another one. When doing so it is generally a good idea to make sure that the count of points in each geometry is the same. However it is not just the count of points that is of concern, but also the order in which they are that is also of importance as well. Also I have found that it is a good idea to do this with non indexed geometry or at least be aware that the index attributes can case problems with thus sort of thing.

I have made a few projects actually that are this kind of deal in one form or another. Maybe my best example of this would be my many object tweening example where the aim is to do what I am doing with this project, but with many sets of geometries at the same time. However as of R1 of this example, I can also use this as a way to lerp between many sets of geometry each of which can be consider a single state.

### [ 2.26 - Lines Group Module ](/2022/06/10/threejs-examples-lines-deterministic/) 

A more generic kind of line group module compared to another similar examples where the goal was to just create a group of lines that form a sphere only. Here in this example I am still creating a collection of lines that from a sphere, but by way of optional additional code rather than code that is built into the module itself.

### [ 2.27 - Lines Sphere Circles](/2022/06/03/threejs-examples-lines-sphere-circles/) 

I wanted a module that will return a group where each child is an instance of a three line. Also on top of that each line is one of many circles that compose a sphere like shape over all. I can then work out a number of ways to create animations from there with additional code that plays around with this. This was just an exploration of a general idea that I would now do differently though as I have other examples here that have to do with this kind of thing in a more general way, as well as doing so with curves and so forth.

### [ 2.28 - Vector3 apply Euler and lookAt](/2022/05/06/threejs-examples-lookat-with-apply-euler/) 

This is an example that shows something that might prove to be a problem when using the look at method of the object3d class. It is not that the look at method is broken, it is just that it works a certain way that is fine in most cases, but not in others. For the most part the look at method is a magic wand kind of method where I just call it off of an object, pass numbers or a Vector3 object that is a point in space that I want the object to face, and that is all. However some times a custom solution for setting the rotation of an object is needed when dealing with something that is say an object that represents a plane that is going to do things like loops and rolls.

### [ 2.29 - Many Object Tweening](/2022/08/26/threejs-examples-many-object-tweening/)

A javaScript module that works with several other assets to have a way to tween between many different objects at the same time. When I first started this project this is mainly just the position attribute of the buffer geometry objects of mesh objects, but the general idea that I had in mind was objects in general actually. Anyway this is kind of a cool project so far as I can create a number of mesh objects with differing states and create a new geometry that is a kind of mean between all the points of them by giving the objects and alpha values for each of them as well.

<iframe class="youtube_video" src="https://www.youtube.com/embed/xfzR932YClU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### [ 2.30 - Menus with threejs](/2021/12/03/threejs-examples-menus/)

If you have not looked into working with the ray caster class yet you might want to do so at some point. A Raycaster is object will be a very useful tool if yo want to make some kind of user interface using threejs and you need to have a way to allow for the user to click a mesh object. This is then a project in which I am starting to work out some kind of standard system for quickly creating a user interface with threejs and a little additional javaScript code. However at the time of this writing this project still requires a fair amount of work. The basic crude idea is working okay for me sure, but I would not say this is an example of my best foot forward here.

### [ 2.31 - Nested groups](/2021/05/10/threejs-examples-nested-groups/)

An example that is a collection of mesh objects in a group nested in another group that I made just for the hell of it mostly. However I did not make this just for the intrinsic value of doing so, there are a few things that I need to be aware of when it comes to nesting objects within objects mainly when it comes to things like the position attribute and the use of the look at method in the object3d class. In other words there is local position and world space positions and knowing what the difference is between the two.

### [ 2.32 - Object grid Wrap ](/2022/05/20/threejs-examples-object-grid-wrap/)

I wanted to make a quick simple object grid module type project where I can create this grid of objects that are cloned from an array of source objects and an array of index values for these source objects for each tile in the grid. On top of that the objects will loop around in all directions as I move around as well.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/JqVIlrvMwHs
" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### [ 2.33 - Object grid Wrap land ](/2022/07/15/threejs-examples-object-grid-wrap-land/)

Continuing with my object grid wrap module I made this additional example in which I am building on top of the module with additional code that sets up a grid in a way in which I have something that looks like land. The object grid wrap module is another threejs example here that I made where I create a collection of source objects, and then have a grid of objects that is created by cloning these source objects in a tile by tile basic in an over all 2d grid.

### [ 2.34 - Mutate a plane ](/2021/06/11/threejs-examples-plane-mutate/)

Here I have a quick example that I worked out where I am mutating the position attribute of a buffer geometry instance created with the plane geometry constructor. This is one of a few examples that I worked out after logging some time learning more about working with the buffer geometry class in general. There is learning how to make a custom geometry from the ground up, but there is also learning how to just adjust a few things with a built in geometry also such as the plane geometry that is a good starting point for this sort of thing.

### [ 2.35 - Position things on the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/)

The first version of this example worked by way of a main create method that returns a group that of course has a sphere as one of the children, however it then also has a surface group. I then have another public method of this module that will create and add a object wrap group to the surface group and then this object wrap group contains a mesh that will end up being positioned on top of the surface of the sphere.

Sense then I have made a number of revisions of this example that make use of other ways to set an object to a position along the surface of a sphere. In one revisions I added methods that make use of vector3 class methods, and in the latest revision I am now making use of raycaster.

### [ 2.36 - Scene or object3d shake example](/2021/05/06/threejs-examples-scene-shake/)

The Scene object is also based on the Object3d class just like that of mesh objects, groups, and cameras. So just like any other object3d based object it was a position property that stores an instance of Vector3, and a rotation property that stores and instance of the Euler class. In other words, simply put, a whole scene object can be moved and rotated just like any other. This project is then a module where I explore this a little by making a kind of screen shake module that will move the whole scene object around in world space.

The main difference between many other objects is that typically a scene object does not have any parent object. So when it is positioned and rotated it is done so in relation to what is often referred to as world space. One thing that I want to do then is to make sure that I do not add the camera to the scene as this will result in the camera being relative to the scene object rather than world space and I will not have a shake effect. There are ways of addressing that though by making use of things like the get world position method of the object3d class.

### [ 2.37 - Video sequence hooks ](/2022/05/12/threejs-examples-sequence-hooks/)

When it comes to making videos I have found that I like to break down things into what I have come to call sequences. That is that I create an object where there is an array of objects as one of the properties of the main object. And each sequence objects will have an update function, or for frame function if you prefer that will fire for a certain number of frames. This is a tool that I use just about everyday all most when working on my video projects. I have made a few revisions of it then, and will likely make at least one or two more as time goes by if I keep working on videos.

### [ 2.38  - Mutate a sphere ](/2021/06/10/threejs-examples-sphere-mutate/)

In this example I am just working out a helper method that will just move the position of the top point of a sphere geometry. This is just an example that I worked out after writing a bunch of posts on the buffer geometry class in threejs and when I did so I learned a lot more about what the various attributes are for a geometry class in causing the position attribute. So I thought that I should work out at least on or two more examples that have to do with creat8ng a custom geometry, or just mutating the values of a geometry that is created with one of the built in geometry constructors such a s the sphere geometry constructor.

### [ 2.39  - SVG Object Movement Module ](/2022/09/23/threejs-examples-svg-movement/)

I would like to work out a system that will work well for updating the position and rotation of objects over time by defining a path in 3d space. There are a number of options for doing this sort of thing such as using the Curve class, but for this example I am looking into using SVG to do this. Yes that is SVG as in Scalable Vector Graphics which is a way to go about creating 2d graphics by way of 2d vectors. The basic idea then is to have 2 2d paths once of which is used to set x and z, and the other to just set y. 

### [ 2.40 - SVG Tools ](/2023/03/17/threejs-examples-svg-tools)

A standard kit of tools that will come into play when working with SVG files in general.

### [ 2.41 - Text Plane module](/2022/10/14/threejs-examples-text-plane)

When I make my videos I have a text cube module that I made as part of my collection of source code files that I use with my electionjs application that I use to make videos. Anyway to get to the point here I am not happy with my text cube module so I would like to make a new alternative to that module that is not a text cube, but rather just simply a mesh that uses the plane geometry.

One major improvement that I made with this text plane module is that I can scroll and wrap text, and doing so seems to work fairly well. I am making use of canvas elements as a way to create, and update the state of the texture that I use to display text, so this is a good example of that kind of subject as well.

### [ 2.42 - Source layer 3d](/2022/02/11/threejs-examples-tool-source-layer-3d/) 

I wanted to make the first of what might in time be a few tools that are used to create some kind of content such as an image of some kind or so forth. The aim with this example then was to create a kind of art program where I am using threejs to create a scene with one or more dea files that I load into the scene that is drawn as a resource layer. I can then change all kids of values with these objects in the scene including the position, and orientation of the of the camera. I then have one or more additional canvas layers on top of this resource layer that I then draw on free hand, and then desired end product is some kind of 2d image based off of the state of the scene.

### [ 2.43 - Train Tracks](/2023/02/17/threejs-examples-tracks/) 

I would like to work out a system where I create a train track by cretaing a collection of source objects that can then be cloned, and then adjusted on a section by section type basis to create the over all track. This is then what I have togetaher thus far when it comes to making this kind of system.

### [ 2.44 - Tree](/2019/07/30/threejs-examples-tree/)

This is a typical example when it comes to starting to get a list like this together. So I might as well get this one out of the way for what it is worth. Still when it comes to a simple example like this I think there is still a great deal of room for originality actually when it comes to making some kind of interesting animation with a basic tree model actually.

### [ 2.45 - Tree sphere](/2021/05/19/threejs-examples-tree-sphere/)

This is a very basic static model of a tree that is just a sphere geometry placed on the top of a box geometry that has dimensions that look like a trunk of a tree. It is then one of the most simplistic models of this kind that I have made thus far, and might prove as a good starting point when it comes to making models this way.

### [ 2.46 - Tree sphere world](/2021/05/21/threejs-examples-tree-sphere-world/)

This is an example where I am using my simple tree sphere models and just creating a whole bunch of those and placing them around the surface of a sphere. It is then just a basic example of creating a main world type model and then having a whole bunch of instances of another model be a part of this kind of model.

### [ 2.47 - uv map cube module using canvas to update ](/2022/11/04/threejs-examples-uvmap-cube-canvas-update/) 

This is a module in which I set the uv attribute of a box geometry the way that I want it to be just once, and then from there I use a canvas element for the texture and then update that they way that I want it to be from there on out. There is also the idea of having just once common texture and then updating the uv attributes of cubes as well that I might get to in future revisions of this module or maybe other related projects. In any case this is a good starting point for this sort of thing and many of the internal helper functions of the module might prove to be useful when making some other kind of project that is like this.

### [ 2.48 - Waves](/2018/11/14/threejs-examples-waves/) 

The is a basic example of some waves in the form of just a simple sin wave. The first revision of this module involve just creating a custom buffer geometry that has a position attribute only. This kind of geometry will work okay when using the THREE.Points, or THREE.Lines class to display the state of the geometry. However I have also made a more recent revision of this module that will now also work well with the THREE.Mesh class as well.

As of R1+ of this project this is now starting to look like an okay example of how to go about creating, and updating a custom geometry. There is code that created and or updates the position attribute as well as an index for the position attribute. There is now also a normal and UV attribute as well that allows for it to work with mesh objects okay.


### [ 2.49 - Weird face one](/2022/07/08/threejs-examples-weird-face-one/) 

Updating the state of a geometries is something that can be done in a wide range of ways. There is looking into the use of bones as a way to do so, and there are also morph attributes as well that I think is one of the best ways to get started with this sort of thing thus far. However this is an older threejs project example in which I knew enough about threejs as to how to update geometry with a little custom javaScript code but have not yet got around to learning a thing or two about morph attributes. 

For this weird face one example I am using the lerp geometry method that I made for a previous example to lerp between to states of a geometry for a mouth of a weird looking face. On top of that I am also making use of other ways of creating a kind of animation my just moving the position of mesh objects which is what I am using with the eyes of this weird face model. So then this is one of my many hybrid modules that I have made that is a kind of stepping stone between a kind of informal model and a more processional kind of model that is made in a  program like blender and then imported into threejs.

<iframe class="youtube_video" src="https://www.youtube.com/embed/AzuB6ExUE64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### [ 2.50 - Weird walk guy 1](/2022/04/18/threejs-examples-weird-walk-one/) 

This is another one of my example that is a kind of model that is created by just having a bunch of mesh objects grouped together. This one is just the first of what might become a few examples that are like my guy one model only the goal is to have a weird walk cycle for them. I might like to have a few more features when it comes to the over all look and function of the weird walk model here, but the main idea is to just have a weird and interesting walk cycle.

### [ 2.51 - Weird walk guy 2](/2022/04/25/threejs-examples-weird-walk-two/) 

This is a more advanced example of the first weird walk guy example, continuing to work on adding more to the example in an effort to just make a weird and interesting looping animation. The only major different with this one is that I made the legs work in a very different kind of way. The legs are not just box geometry that scales up and down, but a collection of two box geometry mesh objects that form a leg.

### [ 2.52 - Weird walk guy 3](/2022/05/24/threejs-examples-weird-walk-three/) 

I wanted to make yet another one of these weird walk examples this time though I made a whole new system from the ground up rather than just counting with the same core idea and making just small changes. This time the weird walk cycle involves a creature that has a whole bunch of legs arranged in a circle, and this circle rotates around.

### [ 2.53 - Wrap values module](/2022/09/09/threejs-examples-wrap-module/)

There are a lot of methods that have to do with clamping values to a set of bounds, but I am not seeing that many that have to do with wrapping values to bounds. In other words when a value reaches a limit there are a lot of choices to make that value just stop and not go beyond the set limit. However there is a lack of methods that helper with the process of having a value wrap back around to the opposite side of a box or sphere like area. So then I made this threejs wrap module that contains a number of methods that can be used to help with the process of wrapping rather than clamping values like numbers, as well as threejs class stuff like Vector, and Euler class instances.

## Conclusion

That is it for now when it comes to threejs examples. For now I think I will like to keep this list short and if I put more time into this the focus will be to make the examples that I have together all ready a little more refined rather than making more examples.
What I really need to start thinking about is what I want to do with three.js when it comes to long terms projects if any. I am starting to get a half way decent grasp on the core basics of what to work with, but to what end? I am not thinking that I will be wanted to make games with three.js, but animations might prove to be more realistic for me, and even then very crude yet possible amusing ones.

