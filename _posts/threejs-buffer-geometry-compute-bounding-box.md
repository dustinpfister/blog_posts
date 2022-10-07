---
title: Computing Bounding Box for buffer geometries in threejs
date: 2022-10-07 08:30:00
tags: [three.js]
layout: post
categories: three.js
id: 1008
updated: 2022-10-07 08:54:27
version: 1.1
---

With the buffer geometry class in threejs there is a bounding box property that stores an instance of the Box3 class, and the compute bounding box method of the buffer geometry class is what can be used to create or update this instance of Box3. As the name suggests this bounding box property can be used for collision detection, but it can also be used to find out the size of a geometry which can aid in the process of positioning objects.

<!-- more -->

## Compute Bounding Box, and what to know first

This is a post on the compute bounding box method of the buffer geometry class in the javaScript library called threejs. With that said there is a lot of subjects that you should know a thing or two about before hand that I will not be getting into detail here as I have wrote those kinds of posts on [threejs](/2018/04/04/threejs-getting-started/) and [javaScript](/2018/11/27/js-geting-started/) a long time ago. However regardless of how much experience you might have at this point I will take a moment to outline a few things you might want to learn or refresh with when it comes to compute bounding box of buffer geometry.

### Buffer Geometry

### The Box3 class in detail

### The Vector3 class

### Source is on Github

### Version Numbers





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

