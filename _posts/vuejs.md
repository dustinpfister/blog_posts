---
title: The vuejs framework
date: 2021-02-05 13:26:00
tags: [vuejs]
layout: post
categories: vuejs
id: 797
updated: 2021-02-05 14:27:11
version: 1.7
---

The [vuejs framework](https://en.wikipedia.org/wiki/Vue.js) is a great framework for creating simple single page applactions, and reusable compartmentized compoents for such applactions. I started writing a collection of content on this framework a few years ago now, but I have now come around to editing some of that content and expanding with some new posts on the subject in the process.

Whenever I have an extensive collection of content on a subject I often write at least one post that serves as a major centeral location tyope post from which I branch off into all the other posts on the somject from. I have not yet got around to writing such a post for vuejs, that is until now. There is a lot to take in when it comes to learning vuejs for the first time, there are static templates, render functions, data objects, props objects, mixins, and so forth that make up a single vuejs instance. There is then getting into making components where data from a parent vue instance can be passed to one or more compoents by way of properties and then mutated forms of those values can be passed from a child compoents back to a parent by way of events. Then of course there are all the little vuejs built in directives such as v-bind, v-on, and v-for just to name a few on top of making ones own directves.

So it would make sense to have a lengthly main post on vuejs in which I just breefly touch base on all of these little topics, and then link to posts in which I get into that topic in greater detail.

<!-- more -->


## 1 - Getting strated with vuejs, and Hello World Type examples

It would make sense to start off a post such as this with the ushual getting started with vuejs type stuff, as well as what to know before hand before getting started with vuejs. It should go without saything that it is required that a solid understanding of html, css, and javaScript should be obtained before hand before getting into using vuejs, or any javaScript framework for that matter. However once that is out of the way then it is just a question of knowing how to set up a project folder, making a late version of vuejs part of the client side stack, and then just working out a few simple hello world type examples just for the sake of getting started.

### 1.1 - [My First getting started post on vuejs](/2019/05/05/vuejs-getting-started)

In my first post on getting started with vuejs I outline how to go about staring a new nodejs project folder, and start to work out a very basic hello world type example. Nodejs does not need to be used as a way to have a simpel back end system for a vuejs project, but it is a good idea to have some kind of system fro doing so. In any case you want to have the vuejs library, and all additional assets serve up by way of the http or https protocols rather than opening up an index html file in the browser and viewing it by way of the file protocol. This is something that one should get in the habit of doing not just with vuejs, but javaScript in general.


## 2 - Vuejs Options

When making a vuejs instance, component, or mixin there are a number of options that can be used when creating such things. There are options like the methods option that can be used to define a collection of methods that can eb used in a single instance, a collection of instances, or made into a global set of methods depeding on how the method option is used. So it is a good idea to go about getting a solid understanding of each of these options, and also how and where to use such options when it coems to starting to work on a real project of some kind.

### 2.1 - [The vue data option](/2019/05/18/vuejs-data/)

The vue data option is how to go about createing a state object for a single vuejs instance. This data object contains values that are to be used with just a sline instance to which the data object belongs. 

The vue data option is not to be confused with the props option which is a way to pass read one values from one vue instance to another, and then events can be used to pass a mutated value back to the parent instance. That however might be a more complex topic though when it comes to getting into compoents, but there is starting out by focusing on just the data object alone.


## 3 - Vuejs Dirrectives

Another major part of the vuejs framework is making use of something called a directive. Simply put a directive is a way to tell vuejs to prefrom a certain kind of action with a given element. There a whole bunch of built in directives such as the bind directive that can be used to bind a value in the vue data object as the value for an element attribute. There are then a wide range of other directives for prefroming all kinds of other actions an elements, so in this section I will be breefly mentioning each directive that I have wrote a post on thus far, and link to that post in the header of course. 

### 3.1 - [The v-bind directive](/2019/05/31/vuejs-bind)

The v-bind directive is what I would use if I want to bind the value of a property in the vue data object as a value for an attabute of an element or component in a template.

## 4 - Conclusion

In this post I am focusiong on just going over the vuejs framework by itself, but just working out simple little hello world type examples for each little feature of the framework. There is a whole lot to do when it just comes to learning the basics of the framwork that are required in order to move on to making some real projects with vuejs. However once one gets the hang of the basic of vuejs the only thing left to do at that point is to move on to working on some actual real [vuejs examples](/2021/02/04/vuejs-example/) that are games, apps, and features that can be used in such things.

I get around to editing my content on vuejs every once in a while, and when I do so I should also get around to editing and expansing this post when doing so. I did not get to every little detail that should be covered in a post such as this, but much of my content on vuejs needs to be updated and expanded, and I have a lot of other content that needs attention also.

