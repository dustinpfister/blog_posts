# blog_posts

These are the markdown files that are used to build by website here at github pages which can be found at [https://dustinpfister.github.io](https://dustinpfister.github.io/), along with some additional tools, and outlines in the form of todo lists. 

At the time of this writing the build process involves the use of the node.js powered static site generator called [hexo](https://github.com/hexojs/hexo), however pulling the markdown files into this repo was a first step away from depending on hexo. I have not at this point made any real progress with making my own static website generator just yet, I have a lot of other pots boiling, and for the most part hexo is working okay.

On top of just the markdown files I also have a number of scripts that I am using to run over the collection of content. In additional I also have notes as to what it is I should be doing when it comes to improving, and expanding the collection of content.

<div align="center">
    <a href="https://www.youtube.com/watch?v=AzuB6ExUE64">
        <img src="https://img.youtube.com/vi/AzuB6ExUE64/0.jpg" style="width:50%;">
    </a><br>
    <p>
        <a href="https://dustinpfister.github.io/2022/07/08/threejs-examples-weird-face-one/">Weird Face one</a>
    </p>
</div>

## The /scripts folder

So then on top of just using this as a place to park my markdown files there are also a few scripts that I have made that I am using in the process of figuring out where I should be focusing my time and energy with this.

These scripts do things like ranking each post in terms or word count, or ranking whole collections of content based on how long it has been sense the last time I edited each post. There are a number of other such tools that I use in conjunction with other tools such as Google analytics, search console, and Google trends to gain some sense as what I should be doing when it comes to planing out how I should be focusing my efforts.

## The /todo folder

I have been working out a number of lists that serve as outlines when it comes to what I should be doing next. I still do not have a good system down when it comes to how I go about making choices as to what to write about next with revising old posts, and writing new posts. There are many competing ideas when it comes to this, so I figure I need to have a whole folder to store what I have together thus far when it comes to having some kind of system for continuing with this website.

## 1 - Setup and building the site with hexo

After setting up a new instance of hexo by calling hexo init, clone this repo down, then delete the \_posts folder in the hexo folder and create a new symbolic link for \_posts in place of it pointing to the \_posts folder in this repo. Some of the posts do use custom hexo tags that can be found in my [hexo_sitesource](https://github.com/dustinpfister/hexo_sitesource) repo.

### 1.1 - Making a symbolic link in Linux

In Linux systems \( and I assume most if not all posix systems \) I would use the ln command to make a soft link.

```
$ ln -s /home/github/hexo-project/source/_posts /home/github/blog_posts/_posts
```

### 1.2 - Making a symbolic link in Windows 10

In windows I use the mklink command to make a symbolic link to the _posts folder in this repo.

```
mklink /d C:\path\to\hexo-project-folder\source\_posts C:\path\to\blog_posts\_posts
```

cmd.exe will need to be started with administrator privileges, and the /d option will need to be used as this is a like to a directory.


## Other repositories of interest that involve blog\_posts

* [dustinpfister.github.io](https://github.com/dustinpfister/dustinpfister.github.io) - the current deployment of my github pages site that is built with the markdown found here.
* [hexo_sitesource](https://github.com/dustinpfister/hexo_sitesource) - This repo contains the instance of hexo that I am using, including the theme.