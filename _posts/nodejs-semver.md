---
title: node semver
date: 2019-09-10 20:54:00
tags: [node.js]
layout: post
categories: node.js
id: 533
updated: 2019-09-11 14:08:04
version: 1.1
---

Thought I would write a quick post on semver the nodejs npm package that helps with the [semver.org Semantic Versioning standard](https://semver.org/) for version numbers. If you are planing to make a serious nodejs project it is a good standard to at least be somewhat aware of. For many not so serious projects I still conform to it as to many other developers. Even if you do not wish to conform to the standard there are still many concerns when it comes to making a project that involves a public API of some kind. Making any changes to a public API might result in code breaking in any and all projects that depend on it for example. So learning a thing or two about the standard, can help with concerns that will arise as a project is maintained.

<!-- more -->

