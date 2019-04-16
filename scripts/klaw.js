// Use klaw to loop over markdown files

let klaw = require('klaw'),
fs = require('fs-extra'),
through2 = require('through2'),
yaml = require('js-yaml'),
path = require('path'),
getHeader = require('./get-md-header').getHeader,
dir = process.argv[2] || '../_posts',

// default options
opt_defaults = {
    // default path to _posts folder
    dir_posts: path.resolve(__dirname, '../_posts'),
    // defaults for forFile and forDone callbacks
    forFile: (item, next) => {
        console.log(item.header.title);
        next();
    },
    onDone: () => {}
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

            fs.readFile(item.path)
            .then(function (data) {

                // append item header
                item.header = getHeader(data.toString());

                // file name convenience property
                item.fn = path.basename(item.path, '.md');

                opt.forFile(item, next);

            })
            .catch (function (e) {

                console.log(e.message);

                //opt.forFile(item, next);

                next();

            });

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
