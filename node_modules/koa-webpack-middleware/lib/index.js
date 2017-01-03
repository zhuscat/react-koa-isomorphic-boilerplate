'use strict';

var _devMiddleware = require('./devMiddleware');

var _devMiddleware2 = _interopRequireDefault(_devMiddleware);

var _hotMiddleware = require('./hotMiddleware');

var _hotMiddleware2 = _interopRequireDefault(_hotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { devMiddleware: _devMiddleware2.default, hotMiddleware: _hotMiddleware2.default };