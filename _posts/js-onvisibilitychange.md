---
title: On visibility change event
date: 2020-10-17 15:38:00
tags: [js]
layout: post
categories: js
id: 724
updated: 2020-10-17 15:48:09
version: 1.1
---

The [on visibility change](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) event of the document object in client side javaScript will fire each time the content of a web page will become visible or hidden. So in other words this event will fire each time the tab of a browser window will become visible or invisible as a user switches from one tab to another. This event can be used with other properties of the document object to define logic that is to be applied each time a page becomes hidden or visible.

On top of the on visibility change event there is also the [visibility state property](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState) of the document object that can be used as a way to probe for the status of the page content. Another document property that comes to mind is document title which is a way to set what there title text of a tab is.

<!-- more -->
