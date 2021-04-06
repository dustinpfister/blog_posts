---
title: Simple map system for level selection javaScript example
date: 2021-04-06 14:36:00
tags: [js]
layout: post
categories: js
id: 839
updated: 2021-04-06 15:18:21
version: 1.2
---

This week I am continuing to work on one of my canvas examples that is just simply called turret defense because I am really bad at names. Anyway for the game I would like to have a level selection map where there are a bunch of display objects for each level in the game. There are a lot of ideas that come up when it comes to just having this kind of system in a game, but for the sake of this post I would like to have just a simple basic system for this sort of thing.

The general idea is to just have a collection of display objects, one for each level, and then at least two states in a crude yet effective state machine. When I click on one of these display objects in the map state I then go to the game state, but with the game state object created with custom options set by way of a game options object that is part of the level selection object in this map system. So then in this post I will be going over a very simple example of this kind of system, and for the game object I will just be using what I worked out in yesterdays post on working out a system for rotation and fire control. So then this will be yet another one of my [javaScript example](/2021/04/02/js-javascript-example/) posts.

<!-- more -->

## 1 - The map module

```js
```

## 2 - The utils lib

```js
```

## 3 - The game module

```js
```

## 4 - The draw module

```js
```

## 5 - the main javaScript file

```js
```

## 6 - Conclusion

So then it would seem that I have the basic idea up and running at least for what it is worth. However there might be a great deal ore to work on when it comes to making this system something that i will want to use in a real project though. Still that is okay because the aim here was to just make a simple system, not go all out with this, I wanted to just start somewhere with it, and this is what i wanted when it comes to just getting started at least.