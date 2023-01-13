---
title: The shader material in threejs and getting started with a little GLSL
date: 2023-01-13 09:41:00
tags: [three.js]
layout: post
categories: three.js
id: 1023
updated: 2023-01-13 09:53:17
version: 1.0
---

The [Shader material](https://threejs.org/docs/#api/en/materials/ShaderMaterial) in threejs is one way to go about getting started with custom shaders in threejs, the other general option would be to look into the [raw shader material](https://threejs.org/docs/#api/en/materials/RawShaderMaterial). The main difference between the two has to do with built-in uniforms and attributes when it comes to the starting state of the GLSL \( [OpenGL Shader Language](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) \) code. For this reason it might be best to start out with the Shader material rather than the raw shdaer material as there are some built in values that I will not have to worry about setting up myself when it comes to the raw shader material. Yet again it is a bit of a toss up with that as if one wants to learn a thing or two about GLSL alone then the raw material might prove to be a better starting point actually.

In any case the Shader material is what I am starting with, and that will be the main topic of this post today. Using the shader material alone is simple enough, but what is not so simple is coming up with custom GLSL code to use with this material. However one has to start somewhere so this post will start out with some very simply hello world style examples, before moving on into one or more real examples when it comes to the topic of custom shaders.

<!-- more -->
