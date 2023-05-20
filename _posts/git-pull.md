---
title: Git Pull sub command
date: 2023-05-18 07:40:00
tags: [git]
layout: post
categories: git
id: 1041
updated: 2023-05-20 07:52:19
version: 1.4
---

The [git pull](https://git-scm.com/docs/git-pull) subcommand is something that I find myself using just about every day. I use it so often that I typically set up [aliases when using a Linux system](/2020/11/30/linux-bashrc-aliases/) so that I can just type a single few letters and even possible a single letter in the bash prompt in the current git folder I am working with. Even though I use this sub command every day it would seem that there are still a few things that I would like to learn more about with pull. That is because there is the typical day to day use of it that are this point is more or less brainless, but then the not so often use case where I need to stop and do some research. In other words typically I just call git pull, and fast forward a local copy of a repository to the latest branch, everything goes smoothly, and then I start working on the next commit for the current branch. However some times there are some local changes that I have failed to commit, and that of course results in a problem.

<!-- more -->

## Git pull and Git fetch

The git pull command is similar to [git fetch](https://git-scm.com/docs/git-fetch) in that both commands will download [objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) and [references](https://git-scm.com/book/en/v2/Git-Internals-Git-References) from a remote. The main difference though is that fetch will not just go ahead and merge those changes into my local clone of the remote.

## Basic git pull example in a git folder

So for the most part the default action of the git pull command works fine for me thus far. That is that when I have the git folder that I am working with as the current working directory, and the head is at the latest commit, I can just call git pull.

```
$ git pull
```

There are some situations that I get myself into though where the default action will not work though. Most of the time the reason why is because I forgot to commit some minor work that I did. There are some other situations where it will not work also, or work just not in a way that I might expect. So then I should write about a few more examples that are related to the use of git pull.


## git remote, git checkout, Starting with a Shallow Clone of an old tag

One might think that a decent example of git pull might involve starting with [a clone of a remote repository](/2023/05/11/git-clone/). However not just any clone, a clone that is a little out of date. For example say that I clone down a new copy of my game MrSun Idle that is at the tag 0.90.0 as I want to just start a new clone at that point for some extending reason. However then say that at some point I would like to update the clone to the latest point in the remote. However things are a little werid when making this kind of clone, and [fixing the problem](https://stackoverflow.com/questions/23708231/git-shallow-clone-clone-depth-misses-remote-branches) is a little involved as it requires also using the [git-remote](https://git-scm.com/docs/git-remote) command.

```
$ git clone --depth 1 -b "0.90.0" https://github.com/dustinpfister/idle_mrsun mrsun
$ cd mrsun
$ cat package.json | grep version
  "version": "0.90.0",
$ git remote set-branches origin '*'
$ git fetch -v --depth=1
$ git checkout master
$ cat package.json | grep version
  "version": "0.98.0",
```

## The rebase and no rebase options of git pull

Most of the time I just need to fast forward and out of date clone of a remote to the lateset state. This is the default for git pull, so for the most part I can just do a git pull in the git folder, get up to date, and that is the end of it. However some times I might have local changes to the clone that I have not committed to the remote, when this happens as one expect just doing a git pull will not work. This is of course what should happen in this case because I might not want to just overwrite those local changes and lose what might be important work.


## Conclusion

That will be it for now when it comes to the git pull command, however I am sure that I will do a little more editing of this post now and then in the future as well as with my [many other blog posts on git](/categories/git).
