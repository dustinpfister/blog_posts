---
title: Git checkout command and switching commits, branches
date: 2020-10-23 07:05:00
tags: [git]
layout: post
categories: git
id: 728
updated: 2020-10-23 07:47:48
version: 1.4
---

The [git checkout](https://git-scm.com/docs/git-checkout) command in [git](https://git-scm.com/) can be used to switch to another branch, but also to an older commit on the same branch and back again.

One of the nice things about using git, or source control in general is that I can go back to any point in development to which a commit has been made. The git log command can at any point be called to get a list of commit hash ids that can then be used with the git checkout command to switch to any one of those commits.

The checkout command can then be used to switch the current head of the git folder to a given commit, it can also be used to switch back to the latest commit for a branch by just giving the branch name rather than a commit hash id. The git checkout command is then one of sever commands that I or any developer that uses source control should be aware of, so it is worth it to write about a few simple examples of the git checkout command.

<!-- more -->

## 1 - basic git checkout example with a test git folder

```
$ cd ~
$ mkdir foo
$ cd foo
$ git init
$ echo 'this is a test file' > file1.txt
$ git add *
$ git commit -m "first commit"
```


```
$ echo 'this is another test' > file2.txt
$ git add *
$ git commit -m "file2"
```

```
$ git log --format="%H,%s"
4e7fed1631804288ad873b8cefa9515947bf13df,file2.txt
7142ad43522d02e4fbc50ce41b9ec91b4560ef65,first commit
```

```
$ git checkout 7142ad43522d02e4fbc50ce41b9ec91b4560ef65
$ ls
file1.txt
```

```
$ git checkout master
$ ls
file1.txt file2.txt
```