---
title: A node cli project static site generator
date: 2019-10-22 21:27:00
tags: [node.js]
layout: post
categories: node.js
id: 549
updated: 2019-10-31 20:10:26
version: 1.8
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

```js
let ejs = require('ejs'),
fs = require('fs'),
promisify = require('util').promisify,
mkdirp = promisify(require('mkdirp')),
renderFile = promisify(ejs.renderFile),
writeFile = promisify(fs.writeFile),
path = require('path'),
walk = require('../../../shared/lib/walk/walk.js');
 
// create a render method that will be used to generate all html files
// the root dir of the theme, and locals object will be closed over
// and a render method will be retruned where only a custom tailer object
// is passed as the one argument that chainges things like layout,
// the current post to render and so forth.
let createRenderMethod = (conf) => {
    // main index.ejs template file location
    let path_template_index = path.join(conf.dir_theme, 'index.ejs'),
    // ejs options
    ejs_options = {
        root: conf.dir_theme
    },
    // the locals object
    ejs_locals = {
        conf: conf,
        title: 'site_foo main index',
        currentPage:{}
    };
    // return a resolved Promise with the render method
    return Promise.resolve(function(pageInfo){
        // update currentPage info default values
        // will result in a main index.html build
        pageInfo = pageInfo || {};
        ejs_locals.currentPage = Object.assign({},{
            layout: 'home',
            path: '/',
            content: '',
            fileName: 'index.html'
        }, pageInfo);
        // use ejs renderFile promisifyed to create html
        return renderFile( path_template_index, ejs_locals, ejs_options )
        // we now have html that can be saved
        .then((html)=>{
            // write the html file to the public folder
            let dir_target = path.join(ejs_locals.conf.dir_public, ejs_locals.currentPage.path),
              path_target = path.join(dir_target, ejs_locals.currentPage.fileName);
            // ensure dir for file
            return mkdirp(dir_target)
            // write the file
            .then(()=>{
                return writeFile(path_target, html, 'utf8');
            })
            .then(()=>{
               
                console.log('\u001b[36m > render: ' + path_target + '\u001b[39m');
                
            });
        });
    });
};
 
// generate posts
let genPosts = (opt, render) => {
    let path_script = path.resolve(__dirname, '../lib/for_post.js'),
    path_target = path.resolve(opt.dir_root, '_posts');
    console.log('generating blog posts...');
    // walk _posts
    walk.walk({
        dir: path_target,
        forFile: require(path_script),
        api: {
            dir_posts: path_target,
            dir_public: opt.dir_public,
            render: render
        }
    });
};
 
let genIndex = (opt, render) => {
    
    console.log('building main index file uisng theme at:');
    console.log(opt.dir_theme);
    
    let path_template_index = path.join(opt.dir_theme, 'index.ejs'),
    ejs_locals = {
        conf: opt,
        title: 'site_foo main index'
    },
    ejs_options = {root: opt.dir_theme};
    
    //renderFile( path_template_index, ejs_locals, ejs_options )
    render()
    .catch((e)=>{
        console.log('error building /index.html');
        console.log(e.message);
    });
    
};
 
// exported method for gen.js
module.exports = (opt) => {
    
    let render = function(){};
    
    // make sure public folder is there
    mkdirp(opt.dir_public)
    .then(()=>{
        
        return createRenderMethod(opt);
        
    })
    .then((newRenderMethod)=>{
        render = newRenderMethod;
        genIndex(opt, render);
    })
    // gen posts
    .then(() => {
        genPosts(opt, render);
    })
    // if error
    .catch((e) => {
        console.log(e);
    });
};
```