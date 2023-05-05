---
title: Idle Game Electionjs project example 
date: 2023-04-28 08:19:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1037
updated: 2023-05-05 09:59:47
version: 1.7
---

When it comes to my collection of electronjs examples thus far I do not have an example that is some kind of game project, so I have started one project that is a kind of [Idle Game](https://en.wikipedia.org/wiki/Incremental_game). The game prototype idea is called MrSun, and the general idea is to have a single object that is a sun, and a bunch of objects around the sun that are land sections. Each land section is then composed of a grid of slots, each of which can contain a block that will generate the main game currently which in this case is mana.

The sun can then be moved into other locations in the area between all the land section objects. When doing so the distance from the sun to each land section object will change which will result in temperature changes for each land section. The changes in temperature will then effect the rate at which mana for each block in a given land section is. That is that I have a base mana amount, and a temperature mana amount that together compose the total mana delta amount for each block in each slot in each land section.

I have made a whole lot of game prototypes in the past when it comes to my collection of html canvas examples, but this time around with my electionjs examples I would like to focus more so on quality rather than quantity. For this game prototype I have stayed in my lane for the good part of a month, and on top of that I have plans to continue working on this project in a stand alone repository as well. So then this will not just be yet another prototype but a game that I will keep working on, and playing myself, for a little while every day.

What I have in mind here then is not just another idle game, but a game that also pulls in elements of strategy, simulation, and sandbox type games. The core features of an idle game are there is the prototype all ready, and as I keep working on this as a stand alone project I will be seeking to further refine the features in place as well as take additional steps with various other ideas that I think will add more value to this project.

<!-- more -->

## The MrSun Idle Game Prototype and what to know first

In this post I am writing about a electionjs project example that is my first electionjs game project that is an example of an idle game project. I really went off the deep end with this one when it comes to the client system which is composed of many modules of my own design. I did not write all of them from the ground up though, many are based on source code exmaples that I have started for many other projects, others are hacked over threejs source code files. I have also borrowed code from a few other projects as well, and it would look like I will need to relpease any final product based on this under the MIT Liceses becuase of it. In any case this is not a post for people that are [new to using electronjs](/2022/02/07/electronjs-hello-world/)

### The full up to date source code for the prootype can be found on Github

The best way to get things up and running with the prototype that I am writing about in this post might be to [clone down my elecitonjs examples repo](https://github.com/dustinpfister/examples-electronjs) and then do an npm install for the [electronjs-example-mrsun project](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun) in the for post folder. This will install the version of elecitonjs I was using and as of this writing that is the only npm package that is being used for this one.

## 1 - Electionjs Files

As with just about any electionjs project there are two general things to write about, electionjs code and the client system code. In this section I am going to be writing about what it is that I have in place when it comes to the typical electionjs files such as the main.js and [preload.js](/2022/02/21/electronjs-context-bridge/) files. On top of those two files I also have one addtional nodejs script that I should write about also while I am at it.

### 1.1 - The main.js file

There is not much to write about when it comes to the main.js file with this one actualy. For this project I really went off the deep end when it comes to the client side code, but not so much when it comes to the front end code. So I just have a create main window helper functon, a custom menu, and then a few events here.


### 1.2 - The preload.js file

While working on this project I ran into a problem that had to do with a race condition when saving a game state file to the file system. If a save was in progress and I quit or reloaded the game before the save was finished I would loose my save state. There might be a number of ways to go about adressing this problem but the way that I solved it was by just making use of an additonal nodejs file and using the [fork method](/2019/08/07/nodejs-child-process-fork/) of the [nodejs child process module](/2018/02/04/nodejs-child-process/) to lanunch a save as a whole other detached process on the client system. This way the detached process will continue even if the main game porcess was killed, or the game was reloaded.

### 1.3 - The save file script savefile.js

As I have covered in the section on the preload.js file for this game prototype. Nothing major with this script as it just needs to be a very basic script that will just write a file using the write file method of the [nodejs file system module](/2019/06/14/nodejs-filesystem-write-file/).


## 2 - The Client system

Now that I have covered all the code that has to do with the electionjs files there is now going over all the code that has to do with the client system for this game. This is where things get a little involved with this as I worked on this game prototype a little each day for the good part of a month. There are a lot of javaScript modules that compose the game code thus far then. The onces that I have not done much with I will just write about and link to where you can see the copies of the modules that I am using in the github project folder. Others I have hacked over a lot, or have wrote from the ground up and as such I might post the code here then.

## 3 - Using a copy of Decimal.js for high percision math

I have went with [decimal.js](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/decimal) as a module for working with very big numbers. If you have coded with javaScript as long as I have then chances are I do not need to lecture you as to why it is a good idea to use a librray like this when making any kind of project that involves working with very big numbers which is often the case with idel games. If not then there is reading up more on what [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) is to get an idea with what the limits are with regular javaScript numbers. A possible native altertaive to bothering with a user space module would be to use [big integers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), however I find them lacking when it comes to math methods.

## 4 - Using event-dispatcher from threejs

I am using the [event-dispatcher source code](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/event-dispatcher) files from the threejs project. I have decided to make this a 2d game, but I have found that I would still like to use some features from threejs by just making use of some of the source code files. The [event dispatcher](https://threejs.org/docs/index.html#api/en/core/EventDispatcher) in threejs is a way to go about createing custom user space events for plain old javaScript objects rather that elements. I am using this to create events for my main game object.

## 5 - Using lz-string to compess save state data

I have went with [lz-string](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/lz-string) to compess save state data. For this project I have made a cusotm hack job of the file in order to turn it into a javaScript module, and while I was at it I removed all the code that I was not using.


## 6 - A hacked over THREEJS Vector2 Class

I made a [copy of the Vector2 class](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/vector2) and hacked over it a little. One major change that I made has to do with the methods for getting angles between two points as I have found that the angle to method that comes with the class is not working the way that I would like it to. I thus went with an angle to method that is just an abstraction for the ushual deal with the Math.atan2 method that is often what will be used for this kind of task in some way. The angle to method in the threejs vector2 class also makes use of a single method in that math utils object, so the options are then to add the whole math utils module also, copy over the source code for this single method, or just start removing code that I am not using from this custom cut Vector2 class module.


```js
// Vector2 class for electionjs-example-mrsun
// Based on the source code from the Vector2 class from r151 of threejs
// https://raw.githubusercontent.com/mrdoob/three.js/r151/src/math/Vector2.js
//-------- ----------
// EXPORT
//-------- ----------
class Vector2 {
    constructor(x = 0, y = 0) {
        Vector2.prototype.isVector2 = true;
        this.x = x;
        this.y = y;
    }
    get width() {
        return this.x;
    }
    set width(value) {
        this.x = value;
    }
    get height() {
        return this.y;
    }
    set height(value) {
        this.y = value;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    // added a radianTo method becuse the angleTo method is not working a certain way that I need it to.
    radianTo(v){
        const r = Math.atan2(this.y - v.y, this.x - v.x);
        return r < 0 ? Math.PI * 2 + r  : r;
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        const dx = this.x - v.x,
        dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
     * [Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}
//-------- ----------
// EXPORT
//-------- ----------
export { Vector2 };
```

## 7 - Object2d

I [started an Object2d class](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/object2d) which I would like to make like that of the Object3d class in threejs. Maybe not so much in this prototype, but as I start to work on a final game based off of this I am sure I will expand on this class a whole lot.

```js
// Object2d class based on the Object3d class of threejs
// https://raw.githubusercontent.com/mrdoob/three.js/r151/src/core/Object3D.js
import { Vector2 } from '../vector2/vector2.mjs';
import { EventDispatcher } from '../event-dispatcher/EventDispatcher.mjs';
 
class Object2D extends EventDispatcher {
    constructor() {
        super();
        this.name = '';
        this.type = 'Object3D';
        this.parent = null;
        this.children = [];
        // position
        const position = new Vector2();
        const size = new Vector2();
        Object.defineProperties( this, {
            position: {
            configurable: true,
                enumerable: true,
                value: position
            }
        } );
        this.userData = {};
    }
};
 
export { Object2D };
```


## 8 - object2d-sprite

For this prototype thus far I have one addtional module in which I [extend from my base object2d class that is a sprite class](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/object2d-sprite).

```js
```

## 9 - Canvas

```js
```


## 10 - mrsun-constant

```js
```


## 11 - mrsun-game

### 11.1 - The sun module

```js
```

### 11.2 - The Land Module

```js
```

### 11.3 - The game module

```js
```

## 12 - Mrsun-statemachine

One major component of a game, or most applactions in general is to have somehting to serve as a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine). Simply put there is not just having a single update method called in a loop, but rather a collection of update methods to which only a single one is called at any given moment. While we are at it there is also not just having a collection of update methods but also input event handers, render funcitons, and additional hook functions also. In MrSun I have a main state machine module, and then also a collction of state objects for several states of the over all game.

### 12.1 - The Main state machine module

```js
```

### 12.2 - The init state

### 12.3 - The world state

### 12.4 - The land state

### 12.5 - The super nova state \( Prestige mechanic \)

A common machanic to have in idle games is something that is often refered to as a [Prestige mechanic](https://www.youtube.com/watch?v=aYFHUq-8gPY). For my Mr Sun electionjs example prototype I am calling this kind of machanic a [supernova event](https://en.wikipedia.org/wiki/Supernova) which just strikes me as a good name for it with resptect to the over all theme of this project.

```js
```

## 13 - mrsun-utils

## 14 - main electionjs

```js
import { StateMachine }  from "./js/mrsun-statemachine/sm.mjs"
// create sm object that will use PLATFORM_ELECTRON
const sm = window.sm = StateMachine.create({
    el: document.getElementById('wrap_main'),
    PLATFORM: PLATFORM_ELECTRON
});
// start it up
StateMachine.start(sm);
```


## Conclusion

So that is the general overview for this electronjs project exmaple of an idel game. I really put a whole lot of time into this one so it is safe to say that I will be treating this exmaple the same way as I have with my [video creation tool project example](/2022/03/10/electronjs-example-videoground). Simply put this means that it is going to get its own repo and I am going to continig working on it a little more now and then which is not always the case with some of these electionjs exmaple projects that I have made thus far. Many of them are just prototypes, but some of them I continue working on if they are software tools that I use everyday, or enought people start to show interest. This game might prove to be one of those projects as I find myself getting addicted to my own game Tony Montana style.




