# keyword-search

I would like to have some kind of application that I can use to help me with keyword research, and keyword targeting. So the aim of this project is to maintain a database of keywords that I am targeting, and in which posts they are being targeted. Much of the data might be inputed manually via a front end system if I can not find a way to automate that work. In any case the idea is that this kind of project might help me improve organic search performance with my website, or failing that should at least be an interesting project.

## - draft for file formats

I am going to want JSON files for keywords, and also possibly posts as well. I don't want to get caught up into database design to much, just some format that works will be good enough.

```js
// a record format for a keyword
{
   kwid: 0,
   keyword : 'lodash find',
   posts: ['lodash-find','lodash-findindex']
}

// a record format for a post
{
   pid: 37,
   filename: 'lodash-find',
   kwTargets: ['lodash find', '_.find', 'find in lodash']
}
```