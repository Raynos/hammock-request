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

test('can pass body as object if json set to true', function t(assert) {
    var data = {
        'foo': 'bar'
    };

    function myHandler(req, resp) {
        assert.deepEqual(req.body, JSON.stringify(data));
        resp.end(JSON.stringify('hello world'));
    }

    hammockRequest(myHandler, {
        url: '/foo',
        json: true,
        body: data
    }, function onResp(err, resp) {
        assert.ifError(err);
        assert.end();
    });
});

test('can pass json as object', function t(assert) {
    var data = {
        'foo': 'bar'
    };

    function myHandler(req, resp) {
        assert.deepEqual(req.body, JSON.stringify(data));
        resp.end(JSON.stringify('hello world'));
    }

    hammockRequest(myHandler, {
        url: '/foo',
        json: data
    }, function onResp(err, resp) {
        assert.ifError(err);
        assert.end();
    });
});

test('can pass body as string', function t(assert) {
    var data = {
        'foo': 'bar'
    };

    function myHandler(req, resp) {
        assert.deepEqual(req.body, JSON.stringify(data));
        resp.end(JSON.stringify('hello world'));
    }

    hammockRequest(myHandler, {
        url: '/foo',
        body: JSON.stringify(data)
    }, function onResp(err, resp) {
        assert.ifError(err);
        assert.end();
    });
});

test('can pass json false', function t(assert) {
    var data = {
        'foo': 'bar'
    };

    function myHandler(req, resp) {
        assert.deepEqual(req.body, JSON.stringify(data));
        resp.end(JSON.stringify('hello world'));
    }

    hammockRequest(myHandler, {
        url: '/foo',
        body: JSON.stringify(data),
        json: false
    }, function onResp(err, resp) {
        assert.ifError(err);
        assert.end();
    });
});
