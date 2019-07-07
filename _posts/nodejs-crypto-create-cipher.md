---
title: Getting started with Node Crypto CreateCipher method with basic examples and more
date: 2019-07-06 08:49:00
tags: [node.js]
layout: post
categories: node.js
id: 500
updated: 2019-07-07 12:12:53
version: 1.7
---

In todays post I will be writing about the [CreateCipher](https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password_options) method in the [Nodejs Crypto](https://nodejs.org/api/crypto.html) module. This method and the corresponding [createDecipher](https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password_options) method is a great starting point when it comes to getting started with encryption using nodejs, however when it comes to making an actual real project it might be best to go with the [createCipheriv](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options) method as that gives more control over the creation of the key, and iv variable. In addition in late versions of nodejs it would appear that this method is now depreciated in favor of createCipheriv. Still in this post I will be going over some quick examples when it comes to simple encryption using nodejs.

<!-- more -->

## 1 - Use the Node Crypto method CreateCipheriv if you aim to make a real project that makes use of encryption in node.js

Depending on your experience with node, the crypto module, and the version of node that you are using. The createCipher method might be a good starting point because of the ease of making a key. The reason why is I just need to give a password and then the createCipher method makes a key and iv value for me based off of that password. However this is also its downfall as well, and the CreateCipheriv method gives a greater deal of control over these values. So in any kind of actual professional software package it would be a better move to go with that method. I have a corresponding post on the CreateCipheriv that might be worth checking out.

## 2 - The Node Crypto CreateCipher basic example using the update and final methods

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

### 2.1 - Now to decipher

```js
let crypto = require('crypto'),
algorithm = 'aes192',
password = process.argv[2] || 'password1234',
cipher = crypto.createCipher(algorithm, password),
decipher = crypto.createDecipher(algorithm, password),
hex = cipher.update('This is something I want encrypted', 'utf8', 'hex');
hex += cipher.final('hex');
console.log(hex);
 
// the hex can be deciphered in a similar way
let str = decipher.update(hex, 'hex', 'utf8');
str += decipher.final('utf8');
console.log(str);
```

## 3 - Streams and Node Crypto Create Cipher

### 3.1 - createCipher

```js
let crypto = require('crypto');
 
let CryptIt = (text, algorithm, password) => {
    let hex = '';
    algorithm = algorithm || 'aes192';
    password = password || '1234-spaceballs';
    if (text === undefined) {
        return Promise.reject('no text given');
    }
    return new Promise((resolve, reject) => {
        let cipher = crypto.createCipher(algorithm, password);
        cipher.on('readable', () => {
            let data = cipher.read();
            if (data) {
                hex += data.toString('hex');
            }
        });
        cipher.on('end', () => {
            resolve(hex);
        });
        cipher.on('error', (e) => {
            reject(e.message);
        });
        cipher.write(text);
        cipher.end();
    });
};
 
CryptIt('hello there yes this is a stream.')
.then((hex) => {
    console.log(hex);
})
.catch ((e) => {
    console.log(e);
})
```

### 3.2 - CreateCipher and CreateDecipher

```js
let crypto = require('crypto');
 
let Crypter = (textHex, mode, algorithm, password) => {
 
    algorithm = algorithm || 'aes192';
    password = password || '1234-spaceballs';
    mode = mode || 'cipher';
 
    // give a rejected promise if no input is given
    if (textHex === undefined) {
        return Promise.reject('no input given');
    }
 
    // output string
    let out = '';
 
    // encodings for input and output
    let encoding = {
        input: 'utf8',
        output: 'hex'
    }
 
    // create the cipher or decipher,
    // and set appropriate encodings
    // depending on mode
    let Create = crypto.createCipher;
    if (mode === 'decipher') {
        Create = crypto.createDecipher;
        encoding.input = 'hex';
        encoding.output = 'utf8';
    }
    let cipher = Create(algorithm, password);
 
    // return a promise
    return new Promise((resolve, reject) => {
        cipher.on('readable', () => {
            let data = cipher.read();
            if (data) {
                out += data.toString(encoding.output);
            }
        });
        cipher.on('end', () => {
            resolve(out);
        });
        cipher.on('error', (e) => {
            reject(e.message);
        });
        cipher.write(textHex, encoding.input);
        cipher.end();
    });
 
};
 
// works of cipher and decipher
Crypter('hello there yes this is a stream.')
.then((hex) => {
    console.log(hex);
    return Crypter(hex, 'decipher');
})
.then((str) => {
    console.log(str);
})
.catch ((e) => {
    console.log(e);
})
```