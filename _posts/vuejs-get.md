---
title: Creating a vue get method via plug-ins
date: 2019-11-13 10:13:00
tags: [vuejs]
layout: post
categories: vuejs
id: 562
updated: 2019-11-13 10:23:34
version: 1.1
---

There is a vue set global method in vuejs, but it is not what one might think compared to other frameworks. The vue set method is used to set reactive properties to an object, so there is not vue get global method, and no set or get method of any kind when it comes to Vue class instance methods.

So if I want a vue get method I need to add one via a plugin, and maybe this is best actually. One reason why is because a [vue get](https://vuejs.org/v2/guide/computed.html) method could be one of many things, the name is vague after all. A vue get method could be an instance method actually that gets an object key in the vue data object, and element in the template, or it cold be a very simple http client that just makes get requests. With that said I might want to make my own vue get method one, or maybe even all of those things depending on the nature of the project.

<!-- more -->


