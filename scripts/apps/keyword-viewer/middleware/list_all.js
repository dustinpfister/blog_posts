let express = require('express'),
path = require('path'),
fs = require('fs'),
dir_keywords = path.resolve('../../../keywords');

// create a router, and use body-parser
router = module.exports = express.Router();

router.get('*', (req, res, next) => {

    req.filenames = [];

    fs.readdir(dir_keywords, (err, files) => {

        files.forEach((fn) => {

            req.filenames.push(path.basename(fn,'.json'));

        });

        next();

    });

});
