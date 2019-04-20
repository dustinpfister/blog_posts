let express = require('express'),
path = require('path'),
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

        // check query
        (req, res, next) => {
            if (!req.params) {
                req.data.mess = 'A post name must be given';
                next('router');
            } else {
                req.data.filename = req.params[0].split('/')[2];
                next();
            }
        },

        (req, res, next) => {

            fs.readFile(path.join(dir_keywords, req.data.filename + '.json'), 'utf-8', (e, json) => {

                if (e) {
                    req.data.mess = e.message;
                    next();
                } else {
                    req.data.keywords = JSON.parse(json);
                    next();
                }
            })

        }

    ]);
