---
title: Menu vuejs example using components and render functions
date: 2021-02-01 16:30:00
tags: [vuejs]
layout: post
categories: vuejs
id: 793
updated: 2021-02-05 15:35:07
version: 1.11
---

There is starting out with just some very basic examples of vuejs, but sooner or later there is taking the time to start to get into making some real [vuejs examples](/2021/02/04/vuejs-example/ with vuejs as a front end framework. At least making a real example or project should be the long term goal when it comes to learning vuejs, or any framework for that matter after all. Unless your aim is to just make blog posts on simple vuejs examples in which case I stand corrected.

Anyway for todays vuejs example I think it is a good idea to work out a simple, solid solution for making a kind of menu for a major application using vuejs. This menu will contain a main vuejs instance, but also a number of other vuejs components each of which is a menu item for an over all application. So each external component will be a child off from the main vuejs instance, as such this example will be an exercise in many aspects of vuejs, including components, directives, events, and render functions.

<!-- more -->

## 1 - The main menu.js vue instance

First off I am going to want to have a main vue instance of this menu system of sorts. This will constitute a render function that will render a main top navigation bar of buttons. Each button on the navigation bar will switch change a current menu value in the data object of this main parent vue instance. When the current menu value of the main data object of the vue instance changes so will the current menu item that is rendered below this navigation bar.

```js
var vm = new Vue({
    el: '#app',
    render: function(createElement){
        var vm = this;
        var children = [];
        // create menu buttons
        var menuButtons = [];
        vm.$data.menus.forEach(function(menuName){
            menuButtons.push(createElement('input', {
                attrs:{
                    id:'button_changemenu_' + menuName,
                    type:'button',
                    value: menuName
                },
                on: {
                    'click': vm.click
                }
            }));
        });
        children.push(createElement('div', {class:'navbar'}, menuButtons));
        // create menus
        var menus = [];
        vm.$data.menus.forEach(function(menuName){
            menus.push(createElement('menu-' + menuName, {
                props:{
                   money: vm.$data.money,
                   currentMenu: vm.$data.currentMenu
                },
                on: {
                    'delta-money': vm.deltaMoney
                }
            }));
        });
        children.push(createElement('div', {class:'wrap_menu'}, menus));
        return createElement('div', {class:'wrap_main'}, children);
    },
    data: {
        menus: ['home', 'manual'],
        currentMenu: 'home',
        money: 0
    },
    methods: {
        // a button was clicked
        click: function (e) {
            var button_el = e.target,
            dat = this.$data,
            idArr = button_el.id.split('_');
            console.log(idArr);
            if(idArr[1] === 'changemenu'){
                dat.currentMenu = idArr[2];
            }
        },
        deltaMoney: function(a){
            console.log('delta money event', a);
            this.$data.money += a;
        }
    }
});
```

## 2 - The menu home, and menu manual components

Now that I have my main vue instance worked out it is now just a question of starting to make all the components that I want for this simple menu system. For this example I am just making a few menus for now that will just help with exercising the basics of this kind of situation in which I have a main parent vue instance, and two or more child components off from this main instance. 
When doing this sort of thing the project might start to get a little involve when it comes to the main data object of the example, and how to share that data with child components. So far it would seem that using parameters of components is how I would want to go about sending a parent level value to a child. However when it comes to mutating values in a child component it is not such a good idea to mutate these parameter values, in fact doing so will result in an error. Instead it is a good idea to have my own independent data values to work with in a component, and also to depend more so on events as a way to send values back to the parent main vue instance.

So then in this section I will be going over just a few simple menu components that I have work out to start off with when it comes to this.

### 2.1 - A basic home.js with just a static template

Here I have just a basic home page menu component that makes use of a simple static template as a way to render the menu. I am not doing much of anything with this component aside from just displaying the current value of a money value that is passed to if via the money property when this menu is used in the main vue instance.

```js
Vue.component('menu-home', {
  props: ['money', 'currentMenu'],
  data: function () {
    return {
    };
  },
  template: '<div v-if="currentMenu === \'home\'"><p>This is home current number of clicks: {{ money }}</p></div>'
});
```

### 2.2 - A manual.js component that uses a render function

Here I have a component that make use of a render function just like with the main vue.js instance. On top of the parameters like the other menus, I am also making use of a custom delta-money event as a way to send an amount of money that is made on each click of the manual button.

```js
Vue.component('menu-manual', {
  props: ['money', 'currentMenu'],
  data: function () {
    return {
    };
  },
  render: function(createElement){
      var children = [];
      var vm = this;
      if(this.$props.currentMenu === 'manual'){
          children.push(createElement('input', {
              attrs: {
                 type: 'button',
                 value: 'click ('+ vm.$props.money + ')'
              },
              on: {
                  click: this.click
              }
          }));
      }
      return createElement('div', children);
  },
  methods: {
    click: function(e){
        this.$emit('delta-money', 1);
    }
  }
});
```

## 3 - The html and css files

Now for just a little html, and css to wrap this all up together. I have an external css file for all the styles that I will be using for this menu system of sorts that I link to in the html, and also just a single hard coded div element that I am using for a mount point in the main vuejs instance.

```css
.wrap_main{
}
.wrap_menu{
  padding:10px;
  background:#afafaf;
}
.navbar{
  padding:5px;
  text-align:center;
  background:gray;
}
```

```html
<html>
  <head>
    <title>vue example of an idle game</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="./menu_home.js"></script>
    <script src="./menu_manual.js"></script>
    <script src="./menu.js"></script>
  </body>
</html>
```

## 4 - Conclusion

This way of creating menus with vuejs is proving to be a decent way to go about doing so. When it comes to making something major with vuejs it would seem that it is generally best to start to break things down into components. Although I do like to create templates, I think that more often then not render functions are just the way to go also along with components. There are many issues that I seem to run into now and then with simple static templates that can be resolved and then some by just switching over to using render functions.
