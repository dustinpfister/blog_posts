---
title: Threejs examples in the works
date: 2021-02-19 14:42:00
tags: [three.js]
layout: post
categories: three.js
id: 807
updated: 2021-06-12 11:30:00
version: 1.33
---

I have wrote a number of posts on [threejs](https://threejs.org/) that is the standard goto library for doing anything with 3d modeling in a client side javaScript environment for me, and many others for that matter. Many of the posts that I have wrote so far have to do with the various features of threejs, but thus far I can not say that I have made any kind of real project or example with threejs thus far.

I have wrote a few posts on some things that are a set of current standing threejs examples though, and as such I think I should have a single post in which I cover each of them a little and of course link to each post where I get into the example in greater detail. I seem to do this sort of thing with just about every collection of content that I write for a given framework such as vuejs, or a feature of client side javaScript and HTML 5 such as the canvas element. So of course it would make sense to do the same for threejs also.

There is the official set of [threejs examples](https://threejs.org/examples/) that I think people should check out first and foremost before looking at other peoples examples on random blogs such as this one. However there is always looking into yet even more examples of what can be done with threejs and as far as my site is concerned this is the current standing set of examples that I have together thus far.

<!-- more -->

## 1 - What to know before looking into these three.js examples

If you are new to three.js you might want to start off with a getting started post on three.js when it comes to learning the very basics. After that there is a whole lot more to learn about when it comes to all the various little features there are to work with when it comes to using the library.

## 2 - The lost of three.js examples so far

Here is the list of my threejs simple project examples thus far, at this time I do not have them broken down into categories but if I keep up with this it is only a matter of time until I will have to do something to that effect.

### [ 2.1 - A Backyard ](/2021/05/07/threejs-examples-backyard/)

This is an example of a backyard type scene that makes use of several modules that create groups of mesh objects.

### [ 2.2 - A Basic Framework](/2021/04/20/threejs-examples-basic-framework/)

This example aims to be the start of a basic framework that I might use on top of three.js. Every time I start a new three.js project, or even just a simple example there is a lot of code that I find myself repeating over and over again. So it would make sense to pull some of this code into a collection of reusable functions, and maybe make this collection of functions part of an over all larger project.

### [ 2.3 - A Biplane Example](/2021/02/17/threejs-examples-biplane/)

The first example on this list is an example where I am making a simple biplane model to play around with. I am not taking the time to work out a serious model rather, but just slapping a bunch of box geometries together into an instance of [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/). I am then using the [Object3d.userData](/2021/02/16/threejs-userdata/) object to append some properties to an instance of one of these biplane models. The module that is used to create one of these is also the module that I use to update one of theme also.

### [ 2.4 - A Biplane Group Example](/2021/02/18/threejs-examples-biplane-group/)

This is another example of a model but this time around I experimented with creating a model that is a model of models. This is taking the biplane model that I made and create a new model that is just working with a collection of these biplane models.

### [ 2.5 - Build a box ](/2021/05/17/threejs-examples-build-a-box/)

I wanted to make a quick simple three.js project that will helper me to just get a basic idea of how to go about building a simple box out of wood. This example features with a module that can create a collection of mesh objects out of an object that holds the dimensions of a single board of wood.

### [ 2.6 - A Basic Clock Example](/2019/12/16/threejs-examples-clock-basic/)

This is just a Basic clock example which is another kind of example that I like to make when working with a new framework like threejs or any kind of canvas framework. Clocks are nice because they are generally easy to make, but yet there is also still all kinds of room for improvement when it comes to going in a new and interesting direction with it.

### [ 2.7 - My First basic guy model](/2021/04/29/threejs-examples-guy-one/)

This is my first basic guy model that I made that is very crude, yet still seems to work okay as long as I am okay with going with a very crude basic style when it comes to animation. Some times that kind of angle will work okay actually if the over all project makes up for it. In any case this is my first attempt at this kind of model, and in time I am sure it will not be my last, but hey I have to start somewhere when it comes to this kind of thing.

### [ 2.8 - Hamster Wheel](/2021/04/19/threejs-examples-hamster-wheel/) 

This is a fun example that I made that is a human sized hamster wheel, and I placed a simple person model inside the hamster wheel. This is one that I keep coming back to now and then because I can help but feel that I am expressing something that is very reliable for many people here.

### [ 2.9 - House](/2021/04/23/threejs-examples-house/) 

This one is just a simple house model that I might use in one or more additional examples as a way to built and over all scene of some kind. This one alone can be made in all kinds of different ways, some to be used just to add an out door scene, others might be more of an actual full scale house model complete with interior. However this one aims to just be a very basic starting point for this kind of thing.

### [ 2.10 - Land Sections](/2021/02/15/threejs-examples-land-sections/) 

This is an example that I worked out that is an attempt at a 3d view for my Mr Sun game idea to which I have many prototypes for. There is also a vuejs example that I have started where I am focusing more so on what the core of the game logic should be while not putting to much into graphics. I also have a few canvas examples on Mr Sun where I have started simple 2d views for the game, and have all ready started many forks off of the general idea of the game.

If I get a solid idea for the core of what the game should be I might like to experiment with a 3d view for the game, so this example is just that.

### [ 2.11 - nested groups](/2021/05/10/threejs-examples-nested-groups/)

An example that is a collection of mesh objects in a group nested in another group.

### [ 2.12 - Mutate a plane ](/2021/06/11/threejs-examples-plane-mutate/)

Here i have a quick example that I worked out where I am mutating the position attribute of a plane geometry instance. This is one of a few examples that I worked out after logging some time learning more about working with the buffer geometry class in general. There is learning how to make a custom geometry from the ground up, but there is also learning how to just adjust a few things with a built in geometry also.

### [ 2.13 - position things on the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/)

This is an example where I have worked out a crude yet effective module that can be used to create a special kind of sphere wrap group. The main create method of this sphere wrap group returns a group that of course has a sphere as one of the children, however it then also has a surface group. I then have another public method of this module that will create and add a object wrap group to the surface group and then this object wrap group contains a mesh that will end up being positioned on top of the surface of the sphere.

### [ 2.14 - scene or object3d shake example](/2021/05/06/threejs-examples-scene-shake/)

This is an example of a module that can be used to shake the whole scene that will work if I do not add the camera to the scene of course. However any object in three.js that is based off of object3d can also be used with this shake module.

### [ 2.15  - Mutate a sphere ](/2021/06/10/threejs-examples-sphere-mutate/)

In this example I am just working out a helper method that will just move the position of the top point of a sphere geometry. This is just an example that I worked out after writing a bunch of posts on the buffer geometry class in threejs and when I did so I learned a lot more about what the various attributes are for a geometry class in causing the position attribute. So I thought that I should work out at least on or two more examples that have to do with creat8ng a custom geometry, or just mutating the values of a geometry that is created with one of the built in geometry constructors such a s the sphere geometry constructor.

### [ 2.16 - Tree](/2019/07/30/threejs-examples-tree/)

This is a typical example when it comes to starting to get a list like this together. So I might as well get this one out of the way for what it is worth. Still when it comes to a simple example like this I think there is still a great deal of room for originality actually when it comes to making some kind of interesting animation with a basic tree model actually.

### [ 2.17 - Tree sphere](/2021/05/19/threejs-examples-tree-sphere/)

This is a very basic static model of a tree that is just a sphere geometry placed on the top of a box geometry that has dimensions that look like a trunk of a tree. It is then one of the most simplistic models of this kind that I have made thus far, and might prove as a good starting point when it comes to making models this way.

### [ 2.18 - Tree sphere world](/2021/05/21/threejs-examples-tree-sphere-world/)

This is an example where I am using my simple tree sphere models and just creating a whole bunch of those and placing them around the surface of a sphere. It is then just a basic example of creating a main world type model and then having a whole bunch of instances of another model be a part of this kind of model.

### [ 2.19 - Waves](/2018/11/14/threejs-examples-waves/) 

The is a basic example of some waves which strokes me as another simple example that I should start out with. In this example I played around with creating a custom geometry and used Math.cos, and Math.sin as a way to create a wave like pattern.

## 3 - Conclusion

That is it for now when it comes to threejs examples. For now I think I will like to keep this list short and if I put more time into this the focus will be to make the examples that I have together all ready a little more refined rather than making more examples.

What i really need to start thinking about is what I want to do with three.js when it comes to long terms projects if any. I am starting to get a half way decent grasp on the core basics of what to work with, but to what end? I am not thinking that I will be wanted to make games with three.js, but animations might prove to be more realistic for me, and even then very crude yet possible amusing ones.