let express = require('express'),
path = require('path'),
marked = require('marked'),
fs = require('fs'),
dir_keywords = path.resolve('../../../keywords'),
dir_posts = path.resolve('../../../_posts');

// create a router, and use body-parser
router = module.exports = express.Router();

router.get('*', [

        // set defaults for reg.data
        (req, res, next) => {
            req.data = {
                html: '',
                mess: '',
                filename: null,
                keywords: []
            };
            next()
        },

        // check params
        (req, res, next) => {
            if (!req.params) {
                req.data.mess = 'A post name must be given';
                next('router');
            } else {
                req.data.filename = req.params[0].split('/')[2];
                next();
            }
        },

        // get keywords json file
        (req, res, next) => {
            fs.readFile(path.join(dir_keywords, req.data.filename + '.json'), 'utf-8', (e, json) => {
                if (e) {
                    req.data.mess = e.message;
                    next('router');
                } else {
                    req.data.keywords = JSON.parse(json);
                    next();
                }
            })

        },

        // get post text
        (req, res, next) => {

            fs.readFile(path.join(dir_posts, req.data.filename + '.md'), 'utf-8', (e, md) => {

                req.data.html = marked(md.replace(/---/g,''));

                /*
                // full pattern matches
                req.data.keywords.forEach((kw) => {

                req.data.html = req.data.html.replace(
                new RegExp(kw.keyword, 'g'),
                '<span style=\"color:red;\">' + kw.keyword + '<\/span>');


                let words = kw.keyword.split(' ');
                if (words.length > 1) {

                console.log(words);

                words.forEach((w) => {
                console.log(w);
                req.data.html = req.data.html.replace(
                new RegExp(w, 'g'),
                '<span style=\"outline:1px solid #00ff00;\">' + w + '<\/span>');
                })
                }


                });
                 */

                next();

            });

        }

    ]);
