let express = require('express'),
path = require('path'),
app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);
app.set('days_back', 365 * 2);

let dir_cli = path.resolve(__dirname, '../../cli'),
dir_posts = path.resolve(__dirname, '../../../_posts'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

// total days sense first post
let getTotalDays = (fpDate) => {
    let now = new Date();
    fpDate = fpDate === undefined ? new Date(2017, 1, 2) : fpDate;
    let t = now - fpDate;
    return t / 1000 / 60 / 60 / 24;
};

// tabulate
let tab = () => {
    let counts = {};
    return (color) => {
        if (color) {
            counts[color] = counts[color] === undefined ? 1 : counts[color] += 1;
        }
        return counts;
    }
};

// create a colors div bar
let colorBar = (tab) => {
    let colorTabs = tab(),
    total = 0,
    html = '<div style="width:640px;height:20px;">';
    Object.keys(colorTabs).forEach((color) => {
        total += colorTabs[color];
    });
    ['lime', 'green', 'orange', 'red'].forEach((color) => {
        let t = colorTabs[color] / total;
        t = String(t) === 'NaN' ? 0 : t;
        let w = Math.floor(t * 640);
        if (w) {
            html += '<div style="display:inline-block;width:' + w + 'px;height:20px;background:' + color + ';"></div>';
        }
    });
    html += '</div>';
    return html
};

app.get('/', [

        // get data for all files
        (req, res, next) => {
            req.data = [];
            console.log('klawing posts:');
            klawAll({
                forPost: (item, nextPost, i) => {
                    req.data.push({
                        wc: item.wc,
                        fn: item.fn,
                        header: item.header
                    });
                    console.log(i , item.header.title);
                    nextPost();
                },
                onDone: () => {
                    next();
                }
            });
        },

        // sort by wc
        (req, res, next) => {
            req.data.sort((a, b) => {
                if (a.wc > b.wc) {
                    return -1;
                }
                if (a.wc < b.wc) {
                    return 1;
                }
                return 0;
            })
            next();
        },

        // send report
        (req, res) => {
            let html = '<body style="background:grey;">';

            let tableHTML = '<table style="width:100%;text-align:center;border-spacing:5px;color:white;">';
            tableHTML += '<tr><th>#</th><th>Word Count</th><th>file name</th></tr>';
            let wcTotal = 0;

            colorTab = tab();

            req.data.forEach((post, i) => {
                let color = 'red';
                color = post.wc >= 500 ? 'orange' : color;
                color = post.wc >= 1000 ? 'green' : color;
                color = post.wc >= 1800 ? 'lime' : color;

                wcTotal += post.wc;

                colorTab(color);

                tableHTML += '<tr style="background: black;">' +
                '<td>' + (i + 1) + '</td>' +
                '<td style="color:' + color + ';">' + post.wc + '</td>' +
                '<td>' + post.fn + '</td></tr>';

            });
            tableHTML += '</table>';
            html += '<p>';
            html += '<span>Word Count Site Total: ' + wcTotal + '</span><br>';
            let days = getTotalDays();
            html += '<span>Total days: ' + days.toFixed(2) + '</span><br>';
            html += '<span>Total posts: ' + req.data.length + '</span><br>';
            html += '<span>AVG WC per day: ' + Number(wcTotal / days).toFixed(2) + '</span><br>';
            html += '<span>AVG post WC: ' + Number(wcTotal / req.data.length).toFixed(2) + '</span><br>';
            html += '<span>' + JSON.stringify(colorTab()) + '</span><br>';
            html += '</p>';
            html += colorBar(colorTab);
            res.send(html + tableHTML + '</body>');
        }

    ]);

app.listen(app.get('port'), () => console.log('Word Count list is up on Port: ' + app.get('port')));
