let express = require('express'),
path = require('path'),
genMap = require('./lib/genmap.js'),
dir_posts = path.resolve('../../../_posts'),
fs = require('fs'),
app = express();

genMap.fromPosts({
    dir_posts: dir_posts
})

.then((map) => {

    console.log('have a map now');

    fs.mkdir('./public', () => {

        let html = '';
        map.sections.forEach((section) => {
            section = JSON.parse(section);
            html += '<div>' + section.worth + '</div>'
        });
        console.log(html);
        fs.writeFile('./public/index.html', html, () => {

            console.log('done');

        })

    });

})
