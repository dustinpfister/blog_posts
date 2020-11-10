---
title: Linux Build Bash Script JavaScript Style
date: 2020-11-10 11:19:00
tags: [linux]
layout: post
categories: linux
id: 738
updated: 2020-11-10 12:06:48
version: 1.8
---

I have started toying around with [bash scripts](https://ryanstutorials.net/bash-scripting-tutorial/bash-script.php) a little in place of just using nodejs as a way to automate work. I would normally use nodejs and a little javaScript as a way to create scripts that will do so, the great thing about that is that when I make the scripts a certain way they will work on any system in which I can install nodejs on. However these days I find myself preferring to just work in a straight Linux environment, as such I can make use of bash, and all the little various Linux commands there are to play with, in order to make quick work of things that I would otherwise have to do manually.

In my recent canvas example projects I worked out a basic bash script that has to do with automating the process of creating a package from javaScript source code files. The source code files are in development form, but I want them to all be combined together, and minified between some starting and ending html code to create a single final html file for the state of the canvas example. The bash script I worked out make use of shell level variables, and various Linux commands such as cat along with a single javaScript min script to create the final result that I want.

<!-- more -->

## 1 - The bash script

The bash script makes use of a few Linux commands and a single npm package that I installed globally called [uglifyjs](https://www.npmjs.com/package/uglify-js). So this script should only be used in a Linux system that has cat, xargs, and echo which should be more or less all of them as they are common commands. Along with the Linux commands nodejs, and npm installed, and uglifyjs should be installed, if not it should be installed globally.

```
$ sudo npm install uglify-js -g
```

The build.sh script starts out with a shebang for bash rather than nodejs. The shebang is there in case I want to make the script executable so I can just directly call the script. In the event that the script is written in javaScript then I would want the shebang to point to node, however this is a plain old Linux bash script so in this case it should point to bash.

I am then using cat to read the contents of the top.txt file that contains the top part of the final html file. This is then stored in a top shell variable. The next step is to get the javaScript code that will go between the top and bottom parts.

To get the javaScript code I am using cat once again, but this file to just read a files.txt file that is just a list of paths for each javaScript file that I want to be part of the build. I am then piping that to xargs that in turn is feeding that list of file names to uglifyjs. The end result is the whole of the javaScript packed down using uglifyjs rather than a list of paths to files. This result is then stored as yet another shell variable.

I then just need to do the make for one final main.js file that will be at the bottom of the javaScript code and then echo out the result of all of this.

```
#!/bin/bash
 
top=$(cat top.txt)
bottom=$(cat bottom.txt)
js=$(cat files.txt | xargs uglifyjs)
main=$(uglifyjs ../main.js)
 
echo "${top}${js}${main}${bottom}"
```

## 2 - The top.txt, files.txt, and bottom.txt files

This will just then be a brief overview of the contents of the other files.

### 2.1 - top.txt

Here is the top.txt file the contains the top part of the desired final html file.

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

Here I have my list of paths to javaScript files, and yes in most cases the order is important. In my canvas example the utils.js file is a kind of general utility library that is used in the other files. So it makes sense that it should be at the very top of the build, or else I could end up with a problem where the other files end up calling undefined.

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

As I continue to work on the example, and add additional plug-ins to the source code I will of course need to update this list. The list is also something that I find myself moving from one project to another, I should make this script at the root of my canvas example folder, but I will still need this file, and also maybe the top and bottom files to be part of each example.

### 2.3 - bottom.txt

I then have the bottom part of the html file.

```
</script>
</body>
</html>
```

## 3 - Using the build.sh script

The shebang at the top of the file will allow for me to just directly call the build.sh file if I make it executable. However the alternative is to call it with bash directly, in any case I can just have the output spit out to the console, or use [Linux redirection](/2020/10/02/linux-redirection/) to create a file.

with that said I have been doing this:

```
$ bash build.sh > ../pkg/pkg_0_3_0.html
```

When all goes well the result is the final package with all my javaScript code packed up all nice into this single html file. As such the canvas example is now in this state where I can just transfer, and open this single file which is nice.

## 4 - Conclusion

I have been enjoying using this script as a way t automate this aspect of development on top od doing what I was doing before which was taking the time to manually put the build together. I have not ben working on that many projects so far where doing so was that time consuming, but with some projects it was starting to add up a little.