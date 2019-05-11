let express = require('express'),
path = require('path'),
app = express();

//app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);

//app.set('days_back', 365 * 2);

let dir_cli = path.resolve('../../cli'),
dir_posts = path.resolve('../../../_posts'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.get('/', [

        // get data for all files
        (req, res, next) => {

            console.log('klawing posts:');
            res.reply = {
                wc: 0,
                pc: 0
            };
            klawAll({
                forPost: (item, nextPost) => {

                    console.log(item.header.title.substr(0, 30).padEnd(30, '.'));
                    res.reply.wc += item.wc;
                    res.reply.pc += 1;

                    nextPost();
                },
                onDone: () => {

                    console.log('done klawing posts:');
                    res.reply.avgwc = res.reply.wc / res.reply.pc;

                    next();
                }
            });

        },

        // send report
        (req, res) => {

            let html = '';
            let cap = {
                level: 100,
                avgwc: 750,
                pc: 1000,
                wc: 500000
            };
            let level = Math.round(m = [
                        res.reply.wc / cap.wc, // metric 1 (site wide word count)
                        res.reply.avgwc / cap.avgwc, // metric 2 (avg post word count)
                        res.reply.pc / cap.pc // metric 3 (post count);
                    ].map(function (val) {
                        return val > 1 ? 1 : val;
                    }).reduce(function (acc, n) {
                        return acc + n;
                    }) / 3 * cap.level);

            html += '<h1>Level: ' + level + '<\/h1>';
            html += '<div style="width:300px;height:30px;background:grey;">' +
            '<div style="width:' + Math.round(level / cap.level * 300) + 'px;height:30px;background:green;"><\/div>' +
            '<\/div><br>';
            html += '<span>Word Count: ' + res.reply.wc + '<\/span><br>';
            html += '<span>AVG Post Word Count: ' + Math.round(res.reply.avgwc) + '<\/span><br>';
            html += '<span>Post Count: ' + res.reply.pc + '<\/span><br>';

            res.send(html);
        }

    ]);

app.listen(app.get('port'), () => console.log('Level up is up on Port: ' + app.get('port')));
