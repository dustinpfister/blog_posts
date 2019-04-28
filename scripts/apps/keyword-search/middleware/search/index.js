let express = require('express'),
//klawAll = require('../../../cli/klaw-readall/index.js').klawAll,
router = module.exports = express.Router();

router.use(require('body-parser').json());

router.post('*', [

        require('./getkwdata.js'),

        // figure post weight
        (req, res, next) => {
            req.data.posts.forEach((post, i) => {

                post.weights = [{
                        name: 'key words total * 5',
                        weight: post.keyWords.total * 5
                    }, {
                        name: 'full match * 100',
                        weight: post.fullMatch.count * 100
                    }, {
                        name: 'post total word count',
                        weight: post.wc / 10
                    }, {
                        name: '(key words percent) * (key words total * 5 + full match * 100)',
                        weight: post.keyWords.wcPer * (post.keyWords.total * 5 + post.fullMatch.count * 100)
                    }, {
                        name: 'key words in post * 1000',
                        weight: post.keyWords.inPost * 1000
                    }
                ];

                post.weight = 0;
                post.weights.forEach((w) => {
                    post.weight += w.weight;
                });

                //post.weight_word = post.keyWords.total * 5;
                //post.weight_full = post.fullMatch.count * 100;
                //post.weight = post.wc / 10 + (post.weight_full + post.weight_word) * post.keyWords.inPost;
                //post.weight *= post.keyWords.wcPer;
            });
            next();
        },

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
