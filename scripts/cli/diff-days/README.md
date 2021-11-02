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

## Calling this CLI tool

On Linux systems I have the nodejs shebang at the top of the index.js file so it can be called dirrectly. When doing so the first positional argument can be used to pass a number of commits to go back, or a 40 digit hash code for the commit to start at when it comes to making these reposts for each day.

```
./index.js 100
```

```
./index.js 066e8e5d49d4f7474f8b5e46d41da13282e169e7
```