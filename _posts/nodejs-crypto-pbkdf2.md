---
title: The Node Crypto pbkdf2 method
date: 2019-07-08 11:54:00
tags: [node.js]
layout: post
categories: node.js
id: 501
updated: 2019-07-20 20:12:49
version: 1.4
---

This is a post on the Node Crypto module [pbkdf2 method](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback) in nodejs. So [pbkdf2](https://en.wikipedia.org/wiki/PBKDF2) stands for Password Based Key Derivation Function 2, and is a method that can be used to create a key that is to be used with a node crypto module method like createCipheriv.

<!-- more -->

## 1 - pbkdf2 in a nut shell

```js
let crypto = require('crypto');
 
let genKey = (pw, salt, len) => {
    pw = pw || 'foo';
    salt = salt || 'bar';
    len = len || 16;
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(pw, salt, 100, len, 'sha512', (e, key) => {
            if (e) {
                reject(e);
            } else {
                resolve(key)
            }
        });
    });
};
 
genKey()
.then((key) => {
    console.log(key.toString('hex'));
})
.catch ((e) => {
 
    console.log(e.message);
 
});
```