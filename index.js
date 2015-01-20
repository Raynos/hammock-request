'use strict';

var HammockRequest = require('hammock/request');
var HammockResponse = require('hammock/response');
var tough = require('tough-cookie');
var url = require('url');

hammockRequest.jar = function jar() {
    return new tough.CookieJar();
};

module.exports = hammockRequest;

/*eslint max-statements: [2, 20]*/
function hammockRequest(handler, opts, cb) {
    var mockReq = HammockRequest(opts);
    var mockRes = HammockResponse(onResponse);

    if (opts.url.indexOf('http:') !== 0 &&
        opts.url.indexOf('https:') !== 0
    ) {
        opts.url = 'http://localhost' + opts.url;
    }

    var uri = url.parse(opts.url);

    if ('json' in opts && opts.json !== true) {
        mockReq.headers['content-type'] = 'application/json';
    }

    if (opts.jar) {
        var cookies = opts.jar.getCookieStringSync(uri.href);
        if (cookies && cookies.length) {
            if (Array.isArray(cookies)) {
                cookies = cookies.join('; ');
            }
            mockReq.headers = mockReq.headers || {};
            mockReq.headers.cookie = cookies;
        }
    }

    handler(mockReq, mockRes);

    if ('json' in opts && opts.json !== true) {
        mockReq.write(JSON.stringify(opts.json));
        mockReq.end();
    } else {
        mockReq.end();
    }

    function onResponse(err, resp) {
        if (err) {
            return cb(err);
        }

        if (typeof resp.statusCode !== 'number') {
            resp.statusCode = 200;
        }

        if ('json' in opts) {
            resp.body = JSON.parse(resp.body);
        }

        if (opts.jar && resp.headers['set-cookie']) {
            var header = resp.headers['set-cookie'];
            if (Array.isArray(header)) {
                header = header.join('; ');
            }
            var cookie = tough.Cookie.parse(header);
            opts.jar.setCookieSync(cookie, uri.href);
        }

        cb(null, resp);
    }
}
