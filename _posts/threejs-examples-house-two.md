---
title: House Model two threejs project example
date: 2023-01-27 09:44:00
tags: [three.js]
layout: post
categories: three.js
id: 1025
updated: 2023-01-27 10:56:32
version: 1.1
---

I have made a threejs example post way back in the day in which I make a simple, crude house model using only javaScript code on top of threejs itself. I do like to make thouse kinds of models as I can pack everything into a blog post, not just in terms of the javaScript code, but also the data that composes the various buffer geometry attribites as well. However when it comes to starting to work on some kind of real project with threejs, this is just not generaly how things are done for the most part. Do not get my wrong though, some times it seems like the best way to do what I want to do will involve a whole lot of javaScript code to create geometry. However some times it seems like the best way forward is to create some kind of asset in a program like blender and then export from that programe into a file format like that of the DAE file format. So in this threejs project example post, I am going to be wrtiign about a new kind of house model where I am using an extreial file as a way to have the geometry for the house model.

<!-- more -->

## This house model example and what to know first

There are a whole lot of things that I assume you know a thing or two about before hand here. I will not be getting into the very basics of threejs let alone javaScript in general here. I have all ready wrote posts on getting started with threejs that I do get around to edit every now and then, so if you are still new to this sort of thing then there are other posts on my site here that might be a better starting point. Also even if you do have a fair amount of experence wit threejs there are a lot of things I think I need to write about in this opening section to begin with anyway as this is not at all a copy and paste friendly kind of project example here.

### In this exmaple I am using the DAE loader

For this project example I am loading an extrenal DAE file as a way to pull load in buffer geometry data. What is nice about the DAE format is that it is a text format, and also I can use it to not just load in geometry but materials and textures as well. However there is a drawback and that is the fact that this DAE loader is not built into the core of the threejs librray itself. In this poject I have my dae loader helper file, but this is just a way to make use of the DAE loader which in turn is also an addtional external file that is one of the many official asset loader options to work with when it comes to addtional files to work with in the threejs Github Reposatory. So although there area lot of things that I like about DAE rather than using the built in buffer geometry loader, making use of it make the process of writing about a project like this a little more complex. However this is just often the case when it comes to start8ng to work on some kind of real project, and this is not a post that I am wriring for people that are new to threejs and client side javaScript in general.

### I do have the addtional assets up on my Github

In this project I am loading an extreial DAE file, and this DAE file along with any addtional assets in terms of textures can be found in my test threejs repo on Github. There are a few folders of interst that are relavant to this post then one of which would as always be the main for post folder for this blog post. The other location of interst is the folder where I am storing the DAE file of the house that I am using. On top of that I am also making use of a copy of my dae helper from my post on the dae loader as well. In this test threejs repo I also have copies of the official threejs files that I am using as well. Wheh it comes to getting this up and running on your end the best way to do so might be to clone down the repo and run the server, but in any case I have all the assets that I am using for this project there.





