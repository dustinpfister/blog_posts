---
title: Linux awk command for text processing
date: 2021-07-02 08:43:00
tags: [linux]
layout: post
categories: linux
id: 902
updated: 2021-07-02 08:46:56
version: 1.1
---

The Linux awk command is another command like that of grep as it would seem that it is mainly used for text pattern matching tasks.

<!-- more -->

# Basic Linux awk command

```
$ echo -en "text output \nsample text \n" | awk '{print $1}'
```

## 2 - Match static pattern

```
$ echo -en "text output \nsample text \n" | awk '/output/ {print}'
```

## 3 - Match only digits of each line

```
$ echo -en "abc hhh\n123 fgh\nxdf\nzxy 456" | awk 'match($0,/[0-9]+/) {print substr($0,RSTART,RLENGTH)}'
```

