---
title: Linux aspell for spellcheck on the command line
date: 2020-10-20 13:11:00
tags: [linux]
layout: post
categories: linux
id: 725
updated: 2020-10-20 17:16:27
version: 1.2
---

The Linux Aspell command is a common spell check command that can be used to preform a spell check on some text. The text can be given to Aspell by way of a file name, or it can be piped in to the standard input of Aspell. The result is a list of stars for each word that is in the used word database for Aspell, or an ampersand for each word that is not in the dictionary followed by some spelling suggestions.

<!-- more -->

## 1 - basic linux aspell example with echo and piping

The -a option in Aspell will allow for text content to be piped in from another command rather than using a file. So for a starting example here I am using the Linux echo command to just create some text with intentional spelling mistakes. I am then piping the text into the Aspell command by using the -a option. The result is then a bunch of lines, noe for each word in the text. Each line of output will begin with a asterisk if there is no spelling mistake for a word, and a ampersand if there is a misspelling, followed by some suggestions.

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