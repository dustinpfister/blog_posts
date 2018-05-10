---
title: Hexo structured data keywords tag.
date: 2017-03-28 19:52:00
tags: [hexo,js,node.js,SEO,structured-data]
layout: post
categories: hexo
id: 8
updated: 2017-09-30 18:37:20
version: 2.2
---

{% mytags_postwords !js_core,!hexo_core,SEO,hexo&#32;tags,keywords %}


## Important update

Because I am new to Search Engine Optimization, and boggling, I can not assure that the quality of this post is top notch. In fact I can not confirm that it has any value at all at least with respect to SEO. It may still have value as an example on how to write hexo tags, but I all [ready have a post](https://dustinpfister.github.io/2017/02/04/hexo-tags/) on this that is more appropriate. From what I have gathered recently, keywords may have very little if any impact at helping to improve site rank at Google, or any search engine for that matter. I am also not sure if doing something like this may result in some kind of penalty, as such for now at least I am not doing this on my posts until I learn more about keywords, and SEO in general.

As such in time I may completely re-write this post, for now you have been advised.

<!-- more -->

So I am still pretty new to Search Engine Optimization, as such I have just started fiddling with structured data for what it is worth. For now I am on a mission to see if I can gain some organic traffic without promotion at all. A fools quest maybe, but I am noticing that I am manging to get on the first page of some queries already, so maybe not.

## The basic starting markup.

When I started my hexo site I was using the default theme, and still am for that matter although I have hacked over it a bit by now. I have noticed that the default theme does place some structured data in the markup that gets generated for starters, but when I use Google's testing tool it was telling me that the Type is unknown.

However it was a simple fix to correct that, I just need to give a [schema.org type](http://schema.org/docs/full.html). So I went ahead and made that change in the article.ejs file in the theme.

```html
<article itemscope itemtype="http://schema.org/Blog" id="post-hexo-tags-structureddata-keywords" class="article article-type-post" itemprop="blogPost">
```

After that I looks like Google is reading things okay when my site is crawled. At that point it is just a question if I want to add some more properties. Assuming that doing so will help, I have noticed that there is a keywords property for the CreativeWork type. So I thought it would be nice to have a meta tag with some keywords for each blog post of mine.

## The hexo tag

My first post was on [hexo tags](https://dustinpfister.github.io/2017/02/04/hexo-tags/). Tags are what is used in hexo to generate and inject html snippets into posts. As such I thought a tag would come in handy to help with keywords for a blog post.

```js
hexo.extend.tag.register('mytags_postwords', function (args) {
 
    // groups of keywords
    var keyGroups = {
 
        js_core : 'js,javaScript,core&32;javaScript',
        js_node : 'node.js,nodejs,sever,backend',
        hexo_core : 'hexo,hexo.io,static&32;site&32;generator'
 
    };
 
    // the output string of keywords
    str = '',
 
    // split the string into an array
    keyList = args[0].split(',');
 
    // run threw the keyList, build keyword string, and look for key groups
    keyList.forEach(function (keyword) {
 
        // the group name (if a group)
        var groupName = keyword.substr(1, keyword.length);
 
        if (keyword.match(/!\w+/)) {
 
            // if we have group keywords, add them in
            if (keyGroups[groupName]) {
 
                str += keyGroups[groupName] + ',';
 
            }
 
        } else {
 
            // else just add in the keyword
            str += keyword + ',';
 
        }
 
    });
 
    // return the keywords
    return '\n<meta itemprop="keywords" content="' + str.substr(0, str.length - 1) + '">\n';
 
});
```

So then I call it with something like this at the top of my markdown files.

```
{% mytags_postwords !js_core,!hexo_core,SEO,hexo&#32;tags,keywords %}
```

And it will inject a meta tag into my post like this

```html
<meta itemprop="keywords" content="js,javaScript,core&32;javaScript,hexo,hexo.io,static&32;site&32;generator,SEO,hexo&#32;tags,keywords">
```

I could just have meta tags like this at the top of each mark down file, but I prefer to handle it this way.

## keyGroups

I made it so that I can define keywords that are very unique to the content of the post, however it is true that I have also thrown in support for what I am calling key groups. The idea here is that all of my posts should pertain to certain general topics. In any post I will throw in one or more keyGroups that are relevant to the post. If need be I can than tweak what those keywords are, by changing what they are in the keyGrops object.

## Google's structured data testing tool

[google's structured data testing tool](https://search.google.com/structured-data/testing-tool/u/0/) can be used to see if my structured data is working out okay or not. I can give a url, or copy and past markup which is nice when working on things before deployment.

## Do keywords still matter?

Good question I am not sure just yet, as I have not dived into the thick of it when it comes to understanding [Googles Panda algorithm](https://en.wikipedia.org/wiki/Google_Panda) when it comes to how it handles keywords, if at all. However from what I have gathered structured data can improve organic traffic. However so far it would seem that what matters most, is just simply the content itself, and back links, but thats another post.

## conclusion

Be sure to check out my other posts on [hexo](/categories/hexo/)