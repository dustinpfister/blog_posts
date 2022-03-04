---
title: Using ffmpeg to create videos in Linux
date: 2022-03-04 13:38:00
tags: [linux]
layout: post
categories: linux
id: 965
updated: 2022-03-04 14:06:33
version: 1.3
---

The [ffmpeg command](https://ffmpeg.org/ffmpeg.html) can be used to create videos from a collection of frames, as well as a wide range of other tasks such as creating a new collection of frames with one or more filters applied to scale, crop, and noise and much more. So when it comes to just about anything video related in Linux this is the default goto solution for editing video from the command line. There are a lot of other great programs to work with in Linux to edit video though, such as OpenShot which is one of my favorite options thus far. However often a great many of these video editing programs are for the most part just graphical front ends for ffmpeg.

<!-- more -->


## 1 - Basic example of creating a video from a collection of frames

```
$ ffmpeg -framerate 30 -i ./frames/frame-%04d.png video.mp4
```

## 2 - Codecs and  pixel formats

```
$ ffmpeg -codecs
$ ffmpeg -pix_fmts
```

## 3 - Using the pixel format option to get the output video to work with Programs like VLC, Windows Media Player, and so forth

So now about [addressing the issue that has to do with the output videos not working in media player programs like that of VLC](https://superuser.com/a/705070) by setting a better value for the pixel format option, well better in terms of geting it to work in a wider range of media players rather than the quality of the video at least.

```
$ ffmpeg -framerate 30 -i ./frames/frame-%04d.png -pix_fmt yuv420p video.mp4
```

## 4 - Using a scale filter to create a new collection of frames

```
$ mkdir -p ./frames-scale
$ ffmpeg -i ./frames/frame-%04d.png -vf scale=320:240 ./frames-scale/frame-%04d.png
```

## 5 - Using a scale filter to create a new collection of frames

```
$ mkdir -p ./frames-crop
$ ffmpeg -i ./frames/frame-%04d.png -vf crop=320:240:160:120 ./frames-crop/frame-%04d.png
```

## 6 - Using a scale filter to create a new collection of frames

```
$ mkdir -p ./frames-noise
$ ffmpeg -i ./frames/frame-%04d.png -vf noise=alls=20:allf=t+u ./frames-noise/frame-%04d.png
```

## 7 - Conclusion

