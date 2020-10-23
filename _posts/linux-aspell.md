---
title: Linux aspell for spellcheck on the command line
date: 2020-10-20 13:11:00
tags: [linux]
layout: post
categories: linux
id: 725
updated: 2020-10-23 12:26:17
version: 1.8
---

The [Linux Aspell](http://aspell.net/) command is a common spell check command that can be used to preform a spell check on some text. The text can be given to Aspell by way of a file name, or it can be piped in to the standard input of Aspell. The result is a list of stars for each word that is in the used word database for Aspell, or an ampersand for each word that is not in the dictionary followed by some spelling suggestions.

So this will be a quick [post on how to go about using Aspell in a Linux environment](https://www.howtoforge.com/linux-aspell-command/) where the command is available to preform a spelling check on some text.

<!-- more -->

## 1 - Basic Linux Aspell example with echo and piping

The -a option in Aspell will allow for text content to be piped in from another command rather than using a file. So for a starting example here I am using the Linux echo command to just create some text with intentional spelling mistakes. I am then piping the text into the Aspell command by using the -a option. The result is then a bunch of lines, one for each word in the text. Each line of output will begin with a asterisk if there is no spelling mistake for a word, and a ampersand if there is a misspelling, followed by some suggestions.

```
$ echo 'my consense is cler' | aspell -a
@(#) International Ispell Version 3.1.20 (but really Aspell 0.60.7-20110707)
*
& consense 18 3: con sense, con-sense, condense, nonsense, condenser, consents, concerns, conses, consigns, convenes, consensus, conscience, consent, concern's, consent's, Jansen's, Jensen's, Jonson's
*
& cler 8 15: cl er, cl-er, clear, clerk, Cleo, clew, Clem, clef
```

using the suggestions I then made the necessary revisions. When I run the command again I get nothing but asterisks meaning that there are no spelling mistakes.

```
$ echo 'my conscience is clear' | aspell -a
@(#) International Ispell Version 3.1.20 (but really Aspell 0.60.7-20110707)
*
*
*
*
```

So if I wanted to I could run this output threw some additional commands or better yet custom scripts to create some format that could be used to quickly add a spell check feature to a text editor program or something to that effect. However if I do not want to go there the trouble of that I  can use this interactive mode when it comes to using Aspell on a file. So lets look at a few more examples of Aspell in action when it comes to using it with a file rather than some text create with echo.

## 2 - Using Aspell with a file

So it is great that I can pipe some text into Aspell and get something that I can potential use to create a spell check application. However if I just want to use Aspell to spell check a single file in the command line in an interactive way it would be best to use the -c option and give the filename that I want to spell check after that.

### 2.1 - A basic aspell file example

So say once again I use the Linux echo command to make a simple amount of text with intentional spelling mistakes in it. However this time I use Linux redirection to create a file called foo.txt.

```
$ echo 'my consense is cler' > foo.txt
$ aspell -c foo.txt
```

Once I have my foo.txt file I can then call Aspell and use the -c option along with foo.txt to preform a spell check on the file. After doing so I will end up getting an interactive terminal based menu that can be used to spell check the file. I can use number buttons on the keyboard to select from suggestions, or use the i key to ignore a word that was found. Eventual I will end up going there all the misspelled words, and the program will stop, at which point I will end up back at the command line. However now I will have a revised foo.txt file without any of the spelling mistakes.

### 2.2 - making it so there is no backup file

When using aspell on the command line by default aspell will create a backup file of the file that I am editing. Often I am using source control when it comes to maintaining a collection of written text files. One example is this very post that you are reeading right hear actually. So this feature is not needed as I can always use git to go back to a later state if I want to.

So when it comes to useing aspell on the command line to spell check a file in place, often I wish to disable this feature. To do so I just need to also use the -x option along with the -c option to set the file to check.

```
$ echo 'my consense is cler' > foo.txt
$ aspell -x -c foo.txt
```

So then this will spell check the file in place, and on top of that not pollute the folder in which I am working with backup files.

## 4 - Conclusion

The Linux Aspell command is often there in the user software folder of most Linux systems that can be used as a quick effective spell check program in a terminal environment. The program can be used after writing something with text editor such as nano or vi or many other such editors in Linux that often lack this feature. Many editors will make use of Aspell actually, as they just provided a graphical front end to make use of it. 