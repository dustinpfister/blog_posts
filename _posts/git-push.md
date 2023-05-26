---
title: Git Push command
date: 2023-05-24 11:51:00
tags: [git]
layout: post
categories: git
id: 1043
updated: 2023-05-26 13:50:09
version: 1.4
---

The [git push](https://git-scm.com/docs/git-push) sub command is how to go about updating a remote with local changes. Of course in order to do this to begin with one will need to set up a remote repository to begin with. So with that said there is also knowing at least a thing or two about the [git remote command](https://git-scm.com/docs/git-remote) as a way to find out if any remotes are set up to begin with, and if need be to add one.

I also wrote a [blog post on the git pull command](/2023/05/18/git-pull/) which does seem to be more or less the counter part of the git pull command, or at least one of them anyway. I say that because there is also the git fetch command as well is a litter different. However in any case there is pulling down changes from a remote, and thus updating the local git folder, and then there is pushing local changes to the remote.

<!-- more -->


## Basic Default get push

Speaking from my experience thus far once a remote is set up, often I can just call the git push command with default options and that will be the end of it. 

```
$ git push
```

The reason why this works for me though is because often with my personal projects I am not doing anything fancy with branching. However in any case this brings up the question as to what the default options are, and why they may, or may not work. Another way of doing the same for me with many of my projects might end up being something like this:

```
$ git push origin master
```

In some cases the name of the main branch might be something other than master. Often the name of the main branch might be something like, well main. However the general idea here is that by default there is a configuration that will be check, and if that is missing origin will be used. 

## The force option of git pull

Thus far I have not found myself in a situation in which I need to use the force option of the git push command. As long as that is still the case I can not say that I will want to list any examples here in this post just yet. However I think that I should at least write down a few quick notes about this force option. With that said the name of the option alone should give one a clear idea as to what this option does. However to be more clear about it this will disable a check that makes sure that the the current commit point of the local repo is an ancestor of the latest remote commit. So simply put this can result in the loss of commits if it is not used with care.

## Conclusion

That will be it for now on the git push command, unless until I come around to edit and expand this post a bit. For the most part this is just a post that I wanted to get out of the way snese I can not say that I have that much to write about with the git push subcommand, at least when it comes to the push command alone anyway.


