---
title: Animation Loop Framework threejs project example
date: 2022-09-30 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 1007
updated: 2022-09-30 13:01:27
version: 1.1
---

The subject of creating an animaiton loop is somehting that will come up a lot, not just with threejs alone, but indeed with client side javaScript in general. When it comes to client side javaScript alone there are methods like that of setTimeout, as well as request animation frame. There are also a number of addtional features that are realted to this sort of thing in client side javaScript, but also in the threejs librray such as the [THREE.Clock class](https://threejs.org/docs/#api/en/core/Clock), and thus also [ performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now), and Date.now that the class works on top of. However in todays post I am going to be writing a thing or two about a new javaScript module project that is a kind of framework that builds on top of the core idea of an animation loop.

This is then yet another [threejs example project](/2021/02/19/threejs-examples/) to add on top of the many others that I may continue to work on a bit more off and on in the future. I have a genreal idea of what I would like this project to be in terms of the core set of ideas. That is to have the ushual code that I keep copying and pasing from one project to the next, abstracted away into a module, or framework kind of from which I would say is the case here with this project. That is that with this module I call a main create method and pass an object that contains a method that can be called to set up the scene, camera, and so forth, and then another that will update things over time.

<!-- more -->

## The animation loop framework and what to know first

This is a post on a threejs animtion framework that can be used to create litte animation projects in a page. 

### There is a lot to take in when it comes to animation loops, I would not stop with this post for sure

There is more than one way to skin a cat as the expression goes, in the context of this post there is more than one way to make an animation loop. For this example I am just using the [requestAnimationFrame method](/2018/03/13/js-request-animation-frame/) to call a loop function recursivly, or at least that is what I was using in r0 of this threejs example. when it comes to future revisions I might revisit what it is that I am doing to create this main loop and maybe chnage a few things around. Anyway this request animation frame method is my default go to method for this sort of thing and I am sure that I am not alone with that. On the open interett there may be a lot of devopers that say that you should only use that and nothing else ever, but I am not sure if I would automaticly assume that. 

In some cases I might want to make use of [setTimeout actually](/2018/12/06/js-settimeout/), the main reason why is that there might be some sitatuions in which I would want to have two loops. One loop for updating a model which would be poweared by settimeout, and another loop for updating a view which would use request animation frame or simular altertaive. This will be espeshaly true if I get into using web workers as a way to push some heavry listing type tasks to a sepearte event loop, as I am limited to useing methods like setTimeout in that kind of envioement.

### Just keep what is most inporant it sight with this

It can get a little overwhelimng wheit omes to really looking into how to do an animion loop. However I think one of the most important things to keep in mind is that many visiters to a web site might only have so much in terms of system resources to work with. Also there might be a lot going on in a page that is all running in the main event loop of the page as well. So right off the bat I will want to build in a user interface that allows visiters to press a stop button that will stop the animaiton loop compleatly. 

Right away my stop button feature seems to work great as when I press the stop button I notuice my systems CPU use drop way down to more or less zero. In future revisions I might add addtional features that will allow for uses to adjust the frame rate for updating, and movement, or work out a way to adjust that automatuicly, but for now at a minimum that is working great right off the bat with r0 of the framework.



