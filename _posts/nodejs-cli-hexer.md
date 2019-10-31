---
title: A node cli tool text to hex example
date: 2019-10-29 17:51:00
tags: [node.js]
layout: post
categories: node.js
id: 552
updated: 2019-10-31 19:13:42
version: 1.8
---

So for todays post a [node cli](/2019/10/23/nodejs-cli/) tool example from my on my node_cli_tools project I will be writing about a quick tool that I put together that can be used to convert a plain text file to a hex format. This kind of tool might come in handy when it comes to creating a collection of content that I want to store in a format that is not necessary encrypted, but is just in a format that is not human readable. The main use case is that I just want a simple tool that will convert markdown files for example into a format that just makes it so the content is not indexed by Google bot, but can easily be converted back to a plain text format.

<!-- more -->

## 1 - The node cli nc-hexer command basics

This is a post on my cd-hexer command that is part of my node_cli_tools project that can be found on my github account. This node cli tool depends on yargs which is one of several npm packages that make part of a stack that is the core of the project as a whole. So the code examples here will not work out of the box by just copying and parsing the code. If you want to reproduce what is going on here it would be best to clone done the project and install it globally.


## 2 - /bin/hexer/index.js

So each of my commands in the node_cli_tools projects has a bin folder in the root of the project folder. In the package.json file there is a bin key and that points to this file. This is why I am suing the nodejs shebang at the top of the file, as this is the first file to be called when the nc-hexer command is used.

```js
#!/usr/bin/env node
 
// main index.js for nc-hexer
require('yargs')
.command(require('./commands/default.js'))
.argv;
```

## 3 - /bin/hexer/commands/default.js

Here I have the default.js file for the default command of the nc-hexer command. The target option can be used to set the file to convert to hex, and the output option can be used to set the file to save the hex format of the fine to. There is also the mode option that can be used to change from converting text to hex, and from hex back to text.

```js
// default command for nc-hexer
let path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
hexer = require('../../../shared/lib/hexer/index.js');
 
exports.command = '*';
exports.aliases = ['d'];
exports.describe = 'default command';
 
exports.builder = {
    // target file
    t: {
        default: false
    },
    // output file
    o: {
        default: path.join(process.cwd(), 'hex_'+ new Date().getTime() +'.txt')
    },
    // mode
    m: {
        default: 'toraw'
    },
    // return char
    r: {
        default: '\n'
    }
    
};
exports.handler = function (argv) {
    console.log('nc-hexer default command:');
 
    if(!argv.t){
        
        console.log('a target file must be given:');
        console.log('$ nc-hexer -t foo.txt');
        
    }else{
        
        readFile(argv.t, 'utf8')
        
        .then((data)=>{
            
            switch(argv.m){
                
                case 'toraw':
                    return writeFile(argv.o, hexer.toRawStyle(data, argv.r));
                break;
                
                case 'fromraw':
                    return writeFile(argv.o, hexer.fromRawStyle(data, argv.r));
                break;
            }
            
            return Promise.reject(new Error('unknown mode'));
            
        })
        
        .catch((e)=>{
            
            console.warn(e.message);
            
        });
        
        
    }
    
    //let raw = hexer.toRawStyle('foo\r\nbar\nfeeb');
    
    //console.log(hexer.fromRawStyle(raw));
    
};
```

## 4 - /shared/lib/hexer/index.js

Here I have the actual hexer lib.

```js
let hexer = {
    
    // patterns
    pat_returns: /\n|\r\n/g,
    
    // just split text by windows (cr lf) and/or posix ( lf ) style retruns 
    splitByReturns : (text) => {
        return text.split(hexer.pat_returns);
    },
    
    // text to raw style hex format where each line is convered to
    // hex and retrunChars are placed between each line
    toRawStyle : (text, returnChar) => {
        
        returnChar = returnChar === undefined ? '\n' : returnChar;
        
        return hexer.splitByReturns(text).map((line)=>{
            
            return Buffer.from(line, 'utf8').toString('hex');
            
        }).join(returnChar);
        
    },
    
    // convert rawStyle format hex back to text
    fromRawStyle : (hex, returnChar) => {
        
        returnChar = returnChar === undefined ? '\n' : returnChar;
        
        return hexer.splitByReturns(hex).map((line)=>{
            
            return Buffer.from(line, 'hex').toString('utf8');
            
        }).join(returnChar);
        
    }
    
};
 
module.exports = hexer;
```

## 5 - Conclusion

So this project even as it currently stands serves the purpose that I had in mind, I just wanted a simple tool that converted plain text files into a from where it is just hex strings for each line with line breaks separating each line. The reason why is I just want to store text in a non human readable form, but a more advanced version might also preform better key-less [obfuscation](https://en.wikipedia.org/wiki/Obfuscation) of text, and maybe even encryption.