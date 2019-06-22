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
    opt.name = opt.name || new Date().getTime();

    let section = {
        worth: 0,
        tiles: [],
        name: opt.name
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

// raw buffer data to and array of tokens
let dataToTokens = (data) => {
    let md = data.toString(),
    h = header.get(md);
    //html = '<h1>' + h.title + '</h1>\n\n';
    let html = marked(header.remove(md));
    //console.log(h.title);
    let $ = cheerio.load(html);
    return tokenizer.tokenize($('p').text());
}

exports.fromPosts = (opt) => {

    opt = opt || {};
    opt.dir_posts = path.resolve(opt.dir_posts || '../../../_posts');
    opt.dir_target = path.resolve(opt.dir_target || './');
    opt.filename = opt.filename || 'map.json';

    return new Promise((resolve, reject) => {

        let writer = fs.createWriteStream(path.join(opt.dir_target, opt.filename));
        let sections = [];
        let best = 0;

        klaw(opt.dir_posts)

        .on('error', (e) => {
            reject(e);
        })

        .pipe(through2.obj((item, enc, next) => {

                fs.readFile(item.path, (e, data) => {
                    if (data) {

                        let tokens = dataToTokens(data);

                        let md = data.toString(),
                        h = header.get(md);
                        let section = sectionFromArray(tokens, {
                                name: h.title.replace(/ /g, '-')
                            });

                        best = section.worth > best ? section.worth : best;

                        sections.push(JSON.stringify(section));
                    }
                    console.log(item.path);
                    next();
                });
            }))

        .on('data', (item) => {

            console.log(item);

        })

        .on('end', () => {
            let map = {
                sectionSize: 4,
                bestWorth: best,
                sectionCount: sections.length,
                sections: sections
            };
            writer.write(JSON.stringify(map));
            resolve(map);
        })

    });

};
