---
title: The cmd standard library in python
date: 2021-02-22 12:57:00
tags: [python]
categories: python
layout: post
id: 808
updated: 2021-02-22 14:38:08
version: 1.3
---

This week I think I will get back into making some simple python examples, and I think many of them should be basic simple command line tools and games. So in order to make such examples I think I should start with at least a few basic examples of the cmd standard library that is built into python. This library can be used to create a simple command line prompt that will allow for me to interact with a python script from the command line.

The basic use case of the cmd library seems to be to create a class that builds on top of the Cmd class that is given by the library. There are a number of methods in this class that can be over writen, or left to there default behaviour. For example there is the empty line method of the cmd class that by default will call the last command called when an empty line command is called. This might be okay in some situations but I like to make it so that the help menu will print when an empty line command is given.

<!-- more -->

## 1 - The cmd librray basics

In this section I will be starting out with just some very simple copy and past one file examples of the cmd library that will help to show the basics of how to go about using this cmd library to create an interactive command line interface for a python script.