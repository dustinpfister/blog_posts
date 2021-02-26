---
title: Menu vuejs example using components and render functions
date: 2021-02-01 16:30:00
tags: [vuejs]
layout: post
categories: vuejs
id: 793
updated: 2021-02-25 20:13:27
version: 1.20
---

There is starting out with just some very basic examples of vuejs, but sooner or later there is taking the time to start to get into making some real [vuejs examples](/2021/02/04/vuejs-example/) with vuejs as a front end framework. At least making a real example or project should be the long term goal when it comes to learning vuejs, or any framework for that matter after all. Unless your aim is to just make blog posts on simple vuejs examples in which case I stand corrected.

Anyway for todays vuejs example I think it is a good idea to work out a simple, solid solution for making a kind of menu for a major application using vuejs. This menu will contain a main vuejs instance, but also a number of other vuejs components each of which is a menu item for an over all application. So each external component will be a child off from the main vuejs instance, as such this example will be an exercise in many aspects of vuejs, including components, directives, events, and render functions.

In addition I think I should also make a special custom Class based off of Vue by using the Vue.extend method. This way I can pull a lot of options and features into this special class and then just use the main Vue instance that is created from it to add the few options that will change from project to project. I would like to make something that can be reused over and over again from one example to the next so it seems like a good move.

<!-- more -->

## 1 - The Menu Class created with Vue.extend

First off I am going to want to have a special vue instance constructor of this menu system of sorts created with Vue.extend. This will constitute a render function that will render a main top navigation bar of buttons. Each button on the navigation bar will switch change a current menu value in the data object of this main parent vue instance. When the current menu value of the main data object of the vue instance changes so will the current menu item that is rendered below this navigation bar.

```js
var Menu = Vue.extend({
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
                   state: vm.$data.state,
                   currentMenu: vm.$data.currentMenu
                },
                on: {
                    'state-change': vm.stateChange
                }
            }));
        });
        children.push(createElement('div', {class:'wrap_menu'}, menus));
        return createElement('div', {class:'wrap_main'}, children);
    },
    data: function(){
        return {
            menus: ['home'],
            currentMenu: 'home',
            state: {} // state defaults to an empty object
        };
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
        stateChange: function(key, value){
            console.log('must add your own method for state change events',key, value);
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
    props: ['state', 'currentMenu'],
    template: '<div v-if="currentMenu === \'home\'">'+
      '<p>This is home current number of clicks: {{ state.money }}</p>' +
    '</div>'
});
```

### 2.2 - A manual.js component that uses a render function

Here I have a component that make use of a render function just like with the Menu class. On top of the parameters like the home menu, I am also making use of the state-change event as a way to send an amount of money that is made on each click of the manual button. This is just to test out the way that I intend to create menus that will work with a state object that I create when working out the main menu instance for a project.

```js
Vue.component('menu-manual', {
  props: ['state', 'currentMenu'],
  render: function(createElement){
      var children = [];
      var vm = this;
      if(this.$props.currentMenu === 'manual'){
          children.push(createElement('input', {
              attrs: {
                 type: 'button',
                 value: 'click ('+ vm.$props.state.money + ')'
              },
              on: {
                  click: function(e){
                      vm.$emit('state-change', 'delta-money', 1);
                  }
              }
          }));
      }
      return createElement('div', children);
  }
});
```

## 3 - The main.js file that is an Instance of Menu rather than Vue

Now that I have my Menu class and some menu components I am now going to want to create a main vuejs instance as with just about every other vue example. This time though it is going to be an instance of Menu rather than the plain old Vue Class by itself.

Just like any other main vue instance I am going to want to have a point point, so I use the vue el option as aways here with the main Menu instance. When it comes to the data object though I just need to add the properties that I want to add depending on how I go about using this menu system. For just a kind of demo example I am going to want to add a money property to my own state object because that is being used in my manual menu menu. I am also going to want to add my own menus array that will be used over the menus array in the Menu class. However I do not have to add everything, like the current menu prop that will default to home. If I have a home menu in my project then I can just leave that as the default.

```js
var vm = new Menu({
    el: '#app',
    data: {
        menus: ['home', 'manual'],
        state: {
            money: 50
        }
    },
    created: function(){
        //var dat = this.$data;
        //dat.menus.push('manual');
    },
    methods:{
        // I can place methods that have to do with
        // how I am using the 'Menu' Class here
        deltaMoney: function(a){
            console.log('delta money event', a);
            this.$data.money += a;
        },
        // custom state change method that will be called over Menu stateChange
        stateChange: function(key, value){
            console.log(key, value);
            if(key === 'delta-money'){
                this.$data.state.money += value;
            }
        }
    }
})
```

So the idea that I had in mind seems to work the way that I wanted to. I pull the main render function, and certain methods into a special Menu class created with Vue.extend. When I then use the Menu class I just need to add what I want to add that I will be using in the menus that I add that are the way that I go about extending creating a project.

## 4 - The html and css files

Now for just a little html, and css to wrap this all up together into something that might prove to be a little useful as an application starting point. I have an external css file for all the styles that I will be using for this menu system of sorts that I link to in the html, and also just a single hard coded div element that I am using for a mount point in the main vuejs instance. I plane to work on this a great deal more as I think I am going to be creating more applications based off of this so I want to place my styles in an external css file right away as a way rather than dumping it together with the html.

I am going to want some base classes for the main warp div, and menu divs along with the navbar at least. As I work on this example more I am sure the list of classes will grow but for now it is fairly simple.

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

In the html I just need to link to vuejs, my css file, menu.js that has my special Menu class based off of vuejs, the menus, and the main.js file.

```html
<html>
  <head>
    <title>vue example of an idle game</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="./extend/menu.js"></script>
    <script src="./menus/home.js"></script>
    <script src="./menus/manual.js"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

When this is up and running the basic idea that I had in mind for this seems to work just fine. However I am going to need to create a few more projects based off of this to learn more about what should be added.

## 5 - Conclusion

This way of creating menus with vuejs is proving to be a decent way to go about doing so. When it comes to making something major with vuejs it would seem that it is generally best to start to break things down into components, and I think doing something like this often proves to be necessary just for the sake of keeping things neat. 

Although I do like to create templates, I think that more often then not render functions are just called for in many situations, also some times it would seem like they are the only way to go about doing something actually. In the menu.js file where I define my Menu constructor I do not think that there is a way to generate component names with javaScript code in static templates. There are many issues that I seem to run into now and then with simple static templates that can be resolved and then some by just switching over to using render functions. Still templates are easier to read and debug, so I still like to start out with them, and if they work find for a component I will not bother with a render function.

