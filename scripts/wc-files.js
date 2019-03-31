let klawFiles = require('./klaw.js').klawFiles,
marked = require('marked'),
cheerio = require('cheerio'),
fs = require('fs');

klawFiles(function (item) {

    fs.readFile(item.path, function (e, data) {
        if (data) {

            let html = marked(data.toString().replace(/---[\s|\S]*---/, '')),
            $ = cheerio.load(html);

            console.log('********** ' + item.header.title + '**********')
            console.log();
            console.log($('p').text());
            console.log('********** **********');

        }
    })

});
