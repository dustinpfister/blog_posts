---
title: Named arguments for python scripts uisng the argparse standard librray
date: 2021-01-19 13:06:00
tags: [python]
categories: python
layout: post
id: 784
updated: 2021-01-19 13:12:53
version: 1.0
---

When learning a new langauge that can be used to create scripts that can be called from the command line one of the first things that I like to learn is how to access any positional argumnets that might have been given when the script was called. If I do just want to check positional argumnets then there is just using the sys librarys argv property to do so. However therer should be a way to parse named argumnets with a built in libraray or therer should at least be a decent user space options when it comes to parsing named options.

WHen it comes to option parsers in some programing lanagues I have to look for a user space option, or even go so far as to create and maintain my own options parser. This is, or at least as of this writing was the case when it comes to nodejs, as such I would go with a user space npm package for option parsing such as commander, or yargs. However one nice thing about writing scripts with python is that there is a great built in option parser called argparse.

<!-- more -->
