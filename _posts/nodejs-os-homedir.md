---
title: Getting the home directory in nodejs
date: 2020-05-20 18:16:00
tags: [node.js]
layout: post
categories: node.js
id: 659
updated: 2020-05-20 18:19:45
version: 1.0
---

The home directory or user folder in an operating system is a folder for the current user. This folder is then a good place to park any kind of user specific settings or data when making a nodejs application. So then there should be some kind of standard way of getting a path to this folder in a way that will work across different operating systems. With that said there is in the nodejs built in os module, to which there is a method called homedir.

<!-- more -->

