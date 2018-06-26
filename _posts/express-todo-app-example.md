---
title: A todo app example using express, lowdb, and much more.
date: 2018-06-23 19:52:00
tags: [js,express,node.js]
layout: post
categories: express
id: 215
updated: 2018-06-25 22:02:12
version: 1.4
---

So I have been working with [express.js](https://expressjs.com/) for a while now when it comes to making simple demos, but now I think it is time to start making something that is a full working project of some kind. Often people start with a simple todo list project of some kind, so maybe that will do for now. I do not have to make this the kind of project that I will devote a few years of my life to, it can just be a good start. In this post I will be writing about this first express.js project, and if all goes well maybe this will not be the last post like this, as I progress into something else that is more interesting.

<!-- more -->

## 1 - What to know before continuing


### 1.1 - This is a full stack application I am writing about

### 1.2 - This is the first release I am writing about

### 1.3 - Not production ready, and intended for local use only

## 2 - install, or setup

### 2.1 - install by cloning the repo

### 2.2 - reproducing from scratch

## 3 - At the root

### 3.2 - The main app.js file

### 3.1 - config.yaml

## 4 - The /lib folder

### 4.1 - conf.js

### 4.2 - db_lists.js

## 5 - The /public folder

### 5.1 /public/js/list_client.js

## 6 - The routes folder

### 6.1 - /routes/edit.js

### 6.2 - /routes/list.js

### 6.3 - The middleware at the /routes/mw folder

#### 6.3.1 - edit_get.js
#### 6.3.2 - setobj_rend.js
#### 6.3.3 - setobj_postres.js
#### 6.3.4 - check_body.js
#### 6.3.5 - check_fail.js
#### 6.3.6 - item_add.js
#### 6.3.7 - item_delete.js
#### 6.3.8 - item_edit.js
#### 6.3.9 - item_get.js
#### 6.3.10 - list_create.js
#### 6.3.11 - list_delete.js
#### 6.3.12 - list_get.js

## 7 - The /themes folder

### 7.1 - The Landscape theme

#### 7.1.2 - css

#### 7.1.3 - js

#### 7.1.4 - layouts

#### 7.1.5 - index.ejs

#### 7.1.6 - nav.ejs

## 8 - the /db folder

## 9 - conclusion