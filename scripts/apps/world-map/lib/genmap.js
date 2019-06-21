let klaw = require('klaw'),
through2 = require('through2'),
fs = require('fs'),
marked = require('marked'),
path = require('path'),
natural = require('natural'),
cheerio = require('cheerio'),
header = require('./header.js'),

tokenizer = new natural.WordTokenizer();

// generate a section from an array of words
let sectionFromArray = exports.sectionFromArray = (arr, opt) => {

    opt = opt || {};
    opt.figWorth = opt.figWorth || function (w) {
        this.worth += w.length
    };
    opt.sectionSize = opt.sectionSize || 2;

    let section = {
        worth: 0,
        tiles: []
    };

    var len = Math.pow(opt.sectionSize, 2),
    i = len;
    while (i--) {
        section.tiles.push({
            worth: 0
        })
    }

    arr.forEach((w, i) => {
        //section.worth += w.length
        opt.figWorth.call(section, w, section);

        var tileIndex = i % len;

        section.tiles[tileIndex].worth += w.length;

    });
    return section;
};

let dataToTokens = (data) => {

    let md = data.toString(),
    h = header.get(md);
    html = '<h1>' + h.title + '</h1>\n\n';
    html += marked(header.remove(md));
	console.log(h.title);
    let $ = cheerio.load(html);
    return tokenizer.tokenize($('p').text());

}

exports.fromPosts = (opt) => {

    opt = opt || {};
    opt.dir_posts = path.resolve(opt.dir_posts || '../../../_posts');
    opt.dir_target = path.resolve(opt.dir_target || './');
    opt.filename = opt.filename || 'map.json';

    let writer = fs.createWriteStream(path.join(opt.dir_target, opt.filename));
    let sections = [];
    klaw(opt.dir_posts)

    // when done
    .on('end', () => {
        writer.write(JSON.stringify({
                sectionSize: 4,
                sections: sections
            }));
    })

    .pipe(through2.obj((item, enc, next) => {
            fs.readFile(item.path, (e, data) => {
                if (data) {

                    let tokens = dataToTokens(data);

                    let section = JSON.stringify(sectionFromArray(tokens));
                    
                    sections.push(section);
                }
                next();
            });
        }));

};
