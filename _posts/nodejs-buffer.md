---
title: Buffers in node.js
date: 2018-02-07 22:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 147
updated: 2021-03-19 13:57:29
version: 1.24
---

When [node.js](https://nodejs.org/en/) was first developed there where no typed arrays such as [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) to help work with binary data. As such [Buffer](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html) was introduced to help work with binary data in a node.js environment. Buffers are something that I run into when working with streams, ether file io streams, or from http requests. In any case Buffers are helpful when doing anything that involves working with raw binary data. So lets take a look at some examples of buffers in node.js.

<!-- more -->

## 1 - nodejs buffer global and what to know before continuing

THis is a post on using buffers in nodejs to work with binary data in a node.js environment. There is a lot to know about when working with buffers, such as how to create them in the first place, and how it has changed compared to older versions of node.js. Anyway I hope that you have at least some background with node.js, and javaSciprt in general, as I will not be coving the basics of those topics here.

In this post I was using nodejs 8.x LTS which at the time of this writing is still supported, but it coming to the end of its support cycle. If you are using an older or newer version of nodejs what is written here may not be applicable.

## 2 - New buffers more than one way to do it

So lets start out with some very basic examples of buffers that have to do with just creating a new buffer. There is a [post that I wrote on this very topic of creating new buffers](/2019/06/17/nodejs-buffer-new/), but in this section I will be going over a few example here. There is more than one way to make them, and in both safe, and unsafe ways as well. There is also the old way of making them that you might only bother with if you are still using a real old version of node.js for some reason. So lets get started with some buffer hello world examples of making a new buffer instance in nodejs.

### 2.1 - The old way of doing it (do not do it unless for some reason you have to)

So the old way of making a buffer was to use the Nodejs Buffer global like that of any old jaavScript constructor method. In other words like that of the Date constructor that is used with the new keyword to create a new instance of Date. I call Buffer with the new keyword, and pass whatever it is that I want placed in a buffer.

```js
var buff = new Buffer('this is how it once was');
 
console.log(buff);
// <Buffer 74 68 69 73 20 69 73 20 68 6f 77 20 69 74 20 6f 6e 63 65 20 77 61 73>
```

This should not be used any more unless for some reason you are using a real old version of node.js that does not support the newer ways to make a buffer, in which case I guess you have to. This way of creating a new buffer still shows up a lot with code examples on the open web, but it does open up some security concerns, and it has been deprecated when it comes to more modern versions of nodejs. I will not be getting into this in detail in this post as I have done so in [another post](/2019/06/17/nodejs-buffer-new/) on creating a new buffer with the new keyword, you can check that out if you want to.

### 2.2 - Using Buffer.from to create a new buffer.

As of late (node 8.x+) it is advised to not use the Buffer constructor directly, in fact doing so is depreciated, instead when dealing with buffers the various methods of Buffer are what should be used in order to work with buffers. For example the buffer from method works great for quickly creating a new buffer with an initial value that is derived from a string.

```js
let buff = Buffer.from('hello buffer!');
 
console.log(buff);
// <Buffer 68 65 6c 6c 6f 20 62 75 66 66 65 72 21>
 
console.log(buff.toString());
// 'hello buffer!'
```

So then [Buffer.from](/2019/07/19/nodejs-buffer-from/) is one such method and in most cases however maybe it is desired to create a blank buffer that is filled with zeros, or maybe you do not event want to do that. That being said there are of course other options such as Buffer.alloc, and Buffer.allocUnsafe.

### 2.3 - Buffer.alloc can be used for safe allocation of memory for a buffer

The Buffer.alloc method is great for just setting up a buffer of a fixed byte size in a safe way that will assure that noting old in memory will end up being part of the buffer.

```js
let buff = Buffer.alloc(4);
 
console.log(buff);
// <Buffer 00 00 00 00>
 
buff = Buffer.alloc(5,'hello','ascii');
 
console.log(buff);
// <Buffer 68 65 6c 6c 6f>
```

If I want to I can also give a string to pre fill the buffer with, and give a character encoding to observe when parsing the string to a buffer.

### 2.4 - Using Buffer.allocUnsafe for faster, but unsafe buffers

So it might be fun to play around with unsafe buffers to see if I can make sense of old data in memory, and find out if they really are unsafe. I can understand why in theory at least, and it is not to hard to reproduce why. Just try out on yourself, and then look at what you get, a whole bunch of old data in memory. Compare that to what happens when you just use Buffer.alloc, and you get nothing but zeros.

```js
let oldData = Buffer.allocUnsafe(256);
 
console.log(oldData);
// <Buffer 08 00 00 00 07 00 00 00 70 6c dc 90 
// b1 02 00 00 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 08 00 00 00 30 f0 
// b7 bd f7 7f 00 00 01 00 ... >
 
let safeBuff = Buffer.alloc(256);
 
console.log(safeBuff);
// <Buffer 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 ... >
```

## 3 - Buffers are array like

It turns out that buffers are yet another example of a kind of object in javaScript that is array like. What I mean by array like is that they are not really arrays, but because they kind of are like arrays, I can get away with using some array methods on them by using call, or apply. They then also have a length property as well, however the length property will give me the size of the array, rather than the number of elements if it was an array.

```js
let buff = Buffer.from('ABCD');
 
Array.prototype.forEach.call(buff, function (currentByte) {
 
    console.log(currentByte);
 
});
 
/*
65
66
67
68
*/
 
buff = Buffer.alloc(4);
 
buff[1] = 0x65;
 
console.log(buff); // <Buffer 00 65 00 00>
```

## 4 - concatenating buffers

Concatenating buffers is just a matter of using Buffer.concat. This method works bu just calling it, and passing it an array of two or more buffers. The method will figure out the length of the new buffer that will be returned, this will take a little overhead as you might expect, so if you do know what the length of the result will be before hand it would make sense to pass that as the second argument when calling the method.

```js
let buffs = [
   Buffer.from('this '),
   Buffer.from('might '),
   Buffer.from('work')
];
 
let len = buffs.reduce(function(acc,buf){ return {length: acc.length + buf.length};}).length;
 
// this will of course work
let buff = Buffer.concat(buffs,len);
console.log(buff);
// <Buffer 74 68 69 73 20 6d 69 67 68 74 20 77 6f 72 6b>
 
// I can just give the buffers as well
// this still figures out the length though
// so if it is know, the value should be passed
buff = Buffer.concat(buffs);
console.log(buff);
// <Buffer 74 68 69 73 20 6d 69 67 68 74 20 77 6f 72 6b>
 
// This will of course just result in the first six bytes
buff = Buffer.concat(buffs, 6);
console.log(buff);
// <Buffer 74 68 69 73 20 6d>
```

## 5 - Encoding

It is possible to set the encoding that should be used when making a buffer. This can be important when say, creating a buffer from a string that contains characters that are above the ascii range. The number of bytes that a character takes up is different depending on the character encoding. The ascii character encoding is easy to understand, because it is just a single byte per character, however that is not how Unicode works. With Unicode that number of bytes can range from one upwards depending on what the character is.

```js
//let dp = [0xe2, 0x82, 0xaf];
 
// text containing Drachma sign
let text = '\u20af';
 
// ascii encoding
let ascii = Buffer.from(text,'ascii');
 
// utf-8 encoding
let utf8 = Buffer.from(text,'utf-8');
 
console.log(ascii);
// <Buffer af>
 
console.log(utf8);
// <Buffer e2 82 af>
```

## 6 - File io examples

So one of the big things about buffers is that they comes up a lot when working with files. When using the file system module, or any kind of readable, writable, or duplex stream involving data from the file system buffers are the node.js standard way of working with binary data stored in on then hard drive. So lets take a look at a few examples that involve files\

### 6.1 - Readable streams

So when it comes to reading a file using the fs.createReadStream method in the file system module, this will result in a readable stream. This has some events that can be used to define a callback that will fire each time some more chunks of data come along in the readable stream. The chunks are of course instances of buffer, and now that we know a thing or two about buffers we should have no problem working with them when it comes to doing something with a readable stream.

```js
let fs = require('fs'),
 
buff = Buffer.alloc(0);
 
// start a read stream for a test.txt file
fs.createReadStream('test.txt')
 
.on('data', function (chunk) {
 
    // concatenate buff, and chunk both of which are buffers
    buff = Buffer.concat([buff, chunk], buff.length + chunk.length);
 
})
 
.on('end', function () {
 
    console.log(buff.toString());
 
})
```

### 6.2 - writable streams

There is of course writable streams as well, for example when using the fs.createWriteStream method, a buffer can be given as an argument to the write method. When creating, or appending a file.

```js
let fs = require('fs'),
 
// start a write stream in a+ mode
file = fs.createWriteStream(process.argv[2],{flags:'a+'});
 
// write to the file with a buffer
file.write(Buffer.from(process.argv[3]));
 
// end
file.end();
```

With this example I can use this script from the command line like this if it is called write.js, and the above example on read streams is called read.js.

```
$ node write test.txt "this is only a test"
$ node read
this is only a test
$ node write test.txt " looks like it is working okay"
$ node read
this is only a test looks like it is working okay
```

## 7 - How to find out if you are dealing with a buffer

So if you are testing a whole bunch of values to find out if a value is a buffer or not there is the [native is buffer](/2019/10/30/nodejs-buffer/) method of the buffer global. Just call the method and pass a value that is to be tested, and it will return true if the value is a buffer.

```js
let buff = Buffer.from('0a0b0c0d', 'hex');
 
console.log(Buffer.isBuffer(buff)); // true
```

After doing a basic test of this method it would appear that it works as expected, at least with all the values I passed to it. So it would seem that the is buffer method in node works as expected and there is not much of any need for a user space solution for this one.

## 8 - Conclusion

I hope you found this post on buffers a little helpful, if you did not know much about them before hand. If you enjoyed reading this post you might want to also check out my post on using [request to work with streams](/2018/08/15/nodejs-request-streams/) when scripting http. Buffers do come up a lot when it comes to working with file io, streams, and just about anything that has to do with binary data, so this is one aspect of node.js development that developers should get solid.