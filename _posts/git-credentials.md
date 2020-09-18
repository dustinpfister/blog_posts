---
title: Git credentials
date: 2020-09-18 16:18:00
tags: [git]
layout: post
categories: git
id: 707
updated: 2020-09-18 16:45:02
version: 1.3
---

It is possible to store [git credentials](https://git-scm.com/docs/gitcredentials), or in other words a user name and password for git in a number of ways.

<!-- more -->

## 1 - Setting global credentials with a simple store

### 1.1 - using git config to set up a store

```
$ git config --global credential.helper store
```

```
$ git push
Username: demoman
Password: eeeeeeeeefeeeeeeeeefeeeeeeeeefeeeeeeeeef
```

## 1.2 - The .gitconfig file

The global gitconfig hidden file should have at least some records for user to begin with, if not some additional calls of the git gonfig command car in order for the user.name, and user.email parts of the .gitconfig file. In any case when setting the credential part of the file there should be at least the helper field that tells git to use a simple store.

```
[user]
    name = dustinpfister
    email = dustin.pfister@gmail.com
[credential]
    helper = store
```

### 1.3 - The .git-credentials
The git-credentials file should look like this

```
https://demoman:eeeeeeeeefeeeeeeeeefeeeeeeeeefeeeeeeeeef@github.com
```

## 2 - Conclusion

There are a number of other ways to store credentials other then juts a simple plain text store. I understand the security draw backs of having a password stored on my computer, but there are still steps I can take that will help. For one thing I can use a Personal Authentication Token in place of my password for the password on github, and I can restrict the permissions of that token. In addition if someone can get into my computer and find out what the token is I think that means I have bigger security concerns to deal with.

If I do look into other options for storing login credentials with git I will of course get around to updating this post. There are a number of options for setting what the helper is that will store the password, and some of them change depending on the operating system used.