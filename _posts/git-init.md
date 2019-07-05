---
title: Git init command for starting new git folders
date: 2019-07-05 18:17:00
tags: [git,node.js]
layout: post
categories: git
id: 499
updated: 2019-07-05 18:27:17
version: 1.1
---

The git init command can be used to create a new git folder, there is also the git clone command that can be used to make a copy of an existing git folder as well. In this post I will be going over some of the basics when it comes to creating new git folders, there is not much to it when it comes to the basics. However I thought I would make a quick post on this subject just for the heck of it sense I am expanding my content on git as of late. So lets get this one oit of the way so I can get on to more advanced posts on git and source control.

<!-- more -->

## 1 - git init create git folder example

To get started with git init the first thing that I need to do is just create a folder. Once I have a folder I just need to cd into and make that new folder the current working directory. When inside the new folder that i want to make a git folder I just need to call the git init command with no additional arguments and that will result in the creating of a new git folder.

```
$ mkdir project_folder
$ cd project_folder
$ git init
```