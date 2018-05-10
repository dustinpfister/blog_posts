## blog_posts

These are the markdown files that are used to build by website here at github pages at [https://dustinpfister.github.io](https://dustinpfister.github.io/)

## Setup

After setting up a new instance of hexo by calling hexo init, clone this repo down, then delete the _posts folder in the hexo folder and create a new symbloic link for _posts in place of it pointing to the _posts folder in this repo.

### Windows 10

In windows I use the mklink command to make a symbolic link to the _posts folder in this repo.

```
mklink /d C:\path\to\hexo-project-folder\source\_posts C:\path\to\blog_posts\_posts
```

cmd.exe will need to be started with admin privileges, and the /d option will need to be used as this is a like to a directory.

### Linux

In linux systems I would use the ln command to make a soft link

```
$ ln -s /home/github/hexo-project/source/_posts /home/github/blog_posts/_posts
```