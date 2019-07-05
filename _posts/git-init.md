---
title: Git init command for starting new git folders
date: 2019-07-05 18:17:00
tags: [git,node.js]
layout: post
categories: git
id: 499
updated: 2019-07-05 18:44:20
version: 1.5
---

The [git init](https://git-scm.com/docs/git-init) command can be used to create a new git folder, So this is one of the first things to look into when it comes to [getting started with git](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) after having installed git. There is also the git clone command that can be used to make a copy of an existing git folder as well, in either case you end up with a git folder. In this post I will be going over some of the basics when it comes to creating new git folders, there is not much to it when it comes to the basics. However I thought I would make a quick post on this subject just for the heck of it sense I am expanding my content on git as of late. So lets get this one oit of the way so I can get on to more advanced posts on git and source control.

<!-- more -->

## 1 - git init create git folder example

To get started with git init the first thing that I need to do is just create a folder. Once I have a folder I just need to cd into and make that new folder the current working directory. When inside the new folder that i want to make a git folder I just need to call the git init command with no additional arguments and that will result in the creating of a new git folder.

```
$ mkdir project_folder
$ cd project_folder
$ git init
```

Once this is down I now have a git folder. However nothing is tracked, and I also do not have any commits. So there is more to it then just that when it comes to starting a git folder.

### 1.1 - git status to find the current status of the new git folder.

So aside from the git init command there is also the git status command that will give me the current status of the git folder. This will show any files in the folder that have not yet been tracked.

So a git status command might give me something like this.
```
$ git status
On branch master
 
Initial commit
 
Untracked files:
  (use "git add <file>..." to include in what will be committed)
 
        file.md
 
nothing added to commit but untracked files present (use "git add" to track)
$
```

So now that I did that I can see that I have an untracked file that I have added to the folder with a text editor called file.md. I would like to track this file. In order to do so I will need to state the file using the git add command.

## 1.2 - git add command for adding an untracked file to be committed

So now I can use the git add command by just calling git add and then the name of the file I want to stage to be committed. Once I do that when I do a git status I get a very different message.

```
$ git add file.md
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   file.md
```

At this point if I feel that I ahve made a mistake I can use the git rm command as a way to unstage, however I have also found that the git rest command by itself without any additional arguments will give the same result. However If all looks good and I want to continue then the nest step is to make my first commit.