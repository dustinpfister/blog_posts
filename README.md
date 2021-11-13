# blog_posts

These are the markdown files that are used to build by website here at github pages at [https://dustinpfister.github.io](https://dustinpfister.github.io/). At the time of this writing the build process involves the use of the node.js powered static site generator called [hexo](https://github.com/hexojs/hexo), however pulling the markdown files into this repo was a first step away from depending on hexo. However I have not at this point made any real progress with making my own static website generator just yet, I have a lot of other pots boiling, and for the most part hexo is working okay.

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