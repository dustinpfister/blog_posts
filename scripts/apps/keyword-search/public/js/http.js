// simple custom http client for keyword search
var http = {
    xhr: XMLHttpRequest
};

// make and return a post XHR request
http.mkReq = function (opt) {

    var opt = opt || {}; //dir, onRSC, method
    opt.dir = opt.dir || '/search';
    opt.onRSC = opt.onRSC || function () {
        if (this.readyState === 4) {
            console.log(this, this.response);
        }
    };
    opt.method = opt.method || 'POST';

    // create thr request
    var xhr = new this.xhr();
    xhr.open(opt.method, opt.dir, true);
    xhr.onreadystatechange = opt.onRSC;

    // if a POST request always assume JSON
    if (opt.method.toLowerCase() === 'post') {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(opt.payload || {}));
    } else {
        // else just send
        xhr.send();
    }

}

// search for keyword
http.search = function (keyword, onDone) {
    this.mkReq({
        payload: {
            mw: 'keyword-search',
            keyword: keyword
        },
        onRSC: function () {
            if (this.readyState === 4) {
                onDone(this.response);
            }
        }
    });
};
