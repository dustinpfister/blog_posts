---
title: Linux Build Bash Script JavaScript Style
date: 2020-11-10 11:19:00
tags: [linux]
layout: post
categories: linux
id: 738
updated: 2020-11-10 11:35:35
version: 1.2
---

I have started toying around with bash a little in place of just using nodejs as a way to automate work. In my recent canvas example projects I worked out a basic bash script that has to do with automating the process of creating a package from javaScript source code files.

<!-- more -->

## 1 - The bash script

The bash script makes use of a few Linux commands and a single npm package that I installed globally called [uglifyjs](https://www.npmjs.com/package/uglify-js). So this script should only be used in a Linux system that has cat, xargs, and echo which should be more or less all of them as they are common commands. Along with the Linux commands nodejs, and npm installed, and uglifyjs should be installed, if not it should be installed globally.

```
$ sudo npm install uglify-js -g
```


```
#!/bin/bash
 
top=$(cat top.txt)
bottom=$(cat bottom.txt)
js=$(cat files.txt | xargs uglifyjs)
main=$(uglifyjs ../main.js)
 
echo "${top}${js}${main}${bottom}"
```

## 2 - The top.txt, files.txt, and bottom.txt files

### 2.1 - top.txt

```
<html>
<head>
<title>Canvas Example Mr Sun</title>
</head>
<body>
<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>
```

### 2.2 - files.txt

```
../lib/utils.js
../lib/game.js
../lib/draw.js
../plugin/sun.js
../plugin/temp.js
../plugin/fusion.js
../plugin/geo.js
../plugin/hydro.js
../plugin/atmo.js
```

### 2.3 - bottom.txt

```
</script>
</body>
</html>
```