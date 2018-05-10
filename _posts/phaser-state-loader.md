---
title: How to get going with a simple asset loader in phaser
date: 2017-10-07 10:58:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 56
updated: 2017-10-22 13:49:03
version: 1.7
---

First off it might be best to start by reading my [post on getting started](/2017/10/04/phaser-getting-started/), and the [state manager](/2017/10/05/phaser-state-manager/) in general with phaser. Phaser is a very complex project, but is well worth the investment of time to study it. In this post I am covering how I go about getting a basic loading screen working okay involving a progress bar, and more than one State object.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## The Loader I use so far

So I like the idea of breaking things down into many states that interrelate to each other. At a minimum if there are some images I want to use, I will have a Boot, Load, and Game states. Where Boot is the very first state that is started, then I progress to Load, and once the Load state fires it's create method I can go on to whatever is next.

As such I work with something like this.

```js
// th Boot State
var Boot = {
 
    preload : function () {
 
        game.load.image('loadingbar', '/img/loadingbar.png');
 
    },
 
    // create method
    create : function () {
 
        game.state.add('load', Load);
        game.state.start('load');
 
    }
 
};
 
// the load state
var Load = {
 
    preload : function () {
 
        // add a sprite that uses my loadingbar asset,
        // that was quickly loaded during the Boot Sate
        var loadSprite = game.add.sprite(0, 0, 'loadingbar');
        loadSprite.width = 0;
        loadSprite.x = game.world.centerX - loadSprite.width / 2;
        loadSprite.y = game.world.centerY - 16;
 
        // what to do when a file as completed downloading
        game.load.onFileComplete.add(function (progress, key, success, loaded, total) {
 
            loadSprite.width = game.width * (progress / 100);
            loadSprite.x = game.world.centerX - loadSprite.width / 2;
 
            console.log('progress: ' + progress);
            console.log('key: ' + key);
            console.log('success: ' + success);
            console.log('loaded: ' + loaded + '\/' + total);
            console.log('**********');
 
        }, this);
 
        // start loading the asset files
        game.load.image('phaser', '/img/phaser.png');
 
    },
 
    // when done create will be called
    create : function () {
 
        console.log('ready to rock!');
        game.state.add('game', Game);
        game.state.start('game');
 
    }
 
};
 
// the actual Game state once everything is loaded
var Game = {
 
    create : function () {
 
        game.add.sprite(0, 0, 'phaser');
 
    },
 
    update : function () {}
 
};
 
// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', Boot);
```

As things get completed each of these states might be pulled onto there own *.js files, but the will need to be loaded in a manner in which Phaser.Game is called last.

## The preload State method.

I load all of my assets in the preload state, I can use game.load.image to build a query of files. The create method of the Load state will not fire until all of the assets are loaded.

## game.load.onFileCompleate

This is an event that is fired every time a file is loaded, or fails to load. I can used the add method to attach more than one event to it if I want just like with el.addEventListener. The values that are passed to the handler are progress, key, success, loaded, and total.

In this loader I am not doing anything with handling the possibility that an asset may fail to load, but doing so can be done with that boolean if I have something in mind with that.

This is one event that can be used to update the information on some kind of load screen, in this loader I am just displaying a simple bar that will fill the whole of the screen when done.

## The Phaser Asset loader in detail

The idea I hand in mind with this post is to just have a quick simple post on how to get started with loader in phaser, and maybe not go down a rabbit hold covering every little detail about it. Doing so should deserve it's own septate post on that matter. For the time begin there is the [official API docs on Phaser.loader](http://phaser.io/docs/2.6.2/Phaser.Loader.html)

## Conclusion

So there is the idea of updating the progress bar based on the total amount of data that has downloaded so far rather than a file count. Displaying some kind of message during the boot state, displaying a percentage and so forth.

Still so far I like this approach at Setting up a load state. I am still rapidly developing my collection of posts on phaser, as such I will most likely come back and touch base on this again. Just want to have something on this for starters, it's important.

{% phaser_bottom %}