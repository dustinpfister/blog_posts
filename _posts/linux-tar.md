---
title: The Linux tar command for compressions files and folders
date: 2021-11-26 15:02:00
tags: [linux]
layout: post
categories: linux
id: 942
updated: 2021-11-29 15:00:57
version: 1.1
---

The [Linux tar](https://linux.die.net/man/1/tar) command is create for creating archive files from the command line, and the tool can also be used to decompress them also. In this post I will be going over a few examples of the Linux tar command along with a number of other commands and bash features to confirm how this command is useful for compressing things down so they take up less space.

<!-- more -->

## 1 - Linux tar basics

In this section I will be starting out with just a few quick examples of the Linux tar command. While I am at it I will also be using a number of other commands in these examples as a way to quickly create some dummy content to compress. For example there is using the [Linux head](/2021/03/10/linux-head) command to read a few charterers worth of data from the \/dev\/random sudo device and then pipe that threw xxd to get random hex code to which I can then write to a text file by making use of redirection. In real examples the content that is to be compresses might be a text file, or a buch of files and folders in a root folder.

### 1.1 - create a compressed file from random data

For this example I am creating some random hex by using the Linux head command with the random sudo device and then piping that threw xxd. Once I have my file of random hex I can now use the Linux tar command to create a gun zip archive file of that data. When calling the tar command to create an archive I will want to use the -c option that will set tar into create rather than extract mode, after that I will also want to use the -z and -f options also. Next I will want to give a file name for the archive file, an then the source in this case the random hex text file I created.

```
$ head -c 1024 /dev/random | xxd -p > rnd.txt
$ tar -czf rnd.tar.gz rnd.txt
$ du -b rnd.txt
2083	rnd.txt
$ du -b rnd.tar.gz
1327	rnd.tar.gz
```

Once I have created my raw hex file as well as well as the tar file of that text file I can use the Linux du command to see how much space each file takes up. With that said the side of the archive is far less then that of the raw, uncompressed file.

## 2 - Conclusion

That will be it for now when it comes to the linux tar command an d compressing file with it.

