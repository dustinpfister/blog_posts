
module.exports = (req, res, next) => {

    console.log('sorting');
    // to array
    let arr = [];
    Object.keys(res.report).forEach((key) => {
        let month = res.report[key];
        month.freshPer = month.fresh / month.pc;

        // sort posts
        month.posts.sort((a, b) => {
            if (a.fresh > b.fresh) {
                return -1;
            }
            if (a.fresh < b.fresh) {
                return 1;
            }
            return 0;

        });

        arr.push(month);
    });

    // sort by fresh percent
    arr.sort((a, b) => {
        if (a.freshPer > b.freshPer) {
            return -1;
        }
        if (a.freshPer < b.freshPer) {
            return 1;
        }
        return 0;
    });

    res.report = arr;
    next();

};
