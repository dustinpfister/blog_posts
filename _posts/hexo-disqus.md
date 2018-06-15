---
title: Adding disqus comments to a hexo powered side
date: 2018-06-14 10:12:00
tags: [js,hexo,node.js]
layout: post
categories: hexo
id: 208
updated: 2018-06-14 20:36:21
version: 1.3
---

My very first blog post was on hexo tags, and now and then I still write another post on hexo for what it is worth. I do still use the node.js powered static site generator know as hexo for building my site here at github pages, so it makes sense to write another post now and then when I change something at the least. Becuae my site has recently surpassed ten thousand monthly visitors it seems like it would be a good idea to add comments to this site. In this post I will be writing about the process of adding disqus comments to a hexo powered site.

<!-- more -->

## Hacking over the theme, rather than bothering making a plug in

I would not be to hard to make a hexo plugin for this. However it would be a helper plug in, and I would still need to hack over the theme, and make some additions to the config.yaml file as well so it would only help so much anyway.

So for this post I will just be making some changes to the theme, and adding a few values to the main config.yml file.

## The main config.yml file

The solution I have made involves the url value in the main config.yaml file in the root of a hexo project. This value should be set to the base url of the site.

for my site the url values look like this.
```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://dustinpfister.github.io
root: /
```

In addition to making sure that is in order, I also added some values for disqus.

```
# DISQUS comments
disqus_enabled: true
disqus_shortname: dustinpfister-github-io
```

I set things up so that if for some reason I want to disable comments, and not have them in future builds of the site I can by just setting disqus_enabled to false, and then if i change my mind again it is just a matter of setting that value back to true.

The shortname is like a disqus user name, it is something that is set up once when creating a disqus account for the first time.

## The article.ejs file in my theme

I am using a hacked over copy of the default hexo landscape theme. The article.ejs file is the template file of interest if that is the case. In any case the disqus code should be place somewhere in the theme, and the proper values for the disqus shortname, page url, and page id shhould be used.

```
<% if (!index && post.comments && config.disqus_enabled && config.disqus_shortname){ %>
<section id="comments">
 
<div id="disqus_thread"></div>
<script>
 
var disqus_config = function () {
    this.page.url = '<%= config.url + '/' + post.canonical_path %>';
    this.page.identifier = '<%= post.id || post.canonical_path %>';
    this.page.title = '<%= post.title %>';
};
 
(function() {
var d = document, s = d.createElement('script');
s.src = 'https://<%= config.disqus_shortname %>.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</section>
<% } %>
```

From day one when I started writing blog posts, I have made an id part of the header data for each post. If you want to do something different just make sure that the value is a string that is unique to the page, and will not change if the url changes. If you really want to you can just make this the same as the url, or the title. However if you every change those things for whatever the reason that can of course cause problems because this is what disqus uses to fetch a given thread. I added the or post.canonical_path so that will be used in case someone just copys and pasts this without reading what I said here.