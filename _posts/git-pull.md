---
title: Git Pull sub command
date: 2023-05-18 07:40:00
tags: [git]
layout: post
categories: git
id: 1041
updated: 2023-05-18 08:15:00
version: 1.2
---

The [git pull](https://git-scm.com/docs/git-pull) subcommand is something that I find myself using just about every day. I use it so often that I typically set up [aliases when using a Linux system](/2020/11/30/linux-bashrc-aliases/) so that I can just type a single few letters and even possible a single letter in the bash prompt in the current git folder I am working with. Even though I use this sub command every day it would seem that there are still a few things that I would like to learn more about with pull. That is because there is the typical day to day use of it that are this point is more or less brainless, but then the not so often use case where I need to stop and do some research. In other words typically I just call git pull, and fast forward a local copy of a repository to the latest branch, everything goes smoothly, and then I start working on the next commit for the current branch. However some times there are some local changes that I have failed to commit, and that of course results in a problem.

<!-- more -->

## Git pull and Git fetch

The git pull command is similar to [git fetch](https://git-scm.com/docs/git-fetch) in that both commands will download [objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) and [references](https://git-scm.com/book/en/v2/Git-Internals-Git-References) from a remote. The main difference though is that fetch will not just go ahead and merge those changes into my local clone of the remote.

## Starting with a Clone Example

A basic starting point with git pull might involve starting with [a clone of a remote repository](/2023/05/11/git-clone/). However not just any clone, a clone that is a little out of date. For example say that I clone down a new copy of my game MrSun Idle that is at the tag 0.90.0 as I want to just start a new clone at that point for some extending reason. However then say that at some point I would like to update the clone to the latest point in the remote.

```
```


## The rebase and no rebase options of git pull

Most of the time I just need to fast forward and out of date clone of a remote to the lateset state. This is the default for git pull, so for the most part I can just do a git pull in the git folder, get up to date, and that is the end of it. However some times I might have local changes to the clone that I have not committed to the remote, when this happens as one expect just doing a git pull will not work. This is of course what should happen in this case because I might not want to just overwrite those local changes and lose what might be important work.


