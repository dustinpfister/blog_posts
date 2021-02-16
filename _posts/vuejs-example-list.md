---
title: A basic vue todo list app example
date: 2020-02-18 17:26:00
tags: [vuejs]
layout: post
categories: vuejs
id: 615
updated: 2021-02-16 15:12:59
version: 1.15
---

This will be a quick post on a basic [vue list](https://vuejs.org/v2/guide/list.html) example. When working with unordered or ordered list elements in a template, typically I will end up using the [vue for](/2019/05/21/vuejs-for/) directive to bind to an array in the [vue data](/2019/05/18/vuejs-data/) object. 

However there is just having a basic list example, and then there is staring to create an actual applaction that is a basic todo list applaction. So this will just be a pretty simple [vuejs example](/2021/02/04/vuejs-example/) of a todo list when it comes to getting this one out of the way.

<!-- more -->

## 2 - The todo list vuejs example

In this section I will be going over the source code of my basic todo app vuejs example. The sore code for this example as well as all of my other vuejs examples can be found at by [test vuejs reposatory](https://github.com/dustinpfister/test_vuejs/tree/master/public/forpost/vuejs-example-list) at github.

### 2.1 - A global set of mixin methods

For this example I have a single mixins file where I am adding in a bunch of methods that I may use accross more than one vuejs instance. So var I just have a main vuejs instance and a single component, but if i do continue working on this example a little now and then I will want to have some global methods.

I have methods that I am all ready using in one component that have to do with creating an array of values from an id attribute of an element in a template. You see I ofetn find myself encoding info into an id of an element, rather than making use of the data attribute of an html element. So I have some methods that I can use to quickly get at things that might be encoded into an id of a target element in an event object. More on this later when I get into componets with this example.

In the the methods mixin here I also have a create item method. I am going to want to have a standard way of going about creating item objects for a list and for now this is where I am choosing to park such a method. So far I am just using this method in the main vue instance, but even there I am using it to push new items into a list, but also using it as a way to load a list from local storage also via a mounted hook.

Speaking of local storage I am also placing save and lod methods that make use of the local stroage api as a way to save the state of a list.

```js
Vue.mixin({
    methods: {
        // get an id array from and event object
        get_id_array: function(evnt){
            return evnt.target.id.split('-');
        },
        // get an item id from an event object
        get_item_id: function(evnt){
            var idArray = this.get_id_array(evnt);
            return idArray.slice(0, 3).join('-');
        },
        createItem: function(opt){
            opt = opt || {};
            return {
                id: opt.id || 'list-item-' + this.$data.count,
                mess: opt.mess || this.$data.textInput,
                done: opt.done || false
            };
        },
        // save a list to localStorage
        save: function(data){
            // first load
            var lists = this.load();
            if(lists){
                lists[0] = data;
            }else{
                // no lists! create a new object and save the current list
                console.log('no lists!');
                lists = [];
                lists.push(data);
            }
            var json = JSON.stringify(lists);
            localStorage.setItem('vuejs-list', json);
        },
        // load lists from local storage
        load: function(){
            var json = localStorage.getItem('vuejs-list');
            if(json){
                return JSON.parse(json);
            }
            return false;
        }
    }
});
```

### 2.2 - A list item component

Here I have a compoent that is used to render a single list item in the current array of list items in the data object of the main vue instance. Here I am making use of the Vue.component method to make this list-item compoent a global component.

In the static template of this component I am using the v-if directive as a way to render a text input element in the event that an item is not done. This way the text of the item can still be updated by making use of this text input element. If the event that the item is done, then just a span element will be rendered to display the message text, and a donetext class will be used with the element that will contain approperate style for a done element such as line through style text.

In this component I am then emiting events that will then be used as a way to update data in the main vuejs instance. I have to do things this way becuase I can not mutate the props of the compoent, so events are the way to indirectly mutate data that is back in the parent vue instance that I will be getting to next.

```js
Vue.component('list-item', {
    props: ['item'],
    template: '<div class="wrap_item">'+
        '<input '+
            'v-if="!$props.item.done" ' +
            'v-bind:id=\"$props.item.id+\'-mess\'\" ' +
            'v-bind:value=\"$props.item.mess\" ' +
            'type=\"text\" ' + 
            'v-on:keyup="updateItem"> ' +
        '<span class="donetext" v-else >{{ $props.item.mess }}</span> ' +
        '<input ' + 
            'v-bind:id=\"$props.item.id+\'-del\'\" ' + 
            'type=\"button\" ' +
            'v-on:click=\"delItem\" ' +
            'value=\"Delete\"></li> ' +
        '<input ' + 
            'v-bind:id=\"$props.item.id+\'-done\'\" ' + 
            'type=\"button\" ' +
            'v-on:click=\"doneItem\" ' +
            'value=\"Done\"></li> ' +
    '</div>',
    methods: {
        delItem: function(e){
            var id = this.get_item_id(e);
            this.$emit('delitem', id);
        },
        doneItem: function(e){
            var id = this.get_item_id(e);
            this.$emit('doneitem', id);
        },
        updateItem: function(e){
            var id = this.get_item_id(e);
            this.$emit('updateitem', id, 'mess', e.target.value);
        }
    }
});
```

### 2.3 - The main vue instance in main.js

I then have a main.js file that contains the main vuejs instance that will be rendering to the hard coded html file. In the static template I am using the list-item compoent with the v-for direactive as a way to create an instance for the component for each item in the items array of the data object for this main, or parent vue instance.

```js
new Vue({
    el: '#app',
    template: '<div class="wrap_main">' +
    '<div class="wrap_create">' +
        '<input type=\"text\" v-model=\"textInput\"> '+
        '<input type=\"Button\" value=\"Push\" v-on:click=\"pushNew\"></br>' +
    '</div>'+
    '<div>' +
        '<list-item ' +
            'v-for="item in items" ' +
            'v-bind:key="item.id" ' +
            'v-bind:item="item" ' + 
            'v-on:delitem="delItemById" ' +
            'v-on:doneitem="doneItemById" ' +
            'v-on:updateitem="updateItemById" ></list-item>'+
    '</div>' +
    //'<div>{{ items }}</div>'+
    '</div>',
    data: {
        listName: 'demo', // list name used for save states
        textInput: 'Enter new item text',
        count: 0, // count used to make sure I do not have duplicate item ids
        items: []
    },
    mounted: function(){
        // load and saved list
        var vm = this,
        lists = vm.load(),
        savedList = lists[0],
        dat = vm.$data;
        dat.count = savedList.count;
        savedList.items.forEach(function(savedItem){
            dat.items.push(vm.createItem(savedItem));
        });
    },
    methods: {
        // get item (or item index) by id
        getItemById: function(id, returnIndex){
            returnIndex = returnIndex === undefined ? false: returnIndex;
            var i = this.$data.items.length,
            item;
            while(i--){
                item = this.$data.items[i];
                if(item.id === id){
                    if(returnIndex){
                        return i;
                    }
                    return item;
                }
            }
            return false;
        },
        // delete an item by id
        delItemById: function(id){
            var i = this.getItemById(id, true);
            if(typeof i === 'number'){
                this.$data.items.splice(i, 1);
            }
            this.save(this.$data);
        },
        // flag and item as done
        doneItemById: function(id){
            var item = this.getItemById(id, false);
            if(item){
                item.done = !item.done;
            }
            this.save(this.$data);
        },
        // update an item by id
        updateItemById: function(id, prop, value){
            var item = this.getItemById(id, false);
            item[prop] = value;
            this.save(this.$data);
        },
        // push a new item
        pushNew: function () {
            this.$data.items.push(this.createItem());
            this.$data.count += 1;
            this.save(this.$data);
        }
    }
});
```

### 2.4 - HTML

Here I have the hard coded html file with some inline css. I have just a single div element that serves as a mount point for the main vuejs instance, and I link to all of the javaScript files that I am using including vuejs.

```html
<html>
  <head>
    <title>vue example list</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
    <style>
.wrap_main{
  background:black;
  padding:10px;
  color:white;
}
.wrap_create{
  padding:40px;
  margin:10px;
  background:#4a4a4a;
  text-align:center;
}
.wrap_item{
  padding:10px;
  margin:10px;
  background:#cacaca;
  color:black;
}
.donetext{
  text-decoration-line: line-through;
}
    </style>
  </head>
  <body>
  <div id="app"></div>
  <script src="./mixins.js"></script>
  <script src="./comp/list-item.js"></script>
  <script src="./main.js"></script>
  </body>
</html>
```

## 1 - A very Basic vue todo list example

This is the old example that I made for this post. I do not think this is a good way to get started with this kind of applaction. However for now I think I will keep this here just for the hell of it.

So here is the basic copy and past vue list example that I put together for this post. The only fix you might have to do is the link to vuejs as needed. The basic process is to start out with a vue instance by calling the main vue constructor with the new keyword, and then pass an options object. In that options object I am using the vue el directive to mount to a div element in my html, I have a template, data object, and methods object also.

In the template I have a div as a root element because I must have one for a vue template, I then have an text input element and a a button type input element that when clicked will add a new list item with a message value given in the text input element. I then have a ul element and I am using the vue for directive to create li elements for each element in the items array.

```html
<html>
  <head>
    <title>vue example list</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script>
new Vue({
    el: '#app',
    template: '<div>' +
    '<input type=\"text\" v-model=\"textInput\"> '+
    '<input type=\"Button\" value=\"Push\" v-on:click=\"pushNew\"></br>' +
    '<ul>'+
        '<li v-for=\"item in items\"><input v-model=\"item.mess\"> '+
        '<input v-bind:id=\"item.id+\'-del\'\" type=\"button\" v-on:click=\"delItem\" value=\"Del\"></li>'+
    '</ul>' +
    '</div>',
    data: {
        textInput: 'Enter new item text',
        items: []
    },
    methods: {
        delItem: function(e){
            var id = e.target.id.replace(/-del/, ''),
            i = this.$data.items.length,
            item;
            while(i--){
                item = this.$data.items[i];
                if(item.id === id){
                    this.$data.items.splice(i, 1);
                }
            }
        },
        pushNew: function () {
            var id = this.$data.items.length;
            this.$data.items.push({
                id: 'list-item-' + id,
                mess: this.$data.textInput,
                done: false
            });
        }
    }
});
  </script>
  </body>
</html>
```

There is then the methods object where I have a push new method that is called by the button that creates new items in the items array of the data object that is also used to create the list in the template. There is also a delete item method that will be called by a delete item button for each list item when clicked, it will of course delete the item.

## 2 - Conclusion

So the todo list app is just a basic idea for an applaction that is often what is used as a way to test out a framework. 

There is noting ground breaking that I wanted to do with this vuejs example, but that is often the aim of such a project anyway. However if I do put more time into this I guess there are at least a few things that come to midn when it comes to adding features. It would be nice to save and load lists as plain text files on a local file system rather than just depeding on the local storage api. However there is only so much more that I would want to add when it comes to an applaction such as this.
