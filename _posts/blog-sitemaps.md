---
title: Sitemaps
date: 2017-04-28 12:30:00
tags: [js,hexo,blog,node.js,SEO,automation]
layout: post
categories: blog
id: 15
updated: 2017-09-30 18:50:26
version: 1.6
---

When authoring a blog, or any website for that matter there is the importance of getting indexed by the crawlers of major search engines. The crawlers of search engines will come around to your site every now and then, and index a page or two, before moving on to the next site. The crawler in most cases will not index the whole site each time, and it is easy to understand why, as they have a whole Internet to crawl.

<!-- more -->

As such it may be desired to leave instructions for the crawlers to inform them what pages are most important to you. A sort of priority list that will help to ensure that the new posts that you just authored will get indexed sooner rather than later, and that old post that you just updated will be reevaluated. This is where sitemaps come into play.

## Do you need to bother with a sitemap?

If you have a very small site that is not updated that often there is not much of a need for a sitemap. Google's crawler will come around, and if you do not give it instructions it will make choices for you. Eventually your site will get indexed, it might just take a while longer for changes to a certain priority page to appear in search results. Still it does not hurt to have one anyway to help get new content indexed quickly.

If you have a a site that has many pages, with content that keeps getting added, and updated often, a sitemap starts to become more important. Say you have some three hundred blog posts, with additional pages that serve as various indexes based on subject matter, and additional pages that all together pertain to the over all structurer of the site as a whole. You just added two new posts, and updated 4 more. With a sitemap you can set high priority values to the new, and updated content, as well as inform crawlers to the time at which the content was updated and added.

## Example of a sitemap.xml file

```xml
<?xml version="1.0" encoding="UTF-8"?>
 
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 
    <url>
 
        <loc>https://dustinpfister.github.io/2017/04/17/blog-sitemaps/</loc>
        <changefreq>monthly</changefreq>
        <lastmod>2017-04-28</lastmod>
        <priority>1</priority>
    </url>
 
</urlset>
```

Above is a sitemap example that gives instructions on how my site is to be crawled. It is not a practical example, but it should help show how to get stared with this. A real sitemap will typically have a url element for each of the blog posts, with properties set to relevant values as content is added, and updated.

### loc

This is simply the location that is to be crawled, it should be an exact url to the page or location.

### changefreq

The frequency at which the content is updated values for this can be always, hourly, daily, weekly, monthly, yearly, and never. Setting a value of always will not make crawlers constantly come back to the page every second, and if you set a value of never a crawler may still pop in now and then anyway. These are hints, not commands, and some crawlers may not even look at this value, it depends on the crawler.

### lastmod

Think about how you would design a crawler if you where to take the time to make one, yes this value is important. In my example I used the yyyy-mm-dd (2017-04-28) format, but you can use any format supported by [ISO 8601](https://www.w3.org/TR/NOTE-datetime). To set the time it can be done following the format of YYYY-MM-DDThh:mmTZD (2017-04-28T11:42:00.000Z).

## priority

This can be used to help indicate what should be indexed first. The value range is between 0, and 1.

## sitemap index

If a site grows large enough it might come time to split one sitemap file into many and use an index for the collection of files. It would have to be a site that has over some fifty thousand pages that need to be index. So if you are like me, and have less than a hundred blog posts this is something that you will likely not have to worry about any time soon.

The only reason why I might want to have one is if I do something that will result on a really large collection of tag pages, and I would want them all indexed. So far I do not have them as part of my main sitemap, but I am not doing anything to keep them from getting indexed as well. I have noticed that they are helping me gain some insights in [Google search console](https://www.google.com/webmasters), so it may be of interest to have a map for them.

Although it is not required I could have a sitemap_posts.xml, sitemap_tags.xml, and use sitemap.xml, as an index for them. Doing so is simple enough.

```
<?xml version="1.0" encoding="UTF-8"?>
 
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 
    <sitemap>
 
        <loc>http://dustinpfister.github.io/sitemap_posts.xml</loc>
        <lastmod>2017-04-28T13:20:4+00:00</lastmod>
 
    </sitemap>
 
    <sitemap>
 
        <loc>http://www.example.com/sitemap_tags.xml</loc>
        <lastmod>2017-04-28</lastmod>
 
    </sitemap>
 
</sitemapindex>
```

As long as the number of urls is under a few thousand, it is not really a big deal to have everything in a single file. Also if you do have many files, it may not be necessary to bother with an index. With Google search console at least each file can be submitted individually regardless if you have an index or not. Still it does not hurt to have one, if it is called for.

## Submiting a sitemap.

Testing and submitting a sitemap is simple with Google. It's just a matter of doing so at the [search console](https://www.google.com/webmasters/). Once you have the site added to your account, just check out the sitemaps section, under crawl in the menu for the site in question. click add test sitemap and enter the path to the sitemap.xml file you put together, and click test. If all goes well do the same and add it.

Google's search console will display how much content is submitted with the map, and of that how much has been indexed. You can also delete, and re summit the sitemap when you update the site.

## Sitemap automation

As a site grows it will become increasingly important to find a way to automated the task of generating one or more sitemaps. I started out writing mine manually, and it did quickly start to become a little time consuming, in addition there are concerns with errors when making a sitemap manually.

### Sitemap automation with hexo-generator-sitemap

I was able to find a great sitemap automation solution for hexo called [hexo-generator-sitemap](https://www.npmjs.com/package/hexo-generator-sitemap), be sure to check out my [full blog post on it](https://dustinpfister.github.io/2017/05/02/hexo-sitemap-automation/). It is just a quick npm install, set a few settings, copy and past a template and you are done kind of thing which is great.

### My own sitemap automation solution

In between reading up on sitemaps, why they are important, and researching what my options where, I managed to developed my own solution for sitemap automation. At the time I was note sure if I could find something that works the way I want it to, and as such I would have to write my own. Of course shortly after getting a functioning feature complete prototype together I found hexo-generator-sitemap and have decided to go with that for now, as it does what I want, and I like it way better then what I put together.

Still I will give myself some credit, so far it is the only node.js solution I have that can potentially work out okay in a non-hexo environment. Until I find something that does that, I might have to dust it off at some point. It was also a decent learning experience also which is often the case when I work on something like this. I might make a blog post about it, but don't hold your breath.

## Conclusion

Be sure to check out my many other [posts on blogging](/categories/blog/).