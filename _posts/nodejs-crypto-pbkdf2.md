---
title: The Node Crypto pbkdf2 method
date: 2019-07-08 11:54:00
tags: [node.js]
layout: post
categories: node.js
id: 501
updated: 2019-07-20 20:38:34
version: 1.5
---

This is a post on the Node Crypto module [pbkdf2 method](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback) in nodejs. So [pbkdf2](https://en.wikipedia.org/wiki/PBKDF2) stands for Password Based Key Derivation Function 2, and is a method that can be used to create a key that is to be used with a node crypto module method like createCipheriv.

<!-- more -->

## 1 - pbkdf2 in a nut shell

So even a basic example of the pbkdf2 will require using all the arguments unless it is wrapped. The first argument is the desired password, followed by a salt value. Then an iterations value that should be at least 10000 maybe, I say that because there is no clear standard for this value but the higher the number the more secure they resulting key will be. However the higher the number for the iterations value the more secure the resulting key will be. The next argument is the byte length for the key, and then the desired hash or digest to use. Then finally a callback that will give an error object if something goes wrong for the first argument and the resulting key as the second argument of all goes well.

```js
let crypto = require('crypto');

let pw = 'spaceballs-1234',
salt = 'lone-star',
i = 10000,
len = 16,
digest = 'sha512';

crypto.pbkdf2(pw, salt, i, len, digest, (e, key) => {
    console.log(key.toString('hex'));
    // b90854ed18358d7aa5cd70691f2337f4
});

```