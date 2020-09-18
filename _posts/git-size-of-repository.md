---
title: Git size of repository
date: 2020-09-17 16:035:00
tags: [git]
layout: post
categories: git
id: 706
updated: 2020-09-18 09:44:09
version: 1.3
---

I have some repositories that keep growing in size, so far this has not presented a problem for me, but I can not help but thing that at some point in the future it will sooner or later. So for now I thought I would take a moment tot just fool around with a test git folder, and do a little [research on how to know how big a git repository is](https://stackoverflow.com/questions/8185276/find-size-of-git-repository) to begin with at least. 

In late versions of git there is the [git count-objects](https://git-scm.com/docs/git-count-objects) command that can be used to know how many objects there are and there disk consumption. So this might be the best way to know how much space a git folder is taking up assuming that I will always be using a late version of git that will support this.


<!-- more -->

## 1 - Creating a test repo and using git count-objects

### 1.1 - create the test repo

```
$ mkdir git_test
$ cd git_test
$ git init
```

### 1.2 - Add something to it and create a first commit

```
$ nano README.md
```

```
## git-test
 
This is only a test
```

```
$ git add *
$ git commit -m "first commit"
```


### 1.3 - Use the git count-objects command

```
$ git count-objects
3 objects, 0 kilobytes
```

```

$ git count-objects -vH
git count-objects -vH
count: 3
size: 225 bytes
in-pack: 0
packs: 0
size-pack: 0 bytes
prune-packable: 0
garbage: 0
size-garbage: 0 bytes
```
