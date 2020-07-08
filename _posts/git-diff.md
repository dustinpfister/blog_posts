---
title: Git diff examples
date: 2020-07-07 17:01:00
tags: [git]
layout: post
categories: git
id: 677
updated: 2020-07-08 13:24:13
version: 1.4
---

The [git diff](https://git-scm.com/docs/git-diff) command is useful for finding changes between two commits when using git for source control. there are many options for formatting the output also, so for one example say I am just interesting in getting a list of files that have changed from a given starting and ending commit it, such a task can be completed by using the git diff command with the name only option.

I am also a javaScript developer so this post will also be on a few quick examples that make use of the child process module in core nodejs to make git command calls that help get a list of files that have changed between tow commits in a repository. However I will be going over some examples that can just be used in the command line interface also of course.

<!-- more -->


## 1 - Git log and git diff --name-only for getting a list of files that changed

So one task that comes to mind is that I would like to have a way to just get a list of files that have changed from one commit to the next. I could use the git diff command with the --name-only command, but first I will want two commit ids before hand. So I can also use the [git log](/2019/05/29/git-log/) command to get a list of commit ids for say the last twenty commits of a repository. While I am at it I can also use the format option of the git log command to format the output so that it will just spit out commit id values.

```
$ git log -n 20 --format="%H"
d400b26b1262cc472422daacada58cc223e14f56
60a61eecc71c285e3a45f630d4bf9694b111c723
a7f6a4c4628ac9364959eae2734fb9fe7169e5fc
177fbf686774e33bbd3052b85fee7851a38c91e9
9c50450f33bbc172f534522a2c3ddb0124c75b76
9cba08cdd1e20922246893e7af365e89ec078b71
924406ece0ca6e7700085810a18d4d97d5b198ad
621bb77c7b2dc16b7cc11787a601072e06aa8040
429ae30f656f345d32d23f97ec99c1c6f1c3de66
1c2ace8e3032e13dacffddc0940eaed164da05a4
b00649e701606ad8c300de4f59964f7f4cf95373
ea0999ff3b9048533338ba4ede89da659a9db480
f3afdede77a69b638b39b6d9b0bb2a226568b5e7
75721127f491993a221211ba76e7fad06e6fdc49
dc1f6b48ddbec8fd7dea1d70a43f847f1ab1a5bf
fc891d25b2a11afb415857ad7ec113b150857173
33bdcf1ec5d9cf447ce223847302e6ef44b4c393
890ee71c4723ef55a1e3cd46e4259406d8dd08c8
92da29de41be142e636ecadef6e82ae47b159840
48b3efa92ee8711da5c825e4a3301a39d8b26467
```

Now that I have a list of commit ids going back some twenty commits I can use these to find out what files have chnaged from the oldest commit up to the latest one.

```
git diff 48b3efa92ee8711da5c825e4a3301a39d8b26467 d400b26b1262cc472422daacada58cc223e14f56 --name-only
_posts/canvas-example.md
_posts/git-diff.md
_posts/js-javascript-scope.md
_posts/js-nth-root.md
_posts/js-string-charat.md
```