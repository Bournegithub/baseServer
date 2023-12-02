'use strict';
module.exports = {
  failResponse: {
    code: { type: 'integer', required: true, example: 500 },
    data: { type: 'null', example: null },
    msg: { type: 'string', example: '请求失败' },
  },
};
