# to-update

I wanted a script that will give me a list of posts that have not been updated sense a given year and month. In other words just a basic tool to help in in the process of keeping my older content up to date and relevant.

This script does not look at the date at which the post was first created, just the date at which it was last updated only.

## Posts that have not been updated sense before the current year

By default the script will print a list of all posts that have not been updated sense before the current year.

```
$ node to-update
```

## Posts before a year and month

Posts that have not been updated sense before a year and month

```
$ node to-update 2017 5
api-fixer (2017/5/19)
game-money (2017/4/4)
git-hooks (2017/4/4)
grunt-versionbump (2017/4/4)
```

## Posts from a certain year

This will print all posts that have not been updated sense 2018, in other words a range from 2018-12 back to 2018-01

```
$ node to-update 2018 12 2018 1
```

## Posts from a certain year and month

This will print all posts that have not been updated sense Jan 2019. I must set the high and low rage to the same values.

```
$ node to-update 2019 1 2019 1
```

## Using as a module

to-update can also be used as a module in scripts as well

```js
// testing out toUpdate
let toUpdate = require('./index').toUpdate;
 
toUpdate({
    yearHigh: process.argv[2] || 2017,
    forPost: (item) => {
        console.log('#' + item.header.id, item.fn);
    }
});
```