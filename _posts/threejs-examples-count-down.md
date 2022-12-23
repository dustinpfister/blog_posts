---
title: A Timer video javaScript module threejs example
date: 2022-12-22 11:00:00
tags: [three.js]
layout: post
categories: three.js
id: 1019
updated: 2022-12-23 11:41:25
version: 1.1
---

This threejs project examples post is on a javaScript file that I am using to help me with the process of making what I would call a count down, or timer video. This is just simply a kind of video where there is a count down that starts from when the video starts from a given start time such as 30 seconds, and then counts down to 0. When 0 is reached the video is over, or there is a little additional time that is an alarm sound or something to that effect.

When it comes to making videos for these blog posts using threejs as well as some of my own additional software, I am always thinking about what it is that I should do different with them. For now as of this writing the existing state of affairs is to just continue with simple demo videos that just showcase what the JavaScript code for a given post on threejs will do. Once again I think that this will be the case here, but maybe with only just one video. I can use the countdown module to create one of my usual 30 second demo videos that has been the pattern thus far, however I can also use it to make videos that are any given time length long. So this will then be a great tool for my other collection of video content thus far which is just a general experimental collection of content.

<!-- more -->

## 1 - The first version of count-down.js \( r0 \) and demos

The very first version of this count down module all ready has a number of public methods. There is the create method that when called will create and return a main group object. This main group object will contain a number of children each of which is another group that is for a given digit. Each digit group object will then also contain ten mesh objects one for each number that is used in a base 10 counting system. Setting the current time is then a matter of looping over each child of each digit group setting the viable object3d property of each mesh to false by default and then true if the current mesh object is the number for the current digit.

There is the idea of making the kind of system where I just simply create a single mesh object for each digit, and maybe that is something that I will get to in future revisions when and if I even make it to that bridge to begin with. It may prove to be a better all around solution, but it also presents a number of problems that can be fixed by way this alternative nested group like system. One of the major concerns that comes to mind has to do with updating the geometry for the mesh objects, I would need to keep things consistent in terms of the number of points used in each geometry for each number. Maybe that is not such a bad thing and maybe it is something that I should be doing anyway when it comes to making my DAE files for this project. However getting into this can of worms is something that I would like to not get into at this point. This is the first version after all so for now I would like to have something that just works okay to create the final product, which in this case is a collection of frames for a video.

```js
```

### 1.1 - Using canvas elements to create textures

This will be the first demo of the count-down.js file in which I am using a custom set of source objects that I create in the demo file. I do have the default objects of course, but I am sure that in any given project I am not going to be using those. The source objects for this demo are then just a bunch of mesh objects that use the THREE.BoxGeometry class for the Geometry of each object. However I will be making use of my canvas.js file from my canvas textures module in order to create the textures that I will use for each mesh object of each number.

```js
```

### 1.2 - Using the DAE load method

```js
```

### 1.3 - Using the DAE load method, and canvas to add texture

```js
```

### 1.4 - Using the DAE load method with more than one file, and with DAE file textures

```js
```

## Conclusion

