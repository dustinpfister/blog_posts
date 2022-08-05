---
title: Camera Kit module threejs example
date: 2022-08-05 08:32:00
tags: [three.js]
layout: post
categories: three.js
id: 999
updated: 2022-08-05 09:08:00
version: 1.1
---

This week I started a new [threejs project example](/2021/02/19/threejs-examples/) that I am calling camera kit, that aims to be my module for parking all kinds of methods that has to do with updaing the position and target location of a [camera such as a persepective](/2018/04/07/threejs-camera-perspective/) camera. The idea for this project came to me when woking on [last weeks threejs example which was my aplerp module]() which is a project that has to do with cretaing values to use for the alpha argument of the [lerp method of the vector3 class](/2022/05/17/threejs-vector3-lerp/). The aplerp module has to do with moving a point in space from one point to another in a way that is not so linear, that is not a fixed delta for each frame when upading a vector. So for this project I will be building on top of the aplerp module to create another module that is centered around tasks that have to do with updating a camera.


<!-- more -->

## The camera kit threejs exmaple and what to be aware of

The camera kit module builds on top of addtional projects that I have made along with threejs and many core and client side javaScript featrues. Simply put this is not a post intedned for devlopers that are new to javaScript in general, the threejs library and some of my older projects that I am also making use of here to create an over all final result in terms of a video project. However I do still always take a moment to write a thing or two about what you might want to read up more on before contint to read the rest of this content.

### The aplerp mnodule threejs example

Last week I wrote a post on the aplerp module. As of this writing I am using r0 of the module for some of the methods in this camera kit module, and will likley use it in a number of other future methods in any future revisions of this module. This camera kit project might very well get a few revisions as it strikes me as the kind of project that desives at least a few more revisions and also that I will likley be using it in many if not all future video porjects. However in any case I will not be getting into the state of the source code of the aplerp module here, if you want to read up more on that project [check out the post on aplerp](/2022/07/29/threejs-examples-aplerp/) and also made a [video that make used of r0 of that module](https://www.youtube.com/watch?v=p9KOw_y_1DA).

### Read up more on the perspective camera, the base camera class, and object3D

If you are still somewhat new to threejs you might want to read up more on the perspective camera, the base camera class, and the object3d class. The perspective camera in threejs is the camera option that renders a scene object in such a way that replacres the way that the human eye sees, thus it is often the typical camera that I use for most projects. However there are a number of other options when it comes to camera so it also makes sesne to know what there is to work with when it comes to features shared accross all cameras in the base camera class. Speaking of the base camera class there is also checking out the object3d class that is not only a base class of the camera class but many other objects such as mesh objects, groups, and whole scene objects actually. Even if you are not new to threejs you might still want to read up more on these now and then, as I find myself still doing so even though I have a lot of experence working with threejs, there is a lot to take in with this one after all.



