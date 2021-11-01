# diff-posts-days

I want a script that will give me an array of objects where each object is a date and a collection of file names that where edited for that date.

Something like this:

```
[
   {
       startHash: '[gitHashCode]',
       endHash: '[gitHashCode]',
       y: 2021,
       m: 10,
       d: 31,
       date: 'Sun Oct 31 00:00:00 2021 -0400',
       files: ['js-onchange.md', 'js-operator-precedence.md']
   }
]
```