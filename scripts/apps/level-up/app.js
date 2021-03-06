let express = require('express'),
path = require('path'),
app = express();

app.set('port', process.env.PORT || process.argv[2] || 8080);

let dir_cli = path.resolve('../../cli'),
dir_posts = path.resolve('../../../_posts'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.get('/', [

        // get data for all files
        (req, res, next) =>
        {
            console.log('klawing posts:');
            res.reply =
            {
                wc: 0,
                pc: 0,
                cat: {},
                oldest: new Date(),
                newest: new Date(0)
            };
            klawAll(
            {
                forPost: (item, nextPost) =>
                {
                    console.log(item.header.title.substr(0, 30).padEnd(30, '.'), item.header.categories);

                    let date = new Date(item.header.date);
                    let updated = new Date(item.header.updated);
                    if (date < res.reply.oldest)
                    {
                        res.reply.oldest = date;
                    }
                    if (updated > res.reply.newest)
                    {
                        res.reply.newest = updated;
                    }
                    res.reply.time = res.reply.newest - res.reply.oldest;

                    // total word count
                    res.reply.wc += item.wc;
                    // post count
                    res.reply.pc += 1;

                    // cat
                    let catName = item.header.categories;
                    let cat = res.reply.cat[catName] =
                        res.reply.cat[catName] === undefined ? {}
                     : res.reply.cat[catName];
                    cat.wc = cat.wc === undefined ? item.wc : cat.wc += item.wc;
                    cat.pc = cat.pc === undefined ? 1 : cat.pc += 1;
                    cat.name = catName;

                    nextPost();
                },
                onDone: () =>
                {
                    console.log('done klawing posts:');
                    res.reply.avgwc = res.reply.wc / res.reply.pc;

                    // posts per day
                    res.reply.ppd = res.reply.pc / (res.reply.time / 1000 / 60 / 60 / 24);

                    next();
                }
            }
            );
        },

        // send report
        (req, res) =>
        {
            let html = '';

            let getLevel = (state, cap) =>
            {
                return [
                    state.wc / cap.wc, // metric 1 (site wide word count)
                    state.avgwc / cap.avgwc, // metric 2 (avg post word count)
                    state.pc / cap.pc // metric 3 (post count);
                ].map(function (val)
                {
                    return val > 1 ? 1 : val;
                }
                ).reduce(function (acc, n)
                {
                    return acc + n;
                }
                ) / 3 * cap.level;
            };

            let cap =
            {
                level: 100,
                avgwc: 500,
                pc: 1000,
                wc: 500000
            };
            let level = getLevel(res.reply, cap);

            html += '<h1>Level: ' + Math.floor(level) + '<\/h1>';
            html += '<div style="width:300px;height:30px;background:grey;">' +
            '<div style="width:' + Math.round(level / cap.level * 300) + 'px;height:30px;background:green;"><\/div>' +
            '<\/div>';
            html += '<div style="width:300px;height:10px;background:#afafff;">' +
            '<div style="width:' + Math.round((level % Math.floor(level)) * 300) + 'px;height:10px;background:blue;"><\/div>' +
            '<\/div><br>';

            html += '<span>% to next level: ' + Math.round(level % Math.floor(level) * 100) + '%<\/span><br>';
            html += '<span>Word Count: ' + res.reply.wc + '/' + cap.wc + '<\/span><br>';
            html += '<span>AVG Post Word Count: ' + Math.round(res.reply.avgwc) + '/' + cap.avgwc + '<\/span><br>';
            html += '<span>Post Count: ' + res.reply.pc + '/' + cap.pc + '<\/span><br>';

            html += '<span> oldest: ' + res.reply.oldest + '<\/span><br>';
            html += '<span> newest: ' + res.reply.newest + '<\/span><br>';
            html += '<span> time: ' + res.reply.time + '<\/span><br>';
            html += '<span> Posts per day: ' + res.reply.ppd.toFixed(2) + '<\/span><br>';

            html += '<br><br><table style=\"width:100%;text-align:center;\">';
            html += '<tr><th>Level<\/th><th>Cat name<\/th><th>Word Count<\/th><th>Post Count<\/th><th>AVG Word Count per post<\/th><\/tr>';
            let catArr = []
            Object.keys(res.reply.cat).forEach((catName) =>
            {
                catArr.push(res.reply.cat[catName]);
            }
            );

            catArr.sort((a, b) =>
            {
                if (a.wc > b.wc)
                {
                    return -1;
                }
                if (a.wc < b.wc)
                {
                    return 1;
                }
                return 0;
            }
            );

            catArr.forEach((cat) =>
            {

                cat.avgwc = Math.floor(cat.wc / cat.pc);
                html += '<tr>' +
                '<td>' + Math.floor(getLevel(cat,
                    {
                        level: 100,
                        avgwc: 500,
                        pc: 50,
                        wc: 50000
                    }
                    )) + '<\/td>' +
                '<td>' + cat.name + '<\/td>' +
                '<td>' + cat.wc + '<\/td>' +
                '<td>' + cat.pc + '<\/td>' +
                '<td>' + cat.avgwc + '<\/td>' +
                '<\/tr>';
            }
            )

            html += '<\/table>';

            res.send(html);
        }

    ]);

app.listen(app.get('port'), () => console.log('Level up is up on Port: ' + app.get('port')));
