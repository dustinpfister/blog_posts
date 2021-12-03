---
title: The lodash SortedUniq and vanilla js alternative
date: 2020-06-01 16:12:00
tags: [lodash]
layout: post
categories: lodash
id: 661
updated: 2021-12-03 10:35:58
version: 1.13
---

The [lodash sorted uniq](https://lodash.com/docs/4.17.15#sortedUniq) method can be used to remove all redundant copies of an element from an array. This is one of many methods in lodash that seem a little redundant, or present some kind of functionality that can easily be done with just native javaScript by itself. In any case this will be a quick post on creating a new array with repeat elements removed using lodash sortedUniq method, along with other lodash solutions for this, and vanilla javaScript alternatives to this method.

<!-- more -->

## 1 - The lodash sortedUniq method

The lodash sortedUniq method can be used to sort and remove copy values of an array by passing the array as the first and only argument. The result that is returned is an array that contains only uniq values and it is sorted from lowest value to highest value.

```js
let _ = require('lodash');
let a = [1,1,2,2,3,3,4,4,4,4]
let b = _.sortedUniq(a);
console.log(b); // [1,2,3,4];
```

## 2 - Vanilla javaScript solutions for removing redundant elements and sorting

In this section I will now be going over various vanilla javaScript solutions for dong more or less the same thing as what these various uniq lodash methods do. Many of these examples will involve the use of at least one if not more javaScript array prototype methods. However I am also looking into into everything that there is to work with when it comes to core javaScript itself also when it comes to these kinds of sections in my lodash posts.

### 2.1 - A vanilla javaScript alternative

I have [found this vanilla javaScript alternative to sorted uniq](https://youmightnotneed.com/lodash/#sortedUniq). This vanilla javaScript alternative to the lodash sorteduniq method involves using the spread operator in conjunction with the array bracket syntax, the Set constructor, and the [sort array](/2019/12/02/js-array-sort/) prototype method.

```js
let sortedUniq = arr => {
    return [...new Set(arr)].sort()
};
let a = [1, 1, 2, 2, 3, 3, 4, 4, 4, 4],
b = sortedUniq(a);
 
console.log(b); // [1,2,3,4];
```

So this solution makes use of some fairly modern javaScript features as of this writing at least. So if this is a problem you might still want to use lodash for that reason. However it is still important to remember that even when it comes to using lodash there is still the question of what version and how far back client support goes with that version.

### 2.2 - Using array reduce and array some

Another way to go about creating an array with matching elements removed would be to work out a solution that uses the [array reduce method](/2021/07/13/js-array-reduce/) as well as the [array some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method. The reduce method is often used for creating a single number or string primitive, but it can also be used to created a reduced array also, in fact that is the default if no starting value is given for the accumulator value. The array some method is like the [array every](/2021/07/12/js-array-every/) method only the array some will return true if only one element meets a given condition rather than all elements. So then the array some method can be used in the body of a function that is given to reduce to check if a current element is in the accumulator array or not, if so push it in, else do not. In the function that I pass to the array some method I could use the [identity operator, but the use of Object.is](/2019/02/06/js-javascript-equals/) will result in Same Value Zero being used just like what is used in the lodash uniq method. In other words the Object.is method is the native javaScript counterpart of the [lodash eq](/2019/12/04/lodash_eq) method.

```js
let sortedUniq = (arr) => {
    return arr.reduce((acc, el) => {
        if (!acc.some((c) => {
            return Object.is(c, el);
        })){
            acc.push(el);
        }
        return acc;
    }, []).sort();
};
let a = [1, 1, 2, 2, 3, 3, 4, 4, 4, 4],
b = sortedUniq(a);
console.log(b); // [1, 2, 3, 4]
```

## 3 - Conclusion

So then there is creating a new array with just unique values in it using lodash methods, but there is also doing the same with native javaScript tools also. If you enjoyed this post you might want to check out my [main post on lodash](/2019/02/15/lodash/), or check out one of [my many other posts on lodash](/categories/lodash). There is also looking into other [posts that I have written when it comes to javaScript](/categories/js/) alone also.

