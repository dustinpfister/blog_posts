let express = require('express'),

router = module.exports = express.Router();

router.use([

        // create reply object
        (req, res, next) => {

            // Create reply object
            res.reply = {
                success: false,
                mess: 'no body object populated.'
            };

            next();

        },

        // check body
        (req, res, next) => {

            // check for body or next
            if (!req.body) {

                res.status(400).json(res.reply);

            } else {

                // body must have an action property
                if (!req.body.action) {

                    res.mess = 'body must have an action property';
                    res.status(400).json(res.reply);

                } else {

                    // we are good
                    next();

                }

            }

        },

        // update settings
        (req, res, next) => {

            let app = res.app;

            // sync server side fn and dir settings to any settings given by client
            app.set('fn', req.body.fn || app.get('fn'));
            app.set('dir', req.body.dir || app.get('dir'));
            res.reply.fn = app.get('fn');
            res.reply.dir = app.get('dir');

            next();

        }
    ]);
