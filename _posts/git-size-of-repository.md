---
title: Git size of repository
date: 2020-09-17 16:35:00
tags: [git]
layout: post
categories: git
id: 706
updated: 2020-09-19 14:04:52
version: 1.7
---

I have some repositories that keep growing in size, so far this has not presented a problem for me, but I can not help but thing that at some point in the future it will sooner or later. So for now I thought I would take a moment tot just fool around with a test git folder, and do a little [research on how to know how big a git repository is](https://stackoverflow.com/questions/8185276/find-size-of-git-repository) to begin with at least. 

In late versions of git there is the [git count-objects](https://git-scm.com/docs/git-count-objects) command that can be used to know how many objects there are and there disk consumption. So this might be the best way to know how much space a git folder is taking up assuming that I will always be using a late version of git that will support this.


<!-- more -->

## 1 - Creating a test repo and using git count-objects

I often find that it might be best to start over with a test repository rather than a clone of a repository that I might end up accidentally pushing changes to.  So in this section I will be creating a whole new repository with git, and then use the git count-objects command to track the size of the repository.

### 1.1 - create the test repo

First off I create a new repository with the git init command in a new folder.

```
$ mkdir git_test
$ cd git_test
$ git init
```

### 1.2 - Add something to it and create a first commit

I will then want to add something to it such as a dummy README file.

```
$ nano README.md
```

```
## git-test
 
This is only a test
```

And a first commit.

```
$ git add *
$ git commit -m "first commit"
```


### 1.3 - Use the git count-objects command

So now I just need to call the git count-objects command in the git folder to get a count of all the objects, and a size value. If I call it without any arguments I get a size in kilobytes.

```
$ git count-objects
3 objects, 0 kilobytes
```

However there are some options that can result in a more detailed output of what is going on so far in this test repository. By passing the v option I get a more verbose output. On top of that there is also the uppercase H option that will give the output in a more Human readable form.

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
