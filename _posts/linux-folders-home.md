---
title: The Linux Home Folder
date: 2021-11-12 11:23:00
tags: [linux]
layout: post
categories: linux
id: 937
updated: 2021-11-12 11:59:21
version: 1.1
---

In a Linux system the home folder is where all the personal files are stored for each user of a system. This is not just a place to store data files like documents, pictures, and so forth but also things like user configuration settings, and bash scripts that are to run when the user first logs in. There is also thinking not just in terms of this kind of folder in terms of a Linux system but also what the equivalent typical location is for this kind of folder on other operating systems also.

<!-- more -->

## 1 - Linux home basics

### 1.1 - Using the cd command to change the working folder to the home folder

```
$ cd ~
$ pwd
```

### 1.2 - The $HOME environment variable

```
$ echo $HOME
```

### 1.3 - Using the Linux ls command to list the contents of the home folder

```
$ ls ~ -a
```


## 2 - The .bashrc file

### 2.1 - basic .bashrc file example

```
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

### 2.2 - basic .bash\_aliases example

```
# some more ls aliases
alias ll='ls -l'
alias la='ls -A'
alias l='ls -CF'
```

## 3 - Using nodejs

### 3.1 - The os module home dir method

```js
#!/bin/node
const os = require('os');
console.log(os.homedir());
```