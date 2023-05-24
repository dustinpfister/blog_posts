---
title: Git Push command
date: 2023-05-24 11:51:00
tags: [git]
layout: post
categories: git
id: 1043
updated: 2023-05-24 12:08:10
version: 1.1
---

The [git push](https://git-scm.com/docs/git-push) sub command is how to go about updating a remote with local changes. Of course in order to do this to begin with one will need to set up a remote repository to begin with. So with that said there is also knowing at least a thing or two about the [git remote command](https://git-scm.com/docs/git-remote) as a way to find out if any remotes are set up to begin with, and if need be to add one.

I also wrote a [blog post on the git pull command](/2023/05/18/git-pull/) which does seem to be more or less the counter part of the git pull command, or at least one of them anyway. I say that becuase there is also the git fetch command as well is a litter differant. However in any case there is pulling down changes from a remote, and thus updating the local git folder, and then there is pushing local changes to the remote.

<!-- more -->


## Basic get push

Speaking from my experence thus far once a remote is set up, often I can just call the git push command with default options and that will be the end of it. 

```
$ git push
```