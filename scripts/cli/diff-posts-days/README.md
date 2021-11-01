# diff-posts-days

I want a script that will give me an array of objects where each object is a date and a collection of file names that where edited for that date.

Something like this:

```
[
   {
       hash: '[gitHashCode]',
       date: 'Sun Oct 31 06:31:56 2021 -0400',
       files: ['js-onchange.md', 'js-operator-precedence.md']
   }
]
```