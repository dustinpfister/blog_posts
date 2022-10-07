---
title: Computing Bounding Box for buffer geometries in threejs
date: 2022-10-07 08:30:00
tags: [three.js]
layout: post
categories: three.js
id: 1008
updated: 2022-10-07 09:05:24
version: 1.3
---

With the buffer geometry class in threejs there is a bounding box property that stores an instance of the Box3 class, and the compute bounding box method of the buffer geometry class is what can be used to create or update this instance of Box3. As the name suggests this bounding box property can be used for collision detection, but it can also be used to find out the size of a geometry which can aid in the process of positioning objects.

<!-- more -->

## Compute Bounding Box, and what to know first

This is a post on the compute bounding box method of the buffer geometry class in the javaScript library called threejs. With that said there is a lot of subjects that you should know a thing or two about before hand that I will not be getting into detail here as I have wrote those kinds of posts on [threejs](/2018/04/04/threejs-getting-started/) and [javaScript](/2018/11/27/js-geting-started/) a long time ago. However regardless of how much experience you might have at this point I will take a moment to outline a few things you might want to learn or refresh with when it comes to compute bounding box of buffer geometry.

### Buffer Geometry

There is the compute bounding box method alone of the buffer geometry class and then there is [everything else that branches off from an instance of buffer geometry](/2021/04/22/threejs-buffer-geometry/). There is a whole lot of ground to cover when it comes to this class in the library of course when it comes to creating and updating a geometry to begin with.

### The Box3 class in detail

When I call the compute bounding box method of a buffer geometry class instance [an instance of the box3 class](/2022/05/09/threejs-box3/) will be crated and assigned to the bounding box property of the geometry. I will be covering many of the features of this class in this post, but it still might be a good idea to get a better sense of how to work with this class outside of the use of the compute bounding box method of buffer geometry.

### Source is on Github

The source code examples that I am writing about here can also be [found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-compute-bounding-box)

### Version Numbers

When I first wrote this post I was using r140 of threejs.



## 1 - Basic Compute Bounding Box examples

### 1.1 - Min and Max Values

```js
```

### 1.2 - The Box3 Helper

```js
```

### 1.3 - Size and Position

```js
```


## 2 - Animation Loop Examples

### 2.1 - Size and position animation

```js
```





## Conclusion

