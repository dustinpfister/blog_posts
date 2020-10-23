---
title: Git checkout command and switching commits, branches
date: 2020-10-23 07:05:00
tags: [git]
layout: post
categories: git
id: 728
updated: 2020-10-23 07:57:50
version: 1.6
---

The [git checkout](https://git-scm.com/docs/git-checkout) command in [git](https://git-scm.com/) can be used to switch to another branch, but also to an older commit on the same branch and back again.

One of the nice things about using git, or source control in general is that I can go back to any point in development to which a commit has been made. The git log command can at any point be called to get a list of commit hash ids that can then be used with the git checkout command to switch to any one of those commits.

The checkout command can then be used to switch the current head of the git folder to a given commit, it can also be used to switch back to the latest commit for a branch by just giving the branch name rather than a commit hash id. The git checkout command is then one of sever commands that I or any developer that uses source control should be aware of, so it is worth it to write about a few simple examples of the git checkout command.

<!-- more -->

## 1 - switch back to an older commit with git checkout

In this section I will be going over a simple example that involves creating a basic test git folder. In the folder I will be just creating two commits, and use the git checkout command to switch back to the first commit, and then back to the latest commit.

### 1.1 - create a git folder, a file, and a first commit

The first step here is to have a git folder to work with. I could just clone done something and start using git log and git checkout to navigate around the tree. However for this section I will be creating a new git folder. So I start out by creating a new folder called foo and make foo the current working path. Inside the foo folder I do a git init to make foo a git folder.

Once I have my foo git folder it is time to create some content for it. So I used the echo command and redirection to just create a simple test file called file1.txt. Now that I have a file I can stage the file to be committed by using git add, and then use the git commit command to create the first commit for the git folder.

```
$ cd ~
$ mkdir foo
$ cd foo
$ git init
$ echo 'this is a test file' > file1.txt
$ git add *
$ git commit -m "first commit"
```

### 1.2 - Create a second commit

```
$ echo 'this is another test' > file2.txt
$ git add *
$ git commit -m "file2"
```

### 1.3 - use the git log command to log to the console

```
$ git log --format="%H,%s"
4e7fed1631804288ad873b8cefa9515947bf13df,file2.txt
7142ad43522d02e4fbc50ce41b9ec91b4560ef65,first commit
```

### 1.4 - git checkout

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