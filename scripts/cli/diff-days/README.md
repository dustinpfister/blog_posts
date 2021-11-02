# diff-posts-days

I want a script that will give me an array of objects where each object is a date, and a collection of file names that where edited for that date. This could then be used as a stepping stone when it comes to making additinal scripts that can be used to track, and make a visual display of some kind with my progress when it comes to improving the quality of my content here

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