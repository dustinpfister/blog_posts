---
title: Version number bumping with grunt.
date: 2017-03-27 11:57:00
tags: [js,node.js,grunt]
layout: post
categories: grunt
id: 7
updated: 2017-04-04 08:23:55
version: 1.0
---

{% mytags_postwords js,javaScript,grunt,version&#32;bump,node.js %}

So I just got into using [grunt](https://gruntjs.com/) (hey better late than never), and already I find myself stuck on one of the most simple aspects of managing a javaScript project, which is bumping the version number.

<!-- more -->

So I am having questions pop up in my mind like:

* Do I bump the number before each push to my remote?
* Do I bump the number when I start a new commit?
* Do I just automate the process of bumping the patch number, and bump the minor, and major numbers manually?
* Do I just want something that automates version number bumping, and nothing else?
* Do I even want to automate this at all?
* Am I putting to much thought into something that is very trivial?

I like to think that I have spent enough time re-inventing the wheel to earn the right to consider myself a half way decent programmer, as such if I really want to I could write my own script of course. However in the spirit of being more calculated about spending my time on things, I would like to start typing npm install a lot more if you know what I mean. So far I have found this when it comes to doing just that.

## [grunt-bump](https://www.npmjs.com/package/grunt-bump)

```
$ npm install grunt-bump --save-dev
```

This allows for everything that comes to mind with getting the job done. In my Gruntfile I have it set up like this


```js
grunt.initConfig({
    bump : {
        options : {
            files : ['package.json'],
            updateConfigs : [],
            commit : false,
            commitMessage : 'Release v%VERSION%',
            commitFiles : ['package.json'],
            createTag : false,
            tagName : 'v%VERSION%',
            tagMessage : 'Version %VERSION%',
            push : false,
            pushTo : 'upstream',
            gitDescribeOptions : '--tags --always --abbrev=1 --dirty=-d',
            globalReplace : false,
            prereleaseName : false,
            metadata : '',
            regExp : false
        }
    }
});
grunt.loadNpmTasks('grunt-bump');
```

I have many things set to false, but for now when I do a

```
$ grunt bump
```

It will just bump the patch number, and it is clear that I can have it do a whole lot more than just that if need be. Off to a great start with grunt here moving on.