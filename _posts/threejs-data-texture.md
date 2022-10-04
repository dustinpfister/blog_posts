---
title: Creating textures with raw data in threejs
date: 2022-04-15 12:56:00
tags: [three.js]
layout: post
categories: three.js
id: 978
updated: 2022-10-04 16:32:51
version: 1.23
---

I have wrote a [number of posts on the use of canvas elements](/2020/03/23/canvas-example/), and also a post on [using canvas elements as a way to create textures](/2018/04/17/threejs-canvas-texture/) for mesh objects in threejs. However there is another built in way to create textures with javaScript code other than making use of canvas elements, and this option is [data textures](https://threejs.org/docs/#api/en/textures/DataTexture).

When it comes to using data textures as a way to create textures with javaScrript code in threejs I just need to know how to produce the texture that I want in terms of a [Unit8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) with a set of four values for each color channel. That is that I need to create an array with integer values between and including the range of 0 to 255 for red, green, blue and alpha color channels for each pixel.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/gvLwa6vgesM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## Data textures in threejs and what to know first

This is a post on using the THREE.DataTexture constructor in threejs to create a texture using raw data for each color channel of each pixel in the form of a unit8array. This is then not at all any kind of [getting started with threejs](/2018/04/04/threejs-getting-started/) type post, and I also assume that you have learned at least a thing or two about javaScript and client side web development in general before hand.

### version numbers matter

The version of threejs that I was using when I first wrote this post was r135, and the last time I came around to do some editing I was using r140.  Still code breaking changes might be made at some point in the future so one should always be mindful of the version of threejs that they are using when reading about and using threejs source code examples on the open web.

### The source code in this post is up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-data-texture).

## 1 - Basic examples of data textures

### 1.1 - A basic data texture example

For a simple example of this data texture thing in threejs I made this quick example that involves starting at a value of 32 for the red channel and adding 128 over the length of the total number of pixels for the image. I am then also doing something similar for the green channel just subtracting rather than adding.

I start out by making my usual [scene object](/2018/05/03/threejs-scene/) along with a [camera](/2018/04/06/threejs-camera/) and [web gl renderer](/2018/11/24/threejs-webglrenderer/) just like with any other threejs project. After that I will want to create an instance of a unit8Array where the length is equal to the number of pixels times four. So I just need to figure out that the width and height of the texture should be and then multiply that to get a size in terms of a total number of pixels. I can then use this size value times four to set the length of the typed array, and also use it as a way to know if I should stop looping or not when it comes to setting the values for this array.

I then have a loop in which I am figuring out what the values should be for each red, green, blue, and alpha channel value for each pixel. I can have an index for each pixel and then just figure out what the actual index value in the array is by just multiplying by four and then adding fro there for each channel value. Once I have my array in the state that I want it for the texture the next step is to then pass that array as an argument when calling the THREE.DataTextyre [constructor function](/2019/02/27/js-javascript-constructor/).

```js
```

### 1.2 - Distance to method of the Vector2 class

I have wrote a number of posts at this point on the [Vector3 class in threejs](/2018/04/15/threejs-vector3/) that is without question one of the major classes in threejs that a developer should become familiar with. However there is also the Vector2 class that has to do with just plain old 2d points which also will come into play when doing things like working with the [raycaster class](/2021/05/18/threejs-raycaster/), or in this case making 2d textures with a little javaScript code and the data texture constructor.

For this example I am doing more or less the same thing as in the basic example, but now I am using the distance to method of the Vector2 class as a way to get a distance value from a current pixel location to that of the center of the texture. I can then use this as a main to come up with different color channel values for each pixel in the texture.

```js
```

### 1.3 - Using the math random method

Now for a quick example using the [math random](/2020/04/21/js-math-random/) method to create color channel values. There are of course a great number of ways that I could go about doing this sort of thing, but for this example I just went with creating a single value that will be used for each color channel. So in other words I am doing a kind of random gray scale color effect here.

```js
```

### 1.4 - The seeded random method of the Math Utils object

I just also wrote a new post on the [math utils object](/2022/04/11/threejs-math-utils/) in threejs, and one interesting method in there is a seeded random method that will work like math random, with one little difference. Each time I reload the page I see the same texture rather than a new one. So then  this seeded random method is a way to get an effect like that of what happens when using the math random method, but in a deterministic kind of way which is cool.

```js
```

## 2 - Animaiton examples

### 2.1 – Having a helper function that has some kind of for pixel function option

Thus far all of these data texture examples are just blocks of code that create a single texture. When it comes to making a real project with data textures I will likely want to make a number of them, and do so in different ways. To keep myself from repeating the same code over and over again each time I want to make a data texture I can then make some kind of helper function and pass some values that will result in the kind of texture that I want.

When doing so the first feature that comes to mind that I would want to have in this kind of helper function would be an option that I can use to define the logic that is used to create the texture. In other words a kind of for pixel function that would have some kind of hard coded value.

```js
```

## Conclusion

The use of data textures to create textures for threejs geometries can then prove to be a little useful here and there then. However I am not sure if this is what I will want to always use, even when it comes to this sort of thing. For the most part I do still like to use canvas elements to create textures as there are a lot of useful methods to work with in the 2d drawing context. 

When it comes to really working out modules I, and also uv wrapping while doing so I sometimes think the best way to go would be external image files when it comes to working with dae files for a project.

Thus far I have found that I do some times like to use data textures over that of canvas elements when it comes to just quickly creating texture with raw data created with javaScript code and some quick expressions. One example that I have made thus far as of late was for my [post on the depth material where I made a kind of custom depth material](/2021/05/04/threejs-depth-material/) that is create just using the basic material with a texture created with, you guessed it, a data texture.
