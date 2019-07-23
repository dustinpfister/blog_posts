---
title: lodash is a bunch of things
date: 2019-07-23 11:48:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 507
updated: 2019-07-23 14:54:15
version: 1.1
---

[Lodash is](https://lodash.com/docs/4.17.14) a javaScript utility library based of another similar library known as underscore. These days much of the functionality in lodash is baked into native javaScript itself, but it is still not a dead library just yet as well. In any case there is much that branches off from lodash, even if you use exclusively use native javaScript methods in place of a lodash equivalents, often there was a time in the past that the native method was not there. Depending on the environment you are developing for you might still want to use lodash as a safety net of sorts. Also even if you do kick lodash to the curb, lodash is still a framework worth studying if you feel compelled to do so. In this post I will be writing about what lodash is, as there is more than one way to describe what lodash is to begin with.

<!-- more -->

## 1 - lodash is a utility library

One way to go about describing what lodash is would be to say that it is a utility library. However calling it just that by itself is very vague, as a utility library can be a great many different things that provides all kinds of different sets of functionality.

## 2 - lodash is a functional programing library

Saying that lodash is a functional programing library is another way one could go about defining what lodash is. However it might still require a little elaboration beyond just saying that. Functional programing is a style of programing in which a functions output is the result of only its arguments. The same arguments will aways result in the same result being returned in so called pure functions that follow this functional programing rule. This is on contrast to imperative programming in which something weird involving application state, the scope chain or a class instance could result in a different result being returned even when called with the same arguments.