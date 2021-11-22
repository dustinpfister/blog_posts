let express = require('express'),
path = require('path'),
fs = require('fs'),
marked = require('marked'),
app = express(),
header = require(path.join(__dirname, '../../lib/header/index.js'));

app.set('port', process.argv[2] || process.env.PORT || 8070);
app.set('dir_posts', path.join(__dirname, '../../../_posts'));

// hosting static assets for the client system
app.use('/js', express.static(path.join(__dirname, 'public/js')));
//app.use('/', express.static('public/html'));

let trimEmpty = (arr) => {
    return arr.reduce((acc, el) => {
        if (el != '') {
            acc.push(el);
        }
        return acc;
    }, []);
};
// get for a path like /2018/12/10/js-array/index.html
app.get(/\d{4}\/\d{2}\/\d{2}/, (req, res) => {
    // gat an array like ['2018', '12', '10', 'js-array', 'index.html']
    let folderNames = trimEmpty(req.url.split('/'));
    let fileName = folderNames[3] || null;
    // if we have a file name
    if (fileName) {
        let uri = path.join(app.get('dir_posts'), fileName + '.md');
        // read the fileName at the _posts folder
        fs.readFile(uri, 'utf8', (e, text_md) => {
            if (e) {
                // if error set 500 status and send message
                res.status(500);
                res.end(e.message);
            } else {
                // get header and preform a check with the dates in url compared to header
                let headerObj = header.get(text_md),
                yTest = headerObj.date.getUTCFullYear() === parseInt(folderNames[0]),
                mTest = (headerObj.date.getUTCMonth() + 1) === parseInt(folderNames[1]),
                dTest = headerObj.date.getUTCDate() === parseInt(folderNames[2]);
                // if all goes well send the file with a 200 status
                if (yTest && mTest && dTest) {
                    res.status(200);
                    let text_md_clean = header.remove(text_md),
                    html = '<h1>' + headerObj.title + '</h1>';
                    html += '<ul><li>internal 200: <span id=\"count_internal_200\">0</span></li>' +
                        '<li>internal 404: <span id=\"count_internal_404\">0</span></li>' +
                        '<li>internal unkown: <span id=\"count_internal_unkown\">0</span></li></ul>';
                    html += marked(text_md_clean);
                    html += '<script src=\"/js/links.js\"></script>';
                    res.end(html);
                } else {
                    // else we have a 404 event though we have a file becuase the dates in the url
                    // do not match the ones in the header
                    res.status(404);
                    res.end('404: dates in url do not match what is in the file: \n' +
                        'header date: ' + headerObj.date.toString() + '\n' +
                        'tests: ' + yTest + ' mm: ' + mTest + ' dd: ' + dTest);
                }
            }
        });
    } else {
        // send a 404 if there is no file name folder in the url
        res.status(404);
        res.end('404: No file name given in path');
    }
});

// main root ( / ) path that gives a full list of the posts
app.get('/', (req, res) => {
    fs.readdir(app.get('dir_posts'), (e, files) => {
        res.status(200);
        let fileNames = files.map(function (fn) {
                return '<a href=\"/tofile/' + fn + '\">' + fn.split('.md')[0] + '</a><br>';
            });
        res.end('<div>' + fileNames.join('\n') + '</div>');
    })
});

// to file redirect path so that /tofile/js-array.md redirects to /2018/12/10/js-array/
app.get(/tofile\/.+/, (req, res) => {
    let folders = trimEmpty(req.url.split('/')),
    fileName = folders[1],
    uri = path.join(app.get('dir_posts'), fileName);
    fs.readFile(uri, 'utf8', (e, text_md) => {
        if (e) {
            res.status(500);
            res.end(e.message);
        } else {
            let headerObj = header.get(text_md),
            d = headerObj.date,
            yStr = d.getUTCFullYear(),
            mStr = String(d.getUTCMonth() + 1).padStart(2, '0'),
            dStr = String(d.getUTCDate()).padStart(2, '0'),
            dateStr = yStr + '/' + mStr + '/' + dStr,
            url = '/' + dateStr + '/' + fileName.replace(/.md$/, '');
            res.redirect(url);
        }
    });
});

let cats = [];
try {
    cats = require(path.join(__dirname, 'cats.json'));
} catch (e) {
    cats = ['blog'];
}

let inCats = (folderName) => {
    let i = cats.length;
    while (i--) {
        if (cats[i] === folderName) {
            return true;
        }
    }
    return false;
}

app.get(/^\/categories\/.+/, (req, res) => {
    let folders = trimEmpty(req.url.split('/'));

    if (inCats(folders[1])) {
        res.status(200);
        res.end('cat folder found for ' + folders[1]);
    } else {
        res.status(404);
        res.end('cat folder NOT FOUND for ' + folders[1] + ' \n known cats are :' + cats.join(' '));
    }

});

//listen
app.listen(app.get('port'), () => {
    console.log('editor is up on port: ' + app.get('port'));
});
