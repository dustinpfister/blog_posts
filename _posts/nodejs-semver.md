---
title: node semver version standard and npm package
date: 2019-09-10 20:54:00
tags: [node.js]
layout: post
categories: node.js
id: 533
updated: 2019-09-13 20:36:42
version: 1.11
---

Thought I would write a quick post on semver the nodejs npm package that helps with the [semver.org Semantic Versioning standard](https://semver.org/) for version numbers. If you are planing to make a serious nodejs project it is a good standard to at least be somewhat aware of. For many not so serious projects I still conform to it as to many other developers. Even if you do not wish to conform to the standard there are still many concerns when it comes to making a project that involves a public API of some kind. Making any changes to a public API might result in code breaking in any and all projects that depend on it for example. So learning a thing or two about the standard, can help with concerns that will arise as a project is maintained.

<!-- more -->

## 1 - node semver basics

The basic idea of node semver is that a version number should consist of three numbers that reflect a current major minor and path release. 

### 1.1 - The major release number 

A project should start out as a major release of zero, and during this time a clearly defined public API does need need to be in place. However A clearly defined public API should be in place by major release version one. Once a public API is in place no code breaking changes should be made to that major release, unless the aim is to start a new major release in which case code breaking changes can be made to that public API.

### 1.2 - The minor release number

A minor release should be made each time new features are added that will not break the public api of the current major release. for example new options could be added to an option object of a a function that can be accessed via the public api as long as the old options are still in place and work as expected. If a feature removes old options or functions completely from the public api that should only be done if a new major release is being made. Think in terms of code that depends on this API, if the new feature will break that code then it should be a new major release not a new minor.

### 1.3 - The patch version number

The patch version number should be bumped up each time a bug is fixed, or any kind of improvement that does not add a new feature break code. So bug fixes, a more efficient function that does the same thing, a security fix, or any superficial change such as comments, spelling mistakes in the README file and so forth.

## 2 - The node semver npm package

The node semver npm package is a well known package that is used to help with Semanic Versioning rules. I will not be covering every little detail about this package as there is much to cover, but this is the package of interest that one should install and play around with when it comes to learning more about semver, and taking a more serious approach to maintaining a nodejs project.

### 2.2 - The Valid method

The valid method of the semver npm package will return a parsed version number if the given version number is valid, else it will return null in the event that it is not a valid version number.

### 2.3 - A simple version bump script Uisng the increment method

So then the valid and inc (increment) methods can be used to set up a simple version bump script. In this section I will be going over a very simple script that I just threw together in a flash. However in a real project the semver npm package can be used with other libraries and modules such as the child process module to automate the process of running tests, preforming various checks to make everything looks good, and event automate the process of commenting and pushing to a remote.

Still a simple version bump script for starters might look something like this.

```js
let semver = require('semver'),
path_packJSON = process.argv[3] || '../package.json',
fs = require('fs'),
pack = require(path_packJSON),
release = process.argv[2] || 'patch',
 
v = semver.valid(pack.version);
 
if (v) {
    pack.version = semver.inc(v, release);
    fs.writeFile(path_packJSON, JSON.stringify(pack), (e) => {
        if (e) {
            console.log(e.message);
        } else {
            console.log('package.json version updated to ' + pack.version);
        }
    })
} else {
    console.log('package.json does not contain a valid version number');
}
```

This will just bump the patch version number be default, or another release type provided from the command line. A more advanced script might preform some tests, and other checks that must all pass before bumping the version number.

## 3 - Staying in alpha

For some projects I just stay in alpha the whole time, just bumping up the minor release number each time I add a new feature. This is often the case if it is a project that is not meant to be used as a node module, or something that I do not intend to release to npm. This way I am still kind of conforming to the rules of semver by never really getting to the point where a final public api is in place. Some projects that are in a rapid state of development that aways have the public api change on every revision might follow this approve, one project that seems to follow this is threejs.