---
title: The javaScript Object freeze method as well as seal and define property
date: 2020-05-08 18:13:00
tags: [js]
layout: post
categories: js
id: 656
updated: 2020-05-08 18:18:04
version: 1.0
---

In the Core javaScript Object class there is the freeze Object static method that can be used to freeze an object at which point none of the value of the object can be changed. There is however also the seal static method that is also of interest that is a little different. The seal method does not freeze and object, however it does make it so no additional properties can be added to the object. There is set another static method that is relevant to this topic and that is the define property static method of the Object class. These three static methods allow for the creation of objects that have a strict set of conditions regarding the properties of an object.

<!-- more -->
