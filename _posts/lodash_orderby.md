---
title: lodash orderby method as an option for sorting collections
date: 2020-01-05 11:00:00
tags: [lodash]
layout: post
categories: lodash
id: 588
updated: 2020-01-05 11:12:31
version: 1.3
---

The lodash orderby method is one of several options in lodash for sorting collections mainly arrays. It works more or less the same way as the lodash sortby method, but it allows for setting the sort orders \( ascending or descending \) of each method that is used to sort the collection.

<!-- more -->

## 1 - lodash orderby basic example

A Basic example of the lodash orderby method could just be passing an array of numbers as the first argument. That kind of example will work the same way as that as such a basic example using lodash sortby. 

The second argument is used to give method that are used for sorting, and the third argument is used to set the ascending and descending order of the sorting though. So with that said another basic example the would showcase the difference of orderby compared to sortby would by to set null as the second argument, and then the string 'desc' for descending rather than the default 'asc' or ascending order.

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1],
asc = _.orderBy(nums),
desc = _.orderBy(nums, null, 'desc');
 
console.log(asc, desc);
 
// [ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
// [ 158, 52, 42, 27, 7, 6, 5, 3, -1, -5 ]
```

So then order by is just a more robust version of lodash sortby that allows for setting the ascending or descending order of the resulting sort of the collection.