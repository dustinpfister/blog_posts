---
title: The Crypto CreateCipheriv method in node.js
date: 2018-08-16 08:18:00
tags: [js,node.js]
layout: post
categories: node.js
id: 261
updated: 2018-08-16 08:25:03
version: 1.0
---

In [node.js](https://nodejs.org/en/) there is the [crypto.createCipheriv](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options) method than can be used to create an return a cipher object for the purpose of encrypting data. It is typically used as a way to better secure web traffic, but it can also be used as a way to encrypt files on your computer as well. In this post I will be coving some examples of using this method to do just this.

<!-- more -->
