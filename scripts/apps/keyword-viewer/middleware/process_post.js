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
                text: '',
                filename: null
            };
            next()
        },

        // check query
        (req, res, next) => {
            if (!req.params.postname) {
                req.data.text = JSON.stringify(req.params);
                next('router');
            } else {
                next();
            }
        },

        (req, res, next) => {

            req.data.text = req.params; //path.join(dir_keywords, '');
            next();

            /*
            fs.readFile(path.join(dir_keywords, req.query.p), 'utf-8', (e, json) => {
            data.text = json;
            next();
            })

             */

        }

    ]);
