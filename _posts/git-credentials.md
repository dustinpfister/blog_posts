---
title: Git credentials
date: 2020-09-18 16:18:00
tags: [git]
layout: post
categories: git
id: 707
updated: 2020-09-18 16:59:03
version: 1.5
---

It is possible to store [git credentials](https://git-scm.com/docs/gitcredentials), or in other words a user name and password for git in a number of ways.

<!-- more -->

## 1 - Setting global credentials with a simple store

### 1.1 - using git config to set up a store

In the command line call git config and then make sure to use the global flag as I do not case to store credentials at a repository level. Afer git config and the global flag type credential.helper followed by a space and then store. Make sure not to spell anything wrong if I do so the values will be stored anyway in there wrong from and got will ignore them. In other words git will not throw any kind of error in that case.

```
$ git config --global credential.helper store
```

Anyway if all goes well the global gitconfig file for the current user on the system will be updated to use the store method for storing credentials. What this means is that next time I push something to a remote, or do anything that will require me to provide a login and password I will be prompted for them one last time.

```
$ git push
Username: demoman
Password: eeeeeeeeefeeeeeeeeefeeeeeeeeefeeeeeeeeef
```

After I enter the username and password for one last time then a .git-credentials file will be created with the given login info. The file will be stored in the home folder of the current user as a hidden file same as gitconfig, or it could be in another location in some other situations.

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

After setting store as the helper in the main global gitconfig file and doing something that will require giving a user name and password at least once there should now be a global git-credentials file. This file will contain a URL to use when authenticating via https.

```
https://demoman:eeeeeeeeefeeeeeeeeefeeeeeeeeefeeeeeeeeef@github.com
```

The documentation recommends not to edit this file directly with an editor but instead let git set it up for me by entering the username and password when prompted. However in some cases I have found that I do have to edit it directly, when doing so it is important to make sure that the file will be edited just the same way that git would do so. Follow the above format, and make sure that you use a line feed to terminate each line.

## 2 - Conclusion

There are a number of other ways to store credentials other then juts a simple plain text store. I understand the security draw backs of having a password stored on my computer, but there are still steps I can take that will help. For one thing I can use a Personal Authentication Token in place of my password for the password on github, and I can restrict the permissions of that token. In addition if someone can get into my computer and find out what the token is I think that means I have bigger security concerns to deal with.

If I do look into other options for storing login credentials with git I will of course get around to updating this post. There are a number of options for setting what the helper is that will store the password, and some of them change depending on the operating system used.