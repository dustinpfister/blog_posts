---
title: Drag Controls in threejs
date: 2023-09-07 12:00:00
tags: [three.js]
layout: post
categories: three.js
id: 1070
updated: 2023-09-07 12:08:30
version: 1.0
---

There is always working out my own UI controls for a threejs project. However if I want to quickly create typical types of controls there are a number of official options for this that can be pulled from the examples folder in the github repository. I have all ready wrote posts on the orbit and fly controls way back in the day that I come around to edit once in a while. However I still have not got around to covering all the the official options just yet and with that said this post will be on the [drag controls](https://threejs.org/docs/#examples/en/controls/DragControls).

Just like with all the other kinds of official controls the drag controls and not baked into the core of the threejs library itself. Rather it must be added along with the core library. If you are still using an older revision of threejs such as r147 or older you still have the js folder and with that plain old javaScript tag type forms of the drag controls to use if you navigate to the revision you are using. However if you are using r148 or later you will need to use the JSM form of the drag controls, or hack over the code to get it to work for you.

<!-- more -->
