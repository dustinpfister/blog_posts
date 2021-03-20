---
title: Pop The Lock Canvas Example Game Clone
date: 2019-11-26 21:22:00
tags: [js, canvas]
layout: post
categories: canvas
id: 571
updated: 2021-03-20 15:20:50
version: 1.44
---

A long time ago I played a game called [pop the lock on android](https://play.google.com/store/apps/details?id=com.sm.popTheLock&hl=en_US), and managed to end up getting hooked for a while. It was a very simple game that just involved a circle moving along the path of another circle, and once it gets close to a target area you need to tap the screen or else you loose, you also loose if you tap to soon. I can then try again and the object is to repeat this process up to a certain count of times to unlock a lock.

I find myself making clones of this game now and then, in part because it is so easy to make a game like this. It is the kind of game where I can make a working clone within just about an hour or so when I am working at my best, sometimes even less than that when it comes to just the basic idea of what it is. However there is so much room of programing things a little differently so that I am making something new rather than something that is just a clone of the same game.

Many of the game prototypes that I have made so far are the kind of projects where it takes a long time to get something together that is just starting to look like a game, but things do not always have to be that way when it comes to this sort of thing, a game can be simple. It is also a great example of what really matters when making a game which is just to make something that is fun, or addictive in a distinct unique way. Often I think that I put way to much time and thought into a game, so it is nice to take a break from that are work on a game like this.

So todays [canvas example](/2020/03/23/canvas-example/) will be a game that is a clone of this pop the lock game to some extent, but a little different. I want to play around with the various values that come to mind when making a game like this, and maybe make it work a little differently altogether so it is not just a full rip off of the original. Sense the time that I have started this post I have updated the source code a few times, when I come back to this one I like to experiment with new game modes, and features.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pop-the-lock/1.0.1/pkg.js"></script>

## 1 - The game.js module for pop the lock

For this canvas example I made a game module that will be used to create and return a game state object, as well as provide methods to update that state object.

The game object contains values such as the current degree of the point in motion, and a value that reflects the total number of degrees in the main circle of the game. In addition there is also a target degree, and margin value that can be used to result in a range area in the circle. This range is the area where the payer will score if they make an action such as clicking or touching the canvas when the current degree is in that range. There are also a number of other values that have to do with the rate at which the current degree will move as well as the current direction, and a boolean that indicates that the current degree is in the range.

In recent version of this game I worked out a few methods for creating new target locations. One of which I like to use when it comes to creating trip up locations, and the other is for creating locations that end up farther away from the current degree location. Speaking of trip up locations this is another feature that I added that can help to make a game mode more challenging, when the trip up location feature is active new targets will spawn close to the current degree location give the player little time to react. I also mentioned modes when is another new feature where I am working out more than one way to go about creating this kind of game. I would like to write more about modes, but I think I am going to keep working on this example a great deal more in the coming days, and I would not like to get into it that much at this time.

```js
```

In this module I am making use of a utils library that contains many useful methods such as mathematical modulo. I will be getter to that in a later section in this post.

So now that I have a game module worked out I am going to want to have some additional code that is used to draw the state of one of these game state objects to the canvas. In additional I am also going to want to have some javaScript code that will provide a main app loop, and a state machine that will be needed when it comes to continuing to expand this.

## 2 - The game modes thus far

So now that I have a plug in system for game modes I can experiment with different kinds of game modes where I am switching up the rules and settings a little from one game mode to another.

## 3 - The draw method

So now that I have the game state object worked out it is time to work out a draw method for it, as well as some additional draw methods for the project as a whole. In this example I am not doing anything fancy with layering, sprites, and so forth. So I just have a collection of draw methods for drawing things like a solid color background, the current version number, and the current state of things when it comes to the game state object of course. I took the time to break things down into a whole bunch of helper methods, and then have just a few public drawing methods that I will be using in my main.js file.

```js
```

If I put more time into this project this will end up getting broken down into many methods and will be pulled into a file of its one which is often the case with many of these canvas examples.

## 4 - The utils lib

Like all my other canvas examples these days I have a utils library where I park functions that I will likely use in more than one file in a project, and also might copy and paste over to other utils libraries in other canvas examples. For pop the lock thus far as of version 0.0.0 I am just using my create canvas method that is more or less standard for canvas examples now.

```js
```

## 5 - An Object pool module that I am using for buttons in the state machine

I wanted to add an object pool module, however for this canvas example the only reason why is more so for the sake of having animated buttons, and maybe a few additional effects. This module is based off of what i worked out in my other canvas example on objects pools, in fact I copied that source code and just made a few changes here and there that I might add in future versions of that canvas example.

```js
```

## 6 - The canvas, main app loop, and the html

So now to make use of everything I worked out in a main javaScript file that will proved the main app loop and the state machine. In this main.js file I create a canvas with the create canvas utils method, and get the drawing context to it.

I then create the state machine object that will contain a game state object as one of itself properties. I then start to create at least one game state, that will have methods for updating, drawing and clicking.

In the main app loop I am calling the game module update method of my pop the lock game module, and passing the game object that I created with the game module create method. I am also using the draw method I have worked out to draw the current state of the game state object in the canvas element. I am also of course using request animation frame as always to create the app loop for the canvas example as with just about any other.

```js
```

Now that I have covered everything that composes the main.js file I just need a little HTML to get this up and running. In my html I just have a div element that I am using for a container element to which the canvas element gets injected in when my main.js file runs, and then of course I have a script tag that links to my main.js file.

```html
<html>
    <head>
        <title>Pop The Lock canvas example </title>
        <style>
body{
  margin:0px;
  padding:0px;
  background:gray;
}
.canvas_example{
    display: block;
    width: auto;
    height: 100%;
    margin: 0 auto;
}
        </style>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/pool.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./modes/freeplay.js"></script>
        <script src="./modes/sudendeath.js"></script>
        <script src="./modes/endurance.js"></script>
        <script src="./modes/classic.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When this game is up and running it works as I would expect as the circle along the other edge moves alone one way or another. If I tab the canvas when the circle is in the range the score will go up otherwise the score will go down. At the time of this writing I am not sure what to do differently, so I just have the basic core idea of the game working for now. There is working out additional logic when it comes to how to go about tripping up the player rather than just having random locations, along with many other such ideas. However for now this is just about it I think.

## 7 - Conclusion

This was a quick, and fun little project that I put together in a flash, but is all ready starting to feel like a game. However there is still a great deal of room for improvement with it also, and I have yet to find a way to turn this kind of project into some more distinct from what I am cloning so that it is not just a knock off. 

I like to try to keep the projects in these canvas examples posts fairly simple and basic though so that I do not have to write an extremely lengthly amount of written content outlining the example. However this one is starting to get a little involved and I also have a lot more ideas that I keep writing down on my todo list for this one. The original game that I cloned off of was all ready a little addictive, but I found myself loosing interest fairly quick still. I thought to myself, hey this game is pretty cool actually, and it is so simple too, but it would be even better if it had these features.

I will be continuing to work on this one at least a little while longer, because I think that it could use a few more game modes. I think I should make at least ne game mode that is more or less the same game as the original, and call it something like classic mode. However what I really want to do is see if I can come up with new modes, and additional features to tweak these modes in order to come up with something that I think will be pretty cool. 

I think I should have some additional states, and even some basic features are still missing. As I continue to work on this I hope to also work out a half way decent system when it comes to having a state machine, and user interface features to move from one state to another.

