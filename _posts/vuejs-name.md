---
title: The vue name option in component design
date: 2019-05-30 10:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 466
updated: 2019-06-05 21:30:01
version: 1.2
---

The [vue name](https://vuejs.org/v2/api/#name) option is something that comes into play when getting into vue component design. Depending on how you go about adding a component into vuejs the vue name might not need to be specified in the object that defines the nature of the component. However when  making local components it might be a good idea to set the name in the object, but doing so is optional. 

<!-- more -->

## 1 - vue name and global components

When making a vue component with the vue component global api method the first argument give is the name of the component, so there is not mush need for a name property if the component is in the form of an independent object literal. 

```js
var comp = {
    template: '<div><p>Foo</p></div>'
};
// so of course the vue name is undefined for now
console.log(comp.name); // undefined
 
// But when the component is made  global
// the first argument given is the name
Vue.component('foo', comp);
console.log(comp.name); // foo
 
// the name can then be used to refer
// to the component in templates
new Vue({
    el: '#demo-name',
    template: '<foo></foo>'
});
```

## 2 - vue name and local components

```js
var Foo = {
    template: '<span>Foo</span>'
};
var Bar = {
    name: 'bar',
    template: '<span>Bar</span>'
};
 
// using components locally
new Vue({
    el: '#demo-name',
    template: '<div><foo></foo><bar></bar></div>',
    components: {
        foo: Foo,
        bar: Bar
    },
    mounted: function () {
        // when using a component locally the key name used
        // in the components option seems to work in templates
        // but no name property is defined in the object like
        // when it is added globally
        console.log(Foo.name); // undefined
        console.log(Bar.name); // 'bar'
    }
});
```