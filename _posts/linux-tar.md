---
title: The Linux tar command for compressions files and folders
date: 2021-11-26 15:02:00
tags: [linux]
layout: post
categories: linux
id: 942
updated: 2023-07-03 09:50:49
version: 1.13
---

The [Linux tar](https://linux.die.net/man/1/tar) command is great for creating archive files from the command line, and the tool can also be used to decompress them also of course. There are a number of options when it comes to the various kinds of compressed files such as gun zip, and bz2. There is also maybe a thing or two to write about when it comes to all kinds of other various options of the tar command, as well as other commands that might be closely related to the use of the tar command also.

In this post I will be going over a few examples of the Linux tar command along with a number of other commands and bash features to confirm how this command is useful for compressing things down so they take up less space.

<!-- more -->

## 1 - Linux tar basics

In this section I will be starting out with just a few quick examples of the Linux tar command. While I am at it I will also be using a number of other commands in these examples as a way to quickly create some dummy content to compress. For example there is using the [Linux head](/2021/03/10/linux-head) command to read a few charterers worth of data from the \/dev\/random sudo device which is one of many such options in the [dev folder of a Linux system](/2021/11/17/linux-folders-dev/). I then pipe that threw the [Linux xxd](/2021/11/19/linux-xxd) to get random hex code to which I can then write to a text file by making use of redirection. Another option for creating some quick dummy content would be to use the yes command with the Linux head command again also.

In real examples the content that is to be compresses might be a text file, or a bunch of files and folders in a root folder. However in any case in this section I will be going over just a few simple examples that have to do with creating a compressed file, and then extracting such a file.

### 1.1 - create a compressed file from random data

For this example I am creating some random hex by using the Linux head command with the random sudo device and then [piping that threw](/2020/10/09/linux-pipe/) xxd. I am then using another cool bash feature called [redirection](/2020/10/02/linux-redirection/) to create a file as an end result of all of this.

 Once I have my file of random hex I can now use the Linux tar command to create a gun zip archive file of that data. When calling the tar command to create an archive I will want to use the -c option that will set tar into create rather than extract mode, after that I will also want to use the -z and -f options also. Next I will want to give a file name for the archive file, an then the source in this case the random hex text file I created.

```
$ head -c 1024 /dev/random | xxd -p > rnd.txt
$ tar -czf rnd.tar.gz rnd.txt
$ du -b rnd.txt
2083	rnd.txt
$ du -b rnd.tar.gz
1327	rnd.tar.gz
```

Once I have created my raw hex file as well as well as the tar file of that text file I can use the Linux du command to see how much space each file takes up. With that said the side of the archive is far less then that of the raw, uncompressed file.

### 1.2 - Extract a compressed file

Now for an example that involves creating a source file, creating a compressed file from the source file, and then deleting the source file. I should then be able to bring back the uncompressed source file by extracting it from the compressed file that was created from it using tar then.

So then this time I am using the yes command to repeat a string over an over again and then piping that to the head command once again to redirect to a file just for the sake of creating some dummy content to compress. Once I have my dummy content I once again use the Linux tar command to create a gun zip file, but this time I am using the [Linux rm command](/2021/07/05/linux-rm/) to delete the source file, at which point I just have the gun zip file of the source file I created with yes and head.

However that is not a big deal as the file is not anything impotent, just some dummy content that repertoires something that is important, and even if it was I can bring it back by using the Linux tar command once more to extract that source file from the gun zip file. So I call the Linux tar command with the -x option and then give the path to the gun zip file, the foo.txt file is then extracted. I am then just using the [Linux cat command](/2020/11/11/linux-cat/) to read the contents of the file out to the standard output.

```
$ yes "Hello World" | head -c 1024 > foo.txt
$ tar cvfz foo.tar.gz foo.txt
$ du -b foo.txt
1024    foo.txt
$ du -b foo.tar.gz
142     foo.tar.gz
$ rm foo.txt
$ tar xvf foo.tar.gz
foo.txt
$ cat foo.txt | head -c 12
Hello World
```

## 2 - Conclusion

That will be it for now when it comes to the Linux tar command, and compressing as well as extracting files with it. I do get around to editing and expanding my content on Linux now and then, but for now I wanted to at least cover some of the basics when it comes to this command. One other option that I have wrote a blog post on thus far would be the l[inux unar option](/2023/07/03/linux-unar/) which is a great tool for extracting formats like that of rar and 7zip.

