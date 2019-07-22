---
title: The Node Crypto pbkdf2 method
date: 2019-07-08 11:54:00
tags: [node.js]
layout: post
categories: node.js
id: 501
updated: 2019-07-22 09:19:56
version: 1.9
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

## 2 - The salt value

The [salt value](https://en.wikipedia.org/wiki/Salt_(cryptography)) is a way to provide an additional input on top of the password so that a different key will result for the same password. It makes sense to do this as one of the typical use case scenarios with this method is to hash a database of passwords. In the event that one hash is cracked all instances of the same password are not necessary compromised given that a unique salt is used each time a password is hashed.

```js
let crypto = require('crypto');
 
// hast it function that just takes a 
// password and a salt value with hard coded
// values for everything else
let hashIt = (pw, salt) => {
    let i = 10000,
    len = 16,
    digest = 'sha512';
    if (!pw) {
        return Promise.reject('invalid password');
    }
    if (!salt) {
        return Promise.reject('salt must be given');
    }
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(pw, salt, i, len, digest, (e, key) => {
            if (e) {
                reject(e)
            } else {
                resolve({
                    key: key,
                    salt: salt
                });
            }
        });
    });
};
 
// the same password results in different keys
hashIt('weak123', '10000000')
.then((result) => {
    console.log(result.key.toString('hex'));
    // c64152a63e3c35710ee22e6cf598801a
});
hashIt('weak123', 'pu77fbaz')
.then((result) => {
    console.log(result.key.toString('hex'));
    // fa5e869e389ff97f7a00bde481a91ae5
});
```

There is still the concern of storing the salt, and doing so in the same database as the hashed passwords. Still the use of salts does help to slow the process down, and make things more complicated.

The salt value should be unique for each password event when the password is the same like in the above example. In a real project a hash could be randomly generated, or can just be the user name of the account for example. Same as with passwords the longer the better though, as all of this is about buying time when it comes to brute force attacks.

## 3 - iterations

```js
let crypto = require('crypto');
 
let hashIt = (i) => {
 
    let pw = 'foobar',
    salt = '1234',
    len = 16,
    digest = 'sha512';
 
    let st = new Date();
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(pw, salt, i, len, digest, (e, key) => {
            let et = new Date();
            if (e) {
                reject(e)
            } else {
                resolve({
                    key: key,
                    salt: salt,
                    st: st,
                    et: et,
                    time: et - st
                });
            }
        });
    });
};
 
hashIt(100)
.then((result) => {
    console.log(result.key.toString('hex'));
    console.log(result.time);
// 7516922ba2f536c4efca1f1dc418fbcb
// 0
});
hashIt(1000000)
.then((result) => {
    console.log(result.key.toString('hex'));
    console.log(result.time);
// 2e2cb3ccffb9bc6b31bce711e581bbfb
// 3296
});
```