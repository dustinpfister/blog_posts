---
title: Using ffmpeg to create videos in Linux
date: 2022-03-04 13:38:00
tags: [linux]
layout: post
categories: linux
id: 965
updated: 2022-03-04 14:31:00
version: 1.7
---

The [ffmpeg command](https://ffmpeg.org/ffmpeg.html) can be used to create videos from a collection of frames, as well as a wide range of other tasks such as creating a new collection of frames with one or more filters applied to scale, crop, and noise and much more. So when it comes to just about anything video related in Linux this is the default goto solution for editing video from the command line. There are a lot of other great programs to work with in Linux to edit video though, such as OpenShot which is one of my favorite options thus far. However often a great many of these video editing programs are for the most part just graphical front ends for ffmpeg.

<!-- more -->


## 1 - Basic example of creating a video from a collection of frames

When I was first starting out with ffmpeg I was in a situation in which I was using a program of mind that exports video as a collection of frames where I have a png file for each frame. I then Just wanted to create an mp4 video file from this collection of image files.

```
$ ffmpeg -framerate 30 -i ./frames/frame-%04d.png video.mp4
```

One thing that I noticed is that the order in which options are passed is important, and can result in differing output results. For example I was creating an animation project that consisted of 600 image files, and at a frame rate of 30 the end result should be a 20 second video, but yet I was ending up with a 24 second video. After some quick research reading the manual page, and other sources I have found that I was just messing up with the order of the options and now I am getting a 20 second video for that specific collection of frames.

There is another problem that I also noticed right away and that was that the output videos where not working in every program that I would use to playback a video. Mainly it was not working in Video Lan Client, so that lead be to believe that I must be neglecting a few additional options beyond just that of frame rate and input. So then lets look at some more examples of ffmpeg to get to the bottom of this.

## 2 - Codecs and  pixel formats

My first thought as to why the export videos where not working in VLC must be that by default ffmpeg mjust be using some kind of codec or some kind of advanced feature that will work with ffmpeg and certain other programs but not with many other media players. First off I would like to know what codecs I have to work with and to do that there is the codecs option that can be used to find out what codecs there are to work with.

```
$ ffmpeg -codecs
$ ffmpeg -pix_fmts
```

There is also the pixel formats option that is another useful option that will list what all the options are when it comes to pixel formats.

## 3 - Using the pixel format option to get the output video to work with Programs like VLC, Windows Media Player, and so forth

So now about [addressing the issue that has to do with the output videos not working in media player programs like that of VLC](https://superuser.com/a/705070). It turns out that the problem was not so much with the codec, but the pixel format that was being used by default. So then by setting a better value for the pixel format option, well better in terms of getting it to work in a wider range of media players rather than the quality of the video at least, I as able to get the exports working in VLC.

```
$ ffmpeg -framerate 30 -i ./frames/frame-%04d.png -pix_fmt yuv420p video.mp4
```

In the version of ffmpeg that I as using it seems that it was defaulting to h264 in terms of the codec which works fine in the version of vlc that I was using. Maybe there are some reasons why I would want to use some other codec, but that might be a matter for another section in this post or maybe even a whole other post completely. So far things seem to be working great in terms of what I am exporting so for now I might just want to look into some options when it comes to filters.

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

