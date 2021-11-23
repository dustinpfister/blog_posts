---
title: The Linux tree command
date: 2021-11-23 11:52:00
tags: [linux]
layout: post
categories: linux
id: 941
updated: 2021-11-23 13:09:47
version: 1.2
---

The [Linux tree command](https://linux.die.net/man/1/tree) is a way to go about listing the contents of a folder in a tree like format. So then the tree command is an alternative command to that of the [Linux ls command](/2020/10/14/linux-ls/) that is another way to go about listing folder contents. By default it would seem like the Linux tree command will list contents of folders recursively when it comes to nested folders and the contents of such folders, which is one reason why one of the first options that one should be familiar with when using the Linux tree command would be the -L option which can be used to set a depth for this recursive listing of contents. Another major thing that comes to mind is the subject of short and hard links that can be created with the [Linux ln](/2021/10/01/linux-ln/) command, and what happens when the tree command follows one that links to the folder itself.

<!-- more -->
