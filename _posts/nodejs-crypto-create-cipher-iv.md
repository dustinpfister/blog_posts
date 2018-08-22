---
title: The Crypto CreateCipheriv method in node.js
date: 2018-08-16 08:18:00
tags: [js,node.js]
layout: post
categories: node.js
id: 261
updated: 2018-08-22 19:03:39
version: 1.3
---

In [node.js](https://nodejs.org/en/) there is the [crypto.createCipheriv](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options) method than can be used to create an return a cipher object for the purpose of encrypting data. It is typically used as a way to better secure web traffic, but it can also be used as a way to encrypt files on your computer as well. In this post I will be coving some examples of using this method to do just this.

<!-- more -->

## 1 - What to know before hand

This is a post on the crypto.createCipheriv method in the node.js built in crypto module, as well as some related methods, and topics. In this post I am also using streams as well. This is not a comprehensive post on the crypto module as a whole, as well as with related skills necessary to get something of value from this post.

## 2 - A basic File encryption tool example

For an example of the createCipheriv method I made two quick scripts that can be used to encrypt, and decrypt a file using crypto.createCiper, and crypto.createDecipheriv. These will be simple cli scripts than can be used to encrypt, and decrypt these files from the command line.

### 2.1 - My code-file.js file that uses crypto.createCipheriv to encode a file

```js
let crypto = require('crypto'),
path = require('path'),
fs = require('fs');
 
// Cipher Suites, key, and the iv
let a = 'aes-256-cbc',
key = Buffer.alloc(32), // key should be 32 bytes
iv = Buffer.alloc(16), // iv should be 16
 
filename = process.argv[2] || 'test.txt',
bName = path.basename(filename, path.extname(filename)),
passwd = process.argv[3] || '1234-spaceballs',
outfile = bName + '.coded';
 
// make the key something other than a blank buffer
key = Buffer.concat([Buffer.from(passwd)], key.length);
 
// randomize the iv, for best results
iv = Buffer.from(Array.prototype.map.call(iv, () => {return Math.floor(Math.random() * 256)})),
 
// make the cipher with the current suite, key, and iv
cipher = crypto.createCipheriv(a, key, iv);
 
// read test.txt
fs.createReadStream(filename)
 
// pipe to cipher
.pipe(cipher)
 
// pipe to writer
.pipe(fs.createWriteStream(outfile)
 
.on('close', ()=> {
 
    console.log(outfile + ' has been coded with: ');
    console.log('key:');
    console.log(key.toString('hex'));
    console.log('iv');
    console.log(iv.toString('hex'));
 
    fs.writeFile(bName + '-keys.json',
 
        // this will be the json
        JSON.stringify({
            key: key.toString('hex'),
            iv: iv.toString('hex')
        }),
 
        // callback
        (e)=> {
 
            if (e) {
 
                console.log('error writing keys.json');
 
            } else {
 
                console.log('keys.josn written');
 
            }
 
        }
 
    );
 
}));
```
