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

        html += '<ul>';
        month.posts.forEach((post) => {
            let freshPer = Math.round(post.fresh * 100);
            //color = 'red';
            //color = freshPer > 25 ? 'orange' : color;
            //color = freshPer > 75 ? 'green' : color;
            html += '<li >' +
            post.fn +
            '- <span style=\"color:' + getFreshColor(freshPer) + ';\">fresh%: ' + freshPer + '<\/span>' +
            '; <span style=\"color:' + getWordCountColor(post.wc) + ';\">word count: ' + post.wc + ';<\/span><\/li>'
        });
        html += '<\/ul><hr>';

    });

    res.send(html);
    console.log('sent html');
};
