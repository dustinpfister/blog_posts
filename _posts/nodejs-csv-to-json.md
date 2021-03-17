---
title: converting csv spreadsheets to json using node.js with the csvtojson npm package
date: 2018-02-12 22:00:00
tags: [js,node.js,statistics,JSON]
layout: post
categories: node.js
id: 152
updated: 2021-03-17 13:30:55
version: 1.3
---

I thought about maybe making some projects where I work with some data from my google analytics statistics. Grabbing the data is simple enough, but there is no option to download the data in \*.json format, but there is an option for \*.csv. So all I need is some kind of tool to help me convert data in a \*.csv to \*.json. I prefer to do just about everything with [node.js](https://nodejs.org/en), and as such I was able to come across something called [csvtojson](https://www.npmjs.com/package/csvtojson) which is one user space solutuon for converting a csv file to json.

<!-- more -->

## 1 - Use as a CLI tool

To test this out I downloaded a \*.csv file from within [google analytics](https://www.google.com/analytics) that contains the number of users that visited my site for each day of the year in 2017, which I renamed to 2017.csv.

So I have the data that I want, now I just need a way to automate the process of converting it into clean \*.json for this csvtojson can help.

Assuming you have node.js, and npm installed, the package can be installed globally.

```
$ npm install -g csvtojson
```

Once installed, I can use it as a CLI tool to convert *.csv to *.json

```
$ csvtojson 2017.csv > 2017.json
```

Although the output is a bit messy I more or less have what I want. The JSON ends up being an array of objects, one for each row in the spreadsheet.

## 2 - Clean up the CSV source

So then the csvtojson module seems to use the values set in the first cell of each column of a spread sheet as the key values for each object. One way to resolve any situation where one might be getting weird key values is to manually edit the csv file and define whatever values are desired in the first row of the CSV.

There is an option to set header values, but I was not able to get it to work from the command line.

## 3 - Conclusion

That is it for now when it comes to using this csv to json module as a way to go about doing this sort of thing in a nodejs project. I might get around to expanding this post at some point in the future but only if I get around to making some kind of real project that needs to do this sort of thing. The module seems to work okay for what I wanted to do with my simple little demo script project. However I am sure there are additional options out there that I should also look into, but I would have ti have reason to do so before hand.
