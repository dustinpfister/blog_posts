---
title: Git Push command
date: 2023-05-24 11:51:00
tags: [git]
layout: post
categories: git
id: 1043
updated: 2023-05-24 12:17:43
version: 1.2
---

The [git push](https://git-scm.com/docs/git-push) sub command is how to go about updating a remote with local changes. Of course in order to do this to begin with one will need to set up a remote repository to begin with. So with that said there is also knowing at least a thing or two about the [git remote command](https://git-scm.com/docs/git-remote) as a way to find out if any remotes are set up to begin with, and if need be to add one.

I also wrote a [blog post on the git pull command](/2023/05/18/git-pull/) which does seem to be more or less the counter part of the git pull command, or at least one of them anyway. I say that because there is also the git fetch command as well is a litter different. However in any case there is pulling down changes from a remote, and thus updating the local git folder, and then there is pushing local changes to the remote.

<!-- more -->


## Basic get push

Speaking from my experience thus far once a remote is set up, often I can just call the git push command with default options and that will be the end of it. 

```
$ git push
```

The reason why this works for me though is because often with my personal projects I am not doing anything fancy with branching. However in any case this brings up the question as to what the default options are, and why they may, or may not work. Another way of doing the same for me with many of my projects might end up being something like this:

```
$ git push origin master
```

In some cases the name of the main branch might be something other than master. Often the name of the main branch might be something like, well main. However the general idea here is that by default there is a configuration that will be check, and if that is missing origin will be used. 

