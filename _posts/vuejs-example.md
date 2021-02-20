---
title: 10 vuejs examples to start out with
date: 2021-02-04 12:30:00
tags: [vuejs]
layout: post
categories: vuejs
id: 796
updated: 2021-02-20 16:24:05
version: 1.17
---

I have wrote over 40 posts on vuejs thus far, and many of those posts are just on various aspects of the [vuejs framework itself](/2021/02/05/vuejs/) that are all ready well documented in the official vuejs documentation. Writing such posts are not always such a wast of time mind you often the official documentation might fail to mention something, not frame things the right way, and more examples can never hurt. Still once I gain a sold hold on the basics of a framework or language the only thing to do from that point forward is to start to work on some actual projects, rather than finding about with basic, copy and paste, cook book style code examples. So I have started writing a collection of posts on [vuejs examples](https://vuejsexamples.com/) that are full working projects, or at least aim to be anyway.

I have done the same with my collection of posts on the canvas element, but this time around I think I would like to focus more so on quality rather that quality. For now I have 10 posts on vuejs examples, and as of this writing I think that I might want to keep it at that, or if I am going to expand the collection not go that must farther then that for now. I would like to edit the older posts, and improve the underlaying code of the examples on top of that, before continuing forward in an effort to not repeat what I have done for my collection of canvas examples.

<!-- more -->

## 1 - Get the full source code of all of my vuejs examples at my github

The full source code for all of these vuejs examples can be found at my [test\_vuejs reposatory](https://github.com/dustinpfister/test_vuejs) here at guthub. If you have both git and nodejs installed then the repo can be cloned down, then npm can be used to install packages for a simple server for the examples. doing something to that effect is best when it comes to working out something with vuejs, and javaScript in general compared to viewing things with the file protocol.

```
$ git clone --depth 1 https://github.com/dustinpfister/test_vuejs
$ cd text_vuejs
$ npm install
```

The list script will set up and run a simple server that will give a list of all the examples.

```
$ npm run list 3000
```

## 2 - The List of vuejs examples

Now for this list of examples, for each example here I will be linking to a post in which I write about the example in detail, source code examples should be there also. Many of these examples are still works in progress, but I am going to try to keep this list short and keep coming back to each example rather than continuing to expand with more examples.

### 2.1 - [A Basic vuejs calculator example](/2020/02/14/vuejs-example-calculator)

Seems like a good idea for a hello world type vuejs example to make a little calculator app. There is getting creative with such projects though where it does not always have to be a simple calculator, or a scientific one. There is making a calculator that helps with something that is tied closer to a specific kind of job that has to do with accounting, sales, or estimating how much money a blogger will make if they can get a certain volume of traffic. However you have to start somewhere, and just a basic run of the mill calculator is a good staring point just for the sake of exercise.

### 2.2 - [Very Basic Idle Game starting point](/2021/01/25/vuejs-example-idle-game)

I seem to like playing idle games, or at least I find myself getting addicted to playing them. What really seems to be interesting is that often these kinds of games can still be addictive even when there is very little going on with graphics. I fact my favorite idle game swarmsim is just text only.

There are many core features that I think an idle game should have, but you have to start somewhere. This vuejs example is a very basic starting point for such a game.

### 2.3 - [Very Basic Idle Game with over time feature](/2021/01/26/vuejs-example-idle-game-over-time)

Continuing with the idea of a very basic starting point for a vuejs example of an idle game, in this example I now more forward with introducing over time production.


### 2.4 - [Very Basic Idle Game with reset point feature](/2021/01/28/vuejs-example-idle-game-reset)

Yet another basic feature of an idle game is to introduce a feature that provides a kind of reset point. In many games the term used will change but the concept is more or less the same, you start over from the beginning, but this time with a initial amount, or yet even more of a kind of currency that can only be obtained by starting over. This reset point currency then makes the process of getting back to where you in the game happen a little faster.

### 2.5 - [Very basic Idle Game with upgrades](/2021/01/27/vuejs-example-idle-game-upgrades/)

Yet another basic feature that an idle game should have is a means to spend currency that is gained for items that help to make even more of the currency. In this vuejs example I am yet again continuing with the development of a basic idle game by introducing upgrades.

### 2.6 - [Image Editor](/2020/07/27/vuejs-example-image-edit)

This vuejs example is just a very basic image editor program.

### 2.7 - [Land Sections Game](/2021/02/02/vuejs-example-land-sections/)

This is a game where I am working out the core logic for another game that I have been making over and over again when it comes to my collection of canvas examples called Mr Sun. The basic idea of the game is that I have a display object that represents a sun that is surrounded with other display objects that are land section objects. The sun can then be moved around and doing so will of course effect the state of each land section when it comes to things such as temperature.

I have all ready made many forks of this kind of game when it comes to the canvas example, but with vuejs I think I will like to keep it just with this one alone. The focus here should be on the core rules and logic of the game, and not any additional flash, and graphics which often gets in the way of getting logic solid.

### 2.8 - [Vuejs List Example](/2020/02/18/vuejs-example-list/)

Just a basic to list app example, nothing to interesting really just wanted to get this one out of the way.

### 2.9 - [Vuejs Menu Example](/2021/02/01/vuejs-example-menu/)

For this example I wanted to work something out that is just a basic menu, or navigation system. That is that I have a whole bunch of components where each one renders a menu that has a buch of ui features and other display components for a certain aspect of an over all application.

### 2.10 - [Web Assets Game](/2021/02/03/vuejs-example-web-assets/)

This is yet another game that is another kind of idle game where the player creates and eventual buys web assets the generate money over time.

## 3 - Conclusion

This is it for now when it comes to my vuejs examples that I have worked out thus far. In the future I Will be getting around to editing my vuejs content again and often when I do so I also write a few new posts on the subject. However I also have so many other collections of content that also need some attention that are competing for my attention when it comes to improving quality and expanding on the topic. Still when it comes to sinking more time and effort into my vuejs examples the focus should be more on improving what I have worked out all ready rather than continuing to create yet even more examples.
