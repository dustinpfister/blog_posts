---
title: Hexo site sitemap automation with hexo-generator-sitemap
date: 2017-05-02 10:06:00
tags: [js,hexo,automation]
layout: post
categories: hexo
id: 16
updated: 2017-09-30 18:37:20
version: 1.1
---

I have been looking for a good solution for automating the process of maintaining my sitemap with my [hexo](https://hexo.io/) site. As I keep adding more content, and the site continues to grow, having a sitemap is going to just become yet even more important than it is to begin with. I have written a post on sitemaps before a few days ago, but I just cover what they are, and why they are important, and how to put one together manually. In this post I will write about the current solution I am using to automate the process of maintaining a sitemap called [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap).

<!-- more -->

## Install hexo-generator-sitemap

I assume you are node competent, and are using hexo as your static site generator, in which case you just need to know this then.

```
$ npm hexo-generator-sitemap --save
```

Yes I saved it as a dependency of my hexo site source project, and as such it will be in my hidden node_modules folder of the hexo site working tree. Once installed I just need to add a few lines to my _config.yml file, and then I am ready to start work on the template xml file.

# What to add to the main hexo _config.yml

I just placed this at the bottom of the main _config.yml file that should be at the root level of the hexo working tree.

```
# Sitemap
sitemap:
  path: sitemap.xml
  template: ./sitemap_template.xml
```

As you may have guessed yes the sitemap will be called sitemap.xml, and yes it will be at the root namespace of the site build in the public folder when you generate your site. Before doing so you will want a template file the location of which in this example is placed in the root name space of the hexo project.

## The template file

Here is the example template given at the [github page](https://github.com/hexojs/hexo-generator-sitemap/blob/master/sitemap.xml) of the project.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for post in posts %}
  <url>
    <loc>{{ post.permalink | uriencode }}</loc>
    {% if post.updated %}
    <lastmod>{{ post.updated.toISOString() }}</lastmod>
    {% elif post.date %}
    <lastmod>{{ post.date.toISOString() }}</lastmod>
    {% endif %}
  </url>
  {% endfor %}
</urlset>
```

Swig can be used to get whatever needs to be done with javascript. For now I am just using this, as the blog posts are all that I really care about when it comes to getting pages indexed quickly.

## Conclusion.

That is all, from now on an up to date sitemap should show up in the public folder every time your site is generated. The only big concern is seeing that the map is properly submitted, or resubmitted each time when updating the site. There is also the problem of reaching a limit if the site grows big enough, but I don't see myself writing fifty thousand blog posts any time soon, so I think I'm good.

Be sure to check out my other posts on [hexo](/categories/hexo/)