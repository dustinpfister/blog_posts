let getFreshColor = (freshPer) => {
    color = 'red';
    color = freshPer > 25 ? 'orange' : color;
    color = freshPer > 75 ? 'green' : color;
    return color;
};

let getWordCountColor = (wc) => {
    color = 'red';
    color = wc > 500 ? 'orange' : color;
    color = wc > 1000 ? 'green' : color;
    color = wc > 1800 ? 'lime' : color;
    return color;
}

module.exports = (req, res) => {

    let html = '';

    res.report.forEach((month, i) => {

        html += '<ul>';
        html += '<li><h2>' + (i + 1) + ') ' + month.key + '</h2><\/li>';
        html += '<li><h3>Fresh Per: ' + Math.round(month.freshPer * 100) + '%<\/h3><\/li>';
        html += '<li> Fresh / Post Count: ' + month.fresh.toFixed(2) + '/' + month.pc + '<\/li>';
        html += '<li> Word Count: ' + month.wc + '<\/li>';
        html += '<\/ul>';

        html += '<table style=\"width:100%;\">';
        html += '<tr><th>Post Name:<\/th><th>fresh %:<\/th><th>Word Count:<\/th><\/tr>';
        month.posts.forEach((post) => {
            let freshPer = Math.round(post.fresh * 100);
            html += '<tr>' +
            '<td style=\"outline: thin solid;\">' + post.fn + '<\/td>' +
            '<td style=\"outline: thin solid;color:' + getFreshColor(freshPer) + ';\">' + freshPer + '%<\/td>' +
            '<td style=\"outline: thin solid;color:' + getWordCountColor(post.wc) + ';\">' + post.wc + ';<\/td>' +
            '<\/tr>'
        });
        html += '<\/table><hr>';

    });

    res.send(html);
    console.log('sent html');
};
