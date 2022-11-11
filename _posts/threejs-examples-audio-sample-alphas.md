---
title: Audio Sample Data Alphas and threejs projects
date: 2022-11-11 06:53:00
tags: [three.js]
layout: post
categories: three.js
id: 1013
updated: 2022-11-11 07:30:39
version: 1.2
---

I have been making a few [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) videos lately in which I am testing out how to go about syncing video with audio. Thus far though I am just working out the timing in terms of time stamps and duration and thus I am not taking into account any kind of actual audio sample data to adjust things that are going on when rendering my frames. However I have found that I can [export audio sample data](https://manual.audacityteam.org/man/sample_data_export.html) in an HTML file format when using [Audacity](https://en.wikipedia.org/wiki/Audacity_%28audio_editor%29) to work out the audio tracks that I want in this video. So I can adjust the sample rate so that I have just one sample per frame, and then I can export the sample data in an HTML file in which I have at least one sample point for each frame of the video. I can then also do this on a track by track basis, so that I have an HTML file of sample data for say drums, then another for bass, and yet another of samples, and so forth.

I then just need to make another [threejs examples](/2021/02/19/threejs-examples/) project that will use something like the [THREE.FileLoader](https://threejs.org/docs/index.html#api/en/loaders/FileLoader) to load these HTML files of audio sample data. The just do a little additional work to create a kind of standard object of this data that I extract from the HTML files. I can then use an array of audio sample numbers that have been adjusted to be in the range of 0 and 1 as alpha values for anything and everything that will call for such a value to adjust things like scale, position, rotation, and any additional effects for any module that I am using and so forth. In other words the goal here is to create [music visualization](https://en.wikipedia.org/wiki/Music_visualization) using threejs, and audio sample data exported from Audacity.

<!-- more -->


## 1 - The first revision of the module

### 1.0 - The source code of the module

```js
```

### 1.1 - Using two tracks

```js
```

### 1.2 - AlphaSum helper example

```js
```

### 1.3 - Sample Mean method to help smooth things out

```js
```

## Conclusion

The module is working okay as I have it all ready, but I can all ready see that I am going to want to make at least one revision in which I bake some of the things that I have worked out in my demos into the module itself. There is also not just loading and processing sample data, but also what it is that I can do with just data. I would like to have better methods for things like certain paths that are the result of sample data and things to that effect, however maybe all of that is something that should all be part of another project.