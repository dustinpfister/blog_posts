---
title: The Crypto CreateCipheriv method in node.js
date: 2018-08-16 08:18:00
tags: [js,node.js]
layout: post
categories: node.js
id: 261
updated: 2019-07-07 12:42:52
version: 1.9
---

In [node.js](https://nodejs.org/en/) there is the [crypto.createCipheriv](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options) method than can be used to create an return a cipher object for the purpose of encrypting data. It is typically used as a way to better secure web traffic, but it can also be used as a way to encrypt files on your computer as well. In this post I will be coving some examples of using this method to do just this.

<!-- more -->

## 1 - What to know before hand

This is a post on the crypto.createCipheriv method in the node.js built in crypto module, as well as some related methods, and other topics. In this post I am also using streams as well. This is not a comprehensive post on the crypto module as a whole, as well as with related skills necessary to get something of value from this post. I also have a post on the [createCipher method](/2019/07/06/nodejs-crypto-create-cipher/) as well, this post might be a good starting point with the crypto module, but it is best to use the CreateCipheriv method.

## 2 - A basic File encryption tool example

For an example of the createCipheriv method I made two quick scripts that can be used to encrypt, and decrypt a file using crypto.createCiper, and crypto.createDecipheriv. These will be simple cli scripts than can be used to encrypt, and decrypt these files from the command line.

So this example will contain two files code-file.js, and decode-file.js. As the names suggest one will be used to encrypt a file, and the other to decode it. The code-file.js will generate a key, and iv to be used for the encryption, and the keys will be saved in a jsone file for easy decryption by decode-file.js.

### 2.1 - My code-file.js file that uses crypto.createCipheriv to encode a file

The code-file.js workw by giving a filename of a file that I want to encrypt, as well as a string that will be used for the key. This file will then use the string that is given to make a key, and generate an iv as well. The key, and iv will then be used to encode the file with the crypto.createCipheriv method.

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

### 2.2 - The decode-file.js file that can be used to decode a file that was encoded with code=file.js

So then there is the decode-file.js file as well that can be used to decode a file back into its original state. This file works by reading the corresponding json file that should exist depending on the filename.

```js
let crypto = require('crypto'),
path = require('path'),
fs = require('fs');
 
// Cipher Suites, key, and the iv
let a = 'aes-256-cbc',
filename = process.argv[2] || 'test.coded',
bName = path.basename(filename, path.extname(filename));
 
// read the key.json file
fs.readFile(bName + '-keys.json', (err, data)=> {
 
    // keyfile will default to an empty object
    let keyFile = {}
 
    if (err) {
 
        // if error logg it
        console.log('error reading keys.json file');
 
    } else {
 
        // else parse the JSON
        try {
 
            keyFile = JSON.parse(data);
 
        } catch (e) {
 
            console.log(e);
 
        }
 
    }
 
    // use key, and iv given from the command line first if given, else use anything from a file, else default to hard coded values
    let key = Buffer.from(process.argv[3] || keyFile.key || '313233342d737061636562616c6c730000000000000000000000000000000000', 'hex'),
    iv = Buffer.from(process.argv[4] || keyFile.iv || '00000000000000000000000000000000', 'hex'),
 
    // make the cipher with the current suite, key, and iv
    cipher = crypto.createDecipheriv(a, key, iv);
 
    // read test.txt
    fs.createReadStream(filename)
 
    // pipe to cipher
    .pipe(cipher)
 
    // pipe to writer
    .pipe(fs.createWriteStream(bName + '.decoded'))
 
    // when done decoding
    .on('close', ()=> {
 
        console.log(filename + ' has been decoded using:');
        console.log('key:');
        console.log(key.toString('hex'));
        console.log('iv');
        console.log(iv.toString('hex'));
    });
 
});
```