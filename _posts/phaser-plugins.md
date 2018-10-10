---
title: Starting out with plug-ins in phaser ce
date: 2018-10-09 18:34:00
tags: [js,phaser]
layout: post
categories: phaser
id: 301
updated: 2018-10-10 19:31:56
version: 1.7
---

So I finally got around to making my first [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) [plug in](https://photonstorm.github.io/phaser-ce/Phaser.Plugin.html), and now I am wishing that I look into how to go about doing this sooner. Although I have not been writing about it yet, I have bean working on a few prototypes for actual games, rather than simple little examples that just show how to work with one little thing in phaser ce. As such I am ruing into issues when it comes to how to go about keeping things well organized as a project grows in size. So far it looks like making plug-ins might be a better way of keeping things well structured compared to other options. So in this post I will me writing about how to make a basic plug-in, and also some slightly more complex examples as well.

<!-- more -->

## 1 - what to know

This is a post on how to make plug-ins in phaser ce a javaScript powered game framework. This is not a getting started post on phaser ce, or javaScript in general so I trust that you have at least some background with these topics. Phaser is a fairly complex framework, and it takes time to learn all the ins and outs, but it sure is worth the effort. If you run into trouble with the content of this post I have many other posts on phaser that have to do with other topics that are required before hand, and there is also the comments section on my site here as well if you find that something is missing in this post.

### 1.1 - This is a phaser ce (2.x post)

In this post I am using phaser community edition 2.11.0 of [phaser](https://phaser.io/)

## 2 - Basic phaser ce plug-in example

In this section I will be covering just a basic simple plug in design pattern. What needs to happen in any case is just the passing of an instance of Phaser.Plugin to game.plugins.add. The Plugin object can contain both an init, and update methods, and as such they are similar to state objects.

### 2.1 - The plug-in

One way or another a plain object, or better yet an instance of Phaser.Plugin needs to be passed to game.plugins.add.

```js
// the first plugin
var myFirstPlugin = function (game, opt) {
 
    // create the plugin object
    var plugin = new Phaser.Plugin(game, game.plugins);
 
    // to be called once
    plugin.init = function (opt) {
 
        console.log('hello I am a plugin');
        console.log(opt.foo); // 'bar'
 
    };
 
    // to be called on each tick
    plugin.update = function () {
 
        console.log('tick');
 
    };
 
    // add the plugin
    game.plugins.add(plugin, opt);
 
};
```

### 2.2 - The Phaser.Game instance 

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        myFirstPlugin(game, {
            foo: 'bar'
        });
 
    }
 
});
 
game.state.start('demo');
```