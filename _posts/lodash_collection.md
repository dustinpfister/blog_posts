---
title: lodash collection methods, and working with collection in general with javaScript
date: 2022-01-14 09:57:00
tags: [lodash]
layout: post
categories: lodash
id: 951
updated: 2022-01-14 10:09:54
version: 1.2
---

This month I have been focusing on [lodash](https://lodash.com/), mostly in terms of editing my older content on the subject, but also writing a few new posts where and when I think doing so is needed. With that said I have not wrote a post centered around the [subject of collections](https://en.wikipedia.org/wiki/Collection_%28abstract_data_type%29), and so called collection methods and how they compare to say [arrays methods in lodash](/2019/02/14/lodash_array/).  So in todays post the focal point will be collections, the various methods in lodash that work with collections, and also how to work with collections in general outside of lodash when it comes to working with javaScript by itself.

When it comes to arrays in javaScript and array can be though of as a kind of collection, this is because an array is zero or more elements and each element is often of a given type. When it comes to regular javaScript arrays any element can be any given type, but there are also  typed arrays where all elements are a single type. However anyway each element in the array typically has some kind of shared significance that is relevant to an over all problem, and this array needs to be acted on with various kinds of methods that preform actions on this array such a filtering.

<!-- more -->
