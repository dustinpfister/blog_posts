---
title: Get an object value by path with the \_.get Object method in lodash
date: 2018-09-24 14:24:00
tags: [js,lodash]
layout: post
categories: lodash
id: 286
updated: 2018-09-24 14:41:41
version: 1.2
---

So it is time for yet another lodash post, this time on the \_.get method which oddly enough I have not wrote about yet. The \_.get method allows me to get a value from an object by passing the object, and then a path in string format to the value that I want. I can also pass an optional default value to the method in case the path to the value is undefined. It might also be a good idea to explore some other options for quickly getting values from an object in javaScript as well, so I will be writing about some vanilla js alternatives to \_.get as well.

<!-- more -->

## 1 - What to know about \_.get, lodash and javaScript

This is a post on the \_,get method in lodash which is one of the many object methods in lodash that help with many common tasks when developing a project with lodash. These days there is much chatter on the relevance of lodash with much of the functionality of lodash now baked into core javaScript itself, so I often cover vanilla js alternatives to the method in question as well when it comes to writing these posts. In any case this is not a getting started post on lodash, or javaScript in general so I assume that you have at least some background on these topics and are now interested in exploring all of the methods in detail, along with vanilla js alternatives.

## 2 - A basic example of \_.get

So because these posts tent to be a little boring, why not living things up a little by making a basic example of \_.get game related? Say you have an Enemy Class for a game that you are making and you want to grab an nested object that that contains information about how and instance of an Enemy will heal over time if it is damaged. The lodash \_.get method could be used to snag it my path, and also return a default value if for some reason it is not there. Although it is also not to hard to just do so with plain javaScript as well, plus it might preform better, but bare with me its just a simple example here.