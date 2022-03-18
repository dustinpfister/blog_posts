---
title: Resolve to an absolute path with the Linux realpath command as well as a few others
date: 2022-03-18 11:42:00
tags: [linux]
layout: post
categories: linux
id: 969
updated: 2022-03-18 11:45:56
version: 1.0
---

When writing a bash script or two I will often want to resolve a relative path to an absolute one. For this kind of task there is using the Linux dirname command to get a folder from a path that might contain a file in the path string, but the resulting path might end up being a relative path rather than and absolute one, so then there is piping that result to an additional command called the Linux realpath command.


<!-- more -->

