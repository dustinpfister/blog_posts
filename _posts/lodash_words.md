---
title: Get an array of words from a string using Lodash or native javaScript AKA Lexical Analysis Tokenization
date: 2019-09-17 14:10:00
tags: [lodash]
layout: post
categories: lodash
id: 535
updated: 2019-09-17 14:23:57
version: 1.2
---

In lodash there is the words method that can be used to quickly prefrom lexical analysis tokenization of a string. In other words the lodash words method is used to split a string into an array of words. In some cases this could be easily done with the split method, but it is not always so cut and dry. There are text samples that might contain certain characters that are to be cut out or included in the process for example. So that being said there is a need for some kind of Tokenizer method that is better suited for the task of creating an array of words from a text sample.

<!-- more -->

## 1 - The javaScript get words method in lodash

If The full lodash version of lodash is part of the stack of the project that you are working on there is the \_.words method that can be used to quickly get an array of words from a text sample in a string. The default pattern that is used should work okay in most situations, but if for some reason it does not it is possible to override that pattern by passing a pattern to use as the second argument when using the method.


So for the most part the lodash words method works okay as a basic javaScript get words method if you prefer to just call it that, but it might also be referred to as a lexical analysis tokenizer method that is something that comes into play of course when it comes to getting into lexical analysis when can be an interesting topic.
