let byFresh = (a, b) => {
    if (a.fresh > b.fresh) {
        return -1;
    }
    if (a.fresh < b.fresh) {
        return 1;
    }
    return 0;
};

module.exports = (req, res, next) => {
    console.log('sorting');
    // sort posts
    res.report.cats.forEach((cat) => {
        cat.posts.sort(byFresh);
    });
    // sort cats
    res.report.cats.sort(byFresh)
    next();
};
