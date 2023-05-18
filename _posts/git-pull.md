---
title: Git Pull sub command
date: 2023-05-18 07:40:00
tags: [git]
layout: post
categories: git
id: 1041
updated: 2023-05-18 08:02:24
version: 1.1
---

The [git pull](https://git-scm.com/docs/git-pull) subcommand is something that I find myself using just about every day. I use it so often that I typically set up [aliases when using a Linux system](/2020/11/30/linux-bashrc-aliases/) so that I can just type a single few letters and even possible a single letter in the bash prompt in the current git folder I am working with. Even though I use this sub command every day it would seem that there are still a few things that I would like to learn more about with pull. That is because there is the typical day to day use of it that are this point is more or less brainless, but then the not so often use case where I need to stop and do some research. In other words typically I just call git pull, and fast forward a local copy of a repository to the latest branch, everything goes smoothly, and then I start working on the next commit for the current branch. However some times there are some local changes that I have failed to commit, and that of course results in a problem.

<!-- more -->

## Git pull and Git fetch

The git pull command is similar to [git fetch](https://git-scm.com/docs/git-fetch) in that both commands will download [objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) and [references](https://git-scm.com/book/en/v2/Git-Internals-Git-References) from a remote. The main difference though is that fetch will not just go ahead and merge those changes into my local clone of the remote.