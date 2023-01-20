---
title: Material Vertex Color and the buffer geometry attribute used for doing so
date: 2023-01-20 09:35:00
tags: [three.js]
layout: post
categories: three.js
id: 1024
updated: 2023-01-20 09:53:27
version: 1.0
---

One of the core features of the base material class in threejs is a vertex colors Boolean that when set to true will case the material to be rendered using color channel data stored in am attribute of the buffer geometry used. This feature will not work with all materials mind you, and with some a light source might still be needed or something to that effect. However it is still very much a feature of the base material class, unless there is something else going on that will override this it should work on most materials.

The color attribute is not one of the major must have attributes of a buffer geometry mind you. However it is an example of an additional attribute that can be added to a geometry to allow for coloring of a mesh. It is not at all a replacement for uv mapping, and the various material options that can be used with textures. However it is an alternative way of coloring a mesh object that works by adding data to geometry rather than bothering with images. In some cases I might want to use vertex colors as a quick way to have something other than just a single solid color, but I am not sure I would take this kind of approach in the long run, at least not with the built in materials anyway.

The main thing that got me into vertex colors is that recently I get around to writing a new blog post on the shader material. Simply put it is a way to go about creating a custom material using GLSL \( openGL Shader Language \). When doing so I have found that vertex coloring might be a nice way to go about styling a geometry, and when it comes to creating my own materials that opens the door for custom attributes that will allow for not just creating one color attribute but several such attributes.

<!-- more -->
