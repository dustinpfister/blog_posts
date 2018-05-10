---
title: Using yaml in place of JSON in node.js with js-yaml
date: 2017-08-02 15:23:49
tags: [js,node.js,JSON, hexo]
layout: post
categories: node.js
updated: 2017-09-30 18:43:21
version: 1.2
id: 29
---

[YAML](http://yaml.org/) is a recursive acronym for YAML Ain't Markup Language, that is used for data serialization. Often I see it used for configuration files in place of JSON (JavaScript Object Notation), as a means of soft coding settings. This is the case in [hexo](https://hexo.io), for the purpose of configuring settings for hexo itself, as well as the theme that is being used.

<!-- more -->

## Why use YAML over JSON?

In most cases JSON works just fine, but YAML is used in a wider range of programing environments outside that of javaScript. In addition YAML allows for additional features such as comments. As such it is sometimes used as an alternative to JSON that comes up now and then in node.js projects.

This post will help you get started with js-yaml as a means of parsing a YAML file into an object that you can then use to soft code you node.js application.

## YAML file example

First start with a basic YAML file example such as this.

```yaml
# Set a username here
userName: dustin
 
# some config config options
options :
   displayTime : true
   displayGreating : true
```

As you can see you can use the number sign to indicate a comment. I am also defining a object called options by just defining some more properties rather than giving a value.

## installing js-yaml

Now that you have an example file to work with you will need a yaml parser to parse the yaml file into a javascript object that can be worked with in the project.

So start a new node.js test project cd into the folder of it as usual and the add js-yaml to the project.

```
$ npm install js-yaml --save
```

## Parsing YAML for use in a node project.

Once you have js-yaml in your node_modules folder working with it is pretty straight forward.

```js
var yaml = require('js-yaml'),
fs = require('fs');

fs.readFile('./config.yml', 'utf8', function (e, data) {

    var file;

    if (e) {

        console.log('config.yml not found.');

    } else {

        file = yaml.safeLoad(data, 'utf8');

        if (file.options['displayGreating']) {

            console.log('hello ' + file.userName);

        }

        if (file.options['displayTime']) {

            console.log('the time is: ' + new Date());

        }

    }

});
```

## Further reading

In this post I will not be going over the full scope of YAML, there are some [good resources](http://www.yaml.org/start.html) that do just that. This is just another quick post of mine on one of the many [node.js](/categories/node-js/) packages I have fiddled around with.

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).

<!-- notes 

http://stackoverflow.com/questions/1726802/what-is-the-difference-between-yaml-and-json-when-to-prefer-one-over-the-other


-->