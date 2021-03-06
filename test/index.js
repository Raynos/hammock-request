'use strict';

var test = require('tape');
var http = require('http');

var hammockRequest = require('../index.js');

test('hammockRequest is a function', function t(assert) {
    assert.equal(typeof hammockRequest, 'function');
    assert.end();
});

test('can make req', function t(assert) {
    function myHandler(req, resp) {
        resp.end(JSON.stringify('hello world'));
    }

    hammockRequest(myHandler, {
        url: '/foo',
        json: {
            'foo': 'bar'
        }
    }, function onResp(err, resp) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 200);
        assert.equal(resp.body, 'hello world');

        assert.end();
    });
});

test('can make req (server)', function t(assert) {
    var server = http.createServer(myHandler);

    function myHandler(req, resp) {
        resp.end(JSON.stringify('hello world'));
    }

    hammockRequest(server, {
        url: '/foo',
        json: {
            'foo': 'bar'
        }
    }, function onResp(err, resp) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 200);
        assert.equal(resp.body, 'hello world');

        assert.end();
    });
});
