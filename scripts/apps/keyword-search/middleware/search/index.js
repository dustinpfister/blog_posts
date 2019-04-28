let express = require('express'),
//klawAll = require('../../../cli/klaw-readall/index.js').klawAll,
router = module.exports = express.Router();

router.use(require('body-parser').json());

router.post('*', [

        require('./getkwdata.js'),

        // figure post weight
        (req, res, next) => {
            req.data.posts.forEach((post, i) => {
                post.weight_word = post.keyWords.total * 5;
                post.weight_full = post.fullMatch.count * 100;
                post.weight = post.wc / 10 + (post.weight_full + post.weight_word) * post.keyWords.inPost;
                post.weight *= post.keyWords.wcPer;
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
