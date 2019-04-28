let express = require('express'),
//klawAll = require('../../../cli/klaw-readall/index.js').klawAll,
router = module.exports = express.Router();

router.use(require('body-parser').json());

router.post('*', [

        require('./getkwdata.js'),

        // figure post weight
        (req, res, next) => {

		    let f = true;
            req.data.posts.forEach((post, i) => {

                if (f && post.fullMatch.count > 0) {
					f = false;
                    console.log(JSON.stringify(post));
                }

                post.weight = post.wc;

                /*
                let kwWordTotal = 0;
                post.wordCounts.forEach((word) => {
                kwWordTotal += word.count;
                });
                post.wordWeight = kwWordTotal * 5;
                post.wordRatio = kwWordTotal / post.wc;
                post.fullMatchWeight = post.fullMatchCount * 100;
                post.weight = post.wc / 10 + (post.fullMatchWeight + post.wordWeight) * (post.wordCounts.length);
                post.weight *= post.wordRatio;
                 */
            });
            next();
        },

        /*
        // figure post weight
        (req, res, next) => {


        req.data.posts.forEach((post,i) => {
        let kwWordTotal = 0;
        post.wordCounts.forEach((word) => {
        kwWordTotal += word.count;
        });
        post.wordWeight = kwWordTotal * 5;
        post.wordRatio = kwWordTotal / post.wc;
        post.fullMatchWeight = post.fullMatchCount * 100;
        post.weight = post.wc / 10 + (post.fullMatchWeight + post.wordWeight) * (post.wordCounts.length);
        post.weight *= post.wordRatio;
        });
        next();
        },
         */

        // send
        (req, res) => {
            // sort by full match count
            req.data.posts.sort((a, b) => {
                if (a.weight < b.weight) {
                    return 1;
                }
                if (a.weight > b.weight) {
                    return -1;
                }
                return 0;
            })

            res.json(req.data);
        }

    ]);
