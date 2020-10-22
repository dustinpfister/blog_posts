---
title: The node exec child process method
date: 2020-10-22 15:46:00
tags: [node.js]
layout: post
categories: node.js
id: 727
updated: 2020-10-22 15:46:37
version: 1.0
---

This nodejs example is a project that I wanted to start a long time ago, but kept putting off. It is a script that will use a git log command to get a list of commit hash ids from the latest commit on master. Once it has a list of commit hash ids it will use a git checkout command to switch to the oldest commit in the list. From there is will loop up back to the newest commit in the list again.

<!-- more -->
