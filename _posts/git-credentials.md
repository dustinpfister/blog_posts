---
title: Git credentials
date: 2020-09-18 16:18:00
tags: [git]
layout: post
categories: git
id: 707
updated: 2020-09-18 16:25:06
version: 1.1
---

It is possible to store [git credentials](https://git-scm.com/docs/gitcredentials), or in other words a user name and password for git in a number of ways.

<!-- more -->

## 1 - Setting global credentials with a simple store

```
$ git config --global credential.helper store
```

```
$ git push

```
