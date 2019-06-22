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

        let html = '<div style="width:1024px;">';
        html += '<script>var onclick=function(e){ console.log(e.target)}</script>'
        map.sections.forEach((section) => {
            section = JSON.parse(section);
            let color = 'rgb(0,' + Math.floor(section.worth / map.bestWorth * 120 + 130) + ',0)';
            html += '<div title=\"'+section.name+'\" id=\"'+ section.name +'\" onclick=\"onclick\" style=\"display:inline-block;width:32px;height:32px;background:' + color + ';\"></div>'
        });
        html += '</div>';
        console.log(html);
        fs.writeFile('./public/index.html', html, () => {

            console.log('done building html starting server');

            app.use('/', express.static('./public'));

            app.listen(8080, () => {

                console.log('server is up on 8080');

            })

        })

    });

})
