---
title: Find the _.size of Arrays and Objects with lodash, and vanilla js
date: 2018-11-04 16:22:00
tags: [lodash]
layout: post
categories: lodash
id: 321
updated: 2022-01-30 08:00:22
version: 1.23
---

Getting the length of an array is a trivial matter in javaScript, but then there is getting the length of Objects in general that is a little not so trivial some times. In [lodash](https://lodash.com/) there is the [\_.size](https://lodash.com/docs/4.17.10#size) method that is a collection method that will work with both arrays, and objects to return the element length of an array, or the number of enumerable properties of a plain old object of any sort. However doing so is really not all that hard with just plain old javaScirpt by itself also. So in this post I will be quickly covering the \_.size method, but will also be going over vanilla js solutions for doing this as well.

<!-- more -->

## 1 - lodash size basics, and what to know in general about this

This is a post on the \_.size method that can be used to get the element length of an Array, or the key length of a plain old object in the event of the absence of a length property. I am also going over plain old native javaScript alternatives to using the \_.size method as well that include the length property and Object.keys.

In this section I will be going over some quick simple examples using \_.size that should help show why it might be a useful collection method. The use of \_.size is fairly easy, just pass it an Array or object and it will give the element length or the number of keys. There are some pit falls to be aware of when using \_.size, or when just working with Arrays and objects in general actually so I will be touching base on that as well here. If you are more interested in vanilla js solutions I will be covering that in the next section.

### The \_.size method is a collection method

The \_.size method in lodash is one of the many so called collection methods in lodash. What that means is that they work with both arrays, and plain old objects. This differs from what is typically used when it comes to native javaScript alternatives which are often prototype methods of Array or Object. Sometimes it is possible to get an Array method to work with an Object that is not an instance of Array if it just happens to be "array like" by using Function.call, but they are not intended to be used on any Object.

### 1.1 - Using \_.size with an array

When an array is passed to \_.size the element length of that array is returned.

```js
// array element length
let a = [1, 2, 3, 4];
console.log(_.size(a)); // 4
```

### 1.2 - \_.size with an Object that does not have a length property

If a plain object without a length property is given to \_.size the enumerable key length of that object is returned.

```js
// Object key length
let b = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
};
console.log(_.size(b)); // 4
```

## 2 - Vanilla js alternatives to \_.size

Although the \_.size method nice in that it is a robust collection method that will work with both Arrays and objects in general, it is not like just getting this information is all that hard with native javaScrtipt properties and methods. There is of course the the Array.length property, and as of ES5 spec javaScript Object.keys and be used to quickly get an array of key names of an object to which an Array.length value can be obtained. In this section I will be covering the use of these, which is simple enough.

### 2.1 - The Array length Property

So when dealing with an array the element length can easily be obtained with the [length property](/2018/12/14/js-array-length/), not much to write about with that.

```js
let a = [1, 2, 3, 4];
console.log(a.length); // 4
```

### 2.2 - Object.keys to get enumerable properties of an Object

In ES5 spec javaScript [Object.keys](/2018/12/15/js-object-keys/) was introduced, unless you care about supporting ancient browsers the method will work just fine for getting an array of public own properties of any object. The length of the array that is returned by the object keys method, or the object values method also for that matter will then work well to get the size of any collection actually in native javaScript.

```js
let b = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
};
console.log(Object.keys(b).length); // 4
```

### 2.3 - Object.getOwnPropertyNames(obj).length for getting the key length of both enumerable and non-enumerable object own properties

So both \_.size, and Object.keys(obj).length only return enumerable keys in an non array like object. If I am dealing with an object that has non-enumerable properties the full key length of the objects own properties can be obtained by using the Object.getOwnPropertyNames static Object method in native javaScript.

```js
let obj = {
    visible: 'I count'
};
 
Object.defineProperty(obj, 'hidden', {
 
    value: 'I do not count',
    writable: false,
 
    // default is false actually
    // just putting this here to be explicit
    enumerable: false
 
});
 
console.log(obj.hidden); // I count
console.log(obj.visible); // I do not count
 
// _.size or Object.keys(obj).length 
// will only return enumerable lengths
console.log(_.size(obj)); // 1
console.log(Object.keys(obj).length); // 1
 
// so there is Object.getOwnPropertyNames()
console.log( Object.getOwnPropertyNames(obj).length ); // 2
```

## 3 - Getting data Size with javaScript

The lodash size method has to do with just the size of collections, which makes sense for what it is within lodash when it comes to collections. However if you are thinking in terms of data size, rather than the size in terms of the total number of items in a collection then the lodash size method as well as vanilla javaScript alternatives are going to fall short. Using the length property of an array or string value will only give a correct data size if it just so happens to be a situation in which each element or character is one byte in size. However that might not always be the case when it comes to Unicode values, so using the lodash size method, or any kind of vanilla javaScript alternative will given wrong results for certain possible values.

So then in this section I will be going over some ways to get the [data size of a string](https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string), in both nodejs and well as client side environments.

### 3.1 - Using a Buffer in nodejs

In [nodejs the Buffer Class](/2018/02/07/nodejs-buffer/) is there to work with when it comes to these kinds of situations. There are a number of was to create an instance of a buffer, for this example I went with the [from method of the buffer class](/2019/07/19/nodejs-buffer-from/).

```js
let sizeDataStr = (str) => {
   return Buffer.from(str).length
};
 
console.log(sizeDataStr('\u0080')); // 2
```

### 3.2 - Using the Blob constructor in Client side javaScript

When it comes to using client side javaScript there are a few options that come to mind, one of which would be the [Blob Constructor](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

```html
<script>
var sizeDataStr = function(str){
    return new Blob([str]).size;
};
 
console.log( sizeDataStr('\u0020') );
console.log( sizeDataStr('\u0080') );
</script>
```

## 4 - Conclusion

So maybe the \_.size method is not one of the most compelling methods that make using lodash worth the hassle, but there are still methods that are very useful, and are not baked into javaScript itself. Keep in mind that lodash methods can be installed on a per method basis, and when doing so maybe this one is a pass for me at least. There are also a lot of reasons why a developer might want to use some kind of user space solution to do things that can also be done with native methods, such as doing something in a non spec way, or having a great deal of backward compatibility without monkey patching. With that said if you enjoyed reading this post, you might like to read one of my [many other posts on lodash](/categories/lodash), there is also a main [mega post of sorts on lodash](/2019/02/15/lodash/) that I have wrote and expand on now and then as needed.