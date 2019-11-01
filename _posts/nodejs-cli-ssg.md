---
title: A node cli project static site generator
date: 2019-10-22 21:27:00
tags: [node.js]
layout: post
categories: node.js
id: 549
updated: 2019-10-31 20:08:32
version: 1.7
---

So for todays [node cli](/2019/10/23/nodejs-cli/) project I started working on a basic static site generator, one of many project ides of node cli tool examples. The project makes use of the npm package known as marked which can be used to parse markdown files into html, as well as some of my other node cli projects such as nc-walk that make part of my node cli tools repository project. This static site generator might not really be of production quality as of yet, but if I do put more time into this project I am sure it will get there.

<!-- more -->

## 1 - the node cli tools project

this is a post on the nc-ssg command for my node cli tools project. I will not be getting into the full depth of the project as a whole here, but I will say that it is a project that is a collection of node cli tools that can be used to create and maintain a website.

## 2 - The node cli /bin/ssg folder

In the bin folder of the node cli tools project I creates a folder called ssg. This folder will contain the main file that will be called when the nc-bin command is called. In this file I am using [yargs](/2018/07/24/nodejs-yargs/) to parse options that are passed when calling the command.

```js
#!/usr/bin/env node
 
require('yargs')
.command(require('./commands/default.js'))
.command(require('./commands/gen.js'))
.argv;
```

# 3 - The /bin/ssg/commands folder

### 3.1 - default.js

```js
exports.command = '*';
exports.describe = 'default command';
exports.handler = function (argv) {
    console.log('nc-ssg:');
    console.log('use gen sub-command to generate a public folder when in the root working path of a project folder.');
    console.log('$ nc-ssg gen');
};
```

### 3.2 - gen.js

```js
let path = require('path'),
gen = require('../lib/gen.js');
 
exports.command = 'gen';
exports.aliases = ['g'];
exports.describe = 'generate command';
 
exports.builder = {
    // root project path
    r: {
        default:process.cwd()
    },
    // path to create the public folder in
    p: {
        default:path.join(process.cwd(), '_public')
    },
    // dir to folder of the theme to use
    e:{
        default: path.join(process.cwd(), '_themes/core')
    }
};
exports.handler = function (argv) {
 
    gen({
        dir_root: argv.r,
        dir_public: argv.p,
        dir_theme: argv.e
    });

};
```

## 4 - The /bin/ssg/lib folder

### 4.1 - for_post.js

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
marked = require('marked');
 
// is markdown helper
let isMarkdown = (item) => {
    // is the item a markdown file?
    if (item.stat.isFile && item.fileName.match(/.md$/)) {
        return Promise.resolve()
    } else {
        return Promise.reject(new Error('item in posts folder is not a markdown file'));
    }
}
 
// main forFile method to be used with nc-walk
module.exports = (api, item, next) => {
 
    console.log('generating post files for public folder: ' + api.dir_public);
    // the dir for the new html file
    let dir_html = path.join( api.dir_public, path.basename(item.fileName, '.md') + '.html' );
    // is the item markdown?
    isMarkdown(item)
    // read the markdown file
    .then(() => {
        return readFile(item.path)
    })
    // use marked to convert post to html
    // and write the new html file in the public folder
    .then((data) => {
        let html = marked(data.toString());
        // write the file
        //return writeFile(dir_html, html, 'utf8');
        return api.render({
            layout: 'post',
            path: '/blog',
            content: html
        });
        next();
    })
    // then log gen file message
    .then(()=>{
        //console.log('gen: ');
        //console.log(api);
    })
    // if and error happens
    .catch((e) => {
        console.log(e);
        next();
    })
};
```

### 4.2 - gen.js