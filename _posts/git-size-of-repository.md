---
title: Git size of repository
date: 2020-09-17 16:035:00
tags: [git]
layout: post
categories: git
id: 706
updated: 2020-09-17 16:42:33
version: 1.1
---

I have some repositories that keep growing in size, so far this has not presented a problem for me, but I can not help but thing that at some point in the future it will sooner or later. So for now I thought I would take a moment tot just foll around with a test got folder of sorts, and do a little research on how to know how big a git repository is to begin with at least.

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