var get = function (sOpt) {

    // if STRING get is a wrapper for document.getElementById
    if (typeof sOpt === 'string') {

        return document.getElementById(sOpt);

    } else {

        // else an OBJECT is assumed and used to make http requests
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/action', true);

        sOpt = sOpt || {};
        sOpt.payload = sOpt.payload || {};
        sOpt.action = sOpt.action || 'open';
        sOpt.onDone = sOpt.onDone || function (res,resObj) {
            console.log(resObj);
        };
        sOpt.onError = sOpt.onError || function (e) {
            console.log(e);
        };

        // what to do for ready state
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                try {
                    var resObj = JSON.parse(this.response);
                    if (this.status === 200) {
                        sOpt.onDone.call(this, resObj.data, resObj);
                    } else {
                        sOpt.onError.call(this, resObj.mess, resObj);
                    }
                } catch (e) {
                    sOpt.onError.call(this, 'JSON Parse Error in get.js', {});
                }
            }
        };

        // in this project all requests will be for JSON data
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(sOpt.payload));
    }

};
