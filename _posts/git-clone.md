---
title: Git Clone command
date: 2023-05-11 12:37:00
tags: [git]
layout: post
categories: git
id: 1039
updated: 2023-05-26 14:05:32
version: 1.2
---

There are a number of basic git sub commands that one will need to be aware of in order to make use of public and private Github repositories, and to just use git in general outside of github as well. There are two commands that come to mind when it comes to getting started with git. One would be the [init sub command](/2019/07/05/git-init/) that is a way to create a whole new git folder from an empty folder, and the other option would be the [clone sub command](https://git-scm.com/docs/git-clone) which is a way to clone down a git folder that all ready exists. 

When cloning down a repo from the open internet there are a lot of things to consider before doing so aside from things like trusting the source to begin with for example. There are also things like how big the repository might be in terms of size, not just with the current state but also with the full history as well. Speaking of the full history is that something that is needed? If not there is making a clone of a repo that is just the latest commit. So then in this post I will be writing about the git cone command with a few typical use case examples.

<!-- more -->


## Basic Clone example with --depth option

Most of the time when I use clone I will just call git folled by the clone sub command, and the I often will like to set the depth of the clone to 1. After that I will want to give the url of the repo that I want to clone, and then an optional name for the new folder. So for example there is making a shallow clone of the popular javaScript librray known as three.js. One thing to take into accorunf before doing this locally is that the size of the repo is somewhat large, even for a shallow clone with a depth of 1. More on this in later sections but for now there is just cloning down a copy of the threejs repo to the home folder.

```
$ cd ~
$ git clone --depth 1 https://github.com/mrdoob/three.js.git three.js
```

This might take a little while on a slow internet connection as the final size of the whole repo even if shallow is over 330MB. That is still a lot lower that doing this without the depth option though.


## Using Curl to find the full size of a repo before cloning

There are a [number of ways to find out the size of a public repo before downloading it](https://stackoverflow.com/questions/8646517/how-can-i-see-the-size-of-a-github-repository-before-cloning-it) in Github. When it comes to github repos there is using the github api to get an idea of what the full size is. By full size I do not mean a shallow clone by using the depth option with a value of 1, but rather the full commit history of the repo as a whole. In the first getting started example of this post the size of a shallow clone was fairly large, but nowhare as large as the whole repo which is over a GigaByte.

By using the curl command I can get the JSON data of the repo from Github and then I can pipe the result of that to grep to get a look at what the value is of the size property of that JSON data. The value that is given is in KB so a result of 1,273,732 KB is over a GB.

```
$ curl https://api.github.com/repos/mrdoob/three.js 2> /dev/null | grep size
  "size": 1273732,
```

## Conclusion

That will have to be it for now when it comes to the clone sub command of the git source control command. I am sure that there is a great deal more to write about when it comes to the use of clone, but that will have to be a matter for future edits of this post, and maybe a few other posts completely. I have just got around to starting to write one or two new posts on this subject if I am in fact going to write about it as one of my main topics on this site. The main thing about it is that this is a program that I find myself using every day, so it does make sense to write a post or two now and then for that reason.
