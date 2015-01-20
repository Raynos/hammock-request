# hammock-request

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

Make requests use the hammock HTTP mocks

## Example

```js
var hammockRequest = require('hammock-request');

var myHandler = function (req, resp) {
    resp.end(JSON.stringify('hello world'));
}

hammockRequest(myHandler, {
    url: '/foo',
    json: { 'foo': 'bar' }
})
```

## Docs

// TODO. State what the module does.

## Installation

`npm install hammock-request`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licensed

  [build-png]: https://secure.travis-ci.org/Raynos/hammock-request.png
  [build]: https://travis-ci.org/Raynos/hammock-request
  [cover-png]: https://coveralls.io/repos/Raynos/hammock-request/badge.png
  [cover]: https://coveralls.io/r/Raynos/hammock-request
  [dep-png]: https://david-dm.org/Raynos/hammock-request.png
  [dep]: https://david-dm.org/Raynos/hammock-request
  [npm-png]: https://nodei.co/npm/hammock-request.png?stars&downloads
  [npm]: https://nodei.co/npm/hammock-request
