---
title: The Phaser main game object, and the Phaser.Game constructor.
date: 2017-10-11 13:32:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 58
updated: 2017-10-22 13:49:02
version: 1.1
---

The most important component of [phaser](http://phaser.io) may very well be the main phaser game object constructor. This is what I call to make an instance of the main Phaser.game object that I typically set to a variable called game. This main game object is then referenced a lot, in each state of the game. Long story short this is where the magic happens with phaser.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## Width and Height

So the first two values that are passed to the constructor are width and height. If given a number it is an actual pixel amount, and if given a string it is a value between 0 and 100 that is the percentage of the parent container. Mainly I just go with a certain mobile friendly resolution of 320 by 240.

## Choose a renderer

The third argument given to the constructor is the renderer to use, If set to AUTO (the default), phaser will automatically use webgl if available, else default to regular old canvas. There is also a HEADLESS option if it is a game in which there is something else plained for rendering, most of the time so far I just leave this on AUTO.

## The parent element

Because this is an html 5 game this project will most likely be on a website somewhere, as such it is important to give phaser a parent element in which to inject the project. This can be the id of the element or the element itself. In my html I often have a div with an id of "gamearea" in it, but sometimes I just attach to document.body. So the fourth argument is a container element for the project.

##  The default state object

The fifth argument given is the default state object of the project. In my practice I stop here in most cases because I prefer to add States to phaser with game.state.add(key, state). So I actually will do something like this:

```js
var game = new Phaser.Game(320,240,Phaser.AUTO,document.body);
 
game.state.add('default', {
 
    create: function(){
 
        console.log('hello world phaser style!');
 
    }
 
},true);
``` 

However getting into the StateManager is a whole other blog post, so for now we are looking at something like this so far:

```js
var game = new Phaser.Game(320,240,Phaser.AUTO,document.body,{
 
    create: function(){
 
        console.log('hello world phaser style!');
 
    }
 
});
``` 

## transparent

The sixth argument is a transparent boolean that is set to false by default. I have not played around with this yet so there is not much I can say about it so far.

## antialias

The name should say it all. Set to false if the project involves pixel art.

## physicsConfig

The final argument that I might give to a phaser game object constructor is the physicsConfig object.

## Conclusion

Again this is just a quick post that covers all the possible arguments that can be passed to the Phaser.Game constrictor, it does not cover everything attached to the main phaser game Object that it returns. Learning all of Phaser will not happen over night, but it is sure worth the investment to look into it more, if you have not before, it will save time compared to doing everything from scratch.

Still The main Phaser.Game constrictor is a very important part of any Phaser project. having a solid foundation of it in might will help to get things really rolling with game development with the phaser html5 game framework.

happy coding.

{% phaser_bottom %}