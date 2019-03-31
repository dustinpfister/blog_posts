// Use klaw to loop over markdown files

let klaw = require('klaw'),
fs = require('fs-extra'),
through2 = require('through2'),
yaml = require('js-yaml'),
path = require('path');

let dir = process.argv[2] || '../_posts',
pat_lb = /\r\n|\n/;

// get the header from markdown
let getHeader = function (text) {

    let head = text.match(/---[\s|\S]*---/);

    if (!head) {

        return {};

    }

    try {

        return yaml.safeLoad(head[0].replace(/---/g, ''));

    } catch (e) {

        console.log('ERROR loading yaml:');
        console.log(e.message);
        return {};

    }

};

let klawFiles = function (forFile) {

    forFile = forFile === undefined ? function (item) {
        console.log(item.header.title)
    }
     : forFile;

    // klaw over the dir
    klaw(dir)

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

                //item.text = data.toString();
                item.header = getHeader(data.toString());
                self.push(item);

                next();

            })
            .catch (function (e) {

                console.log(e);
                next();

            });

        }))

    .on('data', function (item) {

        //console.log(path.basename(item.path, path.extname(item.path)));

        forFile(item);

    });

};

// if called from CLI
if (require.main === module) {

    // call law files
    klawFiles();

} else {

    // else export
    exports.klawFiles = klawFiles;

}
