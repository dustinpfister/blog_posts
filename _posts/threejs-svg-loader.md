---
title: The SVG Loader in threejs
date: 2022-09-16 09:07:00
tags: [three.js]
layout: post
categories: three.js
id: 1005
updated: 2022-09-16 09:25:40
version: 1.2
---

There are a number of options for additional asset loaders in the Github Repository of threejs, one of which is the [SVG Loader](https://threejs.org/docs/index.html#examples/en/loaders/SVGLoader). Which is a way to go about loading a SVG file asset as an external file into a threejs project as a collection of paths that can then in turn be used to make [Shapes](https://threejs.org/docs/index.html#api/en/extras/core/Shape) that can be used with the [Extrude Geometry constructor](https://threejs.org/docs/index.html#api/en/geometries/ExtrudeGeometry).

<!-- more -->


## The SVG Loader and what to know first

### There is also knowing how to go about making an SVG file first

A few years back I wrote a [post on getting started with SVG](/2019/02/11/js-javascript-svg/) from the ground up using just a text editor.