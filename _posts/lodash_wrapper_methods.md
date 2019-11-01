---
title: lodash wrapper methods
date: 2019-11-01 17:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 554
updated: 2019-11-01 17:38:40
version: 1.0
---

A wrapper method is a simple kind of method that just gives and alternative interface for using a method that is all ready in place. In other words a wrapper method does not really have any functionality of its own, it just accepts input and then uses that input for another method that actually does something. In lodash there are a few wrapper methods, that are methods that just make use of native vanilla javaScript methods. It would be different if these methods feature tested for a native method and use that if available, and then used another javaScript solution if that native method is not there. However in late versions of lodash a few methods are just straight up referencing native javaScript methods.

<!-- more -->

