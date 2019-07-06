---
title: Getting started with node Crypto CreateCipher method with basic examples and more
date: 2019-07-06 08:49:00
tags: [node.js]
layout: post
categories: node.js
id: 500
updated: 2019-07-06 10:22:24
version: 1.1
---

In todays post I will be writing about the CreateCipher method in the nodejs crypto module. This method and the corresponding createDecipher method is a great starting point when it comes to getting started with encryption using nodejs, however when it comes to making an actually project it might be best to go with the createCipheriv method as that gives more control over the creation of the key, and iv variable. Still in this post I will be going over some quick examples when it comes to simple encryption using nodejs.

<!-- more -->


## 1 - The node crypto CreateCipher basic example

```js
let crypto = require('crypto'),
cipher = crypto.createCipher('aes192', 'password1234');
// the cipher update method can be used to encrypt data
let hex = cipher.update('This is something I want encrypted', 'utf8', 'hex');
// the cipher.final method must be called to complete the process
hex += cipher.final('hex')
console.log(hex);
// 84808c0d587c6c1259e65054f6779c2ba5db0c95c594bed97118b8c718381dab7a87ad880b4fbf71f05a21980dc9f409
```
