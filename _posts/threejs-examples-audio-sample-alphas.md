---
title: Audio Sample Data Alphas and threejs projects
date: 2022-11-11 06:53:00
tags: [three.js]
layout: post
categories: three.js
id: 1013
updated: 2022-11-11 07:22:31
version: 1.1
---

I have been making a few [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) videos lately in which I am testing out how to go about syncing video with audio. Thus far though I am just working out the timing in terms of time stamps and duration and thus I am not taking into account any kind of actual audio sample data to adjust things that are going on when rendering my frames. However I have found that I can [export audio sample data](https://manual.audacityteam.org/man/sample_data_export.html) in an HTML file format when using [Audacity](https://en.wikipedia.org/wiki/Audacity_%28audio_editor%29) to work out the audio tracks that I want in this video. So I can adjust the sample rate so that I have just one sample per frame, and then I can export the sample data in an HTML file in which I have at least one sample point for each frame of the video. I can then also do this on a track by track basis, so that I have an HTML file of sample data for say drums, then another for bass, and yet another of samples, and so forth.

I then just need to use something like the [THREE.FileLoader](https://threejs.org/docs/index.html#api/en/loaders/FileLoader) to load these HTML files of audio sample data. The just do a little additional work to create a kind of standard object of this data that I extract from the HTML files. I can then use an array of audio sample numbers that have been adjusted to be in the range of 0 and 1 as alpha values for anything and everything that will call for such a value to adjust things like scale, position, rotation, and any additional effects for any module that I am using and so forth. In other words the goal here is to create [music visualization](https://en.wikipedia.org/wiki/Music_visualization) using threejs, and audio sample data exported from Audacity.

<!-- more -->
