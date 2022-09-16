---
title: The SVG Loader in threejs
date: 2022-09-16 09:07:00
tags: [three.js]
layout: post
categories: three.js
id: 1005
updated: 2022-09-16 11:29:55
version: 1.3
---

There are a number of options for additional asset loaders in the Github Repository of threejs, one of which is the [SVG Loader](https://threejs.org/docs/index.html#examples/en/loaders/SVGLoader). Which is a way to go about loading a SVG file asset as an external file into a threejs project as a collection of paths that can then in turn be used to make [Shapes](https://threejs.org/docs/index.html#api/en/extras/core/Shape). These shapes can then be used with somehting like the [Shape Geometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry) or the [Extrude Geometry constructors](https://threejs.org/docs/index.html#api/en/geometries/ExtrudeGeometry).

<!-- more -->


## The SVG Loader and what to know first

There is a lot that one will need to be aware of before hand when it comes to using these source code exmaples that I am wriitng about here. As always I assume that you have at least a little expernce with client side javaScript and the underlaying skills that are needed on top of that with HTML and CSS. However on top of that there are also a great deal of other features in the threejs libray alone that you might want to play around with a little first also. I wil of course not be getting into great detail with all of this in this post, but I will at least mentine a few things in this section before getting into the first SVG Loader example.

### There is also knowing how to go about making an SVG file first

Although it might be best to still use some kind of image editor to create SVG Graphics, it is still possible to edit the values of SVG with just a plain old text editor as well. Whatever the case may be when it comes to making the SVG assets that you will like to load into threejs by way of the SVG loader, getting into every little detail about SVG is outside of the scope of this post. A few years back I wrote a [post on getting started with SVG](/2019/02/11/js-javascript-svg/) from the ground up which might prove to be a good starting point. There is also the [Modzilla Docs on SVG that do a great job covering everything with elements and attributes of SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). 

### More than one file to use beyond just that of threejs alone

In these examples I am using more than one extral file beyond just that of the core threejs librray. For one thing the SVG loader itself is not baked into the core of the threejs librray, but rather it is an addtional optional loader that can be [found in the examples folder of the threejs github reposatory](https://github.com/mrdoob/three.js/blob/r140/examples/js/loaders/SVGLoader.js). So I am linking to the threejs library and the SVGLoader.js file as well just when it comes to offical code from the repo on Github. On top of that I am also linking to my own javaScript files on an example by example basis, and of course I am also loading one or more SVG files as well.

### Source code and SVG assets are up on my Github

The source code examples that I am writing about here, as well as the SVG asssets, and addtonal notes and files [can be found in my test threejs reposatory up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-svg-loader).

### Version Numbers Matter

When I first wrote this post I was using r140 of threejs which was released in May of 2022.



