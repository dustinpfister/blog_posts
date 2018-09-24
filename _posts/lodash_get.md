---
title: Get an object value by path with the \_.get Object method in lodash
date: 2018-09-24 14:24:00
tags: [js,lodash]
layout: post
categories: lodash
id: 286
updated: 2018-09-24 14:36:20
version: 1.1
---

So it is time for yet another lodash post, this time on the \_.get method which oddly enough I have not wrote about yet. The \_.get method allows me to get a value from an object by passing the object, and then a path in string format to the value that I want. I can also pass an optional default value to the method in case the path to the value is undefined. It might also be a good idea to explore some other options for quickly getting values from an object in javaScript as well, so I will be writing about some vanilla js alternatives to \_.get as well.

<!-- more -->

## 1 - What to know about \_.get, lodash and javaScript

This is a post on the \_,get method in lodash which is one of the many object methods in lodash that help with many common tasks when developing a project with lodash. These days there is much chatter on the relevance of lodash with much of the functionality of lodash now baked into core javaScript itself, so I often cover vanilla js alternatives to the method in question as well when it comes to writing these posts. In any case this is not a getting started post on lodash, or javaScript in general so I assume that you have at least some background on these topics and are now interested in exploring all of the methods in detail, along with vanilla js alternatives.