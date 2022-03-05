---
title: Using ffmpeg to create videos in Linux
date: 2022-03-04 13:38:00
tags: [linux]
layout: post
categories: linux
id: 965
updated: 2022-03-05 08:28:25
version: 1.10
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

My first thought as to why the export videos where not working in VLC must be that by default ffmpeg must be using some kind of codec or some kind of advanced feature that will work with ffmpeg and certain other programs but not with many other media players. First off I would like to know what codecs I have to work with and to do that there is the codecs option that can be used to find out what codecs there are to work with.

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

So now that I have the basic idea of how to go about creating a video from a collection of frames out of the way I am thinking that I should look into what there is to work with when it comes to filters in ffmpeg. These filters can be applied to an output that is a video file, and in many cases that might very well be what I want to do. However the output can also be another collection of image files for each frame also.

What this means is that the program that I am using to create the collection of image files can be used to export a collection of high resolution frames, and then from there I can use the scale filter in ffmpeg to create video files for that high resolution, and then videos for one or more lower resolutions also. However if I want another collection of frames because for one reason or another that is how I have to import into another program I can again use ffmpeg to do that by just using the same pattern for input as output only changing what the target path is for the files.

```
$ mkdir -p ./frames-scale
$ ffmpeg -i ./frames/frame-%04d.png -vf scale=320:240 ./frames-scale/frame-%04d.png
```

So then say I again have a collection of source frames each with a resolution of 640x480 in a frames folder, and I want to create a whole other folder of frames that is scaled down to say 320x240. Just like before I can use a pattern for the input frames when using the -i option, but then for output I will want to use the -vf option to make use of the scale filter. There are several formats for setting the width and height of the desired output resolution, for this example I went with a colon but other formats will work.

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

