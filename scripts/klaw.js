// Use klaw to loop over markdown files

let klaw = require('klaw'),
fs = require('fs-extra'),
through2 = require('through2'),
path = require('path'),
header = require('./get-md-header'),
dir = process.argv[2] || '../_posts',

// default options
opt_defaults = {
    read: true,
    getText: false,
    // default path to _posts folder
    dir_posts: path.resolve(__dirname, '../_posts'),
    // defaults for forFile and forDone callbacks
    forFile: (item, next) => {
        console.log(item.header.title);
        next();
    },
    onDone: () => {}
};

let marked = require('marked'),
cheerio = require('cheerio'),
natural = require('natural'),

tokenizer = new natural.WordTokenizer(),

getWC = function (text) {

    let html = marked(text, ''),
    $ = cheerio.load(html),
    json = {};

    return tokenizer.tokenize($('p').text()).length;

};

//let klawFiles = function (forFile, onDone) {
let klawFiles = (opt) => {

    opt = Object.assign({}, opt_defaults, opt);

    // klaw over the dir
    klaw(opt.dir_posts)
    //klaw('../_posts')

    .on('end', function () {

        opt.onDone();

    })

    // if item is a file and is markdown
    .pipe(through2.obj(function (item, enc, next) {

            if (item.stats.isFile() && path.extname(item.path).toLowerCase() === '.md') {

                this.push(item);

            }

            next();

        }))

    .pipe(through2.obj(function (item, enc, next) {

            let self = this;

            // if we are reading files
            if (opt.read) {

                // read file
                fs.readFile(item.path)

                // if read is good
                .then(function (data) {

                    // append item header
                    item.header = header.get(data.toString());

                    // file name convenience property
                    item.fn = path.basename(item.path, '.md');

                    if (opt.getText) {

                        item.text = header.remove(data.toString());
                        item.wc = getWC(item.text);

                    }

                    opt.forFile(item, next);

                })

                // if read error
                .catch (function (e) {

                    console.log(e.message);
                    next();

                });

            } else {
                // else we are not reading files

                opt.forFile(item, next);

            }

        }));

};

// if called from CLI
if (require.main === module) {

    // call klaw files
    klawFiles();

} else {

    // else export
    exports.klawFiles = klawFiles;

}
