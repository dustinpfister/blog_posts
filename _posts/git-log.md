---
title: Git log examples and nodejs scripts
date: 2019-05-29 11:18:00
tags: [git,node.js]
layout: post
categories: git
id: 465
updated: 2019-05-29 11:25:05
version: 1.1
---

The git log command can be used to log out a list of comment subject messages, commit hash numbers, and A wide range of other things about each commit in a git folder. It is a useful little command with many format options that can be useful when it comes to writing some kind of script that loops over all commits in a repository. There is just using the command by itself in the command line, and then there is piping it to something else, or better yet making a node.js script that uses it via the spawn method in the child process module. In this post I will be going over some quick examples of doing bolth.

<!-- more -->

## 1 - git log basic examples