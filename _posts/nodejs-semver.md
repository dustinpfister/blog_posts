---
title: node semver
date: 2019-09-10 20:54:00
tags: [node.js]
layout: post
categories: node.js
id: 533
updated: 2019-09-13 17:16:04
version: 1.3
---

Thought I would write a quick post on semver the nodejs npm package that helps with the [semver.org Semantic Versioning standard](https://semver.org/) for version numbers. If you are planing to make a serious nodejs project it is a good standard to at least be somewhat aware of. For many not so serious projects I still conform to it as to many other developers. Even if you do not wish to conform to the standard there are still many concerns when it comes to making a project that involves a public API of some kind. Making any changes to a public API might result in code breaking in any and all projects that depend on it for example. So learning a thing or two about the standard, can help with concerns that will arise as a project is maintained.

<!-- more -->

## 1 - The node semver npm package

The node semver npm package is a well known package that is used to help with Semanic Versioning rules.

### 1.2 - The Valid method

The valid method of the semver npm package will return a parsed version number if the given version number is valid, else it will return null in the event that it is not a valid version number.

### 1.3 - A simple version bump script Uisng the increment method

So then the valid and inc (increment) methods can be used to set up a simple version bump script.

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