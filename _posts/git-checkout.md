---
title: Git checkout command and switching commits, branches
date: 2020-10-23 07:05:00
tags: [git]
layout: post
categories: git
id: 728
updated: 2020-10-23 07:11:34
version: 1.1
---

One of the nice things about using git, or source control in general is that I can go back to any point in development to which a commit has been made. The git log command can at any point be called to get a list of commit hash ids that can then be used with the git checkout command to switch to any one of those commits.

The checkout command can then be used to switch the current head of the git folder to a given commit, it can also be used to switch back to the latest commit for a branch by just giving the branch name rather than a commit hash id. The git checkout command is then one of sever commands that I or any developer that uses source control should be aware of, so it is worth it to write about a few simple examples of the git checkout command.

<!-- more -->

