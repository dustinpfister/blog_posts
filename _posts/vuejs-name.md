---
title: The vue name option in component design
date: 2019-05-30 10:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 466
updated: 2021-02-14 09:52:27
version: 1.6
---

The [vue name](https://vuejs.org/v2/api/#name) option is something that comes into play when getting into vue component design. Depending on how I go about adding a component into vuejs the vue name might not need to be specified in the object that defines the nature of the component, at least that is the case with global componnents added by way of the Vue.component method. However when  making local components it might be a good idea to set the name in the object, doing so is still optional, but I might run into some problems when neglecting adding it to an object. 

<!-- more -->

## 1 - vue name and global components

When making a vue component with the Vue.component global API method the first argument I give is the name of the component. So there is not a need for a name property of the object that I then give to the Vue.component method as a second argument. When I add compoents to vue this way I am making them global, and the string value that will be the name of the compoent is required when doing so.

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

However what if I take the object literal that I give to Vue.compoent and instead make it an element of an array that I then use as a value for the compoents option of a vue instance? When doing this I am making a local component of a vue instance, or another component, and it is in these situstions where I might want to add a name option to an object literal used to define the values of a vue instance.

## 2 - vue name and local components

Using a name property in a vue component object might be a good idea if you are doing something with local components. There is still a way to define the names anyway in the form of object keys in the components option object that is used to create local components. However I have noticed that the name of the component will return undefined if the name is not given in the object.

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

Simply put vue will not create a default name for a component that is added into a vue instance this way. The key value in the compoents object will still work when it comes to using it in a template, but it is still generaly a good idea to add the name option to an object literal anyway.

## 3 - Conclusion

The name property of a compoent is something that I generaly only need to bother with when it comes to local compoents. When I create a global component with the Vue.component method I must give a name as a string for the first argument that name is then what I will be using in temapltes, but there will also be a name value in the compoent object. However I can also make just plaibn old javaScript objects that contain vue options, and when doing that it might be a good idea to set a name property for those kinds of objects.
