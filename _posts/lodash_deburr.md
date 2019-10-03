---
title: lodash deburr and latin 1 Unicode car removal
date: 2019-10-03 15:50:00
tags: [lodash]
layout: post
categories: lodash
id: 541
updated: 2019-10-03 15:54:18
version: 1.0
---

When it comes to Unicode blocks there are the first few blocks that have to do with Latin characters. These kinds of characters come up now and then for cretin words that come from languages like Spanish. If for some reason I might be interested in just simply converting these kinds of strings into a string that contains just the first few ASCCI range characters I can used the lodash debuff method. This method in lodash just simply takes away any additional accent over a letter and just converts into a plain English style form of the word.

<!-- more -->

