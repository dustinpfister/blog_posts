---
title: Using yaml in place of JSON in node.js with js-yaml
date: 2017-08-02 15:23:49
tags: [js,node.js,JSON, hexo]
layout: post
categories: node.js
updated: 2019-11-18 08:40:13
version: 1.8
id: 29
---

[YAML](http://yaml.org/) is a recursive acronym for [YAML Ain't Markup Language](https://en.wikipedia.org/wiki/YAML) that is used for data serialization, but does so in a more human readable style format, by supporting features like comments. 

Because of the support of comments often I see it used for configuration files in place of JSON (JavaScript Object Notation), as a means of soft coding settings, and storing other forms of data where YAML may be an appropriate option. This is the case in the static site generator that I use called [hexo](https://hexo.io), for the purpose of configuring settings for hexo itself as well as for a site project folder such as what theme I am using.

<!-- more -->

In most cases JSON works just fine, but YAML might be a better option for anything that is not going to be sent to or from a web based client system. The main reason why I find myself using it now and then in projects is because of the comments support, it allows for me to place comments above each setting in a configuration file that is nice when it comes to making a project a little more user friendly. Also it strikes me as a more appropriate option when it comes to a more standard from of data storage when it comes to other programing environments outside of that of javaScript.

In this post will be writing a thing or two about [js-yaml](https://www.npmjs.com/package/js-yaml) as a means of parsing a YAML file into an object that you can then use to soft code you node.js application.

## 1 - YAML basic file example

So for starters we need to work out just a basic YAML file example that has some foo bar like settings. An example that just has a single key value pair, and then maybe some nested key value pairs maybe.

So then lets first start with a basic YAML file example such as this:

```yaml
# Set a username here
userName: dustin
 
# some config config options
options :
   displayTime : true
   displayGreating : true
```

As you can see the number sign can be used to indicate a comment. I started off by making a comment that informs someone looking over my simple configuration file that a user name value can be changed by changing the value for the user name key in this file.

I am also defining a object called options by just using a line break followed by whitespace indentation with spaces and not tabs. The white space indentation is what is used to inform a parser that the values are object keys of the current object.

So I saved this example as config.yaml, and now I just need a way to parse it into a workable object in node. To do this I will need a parser, I could make my own but why do that whne I can save a whole lot of time by using js-yaml.

## 2 - installing js-yaml

Now that you have an example file to work with you will need a yaml parser to parse the yaml file into a javaScript object that can be worked with in the project.

So start a new node.js test project cd into the folder of it as usual and the add js-yaml to the project.

```
$ npm install js-yaml --save
```

The js-yaml parser can now be required in just as with any other user space or built in nodejs module. So lets get together a simple javaScript file that will load this external conf.yaml file of ours.

## 3 - Parsing YAML for use in a node project.

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

## 4 - Further reading

In this post I will not be going over the full scope of YAML, there are some [good resources](http://www.yaml.org/start.html) that do just that. This is just another quick post of mine on one of the many [node.js](/categories/node-js/) packages I have fiddled around with.

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).

<!-- notes 

http://stackoverflow.com/questions/1726802/what-is-the-difference-between-yaml-and-json-when-to-prefer-one-over-the-other


-->