---
title: Morph Attributes of buffer geometry objects
date: 2023-02-03 10:02:00
tags: [three.js]
layout: post
categories: three.js
id: 1026
updated: 2023-02-03 10:12:42
version: 1.0
---

The morph attributes property of a buffer geometry instance will store an object which contains buffer attributes that are used to mutate the state of other buffer attributes of the geometry over time. Simply put it is a way to go about creating animation by having say additional position attributes for several other kinds of states for the points of a buffer geometry. These additional attributes that are used to morph a buffer geometry can contain absolute values foe each item, or they can be delta values that store a rate of change for each item as well.


<!-- more -->
